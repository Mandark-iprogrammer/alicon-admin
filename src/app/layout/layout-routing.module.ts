import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout.component';

const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            { path: '', redirectTo: 'viewUsers' },
            { path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule' },    
            {path : 'group',loadChildren:'./group/group.module#GroupModule'},
            {path:'meeting',loadChildren:'./meeting/meeting.module#MeetingModule'},
            {path:'meeting/:objectId',loadChildren:'./meeting/meeting.module#MeetingModule'},
            {path:'viewMeeting',loadChildren:'./view-meeting/view-meeting.module#ViewMeetingModule'},
            { path : 'activity',loadChildren : './activity/activity.module#ActivityModule'},
            { path : 'invitation',loadChildren : './invitation/invitation.module#InvitationModule'},
            {path : 'viewActivity',loadChildren: './view-activity/view-activity.module#ViewActivityModule'},
            {path: 'viewUsers',  loadChildren:'./view-user/view-user.module#ViewUserModule'},
           // {path: 'changePwd',  loadChildren:'./change-pwd/change-pwd.module#ChangePwdModule'},
            {path:'User/:objectId',loadChildren:'./user/user.module#UserModule'},    
            {path: 'User',loadChildren:'./user/user.module#UserModule'},
            {path:'push',loadChildren:'./push-notification/push-notification.module#PushNotificationModule'},
            // { path: 'charts', loadChildren: './charts/charts.module#ChartsModule' },
            // { path: 'tables', loadChildren: './tables/tables.module#TablesModule' },
            // { path: 'forms', loadChildren: './form/form.module#FormModule' },
            // { path: 'bs-element', loadChildren: './bs-element/bs-element.module#BsElementModule' },
            // { path: 'grid', loadChildren: './grid/grid.module#GridModule' },
            { path: 'components', loadChildren: './bs-component/bs-component.module#BsComponentModule' },
            // { path: 'blank-page', loadChildren: './blank-page/blank-page.module#BlankPageModule' }
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class LayoutRoutingModule {}
