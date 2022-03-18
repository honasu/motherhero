import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderMenu from './../HeaderMenu';
import ListContentView from './../ListContentView';
import { Context } from './../../context/index';
import Popup from './../Popup'


const QNACategory = (props) => {
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );

    const [isPopup, setIsPopup] = useState(false);
    const navigation = props.navigation;

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }

    return (
        <View>
            <HeaderMenu navigation={navigation} title="전문가 Q&A" 
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
                    title='질문 게시판'
                    onPress={() => id ? navigation.navigate('QNAList', {
                        pageName:'질문 게시판',
                    }) : setIsPopup(true)}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='KWS 지원사업 문의'
                    onPress={() => id ? navigation.navigate('QNAChat', {
                        pageName:'KWS 지원사업 문의',
                        chatType: '지원사업'
                    }) : setIsPopup(true)}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='시설입소 문의'
                    onPress={() => id ? navigation.navigate('QNAChat', {
                        pageName:'시설입소 문의',
                        chatType: '시설입소'
                    }) : setIsPopup(true)}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='입양 문의'
                    onPress={() => id ? navigation.navigate('QNAChat', {
                        pageName:'입양 문의',
                        chatType: '입양'
                    }) : setIsPopup(true)}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='법률상담'
                    onPress={() => id ? navigation.navigate('QNAChat', {
                        pageName:'법률상담',
                        chatType: '법률상담'
                    }) : setIsPopup(true)}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='기타문의'
                    onPress={() => id ? navigation.navigate('QNAChat', {
                        pageName:'기타문의',
                        chatType: '기타'
                    }) : setIsPopup(true)}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ContentView:{
        position:'relative',
        height:'100%',
        marginTop: 70
    },
    listContentText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 15,
    },
    listContentButton: {
        padding:10
    },
});

export default QNACategory;