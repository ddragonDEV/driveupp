import React from 'react';
import { Dispatch, FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useStyles } from './PunctuationInputStyles';
import Icon from 'react-native-vector-icons/Ionicons';

interface Props {
  value: number;
  setValue: Dispatch<React.SetStateAction<number>>;
}

export const PunctuationInput: FC<Props> = ({ value, setValue }) => {
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {[1, 2, 3, 4, 5].map((number) => (
        <TouchableOpacity
          key={`${number}-star-punctuation-input`}
          onPress={() => setValue(number)}
        >
          <Icon
            style={styles.star}
            name={value >= number ? 'star' : 'star-outline'}
            size={30}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};
