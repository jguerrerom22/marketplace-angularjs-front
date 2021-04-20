import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';

import { CategoryService } from '../../../services/category.service';
import { ItemService } from '../../../services/item.service';
import { UserlogService } from '../../../shared/userlog.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.sass']
})
export class ProductFormComponent implements OnInit {

  @Input() itemId: string;
  @Input() company: string = '';
  @Output() endEdition = new EventEmitter<any>();

  public loading = false;
  emojisActive = false;

  item = {
    name: '',
    type: '',
    category: '',
    price: '',
    quantity: 0,
    description: '',
    variations: [],
    photos: []
  };

  errors = {
    name: false,
    type: false,
    category: false,
    price: false,
    description: false,
    variations: false,
    combinationPrice: false,
    combinationQuantity: false,
    photos: false
  };

  steps = 1;
  public categories = [];
  categoriesProducts = [];
  categoriesServices = [];

  activeImage: any;
  imageChangedEvent: any = '';
  galeryActive = true;

  temp: any;

  cropperActive = false;
  helpActive = false;
  editing = false;

  option = { name: '' };
  variations = [];
  variationsCombinations = [];
  
  // Images
  selectImages = [
    { image: '', file: undefined },
    { image: '', file: undefined },
    { image: '', file: undefined },
    { image: '', file: undefined },
    { image: '', file: undefined },
    { image: '', file: undefined },
    { image: '', file: undefined }
  ];

  constructor(
    private categoryService: CategoryService, 
    private itemService: ItemService, 
    private userlog: UserlogService
  ) { }

  ngOnInit(): void {
    this.init();
  }

  async init() {
    await this.loadCategories();
    
    if (this.itemId) {
      await this.loadInfoItem();
      this.editing = true;
    } else {
      this.editing = false;
    }
  }

  async loadInfoItem() {
    try {
      this.loading = true;
      const info = await this.itemService.itemInfo(this.itemId);
      this.changeCategories(info['type']);
      this.item = {
        name: info['title'],
        type: info['type'],
        category: info['category']['_id'],
        price: info['price'],
        quantity: info['stock'],
        description: info['description'],
        variations: [],
        photos: []
      };
      
      // Pictures
      info['media'].map((x,y) => (this.selectImages[y].image = x[0]['url']));

      this.temp = info['selectableFields'];

      this.variations = [];
      info['selectableFields'].map(x => {
        x.options.map(y => {
          let index = this.variations.findIndex(i => i.name === y.name);

          if (index >= 0){
            if (this.variations[index]['opts'].findIndex(i => i.name === y.value) < 0){
              this.variations[index]['opts'].push({ name: y.value });
            }
          } else {
            this.variations.push({ name: y.name, opts: [{ name: y.value }] });
          }
        });
      });

      this.loading = false;
    } catch (error) {
      this.itemService.handleErrorRequest(error);
    }
  }

  async loadCategories() {
    try {
      const datosProducts = await this.categoryService.productCategoriesAll();
      this.categoriesProducts = datosProducts.map(x => ({ id: x['_id'], name: x['name'] }));

      const datosServices = await this.categoryService.serviceCategoriesAll();  
      this.categoriesServices = datosServices.map(x => ({ id: x['_id'], name: x['name'] }));

    } catch (error) {
      this.categoryService.handleErrorRequest(error)
    }
  }

  changeCategories(type: string){
    this.item.type = type;
    this.item.category = '';
    if (type === 'product')
      this.categories = this.categoriesProducts;
    else if (type === 'service')
      this.categories = this.categoriesServices;
  }

  addImage() {
    this.selectImages.push({image: '', file: undefined});
    this.galeryActive = false;
    setTimeout(() => {
      this.galeryActive = true;
    }, 100);
  }

  addEmoji(emoji) {
    this.item.description += emoji.emoji.native;
  }

  removeImage(i) {
    this.selectImages.splice(i, 1);
    this.galeryActive = false;
    setTimeout(() => {
      this.galeryActive = true;
    }, 100);
  }

  changeImageFile(i, file) {
    this.cropperActive = true;
    this.imageChangedEvent = file[0];
    this.activeImage = i;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.selectImages[this.activeImage].image = event.base64;
  }

  changeStep(step: number){
    let error = true;
    switch (step) {
      case 2:
        error = this.validateStep(1);
        break;
      case 3:
        error = this.validateStep(2);
        if (!error) this.loadCombinations();
        break;
      case 4:
        error = this.validateStep(3);
        break;
      default: break;
    }
    if (!error) this.steps = step;
  }

  validateStep(step: number) {

    let error = false;

    switch (step) {
      case 1:
        this.errors.type = this.errors.name = this.errors.category = this.errors.description = false;
        if (this.item.type === '') { this.errors.type = true; error = true; }
        if (this.item.name === '') { this.errors.name = true; error = true; }
        if (this.item.category === '') { this.errors.category = true; error = true; }
        if (this.item.description === '') { this.errors.description = true; error = true; }
        return error;
    
      case 2:
        this.errors.variations = false;
        if (this.variations.length > 0){
          for (let x in this.variations){
            if (this.variations[x].name === '') {
              this.errors.variations = true;
              error = true;
              break;
            }
            for (let y in this.variations[x].opts){
              if (this.variations[x].opts[y].name === '') {
                this.errors.variations = true;
                error = true;
                break;
              } 
            }
          }
        }
        return error;

      case 3:
        this.errors.combinationPrice = this.errors.combinationQuantity = false;
        if (this.variations.length == 0){
          const v = this.variationsCombinations[0]
          if (!(v.price && v.price !== '')) { this.errors.combinationPrice = true; error = true; }
          if ((v.quantity === undefined || v.quantity === '') === true) { this.errors.combinationQuantity = true; error = true; }
        } else {
          for (let i in this.variationsCombinations){
            const v = this.variationsCombinations[i];
            if (!(v.price && v.price !== '')) { this.errors.combinationPrice = true; error = true; break; }
            if ((v.quantity === undefined || v.quantity === '') === true) { this.errors.combinationQuantity = true; error = true; break; }
          }
        }
        return error;
      default:
        return error;
    }
  }

  cartesian(args) {
      var r = [], max = args.length-1;
      function helper(arr, i) {
          for (var j=0, l=args[i].opts.length; j<l; j++) {
              var a = arr.slice(0); // clone arr
              a.push({ name: args[i].name, value: args[i].opts[j].name });
              if (i==max)
                  r.push(a);
              else
                  helper(a, i+1);
          }
      }
      helper([], 0);
      return r;
  }

  loadCombinations() {
    this.variationsCombinations = [];
    if (this.variations.length > 0){
      const comb = this.cartesian(this.variations);
      this.variationsCombinations = comb;
    } else {
      this.variationsCombinations = [[{ name: this.item.name }]];
    }
    if (this.editing) this.loadPricesCombinations();
  }

  loadPricesCombinations() {
    
    if (this.variations.length === 0){
      this.variationsCombinations[0].price = this.item.price;
      this.variationsCombinations[0].quantity = this.item.quantity;
      return;
    }

    for (let x in this.variationsCombinations){
      const combLength = this.variationsCombinations[x].length;

      for (let i in this.temp){

        let sum = 0;

        for (let j in this.temp[i]['options']){
          const opt = this.temp[i]['options'][j];

          for (let y in this.variationsCombinations[x]){

            const combination = this.variationsCombinations[x][y];
            if (opt['name'] === combination['name'] && opt['value'] === combination['value']){
              sum++;
            }
          }
        }

        if (sum === combLength){
          this.variationsCombinations[x]['price'] = this.temp[i]['price'];
          this.variationsCombinations[x]['quantity'] = this.temp[i]['stock'];
          break;
        }

      }
    }
  }

  addVariation() {
    const variation = { name: '', opts: [{ name: '' }] };
    this.variations = [variation, ...this.variations];
  }

  removeVariation(i) {
    // AQUI HAGO UN REMOVE DESDE EL TS PERO SERIA MEJOR HACERLO DESDE LA DB Y CARGAR DE NUEVO, AQUI USTED DECIDE
    this.variations.splice(i, 1)

  }

  addOption(variation) {
    variation.opts.push(JSON.parse(JSON.stringify(this.option)));
  }

  removeOption(variation, o) {
    variation.opts.splice(o,1)
  }

  async saveEdition(step: number) {
    const error = this.validateStep(step);
    if (error) return;

    let data: any = {};
    switch (step) {
      case 1:
        data = {
          type: this.item.type,
          title: this.item.name,
          category: this.item.category,
          description: this.item.description
        }
        break;

      case 3:
        let price = 0, quantity = 0, selectableFields;
        if (this.variations.length > 0){
          price = Math.min.apply(Math, this.variationsCombinations.map((x) => x.price));
          selectableFields = JSON.stringify(this.variationsCombinations.map(x => ({
            options: x.map(y => y),
            price: x.price,
            stock: x.quantity
          })));
        } else {
          price = Number(this.variationsCombinations[0].price);
          quantity = Number(this.variationsCombinations[0].quantity);
        }

        data = { price: price, stock: quantity, selectableFields: selectableFields };
        break;
      
      case 4:
        data = new FormData();
        let imagesTypes = [];
        this.selectImages.map(async (x,y) => {
          if (this.userlog.isValidURL(x.image)){
            imagesTypes.push('url');
          }
          else if (x.image !== undefined && x.image !== ''){
            data.append('media', this.userlog.base64ToFile(x.image, `media${y}.png`));
            imagesTypes.push('file');
          }
        });
        data.append('imagesTypes', imagesTypes);
        break;
      default:
        break;
    }

    try {
      this.loading = true;
      await this.itemService.itemUpdate(this.itemId, data);
      this.endEdition.emit(this.item);
      this.loading = false;  
    } catch (error) {
      this.loading = false;
      this.itemService.handleErrorRequest(error);
    }

  }

  async saveItem() {
    const images = this.selectImages.filter(x => x.image !== '');
    if (images.length === 0){
      this.errors.photos = true;
      return;
    }

    try {
      this.loading = true;

      let price = 0, quantity = 0;
      if (this.variations.length > 0){
        price = Math.min.apply(Math, this.variationsCombinations.map((x) => x.price));
      } else {
        price = Number(this.variationsCombinations[0].price);
        quantity = Number(this.variationsCombinations[0].quantity);
      }

      console.log(this.variationsCombinations);

      const form = new FormData();
      form.append('title', this.item.name);
      form.append('type', this.item.type);
      form.append('description', this.item.description);
      form.append('price', price.toString());
      form.append('stock', quantity.toString());
      form.append('category', this.item.category);
      form.append('company', this.company);
      
      if (this.variations.length > 0){
        const selectableFields = JSON.stringify(this.variationsCombinations.map(x => ({
          options: x.map(y => y),
          price: x.price,
          stock: x.quantity
        })));

        form.append('selectableFields', selectableFields);
      }

      for (let i in images){
        form.append('media', this.userlog.base64ToFile(images[i].image, `media${i}.png`));
      }
      await this.itemService.itemCreate(form);

      this.endEdition.emit(this.item);
      this.loading = false;

    } catch (error) {
      this.loading = false;
      this.itemService.handleErrorRequest(error);
    }
  }

  closeModal() {
    this.endEdition.emit(null);
  }
}
