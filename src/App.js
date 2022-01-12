/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import 'react-native-gesture-handler';
import React, {useEffect} from 'react';
import type {Node} from 'react';
import SplashScreen from 'react-native-splash-screen'; /** 추가 **/
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

import Main from './navigation/Main';
import Push from './navigation/Push';
import Login from './navigation/Login';
import Join from './navigation/Join';
import BabyCategory from './navigation/BabyCategory';
import BabyInfo from './navigation/BabyInfo';
import ServiceInfoCategory from './navigation/ServiceInfoCategory';
import ServiceInfoList from './navigation/ServiceInfoList';
import ServiceDetail from './navigation/ServiceDetail';
import ServiceApply from './navigation/ServiceApply';
import QNA from './navigation/QNA';
import QNAChat from './navigation/QNAChat';
import QNADetail from './navigation/QNADetail';
import QNAList from './navigation/QNAList';
import Review from './navigation/Review';
import ReviewDetail from './navigation/ReviewDetail';
import ReviewList from './navigation/ReviewList';
import LinkPage from './navigation/LinkPage';
import MotherList from './navigation/MotherList';
import MotherDetail from './navigation/MotherDetail';
import CustomDrawerContent from './navigation/CustomDrawerContent';
import MyPage from './navigation/MyPage';
import ProfileUpdate from './navigation/ProfileUpdate';
import MyInfoDetail from './navigation/MyInfoDetail';
import MyInfoUpdate from './navigation/MyInfoUpdate';
import Notice from './navigation/Notice';

function MyStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Main" component={Main} options={{ title: '메인', headerShown: false }}/>
      <Stack.Screen name="Login" component={Login} options={{ title: '로그인', headerShown: false }}/>
      <Stack.Screen name="Join" component={Join} options={{ title: '회원가입', headerShown: false }}/>
      <Stack.Screen name="Push" component={Push} options={{ title: '알림확인', headerShown: false }}/>
      <Stack.Screen name="BabyCategory" component={BabyCategory} options={{ title: '육아정보카테고리', headerShown: false }}/>
      <Stack.Screen name="BabyInfo" component={BabyInfo} options={{ title: '육아정보', headerShown: false }}/>
      <Stack.Screen name="ServiceInfoCategory" component={ServiceInfoCategory} options={{ title: '지원서비스정보카테고리', headerShown: false }}/>
      <Stack.Screen name="ServiceInfoList" component={ServiceInfoList} options={{ title: '지원서비스정보리스트', headerShown: false }}/>
      <Stack.Screen name="ServiceDetail" component={ServiceDetail} options={{ title: '지원서비스정보상세', headerShown: false }}/>
      <Stack.Screen name="ServiceApply" component={ServiceApply} options={{ title: '지원서비스지원', headerShown: false }}/>
      <Stack.Screen name="QNA" component={QNA} options={{ title: 'QNA', headerShown: false }}/>
      <Stack.Screen name="QNAChat" component={QNAChat} options={{ title: 'QNAChat', headerShown: false }}/>
      <Stack.Screen name="QNADetail" component={QNADetail} options={{ title: 'QNADetail', headerShown: false }}/>
      <Stack.Screen name="QNAList" component={QNAList} options={{ title: 'QNAList', headerShown: false }}/>
      <Stack.Screen name="Review" component={Review} options={{ title: '지원후기', headerShown: false }}/>
      <Stack.Screen name="ReviewDetail" component={ReviewDetail} options={{ title: 'ReviewDetail', headerShown: false }}/>
      <Stack.Screen name="ReviewList" component={ReviewList} options={{ title: 'ReviewList', headerShown: false }}/>
      <Stack.Screen name="LinkPage" component={LinkPage} options={{ title: '대한사회복지회', headerShown: false }}/>
      <Stack.Screen name="MotherList" component={MotherList} options={{ title: '슬기로운엄마생활목록', headerShown: false }}/>
      <Stack.Screen name="MotherDetail" component={MotherDetail} options={{ title: '슬기로운엄마생활상세', headerShown: false }}/>
      <Stack.Screen name="MyPage" component={MyPage} options={{ title: '마이페이지', headerShown: false }}/>
      <Stack.Screen name="ProfileUpdate" component={ProfileUpdate} options={{ title: '프로필수정', headerShown: false }}/>
      <Stack.Screen name="MyInfoDetail" component={MyInfoDetail} options={{ title: '내정보상세', headerShown: false }}/>
      <Stack.Screen name="MyInfoUpdate" component={MyInfoUpdate} options={{ title: '내정보수정', headerShown: false }}/>
      <Stack.Screen name="Notice" component={Notice} options={{ title: '공지사항', headerShown: false }}/>
    </Stack.Navigator>
  );
}
function MyDrawer() {
  return (
    <Drawer.Navigator
      drawerContent = {(props) => <CustomDrawerContent {...props}/>}
    >
      <Drawer.Screen name="MyStack" component={MyStack} options={{ title: '스택', headerShown: false }}/>
    </Drawer.Navigator>
  );
}

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

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
      <MyDrawer />
    </NavigationContainer>
  );
};

export default App;
