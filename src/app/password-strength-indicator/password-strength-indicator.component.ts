import { Component } from '@angular/core';

@Component({
  selector: 'app-password-strength-indicator',
  template: `
    <div class="password-strength-indicator">
      <input
        type="password"
        [(ngModel)]="password"
        (input)="checkPasswordStrength()"
        placeholder="Enter password"
      />

      <div class="strength-meter">
        <div
          class="strength-bar"
          [ngStyle]="{ 'width.%': strengthPercentage }"
        ></div>
      </div>

      <div class="strength-label">{{ strengthLabel }}</div>
    </div>
  `,
  styles: [
    `
      .password-strength-indicator {
        margin-top: 10px;
      }

      .strength-meter {
        height: 10px;
        background-color: #f1f1f1;
        border-radius: 5px;
        overflow: hidden;
      }

      .strength-bar {
        height: 100%;
        background-color: #4caf50;
      }

      .strength-label {
        margin-top: 5px;
        font-size: 12px;
      }
    `,
  ],
})
export class PasswordStrengthIndicatorComponent {
  password: string = '';
  strengthPercentage: number = 0;
  strengthLabel: string = '';

  checkPasswordStrength() {
    const hasLetters = this.password.match(/[a-zA-Z]/);
    const hasNumbers = this.password.match(/\d/);
    const hasSymbols = this.password.match(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\]/
    );

    if (hasLetters && hasNumbers && hasSymbols) {
      this.strengthPercentage = 100;
      this.strengthLabel = 'Strong';
    } else if (
      (hasLetters && hasNumbers) ||
      (hasLetters && hasSymbols) ||
      (hasNumbers && hasSymbols)
    ) {
      this.strengthPercentage = 66;
      this.strengthLabel = 'Medium';
    } else {
      this.strengthPercentage = 33;
      this.strengthLabel = 'Weak';
    }
  }
}
