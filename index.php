<?php 
session_start();
$title = "LifeDrop | Blood Compatibility & Health Guide";
require 'head.php'; 
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Section Header -->
    <div class="bg-white border-bottom py-5 mb-4">
        <div class="container text-center">
            <span class="badge badge-light border text-danger px-3 py-2 rounded-pill font-weight-bold mb-2">
                <i class="fa-solid fa-droplet text-danger mr-1"></i> COMPATIBILITY CHART
            </span>
            <h1 class="font-weight-bold text-dark">Blood Group Compatibility & Health</h1>
            <p class="text-muted mx-auto" style="max-width: 650px;">
                Understanding who you can give blood to and receive blood from saves lives in critical moments. Review your group below.
            </p>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <!-- Quick Summary Alert -->
        <div class="row justify-content-center mb-4">
            <div class="col-lg-10">
                <div class="card border-0 shadow-sm p-3 bg-light">
                    <div class="d-flex flex-wrap align-items-center justify-content-around text-center py-2">
                        <div class="px-3 my-2">
                            <span class="badge badge-danger p-2 px-3 mb-1 font-weight-bold">O Negative (O-)</span>
                            <div class="small font-weight-bold text-dark">Universal Red Cell Donor</div>
                            <small class="text-muted">Can donate to every blood group</small>
                        </div>
                        <div class="border-left d-none d-md-block" style="height: 40px;"></div>
                        <div class="px-3 my-2">
                            <span class="badge badge-primary p-2 px-3 mb-1 font-weight-bold">AB Positive (AB+)</span>
                            <div class="small font-weight-bold text-dark">Universal Recipient</div>
                            <small class="text-muted">Can receive red cells from every group</small>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Blood Type Cards Grid -->
        <div class="row mb-5">
            <!-- A+ -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge">A+</div>
                    <h5 class="text-center font-weight-bold mb-3">Type A Positive</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">A+</span>
                        <span class="compat-tag compat-give">AB+</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">A+</span>
                        <span class="compat-tag compat-receive">A-</span>
                        <span class="compat-tag compat-receive">O+</span>
                        <span class="compat-tag compat-receive">O-</span>
                    </div>
                </div>
            </div>

            <!-- A- -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge" style="background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);">A-</div>
                    <h5 class="text-center font-weight-bold mb-3">Type A Negative</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">A-</span>
                        <span class="compat-tag compat-give">A+</span>
                        <span class="compat-tag compat-give">AB-</span>
                        <span class="compat-tag compat-give">AB+</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">A-</span>
                        <span class="compat-tag compat-receive">O-</span>
                    </div>
                </div>
            </div>

            <!-- B+ -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge">B+</div>
                    <h5 class="text-center font-weight-bold mb-3">Type B Positive</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">B+</span>
                        <span class="compat-tag compat-give">AB+</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">B+</span>
                        <span class="compat-tag compat-receive">B-</span>
                        <span class="compat-tag compat-receive">O+</span>
                        <span class="compat-tag compat-receive">O-</span>
                    </div>
                </div>
            </div>

            <!-- B- -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge" style="background: linear-gradient(135deg, #f43f5e 0%, #e11d48 100%);">B-</div>
                    <h5 class="text-center font-weight-bold mb-3">Type B Negative</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">B-</span>
                        <span class="compat-tag compat-give">B+</span>
                        <span class="compat-tag compat-give">AB-</span>
                        <span class="compat-tag compat-give">AB+</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">B-</span>
                        <span class="compat-tag compat-receive">O-</span>
                    </div>
                </div>
            </div>

            <!-- AB+ -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);">AB+</div>
                    <h5 class="text-center font-weight-bold mb-3">Type AB Positive</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">AB+ only</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">All Blood Groups (Universal)</span>
                    </div>
                </div>
            </div>

            <!-- AB- -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge" style="background: linear-gradient(135deg, #0284c7 0%, #0369a1 100%);">AB-</div>
                    <h5 class="text-center font-weight-bold mb-3">Type AB Negative</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">AB-</span>
                        <span class="compat-tag compat-give">AB+</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">AB-</span>
                        <span class="compat-tag compat-receive">A-</span>
                        <span class="compat-tag compat-receive">B-</span>
                        <span class="compat-tag compat-receive">O-</span>
                    </div>
                </div>
            </div>

            <!-- O+ -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge">O+</div>
                    <h5 class="text-center font-weight-bold mb-3">Type O Positive</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">O+</span>
                        <span class="compat-tag compat-give">A+</span>
                        <span class="compat-tag compat-give">B+</span>
                        <span class="compat-tag compat-give">AB+</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">O+</span>
                        <span class="compat-tag compat-receive">O-</span>
                    </div>
                </div>
            </div>

            <!-- O- -->
            <div class="col-xl-3 col-lg-4 col-md-6 mb-4">
                <div class="blood-group-card p-4">
                    <div class="blood-badge" style="background: linear-gradient(135deg, #10b981 0%, #059669 100%);">O-</div>
                    <h5 class="text-center font-weight-bold mb-3">Type O Negative</h5>
                    <div class="mb-3">
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-hand-holding-heart text-success mr-1"></i> CAN GIVE TO:</small>
                        <span class="compat-tag compat-give">All Blood Groups (Universal)</span>
                    </div>
                    <div>
                        <small class="text-muted font-weight-bold d-block mb-1"><i class="fa-solid fa-syringe text-primary mr-1"></i> CAN RECEIVE FROM:</small>
                        <span class="compat-tag compat-receive">O- only</span>
                    </div>
                </div>
            </div>
        </div>

        <!-- Health & Preparation Tips Section -->
        <div class="card border-0 shadow-sm p-4 p-md-5 mb-5">
            <div class="d-flex align-items-center mb-4">
                <span class="brand-icon-wrapper mr-3 bg-danger-light text-danger">
                    <i class="fa-solid fa-heart-pulse"></i>
                </span>
                <div>
                    <h3 class="font-weight-bold text-dark mb-0">Donor Health & Wellness Tips</h3>
                    <small class="text-muted">Guidelines recommended by medical experts and the World Health Organization (WHO)</small>
                </div>
            </div>

            <div class="row">
                <div class="col-md-6 mb-4">
                    <div class="d-flex align-items-start">
                        <div class="stat-icon bg-success-light text-success mr-3">
                            <i class="fa-solid fa-apple-whole"></i>
                        </div>
                        <div>
                            <h6 class="font-weight-bold text-dark">Eat a Balanced & Healthy Diet</h6>
                            <p class="text-muted small">
                                Consume a variety of nutrient-dense foods including fruits, whole grains, nuts, and iron-rich vegetables. Maintain healthy hemoglobin levels before donation.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-4">
                    <div class="d-flex align-items-start">
                        <div class="stat-icon bg-accent-light text-accent mr-3">
                            <i class="fa-solid fa-glass-water"></i>
                        </div>
                        <div>
                            <h6 class="font-weight-bold text-dark">Hydrate Adequately</h6>
                            <p class="text-muted small">
                                Drink plenty of clean water (at least 500ml) right before and after donating blood to maintain body fluid volume and prevent dizziness.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-4">
                    <div class="d-flex align-items-start">
                        <div class="stat-icon bg-warning-light text-warning mr-3">
                            <i class="fa-solid fa-person-running"></i>
                        </div>
                        <div>
                            <h6 class="font-weight-bold text-dark">Regular Physical Activity</h6>
                            <p class="text-muted small">
                                Engage in at least 150 minutes of moderate-intensity activity per week to support optimal cardiovascular health, muscle stamina, and circulation.
                            </p>
                        </div>
                    </div>
                </div>

                <div class="col-md-6 mb-4">
                    <div class="d-flex align-items-start">
                        <div class="stat-icon bg-danger-light text-danger mr-3">
                            <i class="fa-solid fa-ban-smoking"></i>
                        </div>
                        <div>
                            <h6 class="font-weight-bold text-dark">Avoid Smoking & Alcohol</h6>
                            <p class="text-muted small">
                                Do not smoke or consume alcoholic beverages for at least 24 to 48 hours prior to donating blood to ensure optimal oxygen delivery in donated cells.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div class="alert alert-light border mt-2 d-flex flex-wrap align-items-center justify-content-between">
                <span class="small text-muted">
                    <i class="fa-solid fa-circle-info text-primary mr-1"></i> For detailed clinical guidelines and donation criteria, read official publications.
                </span>
                <a href="https://www.who.int/news-room/fact-sheets/detail/blood-safety-and-availability" target="_blank" class="btn btn-outline-danger btn-sm mt-2 mt-sm-0">
                    WHO Guidelines <i class="fa-solid fa-arrow-up-right-from-square ml-1"></i>
                </a>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
