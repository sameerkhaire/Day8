import { Component, OnInit } from '@angular/core';
import { Mentor } from '../../models/mentor';
import { MentorService } from '../../services/mentor.service';

@Component({
  selector: 'app-mentors',
  templateUrl: './mentors.component.html',
})
export class MentorsComponent implements OnInit {
  mentors: Mentor[] | any;
  constructor(private mentorService: MentorService) { }

  ngOnInit(): void {
    this.mentorService.GetMentors().subscribe(res => {
      this.mentors = res.body;
    })
  }
  deleteMentor(id: number) {
    this.mentorService.DeleteMentor(id).subscribe(res => {
      if (res.status == 200) {
        location.reload();
      }
    });
  }
}
