import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importar ícono del ojo
import React, { useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false); // Estado para la visibilidad de la contraseña

  return (
    <View style={styles.container}>
      {/* Espacio para la imagen en la parte superior */}
      <Image
        source={require('../../assets/favicon.png')} // Asegúrate de tener una imagen en esa ruta
        style={styles.image}
        resizeMode='contain'
      />

      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Input de correo electrónico */}
      <TextInput
        placeholder='Correo electrónico'
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
      />

      {/* Input de contraseña con botón de mostrar/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder='Contraseña'
          style={styles.inputPassword}
          secureTextEntry={!passwordVisible} // Cambia el tipo de entrada basado en el estado
          autoCapitalize='none'
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!passwordVisible)} // Cambia la visibilidad de la contraseña
        >
          <MaterialCommunityIcons
            name={passwordVisible ? 'eye-off' : 'eye'} // Cambia el ícono
            size={24}
            color='gray'
          />
        </TouchableOpacity>
      </View>

      {/* Texto de "¿Olvidó su contraseña?" */}
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity>

      {/* Botón de login */}
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Home')}>
        <Text style={styles.buttonText}>Volver al inicio</Text>
      </TouchableOpacity>

      {/* Texto de "Regístrate aquí" que navega a la pantalla de registro */}
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.registerText}>¿No tienes cuenta? Regístrate aquí</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: '100%', // Ancho de la imagen
    height: 150, // Alto ajustado
    marginBottom: 20, // Espacio debajo de la imagen
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
  },
  inputPassword: {
    flex: 1,
    padding: 10,
  },
  icon: {
    paddingHorizontal: 10,
  },
  forgotText: {
    color: 'orange',
    textAlign: 'right',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  registerText: {
    textAlign: 'center',
    color: 'orange',
  },
});

export default LoginScreen;
