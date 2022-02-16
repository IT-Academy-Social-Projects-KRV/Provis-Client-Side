export class AddTask {
  id: number;
  toUserId: string;
  fromUser: string;
  name: string;
  deadline: Date;
  workerRoleId: number;
  commentCount: number;
  storyPoints?: number;
  memberCount: number;
  creatorUsername: string;
  status: number;
  rowVersion: Uint8Array;
}
