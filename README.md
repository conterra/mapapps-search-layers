# Search Layers

This bundle allows for layers to be searched for various attributes such as title, id and description. Layers that match the search query can be selected and the corresponding toc element is expanded and highlighted. The duration of the highlight can be configured in the app.json.

## Sample App
https://demos.conterra.de/mapapps/resources/apps/downloads_searchlayers/index.html

![Screenshot Search Layer Sample App](https://github.com/conterra/mapapps-search-layers/blob/master/screenshot.JPG)

## Installation Guide
**Requirement: map.apps 4.12.0**

[dn_searchlayers Documentation](https://github.com/conterra/mapapps-search-layers/tree/master/src/main/js/bundles/dn_searchlayers)

## Development Guide
### Define the mapapps remote base
Before you can run the project you have to define the mapapps.remote.base property in the pom.xml-file:
`<mapapps.remote.base>http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%</mapapps.remote.base>`

### Other methods to to define the mapapps.remote.base property.
1. Goal parameters
   `mvn install -Dmapapps.remote.base=http://%YOURSERVER%/ct-mapapps-webapp-%VERSION%`

2. Build properties
   Change the mapapps.remote.base in the build.properties file and run:
   `mvn install -Denv=dev -Dlocal.configfile=%ABSOLUTEPATHTOPROJECTROOT%/build.properties`
