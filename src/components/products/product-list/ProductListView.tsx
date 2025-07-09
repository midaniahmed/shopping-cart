import React from 'react';
import { WindowScroller, List, AutoSizer, ListRowProps } from 'react-virtualized';

import { Product } from '../../../core/types';
import { ProductListItem } from './ProductListItem';

interface ProductGridProps {
  products: Product[];
}

export const ProductListView: React.FC<ProductGridProps> = ({ products }) => {
  const rowRenderer = ({ index, key, style }: ListRowProps) => (
    <div key={key} style={style}>
      <ProductListItem product={products[index]} />
    </div>
  );

  return (
    <WindowScroller>
      {({ height, isScrolling, onChildScroll, scrollTop }) => (
        <AutoSizer disableHeight>
          {({ width }) => (
            <List
              autoHeight
              height={height}
              isScrolling={isScrolling}
              onScroll={onChildScroll}
              rowCount={products.length}
              rowRenderer={rowRenderer}
              scrollTop={scrollTop}
              width={width}
              rowHeight={200}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};
