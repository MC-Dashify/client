import React, { useEffect, useState } from 'react';

const InstallPWA = ({ title, content }) => {
  const [supportsPWA, setSupportsPWA] = useState(false);
  const [promptInstall, setPromptInstall] = useState(null);

  useEffect(() => {
    const handler = (e) => {
      e.preventDefault();

      setSupportsPWA(true);
      setPromptInstall(e);
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const onClick = (e) => {
    e.preventDefault();

    if (promptInstall) {
      promptInstall.prompt();
    }
  };

  return (
    supportsPWA && (
      <button aria-label={title} title={title} onClick={onClick}>
        {content}
      </button>
    )
  );
};

export default InstallPWA;
