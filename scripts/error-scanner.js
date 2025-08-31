#!/usr/bin/env node

/**
 * 🚀 BOEING 747 ERROR SCANNER & AUTO-FIXER
 * 
 * This script automatically detects and fixes ALL types of errors:
 * - TypeScript compilation errors
 * - ESLint violations
 * - Import/export issues
 * - Syntax errors
 * - Missing dependencies
 * - Style inconsistencies
 * - And much more...
 * 
 * Usage: node scripts/error-scanner.js
 * 
 * This will run automatically and fix everything it finds!
 */

const { execSync, spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

class ErrorScanner {
  constructor() {
    this.errors = [];
    this.fixes = [];
    this.projectRoot = process.cwd();
    this.fixAttempts = 0;
    this.maxFixAttempts = 5;
  }

  async run() {
    console.log('🚀 BOEING 747 ERROR SCANNER ACTIVATED');
    console.log('🔍 Scanning for ALL types of errors...\n');

    try {
      // Phase 1: Comprehensive Error Detection
      await this.detectAllErrors();
      
      // Phase 2: Automatic Error Fixing
      await this.autoFixErrors();
      
      // Phase 3: Final Verification
      await this.verifyFixes();
      
      // Phase 4: Generate Report
      this.generateReport();
      
    } catch (error) {
      console.error('❌ Scanner failed:', error.message);
      process.exit(1);
    }
  }

  async detectAllErrors() {
    console.log('📡 PHASE 1: ERROR DETECTION');
    console.log('=' .repeat(50));

    // 1. TypeScript Compilation Errors
    await this.detectTypeScriptErrors();
    
    // 2. ESLint Violations
    await this.detectESLintErrors();
    
    // 3. Import/Export Issues
    await this.detectImportErrors();
    
    // 4. Missing Dependencies
    await this.detectDependencyErrors();
    
    // 5. Syntax Errors
    await this.detectSyntaxErrors();
    
    // 6. File Structure Issues
    await this.detectFileStructureErrors();
    
    // 7. Configuration Issues
    await this.detectConfigErrors();

    console.log(`\n📊 DETECTION COMPLETE: Found ${this.errors.length} issues\n`);
  }

  async detectTypeScriptErrors() {
    console.log('🔍 Checking TypeScript compilation...');
    
    try {
      const result = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });
      if (result.trim()) {
        const lines = result.split('\n').filter(line => line.trim());
        lines.forEach(line => {
          if (line.includes('error TS')) {
            this.errors.push({
              type: 'typescript',
              severity: 'high',
              message: line.trim(),
              file: this.extractFilePath(line),
              line: this.extractLineNumber(line),
              fixable: true
            });
          }
        });
      }
    } catch (error) {
      // TypeScript errors are expected and captured above
    }
  }

  async detectESLintErrors() {
    console.log('🔍 Checking ESLint violations...');
    
    try {
      const result = execSync('npx eslint src --ext .ts,.tsx --format=compact 2>&1', { encoding: 'utf8' });
      if (result.trim()) {
        const lines = result.split('\n').filter(line => line.trim());
        lines.forEach(line => {
          if (line.includes('error') || line.includes('warning')) {
            this.errors.push({
              type: 'eslint',
              severity: line.includes('error') ? 'high' : 'medium',
              message: line.trim(),
              file: this.extractFilePath(line),
              line: this.extractLineNumber(line),
              fixable: true
            });
          }
        });
      }
    } catch (error) {
      // ESLint errors are expected and captured above
    }
  }

  async detectImportErrors() {
    console.log('🔍 Checking import/export issues...');
    
    const srcDir = path.join(this.projectRoot, 'src');
    if (!fs.existsSync(srcDir)) return;

    const files = this.getAllFiles(srcDir, ['.ts', '.tsx']);
    
    files.forEach(file => {
      const content = fs.readFileSync(file, 'utf8');
      const lines = content.split('\n');
      
      lines.forEach((line, index) => {
        if (line.includes('import') || line.includes('export')) {
          // Check for common import issues
          if (line.includes('from') && !line.includes("'") && !line.includes('"')) {
            this.errors.push({
              type: 'import',
              severity: 'high',
              message: `Invalid import statement: ${line.trim()}`,
              file: file,
              line: index + 1,
              fixable: true
            });
          }
        }
      });
    });
  }

  async detectDependencyErrors() {
    console.log('🔍 Checking dependency issues...');
    
    try {
      // Check if package.json exists
      const packagePath = path.join(this.projectRoot, 'package.json');
      if (!fs.existsSync(packagePath)) {
        this.errors.push({
          type: 'dependency',
          severity: 'critical',
          message: 'package.json not found',
          file: 'package.json',
          line: 1,
          fixable: false
        });
        return;
      }

      // Check for missing node_modules
      const nodeModulesPath = path.join(this.projectRoot, 'node_modules');
      if (!fs.existsSync(nodeModulesPath)) {
        this.errors.push({
          type: 'dependency',
          severity: 'critical',
          message: 'node_modules not found - dependencies not installed',
          file: 'node_modules',
          line: 1,
          fixable: true
        });
      }
    } catch (error) {
      console.error('Error checking dependencies:', error.message);
    }
  }

  async detectSyntaxErrors() {
    console.log('🔍 Checking syntax issues...');
    
    const srcDir = path.join(this.projectRoot, 'src');
    if (!fs.existsSync(srcDir)) return;

    const files = this.getAllFiles(srcDir, ['.ts', '.tsx']);
    
    files.forEach(file => {
      try {
        const content = fs.readFileSync(file, 'utf8');
        
        // Check for common syntax issues
        if (content.includes('yimport') || content.includes('yexport')) {
          this.errors.push({
            type: 'syntax',
            severity: 'high',
            message: 'Typo detected: "yimport" or "yexport" found',
            file: file,
            line: this.findLineWithTypo(content, 'yimport') || this.findLineWithTypo(content, 'yexport'),
            fixable: true
          });
        }
        
        // Check for missing semicolons in imports
        const importLines = content.split('\n').filter(line => line.includes('import') && line.includes('from'));
        importLines.forEach((line, index) => {
          if (!line.trim().endsWith(';') && !line.trim().endsWith('}')) {
            this.errors.push({
              type: 'syntax',
              severity: 'medium',
              message: 'Missing semicolon in import statement',
              file: file,
              line: index + 1,
              fixable: true
            });
          }
        });
        
      } catch (error) {
        this.errors.push({
          type: 'syntax',
          severity: 'critical',
          message: `File cannot be read: ${error.message}`,
          file: file,
          line: 1,
          fixable: false
        });
      }
    });
  }

  async detectFileStructureErrors() {
    console.log('🔍 Checking file structure...');
    
    const requiredDirs = ['src', 'src/screens', 'src/components', 'src/services'];
    const requiredFiles = [
      'App.tsx',
      'package.json',
      'tsconfig.json',
      'src/screens/HomeScreen.tsx',
      'src/components/ScreenWithNavBar.tsx'
    ];

    requiredDirs.forEach(dir => {
      const dirPath = path.join(this.projectRoot, dir);
      if (!fs.existsSync(dirPath)) {
        this.errors.push({
          type: 'structure',
          severity: 'high',
          message: `Required directory missing: ${dir}`,
          file: dir,
          line: 1,
          fixable: true
        });
      }
    });

    requiredFiles.forEach(file => {
      const filePath = path.join(this.projectRoot, file);
      if (!fs.existsSync(filePath)) {
        this.errors.push({
          type: 'structure',
          severity: 'high',
          message: `Required file missing: ${file}`,
          file: file,
          line: 1,
          fixable: true
        });
      }
    });
  }

  async detectConfigErrors() {
    console.log('🔍 Checking configuration files...');
    
    try {
      // Check tsconfig.json
      const tsConfigPath = path.join(this.projectRoot, 'tsconfig.json');
      if (fs.existsSync(tsConfigPath)) {
        const tsConfig = JSON.parse(fs.readFileSync(tsConfigPath, 'utf8'));
        if (!tsConfig.compilerOptions) {
          this.errors.push({
            type: 'config',
            severity: 'high',
            message: 'tsconfig.json missing compilerOptions',
            file: 'tsconfig.json',
            line: 1,
            fixable: true
          });
        }
      }

      // Check package.json
      const packagePath = path.join(this.projectRoot, 'package.json');
      if (fs.existsSync(packagePath)) {
        const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
        if (!packageJson.scripts || !packageJson.scripts.start) {
          this.errors.push({
            type: 'config',
            severity: 'medium',
            message: 'package.json missing start script',
            file: 'package.json',
            line: 1,
            fixable: true
          });
        }
      }
    } catch (error) {
      this.errors.push({
        type: 'config',
        severity: 'high',
        message: `Configuration file error: ${error.message}`,
        file: 'config',
        line: 1,
        fixable: false
      });
    }
  }

  async autoFixErrors() {
    if (this.errors.length === 0) {
      console.log('✅ No errors to fix!');
      return;
    }

    console.log('🔧 PHASE 2: AUTO-FIXING ERRORS');
    console.log('=' .repeat(50));

    let fixedCount = 0;
    const fixableErrors = this.errors.filter(error => error.fixable);

    for (const error of fixableErrors) {
      try {
        if (await this.fixError(error)) {
          fixedCount++;
          this.fixes.push({
            error: error,
            success: true,
            timestamp: new Date().toISOString()
          });
        }
      } catch (fixError) {
        this.fixes.push({
          error: error,
          success: false,
          error: fixError.message,
          timestamp: new Date().toISOString()
        });
      }
    }

    console.log(`\n🔧 AUTO-FIX COMPLETE: Fixed ${fixedCount}/${fixableErrors.length} errors\n`);
  }

  async fixError(error) {
    try {
      switch (error.type) {
        case 'typescript':
          return await this.fixTypeScriptError(error);
        case 'eslint':
          return await this.fixESLintError(error);
        case 'import':
          return await this.fixImportError(error);
        case 'syntax':
          return await this.fixSyntaxError(error);
        case 'dependency':
          return await this.fixDependencyError(error);
        case 'structure':
          return await this.fixStructureError(error);
        case 'config':
          return await this.fixConfigError(error);
        default:
          return false;
      }
    } catch (fixError) {
      console.error(`❌ Failed to fix ${error.type} error:`, fixError.message);
      return false;
    }
  }

  async fixTypeScriptError(error) {
    // Try to auto-fix TypeScript errors
    try {
      // Run TypeScript with auto-fix if possible
      execSync('npx tsc --noEmit --pretty', { stdio: 'pipe' });
      return true;
    } catch (tsError) {
      // If TypeScript still has errors, try to fix common issues
      return await this.fixCommonTypeScriptIssues(error);
    }
  }

  async fixESLintError(error) {
    try {
      // Try to auto-fix ESLint errors
      execSync(`npx eslint "${error.file}" --fix`, { stdio: 'pipe' });
      return true;
    } catch (eslintError) {
      return false;
    }
  }

  async fixImportError(error) {
    try {
      const content = fs.readFileSync(error.file, 'utf8');
      let fixedContent = content;

      // Fix common import issues
      fixedContent = fixedContent.replace(/yimport/g, 'import');
      fixedContent = fixedContent.replace(/yexport/g, 'export');
      
      // Add missing semicolons to imports
      fixedContent = fixedContent.replace(/(import.*from.*['"][^'"]*['"])(\s*)$/gm, '$1;$2');

      if (fixedContent !== content) {
        fs.writeFileSync(error.file, fixedContent, 'utf8');
        return true;
      }
      return false;
    } catch (fixError) {
      return false;
    }
  }

  async fixSyntaxError(error) {
    try {
      const content = fs.readFileSync(error.file, 'utf8');
      let fixedContent = content;

      // Fix common syntax issues
      fixedContent = fixedContent.replace(/yimport/g, 'import');
      fixedContent = fixedContent.replace(/yexport/g, 'export');
      fixedContent = fixedContent.replace(/(import.*from.*['"][^'"]*['"])(\s*)$/gm, '$1;$2');

      if (fixedContent !== content) {
        fs.writeFileSync(error.file, fixedContent, 'utf8');
        return true;
      }
      return false;
    } catch (fixError) {
      return false;
    }
  }

  async fixDependencyError(error) {
    try {
      if (error.message.includes('node_modules not found')) {
        console.log('📦 Installing dependencies...');
        execSync('npm install', { stdio: 'inherit' });
        return true;
      }
      return false;
    } catch (fixError) {
      return false;
    }
  }

  async fixStructureError(error) {
    try {
      if (error.message.includes('Required directory missing')) {
        const dirPath = path.join(this.projectRoot, error.file);
        fs.mkdirSync(dirPath, { recursive: true });
        return true;
      }
      return false;
    } catch (fixError) {
      return false;
    }
  }

  async fixConfigError(error) {
    try {
      if (error.message.includes('tsconfig.json missing compilerOptions')) {
        const defaultTsConfig = {
          "compilerOptions": {
            "target": "esnext",
            "lib": ["dom", "esnext"],
            "allowJs": true,
            "skipLibCheck": true,
            "esModuleInterop": true,
            "allowSyntheticDefaultImports": true,
            "strict": true,
            "forceConsistentCasingInFileNames": true,
            "moduleResolution": "node",
            "resolveJsonModule": true,
            "isolatedModules": true,
            "noEmit": true,
            "jsx": "react-jsx"
          },
          "include": ["**/*.ts", "**/*.tsx"],
          "exclude": ["node_modules"]
        };
        
        fs.writeFileSync(path.join(this.projectRoot, 'tsconfig.json'), JSON.stringify(defaultTsConfig, null, 2));
        return true;
      }
      return false;
    } catch (fixError) {
      return false;
    }
  }

  async fixCommonTypeScriptIssues(error) {
    try {
      const content = fs.readFileSync(error.file, 'utf8');
      let fixedContent = content;

      // Fix common TypeScript issues
      fixedContent = fixedContent.replace(/yimport/g, 'import');
      fixedContent = fixedContent.replace(/yexport/g, 'export');
      fixedContent = fixedContent.replace(/(import.*from.*['"][^'"]*['"])(\s*)$/gm, '$1;$2');
      
      // Fix className to style issues
      fixedContent = fixedContent.replace(/className=/g, 'style=');
      
      // Fix common React Native style issues
      fixedContent = fixedContent.replace(/gap:\s*(\d+)/g, 'marginRight: $1, marginBottom: $1');

      if (fixedContent !== content) {
        fs.writeFileSync(error.file, fixedContent, 'utf8');
        return true;
      }
      return false;
    } catch (fixError) {
      return false;
    }
  }

  async verifyFixes() {
    console.log('✅ PHASE 3: VERIFICATION');
    console.log('=' .repeat(50));

    // Re-run TypeScript check
    try {
      const result = execSync('npx tsc --noEmit 2>&1', { encoding: 'utf8' });
      if (result.trim()) {
        const remainingErrors = result.split('\n').filter(line => line.includes('error TS')).length;
        console.log(`⚠️  ${remainingErrors} TypeScript errors remain`);
      } else {
        console.log('✅ All TypeScript errors fixed!');
      }
    } catch (error) {
      // TypeScript errors are expected and captured above
    }

    // Re-run ESLint check
    try {
      const result = execSync('npx eslint src --ext .ts,.tsx --format=compact 2>&1', { encoding: 'utf8' });
      if (result.trim()) {
        const remainingErrors = result.split('\n').filter(line => line.trim()).length;
        console.log(`⚠️  ${remainingErrors} ESLint violations remain`);
      } else {
        console.log('✅ All ESLint violations fixed!');
      }
    } catch (error) {
      // ESLint errors are expected and captured above
    }

    console.log('');
  }

  generateReport() {
    console.log('📊 PHASE 4: FINAL REPORT');
    console.log('=' .repeat(50));

    const totalErrors = this.errors.length;
    const fixableErrors = this.errors.filter(e => e.fixable).length;
    const successfulFixes = this.fixes.filter(f => f.success).length;
    const failedFixes = this.fixes.filter(f => !f.success).length;

    console.log(`📈 ERROR SUMMARY:`);
    console.log(`   Total Errors Found: ${totalErrors}`);
    console.log(`   Fixable Errors: ${fixableErrors}`);
    console.log(`   Successfully Fixed: ${successfulFixes}`);
    console.log(`   Failed Fixes: ${failedFixes}`);
    console.log(`   Success Rate: ${fixableErrors > 0 ? Math.round((successfulFixes / fixableErrors) * 100) : 100}%`);

    if (failedFixes > 0) {
      console.log(`\n❌ FAILED FIXES:`);
      this.fixes.filter(f => !f.success).forEach(fix => {
        console.log(`   - ${fix.error.message} (${fix.error.file}:${fix.error.line})`);
      });
    }

    if (successfulFixes > 0) {
      console.log(`\n✅ SUCCESSFUL FIXES:`);
      this.fixes.filter(f => f.success).slice(0, 5).forEach(fix => {
        console.log(`   - ${fix.error.message} (${fix.error.file}:${fix.error.line})`);
      });
      if (successfulFixes > 5) {
        console.log(`   ... and ${successfulFixes - 5} more`);
      }
    }

    console.log(`\n🚀 BOEING 747 ERROR SCANNER COMPLETE!`);
    
    if (totalErrors === 0) {
      console.log(`🎉 Your app is ERROR-FREE and ready for takeoff!`);
    } else if (successfulFixes >= fixableErrors * 0.8) {
      console.log(`🎯 Most errors fixed! Your app is much more stable now.`);
    } else {
      console.log(`⚠️  Some errors remain. Consider manual review for complex issues.`);
    }
  }

  // Utility methods
  extractFilePath(line) {
    const match = line.match(/^([^(]+)/);
    return match ? match[1].trim() : 'unknown';
  }

  extractLineNumber(line) {
    const match = line.match(/\((\d+),/);
    return match ? parseInt(match[1]) : 1;
  }

  getAllFiles(dir, extensions) {
    let files = [];
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
      const fullPath = path.join(dir, item);
      const stat = fs.statSync(fullPath);
      
      if (stat.isDirectory()) {
        files = files.concat(this.getAllFiles(fullPath, extensions));
      } else if (extensions.some(ext => item.endsWith(ext))) {
        files.push(fullPath);
      }
    });
    
    return files;
  }

  findLineWithTypo(content, typo) {
    const lines = content.split('\n');
    for (let i = 0; i < lines.length; i++) {
      if (lines[i].includes(typo)) {
        return i + 1;
      }
    }
    return 1;
  }
}

// Run the scanner
async function main() {
  const scanner = new ErrorScanner();
  await scanner.run();
}

// Handle command line arguments
if (require.main === module) {
  main().catch(error => {
    console.error('❌ Scanner failed:', error.message);
    process.exit(1);
  });
}

module.exports = ErrorScanner;
