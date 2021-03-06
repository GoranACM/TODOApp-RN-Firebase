/*
 * Created by: Goran Ilievski
 *
 * September 2020
 *
 * TODOApp
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Modal,
  ActivityIndicator,
  YellowBox,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import colors from './styles/Colors';
import TodoList from './components/TodoList';
import AddListModal from './components/AddListModal';
import Firebase from './config/firebase';

export default class App extends Component {
  state = {
    addTodoVisible: false,
    lists: [],
    user: {},
    loading: true,
  };

  componentDidMount() {
    // Had to suppress the warning as there is no solution still to the problem
    YellowBox.ignoreWarnings(['Setting a timer']);

    firebase = new Firebase((error, user) => {
      if (error) {
        return alert('Oops, something is wrong!');
      }

      firebase.getLists((lists) => {
        this.setState({ lists, user }, () => {
          this.setState({ loading: false });
        });
      });

      this.setState({ user });
    });
  }

  componentWillUnmount() {
    firebase.detach();
  }

  toggleAddTodoModal() {
    this.setState({ addTodoVisible: !this.state.addTodoVisible });
  }

  renderList = (list) => {
    return (
      <TodoList
        list={list}
        updateList={this.updateList}
        deleteList={this.deleteList}
      />
    );
  };

  addList = (list) => {
    firebase.addList({
      name: list.name,
      color: list.color,
      todos: [],
    });
  };

  deleteList = (list) => {
    firebase.deleteList(list);
  };

  updateList = (list) => {
    firebase.updateList(list);
  };

  render() {
    if (this.state.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator size='large' color={colors.blue} />
        </View>
      );
    }

    return (
      <View style={styles.container}>
        <Modal
          animationType='slide'
          visible={this.state.addTodoVisible}
          onRequestClose={() => this.toggleAddTodoModal()}
        >
          <AddListModal
            closeModal={() => this.toggleAddTodoModal()}
            addList={this.addList}
          />
        </Modal>

        {/* 
        This shows the user ID in the app
        <View>
          <Text>User: { this.state.user.uid }</Text>
        </View> 
        */}

        <View style={styles.row}>
          <View style={styles.divider} />
          <Text style={styles.title}>
            TODO <Text style={styles.titleSmall}>Lists</Text>
          </Text>
          <View style={styles.divider} />
        </View>

        <View style={styles.buttonAdd}>
          <TouchableOpacity
            style={styles.addList}
            onPress={() => this.toggleAddTodoModal()}
          >
            <AntDesign name='plus' size={18} color={colors.blue} />
          </TouchableOpacity>
          <Text style={styles.add}>Add List</Text>
        </View>

        <View style={styles.listContainer}>
          <FlatList
            data={this.state.lists}
            keyExtractor={(item) => item.id.toString()}
            horizontal={true}
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => this.renderList(item)}
            keyboardShouldPersistTaps='always'
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
  },
  divider: {
    backgroundColor: colors.lightBlue,
    height: 1,
    flex: 1,
    alignSelf: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: '800',
    color: colors.black,
    paddingHorizontal: 64,
  },
  titleSmall: {
    fontWeight: '300',
    color: colors.blue,
  },
  buttonAdd: {
    marginVertical: 48,
  },
  addList: {
    borderWidth: 2,
    borderColor: colors.lightBlue,
    borderRadius: 4,
    padding: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  add: {
    color: colors.blue,
    fontWeight: '600',
    fontSize: 14,
    marginTop: 8,
  },
  listContainer: {
    height: 275,
    paddingLeft: 32,
  },
});
