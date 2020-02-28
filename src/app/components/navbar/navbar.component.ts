import { Component, OnInit, NgZone } from '@angular/core';
import { faSearch, faBell, faUser, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html'
})
export class NavbarComponent implements OnInit {
  faSearch = faSearch;
  faBell = faBell;
  faUser = faUser;
  faSignOutAlt = faSignOutAlt;

  constructor(public authService: AuthService,
              public router: Router,
              public ngZone: NgZone) {

  }

  ngOnInit(): void {
  }

}
