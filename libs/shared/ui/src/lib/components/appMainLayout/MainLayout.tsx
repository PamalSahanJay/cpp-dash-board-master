import * as React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Footer from './Footer';
import AppBar from './AppBar';
import Drawer from './Drawer';
import { useTheme } from '@mui/material';
import ContentHolder from './ContentHolder';
import AppAlert from '../alert/AppAlert';
import AppLinearProgress from '../linearProgress/AppLinearProgress';

export function MainLayout({
                               children
                           }: Readonly<{ children?: React.ReactNode }>) {
    const [open, setOpen] = React.useState(false);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const defaultTheme = useTheme();

    return (
        <ThemeProvider theme={defaultTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar open={open} toggleDrawer={toggleDrawer} />
                <Drawer open={open} toggleDrawer={toggleDrawer} />

                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                        paddingTop: '12px'
                    }}
                >
                    <Toolbar />
                    <Box
                        sx={{
                            position: 'fixed',
                            bottom: 16,
                            left: 0,
                            right: 0,
                            display: 'flex',
                            justifyContent: 'center',
                            zIndex: 1300
                        }}
                    >
                        <AppAlert />
                    </Box>
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                        <ContentHolder>{children}</ContentHolder>
                        <Footer sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default MainLayout;
