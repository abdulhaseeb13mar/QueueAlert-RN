/* eslint-disable react-hooks/exhaustive-deps */
import React, {useState, useCallback} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from './style';
import {useFocusEffect} from '@react-navigation/native';
import constants from '../../../theme/constants';
import {
  InnerWrapper,
  FlatList,
  TextInputPaper,
  NumberTile,
} from '../../../components';
import {setCurrentScreen} from '../../../redux/actions';

const QueueList = props => {
  const [filteredQueue, setFilteredQueue] = useState([]);

  useFocusEffect(
    useCallback(() => {
      props.setCurrentScreen(constants.appScreens.QueueList);
    }, []),
  );

  const filterQueue = text => {
    if (text === '') {
      setFilteredQueue([]);
      return;
    }
    let SearchedItems = props.queue.filter(
      person =>
        person.name.toLowerCase().includes(text.toLowerCase()) ||
        person.number.toString().toLowerCase().includes(text.toLowerCase()),
    );
    setFilteredQueue(SearchedItems);
  };

  return (
    <InnerWrapper>
      <TextInputPaper
        placeholder="Search name or number"
        leftIcon="search"
        onChangeText={filterQueue}
        returnKeyType="search"
      />
      <View style={styles.flatlistContainer}>
        <FlatList
          data={filteredQueue.length > 0 ? filteredQueue : props.queue}
          renderItem={({item}) => <NumberTile number={item} />}
          horizontal={false}
        />
      </View>
    </InnerWrapper>
  );
};

const mapStateToProps = state => ({
  user: state.userReducer,
  queue: state.QueueReducer,
  height: state.HeightReducer,
  currentScreen: state.ScreenReducer,
});

export default connect(mapStateToProps, {setCurrentScreen})(QueueList);
