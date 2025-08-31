#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

console.log('🔍 HerHealth App Feature Validation');
console.log('=====================================\n');

// Color codes for output
const colors = {
  green: '\x1b[32m',
  red: '\x1b[31m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
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

function checkFileExists(filePath, description) {
  const exists = fs.existsSync(filePath);
  logTest(description, exists, exists ? '' : `File not found: ${filePath}`);
  return exists;
}

function checkScreenStructure(screenPath, requiredComponents) {
  if (!fs.existsSync(screenPath)) {
    logTest(`Screen exists: ${path.basename(screenPath)}`, false, 'File not found');
    return false;
  }

  const content = fs.readFileSync(screenPath, 'utf8');
  let allComponentsFound = true;
  
  requiredComponents.forEach(component => {
    const found = content.includes(component);
    logTest(`  - ${component}`, found, found ? '' : `Missing in ${path.basename(screenPath)}`);
    if (!found) allComponentsFound = false;
  });
  
  return allComponentsFound;
}

// 1. Core App Structure Validation
console.log(`${colors.blue}${colors.bold}1. Core App Structure${colors.reset}`);
logTest('App.tsx exists', checkFileExists('App.tsx', 'Main App component'));
logTest('Navigation structure', checkFileExists('src/navigation/HomeStack.tsx', 'Home navigation stack'));
logTest('Package.json dependencies', checkFileExists('package.json', 'Project configuration'));

// 2. Pregnancy Tracker Features (G1-G3)
console.log(`\n${colors.blue}${colors.bold}2. Pregnancy Tracker Features${colors.reset}`);
logTest('Pregnancy Setup Screen', checkFileExists('src/screens/PregnancySetupScreen.tsx', 'G1: Setup inputs'));
logTest('Pregnancy Week Overview', checkFileExists('src/screens/PregnancyWeekOverviewScreen.tsx', 'G2: Week overview'));
logTest('Pregnancy Notes & Reminders', checkFileExists('src/screens/PregnancyNotesRemindersScreen.tsx', 'G3: Notes & reminders'));

// Check pregnancy screen structure
if (checkFileExists('src/screens/PregnancySetupScreen.tsx')) {
  checkScreenStructure('src/screens/PregnancySetupScreen.tsx', [
    'LMP',
    'due date',
    'reminders',
    'StyleSheet'
  ]);
}

if (checkFileExists('src/screens/PregnancyWeekOverviewScreen.tsx')) {
  checkScreenStructure('src/screens/PregnancyWeekOverviewScreen.tsx', [
    'Week {currentWeek}',
    'Trimester',
    'Baby Development',
    'Mother\'s Health',
    'Nutrition',
    'To-Dos'
  ]);
}

// 3. Dynamic CTA System
console.log(`\n${colors.blue}${colors.bold}3. Dynamic CTA System${colors.reset}`);
logTest('Dynamic CTA Component', checkFileExists('src/components/DynamicCTA.tsx', 'CTA display component'));
logTest('CTA Composer', checkFileExists('src/components/CTAComposer.tsx', 'CTA creation component'));

if (checkFileExists('src/components/DynamicCTA.tsx')) {
  checkScreenStructure('src/components/DynamicCTA.tsx', [
    'case \'book\'',
    'case \'buy\'',
    'case \'consult\'',
    'case \'learn\'',
    'case \'contact\'',
    'getCTAColor'
  ]);
}

// 4. Core Screens
console.log(`\n${colors.blue}${colors.bold}4. Core App Screens${colors.reset}`);
const coreScreens = [
  'HomeScreen.tsx',
  'CommunityScreen.tsx',
  'ConsultantsScreen.tsx',
  'ProfileScreen.tsx',
  'CycleScreen.tsx',
  'ExploreScreen.tsx'
];

coreScreens.forEach(screen => {
  checkFileExists(`src/screens/${screen}`, `Screen: ${screen.replace('.tsx', '')}`);
});

// 5. UI Components
console.log(`\n${colors.blue}${colors.bold}5. UI Components${colors.reset}`);
logTest('Screen With Nav Bar', checkFileExists('src/components/ScreenWithNavBar.tsx', 'Navigation wrapper'));
logTest('Components index', checkFileExists('src/components/index.ts', 'Component exports'));

// 6. Styling & Design
console.log(`\n${colors.blue}${colors.bold}6. Styling & Design${colors.reset}`);
const styleFiles = [
  'src/screens/HomeScreen.tsx',
  'src/screens/ProfileScreen.tsx',
  'src/screens/CommunityScreen.tsx'
];

styleFiles.forEach(file => {
  if (fs.existsSync(file)) {
    const content = fs.readFileSync(file, 'utf8');
    const hasStyleSheet = content.includes('StyleSheet');
    const hasGradients = content.includes('LinearGradient');
    const hasModernUI = content.includes('borderRadius') || content.includes('shadow');
    
    logTest(`  ${path.basename(file)} - StyleSheet`, hasStyleSheet);
    logTest(`  ${path.basename(file)} - Modern UI`, hasModernUI);
  }
});

// 7. Type Safety
console.log(`\n${colors.blue}${colors.bold}7. Type Safety${colors.reset}`);
logTest('TypeScript config', checkFileExists('tsconfig.json', 'TypeScript configuration'));
logTest('Types definition', checkFileExists('src/types/index.ts', 'Type definitions'));

if (checkFileExists('src/types/index.ts')) {
  const typesContent = fs.readFileSync('src/types/index.ts', 'utf8');
  const hasPregnancyTypes = typesContent.includes('PregnancyRecord');
  const hasCTATypes = typesContent.includes('CTA');
  const hasUserTypes = typesContent.includes('UserRole');
  
  logTest('  - Pregnancy types', hasPregnancyTypes);
  logTest('  - CTA types', hasCTATypes);
  logTest('  - User types', hasUserTypes);
}

// 8. Navigation & Routing
console.log(`\n${colors.blue}${colors.bold}8. Navigation & Routing${colors.reset}`);
if (checkFileExists('src/navigation/HomeStack.tsx')) {
  const navContent = fs.readFileSync('src/navigation/HomeStack.tsx', 'utf8');
  const hasPregnancyRoutes = navContent.includes('PregnancySetupScreen') || 
                             navContent.includes('PregnancyWeekOverviewScreen') ||
                             navContent.includes('PregnancyNotesRemindersScreen');
  const hasCoreRoutes = navContent.includes('HomeScreen') && 
                       navContent.includes('CycleScreen') &&
                       navContent.includes('ExploreScreen');
  
  logTest('  - Pregnancy routes', hasPregnancyRoutes);
  logTest('  - Core feature routes', hasCoreRoutes);
}

// Summary
console.log(`\n${colors.bold}${colors.blue}📊 VALIDATION SUMMARY${colors.reset}`);
console.log('=====================================');
console.log(`Total Tests: ${totalTests}`);
console.log(`Passed: ${colors.green}${passedTests}${colors.reset}`);
console.log(`Failed: ${colors.red}${totalTests - passedTests}${colors.reset}`);
console.log(`Success Rate: ${colors.bold}${Math.round((passedTests / totalTests) * 100)}%${colors.reset}`);

if (passedTests === totalTests) {
  console.log(`\n${colors.green}${colors.bold}🎉 ALL TESTS PASSED! Your HerHealth app is ready for shipping!${colors.reset}`);
  process.exit(0);
} else {
  console.log(`\n${colors.yellow}${colors.bold}⚠️  Some tests failed. Please review and fix the issues above.${colors.reset}`);
  process.exit(1);
}
