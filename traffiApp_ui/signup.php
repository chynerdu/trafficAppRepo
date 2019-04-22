<!doctype html>
<html lang="en">
<!-- header-info -->      
<?php include('modules/header-info.php'); ?>

<body class="theme-light" data-highlight="blue2">
    
<div id="page-preloader">
    <div class="loader-main"><div class="preload-spinner border-highlight"></div></div>
</div>
    
<div id="page">
	<!-- header -->         
    <?php include('modules/header.php'); ?>

	<div class="page-content-black"> </div>
       <div class="page-content">	        
            <div class="cover-wrapper cover-no-buttons">
                <div data-height="cover" class="caption bottom-0">
                    <div class="caption-center">

                        <div class="left-50 right-50 top-50">
                            <h3 class="color-white center-text uppercase bold fa-2x">Register</h3>
                            <p class="color-highlight center-text font-12 under-heading bottom-30">
                                Create an Account. It's 100% free
                            </p>
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-user font-11"></i>
                                <span>Username</span>
                                <em>(required)</em>
                                <input type="name" placeholder="Username">
                            </div> 
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-at"></i>
                                <span>Email</span>
                                <em>(required)</em>
                                <input type="email" placeholder="Email">
                            </div>         
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-lock font-11"></i>
                                <span>Password</span>
                                <em>(required)</em>
                                <input type="password" placeholder="Choose a Password">
                            </div>          
                            <div class="input-style input-light has-icon input-style-1 input-required">
                                <i class="input-icon fa fa-lock font-11"></i>
                                <span>Password</span>
                                <em>(required)</em>
                                <input type="password" placeholder="Confirm your Password">
                            </div>         
                            <a href="pageapp-login.html" class="color-white opacity-50 text-center font-11 top-30">Already Registered? Sign In here</a>
                            <a href="#" class="back-button button button-full button-m shadow-large button-round-small bg-highlight top-30 bottom-0">CREATE ACCOUNT</a>
                        </div>

                    </div>
                </div>   
                <div class="caption-overlay bg-black opacity-90"></div>
                <div class="caption-bg" style="background-image:url(images/pictures/29t.jpg)"></div>
            </div>                                  
        </div>
   
    
    <div id="menu-1" class="menu menu-box-left" 
         data-menu-width="250"
         data-menu-load="menu.html"
         data-menu-effect="menu-over"
         data-menu-select="page-pageapps">
    </div>       
    <div class="menu-hider"></div>
</div>
<!-- footer script -->
<?php include('modules/footer-script.php'); ?>

</body>
