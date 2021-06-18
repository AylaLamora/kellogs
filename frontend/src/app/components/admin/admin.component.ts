import { NgForm } from '@angular/forms';
import { Component, OnInit, ViewChild } from '@angular/core';

//Material
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { InventarioService } from 'src/app/services/invetario.service';
import { DatosInventario } from 'src/app/models/inventario';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  /*Cambiar color del fondo*/
  bodyTag: HTMLBodyElement = document.getElementsByTagName('body')[0];
  htmlTag: HTMLElement = document.getElementsByTagName('html')[0];

  ELEMENT_DATA: DatosInventario[]=[];
  displayedColumns: string[] = [
    'nombre',
    'precio',
    'marca',
    'actions'
  ];
  dataSource = new MatTableDataSource<DatosInventario>(this.ELEMENT_DATA);

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  action = true;

  constructor(public service: InventarioService) { }

  ngOnInit(): void {
        /*Cambiar color del fondo*/
        this.bodyTag.classList.add('login-pagina');
        this.htmlTag.classList.add('login-pagina');

        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.getAll();
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onSubmit(form: NgForm) {
    if (form.value.id == '') {
      this.service.postDatos(form.value).subscribe((res) => {
        this.getAll();
        console.log(this.service.selectInventario.nombre);
        window.alert('Se Guardo Correctamente');
        // window.location.reload();
      });
    } else {
      this.service.putDatos(form.value).subscribe((res) => {
        window.alert('Se Actualizo Correctamente');
      });
    }
  }

  onEdit(inv: DatosInventario) {
    this.service.selectInventario = inv;
  }

  onDelete(_id: string) {
    if (confirm('Estas Seguro que deseas eliminarlo ?') == true) {
      this.service.deleteDato(_id).subscribe((res) =>{
        this.getAll();
        window.alert({ html: 'Eliminado Correctamente', classes: 'rounded' });
        
      });
    }
  }
  resetForm(form?: NgForm) {
    if (form) form.reset();
    this.service.selectInventario = {
      id: '',
      nombre: '',
      precio: null,
      marca: ''
    };
  }

  getAll() {
    let resp = this.service.getDatosList();
    resp.subscribe((res) => (this.dataSource.data = res as DatosInventario[]));
  }

}
