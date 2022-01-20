export class TaskDetalInfo {
    name: string;
    description: string;
    deadline: Date;
    statusId: number;
    storyPoints?: number;
    assignedUsers: AssignedUsers[];
}

export class AssignedMember{
  userId: string;
  userName: string;
  roleTagId: number;
}
