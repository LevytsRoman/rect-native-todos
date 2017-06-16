import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
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
        <View style={styles.container}>
          <TextInput
            style={styles.input}

            onChangeText={newTodo => this.setState({newTodo})}
            value={this.state.newTodo}
          />
        <Button onPress={this.addTodo.bind(this)} title={'Add todo'}/>
          {this.state.todos.map((todo, i) => {
            return (
              <Text
                style={styles.todo}
                onPress={this.deleteTodo.bind(this, i)}
                key={i}>{todo}
              </Text>
            )
          })}
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  input: {

    // fontSize: 30,
    // height: 60,
    // width: 200,
    // borderColor: 'orange',
    // borderWidth: 2
  },
  button: {
    backgroundColor: 'red'
  },
  todo: {
    margin: 10,
    padding: 10,
    fontSize: 20
  }
});
