import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CourseTopic } from '../../models/coursetopic';
import { CourseTopicService } from '../../services/courseTopic.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styles: []
})
export class TopicsComponent implements OnInit {
  courseId: number | any;
  topics: CourseTopic[] | any;
  constructor(private topicService: CourseTopicService,private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.topicService.GetAllTopics().subscribe(res => {
      if (res.status == 200 && res.body != null) {
        this.topics = res.body;
      }
    });
  }
  deleteTopic(id:number){

  }
}
