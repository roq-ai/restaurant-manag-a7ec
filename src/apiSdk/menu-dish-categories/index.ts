import queryString from 'query-string';
import { MenuDishCategoryInterface, MenuDishCategoryGetQueryInterface } from 'interfaces/menu-dish-category';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMenuDishCategories = async (
  query?: MenuDishCategoryGetQueryInterface,
): Promise<PaginatedInterface<MenuDishCategoryInterface>> => {
  return fetcher('/api/menu-dish-categories', {}, query);
};

export const createMenuDishCategory = async (menuDishCategory: MenuDishCategoryInterface) => {
  return fetcher('/api/menu-dish-categories', { method: 'POST', body: JSON.stringify(menuDishCategory) });
};

export const updateMenuDishCategoryById = async (id: string, menuDishCategory: MenuDishCategoryInterface) => {
  return fetcher(`/api/menu-dish-categories/${id}`, { method: 'PUT', body: JSON.stringify(menuDishCategory) });
};

export const getMenuDishCategoryById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/menu-dish-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteMenuDishCategoryById = async (id: string) => {
  return fetcher(`/api/menu-dish-categories/${id}`, { method: 'DELETE' });
};
