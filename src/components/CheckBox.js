import React, {useState}  from 'react';
import { TouchableOpacity, Text, StyleSheet} from 'react-native';

const CheckBox = (props) => {
    return (
        <TouchableOpacity style={{ flexDirection: 'row', }} onPress = { () => { props.isChecked ? props.onChange(false) : props.onChange(true); }}>
            <TouchableOpacity style={[styles.TouchableOpacity, props.styles, (props.isChecked)?props.checkedViewStyle:{}]} onPress = { () => { props.isChecked ? props.onChange(false) : props.onChange(true); }}>
                <Text style={[styles.checkText, props.checkTextStyle, (props.isChecked)?{display:"flex"}:{display:"none"}]}>V</Text>
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
  checkText: {
      fontSize: 13
  }
});

export default CheckBox;