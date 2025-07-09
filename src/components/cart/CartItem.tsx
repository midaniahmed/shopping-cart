import React from 'react';
import { Card, InputNumber, Image, Row, Col, Typography } from 'antd';
import { DeleteOutlined } from '@ant-design/icons';

import { CartItem as CartItemType } from '../../core/types';
import { useCart } from '../../core/hooks';
import { formatAmount } from '../../core/utils';
import { Button } from '../shared';

const { Text, Title } = Typography;

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeItem } = useCart();

  const handleQuantityChange = (value: number | null) => {
    if (value && value > 0) {
      updateQuantity(item.product.id, value);
    }
  };

  const handleRemove = () => {
    removeItem(item.product.id);
  };

  return (
    <Card style={{ marginBottom: '16px' }}>
      <Row gutter={16} align="middle">
        <Col xs={24} sm={6} md={4}>
          <Image alt={item.product.name} src={item.product.image} style={{ width: '100%', height: '100px', objectFit: 'cover' }} preview={false} />
        </Col>

        <Col xs={24} sm={12} md={12}>
          <Title level={4} style={{ margin: '0 0 8px 0' }}>
            {item.product.name}
          </Title>
          <Text type="secondary" style={{ display: 'block', marginBottom: '8px' }}>
            {item.product.category}
          </Text>
          <Text strong style={{ fontSize: '18px', color: '#1890ff' }}>
            ${item.product.price} each
          </Text>
        </Col>

        <Col xs={24} sm={6} md={8}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-end',
              gap: '12px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Text>Quantity:</Text>
              <InputNumber min={1} max={99} value={item.quantity} onChange={handleQuantityChange} style={{ width: '80px' }} />
            </div>

            <div style={{ fontSize: '20px', fontWeight: 'bold' }}>Total: {formatAmount(item.product.price * item.quantity)}</div>

            <Button label="Remove" type="text" danger icon={<DeleteOutlined />} onClick={handleRemove} />
          </div>
        </Col>
      </Row>
    </Card>
  );
};
