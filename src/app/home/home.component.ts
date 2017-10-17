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
    var table = $('#friendyCar').DataTable(
      {
        "processing": true,
        "serverSide": true,
        "ajax": {
          'url': "http://54.191.194.107/api/web/app_dev.php/api/cars-grid",
          'type': 'GET',
          'beforeSend': function (request) {
              request.setRequestHeader("Authorization", 'Bearer ' + "ZWVjN2RlODE0OGQ3MTNmYTJjYTQwOTZjNTAyNmQ5N2ZiMTVlMjYyY2FmMWQ1Y2ZiMDQyNmZkMTVhNDFlMzE0OA");
          }
        },
        "dom": 'lBfrtip',
        "buttons": [
            'copyHtml5',
            'excelHtml5',
            'csvHtml5',
            'pdfHtml5'
        ],       
        "columns": [
          { "data": 0 },          // id
          { "data": 1 },          //title
          { "data": 2 },          //owner
          { "data": 4 },          //phone
          { "data": 5 },          //make
          { "data": 6 },          //status
          // { "data": 7 }           //created date
        ]
      } 
    );

    /* Custom filtering function which will search data between two values */
    $.fn.dataTable.ext.search.push(
      function( settings, data, dataIndex ) {
          var min = parseInt( $('#min').val(), 10 );
          var max = parseInt( $('#max').val(), 10 );
          var age = parseFloat( data[3] ) || 0; // use data for the age column
   
          if ( ( isNaN( min ) && isNaN( max ) ) ||
               ( isNaN( min ) && age <= max ) ||
               ( min <= age   && isNaN( max ) ) ||
               ( min <= age   && age <= max ) )
          {
              return true;
          }
          return false;
      }
    );

    // Event listener to the two range filtering inputs to redraw on input
    $('#min, #max').keyup( function() {
      table.draw();
    } );
  }

  ngOnInit() {
    // this.getAdminData();

    this.activeDataTable();
    // setTimeout(this.activeDataTable, 250);
    // setTimeout(this.activeDataTable, 1000);
  }
}
