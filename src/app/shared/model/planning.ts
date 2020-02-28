import { Task } from './task';
import { Group } from './group';

export class Planning {
    name = '';
    responsible = '';
    planningDate: string;
    tasks: Task[];
    status: boolean;
    userEmail: string;
    group: Group;
}
