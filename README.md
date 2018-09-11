# Good Guy HTTPS
Simple NodeJS Twitter bot which fetches tweets containing HTTP links.
Hosts are then checked if they have a valid SSL certificate. If not, a reply is generated informing the user about the importance of HTTPS.

[https://twitter.com/GoodGuyHTTPS](https://twitter.com/GoodGuyHTTPS)

## Installation

- Clone the repo
- `npm install`
- `cp .env.example .env` 
- Add your Twitter app credentials in `.env`
- `node index.js`