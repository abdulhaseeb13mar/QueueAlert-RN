/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View, FlatList} from 'react-native';

const CustomFlatlist = ({
  data,
  renderItem,
  style,
  containerStyle,
  horizontal = false,
  ListFooterComponent,
  ListHeaderComponent,
  numColumns = 1,
  ...rest
}) => {
  return (
    <View style={{flex: 1}}>
      <FlatList
        numColumns={numColumns}
        ListFooterComponent={ListFooterComponent && ListFooterComponent}
        ListHeaderComponent={ListHeaderComponent && ListHeaderComponent}
        bounces={false}
        data={data}
        horizontal={horizontal}
        style={[{flex: 1}, containerStyle]}
        contentContainerStyle={{
          paddingVertical: horizontal ? '2%' : 0,
          ...style,
        }}
        keyExtractor={() => Math.random().toString()}
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        {...rest}
      />
    </View>
  );
};

export default CustomFlatlist;
