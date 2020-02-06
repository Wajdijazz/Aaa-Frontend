import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';
import {InterventionService} from '../services/intervention.service';
import {TjService} from '../services/tj.service';

@Component({
  selector: 'app-details-work',
  templateUrl: './details-work.component.html',
  styleUrls: ['./details-work.component.scss']
})
export class DetailsWorkComponent implements OnInit {
  private worked: number;
  private tj: number=0;

  constructor(@Inject(MAT_DIALOG_DATA) public data, private interventionService: InterventionService,
              private tjService:TjService) { }

  ngOnInit() {
    this.getWorkedByPeronAndProject()
    this.getTjByPeronAndProject()
  }
  getTjByPeronAndProject() {
    this.tjService.getTijByProjectAnPerson(this.data.projectId, this.data.personId)
        .subscribe((data: number) => {
          this.tj = data ;
        })
  }


  getWorkedByPeronAndProject() {
    this.interventionService.getWorkedByPersonAndProject(this.data.projectId, this.data.personId)
        .subscribe((data: number) => {
          this.worked = data / 2;
        })
  }

}
