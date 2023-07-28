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
          class="strength-bar bar-1"
          [ngStyle]="{ 'width.%': strengthPercentage1 }"
        ></div>
        <div
          class="strength-bar bar-2"
          [ngStyle]="{ 'width.%': strengthPercentage2 }"
        ></div>
        <div
          class="strength-bar bar-3"
          [ngStyle]="{ 'width.%': strengthPercentage3 }"
        ></div>
      </div>

      <div
        class="strength-label"
        [ngClass]="{
          red: password.length > 0 && password.length < 8,
          yellow: password.length >= 8 && strengthPercentage3 <= 66,
          green: strengthPercentage3 > 66
        }"
      >
        {{ strengthLabel }}
      </div>
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
        display: flex;
      }

      .strength-bar {
        height: 100%;
      }

      .bar-1 {
        background-color: red;
      }

      .bar-2 {
        background-color: yellow;
      }

      .bar-3 {
        background-color: #4caf50;
      }

      .strength-label {
        margin-top: 5px;
        font-size: 12px;
      }

      .red {
        color: red;
      }

      .yellow {
        color: yellow;
      }

      .green {
        color: #4caf50;
      }
    `,
  ],
})
export class PasswordStrengthIndicatorComponent {
  password: string = '';
  strengthPercentage1: number = 0;
  strengthPercentage2: number = 0;
  strengthPercentage3: number = 0;
  strengthLabel: string = '';

  checkPasswordStrength() {
    const progressStep = 100 / 3;
    if (this.password.length === 0) {
      this.strengthPercentage1 = 0;
      this.strengthPercentage2 = 0;
      this.strengthPercentage3 = 0;
      this.strengthLabel = '';
    } else {
      const hasLetters = this.password.match(/[a-zA-Z]/);
      const hasNumbers = this.password.match(/\d/);
      const hasSymbols = this.password.match(
        /[!@#$%^&*()_+{}\[\]:;<>,.?~\-=/\\]/
      );

      if (this.password.length < 8) {
        this.strengthPercentage1 = 100;
        this.strengthPercentage2 = 0;
        this.strengthPercentage3 = 0;
        this.strengthLabel = 'Weak';
      } else {
        if (hasLetters && hasNumbers && hasSymbols) {
          this.strengthPercentage1 = 0;
          this.strengthPercentage2 = 0;
          this.strengthPercentage3 = 100;
          this.strengthLabel = 'Strong';
        } else if (
          (hasLetters && hasNumbers) ||
          (hasLetters && hasSymbols) ||
          (hasNumbers && hasSymbols)
        ) {
          this.strengthPercentage1 = 0;
          this.strengthPercentage2 = 100;
          this.strengthPercentage3 = 0;
          this.strengthLabel = 'Medium';
        } else {
          this.strengthPercentage1 = 100;
          this.strengthPercentage2 = progressStep;
          this.strengthPercentage3 = 0;
          this.strengthLabel = 'Weak';
        }
      }
    }
  }
}
