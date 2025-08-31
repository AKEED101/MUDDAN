#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🎨 HerHealth App UI Validation');
console.log('================================\n');

// Color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  purple: '\x1b[35m',
  reset: '\x1b[0m',
  bold: '\x1b[1m'
};

let passedTests = 0;
let totalTests = 0;

function logTest(name, passed, details = '') {
  totalTests++;
  if (passed) {
    passedTests++;
    console.log(`${colors.green}✅${colors.reset} ${name}`);
  } else {
    console.log(`${colors.red}❌${colors.reset} ${name}`);
    if (details) console.log(`   ${colors.yellow}${details}${colors.reset}`);
  }
}

function checkFileContent(filePath, searchTerms, description) {
  if (!fs.existsSync(filePath)) {
    logTest(description, false, 'File not found');
    return false;
  }

  const content = fs.readFileSync(filePath, 'utf8');
  const allTermsFound = searchTerms.every(term => content.includes(term));
  logTest(description, allTermsFound, allTermsFound ? '' : `Missing: ${searchTerms.filter(term => !content.includes(term)).join(', ')}`);
  return allTermsFound;
}

function analyzeScreenDesign(screenPath, screenName) {
  if (!fs.existsSync(screenPath)) {
    logTest(`${screenName} - Design Analysis`, false, 'File not found');
    return;
  }

  const content = fs.readFileSync(screenPath, 'utf8');
  
  // Check for modern design patterns
  const hasStyleSheet = content.includes('StyleSheet');
  const hasLinearGradient = content.includes('LinearGradient');
  const hasBorderRadius = content.includes('borderRadius');
  const hasShadow = content.includes('shadow') || content.includes('elevation');
  const hasModernColors = content.includes('#7C3AED') || content.includes('#0EA5E9') || content.includes('#10B981');
  
  logTest(`  ${screenName} - StyleSheet`, hasStyleSheet);
  logTest(`  ${screenName} - LinearGradient`, hasLinearGradient);
  logTest(`  ${screenName} - BorderRadius`, hasBorderRadius);
  logTest(`  ${screenName} - Shadows`, hasShadow);
  logTest(`  ${screenName} - Modern Colors`, hasModernColors);
  
  // Check for responsive design
  const hasDimensions = content.includes('Dimensions');
  const hasResponsiveLayout = content.includes('flex') || content.includes('width') || content.includes('height');
  
  logTest(`  ${screenName} - Responsive Design`, hasDimensions || hasResponsiveLayout);
  
  return hasStyleSheet && hasLinearGradient && hasBorderRadius && hasShadow;
}

// 1. Design System Validation
console.log(`${colors.blue}${colors.bold}1. Design System Consistency${colors.reset}`);

// Check for the specified color palette
const colorPalette = [
  '#7C3AED', // Primary Violet
  '#0EA5E9', // Sky
  '#10B981', // Emerald
  '#F59E0B', // Amber
  '#EF4444'  // Rose
];

colorPalette.forEach(color => {
  const colorName = color === '#7C3AED' ? 'Primary Violet' :
                   color === '#0EA5E9' ? 'Sky' :
                   color === '#10B981' ? 'Emerald' :
                   color === '#F59E0B' ? 'Amber' : 'Rose';
  
  // Search in key files for color usage
  const keyFiles = [
    'src/screens/HomeScreen.tsx',
    'src/screens/ProfileScreen.tsx',
    'src/screens/CommunityScreen.tsx',
    'src/components/DynamicCTA.tsx'
  ];
  
  let colorFound = false;
  keyFiles.forEach(file => {
    if (fs.existsSync(file) && fs.readFileSync(file, 'utf8').includes(color)) {
      colorFound = true;
    }
  });
  
  logTest(`Color ${colorName} (${color})`, colorFound, colorFound ? '' : `Not found in key UI files`);
});

// 2. Modern UI Components
console.log(`\n${colors.blue}${colors.bold}2. Modern UI Components${colors.reset}`);

const uiComponents = [
  'src/components/ScreenWithNavBar.tsx',
  'src/components/DynamicCTA.tsx',
  'src/components/CTAComposer.tsx'
];

uiComponents.forEach(component => {
  if (fs.existsSync(component)) {
    const content = fs.readFileSync(component, 'utf8');
    const hasStyleSheet = content.includes('StyleSheet');
    const hasModernStyling = content.includes('borderRadius') || content.includes('shadow');
    const hasGradients = content.includes('LinearGradient');
    
    logTest(`  ${path.basename(component)} - StyleSheet`, hasStyleSheet);
    logTest(`  ${path.basename(component)} - Modern Styling`, hasModernStyling);
    logTest(`  ${path.basename(component)} - Gradients`, hasGradients);
  }
});

// 3. Screen Design Analysis
console.log(`\n${colors.blue}${colors.bold}3. Screen Design Analysis${colors.reset}`);

const screensToAnalyze = [
  { path: 'src/screens/HomeScreen.tsx', name: 'Home Screen' },
  { path: 'src/screens/ProfileScreen.tsx', name: 'Profile Screen' },
  { path: 'src/screens/CommunityScreen.tsx', name: 'Community Screen' },
  { path: 'src/screens/ConsultantsScreen.tsx', name: 'Consultants Screen' },
  { path: 'src/screens/CycleScreen.tsx', name: 'Cycle Screen' },
  { path: 'src/screens/ExploreScreen.tsx', name: 'Explore Screen' },
  { path: 'src/screens/PregnancySetupScreen.tsx', name: 'Pregnancy Setup' },
  { path: 'src/screens/PregnancyWeekOverviewScreen.tsx', name: 'Pregnancy Week Overview' }
];

screensToAnalyze.forEach(screen => {
  analyzeScreenDesign(screen.path, screen.name);
});

// 4. Typography & Layout
console.log(`\n${colors.blue}${colors.bold}4. Typography & Layout${colors.reset}`);

const layoutFiles = [
  'src/screens/HomeScreen.tsx',
  'src/screens/ProfileScreen.tsx'
];

layoutFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasLargeHeadings = content.includes('fontSize') && (content.includes('24') || content.includes('28') || content.includes('32'));
    const hasReadableText = content.includes('fontSize') && (content.includes('16') || content.includes('18') || content.includes('20'));
    const hasProperSpacing = content.includes('margin') || content.includes('padding');
    const hasCardLayout = content.includes('borderRadius') && content.includes('shadow');
    
    logTest(`  ${path.basename(file)} - Large Headings`, hasLargeHeadings);
    logTest(`  ${path.basename(file)} - Readable Text`, hasReadableText);
    logTest(`  ${path.basename(file)} - Proper Spacing`, hasProperSpacing);
    logTest(`  ${path.basename(file)} - Card Layout`, hasCardLayout);
  }
});

// 5. Interactive Elements
console.log(`\n${colors.blue}${colors.bold}5. Interactive Elements${colors.reset}`);

const interactiveFiles = [
  'src/screens/HomeScreen.tsx',
  'src/components/DynamicCTA.tsx'
];

interactiveFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasTouchableOpacity = content.includes('TouchableOpacity');
    const hasPressable = content.includes('Pressable');
    const hasButtons = content.includes('Button') || content.includes('TouchableOpacity');
    const hasHoverEffects = content.includes('onPress') || content.includes('onPressIn');
    
    logTest(`  ${path.basename(file)} - Touchable Elements`, hasTouchableOpacity || hasPressable);
    logTest(`  ${path.basename(file)} - Interactive Buttons`, hasButtons);
    logTest(`  ${path.basename(file)} - Press Handlers`, hasHoverEffects);
  }
});

// 6. Responsive Design
console.log(`\n${colors.blue}${colors.bold}6. Responsive Design${colors.reset}`);

const responsiveFiles = [
  'src/screens/HomeScreen.tsx',
  'src/screens/ProfileScreen.tsx'
];

responsiveFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasDimensions = content.includes('Dimensions');
    const hasFlexbox = content.includes('flex') || content.includes('flexDirection');
    const hasResponsiveWidth = content.includes('width') || content.includes('height');
    const hasPlatformSpecific = content.includes('Platform.OS');
    
    logTest(`  ${path.basename(file)} - Dimensions API`, hasDimensions);
    logTest(`  ${path.basename(file)} - Flexbox Layout`, hasFlexbox);
    logTest(`  ${path.basename(file)} - Responsive Dimensions`, hasResponsiveWidth);
    logTest(`  ${path.basename(file)} - Platform Specific`, hasPlatformSpecific);
  }
});

// 7. Visual Effects
console.log(`\n${colors.blue}${colors.bold}7. Visual Effects${colors.reset}`);

const effectFiles = [
  'src/screens/HomeScreen.tsx',
  'src/screens/ProfileScreen.tsx',
  'src/components/DynamicCTA.tsx'
];

effectFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasGradients = content.includes('LinearGradient');
    const hasShadows = content.includes('shadow') || content.includes('elevation');
    const hasBorderRadius = content.includes('borderRadius');
    const hasOpacity = content.includes('opacity');
    const hasTransforms = content.includes('transform');
    
    logTest(`  ${path.basename(file)} - Gradients`, hasGradients);
    logTest(`  ${path.basename(file)} - Shadows`, hasShadows);
    logTest(`  ${path.basename(file)} - Border Radius`, hasBorderRadius);
    logTest(`  ${path.basename(file)} - Opacity`, hasOpacity);
    logTest(`  ${path.basename(file)} - Transforms`, hasTransforms);
  }
});

// Summary
console.log(`\n${colors.bold}${colors.blue}📊 UI VALIDATION SUMMARY${colors.reset}`);
console.log('================================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${colors.green}${passedTests}${colors.reset}`);
console.log(`Failed: ${colors.red}${totalTests - passedTests}${colors.reset}`);
console.log(`Success Rate: ${colors.bold}${Math.round((passedTests / totalTests) * 100)}%${colors.reset}`);

if (passedTests === totalTests) {
  console.log(`\n${colors.green}${colors.bold}🎨 PERFECT! Your UI design is consistent and modern!${colors.reset}`);
  process.exit(0);
} else {
  console.log(`\n${colors.yellow}${colors.bold}⚠️  Some UI tests failed. Review the design consistency above.${colors.reset}`);
  process.exit(1);
}
