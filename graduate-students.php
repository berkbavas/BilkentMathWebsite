<!DOCTYPE html>
<html lang="en">
<?php $pageTitle = '<title data-i18n-title="pageGradStudentsTitle">Graduate Students</title>'; ?>
<?php include 'head.php'; ?>
<script src="assets/js/graduate-students.js?v=<?= filemtime('assets/js/graduate-students.js') ?>" defer></script>

<body>
    <?php include 'navigation.php'; ?>

    <main id="content" class="container">
        <h1>Graduate Students</h1>

        <section class="wrap">
            <table class="gs-table gs-table-modern" id="graduate-students">
                <thead>
                    <tr>
                        <th>Photo</th>
                        <th>Name</th>
                        <th>Office</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>Supervisor</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- JS burayı dolduracak -->
                </tbody>
            </table>
        </section>

    </main>

    <?php include 'footer.php'; ?>

</body>

</html>