<script setup>



import { useRouter } from 'vue-router'
import Logo from '@/components/Logo.vue'




const images = [
  'https://www.eventim-light.com/de/api/image/66436c38ac2ac1627518697a/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/5fb790f208559a0a31c427bb/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/64fee7e9dbc2604784cbab20/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/67ea4b490bf96c16ec22d6f0/shop_cover_v3/webp',
  'https://www.eventim-light.com/de/api/image/67dd5c676c100a12f992aa4c/shop_cover_v3/webp'
];
 
const router = useRouter()
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

  <Logo class="w-10 h-10 md:w-16 md:h-10 lg:w-12 lg:h-12" />
    
      
      
      <h1 class="text-5xl font-extrabold tracking-tight text-white mb-1">
          EventMood
      </h1>
      <p class="text-base tracking-widest text-white/80 uppercase mb-16" style="letter-spacing: 0.5rem;">
          Tickets
      </p>

     
      <p class="text-xl font-normal text-white/90">
          Welcome to EventMood Tickets
      </p>
      <p class="text-xl font-normal text-white/90">
          Book. Experience. Remember.
      </p>

     
      <button
        @click="goEvents"
        class="btn  btn--primary mt-5"
        type="button"
        aria-label="evententdecken "
      >
        Events entdecken →
      </button>

    </div>
  </div>

</template>

<style scoped>





.mood-background {
   font-family: 'Inter', sans-serif;
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
    to bottom right, 
   #191B46 50%, 
  #894A4D 100% 
  );

  box-shadow: 
    inset 100px 100px 400px 100px rgba(255, 165, 0, 0.4), 
    inset -100px -100px 500px 150px rgba(0, 191, 255, 0.3), 
    inset 0 0 100px 50px rgba(0, 0, 0, 0.5); 
}

.content-box {
  

    width: 100%;
    max-width: 1000px; 
    padding: 2rem;
    text-align: center;
  pointer-events: auto;
}


.image-bars {

    display: flex;
    justify-content: center;
    align-items: flex-end;
    height: 340px;
    margin-bottom: 2rem;
    margin-top: 4rem;
}

.bar {
    width: 12%;
    background-color: oklch(40.5% 0.101 131.063); 
    margin: 0 4px;
    border-radius: 4px 4px 0 0;
    position: relative;
    overflow: hidden;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
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
}


.bar:nth-child(1) { height: 60%;  }
.bar:nth-child(2) { height: 75%; }
.bar:nth-child(3) { height: 80%; }
.bar:nth-child(4) { height: 90%;  }
.bar:nth-child(5) { height: 100%;  }






</style>