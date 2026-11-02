<?php 
session_start();
$title = "LifeDrop | About Our Mission & Vision";
require 'head.php'; 
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-5 mb-4">
        <div class="container text-center">
            <span class="badge badge-light border text-danger px-3 py-2 rounded-pill font-weight-bold mb-2">
                <i class="fa-solid fa-heart-pulse mr-1"></i> OUR MISSION
            </span>
            <h1 class="font-weight-bold text-dark">About LifeDrop Blood Bank</h1>
            <p class="text-muted mx-auto" style="max-width: 650px;">
                Connecting donors, healthcare providers, and patients to ensure safe, swift, and reliable blood access for everyone in need.
            </p>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <!-- Mission Highlight Section -->
        <div class="card border-0 shadow-sm p-4 p-md-5 mb-5">
            <div class="row align-items-center">
                <div class="col-lg-6 mb-4 mb-lg-0">
                    <img src="image/about1.png" alt="LifeDrop Team" class="img-fluid rounded-lg shadow-sm w-100" style="max-height: 380px; object-fit: cover;">
                </div>
                <div class="col-lg-6">
                    <span class="badge badge-danger px-3 py-1 mb-2 font-weight-bold">EVERY LIFE COUNTS</span>
                    <h2 class="font-weight-bold text-dark mb-3">"I'm here to save you!"</h2>
                    <p class="text-muted leading-relaxed mb-3">
                        We believe every life matters. Time is the most precious resource during critical medical procedures and emergency transfusions. Our core goal is to make compatible blood available with zero delays, connecting voluntary donors directly with certified medical facilities.
                    </p>
                    <p class="text-muted leading-relaxed mb-4">
                        Through transparency, real-time inventory tracking, and swift notifications, LifeDrop empowers citizens and hospitals to act as one unified lifesaver network.
                    </p>
                    <div class="d-flex flex-wrap gap-2">
                        <a href="register.php" class="btn btn-primary px-4 py-2 font-weight-bold mr-2 shadow-sm">
                            <i class="fa-solid fa-user-plus mr-1"></i> Register as Donor
                        </a>
                        <a href="contact.php" class="btn btn-outline-secondary px-4 py-2 font-weight-bold">
                            <i class="fa-solid fa-envelope mr-1"></i> Contact Us
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <!-- Core Values Grid -->
        <div class="text-center mb-5">
            <span class="badge badge-light border text-danger px-3 py-2 rounded-pill font-weight-bold mb-2">CORE VALUES</span>
            <h3 class="font-weight-bold text-dark">What Guides Everything We Do</h3>
        </div>

        <div class="row mb-5">
            <div class="col-md-4 mb-4">
                <div class="card h-100 p-4 border-0 shadow-sm text-center">
                    <div class="portal-icon mx-auto mb-3">
                        <i class="fa-solid fa-bolt-lightning"></i>
                    </div>
                    <h5 class="font-weight-bold text-dark">Rapid Response</h5>
                    <p class="text-muted small">
                        Real-time status updates allow hospitals and patients to quickly identify and secure required blood types without panic or delay.
                    </p>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card h-100 p-4 border-0 shadow-sm text-center">
                    <div class="portal-icon mx-auto mb-3">
                        <i class="fa-solid fa-shield-halved"></i>
                    </div>
                    <h5 class="font-weight-bold text-dark">Safety & Verification</h5>
                    <p class="text-muted small">
                        All blood collection follows strict clinical protocols, certified medical screening, and proper cold-chain preservation.
                    </p>
                </div>
            </div>

            <div class="col-md-4 mb-4">
                <div class="card h-100 p-4 border-0 shadow-sm text-center">
                    <div class="portal-icon mx-auto mb-3">
                        <i class="fa-solid fa-hand-holding-heart"></i>
                    </div>
                    <h5 class="font-weight-bold text-dark">100% Voluntary</h5>
                    <p class="text-muted small">
                        Built upon the generosity of human compassion. Voluntary donors receive the satisfaction of directly saving human lives.
                    </p>
                </div>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
