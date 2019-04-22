<!DOCTYPE HTML>
<html lang="en">
<?php include('modules/header-info.php'); ?>
    
<body class="theme-light" data-highlight="blue2">
    
<div id="page-preloader">
    <div class="loader-main"><div class="preload-spinner border-highlight"></div></div>
</div>
    
    
<div id="page">        
	<!-- header -->         
    <?php include('modules/header.php'); ?>
    
    <div class="page-content-black"></div>    
    
	<div class="page-content">	
        <div class="cover-wrapper cover-no-buttons">
            <div data-height="cover" class="caption bottom-0">
                <div class="caption-center">

                    <div class="left-50 right-50 top-50">
                        <h3 class="color-white center-text uppercase bold fa-2x">LOGIN</h3>
                        <p class="color-highlight center-text font-12 under-heading bottom-30 top-5">
                            Let's get you in your account
                        </p>
                        <div class="input-style input-light has-icon input-style-1 input-required">
                            <i class="input-icon fa fa-user font-11"></i>
                            <span>Username</span>
                            <em>(required)</em>
                            <input type="name" placeholder="Username">
                        </div> 
                        <div class="input-style input-light has-icon input-style-1 input-required bottom-30">
                            <i class="input-icon fa fa-lock font-11"></i>
                            <span>Password</span>
                            <em>(required)</em>
                            <input type="password" placeholder="Password">
                        </div>          
                        <div class="one-half">
                            <a href="pageapp-register.html" class="font-11 color-white opacity-50">Create Account</a>
                        </div>
                        <div class="one-half last-column">
                            <a href="pageapp-forgot.html" class="text-right font-11 color-white opacity-50">Fogot Credentials</a>
                        </div>
                        <div class="clear"></div>
                        <a href="#" class="back-button button button-full button-m shadow-large button-round-small bg-highlight top-30 bottom-0">LOGIN</a>
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

