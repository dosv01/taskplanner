import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';
import { GenericFbService } from 'src/app/shared/services/fb.service';
import { FbCollections } from 'src/app/shared/collections';
import { Planning } from 'src/app/shared/model/planning';

@Component({
  selector: 'app-planning-detail',
  templateUrl: './planning-detail.component.html',
  styleUrls: ['./planning-detail.component.css']
})
export class PlanningDetailComponent implements OnInit {
  key: any;
  planning: any;

  constructor(
    private fbService: GenericFbService,
    private route: ActivatedRoute,
    public datePipe: DatePipe) { }

  ngOnInit() {
    this.planning = new Planning();
    this.route.params.subscribe(params => {
      this.key = params.id;
      this.fbService.getById(FbCollections.planning, params.id).subscribe(planning => {
        this.planning = planning;
      });
    });
  }

  isChangeStatus(event, i: any) {
    this.planning.tasks[i].status = event;
    this.fbService.update(FbCollections.planning, this.planning, this.key);
  }

  lineStatus(executionDate: Date, status: boolean) {
    const actualDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
    if (executionDate.toString() === actualDate) {
      return 'table-primary';
    } else if (executionDate.toString() < actualDate && !status) {
      return 'table-danger';
    }
  }

}
