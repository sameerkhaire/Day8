import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html'
})
export class CoursesComponent implements OnInit {
  courses: Course[] | undefined;
  constructor(private courseService: CourseService, private router: Router) {

  }

  ngOnInit() {
    this.courseService.GetCourses().subscribe(res => {
      if (res.status == 200 && res.body != null) {
        this.courses = res.body;
      }
    });
  }
  deleteCourse(id: number) {
    this.courseService.DeleteCourse(id).subscribe(res => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
}
