import * as React from 'react';
import { Image, StyleSheet} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown'

const Selector = (props) => {
    return (
        <SelectDropdown
          data={props.data}
          buttonStyle={[styles.SelectAreaStyle, props.SelectAreaStyle,]}
          buttonTextStyle={[props.SelectStyle,styles.SelectStyle]}
          defaultButtonText={props.Placeholder}
          rowStyle={[props.rowStyle,styles.rowStyle]}
          rowTextStyle={[props.rowTextStyle,styles.rowTextStyle]}
          defaultValueByIndex={props.defaultValueByIndex}
          renderDropdownIcon={(isOpened) => {
            return (
              <Image style={styles.Image} source={(isOpened?require('./../assets/images/icon/up-arrow.png'):require("./../assets/images/icon/down-arrow.png"))} />
            );
          }}
          onSelect={(selectedItem, index) => {
            props.onSelect(index);
            // console.log(selectedItem, index)
          }}
          buttonTextAfterSelection={(selectedItem, index) => {
            // text represented after item is selected
            // if data array is an array of objects then return selectedItem.property to render after item is selected
            return selectedItem
          }}
          rowTextForSelection={(item, index) => {
            // text represented for each item in dropdown
            // if data array is an array of objects then return item.property to represent item in dropdown
            return item
          }}
        />
    );
}

const styles = StyleSheet.create({
    Image:{
      width:15,
      height:15
    },
    SelectAreaStyle:{
        width:200,
        height:30,
        backgroundColor:'transparent',
        borderWidth:1,
        borderRadius:5,
        // marginBottom:10,
        // backgroundColor: 'white',
    },
    SelectStyle:{
        textAlign:'left',
        fontSize:13
    },
    rowStyle:{
        height:30,
        paddingLeft:10
    },
    rowTextStyle:{
        textAlign:'left',
        fontSize:12
    },
});

export default Selector;