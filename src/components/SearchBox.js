import * as React from 'react';
import { useState } from 'react';
import { StyleSheet, ScrollView, View, Image, Text } from 'react-native';

import Input from './../components/Input';
import ImageButton from './../components/ImageButton';

const SearchBox = (props) => {
    const [searchText, setSearchText] = useState();
    return (
        <View style={[styles.View, styles.Shadow]} >
            <Input
                styles={styles.Input}
                InputStyle={styles.InputStyle}
                placeholder={"검색 내용을 입력하세요."}
                onChangeText={setSearchText}
            />
            <ImageButton
                image={require('./../assets/images/icons/search.png')}
                styles={styles.SearchButton}
                onPress={() => {
                    console.log('search');
                    props.navigation.navigate('SearchPage', {
                        text: searchText
                    })
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    View: {
        width:'90%',
        height:50,
        paddingTop:5,
        paddingBottom:5,
        // paddingLeft:10,
        paddingRight:10,
        flexWrap: "wrap",
        flexDirection: "row",
        position:'absolute',
        top:225,
        alignSelf: 'center',
        backgroundColor:'white',
        alignItems: 'center',
        borderRadius:10
    },
    Shadow: { 
        ...Platform.select({ 
            ios: { 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                shadowRadius: 1.41,
            }, 
            android: { 
                shadowColor: "#000000",
                
                elevation: 2,
            }, 
        }), 
    },
    SearchButton:{
      width:24,
      height:24,
      paddingLeft:0,
      paddingRight:0,
      marginTop:10,
      marginLeft:10,
    },
    Input:{
      flex: 1,
      marginLeft:1,
      paddingTop:0,
      paddingBottom:0,
      height:'100%',
      borderWidth:0,
    },
    InputStyle:{
      height:'100%',
      fontSize:13,
    },
  });

export default SearchBox;