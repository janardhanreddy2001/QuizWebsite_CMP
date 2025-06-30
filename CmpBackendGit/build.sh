#!/bin/bash

export JAVA_HOME="/opt/render/project/.jdk"
export PATH="$JAVA_HOME/bin:$PATH"

echo "🟢 Java version:"
java -version

chmod +x mvnw
./mvnw clean package -DskipTests
