<!DOCTYPE html>
<html lang="en" data-theme="light">
<?php $pageTitle = '<title>Alumni Statistics</title>'; ?>
<?php include 'head.php'; ?>
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.4.1/dist/chart.umd.min.js" defer></script>
<script src="https://cdn.jsdelivr.net/npm/chartjs-plugin-datalabels@2.2.0" defer></script>
<script type="module" src="assets/js/alumni-statistics.js?v=<?php echo filemtime('assets/js/alumni-statistics.js'); ?>" defer></script>
<body>
    <?php include 'navigation.php'; ?>

    <div class="content container section">
        <h1>Alumni Statistics</h1>

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
    </div>

    <?php include 'footer.php'; ?>
</body>

</html>