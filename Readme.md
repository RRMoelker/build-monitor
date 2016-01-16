# Mobile build monitor

MQTT & Push notification build monitor system.

# Monitor only
To just read the state of your build try out the live site.

`https://rrmoelker.github.io/build-monitor/client/?user=<user>&password=<pass>`

Fill in your user and password atleast once. It will be stored in cache from that point on (yeah, not the safest...). The app will connect to the "m20.cloudmqtt.com" broker. This will likely be configurable in the future.

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
