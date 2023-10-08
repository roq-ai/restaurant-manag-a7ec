import queryString from 'query-string';
import {
  DishCategoryMenuItemInterface,
  DishCategoryMenuItemGetQueryInterface,
} from 'interfaces/dish-category-menu-item';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDishCategoryMenuItems = async (
  query?: DishCategoryMenuItemGetQueryInterface,
): Promise<PaginatedInterface<DishCategoryMenuItemInterface>> => {
  return fetcher('/api/dish-category-menu-items', {}, query);
};

export const createDishCategoryMenuItem = async (dishCategoryMenuItem: DishCategoryMenuItemInterface) => {
  return fetcher('/api/dish-category-menu-items', { method: 'POST', body: JSON.stringify(dishCategoryMenuItem) });
};

export const updateDishCategoryMenuItemById = async (
  id: string,
  dishCategoryMenuItem: DishCategoryMenuItemInterface,
) => {
  return fetcher(`/api/dish-category-menu-items/${id}`, { method: 'PUT', body: JSON.stringify(dishCategoryMenuItem) });
};

export const getDishCategoryMenuItemById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/dish-category-menu-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteDishCategoryMenuItemById = async (id: string) => {
  return fetcher(`/api/dish-category-menu-items/${id}`, { method: 'DELETE' });
};
