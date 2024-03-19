FROM node

WORKDIR /app

COPY package.json .
COPY . .
COPY public .
RUN npm i

COPY . .

## EXPOSE [Port you mentioned in the vite.config file]

EXPOSE 5173

CMD ["npm", "run", "dev"]