
Node + Create React App + Docker Compose
========================================

A project that runs a Node server and a create-react-app app via two separate containers, using Docker Compose.


## Development

```
docker-compose up
```

For development, the `server/` and `client/` directories have their own docker containers, which are configured via the `docker-compose.yml` file.

The client server is spun up at `localhost:3000` and it proxies internally to the server using the linked name as `server:8080`.

The local directories are mounted into the containers, so changes will reflect immediately. However, changes to package.json will likely need to a rebuild: `docker-compose down && docker-compose build && docker-compose up`.

### Notes

#### Adding new scss files

The `node-sass` watch feature does not notice new files. In order to get new files working, restart the client container:

```
docker-compose restart client
```

#### Installing npm dependencies

All changes to `node_modules` should happen *inside* the containers. Install any new dependencies by inside the container. You can do this via `docker-compose run`, but it’s easier to just upadte a running container and avoid having to rebuild everything:

```
docker-compose exec client
```

Then inside:

```
npm install --save <new_dependency>
```

Run a container of the server image via:

```
comp run server /bin/bash
```

Check status:

```
comp ps
```

Stop:

```
comp down
```

Run the production image:

```
comp -f docker-compose.prod.yml up
```

NOTE: if any dependencies change in package.json files, you probably will need to rebuild the container for the changes to appear, e.g.,

```
comp down
comp build
comp up
```

Spent Hours: 10 hours

On frontend side, it has just basic functionality. But to show my capacity, I used `Redux` for state managementand `Redux-thunk` for asynchrnous calls, `Redux-actions` to create and handle actions.

On backend side, I use `memory-cache` to provide cacheable query and did 2 kinds of bonus requriement.
When we say about cache, we usually think about `Memcache` or `Redis`. Memcache has limitation that each value cannot exceed 1MB. But we are only playing with 20 posters so I think it is enough to handle it.


If I have more time,
- Backend Side
I will provide clients more accurate error handling. And also will provide them standadized response.
- Frontend Side
I will show clients that it is fetching datas(by showing spinners) and also will do some error handlings.
