import { NgModule, provideExperimentalZonelessChangeDetection } from '@angular/core';
import { CommonModule } from "@angular/common";
import { HomeComponent } from './home/home.component';
import { LayoutComponent } from './shared/layout.component';
import { PublicRoutingModule } from './public.routing.module';
import { provideHttpClient } from '@angular/common/http';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CourselistComponent } from './shared/courselist/courselist.component';
import { CoursesComponent } from './courses/courses.component';
import { FullsizeLayoutComponent } from './shared/fullsize-layout.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UnauthorizeComponent } from './unauthorize/unauthorize.component';
import { CourseComponent } from './course/course.component';
import { CartComponent } from './cart/cart.component';
import { PaymentComponent } from './payment/payment.component';
import { ReceiptComponent } from './receipt/receipt.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        PublicRoutingModule,
        SharedModule
    ],
    declarations: [
    HomeComponent,
    LayoutComponent,
    HeaderComponent,
    FooterComponent,
    CourselistComponent,
    CoursesComponent,
    FullsizeLayoutComponent,
    LoginComponent,
    SignupComponent,
    NotfoundComponent,
    UnauthorizeComponent,
    CourseComponent,
    CartComponent,
    PaymentComponent,
    ReceiptComponent
    ],
    providers: [
    ],
})
export class PublicModule { }
