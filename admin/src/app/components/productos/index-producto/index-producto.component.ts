import { Component, OnInit } from '@angular/core';
import { GLOBAL } from 'src/app/services/GLOBAL';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast;
declare var jQuery :any;
declare var $ :any;
@Component({
  selector: 'app-index-producto',
  templateUrl: './index-producto.component.html',
  styleUrls: ['./index-producto.component.css']
})
export class IndexProductoComponent implements OnInit {
public load_data=true;
public filtro="";
public token;
public productos:Array<any>=[];
public url;
public page =1;
public pageSize=20;
public load_btn=false;
  constructor(
private _productoService: ProductoService,

  ) { 
    this.token=localStorage.getItem('token');
    this.url=GLOBAL.url;
  }

  ngOnInit(): void {
    this.init_data();
  }
  init_data(){
    this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
      response=>{
        console.log(response);
        this.productos=response.data;
        this.load_data=false;
      },error=>{
        console.log(error);
      }
    )
  }
filtrar(){
if(this.filtro){
  this._productoService.listar_productos_admin(this.filtro, this.token).subscribe(
    response=>{
      console.log(response);
      this.productos=response.data;
      this.load_data=false;
    },error=>{
      console.log(error);
    }
  )
}else{
  iziToast.show({
    title:'ERROR',
     titleColor:'#FF0000',
     color:'#FFF',
     class:'text-danger',
     position:'topRight',
     message:'Ingrese un filtro para buscar'
   })
}
}
resetear(){
  this.filtro='',
  this.init_data();

}
eliminar(id){
  this.load_btn=true;
  this._productoService.eliminar_producto_admin(id,this.token).subscribe(
    response=>{
      iziToast.show({
        title:'SUCCESS',
         titleColor:'#1DC74C',
         color:'#FFF',
         class:'text-succes',
         position:'topRight',
         message:'Se eliminó correctamente el  producto '
       });
  
       $('#delete-'+id).modal('hide');
       $('modal-backdrop').removeClass('show');
       this.load_btn=false;
       this.init_data();
    },error=>{
      iziToast.show({
        title:'SUCCESS',
         titleColor:'#1DC74C',
         color:'#FFF',
         class:'text-succes',
         position:'topRight',
         message:'Ocurrió un error en el servidor '
       });
  
      console.log(error);
      this.load_btn=false;
    }
  )
}
}
