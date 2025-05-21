# Ngopi-Web

---

## Project From Udemy WebDev Course | Bootstrap - 101 | 
Original Repository <a href="https://github.com/Retiortuk/BootCampFullstackWeb/tree/main/101-BootStrap" target="_blank">BootcampFullstackWeb/101-BootStrap</a>
See The Website <a href="https://github.com/Retiortuk/BootCampFullstackWeb/tree/main/101-BootStrap](https://retiortuk.github.io/Ngopi-Web" target="_blank">Ngopi.</a>

##### Currently Front-End Only Best Using Desktop For The Best Expreience
---
## Front-End Documentation

**With BootStrap 5**

### index.html

#### - Header
```html
<head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <title>Ngopi.</title>
        <link rel="stylesheet" href="style.css">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Poetsen+One&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap" rel="stylesheet">
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.6/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-4Q6Gf2aSP4eDXB8Miphtr37CMZZQ5oXLH2yaXMJ2w8e2ZtHTl7GptT4jmndRuHDT" crossorigin="anonymous">
    </head>
```
Inside of the header includes link to the External CSS, Bootstrap 5 Properties

#### - Navbar
```html
 <!-- NABAR -->
        <nav id="navbar-example" class="navbar-expand-md sticky-top">
            <div class="container-navbar bg-light shadow p-3 pt-1 position-relative">
                <!-- ROW FOR BRAND, SEARCH, USER REQ -->
                <div class="row nav-1 align-items-center">
                    <!-- Brand -->
                    <div class="col-md-4 brand-container d-flex justify-content-center justify-content-md-start align-items-center text-center">
                        <h1 class="ms-0 ms-md-5" style="font-family: Plus Jakarta Sans, sans-serif;">Ngopi.</h1>
                    </div>
                    
                    
                    <!-- Search Bar -->
                    <div class="col-md-4 search-container">
                        <form class="position-relative" role="search">
                            <input type="search" class="form-control me-2" placeholder="Ngopi apa?" aria-label="Search">
                            <button class="btn position-absolute end-0 top-50 translate-middle-y me-2 p-0 border-0 bg-transparent" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a5.5 5.5 0 1 1 .707-.707l3.646 3.646a1 1 0 0 1-1.414 1.414l-3.646-3.646zM12.5 6a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    
                    <!-- User Account and Cart -->
                    <div class="col-6 col-md-4 d-flex userReq-container d-flex justify-content-end align-items-center gap-3">
                        <!-- Account User and Cart/Coffee Icon only visible on lg display -->
                        <div class="d-none d-md-flex gap-3 me-0 me-md-5">
                            <!-- User -->
                            <a href="#">
                                <svg width="24px" height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"></path> </g></svg>
                            </a>
                            
                            <!-- Cart/Coffee Icon -->
                            <a href="#">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z" fill="#000000"></path> </g></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- ROW FOR BRAND, SEARCH, USER REQ END -->

                <!-- FOR ICONS USER IN THE LEFT TOP(Mobile) -->
                <div class="d-md-none position-absolute top-0 start-0 py-2 px-3">   
                    <a href="#">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"></path> </g></svg>
                    </a>
                </div>                
                <!-- FOR ICONS CART IN THE RIGHT TOP(Mobile) -->
                <div class="d-md-none position-absolute top-0 end-0 py-2 px-3"> 
                        <a href="#">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z" fill="#000000"></path> </g></svg>
                        </a>
                </div>  
                <!-- FOR ICONS USER + CART(Mobile) END -->

                <!-- ROW FOR MENUS -->
                <div class="row  nav-2 align-items-center text-center">
                    <div class="col d-flex align-items-center justify-content-center">
                        <ul class="nav gap-1 gap-md-4 pt-3 justify-content-center flex-wrap">
                            <li class="nav-item">
                                <a class="nav-link nav-menu-item" aria-current="page" href="#home-sect">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-menu-item" href="#featured-sect">Featured</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-menu-item" href="#menu-sect">Menu</a>
                            </li>
                            <li class="nav-item d-none d-sm-block">
                                <a class="nav-link nav-menu-item" href="#about-sect">About Ngopi.</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
        <!-- NAVBAR-END -->
```
Inside of The Navbar There Are two Main navbar the **.nav-1** and **.nav-2**.

**- .nav-1**
inside this nav-1 inlcudes Brand Name, Search Bar, Icon User and Cart
```html
  <!-- ROW FOR BRAND, SEARCH, USER REQ -->
                <div class="row nav-1 align-items-center">
                    <!-- Brand -->
                    <div class="col-md-4 brand-container d-flex justify-content-center justify-content-md-start align-items-center text-center">
                        <h1 class="ms-0 ms-md-5" style="font-family: Plus Jakarta Sans, sans-serif;">Ngopi.</h1>
                    </div>
                    
                    
                    <!-- Search Bar -->
                    <div class="col-md-4 search-container">
                        <form class="position-relative" role="search">
                            <input type="search" class="form-control me-2" placeholder="Ngopi apa?" aria-label="Search">
                            <button class="btn position-absolute end-0 top-50 translate-middle-y me-2 p-0 border-0 bg-transparent" type="submit">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-search" viewBox="0 0 16 16">
                                    <path d="M11.742 10.344a5.5 5.5 0 1 1 .707-.707l3.646 3.646a1 1 0 0 1-1.414 1.414l-3.646-3.646zM12.5 6a4.5 4.5 0 1 0-9 0 4.5 4.5 0 0 0 9 0z"/>
                                </svg>
                            </button>
                        </form>
                    </div>
                    
                    <!-- User Account and Cart -->
                    <div class="col-6 col-md-4 d-flex userReq-container d-flex justify-content-end align-items-center gap-3">
                        <!-- Account User and Cart/Coffee Icon only visible on lg display -->
                        <div class="d-none d-md-flex gap-3 me-0 me-md-5">
                            <!-- User -->
                            <a href="#">
                                <svg width="24px" height="24px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"></path> </g></svg>
                            </a>
                            
                            <!-- Cart/Coffee Icon -->
                            <a href="#">
                                <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z" fill="#000000"></path> </g></svg>
                            </a>
                        </div>
                    </div>
                </div>
                <!-- ROW FOR BRAND, SEARCH, USER REQ END -->

                <!-- FOR ICONS USER IN THE LEFT TOP(Mobile) -->
                <div class="d-md-none position-absolute top-0 start-0 py-2 px-3">   
                    <a href="#">
                        <svg width="20px" height="20px" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M8 7C9.65685 7 11 5.65685 11 4C11 2.34315 9.65685 1 8 1C6.34315 1 5 2.34315 5 4C5 5.65685 6.34315 7 8 7Z" fill="#000000"></path> <path d="M14 12C14 10.3431 12.6569 9 11 9H5C3.34315 9 2 10.3431 2 12V15H14V12Z" fill="#000000"></path> </g></svg>
                    </a>
                </div>                
                <!-- FOR ICONS CART IN THE RIGHT TOP(Mobile) -->
                <div class="d-md-none position-absolute top-0 end-0 py-2 px-3"> 
                        <a href="#">
                            <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke="#000000"><g id="SVGRepo_bgCarrier" stroke-width="0"></g><g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g><g id="SVGRepo_iconCarrier"> <path fill-rule="evenodd" clip-rule="evenodd" d="M8.41799 3.25089C8.69867 2.65917 9.30155 2.25 10 2.25H14C14.6984 2.25 15.3013 2.65917 15.582 3.25089C16.2655 3.25586 16.7983 3.28724 17.2738 3.47309C17.842 3.69516 18.3362 4.07266 18.6999 4.56242C19.0668 5.0565 19.2391 5.68979 19.4762 6.56144L20.2181 9.28272L20.4985 10.124C20.5065 10.1339 20.5144 10.1438 20.5222 10.1539C21.4231 11.3076 20.9941 13.0235 20.1362 16.4553C19.5905 18.638 19.3176 19.7293 18.5039 20.3647C17.6901 21.0001 16.5652 21.0001 14.3153 21.0001H9.68462C7.43476 21.0001 6.30983 21.0001 5.49605 20.3647C4.68227 19.7293 4.40943 18.638 3.86376 16.4553C3.00581 13.0235 2.57684 11.3076 3.47767 10.1539C3.48555 10.1438 3.4935 10.1338 3.50152 10.1239L3.7819 9.28271L4.52384 6.56145C4.76092 5.6898 4.93316 5.0565 5.30009 4.56242C5.66381 4.07266 6.15802 3.69516 6.72621 3.4731C7.20175 3.28724 7.73447 3.25586 8.41799 3.25089ZM8.41951 4.75231C7.75763 4.759 7.49204 4.78427 7.27224 4.87018C6.96629 4.98976 6.70018 5.19303 6.50433 5.45674C6.32822 5.69388 6.22488 6.0252 5.93398 7.09206L5.36442 9.18091C6.38451 9.00012 7.77753 9.00012 9.68462 9.00012H14.3153C16.2224 9.00012 17.6155 9.00012 18.6356 9.18092L18.066 7.09206C17.7751 6.0252 17.6718 5.69388 17.4957 5.45674C17.2998 5.19303 17.0337 4.98976 16.7278 4.87018C16.508 4.78427 16.2424 4.759 15.5805 4.75231C15.2992 5.3423 14.6972 5.75 14 5.75H10C9.30281 5.75 8.70084 5.3423 8.41951 4.75231Z" fill="#000000"></path> </g></svg>
                        </a>
                </div>  
                <!-- FOR ICONS USER + CART(Mobile) END -->
```
logo icon on the left is Brand and in the middle is search bar and on the right is user icon and cart, in responsive desaign when the dimension is small enough the Brand logo icon will move to the center and user icon will be on the left while cart icon will be on the right.

**- .nav-2**
```html
   <!-- ROW FOR MENUS -->
                <div class="row  nav-2 align-items-center text-center">
                    <div class="col d-flex align-items-center justify-content-center">
                        <ul class="nav gap-1 gap-md-4 pt-3 justify-content-center flex-wrap">
                            <li class="nav-item">
                                <a class="nav-link nav-menu-item" aria-current="page" href="#home-sect">Home</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-menu-item" href="#featured-sect">Featured</a>
                            </li>
                            <li class="nav-item">
                                <a class="nav-link nav-menu-item" href="#menu-sect">Menu</a>
                            </li>
                            <li class="nav-item d-none d-sm-block">
                                <a class="nav-link nav-menu-item" href="#about-sect">About Ngopi.</a>
                            </li>
                        </ul>
                    </div>
                </div>

            </div>
        </nav>
        <!-- NAVBAR-END -->
```
Inside of .nav-2 there are menus wrapped by UL and LI in HTML
there are Home, Featured, Menu and About Ngopi. they are centered align is responsive desaign if the dimension small enough About Ngopi. .nav-item will be removed knowing that it's not the important.

