import { NgModule } from '@angular/core';
// Required services for navigation
import { Routes, RouterModule } from '@angular/router';

// Import all the components for which navigation service has to be activated
// Adming Pages
import { SignInComponent } from '../components/sign-in/sign-in.component';
import { SignUpComponent } from '../components/sign-up/sign-up.component';
import { ForgotPasswordComponent } from '../components/forgot-password/forgot-password.component';
import { AuthGuard } from '../shared/guard/auth.guard';
import { VerifyEmailComponent } from '../components/verify-email/verify-email.component';
import { SecureInnerPagesGuard } from './guard/secure-inner-pages.guard.ts.guard';
// Components Pages
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { TeamworkComponent } from '../components/teamwork/teamwork.component';
import { TaskComponent } from '../components/task/task.component';
import { PlanningComponent } from '../components/planning/planning.component';
import { PlanningDetailComponent } from '../components/planning-detail/planning-detail.component';
import { GroupComponent } from '../components/group/group.component';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: SignInComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'register-user', component: SignUpComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'forgot-password', component: ForgotPasswordComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'verify-email-address', component: VerifyEmailComponent, canActivate: [SecureInnerPagesGuard] },
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'teamwork', component: TeamworkComponent, canActivate: [AuthGuard] },
  { path: 'task', component: TaskComponent, canActivate: [AuthGuard] },
  { path: 'planning', component: PlanningComponent, canActivate: [AuthGuard] },
  { path: 'planningDetail/:id', component: PlanningDetailComponent, canActivate: [AuthGuard] },
  { path: 'group', component: GroupComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
