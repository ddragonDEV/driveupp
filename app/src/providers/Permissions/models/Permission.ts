import { PermissionStatus } from 'react-native-permissions';

export interface Permission {
  status: PermissionStatus;
  check: () => Promise<PermissionStatus>;
  request: () => Promise<PermissionStatus>;
}
