<?php 
require 'file/connection.php';
session_start();
if(!isset($_SESSION['rid'])) {
    header('location:login.php');
    exit();
} else {
    $title = "LifeDrop | Register as Voluntary Blood Donor";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-hand-holding-heart text-danger mr-2"></i> Register as Voluntary Donor
                </h3>
                <p class="text-muted small mb-0">List your available blood type so nearby hospitals can contact you during emergencies</p>
            </div>
            <a href="Userpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
                <i class="fa-solid fa-arrow-left mr-1"></i> Dashboard
            </a>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <div class="row">
            <!-- Add Voluntary Donor Entry Form -->
            <div class="col-lg-5 mb-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-bottom py-3">
                        <h5 class="font-weight-bold text-dark mb-0">
                            <i class="fa-solid fa-droplet text-danger mr-2"></i> Register Blood Group
                        </h5>
                    </div>
                    <div class="card-body p-4">
                        <form action="file/infoAddd.php" method="post">
                            <div class="form-group mb-3">
                                <label for="donorBg" class="small text-muted font-weight-bold">
                                    Your Blood Group
                                </label>
                                <select id="donorBg" class="form-control" name="bg" required>
                                    <option value="" disabled selected>-- Choose Your Group --</option>
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

                            <div class="card bg-light border p-3 mb-3">
                                <div class="d-flex justify-content-between align-items-center">
                                    <span class="small font-weight-bold text-dark">
                                        <i class="fa-solid fa-circle-check text-success mr-1"></i> Donor Guidelines & Terms
                                    </span>
                                    <a data-toggle="collapse" href="#termsCollapse" role="button" class="small text-danger font-weight-bold">
                                        Read Terms <i class="fa-solid fa-chevron-down small"></i>
                                    </a>
                                </div>
                                <div class="collapse mt-2" id="termsCollapse">
                                    <div class="small text-muted border-top pt-2">
                                        Please only register blood group that you or your immediate community can genuinely donate when summoned. Ensure you have maintained a healthy diet, stayed hydrated, and avoided smoking/drinking before volunteering.
                                    </div>
                                </div>
                            </div>

                            <div class="custom-control custom-checkbox mb-4">
                                <input type="checkbox" class="custom-control-input" id="agreeDonorCheck" name="condition" value="agree" required>
                                <label class="custom-control-label small text-muted font-weight-bold" for="agreeDonorCheck">
                                    I agree to donate blood voluntarily when contacted
                                </label>
                            </div>

                            <button type="submit" name="add" class="btn btn-primary btn-block py-2 font-weight-bold shadow-sm">
                                <i class="fa-solid fa-heart mr-1"></i> Register as Donor
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Current Donated Samples by User -->
            <div class="col-lg-7 mb-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                        <h5 class="font-weight-bold text-dark mb-0">
                            <i class="fa-solid fa-list-check text-danger mr-2"></i> Your Registered Blood Offerings
                        </h5>
                        <span class="badge badge-light border text-muted px-2 py-1">Community Donor List</span>
                    </div>

                    <?php
                    $counter = 0;
                    $rid = $_SESSION['rid'];
                    $sql = "SELECT * FROM blooddinfo WHERE rid='$rid'";
                    $result = mysqli_query($conn, $sql);
                    $rowCount = $result ? mysqli_num_rows($result) : 0;
                    ?>

                    <div class="card-body p-0">
                        <?php if ($rowCount > 0) { ?>
                            <div class="table-responsive">
                                <table class="table modern-table table-hover mb-0">
                                    <thead>
                                        <tr>
                                            <th style="width: 80px;">#</th>
                                            <th>Blood Group Offered</th>
                                            <th class="text-right">Action</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <?php while($row = mysqli_fetch_array($result)) { ?>
                                        <tr>
                                            <td class="font-weight-bold text-muted"><?php echo ++$counter; ?></td>
                                            <td>
                                                <span class="badge badge-danger px-3 py-2 font-weight-bold" style="font-size: 0.95rem;">
                                                    <i class="fa-solid fa-droplet mr-1"></i> <?php echo htmlspecialchars($row['bg']); ?>
                                                </span>
                                            </td>
                                            <td class="text-right">
                                                <a href="file/deleted.php?bdid=<?php echo $row['bdid'];?>" class="btn btn-outline-danger btn-sm rounded-pill px-3" onclick="return confirm('Remove your donation offering?');">
                                                    <i class="fa-solid fa-trash mr-1"></i> Remove
                                                </a>
                                            </td>
                                        </tr>
                                        <?php } ?>
                                    </tbody>
                                </table>
                            </div>
                        <?php } else { ?>
                            <div class="text-center py-5">
                                <div class="brand-icon-wrapper mx-auto mb-3" style="width: 60px; height: 60px; font-size: 1.8rem; background: #fee2e2;">
                                    <i class="fa-solid fa-hand-holding-heart text-danger"></i>
                                </div>
                                <h6 class="font-weight-bold text-dark">No Active Donation Listings</h6>
                                <p class="text-muted small mb-3">You haven't listed your blood group for voluntary emergency donation yet.</p>
                                <span class="small text-muted">Use the form on the left to offer your blood group to patients in need.</span>
                            </div>
                        <?php } ?>
                    </div>
                </div>
            </div>

        </div>
    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
<?php } ?>
