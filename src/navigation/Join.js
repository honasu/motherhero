import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import JoinContent from './../components/JoinContent';
import { serverURL } from './../../config.json';

const Join = ({ navigation }) => {

    const [page, setPage] = useState(1);

    const [termInfo, setTermInfo] = useState([])
    const [firstPageInfo, setFirstPageInfo] = useState({
        isChecked1: false,
        isChecked2: false,
    });
    const [seconedPageInfo, setSeconedPageInfo] = useState({
        id: '',
        idCk: '',
        pw: '',
        pwCk: ''
    });
    const [thirdPageInfo, setThirdPageInfo] = useState({
        name: '',
        birth: '',
        phone: '',
        email: '',
        randNum: '',
        ckRandNum: '',
    });
    const [fourthPageInfo, setFourthPageInfo] = useState({
        img: '',
        nickName: ''
    });
    const [message, setMessage] = useState({
        text: '',
        successText: ''
    });
    const [img, setImg] = useState("");

    useEffect(() => {
        if(termInfo.length == 0) getTermInfo();
    }, [])

    const getTermInfo = async () => {
        const result = await axios({
            url: serverURL + 'index/term',
            method: 'get',
        });
        const data = result?.data?.info;
        setTermInfo(data)
    }

    const openInfo = (type) => {
        navigation.navigate('Terms', {detail: termInfo[type-1].TermDetail});
    }

    const pickImg = () => {
        const options = {
            title: 'Select Avatar', //이미지 선택할 때 제목입니다 ( 타이틀 ) 
            customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }], // 선택 버튼을 커스텀 할 수 있습니다.
            storageOptions: {
            skipBackup: true,	// ios인 경우 icloud 저장 여부 입니다!
            path: 'images',
            },
        };
        
        /**
         * The first arg is the options object for customization (it can also be null or omitted for default options),
         * The second arg is the callback which sends object: response (more info in the API Reference)
         */
         launchImageLibrary(options, (response) => {     
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            } else {
            // You can also display the image using data:
            // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                let date = new Date().getTime();
                setFourthPageInfo({
                    ...fourthPageInfo,
                    img: { 
                        name: date+seconedPageInfo.id+".png", 
                        type: 'image/png', 
                        uri: response.assets[0].uri
                    }
                })
                
                setImg(response.assets[0].uri); // 저는 여기서 uri 값을 저장 시킵니다 !
            }
        });
    }

    const uploadImage = async () => {
        var formData = new FormData();
        formData.append('MemberID', seconedPageInfo.id);
        formData.append('MemberPW', seconedPageInfo.pw);
        formData.append('Name', thirdPageInfo.name);
        formData.append('NickName', fourthPageInfo.nickName);
        formData.append('Birth', thirdPageInfo.birth);
        formData.append('Phone', thirdPageInfo.phone);
        formData.append('Email', thirdPageInfo.email);
        formData.append('profile', fourthPageInfo.img);

        const result = await axios({
            url: serverURL + 'user/signin',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method: 'post',
            data: formData
        });
        const data = result.data;
        if(data.status == 200) {
            setMessage({text:'', successText: ''});
            navigation.navigate('Login');
            // navigation.reset({
            //     routes: [{
            //         name: 'Login'
            //     }]
            // });
        }
        else if(data.status == 400) {
            setMessage({text: '아이디가 중복되었습니다.'});
        }
        else {
            setMessage({text: '나중에 다시 시도해주세요.'});
        }
    }

    const checkID = async () => {
        if(seconedPageInfo.id.length < 6) {
            setMessage({text:'아이디를 6글자 이상 적어주세요.'});
            return ;
        }
        const result = await axios({
            url: serverURL + 'user/checkID',
            method: 'get',
            params: {
                MemberID: seconedPageInfo.id
            }
        });
        const data = result.data;
        if(data.status == 400) {
            setMessage({text:'이미 사용중인 아이디입니다.'});
            return ;
        }
        if(data.status == 200) {
            setSeconedPageInfo({
                ...seconedPageInfo,
                idCk: seconedPageInfo.id
            });
            setMessage({successText: '사용가능한 아이디입니다.'});
        }
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

    const nextPage = () => {
        if(page == 1) {
            if(firstPageInfo.isChecked1 != true || firstPageInfo.isChecked2 != true ) {
                setMessage({text:'약관에 모두 동의해주세요.'});
                return;
            }
            setFirstPageInfo({
                isChecked1: false,
                isChecked2: false,
            });
        }
        else if(page == 2) {
            if(!seconedPageInfo.id || !seconedPageInfo.pw) {
                setMessage({text:'정보를 모두 입력해주세요.'});
                return;
            }
            if(!pwRole(seconedPageInfo.pw)) {
                setMessage({text: '비밀번호는 영문,숫자, 특수문자를 혼합하여 8~20글자 이상 입력해주세요.'});
                return;
            }
            if(seconedPageInfo.id != seconedPageInfo.idCk) {
                setMessage({text:'아이디 중복체크를 해주세요.'});
                return;
            }
            if(seconedPageInfo.pw != seconedPageInfo.pwCk) {
                setMessage({text:'비밀번호를 확인 해주세요.'});
                return;
            }
        }
        else if(page == 3) {
            // console.log(thirdPageInfo)
            if(thirdPageInfo.randNum != thirdPageInfo.ckRandNum) {
                setMessage({text: '문자 인증을 완료해주세요.', successText: ''});
                return ;
            }
            if(!thirdPageInfo.name || !thirdPageInfo.birth || !thirdPageInfo.phone || !thirdPageInfo.email) {
                setMessage({text:'정보를 모두 입력해주세요.'});
                return ;
            }
        }
        else if(page == 4) {
            // console.log(fourthPageInfo)
            if(!fourthPageInfo.img || !fourthPageInfo.nickName) {
                setMessage({text:'정보를 모두 입력해주세요.'});
                return;
            }            
            uploadImage();
            return ;
        }
        setMessage({text:'', successText: ''});
        setPage(page + 1);
    }

    const prevPage = () => {
        setMessage({text:'', successText: ''});
        page != 1 ? setPage(page - 1) : navigation.navigate('Login');
    }

    const onChange = (data) =>  {
        if(page == 1) {
            setFirstPageInfo({
                ...firstPageInfo,
                ...data
            });
        }
        if(page == 2) {
            setSeconedPageInfo({
                ...seconedPageInfo,
                ...data
            });
        }
        if(page == 3) {
            setThirdPageInfo({
                ...thirdPageInfo,
                ...data
            });
        }
        if(page == 4) {
            setFourthPageInfo({
                ...fourthPageInfo,
                ...data
            });
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <KeyboardAwareScrollView style={{flex:1}}>
                <View style={{ flex: 1, alignItems: 'center', marginTop:100}}>
                    <View style={styles.joinHeaderWarpper}>
                        <Text style={styles.joinHeaderText}>
                            회원가입
                        </Text>
                    </View>

                    <JoinContent page={page} openInfo={openInfo} isChecked={firstPageInfo}
                    seconedPageInfo={seconedPageInfo} thirdPageInfo={thirdPageInfo} fourthPageInfo={fourthPageInfo}
                    onChange={(data) => onChange(data)} checkID={checkID} img={img} pickImg={pickImg}
                    setMessage={setMessage}/>
                    <View style={styles.submitButtonView}>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={[styles.submitButton]}
                            onPress = { () => prevPage() }
                        >
                            <Text style={styles.submitButtonText}>
                                이전
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity 
                            activeOpacity={0.8} 
                            style={[styles.submitButton, {display: 'flex', marginLeft: 10}]} 
                            onPress = { () => nextPage() }
                        >
                            <Text style={styles.submitButtonText}>
                                { page == 4 ? '회원 가입' : '다음' }
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
            </KeyboardAwareScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    joinHeaderWarpper: {
        borderColor: '#92D14F',
        borderBottomWidth: 2,
    },
    joinHeaderText: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 14,
        paddingRight: 14,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 20,
        color:'#191919',
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
    messageView: {
        marginTop: 20
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

export default Join;

