import {Component, ElementRef, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import { ConnectService } from '../../services/connect.service';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {
  name = '';
  email = '';
  notes = '';
  city = '';
  isCompany = false;
  testname = false;
  send = false;
  siteKey = 'google.com';

  emailMessage = '';
  cityMessage = '';

  videoactive = false;

  visibility= '';
  
  constructor(public connect: ConnectService, private translate: TranslateService, private modalService: BsModalService) { }
  @ViewChild('videoplayer') videoPlayer: ElementRef;
  modalRef: BsModalRef;
  @ViewChild('formLanding') modal: TemplateRef<any>;
  modalConfig = {
    class: 'modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };
  ngOnInit() {
    this.translate.setDefaultLang('es');
    /* this.recaptchaV3Service.execute('importantAction')
      .subscribe((token) => this.handleToken(token), (error) => console.log('Error Captcha')); */
    this.videoactive = true;
    setTimeout(() => {
      this.videoPlayer.nativeElement.muted = true;
      this.videoPlayer.nativeElement.play();
      this.videoPlayer.nativeElement.loop = true;
      this.videoPlayer.nativeElement.addEventListener("timeupdate", function(){
        if(this.currentTime >= 64) {
            this.pause();
        }
    });
    }, 10);
    
    
  }

  


  onMouseMove(e, template) {
    const windowWidth = window.innerWidth / 5;
    const windowHeight = window.innerHeight / 5 ;

    const mouseX = e.clientX / windowWidth;
    const mouseY = e.clientY / windowHeight;
  
    template.style.transform = `translate3d(-${mouseX}%, -${mouseY}%, 0)`;
  }

  validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  }


  changeemail() {
    this.emailMessage = '';
  }

  changeName() {
    this.testname = false;
  }


  ejecutarCapcha(capRef: any) {
 
    capRef.execute()
  }

  sendInformation(token) {
    console.log(token);
    if (this.validateEmail(this.email)) {
      if(this.name) {
        this.connect.sendemail(this.name, this.email, this.city, token).subscribe(
          datos => {
            this.send = true;
            this.name = '';
            this.email = '';
            this.city = '';
          }, error => {
            console.log(error);
            if (error.error.message === 'Record already registered') {
              this.emailMessage = 'emailexist';
            } else {
              this.cityMessage = 'errorServer';
            }
            
          }
        )
      } else {
        this.testname = true;
      }
    } else {
      this.emailMessage = 'emailinvalid';
    }
    
  }

  okSent(captchaRef){
    if (this.send){
      this.modalRef.hide();
      this.send = false;
    } else {
      this.ejecutarCapcha(captchaRef);
    }
  }

  abrirmodal() {
    this.modalRef = this.modalService.show(this.modal, this.modalConfig);
  }


  goface() {
    window.open('https://www.facebook.com/kuvidmarketplace/');
  }

  goinsta() {
    window.open('https://www.instagram.com/ku_vid/');
  }

}
