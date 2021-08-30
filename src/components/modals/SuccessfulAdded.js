/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
// import constants from '../../../theme/constants';
import {Button, withTheme} from 'react-native-paper';
import Modal from 'react-native-modal';

const SuccessfulAddedModal = ({theme, height, userData, onClose, ...props}) => {
  const StyleProp = {colors: theme.colors, height};
  return (
    <Modal
      isVisible={userData ? true : false}
      useNativeDriver={true}
      useNativeDriverForBackdrop={true}
      onBackButtonPress={() => onClose()}
      onBackdropPress={() => onClose()}>
      <View style={{backgroundColor: 'white', height: 300}}>
        {userData && (
          <>
            <Text style={{fontSize: 20}}>{userData.number}</Text>
            <Text>name: {userData.name}</Text>
            <Text>email: {userData.email}</Text>
            <Text>phone: {userData.phone}</Text>
            <Text>phone: {userData.gender ? 'Male' : 'Female'}</Text>
          </>
        )}
        <Button mode="contained" onPress={() => onClose()}>
          Close
        </Button>
      </View>
    </Modal>
  );
};

const styles = ({colors, height}) => StyleSheet.create({});

const mapStateToProps = state => ({
  height: state.HeightReducer,
});

export default connect(mapStateToProps, {})(withTheme(SuccessfulAddedModal));
