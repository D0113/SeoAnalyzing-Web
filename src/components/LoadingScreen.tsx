import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface ILoadingScreenProps {
    isOpen: boolean;
}

const LoadingScreen: React.FC<ILoadingScreenProps> = ({ isOpen }) => {
  return (
    <>
      <Backdrop
        sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
        open={isOpen}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}

export default LoadingScreen;