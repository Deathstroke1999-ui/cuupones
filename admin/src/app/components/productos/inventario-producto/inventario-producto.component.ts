import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductoService } from 'src/app/services/producto.service';
declare var iziToast;
declare var jQuery :any;
declare var $ :any;
@Component({
  selector: 'app-inventario-producto',
  templateUrl: './inventario-producto.component.html',
  styleUrls: ['./inventario-producto.component.css']
})
export class InventarioProductoComponent implements OnInit {
public id;
public _iduser;
public token;
public producto: any={};
public inventarios : Array<any>=[];
public load_btn=false;
public inventario:any={};

  constructor(
    private _route :ActivatedRoute,
    private _productoService : ProductoService

  ) { 
    this.token =localStorage.getItem('token');
    this._iduser=localStorage.getItem('_id')
    console.log(this._iduser)
  }

  ngOnInit(): void {
    this._route.params.subscribe(
      params=>{
        this.id= params['id'];
 
        this._productoService.obetener_producto_admin(this.id, this.token).subscribe(
          response=>{
  if(response.data==undefined){
    this.producto=undefined;
  }else{
    this.producto= response.data;
this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
  response =>{
    this.inventarios=response.data


  },error=>{

  }
)
  
  }
          },error=>{
     
          }
        )
  
      }
    )
  }
eliminar(id){
  this.load_btn=true;
  this._productoService.eliminar_inventario_producto_admin(id,this.token).subscribe(
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
       this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
        response =>{
          this.inventarios=response.data
          console.log(this.inventarios)
        },error=>{
          console.log(error)
        }
      )
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
registro_inventario(inventarioForm){
if(inventarioForm.valid){
let data={
  producto:this.producto._id,
  cantidad:inventarioForm.value.cantidad,
  admin:this._iduser,
  proveedor:inventarioForm.value.proveedor
}
console.log(data);

this._productoService.registro_inventario_producto_admin(data,this.token).subscribe(
  response=>{
    iziToast.show({
      title:'SUCCESS',
       titleColor:'#1DC74C',
       color:'#FFF',
       class:'text-danger',
       position:'topRight',
       message:'Se agregó el nuevo stock al producto'
     });
     this._productoService.listar_inventario_producto_admin(this.producto._id,this.token).subscribe(
      response =>{
        this.inventarios=response.data
        console.log(this.inventarios)
      },error=>{
        console.log(error)
      }
    )

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
     message:'los datos del formulario no son válidos'
   });
}
}
}
