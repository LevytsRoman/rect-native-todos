import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TextInput,
  Button,
  TouchableOpacity,
  AsyncStorage
} from 'react-native';
import { StackNavigator } from 'react-navigation';
import Swipeout from 'rc-swipeout';

export default class List extends React.Component {
  constructor(){
    super();
    this.state = {
      todos: [],
      newTodo: {
        text: '',
        done: false
      }
    }
  }

  componentDidMount(){
      AsyncStorage.getAllKeys((error, keys) => {
        AsyncStorage.multiGet(keys, (e, results) => {
          const todos = results.map(r => {
            // debugger
            return JSON.parse(r[1])
          })
          this.setState({todos})
        })
      })
  }

  addTodo(){
    const my_key = (Math.random() * (100)).toString();
    debugger
    AsyncStorage.setItem(my_key, JSON.stringify(this.state.newTodo))
    // const todos = [...this.state.todos, this.state.newTodo]
    // this.setState({
    //   todos,
    //   newTodo: {
    //     text: '',
    //     done: false
    //   }
    // })
  }

  deleteTodo(i){
    const todos = this.state.todos
    todos.splice(i,1);
    this.setState({todos})
  }

  finishTodo(i){
    const todos = this.state.todos;
    todos[i].done = !todos[i].done
    this.setState({todos})
  }

  render() {
    return (
        <View style={styles.container}>
          <Text>hello {this.props.navigation.state.params.username}, here's your todo list:</Text>
          <View style={styles.form}>
            <TextInput
              style={styles.input}

              onChangeText={newTodo => this.setState({newTodo: {text: newTodo, done: false}})}
              value={this.state.newTodo.text}
            />
            <TouchableOpacity
              onPress={this.addTodo.bind(this)}
              style={styles.button}
              >
              <Text>Add todo</Text>
            </TouchableOpacity>
          </View>
          <ScrollView>
          {this.state.todos.map((todo, i) => {
            return (
              <Swipeout
                key={i}
                left={[
                  {
                    text: '',
                    onPress:() => console.log('reply'),
                    style: {},
                    className: 'custom-class-1'
                  }
                ]}
                right={[
                  {
                    text: '',
                    onPress:() => console.log('delete'),
                    style: {},
                    className: 'custom-class-2'
                  }
                ]}
                onOpen={this.deleteTodo.bind(this, i)}
                onClose={this.deleteTodo.bind(this, i)}
              >
                <Text
                  style={todo.done ? styles.done : styles.todo}
                  onPress={this.finishTodo.bind(this, i)}
                >
                  {todo.text}
                </Text>
              </Swipeout>
            )
          })}
        </ScrollView>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    alignItems: 'stretch',
    justifyContent: 'center',
  },
  form: {
    flexDirection: 'row',
    borderColor: 'red'
  },
  input: {
    fontSize: 20,
    height: 50,
    flex: 0.7
  },
  done: {
    textDecorationLine: 'line-through',
    margin: 10,
    padding: 10,
    fontSize: 20
  },
  button: {
    borderColor: 'red',
    borderWidth: 2,
    flex: 0.3,
    borderRadius: 5,
    justifyContent: 'center',
    alignItems: 'center',
    height: 50
  },
  todo: {
    margin: 10,
    padding: 10,
    fontSize: 20
  }
});
