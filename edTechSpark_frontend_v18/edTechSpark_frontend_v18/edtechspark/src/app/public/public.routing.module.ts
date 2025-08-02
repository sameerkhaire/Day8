import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CartComponent } from './cart/cart.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { PaymentComponent } from './payment/payment.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { FullsizeLayoutComponent } from './shared/fullsize-layout.component';
import { LayoutComponent } from './shared/layout.component';
import { SignupComponent } from './signup/signup.component';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';

const routes: Routes = [
  {
    path: '', component: FullsizeLayoutComponent, children: [
      { path: '', component: HomeComponent },
      { path: 'courses/:name', component: CourseComponent }
    ]
  },
  {
    path: '', component: LayoutComponent, children: [
      { path: 'payment', component: PaymentComponent },
      { path: 'receipt', component: ReceiptComponent },
      { path: 'courses', component: CoursesComponent },
      { path: 'cart', component: CartComponent },
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent },
      { path: 'notfound', component: NotfoundComponent },
      { path: 'unauthorize', component: UnauthorizeComponent },
      { path: '**', redirectTo: '/notfound' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PublicRoutingModule { }
