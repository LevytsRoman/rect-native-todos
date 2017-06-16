import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class List extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: ['a', 'b', 'c', 'd'],
      newTodo: ''
    }
  }

  addTodo(){
    const todos = [...this.state.todos, this.state.newTodo]
    this.setState({todos, newTodo: ''})
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.input}
          onChangeText={newTodo => this.setState({newTodo})}
          value={this.state.newTodo}
        />
        <TouchableOpacity onPress={this.addTodo.bind(this)}>
          <Text>Click me</Text>
        </TouchableOpacity>
        {this.state.todos.map((todo, i) => {
          return <Text key={i}>{todo}</Text>
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    height: 20,
    width: 200,
    borderColor: 'orange',
    borderWidth: 2
  }
});
