<?php 
session_start();
$title = "LifeDrop | Modern Blood Bank Management System";
require 'head.php'; 
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Hero Section -->
    <section class="hero-banner">
        <div class="container position-relative">
            <div class="row align-items-center">
                <div class="col-lg-7">
                    <span class="hero-badge">
                        <i class="fa-solid fa-heart-pulse mr-2"></i> Saving Lives 24 Hours a Day
                    </span>
                    <h1 class="hero-title">
                        Donate Blood, <br>
                        <span class="text-danger">Inspire Hope</span> & Save Lives.
                    </h1>
                    <p class="hero-lead">
                        LifeDrop bridges voluntary blood donors with hospitals and individuals in critical need. Experience rapid, verified, and transparent blood donation management.
                    </p>
                    <div class="d-flex flex-wrap gap-3">
                        <a href="index.php" class="btn btn-primary btn-lg px-4 mr-3 mb-2 shadow">
                            <i class="fa-solid fa-droplet mr-2"></i> Blood Compatibility Guide
                        </a>
                        <?php if(!isset($_SESSION['hid']) && !isset($_SESSION['rid'])) { ?>
                            <a href="register.php" class="btn btn-outline-light btn-lg px-4 mb-2">
                                <i class="fa-solid fa-user-plus mr-2"></i> Join as Donor / Hospital
                            </a>
                        <?php } else { ?>
                            <a href="<?php echo isset($_SESSION['hid']) ? 'hospitalpage.html' : 'Userpage.html'; ?>" class="btn btn-outline-light btn-lg px-4 mb-2">
                                <i class="fa-solid fa-gauge mr-2"></i> Go to Dashboard
                            </a>
                        <?php } ?>
                    </div>
                </div>
                <div class="col-lg-5 d-none d-lg-block text-center">
                    <img src="image/bg.png" alt="Donate Blood" class="img-fluid" style="max-height: 380px; filter: drop-shadow(0 20px 30px rgba(0,0,0,0.3));">
                </div>
            </div>
        </div>
    </section>

    <div class="container cont pt-0">
        <?php require 'message.php'; ?>

        <!-- Key Metrics Cards -->
        <div class="row mb-5" style="margin-top: -60px; position: relative; z-index: 10;">
            <div class="col-lg-3 col-sm-6 mb-4">
                <div class="stat-card">
                    <div class="stat-icon bg-danger-light text-danger">
                        <i class="fa-solid fa-hand-holding-droplet"></i>
                    </div>
                    <div>
                        <h4 class="font-weight-bold mb-0">100%</h4>
                        <span class="text-muted small">Voluntary Donors</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 mb-4">
                <div class="stat-card">
                    <div class="stat-icon bg-primary-light text-primary">
                        <i class="fa-solid fa-hospital"></i>
                    </div>
                    <div>
                        <h4 class="font-weight-bold mb-0">Partnered</h4>
                        <span class="text-muted small">Certified Hospitals</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 mb-4">
                <div class="stat-card">
                    <div class="stat-icon bg-success-light text-success">
                        <i class="fa-solid fa-clock"></i>
                    </div>
                    <div>
                        <h4 class="font-weight-bold mb-0">24 / 7</h4>
                        <span class="text-muted small">Emergency Support</span>
                    </div>
                </div>
            </div>
            <div class="col-lg-3 col-sm-6 mb-4">
                <div class="stat-card">
                    <div class="stat-icon bg-warning-light text-warning">
                        <i class="fa-solid fa-shield-heart"></i>
                    </div>
                    <div>
                        <h4 class="font-weight-bold mb-0">Verified</h4>
                        <span class="text-muted small">Safe Medical Standards</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Featured Carousel -->
        <div class="card border-0 shadow-sm rounded-lg mb-5 overflow-hidden">
            <div id="mainCarousel" class="carousel slide" data-ride="carousel" data-interval="4500">
                <ol class="carousel-indicators">
                    <li data-target="#mainCarousel" data-slide-to="0" class="active"></li>
                    <li data-target="#mainCarousel" data-slide-to="1"></li>
                    <li data-target="#mainCarousel" data-slide-to="2"></li>
                </ol>
                <div class="carousel-inner">
                    <div class="carousel-item active">
                        <img src="image/slide-1.jpg" alt="Blood Donation Drive" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="image/cc1.jpg" alt="Blood Testing & Processing" class="d-block w-100">
                    </div>
                    <div class="carousel-item">
                        <img src="image/blog-4.png" alt="Emergency Medical Delivery" class="d-block w-100">
                    </div>
                </div>
                <a class="carousel-control-prev" href="#mainCarousel" role="button" data-slide="prev">
                    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next" href="#mainCarousel" role="button" data-slide="next">
                    <span class="carousel-control-next-icon" aria-hidden="true"></span>
                    <span class="sr-only">Next</span>
                </a>
            </div>
        </div>

        <!-- How It Works Section -->
        <div class="text-center mb-5">
            <span class="badge badge-light border text-danger px-3 py-2 rounded-pill font-weight-bold mb-2">SIMPLE PROCESS</span>
            <h2 class="font-weight-bold text-dark">How LifeDrop Works</h2>
            <p class="text-muted">Connecting blood donors and receivers in 3 simple steps</p>
        </div>

        <div class="row mb-5">
            <div class="col-md-4 mb-4">
                <div class="card h-100 text-center p-4 border-0 shadow-sm">
                    <div class="portal-icon mx-auto mb-3">
                        <i class="fa-solid fa-id-card"></i>
                    </div>
                    <h5 class="font-weight-bold">1. Quick Registration</h5>
                    <p class="text-muted small">
                        Hospitals and individual donors create a secure profile in less than 2 minutes with city and contact info.
                    </p>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card h-100 text-center p-4 border-0 shadow-sm">
                    <div class="portal-icon mx-auto mb-3">
                        <i class="fa-solid fa-magnifying-glass-chart"></i>
                    </div>
                    <h5 class="font-weight-bold">2. Search or Request</h5>
                    <p class="text-muted small">
                        Search real-time availability by blood group (A+, B+, O-, etc.) and directly place or review verified requests.
                    </p>
                </div>
            </div>
            <div class="col-md-4 mb-4">
                <div class="card h-100 text-center p-4 border-0 shadow-sm">
                    <div class="portal-icon mx-auto mb-3">
                        <i class="fa-solid fa-heart-circle-check"></i>
                    </div>
                    <h5 class="font-weight-bold">3. Save a Life</h5>
                    <p class="text-muted small">
                        Hospital accepts requests instantly and coordinates safe collection or transfusion. Every second counts!
                    </p>
                </div>
            </div>
        </div>

        <!-- About Highlight Section -->
        <div class="card border-0 shadow-sm p-4 p-lg-5 mb-5" style="background: linear-gradient(to right, #ffffff, #fff5f5);">
            <div class="row align-items-center">
                <div class="col-lg-5 mb-4 mb-lg-0 text-center">
                    <img src="image/about1.png" alt="LifeDrop Team" class="img-fluid rounded-lg shadow-sm" style="max-height: 280px;">
                </div>
                <div class="col-lg-7">
                    <span class="badge badge-danger text-uppercase px-3 py-1 mb-2">Our Mission</span>
                    <h3 class="font-weight-bold text-dark mb-3">"I'm here to save you!"</h3>
                    <p class="text-muted mb-4 leading-relaxed">
                        We believe every single life counts and every life matters. In medical emergencies, finding compatible blood quickly is the difference between life and loss. LifeDrop digitizes and accelerates blood matching across certified clinics, donors, and receivers.
                    </p>
                    <div class="d-flex flex-wrap gap-2">
                        <a href="about.php" class="btn btn-outline-danger mr-3 mb-2">
                            <i class="fa-solid fa-book-open mr-1"></i> Learn More About Us
                        </a>
                        <a href="contact.php" class="btn btn-secondary mb-2">
                            <i class="fa-solid fa-headset mr-1"></i> Contact Coordinators
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Emergency Banner Section -->
        <div class="card bg-dark text-white border-0 shadow p-4 p-md-5 mb-5 rounded-lg" style="background: linear-gradient(135deg, #1e293b 0%, #0f172a 100%) !important;">
            <div class="row align-items-center">
                <div class="col-lg-8 mb-3 mb-lg-0">
                    <div class="d-flex align-items-center mb-2">
                        <span class="badge badge-danger mr-2 px-2 py-1">URGENT</span>
                        <h4 class="font-weight-bold mb-0 text-white">Need Blood Urgently?</h4>
                    </div>
                    <p class="text-muted mb-0 small">
                        Our regional coordinators and active hospitals are accessible 24/7 for prompt assistance.
                    </p>
                </div>
                <div class="col-lg-4 text-lg-right">
                    <a href="tel:+923063071648" class="btn btn-danger btn-lg shadow-sm">
                        <i class="fa-solid fa-phone-flip mr-2"></i> Call Helpline Now
                    </a>
                </div>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
