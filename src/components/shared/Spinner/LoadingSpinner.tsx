import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

interface LoadingSpinnerProps {
  size?: 'small' | 'default' | 'large';
  text?: string;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = 'default', text = 'Loading...' }) => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '40px',
        flexDirection: 'column',
        gap: '16px',
      }}
    >
      <Spin indicator={<LoadingOutlined style={{ fontSize: 48 }} spin />} size={size} />
      <span style={{ color: '#666' }}>{text}</span>
    </div>
  );
};
