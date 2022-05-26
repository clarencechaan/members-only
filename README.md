# members-only
Live demo: https://members-only42.herokuapp.com/

Message board with non-users and 3 tiers of users:
**Non-users**: able to view messages with author name and time of post redacted
**Users**: same as non-users with the added ability to create and post messages
**Members**: same as users with the added ability to view messages' author name and time of post
**Admin**: sames members with the added ability to delete messages

To gain access as a User, sign up using the sign-up button in the header.
To gain access as a Member, be a User and enter the secret passcode in the form given in the header. (secret = "cats")
To gain access as an Admin, be a User or Member and enter the secret passcode in the Admin access form linked either in the header or in the Member access form. (secret = "pancakes")

Created using MongoDB, Express, and Node. Authentication implemented using Passport.js.
