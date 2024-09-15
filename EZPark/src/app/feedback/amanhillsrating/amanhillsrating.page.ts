import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';

interface Comment {
  id: number;
  username: string;
  profilePicture: string;
  text: string;
}

@Component({
  selector: 'app-amanhillsrating',
  templateUrl: './amanhillsrating.page.html',
  styleUrls: ['./amanhillsrating.page.scss'],
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    IonButton,
    IonInput,
    CommonModule,
    FormsModule,
  ],
})
export class AmanhillsratingPage implements OnInit {
  comments: Comment[] = [
    {
      id: 1,
      username: 'User1',
      profilePicture: '../assets/user1.png',
      text: 'Great place to shop!',
    },
    {
      id: 2,
      username: 'User2',
      profilePicture: '../assets/user2.png',
      text: 'Had a wonderful experience.',
    },
  ];

  newCommentText: string = '';
  currentUser = {
    username: 'CurrentUser',
    profilePicture: '../assets/currentuser.png',
  };

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {}

  postComment() {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        id: this.comments.length + 1,
        username: this.currentUser.username,
        profilePicture: this.currentUser.profilePicture,
        text: this.newCommentText,
      };
      this.comments.push(newComment);
      this.newCommentText = ''; // Clear the input field after posting

      // Force re-render to recalculate layout
      this.changeDetectorRef.detectChanges();
    }
  }

  deleteComment(commentId: number) {
    this.comments = this.comments.filter((comment) => comment.id !== commentId);
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
}
