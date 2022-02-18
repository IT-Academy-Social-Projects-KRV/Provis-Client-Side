import { SafeUrl } from "@angular/platform-browser";

export class CommentAttachment {
  id: number;
  name: string;
  contentType: string;
  preview: SafeUrl | string;
}
