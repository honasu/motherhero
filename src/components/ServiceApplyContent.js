
import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking } from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

import ImageButton from './ImageButton';
import Button from './Button';

const ServiceApplyContent = (props) => {
    let page = props.page;
    let onChange = props.onChange;
    let googleForm = props.googleForm;
    let navigation = props.navigation;
    let seconedPageInfo = props.seconedPageInfo;
    let setMessage = props.setMessage;

    const [uploadFile, setUploadFile] = useState({});

    useEffect(() => {
    }, [uploadFile, seconedPageInfo]);

    const joinImg = () => {
        let result;
        if(page == 1) result = (<Image source={require('./../assets/images/icons/3tabs1.png')} style={styles.joinHeaderImg}/>);
        if(page == 2) result = (<Image source={require('./../assets/images/icons/3tabs2.png')} style={styles.joinHeaderImg}/>);
        if(page == 3) result = (<Image source={require('./../assets/images/icons/3tabs3.png')} style={styles.joinHeaderImg}/>);
        
        return result;
    }
    
    const appendFileText = () => {
        return (
            <TouchableOpacity style={styles.inputFile} onPress={ () => { pickImg() }}>
                <Text style={[styles.fileText, ( uploadFile.file ? styles.fileUploaded : styles.fileEmpty )]}>
                    { uploadFile.file ? uploadFile.name : '업로드할 파일 선택' }
                </Text>
            </TouchableOpacity>
        );
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
                let type = response.assets[0].type;
                if(type.indexOf('jpg') != -1 || type.indexOf('jpeg') != -1 || type.indexOf('png') != -1) {
                    let date = new Date().getTime();
                    console.log(response)
                    setUploadFile({file:{ 
                        name: date+'_'+response.assets[0].fileName, 
                        type: type, 
                        uri: response.assets[0].uri
                    }, name:response.assets[0].fileName});
                }
                else {
                    setMessage({text: 'jpg, jpeg, png 파일을 업로드해주세요.',
                    successText: ''})
                }
            }
        });
    }

    const addFile = () => {
        if(!uploadFile) {
            return ;
        }
        seconedPageInfo.push(uploadFile.file);
        setUploadFile({})
        onChange(seconedPageInfo);
    }

    const removeFile = (index) => {
        seconedPageInfo.splice(index, 1);
        onChange(seconedPageInfo);
    }

    const appendFileList = () => {
        if(!seconedPageInfo.length) {
            return ;
        }

        return (
            <View style={{marginTop:20, width: 250}}>
                {seconedPageInfo.map((value, index) => 
                    
                    <View style={styles.fileListView}>                        
                        <Text style={styles.fileListName} numberOfLines={1}>{value.name.split('_').slice(1).join('_')}</Text>
                        <Button 
                            styles={styles.removeFileButton} 
                            onPress = { () => removeFile(index-1) }
                            title='삭제'
                            TextStyle={styles.removeButtonText}
                        />
                    </View>
                )}
            </View>
        );
    }
    
    const joinData = () => {
        let result;
    
        switch(page) {
            case 1:
                result = (
                    <View style={{alignItems: 'center', marginTop:30}}>
                        <ImageButton
                            image={require('./../assets/images/icons/link-button.png')}
                            ImageStyle={styles.googleFormButton}
                            styles={{height:200}}
                            onPress={() => Linking.openURL(googleForm)}
                            TextStyle={styles.text}
                            title='신청서 작성 클릭'
                        />
                    </View>
                );
                break;
            case 2:
                result = (
                    <View style={styles.seconedPageView}>
                        <View style={styles.inputFileView}>
                            {appendFileText()}
                            <Button 
                                styles={styles.submitFileButton} 
                                onPress = { () => {if(uploadFile.file) addFile() }}
                                title='등록'
                                TextStyle={styles.submitButtonText}
                            >
                            </Button>
                        </View>
                        {appendFileList()}
                    </View>
                );
                break;
            case 3:
                result = (
                    <View>
                        <Text style={styles.text}>
                            신청이 완료되었습니다.
                        </Text>
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
            <View >
                {joinImg()}
                {joinData()}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    fileListView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop:10,
        alignItems: 'center'
    },
    fileListName: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 15,
        color:'#191919',
        flex: 1,
        marginRight: 10        
    },
    removeFileButton: {
        width: 70,
        height: 30,
    },
    submitFileButton: {
        width: 70,
        height: 40,
    },
    submitButtonText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 16,
        color:'#FFFFFF',
    },
    removeButtonText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 12,
        color:'#FFFFFF',
    },
    fileText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 15,
        color:'#FFFFFF',
        flex: 1,
    },
    fileUploaded: {
        color: '#191919'
    },
    fileEmpty: {
        color: '#AAAAAA'
    },
    seconedPageView: {
        marginTop:30, 
        width: 300, 
        alignItems: 'center',
    },
    googleFormButton: {
        width: 130,
        height: 130,
    },
    text: {
        paddingTop: 7,
        paddingBottom: 7,
        paddingLeft: 14,
        paddingRight: 14,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Medium',
        fontSize: 22,
        color:'#191919',
    },
    joinProfileImg: {
        borderRadius:100, 
        borderWidth:2, 
        marginTop:30,
        width:100,
        height:100,
        padding:15,
        alignSelf: 'center'
    },
    firstJoinText: {
        fontSize:15,
        fontWeight:'bold',
    },
    inputFileView: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        alignItems: 'center',
    },
    inputFile: {
        flex: 1,
        height: 40,
        borderWidth:1,
        marginRight: 10,
        paddingTop:5,
        paddingRight:15,
        paddingBottom:5,
        paddingLeft:15,
        borderColor:'#000000',
        borderRadius:5,
        flexDirection: 'row',
        alignItems: 'center'
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
        marginTop:30,
    },
    StepHeaderText:{
        fontSize:20,
        fontWeight:'bold',
    },
});

export default ServiceApplyContent;