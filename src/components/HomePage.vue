<script setup>
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import Logo from '@/components/Logo.vue'

const { t } = useI18n()
const router = useRouter()

const images = [
  'https://www.eventim-light.com/de/api/image/66436c38ac2ac1627518697a/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/5fb790f208559a0a31c427bb/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/64fee7e9dbc2604784cbab20/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/67ea4b490bf96c16ec22d6f0/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/67dd5c676c100a12f992aa4c/shop_cover_v3/webp'
]

const goEvents = () => router.push({ name: 'events' })
</script>

<template>
    <div class="mood-background mt-4">
    
  
   
    

    <div class="content-box">
      
    
      <div class="image-bars">
        <div v-for="(img, idx) in images" :key="idx" class="bar">
          <div
            class="bar-inner"
            :style="{ backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.6), rgba(255,255,255,0.06)), url(${img})` }"
          ></div>
        </div>
      </div>

  <Logo class="logo-animated w-10 h-10 md:w-16 md:h-10 lg:w-12 lg:h-12" />
    
      
      
      <h1 class="main-title text-5xl font-extrabold tracking-tight text-white mb-1">
          EventMood
      </h1>
      <p class="subtitle text-base tracking-widest text-white/80 uppercase mb-16" style="letter-spacing: 0.5rem;">
          Tickets
      </p>

     <div class="description-box"> 
        <p class="text-xl font-normal text-white/90">
          {{ t('home.title') }}
        </p>
        <p class="text-xl font-normal text-white/90">
          {{ t('home.subtitle') }}
        </p>
      </div>
     

     
      <button
        @click="goEvents"
        class="btn btn--primary modern-btn mt-5"
        type="button"
        aria-label="Events entdecken"
      >
        {{ t('nav.events') }} →
      </button>

    </div>
  </div>

</template>

<style scoped>

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    background-position: -1000px 0;
  }
  100% {
    background-position: 1000px 0;
  }
}

.mood-background {
  
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0;
  overflow: hidden;
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  pointer-events: none;
 
    
  background: linear-gradient(
    135deg, 
   #191B46 0%, 
   #2a1f4d 50%,
  #894A4D 100% 
  );

  box-shadow: 
    inset 100px 100px 400px 100px rgba(255, 165, 0, 0.4), 
    inset -100px -100px 500px 150px rgba(0, 191, 255, 0.3), 
    inset 0 0 100px 50px rgba(0, 0, 0, 0.5); 
  
  animation: fadeInUp 0.8s ease-out;
}

.content-box {
  
    width: 100%;
    max-width: 1000px; 
    padding: 2rem;
    text-align: center;
    pointer-events: auto;
    animation: fadeInUp 1s ease-out 0.2s backwards;
}


.image-bars {
    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 340px;
    margin-bottom: 2rem;
    margin-top: 4rem;
    gap: 8px;
}

.bar {
    width: 12%;
    background: linear-gradient(
      to top,
      oklch(40.5% 0.101 131.063),
      oklch(45% 0.12 131.063)
    ); 
    margin: 0;
    border-radius: 8px 8px 0 0;
    position: relative;
    overflow: hidden;
    box-shadow: 
      0 8px 32px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.1) inset;
    transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
    animation: fadeInUp 0.6s ease-out backwards;
}

.bar:nth-child(1) { animation-delay: 0.1s; }
.bar:nth-child(2) { animation-delay: 0.2s; }
.bar:nth-child(3) { animation-delay: 0.3s; }
.bar:nth-child(4) { animation-delay: 0.4s; }
.bar:nth-child(5) { animation-delay: 0.5s; }

.bar:hover {
  transform: translateY(-10px) scale(1.05);
  box-shadow: 
    0 16px 48px rgba(0, 0, 0, 0.6),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.bar-inner {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: cover;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(255, 255, 255, 0.1));
  background-blend-mode: overlay;
  transition: transform 0.4s ease;
}

.bar:hover .bar-inner {
  transform: scale(1.1);
}

.bar:nth-child(1) { height: 60%;  }
.bar:nth-child(2) { height: 75%; }
.bar:nth-child(3) { height: 80%; }
.bar:nth-child(4) { height: 90%;  }
.bar:nth-child(5) { height: 100%;  }

.logo-animated {
  animation: fadeInUp 1s ease-out 0.6s backwards;
  transition: transform 0.3s ease;
}

.logo-animated:hover {
  transform: rotate(5deg) scale(1.1);
}

.main-title {
  animation: fadeInUp 1s ease-out 0.7s backwards;
  background: linear-gradient(
    135deg,
    #ffffff 0%,
    #a8daff 50%,
    #ffffff 100%
  );
  background-size: 200% auto;
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: shimmer 3s linear infinite, fadeInUp 1s ease-out 0.7s backwards;
  text-shadow: 0 4px 20px rgba(255, 255, 255, 0.3);
}

.subtitle {
  animation: fadeInUp 1s ease-out 0.8s backwards;
}

.description-box {
  animation: fadeInUp 1s ease-out 0.9s backwards;
  backdrop-filter: blur(10px);
  background: rgba(255, 255, 255, 0.05);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 2rem auto;
  max-width: 600px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 
    0 8px 32px rgba(0, 0, 0, 0.3),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
}

.modern-btn {
  animation: fadeInUp 1s ease-out 1s backwards;
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  padding: 1rem 2.5rem;
  font-weight: 600;
  font-size: 1.1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 
    0 8px 24px rgba(0, 0, 0, 0.4),
    0 0 0 1px rgba(255, 255, 255, 0.1) inset;
}

.modern-btn::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.2),
    transparent
  );
  transition: left 0.5s;
}

.modern-btn:hover {
  transform: translateY(-2px);
  box-shadow: 
    0 12px 32px rgba(0, 0, 0, 0.5),
    0 0 0 1px rgba(255, 255, 255, 0.2) inset;
}

.modern-btn:hover::before {
  left: 100%;
}

.modern-btn:active {
  transform: translateY(0);
}






</style>