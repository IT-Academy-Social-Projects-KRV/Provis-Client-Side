export class TaskChangeInfo {
    id: number;
    workspaceId: number;
    name: string;
    description: string;
    deadline: Date;
    storyPoints?: number;
}
