import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from 'react-native-collapsible/Accordion';

import HeaderMenu from './../HeaderMenu';
import ListContentView from './../ListContentView';


const QNACategory = (props) => {

    const navigation = props.navigation;

    return (
        <View>
            <HeaderMenu navigation={navigation} title="전문가 Q&A"/>
            <View style={styles.ContentView}>
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='질문 게시판'
                    onPress={() => navigation.navigate('QNAList', {
                        pageName:'질문 게시판',
                    })}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='KWS 지원사업 문의'
                    onPress={() => navigation.navigate('QNAChat', {
                        pageName:'KWS 지원사업 문의',
                    })}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='시설입소 문의'
                    onPress={() => navigation.navigate('QNAChat', {
                        pageName:'시설입소 문의',
                    })}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='입양 문의'
                    onPress={() => navigation.navigate('QNAChat', {
                        pageName:'입양 문의',
                    })}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='법률상담'
                    onPress={() => navigation.navigate('QNAChat', {
                        pageName:'법률상담',
                    })}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='기타문의'
                    onPress={() => navigation.navigate('QNAChat', {
                        pageName:'기타문의',
                    })}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    ContentView:{
        position:'relative',
        height:'100%',
        marginTop: 70
    },
    listContentText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 15,
    },
    listContentButton: {
        padding:10
    },
});

export default QNACategory;