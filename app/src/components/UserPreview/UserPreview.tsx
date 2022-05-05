import { PunctuationVisualizer } from 'components/PunctuationVisualizer';
import { Text } from 'components/Text';
import React, { FC } from 'react';
import { Image, View } from 'react-native';
import { useStyles } from './UserPreviewStyles';

interface Props {
  name: string;
  photoUrl: string;
  rating: number;
}

export const UserPreview: FC<Props> = ({ name, photoUrl, rating }) => {
  const styles = useStyles();

  console.log(photoUrl);

  return (
    <View style={styles.container}>
      <Image source={{ uri: photoUrl }} style={styles.photo} />
      <View style={styles.infoContainer}>
        <Text variant="subtitle" color="primary">
          {name}
        </Text>
        <PunctuationVisualizer value={rating} starSize={15} />
      </View>
    </View>
  );
};
