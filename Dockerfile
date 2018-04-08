FROM nginx:1.13-alpine
COPY --from=0 /app /app
ADD ./config/nginx.conf /etc/nginx/nginx.conf

