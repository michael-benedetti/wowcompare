FROM openjdk:8-jre-alpine
WORKDIR /
ADD build/libs/wowcompare-0.0.1-SNAPSHOT.war wowcompare.war
CMD java -jar wowcompare.war