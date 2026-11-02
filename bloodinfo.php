<?php 
require 'file/connection.php';
session_start();
if(!isset($_SESSION['hid'])) {
    header('location:login.php');
    exit();
} else {
    $title = "LifeDrop | Hospital Blood Stock Management";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-boxes-stacked text-danger mr-2"></i> Hospital Blood Stock
                </h3>
                <p class="text-muted small mb-0">Add available blood groups to your inventory or remove depleted samples</p>
            </div>
            <a href="hospitalpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
                <i class="fa-solid fa-arrow-left mr-1"></i> Dashboard
            </a>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <div class="row">
            <!-- Add Blood Form -->
            <div class="col-lg-5 mb-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-bottom py-3">
                        <h5 class="font-weight-bold text-dark mb-0">
                            <i class="fa-solid fa-plus-circle text-danger mr-2"></i> Add Blood Group to Stock
                        </h5>
                    </div>
                    <div class="card-body p-4">
                        <form action="file/infoAdd.php" method="post">
                            <div class="form-group mb-3">
                                <label for="bgSelect" class="small text-muted font-weight-bold">
                                    Select Blood Group
                                </label>
                                <select id="bgSelect" class="form-control" name="bg" required>
                                    <option value="" disabled selected>-- Choose Blood Group --</option>
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
                                        <i class="fa-solid fa-shield-halved text-primary mr-1"></i> Quality & Storage Terms
                                    </span>
                                    <a data-toggle="collapse" href="#termsCollapse" role="button" class="small text-danger font-weight-bold">
                                        Read Terms <i class="fa-solid fa-chevron-down small"></i>
                                    </a>
                                </div>
                                <div class="collapse mt-2" id="termsCollapse">
                                    <div class="small text-muted border-top pt-2">
                                        Blood samples must be certified, tested by a trained phlebotomist/pathologist, stored in verified refrigeration with correct preservatives, and compliant with all statutory blood bank regulations.
                                    </div>
                                </div>
                            </div>

                            <div class="custom-control custom-checkbox mb-4">
                                <input type="checkbox" class="custom-control-input" id="agreeCheck" name="condition" value="agree" required>
                                <label class="custom-control-label small text-muted font-weight-bold" for="agreeCheck">
                                    I certify that the blood units meet testing & safety criteria
                                </label>
                            </div>

                            <button type="submit" name="add" class="btn btn-primary btn-block py-2 font-weight-bold shadow-sm">
                                <i class="fa-solid fa-plus mr-1"></i> Add to Blood Stock
                            </button>
                        </form>
                    </div>
                </div>
            </div>

            <!-- Current Stock Table -->
            <div class="col-lg-7 mb-4">
                <div class="card shadow-sm border-0 h-100">
                    <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                        <h5 class="font-weight-bold text-dark mb-0">
                            <i class="fa-solid fa-layer-group text-danger mr-2"></i> Current Available Stock
                        </h5>
                        <span class="badge badge-light border text-muted px-2 py-1">Hospital Inventory</span>
                    </div>

                    <?php
                    $counter = 0;
                    $hid = $_SESSION['hid'];
                    $sql = "SELECT * FROM bloodinfo WHERE hid='$hid'";
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
                                            <th>Blood Group</th>
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
                                                <a href="file/delete.php?bid=<?php echo $row['bid'];?>" class="btn btn-outline-danger btn-sm rounded-pill px-3" onclick="return confirm('Are you sure you want to remove this sample from stock?');">
                                                    <i class="fa-solid fa-trash mr-1"></i> Delete
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
                                    <i class="fa-solid fa-droplet-slash text-danger"></i>
                                </div>
                                <h6 class="font-weight-bold text-dark">No Blood Samples in Stock</h6>
                                <p class="text-muted small mb-3">Your hospital currently has no active blood units registered in the system.</p>
                                <span class="small text-muted">Use the form on the left to add your first stock unit.</span>
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
