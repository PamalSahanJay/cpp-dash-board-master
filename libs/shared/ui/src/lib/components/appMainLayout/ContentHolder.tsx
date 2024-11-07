import Grid from '@mui/material/Grid';
import React from 'react';

export default function ContentHolder({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <Grid container spacing={3}>
            {children}
        </Grid>
    );
}
