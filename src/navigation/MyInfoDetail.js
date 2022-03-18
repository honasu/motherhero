import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../components/HeaderMenu'
import { Context } from './../context/index';
import { serverURL } from './../../config.json';

const MyInfoDetail = ({navigation}) => {

    const { state: { uid, id, extra }, dispatch } = useContext( Context );
    
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderMenu navigation={navigation} id={id} title="마이페이지"/>
                <View style={[styles.Content]}>
                    <View style={[styles.profileContent]}>
                        <View>
                            <ImageBackground source={{uri: serverURL + extra.ProfilePath}} style={styles.userImage} imageStyle={styles.userImageStyle}>
                            </ImageBackground>
                        </View>
                        <View style={[styles.userInfoView]}>
                            <View style={styles.userNameView}>
                                <Text style={styles.userName}>
                                    {extra.NickName}
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style={[styles.userDataList]}>
                        <View style={[styles.userDataView]}>
                            <View style={[styles.userDataTitle]}>
                                <Text style={[styles.userDataText]}>
                                    이름
                                </Text>
                            </View>
                            <View style={[styles.userData]}>
                                <Text style={[styles.userDataText]}>
                                    {extra.Name}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.userDataView]}>
                            <View style={[styles.userDataTitle]}>
                                <Text style={[styles.userDataText]}>
                                    생년월일
                                </Text>
                            </View>
                            <View style={[styles.userData]}>
                                <Text style={[styles.userDataText]}>
                                    {extra.Birth}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.userDataView]}>
                            <View style={[styles.userDataTitle]}>
                                <Text style={[styles.userDataText]}>
                                    연락처
                                </Text>
                            </View>
                            <View style={[styles.userData]}>
                                <Text style={[styles.userDataText]}>
                                    {extra.Phone}
                                </Text>
                            </View>
                        </View>
                        <View style={[styles.userDataView]}>
                            <View style={[styles.userDataTitle]}>
                                <Text style={[styles.userDataText]}>
                                    이메일
                                </Text>
                            </View>
                            <View style={[styles.userData]}>
                                <Text style={[styles.userDataText]}>
                                    {extra.Email}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.submitButtonView}>
                            <TouchableOpacity 
                                activeOpacity={0.8} 
                                style={styles.submitButton} 
                                onPress = { () => {
                                    navigation.navigate('MyInfoUpdate')
                                }}
                            >
                                <Text style={styles.submitButtonText}>
                                    수정하기
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
    userInfoView: {
      flex:1,
      height: 80,
      position: 'relative'
    },
    userNameView: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    userName: {
      includeFontPadding:false,
      fontFamily:'NotoSansKR-Regular',
      color: '#191919',
      fontSize: 20,
    },
    userImage: {
      width: 80,
      height: 80,
      marginRight: 10
    },
    userImageStyle: {
      borderRadius: 90
    },
    userInfoList: {
        flex: 1
    }, 
    userDataList: {
        width: 320,
        marginTop: 30,
        alignSelf: 'center'
    },
    userDataView: {
        flexDirection: 'row'
    },
    userDataTitle: {
        width: 90
    },
    userData: {
        
    },
    userDataText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 18,
    },
    submitButtonView: {
        width: 320,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    submitButton: {
      marginTop: 20,
      padding:10,
      borderRadius: 10,
      backgroundColor: '#92D14F',
      borderWidth: 0,
      flex: 1,
      alignItems: 'center',
    }, 
    submitButtonText: {
      fontSize: 17,
      color: 'white',
      fontWeight: "500"
    },
});
export default MyInfoDetail;