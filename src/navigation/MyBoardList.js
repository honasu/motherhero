import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import HeaderSub from '../components/HeaderSub';
import Button from '../components/Button';
import Popup from '../components/Popup'
import ImageButton from '../components/ImageButton';
import { serverURL } from '../../config.json';
import { Context } from '../context/index';


const MyBoardList = ({route, navigation}) => {
    const isFocused = useIsFocused();
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );

    const [isPopup, setIsPopup] = useState(false);
    const [listData, setListData] = useState([]);
    const [MainCategory, setMainCategory] = useState(route.params.MainCategory);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);


    useEffect(() => {
        listData[0] ? '' : getList();
    }, [listData])

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
                MemberID: id,
            }
        });
        const data = result.data;
        if(data.info[0]) {
            setPage(page+1);
            if(data.status == 200) {
                setListData([...listData, ...data.info]);
            }
            setLoading(false);
        }
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.listContent} 
                onPress={() => goDetail(item.MainCategory, item.BoardUID)}
            >
                <Text style={styles.listTitle}>
                    {parseBoardType(item.MainCategory)}{item.BoardTitle}
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

    const goDetail = (boardType, boardUID) => {        
        switch(boardType) {
            case 'apply':
                navigation.navigate('ReviewDetail', {
                    BoardUID : boardUID,
                    headerTitle: '지원 후기'
                });
                break;
            case 'use':
                navigation.navigate('ReviewDetail', {
                    BoardUID : boardUID,
                    headerTitle: 'APP 사용 후기'
                });
                break;
            case 'market':
                navigation.navigate('MotherDetail', {
                    BoardUID : boardUID,
                    headerTitle: '나눔 마켓'
                });
                break;
            case 'info':
                navigation.navigate('MotherDetail', {
                    BoardUID : boardUID,
                    headerTitle: '유용한 정보'
                });
                break;
            case 'question':
                navigation.navigate('QNADetail', {
                    BoardUID : boardUID,
                    headerTitle: '질문 게시판'
                });
                break;
            default:
                return '';
        }
    }

    const parseBoardType = (boardType) => {
        switch(boardType) {
            case 'apply':
                return '[지원 후기] ';
            case 'use':
                return '[APP 사용 후기] ';
            case 'market':
                return '[나눔 마켓] ';
            case 'info':
                return '[유용한 정보] ';
            case 'question':
                return '[질문 게시판] ';
            default:
                return '';
        }
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

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }

    const resetPageData = (value) => {
        setPage(0); 
        setLoading(false); 
        setListData([]); 
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
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={'내가 쓴 글'}
                />
                <FlatList
                    style={styles.Content}
                    data={listData}
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

export default MyBoardList;