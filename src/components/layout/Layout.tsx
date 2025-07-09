import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Layout as AntLayout, Badge, Typography } from 'antd';
import { ShoppingCartOutlined, HomeOutlined } from '@ant-design/icons';

import { useCart } from '../../core/hooks';
import { Button } from '../shared';

const { Header, Content } = AntLayout;
const { Title } = Typography;

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { getTotalItems } = useCart();
  const location = useLocation();
  const totalItems = getTotalItems();

  return (
    <AntLayout style={{ minHeight: '100vh' }}>
      <Header
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '0 24px',
          background: '#fff',
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        }}
      >
        <Link to="/" style={{ textDecoration: 'none' }}>
          <Title level={3} style={{ margin: 0, color: '#1890ff' }}>
            ShopCart
          </Title>
        </Link>

        <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
          {location.pathname !== '/' && (
            <Link to="/">
              <Button label="Products" type="text" icon={<HomeOutlined />} />
            </Link>
          )}

          <Link to="/cart">
            <Badge count={totalItems} size="small">
              <Button label="Cart" type={location.pathname === '/cart' ? 'primary' : 'text'} icon={<ShoppingCartOutlined />} />
            </Badge>
          </Link>
        </div>
      </Header>

      <Content style={{ padding: '24px' }}>{children}</Content>
    </AntLayout>
  );
};

export default Layout;
