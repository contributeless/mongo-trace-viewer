function Get-AppVersion {
    $fullVersion = git describe --tags
    $version = $fullVersion.Split("-")[0];
    return $version;
}

$APP_VERSION= Get-AppVersion "."

docker build --tag oplog-viewer:$APP_VERSION ..

docker image prune --force --filter label=stage=temp-build