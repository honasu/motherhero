import * as React from 'react';
import { Dimensions, View, Text, StyleSheet, Platform } from 'react-native';

import ImageButton from './../components/ImageButton';

const HeaderMenu = (props) => {

  let userId = '1';

  const iconList = [
      require('./../assets/images/icons/alram_white.png'),
      require('./../assets/images/icons/maypage_white.png'),
      require('./../assets/images/icons/menu_white.png')
  ]
  return (
      <View style={[styles.View, styles.Shadow]}>
          <ImageButton
              image={iconList[2]}
              styles={[styles.HeaderButton, styles.icon]}
              onPress={() => props.navigation.openDrawer()}
          />
          <Text style={styles.HeaderText}>{props.title}</Text>
          <View style={styles.buttonView}>
              <ImageButton
                  image={iconList[0]}
                  styles={[styles.rightHeaderButton, styles.icon]}
                  onPress={() => props.navigation.navigate('Push')}
              />
              <ImageButton
                  image={iconList[1]}
                  styles={[styles.rightHeaderButton, styles.icon]}
                  onPress={() => userId ? props.navigation.navigate('MyPage') : props.navigation.navigate('Login')}
              />
          </View>
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
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
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
    color:'#FFFFFF',
    marginRight:10
  },
  HeaderButton:{
    width:30,
    height:30,
    paddingLeft:0,
    paddingRight:0,
    position: 'absolute',
    left: 20,
  },
  buttonView: {
    position: 'absolute',
    right: 15,
    flexDirection: 'row'
  },
  rightHeaderButton: {
    width:30,
    height:30,
    paddingLeft:0,
    paddingRight:0,
    marginLeft:10,
  },
});

export default HeaderMenu;