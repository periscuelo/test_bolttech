# bolttech-api

## # Description

This API is responsible by supply the bolttech _Web Application_.

We use here some technologies like:

- [**NodeJs 18.17.1**](https://nodejs.org/en) with _ECMA 6_
- [**fastify**](https://www.fastify.io) [![NPM version](https://img.shields.io/npm/v/fastify.svg?style=flat)](https://www.npmjs.com/package/fastify)
- [**prisma**](https://www.prisma.io) [![NPM version](https://img.shields.io/npm/v/prisma.svg?style=flat)](https://www.npmjs.com/package/prisma)
- [**Jest (for Integration Tests)**](https://jestjs.io/) [![NPM version](https://badge.fury.io/js/jest.svg)](https://www.npmjs.com/package/jest)
- [**Json Web Token (JWT)**](https://jwt.io)
- [**MySQL 5.7**](https://www.mysql.com)
- [**Docker**](https://www.docker.com)

- [How to setup this API on my local machine?](https://github.com/periscuelo/test_bolttech/tree/main/api#-steps-to-setup)
- [How it's our gitflow here?](https://github.com/periscuelo/test_bolttech/tree/main/api#-gitflow)
- [How to validate params on endpoints?](https://github.com/periscuelo/test_bolttech/tree/main/api#-endpoint-validation)
- [How to use prisma to make migrations?](https://github.com/periscuelo/test_bolttech/tree/main/api#-prisma-basics)
- [How to scan the project with sonarqube?](https://github.com/periscuelo/test_bolttech/tree/main/api#-sonarqube-basics)
- [Can I see if the environments is working?](https://github.com/periscuelo/test_bolttech/tree/main/api#-useful-links)

We not use classes in this project, but we have some concepts is good to know to avoid break the pattern of API.

- [Clean Code EN-US](https://github.com/ryanmcdermott/clean-code-javascript)
- [Clean Code PT-BR](https://github.com/felipe-augusto/clean-code-javascript)

## # Steps to setup

### _1 Configuration_

1.  Edit your hosts file with:
    > 127.0.0.1 api-local.bolttech.com  
    > 127.0.0.1 db-local.bolttech.com
2.  Create env files:
    > .env  
    > .env.test
3.  Use env.example to fill all envs with correct values
4.  Make a npm install on your api local folder to lint work
5.  Make sure you have extensions below installed and enabled on your vscode  
    (or other versions compatible for your IDE)
    > [Better Comments (by Aaron Bond)](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)  
    > [codedox (by wiggin77)](https://marketplace.visualstudio.com/items?itemName=wiggin77.codedox)  
    > [EditorConfig for VSCode (by EditorConfig)](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)  
    > [ESLint (by Dirk Bauemer)](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)  
    > [Prisma (by Prisma)](https://marketplace.visualstudio.com/items?itemName=Prisma.prisma) > [StandardJS (by Standard)](https://marketplace.visualstudio.com/items?itemName=standard.vscode-standard)  
    > [Thunder Client (by Ranga Vadhineni)](https://marketplace.visualstudio.com/items?itemName=rangav.vscode-thunder-client)

### _2 Run_

`$ docker-compose up`

> Detached mode

`$ docker-compose up -d`

### _3 Container Logs_

To see what happens with the container you can run the container without detached mode, or by command below:

`$ docker logs bolttech-api`

or watch the logs like below:

`$ docker logs -ft bolttech-api`

Also if you are using DockerDesktop on MAC OS OR Windows, you can use the dashboard too.

### _4 Testing_

Access this url on your browser: "https://api-local.bolttech.com/v1"  
If returns the message "Welcome to API Bolttech V1" that's working perfectly!

### _5 Thunder Client_

One way to make the endpoint test faster is by use this vscode extension.

We have a folder named thunder with all environments to import and of course,  
with the collection.

Is very important to keep the collection updated. In this way all work will be easier.

If you prefer, can use postman too, but we will keep updating thunder collections.

Never used Thunder Client before? This [video](https://www.youtube.com/watch?v=6D0tz7tc-k0) can help!

## # Gitflow

We have some rules to follow when we talk about git. You can see some below:

- Always create feature branches with specific objective. Objectives can be feature,  
  bug or refactor. To create a new feature branch, make this from staging branch.

  > git checkout -b feature/do-something

- Do not use git pull. You can have many trouble making this if you pull much code  
  to merge, because many conflicts can happen. Rebase treat conflicts one by one,  
  making things easier to us than all conflicts together in one single merge.

  > git pull --rebase

- You've to keep your feature branch updated with the staging branch. Therefore,  
  never use git merge for do this. We will use rebase for keep a clean git
  history.

  > git checkout feature/do-something  
  > git rebase staging

- Always open a Pull Request to Development branch. If you've new environments  
  variables, put this info on PR description.

- Use the PR description to describe which features the PR contains. Jira task  
  references can be an additional information.

- Always update the endpoint docs. If you has made a new route or changed the  
  endpoint return data, the docs need to be updated. Your PR will not be merged  
  until the docs be updated.

- The entire API follow patterns, even when we talk about unnecessary console.logs  
  or spaces between:

  > return lines  
  > variables  
  > loops  
  > functions  
  > promise chain like then, catch and etc

        Please, pay attention to this to avoid unnecessary review points.
        Make use of our standard linter.

- Your feature branch was deployed on master branch? You've to erase this feature  
  branch. Make this, is your duty. Don't forget it.

## # Endpoint validation

We use fastify json schema to validate params on routes of API.  
You can see on [docs](https://www.fastify.io/docs/latest/Validation-and-Serialization/) about it.  
Of course, if you want to have more info about [json schema](https://json-schema.org/), they have [docs](https://json-schema.org/understanding-json-schema/index.html) too.

## # Prisma basics

Prisma is used here with _repository pattern_. Then, all repository functions will  
return a _promise_. Please, do not use _async_ notation in functions if you won't go  
use _await_ in there. Use documentation notes if you want to be specific.

### _Create new migration_

`$ npx prisma migrate dev --name myMigration`

### _Run existing migrations_

`$ npx prisma migrate deploy`

### _Create new migration with changes before deploy_

`$ npx prisma migrate dev --name myMigration --create-only`

change SQL on migration as you need and after

`$ npx prisma migrate deploy`

### _Execute migration to test database_

Use the command below when the local migration it's ready, as you need.

`$ npm run migrate-test`

### _Seed database_

Use one of commands below when the local migration it's ready, as you need.

`$ npm run seed`  
`$ npm run seed-test`

## # Author

- Ibrahim Brumate - [Github](https://github.com/periscuelo)
