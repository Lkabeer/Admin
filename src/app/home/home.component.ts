import { Component, OnInit } from '@angular/core';
import { HomeService } from "../services/home.service";

declare var $;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  providers: [HomeService]
})
export class HomeComponent implements OnInit {

  adminData: any = [];

  constructor(private _homeService: HomeService) { }

  activeDataTable() {
    $('#friendyCar').DataTable(); 
  }

  ngOnInit() {

    this._homeService.getLastData().subscribe(
      data => {
        this.adminData = data;
        console.log(this.adminData);
      }
    );

    setTimeout(this.activeDataTable, 250);
    setTimeout(this.activeDataTable, 1000);
  }
}
