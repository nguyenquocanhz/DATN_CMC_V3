import { Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isAuthenticated = signal<boolean>(false);
  
  constructor(private router: Router) {
    // Check for a logged-in state in session storage on startup
    const loggedIn = sessionStorage.getItem('isLoggedIn');
    if (loggedIn === 'true') {
        this.isAuthenticated.set(true);
    }
  }

  login(email: string, password: string):boolean {
    if (email === 'admin@gmail.com' && password === 'anhanh123') {
      this.isAuthenticated.set(true);
      sessionStorage.setItem('isLoggedIn', 'true');
      this.router.navigate(['/dashboard']);
      return true;
    }
    return false;
  }

  logout() {
    this.isAuthenticated.set(false);
    sessionStorage.removeItem('isLoggedIn');
    this.router.navigate(['/login']);
  }
}
