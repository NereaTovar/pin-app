
import {
  LoggedInUser,
  User,
  UserAttendee,
  WithInfo,
  WithLanguages,
} from "../models/business/User";

export interface UserRepository {
  all(): Promise<User[]>;
  findUserByEmail(email: string): Promise<UserAttendee | undefined>;
  findUserById(id: string): Promise<LoggedInUser | undefined>;
  findUserWithInfo(
    id: string
  ): Promise<(User & WithInfo & WithLanguages) | undefined>;
  allPositions(): Promise<string[]>;
 
}

