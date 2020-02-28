import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { GenericFbService } from 'src/app/shared/services/fb.service';
import { Task } from 'src/app/shared/model/task';
import { Teamwork } from 'src/app/shared/model/teamwork';
import { FbCollections } from 'src/app/shared/collections';
import { Group } from 'src/app/shared/model/group';
import { AuthService } from 'src/app/shared/services/auth.service';


@Component({
  selector: 'app-task',
  templateUrl: './task.component.html'
})
export class TaskComponent implements OnInit {
  task: Task;
  teamwork: Teamwork;
  group: Group;
  key = '';
  tasks: Observable<any>;
  groups: Observable<any>;
  teamworks: Observable<any>;

  constructor(private fbService: GenericFbService, public authService: AuthService) { }

  ngOnInit() {
    // revisar rsrssr
    this.task = new Task();
    this.task.teamwork = new Teamwork();
    this.task.group = new Group();

    this.getByUserEmail();
    this.getTeamWorksByEmail();
    this.getGroupsByEmail();

    this.task.userEmail = this.authService.userEmail();
    this.fbService.current.subscribe(data => {
      if (data.model && data.key) {
        this.task.description = data.model.description;
        this.task.userEmail = data.model.userEmail;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this.fbService.update(FbCollections.task, this.task, this.key);
    } else {
      this.fbService.insert(FbCollections.task, this.task);
    }
  }

  delete(key: string) {
    this.fbService.delete(FbCollections.task, key);
  }

  edit(task: Task, key: string) {
    this.fbService.update(FbCollections.task, task, key);
  }

  getByUserEmail() {
    this.tasks = this.fbService.getByUserEmail(FbCollections.task, this.authService.userEmail());
  }

  getTeamWorksByEmail() {
    this.teamworks = this.fbService.getByUserEmail(FbCollections.teamwork, this.authService.userEmail());
  }

  getGroupsByEmail() {
    this.groups = this.fbService.getByUserEmail(FbCollections.group, this.authService.userEmail());
  }

}
