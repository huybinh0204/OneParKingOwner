import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, MenuController } from '@ionic/angular';
import { ApiService } from '../service/api.service';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  id: string;
  search = '';
  mySpaceData: any = {};
  bookingData: any = [];
  type = 'owner';
  constructor(private ntrl: NavController, private menu: MenuController, private api: ApiService,
              private androidPermissions: AndroidPermissions) {
    this.menu.enable(true);
    this.id = localStorage.getItem('defaultParking');
    this.type = localStorage.getItem('userType') || 'owner';
  }
  ngOnInit() {
    this.api.startLoader();
    // console.log("ssss",this.id);
    this.api.authGetReq('space/' + this.id).subscribe((res: any) => {
      console.log('res1', res);
      this.api.dismissLoader()

      this.mySpaceData = res.data.space;
      this.bookingData = res.data.booking;
    }, err => {
      this.api.dismissLoader();

      console.error('err', err);
    });
    this.menu.enable(true);
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA]).then(() => {}, (err) => {});
  }
  ionViewWillEnter() {

  }
  formatCash(str) {
    const a = String(str);
    return a.split('').reverse().reduce((prev, next, index) => {
      return ((index % 3) ? next : (next + ',')) + prev
    })
  }


  mapView() {
    this.ntrl.navigateForward('home-map');
  }
  editSpace() {
    this.ntrl.navigateForward('edit-space');
  }
  bookingDisplay(id) {
    this.ntrl.navigateForward('scanner/' + id);
  }
  parkDetailDisplay(id) {
    // console.log("his.type",this.type);
    if(this.type == 'owner'){
      this.ntrl.navigateForward('list-details/'+id);
    }
  }
  parkingView() {
    this.ntrl.navigateForward('live-parking');

  }
}
