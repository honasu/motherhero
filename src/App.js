/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {useEffect} from 'react';
import type {Node} from 'react';
import SplashScreen from 'react-native-splash-screen'; /** 추가 **/
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Main from './navigation/Main';
import Push from './navigation/Push';
import Diet from './navigation/Diet';
import Login from './navigation/Login';
import Join from './navigation/Join';
import Search from './navigation/Search';
import BabyCategory from './navigation/BabyCategory';
import BabyInfo from './navigation/BabyInfo';
import SwiperComponent from './navigation/SwiperComponent';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={Login} options={{ title: '로그인', headerShown: false }}/>
      <Stack.Screen name="Main" component={Main} options={{ title: '메인', headerShown: false }}/>
      <Stack.Screen name="Push" component={Push} options={{ title: '알림확인', headerShown: false }}/>
      <Stack.Screen name="BabyCategory" component={BabyCategory} options={{ title: '육아정보카테고리', headerShown: false }}/>
      <Stack.Screen name="BabyInfo" component={BabyInfo} options={{ title: '육아정보', headerShown: false }}/>
      <Stack.Screen name="Diet" component={Diet} options={{ title: '식단안내'}}/>
      <Stack.Screen name="Join" component={Join} options={{ title: '회원가입', headerShown: false }}/>
      <Stack.Screen name="Search" component={Search} options={{ title: '계정찾기'}}/>
      <Stack.Screen name="SwiperComponent" component={SwiperComponent} options={{ title: '배너테스트'}}/>
    </Stack.Navigator>
  );
}

const Stack = createNativeStackNavigator();

const App: () => Node = () => {

  useEffect(() => {
    try {
      setTimeout(() => {
        SplashScreen.hide(); /** 추가 **/
      }, 2000); /** 스플래시 시간 조절 (2초) **/
    } catch(e) {
      console.warn('에러발생');
      console.warn(e);
    }
  }, []);

  return (
    <NavigationContainer>
      <MyStack />
    </NavigationContainer>
  );
};

export default App;
