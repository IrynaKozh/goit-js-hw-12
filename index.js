import{a as f,S as p,i}from"./assets/vendor-1AYLTIiv.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))a(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const n of r.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function a(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();const d="50842671-b6a5d06ede8a88fc17f0ce411",m="https://pixabay.com/api/";function h(s){const o={key:d,q:s,image_type:"photo",orientation:"horizontal",safesearch:!0};return f.get(m,{params:o}).then(e=>e.data)}const l=document.querySelector(".gallery"),u=document.querySelector(".loader"),y=new p(".gallery a");function g(s){const o=s.map(e=>`
        <li class="gallery-item">
          <a href="${e.largeImageURL}">
            <img src="${e.webformatURL}" alt="${e.tags}" />
          </a>
          <div class="info">
            <p><b>Likes:</b> ${e.likes}</p>
            <p><b>Views:</b> ${e.views}</p>
            <p><b>Comments:</b> ${e.comments}</p>
            <p><b>Downloads:</b> ${e.downloads}</p>
          </div>
        </li>`).join("");l.innerHTML=o,y.refresh()}function b(){l.innerHTML=""}function L(){u.classList.add("show")}function c(){u.classList.remove("show")}const w=document.querySelector(".form"),S=document.querySelector(".input");w.addEventListener("submit",function(s){s.preventDefault();const o=S.value.trim();if(o===""){i.warning({title:"Oops!",message:"Please enter a search term.",position:"topRight"});return}b(),L(),h(o).then(e=>{if(c(),!e.hits.length){i.info({message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"});return}g(e.hits)}).catch(e=>{c(),i.error({title:"Error",message:"Something went wrong. Please try again later.",position:"topRight"}),console.error(e)})});
//# sourceMappingURL=index.js.map
