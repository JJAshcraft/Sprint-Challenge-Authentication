import React, { Component } from 'react';
import SignIn from './components/SignIn/SignIn'
import JokeList from './components/Jokes/JokeList'
import './App.css';
import {Route} from 'react-router-dom';
import axios from 'axios';

class App extends Component {
state={
  currentUser: '',
  jokes: []
}

      componentDidMount() {
        const token = localStorage.getItem('token');
        console.log('token', token)
        const requestOptions = {
          headers: {
            Authorization: token
          }
        }
        axios
          .get('http://localhost:5000/api/jokes', requestOptions)
          .then(response => {
            console.log('jokelist_response', response)
            this.setState({
              jokes: response.data
            })

          })
      }



  render() {
    return (
      <div className="App">
        <header className="App-header">
   
          <h1 className="App-title">Welcome!</h1>
        </header>
        <Route path='/signin' component={SignIn}/>
         <Route path='/jokes' render={(props)=>{
          return <JokeList jokes = {this.state.jokes} />
         }}/>
        
      </div>
    );
  }
}

export default App;
