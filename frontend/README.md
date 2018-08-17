# Vue Paperless View Frontend

> Vue frontend for Paperless. The assumption is to have the frontend for most of the common operations, while for any specific edits/updates we can use Paperless Django Admin endpoint.
> The goal is to make it a drop-in replacement for default views, without any changes to underlying Paperless Django codebase.

> The UI is based on Google Keep layout of Vuetify.js:

https://vuetifyjs.com/en/examples/layouts/googleKeep

## Requirements
- latest Paperless as it will include fix to enable CORS

## Build Setup

- Step 1
- change config files in dev.env.js and/or prod.env.js to point to your Paperless instance
- until RC3, this should be a separate app - at least different port than your Paperless instance
- To make it work, you will need to update your Paperless paperless.conf and update PAPERLESS_CORS_ALLOWED_HOSTS to
  include your Vue app host:port

# The RC1 works with a couple of assumtions:

- Paperless is configured to allow anonymous login
- CORS are enabled for API calls from another domain/port

# The RC2 candidate will be in a more complete state:
- proper login/logout workflow

# The RC3 is a semi-beta release:

- integrated with Django and can be a drop in replacement

# Roadmap:

- version 0.1
  - [x] initial code
  - [x] basic view of documents
  - [x] download of documents
  - [x] search bar
  - [x] tags

- version 0.2 - RC1 - usable state
  - [x] unified settings for Django endpoint
  - [x] CORS clean up
  - [x] code clean up

- version 0.3
  - [ ] log in/ log out
  - [ ] change Vue to local build

- version 0.4 - RC2 - can work as a separate app running on the same machine
  - [ ] edit document
  - [ ] upload single document
  - [ ] pagination of documents
  - [ ] code clean v2

- version 0.5 - RC3 - beta - we have all the features for daily usage
  - [ ] django-ify - integrate with Django
  - [ ] pagination

(unplanned, but possible nice to haves)
- version 0.6
  - [ ] search by dates
  - [ ] add correspondents
  - [ ] add extra features to Paperless API, like log level

- version 0.7 
  - [ ] add reminders
  - [ ] add edits of the above

  
``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```