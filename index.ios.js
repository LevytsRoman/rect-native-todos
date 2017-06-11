import React, { Component } from 'react';
import App from './components/App';

import {
  AppRegistry,
  StyleSheet,
} from 'react-native';

export default class toDoList extends Component {
  render() {
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('toDoList', () => toDoList);
