import {Component, OnInit, Input} from '@angular/core';
import {NavController} from '@ionic/angular';
import {modalController} from '@ionic/core';
import {ApiService} from './../../service/api.service';

@Component({
    selector: 'app-delete-modal',
    templateUrl: './delete-modal.page.html',
    styleUrls: ['./delete-modal.page.scss'],
})
export class DeleteModalPage implements OnInit {
    @Input() id: string;
    @Input() path: string;

    constructor(private ntrl: NavController, private api: ApiService) {
    }
    booking: any = {};
    ngOnInit() {
        this.ntrl.navigateForward([`scanner/${this.id}`]);
        // this.api.authGetReq('booking/' + this.id).subscribe((res: any) => {
        //     this.booking = res.data;
        //     console.log('booking', res.data);
        //     this.api.dismissLoader();
        //
        // }, err => {
        //     console.error('err', err);
        //     this.api.dismissLoader();
        //
        // });
    }

    OKBtn() {
        this.api.startLoader();
        modalController.dismiss();
        const data = {
            status: 2,
            payment_status: 1,
            type: 3,
        };
        this.api.authPostReq('booking/' + this.id + '/update', data).subscribe((res: any) => {
            console.log('11111', res);
            // this.api.dismissLoader();
            this.ngOnInit()
        }, err => {
            // alert(err)
            console.error('err', err);
            this.api.dismissLoader();

        });
    }

    cancelBtn() {
        modalController.dismiss();
        this.ntrl.navigateForward([`scanner/${this.id}`]);
        // modalController.dismiss();
        //   this.ntrl.navigateForward(['transaction'])
    }
}
