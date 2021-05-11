function Get-AppVersion {
    $fullVersion = git describe --tags
    $version = $fullVersion.Split("-")[0];
    return $version;
}

$APP_VERSION = Get-AppVersion "."


docker login
& .\build_docker_image.ps1 $APP_VERSION

docker tag mongo-oplog-viewer:$APP_VERSION contributeless/mongo-oplog-viewer:$APP_VERSION
docker push contributeless/mongo-oplog-viewer:$APP_VERSION