import { Component } from '@angular/core';
import { MapsAPILoader, AgmCoreModule } from '@agm/core';
import { } from '@types/googlemaps';
import { ViewChild, ElementRef, NgZone } from '@angular/core';
import { DataService } from './services/data.service';
import { forEach } from '@angular/router/src/utils/collection';

export interface FoodChain {
  FoodChain: string;
  Name: string;
  Latitude: number;
  Longitude: number;
  Distance?: any;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [DataService]
})
export class AppComponent {
  @ViewChild('search') public searchElement: ElementRef;
  arNewFoodChains: FoodChain[] = [];
  placePicked: FoodChain = <FoodChain>{};
  IsClientCLickesSend: boolean = false;
  Distance: string = 'Distance';
  constructor(private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private service: DataService) { }
  ngOnInit() {
    this.mapsAPILoader.load().then(
      () => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElement.nativeElement, { types: ["address"] });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.placePicked.Name = place.name;
            this.placePicked.Latitude = place.geometry.location.lat();
            this.placePicked.Longitude = place.geometry.location.lng();
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }
          });
        });
      }
    );
    this.service.Get().subscribe(res => {
      res.json().forEach(x => {
        this.arNewFoodChains.push(x)
      })
    });

  }
  send() {
    for (let index = 0; index < this.arNewFoodChains.length; index++) {
      let currentLatitude = this.arNewFoodChains[index].Latitude;
      let currentLongitude = this.arNewFoodChains[index].Longitude;
      let calculteDistance = this.calculteDistance(
        currentLatitude,
        currentLongitude,
        this.placePicked.Latitude,
        this.placePicked.Longitude);
      this.arNewFoodChains[index].Distance = calculteDistance.toFixed(2);
    }
    this.IsClientCLickesSend = true;
  }
  calculteDistance(lat1, lon1, lat2, lon2) {
    var radlat1 = Math.PI * lat1 / 180;
    var radlat2 = Math.PI * lat2 / 180;
    var theta = lon1 - lon2;
    var radtheta = Math.PI * theta / 180;
    var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
    dist = Math.acos(dist);
    dist = dist * 180 / Math.PI;
    dist = dist * 60 * 1.1515;
    dist = dist * 1.609344;
    return dist
  }
}
