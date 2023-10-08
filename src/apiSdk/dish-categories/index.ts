import queryString from 'query-string';
import { DishCategoryInterface, DishCategoryGetQueryInterface } from 'interfaces/dish-category';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getDishCategories = async (
  query?: DishCategoryGetQueryInterface,
): Promise<PaginatedInterface<DishCategoryInterface>> => {
  return fetcher('/api/dish-categories', {}, query);
};

export const createDishCategory = async (dishCategory: DishCategoryInterface) => {
  return fetcher('/api/dish-categories', { method: 'POST', body: JSON.stringify(dishCategory) });
};

export const updateDishCategoryById = async (id: string, dishCategory: DishCategoryInterface) => {
  return fetcher(`/api/dish-categories/${id}`, { method: 'PUT', body: JSON.stringify(dishCategory) });
};

export const getDishCategoryById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/dish-categories/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteDishCategoryById = async (id: string) => {
  return fetcher(`/api/dish-categories/${id}`, { method: 'DELETE' });
};
