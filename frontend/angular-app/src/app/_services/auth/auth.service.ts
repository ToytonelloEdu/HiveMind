import { Injectable, WritableSignal, computed, effect, signal } from '@angular/core';
import { jwtDecode } from "jwt-decode";
import { AuthState } from './auth-state.type';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  

  authState: WritableSignal<AuthState> = signal<AuthState>({
    user: this.getUser(),
    token: this.getToken(),
    isAuthenticated: this.verifyToken(this.getToken())
  });

  user = computed(() => this.authState().user);
  token = computed(() => this.authState().token);
  isAuthenticated = computed(() => this.authState().isAuthenticated);

  constructor() {
    effect( () => {
      const token = this.authState().token;
      const user = this.authState().user;
      if(token !== null){
        localStorage.setItem("token", token);
      } else {
        localStorage.removeItem("token");
      }

      if(user !== null) {
        localStorage.setItem("user", user);
      } else {
        localStorage.removeItem("user");
      }
    })
  }

  updateToken(token: string): void {
    const decodedToken: any = jwtDecode(token);
    const user = decodedToken.user;
    this.authState.set({
      user: user,
      token: token,
      isAuthenticated: this.verifyToken(token)
    })
  }
  
  getUser(): string | null {
    return localStorage.getItem("user");
  }


  getToken(): string | null {
    return localStorage.getItem("token");
  }
  
  verifyToken(token: string | null): boolean {
    if(token !== null){
      try {
          const decodedToken = jwtDecode(token);
          const exp = decodedToken.exp;
          if(exp === undefined || Date.now() >= exp*1000) {
              return false;
          } else {
              return true;
          }
      } catch (error) {
          return false;
      }  
    }
    return false;
  }

  isUserAuthenticated(): boolean {
    return this.verifyToken(this.getToken());
  }

  logout(){
    this.authState.set({
      user: null,
      token: null,
      isAuthenticated: false
    });
  }
  
}
