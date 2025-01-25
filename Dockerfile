FROM nginx:alpine

# Remover a configuração padrão do nginx
RUN rm -rf /usr/share/nginx/html/*

# Copiar os arquivos de build da landing page
COPY landingpage/dist/ /usr/share/nginx/html/

# Criar diretório para a página de criar conta
RUN mkdir -p /usr/share/nginx/html/criar-conta

# Copiar os arquivos de build da página de criar conta
COPY criar-conta-app/dist/ /usr/share/nginx/html/criar-conta/

# Configuração do nginx para roteamento
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
