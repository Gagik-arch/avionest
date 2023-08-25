import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Text} from './index';

const TabButton = ({
  style = {},
  label,
  labelStyle = {},
  labelSize = 'normal12',
  ...props
}) => {
  return (
    <TouchableOpacity
      {...props}
      style={[
        {
          justifyContent: 'center',
          boxSizing: 'border-box',
        },
        style,
      ]}>
      {typeof label === 'string' ? (
        <Text style={labelStyle} size={labelSize}>
          {label}
        </Text>
      ) : (
        label
      )}
    </TouchableOpacity>
  );
};

export default TabButton;
