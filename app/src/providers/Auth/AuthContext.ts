import { createContext } from 'react';
import { EditProfileData } from './models/EditProfileData';
import { LoginData } from './models/LoginData';
import { RecoveryPasswordData } from './models/RecoveryPasswordData';
import { ResetPasswordData } from './models/ResetPasswordData';
import { SignUpData } from './models/SignUpData';
import { Status } from './models/Status';
import { User } from './models/User';

export interface AuthContextProps {
  user?: User;
  status: Status;
  handleLogin: (params: LoginData) => Promise<void>;
  handleSignUp: (params: SignUpData) => Promise<boolean>;
  handleEditProfile: (params: EditProfileData) => Promise<boolean>;
  handleLogout: () => Promise<void>;
  handleRecoveryPassword: (params: RecoveryPasswordData) => Promise<boolean>;
  handleResetPassword: (params: ResetPasswordData) => Promise<boolean>;
}

export const AuthContext = createContext<AuthContextProps>(
  {} as AuthContextProps,
);
