import queryString from 'query-string';
import { RestaurantInterface, RestaurantGetQueryInterface } from 'interfaces/restaurant';
import { fetcher } from 'lib/api-fetcher';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getRestaurants = async (
  query?: RestaurantGetQueryInterface,
): Promise<PaginatedInterface<RestaurantInterface>> => {
  return fetcher('/api/restaurants', {}, query);
};

export const createRestaurant = async (restaurant: RestaurantInterface) => {
  return fetcher('/api/restaurants', { method: 'POST', body: JSON.stringify(restaurant) });
};

export const updateRestaurantById = async (id: string, restaurant: RestaurantInterface) => {
  return fetcher(`/api/restaurants/${id}`, { method: 'PUT', body: JSON.stringify(restaurant) });
};

export const getRestaurantById = async (id: string, query?: GetQueryInterface) => {
  return fetcher(`/api/restaurants/${id}${query ? `?${queryString.stringify(query)}` : ''}`, {});
};

export const deleteRestaurantById = async (id: string) => {
  return fetcher(`/api/restaurants/${id}`, { method: 'DELETE' });
};
