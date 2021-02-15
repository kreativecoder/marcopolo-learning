FROM maven:3.6.3-openjdk-15-slim AS MAVEN_BUILD
COPY pom.xml /tmp/
RUN mvn -B dependency:go-offline -f /tmp/pom.xml -s /usr/share/maven/ref/settings-docker.xml
COPY src /tmp/src/
WORKDIR /tmp/
RUN mvn -B -s /usr/share/maven/ref/settings-docker.xml package -DskipTests

FROM adoptopenjdk/openjdk15:alpine-jre
EXPOSE 8080

RUN mkdir /app
COPY --from=MAVEN_BUILD /tmp/target/products-service-0.0.1-SNAPSHOT.jar /app/products.jar

ENTRYPOINT ["java","-Djava.security.egd=file:/dev/./urandom","-jar","/app/products.jar"]