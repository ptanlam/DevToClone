import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'fm-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RegistrationFormComponent implements OnInit {
  @Input() registering!: boolean;
  @Input() form!: FormGroup;

  @Output() submit = new EventEmitter();

  constructor() {}

  ngOnInit(): void {}

  validateEmail() {
    return this.form.get('email')?.dirty && !this.form.get('email')?.valid;
  }

  validateUsername() {
    return (
      this.form.get('username')?.dirty && !this.form.get('username')?.valid
    );
  }

  validatePassword() {
    return (
      this.form.get('password')?.dirty && !this.form.get('password')?.valid
    );
  }

  validateConfirmationPassword() {
    return (
      this.form.get('confirmationPassword')?.dirty &&
      !this.form.get('confirmationPassword')?.valid
    );
  }
}
