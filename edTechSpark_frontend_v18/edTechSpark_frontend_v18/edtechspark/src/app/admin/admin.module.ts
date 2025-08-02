import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLayoutComponent } from './shared/admin-layout.component';
import { HeaderComponent } from './shared/header/header.component';
import { FooterComponent } from './shared/footer/footer.component';
import { CourseComponent } from './course/course.component';
import { CoursesComponent } from './courses/courses.component';
import { TopicComponent } from './topic/topic.component';
import { TopicsComponent } from './topics/topics.component';
import { LessonComponent } from './lesson/lesson.component';
import { LessonsComponent } from './lessons/lessons.component';
import { MentorComponent } from './mentor/mentor.component';
import { MentorsComponent } from './mentors/mentors.component';
//import { NgxSummernoteModule } from 'ngx-summernote';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from '../shared/shared.module';
import { provideHttpClient } from '@angular/common/http';

@NgModule({
  declarations: [
    AdminLayoutComponent,
    HeaderComponent,
    DashboardComponent,
    FooterComponent,
    CourseComponent,
    CoursesComponent,
    TopicComponent,
    TopicsComponent,
    LessonComponent,
    LessonsComponent,
    MentorComponent,
    MentorsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    SharedModule
  ],
  providers:[
  ]
})
export class AdminModule { }
