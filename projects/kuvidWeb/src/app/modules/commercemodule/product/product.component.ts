import { AfterViewChecked, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GalleryItem, ImageItem } from '@ngx-gallery/core';

import { UserlogService } from '../../../shared/userlog.service';
import { LocalStorage as lstge } from './../../../shared/local-storage.service';
import { ItemService } from '../../../services/item.service';
import { UserService } from '../../../services/user.service';
import { CartService } from '../../../shared/cart.service';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.sass']
})
export class ProductComponent implements OnInit, AfterViewChecked {
  
  galleryImages: any;
  temp: any;
  companies = [];
  sub: any;
  idItem: string;
  selectableFields = {};
  itemContent: any;
  commentText: string;
  moreCompanyItems: any;
  moreRelatedItems: any;
  vari = true;
  images: GalleryItem[];
  relativeHeight = '';
  imageSelected = '';
  variations = [];
  combinationPrices = [];
  combinationId = '';
  error = '';
  errorEmptySelection = false;
  inStock = true;

  // Cantidades
  quantities = [{id: 1, name: 1}, {id: 2, name: 2}, {id: 3, name: 3}, {id: 4, name: 4}, {id: 5, name: 5}, {id: 6, name: 6}, {id: 7, name: 7}, {id: 8, name: 8}, {id: 9, name: 9}, {id: 10, name: 10}, {id: 11, name: 11}, {id: 12, name: 12}, {id: 13, name: 13}, {id: 14, name: 14}, {id: 999, name: 'Otro'}];
  quantity = 1;
  quantityOther = '';

  constructor(
    public userlog: UserlogService, 
    private itemService: ItemService,
    private userService: UserService,
    private route: ActivatedRoute, 
    public router: Router,
    private cartService : CartService
  ) {

    this.sub = this.route.params.subscribe(params => {
      this.idItem = params['id'];
      this.getData();
   });
  }
  @ViewChild('contenedor') contenedor : ElementRef;
  ngAfterViewChecked() {
    setTimeout(() => {
      if(this.contenedor) {
        this.relativeHeight = this.contenedor.nativeElement.offsetWidth + 'px';
      }
    },10);
  }

  ngOnInit(): void { }

  getData(){
    this.getInfoItem();
  }

  async getInfoItem(){
    try {
      const data = await this.itemService.itemInfo(this.idItem);  
      if (!data['reviews']) data['reviews'] = [];
      this.itemContent = data;
      var images = [];
      for (var x in this.itemContent.media){
        let pic = this.itemContent.media[x];
        //images.push(new ImageItem({ src: pic.find(a => a.size === 'md')['url'], thumb: pic.find(a => a.size === 'md')['url'] }));

        const hasXSImage = (pic.find(a => a.size === 'xs'));
        images.push({
          small: (hasXSImage) ? pic.find(a => a.size === 'xs')['url'] : pic.find(a => a.size === 'md')['url'],
          large: (hasXSImage) ? pic.find(a => a.size === 'lg')['url'] : pic.find(a => a.size === 'md')['url'],
        })
      }

      // Variations
      let variations = [];
      for (let x in this.itemContent['selectableFields']){
        for (let y in this.itemContent['selectableFields'][x]['options']){
          const opt = this.itemContent['selectableFields'][x]['options'][y];
          const index = variations.findIndex(a => a.name === opt['name']);
          if (index >= 0){
            if (variations[index]['values'].indexOf(opt['value']) < 0)
              variations[index]['values'].push(opt['value'])
          } else {
            variations.push({ name: opt['name'], values: [opt['value']], selected: '' });
          }
        }
      }

      // Combination Prices
      this.combinationPrices = this.itemContent['selectableFields'].map(x => {
        let comb = x.options.map(y => `${y.name}(${y.value})`).join('-');
        comb += `,${x.price}-${x.stock}-${x._id}`;
        return comb;
      });

      this.variations = variations;
      this.galleryImages = images;
      this.imageSelected = images[0].large;
      
      this.getMoreCompanyItems();
      this.getMoreRelatedItems();

    } catch (error) {
      this.itemService.handleErrorRequest(error); 
    }
  }

  async getMoreCompanyItems() {
    try {
      const data = await this.itemService.itemList({
        'notProduct': this.itemContent._id,
        'company': this.itemContent.company._id
      },0, 4);
      this.moreCompanyItems = data;
      
    } catch (error) {
      this.itemService.handleErrorRequest(error);
    }
  }

  async getMoreRelatedItems() {
    try {
      const data = await this.itemService.itemList({
        'notProduct': this.idItem,
        'category': this.itemContent.category._id,
        'notCompany': this.itemContent.company._id,
      },0, 4);  
      this.moreRelatedItems = data;
    } catch (error) {
      this.itemService.handleErrorRequest(error);
    }
  }

  goToComment() {
    if (!lstge.get('user_kuvid')){
      this.router.navigate(['user/login']);
      return;
    }

    document.getElementById('inputComment').focus();
  }

  async follow(){
    if (!lstge.get('user_kuvid')){
      this.router.navigate(['user/login']);
      return;
    }
    try {
      const data = await this.userService.userFollow({
        company: this.itemContent.company._id
      });  
      if (data['message'] === 'success') this.itemContent.isFollowed = true;
    } catch (error) {
      this.itemService.handleErrorRequest(error);
    }
  }

  async unfollow(){
    try {
      const data = await this.userService.userUnfollow({
        company: this.itemContent.company._id
      });
      if (data['message'] === 'success') this.itemContent.isFollowed = false;
    } catch (error) {
      this.userService.handleErrorRequest(error);
    }
  }

  async createComment(data: any){
    try {
      await this.itemService.itemReviewCreate(data.id, data.comment);
      this.callComments();
    } catch (error) {
      this.itemService.handleErrorRequest(error);
    }
  }

  async callComments(){
    try {
      const data = await this.itemService.itemInfo(this.idItem);  
      this.itemContent.reviews = data['reviews'];

    } catch (error) {
      this.itemService.handleErrorRequest(error);
    }
  }

  async addToCart(){

    const cartItems = await this.saveItemToCart();
    if (cartItems.length > 0) {
      const items = cartItems.map(x => x['item']['_id']);
      this.cartService.addCart(items);
    }
  }

  async addToCartAndBuy() {
    if (await this.saveItemToCart()){
      this.router.navigate(['/commerce/shoppingCart']);
    }
  }

  async saveItemToCart(){
    
    const emptySelections = this.variations.filter(x => x.selected === '').length;
    if (emptySelections > 0){
      this.errorEmptySelection = true;
      return;
    }

    let dataParams = { 
      item: this.itemContent._id,
      price: this.itemContent.price, 
      quantity: (this.quantity === 999 ? this.quantityOther : this.quantity), 
      selectableFieldId: (this.variations.length > 0) ? this.combinationId : undefined,
      selectableFields: (this.variations.length > 0) ? this.variations.map(x => ({ name: x['name'], value: x['selected'] })) : undefined
    };

    try{
      const data = await this.userService.userCartAddItem(dataParams);
      return data;
    } catch (error){
      this.userService.handleErrorRequest(error);
      return [];
    }
  }

  getPriceVariation(){
    
    this.errorEmptySelection = false;
    const emptySelections = this.variations.filter(x => x.selected === '').length;
    if (emptySelections === 0){
      const selectedComb = this.variations.map(x => `${x.name}(${x.selected})`).join('-');
      this.combinationPrices.map(x => {
        const [combInfo, combPricesStock] = x.split(',');
        if (combInfo === selectedComb){
          [this.itemContent.price, this.itemContent.quantity, this.combinationId] = combPricesStock.split('-');
        }
      });
      if (this.quantity > 0)
      this.inStock = (this.itemContent.quantity - this.quantity >= 0);

    } else {
      this.inStock = true;
    }
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
