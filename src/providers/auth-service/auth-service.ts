import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import AuthProvider = firebase.auth.AuthProvider;

/*
  Generated class for the AuthServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {
  private user: firebase.User;

  constructor(public afAuth: AngularFireAuth) {
    this.afAuth.authState.subscribe(user => {
      this.user = user;
    });
  }

  signUp(credentials: {photoUrl: string, displayName: string, email: string, password: string}): Promise<any> {
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.afAuth.auth.createUserWithEmailAndPassword(credentials.email,credentials.password);
    }).catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.error(errorCode + ': ' + JSON.stringify(errorMessage));
    });
  }

  get userLoggedIn(): boolean {
    return this.user !== null && this.user !== undefined;
  }

  getEmail() {
    return this.user && this.user.email;
  }

  getCurrentUser(): firebase.User {
    this.user || console.error("User is not logged in.");
    return this.user;
  }

  signInWithEmail (credentials: {email: string, password: string}): Promise<any> {
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.afAuth.auth.signInWithEmailAndPassword(credentials.email, credentials.password);
    }).catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.error(errorCode + ': ' + JSON.stringify(errorMessage));
    });
  }

  signInWithGoogle(): Promise<any> {
    return this.afAuth.auth.setPersistence(firebase.auth.Auth.Persistence.LOCAL).then(() => {
      return this.oauthSignIn(new firebase.auth.GoogleAuthProvider());
    }).catch((error) => {
      // Handle Errors here.
      let errorCode = error.code;
      let errorMessage = error.message;
      console.error(errorCode + ': ' + JSON.stringify(errorMessage));
    });
  }

  private oauthSignIn(provider: AuthProvider): Promise<any> {
    if (!(<any>window).cordova) {
      return this.afAuth.auth.signInWithPopup(provider);
    } else {
      return this.afAuth.auth.signInWithRedirect(provider)
      .then(() => {
        return this.afAuth.auth.getRedirectResult().then( result => {
          // This gives you a Google Access Token.
          // You can use it to access the Google API.
          let token = result.credential.accessToken;
          // The signed-in user info.
          let user = result.user;
          console.log(token, user);
        }).catch(function(error) {
          // Handle Errors here.
          alert(error.message);
        });
      });
    }
  }

  signOut(): Promise<void> {
    return this.afAuth.auth.signOut();
  }
}
