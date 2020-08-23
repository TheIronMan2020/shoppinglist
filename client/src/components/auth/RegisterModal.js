import {
    Button,
    Modal,
    ModalHeader,
    Form,
    FormGroup,
    Label,
    Input,
    ModalBody,
    NavLink,
    Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import React, { Component } from 'react'
import Proptypes from 'prop-types'
import { register } from '../../actions/authActions'
import { clearErrors } from '../../actions/errorActions'

 class RegisterModal extends Component {
     state = {
         model: false,
         name: '',
         email: '',
         password: '',
         msg: null
     }

    static propTypes = {
        isAuthenticated: Proptypes.bool,
        error: Proptypes.object.isRequired,
        register: Proptypes.func.isRequired,
        clearErrors: Proptypes.func.isRequired
    }

    componentDidUpdate(prevProps){
        const { error, isAuthenticated } = this.props;
        if(error !== prevProps.error) {
            //check for register error
            if(error.id === 'REGISTER_FAIL') {
                this.setState({ msg: error.msg.msg })
            }else{
                this.setState({ msg: null})
            }
        }
        if(this.state.model) {
            if(isAuthenticated) {
                this.toggle();
            }
        }
    }

     toggle = () => {
        //clear errors
        this.props.clearErrors();

        this.setState({model: !this.state.model})
     }

     onChange = (e) => {
         this.setState({
             [e.target.name]: e.target.value
         })
     }

     onSubmit = (e) => {
        e.preventDefault();

        const {name, email, password } = this.state;

        //Create User
        const newUser = {
            name, email, password
        }
        //attempt to register
        this.props.register(newUser)


        
     }

    render() {
        return (
            <div>
                <NavLink onClick={this.toggle} href="#">
                    Register
                </NavLink>
                <Modal
                    isOpen={this.state.model}
                    toggle={this.toggle}
                >
                <ModalHeader toggle={this.toggle}>Add to Shopping List</ModalHeader>
                <ModalBody>
                    { this.state.msg ? <Alert color="danger">{this.state.msg}</Alert> : null}
                    <Form onSubmit={this.onSubmit}>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input 
                                type="text"
                                name="name"
                                id="name"
                                placeholder="name"
                                className="mb-3"
                                onChange={this.onChange}
                            />

                            <Label for="email">email</Label>
                            <Input 
                                type="email"
                                name="email"
                                id="email"
                                placeholder="email"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Label for="password">passsword</Label>
                            <Input 
                                type="password"
                                name="password"
                                id="password"
                                placeholder="password"
                                className="mb-3"
                                onChange={this.onChange}
                            />
                            <Button
                                color="dark"
                                style={{marginBottom: '2rem'}}
                                block
                            >
                                Register
                            </Button>
                        </FormGroup>
                    </Form>
                </ModalBody>
                </Modal>

            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default connect(mapStateToProps, { register, clearErrors })(RegisterModal);