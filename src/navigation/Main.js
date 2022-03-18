import React, {useEffect, useContext, useState} from 'react';
import { Dimensions, StatusBar, Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, Linking, ImageBackground, ScrollView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Swiper from 'react-native-swiper';
import axios from 'axios';

import Header from './../components/Header';
import SearchBox from './../components/SearchBox';
import MainContentBox from './../components/MainContentBox';
import ListHeaderView from './../components/ListHeaderView';
import ListContentView from './../components/ListContentView';
import { Context } from './../context/index';
import { serverURL } from './../../config.json';
import Popup from './../components/Popup';





const Main = ({ navigation }) => {

    const modalText = `로그인 후 이용하실 수 있습니다
로그인 하시겠습니까?`;
    const { state: { uid, id }, dispatch } = useContext( Context );
    const [isPopup, setIsPopup] = useState(false);
    const [appendBanner, setAppendBanner] = useState(false);
    const [serverBanner, setServerBanner] = useState([]);
    const [moveAgePageInfo, setMoveAgePageInfo] = useState();
    const [noticeList, setNoticeList] = useState([]);

    useEffect(() => {
        try {
            autoLogin();
            if(!noticeList[0]) getNoticeList();
        }
        catch (e) {
            console.warn('에러');
            console.warn(e);
        }
        return () => {
        }
    }, []);

    useEffect(() => {
        moveAgePageInfo ? null : getMoveAgePageInfo();
    }, [moveAgePageInfo]);

    useEffect(() => {
        appendBanner ? null : getServerBanner();
    }, []);

    const bannerView = (img) => {
        return img.map( (value, index) => 
            (<ImageBackground key={index} source={value.img} style={styles.slide}>
                {/* <View style={{borderBottomStartRadius:5, borderBottomEndRadius:5}}>
    
                </View>
                <Text style={styles.bannerText}>{value.str}</Text> */}
            </ImageBackground>)
        );
    }

    const serverBannerView = () => {
        return serverBanner.map( (value, index) => 
            (<ImageBackground key={index} source={{uri: serverURL + value.BannerPath}} style={styles.slide}>
                {/* <View style={{borderBottomStartRadius:5, borderBottomEndRadius:5}}>
    
                </View>
                <Text style={styles.bannerText}>{value.str}</Text> */}
            </ImageBackground>)
        );
    }
    
    const SwiperComponent = (data) => {
        return (
          <Swiper style={styles.wrapper}
          autoplay
          autoplayTimeout={4}
          height={250}
          showsPagination={false}
          >
            {serverBanner[0] ? serverBannerView() : bannerView(data.img)}
          </Swiper>
        );
    }

    const getServerBanner = async () => {
        console.log('getServerBannerImg')
        const result = await axios({
            url: serverURL + 'index/banner',
            method: 'get',
        });
        const data = result.data;
        const info = data.info;
        const append = info.append;
        setServerBanner(append);
        setAppendBanner(true)
    }

    const getMoveAgePageInfo = async () => {
        console.log('getMoveAgePageInfo')
        const result1 = await axios({
            url: serverURL + 'index/subCategory',
            method: 'get',
            params: {
                SubCategoryUID: 36
            }
        });
        const data1 = result1.data;
        const info1 = data1.info[0];
        
        const result2 = await axios({
            url: serverURL + 'index/subCategory',
            method: 'get',
            params: {
                SubCategoryUID: 37
            }
        });
        const data2 = result2.data;
        const info2 = data2.info[0];

        setMoveAgePageInfo({
            first: {
                type: 36,
                text: info1.SubCategoryName
            },
            second: {
                type: 37,
                text: info2.SubCategoryName
            }
        })
    }

    const moveLoginPage = () => {
        setIsPopup(false);
        navigation.navigate('Login', {});
    }

    async function getNoticeList() {
        const result = await axios({
            url: serverURL + 'index/board',
            method: 'get',
            params: {
                page: 1,
                limit: 5,
                BoardType: 'notice'
            }
        });
        const data = result.data;
        if(data.status == 200) {
            setNoticeList(data.info);
        }
    }

    const appendNoticeList = () => {
        return noticeList.map((value, index) => 
            (
                <ListContentView 
                    key={index}
                    title={value.BoardTitle}
                    date={parseDate(value.BoardDate)}
                    onPress={() => navigation.navigate('Notice', {index: index})}
                />
            )
        );
    }

    const parseDate = (boardDate) => {
        boardDate = new Date(boardDate);
        boardDate = `${boardDate.getFullYear()}. ${(boardDate.getMonth()+1) < 10 ? '0' : '' }${(boardDate.getMonth()+1)}. ${boardDate.getDate() < 10 ? '0' : ''}${boardDate.getDate()}`;
        return boardDate;
    }

    async function autoLogin() {
        let autoUID = await AsyncStorage.getItem('uid');
        let autoID = await AsyncStorage.getItem('id');
        let result = await axios({
            url: serverURL + 'user/userInfo',
            method: 'get',
            params: {
                MemberID: autoID
            }
        })
        let extra = result.data.info;
        if(autoUID) {
            dispatch({
            type: 'SET_UID',
            uid: autoUID,
            id: autoID,
            extra: extra
            })
        }
        else {
        }
    }

    let screen = Dimensions.get('screen').height;
    let window = Dimensions.get('window').height;
    let bar = StatusBar.currentHeight;
    let androidPadding = screen - window;
    
    let imagePathList = [
        {uid:1, img:require('../assets/images/banner1.jpeg')},
        {uid:2, img:require('../assets/images/banner2.jpeg')}
    ];
    let mainContentText = [
        {
            uid: '1',
            page: 'BabyCategory',
            text: '육아정보',
            img: require('../assets/images/icons/main1.png')
        },
        {
            uid: '2',
            page: 'ServiceInfoCategory',
            text: '지원서비스\n정보',
            img: require('../assets/images/icons/main2.png')
        },
        {
            uid: '3',
            page: 'QNA',
            text: '전문가\nQ&A',
            img: require('../assets/images/icons/main3.png')
        },
        {
            uid: '4',
            page: 'Review',
            text: '지원 후기',
            img: require('../assets/images/icons/main4.png')
        },
        {
            uid: '5',
            page: 'MotherList',
            text: '슬기로운\n엄마생활',
            img: require('../assets/images/icons/main5.png')
        },
        {
            uid: '6',
            page: 'LinkPage',
            text: '대한\n사회복지회',
            img: require('../assets/images/icons/main6.png')
        },
    ]
    return (
        <SafeAreaView style={[{flex:1, position:'relative', backgroundColor: '#fff'}]}>
            <View style={{flex:1}}>
                <Header navigation={navigation} id={id} 
                    setIsPopup={value => setIsPopup(value)}/>
                <Popup 
                    isPopup={isPopup} 
                    setIsPopup={value => setIsPopup(value)} 
                    modalText={modalText}
                    onPressOK={() => moveLoginPage()}
                />
                <ScrollView>
                    <View style={styles.titleView}>
                        {appendBanner ? <SwiperComponent img={imagePathList}/> : null}
                    </View>
                    <SearchBox navigation={navigation} />
                    <View style={styles.mainContent}>
                        <View style={styles.mainContentLine}>
                            <MainContentBox 
                                page={mainContentText[0].page}
                                text={mainContentText[0].text}
                                img={mainContentText[0].img}
                                navigation={navigation}
                            />
                            <MainContentBox 
                                page={mainContentText[1].page}
                                text={mainContentText[1].text}
                                img={mainContentText[1].img}
                                navigation={navigation}
                            />
                            <MainContentBox 
                                page={mainContentText[2].page}
                                text={mainContentText[2].text}
                                img={mainContentText[2].img}
                                navigation={navigation}
                            />
                        </View>
                        <View style={styles.mainContentLine}>
                            <MainContentBox 
                                page={mainContentText[3].page}
                                text={mainContentText[3].text}
                                img={mainContentText[3].img}
                                navigation={navigation}
                            />
                            <MainContentBox 
                                page={mainContentText[4].page}
                                text={mainContentText[4].text}
                                img={mainContentText[4].img}
                                navigation={navigation}
                            />
                            <MainContentBox 
                                page={mainContentText[5].page}
                                text={mainContentText[5].text}
                                img={mainContentText[5].img}
                                navigation={navigation}
                                onPress={() => Linking.openURL('https://kws.or.kr')}
                            />
                        </View>
                    </View>
                    <View style={styles.apply}>
                        {moveAgePageInfo
                        ? <View style={styles.applyView}>
                            <TouchableOpacity activeOpacity={0.8} style={[styles.applyButton]} 
                                onPress={ () => navigation.navigate('ServiceInfoList', {
                                    type: '36',
                                    text: moveAgePageInfo.first.text,
                                    mainCategory: '기타',
                                })}
                            >
                                <View style={[styles.applyContent, styles.Shadow]}>
                                    <Text style={[styles.applyText, {maxHeight: '66%'}]}>
                                        {moveAgePageInfo.first.text}
                                    </Text>
                                    <Text style={[styles.applyText]}>
                                        신청하기
                                    </Text>
                                    <Image source={require('./../assets/images/icons/rightCircle.png')} style={[styles.applyImg]}/>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity activeOpacity={0.8} style={[styles.applyButton]} 
                                onPress={ () => navigation.navigate('ServiceInfoList', {
                                    type: '37',
                                    text: moveAgePageInfo.second.text,
                                    mainCategory: '기타',
                                })}
                            >
                                <View style={[styles.applyContent, styles.Shadow]}>
                                    <Text style={[styles.applyText, {maxHeight: '66%'}]}>
                                        {moveAgePageInfo.second.text}
                                    </Text>
                                    <Text style={[styles.applyText]}>
                                        신청하기
                                    </Text>
                                    <Image source={require('./../assets/images/icons/rightCircle.png')} style={styles.applyImg}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                        : null}
                    </View>
                    <View style={styles.notice}>
                        <ListHeaderView 
                            title='공지사항'
                            navigation={navigation}
                            movePage='Notice'
                        />
                        {noticeList[0] ? appendNoticeList() : null}
                    </View>
                    <View  style={styles.footer}>
                        <View style={styles.footerFirst}>
                            <View style={styles.footerImgView}>
                                <Image source={require('./../assets/images/icons/footerLogo.png')} style={styles.footerImg}/>
                            </View>
                            
                            <View style={styles.footerTextView}>
                                <Text style={styles.footerText}>
                                    본 애플리케이션은 금융산업공익재단의
                                </Text>
                                <Text style={styles.footerText}>
                                    후원을 받아 제작하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style={styles.footerSecond}>
                            <Text style={styles.footerText}>
                                 대한사회복지회 문의 : 1577-5155
                            </Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    notice: {
        flex:1,
        width:'90%',
        alignSelf:'center',
        marginTop: 20,
        marginBottom: 40,
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
                shadowRadius: 1.41,
            }, 
            android: { 
                shadowColor: "#000000",                
                elevation: 2,
            }, 
        }), 
    },
    apply: {
        backgroundColor: '#F9FFEB',
        height:130
    },
    applyView: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    applyContent: {
        flex: 1,
        width: Dimensions.get('window').width * 0.43,
        borderRadius: 10,
        backgroundColor: '#fff',
        padding: 13,
        // paddingTop:0,
        // alignItems: 'center',
        // justifyContent: "center",
        position: 'relative',
    },
    applyButton: {
        margin:7,
        marginTop: 20,
        marginBottom: 20,
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
    },
    applyText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Medium',
        color: '#191919',
        fontSize: 14,
    },
    applyImg: {
        position: 'absolute',
        bottom: 5,
        right: 5,
        width: 30,
        height: 30,
    },
    wrapper: {},
    slide: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFF'
    },
    bannerText: {
        color: '#fff',
        fontSize: 30,
        fontWeight: 'bold'
    },
    contentImg: {
        width: 100,
        height: 100,
        resizeMode: 'contain',
    },
    contentText: {
        marginTop: 10,
        fontSize: 11,
        fontWeight: "bold",
    },
    contentView: {
        backgroundColor: '#fff',
        borderColor: '#3143e8',
        flex: 1,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        padding: 2,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',      
    },
    contentButton: {
        // alignItems:'center',
        flex: 1,
        margin:8,
    },
    mainContentLine: {
        flexDirection: 'row', 
        width: '100%', 
        height: 130,
    },
    mainContent: {
        flex:1, 
        marginTop: 30, 
        marginBottom: 20,
        alignItems: 'center', 
    },
    titleImg: {
        width: 450,
        height: 150,
        resizeMode: 'contain',
    },
    // titleView: {
    //     height: 280,
    //     alignSelf: 'center',
    // },
    mainBackImg: {
        flex: 1,
    },
    languageView: {
        backgroundColor: '#368AFF',
        borderColor: '#fff',
        borderWidth: 2,
        color: '#fff',
        flex: 1,
        borderTopLeftRadius: 9,
        borderTopRightRadius: 9,
        borderBottomLeftRadius: 9,
        borderBottomRightRadius: 9,
        padding: 2,
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',      
    },
    active: {
        backgroundColor: '#fff',
        borderColor: '#fff',
        color: '#000',
    },
    languageText: {
        fontSize: 11,
        fontWeight: "bold",
        color: '#fff',
    },
    footer: {
        flex: 1,
        height: 105,
        backgroundColor: '#F7F7F7',
        justifyContent: 'center',
        alignItems: 'center'
    },
    footerFirst: {
        flexDirection: 'row'
    },
    footerSecond: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 10
    },
    footerText: {
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        color: '#8D8D8D',
        fontSize: 10,
    },
    footerTextView: {
        justifyContent: 'center',
        // alignItems: 'center',
        flex: 1,
    },
    footerImg: {
        resizeMode: 'contain',
        width: 150,
        height: 40,
    },
    footerImgView: {
        justifyContent: 'center',
        alignItems: 'center',
        flex: 1,
    }
});


export default Main;

