<?php 
session_start();
if (isset($_SESSION['hid'])) {
    header("location:hospitalpage.html");
    exit();
} elseif (isset($_SESSION['rid'])) {
    header("location:Userpage.html");
    exit();
} else {
    $title = "LifeDrop | Create Account";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <div class="container cont d-flex align-items-center justify-content-center" style="min-height: calc(100vh - 200px);">
        <div class="w-100" style="max-width: 520px;">
            
            <?php require 'message.php'; ?>

            <div class="card form-card shadow-lg border-0 my-4">
                <div class="text-center pt-4 pb-2 px-4">
                    <div class="brand-icon-wrapper mx-auto mb-2" style="width: 52px; height: 52px; font-size: 1.5rem;">
                        <i class="fa-solid fa-user-plus text-danger"></i>
                    </div>
                    <h4 class="font-weight-bold text-dark mb-1">Create an Account</h4>
                    <p class="text-muted small">Register as a certified hospital or voluntary donor/receiver</p>
                </div>

                <ul class="nav nav-tabs auth-nav-tabs nav-fill" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#hospitalRegTab" role="tab">
                            <i class="fa-solid fa-hospital mr-1"></i> Hospital / Clinic
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#userRegTab" role="tab">
                            <i class="fa-solid fa-user mr-1"></i> User / Donor
                        </a>
                    </li>
                </ul>

                <div class="tab-content p-4">
                    <!-- Hospital Registration Tab -->
                    <div class="tab-pane fade show active" id="hospitalRegTab" role="tabpanel">
                        <form action="file/hospitalReg.php" method="post" enctype="multipart/form-data">
                            <div class="form-group mb-3">
                                <label for="hname" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-hospital mr-1 text-danger"></i> Hospital / Clinic Name
                                </label>
                                <input type="text" id="hname" name="hname" placeholder="e.g. City General Hospital" class="form-control" required>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group mb-3">
                                    <label for="hcity" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-location-dot mr-1 text-danger"></i> City / Location
                                    </label>
                                    <input type="text" id="hcity" name="hcity" placeholder="City" class="form-control" required>
                                </div>
                                <div class="col-md-6 form-group mb-3">
                                    <label for="hphone" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-phone mr-1 text-danger"></i> Contact Phone
                                    </label>
                                    <input type="tel" id="hphone" name="hphone" placeholder="10-12 digits" class="form-control" required pattern="[0,6-9]{1}[0-9]{9,11}" title="Phone must start with 0, 6, 7, 8 or 9 (10-12 digits)">
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="reg_hemail" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-envelope mr-1 text-danger"></i> Hospital Email Address
                                </label>
                                <input type="email" id="reg_hemail" name="hemail" placeholder="admin@hospital.org" class="form-control" required autocomplete="email">
                            </div>

                            <div class="form-group mb-4">
                                <label for="reg_hpassword" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-key mr-1 text-danger"></i> Secure Password (min 6 characters)
                                </label>
                                <input type="password" id="reg_hpassword" name="hpassword" placeholder="••••••••" class="form-control" required minlength="6" autocomplete="new-password">
                            </div>

                            <button type="submit" name="hregister" class="btn btn-primary btn-block py-2 font-weight-bold shadow-sm">
                                <i class="fa-solid fa-check mr-1"></i> Register Hospital
                            </button>
                        </form>
                    </div>

                    <!-- User / Donor Registration Tab -->
                    <div class="tab-pane fade" id="userRegTab" role="tabpanel">
                        <form action="file/receiverReg.php" method="post" enctype="multipart/form-data">
                            <div class="form-group mb-3">
                                <label for="rname" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-user mr-1 text-danger"></i> Full Name
                                </label>
                                <input type="text" id="rname" name="rname" placeholder="e.g. John Doe" class="form-control" required>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group mb-3">
                                    <label for="rbg" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-droplet mr-1 text-danger"></i> Blood Group
                                    </label>
                                    <select id="rbg" name="rbg" class="form-control" required>
                                        <option value="" disabled selected>Select Group</option>
                                        <option value="A+">A+</option>
                                        <option value="A-">A-</option>
                                        <option value="B+">B+</option>
                                        <option value="B-">B-</option>
                                        <option value="AB+">AB+</option>
                                        <option value="AB-">AB-</option>
                                        <option value="O+">O+</option>
                                        <option value="O-">O-</option>
                                    </select>
                                </div>
                                <div class="col-md-6 form-group mb-3">
                                    <label for="rcity" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-location-dot mr-1 text-danger"></i> City
                                    </label>
                                    <input type="text" id="rcity" name="rcity" placeholder="City" class="form-control" required>
                                </div>
                            </div>

                            <div class="form-group mb-3">
                                <label for="rphone" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-phone mr-1 text-danger"></i> Contact Phone
                                </label>
                                <input type="tel" id="rphone" name="rphone" placeholder="10-12 digits" class="form-control" required pattern="[0,6-9]{1}[0-9]{9,11}" title="Phone must start with 0, 6, 7, 8 or 9 (10-12 digits)">
                            </div>

                            <div class="form-group mb-3">
                                <label for="reg_remail" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-envelope mr-1 text-danger"></i> Email Address
                                </label>
                                <input type="email" id="reg_remail" name="remail" placeholder="user@domain.com" class="form-control" required autocomplete="email">
                            </div>

                            <div class="form-group mb-4">
                                <label for="reg_rpassword" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-key mr-1 text-danger"></i> Secure Password (min 6 characters)
                                </label>
                                <input type="password" id="reg_rpassword" name="rpassword" placeholder="••••••••" class="form-control" required minlength="6" autocomplete="new-password">
                            </div>

                            <button type="submit" name="rregister" class="btn btn-primary btn-block py-2 font-weight-bold shadow-sm">
                                <i class="fa-solid fa-check mr-1"></i> Register as Donor/User
                            </button>
                        </form>
                    </div>
                </div>

                <div class="card-footer bg-light text-center py-3 border-top">
                    <small class="text-muted">Already have an account? 
                        <a href="login.php" class="font-weight-bold text-danger">Login Here</a>
                    </small>
                </div>
            </div>

        </div>
    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
<?php } ?>
