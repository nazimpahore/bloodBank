<?php 
require 'file/connection.php'; 
session_start();
if(!isset($_SESSION['hid'])) {
    header('location:login.php');
    exit();
} else {
    $hid = $_SESSION['hid'];
    $sql = "SELECT bloodrequest.*, receivers.* FROM bloodrequest, receivers WHERE hid='$hid' AND bloodrequest.rid=receivers.id";
    $result = mysqli_query($conn, $sql);
    $title = "LifeDrop | Incoming Blood Requests";
    require 'head.php';
?>
<body>
    <?php require 'header.php'; ?>

    <!-- Page Header -->
    <div class="bg-white border-bottom py-4 mb-4">
        <div class="container d-flex flex-wrap align-items-center justify-content-between">
            <div>
                <h3 class="font-weight-bold text-dark mb-1">
                    <i class="fa-solid fa-inbox text-danger mr-2"></i> Incoming Blood Requests
                </h3>
                <p class="text-muted small mb-0">Review urgent blood requests submitted by patients/receivers for your hospital stock</p>
            </div>
            <a href="hospitalpage.html" class="btn btn-outline-secondary btn-sm rounded-pill mt-2 mt-sm-0">
                <i class="fa-solid fa-arrow-left mr-1"></i> Dashboard
            </a>
        </div>
    </div>

    <div class="container cont pt-2">
        <?php require 'message.php'; ?>

        <div class="card table-card shadow-sm border-0">
            <div class="card-header bg-white border-bottom py-3 d-flex justify-content-between align-items-center">
                <h5 class="font-weight-bold text-dark mb-0">
                    <i class="fa-solid fa-clipboard-check text-danger mr-2"></i> Patient Requests
                </h5>
                <?php 
                $count = $result ? mysqli_num_rows($result) : 0;
                ?>
                <span class="badge badge-light border text-muted px-2 py-1"><?php echo $count; ?> total requests</span>
            </div>

            <div class="card-body p-0">
                <?php if ($count > 0) { ?>
                    <div class="table-responsive">
                        <table class="table modern-table table-hover mb-0">
                            <thead>
                                <tr>
                                    <th style="width: 60px;">#</th>
                                    <th>Patient Name</th>
                                    <th>Blood Group</th>
                                    <th>City</th>
                                    <th>Email</th>
                                    <th>Phone</th>
                                    <th>Status</th>
                                    <th class="text-right">Actions</th>
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
                                        <i class="fa-solid fa-user text-danger mr-1 small"></i> <?php echo htmlspecialchars($row['rname']); ?>
                                    </td>
                                    <td>
                                        <span class="badge-blood-type">
                                            <i class="fa-solid fa-droplet"></i> <?php echo htmlspecialchars($row['bg']); ?>
                                        </span>
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
                                        <a href="tel:<?php echo htmlspecialchars($row['rphone']); ?>" class="contact-pill contact-pill-phone" title="Call patient">
                                            <i class="fa-solid fa-phone"></i>
                                            <span><?php echo htmlspecialchars($row['rphone']); ?></span>
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
                                        <div class="d-inline-flex gap-2">
                                            <?php if($status == 'Accepted') { ?>
                                                <span class="btn btn-sm btn-success disabled rounded-pill px-3 mr-1" style="white-space: nowrap;">
                                                    <i class="fa-solid fa-check mr-1"></i> Accepted
                                                </span>
                                            <?php } else { ?>
                                                <a href="file/accept.php?reqid=<?php echo $row['reqid'];?>" class="btn btn-sm btn-success rounded-pill px-3 mr-1 shadow-sm" style="white-space: nowrap;">
                                                    <i class="fa-solid fa-check mr-1"></i> Accept
                                                </a>
                                            <?php } ?>

                                            <?php if($status == 'Rejected') { ?>
                                                <span class="btn btn-sm btn-danger disabled rounded-pill px-3" style="white-space: nowrap;">
                                                    <i class="fa-solid fa-xmark mr-1"></i> Rejected
                                                </span>
                                            <?php } else { ?>
                                                <a href="file/reject.php?reqid=<?php echo $row['reqid'];?>" class="btn btn-sm btn-outline-danger rounded-pill px-3" style="white-space: nowrap;">
                                                    <i class="fa-solid fa-xmark mr-1"></i> Reject
                                                </a>
                                            <?php } ?>
                                        </div>
                                    </td>
                                </tr>
                                <?php } ?>
                            </tbody>
                        </table>
                    </div>
                <?php } else { ?>
                    <div class="text-center py-5">
                        <div class="brand-icon-wrapper mx-auto mb-3" style="width: 60px; height: 60px; font-size: 1.8rem; background: #fee2e2;">
                            <i class="fa-solid fa-envelope-open text-danger"></i>
                        </div>
                        <h6 class="font-weight-bold text-dark">No Blood Requests Yet</h6>
                        <p class="text-muted small mb-0">No patient has submitted blood requests to your hospital stock at this time.</p>
                    </div>
                <?php } ?>
            </div>
        </div>

    </div>

    <?php require 'footer.php'; ?>
</body>
</html>
<?php } ?>
