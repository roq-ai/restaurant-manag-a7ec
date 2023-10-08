import { DishCategoryMenuItemInterface } from 'interfaces/dish-category-menu-item';
import { MenuDishCategoryInterface } from 'interfaces/menu-dish-category';
import { MenuInterface } from 'interfaces/menu';
import { GetQueryInterface } from 'interfaces';

export interface DishCategoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  description?: string;
  name?: string;
  tags?: string;
  dish_category_image?: string;
  dish_category_status: boolean;
  dish_category_color?: string;
  menu_id?: string;
  dish_category_menu_item?: DishCategoryMenuItemInterface[];
  menu_dish_category?: MenuDishCategoryInterface[];
  menu?: MenuInterface;
  _count?: {
    dish_category_menu_item?: number;
    menu_dish_category?: number;
  };
}

export interface DishCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  tags?: string;
  dish_category_image?: string;
  dish_category_color?: string;
  menu_id?: string;
}
