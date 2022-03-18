import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useIsFocused } from '@react-navigation/native';
import axios from 'axios';

import HeaderMenu from './../components/HeaderMenu';
import Selector from './../components/Selector';
import Button from './../components/Button';
import ImageButton from './../components/ImageButton';
import Popup from '../components/Popup'
import { serverURL } from './../../config.json';
import { Context } from './../context/index';


const MotherList = ({route, navigation}) => {

    const isFocused = useIsFocused();
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );

    const [isPopup, setIsPopup] = useState(false);
    const [motherListData, setMotherListData] = useState([]);
    const [selectItem, setSelectItem] = useState(0);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(0);

    useEffect(() => {
        motherListData[0] ? '' : getList();
    }, [motherListData])

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
        console.log('page');
        console.log(page);
        console.log('loading');
        console.log(loading);
        console.log('selectItem');
        console.log(selectItem);
        if(loading) return;
        const MainCategory = (selectItem == 1) ? 'market' : 'info';
        setLoading(true);

        const result = await axios({
            url: serverURL + 'index/board',
            method: 'get',
            params: {
                page: page+1,
                limit: 20,
                BoardType: 'mother',
                MainCategory: MainCategory
            }
        });
        const data = result.data;
        console.log(data);
        if(data.info[0]) {
            setPage(page+1);
            if(data.status == 200) {
                setMotherListData([...motherListData, ...data.info]);
            }
            setLoading(false);
        }
    }

    const renderItem = ({item}) => {
        return (
            <TouchableOpacity 
                style={styles.listContent} 
                onPress={() => navigation.navigate('MotherDetail', {
                    BoardUID : item.BoardUID,
                    headerTitle: selectItem == 1 ? '나눔 마켓' : '유용한 정보'
            })}>
                <View style={[styles.motherFlagView, selectItem == 1 ? {backgroundColor:'#ED1164'} : {backgroundColor: '#558ccc'}]}>
                    <Text style={styles.motherFlagText}>{selectItem == 1 ? '나눔 마켓' : '유용한 정보'}</Text>
                </View>
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
        id ? navigation.navigate('MotherWrite', {
            selectItem: selectItem
        }) : setIsPopup(true)
    }

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }
    
    const resetPageData = (value) => {
        console.log('value')
        console.log(value)
        setPage(0); 
        setLoading(false); 
        setMotherListData([]); 
        if(value || value == 0)setSelectItem(value);
    }

    return (
        <SafeAreaView style={styles.SafeAreaView}>
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
                <HeaderMenu navigation={navigation}title="슬기로운 엄마생활"
                     id={id} setIsPopup={value => setIsPopup(value)}/>
                <View style={styles.selectorView}>
                    <View style={styles.selectorArea}>
                        <Selector
                            data={['유용한 정보', '나눔 마켓']}
                            defaultValueByIndex="0"
                            onSelect={resetPageData}
                            SelectAreaStyle={styles.SelectAreaStyle}
                        />
                    </View> 
                </View>
                <FlatList
                    data={motherListData}
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
    writeButton: {
        width: 110,
        height: 110,
        position: 'absolute',
        right: -15,
        bottom: -15,
        zIndex: 5
    },
    selectorView: {
        marginTop: 70,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        width: '100%',
        backgroundColor: '#F9FFEB',
        flexDirection:'row',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    selectorArea: {
        width: '100%',
    },
    SelectAreaStyle: {
        backgroundColor: '#ffffff',
        width: '100%'
    },
    submitButton: {
        // marginTop: 20,
        flex:1,
        marginLeft: 10,
        padding:6,
        borderRadius: 10,
        borderColor: '#92D14F',
        borderWidth: 0,
        justifyContent: 'center',
    }, 
    submitButtonText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 12,
        color:'#FFFFFF',
    },
    motherFlagText: {
        color: 'white',
        fontSize: 8,
        fontWeight: '700'
    },
    motherFlagView: {
        padding:2,
        paddingRight:5,
        paddingLeft: 5,
        alignSelf:"flex-start",
        marginBottom: 3
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
        paddingTop: 10,
        paddingBottom: 15,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: 'white',
        width: '100%',
        maxWidth: 1024,
        position: 'relative'
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
});

export default MotherList;