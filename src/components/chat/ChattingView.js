import * as React from 'react';
import { StyleSheet, ScrollView, View, Text} from 'react-native';

const ChattingView = (props) => {
    const userId = props.userId;
    const chatData = props.chatData;
    const chatItemStyle = props.chatItemStyle;

    const testCode=1

    const chatRight = (data, index) => {
        return (<View key={index} style={[styles.ChatItemRight, chatItemStyle, (index+1==chatData.length?{marginBottom:30}:{display:'flex'})]}>
            <View style={styles.ItemArea}>
                <View style={styles.ChatBubbleHome}>
                    <Text style={{color:'black'}}>{data.chat}</Text>
                </View>
                <Text style={{textAlign:'right'}}>{data.reg_date}</Text>
            </View>
        </View>);
        
    }
    const chatLeft = (data, index) => {
        return (<View key={index} style={[styles.ChatItemLeft, chatItemStyle, (index+1==chatData.length?{marginBottom:30}:{display:'flex'})]}>
            <View style={styles.ItemArea}>
                <Text style={{display:'flex'}}>{data.writer}</Text>
                <View style={styles.ChatBubbleAway}>
                    <Text style={{color:'white'}}>{data.chat}</Text>
                </View>
            </View>
        </View>);
        
    }

    return (
        <ScrollView style={styles.ChattingView}>
            {chatData.map((data, index) => (
                (userId == data.writer) ? chatRight(data, index) : chatLeft(data, index)
            ))}
        </ScrollView>
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
        marginTop:-10,
        padding:20,
        marginBottom:70,
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
        maxWidth:150,
        borderWidth:1,
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        marginBottom:2
    },
    ChatBubbleAway:{
        maxWidth:150,
        backgroundColor:'black',
        paddingTop:5,
        paddingBottom:5,
        paddingLeft:10,
        paddingRight:10,
        borderRadius:5,
        marginTop:2,
        marginBottom:2
    }
});

export default ChattingView;