FROM node:12.18.4

RUN mkdir -p /var/www/crm

WORKDIR /var/www/crm

COPY package.json /var/www/crm
COPY yarn.lock /var/www/crm

RUN yarn

COPY . /var/www/crm

RUN rm -rf .git

EXPOSE 6969

CMD ["node", "service.js"]