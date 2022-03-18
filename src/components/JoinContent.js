import axios from 'axios';
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import CheckBox from './CheckBox';
import Button from './Button';
import { serverURL } from './../../config.json';


const JoinContent = (data) => {
    let page = data.page;
    let onChange = data.onChange;
    let isChecked = data.isChecked;
    let seconedPageInfo = data.seconedPageInfo;
    let thirdPageInfo = data.thirdPageInfo;
    let fourthPageInfo = data.fourthPageInfo;
    let openInfo = data.openInfo;
    let checkID = data.checkID;
    let pickImg = data.pickImg;
    let setMessage = data.setMessage;
    let img = data.img;

    const sendMsg = async () => {
        const result = await axios({
            url: serverURL + 'user/phone',
            method: 'get',
            params: {
                phone: thirdPageInfo.phone
            }
        });
        const data = result?.data;
        console.log(data);
        switch(data.status) {
            case 200:
                setMessage({text:'', successText: ''});
                onChange({randNum: data.rand.toString()});
                break;
            case 101:
                setMessage({text:data.message, successText: ''});
                break;
            case 102:
                setMessage({text: '다시 시도해주세요.', successText: ''});
                break;
            default:
                break;
        }        
    }

    const joinImg = () => {
        let result;
        if(page == 1) result = (<Image source={require('./../assets/images/icons/step1.png')} style={styles.joinHeaderImg}/>);
        if(page == 2) result = (<Image source={require('./../assets/images/icons/step2.png')} style={styles.joinHeaderImg}/>);
        if(page == 3) result = (<Image source={require('./../assets/images/icons/step3.png')} style={styles.joinHeaderImg}/>);
        if(page == 4) result = (<Image source={require('./../assets/images/icons/step4.png')} style={styles.joinHeaderImg}/>);
        
        return result;
    }

    const joinText = () => {
        let text = '';
        if(page == 1) text = '약관 등록';
        if(page == 2) text = '계정 정보 입력하기';
        if(page == 3) text = '기본 정보 입력하기';
        if(page == 4) text = '프로필 꾸미기';
        
        return (
            <View style={styles.StepHeaderTextArea}>
                <Text style={styles.StepHeaderText}>{text}</Text>
            </View>
        );
    }


    const joinData = () => {


        let result;

        switch(page) {
            case 1:
                result = (
                    <View>
                        <CheckBox
                            isChecked={ isChecked.isChecked1 }
                            onChange={ value => {onChange({isChecked1: value});}}
                            styles={{marginTop: 15}}
                        >
                            <TouchableOpacity activeOpacity={0.8}  style={{marginTop: 15}} onPress = { () => { openInfo(1)}}>
                                <Text style={styles.firstJoinText}>
                                    서비스 이용약관에 동의합니다.
                                </Text>
                            </TouchableOpacity>
                        </CheckBox>
                        <CheckBox
                            isChecked={ isChecked.isChecked2 }
                            onChange={ value => onChange({isChecked2: value}) }
                            styles={{marginTop: 15}}
                        >
                            <TouchableOpacity activeOpacity={0.8}  style={{marginTop: 15}} onPress = { () => { openInfo(2)}}>
                                <Text style={styles.firstJoinText}>
                                개인정보 취급방침에 동의합니다.
                                </Text>
                            </TouchableOpacity>
                        </CheckBox>
                    </View>
                );
                break;
            case 2:
                result = (
                    <View>
                        <View style={styles.joinIdView}>
                            <View style={[styles.joinInputView, styles.joinIdInputView]}>
                                <TextInput
                                    style={styles.joinInput}
                                    placeholder={"아이디를 입력해주세요."}
                                    placeholderTextColor = "#D5D5D5"
                                    onChangeText={ text => onChange({id: text}) }
                                    value={seconedPageInfo.id}
                                    maxLength={20}
                                />
                            </View>
                            <Button 
                                styles={styles.idCkButton} 
                                onPress = { () => checkID() }
                                title='중복체크'
                                TextStyle={styles.idCkText}
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"비밀번호를 입력해주세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => onChange({pw: text}) }
                                value={seconedPageInfo.pw}
                                secureTextEntry = {true} 
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"비밀번호를 확인해주세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => onChange({pwCk: text}) }
                                value={seconedPageInfo.pwCk}
                                secureTextEntry = {true} 
                            />
                        </View>
                    </View>
                );
                break;
            case 3:
                result = (
                    <View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"이름을 입력해주세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => onChange({name: text}) }
                                value={thirdPageInfo.name}
                                secureTextEntry = {false} 
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"생년월일을 입력해주세요. ex)970525"}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => onChange({birth: text})}
                                value={thirdPageInfo.birth}
                                secureTextEntry = {false} 
                            />
                        </View>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"이메일을 입력해주세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => onChange({email: text}) }
                                value={thirdPageInfo.email}
                                secureTextEntry = {false} 
                            />
                        </View>
                        <View style={[styles.joinPhoneInputView]}>
                            <View style={[styles.joinInputView, {flex: 1}]}>
                                <TextInput
                                    style={[styles.joinInput]}
                                    placeholder={"연락처를 입력해주세요."}
                                    placeholderTextColor = "#D5D5D5"
                                    onChangeText={ text => onChange({phone: text}) }
                                    value={thirdPageInfo.phone}
                                    secureTextEntry = {false} 
                                />
                            </View>
                            <TouchableOpacity
                                style={styles.joinPhoneInputButton}
                                onPress={() => sendMsg() }
                            >
                                <Text style={styles.joinPhoneInputButtonText}>
                                    인증하기
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {thirdPageInfo.randNum ? 
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"인증번호를 입력해주세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => {
                                    if(thirdPageInfo.randNum == text) setMessage({text:'', successText: '인증되셨습니다.'});
                                    onChange({ckRandNum: text});} 
                                }
                                value={thirdPageInfo.ckRandNum}
                                secureTextEntry = {false} 
                            />
                        </View> : null}
                    </View>
                );
                break;
            case 4:
                result = (
                    <View>
                        <TouchableOpacity
                            style={styles.joinProfileUploadImage}
                            onPress={() => pickImg()}
                        >
                            {(img) ? <Image source={{uri: img}} style={styles.joinProfileImg}/> 
                            : <Image source={require('./../assets/images/icons/login.png')} style={styles.joinProfileDefaultImg}/>}
                        </TouchableOpacity>
                        <View style={styles.joinInputView}>
                            <TextInput
                                style={styles.joinInput}
                                placeholder={"닉네임을 입력해주세요."}
                                placeholderTextColor = "#D5D5D5"
                                onChangeText={ text => onChange({nickName: text}) }
                                value={fourthPageInfo.nickName}
                            />
                        </View>
                    </View>
                );
                break;
            default:
                break;
        }

        return result;
    }

    return (
        <View >
            {joinImg()}
            {joinText()}
            {joinData()}
        </View>
    );
}

const styles = StyleSheet.create({
    joinProfileUploadImage: {
    },
    joinProfileDefaultImg: {
        marginTop:10,
        marginBottom:10,
        width:100,
        height:100,
        padding:15,
        alignSelf: 'center',
    },
    joinProfileImg: {
        // borderRadius:100, 
        // borderWidth:2, 
        marginTop:10,
        marginBottom:10,
        width:100,
        height:100,
        padding:15,
        alignSelf: 'center',
        borderRadius: 100,
    },
    firstJoinText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color:'#191919',
        fontSize:15,
    },
    joinIdView: {
        width:270,
        flexDirection: 'row',
        marginTop: 10,
    },
    joinIdInputView: {
        width:190,
        marginRight: 8,
        marginTop: 0
    },
    joinPhoneInputView: {
        width:270,
        flexDirection: 'row'
    },
    joinPhoneInputButton: {
        borderRadius:5,
        marginTop:10,
        marginLeft: 10,
        borderWidth: 0,
        padding:5,
        width: 70,
        height: 42,
        backgroundColor: '#92D14F',
        justifyContent: 'center'
    },
    joinPhoneInputButtonText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 14,
        color:'#FFFFFF',
        alignSelf: 'center', 
    },
    joinInputView: {
        borderWidth:1,
        paddingTop:5,
        paddingRight:15,
        paddingBottom:5,
        paddingLeft:15,
        borderColor:'#191919',
        borderRadius:5,
        marginTop:10,
        width:270
    },
    joinInput: {
        height:30,
        paddingTop:0,
        paddingBottom:0,
    },
    idCkButton: {
        flex:1,
        justifyContent: 'center'
    },
    idCkText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color:'#FFFFFF',
        fontSize:13,
    },
    joinHeaderImg: {
        height: 100,
        width: 250,
        // marginTop: 20,
        alignSelf: 'center', 
        resizeMode: 'contain'
    },
    StepHeaderTextArea:{
        width:200,
        alignItems:'center',
        alignSelf: 'center', 
        marginTop:10,
        marginBottom:10
    },
    StepHeaderText:{
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 18,
        color:'#191919',
    },
});

export default JoinContent;