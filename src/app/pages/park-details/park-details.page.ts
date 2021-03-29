import { Component, OnInit } from '@angular/core';
import {AlertController, ModalController, NavController} from '@ionic/angular';
import { ApiService } from './../../service/api.service';
import {Camera, CameraOptions} from '@ionic-native/camera/ngx';
import {ActivatedRoute} from '@angular/router';
import {AndroidPermissions} from '@ionic-native/android-permissions/ngx';

@Component({
    selector: 'app-park-details',
    templateUrl: './park-details.page.html',
    styleUrls: ['./park-details.page.scss']
})
export class ParkDetailsPage implements OnInit {
    profileData: any = {};
    error: any = {};
    id: string;


    constructor(
        private modalController: ModalController,
        private ntrl: NavController,
        public activeRoute: ActivatedRoute, private api: ApiService, private androidPermissions: AndroidPermissions) {
        this.id = this.activeRoute.snapshot.paramMap.get('id');
    }
    ngOnInit() {
        console.log("id",this.id)
        this.api.startLoader();
        if (this.id){
            this.api.authGetReq('guard/'+this.id).subscribe(
                res => {
                    // @ts-ignore
                    console.log('profileData profile', res.data)
                    // @ts-ignore
                    this.profileData = res.data;
                    this.api.dismissLoader();
                },
                err => {
                    this.api.dismissLoader();
                    console.error('err', err);
                }
            );
        }
    }
}
