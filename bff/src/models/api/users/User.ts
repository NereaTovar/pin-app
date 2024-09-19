// export interface User extends MinimalUser {
//     firstName: string;
//     lastName?: string;
//     email: string;
//     isBirthday: boolean;
//   }
  
//   export interface MinimalUser {
//     id: number;
//     profilePictureUrl: string;
//   }
  

  // /models/User.ts
export interface User {
  id: number;
  firstName: string;
  lastName?: string;
  email: string;
  profilePictureUrl?: string;
  isBirthday?: boolean;
  position?: string;
  birthday?: string;
  asciiFirstName?: string;
  asciiLastName?: string;
  isTeamCaptain?: boolean;
}


