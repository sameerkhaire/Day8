import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Category } from '../../models/category';
import { Mentor } from '../../models/mentor';
import { CategoryService } from '../../services/category.service';
import { CourseService } from '../../services/course.service';
import { FileService } from '../../services/file.service';
import { MentorService } from '../../services/mentor.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
})
export class CourseComponent implements OnInit {
  courseForm: FormGroup;
  categories: Category[] | any;
  mentors: Mentor[] | any;
  config = {
    placeholder: '',
    tabsize: 2,
    height: 200,
    toolbar: [
      ['style', ['style', 'bold', 'italic', 'underline', 'clear']],
      ['fontsize', ['fontname', 'fontsize', 'color']],
      ['para', ['ul', 'ol', 'paragraph']],
      ['insert', ['table', 'link']],
      ['misc', ['codeview']]
    ],
    fontNames: ['Helvetica', 'Arial', 'Arial Black', 'Comic Sans MS', 'Courier New', 'Roboto', 'Times']
  }
  fileToUpload: any;
  
  constructor(private fb: FormBuilder, private courseService: CourseService
    , private router: Router
    , private fileService: FileService
    , private categoryService: CategoryService
    , private route: ActivatedRoute
    , private mentorService: MentorService) {
    this.courseForm = this.fb.group({
      id: [0],
      name: this.fb.control(null,[Validators.required]),
      summary: [null, [Validators.required]],
      description: [null, Validators.required],
      difficultyType: ['', Validators.required],
      unitPrice: [null, Validators.required],
      categoryId: ['', Validators.required],
      url: [null, Validators.required],
      mentorId: [null, Validators.required],
      imageUrl: ['']
    });
  }

  ngOnInit(): void {
    this.loadMentors();
    this.categoryService.GetCategories().subscribe(res => {
      if (res.status == 200 && res.body != null) {
        this.categories = res.body;
      }
    });

    this.route.params.subscribe(params => {
      let id = params['id'];
      if (id != undefined) {
        this.courseService.GetCourse(id).subscribe(res => {
          if (res.status == 200 && res.body != null) {
            let course = res.body;
            this.courseForm.controls['id'].setValue(course.id);
            this.courseForm.controls['name'].setValue(course.name);
            this.courseForm.controls['summary'].setValue(course.summary);
            this.courseForm.controls['description'].setValue(course.description);
            this.courseForm.controls['difficultyType'].setValue(course.difficultyType);
            this.courseForm.controls['unitPrice'].setValue(course.unitPrice);
            this.courseForm.controls['categoryId'].setValue(course.categoryId);
            this.courseForm.controls['url'].setValue(course.url);
            this.courseForm.controls['imageUrl'].setValue(course.imageUrl);
            this.courseForm.controls['mentorId'].setValue(course.mentorId)
          }
        });
      }
    });
  }
  changeFile(files: any) {
    if (files.length === 0) {
      return;
    }
    this.fileToUpload = <File>files[0];
  }
  saveData() {
    if (this.courseForm.valid) {
      if (this.courseForm.value.id > 0) {
        this.courseService.UpdateCourse(this.courseForm.value).subscribe(res => {
          if (res.status == 200) {
            this.router.navigate(['/admin/courses']);
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
            this.courseForm.patchValue({
              imageUrl: filePath,
            });
            // console.log(this.courseForm.value);
            if (filePath != '') {
              this.courseService.AddCourse(this.courseForm.value).subscribe(res => {
                if (res.status == 201) {
                  this.router.navigate(['/admin/courses']);
                }
              });
            }
          }
        });
      }
    }
  }

  loadMentors(){
     this.mentorService.GetMentors().subscribe(res=> {
      this.mentors = res.body;
     })
  }
}
