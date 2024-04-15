# Usa un'immagine di Node.js per costruire l'app
FROM node:latest AS build

# Imposta la directory di lavoro all'interno del contenitore
WORKDIR /app

# Copia il package.json e il package-lock.json nella directory di lavoro
COPY package.json ./

# Installa le dipendenze
RUN npm install

# Copia il resto dei file nell'immagine
COPY . .

# Compila l'applicazione per la produzione
RUN npm run build

# Stage finale per servire l'applicazione
FROM nginx:alpine

# Copia i file compilati dall'immagine di build nell'immagine nginx
COPY --from=build /app/dist /usr/share/nginx/html

# Copia il file .env per le variabili d'ambiente
COPY .env /usr/share/nginx/html/.env

# Espone la porta 5173 per consentire l'accesso all'applicazione
EXPOSE 5173

# Comando per avviare nginx
CMD ["nginx", "-g", "daemon off;"]
