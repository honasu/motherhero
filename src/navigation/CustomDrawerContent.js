import * as React from 'react';
import { SafeAreaView, Image, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, ImageBackground } from 'react-native';
import {
    createDrawerNavigator,
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem,
  } from '@react-navigation/drawer'; 

const CustomDrawerContent = (props) => {
    return (
      <SafeAreaView style={styles.SafeAreaView}>
        <DrawerContentScrollView
          contentContainerStyle={{
            paddingTop: 0,
          }}
        >
          <TouchableOpacity 
            style={styles.headerView}
            onPress={() => props.navigation.navigate('MyPage')}
          >
            <ImageBackground source={require('../assets/images/bannerCat1.jpeg')} style={styles.userImage} imageStyle={styles.userImageStyle}>
            </ImageBackground>
            <View style={styles.userInfoView}>
                <View style={styles.userNameView}>
                  <Text style={styles.userName}>
                    김사랑
                  </Text>
                </View>
                <View style={styles.userNicknameView}>
                  <Text style={styles.userNickname}>
                    KimHeart@
                  </Text>
                </View>
            </View>
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
            <Text style={styles.contentText}>연령별 지원정보</Text>
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
            onPress={() => props.navigation.navigate('MotherList')}
          >              
            <Image source={require('../assets/images/icons/side5.png')} style={styles.contentImg}/>
            <Text style={styles.contentText}>나눔마켓</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.contentItem}
            onPress={() => props.navigation.navigate('Main')}
          >              
            <Image source={require('../assets/images/bannerCat3.jpeg')} style={styles.contentImg}/>
            <Text style={styles.contentText}>메인으로!(임시)</Text>
          </TouchableOpacity>
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
    fontFamily:'NotoSansKR-Regular',
    color: '#EEF5DC',
    fontSize: 20,
  },
  userNicknameView: {
    flex: 1,
  },
  userNickname: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Regular',
    color: '#EEF5DC',
    fontSize: 13
  },
  userImage: {
    width: 80,
    height: 80,
    marginRight: 10
  },
  userImageStyle: {
    borderRadius: 90
  },
  contentItem: {
    flexDirection: 'row',
    height: 80,
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
  contentText: {
    fontSize: 18,
    textAlign:'center',
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Regular',
    color: '#191919'
  },
})

export default CustomDrawerContent;
