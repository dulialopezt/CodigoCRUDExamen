import { Component,OnInit } from '@angular/core';
import { ModalController, ToastController } from '@ionic/angular';
import {FirestoreService} from '../../services/firestore.service'
import {Tarea} from '../../tarea'
import { ModalExamenPage } from '../modal-examen/modal-examen.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{
titulo: String = "Añadir Tarea";

tareaEditando:Tarea;

arrayCollection:any=[
  {
    id:"",
    data:{} as Tarea
  }
]
idTareaSel:string =null;

  constructor(private firestoreService:FirestoreService,private modalController:ModalController, private toastCtrl: ToastController) {
   this.tareaEditando ={} as Tarea;
    this.obtenerLista();
  }

  nuevaTarea(){
    this.titulo = "Añadir Tarea";
    this.showModal(this.tareaEditando, null);
  }

  editarTarea(tarea: Tarea, id:String){
    this.titulo = "Modificar Tarea";
    this.showModal(tarea, id);
  }
  
  /*async NuevaTarea() {
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
    //this.tareaEditando = tarea;
   
    const modal = await this.modalController.create({
      component: ModalExamenPage,
      cssClass: 'my-custom-class',
      componentProps:{
        titulo : 'Modificar Tarea',
        tareaEdicion : tarea,
        tituloBoton : "Modificar Tarea",
        idTareaSel : id
      }
    });
    await modal.present();
    const {data}= await modal.onWillDismiss();
    console.log('Al salir de editar');
    console.log(data)
  }*/

  async showtoast(){
    const toast = await this.toastCtrl.create({
      message: "Tarea Ejecutada",
      cssClass: 'my-custom-class',
      duration: 3000
    });
    await toast.present();
  }
  async showModal(tarea, id){
    const modal = await this.modalController.create({
      component: ModalExamenPage,
      cssClass: 'my-custom-class',
      componentProps:{
        titulo : this.titulo,
        tareaEdicion : tarea,
        tituloBoton : this.titulo,
        idTareaSeleccionada : id
      }
    });
    await modal.present();
    const { data }= await modal.onWillDismiss();
    this.showtoast();
    

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
