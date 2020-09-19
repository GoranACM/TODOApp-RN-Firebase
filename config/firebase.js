/* 
* Created by: Goran Ilievski
*
* September 2020
*
* TODOApp
*/

import firebase from 'firebase';
import "@firebase/firestore";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCkSybp2OOO-0vpRylWw5rb_aTDk0Xte1k",
    authDomain: "todoapp-rn-7.firebaseapp.com",
    databaseURL: "https://todoapp-rn-7.firebaseio.com",
    projectId: "todoapp-rn-7",
    storageBucket: "todoapp-rn-7.appspot.com",
    messagingSenderId: "562289574473",
    appId: "1:562289574473:web:51c844ef65d08386433598",
    measurementId: "G-26X4CZ379X"
};

class Firebase {

    constructor(callback) {
        this.init(callback)
    }

    init(callback) {
        if(!firebase.apps.length){
            firebase.initializeApp(firebaseConfig)
        }

        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback( null, user )
            }
            else {
                firebase.auth().signInAnonymously().catch(error => {
                    callback(error)
                });
            }
        });
    }

    getLists(callback) {
        let ref = firebase.firestore().collection("users").doc( this.userId ).collection("lists");

        this.unsubscribe = ref.onSnapshot(snapshot => {

            lists = []

            snapshot.forEach(doc => {
                lists.push({ id: doc.id, ...doc.data() });
            });

            callback(lists);
        });
    }

    get userId() {
        return firebase.auth().currentUser.uid;
    }

    detach() {
        this.unsubscribe();
    }
}

export default Firebase;