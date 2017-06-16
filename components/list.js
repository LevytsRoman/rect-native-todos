import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { StackNavigator } from 'react-navigation';


export default class List extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      newTodo: ''
    }
  }

  addTodo(){
    const todos = [...this.state.todos, this.state.newTodo]
    this.setState({todos, newTodo: ''})
  }

  deleteTodo(i){
    const todos = this.state.todos
    todos.splice(i,1);
    this.setState({todos})
  }

  render() {
    return (
      <ScrollView>
        <TextInput
          style={styles.input}
          onChangeText={newTodo => this.setState({newTodo})}
          value={this.state.newTodo}
        />
        <TouchableOpacity onPress={this.addTodo.bind(this)}>
          <Text>Click me</Text>
        </TouchableOpacity>
        {this.state.todos.map((todo, i) => {
          return <Text onPress={this.deleteTodo.bind(this, i)} key={i}>{todo}</Text>
        })}
      </ScrollView>
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
