# Okadoc Frontend Libraries

Okadoc frontend libraries (`okadoc-libs`) that used by many Okadoc's applications, a Javascript package library registered at [Okadoc Verdaccio](https://verda.okadoc.com/), see more details for <a href="https://okadoc.atlassian.net/wiki/spaces/TECH/pages/304120147/Okadoc+Package+registry"><strong>Okadoc Package Registry</strong></a>.

<br />

## Installation
Use the node package manager [yarn](https://yarnpkg.com/getting-started/install) to add the package into your application as project dependencies.

```bash
yarn add okadoc-libs --registry https://verda.okadoc.com/
```

## What's Inside

Currently `okadoc-libs` package contains:

1. **Kong HMAC** <br />
   Generates headers that used for the request validation by [Kong](https://kongadmin.okadoc.net/) gateaway, <a href="https://okadoc.atlassian.net/wiki/spaces/TECH/pages/345112861/Kong+HMAC"><strong>more details</strong></a>.
