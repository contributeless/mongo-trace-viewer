function Get-AppVersion {
    $fullVersion = git describe --tags
    $version = $fullVersion.Split("-")[0];
    return $version;
}

$APP_VERSION = "latest"

$passedAppVersion=$args[0]

if($null -eq $passedAppVersion) {
    $APP_VERSION = Get-AppVersion "."
} else{
    $APP_VERSION = $passedAppVersion
}

docker build --tag mongo-oplog-viewer:$APP_VERSION ..

docker image prune --force --filter label=stage=temp-build