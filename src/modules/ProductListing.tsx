import React, { useState } from 'react';
import { Alert, Space, FloatButton } from 'antd';
import { AppstoreOutlined, BarsOutlined } from '@ant-design/icons';

import { useInfiniteScroll, useProducts } from '../core/hooks';
import { ViewMode } from '../core/enums';

import { Button } from '../components/shared';
import { Products } from '../components/products/Products';

// const { Search } = Input;

const ProductListing: React.FC = () => {
  const { products, loading, error, hasMore, loadMore, refresh } = useProducts();
  const [viewMode, setViewMode] = useState<ViewMode>(ViewMode.List);

  useInfiniteScroll({
    loading,
    hasMore,
    loadMore,
    threshold: 300,
  });

  const handleViewModeChange = (mode: ViewMode) => {
    setViewMode(mode);
  };

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ fontSize: '32px', marginBottom: '16px' }}>Product Catalog</h1>

        <Space.Compact>
          <Button label="Grid" type={viewMode === ViewMode.Grid ? 'primary' : 'default'} icon={<AppstoreOutlined />} onClick={() => handleViewModeChange(ViewMode.Grid)} />
          <Button label="List" type={viewMode === ViewMode.List ? 'primary' : 'default'} icon={<BarsOutlined />} onClick={() => handleViewModeChange(ViewMode.List)} />
        </Space.Compact>
        {/* <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '24px',
          }}
        >
          <Search placeholder="Search products..." allowClear enterButton={<SearchOutlined />} size="large" onSearch={handleSearch} style={{ maxWidth: '400px' }} />
        </div> */}
      </div>

      {error && <Alert message="Error" description={error} type="error" showIcon style={{ marginBottom: '24px' }} action={<button onClick={refresh}>Retry</button>} />}

      <Products products={products} loading={loading} viewMode={viewMode} hasMore={hasMore} onLoadMore={loadMore} />
      <FloatButton.BackTop />
    </div>
  );
};

export default ProductListing;
