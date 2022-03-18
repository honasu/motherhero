import React, {useState, useEffect, useContext} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import axios from 'axios';

import ServiceApplyContent from './../components/ServiceApplyContent';
import Button from './../components/Button';
import HeaderPopup from './../components/HeaderPopup';

import { serverURL } from './../../config.json';
import { Context } from './../context/index';

const ServiceApply = ({ route, navigation }) => {
    const { state: { uid, id }, dispatch } = useContext( Context );

    const [message, setMessage] = useState({
        text: '',
        successText: ''
    });
    const [googleForm, setGoogleForm] = useState();
    const [boardUID, setBoardUID] = useState();    
    const [page, setPage] = useState(1);
    const [isAble, setIsAble] = useState(false);
    const [seconedPageInfo, setSeconedPageInfo] = useState([]);
    const [headerInfo, setHeaderInfo] = useState(route.params); //type, text
    
    useEffect(() => {
        googleForm ? '' : getGoogleForm();
    }, []);

    const getGoogleForm = () => {
        setGoogleForm(route.params.googleForm)
        setBoardUID(route.params.boardUID)
    }


    const nextPage = () => {
        if(page == 2) {
            if(!seconedPageInfo.length) {
                setMessage({text: '파일을 등록해주세요.'});
            }
            var formData = new FormData();
            formData.append('MemberID', id);
            formData.append('BoardUID', boardUID);
            for(let index = 0; index < seconedPageInfo.length; index++) {
                let applyFile = seconedPageInfo[index];
                formData.append('applyFile', applyFile);
            }
            //서버에 등록 첨부서류 올리기
            const result = axios({
                url: serverURL + 'index/applyFile',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'multipart/form-data'
                },
                method: 'post',
                data: formData
            });
            const data = result.data;
        }

        if(page == 3) {
            navigation.reset({
                routes: [{
                    name: 'Main'
                }]
            })
            return ;
        }
        else {
            setPage(page + 1);
        }
    }

    const onChange = (data) =>  {
        if(page == 1) {
            data ? setIsAble(true) : setIsAble(false);
        }
        if(page == 2) {
            let temp = data;
            setSeconedPageInfo([...data]);
        }
    }
    
    const headerText = () => {
        if(page == 1) {
            return '구글 폼 작성';
        }
        if(page == 2) {
            return '첨부서류 등록'
        }
        if(page == 3) {
            return '완료'
        }
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View>
                <HeaderPopup
                    navigation={navigation}
                    title={headerInfo ? headerInfo.text : ''}
                />
            </View>
            <View style={{ flex: 1, alignItems: 'center', marginTop:130}}>
                <View style={styles.joinHeaderWarpper}>
                    <Text style={styles.joinHeaderText}>
                        {headerText()}
                    </Text>
                </View>

                <ServiceApplyContent 
                    page={page} 
                    googleForm={googleForm}
                    seconedPageInfo={seconedPageInfo} 
                    onChange={(data) => onChange(data)}
                    navigation={navigation}
                    setMessage={setMessage}
                />

                <View style={styles.submitButtonView}>
                    <Button 
                        styles={styles.submitButton} 
                        onPress = { () => nextPage() }
                        disabled = {isAble}
                        title={ page == 3 ? '닫기' : '다음' }
                        TextStyle={styles.submitButtonText}
                    >
                    </Button>
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
        width:'100%',
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 20,
        color:'#191919',
    },
    submitButtonView: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    submitButton: {
      marginTop: 20,
      padding:7,
      borderRadius: 10,
      borderColor: '#92D14F',
      borderWidth: 0,
      width: 250,
      justifyContent: 'center',
    }, 
    submitButtonText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 20,
        color:'#FFFFFF',
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

export default ServiceApply;

