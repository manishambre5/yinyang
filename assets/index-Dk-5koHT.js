(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))a(s);new MutationObserver(s=>{for(const l of s)if(l.type==="childList")for(const i of l.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&a(i)}).observe(document,{childList:!0,subtree:!0});function t(s){const l={};return s.integrity&&(l.integrity=s.integrity),s.referrerPolicy&&(l.referrerPolicy=s.referrerPolicy),s.crossOrigin==="use-credentials"?l.credentials="include":s.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function a(s){if(s.ep)return;s.ep=!0;const l=t(s);fetch(s.href,l)}})();function p(n,e,t,a){if(n[e].filter(o=>o===a).length>=3)return!1;let s=0;for(let o=0;o<6;o++)n[o][t]===a&&s++;if(s>=3)return!1;const l=o=>{for(let r=0;r<4;r++)if(o[r]&&o[r+1]&&o[r+2]&&o[r]===a&&o[r+1]===a&&o[r+2]===a)return!0;return!1},i=[...n[e]];if(i[t]=a,l(i))return!1;const c=n.map((o,r)=>r===e?a:o[t]);return!l(c)}function d(n,e){if(n.filter(t=>t===e).length>3)return!1;for(let t=0;t<4;t++)if(n[t]&&n[t+1]&&n[t+2]&&n[t]===e&&n[t+1]===e&&n[t+2]===e)return!1;return!0}const m=new Audio("complete.mp3"),h=y(),f=h.map(n=>n.map(e=>Math.random()<.3?e:""));x();function y(){const e=["sunny","bedtime"],t=Array.from({length:6},()=>Array(6).fill(null));function a(s,l=0,i=0){if(l===6)return!0;const c=i===5?l+1:l,o=i===5?0:i+1,r=[...e].sort(()=>Math.random()-.5);for(const u of r)if(p(s,l,i,u)){if(s[l][i]=u,a(s,c,o))return!0;s[l][i]=null}return!1}if(!a(t))throw new Error("Couldn't generate a valid grid");return t}function b(){return f.map((n,e)=>n.map((t,a)=>`
      <button 
        id="cell-${e}-${a}" 
        data-row="${e}" 
        data-col="${a}" 
        data-value="${t}" 
        class="cell material-symbols-outlined ${t!==""?"bg-neutral-200":""}"
        ${t!==""?"disabled":""}
      >${t}</button>
    `).join("")).join("")}function g(n){const e=n.target,t=["sunny","bedtime",""],a=t.indexOf(e.textContent);e.textContent=t[(a+1)%t.length],e.classList.remove("text-red-500"),e.dataset.value=e.textContent;const s=[...f];s[e.dataset.row][e.dataset.col]=e.dataset.value;const l=d(s.map(c=>c[e.dataset.col]),e.dataset.value),i=d(s[e.dataset.row],e.dataset.value);(e.dataset.value==="sunny"||e.dataset.value==="bedtime")&&(!l||!i?setTimeout(()=>{e.classList.add("text-red-500")},10):(e.classList.remove("text-red-500"),s.some(c=>c.some(o=>o===""))||(document.querySelectorAll(".cell").forEach(c=>{c.classList.remove("bg-neutral-200"),c.classList.add("animate-complete","cursor-default"),c.disabled=!0}),setTimeout(()=>{m.volume=.5,m.play().catch(c=>{console.warn("Audio autoplay blocked:",c)}),document.querySelector(".done").classList.remove("hidden")},1e3),setTimeout(()=>{document.querySelector(".done").classList.remove("animate-exist")},1500))))}function x(){document.querySelector("#app").innerHTML=`
    <main class="relative max-w-dvw min-h-dvh mx-2 bg-white flex flex-col items-center justify-start gap-2 font-primary">
      <header class="p-4 flex flex-col items-center">
        <h1 class="text-7xl font-triad">YinYang</h1>
        <h3 class="">Bring Balance!</h3>
      </header>
      <section class="h-full w-full flex flex-col gap-4 items-center">
        <section class="w-fit p-2 flex flex-col gap-2 items-center justify-center">
          <section class="done hidden absolute flex flex-col gap-4 items-center justify-center p-6 pb-12 shadow-2xl bg-white animate-exist z-10">
            <button id="close-btn" class="material-symbols-outlined self-end text-gray-400 hover:text-black transition-colors duration-300">close</button>
            <span class="material-symbols-outlined scale-200">sentiment_very_satisfied</span>
            <h2 class="text-5xl font-bold">Nice work!</h2>
            <p>Refresh for a new puzzle!</p>
          </section>
          <section class="board w-full grid grid-cols-6 p-1 gap-1 rounded-md bg-black text-center">
            ${b()}
          </section>
        </section>
        <section class="w-full sm:max-w-md p-2 flex flex-col gap-0 border-1 border-neutral-200 rounded-md">
          <header class="flex items-center justify-between">
            <h1 class="text-xl">How to play</h1>
            <button id="howto" class="material-symbols-outlined cursor-pointer hover:bg-neutral-200 p-1 rounded-full transition-all duration-300">
              expand_circle_down
            </button>
          </header>
          <section class="howtoplay">
            <ul class="list-disc px-4">
              <li>
                Fill the grid so that each cell contains either a <span class="material-symbols-outlined scale-80 align-bottom">sunny</span> or a <span class="material-symbols-outlined scale-80 align-bottom">bedtime</span> .
              </li>
              <li>
                No more than 2 <span class="material-symbols-outlined scale-80 align-bottom">sunny</span> or <span class="material-symbols-outlined scale-80 align-bottom">bedtime</span> may be next to each other, either vertically or horizontally.
                <ul class="list-disc px-4">
                  <li>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">check</span>
                  </li>
                  <li>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">sunny</span>
                    <span class="material-symbols-outlined scale-80 align-bottom">close</span>
                  </li>
                </ul>
              </li>
              <li>
                Each row (and column) must contain the same number of <span class="material-symbols-outlined scale-80 align-bottom">sunny</span> and <span class="material-symbols-outlined scale-80 align-bottom">bedtime</span> .
              </li>
            </ul>
          </section>
        </section>
        <section class="timer flex gap-2">
          
        </section>
      </section>
    </main>
  `,document.querySelectorAll(".cell").forEach(n=>{n.addEventListener("click",g)}),document.getElementById("close-btn").addEventListener("click",()=>{document.querySelector(".done").classList.add("animate-die"),setTimeout(()=>{document.querySelector(".done").classList.add("hidden")},300)}),document.getElementById("howto").addEventListener("click",()=>{const n=document.getElementById("howto"),e=document.querySelector(".howtoplay");e.classList.toggle("show"),e.classList.contains("show")?(e.style.maxHeight=e.scrollHeight+"px",n.textContent="expand_circle_up"):(e.style.maxHeight="0",n.textContent="expand_circle_down")})}
