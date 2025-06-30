FROM node:22.16.0-slim

# Install dependencies
RUN apt-get update && apt-get install -y \
    openjdk-17-jdk \
    curl \
    wget \
    unzip \
    && rm -rf /var/lib/apt/lists/*

# Install Bun
RUN curl -fsSL https://bun.sh | bash
ENV PATH="/root/.bun/bin:${PATH}"

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Make build script executable
RUN chmod +x build.sh

# Run build during image build
RUN ./build.sh

# Replace 'your-application.jar' with your actual JAR filename if different
CMD ["java", "-jar", "target/your-application.jar"]
