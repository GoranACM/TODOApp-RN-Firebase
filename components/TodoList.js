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
  Modal,
  Alert,
} from 'react-native';
import colors from '../styles/Colors';
import TodoModal from './TodoModal';

export default class TodoList extends Component {
  state = {
    showListVisible: false,
  };

  toggleListModal() {
    this.setState({ showListVisible: !this.state.showListVisible });
  }

  deleteAlert() {
    //handler for Long Click
    Alert.alert(
      'Delete List',
      'The list has been deleted!',
      [
        {
          text: 'OKAY',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false }
    );
  }

  render() {
    const list = this.props.list;

    const completedCount = list.todos.filter((todo) => todo.completed).length;
    const remainingCount = list.todos.length - completedCount;

    return (
      <View>
        <Modal
          animationType='slide'
          visible={this.state.showListVisible}
          onRequestClose={() => this.toggleListModal()}
        >
          <TodoModal
            list={list}
            closeModal={() => this.toggleListModal()}
            updateList={this.props.updateList}
            deleteList={this.props.deleteList}
          />
        </Modal>
        <TouchableOpacity
          style={[styles.listContainer, { backgroundColor: list.color }]}
          onPress={() => this.toggleListModal()}
          //onLongPress={this.handlerLongClick}
          onLongPress={() => {
            this.props.deleteList(list);
            this.deleteAlert();
          }}
        >
          <Text style={styles.listTitle} numberOfLines={1}>
            {list.name}
          </Text>

          <View>
            <View style={styles.align}>
              <Text style={styles.count}>{remainingCount}</Text>
              <Text style={styles.subtitle}>Remaining</Text>
            </View>
            <View style={styles.align}>
              <Text style={styles.count}>{completedCount}</Text>
              <Text style={styles.subtitle}>Completed</Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    paddingVertical: 32,
    paddingHorizontal: 16,
    borderRadius: 6,
    marginHorizontal: 12,
    alignItems: 'center',
    width: 200,
  },
  listTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.white,
    marginBottom: 18,
  },
  align: {
    alignItems: 'center',
  },
  count: {
    fontSize: 48,
    fontWeight: '200',
    color: colors.white,
  },
  subtitle: {
    fontSize: 12,
    fontWeight: '700',
    color: colors.white,
  },
});
