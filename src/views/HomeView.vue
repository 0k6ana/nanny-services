<script setup>
</script>
<template>
  <main class="home">

    <section class="hero">
      <div class="hero__left">
        <div class="hero__content">

          <h1>
            Make Life Easier<br />
            for the Family:
          </h1>

          <p>
            Find Babysitters Online for All Occasions
          </p>

<RouterLink to="/nannies" class="get-started">
  Get started
  <span>↗</span>
</RouterLink>

        </div>
      </div>

      <div class="hero__right">

        <div class="experienced">
          <div class="experienced__icon">
            ✓
          </div>

          <div>
            <p>Experienced nannies</p>
            <strong>15,000</strong>
          </div>
        </div>

      </div>

    </section>

  </main>
</template>
<style scoped>

.home {
  min-height: 100vh;
  max-width: 100%;
  padding: 0;
}


/* =========================
   HERO
========================= */

.hero {
  position: relative;

  display: flex;
  flex-wrap: wrap;

  width: 100%;
  max-width: 1184px;
  min-height: 609px;

  margin: 0 auto;

  overflow: hidden;
  border-radius: 22px;
}

/* =========================
   HEADER
========================= */

.header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;

  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100%;
  height: 62px;

  padding: 0 68px;

  box-sizing: border-box;

  border-bottom: 1px solid rgba(255, 255, 255, 0.25);
}


/* LOGO */

.logo {
  margin-right: auto;

  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  text-decoration: none;
}


/* NAVIGATION */

.navigation {
  display: flex;
  align-items: center;

  gap: 14px;
}

.navigation a {
  color: #ffffff;

  font-size: 12px;

  text-decoration: none;
}


/* LOGIN */

.login-button {
  height: 35px;

  padding: 0 28px;

  border: 1px solid rgba(255, 255, 255, 0.6);
  border-radius: 22px;

  background: transparent;

  color: #ffffff;

  font-size: 12px;

  cursor: pointer;
}


/* REGISTRATION */

.registration-button {
  height: 35px;

  padding: 0 28px;

  border: none;
  border-radius: 22px;

  background: #ff3b3b;

  color: #ffffff;

  font-size: 12px;

  cursor: pointer;
}


/* =========================
   LEFT RED PART
========================= */

.hero__left {
  width: 50%;
  min-height: 520px;

  background: #ff3b3b;

  color: #ffffff;

  box-sizing: border-box;
}


/* =========================
   HERO CONTENT
========================= */

.hero__content {
  padding: 160px 68px 40px;
}

.hero__content h1 {
  margin: 0;

  font-size: 42px;
  line-height: 1.08;
  font-weight: 700;
}

.hero__content p {
  margin: 18px 0 0;

  font-size: 18px;
  line-height: 1.4;
}


/* GET STARTED */

.get-started {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;

  width: 120px;
  height: 40px;

  margin-top: 40px;
  padding: 0 34px;

  border: 1px solid rgba(255, 255, 255, 0.7);
  border-radius: 24px;

  background: transparent;

  color: #ffffff;

  font-size: 14px;

  cursor: pointer;
  text-decoration: none;
}

.get-started span {
  font-size: 18px;
}


/* =========================
   RIGHT PHOTO
========================= */

.hero__right {
  position: relative;

  width: 50%;
  min-height: 520px;

  background-image:
    linear-gradient(
      rgba(50, 30, 20, 0.35),
      rgba(50, 30, 20, 0.35)
    ),
    url('/hero.jpg');

  background-size: cover;
  background-position: center;

  box-sizing: border-box;
}


/* =========================
   EXPERIENCED NANNIES
========================= */

.experienced {
  position: absolute;

  right: 34px;
  bottom: 34px;

  display: flex;
  align-items: center;

  gap: 12px;

  min-width: 190px;

  padding: 18px 20px;

  border-radius: 16px;

  background: #ffffff;

  color: #191a2a;

  box-sizing: border-box;
}

.experienced__icon {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 38px;
  height: 38px;

  flex-shrink: 0;

  border-radius: 10px;

  background: #ff3b3b;

  color: #ffffff;

  font-size: 22px;
  font-weight: 600;
}

.experienced p {
  margin: 0;

  color: #888888;

  font-size: 11px;
}

.experienced strong {
  display: block;

  margin-top: 3px;

  font-size: 16px;
}


/* =========================
   TABLET
========================= */

@media (max-width: 900px) {

  .header {
    padding: 0 30px;
  }

  .navigation {
    gap: 14px;
  }

  .hero__content {
    padding: 140px 40px 40px;
  }

  .hero__content h1 {
    font-size: 34px;
  }

}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

  .home {
    padding: 15px;
  }

  .hero {
    flex-direction: column;
  }

  .header {
    padding: 0 20px;
  }

  .navigation a {
    display: none;
  }

  .hero__left,
  .hero__right {
    width: 100%;
  }

  .hero__left {
    min-height: 500px;
  }

  .hero__right {
    min-height: 350px;
  }

  .hero__content {
    padding: 130px 30px 40px;
  }

  .hero__content h1 {
    font-size: 36px;
  }

  .experienced {
    right: 20px;
    bottom: 20px;
  }

}


/* =========================
   SMALL MOBILE
========================= */

@media (max-width: 480px) {

  .logo {
    font-size: 14px;
  }

  .login-button,
  .registration-button {
    padding: 0 16px;
  }

  .hero__content h1 {
    font-size: 30px;
  }

}

</style>
