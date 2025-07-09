import React from 'react';
import { Link } from 'react-router-dom';
import { Card, Tag, Image, Row, Col, Flex } from 'antd';
import { ShoppingCartOutlined, EyeOutlined } from '@ant-design/icons';

import { Button, Rating } from '../../shared';
import { useCart } from '../../../core/hooks';
import { Product } from '../../../core/types';
import { formatAmount } from '../../../core/utils';

const { Meta } = Card;

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product);
  };

  return (
    <Card
      hoverable
      style={{ height: '100%' }}
      cover={
        <div style={{ height: '200px', overflow: 'hidden' }}>
          <Image alt={product.name} src={product.image} style={{ width: '100%', height: '100%', objectFit: 'cover' }} preview={true} />
        </div>
      }
      actions={[
        <Row gutter={16}>
          <Col xs={12}>
            <Link to={`/product/${product.id}`} key="view">
              <Button label="View Details" type="text" icon={<EyeOutlined />} />
            </Link>
          </Col>
          <Col xs={12}>
            <Button key="add-to-cart" label="Add to Cart" type="primary" icon={<ShoppingCartOutlined />} onClick={handleAddToCart} disabled={!product.inStock} />,
          </Col>
        </Row>,
      ]}
    >
      <Meta
        title={
          <Flex gap="small" align='center' justify="space-between">
            <div
              style={{
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {product.name}
            </div>
            <div
              style={{
                fontSize: '18px',
                fontWeight: 'bold',
                color: '#1890ff',
                marginTop: '8px',
              }}
            >
              {formatAmount(product.price)}
            </div>
          </Flex>
        }
        description={
          <div>
            <Rating value={product.rating} size="14px" />
            <div style={{ marginTop: '8px' }}>
              <Tag color={product.inStock ? 'green' : 'red'}>{product.inStock ? 'In Stock' : 'Out of Stock'}</Tag>
              <Tag color="blue">{product.category}</Tag>
            </div>
          </div>
        }
      />
    </Card>
  );
};
