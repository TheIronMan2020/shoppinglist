import React from 'react';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavLink,
    Container,
    NavItem,
    NavbarBrand
} from 'reactstrap';

class AppNavbar extends React.Component {
    state = {
        isOpen: false
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                       <NavbarBrand href="/">shppong list</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="https://www.google.com"> google</NavLink>
                                </NavItem>
                                
                            </Nav>
                        </Collapse>

                    </Container>
                </Navbar>
            </div>
        )

    }
}


export default AppNavbar;