import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import QNACategory from '../components/QNA/QNACategory';


const QNA = ({navigation}) => {

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <QNACategory
                navigation={navigation}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    SafeAreaView:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
    },
    Content:{
        marginTop:50,
    },
});

export default QNA;