import { Injectable } from '@angular/core';
import {AngularFirestore} from '@angular/fire/firestore'

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private angularFirestore: AngularFirestore ) {

   }
   insertar(coleccion,datos)
   {
     return this.angularFirestore.collection(coleccion).add(datos);
   }
   consultar (coleccion){
     
       /*return this.angularFirestore.collection(coleccion).snapshotChanges();*/
       return this.angularFirestore.collection(coleccion,ref => ref.orderBy('titulo','asc')).snapshotChanges();
       

      }
   borrar(coleccion,id)
   {
     return this.angularFirestore.collection(coleccion).doc(id).delete();
   }
   actualizar(coleccion,id,datos){
    return this.angularFirestore.collection(coleccion).doc(id).set(datos);
  }
}
