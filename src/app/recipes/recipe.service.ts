import { Injectable, EventEmitter } from '@angular/core';
import {Headers, Http, Response} from '@angular/http';
import 'rxjs/Rx';

import {Recipe} from './recipe';
import {Ingredient} from '../shared/ingredient';

@Injectable()
export class RecipeService {
  recipesChanged = new EventEmitter<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Icecream', 'Good', 'https://nqki340a6g43eofbpz6nu7kk-wpengine.netdna-ssl.com/wp-content/uploads/2016/05/BBB124-Top-5-Homemade-Ice-Cream-Flavors-Thumbnail-FINAL-2-1024x576.jpg', [
      new Ingredient('Cream', 2),
      new Ingredient('Butter', 1)
    ]),
    new Recipe('Icecream Shake', 'Excellent', 'http://www.thecookierookie.com/wp-content/uploads/2015/02/Irish-Cream-Shake-7.jpg', [
      new Ingredient('Milk', 3),
      new Ingredient('Cream', 1)
    ])
  ];
  constructor(private httpSvc: Http) { }

  getRecipes() {
    return this.recipes;
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  deleteRecipe(recipe: Recipe) {
    this.recipes.splice(this.recipes.indexOf(recipe), 1);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
  }

  editRecipe(oldRecipe: Recipe, newRecipe: Recipe) {
    this.recipes[this.recipes.indexOf(oldRecipe)] = newRecipe;
  }

  storeData() {
    const body = JSON.stringify(this.recipes);
    const headers = new Headers({
      'Content-type': 'application-json'
    });
    return this.httpSvc.put('https://recipebook-1bb0a.firebaseio.com/recipes.json', body, {
      headers: headers
    });
  }

  fetchData() {
    return this.httpSvc.get('https://recipebook-1bb0a.firebaseio.com/recipes.json')
      .map((response: Response) => response.json())
      .subscribe(
        (data: Recipe[]) => {
          this.recipes = data;
          this.recipesChanged.emit(this.recipes);
        }
      );
  }
}
