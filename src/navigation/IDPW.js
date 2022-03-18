import React, {useState, useEffect} from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet, Text, TextInput, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import axios from 'axios';

import { serverURL } from './../../config.json';
import HeaderPopup from './../components/HeaderPopup';

const IDPW = ({navigation}) => {
    const [type, setType] = useState('id'); //id, pw
    const [randNum, setRandNum] = useState();
    const [ckRandNum, setCkRandNum] = useState();
    const [IDItems, setIDItems] = useState({
        name: '',
        phone: '',
        birth: ''
    });
    const [PWItems, setPWItems] = useState({
        name: '',
        phone: '',
        birth: ''
    });
    const [updatePW, setUpdatePW] = useState({
        pw: '',
        ckpw: '',
    });
    const [message, setMessage] = useState({
        text: '',
        successText: ''
    });
    const [currentID, setCurrentID] = useState();
    const [currentUID, setCurrentUID] = useState();
    const [currentName, setCurrentName] = useState();

    const sendMsg = async () => {
        const result = await axios({
            url: serverURL + 'user/phone',
            method: 'get',
            params: {
                phone: PWItems.phone
            }
        });
        const data = result?.data;
        console.log(data)
        switch(data.status) {
            case 200:
                setRandNum(data.rand);
                setMessage({text:'', successText: ''});
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

    const submit = () => {
        switch(type) {
            case 'id':
                submitID();
                break;
            case 'finid':
                navigation.navigate('Login');
                break;
            case 'pw':
                submitPW();
                break;
            case 'updatepw':
                submitUpdatePW();
                break;
            case 'finpw':
                navigation.navigate('Login');
                break;
            default:
                break;
        }

        return null;
    }

    const submitID = async () => {
        if(!IDItems.name || !IDItems.phone || !IDItems.birth) {
            setMessage({text: '정보를 모두 기입해주세요.', successText: ''});
            return ;
        }
        //아이디 찾기
        const result = await axios({
            url: serverURL + 'user/userInfo',
            method: 'get',
            params: {
                IsResignUp: 0,
                Name: IDItems.name,
                Birth: IDItems.birth,
                Phone: IDItems.phone
            }
        })
        const data = result.data;
        console.log(data)
        if(data.status == 200 && data?.info?.MemberID) {
            resetData()
            setCurrentID(data.info.MemberID);
            setCurrentName(data.info.Name);
            setType('finid');
            return ;
        }
        setMessage({text: '이름, 연락처 혹은 생년월일을 다시 확인해주세요.', successText: ''});
        return ;
    }

    const submitPW = async () => {
        if(!PWItems.name || !PWItems.phone || !PWItems.birth || !ckRandNum) {
            setMessage({text: '정보를 모두 기입해주세요.', successText: ''});
            return ;
        }
        if(randNum != ckRandNum) {
            setMessage({text: '인증번호를 확인해주세요.', successText: ''});
            return ;
        }
        
        const result = await axios({
            url: serverURL + 'user/userInfo',
            method: 'get',
            params: {
                IsResignUp: 0,
                Name: PWItems.name,
                Birth: PWItems.birth,
                Phone: PWItems.phone
            }
        })
        const data = result.data;
        console.log(data)
        if(data.status == 200 && data?.info?.MemberID) {
            resetData()
            setCurrentUID(data.info.MemberUID);
            setType('updatepw');
            return ;
        }
        setMessage({text: '이름, 연락처 혹은 생년월일을 다시 확인해주세요.', successText: ''});
        return ;

    }

    const submitUpdatePW = async () => {
        if(updatePW.pw && !pwRole(updatePW.pw)) {
            setMessage({text: '비밀번호는 영문,숫자, 특수문자를 혼합하여 8~20글자 이상 입력해주세요.'});
            return;
        }

        if(updatePW.pw != updatePW.ckpw) {
            setMessage({text: '비밀번호가 일치하지 않습니다.', successText: ''});
            return ;
        }
        
        const result = await axios({
            url: serverURL + 'user/userInfo',
            method: 'put',
            data: {
                MemberUID: currentUID,
                MemberPW: updatePW.pw
            }
        })
        const data = result.data;
        console.log(data)
        if(data.status == 200 && data?.info?.MemberID) {
            resetData()
            setType('finpw');
            return ;
        }
        return ;
    }

    const appendUpdatePW = () => {
        return (
        <View style={[styles.itemListView]}>
            <View style={[styles.itemView]}>
                <Text style={[styles.itemTitle]}>
                    비밀번호
                </Text>
                <TextInput
                    style={[styles.itemInput, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                    value={updatePW.pw}
                    onChangeText={(text) => setUpdatePW({
                        ...updatePW,
                        pw: text
                    })}
                    placeholder={"새 비밀번호를 입력해주세요"}
                    placeholderTextColor = "#D5D5D5"
                    secureTextEntry = {true} 
                />
            </View>
            <View style={[styles.itemView]}>
                <Text style={[styles.itemTitle]}>
                    비밀번호 확인
                </Text>
                <TextInput
                    style={[styles.itemInput, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                    value={updatePW.ckpw}
                    onChangeText={(text) => setUpdatePW({
                        ...updatePW,
                        ckpw: text
                    })}
                    placeholder={"비밀번호를 확인해주세요"}
                    placeholderTextColor = "#D5D5D5"
                    secureTextEntry = {true} 
                />
            </View>
        </View>
        )
    }

    const appendID = () => {
        return (
            <View style={[styles.itemListView]}>
                <View style={[styles.itemView]}>
                    <Text style={[styles.itemTitle]}>
                        이름
                    </Text>
                    <TextInput
                        style={[styles.itemInput, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                        value={IDItems.name}
                        onChangeText={(text) => setIDItems({
                            ...IDItems,
                            name: text
                        })}
                        placeholder={"이름을 입력해주세요"}
                        placeholderTextColor = "#D5D5D5"
                        secureTextEntry = {false} 
                    />
                </View>
                <View style={[styles.itemView]}>
                    <Text style={[styles.itemTitle]}>
                        생년월일
                    </Text>
                    <TextInput
                        style={[styles.itemInput, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                        value={IDItems.birth}
                        onChangeText={(text) => setIDItems({
                            ...IDItems,
                            birth: text
                        })}
                        placeholder={"생년월일을 입력해주세요 ex)970525"}
                        placeholderTextColor = "#D5D5D5"
                        secureTextEntry = {false} 
                    />
                </View>
                <View style={[styles.itemView]}>
                    <Text style={[styles.itemTitle]}>
                        연락처
                    </Text>
                    <TextInput
                        style={[styles.itemInput, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                        value={IDItems.phone}
                        onChangeText={(text) => setIDItems({
                            ...IDItems,
                            phone: text
                        })}
                        placeholder={"연락처를 입력해주세요"}
                        placeholderTextColor = "#D5D5D5"
                        secureTextEntry = {false} 
                    />
                </View>
            </View>
        )
    }

    const appendPW = () => {
        return (
            <View style={[styles.itemListView]}>
                <View style={[styles.itemView]}>
                    <Text style={[styles.itemTitle]}>
                        이름
                    </Text>
                    <TextInput
                        style={[styles.itemInput, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                        value={PWItems.name}
                        onChangeText={(text) => setPWItems({
                            ...PWItems,
                            name: text
                        })}
                        placeholder={"이름을 입력해주세요"}
                        placeholderTextColor = "#D5D5D5"
                        secureTextEntry = {false} 
                    />
                </View>
                <View style={[styles.itemView]}>
                    <Text style={[styles.itemTitle]}>
                        생년월일
                    </Text>
                    <TextInput
                        style={[styles.itemInput, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                        value={PWItems.birth}
                        onChangeText={(text) => setPWItems({
                            ...PWItems,
                            birth: text
                        })}
                        placeholder={"생년월일을 입력해주세요 ex)970525"}
                        placeholderTextColor = "#D5D5D5"
                        secureTextEntry = {false} 
                    />
                </View>
                <View style={[styles.itemView]}>
                    <Text style={[styles.itemTitle]}>
                        연락처
                    </Text>
                    <View style={[styles.phoneView]}>
                        <TextInput
                            style={[styles.itemInput, {flex: 1}, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                            value={PWItems.phone}
                            onChangeText={(text) => setPWItems({
                                ...PWItems,
                                phone: text
                            })}
                            placeholder={"연락처를 입력해주세요"}
                            placeholderTextColor = "#D5D5D5"
                            secureTextEntry = {false} 
                        />
                        <TouchableOpacity
                            style={styles.phoneButton}
                            onPress={() => sendMsg() }
                        >
                            <Text style={styles.phoneButtonText}>
                                인증하기
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                {randNum ? 
                <View style={styles.itemView}>
                    <Text style={[styles.itemTitle]}>
                        인증번호
                    </Text>
                    <TextInput
                        style={[styles.itemInput, {flex: 1}, message.text ? {borderColor: '#ED1164'} : {borderColor: '#AAAAAA'}]}
                        placeholderTextColor = "#D5D5D5"
                        placeholder={"인증번호를 입력해주세요"}
                        onChangeText={ text => {
                                if(randNum == text) setMessage({text:'', successText: '인증되셨습니다.'});
                                setCkRandNum(text)
                            } 
                        }
                        value={ckRandNum}
                        secureTextEntry = {false} 
                    />
                </View> : null}
            </View>
        )
    }

    const append = () => {
        switch(type) {
            case 'id':
                return appendID();
                break;
            case 'pw':
                return appendPW();
                break;
            case 'updatepw':
                return appendUpdatePW();
                break;
            default:
                break;
        }

        return null;
    }

    const resetData = () => {
        setIDItems({
            name: '',
            phone: '',
            birth: ''
        });
        setPWItems({
            name: '',
            phone: '',
        })
        setMessage({
            text: '',
            successText: ''
        })
    }

    const appendTitle = () => {
        switch(type) {
            case 'id':
                return (
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>아이디 / 패스워드 찾기</Text>
                    </View>
                    );
                break;
            case 'finid':
                return (
                    <View style={[styles.titleView, {marginTop: 130, marginBottom: 200}]}>
                        <Text style={styles.titleText}>{currentName} 님의 아이디는 </Text>
                        <View style={{flexDirection:'row'}}>
                            <Text style={[styles.titleText, {color:'#92D14F'}]}>{parseID()} </Text>
                            <Text style={styles.titleText}>입니다.</Text>
                        </View>
                    </View>
                    );
                break;
            case 'pw':
                return (
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>아이디 / 패스워드 찾기</Text>
                    </View>
                    );
                break;
            case 'updatepw':
                return (
                    <View style={styles.titleView}>
                        <Text style={styles.titleText}>비밀번호 수정</Text>
                    </View>
                    );
                break;
            case 'finpw':
                return (
                    <View style={[styles.titleView, {marginTop: 130, marginBottom: 200}]}>
                        <Text style={styles.titleText}>비밀번호가 수정되었습니다.</Text>
                    </View>
                    );
                break;
            default:
                return null;
                break;
        }
    }

    const parseID = () => {
        return currentID.slice(0, -3) + '***';
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
        <SafeAreaView style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderPopup 
                    navigation={navigation}
                    title='계정 찾기'
                />                
                <KeyboardAwareScrollView style={styles.Content}>
                    {appendTitle()}
                    {
                        (type == 'id' || type == 'pw')
                        ? <View style={styles.typeView}>
                            <TouchableOpacity 
                                style={[styles.typeButton, (type == 'id' ? styles.typeSelectButton : '')]}
                                onPress={() => {setType('id'); resetData();}}
                            >
                                <Text style={[styles.typeText, (type == 'id' ? styles.typeSelectText : '')]}>아이디 찾기</Text>
                            </TouchableOpacity>
                            <TouchableOpacity 
                                style={[styles.typeButton, (type == 'pw' ? styles.typeSelectButton : '')]}
                                onPress={() => {setType('pw'); resetData();}}
                            >
                                <Text style={[styles.typeText, (type == 'pw' ? styles.typeSelectText : '')]}>비밀번호 찾기</Text>
                            </TouchableOpacity>
                        </View>
                        : null
                    }
                    {append()}
                    <TouchableOpacity
                        style={[styles.submitButton]}
                        onPress={() => submit()}
                    >
                        <Text style={[styles.submitText]}>확인</Text>
                    </TouchableOpacity>
                    <View>
                        
                    </View>
                    <View>
                        
                    </View>
                    <View style={styles.messageView}>
                        {message.text ? <Text style={styles.messageText}>
                            {message.text}
                        </Text> : null}
                        {message.successText ? <Text style={styles.messageSuccessText}>
                            {message.successText}
                        </Text> : null}
                    </View>
                </KeyboardAwareScrollView>
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
    titleView: {
        width:200,
        alignItems:'center',
        alignSelf: 'center', 
        marginTop:70,
        marginBottom:10,
    },
    titleText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Medium',
        fontSize: 18,
        color:'#191919',
    },
    typeView: {
        width: 330,
        alignSelf: 'center',
        marginTop: 30,
        flexDirection: 'row',
    },
    typeButton: {
        flex:1,
        padding: 7,
        borderBottomWidth: 1,
        borderBottomColor: '#EEEEEE'
    },
    typeSelectButton: {
        borderBottomWidth: 2.5,
        borderBottomColor: '#92D14F'
    },
    typeText: {
        fontSize: 14,
        color: '#AAAAAA',
        includeFontPadding:false,
        fontFamily: 'NotoSansKR-Medium',
        alignSelf: "center",
    },
    typeSelectText: {
        color: '#191919',
    },
    itemListView: {
        width: 330,
        alignSelf: 'center',
        marginTop: 5
    },
    itemView: {
        marginTop: 20
    },
    itemTitle: {
        fontSize: 12,
        color: '#484848',
        includeFontPadding:false,
        fontFamily: 'NotoSansKR-Medium',
    },
    itemInput: {
        marginTop: 3,
        paddingHorizontal: 10,
        height: 42,
        borderRadius: 5,
        borderColor: '#AAAAAA',
        borderWidth: 1,
    },
    phoneView: {
        width:330,
        flexDirection: 'row'
    },
    phoneButton: {
        borderRadius:5,
        marginTop:3,
        marginLeft: 10,
        borderWidth: 0,
        padding:5,
        width: 70,
        height: 42,
        backgroundColor: '#92D14F',
        justifyContent: 'center'
    },
    phoneButtonText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 14,
        color:'#FFFFFF',
        alignSelf: 'center', 
    },
    submitButton: {
        marginTop: 35,
        borderRadius: 5,
        backgroundColor: '#92D14F',
        borderWidth: 0,
        width: 330,
        height: 42,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    submitText: {
        fontSize: 18,
        color: '#FFFFFF',
        includeFontPadding:false,
        fontFamily: 'NotoSansKR-Medium'
    },
    messageView: {
        width: 330,
        alignSelf: 'center',
        marginTop: 20
    },
    messageText: {
        alignSelf: 'center',
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        color:'#ED1164',
    },
    messageSuccessText: {
        alignSelf: 'center',
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 13,
        color:'#92D14F',
    }
});

export default IDPW;