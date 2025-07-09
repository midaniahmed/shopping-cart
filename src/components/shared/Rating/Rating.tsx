import { CSSProperties } from 'react';
import { Rate, Typography } from 'antd';

interface RatingProps {
  value: number;
  size?: string;
  indicator?: boolean;
  style?: CSSProperties;
}
export const Rating = ({ value, style, indicator, size }: RatingProps) => (
  <div style={style}>
    <Rate disabled defaultValue={value} style={{ fontSize: size }} />
    {indicator && (
      <Typography.Text type="secondary" style={{ marginLeft: '8px' }}>
        ({value}/5)
      </Typography.Text>
    )}
  </div>
);
