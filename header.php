<?php
$currentPage = basename($_SERVER['PHP_SELF']);
?>
<nav class="navbar navbar-expand-lg navbar-light modern-navbar sticky-top">
    <div class="container-fluid px-lg-4 px-xl-5">
        <a class="navbar-brand d-flex align-items-center" href="main.php">
            <span class="brand-icon-wrapper mr-2">
                <i class="fa-solid fa-heart-pulse text-danger"></i>
            </span>
            <span class="brand-text">Life<span class="text-danger">Drop</span></span>
            <?php if (isset($_SESSION['hid'])) { ?>
                <span class="badge-portal ml-2">Hospital</span>
            <?php } elseif (isset($_SESSION['rid'])) { ?>
                <span class="badge-portal ml-2">Donor</span>
            <?php } ?>
        </a>

        <button class="navbar-toggler border-0 shadow-none" type="button" data-toggle="collapse" data-target="#collapsibleNavbar" aria-controls="collapsibleNavbar" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="collapsibleNavbar">
            <ul class="navbar-nav ml-auto align-items-lg-center nav-gap">
                <?php if (isset($_SESSION['hid'])) { ?>
                    <!-- Hospital Navigation -->
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'hospitalpage.html' || $currentPage == 'hospitalpage.php') ? 'active' : ''; ?>" href="hospitalpage.html">
                            <i class="fa-solid fa-gauge"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'bloodinfo.php') ? 'active' : ''; ?>" href="bloodinfo.php">
                            <i class="fa-solid fa-boxes-stacked"></i> Blood Stock
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'bloodrequest.php') ? 'active' : ''; ?>" href="bloodrequest.php">
                            <i class="fa-solid fa-inbox"></i> Blood Requests
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'deleteit.php') ? 'active' : ''; ?>" href="deleteit.php">
                            <i class="fa-solid fa-hand-holding-medical"></i> Available Donors
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'sentrequestd.php') ? 'active' : ''; ?>" href="sentrequestd.php">
                            <i class="fa-solid fa-clock-rotate-left"></i> Request Status
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'hprofile.php') ? 'active' : ''; ?>" href="hprofile.php">
                            <i class="fa-solid fa-hospital text-danger"></i> Profile
                        </a>
                    </li>
                    <li class="nav-item ml-lg-2 mt-2 mt-lg-0">
                        <a class="btn-nav-logout" href="logout.php">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out
                        </a>
                    </li>

                <?php } elseif (isset($_SESSION['rid'])) { ?>
                    <!-- Receiver / User Navigation -->
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'Userpage.html' || $currentPage == 'Userpage.php') ? 'active' : ''; ?>" href="Userpage.html">
                            <i class="fa-solid fa-gauge"></i> Dashboard
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'abs.php') ? 'active' : ''; ?>" href="abs.php">
                            <i class="fa-solid fa-magnifying-glass"></i> Find Blood
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'sentrequest.php') ? 'active' : ''; ?>" href="sentrequest.php">
                            <i class="fa-solid fa-clipboard-list"></i> My Requests
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'blooddinfo.php') ? 'active' : ''; ?>" href="blooddinfo.php">
                            <i class="fa-solid fa-hand-holding-heart"></i> Donate Blood
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'blooddonate.php') ? 'active' : ''; ?>" href="blooddonate.php">
                            <i class="fa-solid fa-clock-rotate-left"></i> Donation Status
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'rprofile.php') ? 'active' : ''; ?>" href="rprofile.php">
                            <i class="fa-solid fa-circle-user text-danger"></i> Profile
                        </a>
                    </li>
                    <li class="nav-item ml-lg-2 mt-2 mt-lg-0">
                        <a class="btn-nav-logout" href="logout.php">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i> Log Out
                        </a>
                    </li>

                <?php } else { ?>
                    <!-- Public Guest Navigation -->
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'main.php') ? 'active' : ''; ?>" href="main.php">
                            <i class="fa-solid fa-house"></i> Home
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'index.php') ? 'active' : ''; ?>" href="index.php">
                            <i class="fa-solid fa-droplet"></i> Blood Guide
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'about.php') ? 'active' : ''; ?>" href="about.php">
                            <i class="fa-solid fa-circle-info"></i> About Us
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link <?php echo ($currentPage == 'contact.php') ? 'active' : ''; ?>" href="contact.php">
                            <i class="fa-solid fa-headset"></i> Contact
                        </a>
                    </li>
                    <li class="nav-item ml-lg-3 mt-2 mt-lg-0">
                        <a class="btn btn-outline-danger btn-sm px-3 rounded-pill <?php echo ($currentPage == 'login.php') ? 'active' : ''; ?>" href="login.php" style="white-space: nowrap;">
                            <i class="fa-solid fa-arrow-right-to-bracket mr-1"></i> Login
                        </a>
                    </li>
                    <li class="nav-item ml-lg-2 mt-2 mt-lg-0">
                        <a class="btn btn-danger btn-sm px-3 rounded-pill shadow-sm <?php echo ($currentPage == 'register.php') ? 'active' : ''; ?>" href="register.php" style="white-space: nowrap;">
                            <i class="fa-solid fa-user-plus mr-1"></i> Register
                        </a>
                    </li>
                <?php } ?>
            </ul>
        </div>
    </div>
</nav>
