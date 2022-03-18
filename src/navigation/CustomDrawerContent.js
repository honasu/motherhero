import * as React from 'react';
import {useContext} from 'react';
import { SafeAreaView, Image, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ImageBackground, Linking } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer'; 

  
import { Context } from './../context/index';
import { serverURL } from './../../config.json';

const CustomDrawerContent = (props) => {
  
  const { state: { uid, id, extra }, dispatch } = useContext( Context );
  const logout = () => {
    dispatch({
      type: 'SET_UID',
      uid: '',
      id: '',
      extra: ''
    });
    props.navigation.navigate('Main', {});
  }

    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <DrawerContentScrollView
          contentContainerStyle={{
            paddingTop: 0,
          }}
        >
          <TouchableOpacity 
            style={styles.headerView}
            onPress={() => id ? props.navigation.navigate('MyPage') : props.navigation.navigate('Login')}
          >
            <ImageBackground source={id ? {uri: serverURL + extra.ProfilePath} : require('./../assets/images/icons/headerLoginDefault.png')} style={styles.userImage} imageStyle={styles.userImageStyle}>
            </ImageBackground>
            {id ? 
            <View style={styles.userInfoView}>
                <View style={styles.userNameView}>
                  <Text style={styles.userName}>
                    {extra.Name}
                  </Text>
                </View>
                <View style={styles.userNicknameView}>
                  <Text style={styles.userNickname}>
                    {extra.NickName}
                  </Text>
                </View>
            </View> :
            <View style={styles.headerLoginTextView}>
              <Text style={styles.headerLoginText}>
                로그인이 필요합니다.
              </Text>
            </View>}
          </TouchableOpacity> 
          
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => props.navigation.navigate('Main')}
          >              
            <Image source={require('../assets/images/icons/sidemain.png')} style={styles.contentImg}/>
            <Text style={styles.contentText}>메인</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => props.navigation.navigate('BabyCategory')}
          >              
            <Image source={require('../assets/images/icons/side1.png')} style={styles.contentImg}/>
            <Text style={styles.contentText}>육아정보</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => props.navigation.navigate('ServiceInfoCategory')}
          >              
            <Image source={require('../assets/images/icons/side2.png')} style={styles.contentImg}/>
            <Text style={styles.contentText}>지원서비스 정보</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => props.navigation.navigate('QNA')}
          >              
            <Image source={require('../assets/images/icons/side3.png')} style={styles.contentImg}/>
            <Text style={styles.contentText}>전문가 Q&A</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => props.navigation.navigate('Review')}
          >              
            <Image source={require('../assets/images/icons/side4.png')} style={styles.contentImg}/>
            <Text style={styles.contentText}>지원후기</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => props.navigation.navigate('MotherList', {})}
          >              
            <Image source={require('../assets/images/icons/side5.png')} style={styles.contentImg}/>
            <Text style={styles.contentText}>나눔마켓</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => Linking.openURL('http://kkoom.or.kr')}
          >              
            <Image source={require('../assets/images/icons/sideLogo.png')} style={styles.sideLogo}/>
            {/* <Text style={styles.contentText}>꿈꾸는가게</Text> */}
          </TouchableOpacity>
          {id ? <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => logout()}
          >              
            {/* <Image source={require('../assets/images/icons/side5.png')} style={styles.contentImg}/> */}
            <Text style={[styles.contentText, {color:'#ED1164', marginLeft:10}]}>로그아웃</Text>
          </TouchableOpacity> : null }
        </DrawerContentScrollView>

      </SafeAreaView>
    );
}

const styles = StyleSheet.create({
  SafeAreaView:{
      width:'100%',
      height:'100%',
      backgroundColor:'white',
  },
  headerView: {
      flex: 1,
      height: 120,
      backgroundColor: '#92D14F',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignContent: 'center',
      padding: 15,
  },
  headerLoginTextView: {
    flex:1,
    height: 80,
    justifyContent: 'center'
  },
  headerLoginText: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Medium',
    color: '#EEF5DC',
    fontSize: 15,
  },
  userInfoView: {
    flex:1,
    height: 80,
  },
  userNameView: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'column',
  },
  userName: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Medium',
    color: '#EEF5DC',
    fontSize: 20,
  },
  userNicknameView: {
    flex: 1,
  },
  userNickname: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Medium',
    color: '#EEF5DC',
    fontSize: 13
  },
  userImage: {
    width: 70,
    height: 70,
    marginRight: 10,
  },
  userImageStyle: {
    borderRadius: 90,
  },
  contentItem: {
    flexDirection: 'row',
    height: 60,
    borderBottomColor: '#DCDCDC',
    borderBottomWidth: 1,
    alignContent: 'center',
    alignItems: 'center',
    padding: 10
  },
  contentImg: {
      width: 30,
      height: 30,
      marginRight:5,
      marginLeft:5,
      resizeMode: 'contain',
  },
  sideLogo: {
    width: 100,
    height: 30,
    marginRight:5,
    marginLeft:5,
    resizeMode: 'contain',
  },
  contentText: {
    fontSize: 18,
    textAlign:'center',
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Medium',
    color: '#191919'
  },
})

export default CustomDrawerContent;
