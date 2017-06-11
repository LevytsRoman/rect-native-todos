import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button
} from 'react-native';

export default class HomePage extends React.Component {

  loginHandler(){

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
        />
        <Text style={styles.label}>Password:</Text>
        <TextInput
          style={styles.input}
        />
        <Button
          onPress={this.loginHandler}
          title="log in"
          color="#841584"
          accessibilityLabel="Learn more about this purple button"
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
