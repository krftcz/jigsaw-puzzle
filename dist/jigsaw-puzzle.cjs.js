"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=e=>t=>(e(t),t),t=(e=Math.random())=>.5*(Math.cos(6669.1337*Math.sin(1337.1337*(e+69)))+1),n=e=>t=>n=>("function"==typeof t?t(n):t)?e(n):n,o=(...e)=>t=>[...e].reduce(((e,t)=>t(e)),t),i=e=>JSON.parse(JSON.stringify(e)),s=(e,t,n)=>{const o=e+1,i={top:o>n?e-n:void 0,right:o%n!=0?e+1:void 0,bottom:o<=(t-1)*n?e+n:void 0,left:o%n!=(n>1?1:0)?e-1:void 0};return JSON.parse(JSON.stringify(i))},a=["top","right","bottom","left"],r=({shape:e,size:t})=>(console.log(e,t),{shape:"out"===e?"in":"out",size:t}),c=["top","right","bottom","left"],d=(e,t)=>(console.log(e[0]),c.indexOf(e[0])>c.indexOf(t[0])?1:-1),l=(e,n)=>{const o=(t,n)=>e.find((e=>e.id===t))?.sides[{top:"bottom",right:"left",bottom:"top",left:"right"}[n]],i=[...Object.entries({...(({neighbors:e})=>Object.keys(e).reduce(((n,i)=>{const s=o(e[i],i);return{[i]:s?r(s):t()>=.5?{shape:"out",size:Math.random()}:{shape:"in",size:Math.random()},...n}}),{}))(n),...(({neighbors:e})=>a.filter((t=>!Object.keys(e).includes(t))).reduce(((e,t)=>({[t]:{shape:"flat",size:1},...e})),{}))(n)})].sort(d).reduce(((e,[t,n])=>({...e,[t]:n})),{});return[{...n,sides:i},...e]},p=e=>[...new Set(e)],h=(e,t)=>t.active?-1:1,u=e=>t=>t.reduceRight(((t,n,o,i)=>[...t,e(n,o,i,t)]),[]);function x(e){const t=[...e];let n=t.length;for(;n>0;){let e=Math.floor(Math.random()*n);n--;let o=t[n];t[n]=t[e],t[e]=o}return t}const y=e=>Math.random()*(e- -1*e)+-1*e,m=(e=!1)=>n=>({...n,pieces:e?x(n.pieces).map(((e,t)=>({...e,connections:[],pos:{x:t%n.size.x/n.size.x*2-.4+y(.03),y:Math.floor(t/n.size.x)/n.size.y*2-.4+y(.03)}}))):n.pieces.map((e=>({...e,connections:[],pos:{x:2*t()-.5,y:2*t()-.5}})))}),f=(e,{x:t,y:n,width:o,height:i})=>t>=e.pos.x&&t<=e.pos.x+o&&n>=e.pos.y&&n<=e.pos.y+i,g=(e,{x:t,y:n})=>({x:t-e.pos.x,y:n-e.pos.y}),v=e((e=>{e.pieces=e.pieces.map((e=>({...e,active:!1})))})),z=(e,t)=>n=>n[e]===t,w=e((e=>{const t=e.pieces.filter((e=>e.active)),{size:n}=e;t.length&&t.length!==e.pieces.length&&t.forEach((t=>{Object.entries(t.neighbors).forEach((([o,i])=>{const s=e.pieces.find(z("id",i));if(((e,t,n,o)=>{const{attraction:i,size:s}=n,a=i/100,r=(e=>"top"===e||"bottom"===e)(o)?"y":"x",c="x"===r?"y":"x",d=!(e=>"top"===e||"left"===e)(o),l="y"===r?1/s.y:1/s.x,p=d?t.pos[r]+l:t.pos[r]-l;return e.pos[r]<=p+a&&e.pos[r]>=p-a&&e.pos[c]<=t.pos[c]+a&&e.pos[c]>=t.pos[c]-a})(s,t,e,o)){const i={x:s.pos.x+("right"===o?-1/n.x:"left"===o?1/n.x:0),y:s.pos.y+("top"===o?1/n.y:"bottom"===o?-1/n.y:0)};((e,[...t],n)=>{t.forEach((t=>{const o=e.pieces.find(z("id",t));o.pos={x:o.pos.x+n.x,y:o.pos.y+n.y}}))})(e,t.connections,{x:i.x-t.pos.x,y:i.y-t.pos.y}),t.pos=i,((e,t,n)=>{t.connections=p([t.id,n.id,...t.connections,...n.connections]),t.connections.forEach((n=>{const o=e.pieces.find((e=>e.id===n));o.connections=p(t.connections)})),n.connections.forEach((n=>{const o=e.pieces.find((e=>e.id===n));o.connections=p(t.connections)}))})(e,t,s)}}))}))})),b=e((e=>{"active"===e.status&&(e.moves=e.moves+1),e.pieces[0].connections.length!==e.size.y*e.size.x||e.done||(e.done=!0)})),M=({x:t,y:n})=>e((e=>{const o=e.pieces.find((e=>e.active));if(o)return void(e.status="active");!e.pieces.find((o=>f(o,{x:t,y:n,width:1/e.size.x,height:1/e.size.y})))||o?e.status="idle":e.status="ready"}));(()=>{if(!function(){const e=document.createElement("canvas").getContext("2d");e.fillRect(0,0,40,40),e.drawImage(e.canvas,-40,-40,80,80,50,50,20,20);const t=e.getImageData(50,50,30,30),n=new Uint32Array(t.data.buffer),o=(e,o)=>n[o*t.width+e];return[[9,9],[20,9],[9,20],[20,20]].some((([e,t])=>0!==o(e,t)))||[[10,10],[19,10],[10,19],[19,19]].some((([e,t])=>0===o(e,t)))}())return;const e=CanvasRenderingContext2D.prototype,t=e.drawImage;function n(e,t,n,o,i,s,a,r,c){const{width:d,height:l}=function(e){const t=t=>{const n=globalThis[t];return n&&e instanceof n};if(t("HTMLImageElement"))return{width:e.naturalWidth,height:e.naturalHeight};if(t("HTMLVideoElement"))return{width:e.videoWidth,height:e.videoHeight};if(t("SVGImageElement"))throw new TypeError("SVGImageElement isn't yet supported as source image.","UnsupportedError");if(t("HTMLCanvasElement")||t("ImageBitmap"))return e}(e);o<0&&(t+=o,o=Math.abs(o)),i<0&&(n+=i,i=Math.abs(i)),r<0&&(s+=r,r=Math.abs(r)),c<0&&(a+=c,c=Math.abs(c));const p=Math.max(t,0),h=Math.min(t+o,d),u=Math.max(n,0),x=Math.min(n+i,l),y=r/o,m=c/i;return[e,p,u,h-p,x-u,t<0?s-t*y:s,n<0?a-n*m:a,(h-p)*y,(x-u)*m]}function o(e){return[3,4,7,8].some((t=>!e[t]))}t?e.drawImage=function(e,i,s){const a=9===arguments.length;if(!a)return t.apply(this,[...arguments]);const r=n(...arguments);return o(r)?void 0:t.apply(this,r)}:console.error("This script requires a basic implementation of drawImage")})();let E=1;const I={x:window.innerWidth/2,y:window.innerHeight/2},S=({x:e,y:t,bounding:n={x:1/0,y:1/0}})=>(I.x=I.x+e,I.y=I.y+t,{position:I,scale:E}),C=({focal:e,zoom:t,max:n=1e4,min:o=.05})=>{const i=E===n||E===o;E=((e,t,n)=>Math.max(t,Math.min(n,e)))(E*t,o,n);const s=i?I.x:e.x,a=i?I.y:e.y;return I.x=s-(s-I.x)*t,I.y=a-(a-I.y)*t,{position:I,scale:E}};var O=(e,{dpi:t=Math.min(2,window.devicePixelRatio),bounding:n=null,initScale:o=1}={})=>{e.style.touchAction="none",e.style.userSelect="none",e.style.webkitUserSelect="none",e.style.overscrollBehavior="contain";let i={},s=null;E=o;const a=t=>{e.dispatchEvent(new CustomEvent("pan",{detail:t,bubbles:!0,cancelable:!0,composed:!1}))};setTimeout((()=>a({scale:E,position:I})));const r=t=>{t.preventDefault(),i[t.pointerId]={x:t.offsetX,y:t.offsetY,deltaX:0,deltaY:0},e.addEventListener("pointerleave",d,{once:!0})},c=e=>{if(e.preventDefault(),!i[e.pointerId])return;i[e.pointerId]={x:e.offsetX,y:e.offsetY,deltaX:e.offsetX-i[e.pointerId].x,deltaY:e.offsetY-i[e.pointerId].y};const n=Object.values(i),{position:o}=S({x:i[e.pointerId].deltaX*t*.7,y:i[e.pointerId].deltaY*t*.7}),r=2!==Object.keys(i).length?1:Math.sqrt(Math.pow(n[1].x-n[0].x,2)+Math.pow(n[1].y-n[0].y,2)),{scale:c}=C({focal:{x:e.offsetX*t,y:e.offsetY*t},zoom:2===Object.keys(i).length&&s?1+(r-s)/200:1});s=r,a({scale:c,position:o})},d=e=>{e.preventDefault(),delete i[e.pointerId],s=null};return"ontouchstart"in window||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0?(e.addEventListener("pointerdown",r),e.addEventListener("pointermove",c),e.addEventListener("pointerup",d),e.addEventListener("pointercancel",d)):e.addEventListener("wheel",(e=>{e.preventDefault(),e.ctrlKey?a(C({focal:{x:e.offsetX*t,y:e.offsetY*t},zoom:1-e.deltaY/100})):a(S({x:-e.deltaX,y:-e.deltaY}))})),{zoom:e=>{C({focal:{x:window.innerWidth/2*t,y:window.innerHeight/2*t},zoom:e}),a({scale:E,position:I})},restore:()=>{I.x=window.innerWidth/2*Math.min(2,window.devicePixelRatio),I.y=window.innerHeight/2*Math.min(2,window.devicePixelRatio),a({scale:E,position:I})}}};const T=[...Array(20)].map(((e,t)=>Math.floor(20*(1-t/20))/20));console.log(T);const L=e=>{const{height:t,width:n}=getComputedStyle(e.parentElement),o=Math.min(2,window.devicePixelRatio);e.width=parseInt(n,0)*o,e.height=parseInt(t,0)*o},P=e((e=>{const{canvas:t,ctx:n}=e;n.save(),n.setTransform(1,0,0,1,0,0),n.clearRect(0,0,t.width,t.height),n.restore()})),Y=t=>e((e=>{P(e),t.pieces.map(X(t,e))})),X=(e,t)=>n=>{const o={x:t.size.x/e.size.x,y:t.size.y/e.size.y},{ctx:i,image:s}=t,a=t.shapes[n.id],r=Math.max(o.x,o.y);i.save(),i.translate(n.pos.x*t.size.x,n.pos.y*t.size.y);const c=!e.done&&(n.active||n.alsoActive),d=8/Math.max(t.zoom,4);i.lineWidth=c?2*d:d,i.shadowOffsetX=i.shadowOffsetY=-d/2,i.shadowBlur=d,i.shadowColor=c?"rgba(100, 100, 100, 1)":"rgba(50, 50, 50, 1)",i.stroke(a),i.clip(a),i.drawImage(s,n.origin.x*o.x-r,n.origin.y*o.y-r,o.x+r*t.dpi,o.y+r*t.dpi,n.pos.x/t.size.x-r,n.pos.y/t.size.y-r,o.x+r*t.dpi,o.y+r*t.dpi),i.restore()},k=(e,t,...n)=>{const o=t*Math.PI/180,{sin:i,cos:s}=Math;return n.map((([t,n])=>[(t-e.x)*s(o)-(n-e.y)*i(o)+e.x,(t-e.x)*i(o)+(n-e.y)*s(o)+e.y])).flat()},A=(e,t)=>{const[n]=e[0];return e.map((e=>k({x:n[0],y:n[1]},t,...e)))},R=(e,t)=>e.map((e=>e.map((e=>[e[0]+t.x,e[1]+t.y])))),N=({size:e,shapes:t,knobsize:n})=>{const o=new Path2D;if(4===!t.length)return void console.log("a piece needs to have 4 sides");return[{x:0,y:0,angle:0},{x:e.x,y:0,angle:90},{x:e.x,y:e.y,angle:180},{x:0,y:e.y,angle:270}].forEach(((i,s)=>{const a=s%2==1?e.y:e.x,r=t[s];if("flat"===r){const e=k(i,i.angle,[i.x+a,i.y]);o.lineTo(...e)}else{const e=(({knobsize:e=1,length:t=100})=>{const n=t/2;return[[[0,0],[n-20*e,4*e],[n-13*e,0]],[[n-13*e,0],[n-10*e,-2*e],[n-12*e,-5*e]],[[n-12*e,-5*e],[n-30*e,-30*e],[n,-30*e]],[[n,-30*e],[n- -30*e,-30*e],[n- -12*e,-5*e]],[[n- -12*e,-5*e],[n- -10*e,-2*e],[n- -13*e,0]],[[n- -13*e,0],[n- -20*e,4*e],[t,0]]]})({length:a,knobsize:n[s]});A(R("in"===r?(e=>e.map((e=>e.map((e=>[e[0],-1*e[1]])))))(e):e,i),i.angle).forEach((e=>o.bezierCurveTo(...e.flat())))}})),o.closePath(),o},j=(e,t,n)=>n.reduce(((n,o)=>{const i=Object.values(o.sides),s=i.map((({shape:e})=>e)),a=i.map((({size:n})=>(.6+.4*n)*Math.min(e,t)/110));return console.log(s,a),{...n,[o.id]:N({size:{x:e,y:t},shapes:s,knobsize:a})}}),{});exports.puzzle=async({element:t,image:a="",pieces:r={x:6,y:4},attraction:c=5,aligned:d=!0,zoom:p,beforeInit:x=(()=>{}),onInit:y=(()=>{}),onComplete:z=(()=>{}),onChange:S=(()=>{})})=>{const C="string"==typeof t?document.querySelector(t):t;if(!C)return void console.warn(`Couldn't find element: ${t}`);const{canvas:T,ctx:P}=(e=>{const t=e&&"CANVAS"===e.tagName?e:document.createElement("canvas"),n=t.getContext("2d");return e&&"CANVAS"!==e.tagName&&(e.appendChild(t),t.style.width="100%",t.style.height="100%",L(t)),n.strokeStyle="rgba(220, 220, 220, 1)",n.lineCap="round",n.lineJoin="round",{canvas:t,ctx:n}})(C);x(T);const{image:X,width:k,height:A}=await(R=a,new Promise((e=>{const t=new Image;t.onload=()=>{e({image:t,width:t.width,height:t.height})},t.src=R})));var R;const N={moves:0,status:"idle",done:!1,startTime:Date.now(),attraction:c,size:r,pieces:(D=r,[...Array(D.y*D.x)].map(((e,t)=>({id:t,origin:{x:t%D.x,y:Math.floor(t/D.x)},pos:{x:0,y:0},neighbors:s(t,D.y,D.x),active:!1,connections:[]}))).reduce(l,[]))};var D;const H={url:a,zoom:1,position:{x:0,y:0},size:{x:k,y:A},canvas:T,ctx:P,image:X,dpi:Math.min(2,window.devicePixelRatio),shapes:j(k/r.x,A/r.y,N.pieces)};let W={};W.puzzle=o(m(d))(N),W.ui=Y(W.puzzle)(H);const{zoom:V,restore:J}=O(T,{dpi:Math.min(2,window.devicePixelRatio),initScale:p||Math.min(window.innerWidth/W.ui.size.x*.9,window.innerHeight/W.ui.size.y*.9)}),q=()=>{W.ui=o(Y(W.puzzle),(t=>e((e=>{e.canvas.style.cursor="active"===t.status?"grabbing":"ready"===t.status?"grab":"default"})))(W.puzzle))(W.ui)};T.addEventListener("pan",(e=>{e.preventDefault();const{detail:{scale:t,position:n}}=e;W.ui.zoom=t,W.ui.position=n,W.ui.ctx.setTransform(t,0,0,t,n.x,n.y),q()})),setTimeout((()=>y(W)));const B=({x:e,y:t})=>{const[n,o]=(({x:e,y:t},n=Math.min(2,window.devicePixelRatio))=>[(e*n-I.x)/E,(t*n-I.y)/E])({x:e,y:t},W.ui.dpi);return{x:n/W.ui.size.x,y:o/W.ui.size.y}};return W.ui.canvas.addEventListener("pointerdown",(({offsetX:e,offsetY:t})=>{const i=B({x:e,y:t});W.puzzle=o((({x:e,y:t})=>i=>{return{...i,pieces:o(u(((n,o,s,a)=>{return{...n,active:!(a.find((r="active",e=>e[r]))||!f(n,{x:e,y:t,width:1/i.size.x,height:1/i.size.y}))&&g(n,{x:e,y:t})};var r})),u(((n,o,i)=>({...n,active:i.find((e=>e.active&&e.connections.includes(n.id)))?g(n,{x:e,y:t}):n.active}))),n((s=h,e=>e.sort(s)))((e=>!i.done&&e.filter((e=>e.active)).length!==i.pieces.length)))(i.pieces)};var s})(i),M(i))(W.puzzle),q()})),W.ui.canvas.addEventListener("pointermove",(({offsetX:e,offsetY:t})=>{const n=B({x:e,y:t});W.puzzle=o((({x:e,y:t})=>n=>({...n,pieces:"idle"===n.status?n.pieces:n.pieces.map((n=>({...n,pos:n.active?{x:e-n.active.x,y:t-n.active.y}:n.pos})))}))(n),M(n))(W.puzzle),q()})),W.ui.canvas.addEventListener("pointerup",(({offsetX:e,offsetY:t})=>{const n=B({x:e,y:t});W.puzzle=o(w,v,b,M(n))(W.puzzle),q(),S({ui:W.ui,puzzle:i(W.puzzle)}),W.puzzle.done&&z(W)})),window.addEventListener("resize",(()=>{const{zoom:e,position:t}=W.ui;L(W.ui.canvas),P.setTransform(e,0,0,e,t.x,t.y),q()})),{newGame:()=>{W.puzzle=o(m(d))(N),q()},getState:()=>i(W.puzzle),setState:e=>{W.puzzle=e,q()},destroy:()=>{"CANVAS"!==t.tagName&&W.ui.canvas.remove(),W=null},setZoom:V,getZoom:()=>W.ui.zoom,centralize:J}};
