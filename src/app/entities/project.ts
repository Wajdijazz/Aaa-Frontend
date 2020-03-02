import {Client} from './client';
import {Manager} from './manager';


export class Project {
    projectId: number;
    projectName: string;
    clientDto: Client;
    managerDto: Manager;
    isActive: boolean;

}
