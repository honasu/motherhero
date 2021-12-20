import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, WebView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderSub from '../components/HeaderSub';
import Selector from '../components/Selector';

const ServiceInfoList = ({route, navigation}) => {

    const [headerInfo, setHeaderInfo] = useState(route.params); //type, text
    const [serviceList, setServiceList] = useState();

    useEffect(() => {
        serviceList ? '' : getSelectorList();
    }, [serviceList, headerInfo])

    const getSelectorList = () => {
        //todo axios, headerInfo.type
        const data = [{
            uid: 5,
            url: 'https://google.com',
            title: '제 5회 미혼모 지원 대출 사업',
            nicName:'admin',
            googleForm: 'https://google.com',
            date: '2021-12-18 12:28:36',
        }, 
        {
            uid: 4,
            url: 'https://google.com',
            title: '제 4회 미혼모 지원 대출 사업',
            nicName:'admin',
            date: '2021-12-17 12:28:36'
        }, 
        {
            uid: 3,
            url: 'https://google.com',
            title: '제 3회 미혼모 지원 대출 사업',
            nicName:'admin',
            googleForm: 'https://google.com',
            date: '2021-12-16 12:28:36'
        }, 
        {
            uid: 2,
            url: 'https://google.com',
            title: '제 2회 미혼모 지원 대출 사업',
            nicName:'admin',
            date: '2021-12-15 12:28:36'
        }, 
        {
            uid: 1,
            url: 'https://google.com',
            title: '제 1회 미혼모 지원 대출 사업',
            nicName:'admin',
            googleForm: 'https://google.com',
            date: '2021-12-14 12:28:36'
        }];

        setServiceList(data);
    }

    const appendList = () => {
        return (
            <ScrollView style={{marginTop:50}}>
                {serviceList.map((value, index) => 
                    <TouchableOpacity style={styles.listContent} onPress={() => {navigation.navigate('ServiceDetail', {
                        ...headerInfo,
                        url: value.url,
                        uid: value.uid,
                        googleForm: value.googleForm,
                    })}}>
                        <Text style={styles.listTitle}>
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
                    type='favorite'
                    isOn={false}
                    navigation={navigation}
                    title={headerInfo ? headerInfo.text : ''}
                />
                {serviceList ? appendList() : <View></View>}
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

export default ServiceInfoList;