Для импорта дампа бд выполнить скрипт из папки с проектом (изменить user_name на имя пользователя бд): 
  mysql -u user_name -p database_name < dump-db.sql

Для подключения к бд перейти в файл db-settings.js и изменить данные пользователя

Для запуска проекта использовать: npm start