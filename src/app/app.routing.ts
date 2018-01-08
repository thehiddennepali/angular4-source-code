import { Routes, RouterModule } from '@angular/router';



import { LayoutsComponent } from './_layouts/layouts.component';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { FarmComponent } from './farm/farm.component';
import { ClientComponent } from './client/client.component';
import { ContactComponent } from './contact/contact.component';


const appRoutes: Routes = [
    
    //Site routes goes here 
    { 
        path: '', 
        component: LayoutsComponent,
        children: [
          { path: '', component: HomeComponent, pathMatch: 'full'},
          { path: 'about', component: AboutComponent },
          { path: 'farm', component: FarmComponent },
          { path: 'client', component: ClientComponent },
          { path: 'contact', component: ContactComponent },
        ]
    },
    
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);