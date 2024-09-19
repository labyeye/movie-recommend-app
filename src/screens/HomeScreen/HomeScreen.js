import React from 'react';
import {Image, StyleSheet, Text, View, SafeAreaView} from 'react-native';
import {PanGestureHandler} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  withSpring,
  useAnimatedStyle,
  runOnJS,
} from 'react-native-reanimated';
import {useNavigation} from '@react-navigation/native';

const HomeScreen = () => {
  const navigation = useNavigation();
  const X = useSharedValue(10);
  const navigateToHome3 = () => {
    navigation.navigate('Home1');
  };
  const AnimatedGestureHandler = useAnimatedGestureHandler({
    onActive: e => {
      'worklet';
      if (e.translationX < 0) {
        X.value = -e.translationX;
      } else {
        X.value = e.translationX;
      }
    },
    onEnd: () => {
      'worklet';
      if (X.value < 150) {
        X.value = withSpring(10);
      } else {
        X.value = withSpring(240);
        runOnJS(navigateToHome3)();
      }
    },
  });

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{translateX: X.value}],
    };
  });

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.container}>
        <View style={styles.objcontainer}>
          <Text style={styles.title}>
            <Text style={styles.ies}>Film Flow</Text>
          </Text>
          <Text style={styles.subtitle}>
            <Text style={styles.subtitle}>"Discover. Watch. Enjoy."</Text>
          </Text>
        </View>
        <View style={styles.nextcontainer}>
          <View style={styles.sliderTrack}>
            <Text style={{textAlign: 'center', color: 'white'}}>
              Swipe to Get Started
            </Text>

            <PanGestureHandler onGestureEvent={AnimatedGestureHandler}>
              <Animated.View style={[styles.sliderThumb, animatedStyle]}>
                <Image
                  style={{width: 20, height: 20}}
                  source={require('../../../assets/homescreen/arrow.png')}
                />
              </Animated.View>
            </PanGestureHandler>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    backgroundColor: 'black',
  },
  sliderThumb: {
    width: 40,
    height: 40,
    position: 'absolute',
    marginLeft: -5,
    borderRadius: 20,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sliderTrack: {
    width: 300,
    height: 50,
    backgroundColor: 'red',
    paddingLeft: 5,
    borderRadius: 45,
    justifyContent: 'center',
  },
  slideText: {
    color: '#000000',
    fontSize: 18,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#CF0A0A',
    fontWeight: 'bold',
    fontSize: 50,
  },
  subtitle: {
    color: '#EEEEEE',
    fontSize: 30,
  },
  ies: {
    color: '#CF0A0A',
    textAlign: 'center',
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
  slideText: {
    color: 'black',
    fontSize: 18,
  },
  icon: {
    width: 20,
    height: 20,
    tintColor: '#FFFFFF',
  },
});

export default HomeScreen;
