import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, WebView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderMenu from './../components/HeaderMenu';
import Selector from './../components/Selector';

import axios from 'axios';

const MotherList = ({navigation}) => {

    const [ReviewListData, setReviewListData] = useState();
    const [selectItem, setSelectItem] = useState(0);

    useEffect(() => {
        ReviewListData ? '' : getReviewListData();
    }, [ReviewListData])

    const appendInfo = () => {        
        const result = 
        [{
            uid: 5,
            url: 'https://google.com',
            title: '게시글5',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-18 12:28:36',
        }, 
        {
            uid: 4,
            url: 'https://google.com',
            title: '게시글4',
            nicName:'useruser',
            date: '2021-12-17 12:28:36'
        }, 
        {
            uid: 3,
            url: 'https://google.com',
            title: '게시글3',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-16 12:28:36'
        }, 
        {
            uid: 2,
            url: 'https://google.com',
            title: '게시글2',
            nicName:'user',
            date: '2021-12-15 12:28:36'
        }, 
        {
            uid: 1,
            url: 'https://google.com',
            title: '게시글1',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-14 12:28:36'
        }];
        const infoListData = result;
        return (
            <ScrollView>
                {infoListData.map((value, index) => 
                    <TouchableOpacity style={styles.listContent} onPress={() => navigation.navigate('MotherDetail', {
                        url : value.url,
                        uid : value.uid,
                        headerTitle: '유용한 정보'
                    })}>
                        <View style={[styles.motherFlagView, {backgroundColor:'blue'}]}>
                            <Text style={styles.motherFlagText}>유용한 정보</Text>
                        </View>
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

    function appendMarket () {        
        const result =
        [{
            uid: 5,
            url: 'https://google.com',
            title: '글5',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-18 12:28:36',
        }, 
        {
            uid: 4,
            url: 'https://google.com',
            title: '글4',
            nicName:'useruser',
            date: '2021-12-17 12:28:36'
        }, 
        {
            uid: 3,
            url: 'https://google.com',
            title: '글3',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-16 12:28:36'
        }, 
        {
            uid: 2,
            url: 'https://google.com',
            title: '글2',
            nicName:'user',
            date: '2021-12-15 12:28:36'
        }, 
        {
            uid: 1,
            url: 'https://google.com',
            title: '글1',
            nicName:'user',
            googleForm: 'https://google.com',
            date: '2021-12-14 12:28:36'
        }];
        const martketListData = result;
        return (
            <ScrollView>
                {martketListData.map((value, index) => 
                    <TouchableOpacity style={styles.listContent} onPress={() => navigation.navigate('MotherDetail', {
                        url : value.url,
                        uid : value.uid,
                        headerTitle: '나눔 마켓'
                    })}>
                        <View style={[styles.motherFlagView, {backgroundColor:'red'}]}>
                            <Text style={styles.motherFlagText}>나눔 마켓</Text>
                        </View>
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
    const getReviewListData = async () => {
        let result = await axios({
            url: 'http://localhost:3000/getQNAList',
            method: 'get',
            params: {
                category: ''
            }
        });
        setReviewListData(result.data);
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
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderMenu navigation={navigation} title="슬기로운 엄마생활"/>
                <View style={styles.selectorView}>
                    <Selector
                        data={['유용한 정보', '나눔 마켓']}
                        defaultValueByIndex="0"
                        onSelect={(value) => {setSelectItem(value)}}
                        SelectAreaStyle={styles.SelectAreaStyle}
                    />
                </View>
                {(selectItem == 1) ? appendMarket() : appendInfo()}
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
    selectorView: {
        marginTop: 70,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: '#F9FFEB',
    },
    SelectAreaStyle: {
        // flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: 30,
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
    }
});

export default MotherList;