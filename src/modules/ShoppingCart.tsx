import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Empty, Row, Col, Typography, Alert } from 'antd';
import { ShoppingOutlined, ArrowLeftOutlined } from '@ant-design/icons';

import { useCart } from '../core/hooks';

import { CartItem } from '../components/cart/CartItem';
import { CartSummary } from '../components/cart/CartSummary';
import { Button } from '../components/shared';

const { Title } = Typography;

const ShoppingCart: React.FC = () => {
  const navigate = useNavigate();
  const { items, getTotalItems } = useCart();

  const totalItems = getTotalItems();

  if (items.length === 0) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Empty
          image={Empty.PRESENTED_IMAGE_SIMPLE}
          description={
            <div>
              <Title level={3} style={{ color: '#bfbfbf' }}>
                Your cart is empty
              </Title>
              <div style={{ marginBottom: '24px', color: '#8c8c8c' }}>Looks like you haven't added any items to your cart yet.</div>
            </div>
          }
        >
          <Button label="Start Shopping" type="primary" size="large" icon={<ShoppingOutlined />} onClick={() => navigate('/')} />
        </Empty>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Button label="Continue Shopping" type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate('/')} style={{ marginBottom: '24px' }} />

      <Title level={2} style={{ marginBottom: '24px' }}>
        Shopping Cart ({totalItems} {totalItems === 1 ? 'item' : 'items'})
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={16}>
          <div>
            {items.map((item) => (
              <CartItem key={item.product.id} item={item} />
            ))}
          </div>

          <Alert
            message="Secure Checkout"
            description="Your payment information is encrypted and secure. We accept all major credit cards."
            type="info"
            showIcon
            style={{ marginTop: '16px' }}
          />
        </Col>

        <Col xs={24} lg={8}>
          <div style={{ position: 'sticky', top: '24px' }}>
            <CartSummary />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default ShoppingCart;
