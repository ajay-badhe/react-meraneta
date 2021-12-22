import Button from '@restart/ui/esm/Button'
import React, { useEffect, useState } from 'react'
import { Container, Navbar, Nav, Form, FormControl, NavDropdown } from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
const Header = (props) => {


    let navigate = useNavigate();
    const [uName, setUName] = useState('')
    const [toggle, setToogle] = useState(false)

    const logoutHandler = () => {
        localStorage.clear()
        navigate("/")
    }

    const toggleMenu = () => {
        setToogle(!toggle)
        props.getToggle(toggle)
    }

    useEffect(() => {
        setUName(JSON.parse(localStorage.getItem("userName")))
    }, [])

    return (
        <Navbar className="navbar" expand="lg">
            <Container fluid>
                <div className="menu" onClick={toggleMenu}>
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
                <Navbar.Brand href="#" className="text-info">Office Management System</Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        style={{ maxHeight: '100px' }}
                        navbarScroll
                    >
                        <Link className="nav-link" to={'/register/list'}>  Register </Link>
                        <Link className="nav-link" to={'/call'}>  Call </Link>
                        <Link className="nav-link" to={'/visitor'}>  Visitor </Link>
                    </Nav>
                    <Form className="d-flex">
                        <FormControl
                            type="search"
                            placeholder="Search"
                            className="me-2"
                            aria-label="Search"
                        />
                        <Button className="btn btn-warning">Search</Button>
                    </Form>
                    <NavDropdown title="Profile" id="basic-nav-dropdown">
                        <NavDropdown.Item >{`Welcome ${uName}`}</NavDropdown.Item>
                        <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                    </NavDropdown>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
// export { isToggle }
