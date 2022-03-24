import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  Image
} from "react-native";

const PushPopup = props => {    
    const pushData = props.pushData;
    const title = (pushData.notification) ? pushData.notification.title : null;
    const body = (pushData.notification) ? pushData.notification.body : null;
    
    return (
        (
            <View style={pushData.notification ? [styles.modal, styles.Shadow] : null} >
                    {pushData.notification ? <Image style={[styles.Image]} source={require('./../assets/images/icons/pushPopup.png')} /> : null }
                    {pushData.notification ? <View  style={styles.modalTextView}>
                        <Text style={styles.modalTitleText} numberOfLines={1} ellipsizeMode="tail">
                            {title}
                        </Text>
                        <Text style={[styles.modalBodyText]} numberOfLines={1} ellipsizeMode="tail">
                            {body}
                        </Text>
                    </View> : null}
            </View>
        )
        // </Modal>
    );
};

const styles = StyleSheet.create({
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
    Image: {
        width: 45,
        height: 45,
        zIndex: 1001,
    },
  modal: {
    position: 'absolute',
    top: 10,
    // borderWidth: 1,
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    width: '95%',
    height: 70,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    flexDirection: 'row',
    paddingLeft: 15,
    paddingRight: 15,
  },
  modalTextView: {
    marginLeft: 15,
    flex: 1,
  },
  modalTitleText: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Regular',
    color: '#191919',
    fontSize: 15,
  },
  modalBodyText: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Regular',
    color: '#AAAAAA',
    fontSize: 13,
  },
});

export default PushPopup;