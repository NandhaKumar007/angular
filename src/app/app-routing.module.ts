import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthComponent } from './Modules/auth/auth.component';
import { SocialLoginComponent } from './Modules/auth/social-login/social-login.component';
import { HomeComponent } from './Modules/home/home.component';
import { MycardsComponent } from './Modules/mycards/mycards.component';
import { MycontactComponent } from './Modules/mycontact/mycontact.component';
import { CarddetailsEditComponent } from './Modules/carddetails-edit/carddetails-edit.component';
import { CreateCardComponent } from './Modules/create-card/create-card.component';
import { EmailLoginComponent } from './Modules/auth/email-login/email-login.component';
import { CreateAccountComponent } from './Modules/auth/create-account/create-account.component';
import { ExchangeComponent } from './Modules/exchange/exchange.component';
import { MyaccountComponent } from './Modules/myaccount/myaccount.component';
import { SendCardComponent } from './Modules/send-card/send-card.component';
import { ReceiveCardComponent } from './Modules/receive-card/receive-card.component';
import { SaveCardComponent } from './Modules/save-card/save-card.component';
import { PwdRecoveryComponent } from './modules/auth/pwd-recovery/pwd-recovery.component';
import { EmailVerifiyComponent } from './Modules/email-verifiy/email-verifiy.component';


const routes: Routes = [
  { path:'', component:SocialLoginComponent},
  { path:'login', component:SocialLoginComponent},
  { path:'home', component:HomeComponent},
  { path:'pwd-recovery/:token', component:PwdRecoveryComponent},
  { path:'mycards/:id', component:MycardsComponent},
  { path:'mycontact/:cardid/:userid', component:MycontactComponent},
  { path:'edit-carddetails/:id', component:CarddetailsEditComponent},
  { path:'create-card', component:CreateCardComponent},
  { path:'email-login', component:EmailLoginComponent},
  { path:'create-account', component:CreateAccountComponent},
  { path:'exchange/:id', component:ExchangeComponent},
  { path:'myaccount/:id', component:MyaccountComponent},
  { path:'send-card/:id/:name', component:SendCardComponent},
  { path:'receive-card/:id', component:ReceiveCardComponent},
  { path:'save-card', component:SaveCardComponent},
  { path:'email-verifiy/:token', component:EmailVerifiyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
