import {useEffect, useState, useRef} from 'react';
import {StyleSheet, Animated, View, Easing} from 'react-native';
import {Colors} from '../resources';
import {Text} from './index';

const Stepper = ({step = 0, count = 5}) => {
  const width = useState(new Animated.Value(0))[0];

  useEffect(() => {
    Animated.timing(width, {
      toValue: (100 / count) * step,
      duration: 160,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start();
  }, [step]);

  return (
    <View style={{marginBottom: 80}}>
      <Text size={'normal16'}>
        Step {step} of {count}
      </Text>
      <View style={s.container}>
        <Animated.View
          style={[
            s.progress,
            {
              width: width.interpolate({
                inputRange: [0, 1],
                outputRange: ['0%', '1%'],
              }),
            },
          ]}
        />
      </View>
    </View>
  );
};

const s = StyleSheet.create({
  container: {
    height: 2,
    width: '100%',
    backgroundColor: '#D1D1D6',
    marginTop: 10,
  },
  progress: {
    backgroundColor: '#484848',
    // width: '100%',
    height: 2,
  },
});

export default Stepper;
