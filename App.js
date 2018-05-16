import React, {Component} from 'react';
import {
  AppRegistry,
  Text,
  TextInput,
  View,
  Button,
  StyleSheet,
  style,
  ListView,
} from 'react-native';

export default class Todo extends Component {
  constructor (props) {
    super (props);
    this.state = {text: ''};

    var ds = new ListView.DataSource ({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      todoData: ds.cloneWithRows ([]),
      todoItems: [],
    };

    this._addTodo = this._addTodo.bind (this);
    this._deleteTodo = this._deleteTodo.bind (this);
  }

  _addTodo () {
    var text = this.state.text;

    if (text != '') {
      this.state.todoItems.push (text);
      this.setState ({
        todoData: this.state.todoData.cloneWithRows (this.state.todoItems),
        text: '',
      });
    }
  }

  _deleteTodo (rowData) {
    var array = [...this.state.todoItems]; // make a separate copy of the array
    var index = array.indexOf (rowData);
    array.splice (index, 1);

    this.setState ({
      todoItems: array,
    });
  }

  render () {
    return (
      <View style={{padding: 10}}>
        <TextInput
          style={{height: 40}}
          placeholder="Type here to Add Todo!"
          onChangeText={text => this.setState ({text})}
          value={this.state.text}
        />

        <View style={styles.button}>
          <Button
            onPress={() => this._addTodo ()}
            title="Add"
            color="blue"
            accessibilityLabel="Tap on Me"
          />
        </View>

        <View>
          <ListView
            dataSource={this.state.todoData.cloneWithRows (
              this.state.todoItems
            )}
            renderRow={rowData => {
              return (
                <View style={styles.todoItem}>
                  <Text style={styles.todoText}>{rowData}</Text>
                  <Button
                    title="Delete"
                    onPress={() => this._deleteTodo (rowData)}
                  />
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create ({
  button: {
    backgroundColor: '#2E9298',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 10,
    shadowOpacity: 0.25,
  },
  todoItem: {
    alignItems: 'center',
    padding: 8,
    width: 320,
    borderBottomWidth: 1.5,
    borderColor: '#e0e0e0',
    backgroundColor: '#fff',
    flex: 1,
    flexDirection: 'row',
  },
  todoText: {
    flex: 1,
  },
});
