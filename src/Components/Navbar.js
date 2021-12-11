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
                color="light"
                expand="md"
                light
                className='px-3'
            >
                <NavbarBrand href="/">
                    Customer Management System
                </NavbarBrand>
                <NavbarToggler onClick={function noRefCheck() { }} />
                <Collapse navbar>
                    <Nav
                        className="w-100"
                        navbar
                    >
                        <NavItem className="ms-auto" style={{ marginRight: '24px' }}>
                            <ButtonGroup className='border rounded-pill'>
                                <Button color={dashboard ? 'secondary' : 'transparent'} className='rounded-pill' onClick={() => changeRoute('/dashboard')}>
                                    Dashboard
                                </Button>
                                <Button color={tasks ? 'secondary' : 'transparent'} className='rounded-pill' onClick={() => changeRoute('/tasks')}>
                                    Task
                                </Button>
                            </ButtonGroup>
                        </NavItem>
                        <UncontrolledDropdown>
                            <DropdownToggle caret nav>
                                <FaUserCircle className='me-2' />
                                {user ? user.fullname : 'User'}
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