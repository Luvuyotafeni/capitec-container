import { Component, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-forgot', standalone: true, imports: [ReactiveFormsModule, RouterLink],
  styles: [`h2 { font-size: 1.6rem; margin-bottom: 4px; } .sub { color: var(--muted); margin: 0 0 22px; }`],
  template: `
    <div class="shell">
      <a routerLink="/" aria-label="Capitec home"><img class="logo" src="assets/capitec-logo.svg" alt="Capitec"></a>
      <section class="card">
        <h2>Forgot your password?</h2>
        <p class="sub">Enter your cellphone number or email. We'll send you a link to reset it.</p>
        @if (sent()) {
          <div class="notice" role="status">Check your messages. If an account matches, a reset link is on its way.</div>
        }
        <form [formGroup]="form" (ngSubmit)="send()" novalidate>
          <div class="field">
            <label for="f-c">Cellphone number or email</label>
            <input id="f-c" formControlName="contact" autocomplete="username" [class.bad]="form.controls.contact.invalid && form.controls.contact.touched">
            @if (form.controls.contact.invalid && form.controls.contact.touched) { <span class="error">Enter a valid cellphone number or email address.</span> }
          </div>
          <button class="btn btn-primary btn-block" type="submit">Send reset link</button>
        </form>
        <p class="small"><a routerLink="/auth">Back to sign in</a></p>
      </section>
    </div>`
})
export class ForgotComponent {
  sent = signal(false);
  form = inject(FormBuilder).nonNullable.group({
    contact: ['', [Validators.required, Validators.pattern(/^(0\d{9}|[^\s@]+@[^\s@]+\.[^\s@]+)$/)]]
  });
  send() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    this.sent.set(true); // TODO: call your API here
  }
}
