import * as React from 'react';
import {useState} from 'react';
import { Dimensions, View, Image, StyleSheet} from 'react-native';
import Button from '../Button';
import Input from '../Input';

const ChattingButton = (props) => {
    const [message, setMessage] = useState();

    return (
        <View style={[styles.View, styles.Shadow, styles.Row]}>
            {/* <Image style={styles.Image} source={require('../../assets/images/icons/plus_chat.png')}/> */}
            <Input
                styles={[styles.BasicInput]}
                InputStyle={styles.InputStyle}
                placeholder={"무슨 고민이 있으신가요?"}
                value={message}
                onChangeText={setMessage}
            />
            <Button
                title='보내기'
                styles={styles.BasicButton}
                TextStyle={[styles.SmallButtonText]}
                onPress={() => {
                    if(message) {
                        props.insetMessage(message);
                        setMessage(); 
                    }
                }}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    View:{
        width:'100%',
        height:55,
        padding:8,
        // paddingTop:5,
        // paddingBottom: 5,
        // paddingTop:15,
        // paddingBottom:15,
        // paddingLeft:20,
        // paddingRight:20,
        flexWrap: "wrap",
        flexDirection: "row",
        position:'absolute',
        bottom:0,
        backgroundColor:'white',
        zIndex:5,
        borderTopColor: '#92D14F',
        borderTopWidth: 2,
        alignItems: 'center',
        alignContent: 'center',
        justifyContent: 'space-between'
    },
    Shadow:{
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: -1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2,
    },
    Row:{
        flexDirection: "row",
        flexWrap: "wrap",
    },
    Image:{
        width:25,
        height:25,
        // marginTop:5,
    },
    BasicInput:{
        // marginTop:5,
        marginLeft:8,
        paddingTop:0,
        paddingRight:0,
        paddingBottom:0,
        paddingLeft:0,
        // height:30,
        // width:Dimensions.get('window').width - 145,
        flex:1,
        borderWidth: 0
    },
    InputStyle:{
        // textAlign:'center',
        padding:5,
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 15,
        color: '#191919'
    },
    BasicButton:{
        // flex:1,
        width:70,
        alignItems: 'center',
        alignContent: 'center',
        padding:8,
        marginLeft: 6
        // paddingTop:10,
        // paddingBottom: 10
    },
    SmallButtonText: {
        color: '#FFFFFF',
        includeFontPadding:false,
        fontFamily:'NotoSansKR-Regular',
        fontSize: 15,
    }
});

export default ChattingButton;