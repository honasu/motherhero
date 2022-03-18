import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderMenu from './../HeaderMenu';
import ListContentView from './../ListContentView';
import { Context } from './../../context/index';
import Popup from './../Popup'


const ReviewCategory = ({navigation}) => {
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;

    const { state: { uid, id }, dispatch } = useContext( Context );
    const [isPopup, setIsPopup] = useState(false);

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }
    return (
        <View>
            <HeaderMenu navigation={navigation} title="지원후기"
                     id={id} setIsPopup={value => setIsPopup(value)}/>
            <Popup 
                isPopup={isPopup} 
                setIsPopup={value => setIsPopup(value)} 
                modalText={modalText}
                onPressOK={() => moveLoginPage()}
            />
            <View style={styles.ContentView}>
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='지원 후기 게시판'
                    onPress={() => navigation.navigate('ReviewList', {
                        pageName:'지원 후기',
                        MainCategory: 'apply'
                    })}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='APP 사용 후기 게시판'
                    onPress={() => navigation.navigate('ReviewList', {
                        pageName:'APP 사용 후기',
                        MainCategory: 'use'
                    })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    SafeAreaView:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
    },
    ContentView:{
        position:'relative',
        height:'100%',
        marginTop:70
    },
    listContentText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 15,
        paddingLeft: 12
    },
    listContentButton: {
        padding:10
    },
});

export default ReviewCategory;