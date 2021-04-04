function Copy-Folder {
    param([string] $Source, [string] $Destination)
    
    If (!(Test-Path $Destination)) {
        New-Item -Path $Destination -ItemType Directory
    }
    
    Copy-Item -Path $Source -Destination $Destination -Recurse -Force

    if($global:LASTEXITCODE -ne 0){
        throw "Error while items copy from $Source to $Destination"
    }
}

Push-Location "..\src\OV.React\"

& npm install

& npm run build


Copy-Folder ".\dist\*" "..\OV.Node\src\assets"


Push-Location "..\OV.Node"

& npm install

& npm run package

Pop-Location

Pop-Location

Copy-Folder "..\src\OV.Node\dist_bin" ".\"