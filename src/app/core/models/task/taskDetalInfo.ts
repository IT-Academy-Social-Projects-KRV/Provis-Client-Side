export class TaskDetalInfo {
  name: string;
  description: string;
  deadline: Date;
  statusId: number;
  assignedUsers: AssignedMember[];
}

export class AssignedMember{
  userId: string;
  userName: string;
  roleTagId: number;
}
