import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Text } from 'react-native';

const ListHeaderView = (props) => {
    let movePage = props.movePage;
    let title = props.title;
    let date = props.date;
    let navigation = props.navigation;

    return (
        <View style={styles.view}>
            <TouchableOpacity activeOpacity={0.8} style={styles.moveButton} onPress={ () => navigation.navigate(movePage) }>
                <Text style={styles.title} numberOfLines={1}>
                    {title}
                </Text>
                <Text style={styles.moveText}>
                    {date}
                </Text>
                
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


export default ListHeaderView;

