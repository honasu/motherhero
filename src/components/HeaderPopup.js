import * as React from 'react';
import { Dimensions, View, Text, StyleSheet} from 'react-native';

import ImageButton from './../components/ImageButton';

const HeaderPopup = (props) => {
    return (
        <View style={[styles.View, styles.Shadow]}>
            <ImageButton
                image={require('./../assets/images/icons/x.png')}
                styles={[styles.HeaderButton]}
                onPress={() => props.onPrev ? props.onPrev() : props.navigation.goBack()}
            />
            <Text style={styles.HeaderText}>{props.title}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
  View:{
    width:'100%',
    height:70,
    paddingTop:10,
    paddingBottom:10,
    paddingLeft:10,
    paddingRight:10,
    flexWrap: "wrap",
    flexDirection: "row",
    position:'absolute',
    top:0,
    backgroundColor:'#92D14F',
    zIndex:5,
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
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
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Regular',
    fontSize: 22,
    color:'white',
    marginRight:10
  },
  HeaderButton:{
    width:26,
    height:26,
    paddingLeft:0,
    paddingRight:0,
    position: 'absolute',
    left: 20,
  },
});

export default HeaderPopup;