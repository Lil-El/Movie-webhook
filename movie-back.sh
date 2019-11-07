#!/bin/bash
WORK_PATH='/home/project/Movie-back'
cd WORK_PATH
echo '清除老代码'
git reset --hard origin/master
git clean -f
echo '拉取新代码'
git pull origin master
echo '开始构建'
docker build -t movie-back:1.0.0 .
echo '删除旧容器'
docker container stop movie-back-container
docker rm movie-back-container
echo '启动容器'
docker container run -p 3000:3000 --name movie-back-container -d movie-back:1.0.0

