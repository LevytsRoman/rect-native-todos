import React from 'react';
import List from './list';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class HomePage extends React.Component {
  constructor(){
    super();
    this.state = {
      username: ''
    }
  }

  static navigationOptions = {
    title: 'Welcome',
  };

  loginHandler(){
    this.props.navigation.navigate('List', {username: this.state.username});
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.welcome}>
          Welcome to ToDolist, login to get started
        </Text>
        <Text style={styles.label}>Username:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({username: text})}
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
          onChangeText={(text) => this.setState({password: text})}
        />
        <Button
          onPress={this.loginHandler.bind(this)}
          title="log in"
          color="#841584"
        />
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
