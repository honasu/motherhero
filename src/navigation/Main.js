import React from 'react';
import { Image, SafeAreaView, StyleSheet, TouchableOpacity, View, Text, ImageBackground, ScrollView } from 'react-native';

import Header from './../components/Header';
import SearchBox from './../components/SearchBox';
import MainContentBox from './../components/MainContentBox';
import ListHeaderView from './../components/ListHeaderView';
import ListContentView from './../components/ListContentView';

import Swiper from 'react-native-swiper';



const bannerView = (img) => {
    return img.map( value => 
        (<ImageBackground source={value.img} style={styles.slide}>
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
      >
        {bannerView(data.img)}
      </Swiper>
    );
}

const Main = ({ navigation }) => {
    let imagePathList = [
        {img:require('../assets/images/bannerCat1.jpeg'), str:'맘먀'},
        {img:require('../assets/images/bannerCat2.jpeg'), str:'루루'}
    ];
    let mainContentText = [
        {
            page: 'BabyCategory',
            text: '육아정보',
            img: require('../assets/images/cat1.jpeg')
        },
        {
            page: 'ServiceInfoCategory',
            text: '지원서비스\n정보',
            img: require('../assets/images/cat2.jpeg')
        },
        {
            page: 'QNA',
            text: '전문가\nQ&A',
            img: require('../assets/images/cat3.jpeg')
        },
        {
            page: 'Review',
            text: '지원 후기',
            img: require('../assets/images/cat4.jpeg')
        },
        {
            page: 'Login',
            text: '슬기로운\n엄마생활',
            img: require('../assets/images/cat6.jpeg')
        },
        {
            page: 'Login',
            text: '대한\n사회복지회',
            img: require('../assets/images/cat5.jpeg')
        },
    ]
    return (
        <SafeAreaView style={{flex:1, position:'relative', backgroundColor: '#fff'}}>
            <View>
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
                            <TouchableOpacity activeOpacity={0.8} style={[styles.applyButton, styles.Shadow]} onPress={ () => navigation.navigate('Login') }>
                                <View style={styles.applyContent}>
                                    <Text style={styles.applyText}>
                                        한부모가정지원사업{'\n'}신청하기
                                    </Text>
                                    <Image source={require('./../assets/images/move.png')} style={styles.applyImg}/>
                                </View>
                            </TouchableOpacity>
                            
                            <TouchableOpacity activeOpacity={0.8} style={[styles.applyButton, styles.Shadow]} onPress={ () => navigation.navigate('Login') }>
                                <View style={styles.applyContent}>
                                    <Text style={styles.applyText}>
                                        서면금융제단사업{'\n'}신청하기
                                    </Text>
                                    <Image source={require('./../assets/images/move.png')} style={styles.applyImg}/>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={styles.notice}>
                        <ListHeaderView 
                            title='공지사항'
                            navigation={navigation}
                            movePage='Login'
                        />
                        <ListContentView 
                            title='공지사항1asdasdsadasdasdasdasdasdasdasdadas'
                            date='2021.12.06'
                            onPress={() => navigation.navigate('Login')}
                        />
                        <ListContentView 
                            title='공지사항2asdasdsadasdasdasdasdasdasdasdadas'
                            date='2021.12.06'
                            onPress={() => navigation.navigate('Login')}
                        />
                        <ListContentView 
                            title='공지사항3asdasdsadasdasdasdasdasdasdasdadas'
                            date='2021.12.06'
                            onPress={() => navigation.navigate('Login')}
                        />
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
        marginBottom: 50,
    },
    Shadow:{
      shadowColor: "#000",
      shadowOffset: {
          width: 0,
          height: 1,
      },
      shadowOpacity: 0.20,
      shadowRadius: 1.41,
      elevation: 2,
    },
    apply: {
        backgroundColor: '#47C83E',
        height:100
    },
    applyView: {
        flex:1,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
    },
    applyContent: {
        flex:1,
        marginLeft: 25,
        marginRight: 25,
        marginTop: 15,
        marginBottom: 15,
        borderRadius: 10,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: "center",
        position: 'relative',
    },
    applyButton: {
        flex:1,
    },
    applyText: {
        // flex:1,
    },
    applyImg: {
        position: 'absolute',
        bottom: 10,
        right: 10,
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
    titleView: {
        height: 250,
        marginTop: 50,
        alignSelf: 'center', 
        // padding: 10
    },
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
    }
});


export default Main;

