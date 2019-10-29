import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const styles = StyleSheet.create({
  card: {
    width: 100,
    height: 142,
    backgroundColor: 'white',
    borderRadius: 12,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    textAlign: 'center',
  },
  corner: {
    width: 20,
    height: 40,
    flexDirection: 'column',
    position: 'absolute',
    backgroundColor: 'transparent',
  },
  leftTop: {
    top: 2,
    left: 2,
  },
  rightBottom: {
    bottom: 2,
    right: 2,
    transform: [{ rotateZ: '180deg' }],
  },
  number: {
    height: 20,
    textAlign: 'center',
  },
});

interface CardProps {
  name: string;
  number: number;
  upsideDown?: boolean;
}

interface CornerProps {
  number: number;
  position: 'leftTop' | 'rightBottom';
}

const Corner = ({ number, position }: CornerProps): JSX.Element => (
  <View style={[styles.corner, styles[position]]}>
    <Text style={styles.number}>{number}</Text>
  </View>
);

const Card = ({ name, number, upsideDown = false }: CardProps): JSX.Element => (
  <View style={[styles.card, upsideDown && { transform: [{ rotateZ: '180deg' }] }]}>
    <Corner number={number} position="leftTop" />
    <Text style={styles.text}>{name}</Text>
    <Corner number={number} position="rightBottom" />
  </View>
);

export default Card;
