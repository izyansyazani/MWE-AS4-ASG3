// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import {
//   FormsModule,
//   ReactiveFormsModule,
//   FormGroup,
//   FormBuilder,
//   Validators,
// } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthServiceService } from 'src/app/services/auth-service.service';
// import {
//   AlertController,
//   LoadingController,
//   ToastController,
// } from '@ionic/angular';
// import {
//   IonContent,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonText,
//   IonTextarea,
//   IonLabel,
//   IonButton,
//   IonCheckbox,
//   IonItem,
//   IonInput,
// } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.page.html',
//   styleUrls: ['./login.page.scss'],
//   standalone: true,
//   imports: [
//     IonInput,
//     IonItem,
//     IonCheckbox,
//     IonButton,
//     IonLabel,
//     IonTextarea,
//     IonText,
//     IonContent,
//     IonHeader,
//     IonTitle,
//     IonToolbar,
//     CommonModule,
//     FormsModule,
//     ReactiveFormsModule,
//   ],
// })
// export class LoginPage implements OnInit {
//   ionicForm!: FormGroup;

//   constructor(
//     private toastController: ToastController,
//     private alertController: AlertController,
//     private loadingController: LoadingController,
//     private authService: AuthServiceService,
//     private router: Router,
//     public formBuilder: FormBuilder
//   ) {}

//   ngOnInit() {
//     this.ionicForm = this.formBuilder.group({
//       email: [
//         '',
//         [
//           Validators.required,
//           Validators.pattern(
//             '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'
//           ),
//         ],
//       ],
//       password: [
//         '',
//         [
//           Validators.required,
//           Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
//         ],
//       ],
//       rememberMe: [false], // Initialize rememberMe checkbox
//     });
//   }

//   async login() {
//     const loading = await this.loadingController.create();
//     await loading.present();

//     if (this.ionicForm.valid) {
//       try {
//         const { email, password } = this.ionicForm.value;
//         const user = await this.authService.loginUser(email, password);
//         if (user) {
//           await loading.dismiss();
//           this.router.navigate(['/home']);
//         }
//       } catch (err: any) {
//         await loading.dismiss();
//         this.presentToast(err?.message || 'Login failed. Please try again.');
//         console.log(err);
//       }
//     } else {
//       await loading.dismiss();
//       this.presentToast('Please provide all the required values!');
//       console.log('Invalid form submission');
//     }
//   }

//   get errorControl() {
//     return this.ionicForm.controls;
//   }

//   async presentToast(message: string) {
//     const toast = await this.toastController.create({
//       message: message,
//       duration: 1500,
//       position: 'top',
//     });
//     await toast.present();
//   }
// }

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/services/auth-service.service';
import {
  AlertController,
  LoadingController,
  ToastController,
} from '@ionic/angular';
import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonTextarea,
  IonLabel,
  IonButton,
  IonCheckbox,
  IonItem,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonInput,
    IonItem,
    IonCheckbox,
    IonButton,
    IonLabel,
    IonTextarea,
    IonText,
    IonContent,
    IonHeader,
    IonTitle,
    IonToolbar,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class LoginPage implements OnInit {
  ionicForm!: FormGroup;

  constructor(
    private toastController: ToastController,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ],
      ],
      rememberMe: [false], // Initialize rememberMe checkbox
    });

    // Check if there is stored login data (from rememberMe) and prefill form
    const savedEmail = localStorage.getItem('savedEmail');
    if (savedEmail) {
      this.ionicForm.patchValue({ email: savedEmail, rememberMe: true });
    }
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.ionicForm.valid) {
      try {
        const { email, password, rememberMe } = this.ionicForm.value;
        const user = await this.authService.loginUser(email, password);
        
        if (user) {
          // Handle rememberMe logic
          if (rememberMe) {
            localStorage.setItem('savedEmail', email); // Save email in localStorage
          } else {
            localStorage.removeItem('savedEmail'); // Clear saved email if unchecked
          }

          await loading.dismiss();
          this.router.navigate(['/home']);
        }
      } catch (err: any) {
        await loading.dismiss();
        this.presentToast(err?.message || 'Login failed. Please try again.');
        console.log(err);
      }
    } else {
      await loading.dismiss();
      this.presentToast('Please provide all the required values!');
      console.log('Invalid form submission');
    }
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: 'top',
    });
    await toast.present();
  }
}
