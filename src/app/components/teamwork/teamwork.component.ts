import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Teamwork } from 'src/app/shared/model/teamwork';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GenericFbService } from 'src/app/shared/services/fb.service';
import { FbCollections } from '../../shared/collections';

@Component({
  selector: 'app-teamwork',
  templateUrl: './teamwork.component.html'
})
export class TeamworkComponent implements OnInit {
  teamwork: Teamwork;
  key = '';
  teamworks: Observable<any>;

  constructor(private fbService: GenericFbService, public authService: AuthService) { }

  ngOnInit() {
    this.getByUserEmail();
    this.fbService.current.subscribe(data => {
      this.teamwork = new Teamwork();
      this.teamwork.userEmail = this.authService.userEmail();
      if (data.model && data.key) {
        this.teamwork.description = data.model.description;
        this.teamwork.userEmail = data.model.userEmail;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this.fbService.update(FbCollections.teamwork, this.teamwork, this.key);
    } else {
      this.fbService.insert(FbCollections.teamwork, this.teamwork);
    }
  }

  delete(key: string) {
    this.fbService.delete(FbCollections.teamwork, key);
  }

  edit(teamwork: Teamwork, key: string) {
    this.fbService.update(FbCollections.teamwork, teamwork, key);
  }

  getByUserEmail() {
    this.teamworks = this.fbService.getByUserEmail(FbCollections.teamwork, this.authService.userEmail());
  }

}
