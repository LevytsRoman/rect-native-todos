import React from 'react';
import HomePage from './homePage'
import List from './list'
import {
  StackNavigator,
} from 'react-navigation';

const App = StackNavigator({
  Home: { screen: HomePage },
  List: { screen: List },
});

export default App;
