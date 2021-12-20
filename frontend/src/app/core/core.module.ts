import { NgModule, Optional, SkipSelf } from '@angular/core';
import { NbEvaIconsModule } from '@nebular/eva-icons';
import {
  NbGlobalPhysicalPosition,
  NbMenuModule,
  NbThemeModule,
  NbToastrModule,
} from '@nebular/theme';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from '../../environments/environment';
import { SharedModule } from '../shared';
import { NavbarComponent } from './navbar';

@NgModule({
  declarations: [NavbarComponent],

  imports: [
    SharedModule,
    NbEvaIconsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbToastrModule.forRoot({ position: NbGlobalPhysicalPosition.BOTTOM_RIGHT }),
    NbMenuModule.forRoot(),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production,
    }),
    StoreModule.forRoot(
      {},
      {
        runtimeChecks: {
          strictStateImmutability: true,
          strictActionImmutability: true,
          strictStateSerializability: true,
          strictActionSerializability: true,
          strictActionWithinNgZone: true,
          strictActionTypeUniqueness: true,
        },
      }
    ),
  ],
  exports: [NavbarComponent],
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule?: CoreModule) {
    if (parentModule)
      throw new Error(
        `${CoreModule.name} is already loaded. Import it in AppModule only.`
      );
  }
}
