import React from "react"
import { StyleSheet, Text, TouchableOpacity, View } from "react-native"

const NavBar = ({ navigation }) => {
  return (
    <View style={styles.navBar}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>Iniciar sesión</Text>
        
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  navBar: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 20,
  },
  button: {
    backgroundColor: "orange", 
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginHorizontal: 10, 
    borderRadius: 5, 
  },
  buttonText: {
    color: "white", 
    fontSize: 16,
    fontWeight: "bold",
  },
})

export default NavBar
