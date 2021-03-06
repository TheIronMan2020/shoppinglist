import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import AppNavbar from './components/AppNavbar'
import ShoppingList from './components/ShoppingList';
import { Container } from 'reactstrap';
import { Provider } from 'react-redux';
import store from './store';
import ItemModel from './components/ItemModel';
import { loadUser } from './actions/authActions'

class  App extends React.Component {
  componentDidMount() {
    store.dispatch(loadUser());
  }

  render() {
    return <Provider store={store}>
      <div className="App">
        <AppNavbar></AppNavbar>
        <Container>
         <ItemModel></ItemModel>
         <ShoppingList></ShoppingList>
        </Container>
      </div>
    </Provider>
  }
}

export default App;
