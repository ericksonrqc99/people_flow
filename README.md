**The system may fail if your time zone is not correctly configured.**

# REQUIRED
* Bun
* Laravel
* Php
* Composer

# INSTALLATION

*be at the root of the project*  

# IMPORTANT

*complete the required data in the **.env.example** file before creating the **.env** file*


## 1. Create .env
 ~~~
 cp .env.example .env
 ~~~

*fill in required fields*

## 2. Install composer dependencies 

***php** and **composer** install required*
~~~
composer install 
~~~

## 2. Install js dependencies 
*JavaScript package manager required* (recommended **bun**)
~~~
bun install 
~~~
## 3. Generate App Key
~~~
php artisan key:generate 
~~~
## 3. Run migrations and seeders
~~~
sudo ./vendor/bin/sail php artisan migrate --seed
~~~

## 4. Generate permissions 
~~~
sudo ./vendor/bin/sail php artisan permissions:sync 
~~~

## 4. Add assets 
*add required assets*