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
                    <View>
                        <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
                            <Text style={[styles.pushTitle, styles.pushText]}>
                                {value.title}
                            </Text>
                            <Text style={[styles.pushDate]}>
                                {parseDate(value.date)}
                            </Text>
                        </View>
                        <Text style={[styles.pushDetail, styles.pushText]} numberOfLines={1}>
                            {value.detail}
                        </Text>
                    </View>
                    <ImageButton
                        image={require('./../assets/images/icon/multifly.png')}
                        styles={styles.deleteButton}
                        onPress={() => navigation.goBack()}
                    />
                </View>
            ))}
        </ScrollView>
        );
    }

    const getPushList = async () => {
        const result = await axios({
            url: 'http://localhost:3000/pushList',
            method: 'get'
        });
        
        setPushList(result.data)
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
        width: 80,
        fontSize:15,
        height:20,
        marginTop:2,
        marginRight:30,
        textAlign: 'right',
    },
    pushListView: {
        marginTop:60,
    },
    pushText:{
        flex:1,
        fontSize:15,
        height:20,
        marginTop:2,
    },
    contentArea:{
        marginTop:5,
        flexDirection: "row",
        flexWrap: "wrap",
        flex:1,
        height:45,
        paddingLeft:20,
        paddingRight:20,
        position:'relative',
        borderBottomColor: 'lightgray',
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

