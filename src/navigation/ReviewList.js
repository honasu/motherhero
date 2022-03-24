import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import HeaderSub from './../components/HeaderSub';
import Button from './../components/Button';
import Popup from '../components/Popup'
import ImageButton from './../components/ImageButton';
import { serverURL } from './../../config.json';
import { Context } from './../context/index';


const ReviewList = ({route, navigation}) => {
    const isFocused = useIsFocused();
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );

    const [isPopup, setIsPopup] = useState(false);
    const [reviewListData, setReviewListData] = useState([]);
    const [pageName, setPageName] = useState(route.params.pageName);
    const [MainCategory, setMainCategory] = useState(route.params.MainCategory);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);


    useEffect(() => {
        reviewListData[0] ? '' : getList();
    }, [reviewListData])

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
            url: serverURL + 'index/board',
            method: 'get',
            params: {
                page: page+1,
                limit: 20,
                BoardType: 'review',
                MainCategory: MainCategory
            }
        });
        const data = result.data;
        if(data.info[0]) {
            setPage(page+1);
            if(data.status == 200) {
                setReviewListData([...reviewListData, ...data.info]);
            }
            setLoading(false);
        }
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.listContent} 
                onPress={() => navigation.navigate('ReviewDetail', {
                    BoardUID : item.BoardUID,
                    headerTitle: MainCategory == 'apply' ? '지원 후기' : 'APP 사용 후기'
            })}>
                <Text style={styles.listTitle}>
                    {item.BoardTitle}
                </Text>
                <View style={styles.listWriteInfo}>
                    <Text style={styles.listWriter}>
                        {item.NickName}
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
    
    const moveWritePage = () => {
        id ? navigation.navigate('ReviewWrite', {
            MainCategory: MainCategory
        }) : setIsPopup(true)
    }

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }

    const resetPageData = (value) => {
        setPage(0); 
        setLoading(false); 
        setReviewListData([]); 
    }
    
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <Popup 
                    isPopup={isPopup} 
                    setIsPopup={value => setIsPopup(value)} 
                    modalText={modalText}
                    onPressOK={() => moveLoginPage()}
                />
                <ImageButton 
                    image={require('./../assets/images/icons/writeBoard.png')}
                    styles={[styles.writeButton]} 
                    onPress={moveWritePage}
                />
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={pageName}
                />
                <FlatList
                    style={styles.Content}
                    data={reviewListData}
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
        height:'100%',
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
    },
    writeButton: {
        width: 110,
        height: 110,
        position: 'absolute',
        right: -15,
        bottom: -15,
        zIndex: 5
    },
});

export default ReviewList;