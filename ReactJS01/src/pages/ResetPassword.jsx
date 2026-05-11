import { Form, Input, Button, Card, Typography, message } from 'antd';
import { LockOutlined } from '@ant-design/icons';
import { useNavigate, useSearchParams } from 'react-router-dom';
import axios from '../util/axiosCustomize';

const { Title } = Typography;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token');

  const onFinish = async (values) => {
    if (!token) {
      message.error('Invalid token!');
      return;
    }
    try {
      const res = await axios.post('/reset-password', {
        token,
        newPassword: values.password
      });
      if (res.data && res.data.errCode === 0) {
        message.success('Password reset successfully!');
        navigate('/login');
      } else {
        message.error(res.data.message || 'Reset failed');
      }
    } catch (err) {
      message.error(err.response?.data?.message || 'Reset failed');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#f0f2f5' }}>
      <Card style={{ width: 400, boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
        <Title level={2} style={{ textAlign: 'center', marginBottom: 24 }}>Reset Password</Title>
        <Form name="reset_password_form" onFinish={onFinish} layout="vertical">
          <Form.Item name="password" rules={[{ required: true, message: 'Please input your new password!' }]}> 
            <Input.Password prefix={<LockOutlined />} placeholder="New Password" size="large" />
          </Form.Item>
          <Form.Item 
            name="confirmPassword" 
            dependencies={['password']}
            rules={[
              { required: true, message: 'Please confirm your new password!' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('The two passwords do not match!'));
                },
              }),
            ]}
          > 
            <Input.Password prefix={<LockOutlined />} placeholder="Confirm New Password" size="large" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block>
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </div>
  );
};

export default ResetPassword;
