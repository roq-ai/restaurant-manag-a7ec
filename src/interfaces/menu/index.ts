import { DishCategoryInterface } from 'interfaces/dish-category';
import { MenuDishCategoryInterface } from 'interfaces/menu-dish-category';
import { RestaurantInterface } from 'interfaces/restaurant';
import { GetQueryInterface } from 'interfaces';

export interface MenuInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  availability_status: boolean;
  description?: string;
  name?: string;
  image?: string;
  restaurant_id?: string;
  dish_category?: DishCategoryInterface[];
  menu_dish_category?: MenuDishCategoryInterface[];
  restaurant?: RestaurantInterface;
  _count?: {
    dish_category?: number;
    menu_dish_category?: number;
  };
}

export interface MenuGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  image?: string;
  restaurant_id?: string;
}
