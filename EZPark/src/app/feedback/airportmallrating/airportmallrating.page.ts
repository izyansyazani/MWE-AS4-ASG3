import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { ChangeDetectorRef } from '@angular/core';
import { AuthServiceService } from '../../services/auth-service.service';
import { UserService } from '../../services/user.service';

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
  isPinned?: boolean; // New property to mark a comment as pinned
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
  adminEmail = 'ezparkadmin@gmail.com'; // Admin email for checking pinned permission

  constructor(
    private router: Router,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthServiceService,
    private userService: UserService
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

  // Fetch comments from Firestore, with pinned comments on top
  async loadComments() {
    try {
      const allComments = await this.authService.getComments(this.pageId);
      // Sort comments to display pinned comments first
      this.comments = allComments.sort((a, b) => (b.isPinned ? 1 : -1));
    } catch (error) {
      console.error('Error fetching comments:', error);
    }
  }

  // Post a new comment
  async postComment() {
    if (this.newCommentText.trim()) {
      const newComment: Comment = {
        id: '', // Firestore will generate the ID
        username: this.currentUser.username,
        profilePicture: this.currentUser.profilePicture,
        text: this.newCommentText,
        isPinned: false,
      };

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
      this.changeDetectorRef.detectChanges();
    }
  }

  // Pin or unpin a comment (admin only)
  async togglePinComment(comment: Comment) {
    if (this.isAdminComment(comment)) {
      const newPinnedStatus = !comment.isPinned; // Toggle the pinned status
      try {
        await this.authService.updateComment(comment.id, newPinnedStatus);
        this.loadComments(); // Reload comments to update pinned status
      } catch (error) {
        console.error('Error toggling pinned status:', error);
      }
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

  // Check if the current user is admin for pinning
  isAdminComment(comment: Comment) {
    return (
      comment.username === 'EZPark Admin' &&
      this.currentUser.username === 'EZPark Admin'
    );
  }

  goToFeedback() {
    this.router.navigate(['/feedback']);
  }
}
