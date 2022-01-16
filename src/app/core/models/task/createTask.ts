export class CreateTask {
    name: string;
    description: string;
    dateOfEnd: Date;
    workspaceId: number;
    statusId: number;
    assignedUsers: AssignedMember[];
}

export class AssignedMember{
    userId: string;
    roleTagId: number;
}
