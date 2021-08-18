import React, {useState} from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import styles from './style';
import {
  InnerWrapper,
  FlatList,
  TextInputPaper,
  NumberTile,
} from '../../../components';

export const QueueList = ({queue}) => {
  const [filteredQueue, setFilteredQueue] = useState([]);

  const filterQueue = text => {
    if (text === '') {
      setFilteredQueue([]);
      return;
    }
    let SearchedItems = queue.filter(
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
          data={filteredQueue.length > 0 ? filteredQueue : queue}
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
});

export default connect(mapStateToProps, {})(QueueList);
