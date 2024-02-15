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
| /get-profile/:id | Get a user profile (id, email, profile pic and other information ) |
| /mod/:id | Modify a user profile |
| /del/:id | Delete a user account |

### Route /utilities
| Path | Function |
| ----------- | ----------- |
| /check-server-alive | Verify if server is up and running |
