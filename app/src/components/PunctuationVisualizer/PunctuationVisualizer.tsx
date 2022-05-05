import React from 'react';
import { FC } from 'react';
import { View } from 'react-native';
import { useStyles } from './PunctuationVisualizerStyles';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  value: number;
  starSize?: number;
}

export const PunctuationVisualizer: FC<Props> = ({ value, starSize = 30 }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((number) => (
        <Icon
          key={`${number}-star-punctuation-visualizer`}
          style={styles.star}
          name={
            value >= number - 0.25
              ? 'star'
              : value >= number - 0.75
              ? 'star-half-sharp'
              : 'star-outline'
          }
          size={starSize}
        />
      ))}
    </View>
  );
};
