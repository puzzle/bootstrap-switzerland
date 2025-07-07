#!/bin/bash

git clone https://github.com/puzzle/bootstrap-switzerland.git

cd bootstrap-switzerland

git checkout feat/cd-bund # TODO change to main

npm i && bundle install && npm run build && JEKYLL_ENV=production bundle exec jekyll build --config _config.yml,_config_production.yml

cd ..

mv bootstrap-switzerland/_site ./_site/1.x
