import { Component } from '@angular/core';

import { HeaderComponent } from './header.component';
import { RecipesComponent } from './recipes/recipes.component';
import {RecipeService} from './recipes/recipe.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [RecipeService]
})
export class AppComponent {

}
