import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const ListHeaderView = (props) => {
    let movePage = props.movePage;
    let title = props.title;
    let navigation = props.navigation;

    return (
        <View style={styles.view}>
            <Text style={styles.title}>
                {title}
            </Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.moveButton} onPress={ () => navigation.navigate(movePage, {}) }>
                <Image source={require('./../assets/images/icons/plus.png')} style={styles.moveImg}/>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        paddingBottom:5,
        borderBottomColor: '#92D14F',
        borderBottomWidth: 3.5,
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        // alignContent: 'center'
    },
    title: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Medium',
        fontSize: 18,
        color: '#191919',
    },
    moveImg: {
        width: 18,
        height: 18,
    }
});


export default ListHeaderView;

