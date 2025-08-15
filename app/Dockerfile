FROM node:18-alpine

WORKDIR /usr/src/app

# Copier package.json + package-lock.json
COPY package*.json ./

# Installer exactement les dépendances lockées
RUN npm ci

# Copier le reste de l'app
COPY . .

EXPOSE 3000
CMD ["node", "index.js"]

