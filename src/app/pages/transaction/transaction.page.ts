import {Component, OnInit} from '@angular/core';
import {AlertController, NavController} from '@ionic/angular';
import {ApiService} from './../../service/api.service';

@Component({
    selector: 'app-transaction',
    templateUrl: './transaction.page.html',
    styleUrls: ['./transaction.page.scss']
})
export class TransactionPage implements OnInit {
    constructor(private ntrl: NavController, private api: ApiService) {
    }

    sort_data: any = {
        start_date: new Date().toISOString(),
        end_date: new Date().toISOString()
    };
    vehicle: any = [
        {
            id: 1,
            method: 'WALLET',
            name: 'Ví',
        },
        {
            id: 2,
            method: 'CASH',
            name: 'Tiền mặt',
        },
    ];
    is_date: any = [
        {
            id: 1,
            method: 'MONTH',
            name: 'Tháng',
        },
        {
            id: 2,
            method: 'WEEK',
            name: 'Tuần',
        },
        {
            id: 3,
            method: 'DAY',
            name: 'Ngày',
        },
    ];
    search = '';
    type = 'day';
    transactionData: any = {};
    is_bdxdata: any = [{}];
    is_vehicle: string;
    is_time: string;
    is_space_id: string;

    ngOnInit() {
        this.api.startLoader();
        const id = localStorage.getItem('defaultParking');
        const data = {
            space_id: null,
            type_time: 'MONTH',
            method: 'WALLET'
        };
        this.api.authDeleteReq(`transaction`, data).subscribe(
            (res: any) => {
                console.log('res', res);
                this.transactionData = res.data;
                this.api.dismissLoader();
            },
            err => {
                this.api.dismissLoader();
                console.error('err', err);
            }
        );
        this.GetBDX();
    }

    GetBDX() {
        this.api.authGetReq('space').subscribe((res: any) => {
            this.is_bdxdata = res.data;
            console.log('space', res.data);
        }, err => {
            console.error('err', err);
        });
    }

    changeFil(type) {
        this.type = type;
    }

    selectChangeHandlerD(event: any) {
        console.log('event', event.target.value);
        if (this.is_vehicle == undefined) {
            this.is_vehicle = 'WALLET';
            this.is_space_id = null;
            this.is_time = event.target.value;
            this.apiChangeReq();
        } else {
            this.is_time = event.target.value;
            this.apiChangeReq();
        }
    }

    selectChangeHandlerS(event: any) {
        console.log('event', event.target.value);
        if (this.is_vehicle == undefined && this.is_time == undefined) {
            this.is_vehicle = 'WALLET';
            this.is_time = 'MONTH';
            this.is_space_id = event.target.value;
            this.apiChangeReq();
        } else if (this.is_vehicle != undefined && this.is_time == undefined) {
            this.is_time = 'MONTH';
            this.is_space_id = event.target.value;
            this.apiChangeReq();
        } else if (this.is_vehicle == undefined && this.is_time != undefined) {
            this.is_vehicle = 'WALLET';
            this.is_space_id = event.target.value;
        } else {
            this.is_space_id = event.target.value;
            this.apiChangeReq();
        }
    }

    selectChangeHandler(event: any) {
        console.log('event', event.target.value);
        if (this.is_time == undefined) {
            this.is_vehicle = event.target.value;
            this.is_time = 'MONTH';
            this.is_space_id = null;
            this.apiChangeReq();
        } else {
            this.is_vehicle = event.target.value;
            this.apiChangeReq();
        }

    }

    apiChangeReq() {
        this.api.startLoader();
        const space = this.is_space_id;
        const var_vehicle = String(this.is_vehicle);
        const var_time = String(this.is_time);
        const datas = {
            space_id: space,
            type_time: var_time,
            method: var_vehicle
        };
        console.log('111datas', datas);
        this.api.authDeleteReq(`transaction`, datas).subscribe(
            (res: any) => {
                console.log('res', res);
                this.transactionData = res.data;
                this.api.dismissLoader();
            },
            err => {
                this.api.dismissLoader();
                console.error('err', err);
            }
        );

    }

    formatCash(str) {
        const a = String(str);
        return a.split('').reverse().reduce((prev, next, index) => {
            return ((index % 3) ? next : (next + ',')) + prev;
        });
    }

    searchMe() {
        const id = localStorage.getItem('defaultParking');
        this.api.startLoader();

        console.log('this.sort_data: ', this.sort_data);
        if (this.sort_data.start_date && this.sort_data.end_date) {
            this.api
                .authPostReq(`transaction/${id}/custom`, this.sort_data)
                .subscribe(
                    (res: any) => {
                        // console.log("222",res);
                        this.api.dismissLoader();

                        this.transactionData = res.data;
                    },
                    err => {
                        console.error('err', err);
                        this.api.dismissLoader();
                    }
                );
        } else {
            this.api.presentToast('Please Select Data');
        }
    }
}
