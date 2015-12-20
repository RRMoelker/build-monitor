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

### Client settings
The MQTT broker is set up with a user password combination. It has to be provided at least once using GET parameters.
Open the page with:

`?user=<username>&password=<password>`

## Development

### Icons
ImageMagick is required to create icons. If not installed correctly icon generation will fail silently.

To create icons:

```bash
grunt favicons
```