import React, { useEffect, useState } from 'react';
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
  const [wishlistCount, setWishlistCount] = useState(0); // State for wishlist count

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
        setWishlistCount(data.wishlistCount || 0);
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

  const fetchWishlist = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://172.20.10.6:8000/wishlist/', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      const wishlist = await response.json();
      setWishlistCount(wishlist.length); // Update wishlist count based on fetched wishlist
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  const addToWishlist = async movie => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://172.20.10.6:8000/wishlist/add', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ movieId: movie._id }),
      });
  
      const responseText = await response.text(); // Read as text for debugging
      console.log('Response Text:', responseText); // Log the raw response
  
      if (!response.ok) {
        throw new Error('Failed to add to wishlist');
      }
  
      const responseJson = JSON.parse(responseText); // Parse only if the response is okay
  
      alert('Movie added to wishlist!');
    } catch (error) {
      console.error('Error adding to wishlist:', error);
      alert('Could not add to wishlist.');
    }
  };
  
  

  useEffect(() => {
    fetchUserData();
    fetchMovies();
  }, []);

  const renderOfferItem = ({ item }) => (
    <Image style={styles.offerImage} source={item} resizeMode="cover" />
  );

  const MovieItem = ({ movie }) => (
    <View style={styles.movieItem}>
      <Image source={{ uri: movie.photo }} style={styles.moviePhoto} />
      <Text style={styles.title}>{movie.title}</Text>
      <View style={styles.detailsRow}>
        <Text style={styles.director}>{movie.director}</Text>
        <Text style={styles.rating}>{`⭐${movie.rating}`}</Text>
      </View>
      <TouchableOpacity
        style={styles.wishlistButton}
        onPress={() => addToWishlist(movie)}>
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
            placeholder="Search for Interesting Movies"
            placeholderTextColor={'grey'}
          />
        </View>
        <View style={styles.specialOffers}>
          <Text style={styles.specialOffersText}>Special Movies</Text>
          <Text style={styles.seeMore}>See More...</Text>
        </View>
        <View style={{ width: 500, height: 200 }}>
          <FlatList
            data={offers}
            renderItem={renderOfferItem}
            keyExtractor={(item, index) => index.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.offerImageContainer}
          />
        </View>

        {genres.map(genre => (
          <View key={genre} style={styles.genreSection}>
            <Text style={styles.genreTitle}>{genre}</Text>
            <FlatList
              data={movies.filter(movie => movie.genre === genre)}
              renderItem={({ item }) => <MovieItem movie={item} />}
              keyExtractor={item => item._id}
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.flatListContainer}
              style={styles.flatList}
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
    gap: 20,
  },
  offerImage: {
    width: 200,
    height: 150,
    borderRadius: 10,
    resizeMode: 'cover',
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
    width: 170,
    alignItems: 'center',
    borderRadius: 10,
  },
  moviePhoto: {
    width: 150,
    height: 150,
    borderRadius: 10,
    resizeMode: 'contain',
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
    width: '100%',
  },
  director: {
    fontSize: 12,
    color: 'grey',
  },
  rating: {
    fontSize: 12,
    color: 'yellow',
  },
  wishlistButton: {
    marginTop: 5,
    padding: 5,
    backgroundColor: '#FF6B6B',
    borderRadius: 5,
    alignItems: 'center',
  },
  wishlistButtonText: {
    color: 'white',
  },
});

export default CustomerDashboard;
