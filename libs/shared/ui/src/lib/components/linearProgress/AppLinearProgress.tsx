import React from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { useProgressStore } from '../../models/linearProgress';

const AppLinearProgress = () => {
    const isProgressBarVisible = useProgressStore((state) => state.isProgressBarVisible);

    if (!isProgressBarVisible) return null;
    return <LinearProgress color="success" />;
};

export default AppLinearProgress;
