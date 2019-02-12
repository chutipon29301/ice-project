# ICE 3rd year project: Locker swarm

This repository is a part of the project in Database System (2190422), ICE Capstone (2143399), and Software Engineering (2190423) of Chulalongkorn University

### Prerequisites

Install the following tools and program to run the project

- [Docker](https://docs.docker.com/install/)
- [docker-compose](https://docs.docker.com/compose/install/)

### Installing

Follow these steps to running in development mode.

- Download the project or using `git clone`

```sh
git clone https://github.com/chutipon29301/ice-project.git
```

- Create `.env` file at root of this project using variable name from `example.env`

* Start project in watch mode with the following command

```sh
docker-compose up
```

## Testing

### Backend

- Create `test.env` file at root of backend directory using variable name from `test.example.env`
- Run these following commands

  ```sh
  $ cd backend
  # To setup test environment
  $ yarn setup-test
  # To run a test
  $ yarn test:local
  ```

## Build & Deploy

### Quick deployment with docker-compose

- Create `.env` file at root of this project using variable name from `example.env`
- Run these following commands

  ```sh
  $ docker-compose -f docker-compose.yml -f docker-compose.prod.yml build --force-rm

  $ docker-compose -f docker-compose.yml -f docker-compose.prod.yml up -d
  ```

## Authors

- **Jatuwat Sa-ngiampak** 5931216621 (0832777553) User Researcher / Hardware
- **Nicha Rojsrikul** 5931259621 (0819161060) Development and Operation
- **Chutipon Hirankanokkul** 5931239021 (0814953366) Project Manager / Backend
- **Yanisa Sunthornyotin** 5931243521 (0945561771) Backend
- **Jakpat Mingmongkolmitr** 5931217221 (0989192919) Frontend
- **Kachamas Techapichetvanich** 5931201121 (0830157988) Hardware
- **Thanakorn Prayoonkittikul** 5931265321 (0955158371) Hardware
- **Sojirath Thunprateep** 5931365421 (0813832535) Backend
- **Ukrit Wattanakulchart** 5931391721 (0933283445) Frontend
- **Anon Pongsawang** 5931389521 (0863537983) Frontend
- **Tai Tantipiwatanaskul** 5931264721 (0880055571) Frontend
