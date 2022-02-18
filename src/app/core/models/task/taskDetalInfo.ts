export class TaskDetalInfo {
    id: number;
    name: string;
    description: string;
    deadline: Date;
    statusId: number;
    storyPoints?: number;
    assignedUsers: AssignedMember[];
    rowVersion: Uint8Array;
}

export class AssignedMember{
  userId: string;
  userName: string;
  roleTagId: number;
  rowVersion: Uint8Array;
}
