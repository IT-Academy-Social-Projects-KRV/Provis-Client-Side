export class CreateTask {
    name: string;
    description: string;
    dateOfEnd: string;
    workspaceId: number;
    statusId: number;
    assignedUsers: IAssignedUser[];
}

export interface IAssignedUser{
    userId: string;
    roleTagId: number;
}
