@echo off

title Package Manager
prompt $sPackage$s$e$s

if errorlevel 1 goto one
if errorlevel 0 goto end

:one
echo Try again
goto end

:end