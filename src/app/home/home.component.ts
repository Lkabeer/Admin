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

  getAdminData() {
    this._homeService.getLastData().subscribe(
      data => {
        this.adminData = data;
        console.info("Admin Data");
        console.log(this.adminData);
      }
    );
  }

  activeDataTable() {
    $('#friendyCar').DataTable(
      {
        "processing": true,
        // "serverSide": true,
        "ajax": "../../assets/data/objects.txt",
        "dom": 'lBfrtip',
        "buttons": [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],       
        "columns": [
            { "data": "name" },
            { "data": "position" },
            { "data": "office" },
            { "data": "extn" },
            { "data": "start_date" },
            { "data": "salary" } 
        ]
      } 
    );
  }

  ngOnInit() {
    // this.getAdminData();

    this.activeDataTable();
    // setTimeout(this.activeDataTable, 250);
    // setTimeout(this.activeDataTable, 1000);
  }
}
