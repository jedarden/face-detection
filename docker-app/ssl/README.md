# SSL certificates

This directory is the mount point for custom certificates for the **nginx
image** (`Dockerfile` / the GHCR image). `docker-compose.yml` mounts it
read-only at `/etc/nginx/ssl` in the container, replacing the self-signed
pair that image builds generate into the same location.

## Expected filenames

The TLS listener (`nginx-ssl.conf`, shipped as `/etc/nginx/conf.d/ssl.conf`
in the image — see `ssl_certificate` / `ssl_certificate_key`) loads exactly
these paths, so a replacement pair must use these names:

- `selfsigned.crt` — the certificate
- `selfsigned.key` — the private key

Both files must exist; a mounted directory missing either one makes nginx
fail to start with a missing-certificate error (the mount replaces the
image's built-in pair entirely).

## Generating a self-signed replacement

```bash
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout ssl/selfsigned.key -out ssl/selfsigned.crt \
  -subj "/CN=your.hostname.example"
```

(Run from `docker-app/`; adjust `-days` and the `-subj` name as needed.)

## Notes

- This directory only matters to the nginx image. `docker-compose.yml`'s
  production service builds `Dockerfile.simple` (node + Express, HTTP-only,
  no `/etc/nginx/ssl` usage), so for that service this directory is inert —
  see the "HTTP, HTTPS, and certificates" section in `docker-app/README.md`.
- For a production deployment prefer a publicly trusted certificate (from
  your CA or a fronting proxy) placed here under the same filenames.
