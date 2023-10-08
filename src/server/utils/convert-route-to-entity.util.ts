const mapping: Record<string, string> = {
  'dish-categories': 'dish_category',
  'dish-category-menu-items': 'dish_category_menu_item',
  menus: 'menu',
  'menu-dish-categories': 'menu_dish_category',
  'menu-items': 'menu_item',
  restaurants: 'restaurant',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
