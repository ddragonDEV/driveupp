import { Distance } from 'providers/Location/models/Distance';
import { Location } from 'providers/Location/models/Location';

export type UserLocation = Location & { distance: Distance };
