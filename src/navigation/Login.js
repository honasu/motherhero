import React, {useState} from 'react';
import { Dimensions, Image, StyleSheet, View, Text, TextInput, Button, TouchableOpacity, KeyboardAvoidingView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import CheckBox from './../components/CheckBox';


const Login = ({ navigation }) => {

  const [IDText, setIDText] = useState('');
  const [PWText, setPWText] = useState('');
  const [isAuto, setIsAuto] = useState(false);
  const [submitText, setSubmitText] = useState('');

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
          <TouchableOpacity activeOpacity={0.8} style={styles.userControll2} onPress = { () => navigation.navigate('Main') }>
            <Text style={styles.userControllText}>
              ID/PW 찾기
            </Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity activeOpacity={0.8} style={styles.submitButton}  onPress = { () => navigation.navigate('Main') }>
          <Text style={styles.submitButtonText}>
            로그인
          </Text>
        </TouchableOpacity>
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
    marginTop:50,
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
    height: 56,
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
});

export default Login;

