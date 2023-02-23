FROM php:8.1-apache
EXPOSE 5173
COPY /docker/web/php.ini /usr/local/etc/php/

COPY /docker/web/httpd/*.conf /etc/apache2/sites-available/

RUN apt-get update \
    && apt-get install -y zlib1g-dev libzip-dev unzip \
    && docker-php-ext-install zip pdo_mysql \
    # && pecl install xdebug \
    # && docker-php-ext-enable xdebug \
    && a2enmod rewrite

# Composer install
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer

# Node&yarn install
RUN curl -sL https://deb.nodesource.com/setup_18.x | bash - \
    && apt-get install -y nodejs \
    && curl -sS https://dl.yarnpkg.com/debian/pubkey.gpg | apt-key add - \
    && echo "deb https://dl.yarnpkg.com/debian/ stable main" > /etc/apt/sources.list.d/yarn.list \
    && apt-get update \
    && apt-get install -y yarn