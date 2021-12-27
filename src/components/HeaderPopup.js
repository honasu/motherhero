import * as React from 'react';
import { Dimensions, View, Text, StyleSheet} from 'react-native';

import ImageButton from './../components/ImageButton';

const HeaderPopup = (props) => {
    return (
        <View style={[styles.View, styles.Shadow]}>
            <ImageButton
                image={require('./../assets/images/icon/multifly.png')}
                styles={styles.HeaderButton}
                onPress={() => props.onPrev ? props.onPrev() : props.navigation.goBack()}
            />
            <Text style={styles.HeaderText}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  View:{
    width:'100%',
    height:50,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    flexWrap: "wrap",
    flexDirection: "row",
    position:'absolute',
    top:0,
    backgroundColor:'#47C83E',
    zIndex:5
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
  HeaderText:{
    position:'absolute',
    width: Dimensions.get('window').width - 100,
    height:'100%',
    textAlign:'center',
    fontSize:20,
    top:10,
    left:55,
    lineHeight:30,
    color:'white',
  },
  HeaderButton:{
    width:30,
    height:30,
    paddingLeft:0,
    paddingRight:0,
    marginLeft:5,
  }
});

export default HeaderPopup;