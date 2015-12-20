# Mobile build monitor

MQTT & Push notification build monitor system.

## client

In the client folder start a http server with:
```bash
http-server
```

To start a secure server you need to create keys with:

```bash
client/ssl/create_cert.sh
```

After that you can start a https server using:

```bash
http-server -S -K ssl/server.key -C ssl/server.crt
```

