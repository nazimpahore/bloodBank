<?php 
require 'file/connection.php'; 
session_start();
if(!isset($_SESSION['rid'])) {
    header('location:login.php');
    exit();
} else {
    $rid = $_SESSION['rid'];
    $sql = "SELECT bloodrequest.*, hospitals.* FROM bloodrequest, hospitals WHERE rid='$rid' AND bloodrequest.hid=hospitals.id";
    $result = mysqli_query($conn, $sql);
    $title = "LifeDrop | My Submitted Blood Requests";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-clipboard-list text-danger mr-2"></i> My Blood Requests
                </h3>
                <p class="text-muted small mb-0">Monitor the live status of blood requests you have submitted to partner hospitals</p>
            </div>
            <a href="Userpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
                <i class="fa-solid fa-arrow-left mr-1"></i> Dashboard
            </a>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <div class="card table-card shadow-sm border-0">
            <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                <h5 class="font-weight-bold text-dark mb-0">
                    <i class="fa-solid fa-clock-rotate-left text-danger mr-2"></i> Request Tracking History
                </h5>
                <?php 
                $count = $result ? mysqli_num_rows($result) : 0;
                ?>
                <span class="badge badge-pill badge-light border text-muted px-3 py-1 font-weight-bold">
                    <?php echo $count; ?> <?php echo ($count == 1) ? 'Request Placed' : 'Requests Placed'; ?>
                </span>
            </div>

            <div class="card-body p-0">
                <?php if ($count > 0) { ?>
                    <div class="table-responsive">
                        <table class="table modern-table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th style="width: 60px;">#</th>
                                    <th>Hospital Name</th>
                                    <th>Blood Group</th>
                                    <th>City</th>
                                    <th>Hospital Phone</th>
                                    <th>Hospital Email</th>
                                    <th>Current Status</th>
                                    <th class="text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php 
                                $counter = 0;
                                while($row = mysqli_fetch_array($result)) { 
                                    $status = $row['status'];
                                ?>
                                <tr>
                                    <td class="font-weight-bold text-muted"><?php echo ++$counter; ?></td>
                                    <td class="font-weight-bold text-dark" style="white-space: nowrap;">
                                        <i class="fa-solid fa-hospital text-danger mr-1 small"></i> <?php echo htmlspecialchars($row['hname']); ?>
                                    </td>
                                    <td>
                                        <span class="badge-blood-type">
                                            <i class="fa-solid fa-droplet"></i> <?php echo htmlspecialchars($row['bg']); ?>
                                        </span>
                                    </td>
                                    <td>
                                        <span class="city-badge">
                                            <i class="fa-solid fa-location-dot"></i> <?php echo htmlspecialchars($row['hcity']); ?>
                                        </span>
                                    </td>
                                    <td>
                                        <a href="tel:<?php echo htmlspecialchars($row['hphone']); ?>" class="contact-pill contact-pill-phone" title="Call hospital">
                                            <i class="fa-solid fa-phone"></i>
                                            <span><?php echo htmlspecialchars($row['hphone']); ?></span>
                                        </a>
                                    </td>
                                    <td>
                                        <a href="mailto:<?php echo htmlspecialchars($row['hemail']); ?>" class="contact-pill contact-pill-email" title="Send email">
                                            <i class="fa-solid fa-envelope"></i>
                                            <span><?php echo htmlspecialchars($row['hemail']); ?></span>
                                        </a>
                                    </td>
                                    <td>
                                        <?php if($status == 'Accepted') { ?>
                                            <span class="badge-status badge-status-accepted">
                                                <i class="fa-solid fa-circle-check"></i> Accepted
                                            </span>
                                        <?php } elseif($status == 'Rejected') { ?>
                                            <span class="badge-status badge-status-rejected">
                                                <i class="fa-solid fa-circle-xmark"></i> Rejected
                                            </span>
                                        <?php } else { ?>
                                            <span class="badge-status badge-status-pending">
                                                <i class="fa-solid fa-clock"></i> Pending Review
                                            </span>
                                        <?php } ?>
                                    </td>
                                    <td class="text-right">
                                        <?php if($status != 'Accepted') { ?>
                                            <a href="file/cancel.php?reqid=<?php echo $row['reqid'];?>" class="btn-cancel-request" onclick="return confirm('Cancel this blood request?');">
                                                <i class="fa-solid fa-ban"></i> Cancel Request
                                            </a>
                                        <?php } else { ?>
                                            <span class="badge-confirmed">
                                                <i class="fa-solid fa-circle-check"></i> Confirmed
                                            </span>
                                        <?php } ?>
                                    </td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                <?php } else { ?>
                    <div class="text-center py-5">
                        <div class="brand-icon-wrapper mx-auto mb-3" style="width: 60px; height: 60px; font-size: 1.8rem; background: #fee2e2;">
                            <i class="fa-solid fa-clipboard-question text-danger"></i>
                        </div>
                        <h6 class="font-weight-bold text-dark">No Blood Requests Placed</h6>
                        <p class="text-muted small mb-3">You haven't requested any blood units yet.</p>
                        <a href="abs.php" class="btn btn-primary btn-sm rounded-pill px-4">
                            <i class="fa-solid fa-magnifying-glass mr-1"></i> Search Available Blood
                        </a>
                    </div>
                <?php } ?>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
<?php } ?>
