export class CreateTask {
    name: string;
    description: string;
    dateOfEnd: string;
    workspaceId: number;
    statusId: number;
    assignedUsers: AssignedUser[];
}

interface AssignedUser{
    userId: string;
    roleTagId: number;
}
