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
                                        
                                        <Button
                                        style={{float: 'left'}}
                                        className="remove-btn"
                                        color="danger"
                                        size="sm"
                                        onClick={this.onDeleteClick.bind(this, _id)}
                                        >&times;
                                        </Button>

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

ShoppingList.propType = {
    getItems: Proptypes.func.isRequired,
    item: Proptypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
})

export default connect(mapStateToProps, { getItems, deleteItem })(ShoppingList);