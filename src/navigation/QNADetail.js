import * as React from 'react';
import { useState, useEffect, useRef, useContext } from 'react';
import { Dimensions, StyleSheet, View} from 'react-native';
import { WebView } from 'react-native-webview';
import { SafeAreaView } from 'react-native-safe-area-context';

import Button from './../components/Button';
import HeaderPopup from './../components/HeaderPopup';

import { Context } from './../context/index';
import { webURL } from './../../config.json';

const QNADetail = ({route, navigation}) => {

    const { state: { uid, id }, dispatch } = useContext( Context );

    let MemberID = id;
    let url = webURL + 'listBoard.html';
    let [BoardUID, setBoardUID] = useState(route.params.BoardUID);

    let webviewRef = useRef();

    /** 웹뷰 ref */
    const handleSetRef = _ref => {
        webviewRef = _ref;
      };
  
      const reload = () => {
          webviewRef.reload();
      }
  
      const handleOnMessage = (message) => {
          console.log('handleOnMessage');
          const { nativeEvent } = message;
          const data = JSON.parse(nativeEvent.data);
          if(data.type == 'fin') {
              navigation.goBack();      
          }
          if(data.type == 'delete') {
              navigation.navigate('QNAList', {
                  reset: 1
              });
          }
          if(data.type == 'update') {
              navigation.navigate('QNAUpdate', {
                  BoardUID: BoardUID,
                  reload: reload
              });
          }
      };
  
      const handleEndLoading = e => {
          console.log("handleEndLoading");
          /** rn에서 웹뷰로 정보를 보내는 메소드 */
          webviewRef.postMessage( JSON.stringify({
              type: "pageInfo",
              data: {
                  MemberID: MemberID,
                  BoardUID: BoardUID,
                  BoardType: 'QNA'
              }
          }));
      };

    return (
        <SafeAreaView>
            <View style={styles.ContentView}>
                <HeaderPopup
                    navigation={navigation}
                />
                <WebView 
                    // ref={}
                    style={{marginTop:70, flex:1}} 
                    source={{ uri: url }} 
                    ref={handleSetRef}
                    incognito={true} //캐시 비우기
                    javaScriptEnabled={true}
                    onLoadEnd={handleEndLoading}
                    onMessage={handleOnMessage}
                />
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
        marginTop:50,
    },
    Row:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
    Header: {
        backgroundColor: 'white',
        paddingTop: 15,
        paddingBottom: 15,
        paddingLeft: 10,
        paddingRight: 10,
        borderBottomWidth:1,
        borderBottomColor:'#9e9e9e'
    },
    ActiveHeader:{
        paddingLeft:0,
        paddingRight:0,
        marginLeft:10,
        marginRight:10
    },
    headerText: {
        fontSize: 14,
        fontWeight: '500',
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
        borderBottomColor:'#9e9e9e',
        borderBottomWidth:1,
        paddingTop: 10,
        paddingBottom: 10,
        paddingLeft:20,
        paddingRight:20,
        backgroundColor: 'white',
    },
    selectorView: {
        marginTop: 50,
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 20,
        paddingLeft: 20,
        backgroundColor: 'lightgreen',
    },
    SelectAreaStyle: {
        // flex: 1,
        backgroundColor: 'white',
        width: '100%',
        height: 30,
    }
});

export default QNADetail;