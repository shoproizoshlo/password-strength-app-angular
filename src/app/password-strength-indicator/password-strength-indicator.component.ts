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
    const lengthScore = this.password.length / 10;
    const uppercaseScore = this.password.match(/[A-Z]/) ? 0.3 : 0;
    const lowercaseScore = this.password.match(/[a-z]/) ? 0.3 : 0;
    const numberScore = this.password.match(/\d/) ? 0.2 : 0;
    const specialCharScore = this.password.match(
      /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\]/
    )
      ? 0.2
      : 0;

    this.strengthPercentage =
      (lengthScore +
        uppercaseScore +
        lowercaseScore +
        numberScore +
        specialCharScore) *
      100;

    if (this.strengthPercentage <= 25) {
      this.strengthLabel = 'Weak';
    } else if (this.strengthPercentage <= 50) {
      this.strengthLabel = 'Moderate';
    } else if (this.strengthPercentage <= 75) {
      this.strengthLabel = 'Strong';
    } else {
      this.strengthLabel = 'Very Strong';
    }
  }
}
