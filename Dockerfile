FROM node:20 as builder

RUN mkdir -p /home/node/app
WORKDIR /home/node/app
COPY package*.json /home/node/app/
RUN chown -R node:node /home/node/

USER node

RUN npm ci
COPY --chown=node:node . /home/node/app
ENV NODE_ENV=production
RUN npm run build

FROM nginx:1.13.7-alpine
COPY ./nginx/nginx.conf /etc/nginx/nginx.conf
COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /home/node/app/dist /usr/share/nginx/html
