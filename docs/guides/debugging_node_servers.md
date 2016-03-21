# Debugging the node server


## SSH

To ssh to the servers you need to have ssh access in `Foxpass`,
ask Mike if you need access.

You can ssh into dev and staging servers using the `public ip` for the server.
You can get it from the AWS console, using the
[`aws cli`](https://aws.amazon.com/cli/) or you
can ssh using [`jay`](https://github.com/colorstain/jay).

Production is different, to ssh into production you need to use the
[production vpn](https://vpn.blink.codes). You should use the password
you set in `Foxpass`. Now you can ssh into the server using the `private ip`.

## Server Stack

Each application server runs the node application using
[`pm2`](https://github.com/Unitech/pm2), a node process manager that takes
care of keeping the application up.
[`Nginx`](https://www.nginx.com/resources/wiki/) acts as the web server
proxying and caching the node application.

All application servers are load balanced using an `Elasctic Load Balancer`
that handles `https`. All application servers are configured the same way.

## Configuration

Most of the server configuration lives in the
[ops repository](https://github.com/blinkhealth/ops). The ansible roles
take care of adding all the `nginx` and `node` configuration files
to the server.

If you want to add specific values to the `config.local.json` file,
you need to modify the ansible playbook for each environment.

Sample dev config (ops/ansible/dev2.yml),
the object in `website_config` becomes the  `config.local.json` file:

```yaml
- hosts: tag_role_website
  tags: release-website
  vars:
    user: ubuntu
    repo: rx-web
    branch: develop
    env: dev2
    DEPLOY_ENV: dev2
    api_server: https://vitaldev2api.beta.cat
    dns_ip: 10.0.0.2
    website_config:
      staticPath: ''
      stripeKey: myStripeKey
  roles:
    - website
```

Nginx config is located at
[`ops/ansible/roles/website/templates/nginx-config`](https://github.com/blinkhealth/ops/blob/master/ansible/roles/website/templates/nginx-config).


## Logs

Application logs are forwarded to graylog, but a copy is kept locally.
Nginx can only be read from the server. The logs can be
found at `/var/log/vital/`.

To read the logs:
 - `sudo less /var/log/vital/website.log`

Nginx logs can be found at `/var/log/nginx/`.

Read error log:
- `sudo less /var/log/nginx/error.log`

Read access log:
- `sudo less /var/log/nginx/access.log`

## Restarting

To restart nginx:
- `sudo service nginx restart`

To restart the app
- `sudo stop website; sudo start website`
