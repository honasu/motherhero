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
            return (<Text style={[styles.moveText, dateStyle]}>
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
        paddingBottom:6,
        paddingTop:6,
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
        fontWeight: '300',
        fontSize: 15,
        paddingRight: 5
    },
    moveText: {
        width: 65,
        fontWeight: '300',
        fontSize: 13    
    }
});


export default ListContentView;

