import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import 'react-native-gesture-handler';
import { LogBox } from 'react-native';

import { StackNavigator } from './src/router/StackNavigator';
import { PermissionsProvider } from './src/context/PermissionsContext';

LogBox.ignoreLogs([
  "[react-native-gesture-handler] Seems like you\'re using an old API with gesture components, check out new Gestures system!",
]);

const AppState = ({ children }: any) => {
  return(
    <PermissionsProvider>
      { children }
    </PermissionsProvider>
  )
}

const App = () => {
    return(
      <NavigationContainer>
          <AppState>
            <StackNavigator />
          </AppState>
      </NavigationContainer>
    )
};

export default App;