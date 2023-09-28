#!/bin/bash

#编译代码
npm run build

#打出镜像包
DOCKERFILE="./docker/Dockerfile"
pre_docker_image="txwl-frontend/txwl-dashboard"
#时间戳
DATE=$(date "+%Y-%m-%d_%H-%M-%S")
#版本标签号
CI_COMMIT_SHORT_SHA=$(git branch  | head -n 1 | awk '{print $2}' | sed 's#\/#-#g')_$(git log | grep commit | head -n1 | awk '{print $2}' | cut -c-8)

OUTPUT_IMAGE_FOLDER="${pre_docker_image}"
LATEST_IMAGE="$OUTPUT_IMAGE_FOLDER:$CI_COMMIT_SHORT_SHA"

docker build -f $DOCKERFILE -t $LATEST_IMAGE .

IMAGE_TAR="./txwl-dashboard_${DATE}.tar.gz"

#保存镜像包
docker save ${LATEST_IMAGE} | gzip > ${IMAGE_TAR}
echo ${IMAGE_TAR}
