export class CreateTask {
    name: string;
    description: string;
    dateOfEnd: Date;
    workspaceId: number;
    statusId: number;
    storyPoints?: number;
    sprintId?: number
    assignedUsers: AssignedMember[];
}

export class AssignedMember{
    userId: string;
    roleTagId: number;
    rowVersion: Uint8Array;
}
