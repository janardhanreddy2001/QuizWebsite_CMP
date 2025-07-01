#!/bin/bash

# Set Java 17 (only needed if Render doesn't auto-use Java 17)
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Move into the backend folder where pom.xml exists
cd CmpBackendGit

# Build the Spring Boot application with Maven, skipping tests
mvn clean package -DskipTests
