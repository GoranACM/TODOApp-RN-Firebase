/* 
* Created by: Goran Ilievski
*
* September 2020
*
* TODOApp
*/

import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Facebook from 'expo-facebook'; 

// Firebase config
import { firebaseConfig } from './config/firebase';
// Firebase library
import * as firebase from 'firebase';
// Initialize application
if (!firebase.apps.length) {
  firebase.initializeApp( firebaseConfig );
}
// Component imports
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default class App extends Component {

  constructor( props ) {
    super( props )

    this.state = ({
      email: '',
      password: ''
    })
  }

  // Method to check FB login 
  componentDidMount() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user != null) {
        console.log(user)
      }
    })
  }

  // Method for email sign up with Firebase
  userSignUp = ( email, password ) => {
    try {
        if (this.state.password.length < 6) {
            alert("Password must me more than 6 characters!", "Password error!")
            return;
        }

        firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        
    }
  }
  
  // Method for email log in with Firebase
  userLogIn = ( email, password ) => {
      try {
        firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
          console.log(user)
        })
      } catch (error) {
        
      }
  }

  // Method for Facebook login
  async loginWithFacebook() {
    try {
      await Facebook.initializeAsync('380416466684689');
      const { type, token } = await Facebook.logInWithReadPermissionsAsync({ permissions: ['public_profile', 'email'] });
      if (type === 'success') {
        // Get the user's name using Facebook's Graph API
        const response = await fetch(`https://graph.facebook.com/me?access_token=${token}`);
        Alert.alert('Logged in!', `Hi ${(await response.json()).name}!`);
      } else {
        // type === 'cancel'
      }
    } catch (error) {
      alert(`Facebook Login Error: ${message}`);
    }

    // if (type == 'success') {
    //   const credential = firebase.auth.FacebookAuthProvider.credential(token)

    //   firebase.auth().signInWithCredential(credential).catch((error) => {
    //     console.log(error)
    //   })
    // }
  }
  
  render() {
    return (
      <Container style={ styles.container }>
          <Form>
          {/* Item from native base with a flating label */}
          <Item floatingLabel>
              <Label>Email</Label>
              <Input 
              autoCorrect={ false }
              autoCapitalize="none"
              onChangeText={ (email) => this.setState({ email }) }
              />
          </Item>
          <Item floatingLabel>
              <Label>Password</Label>
              <Input 
              secureTextEntry={ true }
              autoCorrect={ false }
              autoCapitalize="none"
              onChangeText={ (password) => this.setState({ password }) }
              />
          </Item>
          <Button
              style={ styles.loginButton }
              full
              rounded
              success
              onPress={ () => this.userLogIn(this.state.email, this.state.password) }
          >
              <Text style={ styles.buttonText }>Login</Text>
          </Button>
          <Button
              style={ styles.signupButton }
              full
              rounded
              primary
              onPress={ () => this.userSignUp(this.state.email, this.state.password) }
          >
              <Text style={ styles.buttonText }>Sign Up</Text>
          </Button>
          <Button
              style={ styles.signupButton }
              full
              rounded
              primary
              onPress={ () => this.loginWithFacebook() }
          >
              <Text style={ styles.buttonText }>FB login</Text>
          </Button>
          </Form>
      </Container>
    )
  }
  
}

const styles = StyleSheet.create({
container: {
  flex: 1,
  backgroundColor: '#fff',
  justifyContent: 'center',
  padding: 10,
},
loginButton: {
  marginTop: 10,
},
signupButton: {
  marginTop: 10,
},
buttonText: {
  color: '#fff'
}
});

