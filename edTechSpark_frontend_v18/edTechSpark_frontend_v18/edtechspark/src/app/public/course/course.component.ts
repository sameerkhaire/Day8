import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Course } from '../../models/course';
import { CatalogService } from '../../services/catalog.service';

@Component({
  selector: 'app-course',
  templateUrl: './course.component.html',
  styles: [
  ]
})
export class CourseComponent implements OnInit {
  name: string | any;
  course: Course | any;
  constructor(private catalogService: CatalogService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.name = params['name'];
      this.catalogService.GetCourse(this.name).subscribe(res => {
        if (res.status == 200) {
          this.course = res.body;
        }
      });
    });
  }

  AddToCart(id: number, name: string, unitPrice: number, quantity: number, image: string) {

  }
  
  BuyNow(id: number, name: string, unitPrice: number, quantity: number, image: string) {

  }
}
