# 指定Node版本
FROM node:12.18.3

# 容器中应用程序的路径。将Web目录作为工作目录
WORKDIR /web

# 将代码复制到Docker容器中的Web目录 
COPY . /web/

# 先删除node_modules
RUN rm -rf node_modules

# 设置淘宝镜像
RUN yarn config set registry https://registry.npm.taobao.org --global

# 安装依赖
RUN yarn

RUN echo 'Success!!!'

# EXPOSE 3005

# CMD ["yarn", "start"]