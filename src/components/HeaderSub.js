import * as React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native';
import ImageButton from './ImageButton';
import Input from './Input';

const HeaderSub = (props) => {
    return (
        <View style={[styles.View, styles.Shadow]}>
            <ImageButton
                image={require('./../assets/images/icon/left-arrow.png')}
                styles={styles.HeaderButton}
                onPress={() => props.onPrev ? props.onPrev() : props.navigation.goBack()}
            />
            <Input
                styles={[styles.BasicInput, (props.page=='search'?{display:'flex'}:{display:'none'})]}
                InputStyle={styles.InputStyle}
                placeholder={"검색 내용을 입력하세요."}
            />
            <ImageButton
                image={require('./../assets/images/icon/search-on.png')}
                styles={[styles.SearchButton, (props.page=='search'?{display:'flex'}:{display:'none'})]}
                onPress={() => props.navigation.goBack()}
            />
            <Text style={[styles.HeaderText,(props.page=='normal'?{display:'flex'}:{display:'none'})]}>{props.title}</Text>
            <ImageButton
                title='완료'
                styles={[styles.BasicButton,styles.SmallButton,(props.page=='detail_filter'?{display:'flex'}:{display:'none'})]}
                TextStyle={styles.SmallButtonText}
                onPress={() => props.navigation.goBack()}
            />
            <ImageButton
                image={props.isOn ? require('./../assets/images/icon/favorite_on.png') : require('./../assets/images/icon/favorite_off.png')}
                styles={[styles.FavorButton, (props.type=='favorite'?{display:'flex'}:{display:'none'})]}
                onPress={() => props.navigation.goBack()}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    View:{
      width:'100%',
      height:50,
      paddingTop:0,
      paddingBottom:0,
      paddingLeft:10,
      paddingRight:10,
      flexWrap: "wrap",
      flexDirection: "row",
      position:'absolute',
      top:0,
      backgroundColor:'#47C83E',
    },
    HeaderText:{
      position:'absolute',
      width: Dimensions.get('window').width - 100,
      height:'100%',
      textAlign:'center',
      color: 'white',
      fontSize:20,
      top:10,
      left:55,
      lineHeight:30,
    },
    HeaderButton:{
      width:30,
      height:30,
      paddingLeft:0,
      paddingRight:0,
      marginTop:10,
      marginLeft:5,
    },
    SearchButton:{
      width:30,
      height:30,
      paddingLeft:0,
      paddingRight:0,
      marginTop:10,
      marginLeft:15,
    },
    BasicInput:{
      marginLeft:15,
      paddingTop:0,
      paddingBottom:0,
      height:34,
      marginTop:8,
      width:Dimensions.get('window').width - 120,
    },
    InputStyle:{
      height:'100%',
      fontSize:13
    },
    BasicButton:{
    },
    SmallButton:{
        width:50,
        position:'absolute',
        right:15
    },
    SmallButtonText:{
        fontSize:11,
        height:'100%',
        lineHeight:18,
        fontWeight:'bold',
    },
    FavorButton: {
        width:30,
        height:30,
        paddingLeft:0,
        paddingRight:0,
        marginTop:10,
        marginLeft:15,
        position:'absolute',
        right:15
    }
});

export default HeaderSub;