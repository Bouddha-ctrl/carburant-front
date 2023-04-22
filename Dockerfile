# build stage
FROM node:16-alpine AS build

# set working directory
WORKDIR /app

# copy package.json and package-lock.json
COPY package*.json ./
RUN yarn install

# copy app files
COPY . .

# build the app
RUN yarn build

# production stage
FROM nginx:stable-alpine AS production

# copy built files from the build stage
COPY --from=build /app/dist/carburant-front /usr/share/nginx/html

# expose port 80
EXPOSE 80

# start nginx
CMD ["nginx", "-g", "daemon off;"]
