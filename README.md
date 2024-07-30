# Population Chart Race

This is a Population chart race web application using node.js, mySQL, react.jsx, and Highcharts

## Requirements
- node.js version 18.20.3 or later
- npm version 10.8.2 or later
- Docker version 27.0.3 build 7d4bcd8 or later

## How to start the program
1. Run ``docker compose up`` to start mySQL and phpMyAdmin server, and wait until mySQL is completely started (no longer output logs).
2. Run ``node dataInit.js`` in ``backend-sql`` folder, and wait until it finished running.
    - After that, open phpMyAdmin on ``http://localhost:8080/`` to check the database name ``countryPopAndDemo``
    - You can remove all the table in ``countryPopAndDemo`` if there are any problems while creating data.
3. Run ``npm install`` and then run ``npm run dev`` in ``backend-sql``. The backend server will run on port ``7000``
4. Run ``npm install`` and then run ``npm run dev`` in ``frontend-react``. The frontend server will run on port ``5173``
5. Enjoy :)

## Configurations
You can configure server settings in ``backend-sql/config/default.json``, but don't change any dictionary keys.

## Credits
- All icons are from the website [FLATICON](https://www.flaticon.com/)
    - [play-button.png](https://www.flaticon.com/free-icon/play-button_375?term=play&page=1&position=3&origin=search&related_id=375) by Freepik
    - [fast-forward.png](https://www.flaticon.com/free-icon/fast-forward_130903?term=fast+forward&page=1&position=4&origin=search&related_id=130903) by Freepik
    - [pause-button.png](https://www.flaticon.com/free-icon/video-pause-button_16427?term=pause&page=1&position=1&origin=search&related_id=16427) by Freepik
    - [reload.png](https://www.flaticon.com/free-icon/reload_159657?term=reload&page=1&position=2&origin=search&related_id=159657) by Gregor Cresnar

- Chart framework by Highcharts

![Highcharts](https://cdn.ourcodeworld.com/public-media/articles/articleocw-56476fe4f4050.png)

## License
This repository uses MIT license. See ``LICENSE`` file for more details.
