import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, View, Text, Image, TextInput, TouchableOpacity} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import axios from 'axios';

import Button from '../components/Button';
import HeaderPopup from '../components/HeaderPopup';
import Popup from '../components/Popup'
import Selector from '../components/Selector';
import { Context } from './../context/index';
import { serverURL } from './../../config.json';

const ProfileUpdate = ({route, navigation}) => {
    const { state: { uid, id, extra }, dispatch } = useContext( Context );

    const [ nickName, setNickName ] = useState(extra.NickName);
    const [isPopup, setIsPopup] = useState(false);
    const [ img, setImg ] = useState();
    const [ userInfo, setUserInfo ] = useState({});

    const updateUserInfo = async () => {
        
        var formData = new FormData();
        formData.append('MemberID', id);
        formData.append('NickName', nickName);
        formData.append('profile', userInfo.img);

        const result = await axios({
            url: serverURL + 'user/userInfo',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
            method: 'put',
            data: formData
        });
        const data = result.data;
        let extra = data.info
        if(data.status == 200) {
            dispatch({
                type: 'SET_EXTRA',
                extra: extra
            })
    
            setIsPopup(false);
        }
        navigation.navigate('MyPage', {});
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
                setUserInfo({
                    ...userInfo,
                    img: { 
                        name: date+id+".png", 
                        type: 'image/png', 
                        uri: response.assets[0].uri
                    }
                })
                
                setImg(response.assets[0].uri); // 저는 여기서 uri 값을 저장 시킵니다 !
            }
        });
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
                <HeaderPopup
                    navigation={navigation}
                    title="프로필 수정"
                />
                <View style={styles.Content} >
                    <TouchableOpacity
                        style={styles.joinProfileUploadImage}
                        onPress={() => pickImg()}
                    >
                        <Image source={img ? {uri: img} : {uri: serverURL + extra.ProfilePath}} style={styles.joinProfileImg}  imageStyle={styles.userImageStyle}/> 
                    </TouchableOpacity>
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
                            onPress = { () => setIsPopup(true) }
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
        alignSelf: 'center',
        borderRadius: 100
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
      includeFontPadding:false,
      fontFamily:'NotoSansKR-Regular',
      color: '#FFFFFF',
    },
});

export default ProfileUpdate;