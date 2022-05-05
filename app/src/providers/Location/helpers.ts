import { Distance } from './models/Distance';
import { Location } from './models/Location';

export const getDistance = (
  first: Location,
  second: Location,
  messages?: { kilometers: string; meters: string },
): Distance => {
  const p = 0.017453292519943295;
  const c = Math.cos;
  const a =
    0.5 -
    c((second.latitude - first.latitude) * p) / 2 +
    (c(first.latitude * p) *
      c(second.latitude * p) *
      (1 - c((second.longitude - first.longitude) * p))) /
      2;

  const kilometers = 12742 * Math.asin(Math.sqrt(a));

  if (kilometers > 1) {
    return {
      value: Math.round(kilometers * 10) / 10,
      unit: messages ? messages.kilometers : 'kilometers',
    };
  }

  const meters = kilometers * 1000;

  return {
    value: Math.round(meters),
    unit: messages ? messages.meters : 'meters',
  };
};
