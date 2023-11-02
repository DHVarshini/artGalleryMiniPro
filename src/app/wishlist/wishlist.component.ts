import { Component } from '@angular/core';
@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent {
  wishlist: any[] = [];

  constructor() { }

  ngOnInit(): void {
    let data = localStorage.getItem('wishlist');
    if (data) {
      this.wishlist = JSON.parse(data);
    }
  }
  removeFromWishlist(artwork: any){
    let index = this.wishlist.findIndex(item=> item.id===artwork.id);
    if(index>=0){
      this.wishlist.splice(index, 1);
      localStorage.setItem('wishlist',JSON.stringify(this.wishlist));
    }
  }
}
