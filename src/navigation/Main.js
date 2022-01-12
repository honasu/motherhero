import React from 'react';
import { Dimensions, StatusBar, Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, ImageBackground, ScrollView, Platform } from 'react-native';

import Header from './../components/Header';
import SearchBox from './../components/SearchBox';
import MainContentBox from './../components/MainContentBox';
import ListHeaderView from './../components/ListHeaderView';
import ListContentView from './../components/ListContentView';

import Swiper from 'react-native-swiper';



const bannerView = (img) => {
    return img.map( (value, index) => 
        (<ImageBackground key={index} source={value.img} style={styles.slide}>
            <Text style={styles.bannerText}>{value.str}</Text>
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
        {bannerView(data.img)}
      </Swiper>
    );
}

const Main = ({ navigation }) => {
    let screen = Dimensions.get('screen').height;
    let window = Dimensions.get('window').height;
    let bar = StatusBar.currentHeight;
    let androidPadding = screen - window;
    
    let imagePathList = [
        {uid:1, img:require('../assets/images/bannerCat1.jpeg'), str:'맘먀'},
        {uid:2, img:require('../assets/images/bannerCat2.jpeg'), str:'루루'}
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
                <Header navigation={navigation} />
                <ScrollView>
                    <View style={styles.titleView}>
                        <SwiperComponent img={imagePathList}/>
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
                            />
                        </View>
                    </View>
                    <View style={styles.apply}>
                        <View style={styles.applyView}>
                            <TouchableOpacity activeOpacity={0.8} style={[styles.applyButton]} 
                                onPress={ () => navigation.navigate('ServiceInfoList', {
                                    type: '',
                                    text: '한부모가정지원사업',
                                })}
                            >
                                <View style={[styles.applyContent, styles.Shadow]}>
                                    <Text style={styles.applyText}>
                                        한부모가정지원사업{'\n'}신청하기
                                    </Text>
                                    <Image source={require('./../assets/images/icons/rightCircle.png')} style={styles.applyImg}/>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity activeOpacity={0.8} style={[styles.applyButton]} 
                                onPress={ () => navigation.navigate('ServiceInfoList', {
                                    type: '',
                                    text: '서민금융재단사업',
                                })}
                            >
                                <View style={[styles.applyContent, styles.Shadow]}>
                                    <Text style={[styles.applyText]}>
                                        서면금융제단사업{'\n'}신청하기
                                    </Text>
                                    <Image source={require('./../assets/images/icons/rightCircle.png')} style={styles.applyImg}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.notice}>
                        <ListHeaderView 
                            title='공지사항'
                            navigation={navigation}
                            movePage='Notice'
                        />
                        <ListContentView 
                            title='공지사항1asdasdsadasdasdasdasdasdasdasdadas'
                            date='2021.12.06'
                            onPress={() => navigation.navigate('Notice')}
                        />
                        <ListContentView 
                            title='공지사항2asdasdsadasdasdasdasdasdasdasdadas'
                            date='2021.12.06'
                            onPress={() => navigation.navigate('Notice')}
                        />
                        <ListContentView 
                            title='공지사항3asdasdsadasdasdasdasdasdasdasdadas'
                            date='2021.12.06'
                            onPress={() => navigation.navigate('Notice')}
                        />
                    </View>
                    <View  style={styles.footer}>
                        <Image source={require('./../assets/images/icons/footerLogo.png')} style={styles.footerImg}/>
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
        fontSize: 15
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
        backgroundColor: '#9DD6EB'
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
    footerImg: {
        resizeMode: 'contain',
        width: 200,
        height: 40
    }
});


export default Main;

