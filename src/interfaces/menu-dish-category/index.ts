import { MenuInterface } from 'interfaces/menu';
import { DishCategoryInterface } from 'interfaces/dish-category';
import { GetQueryInterface } from 'interfaces';

export interface MenuDishCategoryInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  description?: string;
  availability_status?: boolean;
  menu_id?: string;
  dish_category_id?: string;

  menu?: MenuInterface;
  dish_category?: DishCategoryInterface;
  _count?: {};
}

export interface MenuDishCategoryGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  menu_id?: string;
  dish_category_id?: string;
}
