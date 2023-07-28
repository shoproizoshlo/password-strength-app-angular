import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms'; // Import this line

import { AppComponent } from './app.component';
import { PasswordStrengthIndicatorComponent } from './password-strength-indicator/password-strength-indicator.component';

@NgModule({
  declarations: [AppComponent, PasswordStrengthIndicatorComponent],
  imports: [BrowserModule, FormsModule], // Add FormsModule here
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
