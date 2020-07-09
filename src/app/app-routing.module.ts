import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountsComponent } from './accounts/accounts.component';
import { CreateAccountComponent } from './create-account/create-account.component';
import { ContactsComponent } from './contacts/contacts.component';
import { CreateContactComponent } from './create-contact/create-contact.component';
import { ActivitiesComponent } from './activities/activities.component';
import { CreateActivityComponent } from './create-activity/create-activity.component';


const routes: Routes = [
  // { path: '', redirectTo: 'home', pathMatch: 'full'}
  { path: 'accounts', component: AccountsComponent },
  { path: 'create-account', component: CreateAccountComponent },
  { path: 'contacts', component: ContactsComponent },
  { path: 'create-contact', component: CreateContactComponent },
  { path: 'activities', component: ActivitiesComponent },
  { path: 'create-activity', component: CreateActivityComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
