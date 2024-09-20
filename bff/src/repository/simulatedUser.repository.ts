import { UserRepository } from "./user.repository";
import {
  User,
  UserAttendee,
  LoggedInUser,
  WithInfo,
  WithLanguages,
} from "../models/business/User";

export class SimulatedUserRepository implements UserRepository {
  private users: User[] = [
    {
      id: "1",
      email: "nerea.tovar-intern@rindus.de",
      firstName: "Nerea",
      asciiFirstName: "Nerea",
      lastName: "T",
      asciiLastName: "T",
      position: "Developer",

      isBirthday: false,
      isTeamCaptain: false,
    },
    {
      id: "2",
      email: "sergio.boatella@rindus.de",
      firstName: "Sergio",
      asciiFirstName: "Sergio",
      lastName: "B",
      asciiLastName: "B",
      position: "Designer",

      isBirthday: false,
      isTeamCaptain: false,
    },
    {
      id: "3",
      email: "tiziana.bonanomi@rindus.de",
      firstName: "Tiziana",
      asciiFirstName: "Tiziana",
      lastName: "B",
      asciiLastName: "B",
      position: "Designer",

      isBirthday: false,
      isTeamCaptain: false,
    },
    {
      id: "4",
      email: "anastasiia.kovalenko@rindus.de",
      firstName: "Anastasiia",
      asciiFirstName: "Anastasiia",
      lastName: "K",
      asciiLastName: "K",
      position: "Designer",

      isBirthday: false,
      isTeamCaptain: false,
    },
    {
      id: "5",
      email: "agata.wesolowska@rindus.de",
      firstName: "Agata",
      asciiFirstName: "Agata",
      lastName: "W",
      asciiLastName: "W",
      position: "Designer",

      isBirthday: false,
      isTeamCaptain: false,
    },
  ];

  async findUserByEmail(email: string): Promise<UserAttendee | undefined> {
    const user = this.users.find((user) => user.email === email);
    if (!user) return undefined;

    // Retorna solo las propiedades definidas en UserAttendee
    return {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email
    };
  }

  async findUserById(id: string): Promise<LoggedInUser | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;

    // Retorna solo las propiedades definidas en LoggedInUser
    return {
      id: user.id,
    };
  }

  async findUserWithInfo(
    id: string
  ): Promise<(User & WithInfo & WithLanguages) | undefined> {
    const user = this.users.find((user) => user.id === id);
    if (!user) return undefined;

    // Simular la información adicional (WithInfo y WithLanguages)
    const simulatedWithInfo: WithInfo = {
      partner: { id: 1, name: "Partner Name" },
    };
    const simulatedWithLanguages: WithLanguages = {
      languages: [{ id: 1, name: "English" }],
    };

    // Combina la información del usuario con WithInfo y WithLanguages
    return {
      ...user,
      ...simulatedWithInfo,
      ...simulatedWithLanguages,
    };
  }

  async all(): Promise<User[]> {
    return this.users;
  }

  async allPositions(): Promise<string[]> {
    // Simula una lista de posiciones
    return ["Developer", "Manager", "Designer"];
  }

  async allByLanguage(languageId: number): Promise<User[]> {
    // Simula usuarios que hablan el lenguaje con el ID dado
    if (languageId === 1) {
      return this.users;
    }
    return [];
  }
}
