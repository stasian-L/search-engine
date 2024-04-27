import { User } from "../../authorization/interfaces/user.interface";

export type Profile = User & { bio: string };

// export interface Profile {
//     username: string;
//     bio: string;
//     image: string;
// }
