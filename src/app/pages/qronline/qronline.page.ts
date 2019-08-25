import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { ToastController } from '@ionic/angular';
import { BarcodeScanner } from "@ionic-native/barcode-scanner/ngx";

@Component({
  selector: 'app-qronline',
  templateUrl: './qronline.page.html',
  styleUrls: ['./qronline.page.scss'],
})
export class QronlinePage implements OnInit {
  
  encodeData: any;
  scannedData: {};

  constructor(
    private barcodeScanner: BarcodeScanner, 
    private userserv: UserService,
    private toastCont: ToastController
  ) { }

  scanCode() {
    this.barcodeScanner
      .scan()
      .then(barcodeData => {
        //alert("Barcode data " + JSON.stringify(barcodeData));
        this.scannedData = barcodeData;
        if(this.scannedData['text']!='' && this.scannedData['format'] == 'text'){
          this.proccesalumno();
        }
      })
      .catch(err => {
        console.log("Error", err);
      });
  }

  async proccesalumno(){
    //this.scannedData;
    let param = {
      codigo: this.scannedData['text'],
      aksi: 'logingreso'
    };
    this.userserv.postDatos(param).subscribe(async data => {
      if(data['success']){
        console.log("Ingreso Satisfatorio." );
        const toast = await this.toastCont.create({
          message: 'Ingreso Satisfatorio.',
          duration: 2000
        });
        toast.present();
        //this.scanCode();
      }else{
        //console.log("Ingreso No Satisfatorio." );        
        const toast = await this.toastCont.create({
          message: 'Ingreso No Satisfatorio.',
          duration: 2000
        });
        toast.present();
        this.scanCode();
      }
    }, error => {
      console.log("Error occured : 3" + JSON.stringify(error));
    });
  }

  ngOnInit() {
  }

}
