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

## 2. Install dependencies 

~~~
composer install && bun install
~~~
   
## 3. Run migrations and seeders
~~~
php artisan migrate --seed
~~~

## 4. Generate permissions 
~~~
sudo ./vendor/bin/sail php artisan permissions:sync 
~~~

## 4. Add assets 
*add required assets*