<!DOCTYPE html>
<html lang="en">
<?php $pageTitle = '<title data-i18n-title="pageFacultyTitle">Faculty Members</title>'; ?>
<?php include 'head.php'; ?>
<link rel="stylesheet" href="assets/css/faculty.css?v=<?= filemtime('assets/css/faculty.css') ?>">
<script type="module" src="assets/js/faculty.js?v=<?= filemtime('assets/js/faculty.js') ?>" defer></script>

<body>
  <?php include 'navigation.php'; ?>

  <main class="container">

    <section class="page-hero">
      <div class="page-hero-top">
        <div>
          <h1 data-i18n="pageFacultyTitle">Faculty Members</h1>
          <p class="lead" data-i18n="pageFacultyLead">
            Information about faculty members of the Department of Mathematics.
          </p>
        </div>
      </div>
    </section>

    <section class="wrap">
      <h1>Current Faculty</h1>
      <div id="gridCurrent" class="faculty-grid" aria-label="Faculty list"></div>
    </section>

    <section class="wrap">
      <h1>Emeriti</h1>
      <div id="gridEmeriti" class="faculty-grid" aria-label="Emeriti list"></div>
    </section>

  </main>

  <?php include 'footer.php'; ?>

</body>

</html>