import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const ListContentView = (props) => {
    let title = props.title;
    let date = props.date;
    let onPress = props.onPress;
    let buttonStyle = props.buttonStyle;
    let textStyle = props.textStyle;
    let dateStyle = props.dateStyle;

    const appendDate = () => {
        if(date) {
            return (<Text style={[styles.dateText, dateStyle]}>
                {date}
            </Text>);
        }
    }

    return (
        <View style={styles.view}>
            <TouchableOpacity activeOpacity={0.8} style={[styles.moveButton, buttonStyle]} onPress={ () => onPress() }>
                <Text style={[styles.title, textStyle]} numberOfLines={1}>
                    {title}
                </Text>
                {appendDate()}
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        paddingBottom:7,
        paddingTop:7,
        paddingLeft:5,
        paddingRight:5,
        borderBottomColor: 'lightgray',
        borderBottomWidth: 1,
    },
    moveButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    title: {
        flex: 1,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Thin',
        fontSize: 15,
        color: '#191919',
        paddingRight: 7
    },
    dateText: {
        width: 70,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Thin',
        fontSize: 13,
        color: '#AAAAAA',
    }
});


export default ListContentView;

