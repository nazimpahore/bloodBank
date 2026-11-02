<?php if(isset($_GET['msg']) || isset($_GET['error'])) { ?>
<div class="row justify-content-center mb-4">
    <div class="col-lg-8 col-md-10 col-12">
        <?php if(isset($_GET['msg'])) { ?>
            <div class="alert alert-success alert-dismissible fade show modern-alert shadow-sm d-flex align-items-center" role="alert" id="systemMessage">
                <i class="fa-solid fa-circle-check fa-lg text-success mr-3"></i>
                <div class="flex-grow-1">
                    <?php echo htmlspecialchars($_GET['msg']); ?>
                </div>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        <?php } ?>
        <?php if(isset($_GET['error'])) { ?>
            <div class="alert alert-danger alert-dismissible fade show modern-alert shadow-sm d-flex align-items-center" role="alert" id="systemMessage">
                <i class="fa-solid fa-triangle-exclamation fa-lg text-danger mr-3"></i>
                <div class="flex-grow-1">
                    <?php echo htmlspecialchars($_GET['error']); ?>
                </div>
                <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
        <?php } ?>
    </div>
</div>
<script>
$(document).ready(function(){
    setTimeout(function() {
        $('#systemMessage').fadeOut('slow');
    }, 6000);
});
</script>
<?php } ?>
