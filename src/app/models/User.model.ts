// ++  autre syntaxe, plus longue
// export class User {
//   firstName: string;
//   lastName: string;
  
//   constructor(firstName: string,
//     lastName: string) {
//     this.firstName = firstName;
//     this.lastName = lastName
//     }
// }

// ++ en ajoutant public, le constructor créé les propriétés dans le modèle User
// ++ ? optionnel
export class User {
  constructor(
    public firstName: string,
    public lastName: string,
    public email: string,
    public drinkPreference: string,

    // ++ ? optionnel
    public hobbies?: string[]
  ){}
}