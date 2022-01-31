export class TaskInfo {
  id: number;
  name: string;
  deadline: Date;
  workerRoleId: number;
  commentCount: number;
  storyPoints?: number;
  memberCount: number;
  creatorUsername: string;
}
