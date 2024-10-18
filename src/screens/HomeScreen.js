// /screens/HomeScreen.js
import React from "react"
import { View, Text } from "react-native"
import NavBar from "../components/NavBar"

const HomeScreen = ({ navigation }) => {
  return (
    <View>
      <NavBar navigation={navigation} />
      <Text>Bienvenido a la página de inicio</Text>
    </View>
  )
}

export default HomeScreen
