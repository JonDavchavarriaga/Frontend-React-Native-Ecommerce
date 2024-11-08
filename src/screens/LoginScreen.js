import { MaterialCommunityIcons } from '@expo/vector-icons';
import React, { useContext, useState } from 'react';
import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { DataContext } from '../components/DataContext'; // Asegúrate de que la ruta es correcta

const LoginScreen = ({ navigation }) => {
  const { setIsLoggedIn } = useContext(DataContext);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token; // Asegúrate de que el backend envíe el token bajo `data.token`

        // Guarda el token en AsyncStorage
        await AsyncStorage.setItem('jwtToken', token);

        // Actualiza el estado de autenticación
        setIsLoggedIn(true);
        navigation.replace('Main');
      } else {
        setError('Credenciales incorrectas. Inténtalo de nuevo.');
      }
    } catch (error) {
      console.error('Error during login:', error);
      setError('Ocurrió un error. Inténtalo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Image source={require('../../assets/favicon.png')} style={styles.image} resizeMode='contain' />
      <Text style={styles.title}>Iniciar Sesión</Text>

      {/* Input de correo electrónico */}
      <TextInput
        placeholder='Correo electrónico'
        style={styles.input}
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
      />

      {/* Input de contraseña con botón de mostrar/ocultar */}
      <View style={styles.passwordContainer}>
        <TextInput
          placeholder='Contraseña'
          style={styles.inputPassword}
          secureTextEntry={!passwordVisible}
          autoCapitalize='none'
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.icon} onPress={() => setPasswordVisible(!passwordVisible)}>
          <MaterialCommunityIcons name={passwordVisible ? 'eye-off' : 'eye'} size={24} color='gray' />
        </TouchableOpacity>
      </View>

      {/* Check de recordar contraseña */}
      <View style={styles.rememberMeContainer}>
        <TouchableOpacity onPress={() => setRememberMe(!rememberMe)}>
          <View style={[styles.checkbox, rememberMe && styles.checked]}>
            {rememberMe && <View style={styles.innerCheckbox} />}
          </View>
        </TouchableOpacity>
        <Text style={styles.rememberMeText}>Recordar contraseña</Text>
      </View>

      {/* Texto de "¿Olvidó su contraseña?"
      <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
        <Text style={styles.forgotText}>¿Olvidó su contraseña?</Text>
      </TouchableOpacity> */}

      {/* Botón de login */}
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
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
    width: '100%',
    height: 150,
    marginBottom: 20,
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
  rememberMeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
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
  rememberMeText: {
    fontSize: 16,
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
