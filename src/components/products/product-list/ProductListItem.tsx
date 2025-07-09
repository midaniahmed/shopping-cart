import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tag, Image, Row, Col, Typography, Flex } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';

import { Button, Rating } from '../../shared';
import { useCart } from '../../../core/hooks';
import { Product } from '../../../core/types';
import { formatAmount } from '../../../core/utils';

const { Paragraph } = Typography;
interface ProductListItemProps {
  product: Product;
}

export const ProductListItem: React.FC<ProductListItemProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Card style={{ marginBottom: '16px' }}>
      <Row gutter={16}>
        <Col xs={8} sm={6} md={4}>
          <Image alt={product.name} src={product.image} style={{ width: '100%', height: '120px', objectFit: 'cover' }} preview={false} />
        </Col>
        <Col xs={0} sm={12} md={16}>
          <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ margin: '0 0 8px 0', fontSize: '18px' }}>{product.name}</h3>
            <p
              style={{
                color: '#666',
                margin: '0 0 8px 0',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                display: '-webkit-box',
                WebkitLineClamp: 2,
                WebkitBoxOrient: 'vertical',
              }}
            >
              {product.description}
            </p>
            <div style={{ marginBottom: '8px' }}>
              <Rating value={product.rating} size="14px" />
            </div>
            <div>
              <Tag color={product.inStock ? 'green' : 'red'}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Tag>
              <Tag color="blue">{product.category}</Tag>
            </div>
          </div>
        </Col>
        <Col xs={0} sm={6} md={4}>
          <div
            style={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              alignItems: 'flex-end',
            }}
          >
            <div
              style={{
                fontSize: '24px',
                fontWeight: 'bold',
                color: '#1890ff',
                marginBottom: '16px',
              }}
            >
              {formatAmount(product.price)}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%' }}>
              <Link to={`/product/${product.id}`}>
                <Button label="View Details" type="default" icon={<EyeOutlined />} block />
              </Link>
              <Button label="Add to Cart" type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddToCart} disabled={!product.inStock} block />
            </div>
          </div>
        </Col>
        <Col xs={16} sm={0} md={0}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paragraph ellipsis={{ rows: 1 }}>{product.name}</Paragraph>

            <h3 style={{ color: '#1890ff' }}>{formatAmount(product.price)}</h3>
          </div>
          <div style={{ marginBottom: '8px' }}>
            <Rating value={product.rating} size="14px" />
          </div>
          <div style={{ marginBottom: '8px' }}>
            <Tag color={product.inStock ? 'green' : 'red'}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Tag>
            <Tag color="blue">{product.category}</Tag>
          </div>
          <Flex wrap gap="small" justify="flex-end">
            <Link to={`/product/${product.id}`}>
              <Button type="default" icon={<EyeOutlined />} />
            </Link>
            <Button type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddToCart} disabled={!product.inStock} />
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};
