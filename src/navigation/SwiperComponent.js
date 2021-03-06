import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

import Swiper from 'react-native-swiper'

const SwiperComponent = () => {
    return (
      <Swiper style={styles.wrapper}
      // showsButtons={true} 
      // onMomentumScrollEnd={(e, state, context) => 
      //   console.log('index:', state.index)
      // }
      autoplay
      autoplayTimeout={4}
      // width={400}
      height={250}
      >
        <View style={styles.slide1}>
          <Text style={styles.text}>Hello Swiper</Text>
        </View>
        <View style={styles.slide2}>
          <Text style={styles.text}>Beautiful</Text>
        </View>
        <View style={styles.slide3}>
          <Text style={styles.text}>And simple</Text>
        </View>
      </Swiper>
    );
}

const styles = StyleSheet.create({
  wrapper: {},
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#9DD6EB'
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#97CAE5'
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#92BBD9'
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  }
})

export default SwiperComponent;
