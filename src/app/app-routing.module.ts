import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddediteventComponent } from './addeditevent/addeditevent.component';
import { ChatsComponent } from './chats/chats.component';
import { EventsComponent } from './events/events.component';
import { LoginComponent } from './login/login.component';
import { NeweditpostComponent } from './neweditpost/neweditpost.component';
import { PostsComponent } from './posts/posts.component';
import { RegisterComponent } from './register/register.component';
import { VolunteersComponent } from './volunteers/volunteers.component';
import { NewVolunteerComponent } from './volunteers/new-volunteer/new-volunteer.component';
import { NewGroupComponent } from './volunteers/new-group/new-group.component';
import { EventdetailsComponent } from './events/eventdetails/eventdetails.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

const routes: Routes = [
  { path: '', component: PostsComponent },
  { path: 'posts', component: PostsComponent },
  { path: 'events', component: EventsComponent },
  { path: 'chats', component: ChatsComponent },
  { path: 'neweditpost', component: NeweditpostComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: RegisterComponent },
  { path: 'add-event', component: AddediteventComponent },
  { path: 'edit-event/:id', component: AddediteventComponent },
  { path: 'events/:id', component: EventdetailsComponent },
  { path: 'test', component: EventsComponent },
  { path: 'volunteers', component: VolunteersComponent },
  { path: 'volunteers/newVolunteer', component: NewVolunteerComponent },
  { path: 'volunteers/newGroup', component: NewGroupComponent },
  { path: 'collections', redirectTo: 'posts'},
  { path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
