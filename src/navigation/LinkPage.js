import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, Linking } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import HeaderMenu from './../components/HeaderMenu';
import ImageButton from './../components/ImageButton';
import { Context } from './../context/index';

const LinkPage = ({navigation}) => {

    const { state: { uid, id }, dispatch } = useContext( Context );

    const data = [
        {
            image: require('./../assets/images/icons/link1.png'),
            link: 'https://kws.or.kr',
            title: '사업 안내\n'
        },
        {
            image: require('./../assets/images/icons/link2.png'),
            link: 'http://kkoom.or.kr',
            title: '꿈꾸는 가게\n쇼핑몰'
        }
    ]

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={{flex:1}}>
                <HeaderMenu navigation={navigation} id={id} title="대한사회복지회"/>
                <View style={styles.itemView}>
                    <View style={{alignItems: 'center'}}>
                        <ImageButton
                            image={data[0].image}
                            ImageStyle={styles.googleFormButton}
                            styles={{height:200}}
                            onPress={() => Linking.openURL(data[0].link)}
                            TextStyle={[styles.text, {color:'red', }]}
                            title={data[0].title}
                        />
                    </View>
                    <View style={{alignItems: 'center'}}>
                        <ImageButton
                            image={data[1].image}
                            ImageStyle={styles.googleFormButton}
                            styles={{height:200}}
                            onPress={() => Linking.openURL(data[1].link)}
                            TextStyle={[styles.text, {color:'black'}]}
                            title={data[1].title}
                        />
                    </View>
                </View>
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
    text: {
        textAlign:'center',
        fontSize: 20
    },
    itemView: {
        flex:1,
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 50,
        justifyContent: 'center',
    },
    googleFormButton: {
        width: 130,
        height: 130,
    },
});

export default LinkPage;