import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserRoutingModule } from './user-routing.module';
import { UserLayoutComponent } from './shared/user-layout.component';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { FooterComponent } from './shared/footer/footer.component';
import { HeaderComponent } from './shared/header/header.component';
import { OrdersComponent } from './orders/orders.component';
import { OrderComponent } from './order/order.component';
import { CoursesComponent } from './courses/courses.component';
import { SharedModule } from '../shared/shared.module';
import { provideHttpClient } from '@angular/common/http';


@NgModule({
  declarations: [
    UserLayoutComponent,
    DashbaordComponent,
    FooterComponent,
    HeaderComponent,
    OrdersComponent,
    OrderComponent,
    CoursesComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers:[
  ]
})
export class UserModule { }
