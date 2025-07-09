import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, Alert, Breadcrumb, List } from 'antd';
import { ArrowLeftOutlined, HomeOutlined } from '@ant-design/icons';

import { Product } from '../core/types';
import { productsApi } from '../core/services';

import { Button, LoadingSpinner } from '../components/shared';
import { ReviewItem } from '../components/product-details/ReviewItem';
import { ProductFeatures } from '../components/product-details/ProductFeatures';
import { ProductInfo } from '../components/product-details/ProductInfo';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;

      setLoading(true);
      setError(null);

      try {
        const response = await productsApi.getProductById(id);
        setProduct(response.data);
      } catch (err) {
        setError('Product not found');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <LoadingSpinner size="large" text="Loading product details..." />;
  }

  if (error || !product) {
    return (
      <div style={{ maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
        <Alert message="Product Not Found" description="The product you're looking for doesn't exist or has been removed." type="error" showIcon style={{ marginBottom: '24px' }} />
        <Button label="Back to Products" type="primary" onClick={() => navigate('/')} />
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <Breadcrumb style={{ marginBottom: '24px' }}>
        <Breadcrumb.Item>
          <HomeOutlined />
          <span style={{ cursor: 'pointer', marginLeft: '8px' }} onClick={() => navigate('/')}>
            Products
          </span>
        </Breadcrumb.Item>
        <Breadcrumb.Item>{product.category}</Breadcrumb.Item>
        <Breadcrumb.Item>{product.name}</Breadcrumb.Item>
      </Breadcrumb>

      <Button label="Back" type="text" icon={<ArrowLeftOutlined />} onClick={() => navigate(-1)} style={{ marginBottom: '24px' }} />

      <Card>
        <ProductInfo product={product} />
      </Card>

      <Card title="Customer Reviews" style={{ marginTop: '24px' }}>
        <List dataSource={product.reviews} renderItem={ReviewItem} />
      </Card>

      <Card title="Product Features" style={{ marginTop: '24px' }}>
        <ProductFeatures />
      </Card>
    </div>
  );
};

export default ProductDetails;
