import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, WebView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderSub from './../HeaderSub';
import Selector from './../Selector';

import axios from 'axios';

const ReviewList = (props) => {

    let pageName = props.pageName;
    let navigation = props.navigation;
    let onPress = props.onPress;
    let onPrev = props.onPrev;

    const [ReviewListData, setReviewListData] = useState();

    useEffect(() => {
        ReviewListData ? '' : getReviewListData();
    }, [ReviewListData])

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

    const appendList = () => {
        return (
            <ScrollView style={{marginTop:50}}>
                {ReviewListData.map((value, index) => 
                    <TouchableOpacity style={styles.listContent} onPress={() => onPress({
                        detail: {
                            url: value.url,
                            uid: value.uid
                        }
                    })}>
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
        <View style={styles.ContentView}>
            <HeaderSub
                page='normal'
                navigation={navigation}
                title={pageName}
                onPrev={onPrev}
            />
            {ReviewListData ? appendList() : <View></View>}
        </View>
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
    }
});

export default ReviewList;