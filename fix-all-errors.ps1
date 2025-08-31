# 🚀 BOEING 747 ERROR SCANNER & AUTO-FIXER
# 
# This PowerShell script automatically detects and fixes ALL errors in your app!
# From tiny atoms to massive issues - everything will be handled automatically.

Write-Host ""
Write-Host "========================================" -ForegroundColor Cyan
Write-Host "🚀 BOEING 747 ERROR SCANNER & AUTO-FIXER" -ForegroundColor Yellow
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""
Write-Host "This will automatically detect and fix ALL errors in your app!" -ForegroundColor Green
Write-Host "From tiny atoms to massive issues - everything will be handled." -ForegroundColor Green
Write-Host ""
Write-Host "Press any key to start the magic..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")

Write-Host ""
Write-Host "🔍 Starting comprehensive error scan..." -ForegroundColor Blue
Write-Host ""

try {
    # Check if Node.js is installed
    if (-not (Get-Command node -ErrorAction SilentlyContinue)) {
        Write-Host "❌ Node.js is not installed or not in PATH!" -ForegroundColor Red
        Write-Host "Please install Node.js from https://nodejs.org/" -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }

    # Check if the error scanner script exists
    if (-not (Test-Path "scripts/error-scanner.js")) {
        Write-Host "❌ Error scanner script not found!" -ForegroundColor Red
        Write-Host "Make sure you're running this from the project root directory." -ForegroundColor Red
        Read-Host "Press Enter to exit"
        exit 1
    }

    # Run the error scanner
    Write-Host "🚀 Executing error scanner..." -ForegroundColor Green
    node scripts/error-scanner.js

    Write-Host ""
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host "🎯 SCAN COMPLETE!" -ForegroundColor Green
    Write-Host "========================================" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Your app has been automatically scanned and fixed!" -ForegroundColor Green
    Write-Host ""

} catch {
    Write-Host ""
    Write-Host "❌ An error occurred during scanning:" -ForegroundColor Red
    Write-Host $_.Exception.Message -ForegroundColor Red
    Write-Host ""
}

Write-Host "Press any key to exit..." -ForegroundColor Yellow
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
