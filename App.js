import React, { useEffect } from "react"
import { Image, StyleSheet, View } from "react-native"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { DataProvider } from "./src/components/DataContext"
import Products from "./src/components/Products"
import ModalComponent from "./src/components/ModalComponent"
import NavBar from "./src/components/NavBar"
import LoginScreen from "./src/screens/LoginScreen"
import RegisterScreen from "./src/screens/RegisterScreen"

const Stack = createStackNavigator()

export default function App() {
  useEffect(() => {
    document.title = "FOURMINDS STORE"
  }, [])

  return (
    <DataProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Home'
          screenOptions={{ headerShown: false }} // Ocultar el encabezado
        >
          <Stack.Screen name='Home' component={HomeScreen} />
          <Stack.Screen name='Login' component={LoginScreen} />
          <Stack.Screen name='Register' component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </DataProvider>
  )
}

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <NavBar navigation={navigation} />
      <Products />
      <ModalComponent />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
})
