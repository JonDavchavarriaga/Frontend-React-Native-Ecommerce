import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { DataContext } from '../components/DataContext';

const RegisterScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(DataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [touched, setTouched] = useState(false); // Estado para "hover"

  const handleRegister = async () => {
    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      Alert.alert('Error', 'Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await fetch('http://localhost:8080/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
          name: firstName,
          lastName: lastName,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;

        // Mostrar alerta de éxito y navegar a la pantalla de inicio de sesión
        Alert.alert('Éxito', 'Registro exitoso');
        await AsyncStorage.setItem('jwtToken', token);
        setIsLoggedIn(true);
        console.log('Token recibido:', token);
        navigation.replace('Login'); // Navega a la pantalla de Login después del registro

        // Puedes guardar el token si necesitas autenticar al usuario inmediatamente
      } else {
        const errorData = await response.json();
        Alert.alert('Error', errorData.message || 'Error en el registro');
      }
    } catch (error) {
      console.error('Error en el registro:', error);
      Alert.alert('Error', 'Hubo un problema con el registro. Inténtalo nuevamente.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Realizar Registro</Text> {/* Título agregado */}
      <TextInput placeholder='Nombre' value={firstName} onChangeText={setFirstName} style={styles.input} />
      <TextInput placeholder='Apellido' value={lastName} onChangeText={setLastName} style={styles.input} />
      <TextInput
        placeholder='Correo electrónico'
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
      />
      <TextInput
        placeholder='Contraseña'
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      <TextInput
        placeholder='Confirmar contraseña'
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        style={styles.input}
        secureTextEntry
      />
      <TouchableOpacity
        style={[styles.button, touched && styles.buttonHovered]} // Aplica el estilo de "hover"
        onPress={handleRegister}
        onPressIn={() => setTouched(true)} // Activa el efecto al presionar en móviles
        onPressOut={() => setTouched(false)} // Desactiva el efecto al soltar en móviles
        onMouseEnter={() => setTouched(true)} // Activa el "hover" en web
        onMouseLeave={() => setTouched(false)} // Desactiva el "hover" en web
      >
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
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center', // Centra el título
  },
  input: {
    borderColor: 'gray',
    borderWidth: 1,
    padding: 10,
    marginBottom: 15,
    borderRadius: 5,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
  },
  innerCheckbox: {
    width: 12,
    height: 12,
    backgroundColor: 'orange',
    borderRadius: 2,
  },
  button: {
    backgroundColor: 'orange',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    alignItems: 'center',
    marginBottom: 20,
    transition: 'transform 0.2s ease', // Efecto de transición para el "hover" en web
  },
  buttonHovered: {
    transform: [{ scale: 1.1 }], // Aumenta el tamaño del botón cuando está en "hover"
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default RegisterScreen;
