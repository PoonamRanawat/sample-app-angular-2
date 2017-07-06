import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs/Subscription';
import {FormArray,
        FormBuilder,
        FormControl,
        FormGroup,
        Validators
      } from '@angular/forms';

import {RecipeService} from '../recipe.service';
import {Recipe} from '../recipe';



@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html'
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  recipeForm: FormGroup;
  private recipeIndex: number;
  private recipe: Recipe;
  private isNew = true;
  private subscription: Subscription;
  constructor(private route: ActivatedRoute,
              private recipeSvc: RecipeService,
              private formBuilder: FormBuilder,
              private router: Router) { }

  ngOnInit() {
    this.subscription = this.route.params.subscribe(
      (params: any) => {
        if (params.hasOwnProperty('id')) {
          this.isNew = false;
          this.recipeIndex = +params['id'];
          this.recipe = this.recipeSvc.getRecipe(this.recipeIndex);
        } else {
          this.isNew = true;
          this.recipe = null;
        }
        this.initForm();
      }
    );
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  private initForm() {
    let recipeName = '';
    let recipeImageUrl = '';
    let recipeContent = '';
    const recipeIngredients: FormArray = new FormArray([]);

    if (!this.isNew) {
      if (this.recipe.hasOwnProperty('ingredients')) {
        for (let i = 0; i < this.recipe.ingredients.length; i++) {
          recipeIngredients.push(
            new FormGroup({
              name: new FormControl(this.recipe.ingredients[i].name, Validators.required),
              amount: new FormControl(this.recipe.ingredients[i].amount, [Validators.required,
                Validators.pattern('\\d+')])
            })
          );
        }
      }
      recipeName = this.recipe.name;
      recipeImageUrl = this.recipe.imagePath;
      recipeContent = this.recipe.description;
    }
    this.recipeForm = this.formBuilder.group({
      name: [recipeName, Validators.required],
      imagePath: [recipeImageUrl, Validators.required],
      description: [recipeContent, Validators.required],
      ingredients: recipeIngredients
    });
  }

  onSubmit() {
    const newRecipe = this.recipeForm.value;
    if (this.isNew) {
      this.recipeSvc.addRecipe(newRecipe);
    } else {
      this.recipeSvc.editRecipe(this.recipe, newRecipe);
    }
    this.navigateBack();
  }

  onCancel() {
    this.navigateBack();
  }

  private navigateBack() {
    this.router.navigate(['../']);
  }

  onRemoveItem(index: number) {
    (<FormArray>this.recipeForm.controls['ingredients']).removeAt(index);
  }

  onAddItem(name: string, amount: string) {
    (<FormArray>this.recipeForm.controls['ingredients']).push(
      new FormGroup({
        name: new FormControl(name, Validators.required),
        amount: new FormControl(amount, [Validators.required,
          Validators.pattern('\\d+')])
      })
    );
  }
}
