import React, {useState}  from 'react';
import { TouchableOpacity, Text, StyleSheet, Image} from 'react-native';

const CheckBox = (props) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', }} onPress = { () => { props.isChecked ? props.onChange(false) : props.onChange(true); }}>
            <TouchableOpacity style={[styles.TouchableOpacity, props.styles, (props.isChecked)?props.checkedViewStyle:{}]} onPress = { () => { props.isChecked ? props.onChange(false) : props.onChange(true); }}>
                <Image source={props.checkColor=='black' ? require('./../assets/images/icons/black_check.png') : require('./../assets/images/icons/white_check.png')} 
                style={[props.checkImgStyle, (props.isChecked)?{display:"flex"}:{display:"none"}]}/>
            </TouchableOpacity>
            {props.children}
        </TouchableOpacity>
        
    )
}

const styles = StyleSheet.create({
  TouchableOpacity:{
    borderWidth:1,
    width:20,
    height:20,
    borderRadius:5,
    alignSelf: 'center',
    alignItems:'center',
    marginRight: 5,
  },
});

export default CheckBox;