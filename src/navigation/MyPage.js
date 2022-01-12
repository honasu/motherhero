import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../components/HeaderMenu'
import Accordion from 'react-native-collapsible/Accordion';

const MyPage = ({navigation}) => {

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderMenu navigation={navigation} title="마이페이지"/>
                <View style={[styles.Content]}>
                    <View style={[styles.profileContent]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ProfileUpdate')
                            }}
                        >
                            <ImageBackground source={require('../assets/images/bannerCat1.jpeg')} style={styles.userImage} imageStyle={styles.userImageStyle}>
                            </ImageBackground>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            style={[styles.userInfoView]}
                            onPress={() => {
                                navigation.navigate('MyInfoDetail')
                            }}
                        >
                            <View style={styles.userNameView}>
                                <Text style={styles.userName}>
                                    닉네이잉ㅁ
                                </Text>
                            </View>
                            <View style={styles.userNicknameView}>
                                <Text style={styles.userNickname}>
                                    이르으음
                                </Text>
                            </View>
                            <Image
                                source={require('../assets/images/icon/right-arrow.png')}
                                style={styles.userArrow}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.mypageContentList]}>
                        <View style={[styles.mypageContentView]}>
                            <TouchableOpacity 
                                style={[styles.mypageContent]}
                                onPress={() => navigation.navigate('Notice')}
                            >
                                <Image
                                    source={require('../assets/images/icon/notice_mypage.png')}
                                    style={styles.mypageContentImage}
                                />
                                <Text style={styles.mypageContentText}>
                                    공지사항
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.mypageContent]}
                                onPress={() => navigation.navigate('Review')}
                            >
                                <Image
                                    source={require('../assets/images/icon/review_mypage.png')}
                                    style={styles.mypageContentImage}
                                />
                                <Text style={styles.mypageContentText}>
                                    지원 후기
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    testBorder: {
        borderWidth: 1,
        borderColor: '#191919',
    },
    SafeAreaView:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
    },
    ContentView:{
        position:'relative',
        height:'100%',
    },
    Content:{
        flex:1,
        marginTop:70,
    },
    profileContent: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        padding: 15,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    mypageContentList: {
        flex: 1,
    },
    mypageContentView: {
        height: 140,
        flexDirection: 'row'
    },
    mypageContent: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center'
    },
    mypageContentImage: {
        width: 60,
        height: 60
    },
    mypageContentText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Medium',
        color: '#191919',
        fontSize: 12,
        marginTop: 5
    },
    userInfoView: {
      flex:1,
      height: 80,
      position: 'relative'
    },
    userNameView: {
      flex: 1,
      justifyContent: 'flex-end',
      flexDirection: 'column',
    },
    userName: {
      includeFontPadding:false,
      fontFamily:'NotoSansKR-Regular',
      color: '#191919',
      fontSize: 20,
    },
    userNicknameView: {
      flex: 1,
    },
    userNickname: {
      includeFontPadding:false,
      fontFamily:'NotoSansKR-Regular',
      color: '#191919',
      fontSize: 13
    },
    userArrow: {
        width: 25,
        height: 25,
        position: 'absolute', 
        top: 27,
        right: 5
        // top: 0, 
        // left: 0, 
        // right: 0, 
        // bottom: 0, 
        // justifyContent: 'center', 
        // alignItems: 'center'
    },
    userImage: {
      width: 80,
      height: 80,
      marginRight: 10
    },
    userImageStyle: {
      borderRadius: 90
    },
});

export default MyPage;