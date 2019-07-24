import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';

export interface Vote {
  userId: any;
  bookId: any;
  value: number;
  comment: string;
}

@Injectable({
  providedIn: 'root'
})
export class VotesService {

  constructor(private afs: AngularFirestore) { }

  // Star reviews that belong to a user
  getUserStars(userId) {
    const starsRef = this.afs.collection('votes', ref => ref.where('userId', '==', "test-user-3") );
    return starsRef.valueChanges();
  }

  // Get all stars that belog to a Movie
  getBookStars(bookId) {
    const starsRef = this.afs.collection('votes', ref => ref.where('bookId', '==', "test-book-1") );
    return starsRef.valueChanges();
  }

  // Create or update star
  setStar(userId, bookId, value, comment) {
    // Star document data
    const vote: Vote = { userId, bookId, value, comment };

    // Custom doc ID for relationship
    const starPath = `votes/${vote.userId}_${vote.bookId}`;

    // Set the data, return the promise
    return this.afs.doc(starPath).set(vote)
  }
}
