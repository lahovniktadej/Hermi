FROM node as build

WORKDIR /app
COPY public ./public
COPY src ./src
COPY package*.json ./
COPY jsconfig.json ./
RUN npm install
RUN npm run build

FROM nginx
COPY --from=build /app/build /usr/share/nginx/html

EXPOSE 80
