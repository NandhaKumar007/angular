import { Component, OnInit, ViewChild, ElementRef, NgZone, Inject, PLATFORM_ID } from '@angular/core';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import { isPlatformBrowser, DOCUMENT } from '@angular/common';
declare const OSMPICKER: any;
import { DynamicAssetLoaderService } from '../../services/dynamic-asset-loader.service';
import {
  MapsAPILoader
} from '@agm/core';
import { Router } from '@angular/router';
import Pickr from '@simonwep/pickr';
import { ApiService } from '../../services/api.service';
import { CommonService } from '../../services/common.service';
declare const $: any;

@Component({
  selector: 'app-create-card',
  templateUrl: './create-card.component.html',
  styleUrls: ['./create-card.component.scss']
})
export class CreateCardComponent implements OnInit {
  title: string = 'AGM project';
  latitude: number;
  longitude: number;
  zoom: number;
  address: string;
  private geoCoder;
  locinfo : any = {};

  @ViewChild('search')
  public searchElementRef: ElementRef;
  osmAssetLoaded: boolean;
  pageLoader: boolean; userStatus: boolean;
  cardbg : String; cardcolor : String; 
  cardForm: any = { phone: [{}], email: [{}], socialmedia: [{}], tags:[{}] };
  public items = [
    // {display: 'Test', value: 1}   
  ];
  public files: any[]; imgURL: any;
  provider: any = new OpenStreetMapProvider();
  suggestions: any = [];
  btnloder: boolean;
  btn_alert1 = false;
  btn_alert2 = false;
  // submit_btn = false;
  logo_alert = false;
  showElement = true;


  constructor(private assetLoader: DynamicAssetLoaderService, @Inject(PLATFORM_ID) private platformId: Object,@Inject(DOCUMENT) private document, public commonService: CommonService,private router: Router, private api: ApiService, private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone) { }

  ngOnInit(): void {
    this.loader();
    if(isPlatformBrowser(this.platformId)) {
      this.assetLoader.load('leaflet-css', 'leaflet-js', 'OSMLocationPicker').then(data => {
        this.osmAssetLoaded = true;
      }).catch(error => console.log("err", error));
    }
     this.cardForm.tags = this.items;
    const pickr = new Pickr({
      el: '.color-picker',
      default: '#000000',
      theme: 'nano',
      lockOpacity: true,
      useAsButton : true,
  
      swatches: [
        'rgba(255, 255, 255, 1)',
        'rgba(233, 30, 99, 0.95)',        
      ],
  
      components: {
        preview: true,
        opacity: true,
        hue: true,
  
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          clear: true,
          save: true,
        }
      }
    });

    const pickr1 = new Pickr({
      el: '.color-picker1',
      default: '#000000',
      theme: 'nano',
      lockOpacity: true,
      useAsButton : true,
  
      swatches: [
        'rgba(255, 255, 255, 1)',
        'rgba(233, 30, 99, 0.95)',        
      ],
  
      components: {
        preview: true,
        opacity: true,
        hue: true,
  
        interaction: {
          hex: true,
          rgba: true,
          input: true,
          clear: true,
          save: true,
        }
      }
    });

    pickr.on('change', (color, instance) => {
    this.cardbg = color.toRGBA().toString(2);    
    this.cardForm.cardcolor =  color.toRGBA().toString(2);
    })

    pickr1.on('change', (color, instance) => {
      this.cardcolor = color.toRGBA().toString(2); 
      this.cardForm.textcolor = color.toRGBA().toString(2); 
    })

  
    
    if(localStorage.getItem("customer_token")) 
    {
      this.pageLoader = true;
      console.log(localStorage.getItem("customer_token"));
    }
    else 
    {
        this.router.navigate(["/login"]);
    }
    this.getGeoLocation();
  }

  openMap()
  {
    if(isPlatformBrowser(this.platformId)) {
    if(this.osmAssetLoaded) this.loadOSM(this.locinfo);
    }
  }
  

  loadOSM(coor) {
    if(isPlatformBrowser(this.platformId)) {
      setTimeout(() => { OSMPICKER.initmappicker(coor.lat, coor.lng); }, 500);
    }
  }

  myfunction()
  {
    this.cardForm.address = this.document.getElementById("loc_address").value;
  }


  getGeoLocation() {
    if(navigator.geolocation) {
      this.getPosition().then(pos=> {
        console.log('geooooo',pos)
        let coor = { lat: pos.lat, lng: pos.lng };
        this.locinfo = coor;

        // if(isPlatformBrowser(this.platformId)) {
        //   if(this.osmAssetLoaded) this.loadOSM(coor);
        // }
       
      }).catch(err=> { console.log(err) });
    }
    else {
    }
  }

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resp => { resolve({lat: resp.coords.latitude, lng: resp.coords.longitude}); },
      err => { reject(err); });
    });
  }

  searchRelatedLoc() {
    if(this.cardForm.loc_search.length>=3) {
      this.provider.search({ query: this.cardForm.loc_search }).then((data) => {
        this.suggestions = data;
      });
    }
    else this.suggestions = [];
  }

  onSelectSuggestion(locInfo) {
    if(isPlatformBrowser(this.platformId)) {
      this.document.getElementById('latitude').value = locInfo.y;
      this.document.getElementById('longitude').value = locInfo.x;
      this.cardForm.loc_search = locInfo.label;
      this.suggestions = [];
      console.log("test");
      // $('#selector').change();  
      // $("#latitude").trigger("change");
    }
  }

// //  / Get Current Location Coordinates
//   private setCurrentLocation() {
//     if ('geolocation' in navigator) {
//       navigator.geolocation.getCurrentPosition((position) => {
//         this.latitude = position.coords.latitude;
//         this.longitude = position.coords.longitude;
//         this.zoom = 8;
//         this.getAddress(this.latitude, this.longitude);
//         console.log("map",this.getAddress(this.latitude, this.longitude))
//         let coor = { lat: this.latitude, lng: this.longitude };
//         if(isPlatformBrowser(this.platformId)) {
//           setTimeout(() => { OSMPICKER.initmappicker(coor.lat, coor.lng); }, 500);
//         }
//       });
//     }
//   }


  // markerDragEnd($event: google.maps.MouseEvent) {
  //   console.log($event);
  //   this.latitude = $event.latLng.lat();
  //   this.longitude = $event.latLng.lng();
  //   this.getAddress(this.latitude, this.longitude);
  //   console.log(this.getAddress(this.latitude, this.longitude))
  // }

  // getAddress(latitude, longitude) {
  //   this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
  //     console.log(results);
  //     console.log(status);
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.zoom = 12;
  //         this.address = results[0].formatted_address;
  //       } else {
  //         console.log('No results found');
  //       }
  //     } else {
  //       console.log('Geocoder failed due to: ' + status);
  //     }

  //   });
  // }

  fileChangeListener(event) {
    if(event.target.files && event.target.files[0]) { 
      console.log(event.target.files[0].name);
      this.cardForm.logoname = event.target.files[0].name;
      let reader = new FileReader();
      reader.onload = (event: ProgressEvent) => {
        this.cardForm.image = (<FileReader>event.target).result;
        this.cardForm.img_change = true;
        this.imgURL = reader.result; 
      }
      reader.readAsDataURL(event.target.files[0]);
      // this.submit_btn = true;
      this.logo_alert = false;
      this.btnloder=false;
    }
  }

  // removeat(i:number) {
  //  console.log(i);
  // }

  onAdd() 
  {
    if(this.cardForm.logoname ){
      this.btnloder=true;
      this.cardForm.submit = true;    
      this.cardForm.user_id = localStorage.getItem("userid");
      this.cardForm.useremail = localStorage.getItem("useremail");
      console.log('name',this.cardForm.name);
      console.log('tags',this.cardForm.tags);
      this.api.ADD_MYCARD(this.cardForm).subscribe(result => {
        console.log(result)
      this.cardForm.submit = false;
      this.btnloder=false;
      if(result.status) 
      {
        
        if(result.message === "card created successfully"){
          this.btn_alert1=true;
          this.btn_alert2=false;
          setTimeout(()=>this.router.navigate(["/home"]),1000)
          // this.router.navigate(["/home"]);
        }else{
          this.btn_alert1=false;
          this.btn_alert2=true;
        }
      }
      else 
      {
      this.cardForm.errorMsg = result.message;
      console.log("response", result);
      }
      });
    }else{
      this.logo_alert = true;
    }
      
  }

  loader(){
    this.showElement = true;
    setTimeout(() => {
      this.showElement = false;
    }, 500);
}


}
