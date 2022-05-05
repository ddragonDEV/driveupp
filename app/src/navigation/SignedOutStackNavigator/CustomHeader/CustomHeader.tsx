import { NativeStackHeaderProps } from '@react-navigation/native-stack';
import { Text } from 'components/Text';
import React, { FC } from 'react';
import { TouchableOpacity, View } from 'react-native';
import { useMessages } from './CustomHeaderMessages';
import { useStyles } from './CustomHeaderStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';

export const CustomHeader: FC<NativeStackHeaderProps> = ({
  navigation,
  route,
}) => {
  const messages = useMessages();
  const styles = useStyles();

  return (
    <View style={styles.container}>
      {navigation.canGoBack() && (
        <TouchableOpacity style={styles.backButton} onPress={navigation.goBack}>
          <Icon name="arrow-back-ios" style={styles.backArrow} size={17} />
        </TouchableOpacity>
      )}
      <Text variant="title" color="text" style={styles.title}>
        {messages[route.name as keyof typeof messages]}
      </Text>
    </View>
  );
};
