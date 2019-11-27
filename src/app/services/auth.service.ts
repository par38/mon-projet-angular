export class AuthService {

  isAuth = false;

  // ++ envoyé vers auth/auth.component.ts onSignIn()
  signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          this.isAuth = true;
          resolve(true);
        }, 2000
        )
      }
    )
  }

  signOut() {
    this.isAuth = false;
  }
}
