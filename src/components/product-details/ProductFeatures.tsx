import { Row, Col, Typography } from 'antd';
const { Text } = Typography;

export const ProductFeatures = () => (
  <Row gutter={[16, 16]}>
    <Col xs={24} sm={12} md={8}>
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🚚</div>
        <Text strong>Free Shipping</Text>
        <div style={{ color: '#666' }}>Orders over $100</div>
      </div>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>🔄</div>
        <Text strong>Easy Returns</Text>
        <div style={{ color: '#666' }}>30-day return policy</div>
      </div>
    </Col>
    <Col xs={24} sm={12} md={8}>
      <div style={{ textAlign: 'center', padding: '16px' }}>
        <div style={{ fontSize: '24px', marginBottom: '8px' }}>⚡</div>
        <Text strong>Fast Delivery</Text>
        <div style={{ color: '#666' }}>2-3 business days</div>
      </div>
    </Col>
  </Row>
);
