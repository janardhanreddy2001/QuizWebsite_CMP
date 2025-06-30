#!/bin/bash

# ✅ Correct Java path for Docker container
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Build your Spring Boot app
./mvnw clean package
