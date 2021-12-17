import React, {useState} from 'react';
import { Image, StyleSheet, View, Text, TextInput, Button, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import CheckBox from './../components/CheckBox';


const Login = ({ navigation }) => {

  const [IDText, setIDText] = useState('');
  const [PWText, setPWText] = useState('');
  const [isAuto, setIsAuto] = useState(false);
  const [submitText, setSubmitText] = useState('');

  return (
    <SafeAreaView style={{flex:1}}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image source={require('../assets/images/cat2.jpeg')} style={{width:250, height:250, marginBottom: 10,}}/>
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setIDText(text)}
          placeholder="ID를 입력하세요"
        />
        <TextInput
          style={styles.textInput}
          onChangeText={(text) => setPWText(text)}
          placeholder="PW를 입력하세요"
        />
        <TouchableOpacity activeOpacity={0.8} style={styles.autoLoginButton}>
          <CheckBox
            isChecked={isAuto}
            onChange={ value => setIsAuto(value) }
            styles={{}}
          >
            <Text style={styles.autoLoginButtonText}>
              자동 로그인
            </Text>
          </CheckBox>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.8} style={styles.submitButton}  onPress = { () => navigation.navigate('Main') }>
          <Text style={styles.submitButtonText}>
            로그인
          </Text>
        </TouchableOpacity>
        <View></View>
        <View style={{justifyContent:'space-between', flexDirection:'row', width:350}}>
          <TouchableOpacity activeOpacity={0.8} style={styles.userControll1} onPress = { () => navigation.navigate('Join') }>
            <Text style={styles.userControllText}>
              회원가입
            </Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.8} style={styles.userControll2} onPress = { () => navigation.navigate('Search') }>
            <Text style={styles.userControllText}>
              ID/PW 찾기
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  
  userControllText: {
    fontWeight: '500',
  },
  userControll1: {
    marginTop:20,
    marginLeft:20,
    flex: 1,
    alignItems:'flex-start',
    paddingLeft: 20,
  },
  userControll2: {
    marginTop:20,
    marginRight:20,
    flex: 1,
    alignItems:'flex-end',
    paddingRight: 20,
  },
  submitButton: {
    marginTop: 10,
    padding:10,
    borderRadius: 10,
    backgroundColor: '#47C83E',
    borderWidth: 0,
    width: 300,
    alignItems: 'center',
  }, 
  submitButtonText: {
    fontSize: 17,
    color: 'white',
    fontWeight: "500"
  },
  autoLoginButton: {
    marginTop: 10,
    padding:5,
    backgroundColor: 'none',
    borderWidth: 0,
    width: 300,
    flexDirection: 'row', 
  },
  autoLoginButtonText: {
    fontSize: 15,
    color: 'black',
    fontWeight: "300",
    alignSelf: "center",
  },
  textInput: {
    marginTop: 10,
    paddingHorizontal: 10,
    height: 40,
    borderRadius: 10,
    borderColor: 'gray',
    borderWidth: 2,
    width: 300
  },
  showText: {
    marginTop: 10,
    fontSize: 25,
  }
});

export default Login;

