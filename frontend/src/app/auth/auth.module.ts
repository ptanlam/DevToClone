import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { SharedModule } from '../shared';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthService } from './auth.service';
import { AuthEffects, authReducer } from './state';

@NgModule({
  declarations: [AuthRoutingModule.components],
  imports: [
    SharedModule,
    AuthRoutingModule,
    StoreModule.forFeature('auth', authReducer),
    EffectsModule.forFeature([AuthEffects]),
  ],
  providers: [AuthService],
})
export class AuthModule {}
