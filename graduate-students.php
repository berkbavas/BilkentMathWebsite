<!DOCTYPE html>
<html lang="en">
<?php $pageTitle = '<title data-i18n-title="pageGradStudentsTitle">Graduate Students</title>'; ?>
<?php include 'head.php'; ?>
<link rel="stylesheet" href="assets/css/graduate-students.css?v=<?= filemtime('assets/css/graduate-students.css') ?>">
<script type="module" src="assets/js/graduate-students.js?v=<?= filemtime('assets/js/graduate-students.js') ?>" defer></script>

<body>
    <?php include 'navigation.php'; ?>

    <main class="container">

        <section class="page-hero">
            <div class="page-hero-top">
                <div>
                    <h1 data-i18n="pageGradStudentsTitle">Graduate Students</h1>
                    <p class="lead" data-i18n="pageGradStudentsLead">
                        Information about current graduate students of the Department of Mathematics.
                    </p>
                </div>
            </div>

            <div class="filters">
                <div class="searchbox">
                    <span class="icon" aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input id="q" type="search" placeholder="Search: name, supervisor..." autocomplete="off">
                </div>
                <button class="btn btn-ghost" id="reset" type="button">Reset</button>
            </div>

            <div class="meta">
                <span id="count"></span>
            </div>

        </section>

        <div id="gs-cards-container" class="section gs-cards-container"></div>

    </main>

    <?php include 'footer.php'; ?>

</body>

</html>