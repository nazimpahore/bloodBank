<?php 
session_start();
require 'file/connection.php';
$searchKey = isset($_GET['search']) ? $_GET['search'] : '';

if(!empty($searchKey)){
    $sql = "SELECT bloodinfo.*, hospitals.* FROM bloodinfo, hospitals WHERE bloodinfo.hid=hospitals.id AND bg='$searchKey'";
} else {
    $sql = "SELECT bloodinfo.*, hospitals.* FROM bloodinfo, hospitals WHERE bloodinfo.hid=hospitals.id";
}
$result = mysqli_query($conn, $sql);
$title = "LifeDrop | Available Blood Samples";
require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-magnifying-glass text-danger mr-2"></i> Find Available Blood
                </h3>
                <p class="text-muted small mb-0">Browse real-time blood stock registered by partner hospitals across cities</p>
            </div>
            <?php if(isset($_SESSION['rid'])) { ?>
                <a href="Userpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
                    <i class="fa-solid fa-arrow-left mr-1"></i> Dashboard
                </a>
            <?php } ?>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <!-- Search / Filter Card -->
        <div class="card shadow-sm border-0 mb-4 p-4">
            <form method="get" action="abs.php" class="p-0">
                <div class="row align-items-end">
                    <div class="col-md-5 mb-3 mb-md-0">
                        <label for="searchBg" class="small text-muted font-weight-bold">
                            <i class="fa-solid fa-filter mr-1 text-danger"></i> Filter by Blood Group:
                        </label>
                        <select id="searchBg" name="search" class="form-control">
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
                        <a href="abs.php" class="btn btn-outline-secondary px-3">
                            <i class="fa-solid fa-rotate-left mr-1"></i> Reset Filter
                        </a>
                    </div>
                </div>
            </form>
        </div>

        <!-- Available Blood Table Card -->
        <div class="card table-card shadow-sm border-0">
            <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                <h5 class="font-weight-bold text-dark mb-0">
                    <i class="fa-solid fa-hospital text-danger mr-2"></i> Verified Hospital Stock
                </h5>
                <?php 
                $count = $result ? mysqli_num_rows($result) : 0;
                ?>
                <span class="badge badge-light border text-muted px-2 py-1"><?php echo $count; ?> units available</span>
            </div>

            <div class="card-body p-0">
                <?php if ($count > 0) { ?>
                    <div class="table-responsive">
                        <table class="table modern-table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th style="width: 60px;">#</th>
                                    <th>Blood Group</th>
                                    <th>Hospital Name</th>
                                    <th>City</th>
                                    <th>Contact Email</th>
                                    <th>Phone</th>
                                    <th class="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php 
                                $counter = 0;
                                while($row = mysqli_fetch_array($result)) { 
                                    $bid = $row['bid'];
                                    $hid = $row['hid'];
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
                                        <i class="fa-solid fa-hospital text-danger mr-1 small"></i> <?php echo htmlspecialchars($row['hname']); ?>
                                    </td>
                                    <td>
                                        <span class="city-badge">
                                            <i class="fa-solid fa-location-dot"></i> <?php echo htmlspecialchars($row['hcity']); ?>
                                        </span>
                                    </td>
                                    <td>
                                        <a href="mailto:<?php echo htmlspecialchars($row['hemail']); ?>" class="contact-pill contact-pill-email" title="Send email">
                                            <i class="fa-solid fa-envelope"></i>
                                            <span><?php echo htmlspecialchars($row['hemail']); ?></span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="tel:<?php echo htmlspecialchars($row['hphone']); ?>" class="contact-pill contact-pill-phone" title="Call hospital">
                                            <i class="fa-solid fa-phone"></i>
                                            <span><?php echo htmlspecialchars($row['hphone']); ?></span>
                                        </a>
                                    </td>
                                    <td class="text-right">
                                        <form action="file/request.php" method="post" class="p-0 m-0 d-inline">
                                            <input type="hidden" name="bid" value="<?php echo $bid; ?>">
                                            <input type="hidden" name="hid" value="<?php echo $hid; ?>">
                                            <input type="hidden" name="bg" value="<?php echo $bg; ?>">

                                            <?php if (isset($_SESSION['hid'])) { ?>
                                                <button type="button" class="btn btn-outline-secondary btn-sm rounded-pill hospital-blocked" style="white-space: nowrap;">
                                                    <i class="fa-solid fa-ban mr-1"></i> Hospital Account
                                                </button>
                                            <?php } elseif (isset($_SESSION['rid'])) { ?>
                                                <button type="submit" name="request" class="btn-request-blood">
                                                    <i class="fa-solid fa-hand-holding-droplet"></i> Request Blood
                                                </button>
                                            <?php } else { ?>
                                                <a href="login.php" class="btn btn-outline-danger btn-sm rounded-pill px-3" style="white-space: nowrap;">
                                                    Login to Request
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
                            <i class="fa-solid fa-circle-exclamation text-danger"></i>
                        </div>
                        <h6 class="font-weight-bold text-dark">No Blood Units Found</h6>
                        <p class="text-muted small mb-0">
                            <?php if(!empty($searchKey)) { ?>
                                No hospital currently has blood type <strong><?php echo htmlspecialchars($searchKey); ?></strong> listed. Try resetting your filter.
                            <?php } else { ?>
                                No hospitals have registered blood units in the system at this time.
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
        $('.hospital-blocked').on('click', function(e){
            e.preventDefault();
            alert("Hospital accounts cannot request blood samples. Please log in as an individual user/patient.");
        });
    });
    </script>
</body>
</html>
