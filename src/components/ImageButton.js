import * as React from 'react';
import { TouchableOpacity, Image, Text, StyleSheet} from 'react-native';

const ImageButton = (props) => {
    return (
        <TouchableOpacity style={[styles.TouchableOpacity, props.styles]} onPress={props.onPress}>
            <Image style={[styles.Image, props.ImageStyle]} source={props.image} />
            <Text style={[styles.Text, (props.title ? '' : {display:'none'}), props.TextStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  TouchableOpacity:{
    paddingTop:0,
    paddingBottom:0,
    paddingLeft:10,
    paddingRight:10,
    alignItems:'center',
    justifyContent:'center',
  },
  Image:{
    flex: 1,
    width: '90%',
    height: '90%',
    resizeMode: 'contain',
  },
  Text:{
      color:'black'
  }
});

export default ImageButton;