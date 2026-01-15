import { Timestamp } from "firebase/firestore";

export type SkillLevel = 'beginner'|'intermediate'|'advacned'|'Expert'

export interface UserProfile{
    uid : string;
    email : string | null;
    displayName : string | null;
    photoURl : string | null;
    skillLevel : SkillLevel;
    interests: string[];
    createdAt : string;
    lastUpdated : string;
}
export interface skillRequests{
  id: string;

  fromUserId: string;
  fromUserName: string;
  fromUserPhoto?: string;
  fromUserSkills?: string[];

  toUserId: string;
  status: "pending" | "accepted" | "rejected";
}

export interface chats {
  id: string
  participants: string[]   // [userA, userB]
  lastMessage: string
  updatedAt: Timestamp
}

export interface messages {
  senderId: string
  text: string
  createdAt: Timestamp
}


export interface notifications
{
  userId: string,          // receiver
  type: "connection",
  title: string,
  message: string,
  requestId: string,      // reference to skillRequest
  fromUserId: string,
  read: boolean,
  createdAt: Timestamp
}


export interface User{
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
  emailVerified: boolean;
  isAnonymous: boolean;
  createdAt?: string;
  lastSignIn?: string;
  skillLevel?:SkillLevel;
  isNewUser: boolean;
  interests?: string[];
  onboardingCompleted?: boolean;
  college?: string;
  course?: string;
  studentId?: string;
  verified?: boolean;
}

export interface AuthState{
    user : User|null;
    loading : boolean;
    error : string | null;
}

export interface AuthError{
    code : string;
    message : string;
    timestamp : number;
}

export interface SignInResult{
    success : boolean;
    user : User | null;
    error : AuthError | null;
}
