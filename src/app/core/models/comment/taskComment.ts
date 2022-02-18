import { CommentAttachment } from './commentAttachment';
export class TaskComment{
    id: number;
    commentText: string;
    dateTime: Date;
    taskId: number;
    userId: string;
    userName: string;
    attachments: CommentAttachment[] = [];
}
