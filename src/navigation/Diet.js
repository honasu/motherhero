import React from 'react';
import { WebView } from 'react-native-webview';
import { SafeAreaView, StyleSheet } from 'react-native';

const Diet = ({ navigation }) => {
    return (
        <WebView source={{ uri: 'https://dorm.pusan.ac.kr/dorm/function/mealPlan/20000403' }} />
    );
};

const styles = StyleSheet.create({
});

export default Diet;

