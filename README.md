# Woovi Challenge: Design Credit on top of Pix

## About the project

This repo is my solution for the [woovi challenge](https://gist.github.com/sibelius/b1a10021b83165a72de8b31e7b9d58c5)<br>
The proposal is draw a Architecture to enable credit payment with pix 🤑

Tha idea is payment with the pix first, and rest of the value on credit card

![Payment method pix+credit card of Woovi](https://user-images.githubusercontent.com/2005841/208023052-ce50a746-df80-4687-9430-eab399eabd5a.png)


## Software Architecture
![payment](https://user-images.githubusercontent.com/13812512/208728015-6bbfb6bd-2781-422e-8f5d-58a18ccfeb60.png)



### **Architecture Explanation**

Aplicações da arquiteura e motivações:

 - Nginx
   * Load balancer
   * Cache
   * Request Limit
 - API/BFF
   * [Backend for frontend aplication](https://www.mobilelive.ca/blog/why-backend-for-frontend-application-architecture#:~:text=Backend%20For%20Frontend%20is%20a,their%20diverse%20and%20evolving%20needs.)
     * Can be use AWS Api gateway, Kong, or an api with Graphql.
 - PaymentAPI
   * API for manage payments, create, cancel, refund or other operations can be here.
   * Can be maded with any lang, node, golang, rust, RoR.
 - PaymentWebsocket
   * Realtime updates on user screen 
 - Queue
   * I recommend Kafka, SQS or GCP Pub/Sub 
   * Kafka each message on topic can be read by all listeners once time
   * The same architecture can be build with most simple with Node+Redis(Bull) or Go+Nats(and Stan)
 - NotifyWorker, TimelineWorker, ChargeWorker
   * It's just workers, read the topic and do something asynchronous, they are separated here, so there is no competition with user resources
   * I recommend serverless for these
 - CreditCardAPI, PixAPI (A simple proxy to real services)
   * Create charge on BaaS or Payment Gateway
   * If necessary, it can be an API and split the demand in the future
 - Pix/Card webhook
   * A simple webhook of a BaaS and/or Payment Gateway, to notify the system status of payments
 - TimelineAPI, ChargeAPI
   * Real API's can be called by BFF or another apis, with a HTTP/2, GRPC or using QUEUE, to response sync requests.
   * All updates to respective Databases need pass by these apis
   * Can be maded with any lang, node, golang, rust, RoR.

## About this repo

Made with [turborepo](https://turbo.build/repo), [serverless framework](https://www.serverless.com/) and  [pnpm](https://pnpm.io)

This is a monorepo with:
 - PaymentAPI
 - PaymentWebwsocket
 - NotifyWorker
 - TimelineWroker
 - ChargeWorker
 - ChargeWorker
 - CreditCardAPI
 - PixAPI
 - Pix/Card webhook
 - TimelineAPI
 - ChargeAPI

### Packages 
*default of turborepo, can be updated on futures commits

- `eslint-config-custom`: `eslint` configurations (includes `eslint-config-prettier`)
- `tsconfig`: `tsconfig.json`s used throughout the monorepo

Each package is 100% [TypeScript](https://www.typescriptlang.org/).

### Services

 - `payment`: lambda made with serverless framework demo to build the real services. Run `pnpm dev` to run the offline in offline mode.

### Utilities

This turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Prettier](https://prettier.io) for code formatting
- [Github Actions](https://github.com/features/actions) for CI.

### Build

To build all packages and services, run the following command:

```bash
pnpm run build
```

### Develop

To develop all apps and packages, run the following command:

```bash
pnpm run dev
```

## Get started

- clone this repo
- install [pnpm](https://pnpm.io/installation) for package management.
- install the dependencies: `pnpm i`.
