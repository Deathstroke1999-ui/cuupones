import { Component, OnInit } from '@angular/core';
import { CuponService } from 'src/app/services/cupon.service';

@Component({
  selector: 'app-index-cupon',
  templateUrl: './index-cupon.component.html',
  styleUrls: ['./index-cupon.component.css']
})
export class IndexCuponComponent implements OnInit {

public cupones : Array<any>=[];
public load_data=true;

public token;
public page =1;
public pageSize=20;
public filtro=''
  constructor(
    private _cuponService :CuponService
  ) {this.token=localStorage.getItem('token');
 }

  ngOnInit(): void {
    this._cuponService.listar_cupones_admin(this.filtro,this.token).subscribe(
      response=>{
        console.log(response);
        this.load_data=false;
      }
    )
  }

}
