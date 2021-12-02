/* eslint-disable react-hooks/rules-of-hooks */
import React from 'react'
import { Navbar, NavbarBrand, Collapse, NavbarToggler, Nav, NavItem, UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem, Button, ButtonGroup } from 'reactstrap';
import { FaUserCircle, FaSignOutAlt } from "react-icons/fa";
import { useMatch, useNavigate } from 'react-router-dom'

const Topmenu = () => {
    const dashboard = useMatch('/dashboard/*');
    const tasks = useMatch('/tasks/*');
    const navigate = useNavigate();

    const changeRoute = (route) => {
        navigate(route);
    }
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
                                <Button color={dashboard ? 'secondary' : 'transparent'} className='rounded-pill' onClick={() => changeRoute('/dashb')}>
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
                                Customer
                            </DropdownToggle>
                            <DropdownMenu end>
                                <DropdownItem>
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