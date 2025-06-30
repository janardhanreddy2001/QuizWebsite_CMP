#!/bin/bash

export JAVA_HOME=/opt/render/project/.jdk
export PATH=$JAVA_HOME/bin:$PATH

./mvnw clean package

java -jar target/*.jar
