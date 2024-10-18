import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { Alert, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

const RegisterScreen = ({ navigation }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = () => {
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }
    Alert.alert('Éxito', 'Registro exitoso');
  };

  return (
    <View style={styles.container}>
      {/* Espacio para la imagen */}
      <Image source={require('../../assets/favicon.png')} style={styles.logo} />

      <TextInput placeholder='Nombre(s)' style={styles.input} />
      <TextInput placeholder='Apellidos' style={styles.input} />
      <TextInput placeholder='Correo electrónico' style={styles.input} />

      {/* Input de Contraseña con visibilidad toggle */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder='Contraseña'
          secureTextEntry={!passwordVisible}
          style={styles.passwordInput}
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)} style={styles.icon}>
          <MaterialCommunityIcons
            name={passwordVisible ? 'eye-off' : 'eye'} // Cambia el ícono
            size={24}
            color='gray'
          />
        </TouchableOpacity>
      </View>

      {/* Input para confirmar la contraseña */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder='Confirmar Contraseña'
          secureTextEntry={!confirmPasswordVisible}
          style={styles.passwordInput}
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <TouchableOpacity onPress={() => setConfirmPasswordVisible(!confirmPasswordVisible)} style={styles.icon}>
          <MaterialCommunityIcons name={confirmPasswordVisible ? 'eye-off' : 'eye'} size={24} color='gray' />
        </TouchableOpacity>
      </View>

      {/* Botón de registro */}
      <TouchableOpacity style={styles.button} onPress={(handleRegister) => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Registrarse</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 100,
    height: 100,
    alignSelf: 'center',
    marginBottom: 20,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 15,
    position: 'relative',
  },
  passwordInput: {
    flex: 1,
    padding: 10,
  },
  icon: {
    position: 'absolute',
    right: 10,
    zIndex: 1,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
});

export default RegisterScreen;
