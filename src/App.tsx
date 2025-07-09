import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConfigProvider } from 'antd';

import Layout from './components/layout/Layout';
import { CartProvider } from './core/context';

const ProductListing = lazy(() => import('./modules/ProductListing'));
const ProductDetails = lazy(() => import('./modules/ProductDetails'));
const ShoppingCart = lazy(() => import('./modules/ShoppingCart'));

const antdTheme = {
  token: {
    colorPrimary: '#1890ff',
    borderRadius: 6,
  },
};

const App: React.FC = () => {
  const routes = [
    {
      path: '/',
      component: ProductListing,
    },
    {
      path: '/product/:id',
      component: ProductDetails,
    },
    {
      path: '/cart',
      component: ShoppingCart,
    },
  ];

  return (
    <ConfigProvider theme={antdTheme}>
      <CartProvider>
        <Router>
          <Layout>
            <Routes>
              {routes.map(({ path, component: Component }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    <Suspense>
                      <Component />
                    </Suspense>
                  }
                />
              ))}
            </Routes>
          </Layout>
        </Router>
      </CartProvider>
    </ConfigProvider>
  );
};

export default App;
