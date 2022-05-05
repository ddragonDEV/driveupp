/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-native/no-inline-styles */
import { images } from 'assets/images';
import { AdvertisingBanner } from 'components/AdvertisingBanner';
import { ImagePicker } from 'components/ImagePicker';
import { config } from 'config';
import { backend } from 'config/api/instance';
import { useAuth } from 'providers/Auth';
import React, { FC, useEffect, useState } from 'react';
import { ScrollView, View } from 'react-native';
import { Asset } from 'react-native-image-picker';
import { withLayout } from '../../hoc';
import { useMessages } from './HomeScreenMessages';
import { useStyles } from './HomeScreenStyles';
import { MenuItem } from './MenuItem';
import { uploadFile as _uploadFile } from 'config/api/cloudinary/requests/files';
import { useRequest } from 'hooks/useRequest';

const icons = {
  bicycleParking: images.bike,
  assistance: images.advertising,
  basicMechanics: images.tips,
  help: images.nut,
};

export const HomeScreen: FC = withLayout(() => {
  const auth = useAuth();
  const messages = useMessages();
  const styles = useStyles();

  const uploadFile = useRequest(_uploadFile);
  const [value, setValue] = useState<Asset>();

  useEffect(() => {
    if (value) {
      (async () => {
        console.log(await uploadFile({ data: value }));
      })();
    }
  }, [value]);

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        <ImagePicker value={value} setValue={setValue} />

        {/* <View style={{ flex: 1 }} /> */}

        {/* <AdvertisingBanner />

        <View style={styles.row}>
          <MenuItem
            icon={icons.assistance}
            label={messages.assistance}
            style={styles.menuItem}
          />
          <MenuItem
            icon={icons.bicycleParking}
            label={messages.bicycleParking}
            style={styles.menuItem}
          />
        </View>
        <View style={styles.row}>
          <MenuItem
            icon={icons.basicMechanics}
            label={messages.basicMechanics}
            style={styles.menuItem}
          />
          <MenuItem
            icon={icons.help}
            label={messages.help}
            style={styles.menuItem}
            onPress={auth.handleLogout}
          />
        </View>

        <View style={{ flex: 2 }} /> */}
      </View>
    </ScrollView>
  );
});
