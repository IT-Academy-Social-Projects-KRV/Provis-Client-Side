export class TaskDetalInfo {
  name: string;
  description: string;
  deadline: Date;
  statusId: number;
  assignedUsers: AssignedUsers[];
}

export class AssignedUsers{
  userId: string;
  userName: string;
  roleTagId: number;
}