<!DOCTYPE html>
<html lang="en" data-theme="light">
<?php $pageTitle = '<title>Some of Our Alumni</title>'; ?>
<?php include 'head.php'; ?>
<link rel="stylesheet" href="assets/css/alumni.css?v=<?= filemtime('assets/css/alumni.css') ?>">

<script type="module" src="assets/js/alumni.js?v=<?php echo filemtime('assets/js/alumni.js'); ?>" defer></script>

<body>
    <?php include 'navigation.php'; ?>

    <main class="container">

        <section class="page-hero">
            <div class="page-hero-top">
                <div>
                    <h1 data-i18n="pageAlumniTitle">Some of Our Alumni</h1>
                    <p class="lead" data-i18n="pageAlumniLead">
                        Information about alumni of the Department of Mathematics.
                    </p>
                </div>
            </div>


            <div class="filters">
                <div class="searchbox">
                    <span class="icon" aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input id="search" type="search" placeholder="Search" autocomplete="off">
                </div>
                <button class="btn btn-ghost" id="reset" type="button">Reset</button>
            </div>

            <div class="meta">
                <span id="count"></span>
            </div>

        </section>

        <!-- Alumni content will be injected here -->
        <div id="alumniRoot" class="alumni-grid"></div>

    </main>

    <?php include 'footer.php'; ?>
</body>

</html>