import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from '../../models/course';
import { CourseService } from '../../services/course.service';
import { CourseTopicService } from '../../services/courseTopic.service';

@Component({
  selector: 'app-topic',
  templateUrl: './topic.component.html',
  styles: [
  ]
})
export class TopicComponent implements OnInit {
  topicForm: FormGroup;
  courses: Course[] | any;
  constructor(private fb: FormBuilder, private topicService: CourseTopicService, private router: Router, private courseService: CourseService, private route:ActivatedRoute) {
    this.topicForm = this.fb.group({
      id: [0],
      topicName: [null, Validators.required],
      isActive: [true, [Validators.required]],
      sequence: [null, [Validators.required]],
      courseId: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.courseService.GetCourses().subscribe(res => {
      if (res.status == 200 && res.body != null) {
        this.courses = res.body;
      }
    });

    this.route.params.subscribe(params => {
      let id = params['id'];
      this.topicService.GetTopic(id).subscribe(res => {
        if (res.status == 200 && res.body != null) {
          let topic = res.body;
          this.topicForm.controls['id'].setValue(topic.id);
          this.topicForm.controls['topicName'].setValue(topic.topicName);
          this.topicForm.controls['isActive'].setValue(topic.isActive);
          this.topicForm.controls['sequence'].setValue(topic.sequence);
          this.topicForm.controls['courseId'].setValue(topic.courseId);
        }
      });
    })
  }
  saveData() {
    if (this.topicForm.valid) {
      this.topicService.AddTopic(this.topicForm.value).subscribe(res => {
      console.log(res);
        if (res.status == 201) {
          this.router.navigate(['/admin/topics']);
        }
      });
    }
  }
}