import { useState } from 'react';
import { Row, Col, Tag, InputNumber, Image, Typography, Divider, Alert } from 'antd';
import { ShoppingCartOutlined, HeartOutlined } from '@ant-design/icons';

import { Product } from '../../core/types';
import { useCart } from '../../core/hooks';
import { formatAmount } from '../../core/utils';
import { Button, Rating } from '../shared';

const { Title, Text, Paragraph } = Typography;

interface ProductInfoProps {
  product: Product;
}
export const ProductInfo = ({ product }: ProductInfoProps) => {
  const { addItem } = useCart();

  const [quantity, setQuantity] = useState(1);

  const handleAddToCart = () => {
    if (product) {
      addItem(product, quantity);
    }
  };

  const handleQuantityChange = (value: number | null) => {
    if (value && value > 0) {
      setQuantity(value);
    }
  };

  return (
    <Row gutter={[32, 32]}>
      <Col xs={24} md={12}>
        <div style={{ textAlign: 'center' }}>
          <Image
            alt={product.name}
            src={product.image}
            style={{
              width: '100%',
              maxWidth: '500px',
              height: 'auto',
              borderRadius: '8px',
            }}
          />
        </div>
      </Col>

      <Col xs={24} md={12}>
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
          <Title level={2} style={{ marginBottom: '16px' }}>
            {product.name}
          </Title>

          <Rating value={product.rating} style={{ marginBottom: '16px' }} indicator />

          <div style={{ marginBottom: '16px' }}>
            <Tag color={product.inStock ? 'green' : 'red'} style={{ fontSize: '14px', padding: '4px 8px' }}>
              {product.inStock ? 'In Stock' : 'Out of Stock'}
            </Tag>
            <Tag color="blue" style={{ fontSize: '14px', padding: '4px 8px' }}>
              {product.category}
            </Tag>
            <div style={{ marginTop: '8px' }}>
              {product.tags.map((tag) => (
                <Tag key={tag} color="purple" style={{ fontSize: '12px', padding: '2px 6px' }}>
                  {tag}
                </Tag>
              ))}
            </div>
          </div>

          <Title level={3} style={{ color: '#1890ff', marginBottom: '16px' }}>
            {formatAmount(product.price)}
          </Title>

          <Paragraph style={{ fontSize: '16px', marginBottom: '24px' }}>{product.description}</Paragraph>

          <Divider />

          <div style={{ marginBottom: '24px' }}>
            <Text strong style={{ display: 'block', marginBottom: '8px' }}>
              Quantity:
            </Text>
            <InputNumber min={1} max={10} value={quantity} onChange={handleQuantityChange} style={{ width: '100px' }} />
          </div>

          <div
            style={{
              display: 'flex',
              gap: '12px',
              flexWrap: 'wrap',
              marginTop: 'auto',
            }}
          >
            <Button
              label={`Add to Cart - ${formatAmount(product.price * quantity)}`}
              type="primary"
              size="large"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!product.inStock}
              style={{ flex: 1, minWidth: '200px' }}
            />

            <Button label="Wishlist" size="large" icon={<HeartOutlined />} style={{ minWidth: '120px' }} />
          </div>

          {!product.inStock && (
            <Alert message="Out of Stock" description="This item is currently unavailable. Please check back later." type="warning" showIcon style={{ marginTop: '16px' }} />
          )}
        </div>
      </Col>
    </Row>
  );
};
