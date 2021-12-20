
import React, {useState, useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, View, Image, TouchableOpacity, TextInput, Linking } from 'react-native';

import CheckBox from './CheckBox';
import ImageButton from './ImageButton';
import Button from './Button';

const ServiceApplyContent = (props) => {
    let page = props.page;
    let onChange = props.onChange;
    let googleForm = props.googleForm;
    let navigation = props.navigation;
    let seconedPageInfo = props.seconedPageInfo;

    const [uploadFile, setUploadFile] = useState({});

    useEffect(() => {
    }, [uploadFile, seconedPageInfo]);

    const joinImg = () => {
        let result;
        if(page == 1) result = (<Image source={require('./../assets/images/bannerCat1.jpeg')} style={styles.joinHeaderImg}/>);
        if(page == 2) result = (<Image source={require('./../assets/images/bannerCat2.jpeg')} style={styles.joinHeaderImg}/>);
        if(page == 3) result = (<Image source={require('./../assets/images/bannerCat3.jpeg')} style={styles.joinHeaderImg}/>);
        
        return result;
    }
    
    const appendFileText = () => {
        return (
            <TouchableOpacity style={styles.inputFile} onPress={ () => {
                setUploadFile({file:'file', name:'filePath'});
            }}>
                <Text style={[styles.fileText, ( uploadFile ? styles.fileUploaded : styles.fileEmpty )]}>
                    { uploadFile ? uploadFile.name : '업로드할 파일 선택' }
                </Text>
            </TouchableOpacity>
        );
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
            <View>
                {seconedPageInfo.map((value, index) => 
                    <View style={styles.fileListView}>                        
                        <Text style={styles.fileListName} >{value}</Text>
                        <Button 
                            styles={styles.removeFileButton} 
                            onPress = { () => removeFile(index-1) }
                            title='삭제'
                            TextStyle={styles.submitButtonText}
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
                            image={require('./../assets/images/icon/link-button.png')}
                            ImageStyle={styles.googleFormButton}
                            styles={{height:200}}
                            onPress={() => Linking.openURL(googleForm)}
                            TextStyle={styles.text}
                            title='구글 폼 링크 클릭'
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
                                onPress = { () => addFile() }
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
    },
    fileListName: {
        
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
        fontWeight: '500',
        lineHeight: 30,
        fontSize: 15
    },
    fileText: {
        fontSize: 15,
        lineHeight: 30,
        flex: 1,
    },
    fileUploaded: {
        color: 'black'
    },
    fileEmpty: {
        color: 'gray'
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
        color: 'black',
        fontSize: 20,
        fontWeight: '500'
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
        marginTop:10,
        flexDirection: 'row',
    },
    joinInput: {
        height:30,
        paddingTop:0,
        paddingBottom:0,
    },
    joinHeaderImg: {
        height: 100,
        width: 300,
        marginTop: 20,
        alignSelf: 'center', 
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