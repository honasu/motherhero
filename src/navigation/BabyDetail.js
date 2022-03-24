import * as React from 'react';
import { useState, useEffect, useContext, useRef } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { WebView } from 'react-native-webview';
import axios from 'axios';

import HeaderSub from '../components/HeaderSub';
import Selector from '../components/Selector';

import { Context } from './../context/index';
import { serverURL, webURL } from './../../config.json';

const BabyDetail = ({route, navigation}) => {
    const { state: { uid, id }, dispatch } = useContext( Context );

    let MemberID = id;
    let url = webURL + 'listBoard.html';
    const [headerInfo, setHeaderInfo] = useState(route.params); //type, text
    const [selectorList, setSelectorList] = useState();
    const [selectItem, setSelectItem] = useState();
    const [urlList, setUrlList] = useState();
    const [activeSections, setActiveSections] = useState();

    useEffect(() => {
        selectorList ? '' : getSelectorList();
    }, [selectorList, headerInfo, selectItem])

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
                BoardUID: urlList[selectItem],
                BoardType: 'baby'
            }
        }));
    };
    const getSelectorList = async () => {

        const result = await axios({
            url: serverURL + 'index/board',
            method: 'get',
            params: {
                page:1,
                limit:100,
                SubCategoryUID: headerInfo.type
            }
        });
        const data = result.data;
        if(data.info[0]) {
            const name = data.info.map(value => value.BoardTitle);
            const url = data.info.map(value => value.BoardUID);
            setSelectorList(name);
            setUrlList(url);
            setSelectItem(0);
        }
    }

    const appendWebView = () => {
        return <WebView 
        // ref={}
        source={{ uri: url }} 
        ref={handleSetRef}
        incognito={true} //캐시 비우기
        javaScriptEnabled={true}
        onLoadEnd={handleEndLoading}
        onMessage={handleOnMessage}
        />
        
    }

    const onSelect = (value) => {
        setSelectItem(value);

        webviewRef.postMessage( JSON.stringify({
            type: "pageInfo",
            data: {
                MemberID: MemberID,
                BoardUID: urlList[selectItem],
                BoardType: 'baby'
            }
        }));
    }

    const appendSelector = () => {
        return (
            <View style={styles.selectorView}>
                <Selector
                    data={selectorList}
                    defaultValueByIndex="0"
                    onSelect={(value) => {onSelect(value);}}
                    SelectAreaStyle={styles.SelectAreaStyle}
                />
            </View>
            
        );
    }

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={headerInfo ? headerInfo.text : ''}
                />
                {selectorList ? appendSelector() : <View></View>}
                {urlList ? appendWebView() : <View></View>}
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
        marginTop: 70,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#F9FFEB',
    },
    SelectAreaStyle: {
        // flex: 1,
        backgroundColor: '#FFFFFF',
        width: '100%',
        height: 30,
    }
});

export default BabyDetail;