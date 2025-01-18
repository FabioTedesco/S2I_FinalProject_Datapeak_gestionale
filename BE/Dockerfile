# Base image with PHP 8.2 and Apache
FROM php:8.2-apache

# Install required dependencies and PHP extensions
RUN apt-get update && apt-get install -y \
    libzip-dev zip unzip \
    && docker-php-ext-install pdo pdo_mysql

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Set the working directory
WORKDIR /var/www/html

# Copy project files
COPY . .

# Add a test script for debugging
COPY ./info.php /var/www/html/info.php

# Install PHP dependencies via Composer
COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html \
    && chmod -R 755 /var/www/html

# Expose port 80
EXPOSE 80

# Command to execute migration script and start Apache
CMD php /var/www/html/core/migrate.php && apache2-foreground
