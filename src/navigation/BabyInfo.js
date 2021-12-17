import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderSub from '../components/HeaderSub';
import Selector from '../components/Selector';

const BabyInfo = ({route, navigation}) => {

    const [headerInfo, setHeaderInfo] = useState(route.params); //type, text
    const [selectorList, setSelectorList] = useState();
    const [selectItem, setSelectItem] = useState();
    const [urlList, setUrlList] = useState();
    const [activeSections, setActiveSections] = useState([]);

    useEffect(() => {
        selectorList ? '' : getSelectorList();
    }, [selectorList, headerInfo, selectItem])

    const getSelectorList = () => {
        //todo axios, headerInfo.type
        const data = [{
            name: '1a',
            url:'1asdf'
        }, 
        {
            name: '2b',
            url:'2asdf'
        }, 
        {
            name: '3c',
            url:'3asdf'
        }, 
        {
            name: '4d',
            url:'4asdf'
        }, 
        {
            name: '5e',
            url:'5asdf'
        }];
        const name = data.map(value => value.name);
        const url = data.map(value => value.url);
        setSelectorList(name);
        setUrlList(url);
        setSelectItem(0);
    }

    const appendWebView = () => {
        console.log('appendWebView');
        console.log(urlList[selectItem]);
        //todo WebView
        
    }

    const appendSelector = () => {
        return (
            <View style={styles.selectorView}>
                <Selector
                    data={selectorList}
                    defaultValueByIndex="0"
                    onSelect={(value) => {setSelectItem(value)}}
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
    }
});

export default BabyInfo;