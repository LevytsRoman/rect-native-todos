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
        id: '',
        text: '',
        done: false,
      }
    }
  }

  componentDidMount(){
    AsyncStorage.getAllKeys((error, keys) => {
      // AsyncStorage.multiRemove(keys)
      AsyncStorage.multiGet(keys, (e, results) => {
        const todos = results.map(r => {
          return JSON.parse(r[1])
        })
        this.setState({todos})
      })
    })
  }

  addTodo(){
    const l = this.state.todos.length

    // debugger
    var my_key = l === 0 ? '1' : (parseInt(this.state.todos[l-1].id) + 1).toString();

    // debugger
    const newTodo = {
      id: my_key,
      text: this.state.newTodo.text,
      done: false
    }

    AsyncStorage.setItem(my_key, JSON.stringify(newTodo))
    // poyentially need to explore Async storage and only update state on successfull response

    const todos = [...this.state.todos, newTodo]

    this.setState({
      todos,
      newTodo: {
        id: '',
        text: '',
        done: false
      }
    })
  }

  deleteTodo(i){
    const todos = this.state.todos
    AsyncStorage.removeItem(todos[i].id)

    todos.splice(i,1);
    this.setState({todos})
  }

  finishTodo(i){
    const todos = this.state.todos;
    todos[i].done = !todos[i].done;

    AsyncStorage.mergeItem(todos[i].id, JSON.stringify(todos[i]));

    this.setState({todos})
  }

  render() {
    return (
        <View style={styles.container}>
          <Text>hello {this.props.navigation.state.params.username}, here's your todo list:</Text>
          <View style={styles.form}>
            <View style={styles.inputView}>
              <TextInput
                style={styles.input}
                onChangeText={newTodo => this.setState({newTodo: {text: newTodo, done: false}})}
                value={this.state.newTodo.text}
              />
            </View>
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
                style={{backgroundColor: 'white'}}
                left={[
                  {
                    text: 'delete',
                    onPress:() => this.deleteTodo(i),
                    style: {backgroundColor: 'red'},
                    className: 'custom-class-1'
                  }
                ]}
                right={[
                  {
                    text: (todo.done ? 'unfinish' : 'finish'),
                    onPress:() => this.finishTodo(i),
                    style: {backgroundColor: 'green'},
                    className: 'custom-class-2'
                  },
                  {
                    text: 'edit',
                    onPress:() => console.log('delete'),
                    style: {backgroundColor: 'yellow'},
                    className: 'custom-class-2'
                  }
                ]}
                onOpen={()=> {console.log('hi')}}
                onClose={()=> console.log('hi')}
              >
                <Text
                  style={todo.done ? styles.done : styles.todo}
                >
                  {todo.text}
                </Text>
                <View
                  style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 1,
                  }}
                />
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
  inputView: {
    borderWidth: 1,
    borderBottomLeftRadius: 5,
    borderTopLeftRadius: 5,
    flex: 0.7,
  },
  input: {
    borderColor: 'black',
    padding: 10,
    fontSize: 20,
    flex: 0.7
  },
  done: {
    textDecorationLine: 'line-through',
    margin: 10,
    padding: 10,
    fontSize: 20
  },
  button: {
    borderColor: 'black',
    borderWidth: 1,
    flex: 0.3,
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
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
