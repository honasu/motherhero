import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Accordion from 'react-native-collapsible/Accordion';

import QNACategory from '../components/QNA/QNACategory';
import QNAList from '../components/QNA/QNAList';
import QNADetail from '../components/QNA/QNADetail'
import QNAChat from '../components/QNA/QNAChat'


const Review = ({navigation}) => {

    const [page, setPage] = useState(1);
    const [selectDetail, setSelectDetail] = useState();
    const [selectCategory, setSelectCategory] = useState();

    const onPrev = () => {
        setPage(page-1);
    }

    const onPress = (data) => {
        setPage(page+1);
        if(data.category) {
            setSelectCategory(data.category);
        }
        if(data.detail) {
            setSelectDetail(data.detail);
        }
    }

    const pageContent = () => {
        switch(page) {
            case 1:
                return (
                    <QNACategory
                        navigation={navigation}
                        onPress={data => onPress(data)}
                    />
                )
                break;
            case 2:
                if(selectCategory == '질문 게시판') {
                    return (
                        <QNAList
                            pageName={selectCategory}
                            navigation={navigation}
                            onPress={data => onPress(data)}
                            onPrev={() => onPrev()}
                        />
                    )
                }
                else {
                    return (
                        <QNAChat
                            pageName={selectCategory}
                            navigation={navigation}
                            onPrev={() => onPrev()}
                        />
                    )   
                }
                break;
            case 3:
                return (
                    <QNADetail
                        data={selectDetail}
                        navigation={navigation}
                        onPrev={() => onPrev()}
                    />
                )
                break;
            default:
                break;
        }
    };

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            {pageContent()}
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