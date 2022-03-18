import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import HeaderSub from './../components/HeaderSub';
import Button from './../components/Button';
import ImageButton from './../components/ImageButton';
import { serverURL } from './../../config.json';
import { Context } from './../context/index';

const ServiceInfoList = ({route, navigation}) => {
    const isFocused = useIsFocused();
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );

    const [pageName, setPageName] = useState('검색');
    const [searchText, setSearchText] = useState(route.params.text);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [searchList, setSearchList] = useState([]);
    const [isOn, setIsOn] = useState(false);

    useEffect(() => {
        searchList[0] ? '' : getList();
    }, [searchList])

    useEffect(() => {
        if(route) {
            if(route.params) {
                if(route.params.reset) {
                    resetPageData();
                }
            }
        }
    }, [isFocused])
    
    const getList = async () => {
        if(loading) return;
        setLoading(true);

        const result = await axios({
            url: serverURL + 'index/search',
            method: 'get',
            params: {
                page: page+1,
                search: searchText
            }
        });
        const data = result.data;
        if(data.info[0]) {
            setPage(page+1);
            if(data.status == 200) {
                setSearchList([...searchList, ...data.info]);
            }
            setLoading(false);
        }
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.listContent} 
                onPress={() => navigation.navigate('ServiceDetail', {
                    text: item.SubCategoryName,
                    boardUID: item.BoardUID,
                    googleForm: item.GoogleLink,
            })}>
                <Text style={styles.listTitle}>
                    {item.BoardTitle}
                </Text>
                <View style={styles.listWriteInfo}>
                    <Text style={styles.listWriter} numberOfLines={1}>
                        {item.MainCategory + ' > ' + item.SubCategoryName}
                    </Text>
                    <Text style={styles.listDate}>
                        {parseDate(item.BoardDate)}
                    </Text>
                </View>
            </TouchableOpacity>
        )
    }

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

    const resetPageData = (value) => {
        setPage(0); 
        setLoading(false); 
        searchList([]); 
    }

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={pageName}
                />
                <FlatList
                    style={styles.Content}
                    data={searchList}
                    renderItem={renderItem}
                    keyExtractor={item => item.BoardUID}
                    onEndReached={getList}
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
        width:80,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        marginTop:2,
        color:'#AAAAAA',
        textAlign: 'right',
    }
});

export default ServiceInfoList;