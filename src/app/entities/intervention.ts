import {Project} from './project';
import {Person} from './person';

export class Intervention {
    interventionId: number;
    date: Date;
    mode: any;
    project: Project;
    person: Person;
}

