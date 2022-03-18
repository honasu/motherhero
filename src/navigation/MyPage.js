import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../components/HeaderMenu'
import { Context } from './../context/index';
import { serverURL } from './../../config.json';

const MyPage = ({navigation}) => {
    const { state: { uid, id, extra }, dispatch } = useContext( Context );
    
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderMenu navigation={navigation}  id={id} title="마이페이지"/>
                <View style={[styles.Content]}>
                    <View style={[styles.profileContent]}>
                        <TouchableOpacity
                            onPress={() => {
                                navigation.navigate('ProfileUpdate')
                            }}
                        >
                            <ImageBackground source={{uri: serverURL + extra.ProfilePath}} style={styles.userImage} imageStyle={styles.userImageStyle}>
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
                                    {extra.NickName}
                                </Text>
                            </View>
                            <View style={styles.userNicknameView}>
                                <Text style={styles.userNickname}>
                                    {extra.Name}
                                </Text>
                            </View>
                            <Image
                                source={require('../assets/images/icons/right-arrow.png')}
                                style={styles.userArrow}
                            />
                        </TouchableOpacity>
                    </View>
                    <View style={[styles.mypageContentList]}>
                        <View style={[styles.mypageContentView]}>
                            <TouchableOpacity 
                                style={[styles.mypageContent]}
                                onPress={() => navigation.navigate('Notice', {})}
                            >
                                <Image
                                    source={require('../assets/images/icons/notice_mypage.png')}
                                    style={styles.mypageContentImage}
                                />
                                <Text style={styles.mypageContentText}>
                                    공지사항
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.mypageContent]}
                                onPress={() => navigation.navigate('Review', {})}
                            >
                                <Image
                                    source={require('../assets/images/icons/review_mypage.png')}
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
        marginTop: 10
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
      width: 70,
      height: 70,
      marginRight: 10
    },
    userImageStyle: {
      borderRadius: 90
    },
});

export default MyPage;