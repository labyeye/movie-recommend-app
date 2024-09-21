import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  FlatList,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);

  const offers = [
    require('../../../assets/dashboardcustomer/offer.jpg'),
    require('../../../assets/dashboardcustomer/offer2.jpg'),
    require('../../../assets/dashboardcustomer/offer3.jpg'),
  ];

  const fetchUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      if (token) {
        const response = await fetch('http://172.20.10.6:8000/api/auth/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        const data = await response.json();
        setUserName(data.name);
        console.log(data);
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const renderItem = ({item}) => (
    <View style={styles.itemContainer}>
      <Image source={item.photo} style={styles.photo} />
      <View style={styles.textContainer}>
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.farmer}>{item.farmer}</Text>
        <Text style={styles.price}>{item.price}</Text>
      </View>
    </View>
  );

  const renderOfferItem = ({item}) => (
    <Image style={styles.offerImage} source={item} resizeMode="cover" />
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.header}>
          <View style={styles.headerLeft}>
            <Image
              style={styles.profileImage}
              resizeMode="contain"
              source={require('../../../assets/dashboardcustomer/profile.png')}
            />
            <Text style={styles.headerText}>
              {loading ? 'Loading...' : userName}
            </Text>
          </View>
          <View style={styles.headerRight}>
            <Image
              style={styles.bellImage}
              resizeMode="contain"
              source={require('../../../assets/dashboardcustomer/bell.png')}
            />
            <Image
              style={styles.searchImage}
              resizeMode="contain"
              source={require('../../../assets/dashboardcustomer/search.png')}
            />
          </View>
        </View>
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search for Interesting Foods"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.specialOffers}>
          <Text style={styles.specialOffersText}>Special Movies</Text>
          <Text style={styles.seeMore}>See More...</Text>
        </View>
        <View style={styles.offerImageContainer}>
          <FlatList
            data={offers}
            renderItem={renderOfferItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerFlatListContent}
          />
        </View>

       
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A1F',
  },
  scrollContainer: {
    flexGrow: 1,
    alignItems: 'center',
  },
  header: {
    width: '100%',
    height: 80,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    paddingHorizontal: 20,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 50,
    height: 50,
    marginRight: 10,
  },
  headerText: {
    color: 'white',
    fontWeight: 'bold',
  },
  headerRight: {
    flexDirection: 'row',
    alignItems: 'center',
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
    width: '90%',
    marginVertical: 20,
  },
  searchInput: {
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
    padding: 10,
    color: 'white',
  },
  specialOffers: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginBottom: 10,
  },
  specialOffersText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeMore: {
    color: 'lightblue',
  },
  offerImageContainer: {
    marginTop: 15,
    width: '100%',
  },
  offerImage: {
    width: '70%',
    height: '100%',
    borderRadius: 10,
  },
  categoryContainer: {
    width: '90%',
  },
  categoryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  categoryButton: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
    marginHorizontal: 5,
  },
  categoryImage: {
    width: 50,
    height: 50,
  },
  categoryText: {
    color: 'white',
    marginTop: 5,
  },
  offerImageContainer: {
    marginTop: 15,
    width: "100%",
    paddingBottom: 20, // Add padding if needed to prevent cutoff
  },
  
  offerFlatListContent: {
    alignItems: 'center', // Center items
  },
  
  offerImage: {
    width: 150, // Adjust width as needed
    height: 100, // Adjust height as needed
    borderRadius: 10,
    marginHorizontal: 5, // Adjust the horizontal margin to reduce the gap
  },
  
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  photo: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  textContainer: {
    marginLeft: 10,
  },
  name: {
    color: 'white',
    fontWeight: 'bold',
  },
  farmer: {
    color: 'grey',
  },
  price: {
    color: 'green',
    fontWeight: 'bold',
  },
});

export default CustomerDashboard;
