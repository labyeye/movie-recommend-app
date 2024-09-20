import React from "react";
import { useEffect,useState } from "react";
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView
} from "react-native";

const CustomerDashboard = () => {
  const [userName, setUserName] = useState("");
  const [loading, setLoading] = useState(true);
  const categoryData = {
    Rice: [
      { id: "1", photo: require("../../../assets/dashboardcustomer/pizza.png"), name: "Rice", farmer: "John Doe", price: "₹2300" },
      { id: "2", photo: require("../../../assets/dashboardcustomer/pizza.png"), name: "Rice", farmer: "Jane ", price: "₹2200" },
      { id: "3", photo: require("../../../assets/dashboardcustomer/pizza.png"), name: "Rice", farmer: "Alex Doe", price: "₹5300" },
      { id: "4", photo: require("../../../assets/dashboardcustomer/pizza.png"), name: "Rice", farmer: "Luca ", price: "₹2100" },
    ],
    Wheat: [
      { id: "1", photo: require("../../../assets/dashboardcustomer/wheat.png"), name: "Wheat", farmer: "Ravi Kumar", price: "₹4300" },
      { id: "2", photo: require("../../../assets/dashboardcustomer/wheat.png"), name: "Wheat", farmer: "Sita Devi", price: "₹4200" },
      { id: "3", photo: require("../../../assets/dashboardcustomer/wheat.png"), name: "Wheat", farmer: "Raj ", price: "₹4100" },
      { id: "4", photo: require("../../../assets/dashboardcustomer/wheat.png"), name: "Wheat", farmer: "Rani Devi", price: "₹4000" },
    ],
    Chicken: [
      { id: "1", photo: require("../../../assets/dashboardcustomer/chicken.png"), name: "Chicken", farmer: "Arun Singh", price: "₹1300" },
      { id: "2", photo: require("../../../assets/dashboardcustomer/chicken.png"), name: "Chicken", farmer: "Nisha Patel", price: "₹1200" },
      { id: "3", photo: require("../../../assets/dashboardcustomer/chicken.png"), name: "Chicken", farmer: "Rahul ", price: "₹1000" },
      { id: "4", photo: require("../../../assets/dashboardcustomer/chicken.png"), name: "Chicken", farmer: "Kabir ", price: "₹1100" },
    ],
    
  };
  const fetchUserData = async () => {
    try {
      // Simulate fetching user data, replace with actual API call
      const response = await fetch("YOUR_API_URL_TO_GET_USER_DATA");
      const data = await response.json();
      setUserName(data.name); // Assuming data contains the user's name
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <Image source={item.photo} style={styles.photo} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.farmer}>{item.farmer}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              style={styles.profileImage}
              resizeMode="contain"
              source={require("../../../assets/dashboardcustomer/profile.png")}
            />
            <Text style={styles.headerText}>{loading ? "Loading..." : userName}</Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              style={styles.bellImage}
              resizeMode="contain"
              source={require("../../../assets/dashboardcustomer/bell.png")}
            />
            <Image
              style={styles.searchImage}
              resizeMode="contain"
              source={require("../../../assets/dashboardcustomer/search.png")}
            />
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Interesting Foods"
            placeholderTextColor={"grey"}
          />
        </View>
        <View style={styles.specialOffers}>
          <Text style={styles.specialOffersText}>Special Offers</Text>
          <Text style={styles.seeMore}>See More...</Text>
        </View>
        <View style={styles.offerImageContainer}>
          <Image
            style={styles.offerImage}
            source={require("../../../assets/dashboardcustomer/offer.png")}
            resizeMode="contain"
          />
        </View>
        <View style={styles.categoryContainer}>
          <View style={styles.categoryRow}>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/wheat.png')}
              />
              <Text style={styles.categoryText}>Rice</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/pizza.png')}
              />
              <Text style={styles.categoryText}>Wheat</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/instant-noodles.png')}
              />
              <Text style={styles.categoryText}>Apple</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/chicken.png')}
              />
              <Text style={styles.categoryText}>Chicken</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.categoryRow}>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/vegetarian.png')}
              />
              <Text style={styles.categoryText}>Vegetable</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/tomato.png')}
              />
              <Text style={styles.categoryText}>Tomato</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/beer.png')}
              />
              <Text style={styles.categoryText}>Cow Milk</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.categoryButton}>
              <Image
                style={styles.categoryImage}
                resizeMode="contain"
                source={require('../../../assets/dashboardcustomer/melonpan.png')}
              />
              <Text style={styles.categoryText}>Others</Text>
            </TouchableOpacity>
          </View>
        </View>
        {Object.keys(categoryData).map((category) => (
          <View key={category} style={styles.categoryContainer}>
            <Text style={styles.categoryTitle}>{category}</Text>
            <FlatList
              data={categoryData[category]}
              renderItem={renderItem}
              keyExtractor={(item) => item.id}
              horizontal
              showsHorizontalScrollIndicator={false}
            />
          </View>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#191A1F",
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: "center",
  },
  header: {
    width: "100%",
    height: 80,
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    color: "white",
    fontWeight: "bold",
  },
  headerRight: {
    flexDirection: "row",
    alignItems: "center",
  },
  bellImage: {
    width: 30,
    height: 30,
    marginRight: 15,
  },
  searchImage: {
    width: 30,
    height: 30,
  },
  searchContainer: {
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  searchInput: {
    backgroundColor: "#0E162C",
    width: "90%",
    height: 40,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  specialOffers: {
    width: "95%",
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
  },
  specialOffersText: {
    color: "white",
    fontWeight: "bold",
  },
  seeMore: {
    color: "green",
    fontWeight: "700",
  },
  offerImageContainer: {
    width: "100%",
    height: 180,
    justifyContent: "center",
    marginTop: 15,
  },
  offerImage: {
    width: "100%",
    height: "100%",
  },
  categoryContainer: {
    width: "95%",
    marginTop: 10,
  },
  categoryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  categoryButton: {
    alignItems: "center",
    justifyContent: "center",
    width: "23%",
  },
  categoryImage: {
    width: 40,
    height: 60,
    marginBottom: 5,
  },
  categoryText: {
    color: "white",
  },
  categoryTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 18,
    marginBottom: 10,
  },
  itemContainer: {
    backgroundColor: "#1F2126",
    borderRadius: 10,
    marginRight: 10,
    padding: 10,
    width: 150,
    alignItems: "center",
  },
  photo: {
    width: 100,
    height: 100,
    borderRadius: 10,
    marginBottom: 5,
  },
  textContainer: {
    alignItems: "center",
  },
  name: {
    color: "white",
    fontWeight: "bold",
  },
  farmer: {
    color: "white",
    marginVertical: 2,
  },
  price: {
    color: "cyan",
    fontWeight: "bold",
  },
});

export default CustomerDashboard;
