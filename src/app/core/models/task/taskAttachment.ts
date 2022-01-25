import { SafeUrl } from "@angular/platform-browser";

export class TaskAttachment {
    id: number;
    name: string;
    contentType: string;
    preview: SafeUrl | string;
}
