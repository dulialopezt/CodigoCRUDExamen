import { Component, OnInit } from '@angular/core';
import { Input } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { FirestoreService } from 'src/app/services/firestore.service';
import {Tarea} from '../../tarea'


@Component({
  selector: 'app-modal-examen',
  templateUrl: './modal-examen.page.html',
  styleUrls: ['./modal-examen.page.scss'],
})
export class ModalExamenPage implements OnInit {
  @Input() titulo:String;
  @Input() tituloBoton:String;
  @Input() tareaEdicion:Tarea;
  @Input() idTareaSeleccionada:string;

  tareaEditando :Tarea;

 
  constructor(private firestoreService:FirestoreService,private modalController:ModalController) 
  { 
     this.tareaEditando= {} as Tarea;
     console.log('En constructor');
     console.log(this.tareaEditando);
  }

  ngOnInit() {
  
    this.tareaEditando = this.tareaEdicion;
  }
  salirOpcion(){
    console.log('En salir');
    console.log(this.tareaEditando);
    console.log(this.tareaEdicion);
    this.modalController.dismiss();
  }

  insertarModificarTarea(){
    console.log('Insertar/Modificar')
    console.log(this.tareaEdicion);
    console.log(this.tareaEditando);
    if(typeof(this.tareaEdicion ) === "undefined"){
      this.firestoreService.insertar("tareas",this.tareaEditando).then(()=>{
        console.log('Hola se creo Satisfac');

        console.log(this.tareaEditando);
        this.tareaEditando = {} as Tarea;
        this.modalController.dismiss();
        
        
      },(error)=>{
        console.log("entroo con errores");
        console.log(error);
      });
    }
    
    else{
      this.firestoreService.actualizar("tareas",this.idTareaSeleccionada,this.tareaEditando).then(()=>{
        console.log('Hola se actualizo  Satisfactoriamente');
        this.tareaEditando = {} as Tarea;
        this.idTareaSeleccionada  = null;
        this.modalController.dismiss();
        
      },(error)=>{
        console.log("entroo con errores");
        console.log(error);
      });
    }
    
  }
}
