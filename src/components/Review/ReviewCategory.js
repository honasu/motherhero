import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from 'react-native-collapsible/Accordion';

import HeaderMenu from './../HeaderMenu';
import ListContentView from './../ListContentView';


const ReviewCategory = (props) => {

    const onPress = props.onPress;
    const navigation = props.navigation;

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <HeaderMenu navigation={navigation} title="지원후기"/>
            <View style={styles.ContentView}>
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='지원 후기 게시판'
                    onPress={() => onPress({category: '지원 후기'})}
                />
                <ListContentView
                    textStyle={styles.listContentText}
                    buttonStyle={styles.listContentButton}
                    title='APP 사용 후기 게시판'
                    onPress={() => onPress({category: 'APP 사용 후기'})}
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

export default ReviewCategory;