#!/bin/bash

export JAVA_HOME=/opt/render/project/.jdk
export PATH=$JAVA_HOME/bin:$PATH

# Build your project
./mvnw clean package
