# API Cheatsheet

## Base Route: /api/v1/

### Route /users

| Path | Function |
| ----------- | ----------- |
| /new | Sign up with a new profile |
| /login | Login with user credentials |
| /mfa-activation | Activate MFA for a profile |
| /mfa-verification | Verify MFA sent by user |

### Route /authenticated-users

| Path | Function |
| ----------- | ----------- |
| /get-profile/ | Get a user profile (id, email, profile pic and other information ) |
| /mod/ | Modify a user profile |
| /del/ | Delete a user account |
| /logout/ | Logout a user account |

### Route /authenticated-users/transactions

| Path | Function |
| ----------- | ----------- |
| /new | Create a new Spendilow Transaction |
| /get/all | Get all the transactions of the logged user |
| /get/:id | Get the single transaction |
| /mod/:id | Edit the single transaction |
| /del/:id | Delete the single transaction |
| /generate | For debug and build purposes, generate random transactions for a user |

### Route /utilities

| Path | Function |
| ----------- | ----------- |
| /check-server-alive | Verify if server is up and running |
