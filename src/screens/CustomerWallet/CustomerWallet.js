import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = ({ navigation }) => {
  const [wishlistMovies, setWishlistMovies] = useState([]);

  const fetchWishlist = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch('http://172.20.10.6:8000/api/wishlist', {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch wishlist');
      }
      const data = await response.json();
      setWishlistMovies(data); // Assuming this contains an array of movie objects
    } catch (error) {
      console.error('Error fetching wishlist:', error);
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const renderMovieItem = ({ item }) => (
    <View style={styles.movieItem}>
      <Text style={styles.movieTitle}>{item.title}</Text>
      <Text style={styles.movieDirector}>{item.director}</Text>
      <Text style={styles.movieRating}>{`⭐${item.rating}`}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Your Wishlist</Text>
      <FlatList
        data={wishlistMovies}
        renderItem={renderMovieItem}
        keyExtractor={item => item._id}
      />
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Text style={styles.backButtonText}>Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#191A1F',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 20,
  },
  movieItem: {
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#2B2B2B',
    borderRadius: 10,
  },
  movieTitle: {
    fontSize: 18,
    color: 'white',
  },
  movieDirector: {
    color: 'lightgrey',
  },
  movieRating: {
    color: 'lightgrey',
  },
  backButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#FF6347',
    borderRadius: 5,
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
  },
});

export default WishlistScreen;
