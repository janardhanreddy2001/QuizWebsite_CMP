#!/bin/bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Updating package list..."
apt-get update

echo "Installing OpenJDK 17..."
apt-get install -y openjdk-17-jdk

# Set JAVA_HOME environment variable
export JAVA_HOME=/usr/lib/jvm/java-17-openjdk-amd64
export PATH=$JAVA_HOME/bin:$PATH

# Verify Java installation
echo "Java version:"
java -version

# Confirm JAVA_HOME
echo "JAVA_HOME is set to: $JAVA_HOME"

# Make sure Maven wrapper is executable
chmod +x mvnw

# Run your build command
./mvnw clean package -DskipTests
