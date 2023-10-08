import queryString from 'query-string';
import { MenuInterface, MenuGetQueryInterface } from 'interfaces/menu';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMenus = async (query?: MenuGetQueryInterface): Promise<PaginatedInterface<MenuInterface>> => {
  return fetcher('/api/menus', {}, query);
};

export const createMenu = async (menu: MenuInterface) => {
  return fetcher('/api/menus', { method: 'POST', body: JSON.stringify(menu) });
};

export const updateMenuById = async (id: string, menu: MenuInterface) => {
  return fetcher(`/api/menus/${id}`, { method: 'PUT', body: JSON.stringify(menu) });
};

export const getMenuById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/menus/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteMenuById = async (id: string) => {
  return fetcher(`/api/menus/${id}`, { method: 'DELETE' });
};
