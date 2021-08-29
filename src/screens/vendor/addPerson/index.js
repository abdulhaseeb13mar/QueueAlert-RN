/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import {InnerWrapper, TextInputPaper} from '../../../components';
import constants from '../../../theme/constants';
import {withTheme, Menu, Button} from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';
import {getStructuredDate} from '../../../utils/helpers';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {isFormValid} from './validation';
import firestore from '@react-native-firebase/firestore';
import {showSnackbar} from '../../../utils/helpers';
import SuccessfulAddedModal from '../../../components/modals/SuccessfulAdded';
import {generateId} from '../../../utils/helpers';
import {useFocusEffect} from '@react-navigation/native';
import {setCurrentScreen} from '../../../redux/actions';
const AddPerson = ({theme, height, ...props}) => {
  const StyleProp = {colors: theme.colors, height};

  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dob, setDob] = useState(new Date());
  const [isVisible, setIsVisible] = useState(false);
  const [isMale, setIsMale] = useState(true);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [userData, setUserData] = useState(null);
  const [errMsgs, setErrMsgs] = useState({
    name: '',
    email: '',
    phone: '',
  });

  useFocusEffect(
    useCallback(() => {
      props.setCurrentScreen(constants.appScreens.AddPerson);
    }, []),
  );

  const {collections, snackbarType} = constants;

  const VendorQueueRef = firestore()
    .collection(collections.Queues)
    .doc(props.user.uid);

  const VendorRef = firestore()
    .collection(collections.Vendors)
    .doc(props.user.uid);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    selectedDate && setDob(selectedDate);
  };

  const setGender = bool => {
    setIsVisible(false);
    setIsMale(bool);
  };

  const clearFields = () => {
    setName('');
    setEmail('');
    setPhone('');
    setDob(new Date());
    setIsMale(true);
  };

  const handleAddPerson = async () => {
    const validation = isFormValid(name, email, phone);
    if (!validation.status) {
      errorMsgHandler(validation.errCategory, validation.errMsg);
    } else {
      setLoading(true);
      const data = {
        name,
        email,
        gender: isMale ? 'male' : 'female',
        cancelled: false,
        phone,
        dob,
      };
      await VendorRef.get()
        .then(async vendorInfo => {
          if (vendorInfo.data().isAccepting) {
            await firestore()
              .runTransaction(transaction => {
                return transaction.get(VendorQueueRef).then(QueueInfo => {
                  if (!QueueInfo.exists) {
                    return Promise.reject('Person was not added unfortunately');
                  }
                  const totalEnrollments = QueueInfo.data().totalEnrollment;
                  const uid = generateId();
                  transaction.update(VendorQueueRef, {
                    totalEnrollment: totalEnrollments + 1,
                    [`queue.${uid}`]: {
                      ...data,
                      uid,
                      number: totalEnrollments + 1,
                    },
                  });
                  return Promise.resolve(totalEnrollments + 1);
                });
              })
              .then(number => {
                setUserData({
                  name,
                  email,
                  phone,
                  dob,
                  number,
                  gender: isMale,
                });
                clearFields();
              })
              .catch(error => console.log(error));
          } else {
            showSnackbar(
              'Vendor not accepting queue numbers',
              snackbarType.SNACKBAR_ERROR,
            );
          }
        })
        .catch();

      setLoading(false);
    }
  };

  const errorMsgHandler = (errCategory, errMsg) => {
    if (errCategory === 'name') {
      setErrMsgs({email: '', name: errMsg, phone: ''});
    } else if (errCategory === 'email') {
      setErrMsgs({name: '', email: errMsg, phone: ''});
    } else if (errCategory === 'phone') {
      setErrMsgs({name: '', phone: errMsg, email: ''});
    }
  };

  return (
    <InnerWrapper>
      <View style={styles(StyleProp).inputContainer}>
        <Text style={styles(StyleProp).labelStyle}>Name: {errMsgs.name}</Text>
        <TextInputPaper
          placeholder="Name"
          onChangeText={t => setName(t)}
          value={name}
        />
      </View>
      <View style={styles(StyleProp).inputContainer}>
        <Text style={styles(StyleProp).labelStyle}>Email: {errMsgs.email}</Text>
        <TextInputPaper
          placeholder="email"
          keyboardType="email-address"
          onChangeText={t => setEmail(t)}
          value={email}
        />
      </View>
      <View style={styles(StyleProp).inputContainer}>
        <Text style={styles(StyleProp).labelStyle}>
          Phone#: {errMsgs.phone}
        </Text>
        <TextInputPaper
          placeholder="Phone#"
          keyboardType="number-pad"
          onChangeText={t => setPhone(t)}
          value={phone}
        />
      </View>
      <View style={styles(StyleProp).inputContainer}>
        <Text style={styles(StyleProp).labelStyle}>Date of Birth:</Text>
        <TextInputPaper
          placeholder="Date of Birth"
          onPressOut={() => setShowDatePicker(true)}
          value={getStructuredDate(dob)}
        />
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={dob}
          mode="date"
          display="default"
          onChange={onDateChange}
          onTouchCancel={() => setShowDatePicker(false)}
        />
      )}
      <View style={styles(StyleProp).inputContainer}>
        <Text style={styles(StyleProp).labelStyle}>Gender:</Text>
        <Menu
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          anchor={
            <View style={styles(StyleProp).dropDownContainer}>
              <Button
                style={styles(StyleProp).dropDownBtn}
                contentStyle={styles(StyleProp).btnContentStyle}
                labelStyle={styles(StyleProp).BtnLabel}
                uppercase={false}
                mode="contained"
                icon={() => (
                  <Ionicons name="ios-caret-down" size={17} color="black" />
                )}
                onPress={() => setIsVisible(true)}>
                {isMale ? 'Male' : 'Female'}
              </Button>
            </View>
          }>
          <Menu.Item
            onPress={() => setGender(true)}
            title={
              <View>
                <Text>hello</Text>
                <Text>hello</Text>
              </View>
            }
          />
          <Menu.Item onPress={() => setGender(false)} title="Female" />
        </Menu>
      </View>
      <Button
        mode="contained"
        loading={loading}
        disabled={loading}
        onPress={handleAddPerson}>
        {loading ? '' : 'Add person'}
      </Button>
      <SuccessfulAddedModal
        userData={userData}
        onClose={() => setUserData(null)}
      />
    </InnerWrapper>
  );
};

const styles = ({colors, height}) =>
  StyleSheet.create({
    inputContainer: {width: '100%'},
    labelStyle: {fontWeight: 'bold', alignSelf: 'flex-start'},
    dropDownContainer: {alignItems: 'flex-start'},
    dropDownBtn: {
      backgroundColor: 'white',
      borderWidth: 1,
      borderRadius: 8,
    },
    btnContentStyle: {flexDirection: 'row-reverse'},
    BtnLabel: {color: 'black'},
  });

const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {setCurrentScreen})(
  withTheme(AddPerson),
);
