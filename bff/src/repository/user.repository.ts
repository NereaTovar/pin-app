
import {
  LoggedInUser,
  User,
  UserAttendee,
  WithInfo,
  WithLanguages,
} from "../models/business/User";

export interface UserRepository {
  all(): Promise<User[]>;
  // page(page: number, pageSize: number): Promise<Page<User>>;
  findUserByEmail(email: string): Promise<UserAttendee | undefined>;
  findUserById(id: string): Promise<LoggedInUser | undefined>;
  findUserWithInfo(
    id: string
  ): Promise<(User & WithInfo & WithLanguages) | undefined>;
  allPositions(): Promise<string[]>;
 
}

