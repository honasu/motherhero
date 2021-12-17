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
            <TouchableOpacity activeOpacity={0.8} style={styles.moveButton} onPress={ () => navigation.navigate(movePage) }>
                <Text style={styles.moveText}>
                    +
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    view: {
        paddingBottom:5,
        borderBottomColor: 'black',
        borderBottomWidth: 3.5,
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    title: {
        fontWeight: '600',
        fontSize: 17
    },
    moveText: {
        fontWeight: '600',
        fontSize: 17      
    }
});


export default ListHeaderView;

