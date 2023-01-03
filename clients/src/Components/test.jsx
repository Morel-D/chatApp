const Test = () => {
    return ( 
        <Navbar bg="light" expand="lg">
        <Container>
            <Navbar.Brand href="/"> <img src={logo3} id="logo" /> </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ms-auto">
                        <NavDropdown title="mtchaptche@gmail.com" id="basic-nav-dropdown">
                         <NavDropdown.Item href="#action/3.1">My Profile</NavDropdown.Item>
                         <NavDropdown.Item href="#action/3.2">
                             Logout
                         </NavDropdown.Item>
                     </NavDropdown>  
                </Nav>
            </Navbar.Collapse>
        </Container>
    </Navbar>
     );
}
 
export default Test;