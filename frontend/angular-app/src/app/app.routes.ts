import { Routes } from '@angular/router';
import { HomepageComponent } from './homepage/homepage.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { LogoutComponent } from './logout/logout.component';
import { ConnectPageComponent } from './connect-page/connect-page.component';
import { IdeaDetailsComponent } from './idea-details/idea-details.component';
import { authGuard } from './_guards/auth/auth.guard';

export const routes: Routes = [
    {
        path: "home",
        component: HomepageComponent,
        title: "HiveMind",
        canActivate: [authGuard]
    },{
        path: "login",
        component: LoginComponent,
        title: "Login | HiveMind"
    },{
        path: "signup",
        component: SignupComponent,
        title: "Signup | HiveMind"
    },{
        path: "logout",
        component: LogoutComponent,
        title: "Logout | HiveMind"
    },{
        path: "connect",
        component: ConnectPageComponent,
        title: "Connect | HiveMind",
        canActivate: [authGuard]
    },{
        path: "ideas/:id",
        component: IdeaDetailsComponent,
        title: "Idea | HiveMind",
        canActivate: [authGuard]
    },{
        path: "",
        redirectTo: "/home",
        pathMatch: 'full'
      },
];
