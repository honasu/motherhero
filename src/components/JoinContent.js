
import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, KeyboardAvoidingView } from 'react-native';

import CheckBox from './CheckBox';

const joinImg = (page) => {
    let result;
    if(page == 1) result = (<Image source={require('./../assets/images/icons/3tabs1.png')} style={styles.joinHeaderImg}/>);
    if(page == 2) result = (<Image source={require('./../assets/images/icons/3tabs2.png')} style={styles.joinHeaderImg}/>);
    if(page == 3) result = (<Image source={require('./../assets/images/icons/3tabs3.png')} style={styles.joinHeaderImg}/>);
    
    return result;
}

const joinText = (page) => {
    let text = '';
    if(page == 1) text = '약관 등록';
    if(page == 2) text = '기본 정보 입력하기';
    if(page == 3) text = '프로필 꾸미기';
    
    return (
        <View style={styles.StepHeaderTextArea}>
            <Text style={styles.StepHeaderText}>{text}</Text>
        </View>
    );
}

const openInfo = (type) => {
	switch(type) {
		case 1:
			console.log('check1');
			break;
		case 2:
			console.log('check2');
			break;
		default:
			//대충 아무일이나 해랏
			break;
	}
}

const joinData = (data) => {

    let page = data.page;
    let onChange = data.onChange;
    let isChecked = data.isChecked;
    let seconedPageInfo = data.seconedPageInfo;
    let thirdPageInfo = data.thirdPageInfo;

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
                    <View style={styles.joinInputView}>
                        <TextInput
                            style={styles.joinInput}
                            placeholder={"이름을 입력하세요."}
                            placeholderTextColor = "#D5D5D5"
                            onChangeText={ text => onChange({name: text}) }
                            value={seconedPageInfo.name}
                        />
                    </View>
                    <View style={styles.joinInputView}>
                        <TextInput
                            style={styles.joinInput}
                            placeholder={"생년월일을 입력하세요."}
                            placeholderTextColor = "#D5D5D5"
                            onChangeText={ text => onChange({birth: text}) }
                            value={seconedPageInfo.birth}
                        />
                    </View>
                    <View style={styles.joinInputView}>
                        <TextInput
                            style={styles.joinInput}
                            placeholder={"연락처를 입력하세요."}
                            placeholderTextColor = "#D5D5D5"
                            onChangeText={ text => onChange({phone: text}) }
                            value={seconedPageInfo.phone}
                        />
                    </View>
                    <View style={styles.joinInputView}>
                        <TextInput
                            style={styles.joinInput}
                            placeholder={"이메일을 입력하세요."}
                            placeholderTextColor = "#D5D5D5"
                            onChangeText={ text => onChange({email: text}) }
                            value={seconedPageInfo.email}
                        />
                    </View>
                </View>
            );
            break;
        case 3:
            result = (
                <View>
                    <TouchableOpacity
                        style={styles.joinProfileUploadImage}
                    >
                        {/* todo 업로드 */}
                        <Image source={require('./../assets/images/icons/login.png')} style={styles.joinProfileImg}/>
                    </TouchableOpacity>
                    <View style={styles.joinInputView}>
                        <TextInput
                            style={styles.joinInput}
                            placeholder={"닉네임을 입력하세요."}
                            placeholderTextColor = "#D5D5D5"
                            onChangeText={ text => onChange({nicName: text}) }
                            value={thirdPageInfo.nicName}
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


const JoinContent = (data) => {
    let page = data.page;
    return (
        <View >
            {joinImg(page)}
            {joinText(page)}
            {joinData(data)}
        </View>
    );
}

const styles = StyleSheet.create({
    joinProfileUploadImage: {

    },
    joinProfileImg: {
        // borderRadius:100, 
        // borderWidth:2, 
        marginTop:10,
        marginBottom:10,
        width:100,
        height:100,
        padding:15,
        alignSelf: 'center'
    },
    firstJoinText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color:'#191919',
        fontSize:15,
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