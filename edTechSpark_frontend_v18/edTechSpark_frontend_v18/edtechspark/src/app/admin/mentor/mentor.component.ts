import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileService } from '../../services/file.service';
import { MentorService } from '../../services/mentor.service';

@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styles: [
  ]
})
export class MentorComponent implements OnInit {
  mentorForm: FormGroup;
  topicId: number | undefined;
  fileToUpload: any;
  constructor(private fb: FormBuilder, private mentorService: MentorService,private fileService: FileService, private route: ActivatedRoute, private router: Router) {
    this.mentorForm = this.fb.group({
      id: [0],
      name: [null, Validators.required],
      email: [null, Validators.required],
      title: [null, Validators.required],
      biography: [null, Validators.required],
      skills: [null, [Validators.required]],
      imageUrl: [null]
    });
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      let id = params['id'];
      this.mentorService.GetMentor(id).subscribe(res => {
        if (res.status == 200 && res.body != null) {
          let mentor = res.body;
          this.mentorForm.controls['id'].setValue(mentor.id);
          this.mentorForm.controls['name'].setValue(mentor.name);
          this.mentorForm.controls['email'].setValue(mentor.email);
          this.mentorForm.controls['title'].setValue(mentor.title);
          this.mentorForm.controls['biography'].setValue(mentor.biography);
          this.mentorForm.controls['skills'].setValue(mentor.skills);
          this.mentorForm.controls['imageUrl'].setValue(mentor.imageUrl);
        }
      });
    });
  }
  changeFile(files: any) {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];
    // console.log(this.fileToUpload)
  }
  saveData() {
    if (this.mentorForm.valid) {
      if (this.mentorForm.value.id > 0) {
        this.mentorService.UpdateMentor(this.mentorForm.value).subscribe(res => {
          if (res.status == 200) {
            this.router.navigate(['/admin/mentors']);
          }
        });
      }
      else {
        const formData = new FormData();
        formData.append('file', this.fileToUpload, this.fileToUpload.name);
        this.fileService.UploadFile(formData).subscribe(res => {
          if (res.status == 200) {
            let filePath = res.body.dbPath;
            console.log(res.body);
            this.mentorForm.patchValue({
              imageUrl: filePath,
            });

            if (filePath != '') {
              this.mentorService.AddMentor(this.mentorForm.value).subscribe(res => {
                if (res.status == 201) {
                  this.router.navigate(['/admin/mentors']);
                }
              });
            }
          }
        });
      }
    }
  }
}
