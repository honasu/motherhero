import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import ReviewCategory from '../components/Review/ReviewCategory';


const Review = ({navigation}) => {
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <ReviewCategory
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
});

export default Review;