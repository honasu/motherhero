import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from '../components/Button';
import HeaderPopup from '../components/HeaderPopup';
import Selector from '../components/Selector';

const ProfileUpdate = ({route, navigation}) => {

    const [ nickName, setNickName ] = useState('');

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderPopup
                    navigation={navigation}
                    title="프로필 수정"
                />
                <View style={styles.Content} >
                    <Image source={require('./../assets/images/icons/login.png')} style={styles.joinProfileImg}/>
                    <View style={styles.joinInputView}>
                        <TextInput
                            style={styles.joinInput}
                            placeholder={"수정할 닉네임을 입력하세요."}
                            placeholderTextColor = "#D5D5D5"
                            onChangeText={ text => setNickName(text) }
                            value={nickName}
                        />
                    </View>
                    <View style={styles.submitButtonView}>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={styles.submitButton} 
                            onPress = { () => navigation.navigate('MyPage') }
                        >
                            <Text style={styles.submitButtonText}>
                                수정하기
                            </Text>
                        </TouchableOpacity>
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
    ContentView:{
        position:'relative',
        height:'100%'
    },
    Content:{
        marginTop:70,
        flex:1,
        // alignContent: 'center',
        // justifyContent: 'center',
        alignItems: 'center'
    },
    joinProfileImg: {
        // borderRadius:100, 
        // borderWidth:2, 
        marginTop:50,
        marginBottom:30,
        width:100,
        height:100,
        padding:15,
        alignSelf: 'center'
    },
    joinInputView: {
        borderWidth:1,
        paddingTop:5,
        paddingRight:15,
        paddingBottom:5,
        paddingLeft:15,
        borderColor:'#92D14F',
        borderRadius:5,
        marginTop:10,
        width:270
    },
    joinInput: {
        height:30,
        paddingTop:0,
        paddingBottom:0,
    },
    submitButtonView: {
        width: 270,
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    submitButton: {
      marginTop: 20,
      padding:10,
      borderRadius: 10,
      backgroundColor: '#92D14F',
      borderWidth: 0,
      flex: 1,
      alignItems: 'center',
    }, 
    submitButtonText: {
      fontSize: 17,
      color: 'white',
      fontWeight: "500"
    },
});

export default ProfileUpdate;