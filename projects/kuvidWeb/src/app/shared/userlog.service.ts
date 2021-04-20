import { Injectable } from '@angular/core';

import { LocalStorage as lstge } from './local-storage.service'
@Injectable({
  providedIn: 'root'
})
export class UserlogService {
  coloresLogo = {
    first: '#6D40F3',
    second: '#FE00C5',
    third: '#F72930'
  };
  userLetters = 'L';
  // tslint:disable: max-line-length

  public userStudioActive = '0';
  
  constructor() { }

  public setActivedAccount (data: any, type: string) {
    lstge.set('actived_account', {
      id: data.id,
      name: data.name ?? data.firstName + ' ' + data.lastName,
      fullName: data.name ?? data.firstName + ' ' + data.lastName,
      profilePicture: data.logo ?? data.profilePicture,
      is: type
    });
    window.location.reload()
  }

  public getUser() {
    if (lstge.get('user_kuvid')) {
      return lstge.get('user_kuvid') ;
    }
  }


  getRandomColor() {
    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }

  formatNumber(number) {
    return Math.floor(number)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,');
  }

  dateFormat(date: Date) {
    let [year, month, day] = [ date.getFullYear(), String(date.getMonth()+1), String(date.getDate())];
    if (Number(day) < 10) day = '0' + day;
    if (Number(month) < 10) month = '0' + month;
    return (year === 1900) ? '00/00/0000' : `${day}/${month}/${year}`;
  }

  currencyFormatter(params) {
    return '$ ' + this.formatNumber(params);
  }

  base64ToFile(base64Text: string, filename: string) {
    var arr = base64Text.split(','),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), 
        n = bstr.length, 
        u8arr = new Uint8Array(n);
        
    while(n--){
        u8arr[n] = bstr.charCodeAt(n);
    }
    
    return new File([u8arr], filename, {type:mime});
  }

  // Validations
  emailIsValid(email: string){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  isBase64(str: string) {
    try {
        return btoa(atob(str)) == str;
    } catch (err) {
        return false;
    }
  }

  isValidURL(str: string){
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
    return !!pattern.test(str);
  }

  urlToObject(imag, mimetype) {

    let img = new Image();
    img.src = 'https://firebasestorage.googleapis.com/v0/b/kuvid-280002.appspot.com/o/itemsFiles%2F1612051741417_md.png?alt=media&token=454473d9-7b25-4ba6-b017-6f4b62cd207c';
    
    // Create canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    // Set width and height
    canvas.width = img.width;
    canvas.height = img.height;
    // Draw the image
    ctx.drawImage(img, 0, 0);
    console.log(canvas.toDataURL('image/png'));
    

    // // Create canvas
    // const canvas = document.createElement('canvas');
    // const ctx = canvas.getContext('2d');
    // // Set width and height
    // canvas.width = img.width;
    // canvas.height = img.height;
    // // Draw the image
    // ctx.drawImage(img, 0, 0);
    // return canvas.toDataURL('image/jpeg');
 }
}
