import { styled } from '@mui/material/styles';
import MuiDrawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import { drawerWidth } from '../../const/LayourConst';
import { ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React from 'react';
import { Contacts, Home } from '@mui/icons-material';

const StyledDrawer = styled(MuiDrawer, {
    shouldForwardProp: (prop) => prop !== 'open'
})(({ theme, open }) => ({
    '& .MuiDrawer-paper': {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen
        }),
        boxSizing: 'border-box',
        ...(!open && {
            overflowX: 'hidden',
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen
            }),
            width: theme.spacing(0),
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(0)
            }
        })
    }
}));

export default function Drawer({ toggleDrawer, open }: Readonly<{ toggleDrawer: () => void; open: boolean; }>) {
    return (
        <StyledDrawer variant="permanent" open={open}>
            <Toolbar
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                    px: [1]
                }}
            >
                <IconButton onClick={toggleDrawer}>
                    <ChevronLeftIcon />
                </IconButton>
            </Toolbar>
            <Divider />
            <List>
                <ListItem key='Home' disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Home/>
                        </ListItemIcon>
                        <ListItemText primary='Home' />
                    </ListItemButton>
                </ListItem>

                <ListItem key='About' disablePadding>
                    <ListItemButton>
                        <ListItemIcon>
                            <Contacts/>
                        </ListItemIcon>
                        <ListItemText primary='About' />
                    </ListItemButton>
                </ListItem>
            </List>
            <Divider />
        </StyledDrawer>
    );
}
