import React, {useState} from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import JoinContent from './../components/JoinContent';

const Join = ({ navigation }) => {

    const [page, setPage] = useState(1);

    const [firstPageInfo, setFirstPageInfo] = useState({
        isChecked1: false,
        isChecked2: false,
    });
    const [seconedPageInfo, setSeconedPageInfo] = useState({
        name: '',
        birth: '',
        phone: '',
        email: ''
    });
    const [thirdPageInfo, setThirdPageInfo] = useState({
        img: '',
        nicName: ''
    });

    const nextPage = () => {
        setFirstPageInfo({
            isChecked1: false,
            isChecked2: false,
        });
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

    const prevPage = () => {
        setPage(page - 1);
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
    }

    return (
        <SafeAreaView style={{flex:1}}>
            <View style={{ flex: 1, alignItems: 'center', marginTop:100}}>
                <View style={styles.joinHeaderWarpper}>
                    <Text style={styles.joinHeaderText}>
                        회원가입
                    </Text>
                </View>

                <JoinContent page={page} isChecked={firstPageInfo}
                seconedPageInfo={seconedPageInfo} thirdPageInfo={thirdPageInfo}
                onChange={(data) => onChange(data) }/>

                <View style={styles.submitButtonView}>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={styles.submitButton} 
                        onPress = { () => nextPage() }
                    >
                        <Text style={styles.submitButtonText}>
                            { page == 3 ? '회원 가입' : '다음' }
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity 
                        activeOpacity={0.8} 
                        style={[styles.submitButton, page == 1 ? {display:'none'} : {display: 'flex', marginLeft: 10}]}
                        onPress = { () => prevPage() }
                    >
                        <Text style={styles.submitButtonText}>
                            이전
                        </Text>
                    </TouchableOpacity>
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
        width: 300,
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
      flex: 1,
      alignItems: 'center',
    }, 
    submitButtonText: {
      fontSize: 17,
      color: 'white',
      fontWeight: "500"
    },
});

export default Join;

