import { Injectable } from '@angular/core';

import {Recipe} from './recipe';
import {Ingredient} from '../shared/ingredient';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [
    new Recipe('Icecream', 'Good', 'https://nqki340a6g43eofbpz6nu7kk-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/BBB124-Top-5-Homemade-Ice-Cream-Flavors-Thumbnail-FINAL-2-1024x576.jpg', [
      new Ingredient('Cream', 2),
      new Ingredient('Butter', 1)
    ]),
    new Recipe('Icecream Shake', 'Excellent', 'http://www.thecookierookie.com/wp-content/uploads/2015/02/Irish-Cream-Shake-7.jpg',[
      new Ingredient('Milk', 3),
      new Ingredient('Cream', 1)
    ])
  ];
  constructor() { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

}
