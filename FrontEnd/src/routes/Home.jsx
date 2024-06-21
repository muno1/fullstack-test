import { useState } from 'react';
import { Button } from 'antd';
import ContentPanel from '../components/core/layout/ContentPanel';
import IncomePage from './IncomePage';

const Home = () => {
  const [loading] = useState(false);
  return (
    <ContentPanel
      titleAction={
        <Button shape="round" type="primary">
          Switch
        </Button>
      }
      title="Fullstack Test"
      loading={loading}
    >
      <IncomePage />
    </ContentPanel>
  );
};

export default Home;
