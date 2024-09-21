import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Login = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);


// Inside your login function
const handleLogin = async () => {
  try {
    const response = await fetch("http://172.20.10.6:4000/api/auth/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();
    if (response.ok) {
      // Save the token in AsyncStorage
      await AsyncStorage.setItem('userToken', data.token);
      // Navigate to CustomerDashboard
      navigation.navigate('Dashboard');
    } else {
      alert(data.msg);
    }
  } catch (error) {
    console.error("Login error:", error);
  }
};


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.objcontainer}>
        <View style={{ alignItems: 'flex-start', width: '100%', marginLeft: 50 }}>
          <Text style={styles.headerText}>Login</Text>
          <Text style={styles.headerText}>Here!</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <Image
              style={styles.icon}
              source={require('../../../assets/login/email.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Email"
              placeholderTextColor="grey"
              value={email}
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputWrapper}>
            <Image
              style={styles.icon}
              source={require('../../../assets/login/key.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Password"
              placeholderTextColor="grey"
              secureTextEntry={!passwordVisible}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setPasswordVisible(!passwordVisible)}
            >
              <Image
                style={styles.icon}
                source={require('../../../assets/login/eye.png')} // Replace with your eye icon path
              />
            </TouchableOpacity>
          </View>
          <View style={{ alignItems: 'flex-end', width: '100%', marginRight: 40 }}>
            <Text style={{ color: '#CF0A0A' }}>Forgot Password</Text>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.farmer} onPress={handleLogin}>
              <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate('Signup')}
            >
              Don't have an Account? Sign Up
            </Text>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#1d1d1d',
  },
  objcontainer: {
    width: '100%',
    alignItems: 'center',
    height: '60%',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  headerText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold',
  },
  inputsContainer: {
    height: '50%',
    width: '100%',
    alignItems: 'center',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    marginBottom: 15,
    backgroundColor: '#262626',
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  textInput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    color: 'white',
    borderRadius: 10,
  },
  eyeIcon: {
    padding: 10, // Adjust padding to control touch area
  },
  buttonsContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 20,
  },
  farmer: {
    width: '80%',
    height: '37%',
    borderRadius: 10,
    backgroundColor: '#DC5F00',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: 'bold',
  },
  signUpText: {
    color: 'white',
    fontWeight: 'bold',
    marginTop: 10,
  },
});

export default Login;
