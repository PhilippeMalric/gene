import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';

@Component({
  selector: 'anms-votes',
  templateUrl: './votes.component.html',
  styleUrls: ['./votes.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VotesComponent implements OnInit {
  userDoc: AngularFirestoreDocument<any>;
  bookDoc: AngularFirestoreDocument<any>;

  user: Observable<any>;
  book: Observable<any>;

  constructor(private afs: AngularFirestore) { }

  ngOnInit() {

    this.userDoc = this.afs.doc('users/test-user-3')
    this.bookDoc = this.afs.doc('books/test-book-1')

    this.book = this.bookDoc.valueChanges()
    this.user = this.userDoc.valueChanges()
  }

  get movieId() {
    return this.bookDoc.ref.id
  }

  get userId() {
    return this.userDoc.ref.id
  }


}
