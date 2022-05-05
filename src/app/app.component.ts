import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {map} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  filter: string = '';
  data: string[] = [];
  filteredCategories: {index: number, category: string}[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit() {
    this.http.get('https://api.publicapis.org/categories').pipe(
      map((resp: {categories?: string[]}) => {
        return resp.categories!!;
      })
    ).subscribe(categories => {
      this.data = categories;
      this.filterCategories();
    })
  }

  filterCategories() {
    // Super simple filter (no sorting)
    const categories = this.data.map((value, index) => {
      return { index: index, category: value };
    })
    if (this.filter.length == 0) this.filteredCategories = categories;
    else this.filteredCategories = categories.filter((value) => value.category.toLowerCase().includes(this.filter.toLowerCase()))
  }

}
