<?php 
session_start();
require 'file/connection.php';
$searchKey = isset($_GET['search']) ? $_GET['search'] : '';

if(!empty($searchKey)){
    $sql = "SELECT blooddinfo.*, receivers.* FROM blooddinfo, receivers WHERE blooddinfo.rid=receivers.id AND bg='$searchKey'";
} else {
    $sql = "SELECT blooddinfo.*, receivers.* FROM blooddinfo, receivers WHERE blooddinfo.rid=receivers.id";
}
$result = mysqli_query($conn, $sql);
$title = "LifeDrop | Available Community Blood Donors";
require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-hand-holding-medical text-danger mr-2"></i> Available Voluntary Donors
                </h3>
                <p class="text-muted small mb-0">Hospitals can connect directly with registered donors who volunteered their blood samples</p>
            </div>
            <?php if(isset($_SESSION['hid'])) { ?>
                <a href="hospitalpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
                    <i class="fa-solid fa-arrow-left mr-1"></i> Dashboard
                </a>
            <?php } ?>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <!-- Search / Filter Card -->
        <div class="card shadow-sm border-0 mb-4 p-4">
            <form method="get" action="deleteit.php" class="p-0">
                <div class="row align-items-end">
                    <div class="col-md-5 mb-3 mb-md-0">
                        <label for="searchDonorBg" class="small text-muted font-weight-bold">
                            <i class="fa-solid fa-filter mr-1 text-danger"></i> Filter by Donor Blood Group:
                        </label>
                        <select id="searchDonorBg" name="search" class="form-control">
                            <option value="">All Blood Groups</option>
                            <?php 
                            $groups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
                            foreach($groups as $g) {
                                $selected = ($searchKey == $g) ? 'selected' : '';
                                echo "<option value='$g' $selected>$g</option>";
                            }
                            ?>
                        </select>
                    </div>
                    <div class="col-md-7 d-flex flex-wrap gap-2">
                        <button type="submit" name="submit" class="btn btn-primary px-4 mr-2">
                            <i class="fa-solid fa-magnifying-glass mr-1"></i> Search
                        </button>
                        <a href="deleteit.php" class="btn btn-outline-secondary px-3">
                            <i class="fa-solid fa-rotate-left mr-1"></i> Reset Filter
                        </a>
                    </div>
                </div>
            </form>
        </div>

        <!-- Donors Table Card -->
        <div class="card table-card shadow-sm border-0">
            <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                <h5 class="font-weight-bold text-dark mb-0">
                    <i class="fa-solid fa-users text-danger mr-2"></i> Registered Lifesaver Donors
                </h5>
                <?php 
                $count = $result ? mysqli_num_rows($result) : 0;
                ?>
                <span class="badge badge-light border text-muted px-2 py-1"><?php echo $count; ?> donors registered</span>
            </div>

            <div class="card-body p-0">
                <?php if ($count > 0) { ?>
                    <div class="table-responsive">
                        <table class="table modern-table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th style="width: 60px;">#</th>
                                    <th>Blood Group</th>
                                    <th>Donor Name</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th class="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php 
                                $counter = 0;
                                while($row = mysqli_fetch_array($result)) { 
                                    $bdid = $row['bdid'];
                                    $rid = $row['rid'];
                                    $bg = $row['bg'];
                                ?>
                                <tr>
                                    <td class="font-weight-bold text-muted"><?php echo ++$counter; ?></td>
                                    <td>
                                        <span class="badge-blood-type">
                                            <i class="fa-solid fa-droplet"></i> <?php echo htmlspecialchars($row['bg']); ?>
                                        </span>
                                    </td>
                                    <td class="font-weight-bold text-dark" style="white-space: nowrap;">
                                        <i class="fa-solid fa-user text-danger mr-1 small"></i> <?php echo htmlspecialchars($row['rname']); ?>
                                    </td>
                                    <td>
                                        <span class="city-badge">
                                            <i class="fa-solid fa-location-dot"></i> <?php echo htmlspecialchars($row['rcity']); ?>
                                        </span>
                                    </td>
                                    <td>
                                        <a href="mailto:<?php echo htmlspecialchars($row['remail']); ?>" class="contact-pill contact-pill-email" title="Send email">
                                            <i class="fa-solid fa-envelope"></i>
                                            <span><?php echo htmlspecialchars($row['remail']); ?></span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="tel:<?php echo htmlspecialchars($row['rphone']); ?>" class="contact-pill contact-pill-phone" title="Call donor">
                                            <i class="fa-solid fa-phone"></i>
                                            <span><?php echo htmlspecialchars($row['rphone']); ?></span>
                                        </a>
                                    </td>
                                    <td class="text-right">
                                        <form action="file/requestd.php" method="post" class="p-0 m-0 d-inline">
                                            <input type="hidden" name="bdid" value="<?php echo $bdid; ?>">
                                            <input type="hidden" name="rid" value="<?php echo $rid; ?>">
                                            <input type="hidden" name="bg" value="<?php echo $bg; ?>">

                                            <?php if (isset($_SESSION['rid'])) { ?>
                                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill receiver-blocked" style="white-space: nowrap;">
                                                    <i class="fa-solid fa-user mr-1"></i> Individual Account
                                                </button>
                                            <?php } elseif (isset($_SESSION['hid'])) { ?>
                                                <button type="submit" name="request" class="btn-request-blood">
                                                    <i class="fa-solid fa-hand-holding-droplet"></i> Request Donor
                                                </button>
                                            <?php } else { ?>
                                                <a href="login.php" class="btn btn-outline-danger btn-sm rounded-pill px-3" style="white-space: nowrap;">
                                                    Login as Hospital
                                                </a>
                                            <?php } ?>
                                        </form>
                                    </td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                <?php } else { ?>
                    <div class="text-center py-5">
                        <div class="brand-icon-wrapper mx-auto mb-3" style="width: 60px; height: 60px; font-size: 1.8rem; background: #fee2e2;">
                            <i class="fa-solid fa-user-xmark text-danger"></i>
                        </div>
                        <h6 class="font-weight-bold text-dark">No Community Donors Found</h6>
                        <p class="text-muted small mb-0">
                            <?php if(!empty($searchKey)) { ?>
                                No voluntary donor has listed blood type <strong><?php echo htmlspecialchars($searchKey); ?></strong>. Try resetting your search filter.
                            <?php } else { ?>
                                No donors have registered blood offerings in the system yet.
                            <?php } ?>
                        </p>
                    </div>
                <?php } ?>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>

    <script>
    $(document).ready(function(){
        $('.receiver-blocked').on('click', function(e){
            e.preventDefault();
            alert("Only registered hospitals can initiate donation requests to community donors.");
        });
    });
    </script>
</body>
</html>
