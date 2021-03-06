/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect, useContext, useState} from 'react';
import type {Node} from 'react';
import { Alert } from 'react-native';
import { LogBox } from 'react-native';
import RNBootSplash from "react-native-bootsplash";
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import messaging from '@react-native-firebase/messaging';

import Main from './navigation/Main';
import Push from './navigation/Push';
import Login from './navigation/Login';
import Join from './navigation/Join';
import BabyCategory from './navigation/BabyCategory';
import BabyInfoList from './navigation/BabyInfoList';
import BabyDetail from './navigation/BabyDetail';
import ServiceInfoCategory from './navigation/ServiceInfoCategory';
import ServiceInfoList from './navigation/ServiceInfoList';
import ServiceDetail from './navigation/ServiceDetail';
import ServiceApply from './navigation/ServiceApply';
import SearchPage from './navigation/SearchPage';
import QNA from './navigation/QNA';
import QNAUpdate from './navigation/QNAUpdate';
import QNAWrite from './navigation/QNAWrite';
import QNAChat from './navigation/QNAChat';
import QNADetail from './navigation/QNADetail';
import QNAList from './navigation/QNAList';
import Review from './navigation/Review';
import ReviewDetail from './navigation/ReviewDetail';
import ReviewList from './navigation/ReviewList';
import ReviewWrite from './navigation/ReviewWrite';
import ReviewUpdate from './navigation/ReviewUpdate';
import LinkPage from './navigation/LinkPage';
import Mother from './navigation/Mother';
import MotherList from './navigation/MotherList';
import MotherDetail from './navigation/MotherDetail';
import MotherWrite from './navigation/MotherWrite';
import MotherUpdate from './navigation/MotherUpdate';
import CustomDrawerContent from './navigation/CustomDrawerContent';
import MyPage from './navigation/MyPage';
import ProfileUpdate from './navigation/ProfileUpdate';
import MyInfoDetail from './navigation/MyInfoDetail';
import MyInfoUpdate from './navigation/MyInfoUpdate';
import Notice from './navigation/Notice';
import Terms from './navigation/Terms';MyBoardList
import IDPW from './navigation/IDPW';
import MyBoardList from './navigation/MyBoardList';

import { Provider } from './context/index';
import PushPopup, { pushPopup } from './components/PushPopup';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={{ title: '??????', headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ title: '?????????', headerShown: false }}/>
      <Stack.Screen name="Join" component={Join} options={{ title: '????????????', headerShown: false }}/>
      <Stack.Screen name="Push" component={Push} options={{ title: '????????????', headerShown: false }}/>
      <Stack.Screen name="BabyCategory" component={BabyCategory} options={{ title: '????????????????????????', headerShown: false }}/>
      <Stack.Screen name="BabyInfoList" component={BabyInfoList} options={{ title: '????????????', headerShown: false }}/>
      <Stack.Screen name="BabyDetail" component={BabyDetail} options={{ title: '??????????????????', headerShown: false }}/>
      <Stack.Screen name="ServiceInfoCategory" component={ServiceInfoCategory} options={{ title: '?????????????????????????????????', headerShown: false }}/>
      <Stack.Screen name="ServiceInfoList" component={ServiceInfoList} options={{ title: '??????????????????????????????', headerShown: false }}/>
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ title: '???????????????????????????', headerShown: false }}/>
      <Stack.Screen name="ServiceApply" component={ServiceApply} options={{ title: '?????????????????????', headerShown: false }}/>
      <Stack.Screen name="SearchPage" component={SearchPage} options={{ title: '?????????????????????', headerShown: false }}/>
      <Stack.Screen name="QNA" component={QNA} options={{ title: 'QNA', headerShown: false }}/>
      <Stack.Screen name="QNAUpdate" component={QNAUpdate} options={{ title: 'QNAUpdate', headerShown: false }}/>
      <Stack.Screen name="QNAWrite" component={QNAWrite} options={{ title: 'QNAWrite', headerShown: false }}/>
      <Stack.Screen name="QNAChat" component={QNAChat} options={{ title: 'QNAChat', headerShown: false }}/>
      <Stack.Screen name="QNADetail" component={QNADetail} options={{ title: 'QNADetail', headerShown: false }}/>
      <Stack.Screen name="QNAList" component={QNAList} options={{ title: 'QNAList', headerShown: false }}/>
      <Stack.Screen name="Review" component={Review} options={{ title: '????????????', headerShown: false }}/>
      <Stack.Screen name="ReviewWrite" component={ReviewWrite} options={{ title: '?????????????????????', headerShown: false }}/>
      <Stack.Screen name="ReviewDetail" component={ReviewDetail} options={{ title: 'ReviewDetail', headerShown: false }}/>
      <Stack.Screen name="ReviewList" component={ReviewList} options={{ title: 'ReviewList', headerShown: false }}/>
      <Stack.Screen name="ReviewUpdate" component={ReviewUpdate} options={{ title: 'ReviewUpdate', headerShown: false }}/>
      {/* <Stack.Screen name="LinkPage" component={LinkPage} options={{ title: '?????????????????????', headerShown: false }}/> */}
      <Stack.Screen name="Mother" component={Mother} options={{ title: '????????????????????????????????????', headerShown: false }}/>
      <Stack.Screen name="MotherList" component={MotherList} options={{ title: '??????????????????????????????', headerShown: false }}/>
      <Stack.Screen name="MotherDetail" component={MotherDetail} options={{ title: '??????????????????????????????', headerShown: false }}/>
      <Stack.Screen name="MotherWrite" component={MotherWrite} options={{ title: '?????????????????????????????????', headerShown: false }}/>
      <Stack.Screen name="MotherUpdate" component={MotherUpdate} options={{ title: '?????????????????????????????????', headerShown: false }}/>
      <Stack.Screen name="MyPage" component={MyPage} options={{ title: '???????????????', headerShown: false }}/>
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} options={{ title: '???????????????', headerShown: false }}/>
      <Stack.Screen name="MyInfoDetail" component={MyInfoDetail} options={{ title: '???????????????', headerShown: false }}/>
      <Stack.Screen name="MyInfoUpdate" component={MyInfoUpdate} options={{ title: '???????????????', headerShown: false }}/>
      <Stack.Screen name="MyBoardList" component={MyBoardList} options={{ title: '?????? ??? ???', headerShown: false }}/>
      <Stack.Screen name="Notice" component={Notice} options={{ title: '????????????', headerShown: false }}/>
      <Stack.Screen name="Terms" component={Terms} options={{ title: '????????????', headerShown: false }}/>
      <Stack.Screen name="IDPW" component={IDPW} options={{ title: 'IDPW', headerShown: false }}/>
    </Stack.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent = {(props) => <CustomDrawerContent {...props}/>}
    >
      <Drawer.Screen name="MyStack" component={MyStack} options={{ title: '??????', headerShown: false }}/>
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const App: () => Node = () => {
  const [pushData, setPushData] = useState({});

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage))
      // return Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
      setPushData(remoteMessage);
    });

    return unsubscribe;
  }, []);

  useEffect(() => {
    console.log('notification1')
    if(pushData.notification) {
      console.log('notification2')
      setTimeout(() => {
        setPushData({})
        return ;
      }, 4000);
    }
  }, [pushData]);

  useEffect(() => {
    try {
      requestUserPermission();
      setTimeout(() => {
        RNBootSplash.hide(); /** ?????? **/
      }, 2000); /** ???????????? ?????? ?????? (2???) **/
    } catch(e) {
      console.warn('????????????');
      console.warn(e);
    }
  }, []);

  LogBox.ignoreLogs(['Warning: ...']);

  async function requestUserPermission() {
    const authStatus = await messaging().requestPermission();
    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;
  
    if (enabled) {
      console.log('Authorization status:', authStatus);
    }
  }

  return (
    <Provider>
      <PushPopup
        pushData={pushData}
      />
      <NavigationContainer>
        <MyDrawer />
      </NavigationContainer>
    </Provider>
  );
};

export default App;
