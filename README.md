## Personal Info

- Name: Muhamad Arif Nurrohman
- Email: arif.kobe@gmail.com
- No Hp: 081649627671

## Instalation

1. Clone this repo

```bash
    git clone https://github.com/komporbakar/SE-challenge2.git
```

2. Open this file

```bash
    cd SE-challenge2
```

3. Install NPM

```bash
    npm install
```

4. Setup Databas

   - create database postgre sql microblog
   - create table users, posts, comments, and follows and field
   - table users = id, name, email, password, image, created_at
   - table posts = id, title, image, description, created_at, updated_at
   - table comments = id, post_id, user_id, created_at
   - table follows = follower_id, following_id, created_at

5. Run Express Js

```bash
    npm run start
```

6. Open Documentation

```bash
    http://localhost:4011/documentation
```
