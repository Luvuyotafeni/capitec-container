import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-welcome', standalone: true, imports: [RouterLink],
  styles: [`
    .hero { min-height: 100vh; background: linear-gradient(155deg, var(--blue) 0%, var(--blue-dark) 100%); color: #fff; display: flex; flex-direction: column; }
    header { padding: 24px clamp(20px, 5vw, 64px); } .logo-wrap { background: #fff; display: inline-block; padding: 10px 18px; border-radius: 14px; }
    main { flex: 1; display: flex; flex-direction: column; justify-content: center; padding: 0 clamp(20px, 5vw, 64px) 64px; max-width: 760px; }
    h1 { font-size: clamp(2.6rem, 8vw, 4.8rem); font-weight: 800; letter-spacing: -1.5px; }
    h1 span { display: block; color: #fff; border-bottom: 6px solid var(--red); width: fit-content; padding-bottom: 6px; }
    p { font-size: 1.2rem; max-width: 34ch; margin: 24px 0 36px; opacity: .92; }
    .actions { display: flex; flex-wrap: wrap; gap: 14px; }
    footer { padding: 20px clamp(20px, 5vw, 64px); font-size: .85rem; opacity: .7; }
  `],
  template: `
    <div class="hero">
      <header><span class="logo-wrap"><img class="logo" src="assets/capitec-logo.svg" alt="Capitec"></span></header>
      <main>
        <h1>Welcome to <span>Capitec</span></h1>
        <p>Simple, affordable banking. Sign in to manage your money, or open an account in minutes.</p>
        <div class="actions">
          <a class="btn btn-primary" routerLink="/auth" [queryParams]="{ mode: 'signin' }">Sign in</a>
          <a class="btn btn-ghost" routerLink="/auth" [queryParams]="{ mode: 'register' }">Register</a>
        </div>
      </main>
      <footer>Capitec Bank is an authorised financial services provider.</footer>
    </div>`
})
export class WelcomeComponent {}
