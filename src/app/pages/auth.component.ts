import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators, AbstractControl } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-auth', standalone: true, imports: [ReactiveFormsModule, RouterLink],
  styles: [`
    .tabs { display: grid; grid-template-columns: 1fr 1fr; background: var(--blue-light); border-radius: 999px; padding: 4px; margin-bottom: 24px; }
    .tabs button { height: 44px; border: 0; border-radius: 999px; background: transparent; font: inherit; font-weight: 700; color: var(--blue); cursor: pointer; }
    .tabs button.on { background: var(--blue); color: #fff; }
    h2 { font-size: 1.6rem; margin-bottom: 4px; } .sub { color: var(--muted); margin: 0 0 22px; }
    .row { display: flex; justify-content: flex-end; margin: -6px 0 20px; }
    .back { font-size: .9rem; }
  `],
  template: `
    <div class="shell">
      <a routerLink="/" aria-label="Capitec home"><img class="logo" src="assets/capitec-logo.svg" alt="Capitec"></a>
      <section class="card">
        <div class="tabs" role="tablist">
          <button type="button" role="tab" [class.on]="mode() === 'signin'" [attr.aria-selected]="mode() === 'signin'" (click)="mode.set('signin')">Sign in</button>
          <button type="button" role="tab" [class.on]="mode() === 'register'" [attr.aria-selected]="mode() === 'register'" (click)="mode.set('register')">Register</button>
        </div>

        @if (done()) { <div class="notice" role="status">{{ done() }}</div> }

        @if (mode() === 'signin') {
          <h2>Welcome back</h2><p class="sub">Sign in to your Capitec account.</p>
          <form [formGroup]="signIn" (ngSubmit)="submit(signIn, 'Signed in. (Connect this form to your API.)')" novalidate>
            <div class="field">
              <label for="si-user">ID number or username</label>
              <input id="si-user" formControlName="user" autocomplete="username" [class.bad]="bad(signIn.controls.user)">
              @if (bad(signIn.controls.user)) { <span class="error">Enter your ID number or username.</span> }
            </div>
            <div class="field">
              <label for="si-pw">Password</label>
              <div class="pw">
                <input id="si-pw" [type]="show() ? 'text' : 'password'" formControlName="password" autocomplete="current-password" [class.bad]="bad(signIn.controls.password)">
                <button type="button" (click)="show.set(!show())">{{ show() ? 'Hide' : 'Show' }}</button>
              </div>
              @if (bad(signIn.controls.password)) { <span class="error">Enter your password.</span> }
            </div>
            <div class="row"><a routerLink="/forgot-password">Forgot password?</a></div>
            <button class="btn btn-primary btn-block" type="submit">Sign in</button>
          </form>
          <p class="small">New to Capitec? <a href="javascript:void(0)" (click)="mode.set('register')">Register</a></p>
        } @else {
          <h2>Open an account</h2><p class="sub">It takes a few minutes. You'll need your ID.</p>
          <form [formGroup]="reg" (ngSubmit)="submit(reg, 'Registration received. (Connect this form to your API.)')" novalidate>
            <div class="field">
              <label for="r-name">Full name</label>
              <input id="r-name" formControlName="name" autocomplete="name" [class.bad]="bad(reg.controls.name)">
              @if (bad(reg.controls.name)) { <span class="error">Enter your full name.</span> }
            </div>
            <div class="field">
              <label for="r-id">South African ID number</label>
              <input id="r-id" formControlName="id" inputmode="numeric" maxlength="13" [class.bad]="bad(reg.controls.id)">
              @if (bad(reg.controls.id)) { <span class="error">Your ID number must be 13 digits.</span> } @else { <span class="hint">13 digits, no spaces.</span> }
            </div>
            <div class="field">
              <label for="r-cell">Cellphone number</label>
              <input id="r-cell" formControlName="cell" inputmode="tel" autocomplete="tel" [class.bad]="bad(reg.controls.cell)">
              @if (bad(reg.controls.cell)) { <span class="error">Enter a 10-digit number, like 0821234567.</span> }
            </div>
            <div class="field">
              <label for="r-email">Email address</label>
              <input id="r-email" type="email" formControlName="email" autocomplete="email" [class.bad]="bad(reg.controls.email)">
              @if (bad(reg.controls.email)) { <span class="error">Enter a valid email address.</span> }
            </div>
            <div class="field">
              <label for="r-pw">Create password</label>
              <div class="pw">
                <input id="r-pw" [type]="show() ? 'text' : 'password'" formControlName="password" autocomplete="new-password" [class.bad]="bad(reg.controls.password)">
                <button type="button" (click)="show.set(!show())">{{ show() ? 'Hide' : 'Show' }}</button>
              </div>
              @if (bad(reg.controls.password)) { <span class="error">Use at least 8 characters.</span> } @else { <span class="hint">At least 8 characters.</span> }
            </div>
            <button class="btn btn-primary btn-block" type="submit">Create account</button>
          </form>
          <p class="small">Already banking with us? <a href="javascript:void(0)" (click)="mode.set('signin')">Sign in</a></p>
        }
      </section>
      <a class="back" routerLink="/">Back to welcome</a>
    </div>`
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  mode = signal<'signin' | 'register'>(inject(ActivatedRoute).snapshot.queryParamMap.get('mode') === 'register' ? 'register' : 'signin');
  show = signal(false);
  done = signal('');

  signIn = this.fb.nonNullable.group({ user: ['', Validators.required], password: ['', Validators.required] });
  reg = this.fb.nonNullable.group({
    name: ['', Validators.required],
    id: ['', [Validators.required, Validators.pattern(/^\d{13}$/)]],
    cell: ['', [Validators.required, Validators.pattern(/^0\d{9}$/)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(8)]]
  });

  bad(c: AbstractControl) { return c.invalid && (c.touched || c.dirty); }
  submit(f: { invalid: boolean; markAllAsTouched(): void; reset(): void }, msg: string) {
    this.done.set('');
    if (f.invalid) { f.markAllAsTouched(); return; }
    this.done.set(msg); f.reset();
  }
}
