import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import ServiceApplyContent from './../components/ServiceApplyContent';
import Button from './../components/Button';
import HeaderPopup from './../components/HeaderPopup';


const ServiceApply = ({ route, navigation }) => {

    const [googleForm, setGoogleForm] = useState();
    const [page, setPage] = useState(1);
    const [isAble, setIsAble] = useState(false);
    const [seconedPageInfo, setSeconedPageInfo] = useState([]);
    const [asdf, setasdf] = useState([]);
    const [headerInfo, setHeaderInfo] = useState(route.params); //type, text
    
    useEffect(() => {
        googleForm ? '' : getGoogleForm();
    }, []);

    const getGoogleForm = () => {
        setGoogleForm(route.params.googleForm)
    }


    const nextPage = () => {
        if(page == 2) {
            console.log(seconedPageInfo)
            //서버에 등록 첨부서류 올리기
        }

        if(page == 3) {
            navigation.reset({
                routes: [{
                    name: 'Login'
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
            // setasdf([1])
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
            '완료'
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
            <View style={{ flex: 1, alignItems: 'center', marginTop:100}}>
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
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    joinHeaderWarpper: {
        borderColor: 'black',
        borderBottomWidth: 2,
    },
    joinHeaderText: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 14,
        paddingRight: 14,
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
    },
    submitButtonView: {
        flexDirection: 'row', 
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    submitButton: {
      marginTop: 20,
      padding:10,
      borderRadius: 10,
      backgroundColor: '#47C83E',
      borderWidth: 0,
      width: 300,
      height: 40,
      justifyContent: 'center',
    }, 
    submitButtonText: {
      fontSize: 17,
    //   color: 'white',
      fontWeight: "500",
      lineHeight: 30
    },
});

export default ServiceApply;

