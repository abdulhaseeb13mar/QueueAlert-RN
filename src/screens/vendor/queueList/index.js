import React from 'react';
import {connect} from 'react-redux';
import {View} from 'react-native';
import {InnerWrapper, FlatList} from '../../../components';
import {NumberTile} from '../../../components';
import styles from './style';

export const QueueList = ({queue}) => {
  return (
    <InnerWrapper>
      <View style={styles.flatlistContainer}>
        <FlatList
          data={queue}
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
