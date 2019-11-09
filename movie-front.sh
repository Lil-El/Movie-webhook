#!/bin/bash
WORK_PATH='/home/project/Movie'
cd $WORK_PATH
echo '清除老代码'
git reset --hard origin/master
git clean -f
echo '拉取新代码'
git pull origin master
echo '编译'
npm run build
echo '开始构建'
docker build -t movie-front:1.0.0 .
echo '删除旧容器'
docker container stop movie-front-container
docker rm movie-front-container
echo '启动容器'
docker container run -p 80:80 --name movie-front-container -d movie-front:1.0.0

