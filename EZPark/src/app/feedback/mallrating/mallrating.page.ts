import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServiceService } from '../../auth-service.service'; // Adjust based on actual file location

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
  selector: 'app-mallrating',
  templateUrl: './mallrating.page.html',
  styleUrls: ['./mallrating.page.scss'],
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
export class MallratingPage implements OnInit {
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
    username: '',
    profilePicture: '../assets/defaultuser.png', // Default profile picture if none exists
  };

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthServiceService // Inject AuthService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
  }

  // Fetch the current user's profile
  async loadCurrentUser() {
    try {
      const user = await this.authService.getProfile();
      if (user) {
        this.currentUser.username = user.displayName || 'Anonymous';
        this.currentUser.profilePicture =
          user.photoURL || '../assets/defaultuser.png';
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  postComment() {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        id: this.comments.length + 1,
        username: this.currentUser.username, // Use logged-in user's name
        profilePicture: this.currentUser.profilePicture, // Use logged-in user's profile picture
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
