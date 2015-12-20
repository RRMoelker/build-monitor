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
The file `client/js/credentials.js` contains you MQTT broker settings.
It should look like:

```js
var creds = {
  user: "<username>",
  password: "<password>"
};

var broker = {
  hostname: "<broker_domain>",
  port: <broker_port>
};
```

## Development

### Icons
ImageMagick is required to create icons. Otherwise icon generation will fail silently.

To create icons:

```bash
grunt favicons
```