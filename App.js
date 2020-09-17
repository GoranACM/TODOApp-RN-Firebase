/* 
* Created by: Goran Ilievski
*
* September 2020
*
* TODOApp
*/

import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

// Firebase config
import { firebaseConfig } from './config/firebase';
// Firebase library
import * as firebase from 'firebase';
// Initialize application
if (!firebase.apps.length) {
  firebase.initializeApp( firebaseConfig );
}
// Other imports
import { Container, Content, Header, Form, Input, Item, Button, Label } from 'native-base'

export default function App() {
  return (
    <Container style={ styles.container }>
      <Form>
        {/* Item from native base with a flating label */}
        <Item floatingLabel>
          <Label>Email</Label>
          <Input 
            autoCorrect={ false }
            autoCapitalize="none"
          />
        </Item>
        <Item floatingLabel>
          <Label>Password</Label>
          <Input 
            secureTextEntry={ true }
            autoCorrect={ false }
            autoCapitalize="none"
          />
        </Item>
        <Button
          style={ styles.loginButton }
          full
          rounded
          success
        >
          <Text>Login</Text>
        </Button>
      </Form>
    </Container>
  );
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
});
