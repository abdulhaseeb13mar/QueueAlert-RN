/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useCallback} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import {connect} from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  setUserInfoAction,
  setIsAccepting,
  setCurrentScreen,
} from '../../../redux/actions';
import {InnerWrapper} from '../../../components';
import constants from '../../../theme/constants';
import {withTheme, Button, Avatar} from 'react-native-paper';
import firestore from '@react-native-firebase/firestore';
import {useFocusEffect} from '@react-navigation/native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import ImageSelectionModal from '../../../components/modals/ImageSelection';
import ConfirmPhotoModal from '../../../components/modals/ConfirmPhoto';

const Profile = ({theme, height, ...props}) => {
  const {async, collections} = constants;
  const VendorRef = firestore()
    .collection(collections.Vendors)
    .doc(props.user.uid);

  const VendorQueueRef = firestore()
    .collection(collections.Queues)
    .doc(props.user.uid);

  const [loading1, setLoading1] = useState(false);
  const [loading2, setLoading2] = useState(false);
  const [isModal1Open, setIsModal1Open] = useState(false);
  const [isModal2Open, setIsModal2Open] = useState(false);
  const [uploadImage, setUploadImage] = useState(null);

  useFocusEffect(
    useCallback(() => {
      props.setCurrentScreen(constants.appScreens.Profile);
    }, []),
  );

  const logout = async () => {
    await AsyncStorage.removeItem(async.user);
    props.setUserInfoAction({userType: 'none'});
  };

  const startAccepting = async () => {
    setLoading1(true);
    await VendorQueueRef.get()
      .then(async Queue => {
        if (!Queue.exists) {
          await VendorQueueRef.set({
            currentNum: 0,
            queue: {},
            totalEnrollment: 0,
            vendor: firestore().doc(`Vendors/${props.user.uid}`),
            hasStarted: false,
          })
            .then()
            .catch();
        }
        await VendorRef.update({isAccepting: true})
          .then(async () => {
            try {
              props.setIsAccepting({isAccepting: true});
              const userInfo = await AsyncStorage.getItem(async.user);
              await AsyncStorage.setItem(
                async.user,
                JSON.stringify({...JSON.parse(userInfo), isAccepting: true}),
              );
            } catch (error) {}
          })
          .catch();
        setLoading1(false);
      })
      .catch();
  };

  const stopAccepting = async () => {
    setLoading2(true);
    await VendorRef.update({isAccepting: false})
      .then(async () => {
        try {
          props.setIsAccepting({isAccepting: false});
          const userInfo = await AsyncStorage.getItem(async.user);
          await AsyncStorage.setItem(
            async.user,
            JSON.stringify({...JSON.parse(userInfo), isAccepting: false}),
          );
          setLoading2(false);
        } catch (error) {}
      })
      .catch();
  };

  const handlePhotoSelection = choice => {
    setIsModal1Open(false);
    choice === 1
      ? launchCamera(
          {mediaType: 'photo', saveToPhotos: false, quality: 0.4},
          assets => !assets.didCancel && setUploadImage(assets.assets[0].uri),
        )
      : launchImageLibrary(
          {mediaType: 'photo', saveToPhotos: false, quality: 0.4},
          assets => !assets.didCancel && setUploadImage(assets.assets[0].uri),
        );
  };

  const chooseAnotherPhoto = () =>
    setUploadImage(null) && setIsModal1Open(true);

  const handleOnUploaded = () => {};

  return (
    <InnerWrapper>
      <View
        style={{
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          height: 150,
        }}>
        <TouchableOpacity onPress={() => setIsModal1Open(true)}>
          <Avatar.Image
            size={120}
            source={{uri: props.user.photoUrl}}
            style={{elevation: 6}}
          />
          <Avatar.Icon
            icon="pencil"
            size={25}
            style={{position: 'absolute', bottom: 0, right: 0, elevation: 7}}
          />
        </TouchableOpacity>
        <Text>{props.user.name}</Text>
      </View>
      <Button onPress={logout} mode="contained" style={{marginBottom: 20}}>
        logout
      </Button>
      <Button
        onPress={startAccepting}
        style={{marginBottom: 20}}
        mode="contained"
        disabled={loading1 || props.user.isAccepting}
        loading={loading1}>
        {loading1 ? '' : 'Start Accepting'}
      </Button>
      <Button
        onPress={stopAccepting}
        mode="contained"
        disabled={loading2 || !props.user.isAccepting}
        loading={loading2}>
        {loading2 ? '' : 'Stop Accepting'}
      </Button>
      <ImageSelectionModal
        isVisible={isModal1Open}
        onClose={() => setIsModal1Open(false)}
        onSelection={handlePhotoSelection}
      />
      <ConfirmPhotoModal
        isVisible={isModal2Open}
        onClose={() => setUploadImage(null)}
        chooseAnotherPhoto={chooseAnotherPhoto}
        image={uploadImage}
        uid={props.user.uid}
        uploaded={handleOnUploaded}
      />
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {
  setUserInfoAction,
  setIsAccepting,
  setCurrentScreen,
})(withTheme(Profile));
