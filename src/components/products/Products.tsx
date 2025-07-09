import React from 'react';
import { Empty } from 'antd';

import { Product } from '../../core/types';
import { LoadingSpinner, Button } from '../shared';
import { ViewMode } from '../../core/enums';

import { ProductGridView } from './product-grid/ProductGridView';
import { ProductListView } from './product-list/ProductListView';

interface ProductPageProps {
  products: Product[];
  loading: boolean;
  viewMode: ViewMode;
  hasMore: boolean;
  onLoadMore: () => void;
}

export const Products: React.FC<ProductPageProps> = ({ products, loading, viewMode, hasMore, onLoadMore }) => {
  if (products.length === 0 && !loading) {
    return <Empty description="No products found" style={{ padding: '40px' }} />;
  }

  return (
    <div>
      {viewMode === ViewMode.Grid ? <ProductGridView products={products} /> : <ProductListView products={products} />}

      {loading && <LoadingSpinner />}

      {!loading && hasMore && (
        <div style={{ textAlign: 'center', marginTop: '24px' }}>
          <Button label="Load More Products" size="large" onClick={onLoadMore} />
        </div>
      )}
    </div>
  );
};
