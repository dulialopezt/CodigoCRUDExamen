import { Component,OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import {FirestoreService} from '../../services/firestore.service'
import {Tarea} from '../../tarea'
import { ModalExamenPage } from '../modal-examen/modal-examen.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
tareaEditando:Tarea;

arrayCollection:any=[
  {
    id:"",
    data:{} as Tarea
  }
]
idTareaSel:string =null;

  constructor(private firestoreService:FirestoreService,private modalController:ModalController) {
   this.tareaEditando ={} as Tarea;
    this.obtenerLista();
  }
  
  async NuevaTarea() {
    console.log('En nueva Tarea')
    const modal = await this.modalController.create({
      component: ModalExamenPage,
      cssClass: 'my-custom-class',
      componentProps:{
        titulo : 'Añadir Tarea',
        tareaEdicion : {} as Tarea,
        tituloBoton : "Añadir Tarea"
      }
    });
    await modal.present();
    const {data}= await modal.onWillDismiss();
    console.log(data)
  }
  
  async EditarTarea (tarea:Tarea,id:string) {
    console.log('En Editar Tarea');
    console.log(tarea);
    console.log(id);
   
    const modal = await this.modalController.create({
      component: ModalExamenPage,
      cssClass: 'my-custom-class',
      componentProps:{
        titulo : 'Modificar Tarea',
        tareaEdicion : tarea as Tarea,
        tituloBoton : "Modificar Tarea",
        idTareaSel : id
      }
    });
    await modal.present();
    const {data}= await modal.onWillDismiss();
    console.log('Al salir de editar');
    console.log(data)
  }

  BorrarTarea(id) {
    console.log('borrar');
    this.firestoreService.borrar("tareas", id).then(() => {
      // Actualizar la lista completa
      this.obtenerLista();
      // Limpiar datos de pantalla
      this.tareaEditando = {} as Tarea;
    })
  }
  //Funciones Para llamar a Funciones BD

  insertarTarea(){
     this.firestoreService.insertar("tareas",this.tareaEditando).then(()=>{
      console.log('La tarea se creo satisfactoriamente');
      this.tareaEditando={} as Tarea
     },(error)=>{
       console.log(error);
     });
  

    }
    ngOnInit() {
    }
    obtenerLista(){
      this.firestoreService.consultar("tareas").subscribe((resultadoConsulta)=>{
        this.arrayCollection=[];
        resultadoConsulta.forEach((datosTarea:any)=>{
          console.log('En obtener lista');
          console.log(datosTarea);
          console.log(datosTarea.payload.doc.data());
          this.arrayCollection.push({
            id:datosTarea.payload.doc.id,
            data:datosTarea.payload.doc.data()
          })
        })
      })
      console.log('Salir de Obtener Lista');
    }

    seleccionarTarea(tarea){
      console.log("tarea seleccionada " + tarea.id);
      console.log(tarea.data);
      this.idTareaSel= tarea.id;
      this.tareaEditando.titulo=tarea.data.titulo;
      this.tareaEditando.descripcion= tarea.data.descripcion;
      this.tareaEditando.inicio= tarea.data.inicio;
    }
  
    borrar(){
      this.firestoreService.borrar("tareas",this.idTareaSel).then(()=>{
        this.obtenerLista();
        this.tareaEditando={} as Tarea;
      })
    }
    modificar(){
      this.firestoreService.actualizar("tareas",this.idTareaSel,this.tareaEditando).then(()=>
      {
        this.obtenerLista();
        this.tareaEditando={} as Tarea;
      })
    }
   
}
