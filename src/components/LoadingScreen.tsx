import * as React from 'react';
import { Backdrop, CircularProgress } from '@mui/material';

interface LoadingScreenProps {
    isOpen: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isOpen }) => {
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