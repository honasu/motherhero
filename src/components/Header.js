import * as React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import ImageButton from './ImageButton';

const Header = (props) => {

    const iconList = [
        require('./../assets/images/icon/circle-menu-on.png'),
        require('./../assets/images/icon/search-on.png'),
        require('./../assets/images/icon/alarm-on.png')
    ]

    return (
        <View style={[styles.View, styles.Shadow]}>
            <ImageButton
                image={iconList[0]}
                styles={styles.HeaderButton}
                onPress={() => props.navigation.navigate('Login')}
            />
            {/* <ImageButton
                image={iconList[1]}
                styles={styles.HeaderButton}
                onPress={() => props.navigation.navigate('Login')}
            /> */}
            <ImageButton
                image={iconList[2]}
                styles={[styles.HeaderButton,{position: 'absolute', top:10, right: 10}]}
                onPress={() => props.navigation.navigate('Push')}
            />
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
    backgroundColor:'white',
    zIndex: 5,
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
  HeaderButton:{
    width:30,
    height:30,
    paddingLeft:0,
    paddingRight:0,
    marginLeft:5,
  }
});

export default Header;