import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Button from '@material-ui/core/Button';
import HouseIcon from '@material-ui/icons/Home';
import { Typography } from '@material-ui/core';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';


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
    }
}));


function Header(props) {
    const classes = useStyles();
    const [value, setValue] = useState(99);
    const [anchorEl, setAnchorEl] = useState(null);

    const handleChange = (e, value) => {
        setValue(value);
    };

    const handleClick = (e) => {
        setAnchorEl(e.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
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

    return (
        <>
            <AppBar>
                <Toolbar>
                    <Button component={Link} to='/' className={classes.homeButton} onClick={() => { setValue(99); }}>
                        <HouseIcon />
                    </Button>
                    <Tabs value={value} onChange={handleChange}>
                        <Tab className={classes.tab} label="Bridge" component={Link} to='/bridge' disableRipple />
                        <Tab className={classes.tab} label="Scenes" component={Link} to='/scenes' disableRipple/>
                        <Tab className={classes.tab} label="Lights" component={Link} to='/lights' disableRipple/>
                        <Tab className={classes.tab} label="Other Devices" component={Link} to='/other' disableRipple/>
                    </Tabs>
                    <Button className={classes.titleText} onClick={handleClick} disableRipple><Typography variant="h5" className={classes.titleText}>Hue App</Typography></Button>
                    <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
                        <MenuItem onClick={() => {setValue(99); handleClose();}} component={Link} to='/about'>About</MenuItem>
                    </Menu>
                </Toolbar>
            </AppBar>
            <div className={classes.toolbarMargin} />
        </>
    );
};

export default Header;