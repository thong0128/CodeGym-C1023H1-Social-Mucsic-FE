import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {RxAvatar} from "react-icons/rx";
import {NavLink} from "react-router-dom";

export default function Avatar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    return (
        <div>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >
                <RxAvatar size={40} />
            </Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <NavLink to="/login" activeClassName='active'><MenuItem onClick={handleClose}>Login</MenuItem></NavLink>
                <NavLink to="/register" activeClassName='active'><MenuItem onClick={handleClose}>Register</MenuItem></NavLink>
                <NavLink to="/profile" activeClassName='active'><MenuItem onClick={handleClose}>Profile</MenuItem></NavLink>
                <NavLink to="/change-password" activeClassName='active'><MenuItem onClick={handleClose}>Change Password</MenuItem></NavLink>
                <NavLink to="/login" activeClassName='active'><MenuItem onClick={handleClose}>Logout</MenuItem></NavLink>
            </Menu>
        </div>
    );
}