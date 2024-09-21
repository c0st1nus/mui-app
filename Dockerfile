# Используем официальный node образ в качестве базового
FROM node:16 AS build

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем все остальные файлы в рабочую директорию
COPY . .

# Запускаем сборку приложения
RUN npm run build

# Используем другой легковесный образ для production
FROM nginx:stable-alpine

# Копируем сгенерированные статики из предыдущего этапа
COPY --from=build /app/dist /usr/share/nginx/html

# Копируем фаил конфигурации Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose дает возможность указать на каком порту контейнер ожидает соединения
EXPOSE 80

# Команда для запуска Nginx
CMD ["nginx", "-g", "daemon off;"]