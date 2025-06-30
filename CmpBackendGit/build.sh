#!/bin/bash

# Set JAVA_HOME for Render deployment
export JAVA_HOME=/opt/render/project/.jdk
export PATH=$JAVA_HOME/bin:$PATH

# Build the Spring Boot project using Maven Wrapper
./mvnw clean package
