# Getting Started

1. Clone the repository and `cd` into the root directory.  

2. Run `npm install`, and follow any on screen instructions.  
   Also, run `npm run dev`.  

3. Run `composer install` and allow the process to finish.  

4. Enter `cp env.example .env`

5. Run `php artisan key:generate`

   At this point I like to git pull, npm update and composer update, just to be sure everything is up to date.  

6. `php artisan serve` to start the development server, accessible via your browser.