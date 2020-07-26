# Games Feed

Kinda like a reverse feed service notification bot (or should I say push notification system? :woman_shrugging:)

This bot's sole purpose is to keep you updated on different news regarding games
on different platforms, be it availability (Geforce Now), or price drops on
digital stores (PSN, Switch, Steam, among others).

## Motivation

Why did I create this? that is a fair question, the answer is that I got sick on
checking different websites/services on specific news that I was looking for. A
great example and the biggest motivation for this was the availability of new games
announced for Geforce Now streaming service. Additionally I was looking into Deno
at the time and wanted to do something cool with it, so why not :wink:

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

Deno is the only prerequisite, there are several ways of getting it, see the [official
site][deno] for options.

Optionally you may want to have a running instance of redis, in case you want to
persist the data. There are several ways to install it as well, altough my favourite
is run it via [docker][docker-redis]:

```sh
$ docker run -p 6379:6379 redis:alpine
```

[deno]: https://deno.land/#installation
[docker-redis]: https://hub.docker.com/_/redis

### Installing


```
git clone git@github.com:aotarola/games-feed.git
cd games-feed
```

### Running the bot

Firstly, you need to have some environment variables in place so the notification
and or cache system works, you can dump them into a `.env` file (which is git ignored). With
the environment variables in place, you can proceed to crawl

```sh
$ deno run -A mod.ts
```

### Supported notification services

#### Telegram

For this you will need to expose your telegram group id and telegram bot token:

* `TELEGRAM_CHAT_GID`
* `TELEGRAM_BOT_TOKEN`

### About caching

The whole idea of this bot was to make it smart enough to give you whatever news
feed it encounter, for that it need to persist the last feed. To accomplish this,
you need to have cache available, which is provided via redis at the moment, the
following environment variables need to be set:

* `REDIS_HOST` (defaults to `127.0.0.1`)
* `REDIS_PORT` (defaults to `6379`)
* `REDIS_URL` (optional, but useful when running the bot in services such as Heroku )

## Running the tests

```sh
$ deno test -A
```

## Built With

* [Deno][deno] - The JS runtime

## Authors

* **Andres Otarola** - *Initial work* - [PurpleBooth](https://github.com/aotarola)

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details
