# Profile Api (Kaurds)
This is a simple api of the [ProfileCard](https://github.com/KauaZs/profile-card) project

1. Clone this repository:
   ```bash
   git clone https://github.com/KauaZs/profile-api
   ```

2. Navigate to the project directory:
   ```bash
   cd profile-api
   ```

3. Install the dependencies:
   ```bash
   npm install
   ```

4. Create your .env file:
   ```env
    CLIENT_ID=YourClientId  # Get in: https://discord.com/developers
    CLIENT_SECRET=YourClientSecret #  Get in: https://discord.com/developers
    SECRET_KEY=MakeYouSecretKey  # Key Jwt
    MONGOSRV=YourMongoUrl    # https://mongodb.com
    API_KEY=MakeYouApiUrl   
    API_URL=ApiUrl # example: http://localhost:3001
    WEBSITE_URL=YourWebSiteUrl 
    PORT=Port # Example 3000
   ```

## How to Run the Project

```bash
npm run dev
```

The application will start at `http://localhost:3000` in your browser.


## License

This project is open-source and distributed under the MIT license.
