import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import {BsModalRef, BsModalService} from 'ngx-bootstrap/modal';
import { ImageCroppedEvent } from 'ngx-image-cropper';

@Component({
  selector: 'app-manage-stories',
  templateUrl: './manage-stories.component.html',
  styleUrls: ['./manage-stories.component.sass']
})
export class ManageStoriesComponent implements OnInit {
  imageChangedEvent: any = '';
  croppedImage: any = '';

  
  search = '';
  selectImages = [{id: '1', name: 'assets/images/imagen1Small.png', image: 'assets/images/imagen1.png'},
                  {id: '2', name: 'assets/images/imagen2Small.png', image: 'assets/images/imagen2.png'},
                  {id: '3', name: 'assets/images/imagen3Small.png', image: 'assets/images/imagen3.png'},
                  {id: '4', name: 'assets/images/imagen4Small.png', image: 'assets/images/imagen4.png'}];

  fase = 1;
  patron = false;
  idPatronImage = 0;

  textStory = 'escribe algo'

  mystories = [{
    date: '20-12-2019',
    stories: [{id: 'asdasd'},
              {id: 'asdasd'},
              {id: 'asdasd'},
              {id: 'asdasd'}]
  },
  {
    date: '19-12-2019',
    stories: [{id: 'asdasd'},
              {id: 'asdasd'}]
  },
  {
    date: '18-12-2019',
    stories: [{id: 'asdasd'},
              {id: 'asdasd'},
              {id: 'asdasd'},
              {id: 'asdasd'},
              {id: 'asdasd'}]
  }];
  files = [];
  activeAddColor = false;
  constructor(private modalService: BsModalService) { }
  modalRef: BsModalRef;
  @ViewChild('formStory') modal: TemplateRef<any>;
  modalConfig = {
    class: 'modal-lg modal-dialog-centered',
    keyboard: true,
    ignoreBackdropClick: true
  };

  ngOnInit(): void {
  }

  openModal() {
    this.modalRef = this.modalService.show(this.modal, this.modalConfig);
  }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);
    this.imageChangedEvent = event.addedFiles[0];
    this.fase = 2;
    this.patron = false;
  }
   
  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = this.base64ToFile(
      event.base64,
      'Imagen1',
    )
    console.log(this.croppedImage); // AQUI SE QUEDA LA VARIABLE
  }

  backFile() {
    this.patron = false; 
    this.fase = 1;
    this.files.splice(this.files.indexOf(event), 1);
  }


  base64ToFile(data, filename) {

    const arr = data.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);

    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

}
