export class User {
    constructor(data)
    {
        console.log(data);
      this.name = data.name;
      this.id = data.id;
      this.email = data.email;
      this.accessToken = data.accessToken;
      this.imageURL = data.imageUrl;
      this.isAuth = data.isAuth;
    }
}

