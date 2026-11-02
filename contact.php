<?php 
session_start();
$title = "LifeDrop | Contact & Emergency Helpline";
require 'head.php'; 
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-5 mb-4">
        <div class="container text-center">
            <span class="badge badge-light border text-danger px-3 py-2 rounded-pill font-weight-bold mb-2">
                <i class="fa-solid fa-headset mr-1"></i> SUPPORT & EMERGENCY
            </span>
            <h1 class="font-weight-bold text-dark">Get in Touch With Us</h1>
            <p class="text-muted mx-auto" style="max-width: 650px;">
                Have an urgent blood requirement, technical question, or wish to partner your hospital? Reach our dedicated coordinator directly.
            </p>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <!-- Emergency Banner Card -->
        <div class="card border-0 shadow-sm p-4 p-md-5 mb-5 rounded-lg text-white" style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%);">
            <div class="row align-items-center">
                <div class="col-lg-8 mb-3 mb-lg-0">
                    <span class="badge badge-light text-danger font-weight-bold px-3 py-1 mb-2">24/7 EMERGENCY HELPLINE</span>
                    <h3 class="font-weight-bold mb-2">Critical Medical Need?</h3>
                    <p class="mb-0 text-white-50">
                        In life-threatening situations requiring immediate blood units, reach out to our primary emergency coordinator right away.
                    </p>
                </div>
                <div class="col-lg-4 text-lg-right">
                    <a href="tel:+923063071648" class="btn btn-light text-danger font-weight-bold btn-lg px-4 shadow">
                        <i class="fa-solid fa-phone-volume mr-2"></i> +92 306 3071648
                    </a>
                </div>
            </div>
        </div>

        <!-- Official Coordinator Card -->
        <div class="row justify-content-center mb-5">
            <div class="col-lg-6 col-md-8">
                <div class="card border-0 shadow-sm p-4 p-md-5 text-center">
                    <div class="brand-icon-wrapper mx-auto mb-3" style="width: 80px; height: 80px; font-size: 2.2rem; background: #fee2e2;">
                        <i class="fa-solid fa-user-shield text-danger"></i>
                    </div>

                    <h3 class="font-weight-bold text-dark mb-1">Muhammad Nazim</h3>
                    <span class="badge badge-light border text-danger font-weight-bold px-3 py-1 mb-3">
                        Lead Coordinator & Emergency Contact
                    </span>
                    <p class="text-muted small mb-4">
                        Available 24/7 for donor coordination, patient inquiries, and hospital emergency requests.
                    </p>

                    <hr class="my-3">

                    <div class="row py-2">
                        <div class="col-sm-6 mb-3 mb-sm-0">
                            <small class="text-muted d-block font-weight-bold text-uppercase mb-1">Direct Phone</small>
                            <a href="tel:+923063071648" class="contact-pill contact-pill-phone py-2 px-3">
                                <i class="fa-solid fa-phone"></i>
                                <span>+92 306 3071648</span>
                            </a>
                        </div>
                        <div class="col-sm-6">
                            <small class="text-muted d-block font-weight-bold text-uppercase mb-1">Official Email</small>
                            <a href="mailto:nazimpahore8@gmail.com" class="contact-pill contact-pill-email py-2 px-3">
                                <i class="fa-solid fa-envelope"></i>
                                <span>nazimpahore8@gmail.com</span>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
