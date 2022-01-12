import * as React from 'react';
import { useState, useEffect } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../components/HeaderMenu'
import Popup from '../components/Popup'
import Accordion from 'react-native-collapsible/Accordion';

const MyInfoUpdate = ({navigation}) => {

    const [isPopup, setIsPopup] = useState(false);
    const [ nickName, setNickName ] = useState('');
    const [ email, setEmail ] = useState('');
    const updateUserInfo = () => {
        console.log('updateUserInfo');
        setIsPopup(false);
    }
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <Popup 
                    isPopup={isPopup} 
                    setIsPopup={value => setIsPopup(value)} 
                    modalText="수정 하시겠습니까?"
                    updateUserInfo={() => updateUserInfo()}
                />
                <HeaderMenu navigation={navigation} title="마이페이지"/>
                <View style={[styles.Content]}>
                    <View style={[styles.userDataList]}>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"수정할 연락처를 입력하세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => setNickName(text) }
                                value={nickName}
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"수정할 이메일을 입력하세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => setEmail(text) }
                                value={email}
                            />
                        </View>
                        <View style={styles.submitButtonView}>
                            <TouchableOpacity 
                                activeOpacity={0.8} 
                                style={styles.submitButton} 
                                onPress = { () => {setIsPopup(true) }}
                            >
                                <Text style={styles.submitButtonText}>
                                    수정
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    testBorder: {
        borderWidth: 1,
        borderColor: '#191919',
    },
    SafeAreaView:{
        width:'100%',
        height:'100%',
        backgroundColor:'white',
    },
    ContentView:{
        position:'relative',
        height:'100%',
    },
    Content:{
        flex:1,
        marginTop:70,
    },
    profileContent: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignContent: 'center',
        padding: 15,
        borderBottomColor: '#DCDCDC',
        borderBottomWidth: 1,
    },
    userInfoView: {
      flex:1,
      height: 80,
      position: 'relative'
    },
    userNameView: {
      flex: 1,
      justifyContent: 'center',
      flexDirection: 'column',
    },
    userName: {
      includeFontPadding:false,
      fontFamily:'NotoSansKR-Regular',
      color: '#191919',
      fontSize: 20,
    },
    userImage: {
      width: 80,
      height: 80,
      marginRight: 10
    },
    userImageStyle: {
      borderRadius: 90
    },
    userInfoList: {
        flex: 1
    }, 
    userDataList: {
        width: 320,
        marginTop: 30,
        alignSelf: 'center'
    },
    userDataView: {
        flexDirection: 'row'
    },
    userDataTitle: {
        width: 90
    },
    userData: {
        
    },
    userDataText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 18,
    },
    submitButtonView: {
        width: 320,
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
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#FFFFFF',
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
        width:320
    },
    joinInput: {
        height:30,
        paddingTop:0,
        paddingBottom:0,
    },
});
export default MyInfoUpdate;