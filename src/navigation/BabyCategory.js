import * as React from 'react';
import { useState, useEffect, useContext } from 'react';
import { Dimensions, StyleSheet, FlatList, View, Image, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import HeaderMenu from '../components/HeaderMenu'
import {AccordionList} from "accordion-collapse-react-native";
import axios from 'axios';
import { Context } from './../context/index';
import { serverURL } from './../../config.json';
import Popup from './../components/Popup'


const BabyCategory = ({navigation}) => {
    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );

    const [babyList, setBabyList] = useState([]);
    const [activeSections, setActiveSections] = useState();
    const [isPopup, setIsPopup] = useState(false);

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }

    useEffect(() => {
        babyList[0] ? '' : getBabyList();
    }, [babyList])

    const setMoveButton = (data) => {
        return data.map((value, index) => 
            (
                <TouchableOpacity 
                    activeOpacity={0.8} 
                    style={[styles.applyButton]} 
                    onPress={ () => navigation.navigate('BabyInfo', {
                        type: value.uid,
                        text: value.name,
                    })}
                >
                    <Text style={styles.applyText}>
                        {'・ ' + value.name}
                    </Text>
                </TouchableOpacity>
            )
        );
    };

    const getBabyList = async () => {
        const cate = [[], [], [], [], [], [], []];
        const result = await axios({
            url: serverURL + 'index/subCategory',
            method: 'get',
            params: {
                BoardType: 'baby',
            }
        });
        const data = result.data;
        if(data.info[0]) {
            for(let index = 0; index < data.info.length; index++) {
                let tmp = data.info[index]
                switch(tmp.MainCategory) {
                    case '임신':
                        cate[0].push({
                            uid: tmp.SubCategoryUID,
                            name: tmp.SubCategoryName,
                        })
                        break;
                    case '태교':
                        cate[1].push({
                            uid: tmp.SubCategoryUID,
                            name: tmp.SubCategoryName,
                        })
                        break;
                    case '출산준비':
                        cate[2].push({
                            uid: tmp.SubCategoryUID,
                            name: tmp.SubCategoryName,
                        })
                        break;
                    case '산후조리':
                        cate[3].push({
                            uid: tmp.SubCategoryUID,
                            name: tmp.SubCategoryName,
                        })
                        break;
                    case '육아':
                        cate[4].push({
                            uid: tmp.SubCategoryUID,
                            name: tmp.SubCategoryName,
                        })
                        break;
                    case '부모교육':
                        cate[5].push({
                            uid: tmp.SubCategoryUID,
                            name: tmp.SubCategoryName,
                        })
                        break;
                    case '시설입소정보':
                        cate[6].push({
                            uid: tmp.SubCategoryUID,
                            name: tmp.SubCategoryName,
                        })
                        break;
                    default:
                        break;
                }
            }
        }
        setBabyList([
            {
                index : 0,
                title : "임신",
                description : setMoveButton(cate[0])
            },
            {
                index : 1,
                title : "태교",
                description : setMoveButton(cate[1])
            },
            {
                index : 2,
                title : "출산준비",
                description : setMoveButton(cate[2])
            },
            {
                index : 3,
                title : "산후조리",
                description : setMoveButton(cate[3])
            },
            {
                index : 4,
                title : "육아",
                description : setMoveButton(cate[4])
            },
            {
                index : 5,
                title : "부모교육",
                description : setMoveButton(cate[5])
            },
            {
                index : 6,
                title : "시설입소정보",
                description : setMoveButton(cate[6])
            }  
        ]);
    }

    const renderHeader = (section) => {
        return (
        <View style={[styles.Header, styles.Row]}>
            <Text style={[styles.headerText]}>{section.title}</Text>
            <Image style={[styles.HeaderArrow,]} source={(section.index == activeSections?require('./../assets/images/icons/up-arrow.png'):require('./../assets/images/icons/down-arrow.png'))}/>
        </View>
        );
    }

    const renderContent = (section) => {
        return (
        <View style={[styles.Item]}>
            <View>
                {section.description}
            </View>
        </View>
        );
    }

    const appendBabyList = () => {
        return (
            <AccordionList 
                style={styles.Content}
                list={babyList}
                header={renderHeader}
                body={renderContent}
                keyExtractor={item => item.index}
                // onEndReached={onEndReached}
                // expandedIndex={startIndex}
                onToggle={(value) => value == activeSections ? setActiveSections() : setActiveSections(value)}
            />
        )
    }

    return (
        <SafeAreaView  style={styles.SafeAreaView}>
            <View style={styles.ContentView}>
                <HeaderMenu navigation={navigation} title="육아 정보"
                     id={id} setIsPopup={value => setIsPopup(value)}/>
                <Popup 
                    isPopup={isPopup} 
                    setIsPopup={value => setIsPopup(value)} 
                    modalText={modalText}
                    onPressOK={() => moveLoginPage()}
                />
                {babyList ? appendBabyList() : <View></View>}
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
        height:'100%',
    },
    Content:{
        marginTop:70,
    },
    Row:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
    Header: {
        borderBottomColor:'#DCDCDC',
        borderBottomWidth:1,
        backgroundColor: '#FFFFFF',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
    },
    Shadow: { 
        ...Platform.select({ 
            ios: { 
                shadowColor: "#000",
                shadowOffset: {
                    width: 0,
                    height: 1,
                },
                shadowOpacity: 0.20,
                // shadowRadius: 1.41,
            }, 
            android: { 
                shadowColor: "#000000",
                elevation: 6,
            }, 
        }), 
    },
    headerText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 15,
        paddingLeft: 12
    },
    HeaderArrow:{
        width:20,
        height:20,
        position:'absolute',
        top:15,
        right:22
    },
    Item: {
        borderBottomColor:'#DCDCDC',
        borderBottomWidth:1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: '#F7F7F7',
    },
    applyButton: {
        paddingTop: 5,
        paddingBotton: 5,
        margin:5
    },
    applyText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#191919',
        fontSize: 13,
    }
});

export default BabyCategory;