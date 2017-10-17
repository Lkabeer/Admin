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
