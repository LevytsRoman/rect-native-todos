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

  render() {
    return (
      <View style={styles.container}>
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
  }
});
