import { Component, ViewChild } from '@angular/core';
import { RouterOutlet, provideRouter } from '@angular/router';
import { HttpClient, HttpClientModule, HttpErrorResponse,HttpResponse } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule, FormGroup,FormControl,FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UrlService } from './services/url.service';
import { timer } from 'rxjs'; // Para temporizadores
import {GridModule} from '@progress/kendo-angular-grid';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatExpansionModule} from '@angular/material/expansion';
import { BrowserAnimationsModule, provideAnimations } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { trigger, state, style, animate, transition } from '@angular/animations';



@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule,RouterOutlet,FormsModule,ReactiveFormsModule,HttpClientModule,GridModule,
  MatTableModule, MatExpansionModule,MatPaginatorModule],
  animations: [ trigger('bodyExpansion', [
    state('open', style({ height: 'auto', opacity: 1 })), // Estado abierto
    state('closed', style({ height: '0px', opacity: 0 })), // Estado cerrado
    transition('closed <=> open', animate('300ms ease-in-out')), // Transición entre estados
  ]),],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  siteStatus: 'up' | 'down' | 'error' | 'unknown' | '' = '';
  siteUrl = '';
  form: FormGroup
  loading = false;
  showAlert = false;
  links: any[] = [];
  linkNames: any[] = [];
  linkResponse: any[] = [];
 // panelOpenState = false;
 // dataSource: any
 // dataSource2: any
 // @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

 dateToday = new Date();

  constructor(private http: HttpClient,
    private urlService: UrlService
    ) {
      this.form = new FormGroup({
      url: new FormControl('', Validators.required)
      })
    
    }



  ngOnInit(): void {

  this.getUrls();
  
  }


  insertURL(){
 /* if(this.form.valid){
    this.siteUrl = this.form.value.url;

  this.loading = true;

   this.sendUrl();

  }else {

  }*/


  if(this.links.length > 0){
    this.linkResponse = []
    this.loading = true;
    this.sendUrls()
  }else{

  }
  
  }



  sendUrl(){
   
   
    this.urlService.sendUrl(this.siteUrl)
   .subscribe(res => {

   this.loading = false

   this.siteStatus = "up"


   
   }, err => {
    this.loading = false

    

    if(err.status === 500){
      
     this.siteStatus = "down"
    }
    

   })

  }

  showTemporaryAlert() {
    this.showAlert = true; // Mostrar la alerta
    timer(3000).subscribe(() => {
      // Ocultar la alerta después de 3 segundos
      this.showAlert = false;
    });

  }

  addUrls(url: string) {
   // this.links.push(url)

   if(url != "" || url != null || url != " "){
    this.loading = true;
   this.urlService.addUrl(url)
   .subscribe(res => {
    console.log(res)
    this.loading = false
    this.getUrls()
   }, err => {
    console.log(err)
   })
  }
   
  }


  sendUrls(){

    this.linkNames = []
   
    this.links.forEach(element => {
      
      this.linkNames.push(element.name)
      })

    this.urlService.sendUrls(this.linkNames)
    .subscribe(res => {
 
    this.loading = false
 
    console.log(res.results)

 //   this.dataSource2 = new MatTableDataSource<any>(res.results)
  //  this.dataSource2.paginator 

 for(let i=0; i<res.results.length; i++) {
    this.linkResponse.push(res.results[i])
 }


    }, err => {
     this.loading = false
 
     console.log(err)
 
     if(err.status === 500){
       
   
     }
     
 
    })

 
   }


   clean(){
    this.links.length > 0 ? this.links = [] : this.links
   }


  getUrls(){
  
    this.urlService.getUrls()
    .subscribe(res => {
      this.links = res.results
   //   this.dataSource = new MatTableDataSource<any>(res.results)
    }, err => {
      console.log(err)
    })
  }

// TABLE ANGULAR MATERIAL
  displayedColumns: string[] = ['position', 'name','details'];
  displayedColumns2: string[] = ['url','status','sslExpiration']

  deleteUrl(id: number){
    const confirmed = confirm("¿Estás seguro de que quieres eliminar esta url?");

    // Verificar la respuesta del usuario
    if (confirmed) {
      this.urlService.deleteUrl(id)
    .subscribe(res => {
      console.log(res)
      this.getUrls()
    } ,err => {
      console.log(err)
    })

    } else {
     
    }
  
  

  }

  editUrl(name: string, id: number){
    this.urlService.editUrl(id,name)
    .subscribe(res => {
      console.log(res)
      this.getUrls()
    }, err => {
      console.log(err)
    })
  }

convertToDate(date: any): Date{
 return new Date(date);
}


  
}
