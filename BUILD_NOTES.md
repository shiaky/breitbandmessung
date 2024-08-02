Install arm emulation

```
docker run --privileged --rm tonistiigi/binfmt --install all
docker run --privileged --rm tonistiigi/binfmt --install arm64,riscv64,arm
```

Crate builder

```
docker buildx create --name breitbandmessung_builder
```

Use builder

```
docker buildx use breitbandmessung_builder
```

```
docker buildx build  --platform linux/amd64,linux/arm64,linux/arm/v7 -t shiaky/breitbandmessung:latest --push .
```

Fix no node problem:

```
docker run --rm --privileged multiarch/qemu-user-static --reset -p yes
```
