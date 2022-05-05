import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { FloatingActionIconButton } from 'components/FloatingActionIconButton';
import { PunctuationVisualizer } from 'components/PunctuationVisualizer';
import { Text } from 'components/Text';
import { withLayout } from 'hoc';
import { ProfileStackNavigatorParams } from 'navigation/ProfileStackNavigator';
import { useAuth } from 'providers/Auth';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useMessages } from './ProfileScreenMessages';
import { useStyles } from './ProfileScreenStyles';

interface Props
  extends NativeStackScreenProps<ProfileStackNavigatorParams, 'info'> {}

export const ProfileScreen = withLayout<Props>(({ navigation }) => {
  const styles = useStyles();
  const messages = useMessages();
  const auth = useAuth();

  if (!auth.user) {
    return null;
  }

  return (
    <>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.imageContainer}>
            {auth.user.photo ? (
              <Image source={{ uri: auth.user.photo }} style={styles.image} />
            ) : (
              <Icon style={styles.noImageIcon} name="person" size={70} />
            )}
          </View>

          <View style={styles.punctuationContainer}>
            <PunctuationVisualizer value={auth.user.scoreAverage} />
          </View>

          {Object.keys(auth.user).map(
            (key) =>
              key in messages && (
                <View key={`${key}-profile-screen`} style={styles.field}>
                  <Text variant="subtitle" style={styles.label}>
                    {messages[key as keyof typeof messages]}
                  </Text>
                  <Text variant="body">
                    {auth.user![key as keyof typeof auth.user]}
                  </Text>
                </View>
              ),
          )}
        </View>
      </ScrollView>
      <FloatingActionIconButton
        iconName="logout"
        position="bl"
        color="danger"
        onPress={auth.handleLogout}
      />
      <FloatingActionIconButton
        iconName="edit"
        position="br"
        onPress={() => navigation.navigate('edit')}
      />
    </>
  );
});
