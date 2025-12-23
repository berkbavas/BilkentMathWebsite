<!DOCTYPE html>
<html lang="en">
<?php $pageTitle = '<title data-i18n-title="pageFacultyTitle">Faculty Members</title>'; ?>
<?php include 'head.php'; ?>
<script type="module" src="assets/js/faculty.js?v=<?= filemtime('assets/js/faculty.js') ?>" defer></script>

<body>
  <?php include 'navigation.php'; ?>

  <main id="content" class="container">
    <h1>Faculty Members</h1>
    <p class="lead">Click on a faculty member's name to view their personal web page.</p>

    <section class="wrap">
      <h1>Current Faculty</h1>
      <div id="gridCurrent" class="faculty-grid" aria-label="Faculty list"></div>
    </section>

    <br>
    <br>
    <section class="wrap">
      <h1>Emeriti</h1>
      <div id="gridEmeriti" class="faculty-grid" aria-label="Emeriti list"></div>
    </section>

  </main>

  <?php include 'footer.php'; ?>

</body>

</html>