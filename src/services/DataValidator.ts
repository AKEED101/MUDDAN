export interface ValidationRule {
  required?: boolean;
  type?: 'string' | 'number' | 'boolean' | 'object' | 'array';
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  custom?: (value: any) => boolean;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  warnings: string[];
}

export class DataValidator {
  private static instance: DataValidator;

  static getInstance(): DataValidator {
    if (!DataValidator.instance) {
      DataValidator.instance = new DataValidator();
    }
    return DataValidator.instance;
  }

  validate(data: any, rules: Record<string, ValidationRule>): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    for (const [field, rule] of Object.entries(rules)) {
      const value = data[field];
      const fieldResult = this.validateField(value, rule, field);
      
      if (!fieldResult.isValid) {
        result.isValid = false;
        result.errors.push(...fieldResult.errors);
      }
      
      if (fieldResult.warnings.length > 0) {
        result.warnings.push(...fieldResult.warnings);
      }
    }

    return result;
  }

  private validateField(value: any, rule: ValidationRule, fieldName: string): ValidationResult {
    const result: ValidationResult = {
      isValid: true,
      errors: [],
      warnings: []
    };

    // Required check
    if (rule.required && (value === undefined || value === null || value === '')) {
      result.isValid = false;
      result.errors.push(`${fieldName} is required`);
      return result;
    }

    // Skip further validation if value is not required and empty
    if (!rule.required && (value === undefined || value === null || value === '')) {
      return result;
    }

    // Type check
    if (rule.type && !this.checkType(value, rule.type)) {
      result.isValid = false;
      result.errors.push(`${fieldName} must be of type ${rule.type}`);
      return result;
    }

    // String validations
    if (typeof value === 'string') {
      if (rule.minLength && value.length < rule.minLength) {
        result.isValid = false;
        result.errors.push(`${fieldName} must be at least ${rule.minLength} characters long`);
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        result.isValid = false;
        result.errors.push(`${fieldName} must be no more than ${rule.maxLength} characters long`);
      }
      
      if (rule.pattern && !rule.pattern.test(value)) {
        result.isValid = false;
        result.errors.push(`${fieldName} format is invalid`);
      }
    }

    // Number validations
    if (typeof value === 'number') {
      if (rule.min !== undefined && value < rule.min) {
        result.isValid = false;
        result.errors.push(`${fieldName} must be at least ${rule.min}`);
      }
      
      if (rule.max !== undefined && value > rule.max) {
        result.isValid = false;
        result.errors.push(`${fieldName} must be no more than ${rule.max}`);
      }
    }

    // Array validations
    if (Array.isArray(value)) {
      if (rule.minLength && value.length < rule.minLength) {
        result.isValid = false;
        result.errors.push(`${fieldName} must have at least ${rule.minLength} items`);
      }
      
      if (rule.maxLength && value.length > rule.maxLength) {
        result.isValid = false;
        result.errors.push(`${fieldName} must have no more than ${rule.maxLength} items`);
      }
    }

    // Custom validation
    if (rule.custom && !rule.custom(value)) {
      result.isValid = false;
      result.errors.push(`${fieldName} failed custom validation`);
    }

    return result;
  }

  private checkType(value: any, expectedType: string): boolean {
    switch (expectedType) {
      case 'string':
        return typeof value === 'string';
      case 'number':
        return typeof value === 'number' && !isNaN(value);
      case 'boolean':
        return typeof value === 'boolean';
      case 'object':
        return typeof value === 'object' && value !== null && !Array.isArray(value);
      case 'array':
        return Array.isArray(value);
      default:
        return true;
    }
  }

  // Pregnancy-specific validations
  validatePregnancyData(data: any): ValidationResult {
    const rules: Record<string, ValidationRule> = {
      lmpDate: {
        required: true,
        type: 'string',
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        custom: (value) => {
          const date = new Date(value);
          const today = new Date();
          return date <= today && date >= new Date('2020-01-01');
        }
      },
      dueDate: {
        required: false,
        type: 'string',
        pattern: /^\d{4}-\d{2}-\d{2}$/,
        custom: (value) => {
          if (!value) return true;
          const date = new Date(value);
          const today = new Date();
          return date > today;
        }
      },
      currentWeek: {
        required: false,
        type: 'number',
        min: 1,
        max: 42
      },
      remindersEnabled: {
        required: false,
        type: 'boolean'
      }
    };

    return this.validate(data, rules);
  }

  // CTA-specific validations
  validateCTAData(data: any): ValidationResult {
    const rules: Record<string, ValidationRule> = {
      type: {
        required: true,
        type: 'string',
        custom: (value) => ['book', 'buy', 'consult', 'learn', 'contact'].includes(value)
      },
      label: {
        required: true,
        type: 'string',
        minLength: 3,
        maxLength: 50
      },
      url: {
        required: true,
        type: 'string',
        pattern: /^https?:\/\/.+/,
        custom: (value) => {
          try {
            new URL(value);
            return true;
          } catch {
            return false;
          }
        }
      },
      expiresAt: {
        required: false,
        type: 'string',
        custom: (value) => {
          if (!value) return true;
          const date = new Date(value);
          return !isNaN(date.getTime()) && date > new Date();
        }
      }
    };

    return this.validate(data, rules);
  }

  // Sanitize data to prevent injection attacks
  sanitizeString(input: string): string {
    if (typeof input !== 'string') return '';
    
    return input
      .replace(/[<>]/g, '') // Remove potential HTML tags
      .replace(/javascript:/gi, '') // Remove JavaScript protocol
      .trim();
  }

  sanitizeObject<T extends Record<string, any>>(obj: T): T {
    const sanitized = { ...obj } as any;
    
    for (const [key, value] of Object.entries(sanitized)) {
      if (typeof value === 'string') {
        sanitized[key] = this.sanitizeString(value);
      } else if (typeof value === 'object' && value !== null) {
        sanitized[key] = this.sanitizeObject(value);
      }
    }
    
    return sanitized as T;
  }
}

export default DataValidator;
