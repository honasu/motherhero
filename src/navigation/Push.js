import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { StyleSheet, View, Text, SafeAreaView, Switch, FlatList, TouchableOpacity } from 'react-native';

import HeaderPopup from './../components/HeaderPopup';
import ImageButton from './../components/ImageButton';
import CheckBox from './../components/CheckBox';
import { serverURL } from './../../config.json';
import { Context } from './../context/index';

import axios from 'axios';

const Push = ({navigation}) => {

    const { state: { uid, id }, dispatch } = useContext( Context );

    useEffect(() => {
        pushList ? '' : getPushList();
    }, [pushList])

    const [pushList, setPushList] = useState();
    const [isChecked, setIsChecked] = useState({});
    const [ deleteList, setDeleteList ] = useState(false);

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

    const onChange = (uid, value) => {
        let tmp = {};
        tmp[uid] = value;
        setIsChecked({
            ...isChecked,
            ...tmp
        })
    }

    const renderItem = ({item}) => {
        return (
            <View style={styles.contentArea}>
                {deleteList ? 
                <TouchableOpacity
                    style={{width: '100%', height: '100%'}}
                    onPress={ () => {onChange(item.PushUID, isChecked[item.PushUID] ? false : true);}}
                >
                    <CheckBox
                    isChecked={ isChecked[item.PushUID] }
                    onChange={ value => {onChange(item.PushUID, value);}}
                    styles={styles.deleteBox}
                    checkColor={'black'}
                    checkImgStyle={styles.checkImgStyle}
                    >
                    </CheckBox>             
                    <View style={[{width: '100%', paddingLeft: 15}]}>
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
                </TouchableOpacity>
                : <View style={[{width: '100%'}, deleteList ? {paddingLeft: 15} : {} ]}>
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
                </View>}
            </View>
        )
    }

    const deleteListButton = async () => {
        if(deleteList) {
            setDeleteList(false);
            await deletePushList();
        }
        else {
            setDeleteList(true);
        }
    }

    const deletePushList = async () => {
        console.log('deletePushList')
        let keys = Object.keys(isChecked);
        let values = Object.values(isChecked);
        let delPushUID = [];
        if(keys[0]) {
            for(let index = 0; index < keys.length; index++) {
                if(values[index]) delPushUID.push(keys[index])
            }
            if(delPushUID[0]) {
                console.log('delPushUID')
                let result = await axios({
                    url: serverURL + 'index/push',
                    method: 'delete',
                    params: {
                        PushUID: delPushUID,
                        MemberID: id
                    }
                });
                console.log(result.data)
                resetList();
            }
        }
    }

    const resetList = () => {
        setIsChecked({});
        setPushList();
        getPushList();
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{flex:1}}>
                <HeaderPopup 
                    navigation={navigation}
                    title='알림 내역'
                    push={true}
                    deleteListButton={() => deleteListButton()}
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
        // flex:1,
        width: '100%',
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
    },
    deleteBox: {
        width: 15, 
        height: 15, 
        borderRadius:0, 
        borderColor: '#B7B7B7', 
        // justifyContent: 'center',
        position: 'absolute',
        left: -8,
        top: 15
    },
    checkImgStyle: {
        width: 11,
        height: 11
    }
});

export default Push;

