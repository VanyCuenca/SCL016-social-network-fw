import React from 'react';
import Login from './components/Login';
import Navbar from './components/Navbar';
import Profile from './components/Profile';
import Home from './components/Home';
import firebase from 'firebase/app';

import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';


const App = () => {

  const [firebaseUser, setFirebaseUser] = React.useState(false)

  React.useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      console.log(user)
      if(user){
        setFirebaseUser(user)
        // eslint-disable-next-line no-lone-blocks
        // {
        //   eslint-disable-next-line no-unused-expressions
        //   firebaseUser !== null ? ('history.push{"/Home", "/profile" }') :
        //   ('history.push{Login}')

        // }
      }else{
        setFirebaseUser(null)
      }
    })

  }, [firebaseUser])

  return firebaseUser !== false ? ( 
    <Router>
      <div className= "container mt-3">
        <Navbar firebaseUser={firebaseUser} />
        <Switch>
          <Route component={Home} path="/home" exact/>
          <Route component={Profile} path="/profile" exact/>
          <Route component={Login} path="/" exact/>
        </Switch>
      </div>
    </Router>
  ) : (
    <p>Loading ChinChin...</p>
  )
}

export default App;