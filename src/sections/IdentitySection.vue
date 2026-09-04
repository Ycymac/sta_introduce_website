<template>
  <section id="who-we-are" ref="target" class="archive-section identity-section" :class="{ 'is-visible': visible }">
    <div v-if="computerAnimation" class="identity-section__animation" aria-hidden="true">
      <LottieAnimation
        :animation-data="computerAnimation"
        :decorative="true"
      />
    </div>

    <div class="section-heading">
      <SectionFolio number="01" label="WHO WE ARE" />
      <p class="section-heading__aside">A STUDENT LABORATORY / EST. 2010</p>
    </div>

    <div class="identity-section__grid">
      <div class="identity-section__lead">
        <p class="year-display">{{ association.founded }}</p>
        <h2>把学习，做成<br /><span>长期的事。</span></h2>
      </div>
      <div class="identity-section__body">
        <p class="identity-section__kicker">{{ association.institution }} · {{ association.nameEn }}</p>
        <p class="identity-section__description">{{ association.description }}</p>
        <p class="identity-section__note">组织、培训与共同成长，是我们持续聚在一起的方式。</p>
      </div>
    </div>

    <div class="values-rail" aria-label="软件科技协会理念">
      <div class="values-rail__label">VALUES / 06</div>
      <div class="values-rail__viewport">
        <div class="values-rail__track">
          <template v-for="loop in 2" :key="loop">
            <span v-for="value in values" :key="`${loop}-${value.en}`" class="values-rail__item">
              <span>{{ value.en }}</span><small>{{ value.zh }}</small><b aria-hidden="true">✳</b>
            </span>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'
import LottieAnimation from '../components/LottieAnimation.vue'
import SectionFolio from '../components/SectionFolio.vue'
import { useInView } from '../composables/useInView'
import { association, values } from '../data/siteContent'

export default defineComponent({
  name: 'IdentitySection',
  components: { LottieAnimation, SectionFolio },
  setup() {
    const { target, visible } = useInView()
    const computerAnimation = ref(null)

    watch(visible, async (isVisible) => {
      if (!isVisible || computerAnimation.value) return
      const module = await import('../assets/computer-animation.json')
      computerAnimation.value = module.default || module
    })

    return { association, computerAnimation, values, target, visible }
  }
})
</script>
