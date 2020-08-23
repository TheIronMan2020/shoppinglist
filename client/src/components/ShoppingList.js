import React from 'react';
import {Container, ListGroup, ListGroupItem, Button} from 'reactstrap';
import {CSSTransition, TransitionGroup } from 'react-transition-group';
import { connect } from 'react-redux';
import { getItems, deleteItem } from '../actions/itemAction';
import Proptypes from 'prop-types'

class ShoppingList extends React.Component {
    componentWillMount() {
        this.props.getItems();
        
    }

    static propType = {
        getItems: Proptypes.func.isRequired,
        item: Proptypes.object.isRequired,
        isAuthenticated: Proptypes.bool
    }

    onDeleteClick = (id) => {
        this.props.deleteItem(id);
    }

    render() {
        
        const {items} = this.props.item;
        console.log(items)
        return (
            <Container>
                {/* <Button 
                color="dark"
                style={{marginBottom: '2rem'}}
                onClick={()=>{
                    const name = prompt('Enter item');
                    if(name){
                        this.setState(state => {
                            return {items: [...state.items, {id: uuid(), name: name}]}
                        })
                    }
                }}
                >Add Item */}
                {/* </Button> */}
                <ListGroup>
                    <TransitionGroup className="shopping-list">
                        {items.map(({ _id, name }) => {
                            return <CSSTransition key={_id} timeout={500} classNames="fade">
                                    <ListGroupItem>
                                        {this.props.isAuthenticated ? <Button
                                        style={{float: 'left'}}
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;
                                        </Button> : null}

                                        {name}
                                    </ListGroupItem>

                                </CSSTransition>
                        
                                    
                        })}
                    </TransitionGroup>
                </ListGroup>
            </Container>
        );
    }
}


const mapStateToProps = (state) => ({
    item: state.item,
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);