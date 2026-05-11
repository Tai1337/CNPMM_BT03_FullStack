import { Layout } from 'antd';

const { Footer: AntFooter } = Layout;

const Footer = () => {
  return (
    <AntFooter style={{ textAlign: 'center' }}>
      My App ©2023 Created by Nguyen
    </AntFooter>
  );
};

export default Footer;
