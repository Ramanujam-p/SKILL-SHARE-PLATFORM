export interface SkillRequest {
  id: string;

  fromUserId: string;
  fromUserName: string;
  fromUserPhoto?: string;
  fromUserSkills?: string[];

  toUserId: string;
  status: "pending" | "accepted" | "rejected";
}
