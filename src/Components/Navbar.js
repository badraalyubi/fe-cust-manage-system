/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useMatch, useNavigate } from 'react-router-dom'
import { logout } from '../services/api';
import { getUser } from '../services/utils';

const Topmenu = () => {
    const dashboard = useMatch('/dashboard/*');
    const tasks = useMatch('/tasks/*');
    const navigate = useNavigate();
    const [user, setUser] = React.useState(null);

    const changeRoute = (route) => {
        navigate(route);
    }

    const logoutUser = async () => {
        const isLogout = await logout();
        if (isLogout) {
            navigate('/login');
        }
    }

    React.useEffect(() => {
        setUser(getUser());
    }, [])
    return (
        <div>
            <Navbar
                // color="light"
                expand="md"
                light
                className='px-3'
                style={{ backgroundColor: '#406882' }}
            >
                <NavbarBrand href="/" className='text-white'>
                    Customer Management System
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="w-100"
                        navbar
                    >
                        <NavItem className="ms-auto" style={{ marginRight: '24px' }}>
                            <ButtonGroup className='rounded-pill'>
                                <Button style={{ backgroundColor: dashboard ? '#fff' : '#406882', color: dashboard ? '#406882' : '#fff' }} color="default" className='rounded-pill' onClick={() => changeRoute('/dashboard')}>
                                    Dashboard
                                </Button>
                                <Button style={{ backgroundColor: tasks ? '#fff' : '#406882', color: tasks ? '#406882' : '#fff' }} color="default" className='rounded-pill' onClick={() => changeRoute('/tasks')}>
                                    Task
                                </Button>
                            </ButtonGroup>
                        </NavItem>
                        <UncontrolledDropdown>
                            <DropdownToggle caret nav>
                                <FaUserCircle className='me-2' style={{ color: '#fff' }} />
                                <span style={{ color: '#fff' }}>{user ? user.fullname : 'User'}</span>
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem onClick={logoutUser}>
                                    <FaSignOutAlt className='me-2' />
                                    Logout
                                </DropdownItem>
                            </DropdownMenu>
                        </UncontrolledDropdown>
                    </Nav>
                </Collapse>
            </Navbar>
        </div>
    )
};

export default Topmenu;