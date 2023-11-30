# .\run.ps1 install
function InstallDependencies {
    Write-Host "Installing Composer dependencies..."
    composer install
    Write-Host "Installing npm dependencies..."
    npm install
}

# .\run.ps1 run
function RunDevelopment {
    Write-Host "Clear cache..."
    php bin/console cache:clear
    Write-Host "Running npm dev..."
    npm run dev
    Write-Host "Starting Symfony server..."
    symfony server:start --no-tls --port=8000
}

$command = $args[0]

switch ($command) {
    "install" { InstallDependencies }
    "run" { RunDevelopment }
    default { Write-Host "Invalid command. Supported commands: install, run" }
}
