import React from 'react';
import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
const Home3 = ({navigation}) => {
  return (
    <View style={styles.container}>
      <View style={styles.objcontainer}>
        <Image
          style={styles.image}
          resizeMode="contain"
          source={require('../../../assets/homescreen/delivery.png')}
        />
        <Text style={styles.title}>
          <Text style={styles.farm}>Fast</Text>
          <Text style={styles.ies}> Streaming</Text>
        </Text>
        <View style={{width: '80%'}}>
          <Text style={{textAlign: 'center', color: 'white', marginTop: 20}}>
          Enjoy movies without delays. Quick loading and seamless streaming for an uninterrupted experience!
          </Text>
        </View>
      </View>
      <View style={styles.nextcontainer}>
        <TouchableOpacity
          style={{
            width: '100%',
            height: '100%',
            alignItems: 'center',
            justifyContent: 'flex-end',
          }}
          onPress={() => navigation.navigate('Select')}>
          <Image
            style={styles.next}
            resizeMode="contain"
            source={require('../../../assets/homescreen/next.png')}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#191A1F',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#2B964F',
    fontWeight: 'bold',
    fontSize: 30,
    marginTop: 30,
  },
  farm: {
    color: '#CF0A0A',
  },
  ies: {
    color: 'white',
  },
  image: {
    width: '60%',
    height: '50%',
  },
  objcontainer: {
    width: '100%',
    alignItems: 'center',
    height: '60%',

    borderColor: 'white',
    justifyContent: 'center',
  },
  nextcontainer: {
    width: '100%',
    borderRadius: 10,

    height: '30%',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  next: {
    marginTop: 90,
    width: '50%',
    height: '20%',
    alignContent: 'flex-end',
  },
});
export default Home3;
