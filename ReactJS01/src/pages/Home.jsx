import { useEffect, useState } from 'react';
import { Card, Typography } from 'antd';
import axios from '../util/axiosCustomize';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const { Title, Text } = Typography;

const Home = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const res = await axios.get('/home');
        setData(res.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchHomeData();
  }, []);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header />
      <div style={{ flex: 1, padding: '50px', background: '#f0f2f5' }}>
        <Card style={{ maxWidth: 600, margin: '0 auto', textAlign: 'center' }}>
          <Title level={2}>Home Dashboard</Title>
          {data ? (
            <div>
              <Text strong style={{ fontSize: '18px' }}>{data.message}</Text>
              <div style={{ marginTop: '20px' }}>
                <p>Username: {data.user?.username}</p>
                <p>Email: {data.user?.email}</p>
                <p>Role: {data.user?.role}</p>
              </div>
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </Card>
      </div>
      <Footer />
    </div>
  );
};

export default Home;
