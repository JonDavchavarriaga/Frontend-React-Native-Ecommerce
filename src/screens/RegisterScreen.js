// /screens/LoginScreen.js
import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const LoginScreen = ({ navigation }) => {
  return (
    <View>
      <Text>Registrarse</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Home")} // Botón para volver a la pantalla principal
      >
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    backgroundColor: "orange",
  },

  button: {
    backgroundColor: "orange", // Color de fondo naranja
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10, // Espaciado horizontal entre los botones
    borderRadius: 5, // Bordes redondeados
  },
})

export default LoginScreen
