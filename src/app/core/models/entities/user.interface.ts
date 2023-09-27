import { UserRole } from 'src/app/core/enums';

export interface User {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password: string;
  user_type: UserRole;
}
