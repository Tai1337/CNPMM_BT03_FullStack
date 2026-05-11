import { useState } from 'react';
import { Form, Input, Button, Card, Typography, message, Steps } from 'antd';
import { MailOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from '../util/axiosCustomize';

const { Title, Text } = Typography;

const ForgotPassword = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const onFinishEmail = async (values) => {
    try {
      const res = await axios.post('/forgot-password', values);
      if (res.data && res.data.errCode === 0) {
        message.success('Check your email for the reset link!');
        setCurrentStep(1);
      } else {
        message.error(res.data.message || 'Request failed');
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Request failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 450, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Forgot Password</Title>
        <Steps current={currentStep} style={{ marginBottom: 24 }}>
          <Steps.Step title="Email" />
          <Steps.Step title="Done" />
        </Steps>

        {currentStep === 0 && (
          <Form name="forgot_password_form" onFinish={onFinishEmail} layout="vertical">
            <Form.Item name="email" rules={[{ required: true, type: 'email', message: 'Please input a valid email!' }]}> 
              <Input prefix={<MailOutlined />} placeholder="Enter your email" size="large" />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" size="large" block>
                Send Reset Link
              </Button>
            </Form.Item>
            <div style={{ textAlign: 'center' }}>
              <Link to="/login">Back to Login</Link>
            </div>
          </Form>
        )}

        {currentStep === 1 && (
          <div style={{ textAlign: 'center' }}>
            <Text>We have sent a password reset link to your email. Please check your inbox.</Text>
            <div style={{ marginTop: 24 }}>
              <Link to="/login">
                <Button type="primary">Back to Login</Button>
              </Link>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default ForgotPassword;
