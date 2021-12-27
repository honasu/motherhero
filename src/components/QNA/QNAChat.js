import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, WebView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderSub from './../HeaderSub';
import Selector from './../Selector';
import ChattingButton from './../chat/ChattingButton';
import ChattingView from './../chat/ChattingView';

import axios from 'axios';

const QNAChat = (props) => {

    let pageName = props.pageName;
    let navigation = props.navigation;
    let onPrev = props.onPrev;

    let userId = 'ghkstn'; //전역으로 관리

    const [chatData, setChatData] = useState();

    useEffect(() => {
        chatData ? '' : getChatData();
    }, [chatData])

    const getChatData = async () => {
        const data = [
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ghkstn',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ghkstn',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ghkstn',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ter',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ghkstn',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ghkstn',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ghkstn',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ter',
                reg_date: '2021-12-16 15:25'
            },
            {
                type: 'text',
                chat: 'ㅁㄴㅇㄹ',
                writer: 'ghkstn',
                reg_date: '2021-12-16 15:25'
            },
        ];
        
        setChatData(data);
    }

    const appendList = () => {
        return (
            <View style={{marginTop:50}}>
            </View>
        )
    }

    return (
        <View style={styles.ContentView}>
            <HeaderSub
                page='normal'
                navigation={navigation}
                title={pageName}
                onPrev={onPrev}
            />
            <View style={{marginTop:50}}>
                {chatData ? <ChattingView chatData={chatData} userId={userId}/>: <View></View>}
            </View>
            <ChattingButton/>
        </View>
    );
}

const styles = StyleSheet.create({
    buttonView:{
        width:'100%',
        height:70,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:20,
        paddingRight:20,
        flexWrap: "wrap",
        flexDirection: "row",
        position:'absolute',
        bottom:0,
        backgroundColor:'white',
        zIndex:5
    },
    SafeAreaView:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
    },
    ContentView:{
        position:'relative',
        height:'100%'
    },
    Content:{
        marginTop:50,
    },
    Row:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
    Header: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth:1,
        borderBottomColor:'#9e9e9e'
    },
    listContent: {
        borderBottomColor:'#9e9e9e',
        borderBottomWidth:1,
        paddingTop: 20,
        paddingBottom: 15,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 1024
    },
    ContentView: {
        flex: 1
    },
    listTitle: {
        fontSize: 17,
        fontWeight: '700',
        marginBottom: 7
    },
    listWriteInfo: {
        flexDirection: 'row',
        position: 'relative',
    },
    listWriter: {
        color: 'gray'
    },
    listDate: {
        position: 'absolute',
        right:0
    }
});

export default QNAChat;