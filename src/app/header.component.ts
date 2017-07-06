import { Component } from '@angular/core';
import {RecipeService} from './recipes/recipe.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {

  constructor(private recipeSvc: RecipeService) { }

  onStore() {
    this.recipeSvc.storeData().subscribe(
        data => console.log(data),
        error => console.log(error)
    );
  }

  onFetch() {
    this.recipeSvc.fetchData();
  }

}
