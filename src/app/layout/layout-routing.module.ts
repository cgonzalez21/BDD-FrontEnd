import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'dashboard', pathMatch: 'prefix' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },
            { path: 'forms', loadChildren: './form/form.module#FormModule' },
            { path: 'consult', loadChildren: './consult-client/consult.client.module#ConsultClientModule'},
            { path: 'inventary', loadChildren: './inventary/inventary.module#InventaryModule'},
            { path: 'new-purchase', loadChildren: './new-purchase/new.purchase.module#NewPurchaseModule'},
            { path: 'consult-purchase', loadChildren: './consult-purchase/consult.purchase.module#ConsultPurchaseModule'}
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
