FROM node:18-alpine

WORKDIR /app

# Copie des fichiers de dépendances
COPY package.json package-lock.json ./

# Installation des dépendances
RUN npm install

# Copie tout le reste
COPY . .

# Build si nécessaire (pour prod), mais ici on dev
# CMD ["npm", "run", "dev", "--", "--host"]

EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
