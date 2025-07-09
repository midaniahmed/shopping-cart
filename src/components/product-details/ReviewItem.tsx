import { Card, Typography, List, Space, Avatar } from 'antd';
import { MessageOutlined, LikeOutlined, UserOutlined } from '@ant-design/icons';

import { Review } from '../../core/types';
import { DateUtils } from '../../core/utils';
import { Rating } from '../shared';

const { Text, Paragraph } = Typography;

export const ReviewItem = (item: Review) => (
  <List.Item key={item.id}>
    <Card style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
        <Avatar size={48} src={item.avatar} icon={<UserOutlined />} />
        <div style={{ flex: 1 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
            <Text strong>{item.user}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {DateUtils.format(item.date)}
            </Text>
          </div>

          <Rating value={item.rating} style={{ marginBottom: '8px' }} size="14px" indicator />

          <Paragraph style={{ marginBottom: '12px', color: '#666' }} ellipsis={{ rows: 3, expandable: true, symbol: 'more' }}>
            {item.comment}
          </Paragraph>

          <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
            <Space>
              <LikeOutlined style={{ color: '#1890ff' }} />
              <Text type="secondary">{item.likes}</Text>
            </Space>
            <Space>
              <MessageOutlined style={{ color: '#52c41a' }} />
              <Text type="secondary">{item.replies} replies</Text>
            </Space>
          </div>
        </div>
      </div>
    </Card>
  </List.Item>
);
