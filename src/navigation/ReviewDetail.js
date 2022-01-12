import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderPopup from '../components/HeaderPopup';
import Selector from '../components/Selector';

const ReviewDetail = ({route, navigation}) => {
    let uid = route.params.data.uid;
    let url = route.params.data.url;

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderPopup
                    navigation={navigation}
                />
                <WebView style={{marginTop:70, flex:1}} source={{ uri: url }} />
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
    selectorView: {
        marginTop: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'lightgreen',
    },
    SelectAreaStyle: {
        // flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: 30,
    }
});

export default ReviewDetail;