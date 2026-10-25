@echo off
if not exist "D:\temp" mkdir "D:\temp"
if not exist "D:\npm-cache" mkdir "D:\npm-cache"
set "TEMP=D:\temp"
set "TMP=D:\temp"
set "npm_config_cache=D:\npm-cache"
set "PATH=C:\Program Files\nodejs;%PATH%"
%SystemRoot%\System32\WindowsPowerShell\v1.0\powershell.exe %*
