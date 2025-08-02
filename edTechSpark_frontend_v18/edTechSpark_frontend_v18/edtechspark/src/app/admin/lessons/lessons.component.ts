import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseLesson } from '../../models/courselesson';
import { CourseLessonService } from '../../services/courseLesson.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styles: [
  ]
})
export class LessonsComponent implements OnInit {
  topicId: number | undefined;
  courseLessons: CourseLesson[] | undefined;
  constructor(private courseLessonService: CourseLessonService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.topicId =  params['topicid'];
      if (this.topicId != undefined) {
        this.courseLessonService.GetLessonsByTopic(this.topicId).subscribe(res => {
          if (res.status == 200 && res.body != null) {
            this.courseLessons = res.body;
          }
        });
      }
    });
  }

  deleteLesson(id: number) {
    this.courseLessonService.DeleteLesson(id).subscribe(res => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
}
