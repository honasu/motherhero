import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import axios from 'axios';

import HeaderPopup from './../components/HeaderPopup';

import { Context } from './../context/index';
import { serverURL, webURL } from './../../config.json';

const BabyDetail = ({route, navigation}) => {
    const { state: { uid, id }, dispatch } = useContext( Context );

    let MemberID = id;
    let url = webURL + 'listBoard.html';
    let [BoardUID, setBoardUID] = useState(route.params.BoardUID);
    let [headerTitle, setHeaderTitle] = useState(route.params.headerTitle);
    
    let webviewRef = useRef();

    /** 웹뷰 ref */
    const handleSetRef = _ref => {
      webviewRef = _ref;
    };

    const reload = () => {
        webviewRef.reload();
    }

    const handleOnMessage = (message) => {
        console.log('handleOnMessage');
        const { nativeEvent } = message;
        const data = JSON.parse(nativeEvent.data);
        // console.log(data)
        if(data.type == 'fin') {
            navigation.goBack();      
        }
    };

    const handleEndLoading = e => {
        console.log("handleEndLoading");
        /** rn에서 웹뷰로 정보를 보내는 메소드 */
        webviewRef.postMessage( JSON.stringify({
            type: "pageInfo",
            data: {
                MemberID: MemberID,
                BoardUID: BoardUID,
                BoardType: 'baby'
            }
        }));
    };

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderPopup
                    navigation={navigation}
                    title={headerTitle}
                />
                <WebView 
                    // ref={}
                    style={{marginTop:70, flex:1}} 
                    source={{ uri: url }} 
                    ref={handleSetRef}
                    incognito={true} //캐시 비우기
                    javaScriptEnabled={true}
                    onLoadEnd={handleEndLoading}
                    onMessage={handleOnMessage}
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
        height:'100%'
    },
    Content:{
        marginTop:50,
    },
    Row:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
});

export default BabyDetail;