import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderPopup from './../components/HeaderPopup'
import Accordion from 'react-native-collapsible/Accordion';

const BabyInfo = ({navigation}) => {

    const [babyList, setBabyList] = useState();
    const [activeSections, setActiveSections] = useState();

    useEffect(() => {
        babyList ? '' : getBabyList();
        console.log(babyList)
    }, [babyList])

    const setMoveButton = (data) => {
        return (
        <View>
            {data.map((value, index) => {
                <TouchableOpacity activeOpacity={0.8} style={[styles.applyButton, styles.Shadow]} onPress={ () => navigation.navigate('Login') }>
                    <View style={styles.applyContent}>
                        <Text style={styles.applyText}>
                            서면금융제단사업{'\n'}신청하기
                        </Text>
                        <Image source={require('./../assets/images/move.png')} style={styles.applyImg}/>
                    </View>
                </TouchableOpacity>
            })}
        </View>
        );
    };

    const getBabyList = () => {
        setBabyList([
            {
                index : 0,
                title : "임신",
                description : (<View><Text>'asdf</Text></View>)
            },
            {
                index : 1,
                title : "태교",
                description : (<View><Text>'asdf</Text></View>)
            },
            {
                index : 2,
                title : "출산준비",
                description : (<View><Text>'asdf</Text></View>)
            },
            {
                index : 3,
                title : "산후조리",
                description : (<View><Text>'asdf</Text></View>)
            },
            {
                index : 4,
                title : "시설 입소 정보",
                description : (<View><Text>'asdf</Text></View>)
            }  
        ]);
    }

    const renderHeader = (section) => {
        return (
        <View style={[styles.Header, styles.Row, (parseInt(section.index) == parseInt(activeSections)?styles.ActiveHeader:"")]}>
            <Text style={styles.headerText}>{section.title}</Text>
            <Image style={[styles.HeaderArrow,(parseInt(section.index) == parseInt(activeSections)?{right:12}:"")]} source={(parseInt(section.index) == parseInt(activeSections)?require('./../assets/images/icon/up-arrow.png'):require('./../assets/images/icon/down-arrow.png'))}/>
        </View>
        );
    }

    const renderContent = (section) => {
        return (
        <View style={[styles.Item,(parseInt(section.index) == parseInt(activeSections)?{borderBottomWidth:1,borderBottomColor:'#9e9e9e'}:{borderBottomWidth:0})]}>
            <View>
                <Text>{section.description}</Text>
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
                <HeaderPopup navigation={navigation} title="육아 정보"/>
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
    ActiveHeader:{
        paddingLeft:0,
        paddingRight:0,
        marginLeft:10,
        marginRight:10
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
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
        borderBottomColor:'#9e9e9e',
        borderBottomWidth:1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: 'white',
    },
});

export default BabyInfo;