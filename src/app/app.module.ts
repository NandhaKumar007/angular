import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { environment } from '../environments/environment';
import { SocialLoginModule, GoogleLoginProvider, FacebookLoginProvider, SocialAuthServiceConfig } from 'angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { MaxlengthDirective } from './directives/maxlength.directive';
import { NumberOnlyDirective } from './directives/number-only.directive';
import { ScrolltoelemDirective } from './directives/scrolltoelem.directive';
import { TagInputModule } from 'ngx-chips';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxVcardModule } from "ngx-vcard";
import { AgmCoreModule } from '@agm/core';

import { QRCodeModule } from 'angular2-qrcode';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './Modules/auth/auth.component';
import { SocialLoginComponent } from './Modules/auth/social-login/social-login.component';
import { HomeComponent } from './Modules/home/home.component';
import { MycardsComponent } from './Modules/mycards/mycards.component';
import { MycontactComponent } from './Modules/mycontact/mycontact.component';
import { CarddetailsEditComponent } from './Modules/carddetails-edit/carddetails-edit.component';
import { CreateCardComponent } from './Modules/create-card/create-card.component';
import { DeferThemeDirective } from './directives/defer-theme.directive';
import { EmailLoginComponent } from './Modules/auth/email-login/email-login.component';
import { CreateAccountComponent } from './Modules/auth/create-account/create-account.component';
import { ExchangeComponent } from './Modules/exchange/exchange.component';
import { MyaccountComponent } from './Modules/myaccount/myaccount.component';
import { SendCardComponent } from './Modules/send-card/send-card.component';
import { ReceiveCardComponent } from './Modules/receive-card/receive-card.component';
import { SaveCardComponent } from './Modules/save-card/save-card.component';
import { PwdRecoveryComponent } from './modules/auth/pwd-recovery/pwd-recovery.component';
import { LoadingSpinnerComponent } from './Modules/loading-spinner/loading-spinner.component';
import { ZXingScannerModule } from 'node_modules/@zxing/ngx-scanner';
import { EmailVerifiyComponent } from './Modules/email-verifiy/email-verifiy.component';
import { GridSearchPipe } from './pipes/grid-search.pipe';
import { ClipboardModule } from 'ngx-clipboard';



@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    SocialLoginComponent,
    HomeComponent,
    MycardsComponent,
    MycontactComponent,
    CarddetailsEditComponent,
    CreateCardComponent,
    DeferThemeDirective,
    EmailLoginComponent,
    CreateAccountComponent,
    ExchangeComponent,
    MyaccountComponent,
    SendCardComponent,
    ReceiveCardComponent,
    SaveCardComponent,
    PwdRecoveryComponent,
    MaxlengthDirective,
    NumberOnlyDirective,
    ScrolltoelemDirective,
    LoadingSpinnerComponent,
    EmailVerifiyComponent,GridSearchPipe,
  ],
  imports: [
    BrowserModule, TagInputModule, BrowserAnimationsModule, QRCodeModule,
    AppRoutingModule, SocialLoginModule, HttpClientModule, FormsModule, NgxVcardModule,
    ZXingScannerModule,ClipboardModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBSa8R_D0OUzwNKWOZ4i54bwn13hQlIlWY',
      libraries: ['places']
    })
  ],
  providers: [{ provide: 'SocialAuthServiceConfig', useValue: {
    autoLogin: false,
    providers: [
        {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("204499152080-ulbj5tbrto48ebeblbo79mm6p4p2iebi.apps.googleusercontent.com")
        }
    ]
} as SocialAuthServiceConfig }],
  bootstrap: [AppComponent]
})
export class AppModule { }
