import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class JobByScianService {

  constructor(private db:AngularFireDatabase) {


  }

onclick(scian){
  console.log("Clickscian")
  console.log(scian)
  console.log("ClickscianFin")
  return this.db.object("compagnieParScian/"+scian+"/").valueChanges()
}




}
