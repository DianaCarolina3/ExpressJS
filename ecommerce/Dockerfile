FROM node:10-alpine
WORKDIR /srv/app
COPY . .
RUN npm install
EXPOSE 8000
ENV NODE_ENV=production
CMD ["node", "index.js"]