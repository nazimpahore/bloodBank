<?php
require 'file/connection.php';
session_start();
if(!isset($_SESSION['hid'])) {
    header('location:login.php');
    exit();
} else {
    $id = $_SESSION['hid'];
    $sql = "SELECT * FROM hospitals WHERE id='$id'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $title = "LifeDrop | Hospital Profile Settings";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-id-card text-danger mr-2"></i> Hospital Profile Settings
                </h3>
                <p class="text-muted small mb-0">Update your hospital contact credentials and facility details</p>
            </div>
            <a href="hospitalpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
                <i class="fa-solid fa-arrow-left mr-1"></i> Dashboard
            </a>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <div class="row justify-content-center">
            <div class="col-lg-7 col-md-9">
                <div class="card shadow-sm border-0">
                    <div class="card-header bg-white border-bottom py-4 text-center">
                        <div class="brand-icon-wrapper mx-auto mb-2" style="width: 70px; height: 70px; font-size: 2rem; background: #fee2e2;">
                            <i class="fa-solid fa-hospital text-danger"></i>
                        </div>
                        <h4 class="font-weight-bold text-dark mb-1"><?php echo htmlspecialchars($row['hname']); ?></h4>
                        <span class="badge badge-light border text-muted px-3 py-1">Registered Medical Institution</span>
                    </div>

                    <div class="card-body p-4 p-md-5">
                        <form action="file/updateprofile.php" method="post">
                            <div class="form-group mb-3">
                                <label for="hname" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-hospital mr-1 text-danger"></i> Hospital / Clinic Name
                                </label>
                                <input type="text" id="hname" name="hname" value="<?php echo htmlspecialchars($row['hname']); ?>" class="form-control" required>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group mb-3">
                                    <label for="hemail" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-envelope mr-1 text-danger"></i> Official Email
                                    </label>
                                    <input type="email" id="hemail" name="hemail" value="<?php echo htmlspecialchars($row['hemail']); ?>" class="form-control" required>
                                </div>
                                <div class="col-md-6 form-group mb-3">
                                    <label for="hphone" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-phone mr-1 text-danger"></i> Contact Phone
                                    </label>
                                    <input type="text" id="hphone" name="hphone" value="<?php echo htmlspecialchars($row['hphone']); ?>" class="form-control" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group mb-4">
                                    <label for="hcity" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-location-dot mr-1 text-danger"></i> City
                                    </label>
                                    <input type="text" id="hcity" name="hcity" value="<?php echo htmlspecialchars($row['hcity']); ?>" class="form-control" required>
                                </div>
                                <div class="col-md-6 form-group mb-4">
                                    <label for="hpassword" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-key mr-1 text-danger"></i> Account Password
                                    </label>
                                    <input type="password" id="hpassword" name="hpassword" value="<?php echo htmlspecialchars($row['hpassword']); ?>" class="form-control" required>
                                </div>
                            </div>

                            <div class="d-flex flex-wrap gap-2 pt-2">
                                <button type="submit" name="update" class="btn btn-primary px-4 py-2 font-weight-bold mr-2 shadow-sm">
                                    <i class="fa-solid fa-floppy-disk mr-1"></i> Save Changes
                                </button>
                                <a href="hospitalpage.html" class="btn btn-outline-secondary px-4 py-2 font-weight-bold">
                                    Cancel
                                </a>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
<?php } ?>
