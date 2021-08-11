## Deploy fast/light node of Ethereum on AWS with docker.

1. Connect AWS, and download docker.

2. Pull GETH repository from docker.

```
$ docker pull ethereum/client-go
```

3. Running the fast node:

```
$ docker run -d --name ethereum-node -v /home/ubuntu/defi/data/:/root/.ethereum -p 8545:8545 -p 30303:30303 ethereum/client-go --syncmode "fast"
```

4. Check the Geth status in docker:

```
$ docker ps -a
```

Find out the NAMES of the started CONTAINER, here is `ethereum-node`.

5. If you have already started a container with the same name, you can just remove it with:

```
$ docker rm -f ethereum-node
```

6. Activate a shell in a container, you should set the `ethereum-node` to your container name.:

```
$ docker exec -it ethereum-node /bin/sh
```

More information about `docker exec` is [here](https://docs.docker.com/engine/reference/commandline/exec/).

7. Then attach the Geth:

```
$ geth attach
```

8. Check the synchronous data:

```
$ eth.syncing
```

check the transaction pool:

```
$ txpool.status
```

check the peerCount

```
net.peerCount
```

check the blockNumber:

```
eth.blockNumber
```

More commands about the Geth is [here](https://geth.ethereum.org/docs/interface/command-line-options).


-----------------------------------------------------------------------------------------------------------
### Reference: 

#### Docker document: https://www.runoob.com/docker/docker-tutorial.html
#### Go Ethereum Document: https://geth.ethereum.org/docs/
#### Go Ethereum of docker: https://hub.docker.com/r/ethereum/client-go/
