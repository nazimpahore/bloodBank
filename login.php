<?php 
session_start();
if (isset($_SESSION['hid'])) {
    header("location:hospitalpage.html");
    exit();
} elseif (isset($_SESSION['rid'])) {
    header("location:Userpage.html");
    exit();
} else {
    $title = "LifeDrop | Secure Portal Login";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <div class="container cont d-flex align-items-center justify-content-center" style="min-height: calc(100vh - 200px);">
        <div class="w-100" style="max-width: 480px;">
            
            <?php require 'message.php'; ?>

            <div class="card form-card shadow-lg border-0">
                <div class="text-center pt-4 pb-2 px-4">
                    <div class="brand-icon-wrapper mx-auto mb-2" style="width: 52px; height: 52px; font-size: 1.5rem;">
                        <i class="fa-solid fa-lock text-danger"></i>
                    </div>
                    <h4 class="font-weight-bold text-dark mb-1">Account Login</h4>
                    <p class="text-muted small">Select your account type to access your dashboard</p>
                </div>

                <ul class="nav nav-tabs auth-nav-tabs nav-fill" role="tablist">
                    <li class="nav-item">
                        <a class="nav-link active" data-toggle="tab" href="#hospitalTab" role="tab">
                            <i class="fa-solid fa-hospital mr-1"></i> Hospital / Clinic
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="tab" href="#userTab" role="tab">
                            <i class="fa-solid fa-user mr-1"></i> Individual / Donor
                        </a>
                    </li>
                </ul>

                <div class="tab-content p-4">
                    <!-- Hospital Login Tab -->
                    <div class="tab-pane fade show active" id="hospitalTab" role="tabpanel">
                        <form action="file/hospitalLogin.php" method="post">
                            <div class="form-group mb-3">
                                <label for="hemail" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-envelope mr-1 text-danger"></i> Hospital Registered Email
                                </label>
                                <input type="email" id="hemail" name="hemail" placeholder="hospital@domain.org" class="form-control" required autocomplete="email">
                            </div>

                            <div class="form-group mb-4">
                                <label for="hpassword" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-key mr-1 text-danger"></i> Password
                                </label>
                                <input type="password" id="hpassword" name="hpassword" placeholder="••••••••" class="form-control" required autocomplete="current-password">
                            </div>

                            <button type="submit" name="hlogin" class="btn btn-primary btn-block py-2 font-weight-bold shadow-sm">
                                <i class="fa-solid fa-right-to-bracket mr-1"></i> Login as Hospital
                            </button>
                        </form>
                    </div>

                    <!-- User/Receiver Login Tab -->
                    <div class="tab-pane fade" id="userTab" role="tabpanel">
                        <form action="file/receiverLogin.php" method="post">
                            <div class="form-group mb-3">
                                <label for="remail" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-envelope mr-1 text-danger"></i> User / Donor Email
                                </label>
                                <input type="email" id="remail" name="remail" placeholder="user@domain.com" class="form-control" required autocomplete="email">
                            </div>

                            <div class="form-group mb-4">
                                <label for="rpassword" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-key mr-1 text-danger"></i> Password
                                </label>
                                <input type="password" id="rpassword" name="rpassword" placeholder="••••••••" class="form-control" required autocomplete="current-password">
                            </div>

                            <button type="submit" name="rlogin" class="btn btn-primary btn-block py-2 font-weight-bold shadow-sm">
                                <i class="fa-solid fa-right-to-bracket mr-1"></i> Login as User / Donor
                            </button>
                        </form>
                    </div>
                </div>

                <div class="card-footer bg-light text-center py-3 border-top">
                    <small class="text-muted">Don't have an account yet? 
                        <a href="register.php" class="font-weight-bold text-danger">Register Now</a>
                    </small>
                </div>
            </div>

        </div>
    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
<?php } ?>
