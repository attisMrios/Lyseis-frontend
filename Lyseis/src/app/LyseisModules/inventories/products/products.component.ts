import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.sass']
})
export class ProductsComponent implements OnInit {

  heading = 'Productos';
  subheading = 'Cree, modifique y elimine sus productos, algunas funciones pueden requerir permisos de administrador';
  icon = 'ly6-boxes icon-gradient bg-tempting-azure';
  constructor() { }

  ngOnInit(): void {
  }

  Crear(){
    alert('hola');
  }
}
