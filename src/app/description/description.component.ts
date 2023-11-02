import { Component, OnInit } from '@angular/core';
import { RestService } from '../rest.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-description',
  templateUrl: './description.component.html',
  styleUrls: ['./description.component.css']
})
export class DescriptionComponent implements OnInit {
    id = 0; 
    artwork: any;
  constructor(private route: ActivatedRoute, private rest: RestService) { }
  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.id = params['id'];
    });
    this.getArtwork();
  }
  getArtwork() {
    this.rest.getArtworkById(this.id).subscribe(data => {
      this.artwork = data.data;
    });
  }
}
