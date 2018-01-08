import { Component, OnInit, Input } from '@angular/core';
import {Router,ActivatedRoute} from '@angular/router';
import {ProductService} from "../product/product.service";
import {NgbModal, ModalDismissReasons,NgbModalRef} from '@ng-bootstrap/ng-bootstrap';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
   providers: [ProductService],
})



export class HomeComponent implements OnInit {
    products: any;
    product :any;
    cart : any[] = [];
    qty : number;
    getCart : any;
    price : any;
    closeResult :any;
    term : any;
    i : any;
    total : number = 0;
    constructor( private productService : ProductService, private modalService: NgbModal) {}      
    private modalReference: NgbModalRef;
    
    ngOnInit() {
        this.getProducts();
    
    }

    changeunit(index){
        console.log(this.products.results[index]);
        
    }

    addtocart(index){
        this.products.results[index]['qty'] =  Number(this.products.results[index]['qty']) + 1
        this.qty = this.products.results[index]['qty'];
        this.getCart = this.cart.filter(x => 
                            x.id === this.products.results[index]['id']
                        );
        if(this.products.results[index]['unit'] == 2){
            this.price = this.products.results[index]['price_per_whole_case'];
        }else{
            this.price = this.products.results[index]['price_per_lb_whole_case'];
        }                
        
        if(this.getCart.length >0 ){
            this.getCart[0]['unit'] = this.products.results[index]['unit'];
            this.getCart[0]['cost'] = this.price;
            this.getCart[0]['qty'] = Number(this.qty);
            this.getCart[0]['totalcost'] = this.getCart[0]['qty'] * this.getCart[0]['cost'];
            
        }else{
            
            this.cart.push({id : this.products.results[index]['id'],
                                qty : this.qty,
                                cost : this.price, 
                                name : this.products.results[index]['generic_item_code'],
                                totalcost : this.qty * this.price,
                                unit : this.products.results[index]['unit'],
                                image : this.products.results[index]['image']
                            });
            
        }
        this.getSum();
         /*
        if(this.modalReference){
            this.modalReference.close();
        }*/

        console.log(this.cart);
    }

    getSum(){
        this.total  = 0;
        for (var i=0; i<this.cart.length; i++) {
            this.total += this.cart[i]['totalcost'];
        }
    }

    open(content, index) {
        this.product = this.products.results[index];
        this.product.index = index;
       

        this.modalReference = this.modalService.open(content);
        this.modalReference.result.then((result) => {
            this.closeResult = `Closed with: ${result}`;
        }, (reason) => {
            this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        });
        
      }

    private getDismissReason(reason: any): string {
        if (reason === ModalDismissReasons.ESC) {
          return 'by pressing ESC';
        } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
          return 'by clicking on a backdrop';
        } else {
          return  `with: ${reason}`;
        }
      }

   
                
    deleteCart(index){
        this.getCart = this.cart.filter(x => x.id === this.products.results[index]['id']);

        this.i = this.cart.findIndex(x => x.id === this.products.results[index]['id']);

        if(this.products.results[index]['unit'] == 2){
            this.price = this.products.results[index]['price_per_whole_case'];
        }else{
            this.price = this.products.results[index]['price_per_lb_whole_case'];
        } 

        if(this.products.results[index]['qty'] > 0){
            this.products.results[index]['qty'] =  Number(this.products.results[index]['qty']) - 1
            this.qty = this.products.results[index]['qty'];

            this.getCart[0]['unit'] = this.products.results[index]['unit'];
            this.getCart[0]['cost'] = this.price;
            this.getCart[0]['qty'] = Number(this.qty);
            this.getCart[0]['totalcost'] = this.getCart[0]['qty'] * this.getCart[0]['cost'];
           
            if(this.getCart.length > 0 ){
                this.getCart[0]['qty'] = Number(this.qty);
                this.getCart[0]['totalcost'] = this.getCart[0]['qty'] * this.getCart[0]['cost'];
                this.total = Number(this.total) - Number(this.getCart[0]['cost']);
                if(this.qty == 0){
                    
                    if(this.cart[this.i]){
                        this.cart.splice(this.i, 1);
                    }
                            
                }
            }
        }else if(this.products.results[index]['qty'] == 0 && this.getCart){
            
            if(this.cart[this.i]){
                this.total = Number(this.total) - Number(this.cart[this.i]['totalcost']);
                this.cart.splice(this.i, 1);
            }
        }
        this.getSum();
        
    }

   

    getProducts(): void {
        this.productService.getIndexData()
        .subscribe(products => { 
                   
                    if(products.hasOwnProperty('results')){
                        this.products = products;
                        
                        for (var i=0; i<this.products.results.length; i++) {
                            this.products.results[i]['qty'] = 0;
                            if(this.products.results[i]['unit_size'] == '1'){
                                this.products.results[i]['unit'] = 1;
                                
                            } else{               
        
                                this.products.results[i]['unit'] = 2;
                
                            }
                        }
                

                        console.log(this.products.results);
                    }
        
                    
                    }
        
                  ,
        
        );              
  
        
    }

    
        
}
