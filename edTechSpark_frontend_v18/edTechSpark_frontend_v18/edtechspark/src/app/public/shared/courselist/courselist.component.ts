import { Component, OnInit } from '@angular/core';
import { Course } from '../../../models/course';
import { CartService } from '../../../services/cart.service';
import { CatalogService } from '../../../services/catalog.service';
declare const $: any;

@Component({
  selector: 'app-courselist',
  templateUrl: './courselist.component.html',
  styles: [
  ]
})
export class CourselistComponent implements OnInit {
  message: string | any;
  courses: Course[] | any;
  constructor(private catalogService: CatalogService, private cartService: CartService) { }

  ngOnInit(): void {
    this.catalogService.GetCourses().subscribe(res => {
      if (res.status == 200)
        this.courses = res.body;
    });
  }
  
  AddToCart(id: number, name: string, unitPrice: number, quantity: number, image: string) {
    this.cartService.addToCart(id, name, image, unitPrice, quantity);
    this.message = `<strong>${name}</strong> Added to Cart Successfully!`;
    $("#toastCart").toast('show');
    setTimeout(() => {
      $("#toastCart").toast('hide');
    }, 10000);
  }
}
