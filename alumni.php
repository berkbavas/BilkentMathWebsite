<!DOCTYPE html>
<html lang="en" data-theme="light">
<?php $pageTitle = '<title>Some of Our Alumni</title>'; ?>
<?php include 'head.php'; ?>

<script type="module" src="assets/js/alumni.js?v=<?php echo filemtime('assets/js/alumni.js'); ?>" defer></script>

<body>
    <?php include 'navigation.php'; ?>

    <main id="content">
        <section class="section">
            <div class="container">

                <header class="alumni-pagehead">
                    <h1>Some of Our Alumni</h1>
                    <p class="muted">Selected alumni stories and updates.</p>
                </header>

                <!-- Alumni content will be injected here -->
                <div id="alumniRoot" class="alumni-grid"></div>

            </div>
        </section>
    </main>

    <?php include 'footer.php'; ?>
</body>

</html>