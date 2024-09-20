import React from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
} from "react-native";
import { Dimensions } from "react-native";

const CustomerWallet = () => {
  // Static data for the chart
  const transactions = [
    {
      id: "1",
      name: "Rajesh",
      food: "Wheat",
      price: "-₹1000",
      date: "2024-08-01",
    },
    { id: "2", name: "Amit", food: "Rice", price: "+₹800", date: "2024-08-02" },
    {
      id: "3",
      name: "Anjali",
      food: "Apple",
      price: "-₹1200",
      date: "2024-08-03",
    },
    {
      id: "4",
      name: "Suman",
      food: "Tomato",
      price: "-₹600",
      date: "2024-08-04",
    },
    {
      id: "5",
      name: "Ravi",
      food: "Milk",
      price: "-₹1500",
      date: "2024-08-05",
    },
  ];

  // Function to render each item in FlatList
  const renderTransaction = ({ item }) => (
    <View style={styles.transactionItem}>
      <View style={styles.transactionLeft}>
        <Image
          source={require("../../../assets/dashboardcustomer/profile.png")}
          style={styles.profileImage}
        />
        <View style={styles.transactionDetails}>
          <Text style={styles.transactionName}>
            Sent Money to {item.name}
          </Text>
          <Text style={styles.transactionDate}>{item.date}</Text>
          <Text style={{ color: "cyan", fontSize: 13 }}>View Details</Text>
        </View>
      </View>
      <Text style={styles.transactionAmount}>{item.price}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View
          style={{
            width: "40%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image
            style={{ width: "30%", height: "80%", marginLeft: 20 }}
            resizeMode="contain"
            source={require("../../../assets/dashboardcustomer/profile.png")}
          />
          <Text style={{ color: "white", fontWeight: "bold", marginLeft: 10 }}>
            Labh Bothra
          </Text>
        </View>
        <View
          style={{
            width: "20%",
            height: "100%",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "flex-end",
            gap: 20,
          }}
        >
          <Image
            style={{
              width: "40%",
              height: "40%",
              overflow: "hidden",
            }}
            resizeMode="contain"
            source={require("../../../assets/dashboardcustomer/bell.png")}
          />
          <Image
            style={{
              width: "35%",
              height: "35%",
              overflow: "hidden",
              marginRight: 20,
            }}
            resizeMode="contain"
            source={require("../../../assets/dashboardcustomer/search.png")}
          />
        </View>
      </View>
      <View
        style={{
          height: "8%",
          width: "100%",
          alignItems: "center",
          justifyContent: "center",

          flexDirection: "row",
          marginTop: 20,
        }}
      >
        <Text style={{ fontSize: 50, color: "white" }}>
          <Text> ₹</Text>
          <Text>5000</Text>
        </Text>
      </View>
      <View
        style={{
          width: "75%",
          height: "5%",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 35,
        }}
      >
        <TouchableOpacity
          style={{
            width: "40%",
            height: "100%",
            backgroundColor: "green",
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Add Funds</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            width: "40%",
            height: "100%",
            backgroundColor: "green",
            borderRadius: 40,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text style={{ color: "white", fontWeight: "bold" }}>Withdraw</Text>
        </TouchableOpacity>
      </View>
      <View style={{ alignItems: "flex-start", width: "100%", marginTop: 35 }}>
        <Text
          style={{
            color: "white",
            textAlign: "right",
            fontSize: 30,
            padding: 15,
          }}
        >
          Transactions
        </Text>
      </View>

      {/* Transactions FlatList */}
      <View
        style={{
          width: "100%",
          height: "50%",
          marginTop: 10,
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <FlatList
          data={transactions}
          renderItem={renderTransaction}
          keyExtractor={(item) => item.id}
          ItemSeparatorComponent={() => <View style={styles.itemSeparator} />}
        />
      </View>

      <View style={{ width: "95%", height: "25%", marginTop: 10 }}></View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A1F",
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: "8%",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },
  transactionItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#1F2126",
    borderRadius: 8,
    width: "95%",
    alignSelf: "center",
  },
  itemSeparator: {
    height: 15, // Height of the gap between items
  },
  transactionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  transactionDetails: {
    justifyContent: "center",
  },
  transactionName: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  transactionDate: {
    color: "#AAAAAA",
    fontSize: 12,
  },
  transactionAmount: {
    color: "red",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CustomerWallet;
