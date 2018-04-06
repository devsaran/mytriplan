import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { User } from 'firebase/app';

import { AuthServiceProvider, PhotoProvider } from '../../providers/providers';

/**
 * Generated class for the ProfilePage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  @ViewChild('fileInput') fileInput;

  user: User;

  constructor(public navCtrl: NavController, public navParams: NavParams, private auth: AuthServiceProvider, private photoProvider: PhotoProvider) {
    this.user = this.auth.getCurrentUser();
  }

  ionViewDidLoad() { }

  getPicture() {
    this.photoProvider.getPicture().then(data => data? this.updateUserPhoto(data): this.fileInput.nativeElement.click());
  }

  processWebPicture(event) {
    this.photoProvider.processWebPicture(event.target.files[0]).then(data => this.updateUserPhoto(data));
  }

  updateUserPhoto(imageData: string) {
    this.auth.updateUser({photoURL: imageData});
  }

  updateUserDisplayName(name: string) {
    this.auth.updateUser({displayName: name}).then(data => console.log('User display name updated successfully.'));
  }
}