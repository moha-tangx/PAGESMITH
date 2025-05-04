# PS

**PAGE SMITH** Templating engine created to be compatible with all your node.js applications

whether you are using a framework like express or using vanilla node js **_page smith_** ⚒️ got you covered.

## FEATURES

### - **FAST** ⚡⚡⚡

### - **ROBUST** 🎡🎡🎡

### - **SIMPLE** 🌼🌼🌼

### - **COMPATIBLE**🔌🔌🔌

### - **POWERFUL** 💪🏿💪🏿💪🏿

## USAGE

### npm

```js
npm install pagesmith
```

This defaults to the views directory in the application root directory

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>user/${user.userName}</title>
  </head>
  <body>
    <header>...</header>
    <main>
      <h1>${user.userName}$</h1>
      <h4>${user.name}$</h4>
      <span>followers : ${user.followers}$</span>
      <span>following : ${user.following}$</span>
      <section>
        <h1>POSTS</h1>
        ${user.posts.map(p=>`
        <h1>${p.tittle}</h1>
        <p>date : ${p.date}</p>
        <p>author : ${user.userName}</p>
        `)}$
      </section>
      <section>
        <h1>
          ${user.isOnline? args.userName + " is currently online":args.userName
          + " is offline" }$
        </h1>
      </section>
    </main>
  </body>
</html>
```

### EXAMPLE

// app.js

```js
import { express } from "node:http";
import { parseSync } from "pagesmith";
import Users from "users.model.js"; //database model (ORM layer)

const app = express();

app.get("users/:userName",(req,res,next)=>{
  const user = Users.find(req.params.userName);
  if(!user) return res.status(404).json({message:"user not found"});
  return res.render("user.ps",user)
})
```
