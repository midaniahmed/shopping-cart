import React from 'react';
import { Card, Row, Col, Typography, Divider } from 'antd';
import { ShoppingCartOutlined } from '@ant-design/icons';
import { useCart } from '../../core/hooks';
import { Button } from '../shared';
import { formatAmount } from '../../core/utils';

const { Title, Text } = Typography;

export const CartSummary: React.FC = () => {
  const { items, getTotalPrice, getTotalItems, clearCart } = useCart();

  const totalPrice = getTotalPrice();
  const totalItems = getTotalItems();
  const tax = totalPrice * 0.08; // 8% tax
  const shipping = totalPrice > 100 ? 0 : 10; // Free shipping over $100
  const finalTotal = totalPrice + tax + shipping;

  if (items.length === 0) {
    return null;
  }

  return (
    <Card title="Order Summary" style={{ marginTop: '24px' }}>
      <Row justify="space-between" style={{ marginBottom: '8px' }}>
        <Col>
          <Text>Items ({totalItems}):</Text>
        </Col>
        <Col>
          <Text>{formatAmount(totalPrice)}</Text>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginBottom: '8px' }}>
        <Col>
          <Text>Tax (8%):</Text>
        </Col>
        <Col>
          <Text>{formatAmount(tax)}</Text>
        </Col>
      </Row>

      <Row justify="space-between" style={{ marginBottom: '8px' }}>
        <Col>
          <Text>Shipping:</Text>
        </Col>
        <Col>
          <Text>{shipping === 0 ? 'FREE' : formatAmount(shipping)}</Text>
        </Col>
      </Row>

      <Divider />

      <Row justify="space-between" style={{ marginBottom: '16px' }}>
        <Col>
          <Title level={4}>Total:</Title>
        </Col>
        <Col>
          <Title level={4} style={{ color: '#1890ff' }}>
            {formatAmount(finalTotal)}
          </Title>
        </Col>
      </Row>

      <div style={{ display: 'flex', gap: '12px', flexDirection: 'column' }}>
        <Button label="Proceed to Checkout" type="primary" size="large" icon={<ShoppingCartOutlined />} block />
        <Button label="Clear Cart" type="default" size="large" onClick={clearCart} block />
      </div>

      {totalPrice < 100 && (
        <div
          style={{
            marginTop: '16px',
            padding: '12px',
            backgroundColor: '#f0f8ff',
            borderRadius: '6px',
            textAlign: 'center',
          }}
        >
          <Text type="secondary">Add {formatAmount(100 - totalPrice)} more for free shipping!</Text>
        </div>
      )}
    </Card>
  );
};
