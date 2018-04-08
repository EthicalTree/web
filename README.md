# 🎉 EthicalTree Web 🎉

[![EthicalTree Project](https://img.shields.io/badge/site-EthicalTree-blue.svg)](https://ethicaltree.com)

## Prerequisites

Go checkout the [EthicalTree API](https://github.com/applepicke/ethicaltree-api) and get it up and running first.


## Installation

```
npm install
npm start
```

## Simulating a Production Environment

Some of the EthicalTree architecture requires a form of server-side rendering, and in order to test this locally you need to simulate http proxies in production.

```
npm run simulate-production
```

This will do the following:

- build a development copy of `ethicaltree-web` into `./build`
- run a docker container acting as a proxy to the SSR server
- run a docker container that will proxy to `./build`
