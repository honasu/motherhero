import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, WebView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderSub from '../components/HeaderSub';
import Button from '../components/Button';
import Selector from '../components/Selector';

import axios from 'axios';

const QNAList = ({route, navigation}) => {

    const pageName = route.params.pageName;

    const [QNAListData, setQNAListData] = useState();

    useEffect(() => {
        QNAListData ? '' : getQNAListData();
    }, [QNAListData])

    const getQNAListData = async () => {
        // let result = await axios({
        //     url: 'http://localhost:3000/getQNAList',
        //     method: 'get',
        // });
        const data = [{
            uid: 5,
            url: 'https://google.com',
            title: '게시글5scklsjanflisnfbvlkenglernglaergnliekrgnlkergnlkergnl',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-18 12:28:36',
        }, 
        {
            uid: 4,
            url: 'https://google.com',
            title: '게시글4',
            nicName:'useruser',
            date: '2021-12-17 12:28:36'
        }, 
        {
            uid: 3,
            url: 'https://google.com',
            title: '게시글3',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-16 12:28:36'
        }, 
        {
            uid: 2,
            url: 'https://google.com',
            title: '게시글2',
            nicName:'user',
            date: '2021-12-15 12:28:36'
        }, 
        {
            uid: 1,
            url: 'https://google.com',
            title: '게시글1',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-14 12:28:36'
        }]
        setQNAListData(data);
    }

    const appendList = () => {
        return (
            <ScrollView style={{marginTop:70}}>
                {QNAListData.map((value, index) => 
                    <TouchableOpacity style={styles.listContent} onPress={() => navigation.navigate('QNADetail', {
                        pageName:pageName,
                        uid : value.uid,
                        url : value.url
                    })}>
                        <Text style={styles.listTitle} numberOfLines={1}>
                            {value.title}
                        </Text>
                        <View style={styles.listWriteInfo}>
                            <Text style={styles.listWriter}>
                                {value.nicName}
                            </Text>
                            <Text style={styles.listDate}>
                                {parseDate(value.date)}
                            </Text>
                        </View>
                    </TouchableOpacity>
                )}
            </ScrollView>
        )
    }

    const parseDate = (data) => {
        let result = data.split(' ');
        const d = new Date();
        const year = d.getFullYear(); 
        const month = d.getMonth() + 1; 
        const date = d.getDate(); 
        const today = `${year}.${month >= 10 ? month : '0' + month}.${date >= 10 ? date : '0' + date}`;
        return result[0] == today ? result[1] : result[0];
    }
    
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={pageName}
                />
                {QNAListData ? appendList() : <View></View>}
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
    listContent: {
        marginTop:5,
        flexWrap: "wrap",
        flex:1,
        height:65,
        padding: 7,
        paddingLeft:20,
        paddingRight:20,
        position:'relative',
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    ContentView: {
        flex: 1
    },
    listTitle: {
        flex:1,
        width:'100%',
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 15,
        color:'#191919',
        marginTop:2,
    },
    listWriteInfo: {
        flexDirection: 'row',
        justifyContent:'space-between',
    },
    listWriter: {
        flex:1,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        color:'#AAAAAA',
        marginTop:2,
    },
    listDate: {
        flex:1,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        marginTop:2,
        color:'#AAAAAA',
        textAlign: 'right',
    }
});

export default QNAList;