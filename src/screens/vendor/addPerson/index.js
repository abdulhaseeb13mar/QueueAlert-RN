/* eslint-disable react-native/no-inline-styles */
import React, {useState, createRef} from 'react';
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
  const [errMsgs, setErrMsgs] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const {collections} = constants;

  const VendorQueueRef = firestore()
    .collection(collections.Queues)
    .doc(props.user.uid);

  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(false);
    selectedDate && setDob(selectedDate);
  };

  const setGender = bool => {
    setIsVisible(false);
    setIsMale(bool);
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
      await firestore()
        .runTransaction(transaction => {
          return transaction.get(VendorQueueRef).then(QueueInfo => {
            if (!QueueInfo.exists) {
              return Promise.reject('Person was not added unfortunately');
            }
            const totalEnrollments = QueueInfo.data().totalEnrollment;
            console.log(totalEnrollments);
            transaction.update(VendorQueueRef, {
              totalEnrollment: totalEnrollments + 1,
              queue: firestore.FieldValue.arrayUnion({
                ...data,
                number: totalEnrollments + 1,
              }),
            });
            return Promise.resolve('Transaction completed');
          });
        })
        .then(status => console.log(status))
        .catch(error => console.log(error));

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
      <View style={{width: '100%'}}>
        <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>
          Name: {errMsgs.name}
        </Text>
        <TextInputPaper placeholder="Name" onChangeText={t => setName(t)} />
      </View>
      <View style={{width: '100%'}}>
        <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>
          Email: {errMsgs.email}
        </Text>
        <TextInputPaper
          placeholder="email"
          keyboardType="email-address"
          onChangeText={t => setEmail(t)}
        />
      </View>
      <View style={{width: '100%'}}>
        <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>
          Phone#: {errMsgs.phone}
        </Text>
        <TextInputPaper
          placeholder="Phone#"
          keyboardType="number-pad"
          onChangeText={t => setPhone(t)}
        />
      </View>
      <View style={{width: '100%'}}>
        <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>
          Date of Birth:
        </Text>
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
      <View style={{width: '100%'}}>
        <Text style={{fontWeight: 'bold', alignSelf: 'flex-start'}}>
          Gender:
        </Text>
        <Menu
          visible={isVisible}
          onDismiss={() => setIsVisible(false)}
          anchor={
            <View
              style={{
                alignItems: 'flex-start',
              }}>
              <Button
                style={{
                  backgroundColor: 'white',
                  borderWidth: 1,
                  borderRadius: 8,
                }}
                contentStyle={{flexDirection: 'row-reverse'}}
                labelStyle={{color: 'black'}}
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
          <Menu.Item onPress={() => setGender(true)} title="Male" />
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
    </InnerWrapper>
  );
};

const styles = ({colors, height}) => StyleSheet.create({});

const mapStateToProps = state => ({
  height: state.HeightReducer,
  user: state.userReducer,
});

export default connect(mapStateToProps, {})(withTheme(AddPerson));
