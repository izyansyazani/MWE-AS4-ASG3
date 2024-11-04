// import { Component, OnInit } from '@angular/core';
// import { CommonModule } from '@angular/common';
// import { FormsModule } from '@angular/forms';
// import { RouterModule } from '@angular/router';

// import { Router } from '@angular/router';
// import { AuthServiceService } from 'src/app/auth-service.service';
// import { FormGroup, FormBuilder, Validators } from '@angular/forms';
// import { AlertController, LoadingController } from '@ionic/angular';
// import { ToastController } from '@ionic/angular';

// import {
//   IonContent,
//   IonHeader,
//   IonTitle,
//   IonToolbar,
//   IonText,
//   IonTextarea,
//   IonLabel,
//   IonButton,
//   IonInput,
// } from '@ionic/angular/standalone';

// @Component({
//   selector: 'app-signup',
//   templateUrl: './signup.page.html',
//   styleUrls: ['./signup.page.scss'],
//   standalone: true,
//   imports: [
//     IonInput,
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
//     RouterModule,
//   ],
// })
// // export class SignupPage implements OnInit {
// //   constructor() {}

// //   ngOnInit() {}
// // }


// export class SignupPage implements OnInit {
//   ionicForm: FormGroup;

//   constructor(private toastController: ToastController,private loadingController: LoadingController,private authService:AuthServiceService,private router: Router, public formBuilder: FormBuilder) { 

//   }

//   ngOnInit() {
//     // this.signUP()
//     this.ionicForm = this.formBuilder.group({
//       fullname:['',
//         [Validators.required]
//       ],
//       contact:['',
//       [
//         Validators.required,
//         Validators.pattern("^[0-9]*$"),
//         Validators.minLength(10),
//         // Validators.min(10)
//       ]
//     ],
//       email: [
//         '',
//         [
//           Validators.required,
//           Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$'),
//         ],
//       ],
//       password: ['', [
//         Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-8])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,}'),
//         Validators.required,
//       ],
//     ],
//     });
//   }
//   get errorControl() {
//     return this.ionicForm.controls;
//   }
//   // async signUpWithGoogle(){
//   //   const loading = await this.loadingController.create();
//   //   // await loading.present();

//   //   const user = await this.authService.GoogleAuth().then((re)=>{
//   //     console.log(re);
      
//   //     // this.router.navigate(['/home'])
//   //   })
//   // }
 
//   async signUP(){
//     const loading = await this.loadingController.create();
//     await loading.present();
//     if (this.ionicForm.valid) {

//       const user = await this.authService.registerUser(this.ionicForm.value.email, this.ionicForm.value.password,this.ionicForm.value.fullname).catch((err) => {
//         this.presentToast(err)
//         console.log(err);
//         loading.dismiss();
//       })

//       if (user) {
//         loading.dismiss();
//         this.router.navigate(['/home'])
//       }
//     } else {
//       return console.log('Please provide all the required values!');
//     }
//   }
  
//   async presentToast(message: undefined) {
//     console.log(message);
    
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
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/auth-service.service';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

import {
  IonContent,
  IonHeader,
  IonTitle,
  IonToolbar,
  IonText,
  IonTextarea,
  IonLabel,
  IonButton,
  IonInput,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
  standalone: true,
  imports: [
    IonInput,
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
    RouterModule,
  ],
})
export class SignupPage implements OnInit {
  ionicForm!: FormGroup;

  constructor(
    private toastController: ToastController,
    private loadingController: LoadingController,
    private authService: AuthServiceService,
    private router: Router,
    public formBuilder: FormBuilder
  ) {}

  ngOnInit() {
    this.ionicForm = this.formBuilder.group({
      fullname: ['', Validators.required],
      contact: [
        '',
        [Validators.required, Validators.pattern('^[0-9]{7}$'), Validators.minLength(7)],
      ],
      email: [
        '',
        [Validators.required, Validators.pattern('[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,}$')],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.pattern(
            '(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[$@$!%*?&])[A-Za-z\\d$@$!%*?&].{8,}'
          ),
        ],
      ],
    });
  }

  get errorControl() {
    return this.ionicForm.controls;
  }

  async signUP() {
    console.log('Sign Up button clicked');
    const loading = await this.loadingController.create();
    await loading.present();
    
    if (this.ionicForm.valid) {
      try {
        console.log('Form is valid, attempting to register user');
        const userCredential = await this.authService.registerUser(
          this.ionicForm.value.email,
          this.ionicForm.value.password,
          this.ionicForm.value.fullname
        );
        console.log('User registered successfully:', userCredential);
  
        loading.dismiss();
        // Navigate to login page after successful registration
        // this.router.navigate(['/login']);
      } catch (err) {
        loading.dismiss();
        console.error('Error during registration:', err);
        if (err instanceof Error) {
          await this.presentToast(err.message);
        } else {
          await this.presentToast('An unexpected error occurred.');
        }
      }
    } else {
      loading.dismiss();
      await this.presentToast('Please provide all the required values!');
    }  
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