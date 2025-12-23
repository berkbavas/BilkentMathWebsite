<!DOCTYPE html>
<html lang="tr" data-theme="light">
<?php $pageTitle = '<title>Seminars</title>'; ?>
<?php include 'head.php'; ?>

<link rel="stylesheet" href="assets/css/seminars.css?v=<?php echo filemtime('assets/css/seminars.css'); ?>">
<script type="module" src="assets/js/seminars.js?v=<?php echo filemtime('assets/js/seminars.js'); ?>" defer></script>

<body>
    <?php include 'navigation.php'; ?>

    <main class="container">
        <!-- Header -->
        <section class="page-hero">
            <div class="page-hero-top">
                <div>
                    <h1>2025–26 Academic Year Seminars</h1>
                    <p class="lead">
                        You can search by speaker, title, date, or place.
                    </p>
                </div>

                <!--<a class="btn btn-primary" href="#" id="btnDownloadIcs" aria-label="Add seminars to calendar">
                    Add to Calendar
                </a>-->
            </div>


            <div class="filters">
                <div class="searchbox">
                    <span class="icon" aria-hidden="true"><i class="fa-solid fa-magnifying-glass"></i></span>
                    <input id="search" type="search" placeholder="Search" autocomplete="off">
                </div>
                <button class="btn btn-ghost" id="reset" type="button">Reset</button>
            </div>

            <div class="meta">
                <span id="count">0 seminars</span>
            </div>

        </section>

        <!-- Table -->
        <section>

            <div class="table-card">
                <div class="table-wrap" role="region" aria-label="Seminar list" tabindex="0">
                    <table class="seminar-table" aria-describedby="count">
                        <thead>
                            <tr>
                                <th data-col="speaker">Speaker</th>
                                <th data-col="title">Title</th>
                                <th data-col="date">Date</th>
                                <th data-col="time">Time</th>
                                <th data-col="place">Place</th>
                            </tr>
                        </thead>
                        <tbody id="tbody">
                            <!-- JS will fill this -->
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Mobile cards (JS will render the same data here too) -->
            <div class="cards" id="cards" aria-label="Seminar cards"></div>

        </section>
    </main>

    <?php include 'footer.php'; ?>
</body>

</html>