# Usa un'immagine base con PHP e Apache
FROM php:8.2-apache

# Abilita moduli Apache e estensioni PHP necessari
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip \
    && docker-php-ext-install pdo pdo_mysql

# Installa Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Imposta la working directory
WORKDIR /var/www/html

# Copia i file del progetto
COPY . .

# Copia il file SQL necessario per le migrazioni
COPY ./core/datapeak_gestionale_vendite.sql /var/www/html/core/

# Installa le dipendenze PHP tramite Composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Imposta i permessi per il server web
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Esponi la porta 80
EXPOSE 80

# Comando per eseguire il migration script e avviare Apache
CMD php /var/www/html/core/migrate.php && apache2-foreground
