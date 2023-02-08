# Simple Scoreboard

This is a simple scoreboard for use with esports tournaments. Currently supports incrementing and decrementing scores and flipping which side each score is on. Modifying scores requires a passphrase to prevent unwanted access.

This application currently supports one score object at a time. Score data is stored in a MongoDB database. The database connection string and the ID of the score object are stored in the `.env.local` file.

## Installation

1. Clone this repository
2. Run `npm install`
3. Add a `.env.local` file as indicated below.
4. Run `npm run dev` to start the server
5. Navigate to `localhost:3000` in your browser

### Sample .env.local file

```env
# The passphrase to use for modifying scores
PASSPHRASE=YOUR_PASSPHRASE

# The MongoDB connection string
MONGODB_URI=mongodb://<username>:<password>@<url>:<port>/<database

# The MongoDB Score Object ID
DB_ITEM_ID=YOUR_SCORE_ID
```

## Usage

1. Ensure a passphrase is set for modifying scores in the `.env.local` file
2. Using an API client such as Postman, send a `POST` request to `localhost:3000/api/scoreboard` with the following body:

```json
{
    "action": "incLeftScore | decLeftScore | incRightScore | decRightScore | flipScores",
    "passphrase": "YOUR_PASSPHRASE"
}
```

All users viewing the scoreboard will see the updated scores instantaneously.
