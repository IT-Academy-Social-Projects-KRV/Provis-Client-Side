import { TaskInfo } from './taskInfo';

export class Tasks {
  [id:number]: TaskInfo[];
}

export class usersTasks {
  [id:string]: Tasks;
}
