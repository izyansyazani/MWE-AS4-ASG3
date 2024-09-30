import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service'; // Adjust based on actual file location
import { UserService } from '../../services/user.service'; // Import UserService

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';

interface Comment {
  id: string; // Ensure id is always a string to match Firestore document ID
  username: string;
  profilePicture: string;
  text: string;
}

@Component({
  selector: 'app-airportmallrating',
  templateUrl: './airportmallrating.page.html',
  styleUrls: ['./airportmallrating.page.scss'],
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
export class AirportmallratingPage implements OnInit {
  comments: Comment[] = [];

  newCommentText: string = '';
  currentUser = {
    username: '',
    profilePicture: '../assets/defaultuser.png', // Default profile picture if none exists
    userId: '',
  };
  pageId = 'airportmallrating'; // Unique identifier for this page

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthServiceService, // Inject AuthService
    private userService: UserService // Inject UserService
  ) {}

  ngOnInit() {
    this.loadCurrentUser();
    this.loadComments();
  }

  // Fetch the current user's profile
  async loadCurrentUser() {
    try {
      const user = await this.authService.getProfile();
      if (user) {
        this.currentUser.username = user.displayName || 'Anonymous';
        this.currentUser.profilePicture =
          this.userService.getProfileImage() || '../assets/defaultuser.png';
        this.currentUser.userId = user.uid;
      }
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  }

  // Fetch comments from Firestore
  async loadComments() {
    try {
      this.comments = await this.authService.getComments(this.pageId);
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  // Post a new comment
  async postComment() {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        id: '', // Firestore will generate the ID
        username: this.currentUser.username, // Use logged-in user's name
        profilePicture: this.currentUser.profilePicture, // Use logged-in user's profile picture
        text: this.newCommentText,
      };

      // Save the comment to Firestore
      try {
        await this.authService.saveComment({
          username: this.currentUser.username,
          profilePicture: this.currentUser.profilePicture,
          text: this.newCommentText,
          userId: this.currentUser.userId,
          pageId: this.pageId,
        });

        // Reload comments to include the new one
        this.loadComments();
      } catch (error) {
        console.error('Error saving comment:', error);
      }

      this.newCommentText = ''; // Clear the input field after posting

      // Force re-render to recalculate layout
      this.changeDetectorRef.detectChanges();
    }
  }

  // Delete a comment
  async deleteComment(commentId: string) {
    try {
      await this.authService.deleteComment(commentId);
      this.comments = this.comments.filter(
        (comment) => comment.id !== commentId
      );
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
}
