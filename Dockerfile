# ���������� ����������� node ����� � �������� ��������
FROM node:16 AS build

# ������������� ������� ����������
WORKDIR /app

# �������� package.json � package-lock.json
COPY package*.json ./

# ������������� �����������
RUN npm install

# �������� ��� ��������� ����� � ������� ����������
COPY . .

# ��������� ������ ����������
RUN npm run build

# ���������� ������ ����������� ����� ��� production
FROM nginx:stable-alpine

# �������� ��������������� ������� �� ����������� �����
COPY --from=build /app/dist /usr/share/nginx/html

# �������� ���� ������������ Nginx
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expose ���� ����������� ������� �� ����� ����� ��������� ������� ����������
EXPOSE 80

# ������� ��� ������� Nginx
CMD ["nginx", "-g", "daemon off;"]