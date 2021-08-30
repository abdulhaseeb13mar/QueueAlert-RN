/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
// import constants from '../../../theme/constants';
import {withTheme} from 'react-native-paper';
import Modal from 'react-native-modal';

const ImageSelectionModal = ({
  theme,
  height,
  isVisible,
  onClose,
  onSelection,
}) => {
  const StyleProp = {colors: theme.colors, height};
  return (
    <Modal
      isVisible={isVisible}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}>
      <View style={{backgroundColor: 'white'}}>
        <TouchableOpacity
          onPress={() => onSelection(1)}
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Take Photo</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => onSelection(2)}
          style={{
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text>Choose from Gallery</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

const styles = ({colors, height}) => StyleSheet.create({});

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {})(withTheme(ImageSelectionModal));
