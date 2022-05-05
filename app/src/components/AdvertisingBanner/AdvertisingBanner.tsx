/* eslint-disable react-native/no-inline-styles */
import { useAdvertising } from 'providers/Advertisements';
import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import Carousel from 'react-native-looped-carousel';
import { useStyles } from './AdvertisingBannerStyles';

export const AdvertisingBanner = () => {
  const advertising = useAdvertising();
  const styles = useStyles();

  if (!advertising.visible || !advertising.advertisements.length) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Carousel style={styles.carousel} autoplay delay={3000}>
        {advertising.advertisements.map((advertisement) => (
          <TouchableOpacity
            key={advertisement._id}
            activeOpacity={0.8}
            style={{ flex: 1 }}
          >
            <Image style={styles.image} source={{ uri: advertisement.image }} />
          </TouchableOpacity>
        ))}
      </Carousel>
    </View>
  );
};
