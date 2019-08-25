import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { UserService } from '../../services/user.service';
import { Storage } from '@ionic/storage';
import { tap } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  username: string = "";
  password: string = "";

  constructor( 
    private router: Router, 
    private userserv: UserService, 
    private toastCont: ToastController,
    private loadingCont: LoadingController,
    private storage: Storage 
  ) { }

  ngOnInit() {
  }

  // processlogin_2(){
  //   this.router.navigate(['/home']);
  // }
  
  async processlogin(){
    let valid: string = '';
    if(this.username == '') valid = 'Ingrese un Usuario.';
    else if(this.password == '') valid = 'Ingrese una Contraseña.';
    if (valid != '') {
      const toast = await this.toastCont.create({
        message: valid,
        duration: 2000,
        color: 'warning'
      });
      toast.present();
    }else{
      let param = {
        username: this.username,
        password: this.password,
        aksi: 'loginuser'
      };
      this.userserv.postDatos(param).subscribe(async data => {
        this.presentLoadingWithOptions();        
        this.username = '';
        this.password = '';
        let msg: string = data['msg'];
        if(data['success']){
          this.storage.set('session_storage', data['result']);
          this.router.navigate(['/home']);
        }
        const toast = await this.toastCont.create({
          message: msg,
          duration: 2000
        });
        toast.present();
      }, error => {
        console.log("Error occured : 3" + JSON.stringify(error));
      });
    }    
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingCont.create({
      spinner: null,
      duration: 1000,
      message: 'Cargando...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  doRefresh(event) {
    setTimeout(() => {
      this.storage.get('session_storage').then((res)=>{
        if(res != null){
          this.router.navigate(['/home']);
        }    
      });
      event.target.complete();
    }, 900);
  }

}
