import { Component } from '@angular/core';

import { Platform, NavController } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { menuController } from '@ionic/core';
import { ApiService } from './service/api.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  public appPages = [
    {
      title: 'Trang chủ',
      url: '/home',
      // icon: 'assets/icon-image/home-icon.svg',
      icon: 'home',
      for: 1
    },
    // {
    //   title: 'Quản lý phí dịch vụ',
    //   url: '/plan-detail',
    //   // icon: 'assets/icon-image/user.svg',
    //   icon: 'card',
    //   for: 2
    // },
    {
      title: 'Quản lý bảo vệ',
      url: '/guard-list',
      // icon: 'assets/icon-image/policeman.svg',
      icon: 'contacts',
      for: 2
    },
    {
      title: 'Quản lý bãi xe',
      url: '/park-address',
      // icon: 'assets/icon-image/menu-pin.svg',
      icon: 'pin',
      for: 2
    },
    {
      title: 'Thống kê giao dịch',
      url: '/transaction',
      // icon: 'assets/icon-image/dollar-coin.svg',
      icon: 'logo-usd',
      for: 2
    },
    // {
    //   title: 'Thư viện ảnh',
    //   url: '/images',
    //   // icon: 'assets/icon-image/dollar-coin.svg',
    //   icon: 'images',
    //   for: 1
    // },

    {
      title: 'Review',
      url: '/review',
      // icon: 'assets/icon-image/review-icon.svg',
      icon: 'text',
      for: 1
    },
    {
      title: 'Quét QR',
      url: '/scanner',
      // icon: 'assets/icon-image/scannner-menu.svg',
      icon: 'barcode',
      for: 1
    },
    {
      title: 'Hồ sơ',
      url: '/owner-detail',
      // icon: 'assets/icon-image/user.svg',
      icon: 'person',
      for: 1
    },
  ];
  profileData: any = {};
  type = 'owner';
  userLevel = 2;
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private ntrl: NavController,
    private api: ApiService
  ) {
    if (!localStorage.getItem('token')) {
      localStorage.clear();
      this.ntrl.navigateRoot('login');
    }
    this.initializeApp();
    this.api.generateURL();

    this.api.authGetReq('profile').subscribe(
      res => {
        console.log('res', res);
        this.type = localStorage.getItem('userType') || 'owner';
        this.profileData = res;
        if (this.type === 'guard') {
          this.userLevel = 1;
          localStorage.setItem('defaultParking', this.profileData.space_id);
        } else {
          this.userLevel = 2;
        }
      },
      err => {
        console.error('err', err);
      }
    );
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#007bff');
      this.splashScreen.hide();
    });
  }
  closeMenu() {
    menuController.close();
  }
  SignOut() {
    menuController.close();
    localStorage.removeItem('token');
    localStorage.removeItem('userType');
    localStorage.removeItem('defaultParking');
    this.ntrl.navigateForward(['login']);
  }
  setting() {
    menuController.close();
    this.ntrl.navigateForward(['setting']);
  }
}
