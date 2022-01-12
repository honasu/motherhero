import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderSub from '../components/HeaderSub'
import Accordion from 'react-native-collapsible/Accordion';

const BabyCategory = ({navigation}) => {

    const [babyList, setBabyList] = useState();
    const [activeSections, setActiveSections] = useState([]);

    useEffect(() => {
        babyList ? '' : getBabyList();
    }, [babyList])

    const setMoveButton = (data) => {
        return data.map((value, index) => 
            (
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[styles.applyButton]} 
                    onPress={ () => navigation.navigate('BabyInfo', {
                        type: value.type,
                        text: value.text.split(' ')[1],
                    })}
                >
                    <Text style={styles.applyText}>
                        {'・ ' + value.text}
                    </Text>
                </TouchableOpacity>
            )
        );
    };

    const getBabyList = () => {
        setBabyList([
            {
                index : 0,
                title : "공지5",
                description : <Text>공지5내용</Text>
            },
            {
                index : 1,
                title : "공지4",
                description : <Text>공지4내용</Text>
            },
            {
                index : 2,
                title : "공지3",
                description : <Text>공지3내용</Text>
            },
            {
                index : 3,
                title : "공지2",
                description : <Text>공지2내용</Text>
            },
            {
                index : 4,
                title : "공지1",
                description : <Text>공지1내용</Text>
            }  
        ]);
    }

    const renderHeader = (section) => {
        return (
        <View style={[styles.Header, styles.Row]}>
            <Text style={[styles.headerText]}>{section.title}</Text>
            <Image style={[styles.HeaderArrow,]} source={(parseInt(section.index) == parseInt(activeSections)?require('./../assets/images/icon/up-arrow.png'):require('./../assets/images/icon/down-arrow.png'))}/>
        </View>
        );
    }

    const renderContent = (section) => {
        return (
        <View style={[styles.Item, ]}>
            <View>
                {section.description}
            </View>
        </View>
        );
    }

    const appendBabyList = () => {
        return (
        <ScrollView style={styles.Content}>
            <Accordion
                sections={babyList}
                activeSections={activeSections}
                renderHeader={renderHeader}
                renderContent={renderContent}
                onChange={setActiveSections}
            />
        </ScrollView>
        );
    }

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title={'공지사항'}
                />
                {babyList ? appendBabyList() : <View></View>}
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
        paddingLeft: 10,
        paddingRight: 10,
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
    headerText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 15,
        paddingLeft: 12
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

export default BabyCategory;