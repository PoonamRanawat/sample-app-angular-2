import {Component, OnDestroy, OnInit} from '@angular/core';

import { Recipe } from '../recipe';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {RecipeService} from '../recipe.service';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  providers: [ShoppingListService]
})
export class RecipeDetailComponent implements OnInit, OnDestroy{
  private subscription: Subscription;
  private recipeIndex: number;
  selectedRecipe: Recipe;
  constructor(private shoppingListSvc: ShoppingListService,
              private activeRoute: ActivatedRoute,
              private recipeSvc: RecipeService,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.activeRoute.params.subscribe(
      (params: any) => {
        this.recipeIndex = params['id'];
        this.selectedRecipe = this.recipeSvc.getRecipe(this.recipeIndex);
      }
    );
  }

  onAddToShoppingList() {
    this.shoppingListSvc.addItems(this.selectedRecipe.ingredients);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onEdit() {
    this.router.navigate(['/recipes', this.recipeIndex, 'edit']);
  }

  onDelete() {
    this.recipeSvc.deleteRecipe(this.selectedRecipe);
    this.router.navigate(['/recipes']);
  }
}
