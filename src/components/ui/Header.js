import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {AppBar, Toolbar} from '@material-ui/core';
import {Tab, Tabs} from '@material-ui/core';
import {Button, IconButton} from '@material-ui/core';
import { Typography, useScrollTrigger, useMediaQuery,  } from '@material-ui/core';
import {Menu, MenuItem} from '@material-ui/core';
import {List, ListItem, ListItemText, ListItemIcon, Divider} from '@material-ui/core';

//Drawer stuff
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import MenuIcon from '@material-ui/icons/Menu';

//Icons
import HouseIcon from '@material-ui/icons/Home';
import BulbIcon from '@material-ui/icons/WbIncandescent';
import SceneIcon from '@material-ui/icons/Theaters';
import BridgeIcon from '@material-ui/icons/Router';
import DevicesOtherIcon from '@material-ui/icons/DevicesOther';
import InfoIcon from '@material-ui/icons/Info';

const menuOptions = [
    {
        uri: '/',
        text: 'Home',
        icon: <HouseIcon/>,
    },
    {
        uri: '/bridge',
        text: 'Bridge',
        icon: <BridgeIcon/>,
    },
    {
        uri: '/lights',
        text: 'Lights',
        icon: <BulbIcon/>,
    },
    {
        uri: '/other',
        text: 'Other Devices',
        icon: <DevicesOtherIcon/>,
    },
    {
        uri: '/about',
        text: 'About App',
        icon: <InfoIcon/>,
    }
];

const useStyles = makeStyles(theme => ({
    toolbarMargin: {
        ...theme.mixins.toolbar,
    },
    homeButton: {
        margin: 0,
    },
    tab: {
        ...theme.typography.tab,
    },
    titleText: {
        marginLeft: "auto",
        fontWeight: "300"
    },
    drawerIcon: {
        width:  "40px",
        height: "40px"
    },
    drawerIconContainer: {
        marginRight: "auto"
    },
    list: {
        width: '100%',
        maxWidth: 360
    }
}));

function ElevationScroll(props) {
    const { children } = props;

    const trigger = useScrollTrigger({
      disableHysteresis: true,
      threshold: 0,
    });
  
    return React.cloneElement(children, {
      elevation: trigger ? 4 : 0,
    });
};

function Header(props) {
    const classes = useStyles();
    const theme = useTheme();
    const matches = useMediaQuery(theme.breakpoints.down("sm"));


    const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [value, setValue] = useState(99);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (e, newValue) => {
        setValue(newValue);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const ListItemLink = (props) => {
        return <ListItem 
                    button 
                    onClick={() => {setOpenDrawer(false);}} 
                    component={Link} {...props} 
                    />
    };

    useEffect(() => {
        if (window.location.pathname === "/" && value !== 99) {
            setValue(99);
        } 
        else if (window.location.pathname === "/bridge" && value !== 0) {
            setValue(0);
        }  
        else if (window.location.pathname === "/scenes" && value !== 1) {
            setValue(1);
        }  
        else if (window.location.pathname === "/lights" && value !== 2) {
            setValue(2);
        }  
        else if (window.location.pathname === "/other" && value !== 3) {
            setValue(3);
        }       
    }, [value]);

    const tabs = (
        <>
            <IconButton component={Link} to='/' className={classes.homeButton} onClick={() => { setValue(99); }}>
                <HouseIcon />
            </IconButton>
            <Tabs value={value} onChange={handleChange}>
                <Tab className={classes.tab} label="Bridge" component={Link} to='/bridge' disableRipple />
                <Tab className={classes.tab} label="Scenes" component={Link} to='/scenes' disableRipple/>
                <Tab className={classes.tab} label="Lights" component={Link} to='/lights' disableRipple/>
                <Tab className={classes.tab} label="Other Devices" component={Link} to='/other' disableRipple/>
            </Tabs>

        </>
    );

    const drawer = (
        <>
            <SwipeableDrawer 
                disableBackdropTransition={!iOS} 
                disableDiscovery={iOS} 
                open={openDrawer} 
                onClose={() => { setOpenDrawer(false); }} 
                onOpen={() => {setOpenDrawer(true); }}
                >
                    <List component="nav" className={classes.list}>
                        {menuOptions.map(menuOpt => {

                            return (
                                <ListItemLink to={menuOpt.uri} >
                                <ListItemIcon>
                                    {menuOpt.icon}
                                </ListItemIcon>
                                <ListItemText primary={menuOpt.text} />
                                </ListItemLink>   
                            );
                        })}

                    </List>
                


            </SwipeableDrawer>
            <IconButton
                className={classes.drawerIconContainer}
                onClick={() => {setOpenDrawer(!openDrawer);}}
                disableRipple
            >
                <MenuIcon className={classes.drawerIcon} />
            </IconButton>
        </>
    );

    return (
        <>
        <ElevationScroll>
            <AppBar>
                <Toolbar>
                    {matches ? drawer : tabs}
                    <Button className={classes.titleText} onClick={handleClick} disableRipple><Typography variant="h5" className={classes.titleText}>Hue App</Typography></Button>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => {setValue(99); handleClose();}} component={Link} to='/about'>About</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
        </ElevationScroll>
        <div className={classes.toolbarMargin} />
        </>
    );
};

export default Header;