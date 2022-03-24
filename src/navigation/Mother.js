import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderMenu from './../components/HeaderMenu';
import ListContentView from './../components/ListContentView';
import { Context } from './../context/index';
import Popup from './../components/Popup'

const Mother = ({navigation}) => {
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;

    const { state: { uid, id }, dispatch } = useContext( Context );
    const [isPopup, setIsPopup] = useState(false);

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
        <HeaderMenu navigation={navigation} title="슬기로운 엄마생활"
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
                title='유용한 정보'
                onPress={() => navigation.navigate('MotherList', {
                    pageName:'유용한 정보',
                    MainCategory: 'info'
                })}
            />
            <ListContentView
                textStyle={styles.listContentText}
                buttonStyle={styles.listContentButton}
                title='나눔 마켓'
                onPress={() => navigation.navigate('MotherList', {
                    pageName:'나눔 마켓',
                    MainCategory: 'market'
                })}
            />
        </View>
        </SafeAreaView>
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

export default Mother;