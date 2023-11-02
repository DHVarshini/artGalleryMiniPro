import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CardComponent } from './card/card.component';
import { DescriptionComponent } from './description/description.component';
import { WishlistComponent } from './wishlist/wishlist.component';

const routes: Routes = [
  {
    path:"",
    component:HomeComponent
  },
  {
    path:"search/:searchValue",
    component:CardComponent
  },
  {
    path:"description/:id",
    component:DescriptionComponent
  },
  {
    path:"wishlist",
    component:WishlistComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 

}
