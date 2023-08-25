import React from 'react';
import {Modal, StyleSheet, View} from 'react-native';
import Lottie from 'lottie-react-native';

const Loader = ({visible = true}) => {
  return (
    <Modal animationType="fade" transparent={true} visible={visible}>
      <View style={s.container}>
        <Lottie source={require('./data.json')} autoPlay loop />
      </View>
    </Modal>
  );
};
export default Loader;

const s = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.7)',
  },
});
