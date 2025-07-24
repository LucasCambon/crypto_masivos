FROM nginx:alpine

# Copy static files to Nginx HTML directory
COPY frontend /usr/share/nginx/html


EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]