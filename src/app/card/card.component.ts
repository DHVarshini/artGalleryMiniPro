import { Component, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RestService } from '../rest.service';
import { MatPaginator } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  arts: any = [];
  readonly API_URL = 'https://api.artic.edu/api/v1/artworks';
  artworks: any[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | any;
  pageSize: number = 8;
  currentPage: number = 1;
  totalItems: number = 0;
  pageEvent: any;
  searchValue: string | any;
  searchForm: FormGroup;
  searchData = new FormControl("");
  constructor(private http: HttpClient, private rest: RestService, private router: Router, private fb: FormBuilder) {
    this.searchForm = this.fb.group({
      searchValue: ['', Validators.required]
    });
  }
  ngOnInit() {
    this.getArtworks();
  }
  //Cards displayed after Pagination and searching
  getArtworks() {
    this.searchValue = this.searchData.value;
    this.http.get<any>(`https://api.artic.edu/api/v1/artworks/search?fields=image_id,id,title&page=${this.currentPage}&limit=${this.pageSize}&q=${this.searchValue}`)

      .subscribe(data => {
        this.artworks = data.data;
        this.totalItems = data.pagination.total;
        console.log(this.artworks)
      });
  }
  //search function verification and passing the search value
  searchArtworks() {
    if (this.searchForm.valid) {
      this.getArtworks();
    } else {
      this.searchForm.controls['searchValue'];
    }
  }
  //Updating page index and page size (Pagination)
  onPageChange(event: any) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex + 1;
    this.getArtworks();
  }
  //Navigating to description of the artwork based on ID
  viewArtwork(id: number) {
    this.router.navigate(['/description/:id']);
  }
  //Adding the artworks to the wishlist
  addToWishlist(art: any) {
    let wishlist: any[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    console.log(wishlist);
    let index = wishlist.findIndex(item => item.id === art.id);
    if (index == -1) {
      wishlist.push(art);
      localStorage.setItem('wishlist', JSON.stringify(wishlist));
      alert("Added to Wishlist!");
    }
    else {
      window.alert('Item already present in wishlist');
    }
  }
  removeFromWishlist(artwork: any) {
    let wishlist: any[] = JSON.parse(localStorage.getItem('wishlist') || '[]');
    let index = wishlist.findIndex(item => item.id === artwork.id);
    if (index >= 0) {
      wishlist.splice(index, 1);
      localStorage.setItem('wishlist', JSON.stringify(wishlist))
    }
    console.log(wishlist);
  }
}