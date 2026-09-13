<template>
  <section :id="anchorId" class="contact-section" aria-labelledby="contact-heading">
    <div class="contact-section__heading">
      <div>
        <p class="record-label">CONTACT / STA</p>
        <h2 id="contact-heading">联系我们</h2>
      </div>
      <p>如果你愿意长期投入、主动学习，欢迎找到我们。</p>
    </div>

    <div class="contact-section__grid">
      <article class="contact-plate contact-plate--location">
        <span class="contact-plate__index">01 / PLACE</span>
        <h3>地理位置</h3>
        <p>{{ contact.location }}</p>
        <span class="contact-plate__coordinate" aria-hidden="true">34°N · 108°E</span>
      </article>
      <article class="contact-plate">
        <span class="contact-plate__index">02 / WECHAT</span>
        <h3>微信公众号</h3>
        <img class="contact-plate__qr contact-plate__qr--invert-dark" :src="wechatImage" alt="软件科技协会微信公众号二维码" loading="lazy" />
      </article>
      <article class="contact-plate">
        <span class="contact-plate__index">03 / QQ GROUP</span>
        <h3>QQ群</h3>
        <img class="contact-plate__qr contact-plate__qr--invert-light" :src="qqImage" alt="软件科技协会 QQ 群二维码" loading="lazy" />
        <p class="contact-plate__code">群号 <strong>1090435178</strong></p>
      </article>
    </div>
  </section>
</template>

<script>
import { recruitmentContact } from '@/data/recruitment'
import wechatImage from '@/assets/weixin.jpg'
import qqImage from '@/assets/QQGroup.jpg'

export default {
  name: 'ContactSection',
  props: {
    anchorId: { type: String, default: 'contact' }
  },
  data() {
    return { contact: recruitmentContact, wechatImage, qqImage }
  }
}
</script>
