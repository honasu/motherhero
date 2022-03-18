import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderSub from '../components/HeaderSub';

const Terms = ({route, navigation}) => {
    let detail = route.params.detail;
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderSub
                    page='normal'
                    navigation={navigation}
                    title='이용약관'
                />
                <ScrollView contentContainerStyle={{padding:10}} style={styles.termsView}>
                    <Text style={styles.termsText}>
                        {detail}
                    </Text>
                </ScrollView>
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
    termsView: {
        margin: 20,
        marginTop: 95,
        borderWidth: 1,
        borderColor: '#AAAAAA',
        // padding: 10,
        
    },
    termsText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 12,
        color:'#191919',
    }
});

export default Terms;