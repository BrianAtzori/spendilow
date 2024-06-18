# Spendilow, a webapp to keep track of personal finances 💰

![spendilow_logo](spendilow-logo-svg.svg)

---

Last exam project of my studies as a Full Stack Developer @ Start2Impact 🚀

[Repository](https://github.com/BrianAtzori/spendilow) · [Report Bug](https://github.com/BrianAtzori/spendilow/issues) · [Request Feature](https://github.com/BrianAtzori/spendilow/issues) · [Try the application](https://brianatzori.it/spendilow/)

## ABOUT THE PROJECT 🧶

### The exam track

_"With this project you complete the Master's in Full Stack Development in start2impact University and certify the practical skills acquired. Build a frontend app, whether a single-page-application or a multi-page-application, that can handle calls to RESTful APIs, developed by you, that implement a user login/logout and registration system.
Then add, to the API, functionality of your own choosing.
Choose a back end language and a front end framework from those studied in your course on start2impact."_

### My work

Spendilow is a Fullstack application composed of a frontend written in ReactJS and ExpressJS, enriched with Typescript flavoring.
The application is a simple system for tracking one's personal finances.
Within Spendilow you will be able to create and define a transaction, i.e., an income, expense or budget transaction that represents an accumulation assigned to a financial goal.

In simple, you can:

- Create a personal account, with a profile pic and if you want you can have a simple MFA system with Google Auth
- Create a transaction, with a name, a date... and assign that transaction to a budget, or treat that transaction as an expense or income
- See a simple dashboard with your calculated data
- Create a budget (we can see it as a financial goal), and then assign transactions to that goal

The APIs are public so you can build you own frontend!

> You can see the APIs documentation [here 📄](https://github.com/BrianAtzori/spendilow/blob/main/docs/api/routes.md)

## BACKEND BUILT WITH 🛠️

- Node JS
- Express JS (With Typescript)
- Data stored with MariaDB
- DB Managed with PHP MyAdmin
- Tested with Chai & Mocha
- Documented with Swagger

> You can test the APIs [here 📍](https://spendilow.brianatzori.it/api-docs/)

## INFRASTRUCTURE BUILT WITH 🏗️

- My own [Proxmox](https://www.proxmox.com/it/) node as the host for...
- ... a LXC container containing...
- A set of docker containers with:
  - The Database
  - The DB Manager
  - The backend
- Everything is accessible through internet thanks to a NAT + Reverse Proxy system that redirects traffic from the firewall to the internal network
- The same hosting for my personal website used for the frontend static site, in a dedicated subfolder

## FRONTEND BUILT WITH 🎨

- React JS (With Typescript)
- Vite
- Tailwind CSS
- Redux Toolkit
- Axios
- Prettier + ESLint

> You can test the application [here 📍](https://brianatzori.it/spendilow/)

### USAGE

...TBD

### CONTACTS

- 🤝🏻 My portfolio/Personal Website - https://www.brianatzori.it/

- 👽 Brian Atzori - <hello@brianatzori.it>

- 📖 Meet me @ https://linktr.ee/brianatzori
