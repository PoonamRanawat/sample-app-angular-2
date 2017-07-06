import { Component, OnInit } from '@angular/core';
import {Ingredient} from '../shared/ingredient';
import {ShoppingListService} from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  providers: [ShoppingListService]
})
export class ShoppingListComponent implements OnInit {
  items: Ingredient[] = [];
  selectedItem: Ingredient = null;
  constructor(private shoppingListSvc: ShoppingListService) { }

  ngOnInit() {
    this.items = this.shoppingListSvc.getItems();
    console.log(this.items);
  }

  onSelectItem(item: Ingredient) {
    this.selectedItem = item;
  }
}
