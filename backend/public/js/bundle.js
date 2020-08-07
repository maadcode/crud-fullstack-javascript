!function(e){var t={};function n(a){if(t[a])return t[a].exports;var r=t[a]={i:a,l:!1,exports:{}};return e[a].call(r.exports,r,r.exports,n),r.l=!0,r.exports}n.m=e,n.c=t,n.d=function(e,t,a){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:a})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var a=Object.create(null);if(n.r(a),Object.defineProperty(a,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)n.d(a,r,function(t){return e[t]}.bind(null,r));return a},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){},function(e,t,n){"use strict";n.r(t);n(0);var a=["second","minute","hour","day","week","month","year"],r=["秒","分钟","小时","天","周","个月","年"],o={},c=function(e,t){o[e]=t},s=function(e){return o[e]||o.en_US},d=[60,60,24,7,365/7/12,12];function i(e){return e instanceof Date?e:!isNaN(e)||/^\d+$/.test(e)?new Date(parseInt(e)):(e=(e||"").trim().replace(/\.\d+/,"").replace(/-/,"/").replace(/-/,"/").replace(/(\d)T(\d)/,"$1 $2").replace(/Z/," UTC").replace(/([+-]\d\d):?(\d\d)/," $1$2"),new Date(e))}function l(e,t){for(var n=e<0?1:0,a=e=Math.abs(e),r=0;e>=d[r]&&r<d.length;r++)e/=d[r];return(e=Math.floor(e))>(0===(r*=2)?9:1)&&(r+=1),t(e,r,a)[n].replace("%s",e.toString())}function u(e,t){return(+(t?i(t):new Date)-+i(e))/1e3}c("en_US",(function(e,t){if(0===t)return["just now","right now"];var n=a[Math.floor(t/2)];return e>1&&(n+="s"),[e+" "+n+" ago","in "+e+" "+n]})),c("zh_CN",(function(e,t){if(0===t)return["刚刚","片刻后"];var n=r[~~(t/2)];return[e+" "+n+"前",e+" "+n+"后"]}));const m=new class{constructor(){this.URI="http://localhost:3000/api/gallery"}async getImages(){const e=await fetch(this.URI);return await e.json()}async postImage(e){const t=await fetch(this.URI,{method:"POST",body:e}),n=await t.json();console.log(n)}async deleteImage(e){const t=await fetch(`${this.URI}/${e}`,{headers:{"Content-Type":"application/json"},method:"DELETE"}),n=await t.json();console.log(n)}};class g{async renderImages(){const e=await m.getImages(),t=document.getElementById("images-cards");t.innerHTML="",e.forEach(e=>{const n=document.createElement("div");var a,r,o;n.className="",n.innerHTML=`\n                <div class="card m-2">\n                    <div class="row">\n                        <div class="col-md-4">\n                            <img src="http://localhost:3000/${e.imagePath}" alt="" class="img-fluid">\n                        </div>\n                        <div class="col-md-8">\n                            <div class="card-block px-2">\n                                <h4 class="title">${e.title}</h4>\n                                <p class="card-text">${e.category}</p>\n                                <a class="btn btn-danger delete" href="" _id="${e._id}">X</a>\n                            </div>\n                        </div>\n                    </div>\n                    <div class="card-footer>\n                        ${a=e.create_at,l(u(a,o&&o.relativeDate),s(r))}\n                    </div>\n                </div>\n            `,t.appendChild(n)})}async addNewImage(e){await m.postImage(e),this.clearImageForm(),this.renderImages()}clearImageForm(){document.getElementById("imageForm").reset()}renderMessage(e,t,n){const a=document.createElement("div");a.className=`alert alert-${t} message`,a.appendChild(document.createTextNode(e));const r=document.querySelector(".col-md-4"),o=document.getElementById("imageForm");r.insertBefore(a,o),setTimeout(()=>{document.querySelector(".message").remove()},n)}async deleteImage(e){await m.deleteImage(e),this.renderImages()}}document.addEventListener("DOMContentLoaded",()=>{(new g).renderImages()});document.getElementById("imageForm").addEventListener("submit",e=>{e.preventDefault();const t=document.getElementById("title").value,n=document.getElementById("category").value,a=document.getElementById("image").files,r=new FormData;r.append("title",t),r.append("category",n),r.append("image",a[0]);const o=new g;o.addNewImage(r),o.renderMessage("New book add","success",3e3)});document.getElementById("images-cards").addEventListener("click",e=>{if(e.preventDefault(),e.target.classList.contains("delete")){const t=new g;t.deleteImage(e.target.getAttribute("_id")),t.renderMessage("Book deleted","danger",3e3)}})}]);