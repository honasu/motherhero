import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Switch, ScrollView } from 'react-native';

import HeaderPopup from './../components/HeaderPopup';
import ImageButton from './../components/ImageButton';

import axios from 'axios';

const Push = ({navigation}) => {

    const [pushList, setPushList] = useState();

    const parseDate = (pushDate) => {
        let result = pushDate.split(' ');
        const d = new Date();
        const year = d.getFullYear(); 
        const month = d.getMonth() + 1; 
        const date = d.getDate(); 
        const today = `${year}.${month >= 10 ? month : '0' + month}.${date >= 10 ? date : '0' + date}`;
        console.log(today)
        return result[0] == today ? result[1] : result[0];
    }

    const appendPushList = () => {
        return (
        <ScrollView style={styles.pushListView}>
            {pushList.map((value, index) => (
                <View style={styles.contentArea} key={index}>
                    <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                        <Text style={[styles.pushType]}>
                            {value.type}
                        </Text>
                        <Text style={[styles.pushDate]}>
                            {parseDate(value.date)}
                        </Text>
                    </View>
                    <Text style={[styles.pushTitle]} numberOfLines={1}>
                        {value.title}
                    </Text>
                </View>
            ))}
        </ScrollView>
        );
    }

    const getPushList = async () => {
        // const result = await axios({
        //     url: 'http://localhost:3000/pushList',
        //     method: 'get'
        // });
        
        const data = 
        [{
            type: '지자체 지원 서비스 안내',
            date: '2021.12.17 10:21:32',
            // title: '2021 하반기 ',
            title: '2021 하반기 한부모가족동절기수당(난방비)지원 사업 안내',
            page: '',
        },
        {
            type: '지자체 지원 서비스 안내',
            date: '2021.12.06 10:21:32',
            title: '2021 하반기 ',
            page: '',
        },
        {
            type: '지자체 지원 서비스 안내',
            date: '2021.12.06 10:21:32',
            title: '2021 하반기 ',
            page: '',
        },
        {
            type: '지자체 지원 서비스 안내',
            date: '2021.12.06 10:21:32',
            title: '2021 하반기 ',
            page: '',
        },
        {
            type: '지자체 지원 서비스 안내',
            date: '2021.12.06 10:21:32',
            title: '2021 하반기 ',
            page: '',
        }];

        setPushList(data)
    };

    useEffect(() => {
        pushList ? '' : getPushList();
        console.log(pushList)
    }, [pushList])

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <HeaderPopup 
                    navigation={navigation}
                    title='알림 내역'
                />
                {pushList ? appendPushList() : <View></View>}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pushDate: {
        flex:1,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        marginTop:2,
        color:'#AAAAAA',
        textAlign: 'right',
    },
    pushListView: {
        marginTop:70,
        flex:1
    },
    pushType: {
        flex:1,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        color:'#AAAAAA',
        marginTop:2,
    },
    pushTitle: {
        width:'100%',
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 15,
        color:'#191919',
        marginTop:2,
    },
    contentArea:{
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
    deleteButton:{
        width:25,
        height:25,
        paddingLeft:0,
        paddingRight:0,
        marginLeft:5,
        position:"absolute",
        right:20
    }
});

export default Push;

