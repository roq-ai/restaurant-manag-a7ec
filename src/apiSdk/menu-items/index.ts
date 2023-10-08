import queryString from 'query-string';
import { MenuItemInterface, MenuItemGetQueryInterface } from 'interfaces/menu-item';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getMenuItems = async (
  query?: MenuItemGetQueryInterface,
): Promise<PaginatedInterface<MenuItemInterface>> => {
  return fetcher('/api/menu-items', {}, query);
};

export const createMenuItem = async (menuItem: MenuItemInterface) => {
  return fetcher('/api/menu-items', { method: 'POST', body: JSON.stringify(menuItem) });
};

export const updateMenuItemById = async (id: string, menuItem: MenuItemInterface) => {
  return fetcher(`/api/menu-items/${id}`, { method: 'PUT', body: JSON.stringify(menuItem) });
};

export const getMenuItemById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/menu-items/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteMenuItemById = async (id: string) => {
  return fetcher(`/api/menu-items/${id}`, { method: 'DELETE' });
};
