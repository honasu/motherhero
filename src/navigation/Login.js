import React, {useState, useContext} from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
// firebase
import messaging from '@react-native-firebase/messaging';

import { Context } from "./../context/index";
import CheckBox from './../components/CheckBox';
import { serverURL } from './../../config.json';

const Login = ({ navigation }) => {

  const { state: { uid, id }, dispatch } = useContext( Context );

  const [IDText, setIDText] = useState('');
  const [PWText, setPWText] = useState('');
  const [isAuto, setIsAuto] = useState(false);
  const [submitText, setSubmitText] = useState('');
  const [loginResult, setLoginResult] = useState({
    type: 0,
    message: ""
  });

  const getFcmToken = async () => {
      if(Platform.OS == 'ios') {
        console.log('requestUserPermission');
          const authStatus = await requestUserPermission();
          if(!authStatus) {
              setToken(403);
              console.log('ios permission denied');
              navigation.goBack();  
              return ;
          }
      }
      console.log('registerDeviceForRemoteMessages');
      await messaging().registerDeviceForRemoteMessages();
      console.log('getFcmToken');
      const fcmToken = await messaging().getToken();
      console.log('fcm token : ', fcmToken);
      return fcmToken;
      
      if(!fcmToken) {
          console.log('token is missing');
          navigation.goBack();
      }
  }

  async function requestUserPermission() {
      const authStatus = await messaging().requestPermission();
      const enabled =
          authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
          authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      
      if (enabled ) {
          console.log('Authorization status:', authStatus);
          return authStatus;
      }
      else return false;
  }

  const loginBtnEvent = async () => {
    const result = await axios({
      url: serverURL + 'user/login',
      method: 'post',
      data: {
        MemberID: IDText,
        MemberPW: PWText
      }
    });
    const data = result.data;
    let loginUID = data.uid;
    let loginID = data.id;
    let loginExtra = data.extra;
    if(data.status == 200) {      
      let tokenResult = await axios({
        url: serverURL + 'user/setFCMToken',
        method: 'put',
        data: {
          MemberUID: loginUID,
          FCMToken: await getFcmToken()
        }        
      })
      if(tokenResult.data.status == 200) {
        dispatch({
          type: 'SET_UID',
          uid: loginUID,
          id: loginID,
          extra: loginExtra
        });
        if(isAuto) {
          await AsyncStorage.setItem('uid', loginUID.toString())
          await AsyncStorage.setItem('id', loginID.toString())
        }
        else {
          AsyncStorage.setItem('uid', '')
          AsyncStorage.setItem('id', '')
        }
        navigation.navigate('Main');
      }
      else {
        setLoginResult({
          type: 402,
          message: '로그인에 실패하였습니다.'
        })
      }
    }
    else if (data.status == 400) {
      setLoginResult({
        type: 400,
        message: '아이디를 확인해주세요.'
      })
    }
    else if (data.status == 401) {
      setLoginResult({
        type: 401,
        message: '비밀번호를 확인해주세요.'
      })
    }

    return ;
  }

  const checkUserText = () => {
    return (
      <Text style={styles.checkUserText}>
        {loginResult.message || ' '}
      </Text>
    )
  }

  return (
    <SafeAreaView style={{flex:1}}>
      <KeyboardAwareScrollView style={{flex:1}}>
      <View style={{ flex: 1, height: Dimensions.get('window').height, alignItems: 'center', justifyContent: 'center', alignContent:'center' }}>
        <Image source={require('../assets/images/icons/symbolLogo_big.png')} resizeMode='contain' style={styles.loginLogo}/>
          
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setIDText(text)}
            placeholder={"ID를 입력하세요"}
            placeholderTextColor = "#D5D5D5"
          />
          <TextInput
            style={styles.textInput}
            onChangeText={(text) => setPWText(text)}
            placeholder={"PW를 입력하세요"}
            placeholderTextColor = "#D5D5D5"
            secureTextEntry = {true} 
          />
        <View style={{justifyContent:'space-between', flexDirection:'row', width:330}}>
          <TouchableOpacity activeOpacity={0.8} style={styles.autoLoginButton}>
            <CheckBox
              isChecked={isAuto}
              onChange={ value => setIsAuto(value) }
              styles={styles.autoLoginCheck}
              checkTextStyle={styles.checkTextStyle}
              checkedViewStyle={styles.checkedViewStyle}
            >
              <Text style={styles.userControllText}>
                자동 로그인
              </Text>
            </CheckBox>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.userControll2} onPress = { () => navigation.navigate('IDPW') }>
            <Text style={styles.userControllText}>
              ID/PW 찾기
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.submitButton}  onPress = { () => loginBtnEvent() }>
          <Text style={styles.submitButtonText}>
            로그인
          </Text>
        </TouchableOpacity>
        {checkUserText()}
        <View style={{justifyContent:'center', flexDirection:'row', width:330, alignItems:'center'}}>
          <TouchableOpacity activeOpacity={0.8} style={styles.userControll1} onPress = { () => navigation.navigate('Join') }>
            <Text style={[styles.userControllText, {fontSize:16}]}>
              아직 회원이 아니신가요?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
        
        </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loginLogo: {
    width:150, 
    height:130, 
    marginBottom: 20,
  },
  userControllText: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Medium',
    fontSize: 13,
    color: '#AAAAAA'
  },
  userControll1: {
    marginTop:40,
    // marginLeft:20,
    // flex: 1,
    // alignItems:'flex-start',
    // paddingLeft: 20,
  },
  userControll2: {
    marginTop: 10,
    // flex: 1,
    alignItems:'flex-end',
    // paddingRight: 20,
  },
  submitButton: {
    marginTop: 20,
    borderRadius: 5,
    backgroundColor: '#92D14F',
    borderWidth: 0,
    width: 330,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center'
  }, 
  submitButtonText: {
    fontSize: 18,
    color: '#FFFFFF',
    includeFontPadding:false,
    fontFamily: 'NotoSansKR-Medium'
  },
  autoLoginButton: {
    marginTop: 10,
    backgroundColor: 'none',
    flexDirection: 'row', 
  },
  autoLoginButtonText: {
    fontSize: 10,
    color: '#AAAAAAA',
    includeFontPadding:false,
    fontFamily: 'NotoSansKR-Medium',
    alignSelf: "center",
  },
  autoLoginCheck: {
    marginTop: 3,
    width: 13,
    height: 13,
    borderRadius: 2
  },
  textInput: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 50,
    borderRadius: 5,
    borderColor: 'gray',
    borderWidth: 1,
    width: 330
  },
  checkedViewStyle: {
    backgroundColor: '#92D14F',
    borderColor:'#92D14F'
  },
  checkTextStyle: {
    includeFontPadding:false,
    fontSize: 9,
    color:'#FFFFFF'
  },
  checkUserText: {
    marginTop: 15,
    color: '#ED1164',
    includeFontPadding:false,
    fontFamily: 'NotoSansKR-Medium',
    fontSize: 13

  }
});

export default Login;

