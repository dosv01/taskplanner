import { Teamwork } from './teamwork';
import { Group } from './group';

export class Task {
    description: string;
    group: Group;
    teamwork: Teamwork;
    days: number;
    executionDate?: string;
    status?: boolean;
    userEmail: string;
}
