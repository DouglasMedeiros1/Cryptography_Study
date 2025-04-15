@echo off
setlocal

REM Configurações do MySQL - edite conforme necessário
set MYSQL_USER=root
set MYSQL_PASSWORD=root123
set MYSQL_DATABASE=ATV_Seguranca
set MYSQL_SCRIPT=Backend\MYSQL\Mysql_Script.sql

echo Iniciando o Frontend no terminal 1...
start cmd /k "cd meu-projeto-react && npm install && npm run dev"

timeout /t 5

echo Iniciando o Backend no terminal 2...
start cmd /k "cd Backend && npm install && npm start"

timeout /t 10

echo Executando o script SQL...
mysql -u %MYSQL_USER% -p%MYSQL_PASSWORD% %MYSQL_DATABASE% < %MYSQL_SCRIPT%

echo Abrindo navegador...
start http://localhost:5173/

endlocal
