import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-change-form',
  templateUrl: './change-form.component.html',
  styleUrls: ['./change-form.component.sass']
})
export class ChangeFormComponent implements OnInit {
  @Input() data = {idUser: '', typeData: ''}
  @Output() dataChange = new EventEmitter();
  @Output() close = new EventEmitter();
  @Output() save = new EventEmitter();
  password = ''; 
  contentData = '';
  constructor() { }

  ngOnInit(): void {
  }

  closeModal() {
    this.close.emit('close');
  }

  saveNewData() {
    this.save.emit(this.password);
  }

}
