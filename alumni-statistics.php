<!DOCTYPE html>
<html lang="en" data-theme="light">
<?php $pageTitle = '<title>Alumni Statistics</title>'; ?>
<?php include 'head.php'; ?>
<link rel="stylesheet" href="assets/css/alumni-statistics.css?v=<?= filemtime('assets/css/alumni-statistics.css') ?>">
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0" defer></script>
<script type="module" src="assets/js/alumni-statistics.js?v=<?php echo filemtime('assets/js/alumni-statistics.js'); ?>" defer></script>

<body>
    <?php include 'navigation.php'; ?>

    <main class="container">

        <section class="page-hero">
            <div class="page-hero-top">
                <div>
                    <h1 data-i18n="pageAlumniStatisticsTitle">Alumni Statistics</h1>
                    <p class="lead" data-i18n="pageAlumniStatisticsLead">
                        Information about alumni of the Department of Mathematics.
                    </p>
                </div>
            </div>
        </section>

        <div class="charts">
            <div class="card">
                <h2>After Bilkent (Bar)</h2>
                <canvas id="alumniBar"></canvas>
            </div>

            <div class="card">
                <h2>After Bilkent (Pie)</h2>
                <canvas id="alumniPie"></canvas>
            </div>
        </div>
        
    </main>

    <?php include 'footer.php'; ?>
</body>

</html>