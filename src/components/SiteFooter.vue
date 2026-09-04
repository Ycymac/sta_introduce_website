<template>
  <footer class="site-footer" aria-label="网站页脚">
    <div class="site-footer__brand">
      <p class="site-footer__name">软件科技协会</p>
      <p class="site-footer__english">SOFTWARE AND TECHNOLOGY ASSOCIATION</p>
    </div>
    <div class="site-footer__meta">
      <span>EST. 2010.04</span>
      <span aria-hidden="true">·</span>
      <span>STA DIGITAL ARCHIVE</span>
    </div>
    <div class="site-footer__notes">
      <p class="site-footer__note">内容以公开资料为准 · © {{ currentYear }} STA</p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'SiteFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>
