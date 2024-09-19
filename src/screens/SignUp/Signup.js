import React, { useState } from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Alert,
} from "react-native";

const Signup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const validatePhone = (phone) => {
    const regex = /^[0-9]{10}$/;
    return regex.test(phone);
  };

  const handleSignup = async () => {
    if (!name || !email || !password || !phone) {
      Alert.alert("Error", "Please fill in all fields.");
      return;
    }
    
    if (!validateEmail(email)) {
      Alert.alert("Error", "Please enter a valid email.");
      return;
    }

    if (!validatePhone(phone)) {
      Alert.alert("Error", "Please enter a valid 10-digit phone number.");
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        Alert.alert("Success", "Account created successfully!");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", data.message || "Signup failed.");
      }
    } catch (error) {
      Alert.alert("Error", "Something went wrong. Please try again.");
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.objcontainer}>
        <View style={{ alignItems: 'flex-start', width: '100%', marginLeft: 50 }}>
          <Text style={styles.headerText}>Sign</Text>
          <Text style={styles.headerText}>Up</Text>
          <Text style={styles.headerText}>Here!</Text>
        </View>
        <View style={styles.inputsContainer}>
          <View style={styles.inputWrapper}>
            <Image
              style={styles.icon}
              source={require('../../../assets/login/user.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Name"
              placeholderTextColor="grey"
              value={name}
              onChangeText={setName}
            />
          </View>
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
              source={require('../../../assets/login/phone.png')}
            />
            <TextInput
              style={styles.textInput}
              placeholder="Enter Phone Number"
              placeholderTextColor="grey"
              value={phone}
              onChangeText={setPhone}
              keyboardType="numeric"
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
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Image
                style={styles.eyeIcon}
                source={require('../../../assets/login/eye.png')}
              />
            </TouchableOpacity>
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.farmer} onPress={handleSignup}>
              <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
            <Text
              style={styles.signUpText}
              onPress={() => navigation.navigate("Login")}
            >
              Already have an Account? Login
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
  textInput: {
    flex: 1,
    height: 50,
    paddingLeft: 10,
    color: 'black',
    borderRadius: 10,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
    resizeMode: 'contain',
  },
  eyeIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: 'contain',
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

export default Signup;
