import {Component, Input, OnChanges} from '@angular/core';

import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list-add',
  templateUrl: './shopping-list-add.component.html'
})
export class ShoppingListAddComponent implements OnChanges {
  @Input() item: Ingredient;
  isAdd = true;
  constructor(private slSvc: ShoppingListService) { }

  ngOnChanges(changes) {
    if (changes.item.currentValue === null) {
        this.isAdd = true;
        this.item = {name: null, amount: null};
    } else {
      this.isAdd = false;
    }
  }

  onSubmit(ingredient: Ingredient) {
    if (!this.isAdd) {
    } else {
      this.item = new Ingredient(ingredient.name, ingredient.amount);
      this.slSvc.addItem(this.item);
    }
  }



}
