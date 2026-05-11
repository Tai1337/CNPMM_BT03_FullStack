import { Layout, Button } from 'antd';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const { Header: AntHeader } = Layout;

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <AntHeader style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#001529' }}>
      <div style={{ color: 'white', fontSize: '20px', fontWeight: 'bold' }}>MyApp</div>
      <div>
        {user && (
          <>
            <span style={{ color: 'white', marginRight: '16px' }}>Hello, {user.username}</span>
            <Button type="primary" danger onClick={handleLogout}>Logout</Button>
          </>
        )}
      </div>
    </AntHeader>
  );
};

export default Header;
