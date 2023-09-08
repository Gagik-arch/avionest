import React from 'react';
import {StyleSheet} from 'react-native';
import * as Icons from '../../assets/icons';

const Icon = ({
                  type = 'Clock',
                  size = 28,
                  ...props
              }) => {
    if (!type && !Icons.hasOwnProperty(type)) return null;

    const I = Icons[type];

    return <I width={size} height={size} {...props} />;
};

export default Icon;
