FROM node as stage

WORKDIR /app

COPY package.json .
COPY package-lock.json .
COPY . .
COPY public .
RUN npm install
RUN npm run build

# COPY ./dist ./app/dist

FROM nginx

COPY --from=stage /app/dist /usr/share/nginx/html

EXPOSE 80

CMD [ "nginx", "-g", "daemon off;"]

## EXPOSE [Port you mentioned in the vite.config file]

# EXPOSE 5173

# CMD ["npm", "run", "dev"]