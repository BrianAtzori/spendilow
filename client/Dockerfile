FROM node:alpine as builder

WORKDIR /app

COPY package.json .
COPY package-lock.json .

RUN npm install

COPY . .

RUN npm run build

FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]

# FROM node as stage

# WORKDIR /app

# COPY package.json .
# COPY package-lock.json .
# COPY public .
# RUN npm install
# COPY . .
# RUN npm run build

# # COPY ./dist ./app/dist

# FROM nginx

# COPY --from=stage /app/dist /usr/share/nginx/html

# EXPOSE 80

# CMD [ "nginx", "-g", "daemon off;"]

# ## EXPOSE [Port you mentioned in the vite.config file]

# # EXPOSE 5173

# # CMD ["npm", "run", "dev"]