import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { FbCollections } from '../collections';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class GenericFbService {

  private dataSource = new BehaviorSubject({ model: null, key: '' });
  current = this.dataSource.asObservable();

  constructor(private db: AngularFireDatabase, public authService: AuthService) { }

  insert(collection: string, model: any) {
    this.db.list(collection).push(model)
      .then((result: any) => {
        // console.log(result.key);
        // console.log(result);
      });
  }

  update(collection: string, model: any, key: string) {
    this.db.list(collection).update(key, model)
      .catch((error: any) => {
        console.error(error);
      });
    return this.getByUserEmail(collection, this.authService.userEmail());
  }

  getAll(collection: string) {
    return this.db.list(collection)
      .snapshotChanges()
      .pipe(
        map(changes => {
          // tslint:disable-next-line:ban-types
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Object }));
        })
      );
  }

  getByUserEmail(collection: string, userEmail: string) {
    return this.db.list(collection,
      ref => ref.orderByChild('userEmail').equalTo(userEmail))
      .snapshotChanges()
      .pipe(
        map(changes => {
          // tslint:disable-next-line:ban-types
          return changes.map(c => ({ key: c.payload.key, ...c.payload.val() as Object }));
        })
      );
  }

  getById(collection: string, key: string) {
    return this.db.object(`${collection}/${key}`)
      .snapshotChanges()
      .pipe(
        map(changes => changes.payload.val())
      );
  }

  delete(collection: string, key: string) {
    this.db.object(`${collection}/${key}`).remove();
  }

}
