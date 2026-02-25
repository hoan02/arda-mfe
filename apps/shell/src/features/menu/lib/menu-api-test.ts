// Test file để kiểm tra Menu API
import { menuApiClient } from '../services/menu-api';

// Test functions
export async function testUpdateMenu() {
  try {
    console.log('🧪 Testing updateMenu...');

    // Test data
    const testData = {
      label: 'Updated Menu',
      icon: 'settings',
      iconColor: '#FF0000',
      path: '/updated-menu',
      type: 'PAGE'
    };

    // Update menu with ID 1
    const result = await menuApiClient.updateMenu("1", testData);
    console.log('✅ Menu updated:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to update menu:', error);
    throw error;
  }
}

export async function testCreateMenu() {
  try {
    console.log('🧪 Testing createMenu...');

    const testData = {
      label: 'Test Menu',
      icon: 'home',
      iconColor: '#00FF00',
      path: '/test-menu',
      type: 'PAGE',
      sortOrder: 1
    };

    const result = await menuApiClient.createMenu(testData);
    console.log('✅ Menu created:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to create menu:', error);
    throw error;
  }
}

export async function testReorderMenus() {
  try {
    console.log('🧪 Testing reorderMenus...');

    const testData = [
      { id: "1", parentId: null, sortOrder: 1 },
      { id: "2", parentId: null, sortOrder: 2 }
    ];

    const result = await menuApiClient.reorderMenus(testData);
    console.log('✅ Menus reordered:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to reorder menus:', error);
    throw error;
  }
}

export async function testGetMenus() {
  try {
    console.log('🧪 Testing getMenus...');
    const result = await menuApiClient.getMenus();
    console.log('✅ Menus loaded:', result);
    return result;
  } catch (error) {
    console.error('❌ Failed to load menus:', error);
    throw error;
  }
}

// Example usage in browser console:
// import { testUpdateMenu, testCreateMenu, testReorderMenus } from './lib/menu-api-test';
// testUpdateMenu();
// testCreateMenu();
// testReorderMenus();
