# Eatsy Food

> Eatsy Food is a food ordering webapp with core functionalities such as user authentication, cart storage, administrative controls and many more. The webapp is created with the NextJS framework with MongoDB as the backend.
> Check out the live demo if the webapp [_here_](https://eatsy-app-next-js-jarethtan.vercel.app/).

## Table of Contents

- [General Info](#general-information)
- [Summary of Technologies Used](#summary-of-technologies-used)
- [Features](#features)
- [Setup](#setup)
- [Usage](#usage)
- [Project Status](#project-status)
- [Room for Improvement](#room-for-improvement)
- [Acknowledgements](#acknowledgements)
- [Contact](#contact)
<!-- * [License](#license) -->

## General Information

Eatsy food is a web application is a food ordering app with a collection of cuisines from different parts of the world. There are key features in this webapp which you would typically find in a standard e-commence/food ordering app.
The purpose of this webapp is to utilise the latest in web development frameworks and libraries to similar myself with the technology available out there. The idea is to build the webapp from development to deployment and understand key concepts in the framework.
Since the developer have developed webapps with vanilla JavaScript and React, he wants to take the opportunity to explore the applications of NextJS.
The webapp is developed and deployed from the user browsing, interacting and finally checkout any items they decided to purchase. Payment types are NOT included in this project however it will be considered as a future project to expand the scope. There are opportunities to explore different payment types such as credit card, crypto, etc.

## Summary of Technologies Used

1. Material-UI/core: version: 4.12.3,
2. Redux Toolkit: version: 1.8.0,
3. Cloudinary: version: 1.28.1,
4. MongoDB: version: 4.3.1,
5. Next: version: 12.0.8,
6. Next-auth: version: 4.3.1,
7. React: version: 17.0.2,
8. React-hook-form: version: 7.24.0,
9. Yup: version: 0.32.11

## Features

List the ready features here:

- CRUD functions for products/users information uploaded into MongoDB
- User authentication (Credential / Github / Google logins)
- Administrator access for CRUD functions
- Information managed in a global state management system (Redux ToolKit) to store search results and shopping cart information.
- Homepage carousel managed by CRUD for food promotions.
- Search food via search function in navbar.
- On Credential login, cart information is stored in MongoDB on checkout.
- Most styling are done with CSS modules. There are some page which utilise Material UI components.

## Setup

Project dependencies are list in package.json file. To see and review the code, npm install and run webapp in localhost:3000.

## Usage

When entering the site the first time, the user will be directed to the homepage with the home carousel, category election and most popular dishes

![image](https://user-images.githubusercontent.com/61606168/170201977-f44588a3-4d9a-4a7a-88ea-444f3eb1d65d.png)

In the navbar, navigate through the different options.

![image](https://user-images.githubusercontent.com/61606168/170201993-2a24c043-7f8d-4705-9e10-5664c9047cf7.png)

In login, you have three options to login. via credential, google or github.

To login via credential use the following credentials:

username: user12345
password: user12345

To check out the administrative CRUD functions, please visit in the admin login page link at the bottom of the user login page. The administrative credential can be provided upon request.

![image](https://user-images.githubusercontent.com/61606168/170202046-36980536-cdf6-4a3c-bc4e-5d39008327df.png)

![image](https://user-images.githubusercontent.com/61606168/170202076-2a2b6c9f-d83e-49aa-8071-8bd5bcabfd00.png)

With administrative control, you can add product (one of the nav tab) or select products to display in carousel (homepage image with a green button at the bottom of screenshot) or edit/delete products (product detail image).

NOTE: add/edit/delete of products will show up in the MENU nav tab immediately. However, selecting of carousel to display will not show up in the homepage. The carousel will only be update when carousel goes through a build process again since data is request for homepage is requested via getStaticProps.

## Project Status

Project is: completed.

## Room for Improvement

Room for improvement:

- Convert styling to material UI from CSS modules
- Streamline some code into reusable components.
- Better understand the core concept of typescript to improve proficiency in the app. Application of typescript in this app is very basic as this is the first time using it

To do:

- Add favourites function to be stalled for individual users.
- Add payment function into checkout.
- Include tests for WebApp.
- Apply more comprehensive typescript in WebApp.

## Acknowledgements

Give credit here.

- Many thanks to the tutorials completed to provide the basics in ReactJS/NextJS to take on this project.
- Many thanks to food pictures used in this project. Project was not possible without the illustration of these pictures.

## Contact

Created by [@jarethtan]( https://github.com/jarethtan - feel free to contact me via my email as well (Jareth.tan@outlook.com)
