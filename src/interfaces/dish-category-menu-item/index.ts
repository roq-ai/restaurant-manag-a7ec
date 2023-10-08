import { MenuItemInterface } from 'interfaces/menu-item';
import { DishCategoryInterface } from 'interfaces/dish-category';
import { GetQueryInterface } from 'interfaces';

export interface DishCategoryMenuItemInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  menu_item_id?: string;
  dish_category_id?: string;
  availability_status: string;

  menu_item?: MenuItemInterface;
  dish_category?: DishCategoryInterface;
  _count?: {};
}

export interface DishCategoryMenuItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  menu_item_id?: string;
  dish_category_id?: string;
  availability_status?: string;
}
