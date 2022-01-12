import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const MainContentBox = (props) => {
    let page = props.page;
    let text = props.text;
    let img = props.img;
    let navigation = props.navigation;

    return (
        <TouchableOpacity activeOpacity={0.8} style={styles.contentButton} onPress={ () => navigation.navigate(page) }>
            <View style={styles.contentView}>
                <Image source={img} style={styles.contentImg}/>
                <Text style={styles.contentText}>
                    {text}
                </Text>
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    contentImg: {
        width: 65,
        height: 65,
        resizeMode: 'contain',
    },
    contentText: {
        marginTop: 0,
        fontSize: 14,
        textAlign:'center',
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Medium',
        color: '#191919'
    },
    contentView: {
        flex: 1,
        padding: 2,
        alignItems: 'center',
        justifyContent: 'flex-start',      
    },
    contentButton: {
        flex: 1,
        margin:8,
    },
});


export default MainContentBox;

