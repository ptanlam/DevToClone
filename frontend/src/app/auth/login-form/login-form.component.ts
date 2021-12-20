import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fm-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginFormComponent {
  showPassword = false;

  @Input() logging!: boolean;
  @Input() form!: FormGroup;

  @Output() login = new EventEmitter();

  validateEmail() {
    return this.form.get('email')?.dirty && !this.form.get('email')?.valid;
  }

  validatePassword() {
    return (
      this.form.get('password')?.dirty && !this.form.get('password')?.valid
    );
  }
}
