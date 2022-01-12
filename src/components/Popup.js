import React from "react";
import {
  Text,
  View,
  Modal,
  TouchableHighlight,
  StyleSheet,
  Dimensions,
  TouchableOpacity
} from "react-native";

const Popup = props => {
    
    const isPopup = props.isPopup;
    const setIsPopup = props.setIsPopup;
    const modalText = props.modalText;
    const updateUserInfo = props.updateUserInfo;

    return (
        <Modal transparent={true} visible={isPopup} onBackdropPress={() => {setIsPopup(false)}}>
            <TouchableOpacity 
                style={styles.modalBackground}
                onPress={() => {setIsPopup(false)}}
            />
            <View style={styles.modal} >
                    <Text style={styles.modalText}>{modalText}</Text>
                    <View style={styles.modalButtonView}>
                        <TouchableHighlight 
                            style={[styles.modalButton, {backgroundColor: '#92D14F'}]} 
                            onPress={() => {updateUserInfo()}}
                        >
                            <Text style={[styles.modalButtonText, {color: '#FFFFFF'}]}>확인</Text>
                        </TouchableHighlight>
                        <TouchableHighlight 
                            style={[styles.modalButton, {backgroundColor: '#DCDCDC'}]} 
                            onPress={() => {setIsPopup(false)}}
                        >
                            <Text style={[styles.modalButtonText, {color: '#191919'}]}>취소</Text>
                        </TouchableHighlight>
                    </View>
                </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height
  },
  modal: {
    position: 'absolute',
    top: '40%',
    backgroundColor: '#FFFFFF',
    alignSelf: 'center',
    width: 300,
    height: 140,
    borderRadius: 10,
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center'
  },
  modalText: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Regular',
    color: '#191919',
    fontSize: 18,
    margin:5
  },
  modalButtonView: {
    flexDirection: 'row'
  },
  modalButton: {
    padding: 5,
    borderRadius: 10,
    margin: 5,
    width: 120,
    alignItems: 'center'
  },
  modalButtonText: {
    includeFontPadding:false,
    fontFamily:'NotoSansKR-Regular',
    color: '#191919',
    fontSize: 18,
  }
});

export default Popup;