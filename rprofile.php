<?php
require 'file/connection.php';
session_start();
if(!isset($_SESSION['rid'])) {
    header('location:login.php');
    exit();
} else {
    $id = $_SESSION['rid'];
    $sql = "SELECT * FROM receivers WHERE id='$id'";
    $result = mysqli_query($conn, $sql);
    $row = mysqli_fetch_array($result);
    $title = "LifeDrop | User Profile Settings";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-user-gear text-danger mr-2"></i> My Account Profile
                </h3>
                <p class="text-muted small mb-0">Update your donor identity, contact phone number, and location</p>
            </div>
            <a href="Userpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
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
                            <i class="fa-solid fa-user text-danger"></i>
                        </div>
                        <h4 class="font-weight-bold text-dark mb-1"><?php echo htmlspecialchars($row['rname']); ?></h4>
                        <span class="badge badge-danger px-3 py-1 font-weight-bold">
                            <i class="fa-solid fa-droplet mr-1"></i> Blood Group: <?php echo htmlspecialchars($row['rbg']); ?>
                        </span>
                    </div>

                    <div class="card-body p-4 p-md-5">
                        <form action="file/updateprofile.php" method="post">
                            <div class="form-group mb-3">
                                <label for="rname" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-user mr-1 text-danger"></i> Full Name
                                </label>
                                <input type="text" id="rname" name="rname" value="<?php echo htmlspecialchars($row['rname']); ?>" class="form-control" required>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group mb-3">
                                    <label for="remail" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-envelope mr-1 text-danger"></i> Email Address
                                    </label>
                                    <input type="email" id="remail" name="remail" value="<?php echo htmlspecialchars($row['remail']); ?>" class="form-control" required>
                                </div>
                                <div class="col-md-6 form-group mb-3">
                                    <label for="rphone" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-phone mr-1 text-danger"></i> Phone Number
                                    </label>
                                    <input type="text" id="rphone" name="rphone" value="<?php echo htmlspecialchars($row['rphone']); ?>" class="form-control" required>
                                </div>
                            </div>

                            <div class="row">
                                <div class="col-md-6 form-group mb-3">
                                    <label for="rcity" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-location-dot mr-1 text-danger"></i> City
                                    </label>
                                    <input type="text" id="rcity" name="rcity" value="<?php echo htmlspecialchars($row['rcity']); ?>" class="form-control" required>
                                </div>
                                <div class="col-md-6 form-group mb-3">
                                    <label for="bg" class="small text-muted font-weight-bold">
                                        <i class="fa-solid fa-droplet mr-1 text-danger"></i> Blood Group
                                    </label>
                                    <select id="bg" class="form-control" name="bg" required>
                                        <?php 
                                        $groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
                                        foreach($groups as $g) {
                                            $selected = ($row['rbg'] == $g) ? 'selected' : '';
                                            echo "<option value='$g' $selected>$g</option>";
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>

                            <div class="form-group mb-4">
                                <label for="rpassword" class="small text-muted font-weight-bold">
                                    <i class="fa-solid fa-key mr-1 text-danger"></i> Password
                                </label>
                                <input type="password" id="rpassword" name="rpassword" value="<?php echo htmlspecialchars($row['rpassword']); ?>" class="form-control" required>
                            </div>

                            <div class="d-flex flex-wrap gap-2 pt-2">
                                <button type="submit" name="update" class="btn btn-primary px-4 py-2 font-weight-bold mr-2 shadow-sm">
                                    <i class="fa-solid fa-floppy-disk mr-1"></i> Save Changes
                                </button>
                                <a href="Userpage.html" class="btn btn-outline-secondary px-4 py-2 font-weight-bold">
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
