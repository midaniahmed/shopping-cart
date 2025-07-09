import { Product, Review } from '../types';
import { TOTAL_PRODUCTS } from '../utils/constants';
import { faker } from '@faker-js/faker';

const TAGS = [
  'new',
  'hot',
  'trending',
  'limited',
  'bestseller',
  'exclusive',
  'sale',
  'discount',
  'deal',
  'clearance',
  'eco-friendly',
  'handmade',
  'organic',
  'vegan',
  'sustainable',
  'recyclable',
  'durable',
  'lightweight',
  'portable',
  'washable',
  'kids',
  'men',
  'women',
  'unisex',
  'office',
  'outdoor',
  'fitness',
  'travel',
  'gift',
  'home',
];

const generateRandomProduct = (id: number): Product => {
  return {
    id: id.toString(),
    name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    image: `https://picsum.photos/400/300?random=${id}`,
    price: parseFloat(faker.commerce.price({ min: 5, max: 300, dec: 2 })),
    category: faker.commerce.department(),
    rating: parseFloat(faker.number.float({ min: 1, max: 5 }).toFixed(1)),
    tags: faker.helpers.arrayElements(TAGS, { min: 1, max: 5 }),
    inStock: Math.random() > 0.2, // 80% in stock
    reviews: generateReviews(),
  };
};

const generateReviews = (): Review[] => {
  return Array.from({ length: faker.number.int({ min: 0, max: 7 }) }, generateReview);
};

const generateReview = (): Review => ({
  id: faker.string.uuid(),
  user: faker.person.fullName(),
  avatar: faker.image.avatar(),
  rating: Math.round(faker.number.float({ min: 1, max: 5 }) * 2) / 2,
  comment: faker.lorem.sentences({ min: 1, max: 5 }),
  date: faker.date.past({ years: 2 }).toISOString(),
  likes: faker.number.int({ min: 0, max: 20 }),
  replies: faker.number.int({ min: 0, max: 5 }),
});

export const generateMockProducts = (): Product[] => {
  const products: Product[] = [];

  for (let i = 1; i <= TOTAL_PRODUCTS; i++) {
    products.push(generateRandomProduct(i));
  }

  return products;
};
