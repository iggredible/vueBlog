# dev.to Blog

We all agree that [dev.to](https://dev.to/) is the best dev spot in the world. What if you want to cross posts your articles into your own personal vue site but too lazy to copy-paste them each time?

Now you can fetch all your dev.to posts and put them in your personal blog.

This app uses [dotenv](https://github.com/motdotla/dotenv) to store your DEV_KEY info. Create a `.env` file in project root and add `DEV_KEY=YOUR_DEV_KEY_HERE`

You can find your `DEV_KEY` inside Settings -> Account

### Fetching posts
Before running the app, fetch your posts by running

```
npm run fetch-dev
```

### Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

#### Lints and fixes files
```
npm run lint
```


Made with 💪 using [vue-cli](https://cli.vuejs.org/).

# Resources:
- [dev.to API](https://docs.dev.to/api/)
- [vue-cli](https://cli.vuejs.org/)
