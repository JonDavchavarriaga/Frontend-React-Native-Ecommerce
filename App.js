import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { DataContext, DataProvider } from './src/components/DataContext';
import ModalComponent from './src/components/ModalComponent';
import Products from './src/components/Products';
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const HomeScreen = () => (
  <View style={styles.container}>
    <Products />
    <ModalComponent />
  </View>
);

function Tabs({ route }) {
  const { isLoggedIn } = useContext(DataContext);
  return (
    <Tab.Navigator
      initialRouteName='Home'
      screenOptions={{
        tabBarActiveTintColor: 'black',
        tabBarInactiveTintColor: 'gray',
      }}
    >
      <Tab.Screen
        name='Home'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name='star' size={24} color={color} />,
        }}
      />
      {isLoggedIn ? null : (
        <Tab.Screen
          name='Login'
          component={LoginScreen}
          options={{
            tabBarIcon: ({ color }) => <MaterialIcons name='person' size={24} color={color} />,
          }}
        />
      )}
      <Tab.Screen
        name='Cart'
        component={HomeScreen}
        options={{
          tabBarIcon: ({ color }) => <MaterialIcons name='shopping-cart' size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name='Main' component={Tabs} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
          <Stack.Screen name='ForgotPassword' component={ForgotPasswordScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
});
