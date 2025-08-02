import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CourseLesson } from '../../models/courselesson';
import { CourseLessonService } from '../../services/courseLesson.service';

@Component({
  selector: 'app-lesson',
  templateUrl: './lesson.component.html',
  styles: [
  ]
})
export class LessonComponent implements OnInit {
  lessonForm: FormGroup;
  topicId: number | undefined;
  
  constructor(private fb: FormBuilder, private lessonService: CourseLessonService, private route: ActivatedRoute, private router: Router) {
    this.lessonForm = this.fb.group({
      id: [0],
      lessonName: [null, Validators.required],
      contentPath: [null],
      videoPath: [null, Validators.required],
      duration: [null, Validators.required],
      isActive: [true, [Validators.required]],
      isPreview: [false, [Validators.required]],
      sequence: [null, [Validators.required]],
      courseTopicId: [this.topicId]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.topicId =  params['topicid'];
      let id = params['id'];
      this.lessonService.GetLesson(id).subscribe(res => {
        if (res.status == 200 && res.body != null) {
          let topic = res.body;
          this.lessonForm.controls['id'].setValue(topic.id);
          this.lessonForm.controls['lessonName'].setValue(topic.lessonName);
          this.lessonForm.controls['contentPath'].setValue(topic.contentPath);
          this.lessonForm.controls['videoPath'].setValue(topic.videoPath);
          this.lessonForm.controls['duration'].setValue(topic.duration);
          this.lessonForm.controls['isActive'].setValue(topic.isActive);
          this.lessonForm.controls['isPreview'].setValue(topic.isPreview);
          this.lessonForm.controls['sequence'].setValue(topic.sequence);
          this.lessonForm.controls['courseTopicId'].setValue(topic.courseTopicId);
        }
      });
    });

  }
  saveData() {
    var lesson: CourseLesson = this.lessonForm.value;
    lesson.courseTopicId = this.topicId;
    if (this.lessonForm.valid) {
      this.lessonService.AddLesson(lesson).subscribe(res => {
        if (res.status == 201) {
          this.router.navigate(['/admin/topic', this.topicId, 'lessons']);
        }
      });
    }
  }
}
