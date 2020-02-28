import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Group } from 'src/app/shared/model/group';
import { AuthService } from 'src/app/shared/services/auth.service';
import { GenericFbService } from 'src/app/shared/services/fb.service';
import { FbCollections } from '../../shared/collections';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html'
})
export class GroupComponent implements OnInit {
  group: Group;
  key = '';
  groups: Observable<any>;

  constructor(private fbService: GenericFbService, public authService: AuthService) { }

  ngOnInit() {
    this.getByUserEmail();
    this.fbService.current.subscribe(data => {
      this.group = new Group();
      this.group.userEmail = this.authService.userEmail();
      if (data.model && data.key) {
        this.group.description = data.model.description;
        this.group.userEmail = data.model.userEmail;
        this.key = data.key;
      }
    });
  }

  onSubmit() {
    if (this.key) {
      this.fbService.update(FbCollections.group, this.group, this.key);
    } else {
      this.fbService.insert(FbCollections.group, this.group);
    }
  }

  delete(key: string) {
    this.fbService.delete(FbCollections.group, key);
  }

  edit(group: Group, key: string) {
    this.fbService.update(FbCollections.group, group, key);
  }

  getByUserEmail() {
    this.groups = this.fbService.getByUserEmail(FbCollections.group, this.authService.userEmail());
  }

}
