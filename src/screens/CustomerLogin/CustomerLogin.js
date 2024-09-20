import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  ImageBackground,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import { useState } from "react";
import { Alert } from "react-native";

const CustomerLogin = ({ navigation }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const response = await fetch("http://172.20.10.6:5100/api/users/login", {
        // Replace with your IP address if needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phone,
          password,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        navigation.navigate("CustomerDashboard"); // Navigate to dashboard after successful login
      } else {
        Alert.alert("Error", data.message || "An error occurred");
      }
    } catch (error) {
      console.error("Error details:", error);
      Alert.alert("Error", "An error occurred");
    }
  };
  return (
    
      <SafeAreaView style={styles.container}>
        <View style={styles.objcontainer}>
          <Image
            style={styles.image}
            resizeMode="contain"
            source={require("../../../assets/login/corn.png")}
          />
          <Text style={styles.headerText}>Let's You In</Text>
          <View style={styles.inputsContainer}>
            <View style={styles.textInputContainer}>
              <TextInput
                style={styles.textInput}
                placeholder="Enter Phone Number"
                placeholderTextColor="grey"
                value={phone}
            onChangeText={setPhone}
              />
              <TextInput
                style={styles.textInput}
                placeholder="Enter Password"
                placeholderTextColor="grey"
                value={password}
            onChangeText={setPassword}
              />
            </View>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity style={styles.farmer} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
              </TouchableOpacity>
              <Text
                style={styles.signUpText}
                onPress={() => navigation.navigate("CustomerSignUp")}
              >
                Don't have an Account ? SignUp
              </Text>
              {/* <TouchableOpacity style={styles.googleButton}>
                <Image
                  style={styles.googleImage}
                  resizeMode="contain"
                  source={require("../../../assets/login/googlelogin.png")}
                />
              </TouchableOpacity> */}
            </View>
          </View>
        </View>
      </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    alignItems: "center",
  },
  farmer: {
    width: "80%",
    height: "37%",
    marginTop:20,
    borderRadius: 10,
    backgroundColor: "#007FFF",
    alignItems: "center",
    justifyContent: "center",
  },
  headerText: {
    fontSize: 40,
    color: "black",
  },
  textInput: {
    width: "80%",
    height: 50,
    backgroundColor: "rgba(255, 255, 255, 0.4)", // semi-transparent white
    borderRadius: 10,
    paddingLeft: 10,
    marginBottom: 15,
  },
  textInputContainer: {
    width: "100%",
    height: "30%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  inputsContainer: {
    height: "50%",
    width: "100%",
    marginTop: 30,
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonsContainer: {
    width: "100%",
    height: "50%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  buttonText: {
    fontSize: 17,
    color: "white",
    fontWeight: "bold",
  },
  signUpText: {
    color: "black",
    fontWeight: "bold",
    marginBottom: 40,
    marginTop:5,
  },
  googleButton: {
    width: "80%",
    height: "37%",
    borderRadius: 10,
    backgroundColor: "black",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  googleImage: {
    width: "70%",
    height: "90%",
  },
  image: {
    width: "60%",
    height: "35%",
    marginTop: 30,
  },
  objcontainer: {
    width: "100%",
    alignItems: "center",
    height: "60%",
    borderColor: "white",
    justifyContent: "space-between",
    marginTop: 20,
    gap: 20,
  },
});

export default CustomerLogin;
