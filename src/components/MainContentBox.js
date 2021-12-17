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
        width: 80,
        height: 80,
        resizeMode: 'contain',
    },
    contentText: {
        marginTop: 10,
        fontSize: 13,
        fontWeight: "bold",
        textAlign:'center'
    },
    contentView: {
        backgroundColor: '#fff',
        // borderColor: '#3143e8',
        flex: 1,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        padding: 2,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',      
    },
    contentButton: {
        // alignItems:'center',
        flex: 1,
        margin:8,
    },
});


export default MainContentBox;

