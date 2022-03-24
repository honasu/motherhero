import * as React from 'react';
import { View, TextInput, StyleSheet} from 'react-native';

const Input = (props) => {
    return (
        <View style={[styles.view, props.styles,(props.disabled?disabled:"")]}>
            <TextInput
                style={[styles.input, props.InputStyle]}
                placeholder={props.placeholder}
                editable={(props.disabled?false:true)}
                selectTextOnFocus={(props.disabled?false:true)}
                placeholderTextColor = "#AAAAAA"
                value={props.value}
                onChangeText={props.onChangeText}
                onSubmitEditting={props.onSubmitEditting}
                onEndEditing={props.onEndEditing}
                returnKeyType={props.returnKeyType}
                multiline={props.multiline}
                blurOnSubmit={props.blurOnSubmit}
            />
        </View>
    );    
}

const styles = StyleSheet.create({
  view:{
    borderWidth:1,
    paddingTop:10,
    paddingRight:15,
    paddingBottom:10,
    paddingLeft:15,
    borderColor:'#000000',
    borderRadius:5
  },
  disabled:{
    backgroundColor:'#e9e9e9'
  }
});

export default Input;