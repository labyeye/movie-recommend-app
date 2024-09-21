import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WishlistScreen = () => {
    const [wishlistItems, setWishlistItems] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchWishlist = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://172.20.10.6:8000/wishlist/getwish', {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error('Failed to fetch wishlist');
            }

            const data = await response.json();
            console.log('Fetched wishlist data:', data);
            setWishlistItems(data);
        } catch (error) {
            console.error('Error fetching wishlist:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchWishlist();
    }, []);

    const renderItem = ({ item }) => (
        <View style={styles.item}>
            <Text style={styles.title}>Movie ID: {item.movieId}</Text>
            {/* Fetch and display movie details based on movieId if necessary */}
        </View>
    );

    if (loading) {
        return (
            <SafeAreaView style={styles.container}>
                <Text style={styles.loadingText}>Loading...</Text>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <FlatList
                data={wishlistItems}
                renderItem={renderItem}
                keyExtractor={item => item._id}
                contentContainerStyle={styles.flatListContent}
                style={styles.flatList}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        padding: 20,
    },
    flatList: {
        flex: 1,
    },
    flatListContent: {
        paddingBottom: 20,
    },
    item: {
        padding: 15,
        marginBottom: 10,
        backgroundColor: '#f9f9f9',
        borderRadius: 5,
    },
    title: {
        fontSize: 16,
    },
    loadingText: {
        color: 'white',
        textAlign: 'center',
        marginTop: 20,
    },
});

export default WishlistScreen;
