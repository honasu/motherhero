import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderSub from '../components/HeaderSub';
import Selector from '../components/Selector';
import ChattingButton from '../components/chat/ChattingButton';
import ChattingView from '../components/chat/ChattingView';
import {firebaseDB} from './../utils/firebase';
import { Context } from './../context/index';
import { serverURL } from './../../config.json';

import axios from 'axios';

// firebase
import messaging from '@react-native-firebase/messaging';

const QNAChat = ({route, navigation}) => {

    const { state: { uid, id, extra }, dispatch } = useContext( Context );
    // let ignoreItems = false;
    const fbDB = firebaseDB;
    const dbRef = fbDB.ref(`chat/${route.params?.chatType}/${uid}`);
    const [pageName, setPageName] = useState(route.params?.pageName)
    const [chatData, setChatData] = useState([]);
    const [count, setCount] = useState(0);
    const [ignoreItems, setIgnoreItems] = useState(false);

    useEffect(() => {
        onFcm();
        return () => { 
            setIgnoreItems(false); 
            dbRef.child('list').off('child_added');
            dbRef.child('info').off('child_added');
            dbRef.child('info').off('child_changed');
        };
    }, []);
    
    const insetMessage = (message) => {
        const now = new Date().getTime();
        const updates = {};
        updates[`info`] = {
            count: count+1,
            message: message,
            timestamp: now,
        };
        updates[`list/${now}`] = {
            uid: uid,
            message: message,
            writeDate: now
        };
        dbRef.update(updates);
    }

    const onFcm = async () => {
        dbRef.child('info').on('child_added', function(snapshot) {
            if(snapshot.key == 'count') setCount(snapshot.val());
        });
        dbRef.child('info').on('child_changed', function(snapshot) {
            if(snapshot.key == 'count') setCount(snapshot.val());
        });

        dbRef.child('list').on('child_added', function(snapshot) {
            addParseChatData(snapshot.val())
        });
    }

    const ary = [];

    const addParseChatData = (data) => {
        if(!data) return;
        setChatData((old) => [ ...old, data ])
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={pageName}
                />
                <View style={styles.chatNoticeView}>
                    <Text style={styles.chatNoticeText}>※ 상담가능시간 : 월~금 09:00 ~ 18:00</Text>
                </View>
                <View style={{marginTop:110, flex:1}}>
                    {chatData ? <ChattingView chatData={chatData} userId={uid}/>: null}
                </View>
                <ChattingButton 
                    insetMessage={insetMessage}
                />
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    chatNoticeText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 13,  
        marginLeft: 12,      
    },
    chatNoticeView: {
        height: 40, 
        backgroundColor: '#FFFFFF',
        width:'100%',
        paddingTop:10,
        paddingBottom:10,
        paddingLeft:10,
        paddingRight:10,
        flexWrap: "wrap",
        flexDirection: "row",
        position:'absolute',
        top:70,
        zIndex:5,
        // justifyContent: 'center',
        // alignItems: 'center',
        // alignContent: 'center',
    },
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