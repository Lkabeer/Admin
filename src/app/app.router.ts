import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { HomeComponent } from "./home/home.component";

export const appRoutes: Routes = [
    {
        path: '', 
        component: HomeComponent
    }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);