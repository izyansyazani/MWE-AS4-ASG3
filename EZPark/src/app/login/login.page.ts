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
    const rememberedEmail = localStorage.getItem('rememberedEmail');
    const rememberedPassword = localStorage.getItem('rememberedPassword');

    this.ionicForm = this.formBuilder.group({
      email: [
        rememberedEmail || '',
        [
          Validators.required,
          Validators.pattern(
            '[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,4}'
          ),
        ],
      ],
      password: [
        rememberedPassword || '',
        [
          Validators.required,
          Validators.pattern('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,}'),
        ],
      ],
      rememberMe: [!!rememberedEmail && !!rememberedPassword], // Set checkbox if both email and password are remembered
    });
  }

  async login() {
    const loading = await this.loadingController.create();
    await loading.present();

    if (this.ionicForm.valid) {
      try {
        const { email, password, rememberMe } = this.ionicForm.value;
        const user = await this.authService.loginUser(email, password);

        if (user) {
          await loading.dismiss();
          this.router.navigate(['/home']);

          // Handle "Remember me" functionality for both email and password
          if (rememberMe) {
            localStorage.setItem('rememberedEmail', email);
            localStorage.setItem('rememberedPassword', password);
          } else {
            localStorage.removeItem('rememberedEmail');
            localStorage.removeItem('rememberedPassword');
          }
        }
      } catch (err: any) {
        await loading.dismiss();
        this.presentToast(err?.message || 'Login failed. Please try again.');
      }
    } else {
      await loading.dismiss();
      this.presentToast('Please provide all the required values!');
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
