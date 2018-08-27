import { Component } from '@angular/core';
import { LocationService } from './location.service';
import { Location } from './Location';
import { Marker } from './Marker';
import * as _ from "lodash";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  jsons: Location[];

  jsonArray: any[];
  filterArray: Location[];
  markers: Marker[];

  zoom: number = 5;

  latFirst: number;
  longFirst: number;

  searchText: String;

  key: string = 'name'; //set default
  reverse: boolean = false;
  sort(key) {
    this.key = key;
    this.reverse = !this.reverse;
  }

  p: number = 1;

  constructor(private jsonService: LocationService) { }

  ngOnInit() {
    this
      .jsonService
      .getJson()
      .subscribe((data: any) => {
        this.jsons = data;
        this.jsonArray = new Array();
        this.markers = new Array();
        for (var i in data) {

          var desc = data[i].description;
          var isBig = false;
          if (data[i].description && data[i].description.length >= 25) {
            desc = data[i].description.substring(0, 25);
            isBig = true;
          }

          var d = {
            id: i,
            "name": data[i].name,
            "description": desc,
            "fullDesc": data[i].description,
            "logo": data[i].logo,
            "location": data[i].location,
            "isBig": isBig,
            "isFullDesc": false
          }
          var lat = data[i].location['lat'];
          var long = data[i].location['long'];
          var m = {
            lat: lat,
            long: long,
            draggable: false,
            icon: "/assets/red.png"
          }

          this.markers.push(m);
          this.jsonArray.push(d);
          // this.originalJsonArray.push(d);

          this.latFirst = this.markers[0].lat;
          this.longFirst = this.markers[0].long;
        }
      });
  }

  showLocation(data, index) {
    console.log(index);
    this.zoom = 15;
    var indexOfMark = this.jsonArray.indexOf(data);
    this.markers[indexOfMark]['icon'] =  "/assets/green.png";
    console.log(indexOfMark);
    this.latFirst = data.location['lat'];
    this.longFirst = data.location['long'];
  }

  showFullDesc(data, index, type) {

    var indexOf = this.jsonArray.indexOf(data);
    if (type == 'more') {
      this.jsonArray[indexOf]['isFullDesc'] = true;
    } else {
      this.jsonArray[indexOf]['isFullDesc'] = false;
    }
    console.log(this.jsonArray[indexOf]['isFullDesc']);
    console.log(this.jsonArray[indexOf]['fullDesc'])
  }

  search() {
    console.log(this.searchText);
    if (this.searchText) {
      var filterArray = _.filter(this.jsonArray,  {  'name': this.searchText });
      this.jsonArray = new Array();
      this.jsonArray = filterArray;

      if (this.jsonArray.length == 0) {
        var descArr = _.filter(this.jsonArray,  {  'description': this.searchText });
        this.jsonArray = new Array();
        this.jsonArray = descArr;
      }

      // for(var v in filterArray) {
      //   this.jsonArray.push(v);
      // }
      console.log(this.jsonArray);
    } else {
      this
        .jsonService
        .getJson()
        .subscribe((data: any) => {
          this.jsons = data;
          this.jsonArray = new Array();
          this.markers = new Array();
          for (var i in data) {

            var desc = data[i].description;
            var isBig = false;
            if (data[i].description && data[i].description.length >= 25) {
              desc = data[i].description.substring(0, 25);
              isBig = true;
            }

            var d = {
              id: i,
              "name": data[i].name,
              "description": desc,
              "fullDesc": data[i].description,
              "logo": data[i].logo,
              "location": data[i].location,
              "isBig": isBig,
              "isFullDesc": false
            }
            var lat = data[i].location['lat'];
            var long = data[i].location['long'];
            var m = {
              lat: lat,
              long: long,
              draggable: false,
              icon: "/assets/red.png"
            }

            this.markers.push(m);
            this.jsonArray.push(d);

            this.latFirst = this.markers[0].lat;
            this.longFirst = this.markers[0].long;
          }
        });
    }
  }

  refresh() {
    location.reload();
  }
}
