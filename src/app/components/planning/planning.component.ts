import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { Planning } from 'src/app/shared/model/planning';
import { GenericFbService } from 'src/app/shared/services/fb.service';
import { DatePipe } from '@angular/common';
import { Task } from 'src/app/shared/model/task';
import { FbCollections } from '../../shared/collections';
import { Group } from 'src/app/shared/model/group';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-planning',
  templateUrl: './planning.component.html'
})
export class PlanningComponent implements OnInit {
  planning: Planning;
  group: Group;
  key = '';
  plannings: Observable<any>;
  tasks: Observable<any>;
  groups: Observable<any>;

  constructor(
    private fbService: GenericFbService,
    private router: Router,
    public datePipe: DatePipe, public authService: AuthService) { }

  ngOnInit() {
    this.getPlanningsByUserEmail();
    this.getGroupsByEmail();

    // revisar² rsrssr
    this.planning = new Planning();
    this.planning.group = new Group();
    this.planning.tasks = [];
    this.group = new Group();

    this.fbService.current.subscribe(data => {
      if (data.model && data.key) {
        this.planning = new Planning();
        this.planning.name = data.model.teamwork;
        this.planning.responsible = data.model.responsible;
        this.planning.planningDate = data.model.planningDate;
        this.planning.tasks = data.model.tasks;
        this.planning.status = data.model.status;
        this.planning.userEmail = data.model.userEmail;
        this.key = data.key;
      }
    });
  }

  getById(key: string) {
    this.router.navigate(['planningDetail', key]);
  }

  onSubmit() {
    if (this.key) {
      this.fbService.update(FbCollections.planning, this.planning, this.key);
    } else {
      // refatorar -> trazer apenas itens selecionados pelo grupo e inserir todos (ao invés de trazer todos e filtrar aqui)
      // ex: getTasksByGroupAndEmail()
      this.getTasksByEmail();
      const originalTasks = [];
      this.tasks.subscribe(data => {
        data.forEach(dataTask => {
          if (dataTask.group.description === this.planning.group.description) {
            const originalTask = new Task();
            originalTask.description = dataTask.description;
            originalTask.days = dataTask.days;
            originalTask.teamwork = dataTask.teamwork;

            const dtExe = new Date(this.datePipe.transform(this.planning.planningDate, 'shortDate'));
            dtExe.setDate(dtExe.getDate() - parseInt(dataTask.days, 10));
            originalTask.executionDate = this.datePipe.transform(dtExe, 'yyyy-MM-dd');
            originalTask.status = false;
            originalTasks.push(originalTask);
          }
        });
        this.planning.tasks = originalTasks;
        this.planning.userEmail = this.authService.userEmail();
        this.fbService.insert(FbCollections.planning, this.planning);
        this.planning = new Planning();
        this.planning.group = new Group();
      });
    }
  }

  delete(key: string) {
    this.fbService.delete(FbCollections.planning, key);
  }

  getPlanningsByUserEmail() {
    this.plannings = this.fbService.getByUserEmail(FbCollections.planning, this.authService.userEmail());
  }

  getGroupsByEmail() {
    this.groups = this.fbService.getByUserEmail(FbCollections.group, this.authService.userEmail());
  }

  getTasksByEmail() {
    this.tasks = this.fbService.getByUserEmail(FbCollections.task, this.authService.userEmail());
  }

}
