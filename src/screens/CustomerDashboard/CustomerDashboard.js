import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CustomerDashboard = () => {
  const [userName, setUserName] = useState('');
  const [loading, setLoading] = useState(true);
  const [movies, setMovies] = useState([]);

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
      } else {
        console.error('No token found');
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchMovies = async () => {
    try {
      const response = await fetch('http://172.20.10.6:8000/movies/moviedata');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setMovies(data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchUserData();
    fetchMovies();
  }, []);

  const renderOfferItem = ({item}) => (
    <Image style={styles.offerImage} source={item} resizeMode="cover" />
  );

  const MovieItem = ({movie}) => (
    <View style={styles.movieItem}>
      <Image source={{uri: movie.photo}} style={styles.moviePhoto} />
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.detailsRow}>
        <View style={{width: '100%', height: '100%'}}>
          <Text style={styles.director}>{`${movie.director}`}</Text>
        </View>
        <Text style={styles.rating}>{`⭐${movie.rating}`}</Text>
      </View>
      <TouchableOpacity style={styles.wishlistButton}>
        <Text style={styles.wishlistButtonText}>Add to Wishlist</Text>
      </TouchableOpacity>
    </View>
  );

  const genres = [...new Set(movies.map(movie => movie.genre))];

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
        <View style={{width: '100%', height: 200}}>
          <FlatList
            data={offers}
            renderItem={renderOfferItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerImageContainer}
          />
        </View>

        {/* Movie Genres Section */}
        {genres.map(genre => (
          <View key={genre} style={styles.genreSection}>
            <Text style={styles.genreTitle}>{genre}</Text>
            <FlatList
              data={movies.filter(movie => movie.genre === genre)}
              renderItem={({item}) => <MovieItem movie={item} />}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
              style={styles.flatList} // Add style for height control
            />
          </View>
        ))}

        <View style={styles.categoryContainer}>
          {/* Existing category buttons */}
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
  genreSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
    width: '100%',
  },
  genreTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'white',
  },
  movieItem: {
    marginRight: 10,
    width: 150,
    alignItems: 'center',
  },
  moviePhoto: {
    width: 100,
    height: 150,
    borderRadius: 5,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'white',
    marginTop: 5,
  },
  detailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginTop: 5,
    height: "100%",
  },
  director: {
    fontSize: 12,
    color: 'lightgrey',
  },
  rating: {
    fontSize: 12,
    color: 'lightgrey',
  },
  flatListContainer: {
    paddingVertical: 10,
    overflow: 'hidden',
  },
  flatList: {
    maxHeight: 200,
  },
  categoryContainer: {
    width: '90%',
  },
  wishlistButton: {
    marginTop: 10,
    backgroundColor: '#2B2B2B',
    borderRadius: 5,
    padding: 8,
    alignItems: 'center',
  },
  wishlistButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomerDashboard;
