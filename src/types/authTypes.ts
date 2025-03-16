export interface LoginData {
    email: string;
    hashed_password: string;
  }
  
  export interface UserProfile {
    id: number;
    username: string;
    role: string;
    pfp_link?: string;
  }