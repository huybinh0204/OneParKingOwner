import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { ApiService } from './../../service/api.service';
import {log} from 'util';

@Component({
  selector: 'app-park-address',
  templateUrl: './park-address.page.html',
  styleUrls: ['./park-address.page.scss']
})
export class ParkAddressPage implements OnInit {
  guardData = [];

  data: any = {};
  segment = 'basic';
  parkingZone: Array<any> = [];
  lat = 20.987;
  lng = 105.879;
  markerD = true;
  facilities: any = [];
  error: any = {};
  constructor(private ntrl: NavController, private api: ApiService) {
    this.data.lat = this.lat;
    this.data.lng = this.lng;
    this.api.getWithAuth('facilities').subscribe(
      (res: any) => {
        this.facilities = res.data;
      },
      err => {
        console.error('err', err);
      }
    );
  }
  ionViewWillEnter() {
    this.api.startLoader();

    this.api.authGetReq('available/guard').subscribe(
      (res: any) => {
        this.guardData = res.data;
        this.api.dismissLoader();
      },
      err => {
        this.api.dismissLoader();
        console.error('err', err);
      }
    );
  }
  ngOnInit() {}

  addNewZone() {
    this.parkingZone.push({
      name: '',
      size: 0
    });
  }
  markerChange(e) {
    this.data.lat = e.coords.lat;
    this.data.lng = e.coords.lng;
  }
  removeZone(index: number) {
    this.parkingZone.splice(index, 1);
  }
  addNewGuard() {
    this.ntrl.navigateForward('park-guard');
  }
  getTextEvent(event) {
    console.log("event",event);
    // this.ntrl.navigateForward('park-guard');
  }
  parkSpace() {
    this.api.startLoader();
    if (this.data.available_all_day) {
      this.data.available_all_day = 1;
    } else {
      this.data.available_all_day = 0;
    }
    if (this.data.offline_payment) {
      this.data.offline_payment = 1;
    } else {
      this.data.offline_payment = 0;
    }
    this.data.address =
      this.data.address +
      ' ' +
      this.data.city +
      ' ' +
      this.data.postal +
      ' ' +
      this.data.state +
      ' ' +
      this.data.country;
    const datasd = {
      lat:this.lat,
      lng: this.lng,
      title: this.data.title,
      description:this.data.description,
      phone_number:this.data.phone_number,
      price_par_hour:this.data.price_par_hour,
      facilities:this.data.facilities,
      available_all_day:this.data.available_all_day,
      open_time: this.data.open_time,
      close_time: this.data.close_time,
      offline_payment: this.data.offline_payment,
      address: this.data.address,
      city: this.data.city,
      country: this.data.country,
      postal: this.data.postal,
      state: this.data.state,
      parkingZone: this.data.parkingZone,
      guardList: this.data.guardList,
    }
    //description: mieu ta
    //phone_number: sddt
    //price_par_hour: gia theo gio
    //facilities: cow sowr vaatj chaats
    //available_all_day: hoat dong
    //open_time:  owr cuwar
    //close_time:  ddongs cuwar
    //offline_payment:  thanh toasn onl
    //address: "undefined 1 2 3 4" ddiaj chir chi tieets ngor ngachs
    //city: "1" thanhf phoos
    //country: "4" ddaats nuwocs
    //postal: "2" ma bieeu ddiee
    //state: "3" khu vuwcj
    //parkingZone: Khu A, khu B

    this.data.parkingZone = this.parkingZone;
    console.log("datasd",datasd);
    if(this.parkingZone != undefined){
      console.log("1");
    }else {
      console.log("2");
    }
    // console.log("space",this.data);
    this.api.authPostReq('space', this.data).subscribe(
      (res: any) => {
        this.api.dismissLoader();
        if (res.success === true) {
          this.api.presentToast(res.msg);
          this.ntrl.navigateForward(['home-map']);
        }
      },
      err => {
        console.log("......",err);
        this.api.dismissLoader();
        console.error('err', err);
        if (err.status === 422) {
          this.error = err.error.errors;
          alert("Không thể thêm bảo vệ!")
          // this.api.presentToast(err.error.message);
        }
      }
    );
  }
}
