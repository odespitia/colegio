import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  username: string;
  anggota: any;

  componentes: Componente[] = [
    {
      icon: 'american-football',
      name: 'Sincronizar',
      redirectTo: '/sincronizar'
    },
    {
      icon: 'appstore',
      name: 'Ingreso QR Off-line',
      redirectTo: '/qroffline'
    },
    {
      icon: 'appstore',
      name: 'Ingreso QR On-line',
      redirectTo: '/qronline'
    }
  ];

  constructor( 
    private router: Router, 
    private userserv: UserService, 
    private toastCont: ToastController,
    private storage: Storage 
  ) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.storage.get('session_storage').then((res)=>{
      if(res == null){
        this.router.navigate(['/']);
      }else{
        this.anggota = res;
        this.username = this.anggota.username;
      }      
    });
  }

  async proccessLogout(){
    this.storage.clear();
    this.router.navigate(['/']);
    const toast = await this.toastCont.create({
      message: 'Session Cerrada',
      duration: 2000
    });
    toast.present();
  }

}

interface Componente {
  icon: String;
  name: String;
  redirectTo: String;
}