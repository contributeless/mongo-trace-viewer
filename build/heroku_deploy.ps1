$heroku_image_tag="herokulatest"
$heroku_registry="registry.heroku.com"
$heroku_app_name="mongo-oplog-viewer"
$heroku_process_type="web"

heroku login
heroku container:login

& .\build_docker_image.ps1 $heroku_image_tag

docker build --file ../heroku.Dockerfile --build-arg APP_VERSION=$heroku_image_tag --tag "$heroku_registry/$heroku_app_name/$heroku_process_type" ..

docker push "$heroku_registry/$heroku_app_name/$heroku_process_type"

heroku container:release  $heroku_process_type --app $heroku_app_name

heroku open --app $heroku_app_name

heroku container:logout
heroku logout

