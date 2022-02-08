export class TaskDetalInfo {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    statusId: number;
    storyPoints?: number;
    assignedUsers: AssignedMember[];
}

export class AssignedMember{
  userId: string;
  userName: string;
  roleTagId: number;
  rowVersion: Uint8Array;
}
