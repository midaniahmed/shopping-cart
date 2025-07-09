import React, { useMemo, useCallback } from 'react';
import { WindowScroller, List, AutoSizer, ListRowRenderer } from 'react-virtualized';
import { Col, Row, Grid } from 'antd';

import { BREAKPOINT_COLUMNS } from '../../../core/utils/constants';
import { Product } from '../../../core/types';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  rowHeight?: number;
}

const GUTTER_SIZE = 16;
const DEFAULT_ROW_HEIGHT = 440;

export const ProductGridView: React.FC<ProductGridProps> = ({ products, rowHeight = DEFAULT_ROW_HEIGHT }) => {
  const screens = Grid.useBreakpoint();

  const itemsPerRow = useMemo(() => {
    if (screens.lg) return BREAKPOINT_COLUMNS.lg.count;
    if (screens.md) return BREAKPOINT_COLUMNS.md.count;
    if (screens.sm) return BREAKPOINT_COLUMNS.sm.count;
    return BREAKPOINT_COLUMNS.xs.count;
  }, [screens.lg, screens.md, screens.sm]);

  const productRows = useMemo(() => {
    if (!products.length) return [];

    const rows: Product[][] = [];
    for (let i = 0; i < products.length; i += itemsPerRow) {
      rows.push(products.slice(i, i + itemsPerRow));
    }
    return rows;
  }, [products, itemsPerRow]);

  const rowRenderer: ListRowRenderer = useCallback(
    ({ index, key, style }) => {
      const rowProducts = productRows[index];

      if (!rowProducts?.length) return null;

      return (
        <div key={key} style={style}>
          <Row gutter={[GUTTER_SIZE, GUTTER_SIZE]} style={{ margin: 0 }} justify="center">
            {rowProducts.map((product) => (
              <Col key={product.id} xs={BREAKPOINT_COLUMNS.xs.span} sm={BREAKPOINT_COLUMNS.sm.span} md={BREAKPOINT_COLUMNS.md.span} lg={BREAKPOINT_COLUMNS.lg.span}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </div>
      );
    },
    [productRows]
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
              rowCount={productRows.length}
              rowHeight={rowHeight}
              rowRenderer={rowRenderer}
              scrollTop={scrollTop}
              width={width}
              overscanRowCount={2}
              style={{ outline: 'none' }}
            />
          )}
        </AutoSizer>
      )}
    </WindowScroller>
  );
};
