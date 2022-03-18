import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, ScrollView, View, Image, Text, TouchableOpacity, ImageBackground, TextInput } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../components/HeaderMenu'
import Popup from '../components/Popup'
import { Context } from './../context/index';
import axios from 'axios';
import { serverURL } from './../../config.json';

const MyInfoUpdate = ({navigation}) => {
    const { state: { uid, id, extra }, dispatch } = useContext( Context );

    
    const [message, setMessage] = useState({
        text: '',
        successText: ''
    });
    const [isPopup, setIsPopup] = useState(false);
    const [ ckPw, setCkPw ] = useState('');
    const [ pw, setPw ] = useState('');
    const [ birth, setBirth ] = useState(extra.Birth);
    const [ phone, setPhone ] = useState(extra.Phone);
    const [ name, setName ] = useState(extra.Name);
    const [ email, setEmail ] = useState(extra.Email);
    const updateUserInfo = async () => {
        console.log('updateUserInfo');

        if(pw && !pwRole(pw)) {
            setMessage({text: '비밀번호는 영문,숫자, 특수문자를 혼합하여 8~20글자 이상 입력해주세요.'});
            return;
        }
        if(pw && pw != pwCk) {
            setMessage({text:'비밀번호를 확인 해주세요.'});
            return;
        }
        if(!name || !birth || !phone || !email) {
            setMessage({text:'비밀번호를 제외한 정보는 모두 입력해주세요.'});
            return;
        }

        const result = await axios({
            url: serverURL + 'user/userInfo',
            headers: {
                'Accept': 'application/json',
            },
            method: 'put',
            data: {
                MemberPW: pw,
                Birth: birth,
                Phone: phone,
                Email: email,
                Name: name,
                MemberUID: uid
            }
        });
        const data = result.data;
        console.log(data)
        if(data.status == 200) {
            setMessage({text:'', successText: ''});
            dispatch({
                type: 'SET_EXTRA',
                extra: data.info
            });
            navigation.goBack();
        }
        setIsPopup(false);
    }

    const pwRole = (userPw) => {
        let num = userPw.search(/[0-9]/g);
        let eng = userPw.search(/[a-z]/ig);
        let spe = userPw.search(/[`~!@@#$%^&*|₩₩₩'₩";:₩/?]/gi);

        if(num < 0 || eng < 0 || spe < 0 || userPw.length < 8){
            return false;
        }
        return true;
    }
    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <Popup 
                    isPopup={isPopup} 
                    setIsPopup={value => setIsPopup(value)} 
                    modalText="수정 하시겠습니까?"
                    onPressOK={() => updateUserInfo()}
                />
                <HeaderMenu navigation={navigation} id={id} title="마이페이지"/>
                <View style={[styles.Content]}>
                    <View style={[styles.userDataList]}>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"수정할 비밀번호를 입력하세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => setPw(text) }
                                value={pw}
                                secureTextEntry = {true} 
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"비밀번호를 확인해주세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => setCkPw(text) }
                                value={ckPw}
                                secureTextEntry = {true} 
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"수정할 이름을 입력하세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => setName(text) }
                                value={name}
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"수정할 생년월일을 입력하세요. ex)970525"}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => setBirth(text) }
                                value={birth}
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"수정할 연락처를 입력하세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => setPhone(text) }
                                value={phone}
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
                        <View style={styles.messageView}>
                            {message.text ? <Text style={styles.messageText}>
                                {message.text}
                            </Text> : null}
                            {message.successText ? <Text style={styles.messageSuccessText}>
                                {message.successText}
                            </Text> : null}
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

    messageView: {
        marginTop: 20,
        alignItems: 'center'
    },
    messageText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        color:'#ED1164',
    },
    messageSuccessText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        color:'#92D14F',
    }
});
export default MyInfoUpdate;