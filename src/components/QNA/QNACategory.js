import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from 'react-native-collapsible/Accordion';

import HeaderMenu from './../HeaderMenu';
import ListContentView from './../ListContentView';


const QNACategory = (props) => {

    const onPress = props.onPress;
    const navigation = props.navigation;

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <HeaderMenu navigation={navigation} title="전문가 Q&A"/>
            <View style={styles.ContentView}>
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='질문 게시판'
                    onPress={() => onPress({category: '질문 게시판'})}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='KWS 지원사업 문의'
                    onPress={() => onPress({category: 'KWS 지원사업 문의'})}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='시설입소 문의'
                    onPress={() => onPress({category: '시설입소 문의'})}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='입양 문의'
                    onPress={() => onPress({category: '입양 문의'})}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='법률상담'
                    onPress={() => onPress({category: '법률상담'})}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='기타문의'
                    onPress={() => onPress({category: '기타문의'})}
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
    listContentText: {
        fontWeight: '700'
    },
    listContentButton: {
        padding:10
    },
});

export default QNACategory;