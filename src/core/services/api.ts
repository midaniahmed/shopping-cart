import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { Product, ProductsResponse } from '../core/types';
import { generateMockProducts } from './mockData';
import { API_BASE_URL, DELAY_RESPONSE, PRODUCTS_PER_PAGE } from '../utils/constants';

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

const mock = new MockAdapter(api, { delayResponse: DELAY_RESPONSE });

const mockProducts = generateMockProducts();

mock.onGet('/products').reply((config) => {
  const page = parseInt(config.params?.page || '1');
  const limit = parseInt(config.params?.limit || PRODUCTS_PER_PAGE.toString());

  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const products = mockProducts.slice(startIndex, endIndex);

  const response: ProductsResponse = {
    products,
    total: mockProducts.length,
    page,
    limit,
    hasMore: endIndex < mockProducts.length,
  };

  return [200, response];
});

mock.onGet(/\/products\/\w+/).reply((config) => {
  const id = config.url?.split('/').pop();
  const product = mockProducts.find((p) => p.id === id);

  if (product) {
    return [200, product];
  } else {
    return [404, { message: 'Product not found' }];
  }
});

export const productsApi = {
  getProducts: (page: number = 1, limit: number = PRODUCTS_PER_PAGE) => {
    return api.get('/products', { params: { page, limit } });
  },

  getProductById: (id: string) => {
    return api.get(`/products/${id}`);
  },

  searchProducts: (query: string, page: number = 1, limit: number = PRODUCTS_PER_PAGE) => {
    return api.get('/products', { params: { q: query, page, limit } });
  },
};

export default api;
