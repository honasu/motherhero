import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Switch, FlatList } from 'react-native';

import HeaderPopup from './../components/HeaderPopup';
import ImageButton from './../components/ImageButton';
import { serverURL } from './../../config.json';
import { Context } from './../context/index';

import axios from 'axios';

const Push = ({navigation}) => {

    const { state: { uid, id }, dispatch } = useContext( Context );

    const [pushList, setPushList] = useState();

    const parseDate = (boardDate) => {
        boardDate = new Date(boardDate);
        let onlyDate = `${boardDate.getFullYear()}.${(boardDate.getMonth()+1) < 10 ? '0' : '' }${(boardDate.getMonth()+1)}.${boardDate.getDate() < 10 ? '0' : ''}${boardDate.getDate()}`;
        let onlyTime = `${(boardDate.getHours()) < 10 ? '0' : '' }${boardDate.getHours()}:${(boardDate.getMinutes()) < 10 ? '0' : '' }${boardDate.getMinutes()}:${boardDate.getSeconds() < 10 ? '0' : ''}${boardDate.getSeconds()}`;
        const d = new Date();
        const year = d.getFullYear(); 
        const month = d.getMonth() + 1; 
        const date = d.getDate(); 
        const today = `${year}.${month >= 10 ? month : '0' + month}.${date >= 10 ? date : '0' + date}`;
        return onlyDate == today ? onlyTime : onlyDate;
    }

    const getPushList = async () => {
        const result = await axios({
            url: serverURL + 'index/push',
            method: 'get',
            params: {
                MemberID: id,
            } 
        });
        const data = result.data;
        const info = data.info;
        setPushList(info)
    };

    useEffect(() => {
        pushList ? '' : getPushList();
        // console.log(pushList)
    }, [pushList])


    const renderItem = ({item}) => {
        // let type = item.PushType;
        console.log(item.PushTitle)
        return (            
            <View style={styles.contentArea}>
                <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <Text style={[styles.pushType]} numberOfLines={1}>
                        {item.PushTitle}
                    </Text>
                    <Text style={[styles.pushDate]}>
                        {parseDate(item.PushDate)}
                    </Text>
                </View>
                <Text style={[styles.pushTitle]} numberOfLines={1}>
                    {item.PushDetail}
                </Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <HeaderPopup 
                    navigation={navigation}
                    title='알림 내역'
                />
                <FlatList
                    style={styles.pushListView}
                    data={pushList}
                    renderItem={renderItem}
                    keyExtractor={item => item.PushUID}
                    // onEndReached={getPush}
                />  
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    pushDate: {
        width:80,
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

