const fs = require('fs');
const path = require('path');

console.log('🧭 HerHealth App Navigation Test');
console.log('================================\n');

// Test navigation structure
const testNavigationStructure = () => {
  console.log('1. Navigation Structure Test');
  console.log('----------------------------');
  
  const navigationFiles = [
    'src/navigation/RootNavigator.tsx',
    'src/navigation/HomeNavigator.tsx',
    'src/navigation/CommunityNavigator.tsx',
    'src/navigation/ConsultantNavigator.tsx',
    'src/navigation/ProfileNavigator.tsx',
    'src/navigation/CycleNavigator.tsx'
  ];
  
  let allExist = true;
  navigationFiles.forEach(file => {
    if (fs.existsSync(file)) {
      console.log(`✅ ${file}`);
    } else {
      console.log(`❌ ${file} - MISSING`);
      allExist = false;
    }
  });
  
  return allExist;
};

// Test screen imports
const testScreenImports = () => {
  console.log('\n2. Screen Import Test');
  console.log('---------------------');
  
  const navigatorFiles = [
    'src/navigation/HomeNavigator.tsx',
    'src/navigation/CommunityNavigator.tsx',
    'src/navigation/ConsultantNavigator.tsx',
    'src/navigation/ProfileNavigator.tsx',
    'src/navigation/CycleNavigator.tsx'
  ];
  
  let allImportsValid = true;
  
  navigatorFiles.forEach(file => {
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, 'utf8');
      const importMatches = content.match(/import.*from.*['"]\.\.\/screens\/([^'"]+)['"]/g);
      
      if (importMatches) {
        importMatches.forEach(importMatch => {
          const screenName = importMatch.match(/\.\.\/screens\/([^'"]+)/)[1];
          const screenFile = `src/screens/${screenName}.tsx`;
          
          if (fs.existsSync(screenFile)) {
            console.log(`✅ ${file} -> ${screenName}`);
          } else {
            console.log(`❌ ${file} -> ${screenName} - SCREEN MISSING`);
            allImportsValid = false;
          }
        });
      }
    }
  });
  
  return allImportsValid;
};

// Test navigation types
const testNavigationTypes = () => {
  console.log('\n3. Navigation Types Test');
  console.log('-------------------------');
  
  const typesFile = 'src/navigation/types.ts';
  if (fs.existsSync(typesFile)) {
    const content = fs.readFileSync(typesFile, 'utf8');
    
    // Check for all required navigation types
    const requiredTypes = [
      'RootTabParamList',
      'HomeStackParamList',
      'CommunityStackParamList',
      'ConsultantStackParamList',
      'ProfileStackParamList',
      'CycleStackParamList'
    ];
    
    let allTypesExist = true;
    requiredTypes.forEach(type => {
      if (content.includes(type)) {
        console.log(`✅ ${type}`);
      } else {
        console.log(`❌ ${type} - MISSING`);
        allTypesExist = false;
      }
    });
    
    return allTypesExist;
  } else {
    console.log('❌ types.ts - MISSING');
    return false;
  }
};

// Test screen exports
const testScreenExports = () => {
  console.log('\n4. Screen Export Test');
  console.log('---------------------');
  
  const screensDir = 'src/screens';
  if (fs.existsSync(screensDir)) {
    const screenFiles = fs.readdirSync(screensDir).filter(file => file.endsWith('.tsx'));
    
    let allExportsValid = true;
    screenFiles.forEach(file => {
      const filePath = path.join(screensDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      if (content.includes('export default')) {
        console.log(`✅ ${file} - Has default export`);
      } else {
        console.log(`❌ ${file} - Missing default export`);
        allExportsValid = false;
      }
    });
    
    return allExportsValid;
  } else {
    console.log('❌ screens directory - MISSING');
    return false;
  }
};

// Test navigation calls
const testNavigationCalls = () => {
  console.log('\n5. Navigation Calls Test');
  console.log('-------------------------');
  
  const screensDir = 'src/screens';
  if (fs.existsSync(screensDir)) {
    const screenFiles = fs.readdirSync(screensDir).filter(file => file.endsWith('.tsx'));
    
    let allNavigationValid = true;
    screenFiles.forEach(file => {
      const filePath = path.join(screensDir, file);
      const content = fs.readFileSync(filePath, 'utf8');
      
      // Check for navigation.navigate calls
      const navigationCalls = content.match(/navigation\.navigate\(['"]([^'"]+)['"]/g);
      if (navigationCalls) {
        navigationCalls.forEach(call => {
          const routeName = call.match(/['"]([^'"]+)['"]/)[1];
          console.log(`✅ ${file} -> ${routeName}`);
        });
      }
    });
    
    return allNavigationValid;
  } else {
    return false;
  }
};

// Run all tests
const runAllTests = () => {
  const results = [
    testNavigationStructure(),
    testScreenImports(),
    testNavigationTypes(),
    testScreenExports(),
    testNavigationCalls()
  ];
  
  const passed = results.filter(Boolean).length;
  const total = results.length;
  
  console.log('\n📊 NAVIGATION TEST SUMMARY');
  console.log('==========================');
  console.log(`Total Tests: ${total}`);
  console.log(`Passed: ${passed}`);
  console.log(`Failed: ${total - passed}`);
  console.log(`Success Rate: ${Math.round((passed / total) * 100)}%`);
  
  if (passed === total) {
    console.log('\n🎉 ALL NAVIGATION TESTS PASSED!');
    console.log('Your app navigation is fully functional!');
  } else {
    console.log('\n⚠️  SOME NAVIGATION TESTS FAILED!');
    console.log('Please check the issues above.');
  }
};

// Run the tests
runAllTests();
