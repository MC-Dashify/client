import { useEffect } from 'react';
import InstallPWA from '../hooks/pwa';

import data from '../storage/data';

const VERSION = '0.0.1';

const Root = () => {
  useEffect(() => {
    data.set('etc.version', VERSION);
    console.log(data.get('etc.version'));
  });

  return (
    <>
      루트
      <div>
        <InstallPWA />
      </div>
    </>
  );
};

export default Root;
