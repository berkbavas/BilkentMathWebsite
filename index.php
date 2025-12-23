<!DOCTYPE html>
<html lang="en" data-theme="light">
<?php $pageTitle = '<title>Department of Mathematics</title>'; ?>
<?php include 'head.php'; ?>

<link rel="stylesheet" href="assets/css/home.css?v=<?php echo filemtime('assets/css/home.css'); ?>">

<body>
    <?php include 'navigation.php'; ?>

    <main id="content">

        <!-- HERO -->
        <section class="home-hero">
            <div class="container">
                <div class="hero-grid">
                    <div class="hero-copy">
                        <h1>Welcome to Bilkent Mathematics</h1>
                        <p class="hero-lead">
                            Undergraduate & graduate programs in pure and applied mathematics; a vibrant research culture and a strong community.
                        </p>

                        <div class="hero-cta">
                            <a class="btn btn-primary" href="programs.php">Explore Programs</a>
                            <a class="btn btn-ghost" href="people.php">Meet Our People</a>
                        </div>

                        <div class="hero-badges">
                            <a class="pill" href="seminars.php" aria-label="Seminars">Seminars</a>
                            <a class="pill" href="research.php" aria-label="Research">Research</a>
                            <a class="pill" href="publications.php" aria-label="Publications">Publications</a>
                            <a class="pill" href="alumni.php" aria-label="Alumni">Alumni</a>
                        </div>
                    </div>

                    <!-- <div class="hero-media">
                        <figure class="hero-card">

                            <img
                                src="assets/img/hero/math-building.jpg"
                                alt="Bilkent Department of Mathematics building"
                                loading="lazy">
                            <figcaption>
                                <strong>Department of Mathematics</strong>
                                <span>Ankara, Türkiye</span>
                            </figcaption>
                        </figure>

                        <div class="hero-kpis">
                            <div class="kpi">
                                <strong>3</strong>
                                <span>Degree Levels</span>
                            </div>
                            <div class="kpi">
                                <strong>Weekly</strong>
                                <span>Seminars</span>
                            </div>
                            <div class="kpi">
                                <strong>Active</strong>
                                <span>Research Groups</span>
                            </div>
                        </div>
                    </div>-->
                </div>
            </div>
        </section>

        <!-- QUICK LINKS -->
        <!-- <section class="home-section">
            <div class="container">
                <div class="section-head">
                    <h2>Quick Access</h2>
                    <p>Shortcuts for frequently used pages.</p>
                </div>

                <div class="quick-grid">
                    <a class="quick-card" href="courses.php">
                        <div class="quick-icon" aria-hidden="true">📚</div>
                        <div>
                            <h3>Courses</h3>
                            <p>Undergraduate & graduate course lists.</p>
                        </div>
                    </a>

                    <a class="quick-card" href="applications.php">
                        <div class="quick-icon" aria-hidden="true">📝</div>
                        <div>
                            <h3>Applications</h3>
                            <p>Graduate admissions & required documents.</p>
                        </div>
                    </a>

                    <a class="quick-card" href="problem-of-the-month.php">
                        <div class="quick-icon" aria-hidden="true">🧩</div>
                        <div>
                            <h3>Problem of the Month</h3>
                            <p>Monthly challenges and solutions.</p>
                        </div>
                    </a>

                    <a class="quick-card" href="news.php">
                        <div class="quick-icon" aria-hidden="true">🗞️</div>
                        <div>
                            <h3>News</h3>
                            <p>Announcements and highlights.</p>
                        </div>
                    </a>
                </div>
            </div>
        </section> -->

        <!-- NEWS + EVENTS -->
        <!-- <section class="home-section">
            <div class="container">
                <div class="two-col">

                    <div class="panel">
                        <div class="panel-head">
                            <h2>Announcements</h2>
                            <a class="panel-link" href="news.php">View all</a>
                        </div>

                        <div class="list">
                            <article class="list-item">
                                <div class="tag">News</div>
                                <h3><a href="#">Fall semester registration dates announced</a></h3>
                                <p>Important deadlines and advisor approvals are now available.</p>
                                <time datetime="2025-09-01">Sep 1, 2025</time>
                            </article>

                            <article class="list-item">
                                <div class="tag">Students</div>
                                <h3><a href="#">Teaching assistant applications</a></h3>
                                <p>TA openings for core courses — submit your application.</p>
                                <time datetime="2025-08-20">Aug 20, 2025</time>
                            </article>

                            <article class="list-item">
                                <div class="tag">Department</div>
                                <h3><a href="#">New faculty join the department</a></h3>
                                <p>Welcome our new colleagues and their research areas.</p>
                                <time datetime="2025-08-10">Aug 10, 2025</time>
                            </article>
                        </div>
                    </div>

                    <div class="panel">
                        <div class="panel-head">
                            <h2>Upcoming Seminars</h2>
                            <a class="panel-link" href="seminars.php">Calendar</a>
                        </div>

                        <div class="events">
                            <div class="event">
                                <div class="event-date">
                                    <span class="m">JAN</span>
                                    <span class="d">08</span>
                                </div>
                                <div class="event-body">
                                    <h3><a href="#">Colloquium: Geometric Analysis</a></h3>
                                    <p>Speaker Name • SA-Z01 • 14:00</p>
                                </div>
                            </div>

                            <div class="event">
                                <div class="event-date">
                                    <span class="m">JAN</span>
                                    <span class="d">15</span>
                                </div>
                                <div class="event-body">
                                    <h3><a href="#">Seminar: Number Theory</a></h3>
                                    <p>Speaker Name • Zoom • 16:00</p>
                                </div>
                            </div>

                            <div class="event">
                                <div class="event-date">
                                    <span class="m">JAN</span>
                                    <span class="d">22</span>
                                </div>
                                <div class="event-body">
                                    <h3><a href="#">Workshop: Dynamical Systems</a></h3>
                                    <p>Speaker Name • SA-201 • 13:30</p>
                                </div>
                            </div>
                        </div>

                        <div class="panel-foot">
                            <a class="btn btn-ghost" href="seminars.php">All seminars</a>
                        </div>
                    </div>

                </div>
            </div>
        </section>
        -->

        <!-- ABOUT + CONTACT STRIP -->
        <!--
        <section class="home-section">
            <div class="container">
                <div class="about-strip">
                    <div class="about">
                        <h2>About the Department</h2>
                        <p>
                            We emphasize both pure and applied mathematics. Our research spans algebra, geometry, complex analysis,
                            functional analysis, number theory, differential equations, dynamical systems, mathematical physics and more.
                        </p>
                        <div class="about-actions">
                            <a class="btn btn-primary" href="about.php">Short history</a>
                            <a class="btn btn-ghost" href="research.php">Research areas</a>
                        </div>
                    </div>

                    <aside class="contact-card">
                        <h3>Contact</h3>
                        <p class="muted">Department of Mathematics<br>Bilkent University<br>06800 Ankara, Türkiye</p>
                        <p class="muted">
                            Phone: +90 (312) 290-1586<br>
                            Fax: +90 (312) 266-4377
                        </p>
                        <a class="btn btn-ghost w100" href="contact.php">Contact page</a>
                    </aside>
                </div>
            </div>
        </section>
        -->

    </main>

    <?php include 'footer.php'; ?>
</body>

</html>