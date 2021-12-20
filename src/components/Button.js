import * as React from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = (props) => {
    return (
        <TouchableOpacity activeOpacity={0.8} style={[styles.TouchableOpacity, props.styles, (props.disabled?styles.Disabled:"")]} onPress={props.onPress} disabled={props.disabled}>
            <Text style={[styles.Text, props.TextStyle]}>{props.title}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
  TouchableOpacity:{
    width:230,
    height:30,    
    borderWidth:0,
    paddingLeft:5,
    paddingRight:5,
    paddingTop:5,
    paddingBottom:5,
    backgroundColor:'#47C83E',
    borderRadius:5,
    alignItems:'center',
    marginTop:10
  },
  Text:{
    color:'white',
    fontSize:12,
    height:'100%',
    lineHeight:18
  },
  Disabled:{
      backgroundColor:'#9e9e9e',
      borderColor:'#9e9e9e'
  }
});

export default Button;