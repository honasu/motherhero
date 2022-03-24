import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList} from 'react-native';
import {useRef} from 'react';
// import { FlatList } from 'react-native-gesture-handler';

const ChattingView = (props) => {
    const userId = props.userId;
    const chatData = props.chatData;
    const chatItemStyle = props.chatItemStyle;
    let chatListDate = '';

    let flatList = useRef(null);

    const chatRight = (data, index) => {
        let chatDateInfo = parseDate(parseInt(data.writeDate));
        let result = [];
        if(chatDateInfo != chatListDate) {
            chatListDate = chatDateInfo;
            result.push((<View><Text style={{textAlign:'center'}}>{chatListDate}</Text></View>))
        }
        result.push((<View key={index} style={[styles.ChatItemRight, chatItemStyle, (index+1==chatData.length?{marginBottom:30}:{display:'flex'})]}>
        <View style={styles.ItemArea}>
            <View style={styles.ChatBubbleHome}>
                <Text style={[styles.chatText, {color:'#FFFFFF'}]}>{data.message}</Text>
            </View>
            <Text style={{textAlign:'right'}}>{parseTime(parseInt(data.writeDate))}</Text>
        </View>
        </View>))
        return result;        
    }


    
    const chatLeft = (data, index) => {
        let chatDateInfo = parseDate(parseInt(data.writeDate));
        let result = [];
        if(chatDateInfo != chatListDate) {
            chatListDate = chatDateInfo;
            result.push((<View><Text style={{textAlign:'center'}}>{chatListDate}</Text></View>))
        }
        result.push((<View key={index} style={[styles.ChatItemLeft, chatItemStyle, (index+1==chatData.length?{marginBottom:30}:{display:'flex'})]}>
        <View style={styles.ItemArea}>
            <Text style={{display:'flex'}}>상담원</Text>
            <View style={styles.ChatBubbleAway}>
                <Text style={[styles.chatText, {color:'#191919'}]}>{data.message}</Text>
            </View>
            <Text style={{textAlign:'left'}}>{parseTime(parseInt(data.writeDate))}</Text>
        </View>
        </View>))
        return result;
        
    }

    const parseDate = (chatDate) => {
        chatDate = new Date(chatDate);
        let onlyDate = `${chatDate.getFullYear()}.${(chatDate.getMonth()+1) < 10 ? '0' : '' }${(chatDate.getMonth()+1)}.${chatDate.getDate() < 10 ? '0' : ''}${chatDate.getDate()}`;
        return onlyDate;
    }
    
    const parseTime = (chatDate) => {
        chatDate = new Date(chatDate);
        let onlyTime = `${(chatDate.getHours()) < 10 ? '0' : '' }${chatDate.getHours()}:${(chatDate.getMinutes()) < 10 ? '0' : '' }${chatDate.getMinutes()}`;//:${chatDate.getSeconds() < 10 ? '0' : ''}${chatDate.getSeconds()}`;
        return onlyTime;
    }

    return (
        <View style={styles.ChattingView}>
            <FlatList
                ref={elem => (flatList = elem)}
                data={chatData}
                renderItem={({item, index})=>{ return (userId == item.uid) ? chatRight(item, index) : chatLeft(item, index)}}
                onContentSizeChange= {()=> flatList.scrollToEnd()} 
            />
        </View>
    );
}

const styles = StyleSheet.create({
    Row:{
        flexDirection: "row",
        flexWrap: "wrap",
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
    ChattingView:{
        flex:1,
        marginTop:-10,
        padding:15,
        paddingBottom: 0,
        // marginBottom:40,
        paddingBottom: 70,
        backgroundColor: '#F9FFEB'
    },
    ChatItemLeft:{
        alignItems:'flex-start'
    },
    ChatItemRight:{
        alignItems:'flex-end'
    },
    ItemArea:{
        marginBottom:15
    },
    ChatBubbleHome:{
        maxWidth:350,
        height: 35,
        // borderWidth:1,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        borderBottomEndRadius: 0,
        marginBottom:2,
        backgroundColor:'#92D14F',
    },
    ChatBubbleAway:{
        maxWidth:350,
        backgroundColor:'black',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        borderTopStartRadius: 0,
        marginTop:2,
        marginBottom:2,
        backgroundColor: '#FFFFFF',
    }
});

export default ChattingView;