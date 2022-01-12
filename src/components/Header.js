import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ImageButton from './ImageButton';

const Header = (props) => {

  let userId = '';

  const iconList = [
      require('./../assets/images/icons/mainLeftLogo.png'),
      require('./../assets/images/icons/symbolLogo_small.png'),
      require('./../assets/images/icons/alram.png'),
      require('./../assets/images/icons/mypage.png'),
      require('./../assets/images/icons/menu.png')
  ]

  return (
      <View style={[styles.View, styles.Shadow]}>
          <ImageButton
              image={iconList[0]}
              styles={[styles.HeaderButton, {width:130, height:26}]}
              // onPress={() => props.navigation.navigate('Push')}
          />
          <ImageButton
              image={iconList[1]}
              styles={[styles.HeaderButton, {width:80, height:53}]}
              // onPress={() => props.navigation.navigate('Push')}
          />
          <View style={[styles.buttonView, {width:130, height:26}]}>
              <ImageButton
                  image={iconList[2]}
                  styles={[styles.HeaderButton, styles.icon]}
                  onPress={() => props.navigation.navigate('Push')}
              />
              <ImageButton
                  image={iconList[3]}
                  styles={[styles.HeaderButton, styles.icon]}
                  onPress={() => userId ? props.navigation.navigate('MyPage') : props.navigation.navigate('Login')}
              />
              <ImageButton
                  image={iconList[4]}
                  styles={[styles.HeaderButton, styles.icon]}
                  onPress={() => props.navigation.openDrawer()}
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
    // position:'absolute',
    top:0,
    backgroundColor:'white',
    zIndex: 5,
    justifyContent: 'space-between',
    alignContent: 'center',
    alignItems: 'center',
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
  Text:{
      color:'black'
  },                                                                                   
  buttonView: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignContent: 'center',
    alignItems: 'center',
  },
  HeaderButton:{
    width:26,
    height:26,
    paddingLeft:0,
    paddingRight:0,
  },
  icon: {
    marginRight: 10
  },
});

export default Header;