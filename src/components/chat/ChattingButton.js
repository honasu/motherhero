import * as React from 'react';
import { Dimensions, View, Image, StyleSheet} from 'react-native';
import Button from '../Button';
import Input from '../Input';

const ChattingButton = (props) => {
    return (
        <View style={[styles.View, styles.Shadow, styles.Row]}>
            <Image style={styles.Image} source={require('../../assets/images/icon/picture-on.png')}/>
            <Input
                styles={[styles.BasicInput]}
                InputStyle={styles.InputStyle}
                placeholder={"채팅 내용을 입력하세요."}
            />
            <Button
                title='전송'
                styles={styles.BasicButton}
                TextStyle={[styles.SmallButtonText, {fontWeight:'bold'}]}
                // onPress={() => this.props.navigation.navigate('Main')}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    View:{
        width:'100%',
        height:70,
        paddingTop:15,
        paddingBottom:15,
        paddingLeft:20,
        paddingRight:20,
        flexWrap: "wrap",
        flexDirection: "row",
        position:'absolute',
        bottom:0,
        backgroundColor:'white',
        zIndex:5
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
        width:30,
        height:30,
        marginTop:5,
    },
    BasicInput:{
        marginTop:5,
        marginLeft:15,
        paddingTop:0,
        paddingBottom:0,
        height:30,
        width:Dimensions.get('window').width - 145,
    },
    InputStyle:{
        height:'100%',
        fontSize:13
    },
    BasicButton:{
        width:50,
        marginTop:5,
        position:'absolute',
        top:15,
        right:15
    }
});

export default ChattingButton;