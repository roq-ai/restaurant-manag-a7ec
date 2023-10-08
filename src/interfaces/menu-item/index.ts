import { DishCategoryMenuItemInterface } from 'interfaces/dish-category-menu-item';
import { GetQueryInterface } from 'interfaces';

export interface MenuItemInterface {
  id?: string;
  created_at?: any;
  updated_at?: any;
  availability_status: boolean;
  dish_description?: string;
  dish_image_url?: string;
  dish_price: number;
  dish_calories?: number;
  dish_ingredients?: string;
  dish_preparation_time?: number;
  dish_name?: string;
  dish_allergens?: string;
  dish_spiciness_level?: number;
  dish_vegan?: boolean;
  dish_gluten_free?: boolean;
  dish_category_menu_item?: DishCategoryMenuItemInterface[];

  _count?: {
    dish_category_menu_item?: number;
  };
}

export interface MenuItemGetQueryInterface extends GetQueryInterface {
  id?: string;
  dish_description?: string;
  dish_image_url?: string;
  dish_ingredients?: string;
  dish_name?: string;
  dish_allergens?: string;
}
