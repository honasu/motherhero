import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, FlatList } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderSub from '../components/HeaderSub'
import axios from 'axios';
import {AccordionList} from "accordion-collapse-react-native";
// import { Separator } from 'native-base';

import { serverURL } from './../../config.json';

const Notice = ({route, navigation}) => {
    const startIndex = route.params.index;
    const [noticeList, setNoticeList] = useState([]);
    const [activeSections, setActiveSections] = useState();
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        console.log(noticeList)
        noticeList[0] ? '' : getNoticeList();
    }, [])

    const getNoticeList = async () => {
        if(loading) return;
        setLoading(true);

        const result = await axios({
            url: serverURL + 'index/board',
            method: 'get',
            params: {
                page: page+1,
                limit: 20,
                BoardType: 'notice'
            }
        });
        const data = result.data;
        if(data.info[0]) {
            setPage(page+1);
            if(data.status == 200) {
                setNoticeList([...noticeList, ...data.info]);
            }
            setLoading(false);
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

    const renderHeader = (section) => {
        return (
        <View style={[styles.Header, styles.Row]}>
            <View style={styles.headerView}>
                <Text style={[styles.headerText]}>{section.BoardTitle}</Text>
                <Text style={styles.listDate}>
                    {parseDate(section.BoardDate)}
                </Text>
            </View>
            <Image style={[styles.HeaderArrow,]} source={(section.BoardUID == activeSections?require('./../assets/images/icons/up-arrow.png'):require('./../assets/images/icons/down-arrow.png'))}/>
        </View>
        );
    }

    const renderContent = (section) => {
        return (
        <View style={[styles.Item]}>
            <Text>
                {section.BoardDetail}
            </Text>
        </View>
        );
    }

    const onEndReached = () => {
        getNoticeList()
    }

    const appendNoticeList = () => {
        return (
            <AccordionList 
                style={styles.Content}
                list={noticeList}
                header={renderHeader}
                body={renderContent}
                keyExtractor={item => item.BoardUID}
                onEndReached={onEndReached}
                expandedIndex={startIndex}
                onToggle={(value) => value == activeSections ? setActiveSections() : setActiveSections(value)}
            />
        );
    }

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={'????????????'}
                />
                {noticeList ? appendNoticeList() : null}
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
        borderBottomColor:'#DCDCDC',
        borderBottomWidth:1,
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 15,
        paddingRight: 50,
    },
    Shadow: { 
        ...Platform.select({ 
            ios: { 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                // shadowRadius: 1.41,
            }, 
            android: { 
                shadowColor: "#000000",
                elevation: 6,
            }, 
        }), 
    },
    headerView: {
    },
    listDate: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#AAAAAA',
        fontSize: 14,
    },
    headerText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 15,
        marginBottom: 5
    },
    HeaderArrow:{
        width:20,
        height:20,
        position:'absolute',
        top:15,
        right:22
    },
    Item: {
        borderBottomColor:'#DCDCDC',
        borderBottomWidth:1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: '#F7F7F7',
    },
    applyButton: {
        paddingTop: 5,
        paddingBotton: 5,
        margin:5
    },
    applyText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 13,
    }
});

export default Notice;