const e=document.querySelector("button[data-start]"),t=document.querySelector("button[data-stop]"),d=document.querySelector("body");let l=null;t.disabled=!0,e.addEventListener("click",(()=>{l=setInterval((()=>{let e=`#${Math.floor(16777215*Math.random()).toString(16)}`;d.style.backgroundColor=e}),1e3),e.disabled=!0,t.disabled=!1})),t.addEventListener("click",(()=>{clearInterval(l),e.disabled=!1,t.disabled=!0}));
//# sourceMappingURL=01-color-switcher.1d140361.js.map