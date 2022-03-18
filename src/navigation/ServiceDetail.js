import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { Dimensions, StyleSheet, View, Platform, Image, Text } from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';
// import RNFetchBlob from 'rn-fetch-blob';
import RNFS from'react-native-fs';

import Button from './../components/Button';
import HeaderPopup from './../components/HeaderPopup';
import Popup from './../components/Popup'

import { Context } from './../context/index';
import { webURL } from './../../config.json';

const ServiceDetail = ({route, navigation}) => {
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );
    let url = webURL + 'listBoard.html';
    let [BoardUID, setBoardUID] = useState(route.params.boardUID);
    const [isPopup, setIsPopup] = useState(false);

    const [headerInfo, setHeaderInfo] = useState(route.params); //type, text

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }
    
    const onPressAppendButton = () => {
        if(id) {
            navigation.navigate('ServiceApply', {
                ...headerInfo,
                boardUID: BoardUID,
                googleForm: route.params.googleForm,
            })
        }
        else {
            setIsPopup(true);
        }
    }

    const appendButton = () => {
        return (
            <Button 
                styles={styles.appendButtonStyle} 
                title='신청하기'
                TextStyle={styles.appendButtonTextStyle}
                onPress={onPressAppendButton} 
            />
        );
    }

    let webviewRef = useRef();

    /** 웹뷰 ref */
    const handleSetRef = _ref => {
      webviewRef = _ref;
    };

    const reload = () => {
        webviewRef.reload();
    }

    const handleOnMessage = async (message) => {
        const { nativeEvent } = message;
        const data = JSON.parse(nativeEvent.data);
        if(data.type == 'fin') {
            navigation.goBack();      
        }
        if(data.type == 'downloadFile') {
            console.log(data)
            const dirs = RNFS.DocumentDirectoryPath
            const homePath = dirs + '/' + data.name

            let down = await RNFS.downloadFile({
                fromUrl: data.path,
                toFile: homePath,
              })
            //   console.log(homePath)
            //   setImg({ "uri" : homePath })
            }
    };

    const handleEndLoading = e => {
        console.log("handleEndLoading");
        /** rn에서 웹뷰로 정보를 보내는 메소드 */
        webviewRef.postMessage( JSON.stringify({
            type: "pageInfo",
            data: {
                MemberID: id,
                BoardUID: BoardUID,
                BoardType: 'age',
                OS: Platform.OS
            }
        }));
    };

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderPopup
                    navigation={navigation}
                    title={headerInfo ? headerInfo.text : ''}
                />
                <Popup 
                    isPopup={isPopup} 
                    setIsPopup={value => setIsPopup(value)} 
                    modalText={modalText}
                    onPressOK={() => moveLoginPage()}
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
                {route.params.googleForm ? appendButton() : <View></View>}
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
        marginTop:70,
        flex:1
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
    ActiveHeader:{
        paddingLeft:0,
        paddingRight:0,
        marginLeft:10,
        marginRight:10
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
        paddingLeft: 12
    },
    HeaderArrow:{
        width:20,
        height:20,
        position:'absolute',
        top:15,
        right:22
    },
    Item: {
        borderBottomColor:'#9e9e9e',
        borderBottomWidth:1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: 'white',
    },
    selectorView: {
        marginTop: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'lightgreen',
    },
    SelectAreaStyle: {
        // flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: 30,
    },
    appendButtonStyle: {
        alignSelf: 'center', 
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20, 
        marginBottom: 20, 
    },
    appendButtonTextStyle: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 17,
        color:'#FFFFFF',
    },
});

export default ServiceDetail;