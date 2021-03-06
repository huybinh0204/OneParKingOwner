import { Injectable } from '@angular/core';

import { ToastController, LoadingController } from '@ionic/angular';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import {  ENDPOINT_URL } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseURL = ENDPOINT_URL;
  public startTime: any;

  public endTime: any;
  public myParkingSlot: string;
  loading: HTMLIonLoadingElement;
  type: string | number;

  constructor(
      private http: HttpClient,
      public toastController: ToastController,
      public loadingController: LoadingController
  ) {
    this.type = localStorage.getItem('userType') || 'owner' + '/';
    console.log(' this.baseURL ', this.baseURL);
  }
  async startLoader() {
    this.loadingController
        .create({
          duration: 1000,
          message: ``
        })
        .then(a => {
          a.present().then(() => {});
        });
  }
  async dismissLoader() {
    return await this.loadingController.dismiss().then(() => {});
  }
  public postWithAuth(endPoint: string, data: any) {
    console.log("postWithAuth",endPoint);
    console.log("postWithAuth",this.baseURL+endPoint);
    return this.http.post(`${this.baseURL}${endPoint}`, data);
  }
  public getWithAuth(endPoint: string) {
    console.log("getWithAuth",endPoint);
    console.log("getWithAuth",this.baseURL+endPoint);
    return this.http.get(`${this.baseURL}${endPoint}`);
  }
  async presentToast(msg) {
    const toast = await this.toastController.create({
      message: msg,
      duration: 2000
    });
    toast.present();
  }

  public authPostReq(endPoint: string, data: any) {
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log("authPostReq",endPoint);
    console.log("authPostReq",this.baseURL+endPoint);
    return this.http.post(`${this.baseURL}${endPoint}`, data, { headers });
  }
  public authPostReqImageUpoad(endPoint: string, data: any) {
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.set('Accept', 'application/json');
    console.log("authPostReqImageUpoad",this.baseURL+endPoint);
    console.log("authPostReqImageUpoad",this.baseURL+endPoint);
    return this.http.post(`${this.baseURL}${endPoint}`, data, { headers });
  }
  public authUpdateReq(endPoint: string, data: any) {
    // data._method = "PUT";

    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log("authUpdateReq",endPoint);
    console.log("authUpdateReq",this.baseURL+endPoint);
    console.log("token",tok);
    console.log("Authorization",headers);
    return this.http.post(`${this.baseURL}${endPoint}`, data, { headers });
  }
  public authDeleteReq(endPoint: string,data:any) {
    // data._method = "PUT";
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log("authDeleteReq",endPoint);
    console.log("authDeleteReq",this.baseURL+endPoint);
    return this.http.post(`${this.baseURL}${endPoint}`, data, { headers });
  }
  public authGetReq(endPoint: string) {
    const tok = 'Bearer ' + localStorage.getItem('token');
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', tok);
    headers = headers.set('Accept', 'application/json');
    console.log("authGetReq",endPoint);
    console.log("authGetReq",this.baseURL+endPoint);
    return this.http.get(`${this.baseURL}${endPoint}`, { headers });
  }
  public generateURL() {
    this.baseURL = ENDPOINT_URL;
    this.type = localStorage.getItem('userType') || 'owner';
    this.baseURL += this.type + '/';
  }

  public forgotPsw(data) {
    return this.http.post(ENDPOINT_URL + '/owner/forgot', data);
  }
}
