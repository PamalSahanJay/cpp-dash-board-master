import { styled } from '@mui/material/styles';
import MuiAppBar, { AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import NotificationsIcon from '@mui/icons-material/Notifications';
import logo from '../../assets/logo-black.svg';
import Box from '@mui/material/Box';
import { drawerWidth } from '../../const/LayourConst';
import Search from './Search';
import AppLinearProgress from '../linearProgress/AppLinearProgress';

import * as React from 'react';

interface AppBarProps extends MuiAppBarProps {
    open?: boolean;
}

const StyledBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open'
})<AppBarProps>(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    backgroundColor: theme.palette.background.paper,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        })
    })
}));

const Logo = styled('img')({
    maxWidth: '110px'
});

export default function AppBar({
                                   toggleDrawer,
                                   open
                               }: Readonly<{
    toggleDrawer: () => void;
    open: boolean;
}>) {
    return (
        <StyledBar position="absolute" open={open}>
            <Toolbar
                sx={{
                    pr: '24px' // keep right padding when drawer closed
                }}
            >
                <IconButton
                    edge="start"
                    color="primary"
                    aria-label="open drawer"
                    onClick={toggleDrawer}
                    sx={{
                        marginRight: '36px',
                        ...(open && { display: 'none' })
                    }}
                >
                    <MenuIcon />
                </IconButton>
                <Box
                    sx={{
                        flexGrow: 1,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'start'
                    }}
                >
                    <Box
                        sx={{
                            flexGrow: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center'
                        }}
                    >
                        <Logo src={logo} alt="Wiley Logo!" />
                        <Typography
                            component="h6"
                            variant="overline"
                            color="black"
                            noWrap
                            sx={{ flexGrow: 1, fontWeight: 'bold', marginTop: '-16px' }}
                        >
                            CCP Dashboard
                        </Typography>
                    </Box>
                </Box>
                <Search />
                <IconButton color="primary">
                    <Badge badgeContent={1} color="secondary">
                        <NotificationsIcon />
                    </Badge>
                </IconButton>
            </Toolbar>
            <AppLinearProgress />
        </StyledBar>
    );
}
