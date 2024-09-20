// src/screen/ChatScreen.js

import React from 'react';
import { View, Text, FlatList, Image, StyleSheet, SafeAreaView } from 'react-native';
import profile from "../../../assets/dashboardcustomer/profile.png"
import { TextInput } from 'react-native-gesture-handler';

const chatData = [
  { id: '1', name: 'John Doe', photo: profile, message: 'Hey, how are you?', date: '10:30 AM' },
  { id: '2', name: 'Jane Smith', photo: profile, message: 'Meeting at 3 PM', date: '9:45 AM' },
  { id: '3', name: 'Alice Johnson', photo: profile, message: 'Can we reschedule?', date: 'Yesterday' },
  { id: '4', name: 'Bob Brown', photo: profile, message: 'Looking forward to it!', date: '2 days ago' },
];

const CustomerChat = () => {
  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.photo} style={styles.photo} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.message}>{item.message}</Text>
      </View>
      <Text style={styles.date}>{item.date}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Chats</Text>
      <TextInput style={{width:"95%",height:"8%",backgroundColor:"black",alignSelf:"center",borderRadius:20,padding:10}} placeholder='Search for Chats' placeholderTextColor={"white"}/>
      <FlatList
        data={chatData}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A1F",
  },
  title: {
    fontSize: 30,
    padding: 10,
    color: 'white',
    textAlign: 'center',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: "#1F2126",
    borderRadius: 5,
    marginBottom: 10,
    shadowColor: '#000',
    marginTop:10,
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 3,
    elevation: 2,
    alignSelf:"center",    
    justifyContent: 'space-between',
    width:"95%"
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  textContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
  },
  message: {
    fontSize: 14,
    color: '#aaa',
  },
  date: {
    fontSize: 12,
    color: '#aaa',
    textAlign: 'right',
  },
});

export default CustomerChat;
