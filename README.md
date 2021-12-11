# telegram-resolve-username

A small Node.js library that resolves Telegram `@username` using `t.me` shortcut

## Usage

```js
import resolve from 'telegram-resolve-username'

await resolve('durov')

// {
//   title: 'Durov\'s Channel',
//   photo: 'https://some_long_profile_picture_cdn_url.jpg',
//   username: 'durov',
//   description: 'Thoughts from the Product Manager / CEO / Founder of Telegram.'
// }

await resolve('username_that_does_not_exist')

// null

// With options

// {
//   baseUrl: 'https://t.me',
//   throwOnError: false
// }

await resolve('durov', {
  baseUrl: 'https://some_proxy_url.com',
  throwOnError: true,
})
```

## License

MIT. See [LICENSE](LICENSE).
