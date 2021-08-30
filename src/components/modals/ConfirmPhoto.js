/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect, Avatar} from 'react-redux';
// import constants from '../../../theme/constants';
import {withTheme, Button} from 'react-native-paper';
import FastImage from 'react-native-fast-image';
import Modal from 'react-native-modal';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

import DefaultDP from '../../assets/default.jpg';
import {constants} from '../../theme';

const ConfirmPhotoModal = ({
  theme,
  height,
  isVisible,
  onClose,
  chooseAnotherPhoto,
  image,
  uid,
  uploaded,
  user,
}) => {
  const StyleProp = {colors: theme.colors, height};
  const [loading, setLoading] = useState(false);
  const uploadPhoto = async () => {
    setLoading(true);
    const path = `vendors/${uid}.jpg`;
    const response = await fetch(image);
    const file = await response.blob();
    const imageUrl = await storage()
      .ref(path)
      .put(file)
      .then(async () => {
        const url = await storage().ref(path).getDownloadURL();
        await firestore()
          .collection(constants.collections.Vendors)
          .doc(user.uid)
          .update({photoUrl: url});
        return url;
      })
      .catch(() => null);
    uploaded(imageUrl);
    onClose();
    setLoading(false);
  };

  return (
    <Modal
      isVisible={image ? true : false}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}>
      <View style={{backgroundColor: 'white'}}>
        <View
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: 150,
          }}>
          <FastImage
            source={{uri: image}}
            // source={image}
            resizeMode="cover"
            style={styles(StyleProp).imageStyle}
          />
        </View>
        <TouchableOpacity
          onPress={() => chooseAnotherPhoto()}
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Choose Another photo</Text>
        </TouchableOpacity>
        <Button
          mode="contained"
          onPress={uploadPhoto}
          loading={loading}
          disabled={loading}>
          UPLOAD
        </Button>
      </View>
    </Modal>
  );
};

const styles = ({colors, height}) =>
  StyleSheet.create({
    imageStyle: {
      width: 150,
      aspectRatio: 460 / 384,
      borderRadius: 15,
      elevation: 5,
    },
  });

const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, {})(withTheme(ConfirmPhotoModal));
