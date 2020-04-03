# loki-gm

Basic fun little project to make a GroupMe bot called Loki

## Setup

Project setup

```shell
# install deps
npm i

# install now
npm -g i now

# create .env file and enter bot_id
cp .env.template .env

# setup dev lambda server on localhost:3000
now dev

# run tests
npm test

# run tests with watcher
npm test-watch
```

Run the following to invoke the bot. Make sure to use Ironman API key 🙂

```shell
curl -X POST "localhost:3000/api/loki" \
  -H "Content-Type: application/json" \
  -d '{ "name": "Captain America",
  "text": "hey loki"
}'
```
