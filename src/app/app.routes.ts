import { Routes } from '@angular/router';
import { LandingComponent } from './landing/landing.component';
import { FinanceDashboardComponent } from './finance-dashboard/finance-dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: LandingComponent,
    },
    {
        path: 'home',
        component: FinanceDashboardComponent,
    },
];
