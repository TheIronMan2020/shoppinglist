import React, {Fragment} from 'react';
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
import RegisterModal from '../components/auth/RegisterModal'
import Logout from '../components/auth/Logout'
import LoginModal from '../components/auth/LoginModal'
import { connect } from 'react-redux';
import Proptypes from 'prop-types'
class AppNavbar extends React.Component {
    state = {
        isOpen: false
    }

    static propTypes = {
        auth: Proptypes.object.isRequired
    }

    toggle = () =>{
        this.setState({
            isOpen: !this.state.isOpen
        })
    }

    render() {
        const { isAuthenticated, user } = this.props.auth;

        const authLinks = (
            <Fragment>
                <NavItem>
                    <span className="navbar-text mr-3">
                         <strong>{user ? `Welcome ${user.name}` : ''}</strong>
                    </span>
                </NavItem>
                <NavItem>
                    <Logout />
                </NavItem>
            </Fragment>
        )

        const guestLinks = (
            <Fragment>
                <NavItem>
                    <RegisterModal></RegisterModal>
                </NavItem>
                <NavItem>
                    <LoginModal></LoginModal>
                </NavItem>
             </Fragment>
        )

        return (
            <div>
                <Navbar color="dark" dark expand="sm" className="mb-5">
                    <Container>
                       <NavbarBrand href="/">shppong list</NavbarBrand>
                        <NavbarToggler onClick={this.toggle} />
                        <Collapse isOpen={this.state.isOpen} navbar>
                            <Nav className="ml-auto" navbar>
                                {isAuthenticated ? authLinks : guestLinks}
                            </Nav>
                        </Collapse>

                    </Container>
                </Navbar>
            </div>
        )

    }
}

const mapStateToProps = state => ({
    auth: state.auth
})

export default connect(mapStateToProps, null)(AppNavbar);