import{_ as X2,bs as Q2,bt as V,bu as bi,bv as Wt,az as Ps,bw as su,bx as Lf,bo as pe,bg as wt,by as ey,bz as ty,bA as iy,bB as sa,bC as Eh,bD as ry,bE as pc,bF as vp,bG as sy,bH as n0,bI as ny,bJ as oy,bK as ay,bL as cy,bM as Ml,bN as io,bO as Tt,bP as ni,bn as Jr,bQ as nu,bR as ly,bS as uy,bT as Cp,bU as vi,bV as dy,bW as Ep,bX as xp,bY as ou,bZ as Ip,b_ as Ns,b$ as Za,c0 as o0,c1 as hy,c2 as py,c3 as On,c4 as Mf,c5 as dr,c6 as Vi,c7 as Ar,c8 as Li}from"./index-3579674b.js";function ga(t,{strict:e=!0}={}){return!t||typeof t!="string"?!1:e?/^0x[0-9a-fA-F]*$/.test(t):t.startsWith("0x")}function a0(t){return ga(t,{strict:!1})?Math.ceil((t.length-2)/2):t.length}const Bf="2.23.2";let po={getDocsUrl:({docsBaseUrl:t,docsPath:e="",docsSlug:i})=>e?`${t??"https://viem.sh"}${e}${i?`#${i}`:""}`:void 0,version:`viem@${Bf}`};class Ds extends Error{constructor(e,i={}){var a;const r=(()=>{var c;return i.cause instanceof Ds?i.cause.details:(c=i.cause)!=null&&c.message?i.cause.message:i.details})(),s=(()=>i.cause instanceof Ds&&i.cause.docsPath||i.docsPath)(),n=(a=po.getDocsUrl)==null?void 0:a.call(po,{...i,docsPath:s}),o=[e||"An error occurred.","",...i.metaMessages?[...i.metaMessages,""]:[],...n?[`Docs: ${n}`]:[],...r?[`Details: ${r}`]:[],...po.version?[`Version: ${po.version}`]:[]].join(`
`);super(o,i.cause?{cause:i.cause}:void 0),Object.defineProperty(this,"details",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docsPath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"metaMessages",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"shortMessage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"version",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BaseError"}),this.details=r,this.docsPath=s,this.metaMessages=i.metaMessages,this.name=i.name??this.name,this.shortMessage=e,this.version=Bf}walk(e){return Uf(this,e)}}function Uf(t,e){return e!=null&&e(t)?t:t&&typeof t=="object"&&"cause"in t&&t.cause!==void 0?Uf(t.cause,e):e?null:t}class Df extends Ds{constructor({size:e,targetSize:i,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${e}) exceeds padding size (${i}).`,{name:"SizeExceedsPaddingSizeError"})}}function ro(t,{dir:e,size:i=32}={}){return typeof t=="string"?gy(t,{dir:e,size:i}):fy(t,{dir:e,size:i})}function gy(t,{dir:e,size:i=32}={}){if(i===null)return t;const r=t.replace("0x","");if(r.length>i*2)throw new Df({size:Math.ceil(r.length/2),targetSize:i,type:"hex"});return`0x${r[e==="right"?"padEnd":"padStart"](i*2,"0")}`}function fy(t,{dir:e,size:i=32}={}){if(i===null)return t;if(t.length>i)throw new Df({size:t.length,targetSize:i,type:"bytes"});const r=new Uint8Array(i);for(let s=0;s<i;s++){const n=e==="right";r[n?s:i-s-1]=t[n?s:t.length-s-1]}return r}class wy extends Ds{constructor({max:e,min:i,signed:r,size:s,value:n}){super(`Number "${n}" is not in safe ${s?`${s*8}-bit ${r?"signed":"unsigned"} `:""}integer range ${e?`(${i} to ${e})`:`(above ${i})`}`,{name:"IntegerOutOfRangeError"})}}class my extends Ds{constructor({givenSize:e,maxSize:i}){super(`Size cannot exceed ${i} bytes. Given size: ${e} bytes.`,{name:"SizeOverflowError"})}}function so(t,{size:e}){if(a0(t)>e)throw new my({givenSize:a0(t),maxSize:e})}function xh(t,e={}){const{signed:i}=e;e.size&&so(t,{size:e.size});const r=BigInt(t);if(!i)return r;const s=(t.length-2)/2,n=(1n<<BigInt(s)*8n-1n)-1n;return r<=n?r:r-BigInt(`0x${"f".padStart(s*2,"f")}`)-1n}function yy(t,e={}){return Number(xh(t,e))}const by=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Ih(t,e={}){return typeof t=="number"||typeof t=="bigint"?zf(t,e):typeof t=="string"?Ey(t,e):typeof t=="boolean"?vy(t,e):jf(t,e)}function vy(t,e={}){const i=`0x${Number(t)}`;return typeof e.size=="number"?(so(i,{size:e.size}),ro(i,{size:e.size})):i}function jf(t,e={}){let i="";for(let s=0;s<t.length;s++)i+=by[t[s]];const r=`0x${i}`;return typeof e.size=="number"?(so(r,{size:e.size}),ro(r,{dir:"right",size:e.size})):r}function zf(t,e={}){const{signed:i,size:r}=e,s=BigInt(t);let n;r?i?n=(1n<<BigInt(r)*8n-1n)-1n:n=2n**(BigInt(r)*8n)-1n:typeof t=="number"&&(n=BigInt(Number.MAX_SAFE_INTEGER));const o=typeof n=="bigint"&&i?-n-1n:0;if(n&&s>n||s<o){const c=typeof t=="bigint"?"n":"";throw new wy({max:n?`${n}${c}`:void 0,min:`${o}${c}`,signed:i,size:r,value:`${t}${c}`})}const a=`0x${(i&&s<0?(1n<<BigInt(r*8))+BigInt(s):s).toString(16)}`;return r?ro(a,{size:r}):a}const Cy=new TextEncoder;function Ey(t,e={}){const i=Cy.encode(t);return jf(i,e)}const xy=new TextEncoder;function Iy(t,e={}){return typeof t=="number"||typeof t=="bigint"?_y(t,e):typeof t=="boolean"?Ay(t,e):ga(t)?Ff(t,e):Hf(t,e)}function Ay(t,e={}){const i=new Uint8Array(1);return i[0]=Number(t),typeof e.size=="number"?(so(i,{size:e.size}),ro(i,{size:e.size})):i}const Xi={zero:48,nine:57,A:65,F:70,a:97,f:102};function c0(t){if(t>=Xi.zero&&t<=Xi.nine)return t-Xi.zero;if(t>=Xi.A&&t<=Xi.F)return t-(Xi.A-10);if(t>=Xi.a&&t<=Xi.f)return t-(Xi.a-10)}function Ff(t,e={}){let i=t;e.size&&(so(i,{size:e.size}),i=ro(i,{dir:"right",size:e.size}));let r=i.slice(2);r.length%2&&(r=`0${r}`);const s=r.length/2,n=new Uint8Array(s);for(let o=0,a=0;o<s;o++){const c=c0(r.charCodeAt(a++)),l=c0(r.charCodeAt(a++));if(c===void 0||l===void 0)throw new Ds(`Invalid byte sequence ("${r[a-2]}${r[a-1]}" in "${r}").`);n[o]=c*16+l}return n}function _y(t,e){const i=zf(t,e);return Ff(i)}function Hf(t,e={}){const i=xy.encode(t);return typeof e.size=="number"?(so(i,{size:e.size}),ro(i,{dir:"right",size:e.size})):i}function Bl(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function Ny(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function au(t,...e){if(!Ny(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function GO(t){if(typeof t!="function"||typeof t.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Bl(t.outputLen),Bl(t.blockLen)}function l0(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Sy(t,e){au(t);const i=e.outputLen;if(t.length<i)throw new Error("digestInto() expects output buffer of length at least "+i)}const gc=BigInt(2**32-1),u0=BigInt(32);function $y(t,e=!1){return e?{h:Number(t&gc),l:Number(t>>u0&gc)}:{h:Number(t>>u0&gc)|0,l:Number(t&gc)|0}}function ky(t,e=!1){let i=new Uint32Array(t.length),r=new Uint32Array(t.length);for(let s=0;s<t.length;s++){const{h:n,l:o}=$y(t[s],e);[i[s],r[s]]=[n,o]}return[i,r]}const Py=(t,e,i)=>t<<i|e>>>32-i,Oy=(t,e,i)=>e<<i|t>>>32-i,Ty=(t,e,i)=>e<<i-32|t>>>64-i,Ry=(t,e,i)=>t<<i-32|e>>>64-i,Js=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0;/*! noble-hashes - MIT License (c) 2022 Paul Miller (paulmillr.com) */function Ly(t){return new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4))}function ZO(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function YO(t,e){return t<<32-e|t>>>e}const d0=(()=>new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68)();function My(t){return t<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255}function h0(t){for(let e=0;e<t.length;e++)t[e]=My(t[e])}function By(t){if(typeof t!="string")throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array(new TextEncoder().encode(t))}function qf(t){return typeof t=="string"&&(t=By(t)),au(t),t}function JO(...t){let e=0;for(let r=0;r<t.length;r++){const s=t[r];au(s),e+=s.length}const i=new Uint8Array(e);for(let r=0,s=0;r<t.length;r++){const n=t[r];i.set(n,s),s+=n.length}return i}class Uy{clone(){return this._cloneInto()}}function Dy(t){const e=r=>t().update(qf(r)).digest(),i=t();return e.outputLen=i.outputLen,e.blockLen=i.blockLen,e.create=()=>t(),e}function XO(t=32){if(Js&&typeof Js.getRandomValues=="function")return Js.getRandomValues(new Uint8Array(t));if(Js&&typeof Js.randomBytes=="function")return Js.randomBytes(t);throw new Error("crypto.getRandomValues must be defined")}const Wf=[],Vf=[],Kf=[],jy=BigInt(0),go=BigInt(1),zy=BigInt(2),Fy=BigInt(7),Hy=BigInt(256),qy=BigInt(113);for(let t=0,e=go,i=1,r=0;t<24;t++){[i,r]=[r,(2*i+3*r)%5],Wf.push(2*(5*r+i)),Vf.push((t+1)*(t+2)/2%64);let s=jy;for(let n=0;n<7;n++)e=(e<<go^(e>>Fy)*qy)%Hy,e&zy&&(s^=go<<(go<<BigInt(n))-go);Kf.push(s)}const[Wy,Vy]=ky(Kf,!0),p0=(t,e,i)=>i>32?Ty(t,e,i):Py(t,e,i),g0=(t,e,i)=>i>32?Ry(t,e,i):Oy(t,e,i);function Ky(t,e=24){const i=new Uint32Array(10);for(let r=24-e;r<24;r++){for(let o=0;o<10;o++)i[o]=t[o]^t[o+10]^t[o+20]^t[o+30]^t[o+40];for(let o=0;o<10;o+=2){const a=(o+8)%10,c=(o+2)%10,l=i[c],u=i[c+1],d=p0(l,u,1)^i[a],h=g0(l,u,1)^i[a+1];for(let p=0;p<50;p+=10)t[o+p]^=d,t[o+p+1]^=h}let s=t[2],n=t[3];for(let o=0;o<24;o++){const a=Vf[o],c=p0(s,n,a),l=g0(s,n,a),u=Wf[o];s=t[u],n=t[u+1],t[u]=c,t[u+1]=l}for(let o=0;o<50;o+=10){for(let a=0;a<10;a++)i[a]=t[o+a];for(let a=0;a<10;a++)t[o+a]^=~i[(a+2)%10]&i[(a+4)%10]}t[0]^=Wy[r],t[1]^=Vy[r]}i.fill(0)}class Ap extends Uy{constructor(e,i,r,s=!1,n=24){if(super(),this.blockLen=e,this.suffix=i,this.outputLen=r,this.enableXOF=s,this.rounds=n,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,Bl(r),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=Ly(this.state)}keccak(){d0||h0(this.state32),Ky(this.state32,this.rounds),d0||h0(this.state32),this.posOut=0,this.pos=0}update(e){l0(this);const{blockLen:i,state:r}=this;e=qf(e);const s=e.length;for(let n=0;n<s;){const o=Math.min(i-this.pos,s-n);for(let a=0;a<o;a++)r[this.pos++]^=e[n++];this.pos===i&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:e,suffix:i,pos:r,blockLen:s}=this;e[r]^=i,i&128&&r===s-1&&this.keccak(),e[s-1]^=128,this.keccak()}writeInto(e){l0(this,!1),au(e),this.finish();const i=this.state,{blockLen:r}=this;for(let s=0,n=e.length;s<n;){this.posOut>=r&&this.keccak();const o=Math.min(r-this.posOut,n-s);e.set(i.subarray(this.posOut,this.posOut+o),s),this.posOut+=o,s+=o}return e}xofInto(e){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return Bl(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(Sy(e,this),this.finished)throw new Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){const{blockLen:i,suffix:r,outputLen:s,rounds:n,enableXOF:o}=this;return e||(e=new Ap(i,r,s,o,n)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=n,e.suffix=r,e.outputLen=s,e.enableXOF=o,e.destroyed=this.destroyed,e}}const Gy=(t,e,i)=>Dy(()=>new Ap(e,t,i)),Zy=Gy(1,136,256/8);function Gf(t,e){const i=e||"hex",r=Zy(ga(t,{strict:!1})?Iy(t):t);return i==="bytes"?r:Ih(r)}class Yy extends Map{constructor(e){super(),Object.defineProperty(this,"maxSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.maxSize=e}get(e){const i=super.get(e);return super.has(e)&&i!==void 0&&(this.delete(e),super.set(e,i)),i}set(e,i){if(super.set(e,i),this.maxSize&&this.size>this.maxSize){const r=this.keys().next().value;r&&this.delete(r)}return this}}const Pu=new Yy(8192);function Jy(t,e){if(Pu.has(`${t}.${e}`))return Pu.get(`${t}.${e}`);const i=e?`${e}${t.toLowerCase()}`:t.substring(2).toLowerCase(),r=Gf(Hf(i),"bytes"),s=(e?i.substring(`${e}0x`.length):i).split("");for(let o=0;o<40;o+=2)r[o>>1]>>4>=8&&s[o]&&(s[o]=s[o].toUpperCase()),(r[o>>1]&15)>=8&&s[o+1]&&(s[o+1]=s[o+1].toUpperCase());const n=`0x${s.join("")}`;return Pu.set(`${t}.${e}`,n),n}function Xy(t){const e=Gf(`0x${t.substring(4)}`).substring(26);return Jy(`0x${e}`)}async function Qy({hash:t,signature:e}){const i=ga(t)?t:Ih(t),{secp256k1:r}=await X2(()=>import("./secp256k1-63a1cb91.js"),["assets/secp256k1-63a1cb91.js","assets/index-3579674b.js","assets/index-20bb2843.css"]);return`0x${(()=>{if(typeof e=="object"&&"r"in e&&"s"in e){const{r:l,s:u,v:d,yParity:h}=e,p=Number(h??d),g=f0(p);return new r.Signature(xh(l),xh(u)).addRecoveryBit(g)}const o=ga(e)?e:Ih(e),a=yy(`0x${o.slice(130)}`),c=f0(a);return r.Signature.fromCompact(o.substring(2,130)).addRecoveryBit(c)})().recoverPublicKey(i.substring(2)).toHex(!1)}`}function f0(t){if(t===0||t===1)return t;if(t===27)return 0;if(t===28)return 1;throw new Error("Invalid yParityOrV value")}async function eb({hash:t,signature:e}){return Xy(await Qy({hash:t,signature:e}))}const tb=":";function Mn(t){const[e,i]=t.split(tb);return{namespace:e,reference:i}}function w0(t,e=[]){const i=[];return Object.keys(t).forEach(r=>{if(e.length&&!e.includes(r))return;const s=t[r];i.push(...s.accounts)}),i}function Zf(t,e){return t.includes(":")?[t]:e.chains||[]}var ib=Object.defineProperty,rb=Object.defineProperties,sb=Object.getOwnPropertyDescriptors,m0=Object.getOwnPropertySymbols,nb=Object.prototype.hasOwnProperty,ob=Object.prototype.propertyIsEnumerable,y0=(t,e,i)=>e in t?ib(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,b0=(t,e)=>{for(var i in e||(e={}))nb.call(e,i)&&y0(t,i,e[i]);if(m0)for(var i of m0(e))ob.call(e,i)&&y0(t,i,e[i]);return t},ab=(t,e)=>rb(t,sb(e));const cb="ReactNative",ri={reactNative:"react-native",node:"node",browser:"browser",unknown:"unknown"},lb="js";function Ul(){return typeof Ps<"u"&&typeof Ps.versions<"u"&&typeof Ps.versions.node<"u"}function Xr(){return!su()&&!!Lf()&&navigator.product===cb}function ub(){return Xr()&&typeof pe<"u"&&typeof(pe==null?void 0:pe.Platform)<"u"&&(pe==null?void 0:pe.Platform.OS)==="android"}function db(){return Xr()&&typeof pe<"u"&&typeof(pe==null?void 0:pe.Platform)<"u"&&(pe==null?void 0:pe.Platform.OS)==="ios"}function Ya(){return!Ul()&&!!Lf()&&!!su()}function Ja(){return Xr()?ri.reactNative:Ul()?ri.node:Ya()?ri.browser:ri.unknown}function v0(){var t;try{return Xr()&&typeof pe<"u"&&typeof(pe==null?void 0:pe.Application)<"u"?(t=pe.Application)==null?void 0:t.applicationId:void 0}catch{return}}function hb(t,e){const i=new URLSearchParams(t);for(const r of Object.keys(e).sort())if(e.hasOwnProperty(r)){const s=e[r];s!==void 0&&i.set(r,s)}return i.toString()}function pb(t){var e,i;const r=Yf();try{return t!=null&&t.url&&r.url&&t.url!==r.url&&(console.warn(`The configured WalletConnect 'metadata.url':${t.url} differs from the actual page url:${r.url}. This is probably unintended and can lead to issues.`),t.url=r.url),(e=t==null?void 0:t.icons)!=null&&e.length&&t.icons.length>0&&(t.icons=t.icons.filter(s=>s!=="")),ab(b0(b0({},r),t),{url:(t==null?void 0:t.url)||r.url,name:(t==null?void 0:t.name)||r.name,description:(t==null?void 0:t.description)||r.description,icons:(i=t==null?void 0:t.icons)!=null&&i.length&&t.icons.length>0?t.icons:r.icons})}catch(s){return console.warn("Error populating app metadata",s),t||r}}function Yf(){return Q2()||{name:"",description:"",url:"",icons:[""]}}function gb(){if(Ja()===ri.reactNative&&typeof pe<"u"&&typeof(pe==null?void 0:pe.Platform)<"u"){const{OS:i,Version:r}=pe.Platform;return[i,r].join("-")}const t=ty();if(t===null)return"unknown";const e=t.os?t.os.replace(" ","").toLowerCase():"unknown";return t.type==="browser"?[e,t.name,t.version].join("-"):[e,t.version].join("-")}function fb(){var t;const e=Ja();return e===ri.browser?[e,((t=iy())==null?void 0:t.host)||"unknown"].join(":"):e}function Jf(t,e,i){const r=gb(),s=fb();return[[t,e].join("-"),[lb,i].join("-"),r,s].join("/")}function wb({protocol:t,version:e,relayUrl:i,sdkVersion:r,auth:s,projectId:n,useOnCloseEvent:o,bundleId:a,packageName:c}){const l=i.split("?"),u=Jf(t,e,r),d={auth:s,ua:u,projectId:n,useOnCloseEvent:o||void 0,packageName:c||void 0,bundleId:a||void 0},h=hb(l[1]||"",d);return l[0]+"?"+h}function Ss(t,e){return t.filter(i=>e.includes(i)).length===t.length}function Ah(t){return Object.fromEntries(t.entries())}function _h(t){return new Map(Object.entries(t))}function bs(t=V.FIVE_MINUTES,e){const i=V.toMiliseconds(t||V.FIVE_MINUTES);let r,s,n,o;return{resolve:a=>{n&&r&&(clearTimeout(n),r(a),o=Promise.resolve(a))},reject:a=>{n&&s&&(clearTimeout(n),s(a))},done:()=>new Promise((a,c)=>{if(o)return a(o);n=setTimeout(()=>{const l=new Error(e);o=Promise.reject(l),c(l)},i),r=a,s=c})}}function Dr(t,e,i){return new Promise(async(r,s)=>{const n=setTimeout(()=>s(new Error(i)),e);try{const o=await t;r(o)}catch(o){s(o)}clearTimeout(n)})}function Xf(t,e){if(typeof e=="string"&&e.startsWith(`${t}:`))return e;if(t.toLowerCase()==="topic"){if(typeof e!="string")throw new Error('Value must be "string" for expirer target type: topic');return`topic:${e}`}else if(t.toLowerCase()==="id"){if(typeof e!="number")throw new Error('Value must be "number" for expirer target type: id');return`id:${e}`}throw new Error(`Unknown expirer target type: ${t}`)}function mb(t){return Xf("topic",t)}function yb(t){return Xf("id",t)}function Qf(t){const[e,i]=t.split(":"),r={id:void 0,topic:void 0};if(e==="topic"&&typeof i=="string")r.topic=i;else if(e==="id"&&Number.isInteger(Number(i)))r.id=Number(i);else throw new Error(`Invalid target, expected id:number or topic:string, got ${e}:${i}`);return r}function it(t,e){return V.fromMiliseconds((e||Date.now())+V.toMiliseconds(t))}function Rr(t){return Date.now()>=V.toMiliseconds(t)}function Pe(t,e){return`${t}${e?`:${e}`:""}`}function Nl(t=[],e=[]){return[...new Set([...t,...e])]}async function bb({id:t,topic:e,wcDeepLink:i}){var r;try{if(!i)return;const s=typeof i=="string"?JSON.parse(i):i,n=s==null?void 0:s.href;if(typeof n!="string")return;const o=vb(n,t,e),a=Ja();if(a===ri.browser){if(!((r=su())!=null&&r.hasFocus())){console.warn("Document does not have focus, skipping deeplink.");return}Cb(o)}else a===ri.reactNative&&typeof(pe==null?void 0:pe.Linking)<"u"&&await pe.Linking.openURL(o)}catch(s){console.error(s)}}function vb(t,e,i){const r=`requestId=${e}&sessionTopic=${i}`;t.endsWith("/")&&(t=t.slice(0,-1));let s=`${t}`;if(t.startsWith("https://t.me")){const n=t.includes("?")?"&startapp=":"?startapp=";s=`${s}${n}${Ab(r,!0)}`}else s=`${s}/wc?${r}`;return s}function Cb(t){let e="_self";Ib()?e="_top":(xb()||t.startsWith("https://")||t.startsWith("http://"))&&(e="_blank"),window.open(t,e,"noreferrer noopener")}async function Eb(t,e){let i="";try{if(Ya()&&(i=localStorage.getItem(e),i))return i;i=await t.getItem(e)}catch(r){console.error(r)}return i}function C0(t,e){if(!t.includes(e))return null;const i=t.split(/([&,?,=])/),r=i.indexOf(e);return i[r+2]}function E0(){return typeof crypto<"u"&&crypto!=null&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)})}function _p(){return typeof Ps<"u"&&{}.IS_VITEST==="true"}function xb(){return typeof window<"u"&&(!!window.TelegramWebviewProxy||!!window.Telegram||!!window.TelegramWebviewProxyProto)}function Ib(){try{return window.self!==window.top}catch{return!1}}function Ab(t,e=!1){const i=wt.from(t).toString("base64");return e?i.replace(/[=]/g,""):i}function ew(t){return wt.from(t,"base64").toString("utf-8")}function _b(t){return new Promise(e=>setTimeout(e,t))}function fa(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function Nb(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function Xa(t,...e){if(!Nb(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function Np(t){if(typeof t!="function"||typeof t.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");fa(t.outputLen),fa(t.blockLen)}function Dn(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function tw(t,e){Xa(t);const i=e.outputLen;if(t.length<i)throw new Error("digestInto() expects output buffer of length at least "+i)}const fc=BigInt(2**32-1),x0=BigInt(32);function Sb(t,e=!1){return e?{h:Number(t&fc),l:Number(t>>x0&fc)}:{h:Number(t>>x0&fc)|0,l:Number(t&fc)|0}}function $b(t,e=!1){let i=new Uint32Array(t.length),r=new Uint32Array(t.length);for(let s=0;s<t.length;s++){const{h:n,l:o}=Sb(t[s],e);[i[s],r[s]]=[n,o]}return[i,r]}const kb=(t,e,i)=>t<<i|e>>>32-i,Pb=(t,e,i)=>e<<i|t>>>32-i,Ob=(t,e,i)=>e<<i-32|t>>>64-i,Tb=(t,e,i)=>t<<i-32|e>>>64-i,Xs=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0;function Rb(t){return new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4))}function Ou(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function Mi(t,e){return t<<32-e|t>>>e}const I0=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function Lb(t){return t<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255}function A0(t){for(let e=0;e<t.length;e++)t[e]=Lb(t[e])}function Mb(t){if(typeof t!="string")throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array(new TextEncoder().encode(t))}function jn(t){return typeof t=="string"&&(t=Mb(t)),Xa(t),t}function Bb(...t){let e=0;for(let r=0;r<t.length;r++){const s=t[r];Xa(s),e+=s.length}const i=new Uint8Array(e);for(let r=0,s=0;r<t.length;r++){const n=t[r];i.set(n,s),s+=n.length}return i}let Sp=class{clone(){return this._cloneInto()}};function iw(t){const e=r=>t().update(jn(r)).digest(),i=t();return e.outputLen=i.outputLen,e.blockLen=i.blockLen,e.create=()=>t(),e}function no(t=32){if(Xs&&typeof Xs.getRandomValues=="function")return Xs.getRandomValues(new Uint8Array(t));if(Xs&&typeof Xs.randomBytes=="function")return Xs.randomBytes(t);throw new Error("crypto.getRandomValues must be defined")}const rw=[],sw=[],nw=[],Ub=BigInt(0),fo=BigInt(1),Db=BigInt(2),jb=BigInt(7),zb=BigInt(256),Fb=BigInt(113);for(let t=0,e=fo,i=1,r=0;t<24;t++){[i,r]=[r,(2*i+3*r)%5],rw.push(2*(5*r+i)),sw.push((t+1)*(t+2)/2%64);let s=Ub;for(let n=0;n<7;n++)e=(e<<fo^(e>>jb)*Fb)%zb,e&Db&&(s^=fo<<(fo<<BigInt(n))-fo);nw.push(s)}const[Hb,qb]=$b(nw,!0),_0=(t,e,i)=>i>32?Ob(t,e,i):kb(t,e,i),N0=(t,e,i)=>i>32?Tb(t,e,i):Pb(t,e,i);function Wb(t,e=24){const i=new Uint32Array(10);for(let r=24-e;r<24;r++){for(let o=0;o<10;o++)i[o]=t[o]^t[o+10]^t[o+20]^t[o+30]^t[o+40];for(let o=0;o<10;o+=2){const a=(o+8)%10,c=(o+2)%10,l=i[c],u=i[c+1],d=_0(l,u,1)^i[a],h=N0(l,u,1)^i[a+1];for(let p=0;p<50;p+=10)t[o+p]^=d,t[o+p+1]^=h}let s=t[2],n=t[3];for(let o=0;o<24;o++){const a=sw[o],c=_0(s,n,a),l=N0(s,n,a),u=rw[o];s=t[u],n=t[u+1],t[u]=c,t[u+1]=l}for(let o=0;o<50;o+=10){for(let a=0;a<10;a++)i[a]=t[o+a];for(let a=0;a<10;a++)t[o+a]^=~i[(a+2)%10]&i[(a+4)%10]}t[0]^=Hb[r],t[1]^=qb[r]}i.fill(0)}let Vb=class ow extends Sp{constructor(e,i,r,s=!1,n=24){if(super(),this.blockLen=e,this.suffix=i,this.outputLen=r,this.enableXOF=s,this.rounds=n,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,fa(r),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=Rb(this.state)}keccak(){I0||A0(this.state32),Wb(this.state32,this.rounds),I0||A0(this.state32),this.posOut=0,this.pos=0}update(e){Dn(this);const{blockLen:i,state:r}=this;e=jn(e);const s=e.length;for(let n=0;n<s;){const o=Math.min(i-this.pos,s-n);for(let a=0;a<o;a++)r[this.pos++]^=e[n++];this.pos===i&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:e,suffix:i,pos:r,blockLen:s}=this;e[r]^=i,i&128&&r===s-1&&this.keccak(),e[s-1]^=128,this.keccak()}writeInto(e){Dn(this,!1),Xa(e),this.finish();const i=this.state,{blockLen:r}=this;for(let s=0,n=e.length;s<n;){this.posOut>=r&&this.keccak();const o=Math.min(r-this.posOut,n-s);e.set(i.subarray(this.posOut,this.posOut+o),s),this.posOut+=o,s+=o}return e}xofInto(e){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return fa(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(tw(e,this),this.finished)throw new Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){const{blockLen:i,suffix:r,outputLen:s,rounds:n,enableXOF:o}=this;return e||(e=new ow(i,r,s,o,n)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=n,e.suffix=r,e.outputLen=s,e.enableXOF=o,e.destroyed=this.destroyed,e}};const Kb=(t,e,i)=>iw(()=>new Vb(e,t,i)),Gb=Kb(1,136,256/8),Zb="https://rpc.walletconnect.org/v1";function aw(t){const e=`Ethereum Signed Message:
${t.length}`,i=new TextEncoder().encode(e+t);return"0x"+wt.from(Gb(i)).toString("hex")}async function Yb(t,e,i,r,s,n){switch(i.t){case"eip191":return await Jb(t,e,i.s);case"eip1271":return await Xb(t,e,i.s,r,s,n);default:throw new Error(`verifySignature failed: Attempted to verify CacaoSignature with unknown type: ${i.t}`)}}async function Jb(t,e,i){return(await eb({hash:aw(e),signature:i})).toLowerCase()===t.toLowerCase()}async function Xb(t,e,i,r,s,n){const o=Mn(r);if(!o.namespace||!o.reference)throw new Error(`isValidEip1271Signature failed: chainId must be in CAIP-2 format, received: ${r}`);try{const a="0x1626ba7e",c="0000000000000000000000000000000000000000000000000000000000000040",l="0000000000000000000000000000000000000000000000000000000000000041",u=i.substring(2),d=aw(e).substring(2),h=a+d+c+l+u,p=await fetch(`${n||Zb}/?chainId=${r}&projectId=${s}`,{method:"POST",body:JSON.stringify({id:Qb(),jsonrpc:"2.0",method:"eth_call",params:[{to:t,data:h},"latest"]})}),{result:g}=await p.json();return g?g.slice(0,a.length).toLowerCase()===a.toLowerCase():!1}catch(a){return console.error("isValidEip1271Signature: ",a),!1}}function Qb(){return Date.now()+Math.floor(Math.random()*1e3)}function ev(t){const e=atob(t),i=new Uint8Array(e.length);for(let o=0;o<e.length;o++)i[o]=e.charCodeAt(o);const r=i[0];if(r===0)throw new Error("No signatures found");const s=1+r*64;if(i.length<s)throw new Error("Transaction data too short for claimed signature count");if(i.length<100)throw new Error("Transaction too short");const n=wt.from(t,"base64").slice(1,65);return ey.encode(n)}var tv=Object.defineProperty,iv=Object.defineProperties,rv=Object.getOwnPropertyDescriptors,S0=Object.getOwnPropertySymbols,sv=Object.prototype.hasOwnProperty,nv=Object.prototype.propertyIsEnumerable,$0=(t,e,i)=>e in t?tv(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,ov=(t,e)=>{for(var i in e||(e={}))sv.call(e,i)&&$0(t,i,e[i]);if(S0)for(var i of S0(e))nv.call(e,i)&&$0(t,i,e[i]);return t},av=(t,e)=>iv(t,rv(e));const cv="did:pkh:",$p=t=>t==null?void 0:t.split(":"),lv=t=>{const e=t&&$p(t);if(e)return t.includes(cv)?e[3]:e[1]},Nh=t=>{const e=t&&$p(t);if(e)return e[2]+":"+e[3]},Dl=t=>{const e=t&&$p(t);if(e)return e.pop()};async function k0(t){const{cacao:e,projectId:i}=t,{s:r,p:s}=e,n=cw(s,s.iss),o=Dl(s.iss);return await Yb(o,n,r,Nh(s.iss),i)}const cw=(t,e)=>{const i=`${t.domain} wants you to sign in with your Ethereum account:`,r=Dl(e);if(!t.aud&&!t.uri)throw new Error("Either `aud` or `uri` is required to construct the message");let s=t.statement||void 0;const n=`URI: ${t.aud||t.uri}`,o=`Version: ${t.version}`,a=`Chain ID: ${lv(e)}`,c=`Nonce: ${t.nonce}`,l=`Issued At: ${t.iat}`,u=t.exp?`Expiration Time: ${t.exp}`:void 0,d=t.nbf?`Not Before: ${t.nbf}`:void 0,h=t.requestId?`Request ID: ${t.requestId}`:void 0,p=t.resources?`Resources:${t.resources.map(f=>`
- ${f}`).join("")}`:void 0,g=Sl(t.resources);if(g){const f=wa(g);s=yv(s,f)}return[i,r,"",s,"",n,o,a,c,l,u,d,h,p].filter(f=>f!=null).join(`
`)};function uv(t){return wt.from(JSON.stringify(t)).toString("base64")}function dv(t){return JSON.parse(wt.from(t,"base64").toString("utf-8"))}function js(t){if(!t)throw new Error("No recap provided, value is undefined");if(!t.att)throw new Error("No `att` property found");const e=Object.keys(t.att);if(!(e!=null&&e.length))throw new Error("No resources found in `att` property");e.forEach(i=>{const r=t.att[i];if(Array.isArray(r))throw new Error(`Resource must be an object: ${i}`);if(typeof r!="object")throw new Error(`Resource must be an object: ${i}`);if(!Object.keys(r).length)throw new Error(`Resource object is empty: ${i}`);Object.keys(r).forEach(s=>{const n=r[s];if(!Array.isArray(n))throw new Error(`Ability limits ${s} must be an array of objects, found: ${n}`);if(!n.length)throw new Error(`Value of ${s} is empty array, must be an array with objects`);n.forEach(o=>{if(typeof o!="object")throw new Error(`Ability limits (${s}) must be an array of objects, found: ${o}`)})})})}function hv(t,e,i,r={}){return i==null||i.sort((s,n)=>s.localeCompare(n)),{att:{[t]:pv(e,i,r)}}}function pv(t,e,i={}){e=e==null?void 0:e.sort((s,n)=>s.localeCompare(n));const r=e.map(s=>({[`${t}/${s}`]:[i]}));return Object.assign({},...r)}function lw(t){return js(t),`urn:recap:${uv(t).replace(/=/g,"")}`}function wa(t){const e=dv(t.replace("urn:recap:",""));return js(e),e}function gv(t,e,i){const r=hv(t,e,i);return lw(r)}function fv(t){return t&&t.includes("urn:recap:")}function wv(t,e){const i=wa(t),r=wa(e),s=mv(i,r);return lw(s)}function mv(t,e){js(t),js(e);const i=Object.keys(t.att).concat(Object.keys(e.att)).sort((s,n)=>s.localeCompare(n)),r={att:{}};return i.forEach(s=>{var n,o;Object.keys(((n=t.att)==null?void 0:n[s])||{}).concat(Object.keys(((o=e.att)==null?void 0:o[s])||{})).sort((a,c)=>a.localeCompare(c)).forEach(a=>{var c,l;r.att[s]=av(ov({},r.att[s]),{[a]:((c=t.att[s])==null?void 0:c[a])||((l=e.att[s])==null?void 0:l[a])})})}),r}function yv(t="",e){js(e);const i="I further authorize the stated URI to perform the following actions on my behalf: ";if(t.includes(i))return t;const r=[];let s=0;Object.keys(e.att).forEach(a=>{const c=Object.keys(e.att[a]).map(d=>({ability:d.split("/")[0],action:d.split("/")[1]}));c.sort((d,h)=>d.action.localeCompare(h.action));const l={};c.forEach(d=>{l[d.ability]||(l[d.ability]=[]),l[d.ability].push(d.action)});const u=Object.keys(l).map(d=>(s++,`(${s}) '${d}': '${l[d].join("', '")}' for '${a}'.`));r.push(u.join(", ").replace(".,","."))});const n=r.join(" "),o=`${i}${n}`;return`${t?t+" ":""}${o}`}function P0(t){var e;const i=wa(t);js(i);const r=(e=i.att)==null?void 0:e.eip155;return r?Object.keys(r).map(s=>s.split("/")[1]):[]}function O0(t){const e=wa(t);js(e);const i=[];return Object.values(e.att).forEach(r=>{Object.values(r).forEach(s=>{var n;(n=s==null?void 0:s[0])!=null&&n.chains&&i.push(s[0].chains)})}),[...new Set(i.flat())]}function Sl(t){if(!t)return;const e=t==null?void 0:t[t.length-1];return fv(e)?e:void 0}function Tu(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function uw(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function ti(t,...e){if(!uw(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function T0(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function bv(t,e){ti(t);const i=e.outputLen;if(t.length<i)throw new Error("digestInto() expects output buffer of length at least "+i)}function R0(t){if(typeof t!="boolean")throw new Error(`boolean expected, not ${t}`)}const Fr=t=>new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4)),vv=t=>new DataView(t.buffer,t.byteOffset,t.byteLength),Cv=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;if(!Cv)throw new Error("Non little-endian hardware is not supported");function Ev(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}function Sh(t){if(typeof t=="string")t=Ev(t);else if(uw(t))t=$h(t);else throw new Error("Uint8Array expected, got "+typeof t);return t}function xv(t,e){if(e==null||typeof e!="object")throw new Error("options must be defined");return Object.assign(t,e)}function Iv(t,e){if(t.length!==e.length)return!1;let i=0;for(let r=0;r<t.length;r++)i|=t[r]^e[r];return i===0}const Av=(t,e)=>{function i(r,...s){if(ti(r),t.nonceLength!==void 0){const l=s[0];if(!l)throw new Error("nonce / iv required");t.varSizeNonce?ti(l):ti(l,t.nonceLength)}const n=t.tagLength;n&&s[1]!==void 0&&ti(s[1]);const o=e(r,...s),a=(l,u)=>{if(u!==void 0){if(l!==2)throw new Error("cipher output not supported");ti(u)}};let c=!1;return{encrypt(l,u){if(c)throw new Error("cannot encrypt() twice with same key + nonce");return c=!0,ti(l),a(o.encrypt.length,u),o.encrypt(l,u)},decrypt(l,u){if(ti(l),n&&l.length<n)throw new Error("invalid ciphertext length: smaller than tagLength="+n);return a(o.decrypt.length,u),o.decrypt(l,u)}}}return Object.assign(i,t),i};function L0(t,e,i=!0){if(e===void 0)return new Uint8Array(t);if(e.length!==t)throw new Error("invalid output length, expected "+t+", got: "+e.length);if(i&&!_v(e))throw new Error("invalid output, must be aligned");return e}function M0(t,e,i,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,i,r);const s=BigInt(32),n=BigInt(4294967295),o=Number(i>>s&n),a=Number(i&n),c=r?4:0,l=r?0:4;t.setUint32(e+c,o,r),t.setUint32(e+l,a,r)}function _v(t){return t.byteOffset%4===0}function $h(t){return Uint8Array.from(t)}function zn(...t){for(let e=0;e<t.length;e++)t[e].fill(0)}const dw=t=>Uint8Array.from(t.split("").map(e=>e.charCodeAt(0))),Nv=dw("expand 16-byte k"),Sv=dw("expand 32-byte k"),$v=Fr(Nv),kv=Fr(Sv);function _e(t,e){return t<<e|t>>>32-e}function kh(t){return t.byteOffset%4===0}const wc=64,Pv=16,hw=2**32-1,B0=new Uint32Array;function Ov(t,e,i,r,s,n,o,a){const c=s.length,l=new Uint8Array(wc),u=Fr(l),d=kh(s)&&kh(n),h=d?Fr(s):B0,p=d?Fr(n):B0;for(let g=0;g<c;o++){if(t(e,i,r,u,o,a),o>=hw)throw new Error("arx: counter overflow");const f=Math.min(wc,c-g);if(d&&f===wc){const w=g/4;if(g%4!==0)throw new Error("arx: invalid block position");for(let m=0,y;m<Pv;m++)y=w+m,p[y]=h[y]^u[m];g+=wc;continue}for(let w=0,m;w<f;w++)m=g+w,n[m]=s[m]^l[w];g+=f}}function Tv(t,e){const{allowShortKeys:i,extendNonceFn:r,counterLength:s,counterRight:n,rounds:o}=xv({allowShortKeys:!1,counterLength:8,counterRight:!1,rounds:20},e);if(typeof t!="function")throw new Error("core must be a function");return Tu(s),Tu(o),R0(n),R0(i),(a,c,l,u,d=0)=>{ti(a),ti(c),ti(l);const h=l.length;if(u===void 0&&(u=new Uint8Array(h)),ti(u),Tu(d),d<0||d>=hw)throw new Error("arx: counter overflow");if(u.length<h)throw new Error(`arx: output (${u.length}) is shorter than data (${h})`);const p=[];let g=a.length,f,w;if(g===32)p.push(f=$h(a)),w=kv;else if(g===16&&i)f=new Uint8Array(32),f.set(a),f.set(a,16),w=$v,p.push(f);else throw new Error(`arx: invalid 32-byte key, got length=${g}`);kh(c)||p.push(c=$h(c));const m=Fr(f);if(r){if(c.length!==24)throw new Error("arx: extended nonce must be 24 bytes");r(w,m,Fr(c.subarray(0,16)),m),c=c.subarray(16)}const y=16-s;if(y!==c.length)throw new Error(`arx: nonce must be ${y} or 16 bytes`);if(y!==12){const v=new Uint8Array(12);v.set(c,n?0:12-c.length),c=v,p.push(c)}const b=Fr(c);return Ov(t,w,m,b,l,u,d,o),zn(...p),u}}const mt=(t,e)=>t[e++]&255|(t[e++]&255)<<8;let Rv=class{constructor(e){this.blockLen=16,this.outputLen=16,this.buffer=new Uint8Array(16),this.r=new Uint16Array(10),this.h=new Uint16Array(10),this.pad=new Uint16Array(8),this.pos=0,this.finished=!1,e=Sh(e),ti(e,32);const i=mt(e,0),r=mt(e,2),s=mt(e,4),n=mt(e,6),o=mt(e,8),a=mt(e,10),c=mt(e,12),l=mt(e,14);this.r[0]=i&8191,this.r[1]=(i>>>13|r<<3)&8191,this.r[2]=(r>>>10|s<<6)&7939,this.r[3]=(s>>>7|n<<9)&8191,this.r[4]=(n>>>4|o<<12)&255,this.r[5]=o>>>1&8190,this.r[6]=(o>>>14|a<<2)&8191,this.r[7]=(a>>>11|c<<5)&8065,this.r[8]=(c>>>8|l<<8)&8191,this.r[9]=l>>>5&127;for(let u=0;u<8;u++)this.pad[u]=mt(e,16+2*u)}process(e,i,r=!1){const s=r?0:2048,{h:n,r:o}=this,a=o[0],c=o[1],l=o[2],u=o[3],d=o[4],h=o[5],p=o[6],g=o[7],f=o[8],w=o[9],m=mt(e,i+0),y=mt(e,i+2),b=mt(e,i+4),v=mt(e,i+6),S=mt(e,i+8),N=mt(e,i+10),P=mt(e,i+12),k=mt(e,i+14);let _=n[0]+(m&8191),M=n[1]+((m>>>13|y<<3)&8191),L=n[2]+((y>>>10|b<<6)&8191),U=n[3]+((b>>>7|v<<9)&8191),K=n[4]+((v>>>4|S<<12)&8191),I=n[5]+(S>>>1&8191),E=n[6]+((S>>>14|N<<2)&8191),x=n[7]+((N>>>11|P<<5)&8191),T=n[8]+((P>>>8|k<<8)&8191),O=n[9]+(k>>>5|s),R=0,B=R+_*a+M*(5*w)+L*(5*f)+U*(5*g)+K*(5*p);R=B>>>13,B&=8191,B+=I*(5*h)+E*(5*d)+x*(5*u)+T*(5*l)+O*(5*c),R+=B>>>13,B&=8191;let F=R+_*c+M*a+L*(5*w)+U*(5*f)+K*(5*g);R=F>>>13,F&=8191,F+=I*(5*p)+E*(5*h)+x*(5*d)+T*(5*u)+O*(5*l),R+=F>>>13,F&=8191;let G=R+_*l+M*c+L*a+U*(5*w)+K*(5*f);R=G>>>13,G&=8191,G+=I*(5*g)+E*(5*p)+x*(5*h)+T*(5*d)+O*(5*u),R+=G>>>13,G&=8191;let oe=R+_*u+M*l+L*c+U*a+K*(5*w);R=oe>>>13,oe&=8191,oe+=I*(5*f)+E*(5*g)+x*(5*p)+T*(5*h)+O*(5*d),R+=oe>>>13,oe&=8191;let se=R+_*d+M*u+L*l+U*c+K*a;R=se>>>13,se&=8191,se+=I*(5*w)+E*(5*f)+x*(5*g)+T*(5*p)+O*(5*h),R+=se>>>13,se&=8191;let fe=R+_*h+M*d+L*u+U*l+K*c;R=fe>>>13,fe&=8191,fe+=I*a+E*(5*w)+x*(5*f)+T*(5*g)+O*(5*p),R+=fe>>>13,fe&=8191;let Ce=R+_*p+M*h+L*d+U*u+K*l;R=Ce>>>13,Ce&=8191,Ce+=I*c+E*a+x*(5*w)+T*(5*f)+O*(5*g),R+=Ce>>>13,Ce&=8191;let Me=R+_*g+M*p+L*h+U*d+K*u;R=Me>>>13,Me&=8191,Me+=I*l+E*c+x*a+T*(5*w)+O*(5*f),R+=Me>>>13,Me&=8191;let Ae=R+_*f+M*g+L*p+U*h+K*d;R=Ae>>>13,Ae&=8191,Ae+=I*u+E*l+x*c+T*a+O*(5*w),R+=Ae>>>13,Ae&=8191;let Ee=R+_*w+M*f+L*g+U*p+K*h;R=Ee>>>13,Ee&=8191,Ee+=I*d+E*u+x*l+T*c+O*a,R+=Ee>>>13,Ee&=8191,R=(R<<2)+R|0,R=R+B|0,B=R&8191,R=R>>>13,F+=R,n[0]=B,n[1]=F,n[2]=G,n[3]=oe,n[4]=se,n[5]=fe,n[6]=Ce,n[7]=Me,n[8]=Ae,n[9]=Ee}finalize(){const{h:e,pad:i}=this,r=new Uint16Array(10);let s=e[1]>>>13;e[1]&=8191;for(let a=2;a<10;a++)e[a]+=s,s=e[a]>>>13,e[a]&=8191;e[0]+=s*5,s=e[0]>>>13,e[0]&=8191,e[1]+=s,s=e[1]>>>13,e[1]&=8191,e[2]+=s,r[0]=e[0]+5,s=r[0]>>>13,r[0]&=8191;for(let a=1;a<10;a++)r[a]=e[a]+s,s=r[a]>>>13,r[a]&=8191;r[9]-=8192;let n=(s^1)-1;for(let a=0;a<10;a++)r[a]&=n;n=~n;for(let a=0;a<10;a++)e[a]=e[a]&n|r[a];e[0]=(e[0]|e[1]<<13)&65535,e[1]=(e[1]>>>3|e[2]<<10)&65535,e[2]=(e[2]>>>6|e[3]<<7)&65535,e[3]=(e[3]>>>9|e[4]<<4)&65535,e[4]=(e[4]>>>12|e[5]<<1|e[6]<<14)&65535,e[5]=(e[6]>>>2|e[7]<<11)&65535,e[6]=(e[7]>>>5|e[8]<<8)&65535,e[7]=(e[8]>>>8|e[9]<<5)&65535;let o=e[0]+i[0];e[0]=o&65535;for(let a=1;a<8;a++)o=(e[a]+i[a]|0)+(o>>>16)|0,e[a]=o&65535;zn(r)}update(e){T0(this);const{buffer:i,blockLen:r}=this;e=Sh(e);const s=e.length;for(let n=0;n<s;){const o=Math.min(r-this.pos,s-n);if(o===r){for(;r<=s-n;n+=r)this.process(e,n);continue}i.set(e.subarray(n,n+o),this.pos),this.pos+=o,n+=o,this.pos===r&&(this.process(i,0,!1),this.pos=0)}return this}destroy(){zn(this.h,this.r,this.buffer,this.pad)}digestInto(e){T0(this),bv(e,this),this.finished=!0;const{buffer:i,h:r}=this;let{pos:s}=this;if(s){for(i[s++]=1;s<16;s++)i[s]=0;this.process(i,0,!0)}this.finalize();let n=0;for(let o=0;o<8;o++)e[n++]=r[o]>>>0,e[n++]=r[o]>>>8;return e}digest(){const{buffer:e,outputLen:i}=this;this.digestInto(e);const r=e.slice(0,i);return this.destroy(),r}};function Lv(t){const e=(r,s)=>t(s).update(Sh(r)).digest(),i=t(new Uint8Array(32));return e.outputLen=i.outputLen,e.blockLen=i.blockLen,e.create=r=>t(r),e}const Mv=Lv(t=>new Rv(t));function Bv(t,e,i,r,s,n=20){let o=t[0],a=t[1],c=t[2],l=t[3],u=e[0],d=e[1],h=e[2],p=e[3],g=e[4],f=e[5],w=e[6],m=e[7],y=s,b=i[0],v=i[1],S=i[2],N=o,P=a,k=c,_=l,M=u,L=d,U=h,K=p,I=g,E=f,x=w,T=m,O=y,R=b,B=v,F=S;for(let oe=0;oe<n;oe+=2)N=N+M|0,O=_e(O^N,16),I=I+O|0,M=_e(M^I,12),N=N+M|0,O=_e(O^N,8),I=I+O|0,M=_e(M^I,7),P=P+L|0,R=_e(R^P,16),E=E+R|0,L=_e(L^E,12),P=P+L|0,R=_e(R^P,8),E=E+R|0,L=_e(L^E,7),k=k+U|0,B=_e(B^k,16),x=x+B|0,U=_e(U^x,12),k=k+U|0,B=_e(B^k,8),x=x+B|0,U=_e(U^x,7),_=_+K|0,F=_e(F^_,16),T=T+F|0,K=_e(K^T,12),_=_+K|0,F=_e(F^_,8),T=T+F|0,K=_e(K^T,7),N=N+L|0,F=_e(F^N,16),x=x+F|0,L=_e(L^x,12),N=N+L|0,F=_e(F^N,8),x=x+F|0,L=_e(L^x,7),P=P+U|0,O=_e(O^P,16),T=T+O|0,U=_e(U^T,12),P=P+U|0,O=_e(O^P,8),T=T+O|0,U=_e(U^T,7),k=k+K|0,R=_e(R^k,16),I=I+R|0,K=_e(K^I,12),k=k+K|0,R=_e(R^k,8),I=I+R|0,K=_e(K^I,7),_=_+M|0,B=_e(B^_,16),E=E+B|0,M=_e(M^E,12),_=_+M|0,B=_e(B^_,8),E=E+B|0,M=_e(M^E,7);let G=0;r[G++]=o+N|0,r[G++]=a+P|0,r[G++]=c+k|0,r[G++]=l+_|0,r[G++]=u+M|0,r[G++]=d+L|0,r[G++]=h+U|0,r[G++]=p+K|0,r[G++]=g+I|0,r[G++]=f+E|0,r[G++]=w+x|0,r[G++]=m+T|0,r[G++]=y+O|0,r[G++]=b+R|0,r[G++]=v+B|0,r[G++]=S+F|0}const Uv=Tv(Bv,{counterRight:!1,counterLength:4,allowShortKeys:!1}),Dv=new Uint8Array(16),U0=(t,e)=>{t.update(e);const i=e.length%16;i&&t.update(Dv.subarray(i))},jv=new Uint8Array(32);function D0(t,e,i,r,s){const n=t(e,i,jv),o=Mv.create(n);s&&U0(o,s),U0(o,r);const a=new Uint8Array(16),c=vv(a);M0(c,0,BigInt(s?s.length:0),!0),M0(c,8,BigInt(r.length),!0),o.update(a);const l=o.digest();return zn(n,a),l}const zv=t=>(e,i,r)=>({encrypt(s,n){const o=s.length;n=L0(o+16,n,!1),n.set(s);const a=n.subarray(0,-16);t(e,i,a,a,1);const c=D0(t,e,i,a,r);return n.set(c,o),zn(c),n},decrypt(s,n){n=L0(s.length-16,n,!1);const o=s.subarray(0,-16),a=s.subarray(-16),c=D0(t,e,i,o,r);if(!Iv(a,c))throw new Error("invalid tag");return n.set(s.subarray(0,-16)),t(e,i,n,n,1),zn(c),n}}),pw=Av({blockSize:64,nonceLength:12,tagLength:16},zv(Uv));let gw=class extends Sp{constructor(e,i){super(),this.finished=!1,this.destroyed=!1,Np(e);const r=jn(i);if(this.iHash=e.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const s=this.blockLen,n=new Uint8Array(s);n.set(r.length>s?e.create().update(r).digest():r);for(let o=0;o<n.length;o++)n[o]^=54;this.iHash.update(n),this.oHash=e.create();for(let o=0;o<n.length;o++)n[o]^=106;this.oHash.update(n),n.fill(0)}update(e){return Dn(this),this.iHash.update(e),this}digestInto(e){Dn(this),Xa(e,this.outputLen),this.finished=!0,this.iHash.digestInto(e),this.oHash.update(e),this.oHash.digestInto(e),this.destroy()}digest(){const e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||(e=Object.create(Object.getPrototypeOf(this),{}));const{oHash:i,iHash:r,finished:s,destroyed:n,blockLen:o,outputLen:a}=this;return e=e,e.finished=s,e.destroyed=n,e.blockLen=o,e.outputLen=a,e.oHash=i._cloneInto(e.oHash),e.iHash=r._cloneInto(e.iHash),e}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}};const cu=(t,e,i)=>new gw(t,e).update(i).digest();cu.create=(t,e)=>new gw(t,e);function Fv(t,e,i){return Np(t),i===void 0&&(i=new Uint8Array(t.outputLen)),cu(t,jn(i),jn(e))}const Ru=new Uint8Array([0]),j0=new Uint8Array;function Hv(t,e,i,r=32){if(Np(t),fa(r),r>255*t.outputLen)throw new Error("Length should be <= 255*HashLen");const s=Math.ceil(r/t.outputLen);i===void 0&&(i=j0);const n=new Uint8Array(s*t.outputLen),o=cu.create(t,e),a=o._cloneInto(),c=new Uint8Array(o.outputLen);for(let l=0;l<s;l++)Ru[0]=l+1,a.update(l===0?j0:c).update(i).update(Ru).digestInto(c),n.set(c,t.outputLen*l),o._cloneInto(a);return o.destroy(),a.destroy(),c.fill(0),Ru.fill(0),n.slice(0,r)}const qv=(t,e,i,r,s)=>Hv(t,Fv(t,e,i),r,s);function Wv(t,e,i,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,i,r);const s=BigInt(32),n=BigInt(4294967295),o=Number(i>>s&n),a=Number(i&n),c=r?4:0,l=r?0:4;t.setUint32(e+c,o,r),t.setUint32(e+l,a,r)}function Vv(t,e,i){return t&e^~t&i}function Kv(t,e,i){return t&e^t&i^e&i}let Gv=class extends Sp{constructor(e,i,r,s){super(),this.blockLen=e,this.outputLen=i,this.padOffset=r,this.isLE=s,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(e),this.view=Ou(this.buffer)}update(e){Dn(this);const{view:i,buffer:r,blockLen:s}=this;e=jn(e);const n=e.length;for(let o=0;o<n;){const a=Math.min(s-this.pos,n-o);if(a===s){const c=Ou(e);for(;s<=n-o;o+=s)this.process(c,o);continue}r.set(e.subarray(o,o+a),this.pos),this.pos+=a,o+=a,this.pos===s&&(this.process(i,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){Dn(this),tw(e,this),this.finished=!0;const{buffer:i,view:r,blockLen:s,isLE:n}=this;let{pos:o}=this;i[o++]=128,this.buffer.subarray(o).fill(0),this.padOffset>s-o&&(this.process(r,0),o=0);for(let d=o;d<s;d++)i[d]=0;Wv(r,s-8,BigInt(this.length*8),n),this.process(r,0);const a=Ou(e),c=this.outputLen;if(c%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const l=c/4,u=this.get();if(l>u.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<l;d++)a.setUint32(4*d,u[d],n)}digest(){const{buffer:e,outputLen:i}=this;this.digestInto(e);const r=e.slice(0,i);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());const{blockLen:i,buffer:r,length:s,finished:n,destroyed:o,pos:a}=this;return e.length=s,e.pos=a,e.finished=n,e.destroyed=o,s%i&&e.buffer.set(r),e}};const Zv=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),_r=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Nr=new Uint32Array(64);let Yv=class extends Gv{constructor(){super(64,32,8,!1),this.A=_r[0]|0,this.B=_r[1]|0,this.C=_r[2]|0,this.D=_r[3]|0,this.E=_r[4]|0,this.F=_r[5]|0,this.G=_r[6]|0,this.H=_r[7]|0}get(){const{A:e,B:i,C:r,D:s,E:n,F:o,G:a,H:c}=this;return[e,i,r,s,n,o,a,c]}set(e,i,r,s,n,o,a,c){this.A=e|0,this.B=i|0,this.C=r|0,this.D=s|0,this.E=n|0,this.F=o|0,this.G=a|0,this.H=c|0}process(e,i){for(let d=0;d<16;d++,i+=4)Nr[d]=e.getUint32(i,!1);for(let d=16;d<64;d++){const h=Nr[d-15],p=Nr[d-2],g=Mi(h,7)^Mi(h,18)^h>>>3,f=Mi(p,17)^Mi(p,19)^p>>>10;Nr[d]=f+Nr[d-7]+g+Nr[d-16]|0}let{A:r,B:s,C:n,D:o,E:a,F:c,G:l,H:u}=this;for(let d=0;d<64;d++){const h=Mi(a,6)^Mi(a,11)^Mi(a,25),p=u+h+Vv(a,c,l)+Zv[d]+Nr[d]|0,g=(Mi(r,2)^Mi(r,13)^Mi(r,22))+Kv(r,s,n)|0;u=l,l=c,c=a,a=o+p|0,o=n,n=s,s=r,r=p+g|0}r=r+this.A|0,s=s+this.B|0,n=n+this.C|0,o=o+this.D|0,a=a+this.E|0,c=c+this.F|0,l=l+this.G|0,u=u+this.H|0,this.set(r,s,n,o,a,c,l,u)}roundClean(){Nr.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}};const Qa=iw(()=>new Yv);/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const lu=BigInt(0),uu=BigInt(1),Jv=BigInt(2);function zs(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function ec(t){if(!zs(t))throw new Error("Uint8Array expected")}function Fn(t,e){if(typeof e!="boolean")throw new Error(t+" boolean expected, got "+e)}const Xv=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Hn(t){ec(t);let e="";for(let i=0;i<t.length;i++)e+=Xv[t[i]];return e}function Tn(t){const e=t.toString(16);return e.length&1?"0"+e:e}function kp(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);return t===""?lu:BigInt("0x"+t)}const Qi={_0:48,_9:57,A:65,F:70,a:97,f:102};function z0(t){if(t>=Qi._0&&t<=Qi._9)return t-Qi._0;if(t>=Qi.A&&t<=Qi.F)return t-(Qi.A-10);if(t>=Qi.a&&t<=Qi.f)return t-(Qi.a-10)}function qn(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);const e=t.length,i=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);const r=new Uint8Array(i);for(let s=0,n=0;s<i;s++,n+=2){const o=z0(t.charCodeAt(n)),a=z0(t.charCodeAt(n+1));if(o===void 0||a===void 0){const c=t[n]+t[n+1];throw new Error('hex string expected, got non-hex character "'+c+'" at index '+n)}r[s]=o*16+a}return r}function Os(t){return kp(Hn(t))}function ma(t){return ec(t),kp(Hn(Uint8Array.from(t).reverse()))}function Wn(t,e){return qn(t.toString(16).padStart(e*2,"0"))}function du(t,e){return Wn(t,e).reverse()}function Qv(t){return qn(Tn(t))}function ei(t,e,i){let r;if(typeof e=="string")try{r=qn(e)}catch(n){throw new Error(t+" must be hex string or Uint8Array, cause: "+n)}else if(zs(e))r=Uint8Array.from(e);else throw new Error(t+" must be hex string or Uint8Array");const s=r.length;if(typeof i=="number"&&s!==i)throw new Error(t+" of length "+i+" expected, got "+s);return r}function ya(...t){let e=0;for(let r=0;r<t.length;r++){const s=t[r];ec(s),e+=s.length}const i=new Uint8Array(e);for(let r=0,s=0;r<t.length;r++){const n=t[r];i.set(n,s),s+=n.length}return i}function e3(t,e){if(t.length!==e.length)return!1;let i=0;for(let r=0;r<t.length;r++)i|=t[r]^e[r];return i===0}function t3(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}const Lu=t=>typeof t=="bigint"&&lu<=t;function hu(t,e,i){return Lu(t)&&Lu(e)&&Lu(i)&&e<=t&&t<i}function yr(t,e,i,r){if(!hu(e,i,r))throw new Error("expected valid "+t+": "+i+" <= n < "+r+", got "+e)}function fw(t){let e;for(e=0;t>lu;t>>=uu,e+=1);return e}function i3(t,e){return t>>BigInt(e)&uu}function r3(t,e,i){return t|(i?uu:lu)<<BigInt(e)}const Pp=t=>(Jv<<BigInt(t-1))-uu,Mu=t=>new Uint8Array(t),F0=t=>Uint8Array.from(t);function ww(t,e,i){if(typeof t!="number"||t<2)throw new Error("hashLen must be a number");if(typeof e!="number"||e<2)throw new Error("qByteLen must be a number");if(typeof i!="function")throw new Error("hmacFn must be a function");let r=Mu(t),s=Mu(t),n=0;const o=()=>{r.fill(1),s.fill(0),n=0},a=(...u)=>i(s,r,...u),c=(u=Mu())=>{s=a(F0([0]),u),r=a(),u.length!==0&&(s=a(F0([1]),u),r=a())},l=()=>{if(n++>=1e3)throw new Error("drbg: tried 1000 values");let u=0;const d=[];for(;u<e;){r=a();const h=r.slice();d.push(h),u+=r.length}return ya(...d)};return(u,d)=>{o(),c(u);let h;for(;!(h=d(l()));)c();return o(),h}}const s3={bigint:t=>typeof t=="bigint",function:t=>typeof t=="function",boolean:t=>typeof t=="boolean",string:t=>typeof t=="string",stringOrUint8Array:t=>typeof t=="string"||zs(t),isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>typeof t=="function"&&Number.isSafeInteger(t.outputLen)};function oo(t,e,i={}){const r=(s,n,o)=>{const a=s3[n];if(typeof a!="function")throw new Error("invalid validator function");const c=t[s];if(!(o&&c===void 0)&&!a(c,t))throw new Error("param "+String(s)+" is invalid. Expected "+n+", got "+c)};for(const[s,n]of Object.entries(e))r(s,n,!1);for(const[s,n]of Object.entries(i))r(s,n,!0);return t}const n3=()=>{throw new Error("not implemented")};function Ph(t){const e=new WeakMap;return(i,...r)=>{const s=e.get(i);if(s!==void 0)return s;const n=t(i,...r);return e.set(i,n),n}}var o3=Object.freeze({__proto__:null,isBytes:zs,abytes:ec,abool:Fn,bytesToHex:Hn,numberToHexUnpadded:Tn,hexToNumber:kp,hexToBytes:qn,bytesToNumberBE:Os,bytesToNumberLE:ma,numberToBytesBE:Wn,numberToBytesLE:du,numberToVarBytesBE:Qv,ensureBytes:ei,concatBytes:ya,equalBytes:e3,utf8ToBytes:t3,inRange:hu,aInRange:yr,bitLen:fw,bitGet:i3,bitSet:r3,bitMask:Pp,createHmacDrbg:ww,validateObject:oo,notImplemented:n3,memoized:Ph});const gt=BigInt(0),Ye=BigInt(1),Es=BigInt(2),a3=BigInt(3),Oh=BigInt(4),H0=BigInt(5),q0=BigInt(8);function Ft(t,e){const i=t%e;return i>=gt?i:e+i}function mw(t,e,i){if(e<gt)throw new Error("invalid exponent, negatives unsupported");if(i<=gt)throw new Error("invalid modulus");if(i===Ye)return gt;let r=Ye;for(;e>gt;)e&Ye&&(r=r*t%i),t=t*t%i,e>>=Ye;return r}function ki(t,e,i){let r=t;for(;e-- >gt;)r*=r,r%=i;return r}function Th(t,e){if(t===gt)throw new Error("invert: expected non-zero number");if(e<=gt)throw new Error("invert: expected positive modulus, got "+e);let i=Ft(t,e),r=e,s=gt,n=Ye;for(;i!==gt;){const o=r/i,a=r%i,c=s-n*o;r=i,i=a,s=n,n=c}if(r!==Ye)throw new Error("invert: does not exist");return Ft(s,e)}function c3(t){const e=(t-Ye)/Es;let i,r,s;for(i=t-Ye,r=0;i%Es===gt;i/=Es,r++);for(s=Es;s<t&&mw(s,e,t)!==t-Ye;s++)if(s>1e3)throw new Error("Cannot find square root: likely non-prime P");if(r===1){const o=(t+Ye)/Oh;return function(a,c){const l=a.pow(c,o);if(!a.eql(a.sqr(l),c))throw new Error("Cannot find square root");return l}}const n=(i+Ye)/Es;return function(o,a){if(o.pow(a,e)===o.neg(o.ONE))throw new Error("Cannot find square root");let c=r,l=o.pow(o.mul(o.ONE,s),i),u=o.pow(a,n),d=o.pow(a,i);for(;!o.eql(d,o.ONE);){if(o.eql(d,o.ZERO))return o.ZERO;let h=1;for(let g=o.sqr(d);h<c&&!o.eql(g,o.ONE);h++)g=o.sqr(g);const p=o.pow(l,Ye<<BigInt(c-h-1));l=o.sqr(p),u=o.mul(u,p),d=o.mul(d,l),c=h}return u}}function l3(t){if(t%Oh===a3){const e=(t+Ye)/Oh;return function(i,r){const s=i.pow(r,e);if(!i.eql(i.sqr(s),r))throw new Error("Cannot find square root");return s}}if(t%q0===H0){const e=(t-H0)/q0;return function(i,r){const s=i.mul(r,Es),n=i.pow(s,e),o=i.mul(r,n),a=i.mul(i.mul(o,Es),n),c=i.mul(o,i.sub(a,i.ONE));if(!i.eql(i.sqr(c),r))throw new Error("Cannot find square root");return c}}return c3(t)}const u3=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function d3(t){const e={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},i=u3.reduce((r,s)=>(r[s]="function",r),e);return oo(t,i)}function h3(t,e,i){if(i<gt)throw new Error("invalid exponent, negatives unsupported");if(i===gt)return t.ONE;if(i===Ye)return e;let r=t.ONE,s=e;for(;i>gt;)i&Ye&&(r=t.mul(r,s)),s=t.sqr(s),i>>=Ye;return r}function p3(t,e){const i=new Array(e.length),r=e.reduce((n,o,a)=>t.is0(o)?n:(i[a]=n,t.mul(n,o)),t.ONE),s=t.inv(r);return e.reduceRight((n,o,a)=>t.is0(o)?n:(i[a]=t.mul(n,i[a]),t.mul(n,o)),s),i}function yw(t,e){const i=e!==void 0?e:t.toString(2).length,r=Math.ceil(i/8);return{nBitLength:i,nByteLength:r}}function bw(t,e,i=!1,r={}){if(t<=gt)throw new Error("invalid field: expected ORDER > 0, got "+t);const{nBitLength:s,nByteLength:n}=yw(t,e);if(n>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");let o;const a=Object.freeze({ORDER:t,isLE:i,BITS:s,BYTES:n,MASK:Pp(s),ZERO:gt,ONE:Ye,create:c=>Ft(c,t),isValid:c=>{if(typeof c!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof c);return gt<=c&&c<t},is0:c=>c===gt,isOdd:c=>(c&Ye)===Ye,neg:c=>Ft(-c,t),eql:(c,l)=>c===l,sqr:c=>Ft(c*c,t),add:(c,l)=>Ft(c+l,t),sub:(c,l)=>Ft(c-l,t),mul:(c,l)=>Ft(c*l,t),pow:(c,l)=>h3(a,c,l),div:(c,l)=>Ft(c*Th(l,t),t),sqrN:c=>c*c,addN:(c,l)=>c+l,subN:(c,l)=>c-l,mulN:(c,l)=>c*l,inv:c=>Th(c,t),sqrt:r.sqrt||(c=>(o||(o=l3(t)),o(a,c))),invertBatch:c=>p3(a,c),cmov:(c,l,u)=>u?l:c,toBytes:c=>i?du(c,n):Wn(c,n),fromBytes:c=>{if(c.length!==n)throw new Error("Field.fromBytes: expected "+n+" bytes, got "+c.length);return i?ma(c):Os(c)}});return Object.freeze(a)}function vw(t){if(typeof t!="bigint")throw new Error("field order must be bigint");const e=t.toString(2).length;return Math.ceil(e/8)}function Cw(t){const e=vw(t);return e+Math.ceil(e/2)}function g3(t,e,i=!1){const r=t.length,s=vw(e),n=Cw(e);if(r<16||r<n||r>1024)throw new Error("expected "+n+"-1024 bytes of input, got "+r);const o=i?ma(t):Os(t),a=Ft(o,e-Ye)+Ye;return i?du(a,s):Wn(a,s)}const W0=BigInt(0),mc=BigInt(1);function Bu(t,e){const i=e.negate();return t?i:e}function Ew(t,e){if(!Number.isSafeInteger(t)||t<=0||t>e)throw new Error("invalid window size, expected [1.."+e+"], got W="+t)}function Uu(t,e){Ew(t,e);const i=Math.ceil(e/t)+1,r=2**(t-1);return{windows:i,windowSize:r}}function f3(t,e){if(!Array.isArray(t))throw new Error("array expected");t.forEach((i,r)=>{if(!(i instanceof e))throw new Error("invalid point at index "+r)})}function w3(t,e){if(!Array.isArray(t))throw new Error("array of scalars expected");t.forEach((i,r)=>{if(!e.isValid(i))throw new Error("invalid scalar at index "+r)})}const Du=new WeakMap,xw=new WeakMap;function ju(t){return xw.get(t)||1}function m3(t,e){return{constTimeNegate:Bu,hasPrecomputes(i){return ju(i)!==1},unsafeLadder(i,r,s=t.ZERO){let n=i;for(;r>W0;)r&mc&&(s=s.add(n)),n=n.double(),r>>=mc;return s},precomputeWindow(i,r){const{windows:s,windowSize:n}=Uu(r,e),o=[];let a=i,c=a;for(let l=0;l<s;l++){c=a,o.push(c);for(let u=1;u<n;u++)c=c.add(a),o.push(c);a=c.double()}return o},wNAF(i,r,s){const{windows:n,windowSize:o}=Uu(i,e);let a=t.ZERO,c=t.BASE;const l=BigInt(2**i-1),u=2**i,d=BigInt(i);for(let h=0;h<n;h++){const p=h*o;let g=Number(s&l);s>>=d,g>o&&(g-=u,s+=mc);const f=p,w=p+Math.abs(g)-1,m=h%2!==0,y=g<0;g===0?c=c.add(Bu(m,r[f])):a=a.add(Bu(y,r[w]))}return{p:a,f:c}},wNAFUnsafe(i,r,s,n=t.ZERO){const{windows:o,windowSize:a}=Uu(i,e),c=BigInt(2**i-1),l=2**i,u=BigInt(i);for(let d=0;d<o;d++){const h=d*a;if(s===W0)break;let p=Number(s&c);if(s>>=u,p>a&&(p-=l,s+=mc),p===0)continue;let g=r[h+Math.abs(p)-1];p<0&&(g=g.negate()),n=n.add(g)}return n},getPrecomputes(i,r,s){let n=Du.get(r);return n||(n=this.precomputeWindow(r,i),i!==1&&Du.set(r,s(n))),n},wNAFCached(i,r,s){const n=ju(i);return this.wNAF(n,this.getPrecomputes(n,i,s),r)},wNAFCachedUnsafe(i,r,s,n){const o=ju(i);return o===1?this.unsafeLadder(i,r,n):this.wNAFUnsafe(o,this.getPrecomputes(o,i,s),r,n)},setWindowSize(i,r){Ew(r,e),xw.set(i,r),Du.delete(i)}}}function y3(t,e,i,r){if(f3(i,t),w3(r,e),i.length!==r.length)throw new Error("arrays of points and scalars must have equal length");const s=t.ZERO,n=fw(BigInt(i.length)),o=n>12?n-3:n>4?n-2:n?2:1,a=(1<<o)-1,c=new Array(a+1).fill(s),l=Math.floor((e.BITS-1)/o)*o;let u=s;for(let d=l;d>=0;d-=o){c.fill(s);for(let p=0;p<r.length;p++){const g=r[p],f=Number(g>>BigInt(d)&BigInt(a));c[f]=c[f].add(i[p])}let h=s;for(let p=c.length-1,g=s;p>0;p--)g=g.add(c[p]),h=h.add(g);if(u=u.add(h),d!==0)for(let p=0;p<o;p++)u=u.double()}return u}function Iw(t){return d3(t.Fp),oo(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...yw(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}BigInt(0),BigInt(1),BigInt(2),BigInt(8);const Qs=BigInt(0),zu=BigInt(1);function b3(t){return oo(t,{a:"bigint"},{montgomeryBits:"isSafeInteger",nByteLength:"isSafeInteger",adjustScalarBytes:"function",domain:"function",powPminus2:"function",Gu:"bigint"}),Object.freeze({...t})}function v3(t){const e=b3(t),{P:i}=e,r=y=>Ft(y,i),s=e.montgomeryBits,n=Math.ceil(s/8),o=e.nByteLength,a=e.adjustScalarBytes||(y=>y),c=e.powPminus2||(y=>mw(y,i-BigInt(2),i));function l(y,b,v){const S=r(y*(b-v));return b=r(b-S),v=r(v+S),[b,v]}const u=(e.a-BigInt(2))/BigInt(4);function d(y,b){yr("u",y,Qs,i),yr("scalar",b,Qs,i);const v=b,S=y;let N=zu,P=Qs,k=y,_=zu,M=Qs,L;for(let K=BigInt(s-1);K>=Qs;K--){const I=v>>K&zu;M^=I,L=l(M,N,k),N=L[0],k=L[1],L=l(M,P,_),P=L[0],_=L[1],M=I;const E=N+P,x=r(E*E),T=N-P,O=r(T*T),R=x-O,B=k+_,F=k-_,G=r(F*E),oe=r(B*T),se=G+oe,fe=G-oe;k=r(se*se),_=r(S*r(fe*fe)),N=r(x*O),P=r(R*(x+r(u*R)))}L=l(M,N,k),N=L[0],k=L[1],L=l(M,P,_),P=L[0],_=L[1];const U=c(P);return r(N*U)}function h(y){return du(r(y),n)}function p(y){const b=ei("u coordinate",y,n);return o===32&&(b[31]&=127),ma(b)}function g(y){const b=ei("scalar",y),v=b.length;if(v!==n&&v!==o){let S=""+n+" or "+o;throw new Error("invalid scalar, expected "+S+" bytes, got "+v)}return ma(a(b))}function f(y,b){const v=p(b),S=g(y),N=d(v,S);if(N===Qs)throw new Error("invalid private or public key received");return h(N)}const w=h(e.Gu);function m(y){return f(y,w)}return{scalarMult:f,scalarMultBase:m,getSharedSecret:(y,b)=>f(y,b),getPublicKey:y=>m(y),utils:{randomPrivateKey:()=>e.randomBytes(e.nByteLength)},GuBytes:w}}const Rh=BigInt("57896044618658097711785492504343953926634992332820282019728792003956564819949");BigInt(0);const C3=BigInt(1),V0=BigInt(2),E3=BigInt(3),x3=BigInt(5);BigInt(8);function I3(t){const e=BigInt(10),i=BigInt(20),r=BigInt(40),s=BigInt(80),n=Rh,o=t*t%n*t%n,a=ki(o,V0,n)*o%n,c=ki(a,C3,n)*t%n,l=ki(c,x3,n)*c%n,u=ki(l,e,n)*l%n,d=ki(u,i,n)*u%n,h=ki(d,r,n)*d%n,p=ki(h,s,n)*h%n,g=ki(p,s,n)*h%n,f=ki(g,e,n)*l%n;return{pow_p_5_8:ki(f,V0,n)*t%n,b2:o}}function A3(t){return t[0]&=248,t[31]&=127,t[31]|=64,t}const Lh=v3({P:Rh,a:BigInt(486662),montgomeryBits:255,nByteLength:32,Gu:BigInt(9),powPminus2:t=>{const e=Rh,{pow_p_5_8:i,b2:r}=I3(t);return Ft(ki(i,E3,e)*r,e)},adjustScalarBytes:A3,randomBytes:no});function K0(t){t.lowS!==void 0&&Fn("lowS",t.lowS),t.prehash!==void 0&&Fn("prehash",t.prehash)}function _3(t){const e=Iw(t);oo(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:i,Fp:r,a:s}=e;if(i){if(!r.eql(s,r.ZERO))throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");if(typeof i!="object"||typeof i.beta!="bigint"||typeof i.splitScalar!="function")throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function")}return Object.freeze({...e})}const{bytesToNumberBE:N3,hexToBytes:S3}=o3;let $3=class extends Error{constructor(e=""){super(e)}};const pr={Err:$3,_tlv:{encode:(t,e)=>{const{Err:i}=pr;if(t<0||t>256)throw new i("tlv.encode: wrong tag");if(e.length&1)throw new i("tlv.encode: unpadded data");const r=e.length/2,s=Tn(r);if(s.length/2&128)throw new i("tlv.encode: long form length too big");const n=r>127?Tn(s.length/2|128):"";return Tn(t)+n+s+e},decode(t,e){const{Err:i}=pr;let r=0;if(t<0||t>256)throw new i("tlv.encode: wrong tag");if(e.length<2||e[r++]!==t)throw new i("tlv.decode: wrong tlv");const s=e[r++],n=!!(s&128);let o=0;if(!n)o=s;else{const c=s&127;if(!c)throw new i("tlv.decode(long): indefinite length not supported");if(c>4)throw new i("tlv.decode(long): byte length is too big");const l=e.subarray(r,r+c);if(l.length!==c)throw new i("tlv.decode: length bytes not complete");if(l[0]===0)throw new i("tlv.decode(long): zero leftmost byte");for(const u of l)o=o<<8|u;if(r+=c,o<128)throw new i("tlv.decode(long): not minimal encoding")}const a=e.subarray(r,r+o);if(a.length!==o)throw new i("tlv.decode: wrong value length");return{v:a,l:e.subarray(r+o)}}},_int:{encode(t){const{Err:e}=pr;if(t<fr)throw new e("integer: negative integers are not allowed");let i=Tn(t);if(Number.parseInt(i[0],16)&8&&(i="00"+i),i.length&1)throw new e("unexpected DER parsing assertion: unpadded hex");return i},decode(t){const{Err:e}=pr;if(t[0]&128)throw new e("invalid signature integer: negative");if(t[0]===0&&!(t[1]&128))throw new e("invalid signature integer: unnecessary leading zero");return N3(t)}},toSig(t){const{Err:e,_int:i,_tlv:r}=pr,s=typeof t=="string"?S3(t):t;ec(s);const{v:n,l:o}=r.decode(48,s);if(o.length)throw new e("invalid signature: left bytes after parsing");const{v:a,l:c}=r.decode(2,n),{v:l,l:u}=r.decode(2,c);if(u.length)throw new e("invalid signature: left bytes after parsing");return{r:i.decode(a),s:i.decode(l)}},hexFromSig(t){const{_tlv:e,_int:i}=pr,r=e.encode(2,i.encode(t.r)),s=e.encode(2,i.encode(t.s)),n=r+s;return e.encode(48,n)}},fr=BigInt(0),ut=BigInt(1);BigInt(2);const G0=BigInt(3);BigInt(4);function k3(t){const e=_3(t),{Fp:i}=e,r=bw(e.n,e.nBitLength),s=e.toBytes||((f,w,m)=>{const y=w.toAffine();return ya(Uint8Array.from([4]),i.toBytes(y.x),i.toBytes(y.y))}),n=e.fromBytes||(f=>{const w=f.subarray(1),m=i.fromBytes(w.subarray(0,i.BYTES)),y=i.fromBytes(w.subarray(i.BYTES,2*i.BYTES));return{x:m,y}});function o(f){const{a:w,b:m}=e,y=i.sqr(f),b=i.mul(y,f);return i.add(i.add(b,i.mul(f,w)),m)}if(!i.eql(i.sqr(e.Gy),o(e.Gx)))throw new Error("bad generator point: equation left != right");function a(f){return hu(f,ut,e.n)}function c(f){const{allowedPrivateKeyLengths:w,nByteLength:m,wrapPrivateKey:y,n:b}=e;if(w&&typeof f!="bigint"){if(zs(f)&&(f=Hn(f)),typeof f!="string"||!w.includes(f.length))throw new Error("invalid private key");f=f.padStart(m*2,"0")}let v;try{v=typeof f=="bigint"?f:Os(ei("private key",f,m))}catch{throw new Error("invalid private key, expected hex or "+m+" bytes, got "+typeof f)}return y&&(v=Ft(v,b)),yr("private key",v,ut,b),v}function l(f){if(!(f instanceof h))throw new Error("ProjectivePoint expected")}const u=Ph((f,w)=>{const{px:m,py:y,pz:b}=f;if(i.eql(b,i.ONE))return{x:m,y};const v=f.is0();w==null&&(w=v?i.ONE:i.inv(b));const S=i.mul(m,w),N=i.mul(y,w),P=i.mul(b,w);if(v)return{x:i.ZERO,y:i.ZERO};if(!i.eql(P,i.ONE))throw new Error("invZ was invalid");return{x:S,y:N}}),d=Ph(f=>{if(f.is0()){if(e.allowInfinityPoint&&!i.is0(f.py))return;throw new Error("bad point: ZERO")}const{x:w,y:m}=f.toAffine();if(!i.isValid(w)||!i.isValid(m))throw new Error("bad point: x or y not FE");const y=i.sqr(m),b=o(w);if(!i.eql(y,b))throw new Error("bad point: equation left != right");if(!f.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});class h{constructor(w,m,y){if(this.px=w,this.py=m,this.pz=y,w==null||!i.isValid(w))throw new Error("x required");if(m==null||!i.isValid(m))throw new Error("y required");if(y==null||!i.isValid(y))throw new Error("z required");Object.freeze(this)}static fromAffine(w){const{x:m,y}=w||{};if(!w||!i.isValid(m)||!i.isValid(y))throw new Error("invalid affine point");if(w instanceof h)throw new Error("projective point not allowed");const b=v=>i.eql(v,i.ZERO);return b(m)&&b(y)?h.ZERO:new h(m,y,i.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(w){const m=i.invertBatch(w.map(y=>y.pz));return w.map((y,b)=>y.toAffine(m[b])).map(h.fromAffine)}static fromHex(w){const m=h.fromAffine(n(ei("pointHex",w)));return m.assertValidity(),m}static fromPrivateKey(w){return h.BASE.multiply(c(w))}static msm(w,m){return y3(h,r,w,m)}_setWindowSize(w){g.setWindowSize(this,w)}assertValidity(){d(this)}hasEvenY(){const{y:w}=this.toAffine();if(i.isOdd)return!i.isOdd(w);throw new Error("Field doesn't support isOdd")}equals(w){l(w);const{px:m,py:y,pz:b}=this,{px:v,py:S,pz:N}=w,P=i.eql(i.mul(m,N),i.mul(v,b)),k=i.eql(i.mul(y,N),i.mul(S,b));return P&&k}negate(){return new h(this.px,i.neg(this.py),this.pz)}double(){const{a:w,b:m}=e,y=i.mul(m,G0),{px:b,py:v,pz:S}=this;let N=i.ZERO,P=i.ZERO,k=i.ZERO,_=i.mul(b,b),M=i.mul(v,v),L=i.mul(S,S),U=i.mul(b,v);return U=i.add(U,U),k=i.mul(b,S),k=i.add(k,k),N=i.mul(w,k),P=i.mul(y,L),P=i.add(N,P),N=i.sub(M,P),P=i.add(M,P),P=i.mul(N,P),N=i.mul(U,N),k=i.mul(y,k),L=i.mul(w,L),U=i.sub(_,L),U=i.mul(w,U),U=i.add(U,k),k=i.add(_,_),_=i.add(k,_),_=i.add(_,L),_=i.mul(_,U),P=i.add(P,_),L=i.mul(v,S),L=i.add(L,L),_=i.mul(L,U),N=i.sub(N,_),k=i.mul(L,M),k=i.add(k,k),k=i.add(k,k),new h(N,P,k)}add(w){l(w);const{px:m,py:y,pz:b}=this,{px:v,py:S,pz:N}=w;let P=i.ZERO,k=i.ZERO,_=i.ZERO;const M=e.a,L=i.mul(e.b,G0);let U=i.mul(m,v),K=i.mul(y,S),I=i.mul(b,N),E=i.add(m,y),x=i.add(v,S);E=i.mul(E,x),x=i.add(U,K),E=i.sub(E,x),x=i.add(m,b);let T=i.add(v,N);return x=i.mul(x,T),T=i.add(U,I),x=i.sub(x,T),T=i.add(y,b),P=i.add(S,N),T=i.mul(T,P),P=i.add(K,I),T=i.sub(T,P),_=i.mul(M,x),P=i.mul(L,I),_=i.add(P,_),P=i.sub(K,_),_=i.add(K,_),k=i.mul(P,_),K=i.add(U,U),K=i.add(K,U),I=i.mul(M,I),x=i.mul(L,x),K=i.add(K,I),I=i.sub(U,I),I=i.mul(M,I),x=i.add(x,I),U=i.mul(K,x),k=i.add(k,U),U=i.mul(T,x),P=i.mul(E,P),P=i.sub(P,U),U=i.mul(E,K),_=i.mul(T,_),_=i.add(_,U),new h(P,k,_)}subtract(w){return this.add(w.negate())}is0(){return this.equals(h.ZERO)}wNAF(w){return g.wNAFCached(this,w,h.normalizeZ)}multiplyUnsafe(w){const{endo:m,n:y}=e;yr("scalar",w,fr,y);const b=h.ZERO;if(w===fr)return b;if(this.is0()||w===ut)return this;if(!m||g.hasPrecomputes(this))return g.wNAFCachedUnsafe(this,w,h.normalizeZ);let{k1neg:v,k1:S,k2neg:N,k2:P}=m.splitScalar(w),k=b,_=b,M=this;for(;S>fr||P>fr;)S&ut&&(k=k.add(M)),P&ut&&(_=_.add(M)),M=M.double(),S>>=ut,P>>=ut;return v&&(k=k.negate()),N&&(_=_.negate()),_=new h(i.mul(_.px,m.beta),_.py,_.pz),k.add(_)}multiply(w){const{endo:m,n:y}=e;yr("scalar",w,ut,y);let b,v;if(m){const{k1neg:S,k1:N,k2neg:P,k2:k}=m.splitScalar(w);let{p:_,f:M}=this.wNAF(N),{p:L,f:U}=this.wNAF(k);_=g.constTimeNegate(S,_),L=g.constTimeNegate(P,L),L=new h(i.mul(L.px,m.beta),L.py,L.pz),b=_.add(L),v=M.add(U)}else{const{p:S,f:N}=this.wNAF(w);b=S,v=N}return h.normalizeZ([b,v])[0]}multiplyAndAddUnsafe(w,m,y){const b=h.BASE,v=(N,P)=>P===fr||P===ut||!N.equals(b)?N.multiplyUnsafe(P):N.multiply(P),S=v(this,m).add(v(w,y));return S.is0()?void 0:S}toAffine(w){return u(this,w)}isTorsionFree(){const{h:w,isTorsionFree:m}=e;if(w===ut)return!0;if(m)return m(h,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:w,clearCofactor:m}=e;return w===ut?this:m?m(h,this):this.multiplyUnsafe(e.h)}toRawBytes(w=!0){return Fn("isCompressed",w),this.assertValidity(),s(h,this,w)}toHex(w=!0){return Fn("isCompressed",w),Hn(this.toRawBytes(w))}}h.BASE=new h(e.Gx,e.Gy,i.ONE),h.ZERO=new h(i.ZERO,i.ONE,i.ZERO);const p=e.nBitLength,g=m3(h,e.endo?Math.ceil(p/2):p);return{CURVE:e,ProjectivePoint:h,normPrivateKeyToScalar:c,weierstrassEquation:o,isWithinCurveOrder:a}}function P3(t){const e=Iw(t);return oo(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}function O3(t){const e=P3(t),{Fp:i,n:r}=e,s=i.BYTES+1,n=2*i.BYTES+1;function o(I){return Ft(I,r)}function a(I){return Th(I,r)}const{ProjectivePoint:c,normPrivateKeyToScalar:l,weierstrassEquation:u,isWithinCurveOrder:d}=k3({...e,toBytes(I,E,x){const T=E.toAffine(),O=i.toBytes(T.x),R=ya;return Fn("isCompressed",x),x?R(Uint8Array.from([E.hasEvenY()?2:3]),O):R(Uint8Array.from([4]),O,i.toBytes(T.y))},fromBytes(I){const E=I.length,x=I[0],T=I.subarray(1);if(E===s&&(x===2||x===3)){const O=Os(T);if(!hu(O,ut,i.ORDER))throw new Error("Point is not on curve");const R=u(O);let B;try{B=i.sqrt(R)}catch(G){const oe=G instanceof Error?": "+G.message:"";throw new Error("Point is not on curve"+oe)}const F=(B&ut)===ut;return(x&1)===1!==F&&(B=i.neg(B)),{x:O,y:B}}else if(E===n&&x===4){const O=i.fromBytes(T.subarray(0,i.BYTES)),R=i.fromBytes(T.subarray(i.BYTES,2*i.BYTES));return{x:O,y:R}}else{const O=s,R=n;throw new Error("invalid Point, expected length of "+O+", or uncompressed "+R+", got "+E)}}}),h=I=>Hn(Wn(I,e.nByteLength));function p(I){const E=r>>ut;return I>E}function g(I){return p(I)?o(-I):I}const f=(I,E,x)=>Os(I.slice(E,x));class w{constructor(E,x,T){this.r=E,this.s=x,this.recovery=T,this.assertValidity()}static fromCompact(E){const x=e.nByteLength;return E=ei("compactSignature",E,x*2),new w(f(E,0,x),f(E,x,2*x))}static fromDER(E){const{r:x,s:T}=pr.toSig(ei("DER",E));return new w(x,T)}assertValidity(){yr("r",this.r,ut,r),yr("s",this.s,ut,r)}addRecoveryBit(E){return new w(this.r,this.s,E)}recoverPublicKey(E){const{r:x,s:T,recovery:O}=this,R=N(ei("msgHash",E));if(O==null||![0,1,2,3].includes(O))throw new Error("recovery id invalid");const B=O===2||O===3?x+e.n:x;if(B>=i.ORDER)throw new Error("recovery id 2 or 3 invalid");const F=O&1?"03":"02",G=c.fromHex(F+h(B)),oe=a(B),se=o(-R*oe),fe=o(T*oe),Ce=c.BASE.multiplyAndAddUnsafe(G,se,fe);if(!Ce)throw new Error("point at infinify");return Ce.assertValidity(),Ce}hasHighS(){return p(this.s)}normalizeS(){return this.hasHighS()?new w(this.r,o(-this.s),this.recovery):this}toDERRawBytes(){return qn(this.toDERHex())}toDERHex(){return pr.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return qn(this.toCompactHex())}toCompactHex(){return h(this.r)+h(this.s)}}const m={isValidPrivateKey(I){try{return l(I),!0}catch{return!1}},normPrivateKeyToScalar:l,randomPrivateKey:()=>{const I=Cw(e.n);return g3(e.randomBytes(I),e.n)},precompute(I=8,E=c.BASE){return E._setWindowSize(I),E.multiply(BigInt(3)),E}};function y(I,E=!0){return c.fromPrivateKey(I).toRawBytes(E)}function b(I){const E=zs(I),x=typeof I=="string",T=(E||x)&&I.length;return E?T===s||T===n:x?T===2*s||T===2*n:I instanceof c}function v(I,E,x=!0){if(b(I))throw new Error("first arg must be private key");if(!b(E))throw new Error("second arg must be public key");return c.fromHex(E).multiply(l(I)).toRawBytes(x)}const S=e.bits2int||function(I){if(I.length>8192)throw new Error("input is too large");const E=Os(I),x=I.length*8-e.nBitLength;return x>0?E>>BigInt(x):E},N=e.bits2int_modN||function(I){return o(S(I))},P=Pp(e.nBitLength);function k(I){return yr("num < 2^"+e.nBitLength,I,fr,P),Wn(I,e.nByteLength)}function _(I,E,x=M){if(["recovered","canonical"].some(Ae=>Ae in x))throw new Error("sign() legacy options not supported");const{hash:T,randomBytes:O}=e;let{lowS:R,prehash:B,extraEntropy:F}=x;R==null&&(R=!0),I=ei("msgHash",I),K0(x),B&&(I=ei("prehashed msgHash",T(I)));const G=N(I),oe=l(E),se=[k(oe),k(G)];if(F!=null&&F!==!1){const Ae=F===!0?O(i.BYTES):F;se.push(ei("extraEntropy",Ae))}const fe=ya(...se),Ce=G;function Me(Ae){const Ee=S(Ae);if(!d(Ee))return;const ze=a(Ee),Ve=c.BASE.multiply(Ee).toAffine(),Ke=o(Ve.x);if(Ke===fr)return;const Ze=o(ze*o(Ce+Ke*oe));if(Ze===fr)return;let Nt=(Ve.x===Ke?0:2)|Number(Ve.y&ut),Qr=Ze;return R&&p(Ze)&&(Qr=g(Ze),Nt^=1),new w(Ke,Qr,Nt)}return{seed:fe,k2sig:Me}}const M={lowS:e.lowS,prehash:!1},L={lowS:e.lowS,prehash:!1};function U(I,E,x=M){const{seed:T,k2sig:O}=_(I,E,x),R=e;return ww(R.hash.outputLen,R.nByteLength,R.hmac)(T,O)}c.BASE._setWindowSize(8);function K(I,E,x,T=L){var Ze;const O=I;E=ei("msgHash",E),x=ei("publicKey",x);const{lowS:R,prehash:B,format:F}=T;if(K0(T),"strict"in T)throw new Error("options.strict was renamed to lowS");if(F!==void 0&&F!=="compact"&&F!=="der")throw new Error("format must be compact or der");const G=typeof O=="string"||zs(O),oe=!G&&!F&&typeof O=="object"&&O!==null&&typeof O.r=="bigint"&&typeof O.s=="bigint";if(!G&&!oe)throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");let se,fe;try{if(oe&&(se=new w(O.r,O.s)),G){try{F!=="compact"&&(se=w.fromDER(O))}catch(Nt){if(!(Nt instanceof pr.Err))throw Nt}!se&&F!=="der"&&(se=w.fromCompact(O))}fe=c.fromHex(x)}catch{return!1}if(!se||R&&se.hasHighS())return!1;B&&(E=e.hash(E));const{r:Ce,s:Me}=se,Ae=N(E),Ee=a(Me),ze=o(Ae*Ee),Ve=o(Ce*Ee),Ke=(Ze=c.BASE.multiplyAndAddUnsafe(fe,ze,Ve))==null?void 0:Ze.toAffine();return Ke?o(Ke.x)===Ce:!1}return{CURVE:e,getPublicKey:y,getSharedSecret:v,sign:U,verify:K,ProjectivePoint:c,Signature:w,utils:m}}function T3(t){return{hash:t,hmac:(e,...i)=>cu(t,e,Bb(...i)),randomBytes:no}}function R3(t,e){const i=r=>O3({...t,...T3(r)});return{...i(e),create:i}}const Aw=bw(BigInt("0xffffffff00000001000000000000000000000000ffffffffffffffffffffffff")),L3=Aw.create(BigInt("-3")),M3=BigInt("0x5ac635d8aa3a93e7b3ebbd55769886bc651d06b0cc53b0f63bce3c3e27d2604b"),B3=R3({a:L3,b:M3,Fp:Aw,n:BigInt("0xffffffff00000000ffffffffffffffffbce6faada7179e84f3b9cac2fc632551"),Gx:BigInt("0x6b17d1f2e12c4247f8bce6e563a440f277037d812deb33a0f4a13945d898c296"),Gy:BigInt("0x4fe342e2fe1a7f9b8ee7eb4a7c0f9e162bce33576b315ececbb6406837bf51f5"),h:BigInt(1),lowS:!1},Qa),_w="base10",Pt="base16",Oi="base64pad",Br="base64url",tc="utf8",Nw=0,br=1,ic=2,U3=0,Z0=1,na=12,Op=32;function D3(){const t=Lh.utils.randomPrivateKey(),e=Lh.getPublicKey(t);return{privateKey:Wt(t,Pt),publicKey:Wt(e,Pt)}}function Mh(){const t=no(Op);return Wt(t,Pt)}function j3(t,e){const i=Lh.getSharedSecret(bi(t,Pt),bi(e,Pt)),r=qv(Qa,i,void 0,void 0,Op);return Wt(r,Pt)}function $l(t){const e=Qa(bi(t,Pt));return Wt(e,Pt)}function Ki(t){const e=Qa(bi(t,tc));return Wt(e,Pt)}function Sw(t){return bi(`${t}`,_w)}function Fs(t){return Number(Wt(t,_w))}function $w(t){return t.replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")}function kw(t){const e=t.replace(/-/g,"+").replace(/_/g,"/"),i=(4-e.length%4)%4;return e+"=".repeat(i)}function z3(t){const e=Sw(typeof t.type<"u"?t.type:Nw);if(Fs(e)===br&&typeof t.senderPublicKey>"u")throw new Error("Missing sender public key for type 1 envelope");const i=typeof t.senderPublicKey<"u"?bi(t.senderPublicKey,Pt):void 0,r=typeof t.iv<"u"?bi(t.iv,Pt):no(na),s=bi(t.symKey,Pt),n=pw(s,r).encrypt(bi(t.message,tc)),o=Pw({type:e,sealed:n,iv:r,senderPublicKey:i});return t.encoding===Br?$w(o):o}function F3(t){const e=bi(t.symKey,Pt),{sealed:i,iv:r}=ba({encoded:t.encoded,encoding:t.encoding}),s=pw(e,r).decrypt(i);if(s===null)throw new Error("Failed to decrypt");return Wt(s,tc)}function H3(t,e){const i=Sw(ic),r=no(na),s=bi(t,tc),n=Pw({type:i,sealed:s,iv:r});return e===Br?$w(n):n}function q3(t,e){const{sealed:i}=ba({encoded:t,encoding:e});return Wt(i,tc)}function Pw(t){if(Fs(t.type)===ic)return Wt(sa([t.type,t.sealed]),Oi);if(Fs(t.type)===br){if(typeof t.senderPublicKey>"u")throw new Error("Missing sender public key for type 1 envelope");return Wt(sa([t.type,t.senderPublicKey,t.iv,t.sealed]),Oi)}return Wt(sa([t.type,t.iv,t.sealed]),Oi)}function ba(t){const e=(t.encoding||Oi)===Br?kw(t.encoded):t.encoded,i=bi(e,Oi),r=i.slice(U3,Z0),s=Z0;if(Fs(r)===br){const c=s+Op,l=c+na,u=i.slice(s,c),d=i.slice(c,l),h=i.slice(l);return{type:r,sealed:h,iv:d,senderPublicKey:u}}if(Fs(r)===ic){const c=i.slice(s),l=no(na);return{type:r,sealed:c,iv:l}}const n=s+na,o=i.slice(s,n),a=i.slice(n);return{type:r,sealed:a,iv:o}}function W3(t,e){const i=ba({encoded:t,encoding:e==null?void 0:e.encoding});return Ow({type:Fs(i.type),senderPublicKey:typeof i.senderPublicKey<"u"?Wt(i.senderPublicKey,Pt):void 0,receiverPublicKey:e==null?void 0:e.receiverPublicKey})}function Ow(t){const e=(t==null?void 0:t.type)||Nw;if(e===br){if(typeof(t==null?void 0:t.senderPublicKey)>"u")throw new Error("missing sender public key");if(typeof(t==null?void 0:t.receiverPublicKey)>"u")throw new Error("missing receiver public key")}return{type:e,senderPublicKey:t==null?void 0:t.senderPublicKey,receiverPublicKey:t==null?void 0:t.receiverPublicKey}}function Y0(t){return t.type===br&&typeof t.senderPublicKey=="string"&&typeof t.receiverPublicKey=="string"}function J0(t){return t.type===ic}function V3(t){const e=wt.from(t.x,"base64"),i=wt.from(t.y,"base64");return sa([new Uint8Array([4]),e,i])}function K3(t,e){const[i,r,s]=t.split("."),n=wt.from(kw(s),"base64");if(n.length!==64)throw new Error("Invalid signature length");const o=n.slice(0,32),a=n.slice(32,64),c=`${i}.${r}`,l=Qa(c),u=V3(e);if(!B3.verify(sa([o,a]),l,u))throw new Error("Invalid signature");return Eh(t).payload}const G3="irn";function jl(t){return(t==null?void 0:t.relay)||{protocol:G3}}function Zo(t){const e=ry[t];if(typeof e>"u")throw new Error(`Relay Protocol not supported: ${t}`);return e}function Z3(t,e="-"){const i={},r="relay"+e;return Object.keys(t).forEach(s=>{if(s.startsWith(r)){const n=s.replace(r,""),o=t[s];i[n]=o}}),i}function X0(t){if(!t.includes("wc:")){const l=ew(t);l!=null&&l.includes("wc:")&&(t=l)}t=t.includes("wc://")?t.replace("wc://",""):t,t=t.includes("wc:")?t.replace("wc:",""):t;const e=t.indexOf(":"),i=t.indexOf("?")!==-1?t.indexOf("?"):void 0,r=t.substring(0,e),s=t.substring(e+1,i).split("@"),n=typeof i<"u"?t.substring(i):"",o=new URLSearchParams(n),a={};o.forEach((l,u)=>{a[u]=l});const c=typeof a.methods=="string"?a.methods.split(","):void 0;return{protocol:r,topic:Y3(s[0]),version:parseInt(s[1],10),symKey:a.symKey,relay:Z3(a),methods:c,expiryTimestamp:a.expiryTimestamp?parseInt(a.expiryTimestamp,10):void 0}}function Y3(t){return t.startsWith("//")?t.substring(2):t}function J3(t,e="-"){const i="relay",r={};return Object.keys(t).forEach(s=>{const n=s,o=i+e+n;t[n]&&(r[o]=t[n])}),r}function Q0(t){const e=new URLSearchParams,i=J3(t.relay);Object.keys(i).sort().forEach(s=>{e.set(s,i[s])}),e.set("symKey",t.symKey),t.expiryTimestamp&&e.set("expiryTimestamp",t.expiryTimestamp.toString()),t.methods&&e.set("methods",t.methods.join(","));const r=e.toString();return`${t.protocol}:${t.topic}@${t.version}?${r}`}function yc(t,e,i){return`${t}?wc_ev=${i}&topic=${e}`}function ao(t){const e=[];return t.forEach(i=>{const[r,s]=i.split(":");e.push(`${r}:${s}`)}),e}function X3(t){const e=[];return Object.values(t).forEach(i=>{e.push(...ao(i.accounts))}),e}function Q3(t,e){const i=[];return Object.values(t).forEach(r=>{ao(r.accounts).includes(e)&&i.push(...r.methods)}),i}function e5(t,e){const i=[];return Object.values(t).forEach(r=>{ao(r.accounts).includes(e)&&i.push(...r.events)}),i}function Tp(t){return t.includes(":")}function Yo(t){return Tp(t)?t.split(":")[0]:t}function t5(t){const e={};return t==null||t.forEach(i=>{var r;const[s,n]=i.split(":");e[s]||(e[s]={accounts:[],chains:[],events:[],methods:[]}),e[s].accounts.push(i),(r=e[s].chains)==null||r.push(`${s}:${n}`)}),e}function e1(t,e){e=e.map(r=>r.replace("did:pkh:",""));const i=t5(e);for(const[r,s]of Object.entries(i))s.methods?s.methods=Nl(s.methods,t):s.methods=t,s.events=["chainChanged","accountsChanged"];return i}const i5={INVALID_METHOD:{message:"Invalid method.",code:1001},INVALID_EVENT:{message:"Invalid event.",code:1002},INVALID_UPDATE_REQUEST:{message:"Invalid update request.",code:1003},INVALID_EXTEND_REQUEST:{message:"Invalid extend request.",code:1004},INVALID_SESSION_SETTLE_REQUEST:{message:"Invalid session settle request.",code:1005},UNAUTHORIZED_METHOD:{message:"Unauthorized method.",code:3001},UNAUTHORIZED_EVENT:{message:"Unauthorized event.",code:3002},UNAUTHORIZED_UPDATE_REQUEST:{message:"Unauthorized update request.",code:3003},UNAUTHORIZED_EXTEND_REQUEST:{message:"Unauthorized extend request.",code:3004},USER_REJECTED:{message:"User rejected.",code:5e3},USER_REJECTED_CHAINS:{message:"User rejected chains.",code:5001},USER_REJECTED_METHODS:{message:"User rejected methods.",code:5002},USER_REJECTED_EVENTS:{message:"User rejected events.",code:5003},UNSUPPORTED_CHAINS:{message:"Unsupported chains.",code:5100},UNSUPPORTED_METHODS:{message:"Unsupported methods.",code:5101},UNSUPPORTED_EVENTS:{message:"Unsupported events.",code:5102},UNSUPPORTED_ACCOUNTS:{message:"Unsupported accounts.",code:5103},UNSUPPORTED_NAMESPACE_KEY:{message:"Unsupported namespace key.",code:5104},USER_DISCONNECTED:{message:"User disconnected.",code:6e3},SESSION_SETTLEMENT_FAILED:{message:"Session settlement failed.",code:7e3},WC_METHOD_UNSUPPORTED:{message:"Unsupported wc_ method.",code:10001}},r5={NOT_INITIALIZED:{message:"Not initialized.",code:1},NO_MATCHING_KEY:{message:"No matching key.",code:2},RESTORE_WILL_OVERRIDE:{message:"Restore will override.",code:3},RESUBSCRIBED:{message:"Resubscribed.",code:4},MISSING_OR_INVALID:{message:"Missing or invalid.",code:5},EXPIRED:{message:"Expired.",code:6},UNKNOWN_TYPE:{message:"Unknown type.",code:7},MISMATCHED_TOPIC:{message:"Mismatched topic.",code:8},NON_CONFORMING_NAMESPACES:{message:"Non conforming namespaces.",code:9}};function H(t,e){const{message:i,code:r}=r5[t];return{message:e?`${i} ${e}`:i,code:r}}function Le(t,e){const{message:i,code:r}=i5[t];return{message:e?`${i} ${e}`:i,code:r}}function Ti(t,e){return Array.isArray(t)?typeof e<"u"&&t.length?t.every(e):!0:!1}function va(t){return Object.getPrototypeOf(t)===Object.prototype&&Object.keys(t).length}function Ct(t){return typeof t>"u"}function et(t,e){return e&&Ct(t)?!0:typeof t=="string"&&!!t.trim().length}function Rp(t,e){return e&&Ct(t)?!0:typeof t=="number"&&!isNaN(t)}function s5(t,e){const{requiredNamespaces:i}=e,r=Object.keys(t.namespaces),s=Object.keys(i);let n=!0;return Ss(s,r)?(r.forEach(o=>{const{accounts:a,methods:c,events:l}=t.namespaces[o],u=ao(a),d=i[o];(!Ss(Zf(o,d),u)||!Ss(d.methods,c)||!Ss(d.events,l))&&(n=!1)}),n):!1}function zl(t){return et(t,!1)&&t.includes(":")?t.split(":").length===2:!1}function n5(t){if(et(t,!1)&&t.includes(":")){const e=t.split(":");if(e.length===3){const i=e[0]+":"+e[1];return!!e[2]&&zl(i)}}return!1}function o5(t){function e(i){try{return typeof new URL(i)<"u"}catch{return!1}}try{if(et(t,!1)){if(e(t))return!0;const i=ew(t);return e(i)}}catch{}return!1}function a5(t){var e;return(e=t==null?void 0:t.proposer)==null?void 0:e.publicKey}function c5(t){return t==null?void 0:t.topic}function l5(t,e){let i=null;return et(t==null?void 0:t.publicKey,!1)||(i=H("MISSING_OR_INVALID",`${e} controller public key should be a string`)),i}function t1(t){let e=!0;return Ti(t)?t.length&&(e=t.every(i=>et(i,!1))):e=!1,e}function u5(t,e,i){let r=null;return Ti(e)&&e.length?e.forEach(s=>{r||zl(s)||(r=Le("UNSUPPORTED_CHAINS",`${i}, chain ${s} should be a string and conform to "namespace:chainId" format`))}):zl(t)||(r=Le("UNSUPPORTED_CHAINS",`${i}, chains must be defined as "namespace:chainId" e.g. "eip155:1": {...} in the namespace key OR as an array of CAIP-2 chainIds e.g. eip155: { chains: ["eip155:1", "eip155:5"] }`)),r}function d5(t,e,i){let r=null;return Object.entries(t).forEach(([s,n])=>{if(r)return;const o=u5(s,Zf(s,n),`${e} ${i}`);o&&(r=o)}),r}function h5(t,e){let i=null;return Ti(t)?t.forEach(r=>{i||n5(r)||(i=Le("UNSUPPORTED_ACCOUNTS",`${e}, account ${r} should be a string and conform to "namespace:chainId:address" format`))}):i=Le("UNSUPPORTED_ACCOUNTS",`${e}, accounts should be an array of strings conforming to "namespace:chainId:address" format`),i}function p5(t,e){let i=null;return Object.values(t).forEach(r=>{if(i)return;const s=h5(r==null?void 0:r.accounts,`${e} namespace`);s&&(i=s)}),i}function g5(t,e){let i=null;return t1(t==null?void 0:t.methods)?t1(t==null?void 0:t.events)||(i=Le("UNSUPPORTED_EVENTS",`${e}, events should be an array of strings or empty array for no events`)):i=Le("UNSUPPORTED_METHODS",`${e}, methods should be an array of strings or empty array for no methods`),i}function Tw(t,e){let i=null;return Object.values(t).forEach(r=>{if(i)return;const s=g5(r,`${e}, namespace`);s&&(i=s)}),i}function f5(t,e,i){let r=null;if(t&&va(t)){const s=Tw(t,e);s&&(r=s);const n=d5(t,e,i);n&&(r=n)}else r=H("MISSING_OR_INVALID",`${e}, ${i} should be an object with data`);return r}function Fu(t,e){let i=null;if(t&&va(t)){const r=Tw(t,e);r&&(i=r);const s=p5(t,e);s&&(i=s)}else i=H("MISSING_OR_INVALID",`${e}, namespaces should be an object with data`);return i}function Rw(t){return et(t.protocol,!0)}function w5(t,e){let i=!1;return e&&!t?i=!0:t&&Ti(t)&&t.length&&t.forEach(r=>{i=Rw(r)}),i}function m5(t){return typeof t=="number"}function zt(t){return typeof t<"u"&&typeof t!==null}function y5(t){return!(!t||typeof t!="object"||!t.code||!Rp(t.code,!1)||!t.message||!et(t.message,!1))}function b5(t){return!(Ct(t)||!et(t.method,!1))}function v5(t){return!(Ct(t)||Ct(t.result)&&Ct(t.error)||!Rp(t.id,!1)||!et(t.jsonrpc,!1))}function C5(t){return!(Ct(t)||!et(t.name,!1))}function i1(t,e){return!(!zl(e)||!X3(t).includes(e))}function E5(t,e,i){return et(i,!1)?Q3(t,e).includes(i):!1}function x5(t,e,i){return et(i,!1)?e5(t,e).includes(i):!1}function r1(t,e,i){let r=null;const s=I5(t),n=A5(e),o=Object.keys(s),a=Object.keys(n),c=s1(Object.keys(t)),l=s1(Object.keys(e)),u=c.filter(d=>!l.includes(d));return u.length&&(r=H("NON_CONFORMING_NAMESPACES",`${i} namespaces keys don't satisfy requiredNamespaces.
      Required: ${u.toString()}
      Received: ${Object.keys(e).toString()}`)),Ss(o,a)||(r=H("NON_CONFORMING_NAMESPACES",`${i} namespaces chains don't satisfy required namespaces.
      Required: ${o.toString()}
      Approved: ${a.toString()}`)),Object.keys(e).forEach(d=>{if(!d.includes(":")||r)return;const h=ao(e[d].accounts);h.includes(d)||(r=H("NON_CONFORMING_NAMESPACES",`${i} namespaces accounts don't satisfy namespace accounts for ${d}
        Required: ${d}
        Approved: ${h.toString()}`))}),o.forEach(d=>{r||(Ss(s[d].methods,n[d].methods)?Ss(s[d].events,n[d].events)||(r=H("NON_CONFORMING_NAMESPACES",`${i} namespaces events don't satisfy namespace events for ${d}`)):r=H("NON_CONFORMING_NAMESPACES",`${i} namespaces methods don't satisfy namespace methods for ${d}`))}),r}function I5(t){const e={};return Object.keys(t).forEach(i=>{var r;i.includes(":")?e[i]=t[i]:(r=t[i].chains)==null||r.forEach(s=>{e[s]={methods:t[i].methods,events:t[i].events}})}),e}function s1(t){return[...new Set(t.map(e=>e.includes(":")?e.split(":")[0]:e))]}function A5(t){const e={};return Object.keys(t).forEach(i=>{if(i.includes(":"))e[i]=t[i];else{const r=ao(t[i].accounts);r==null||r.forEach(s=>{e[s]={accounts:t[i].accounts.filter(n=>n.includes(`${s}:`)),methods:t[i].methods,events:t[i].events}})}}),e}function _5(t,e){return Rp(t,!1)&&t<=e.max&&t>=e.min}function n1(){const t=Ja();return new Promise(e=>{switch(t){case ri.browser:e(N5());break;case ri.reactNative:e(S5());break;case ri.node:e($5());break;default:e(!0)}})}function N5(){return Ya()&&(navigator==null?void 0:navigator.onLine)}async function S5(){if(Xr()&&typeof pe<"u"&&pe!=null&&pe.NetInfo){const t=await(pe==null?void 0:pe.NetInfo.fetch());return t==null?void 0:t.isConnected}return!0}function $5(){return!0}function k5(t){switch(Ja()){case ri.browser:P5(t);break;case ri.reactNative:O5(t);break}}function P5(t){!Xr()&&Ya()&&(window.addEventListener("online",()=>t(!0)),window.addEventListener("offline",()=>t(!1)))}function O5(t){var e;Xr()&&typeof pe<"u"&&pe!=null&&pe.NetInfo&&((e=pe)==null||e.NetInfo.addEventListener(i=>t(i==null?void 0:i.isConnected)))}const Hu={};let wo=class{static get(e){return Hu[e]}static set(e,i){Hu[e]=i}static delete(e){delete Hu[e]}};function T5(t){return!t||typeof t.then!="function"?Promise.resolve(t):t}function lt(t,...e){try{return T5(t(...e))}catch(i){return Promise.reject(i)}}function R5(t){const e=typeof t;return t===null||e!=="object"&&e!=="function"}function L5(t){const e=Object.getPrototypeOf(t);return!e||e.isPrototypeOf(Object)}function kl(t){if(R5(t))return String(t);if(L5(t)||Array.isArray(t))return JSON.stringify(t);if(typeof t.toJSON=="function")return kl(t.toJSON());throw new Error("[unstorage] Cannot stringify value!")}const Bh="base64:";function M5(t){return typeof t=="string"?t:Bh+D5(t)}function B5(t){return typeof t!="string"||!t.startsWith(Bh)?t:U5(t.slice(Bh.length))}function U5(t){return globalThis.Buffer?wt.from(t,"base64"):Uint8Array.from(globalThis.atob(t),e=>e.codePointAt(0))}function D5(t){return globalThis.Buffer?wt.from(t).toString("base64"):globalThis.btoa(String.fromCodePoint(...t))}function jt(t){var e;return t&&((e=t.split("?")[0])==null?void 0:e.replace(/[/\\]/g,":").replace(/:+/g,":").replace(/^:|:$/g,""))||""}function j5(...t){return jt(t.join(":"))}function bc(t){return t=jt(t),t?t+":":""}function z5(t,e){if(e===void 0)return!0;let i=0,r=t.indexOf(":");for(;r>-1;)i++,r=t.indexOf(":",r+1);return i<=e}function F5(t,e){return e?t.startsWith(e)&&t[t.length-1]!=="$":t[t.length-1]!=="$"}const H5="memory",q5=()=>{const t=new Map;return{name:H5,getInstance:()=>t,hasItem(e){return t.has(e)},getItem(e){return t.get(e)??null},getItemRaw(e){return t.get(e)??null},setItem(e,i){t.set(e,i)},setItemRaw(e,i){t.set(e,i)},removeItem(e){t.delete(e)},getKeys(){return[...t.keys()]},clear(){t.clear()},dispose(){t.clear()}}};function W5(t={}){const e={mounts:{"":t.driver||q5()},mountpoints:[""],watching:!1,watchListeners:[],unwatch:{}},i=l=>{for(const u of e.mountpoints)if(l.startsWith(u))return{base:u,relativeKey:l.slice(u.length),driver:e.mounts[u]};return{base:"",relativeKey:l,driver:e.mounts[""]}},r=(l,u)=>e.mountpoints.filter(d=>d.startsWith(l)||u&&l.startsWith(d)).map(d=>({relativeBase:l.length>d.length?l.slice(d.length):void 0,mountpoint:d,driver:e.mounts[d]})),s=(l,u)=>{if(e.watching){u=jt(u);for(const d of e.watchListeners)d(l,u)}},n=async()=>{if(!e.watching){e.watching=!0;for(const l in e.mounts)e.unwatch[l]=await o1(e.mounts[l],s,l)}},o=async()=>{if(e.watching){for(const l in e.unwatch)await e.unwatch[l]();e.unwatch={},e.watching=!1}},a=(l,u,d)=>{const h=new Map,p=g=>{let f=h.get(g.base);return f||(f={driver:g.driver,base:g.base,items:[]},h.set(g.base,f)),f};for(const g of l){const f=typeof g=="string",w=jt(f?g:g.key),m=f?void 0:g.value,y=f||!g.options?u:{...u,...g.options},b=i(w);p(b).items.push({key:w,value:m,relativeKey:b.relativeKey,options:y})}return Promise.all([...h.values()].map(g=>d(g))).then(g=>g.flat())},c={hasItem(l,u={}){l=jt(l);const{relativeKey:d,driver:h}=i(l);return lt(h.hasItem,d,u)},getItem(l,u={}){l=jt(l);const{relativeKey:d,driver:h}=i(l);return lt(h.getItem,d,u).then(p=>pc(p))},getItems(l,u={}){return a(l,u,d=>d.driver.getItems?lt(d.driver.getItems,d.items.map(h=>({key:h.relativeKey,options:h.options})),u).then(h=>h.map(p=>({key:j5(d.base,p.key),value:pc(p.value)}))):Promise.all(d.items.map(h=>lt(d.driver.getItem,h.relativeKey,h.options).then(p=>({key:h.key,value:pc(p)})))))},getItemRaw(l,u={}){l=jt(l);const{relativeKey:d,driver:h}=i(l);return h.getItemRaw?lt(h.getItemRaw,d,u):lt(h.getItem,d,u).then(p=>B5(p))},async setItem(l,u,d={}){if(u===void 0)return c.removeItem(l);l=jt(l);const{relativeKey:h,driver:p}=i(l);p.setItem&&(await lt(p.setItem,h,kl(u),d),p.watch||s("update",l))},async setItems(l,u){await a(l,u,async d=>{if(d.driver.setItems)return lt(d.driver.setItems,d.items.map(h=>({key:h.relativeKey,value:kl(h.value),options:h.options})),u);d.driver.setItem&&await Promise.all(d.items.map(h=>lt(d.driver.setItem,h.relativeKey,kl(h.value),h.options)))})},async setItemRaw(l,u,d={}){if(u===void 0)return c.removeItem(l,d);l=jt(l);const{relativeKey:h,driver:p}=i(l);if(p.setItemRaw)await lt(p.setItemRaw,h,u,d);else if(p.setItem)await lt(p.setItem,h,M5(u),d);else return;p.watch||s("update",l)},async removeItem(l,u={}){typeof u=="boolean"&&(u={removeMeta:u}),l=jt(l);const{relativeKey:d,driver:h}=i(l);h.removeItem&&(await lt(h.removeItem,d,u),(u.removeMeta||u.removeMata)&&await lt(h.removeItem,d+"$",u),h.watch||s("remove",l))},async getMeta(l,u={}){typeof u=="boolean"&&(u={nativeOnly:u}),l=jt(l);const{relativeKey:d,driver:h}=i(l),p=Object.create(null);if(h.getMeta&&Object.assign(p,await lt(h.getMeta,d,u)),!u.nativeOnly){const g=await lt(h.getItem,d+"$",u).then(f=>pc(f));g&&typeof g=="object"&&(typeof g.atime=="string"&&(g.atime=new Date(g.atime)),typeof g.mtime=="string"&&(g.mtime=new Date(g.mtime)),Object.assign(p,g))}return p},setMeta(l,u,d={}){return this.setItem(l+"$",u,d)},removeMeta(l,u={}){return this.removeItem(l+"$",u)},async getKeys(l,u={}){var w;l=bc(l);const d=r(l,!0);let h=[];const p=[];let g=!0;for(const m of d){(w=m.driver.flags)!=null&&w.maxDepth||(g=!1);const y=await lt(m.driver.getKeys,m.relativeBase,u);for(const b of y){const v=m.mountpoint+jt(b);h.some(S=>v.startsWith(S))||p.push(v)}h=[m.mountpoint,...h.filter(b=>!b.startsWith(m.mountpoint))]}const f=u.maxDepth!==void 0&&!g;return p.filter(m=>(!f||z5(m,u.maxDepth))&&F5(m,l))},async clear(l,u={}){l=bc(l),await Promise.all(r(l,!1).map(async d=>{if(d.driver.clear)return lt(d.driver.clear,d.relativeBase,u);if(d.driver.removeItem){const h=await d.driver.getKeys(d.relativeBase||"",u);return Promise.all(h.map(p=>d.driver.removeItem(p,u)))}}))},async dispose(){await Promise.all(Object.values(e.mounts).map(l=>a1(l)))},async watch(l){return await n(),e.watchListeners.push(l),async()=>{e.watchListeners=e.watchListeners.filter(u=>u!==l),e.watchListeners.length===0&&await o()}},async unwatch(){e.watchListeners=[],await o()},mount(l,u){if(l=bc(l),l&&e.mounts[l])throw new Error(`already mounted at ${l}`);return l&&(e.mountpoints.push(l),e.mountpoints.sort((d,h)=>h.length-d.length)),e.mounts[l]=u,e.watching&&Promise.resolve(o1(u,s,l)).then(d=>{e.unwatch[l]=d}).catch(console.error),c},async unmount(l,u=!0){var d,h;l=bc(l),!(!l||!e.mounts[l])&&(e.watching&&l in e.unwatch&&((h=(d=e.unwatch)[l])==null||h.call(d),delete e.unwatch[l]),u&&await a1(e.mounts[l]),e.mountpoints=e.mountpoints.filter(p=>p!==l),delete e.mounts[l])},getMount(l=""){l=jt(l)+":";const u=i(l);return{driver:u.driver,base:u.base}},getMounts(l="",u={}){return l=jt(l),r(l,u.parents).map(h=>({driver:h.driver,base:h.mountpoint}))},keys:(l,u={})=>c.getKeys(l,u),get:(l,u={})=>c.getItem(l,u),set:(l,u,d={})=>c.setItem(l,u,d),has:(l,u={})=>c.hasItem(l,u),del:(l,u={})=>c.removeItem(l,u),remove:(l,u={})=>c.removeItem(l,u)};return c}function o1(t,e,i){return t.watch?t.watch((r,s)=>e(r,i+s)):()=>{}}async function a1(t){typeof t.dispose=="function"&&await lt(t.dispose)}const V5="idb-keyval";var K5=(t={})=>{const e=t.base&&t.base.length>0?`${t.base}:`:"",i=s=>e+s;let r;return t.dbName&&t.storeName&&(r=sy(t.dbName,t.storeName)),{name:V5,options:t,async hasItem(s){return!(typeof await n0(i(s),r)>"u")},async getItem(s){return await n0(i(s),r)??null},setItem(s,n){return ny(i(s),n,r)},removeItem(s){return oy(i(s),r)},getKeys(){return ay(r)},clear(){return cy(r)}}};const G5="WALLET_CONNECT_V2_INDEXED_DB",Z5="keyvaluestorage";let Y5=class{constructor(){this.indexedDb=W5({driver:K5({dbName:G5,storeName:Z5})})}async getKeys(){return this.indexedDb.getKeys()}async getEntries(){return(await this.indexedDb.getItems(await this.indexedDb.getKeys())).map(e=>[e.key,e.value])}async getItem(e){const i=await this.indexedDb.getItem(e);if(i!==null)return i}async setItem(e,i){await this.indexedDb.setItem(e,vp(i))}async removeItem(e){await this.indexedDb.removeItem(e)}};var qu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof pe<"u"?pe:typeof self<"u"?self:{},Pl={exports:{}};(function(){let t;function e(){}t=e,t.prototype.getItem=function(i){return this.hasOwnProperty(i)?String(this[i]):null},t.prototype.setItem=function(i,r){this[i]=String(r)},t.prototype.removeItem=function(i){delete this[i]},t.prototype.clear=function(){const i=this;Object.keys(i).forEach(function(r){i[r]=void 0,delete i[r]})},t.prototype.key=function(i){return i=i||0,Object.keys(this)[i]},t.prototype.__defineGetter__("length",function(){return Object.keys(this).length}),typeof qu<"u"&&qu.localStorage?Pl.exports=qu.localStorage:typeof window<"u"&&window.localStorage?Pl.exports=window.localStorage:Pl.exports=new e})();function J5(t){var e;return[t[0],Ml((e=t[1])!=null?e:"")]}let X5=class{constructor(){this.localStorage=Pl.exports}async getKeys(){return Object.keys(this.localStorage)}async getEntries(){return Object.entries(this.localStorage).map(J5)}async getItem(e){const i=this.localStorage.getItem(e);if(i!==null)return Ml(i)}async setItem(e,i){this.localStorage.setItem(e,vp(i))}async removeItem(e){this.localStorage.removeItem(e)}};const Q5="wc_storage_version",c1=1,e4=async(t,e,i)=>{const r=Q5,s=await e.getItem(r);if(s&&s>=c1){i(e);return}const n=await t.getKeys();if(!n.length){i(e);return}const o=[];for(;n.length;){const a=n.shift();if(!a)continue;const c=a.toLowerCase();if(c.includes("wc@")||c.includes("walletconnect")||c.includes("wc_")||c.includes("wallet_connect")){const l=await t.getItem(a);await e.setItem(a,l),o.push(a)}}await e.setItem(r,c1),i(e),t4(t,o)},t4=async(t,e)=>{e.length&&e.forEach(async i=>{await t.removeItem(i)})};let i4=class{constructor(){this.initialized=!1,this.setInitialized=i=>{this.storage=i,this.initialized=!0};const e=new X5;this.storage=e;try{const i=new Y5;e4(e,i,this.setInitialized)}catch{this.initialized=!0}}async getKeys(){return await this.initialize(),this.storage.getKeys()}async getEntries(){return await this.initialize(),this.storage.getEntries()}async getItem(e){return await this.initialize(),this.storage.getItem(e)}async setItem(e,i){return await this.initialize(),this.storage.setItem(e,i)}async removeItem(e){return await this.initialize(),this.storage.removeItem(e)}async initialize(){this.initialized||await new Promise(e=>{const i=setInterval(()=>{this.initialized&&(clearInterval(i),e())},20)})}};var r4=Object.defineProperty,s4=(t,e,i)=>e in t?r4(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,l1=(t,e,i)=>s4(t,typeof e!="symbol"?e+"":e,i);let n4=class extends io{constructor(e){super(),this.opts=e,l1(this,"protocol","wc"),l1(this,"version",2)}};var o4=Object.defineProperty,a4=(t,e,i)=>e in t?o4(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,c4=(t,e,i)=>a4(t,typeof e!="symbol"?e+"":e,i);let l4=class extends io{constructor(e,i){super(),this.core=e,this.logger=i,c4(this,"records",new Map)}},u4=class{constructor(e,i){this.logger=e,this.core=i}};class d4 extends io{constructor(e,i){super(),this.relayer=e,this.logger=i}}let h4=class extends io{constructor(e){super()}},p4=class{constructor(e,i,r,s){this.core=e,this.logger=i,this.name=r}},g4=class extends io{constructor(e,i){super(),this.relayer=e,this.logger=i}},f4=class extends io{constructor(e,i){super(),this.core=e,this.logger=i}},w4=class{constructor(e,i,r){this.core=e,this.logger=i,this.store=r}},m4=class{constructor(e,i){this.projectId=e,this.logger=i}},y4=class{constructor(e,i,r){this.core=e,this.logger=i,this.telemetryEnabled=r}};const Lw="wc",Mw=2,Fl="core",Ji=`${Lw}@2:${Fl}:`,b4={name:Fl,logger:"error"},v4={database:":memory:"},C4="crypto",u1="client_ed25519_seed",E4=V.ONE_DAY,x4="keychain",I4="0.3",A4="messages",_4="0.3",d1=V.SIX_HOURS,N4="publisher",Bw="irn",S4="error",Uw="wss://relay.walletconnect.org",$4="relayer",pt={message:"relayer_message",message_ack:"relayer_message_ack",connect:"relayer_connect",disconnect:"relayer_disconnect",error:"relayer_error",connection_stalled:"relayer_connection_stalled",transport_closed:"relayer_transport_closed",publish:"relayer_publish"},k4="_subscription",ai={payload:"payload",connect:"connect",disconnect:"disconnect",error:"error"},P4=.1,Uh="2.19.2",We={link_mode:"link_mode",relay:"relay"},Ol={inbound:"inbound",outbound:"outbound"},O4="0.3",T4="WALLETCONNECT_CLIENT_ID",h1="WALLETCONNECT_LINK_MODE_APPS",Qt={created:"subscription_created",deleted:"subscription_deleted",expired:"subscription_expired",disabled:"subscription_disabled",sync:"subscription_sync",resubscribed:"subscription_resubscribed"},R4="subscription",L4="0.3",M4="pairing",B4="0.3",mo={wc_pairingDelete:{req:{ttl:V.ONE_DAY,prompt:!1,tag:1e3},res:{ttl:V.ONE_DAY,prompt:!1,tag:1001}},wc_pairingPing:{req:{ttl:V.THIRTY_SECONDS,prompt:!1,tag:1002},res:{ttl:V.THIRTY_SECONDS,prompt:!1,tag:1003}},unregistered_method:{req:{ttl:V.ONE_DAY,prompt:!1,tag:0},res:{ttl:V.ONE_DAY,prompt:!1,tag:0}}},xs={create:"pairing_create",expire:"pairing_expire",delete:"pairing_delete",ping:"pairing_ping"},Ei={created:"history_created",updated:"history_updated",deleted:"history_deleted",sync:"history_sync"},U4="history",D4="0.3",j4="expirer",yi={created:"expirer_created",deleted:"expirer_deleted",expired:"expirer_expired",sync:"expirer_sync"},z4="0.3",F4="verify-api",H4="https://verify.walletconnect.com",Dw="https://verify.walletconnect.org",oa=Dw,q4=`${oa}/v3`,W4=[H4,Dw],V4="echo",K4="https://echo.walletconnect.com",qi={pairing_started:"pairing_started",pairing_uri_validation_success:"pairing_uri_validation_success",pairing_uri_not_expired:"pairing_uri_not_expired",store_new_pairing:"store_new_pairing",subscribing_pairing_topic:"subscribing_pairing_topic",subscribe_pairing_topic_success:"subscribe_pairing_topic_success",existing_pairing:"existing_pairing",pairing_not_expired:"pairing_not_expired",emit_inactive_pairing:"emit_inactive_pairing",emit_session_proposal:"emit_session_proposal",subscribing_to_pairing_topic:"subscribing_to_pairing_topic"},hr={no_wss_connection:"no_wss_connection",no_internet_connection:"no_internet_connection",malformed_pairing_uri:"malformed_pairing_uri",active_pairing_already_exists:"active_pairing_already_exists",subscribe_pairing_topic_failure:"subscribe_pairing_topic_failure",pairing_expired:"pairing_expired",proposal_expired:"proposal_expired",proposal_listener_not_found:"proposal_listener_not_found"},xi={session_approve_started:"session_approve_started",proposal_not_expired:"proposal_not_expired",session_namespaces_validation_success:"session_namespaces_validation_success",create_session_topic:"create_session_topic",subscribing_session_topic:"subscribing_session_topic",subscribe_session_topic_success:"subscribe_session_topic_success",publishing_session_approve:"publishing_session_approve",session_approve_publish_success:"session_approve_publish_success",store_session:"store_session",publishing_session_settle:"publishing_session_settle",session_settle_publish_success:"session_settle_publish_success"},es={no_internet_connection:"no_internet_connection",no_wss_connection:"no_wss_connection",proposal_expired:"proposal_expired",subscribe_session_topic_failure:"subscribe_session_topic_failure",session_approve_publish_failure:"session_approve_publish_failure",session_settle_publish_failure:"session_settle_publish_failure",session_approve_namespace_validation_failure:"session_approve_namespace_validation_failure",proposal_not_found:"proposal_not_found"},ts={authenticated_session_approve_started:"authenticated_session_approve_started",authenticated_session_not_expired:"authenticated_session_not_expired",chains_caip2_compliant:"chains_caip2_compliant",chains_evm_compliant:"chains_evm_compliant",create_authenticated_session_topic:"create_authenticated_session_topic",cacaos_verified:"cacaos_verified",store_authenticated_session:"store_authenticated_session",subscribing_authenticated_session_topic:"subscribing_authenticated_session_topic",subscribe_authenticated_session_topic_success:"subscribe_authenticated_session_topic_success",publishing_authenticated_session_approve:"publishing_authenticated_session_approve",authenticated_session_approve_publish_success:"authenticated_session_approve_publish_success"},yo={no_internet_connection:"no_internet_connection",no_wss_connection:"no_wss_connection",missing_session_authenticate_request:"missing_session_authenticate_request",session_authenticate_request_expired:"session_authenticate_request_expired",chains_caip2_compliant_failure:"chains_caip2_compliant_failure",chains_evm_compliant_failure:"chains_evm_compliant_failure",invalid_cacao:"invalid_cacao",subscribe_authenticated_session_topic_failure:"subscribe_authenticated_session_topic_failure",authenticated_session_approve_publish_failure:"authenticated_session_approve_publish_failure",authenticated_session_pending_request_not_found:"authenticated_session_pending_request_not_found"},G4=.1,Z4="event-client",Y4=86400,J4="https://pulse.walletconnect.org/batch";function X4(t,e){if(t.length>=255)throw new TypeError("Alphabet too long");for(var i=new Uint8Array(256),r=0;r<i.length;r++)i[r]=255;for(var s=0;s<t.length;s++){var n=t.charAt(s),o=n.charCodeAt(0);if(i[o]!==255)throw new TypeError(n+" is ambiguous");i[o]=s}var a=t.length,c=t.charAt(0),l=Math.log(a)/Math.log(256),u=Math.log(256)/Math.log(a);function d(g){if(g instanceof Uint8Array||(ArrayBuffer.isView(g)?g=new Uint8Array(g.buffer,g.byteOffset,g.byteLength):Array.isArray(g)&&(g=Uint8Array.from(g))),!(g instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(g.length===0)return"";for(var f=0,w=0,m=0,y=g.length;m!==y&&g[m]===0;)m++,f++;for(var b=(y-m)*u+1>>>0,v=new Uint8Array(b);m!==y;){for(var S=g[m],N=0,P=b-1;(S!==0||N<w)&&P!==-1;P--,N++)S+=256*v[P]>>>0,v[P]=S%a>>>0,S=S/a>>>0;if(S!==0)throw new Error("Non-zero carry");w=N,m++}for(var k=b-w;k!==b&&v[k]===0;)k++;for(var _=c.repeat(f);k<b;++k)_+=t.charAt(v[k]);return _}function h(g){if(typeof g!="string")throw new TypeError("Expected String");if(g.length===0)return new Uint8Array;var f=0;if(g[f]!==" "){for(var w=0,m=0;g[f]===c;)w++,f++;for(var y=(g.length-f)*l+1>>>0,b=new Uint8Array(y);g[f];){var v=i[g.charCodeAt(f)];if(v===255)return;for(var S=0,N=y-1;(v!==0||S<m)&&N!==-1;N--,S++)v+=a*b[N]>>>0,b[N]=v%256>>>0,v=v/256>>>0;if(v!==0)throw new Error("Non-zero carry");m=S,f++}if(g[f]!==" "){for(var P=y-m;P!==y&&b[P]===0;)P++;for(var k=new Uint8Array(w+(y-P)),_=w;P!==y;)k[_++]=b[P++];return k}}}function p(g){var f=h(g);if(f)return f;throw new Error(`Non-${e} character`)}return{encode:d,decodeUnsafe:h,decode:p}}var Q4=X4,e6=Q4;const jw=t=>{if(t instanceof Uint8Array&&t.constructor.name==="Uint8Array")return t;if(t instanceof ArrayBuffer)return new Uint8Array(t);if(ArrayBuffer.isView(t))return new Uint8Array(t.buffer,t.byteOffset,t.byteLength);throw new Error("Unknown type, must be binary type")},t6=t=>new TextEncoder().encode(t),i6=t=>new TextDecoder().decode(t);let r6=class{constructor(e,i,r){this.name=e,this.prefix=i,this.baseEncode=r}encode(e){if(e instanceof Uint8Array)return`${this.prefix}${this.baseEncode(e)}`;throw Error("Unknown type, must be binary type")}},s6=class{constructor(e,i,r){if(this.name=e,this.prefix=i,i.codePointAt(0)===void 0)throw new Error("Invalid prefix character");this.prefixCodePoint=i.codePointAt(0),this.baseDecode=r}decode(e){if(typeof e=="string"){if(e.codePointAt(0)!==this.prefixCodePoint)throw Error(`Unable to decode multibase string ${JSON.stringify(e)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);return this.baseDecode(e.slice(this.prefix.length))}else throw Error("Can only multibase decode strings")}or(e){return zw(this,e)}},n6=class{constructor(e){this.decoders=e}or(e){return zw(this,e)}decode(e){const i=e[0],r=this.decoders[i];if(r)return r.decode(e);throw RangeError(`Unable to decode multibase string ${JSON.stringify(e)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`)}};const zw=(t,e)=>new n6({...t.decoders||{[t.prefix]:t},...e.decoders||{[e.prefix]:e}});let o6=class{constructor(e,i,r,s){this.name=e,this.prefix=i,this.baseEncode=r,this.baseDecode=s,this.encoder=new r6(e,i,r),this.decoder=new s6(e,i,s)}encode(e){return this.encoder.encode(e)}decode(e){return this.decoder.decode(e)}};const pu=({name:t,prefix:e,encode:i,decode:r})=>new o6(t,e,i,r),rc=({prefix:t,name:e,alphabet:i})=>{const{encode:r,decode:s}=e6(i,e);return pu({prefix:t,name:e,encode:r,decode:n=>jw(s(n))})},a6=(t,e,i,r)=>{const s={};for(let u=0;u<e.length;++u)s[e[u]]=u;let n=t.length;for(;t[n-1]==="=";)--n;const o=new Uint8Array(n*i/8|0);let a=0,c=0,l=0;for(let u=0;u<n;++u){const d=s[t[u]];if(d===void 0)throw new SyntaxError(`Non-${r} character`);c=c<<i|d,a+=i,a>=8&&(a-=8,o[l++]=255&c>>a)}if(a>=i||255&c<<8-a)throw new SyntaxError("Unexpected end of data");return o},c6=(t,e,i)=>{const r=e[e.length-1]==="=",s=(1<<i)-1;let n="",o=0,a=0;for(let c=0;c<t.length;++c)for(a=a<<8|t[c],o+=8;o>i;)o-=i,n+=e[s&a>>o];if(o&&(n+=e[s&a<<i-o]),r)for(;n.length*i&7;)n+="=";return n},Et=({name:t,prefix:e,bitsPerChar:i,alphabet:r})=>pu({prefix:e,name:t,encode(s){return c6(s,r,i)},decode(s){return a6(s,r,i,t)}}),l6=pu({prefix:"\0",name:"identity",encode:t=>i6(t),decode:t=>t6(t)});var u6=Object.freeze({__proto__:null,identity:l6});const d6=Et({prefix:"0",name:"base2",alphabet:"01",bitsPerChar:1});var h6=Object.freeze({__proto__:null,base2:d6});const p6=Et({prefix:"7",name:"base8",alphabet:"01234567",bitsPerChar:3});var g6=Object.freeze({__proto__:null,base8:p6});const f6=rc({prefix:"9",name:"base10",alphabet:"0123456789"});var w6=Object.freeze({__proto__:null,base10:f6});const m6=Et({prefix:"f",name:"base16",alphabet:"0123456789abcdef",bitsPerChar:4}),y6=Et({prefix:"F",name:"base16upper",alphabet:"0123456789ABCDEF",bitsPerChar:4});var b6=Object.freeze({__proto__:null,base16:m6,base16upper:y6});const v6=Et({prefix:"b",name:"base32",alphabet:"abcdefghijklmnopqrstuvwxyz234567",bitsPerChar:5}),C6=Et({prefix:"B",name:"base32upper",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",bitsPerChar:5}),E6=Et({prefix:"c",name:"base32pad",alphabet:"abcdefghijklmnopqrstuvwxyz234567=",bitsPerChar:5}),x6=Et({prefix:"C",name:"base32padupper",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",bitsPerChar:5}),I6=Et({prefix:"v",name:"base32hex",alphabet:"0123456789abcdefghijklmnopqrstuv",bitsPerChar:5}),A6=Et({prefix:"V",name:"base32hexupper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV",bitsPerChar:5}),_6=Et({prefix:"t",name:"base32hexpad",alphabet:"0123456789abcdefghijklmnopqrstuv=",bitsPerChar:5}),N6=Et({prefix:"T",name:"base32hexpadupper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV=",bitsPerChar:5}),S6=Et({prefix:"h",name:"base32z",alphabet:"ybndrfg8ejkmcpqxot1uwisza345h769",bitsPerChar:5});var $6=Object.freeze({__proto__:null,base32:v6,base32upper:C6,base32pad:E6,base32padupper:x6,base32hex:I6,base32hexupper:A6,base32hexpad:_6,base32hexpadupper:N6,base32z:S6});const k6=rc({prefix:"k",name:"base36",alphabet:"0123456789abcdefghijklmnopqrstuvwxyz"}),P6=rc({prefix:"K",name:"base36upper",alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"});var O6=Object.freeze({__proto__:null,base36:k6,base36upper:P6});const T6=rc({name:"base58btc",prefix:"z",alphabet:"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"}),R6=rc({name:"base58flickr",prefix:"Z",alphabet:"123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"});var L6=Object.freeze({__proto__:null,base58btc:T6,base58flickr:R6});const M6=Et({prefix:"m",name:"base64",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",bitsPerChar:6}),B6=Et({prefix:"M",name:"base64pad",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",bitsPerChar:6}),U6=Et({prefix:"u",name:"base64url",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",bitsPerChar:6}),D6=Et({prefix:"U",name:"base64urlpad",alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",bitsPerChar:6});var j6=Object.freeze({__proto__:null,base64:M6,base64pad:B6,base64url:U6,base64urlpad:D6});const Fw=Array.from("🚀🪐☄🛰🌌🌑🌒🌓🌔🌕🌖🌗🌘🌍🌏🌎🐉☀💻🖥💾💿😂❤😍🤣😊🙏💕😭😘👍😅👏😁🔥🥰💔💖💙😢🤔😆🙄💪😉☺👌🤗💜😔😎😇🌹🤦🎉💞✌✨🤷😱😌🌸🙌😋💗💚😏💛🙂💓🤩😄😀🖤😃💯🙈👇🎶😒🤭❣😜💋👀😪😑💥🙋😞😩😡🤪👊🥳😥🤤👉💃😳✋😚😝😴🌟😬🙃🍀🌷😻😓⭐✅🥺🌈😈🤘💦✔😣🏃💐☹🎊💘😠☝😕🌺🎂🌻😐🖕💝🙊😹🗣💫💀👑🎵🤞😛🔴😤🌼😫⚽🤙☕🏆🤫👈😮🙆🍻🍃🐶💁😲🌿🧡🎁⚡🌞🎈❌✊👋😰🤨😶🤝🚶💰🍓💢🤟🙁🚨💨🤬✈🎀🍺🤓😙💟🌱😖👶🥴▶➡❓💎💸⬇😨🌚🦋😷🕺⚠🙅😟😵👎🤲🤠🤧📌🔵💅🧐🐾🍒😗🤑🌊🤯🐷☎💧😯💆👆🎤🙇🍑❄🌴💣🐸💌📍🥀🤢👅💡💩👐📸👻🤐🤮🎼🥵🚩🍎🍊👼💍📣🥂"),z6=Fw.reduce((t,e,i)=>(t[i]=e,t),[]),F6=Fw.reduce((t,e,i)=>(t[e.codePointAt(0)]=i,t),[]);function H6(t){return t.reduce((e,i)=>(e+=z6[i],e),"")}function q6(t){const e=[];for(const i of t){const r=F6[i.codePointAt(0)];if(r===void 0)throw new Error(`Non-base256emoji character: ${i}`);e.push(r)}return new Uint8Array(e)}const W6=pu({prefix:"🚀",name:"base256emoji",encode:H6,decode:q6});var V6=Object.freeze({__proto__:null,base256emoji:W6}),K6=Hw,p1=128,G6=127,Z6=~G6,Y6=Math.pow(2,31);function Hw(t,e,i){e=e||[],i=i||0;for(var r=i;t>=Y6;)e[i++]=t&255|p1,t/=128;for(;t&Z6;)e[i++]=t&255|p1,t>>>=7;return e[i]=t|0,Hw.bytes=i-r+1,e}var J6=Dh,X6=128,g1=127;function Dh(t,r){var i=0,r=r||0,s=0,n=r,o,a=t.length;do{if(n>=a)throw Dh.bytes=0,new RangeError("Could not decode varint");o=t[n++],i+=s<28?(o&g1)<<s:(o&g1)*Math.pow(2,s),s+=7}while(o>=X6);return Dh.bytes=n-r,i}var Q6=Math.pow(2,7),e8=Math.pow(2,14),t8=Math.pow(2,21),i8=Math.pow(2,28),r8=Math.pow(2,35),s8=Math.pow(2,42),n8=Math.pow(2,49),o8=Math.pow(2,56),a8=Math.pow(2,63),c8=function(t){return t<Q6?1:t<e8?2:t<t8?3:t<i8?4:t<r8?5:t<s8?6:t<n8?7:t<o8?8:t<a8?9:10},l8={encode:K6,decode:J6,encodingLength:c8},qw=l8;const f1=(t,e,i=0)=>(qw.encode(t,e,i),e),w1=t=>qw.encodingLength(t),jh=(t,e)=>{const i=e.byteLength,r=w1(t),s=r+w1(i),n=new Uint8Array(s+i);return f1(t,n,0),f1(i,n,r),n.set(e,s),new u8(t,i,e,n)};let u8=class{constructor(e,i,r,s){this.code=e,this.size=i,this.digest=r,this.bytes=s}};const Ww=({name:t,code:e,encode:i})=>new d8(t,e,i);let d8=class{constructor(e,i,r){this.name=e,this.code=i,this.encode=r}digest(e){if(e instanceof Uint8Array){const i=this.encode(e);return i instanceof Uint8Array?jh(this.code,i):i.then(r=>jh(this.code,r))}else throw Error("Unknown type, must be binary type")}};const Vw=t=>async e=>new Uint8Array(await crypto.subtle.digest(t,e)),h8=Ww({name:"sha2-256",code:18,encode:Vw("SHA-256")}),p8=Ww({name:"sha2-512",code:19,encode:Vw("SHA-512")});var g8=Object.freeze({__proto__:null,sha256:h8,sha512:p8});const Kw=0,f8="identity",Gw=jw,w8=t=>jh(Kw,Gw(t)),m8={code:Kw,name:f8,encode:Gw,digest:w8};var y8=Object.freeze({__proto__:null,identity:m8});new TextEncoder,new TextDecoder;const m1={...u6,...h6,...g6,...w6,...b6,...$6,...O6,...L6,...j6,...V6};({...g8,...y8});function b8(t=0){return globalThis.Buffer!=null&&globalThis.Buffer.allocUnsafe!=null?globalThis.Buffer.allocUnsafe(t):new Uint8Array(t)}function Zw(t,e,i,r){return{name:t,prefix:e,encoder:{name:t,prefix:e,encode:i},decoder:{decode:r}}}const y1=Zw("utf8","u",t=>"u"+new TextDecoder("utf8").decode(t),t=>new TextEncoder().encode(t.substring(1))),Wu=Zw("ascii","a",t=>{let e="a";for(let i=0;i<t.length;i++)e+=String.fromCharCode(t[i]);return e},t=>{t=t.substring(1);const e=b8(t.length);for(let i=0;i<t.length;i++)e[i]=t.charCodeAt(i);return e}),v8={utf8:y1,"utf-8":y1,hex:m1.base16,latin1:Wu,ascii:Wu,binary:Wu,...m1};function C8(t,e="utf8"){const i=v8[e];if(!i)throw new Error(`Unsupported encoding "${e}"`);return(e==="utf8"||e==="utf-8")&&globalThis.Buffer!=null&&globalThis.Buffer.from!=null?globalThis.Buffer.from(t,"utf8"):i.decoder.decode(`${i.prefix}${t}`)}var E8=Object.defineProperty,x8=(t,e,i)=>e in t?E8(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Bi=(t,e,i)=>x8(t,typeof e!="symbol"?e+"":e,i);let I8=class{constructor(e,i){this.core=e,this.logger=i,Bi(this,"keychain",new Map),Bi(this,"name",x4),Bi(this,"version",I4),Bi(this,"initialized",!1),Bi(this,"storagePrefix",Ji),Bi(this,"init",async()=>{if(!this.initialized){const r=await this.getKeyChain();typeof r<"u"&&(this.keychain=r),this.initialized=!0}}),Bi(this,"has",r=>(this.isInitialized(),this.keychain.has(r))),Bi(this,"set",async(r,s)=>{this.isInitialized(),this.keychain.set(r,s),await this.persist()}),Bi(this,"get",r=>{this.isInitialized();const s=this.keychain.get(r);if(typeof s>"u"){const{message:n}=H("NO_MATCHING_KEY",`${this.name}: ${r}`);throw new Error(n)}return s}),Bi(this,"del",async r=>{this.isInitialized(),this.keychain.delete(r),await this.persist()}),this.core=e,this.logger=Tt(i,this.name)}get context(){return ni(this.logger)}get storageKey(){return this.storagePrefix+this.version+this.core.customStoragePrefix+"//"+this.name}async setKeyChain(e){await this.core.storage.setItem(this.storageKey,Ah(e))}async getKeyChain(){const e=await this.core.storage.getItem(this.storageKey);return typeof e<"u"?_h(e):void 0}async persist(){await this.setKeyChain(this.keychain)}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}};var A8=Object.defineProperty,_8=(t,e,i)=>e in t?A8(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,yt=(t,e,i)=>_8(t,typeof e!="symbol"?e+"":e,i);let N8=class{constructor(e,i,r){this.core=e,this.logger=i,yt(this,"name",C4),yt(this,"keychain"),yt(this,"randomSessionIdentifier",Mh()),yt(this,"initialized",!1),yt(this,"init",async()=>{this.initialized||(await this.keychain.init(),this.initialized=!0)}),yt(this,"hasKeys",s=>(this.isInitialized(),this.keychain.has(s))),yt(this,"getClientId",async()=>{this.isInitialized();const s=await this.getClientSeed(),n=o0(s);return hy(n.publicKey)}),yt(this,"generateKeyPair",()=>{this.isInitialized();const s=D3();return this.setPrivateKey(s.publicKey,s.privateKey)}),yt(this,"signJWT",async s=>{this.isInitialized();const n=await this.getClientSeed(),o=o0(n),a=this.randomSessionIdentifier;return await py(a,s,E4,o)}),yt(this,"generateSharedKey",(s,n,o)=>{this.isInitialized();const a=this.getPrivateKey(s),c=j3(a,n);return this.setSymKey(c,o)}),yt(this,"setSymKey",async(s,n)=>{this.isInitialized();const o=n||$l(s);return await this.keychain.set(o,s),o}),yt(this,"deleteKeyPair",async s=>{this.isInitialized(),await this.keychain.del(s)}),yt(this,"deleteSymKey",async s=>{this.isInitialized(),await this.keychain.del(s)}),yt(this,"encode",async(s,n,o)=>{this.isInitialized();const a=Ow(o),c=vp(n);if(J0(a))return H3(c,o==null?void 0:o.encoding);if(Y0(a)){const h=a.senderPublicKey,p=a.receiverPublicKey;s=await this.generateSharedKey(h,p)}const l=this.getSymKey(s),{type:u,senderPublicKey:d}=a;return z3({type:u,symKey:l,message:c,senderPublicKey:d,encoding:o==null?void 0:o.encoding})}),yt(this,"decode",async(s,n,o)=>{this.isInitialized();const a=W3(n,o);if(J0(a)){const c=q3(n,o==null?void 0:o.encoding);return Ml(c)}if(Y0(a)){const c=a.receiverPublicKey,l=a.senderPublicKey;s=await this.generateSharedKey(c,l)}try{const c=this.getSymKey(s),l=F3({symKey:c,encoded:n,encoding:o==null?void 0:o.encoding});return Ml(l)}catch(c){this.logger.error(`Failed to decode message from topic: '${s}', clientId: '${await this.getClientId()}'`),this.logger.error(c)}}),yt(this,"getPayloadType",(s,n=Oi)=>{const o=ba({encoded:s,encoding:n});return Fs(o.type)}),yt(this,"getPayloadSenderPublicKey",(s,n=Oi)=>{const o=ba({encoded:s,encoding:n});return o.senderPublicKey?Wt(o.senderPublicKey,Pt):void 0}),this.core=e,this.logger=Tt(i,this.name),this.keychain=r||new I8(this.core,this.logger)}get context(){return ni(this.logger)}async setPrivateKey(e,i){return await this.keychain.set(e,i),e}getPrivateKey(e){return this.keychain.get(e)}async getClientSeed(){let e="";try{e=this.keychain.get(u1)}catch{e=Mh(),await this.keychain.set(u1,e)}return C8(e,"base16")}getSymKey(e){return this.keychain.get(e)}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}};var S8=Object.defineProperty,$8=Object.defineProperties,k8=Object.getOwnPropertyDescriptors,b1=Object.getOwnPropertySymbols,P8=Object.prototype.hasOwnProperty,O8=Object.prototype.propertyIsEnumerable,zh=(t,e,i)=>e in t?S8(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,T8=(t,e)=>{for(var i in e||(e={}))P8.call(e,i)&&zh(t,i,e[i]);if(b1)for(var i of b1(e))O8.call(e,i)&&zh(t,i,e[i]);return t},R8=(t,e)=>$8(t,k8(e)),Kt=(t,e,i)=>zh(t,typeof e!="symbol"?e+"":e,i);let L8=class extends u4{constructor(e,i){super(e,i),this.logger=e,this.core=i,Kt(this,"messages",new Map),Kt(this,"messagesWithoutClientAck",new Map),Kt(this,"name",A4),Kt(this,"version",_4),Kt(this,"initialized",!1),Kt(this,"storagePrefix",Ji),Kt(this,"init",async()=>{if(!this.initialized){this.logger.trace("Initialized");try{const r=await this.getRelayerMessages();typeof r<"u"&&(this.messages=r);const s=await this.getRelayerMessagesWithoutClientAck();typeof s<"u"&&(this.messagesWithoutClientAck=s),this.logger.debug(`Successfully Restored records for ${this.name}`),this.logger.trace({type:"method",method:"restore",size:this.messages.size})}catch(r){this.logger.debug(`Failed to Restore records for ${this.name}`),this.logger.error(r)}finally{this.initialized=!0}}}),Kt(this,"set",async(r,s,n)=>{this.isInitialized();const o=Ki(s);let a=this.messages.get(r);if(typeof a>"u"&&(a={}),typeof a[o]<"u")return o;if(a[o]=s,this.messages.set(r,a),n===Ol.inbound){const c=this.messagesWithoutClientAck.get(r)||{};this.messagesWithoutClientAck.set(r,R8(T8({},c),{[o]:s}))}return await this.persist(),o}),Kt(this,"get",r=>{this.isInitialized();let s=this.messages.get(r);return typeof s>"u"&&(s={}),s}),Kt(this,"getWithoutAck",r=>{this.isInitialized();const s={};for(const n of r){const o=this.messagesWithoutClientAck.get(n)||{};s[n]=Object.values(o)}return s}),Kt(this,"has",(r,s)=>{this.isInitialized();const n=this.get(r),o=Ki(s);return typeof n[o]<"u"}),Kt(this,"ack",async(r,s)=>{this.isInitialized();const n=this.messagesWithoutClientAck.get(r);if(typeof n>"u")return;const o=Ki(s);delete n[o],Object.keys(n).length===0?this.messagesWithoutClientAck.delete(r):this.messagesWithoutClientAck.set(r,n),await this.persist()}),Kt(this,"del",async r=>{this.isInitialized(),this.messages.delete(r),this.messagesWithoutClientAck.delete(r),await this.persist()}),this.logger=Tt(e,this.name),this.core=i}get context(){return ni(this.logger)}get storageKey(){return this.storagePrefix+this.version+this.core.customStoragePrefix+"//"+this.name}get storageKeyWithoutClientAck(){return this.storagePrefix+this.version+this.core.customStoragePrefix+"//"+this.name+"_withoutClientAck"}async setRelayerMessages(e){await this.core.storage.setItem(this.storageKey,Ah(e))}async setRelayerMessagesWithoutClientAck(e){await this.core.storage.setItem(this.storageKeyWithoutClientAck,Ah(e))}async getRelayerMessages(){const e=await this.core.storage.getItem(this.storageKey);return typeof e<"u"?_h(e):void 0}async getRelayerMessagesWithoutClientAck(){const e=await this.core.storage.getItem(this.storageKeyWithoutClientAck);return typeof e<"u"?_h(e):void 0}async persist(){await this.setRelayerMessages(this.messages),await this.setRelayerMessagesWithoutClientAck(this.messagesWithoutClientAck)}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}};var M8=Object.defineProperty,B8=Object.defineProperties,U8=Object.getOwnPropertyDescriptors,v1=Object.getOwnPropertySymbols,D8=Object.prototype.hasOwnProperty,j8=Object.prototype.propertyIsEnumerable,Fh=(t,e,i)=>e in t?M8(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,vc=(t,e)=>{for(var i in e||(e={}))D8.call(e,i)&&Fh(t,i,e[i]);if(v1)for(var i of v1(e))j8.call(e,i)&&Fh(t,i,e[i]);return t},Vu=(t,e)=>B8(t,U8(e)),Ii=(t,e,i)=>Fh(t,typeof e!="symbol"?e+"":e,i);let z8=class extends d4{constructor(e,i){super(e,i),this.relayer=e,this.logger=i,Ii(this,"events",new Jr.EventEmitter),Ii(this,"name",N4),Ii(this,"queue",new Map),Ii(this,"publishTimeout",V.toMiliseconds(V.ONE_MINUTE)),Ii(this,"initialPublishTimeout",V.toMiliseconds(V.ONE_SECOND*15)),Ii(this,"needsTransportRestart",!1),Ii(this,"publish",async(r,s,n)=>{var o;this.logger.debug("Publishing Payload"),this.logger.trace({type:"method",method:"publish",params:{topic:r,message:s,opts:n}});const a=(n==null?void 0:n.ttl)||d1,c=jl(n),l=(n==null?void 0:n.prompt)||!1,u=(n==null?void 0:n.tag)||0,d=(n==null?void 0:n.id)||On().toString(),h={topic:r,message:s,opts:{ttl:a,relay:c,prompt:l,tag:u,id:d,attestation:n==null?void 0:n.attestation,tvf:n==null?void 0:n.tvf}},p=`Failed to publish payload, please try again. id:${d} tag:${u}`;try{const g=new Promise(async f=>{const w=({id:y})=>{h.opts.id===y&&(this.removeRequestFromQueue(y),this.relayer.events.removeListener(pt.publish,w),f(h))};this.relayer.events.on(pt.publish,w);const m=Dr(new Promise((y,b)=>{this.rpcPublish({topic:r,message:s,ttl:a,prompt:l,tag:u,id:d,attestation:n==null?void 0:n.attestation,tvf:n==null?void 0:n.tvf}).then(y).catch(v=>{this.logger.warn(v,v==null?void 0:v.message),b(v)})}),this.initialPublishTimeout,`Failed initial publish, retrying.... id:${d} tag:${u}`);try{await m,this.events.removeListener(pt.publish,w)}catch(y){this.queue.set(d,Vu(vc({},h),{attempt:1})),this.logger.warn(y,y==null?void 0:y.message)}});this.logger.trace({type:"method",method:"publish",params:{id:d,topic:r,message:s,opts:n}}),await Dr(g,this.publishTimeout,p)}catch(g){if(this.logger.debug("Failed to Publish Payload"),this.logger.error(g),(o=n==null?void 0:n.internal)!=null&&o.throwOnFailedPublish)throw g}finally{this.queue.delete(d)}}),Ii(this,"on",(r,s)=>{this.events.on(r,s)}),Ii(this,"once",(r,s)=>{this.events.once(r,s)}),Ii(this,"off",(r,s)=>{this.events.off(r,s)}),Ii(this,"removeListener",(r,s)=>{this.events.removeListener(r,s)}),this.relayer=e,this.logger=Tt(i,this.name),this.registerEventListeners()}get context(){return ni(this.logger)}async rpcPublish(e){var i,r,s,n;const{topic:o,message:a,ttl:c=d1,prompt:l,tag:u,id:d,attestation:h,tvf:p}=e,g={method:Zo(jl().protocol).publish,params:vc({topic:o,message:a,ttl:c,prompt:l,tag:u,attestation:h},p),id:d};Ct((i=g.params)==null?void 0:i.prompt)&&((r=g.params)==null||delete r.prompt),Ct((s=g.params)==null?void 0:s.tag)&&((n=g.params)==null||delete n.tag),this.logger.debug("Outgoing Relay Payload"),this.logger.trace({type:"message",direction:"outgoing",request:g});const f=await this.relayer.request(g);return this.relayer.events.emit(pt.publish,e),this.logger.debug("Successfully Published Payload"),f}removeRequestFromQueue(e){this.queue.delete(e)}checkQueue(){this.queue.forEach(async(e,i)=>{const r=e.attempt+1;this.queue.set(i,Vu(vc({},e),{attempt:r}));const{topic:s,message:n,opts:o,attestation:a}=e;this.logger.warn({},`Publisher: queue->publishing: ${e.opts.id}, tag: ${e.opts.tag}, attempt: ${r}`),await this.rpcPublish(Vu(vc({},e),{topic:s,message:n,ttl:o.ttl,prompt:o.prompt,tag:o.tag,id:o.id,attestation:a,tvf:o.tvf})),this.logger.warn({},`Publisher: queue->published: ${e.opts.id}`)})}registerEventListeners(){this.relayer.core.heartbeat.on(Za.pulse,()=>{if(this.needsTransportRestart){this.needsTransportRestart=!1,this.relayer.events.emit(pt.connection_stalled);return}this.checkQueue()}),this.relayer.on(pt.message_ack,e=>{this.removeRequestFromQueue(e.id.toString())})}};var F8=Object.defineProperty,H8=(t,e,i)=>e in t?F8(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,en=(t,e,i)=>H8(t,typeof e!="symbol"?e+"":e,i);let q8=class{constructor(){en(this,"map",new Map),en(this,"set",(e,i)=>{const r=this.get(e);this.exists(e,i)||this.map.set(e,[...r,i])}),en(this,"get",e=>this.map.get(e)||[]),en(this,"exists",(e,i)=>this.get(e).includes(i)),en(this,"delete",(e,i)=>{if(typeof i>"u"){this.map.delete(e);return}if(!this.map.has(e))return;const r=this.get(e);if(!this.exists(e,i))return;const s=r.filter(n=>n!==i);if(!s.length){this.map.delete(e);return}this.map.set(e,s)}),en(this,"clear",()=>{this.map.clear()})}get topics(){return Array.from(this.map.keys())}};var W8=Object.defineProperty,V8=Object.defineProperties,K8=Object.getOwnPropertyDescriptors,C1=Object.getOwnPropertySymbols,G8=Object.prototype.hasOwnProperty,Z8=Object.prototype.propertyIsEnumerable,Hh=(t,e,i)=>e in t?W8(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,bo=(t,e)=>{for(var i in e||(e={}))G8.call(e,i)&&Hh(t,i,e[i]);if(C1)for(var i of C1(e))Z8.call(e,i)&&Hh(t,i,e[i]);return t},Ku=(t,e)=>V8(t,K8(e)),Be=(t,e,i)=>Hh(t,typeof e!="symbol"?e+"":e,i);let Y8=class extends g4{constructor(e,i){super(e,i),this.relayer=e,this.logger=i,Be(this,"subscriptions",new Map),Be(this,"topicMap",new q8),Be(this,"events",new Jr.EventEmitter),Be(this,"name",R4),Be(this,"version",L4),Be(this,"pending",new Map),Be(this,"cached",[]),Be(this,"initialized",!1),Be(this,"storagePrefix",Ji),Be(this,"subscribeTimeout",V.toMiliseconds(V.ONE_MINUTE)),Be(this,"initialSubscribeTimeout",V.toMiliseconds(V.ONE_SECOND*15)),Be(this,"clientId"),Be(this,"batchSubscribeTopicsLimit",500),Be(this,"init",async()=>{this.initialized||(this.logger.trace("Initialized"),this.registerEventListeners(),await this.restore()),this.initialized=!0}),Be(this,"subscribe",async(r,s)=>{this.isInitialized(),this.logger.debug("Subscribing Topic"),this.logger.trace({type:"method",method:"subscribe",params:{topic:r,opts:s}});try{const n=jl(s),o={topic:r,relay:n,transportType:s==null?void 0:s.transportType};this.pending.set(r,o);const a=await this.rpcSubscribe(r,n,s);return typeof a=="string"&&(this.onSubscribe(a,o),this.logger.debug("Successfully Subscribed Topic"),this.logger.trace({type:"method",method:"subscribe",params:{topic:r,opts:s}})),a}catch(n){throw this.logger.debug("Failed to Subscribe Topic"),this.logger.error(n),n}}),Be(this,"unsubscribe",async(r,s)=>{this.isInitialized(),typeof(s==null?void 0:s.id)<"u"?await this.unsubscribeById(r,s.id,s):await this.unsubscribeByTopic(r,s)}),Be(this,"isSubscribed",r=>new Promise(s=>{s(this.topicMap.topics.includes(r))})),Be(this,"isKnownTopic",r=>new Promise(s=>{s(this.topicMap.topics.includes(r)||this.pending.has(r)||this.cached.some(n=>n.topic===r))})),Be(this,"on",(r,s)=>{this.events.on(r,s)}),Be(this,"once",(r,s)=>{this.events.once(r,s)}),Be(this,"off",(r,s)=>{this.events.off(r,s)}),Be(this,"removeListener",(r,s)=>{this.events.removeListener(r,s)}),Be(this,"start",async()=>{await this.onConnect()}),Be(this,"stop",async()=>{await this.onDisconnect()}),Be(this,"restart",async()=>{await this.restore(),await this.onRestart()}),Be(this,"checkPending",async()=>{if(this.pending.size===0&&(!this.initialized||!this.relayer.connected))return;const r=[];this.pending.forEach(s=>{r.push(s)}),await this.batchSubscribe(r)}),Be(this,"registerEventListeners",()=>{this.relayer.core.heartbeat.on(Za.pulse,async()=>{await this.checkPending()}),this.events.on(Qt.created,async r=>{const s=Qt.created;this.logger.info(`Emitting ${s}`),this.logger.debug({type:"event",event:s,data:r}),await this.persist()}),this.events.on(Qt.deleted,async r=>{const s=Qt.deleted;this.logger.info(`Emitting ${s}`),this.logger.debug({type:"event",event:s,data:r}),await this.persist()})}),this.relayer=e,this.logger=Tt(i,this.name),this.clientId=""}get context(){return ni(this.logger)}get storageKey(){return this.storagePrefix+this.version+this.relayer.core.customStoragePrefix+"//"+this.name}get length(){return this.subscriptions.size}get ids(){return Array.from(this.subscriptions.keys())}get values(){return Array.from(this.subscriptions.values())}get topics(){return this.topicMap.topics}get hasAnyTopics(){return this.topicMap.topics.length>0||this.pending.size>0||this.cached.length>0||this.subscriptions.size>0}hasSubscription(e,i){let r=!1;try{r=this.getSubscription(e).topic===i}catch{}return r}reset(){this.cached=[],this.initialized=!0}onDisable(){this.cached=this.values,this.subscriptions.clear(),this.topicMap.clear()}async unsubscribeByTopic(e,i){const r=this.topicMap.get(e);await Promise.all(r.map(async s=>await this.unsubscribeById(e,s,i)))}async unsubscribeById(e,i,r){this.logger.debug("Unsubscribing Topic"),this.logger.trace({type:"method",method:"unsubscribe",params:{topic:e,id:i,opts:r}});try{const s=jl(r);await this.restartToComplete({topic:e,id:i,relay:s}),await this.rpcUnsubscribe(e,i,s);const n=Le("USER_DISCONNECTED",`${this.name}, ${e}`);await this.onUnsubscribe(e,i,n),this.logger.debug("Successfully Unsubscribed Topic"),this.logger.trace({type:"method",method:"unsubscribe",params:{topic:e,id:i,opts:r}})}catch(s){throw this.logger.debug("Failed to Unsubscribe Topic"),this.logger.error(s),s}}async rpcSubscribe(e,i,r){var s;(!r||(r==null?void 0:r.transportType)===We.relay)&&await this.restartToComplete({topic:e,id:e,relay:i});const n={method:Zo(i.protocol).subscribe,params:{topic:e}};this.logger.debug("Outgoing Relay Payload"),this.logger.trace({type:"payload",direction:"outgoing",request:n});const o=(s=r==null?void 0:r.internal)==null?void 0:s.throwOnFailedPublish;try{const a=await this.getSubscriptionId(e);if((r==null?void 0:r.transportType)===We.link_mode)return setTimeout(()=>{(this.relayer.connected||this.relayer.connecting)&&this.relayer.request(n).catch(u=>this.logger.warn(u))},V.toMiliseconds(V.ONE_SECOND)),a;const c=new Promise(async u=>{const d=h=>{h.topic===e&&(this.events.removeListener(Qt.created,d),u(h.id))};this.events.on(Qt.created,d);try{const h=await Dr(new Promise((p,g)=>{this.relayer.request(n).catch(f=>{this.logger.warn(f,f==null?void 0:f.message),g(f)}).then(p)}),this.initialSubscribeTimeout,`Subscribing to ${e} failed, please try again`);this.events.removeListener(Qt.created,d),u(h)}catch{}}),l=await Dr(c,this.subscribeTimeout,`Subscribing to ${e} failed, please try again`);if(!l&&o)throw new Error(`Subscribing to ${e} failed, please try again`);return l?a:null}catch(a){if(this.logger.debug("Outgoing Relay Subscribe Payload stalled"),this.relayer.events.emit(pt.connection_stalled),o)throw a}return null}async rpcBatchSubscribe(e){if(!e.length)return;const i=e[0].relay,r={method:Zo(i.protocol).batchSubscribe,params:{topics:e.map(s=>s.topic)}};this.logger.debug("Outgoing Relay Payload"),this.logger.trace({type:"payload",direction:"outgoing",request:r});try{await await Dr(new Promise(s=>{this.relayer.request(r).catch(n=>this.logger.warn(n)).then(s)}),this.subscribeTimeout,"rpcBatchSubscribe failed, please try again")}catch{this.relayer.events.emit(pt.connection_stalled)}}async rpcBatchFetchMessages(e){if(!e.length)return;const i=e[0].relay,r={method:Zo(i.protocol).batchFetchMessages,params:{topics:e.map(n=>n.topic)}};this.logger.debug("Outgoing Relay Payload"),this.logger.trace({type:"payload",direction:"outgoing",request:r});let s;try{s=await await Dr(new Promise((n,o)=>{this.relayer.request(r).catch(a=>{this.logger.warn(a),o(a)}).then(n)}),this.subscribeTimeout,"rpcBatchFetchMessages failed, please try again")}catch{this.relayer.events.emit(pt.connection_stalled)}return s}rpcUnsubscribe(e,i,r){const s={method:Zo(r.protocol).unsubscribe,params:{topic:e,id:i}};return this.logger.debug("Outgoing Relay Payload"),this.logger.trace({type:"payload",direction:"outgoing",request:s}),this.relayer.request(s)}onSubscribe(e,i){this.setSubscription(e,Ku(bo({},i),{id:e})),this.pending.delete(i.topic)}onBatchSubscribe(e){e.length&&e.forEach(i=>{this.setSubscription(i.id,bo({},i)),this.pending.delete(i.topic)})}async onUnsubscribe(e,i,r){this.events.removeAllListeners(i),this.hasSubscription(i,e)&&this.deleteSubscription(i,r),await this.relayer.messages.del(e)}async setRelayerSubscriptions(e){await this.relayer.core.storage.setItem(this.storageKey,e)}async getRelayerSubscriptions(){return await this.relayer.core.storage.getItem(this.storageKey)}setSubscription(e,i){this.logger.debug("Setting subscription"),this.logger.trace({type:"method",method:"setSubscription",id:e,subscription:i}),this.addSubscription(e,i)}addSubscription(e,i){this.subscriptions.set(e,bo({},i)),this.topicMap.set(i.topic,e),this.events.emit(Qt.created,i)}getSubscription(e){this.logger.debug("Getting subscription"),this.logger.trace({type:"method",method:"getSubscription",id:e});const i=this.subscriptions.get(e);if(!i){const{message:r}=H("NO_MATCHING_KEY",`${this.name}: ${e}`);throw new Error(r)}return i}deleteSubscription(e,i){this.logger.debug("Deleting subscription"),this.logger.trace({type:"method",method:"deleteSubscription",id:e,reason:i});const r=this.getSubscription(e);this.subscriptions.delete(e),this.topicMap.delete(r.topic,e),this.events.emit(Qt.deleted,Ku(bo({},r),{reason:i}))}async persist(){await this.setRelayerSubscriptions(this.values),this.events.emit(Qt.sync)}async onRestart(){if(this.cached.length){const e=[...this.cached],i=Math.ceil(this.cached.length/this.batchSubscribeTopicsLimit);for(let r=0;r<i;r++){const s=e.splice(0,this.batchSubscribeTopicsLimit);await this.batchSubscribe(s)}}this.events.emit(Qt.resubscribed)}async restore(){try{const e=await this.getRelayerSubscriptions();if(typeof e>"u"||!e.length)return;if(this.subscriptions.size){const{message:i}=H("RESTORE_WILL_OVERRIDE",this.name);throw this.logger.error(i),this.logger.error(`${this.name}: ${JSON.stringify(this.values)}`),new Error(i)}this.cached=e,this.logger.debug(`Successfully Restored subscriptions for ${this.name}`),this.logger.trace({type:"method",method:"restore",subscriptions:this.values})}catch(e){this.logger.debug(`Failed to Restore subscriptions for ${this.name}`),this.logger.error(e)}}async batchSubscribe(e){e.length&&(await this.rpcBatchSubscribe(e),this.onBatchSubscribe(await Promise.all(e.map(async i=>Ku(bo({},i),{id:await this.getSubscriptionId(i.topic)})))))}async batchFetchMessages(e){if(!e.length)return;this.logger.trace(`Fetching batch messages for ${e.length} subscriptions`);const i=await this.rpcBatchFetchMessages(e);i&&i.messages&&(await _b(V.toMiliseconds(V.ONE_SECOND)),await this.relayer.handleBatchMessageEvents(i.messages))}async onConnect(){await this.restart(),this.reset()}onDisconnect(){this.onDisable()}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}async restartToComplete(e){!this.relayer.connected&&!this.relayer.connecting&&(this.cached.push(e),await this.relayer.transportOpen())}async getClientId(){return this.clientId||(this.clientId=await this.relayer.core.crypto.getClientId()),this.clientId}async getSubscriptionId(e){return Ki(e+await this.getClientId())}};var J8=Object.defineProperty,E1=Object.getOwnPropertySymbols,X8=Object.prototype.hasOwnProperty,Q8=Object.prototype.propertyIsEnumerable,qh=(t,e,i)=>e in t?J8(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,x1=(t,e)=>{for(var i in e||(e={}))X8.call(e,i)&&qh(t,i,e[i]);if(E1)for(var i of E1(e))Q8.call(e,i)&&qh(t,i,e[i]);return t},Ne=(t,e,i)=>qh(t,typeof e!="symbol"?e+"":e,i);let e9=class extends h4{constructor(e){super(e),Ne(this,"protocol","wc"),Ne(this,"version",2),Ne(this,"core"),Ne(this,"logger"),Ne(this,"events",new Jr.EventEmitter),Ne(this,"provider"),Ne(this,"messages"),Ne(this,"subscriber"),Ne(this,"publisher"),Ne(this,"name",$4),Ne(this,"transportExplicitlyClosed",!1),Ne(this,"initialized",!1),Ne(this,"connectionAttemptInProgress",!1),Ne(this,"relayUrl"),Ne(this,"projectId"),Ne(this,"packageName"),Ne(this,"bundleId"),Ne(this,"hasExperiencedNetworkDisruption",!1),Ne(this,"pingTimeout"),Ne(this,"heartBeatTimeout",V.toMiliseconds(V.THIRTY_SECONDS+V.FIVE_SECONDS)),Ne(this,"reconnectTimeout"),Ne(this,"connectPromise"),Ne(this,"reconnectInProgress",!1),Ne(this,"requestsInFlight",[]),Ne(this,"connectTimeout",V.toMiliseconds(V.ONE_SECOND*15)),Ne(this,"request",async i=>{var r,s;this.logger.debug("Publishing Request Payload");const n=i.id||On().toString();await this.toEstablishConnection();try{this.logger.trace({id:n,method:i.method,topic:(r=i.params)==null?void 0:r.topic},"relayer.request - publishing...");const o=`${n}:${((s=i.params)==null?void 0:s.tag)||""}`;this.requestsInFlight.push(o);const a=await this.provider.request(i);return this.requestsInFlight=this.requestsInFlight.filter(c=>c!==o),a}catch(o){throw this.logger.debug(`Failed to Publish Request: ${n}`),o}}),Ne(this,"resetPingTimeout",()=>{Ul()&&(clearTimeout(this.pingTimeout),this.pingTimeout=setTimeout(()=>{var i,r,s,n;try{this.logger.debug({},"pingTimeout: Connection stalled, terminating..."),(n=(s=(r=(i=this.provider)==null?void 0:i.connection)==null?void 0:r.socket)==null?void 0:s.terminate)==null||n.call(s)}catch(o){this.logger.warn(o,o==null?void 0:o.message)}},this.heartBeatTimeout))}),Ne(this,"onPayloadHandler",i=>{this.onProviderPayload(i),this.resetPingTimeout()}),Ne(this,"onConnectHandler",()=>{this.logger.warn({},"Relayer connected 🛜"),this.startPingTimeout(),this.events.emit(pt.connect)}),Ne(this,"onDisconnectHandler",()=>{this.logger.warn({},"Relayer disconnected 🛑"),this.requestsInFlight=[],this.onProviderDisconnect()}),Ne(this,"onProviderErrorHandler",i=>{this.logger.fatal(`Fatal socket error: ${i.message}`),this.events.emit(pt.error,i),this.logger.fatal("Fatal socket error received, closing transport"),this.transportClose()}),Ne(this,"registerProviderListeners",()=>{this.provider.on(ai.payload,this.onPayloadHandler),this.provider.on(ai.connect,this.onConnectHandler),this.provider.on(ai.disconnect,this.onDisconnectHandler),this.provider.on(ai.error,this.onProviderErrorHandler)}),this.core=e.core,this.logger=typeof e.logger<"u"&&typeof e.logger!="string"?Tt(e.logger,this.name):Cp(nu({level:e.logger||S4})),this.messages=new L8(this.logger,e.core),this.subscriber=new Y8(this,this.logger),this.publisher=new z8(this,this.logger),this.relayUrl=(e==null?void 0:e.relayUrl)||Uw,this.projectId=e.projectId,ub()?this.packageName=v0():db()&&(this.bundleId=v0()),this.provider={}}async init(){if(this.logger.trace("Initialized"),this.registerEventListeners(),await Promise.all([this.messages.init(),this.subscriber.init()]),this.initialized=!0,this.subscriber.hasAnyTopics)try{await this.transportOpen()}catch(e){this.logger.warn(e,e==null?void 0:e.message)}}get context(){return ni(this.logger)}get connected(){var e,i,r;return((r=(i=(e=this.provider)==null?void 0:e.connection)==null?void 0:i.socket)==null?void 0:r.readyState)===1||!1}get connecting(){var e,i,r;return((r=(i=(e=this.provider)==null?void 0:e.connection)==null?void 0:i.socket)==null?void 0:r.readyState)===0||this.connectPromise!==void 0||!1}async publish(e,i,r){this.isInitialized(),await this.publisher.publish(e,i,r),await this.recordMessageEvent({topic:e,message:i,publishedAt:Date.now(),transportType:We.relay},Ol.outbound)}async subscribe(e,i){var r,s,n;this.isInitialized(),(!(i!=null&&i.transportType)||(i==null?void 0:i.transportType)==="relay")&&await this.toEstablishConnection();const o=typeof((r=i==null?void 0:i.internal)==null?void 0:r.throwOnFailedPublish)>"u"?!0:(s=i==null?void 0:i.internal)==null?void 0:s.throwOnFailedPublish;let a=((n=this.subscriber.topicMap.get(e))==null?void 0:n[0])||"",c;const l=u=>{u.topic===e&&(this.subscriber.off(Qt.created,l),c())};return await Promise.all([new Promise(u=>{c=u,this.subscriber.on(Qt.created,l)}),new Promise(async(u,d)=>{a=await this.subscriber.subscribe(e,x1({internal:{throwOnFailedPublish:o}},i)).catch(h=>{o&&d(h)})||a,u()})]),a}async unsubscribe(e,i){this.isInitialized(),await this.subscriber.unsubscribe(e,i)}on(e,i){this.events.on(e,i)}once(e,i){this.events.once(e,i)}off(e,i){this.events.off(e,i)}removeListener(e,i){this.events.removeListener(e,i)}async transportDisconnect(){this.provider.disconnect&&(this.hasExperiencedNetworkDisruption||this.connected)?await Dr(this.provider.disconnect(),2e3,"provider.disconnect()").catch(()=>this.onProviderDisconnect()):this.onProviderDisconnect()}async transportClose(){this.transportExplicitlyClosed=!0,await this.transportDisconnect()}async transportOpen(e){if(!this.subscriber.hasAnyTopics){this.logger.warn("Starting WS connection skipped because the client has no topics to work with.");return}if(this.connectPromise?(this.logger.debug({},"Waiting for existing connection attempt to resolve..."),await this.connectPromise,this.logger.debug({},"Existing connection attempt resolved")):(this.connectPromise=new Promise(async(i,r)=>{await this.connect(e).then(i).catch(r).finally(()=>{this.connectPromise=void 0})}),await this.connectPromise),!this.connected)throw new Error(`Couldn't establish socket connection to the relay server: ${this.relayUrl}`)}async restartTransport(e){this.logger.debug({},"Restarting transport..."),!this.connectionAttemptInProgress&&(this.relayUrl=e||this.relayUrl,await this.confirmOnlineStateOrThrow(),await this.transportClose(),await this.transportOpen())}async confirmOnlineStateOrThrow(){if(!await n1())throw new Error("No internet connection detected. Please restart your network and try again.")}async handleBatchMessageEvents(e){if((e==null?void 0:e.length)===0){this.logger.trace("Batch message events is empty. Ignoring...");return}const i=e.sort((r,s)=>r.publishedAt-s.publishedAt);this.logger.debug(`Batch of ${i.length} message events sorted`);for(const r of i)try{await this.onMessageEvent(r)}catch(s){this.logger.warn(s,"Error while processing batch message event: "+(s==null?void 0:s.message))}this.logger.trace(`Batch of ${i.length} message events processed`)}async onLinkMessageEvent(e,i){const{topic:r}=e;if(!i.sessionExists){const s=it(V.FIVE_MINUTES),n={topic:r,expiry:s,relay:{protocol:"irn"},active:!1};await this.core.pairing.pairings.set(r,n)}this.events.emit(pt.message,e),await this.recordMessageEvent(e,Ol.inbound)}async connect(e){await this.confirmOnlineStateOrThrow(),e&&e!==this.relayUrl&&(this.relayUrl=e,await this.transportDisconnect()),this.connectionAttemptInProgress=!0,this.transportExplicitlyClosed=!1;let i=1;for(;i<6;){try{if(this.transportExplicitlyClosed)break;this.logger.debug({},`Connecting to ${this.relayUrl}, attempt: ${i}...`),await this.createProvider(),await new Promise(async(r,s)=>{const n=()=>{s(new Error("Connection interrupted while trying to subscribe"))};this.provider.once(ai.disconnect,n),await Dr(new Promise((o,a)=>{this.provider.connect().then(o).catch(a)}),this.connectTimeout,`Socket stalled when trying to connect to ${this.relayUrl}`).catch(o=>{s(o)}).finally(()=>{this.provider.off(ai.disconnect,n),clearTimeout(this.reconnectTimeout)}),await new Promise(async(o,a)=>{const c=()=>{a(new Error("Connection interrupted while trying to subscribe"))};this.provider.once(ai.disconnect,c),await this.subscriber.start().then(o).catch(a).finally(()=>{this.provider.off(ai.disconnect,c)})}),this.hasExperiencedNetworkDisruption=!1,r()})}catch(r){await this.subscriber.stop();const s=r;this.logger.warn({},s.message),this.hasExperiencedNetworkDisruption=!0}finally{this.connectionAttemptInProgress=!1}if(this.connected){this.logger.debug({},`Connected to ${this.relayUrl} successfully on attempt: ${i}`);break}await new Promise(r=>setTimeout(r,V.toMiliseconds(i*1))),i++}}startPingTimeout(){var e,i,r,s,n;if(Ul())try{(i=(e=this.provider)==null?void 0:e.connection)!=null&&i.socket&&((n=(s=(r=this.provider)==null?void 0:r.connection)==null?void 0:s.socket)==null||n.on("ping",()=>{this.resetPingTimeout()})),this.resetPingTimeout()}catch(o){this.logger.warn(o,o==null?void 0:o.message)}}async createProvider(){this.provider.connection&&this.unregisterProviderListeners();const e=await this.core.crypto.signJWT(this.relayUrl);this.provider=new vi(new dy(wb({sdkVersion:Uh,protocol:this.protocol,version:this.version,relayUrl:this.relayUrl,projectId:this.projectId,auth:e,useOnCloseEvent:!0,bundleId:this.bundleId,packageName:this.packageName}))),this.registerProviderListeners()}async recordMessageEvent(e,i){const{topic:r,message:s}=e;await this.messages.set(r,s,i)}async shouldIgnoreMessageEvent(e){const{topic:i,message:r}=e;if(!r||r.length===0)return this.logger.warn(`Ignoring invalid/empty message: ${r}`),!0;if(!await this.subscriber.isKnownTopic(i))return this.logger.warn(`Ignoring message for unknown topic ${i}`),!0;const s=this.messages.has(i,r);return s&&this.logger.warn(`Ignoring duplicate message: ${r}`),s}async onProviderPayload(e){if(this.logger.debug("Incoming Relay Payload"),this.logger.trace({type:"payload",direction:"incoming",payload:e}),Ep(e)){if(!e.method.endsWith(k4))return;const i=e.params,{topic:r,message:s,publishedAt:n,attestation:o}=i.data,a={topic:r,message:s,publishedAt:n,transportType:We.relay,attestation:o};this.logger.debug("Emitting Relayer Payload"),this.logger.trace(x1({type:"event",event:i.id},a)),this.events.emit(i.id,a),await this.acknowledgePayload(e),await this.onMessageEvent(a)}else xp(e)&&this.events.emit(pt.message_ack,e)}async onMessageEvent(e){await this.shouldIgnoreMessageEvent(e)||(await this.recordMessageEvent(e,Ol.inbound),this.events.emit(pt.message,e))}async acknowledgePayload(e){const i=ou(e.id,!0);await this.provider.connection.send(i)}unregisterProviderListeners(){this.provider.off(ai.payload,this.onPayloadHandler),this.provider.off(ai.connect,this.onConnectHandler),this.provider.off(ai.disconnect,this.onDisconnectHandler),this.provider.off(ai.error,this.onProviderErrorHandler),clearTimeout(this.pingTimeout)}async registerEventListeners(){let e=await n1();k5(async i=>{e!==i&&(e=i,i?await this.transportOpen().catch(r=>this.logger.error(r,r==null?void 0:r.message)):(this.hasExperiencedNetworkDisruption=!0,await this.transportDisconnect(),this.transportExplicitlyClosed=!1))})}async onProviderDisconnect(){clearTimeout(this.pingTimeout),this.events.emit(pt.disconnect),this.connectionAttemptInProgress=!1,!this.reconnectInProgress&&(this.reconnectInProgress=!0,await this.subscriber.stop(),this.subscriber.hasAnyTopics&&(this.transportExplicitlyClosed||(this.reconnectTimeout=setTimeout(async()=>{await this.transportOpen().catch(e=>this.logger.error(e,e==null?void 0:e.message)),this.reconnectTimeout=void 0,this.reconnectInProgress=!1},V.toMiliseconds(P4)))))}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}async toEstablishConnection(){await this.confirmOnlineStateOrThrow(),!this.connected&&await this.connect()}};function t9(){}function I1(t){if(!t||typeof t!="object")return!1;const e=Object.getPrototypeOf(t);return e===null||e===Object.prototype||Object.getPrototypeOf(e)===null?Object.prototype.toString.call(t)==="[object Object]":!1}function A1(t){return Object.getOwnPropertySymbols(t).filter(e=>Object.prototype.propertyIsEnumerable.call(t,e))}function _1(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const i9="[object RegExp]",r9="[object String]",s9="[object Number]",n9="[object Boolean]",N1="[object Arguments]",o9="[object Symbol]",a9="[object Date]",c9="[object Map]",l9="[object Set]",u9="[object Array]",d9="[object Function]",h9="[object ArrayBuffer]",Gu="[object Object]",p9="[object Error]",g9="[object DataView]",f9="[object Uint8Array]",w9="[object Uint8ClampedArray]",m9="[object Uint16Array]",y9="[object Uint32Array]",b9="[object BigUint64Array]",v9="[object Int8Array]",C9="[object Int16Array]",E9="[object Int32Array]",x9="[object BigInt64Array]",I9="[object Float32Array]",A9="[object Float64Array]";function _9(t,e){return t===e||Number.isNaN(t)&&Number.isNaN(e)}function N9(t,e,i){return Jo(t,e,void 0,void 0,void 0,void 0,i)}function Jo(t,e,i,r,s,n,o){const a=o(t,e,i,r,s,n);if(a!==void 0)return a;if(typeof t==typeof e)switch(typeof t){case"bigint":case"string":case"boolean":case"symbol":case"undefined":return t===e;case"number":return t===e||Object.is(t,e);case"function":return t===e;case"object":return aa(t,e,n,o)}return aa(t,e,n,o)}function aa(t,e,i,r){if(Object.is(t,e))return!0;let s=_1(t),n=_1(e);if(s===N1&&(s=Gu),n===N1&&(n=Gu),s!==n)return!1;switch(s){case r9:return t.toString()===e.toString();case s9:{const c=t.valueOf(),l=e.valueOf();return _9(c,l)}case n9:case a9:case o9:return Object.is(t.valueOf(),e.valueOf());case i9:return t.source===e.source&&t.flags===e.flags;case d9:return t===e}i=i??new Map;const o=i.get(t),a=i.get(e);if(o!=null&&a!=null)return o===e;i.set(t,e),i.set(e,t);try{switch(s){case c9:{if(t.size!==e.size)return!1;for(const[c,l]of t.entries())if(!e.has(c)||!Jo(l,e.get(c),c,t,e,i,r))return!1;return!0}case l9:{if(t.size!==e.size)return!1;const c=Array.from(t.values()),l=Array.from(e.values());for(let u=0;u<c.length;u++){const d=c[u],h=l.findIndex(p=>Jo(d,p,void 0,t,e,i,r));if(h===-1)return!1;l.splice(h,1)}return!0}case u9:case f9:case w9:case m9:case y9:case b9:case v9:case C9:case E9:case x9:case I9:case A9:{if(typeof wt<"u"&&wt.isBuffer(t)!==wt.isBuffer(e)||t.length!==e.length)return!1;for(let c=0;c<t.length;c++)if(!Jo(t[c],e[c],c,t,e,i,r))return!1;return!0}case h9:return t.byteLength!==e.byteLength?!1:aa(new Uint8Array(t),new Uint8Array(e),i,r);case g9:return t.byteLength!==e.byteLength||t.byteOffset!==e.byteOffset?!1:aa(new Uint8Array(t),new Uint8Array(e),i,r);case p9:return t.name===e.name&&t.message===e.message;case Gu:{if(!(aa(t.constructor,e.constructor,i,r)||I1(t)&&I1(e)))return!1;const c=[...Object.keys(t),...A1(t)],l=[...Object.keys(e),...A1(e)];if(c.length!==l.length)return!1;for(let u=0;u<c.length;u++){const d=c[u],h=t[d];if(!Object.hasOwn(e,d))return!1;const p=e[d];if(!Jo(h,p,d,t,e,i,r))return!1}return!0}default:return!1}}finally{i.delete(t),i.delete(e)}}function S9(t,e){return N9(t,e,t9)}var $9=Object.defineProperty,S1=Object.getOwnPropertySymbols,k9=Object.prototype.hasOwnProperty,P9=Object.prototype.propertyIsEnumerable,Wh=(t,e,i)=>e in t?$9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,$1=(t,e)=>{for(var i in e||(e={}))k9.call(e,i)&&Wh(t,i,e[i]);if(S1)for(var i of S1(e))P9.call(e,i)&&Wh(t,i,e[i]);return t},Lt=(t,e,i)=>Wh(t,typeof e!="symbol"?e+"":e,i);let Gs=class extends p4{constructor(e,i,r,s=Ji,n=void 0){super(e,i,r,s),this.core=e,this.logger=i,this.name=r,Lt(this,"map",new Map),Lt(this,"version",O4),Lt(this,"cached",[]),Lt(this,"initialized",!1),Lt(this,"getKey"),Lt(this,"storagePrefix",Ji),Lt(this,"recentlyDeleted",[]),Lt(this,"recentlyDeletedLimit",200),Lt(this,"init",async()=>{this.initialized||(this.logger.trace("Initialized"),await this.restore(),this.cached.forEach(o=>{this.getKey&&o!==null&&!Ct(o)?this.map.set(this.getKey(o),o):a5(o)?this.map.set(o.id,o):c5(o)&&this.map.set(o.topic,o)}),this.cached=[],this.initialized=!0)}),Lt(this,"set",async(o,a)=>{this.isInitialized(),this.map.has(o)?await this.update(o,a):(this.logger.debug("Setting value"),this.logger.trace({type:"method",method:"set",key:o,value:a}),this.map.set(o,a),await this.persist())}),Lt(this,"get",o=>(this.isInitialized(),this.logger.debug("Getting value"),this.logger.trace({type:"method",method:"get",key:o}),this.getData(o))),Lt(this,"getAll",o=>(this.isInitialized(),o?this.values.filter(a=>Object.keys(o).every(c=>S9(a[c],o[c]))):this.values)),Lt(this,"update",async(o,a)=>{this.isInitialized(),this.logger.debug("Updating value"),this.logger.trace({type:"method",method:"update",key:o,update:a});const c=$1($1({},this.getData(o)),a);this.map.set(o,c),await this.persist()}),Lt(this,"delete",async(o,a)=>{this.isInitialized(),this.map.has(o)&&(this.logger.debug("Deleting value"),this.logger.trace({type:"method",method:"delete",key:o,reason:a}),this.map.delete(o),this.addToRecentlyDeleted(o),await this.persist())}),this.logger=Tt(i,this.name),this.storagePrefix=s,this.getKey=n}get context(){return ni(this.logger)}get storageKey(){return this.storagePrefix+this.version+this.core.customStoragePrefix+"//"+this.name}get length(){return this.map.size}get keys(){return Array.from(this.map.keys())}get values(){return Array.from(this.map.values())}addToRecentlyDeleted(e){this.recentlyDeleted.push(e),this.recentlyDeleted.length>=this.recentlyDeletedLimit&&this.recentlyDeleted.splice(0,this.recentlyDeletedLimit/2)}async setDataStore(e){await this.core.storage.setItem(this.storageKey,e)}async getDataStore(){return await this.core.storage.getItem(this.storageKey)}getData(e){const i=this.map.get(e);if(!i){if(this.recentlyDeleted.includes(e)){const{message:s}=H("MISSING_OR_INVALID",`Record was recently deleted - ${this.name}: ${e}`);throw this.logger.error(s),new Error(s)}const{message:r}=H("NO_MATCHING_KEY",`${this.name}: ${e}`);throw this.logger.error(r),new Error(r)}return i}async persist(){await this.setDataStore(this.values)}async restore(){try{const e=await this.getDataStore();if(typeof e>"u"||!e.length)return;if(this.map.size){const{message:i}=H("RESTORE_WILL_OVERRIDE",this.name);throw this.logger.error(i),new Error(i)}this.cached=e,this.logger.debug(`Successfully Restored value for ${this.name}`),this.logger.trace({type:"method",method:"restore",value:this.values})}catch(e){this.logger.debug(`Failed to Restore value for ${this.name}`),this.logger.error(e)}}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}};var O9=Object.defineProperty,T9=(t,e,i)=>e in t?O9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,ye=(t,e,i)=>T9(t,typeof e!="symbol"?e+"":e,i);let R9=class{constructor(e,i){this.core=e,this.logger=i,ye(this,"name",M4),ye(this,"version",B4),ye(this,"events",new Ip),ye(this,"pairings"),ye(this,"initialized",!1),ye(this,"storagePrefix",Ji),ye(this,"ignoredPayloadTypes",[br]),ye(this,"registeredMethods",[]),ye(this,"init",async()=>{this.initialized||(await this.pairings.init(),await this.cleanup(),this.registerRelayerEvents(),this.registerExpirerEvents(),this.initialized=!0,this.logger.trace("Initialized"))}),ye(this,"register",({methods:r})=>{this.isInitialized(),this.registeredMethods=[...new Set([...this.registeredMethods,...r])]}),ye(this,"create",async r=>{this.isInitialized();const s=Mh(),n=await this.core.crypto.setSymKey(s),o=it(V.FIVE_MINUTES),a={protocol:Bw},c={topic:n,expiry:o,relay:a,active:!1,methods:r==null?void 0:r.methods},l=Q0({protocol:this.core.protocol,version:this.core.version,topic:n,symKey:s,relay:a,expiryTimestamp:o,methods:r==null?void 0:r.methods});return this.events.emit(xs.create,c),this.core.expirer.set(n,o),await this.pairings.set(n,c),await this.core.relayer.subscribe(n,{transportType:r==null?void 0:r.transportType}),{topic:n,uri:l}}),ye(this,"pair",async r=>{this.isInitialized();const s=this.core.eventClient.createEvent({properties:{topic:r==null?void 0:r.uri,trace:[qi.pairing_started]}});this.isValidPair(r,s);const{topic:n,symKey:o,relay:a,expiryTimestamp:c,methods:l}=X0(r.uri);s.props.properties.topic=n,s.addTrace(qi.pairing_uri_validation_success),s.addTrace(qi.pairing_uri_not_expired);let u;if(this.pairings.keys.includes(n)){if(u=this.pairings.get(n),s.addTrace(qi.existing_pairing),u.active)throw s.setError(hr.active_pairing_already_exists),new Error(`Pairing already exists: ${n}. Please try again with a new connection URI.`);s.addTrace(qi.pairing_not_expired)}const d=c||it(V.FIVE_MINUTES),h={topic:n,relay:a,expiry:d,active:!1,methods:l};this.core.expirer.set(n,d),await this.pairings.set(n,h),s.addTrace(qi.store_new_pairing),r.activatePairing&&await this.activate({topic:n}),this.events.emit(xs.create,h),s.addTrace(qi.emit_inactive_pairing),this.core.crypto.keychain.has(n)||await this.core.crypto.setSymKey(o,n),s.addTrace(qi.subscribing_pairing_topic);try{await this.core.relayer.confirmOnlineStateOrThrow()}catch{s.setError(hr.no_internet_connection)}try{await this.core.relayer.subscribe(n,{relay:a})}catch(p){throw s.setError(hr.subscribe_pairing_topic_failure),p}return s.addTrace(qi.subscribe_pairing_topic_success),h}),ye(this,"activate",async({topic:r})=>{this.isInitialized();const s=it(V.FIVE_MINUTES);this.core.expirer.set(r,s),await this.pairings.update(r,{active:!0,expiry:s})}),ye(this,"ping",async r=>{this.isInitialized(),await this.isValidPing(r),this.logger.warn("ping() is deprecated and will be removed in the next major release.");const{topic:s}=r;if(this.pairings.keys.includes(s)){const n=await this.sendRequest(s,"wc_pairingPing",{}),{done:o,resolve:a,reject:c}=bs();this.events.once(Pe("pairing_ping",n),({error:l})=>{l?c(l):a()}),await o()}}),ye(this,"updateExpiry",async({topic:r,expiry:s})=>{this.isInitialized(),await this.pairings.update(r,{expiry:s})}),ye(this,"updateMetadata",async({topic:r,metadata:s})=>{this.isInitialized(),await this.pairings.update(r,{peerMetadata:s})}),ye(this,"getPairings",()=>(this.isInitialized(),this.pairings.values)),ye(this,"disconnect",async r=>{this.isInitialized(),await this.isValidDisconnect(r);const{topic:s}=r;this.pairings.keys.includes(s)&&(await this.sendRequest(s,"wc_pairingDelete",Le("USER_DISCONNECTED")),await this.deletePairing(s))}),ye(this,"formatUriFromPairing",r=>{this.isInitialized();const{topic:s,relay:n,expiry:o,methods:a}=r,c=this.core.crypto.keychain.get(s);return Q0({protocol:this.core.protocol,version:this.core.version,topic:s,symKey:c,relay:n,expiryTimestamp:o,methods:a})}),ye(this,"sendRequest",async(r,s,n)=>{const o=Ns(s,n),a=await this.core.crypto.encode(r,o),c=mo[s].req;return this.core.history.set(r,o),this.core.relayer.publish(r,a,c),o.id}),ye(this,"sendResult",async(r,s,n)=>{const o=ou(r,n),a=await this.core.crypto.encode(s,o),c=(await this.core.history.get(s,r)).request.method,l=mo[c].res;await this.core.relayer.publish(s,a,l),await this.core.history.resolve(o)}),ye(this,"sendError",async(r,s,n)=>{const o=Mf(r,n),a=await this.core.crypto.encode(s,o),c=(await this.core.history.get(s,r)).request.method,l=mo[c]?mo[c].res:mo.unregistered_method.res;await this.core.relayer.publish(s,a,l),await this.core.history.resolve(o)}),ye(this,"deletePairing",async(r,s)=>{await this.core.relayer.unsubscribe(r),await Promise.all([this.pairings.delete(r,Le("USER_DISCONNECTED")),this.core.crypto.deleteSymKey(r),s?Promise.resolve():this.core.expirer.del(r)])}),ye(this,"cleanup",async()=>{const r=this.pairings.getAll().filter(s=>Rr(s.expiry));await Promise.all(r.map(s=>this.deletePairing(s.topic)))}),ye(this,"onRelayEventRequest",async r=>{const{topic:s,payload:n}=r;switch(n.method){case"wc_pairingPing":return await this.onPairingPingRequest(s,n);case"wc_pairingDelete":return await this.onPairingDeleteRequest(s,n);default:return await this.onUnknownRpcMethodRequest(s,n)}}),ye(this,"onRelayEventResponse",async r=>{const{topic:s,payload:n}=r,o=(await this.core.history.get(s,n.id)).request.method;switch(o){case"wc_pairingPing":return this.onPairingPingResponse(s,n);default:return this.onUnknownRpcMethodResponse(o)}}),ye(this,"onPairingPingRequest",async(r,s)=>{const{id:n}=s;try{this.isValidPing({topic:r}),await this.sendResult(n,r,!0),this.events.emit(xs.ping,{id:n,topic:r})}catch(o){await this.sendError(n,r,o),this.logger.error(o)}}),ye(this,"onPairingPingResponse",(r,s)=>{const{id:n}=s;setTimeout(()=>{dr(s)?this.events.emit(Pe("pairing_ping",n),{}):Vi(s)&&this.events.emit(Pe("pairing_ping",n),{error:s.error})},500)}),ye(this,"onPairingDeleteRequest",async(r,s)=>{const{id:n}=s;try{this.isValidDisconnect({topic:r}),await this.deletePairing(r),this.events.emit(xs.delete,{id:n,topic:r})}catch(o){await this.sendError(n,r,o),this.logger.error(o)}}),ye(this,"onUnknownRpcMethodRequest",async(r,s)=>{const{id:n,method:o}=s;try{if(this.registeredMethods.includes(o))return;const a=Le("WC_METHOD_UNSUPPORTED",o);await this.sendError(n,r,a),this.logger.error(a)}catch(a){await this.sendError(n,r,a),this.logger.error(a)}}),ye(this,"onUnknownRpcMethodResponse",r=>{this.registeredMethods.includes(r)||this.logger.error(Le("WC_METHOD_UNSUPPORTED",r))}),ye(this,"isValidPair",(r,s)=>{var n;if(!zt(r)){const{message:a}=H("MISSING_OR_INVALID",`pair() params: ${r}`);throw s.setError(hr.malformed_pairing_uri),new Error(a)}if(!o5(r.uri)){const{message:a}=H("MISSING_OR_INVALID",`pair() uri: ${r.uri}`);throw s.setError(hr.malformed_pairing_uri),new Error(a)}const o=X0(r==null?void 0:r.uri);if(!((n=o==null?void 0:o.relay)!=null&&n.protocol)){const{message:a}=H("MISSING_OR_INVALID","pair() uri#relay-protocol");throw s.setError(hr.malformed_pairing_uri),new Error(a)}if(!(o!=null&&o.symKey)){const{message:a}=H("MISSING_OR_INVALID","pair() uri#symKey");throw s.setError(hr.malformed_pairing_uri),new Error(a)}if(o!=null&&o.expiryTimestamp&&V.toMiliseconds(o==null?void 0:o.expiryTimestamp)<Date.now()){s.setError(hr.pairing_expired);const{message:a}=H("EXPIRED","pair() URI has expired. Please try again with a new connection URI.");throw new Error(a)}}),ye(this,"isValidPing",async r=>{if(!zt(r)){const{message:n}=H("MISSING_OR_INVALID",`ping() params: ${r}`);throw new Error(n)}const{topic:s}=r;await this.isValidPairingTopic(s)}),ye(this,"isValidDisconnect",async r=>{if(!zt(r)){const{message:n}=H("MISSING_OR_INVALID",`disconnect() params: ${r}`);throw new Error(n)}const{topic:s}=r;await this.isValidPairingTopic(s)}),ye(this,"isValidPairingTopic",async r=>{if(!et(r,!1)){const{message:s}=H("MISSING_OR_INVALID",`pairing topic should be a string: ${r}`);throw new Error(s)}if(!this.pairings.keys.includes(r)){const{message:s}=H("NO_MATCHING_KEY",`pairing topic doesn't exist: ${r}`);throw new Error(s)}if(Rr(this.pairings.get(r).expiry)){await this.deletePairing(r);const{message:s}=H("EXPIRED",`pairing topic: ${r}`);throw new Error(s)}}),this.core=e,this.logger=Tt(i,this.name),this.pairings=new Gs(this.core,this.logger,this.name,this.storagePrefix)}get context(){return ni(this.logger)}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}registerRelayerEvents(){this.core.relayer.on(pt.message,async e=>{const{topic:i,message:r,transportType:s}=e;if(this.pairings.keys.includes(i)&&s!==We.link_mode&&!this.ignoredPayloadTypes.includes(this.core.crypto.getPayloadType(r)))try{const n=await this.core.crypto.decode(i,r);Ep(n)?(this.core.history.set(i,n),await this.onRelayEventRequest({topic:i,payload:n})):xp(n)&&(await this.core.history.resolve(n),await this.onRelayEventResponse({topic:i,payload:n}),this.core.history.delete(i,n.id)),await this.core.relayer.messages.ack(i,r)}catch(n){this.logger.error(n)}})}registerExpirerEvents(){this.core.expirer.on(yi.expired,async e=>{const{topic:i}=Qf(e.target);i&&this.pairings.keys.includes(i)&&(await this.deletePairing(i,!0),this.events.emit(xs.expire,{topic:i}))})}};var L9=Object.defineProperty,M9=(t,e,i)=>e in t?L9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,bt=(t,e,i)=>M9(t,typeof e!="symbol"?e+"":e,i);let B9=class extends l4{constructor(e,i){super(e,i),this.core=e,this.logger=i,bt(this,"records",new Map),bt(this,"events",new Jr.EventEmitter),bt(this,"name",U4),bt(this,"version",D4),bt(this,"cached",[]),bt(this,"initialized",!1),bt(this,"storagePrefix",Ji),bt(this,"init",async()=>{this.initialized||(this.logger.trace("Initialized"),await this.restore(),this.cached.forEach(r=>this.records.set(r.id,r)),this.cached=[],this.registerEventListeners(),this.initialized=!0)}),bt(this,"set",(r,s,n)=>{if(this.isInitialized(),this.logger.debug("Setting JSON-RPC request history record"),this.logger.trace({type:"method",method:"set",topic:r,request:s,chainId:n}),this.records.has(s.id))return;const o={id:s.id,topic:r,request:{method:s.method,params:s.params||null},chainId:n,expiry:it(V.THIRTY_DAYS)};this.records.set(o.id,o),this.persist(),this.events.emit(Ei.created,o)}),bt(this,"resolve",async r=>{if(this.isInitialized(),this.logger.debug("Updating JSON-RPC response history record"),this.logger.trace({type:"method",method:"update",response:r}),!this.records.has(r.id))return;const s=await this.getRecord(r.id);typeof s.response>"u"&&(s.response=Vi(r)?{error:r.error}:{result:r.result},this.records.set(s.id,s),this.persist(),this.events.emit(Ei.updated,s))}),bt(this,"get",async(r,s)=>(this.isInitialized(),this.logger.debug("Getting record"),this.logger.trace({type:"method",method:"get",topic:r,id:s}),await this.getRecord(s))),bt(this,"delete",(r,s)=>{this.isInitialized(),this.logger.debug("Deleting record"),this.logger.trace({type:"method",method:"delete",id:s}),this.values.forEach(n=>{if(n.topic===r){if(typeof s<"u"&&n.id!==s)return;this.records.delete(n.id),this.events.emit(Ei.deleted,n)}}),this.persist()}),bt(this,"exists",async(r,s)=>(this.isInitialized(),this.records.has(s)?(await this.getRecord(s)).topic===r:!1)),bt(this,"on",(r,s)=>{this.events.on(r,s)}),bt(this,"once",(r,s)=>{this.events.once(r,s)}),bt(this,"off",(r,s)=>{this.events.off(r,s)}),bt(this,"removeListener",(r,s)=>{this.events.removeListener(r,s)}),this.logger=Tt(i,this.name)}get context(){return ni(this.logger)}get storageKey(){return this.storagePrefix+this.version+this.core.customStoragePrefix+"//"+this.name}get size(){return this.records.size}get keys(){return Array.from(this.records.keys())}get values(){return Array.from(this.records.values())}get pending(){const e=[];return this.values.forEach(i=>{if(typeof i.response<"u")return;const r={topic:i.topic,request:Ns(i.request.method,i.request.params,i.id),chainId:i.chainId};return e.push(r)}),e}async setJsonRpcRecords(e){await this.core.storage.setItem(this.storageKey,e)}async getJsonRpcRecords(){return await this.core.storage.getItem(this.storageKey)}getRecord(e){this.isInitialized();const i=this.records.get(e);if(!i){const{message:r}=H("NO_MATCHING_KEY",`${this.name}: ${e}`);throw new Error(r)}return i}async persist(){await this.setJsonRpcRecords(this.values),this.events.emit(Ei.sync)}async restore(){try{const e=await this.getJsonRpcRecords();if(typeof e>"u"||!e.length)return;if(this.records.size){const{message:i}=H("RESTORE_WILL_OVERRIDE",this.name);throw this.logger.error(i),new Error(i)}this.cached=e,this.logger.debug(`Successfully Restored records for ${this.name}`),this.logger.trace({type:"method",method:"restore",records:this.values})}catch(e){this.logger.debug(`Failed to Restore records for ${this.name}`),this.logger.error(e)}}registerEventListeners(){this.events.on(Ei.created,e=>{const i=Ei.created;this.logger.info(`Emitting ${i}`),this.logger.debug({type:"event",event:i,record:e})}),this.events.on(Ei.updated,e=>{const i=Ei.updated;this.logger.info(`Emitting ${i}`),this.logger.debug({type:"event",event:i,record:e})}),this.events.on(Ei.deleted,e=>{const i=Ei.deleted;this.logger.info(`Emitting ${i}`),this.logger.debug({type:"event",event:i,record:e})}),this.core.heartbeat.on(Za.pulse,()=>{this.cleanup()})}cleanup(){try{this.isInitialized();let e=!1;this.records.forEach(i=>{V.toMiliseconds(i.expiry||0)-Date.now()<=0&&(this.logger.info(`Deleting expired history log: ${i.id}`),this.records.delete(i.id),this.events.emit(Ei.deleted,i,!1),e=!0)}),e&&this.persist()}catch(e){this.logger.warn(e)}}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}};var U9=Object.defineProperty,D9=(t,e,i)=>e in t?U9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,It=(t,e,i)=>D9(t,typeof e!="symbol"?e+"":e,i);let j9=class extends f4{constructor(e,i){super(e,i),this.core=e,this.logger=i,It(this,"expirations",new Map),It(this,"events",new Jr.EventEmitter),It(this,"name",j4),It(this,"version",z4),It(this,"cached",[]),It(this,"initialized",!1),It(this,"storagePrefix",Ji),It(this,"init",async()=>{this.initialized||(this.logger.trace("Initialized"),await this.restore(),this.cached.forEach(r=>this.expirations.set(r.target,r)),this.cached=[],this.registerEventListeners(),this.initialized=!0)}),It(this,"has",r=>{try{const s=this.formatTarget(r);return typeof this.getExpiration(s)<"u"}catch{return!1}}),It(this,"set",(r,s)=>{this.isInitialized();const n=this.formatTarget(r),o={target:n,expiry:s};this.expirations.set(n,o),this.checkExpiry(n,o),this.events.emit(yi.created,{target:n,expiration:o})}),It(this,"get",r=>{this.isInitialized();const s=this.formatTarget(r);return this.getExpiration(s)}),It(this,"del",r=>{if(this.isInitialized(),this.has(r)){const s=this.formatTarget(r),n=this.getExpiration(s);this.expirations.delete(s),this.events.emit(yi.deleted,{target:s,expiration:n})}}),It(this,"on",(r,s)=>{this.events.on(r,s)}),It(this,"once",(r,s)=>{this.events.once(r,s)}),It(this,"off",(r,s)=>{this.events.off(r,s)}),It(this,"removeListener",(r,s)=>{this.events.removeListener(r,s)}),this.logger=Tt(i,this.name)}get context(){return ni(this.logger)}get storageKey(){return this.storagePrefix+this.version+this.core.customStoragePrefix+"//"+this.name}get length(){return this.expirations.size}get keys(){return Array.from(this.expirations.keys())}get values(){return Array.from(this.expirations.values())}formatTarget(e){if(typeof e=="string")return mb(e);if(typeof e=="number")return yb(e);const{message:i}=H("UNKNOWN_TYPE",`Target type: ${typeof e}`);throw new Error(i)}async setExpirations(e){await this.core.storage.setItem(this.storageKey,e)}async getExpirations(){return await this.core.storage.getItem(this.storageKey)}async persist(){await this.setExpirations(this.values),this.events.emit(yi.sync)}async restore(){try{const e=await this.getExpirations();if(typeof e>"u"||!e.length)return;if(this.expirations.size){const{message:i}=H("RESTORE_WILL_OVERRIDE",this.name);throw this.logger.error(i),new Error(i)}this.cached=e,this.logger.debug(`Successfully Restored expirations for ${this.name}`),this.logger.trace({type:"method",method:"restore",expirations:this.values})}catch(e){this.logger.debug(`Failed to Restore expirations for ${this.name}`),this.logger.error(e)}}getExpiration(e){const i=this.expirations.get(e);if(!i){const{message:r}=H("NO_MATCHING_KEY",`${this.name}: ${e}`);throw this.logger.warn(r),new Error(r)}return i}checkExpiry(e,i){const{expiry:r}=i;V.toMiliseconds(r)-Date.now()<=0&&this.expire(e,i)}expire(e,i){this.expirations.delete(e),this.events.emit(yi.expired,{target:e,expiration:i})}checkExpirations(){this.core.relayer.connected&&this.expirations.forEach((e,i)=>this.checkExpiry(i,e))}registerEventListeners(){this.core.heartbeat.on(Za.pulse,()=>this.checkExpirations()),this.events.on(yi.created,e=>{const i=yi.created;this.logger.info(`Emitting ${i}`),this.logger.debug({type:"event",event:i,data:e}),this.persist()}),this.events.on(yi.expired,e=>{const i=yi.expired;this.logger.info(`Emitting ${i}`),this.logger.debug({type:"event",event:i,data:e}),this.persist()}),this.events.on(yi.deleted,e=>{const i=yi.deleted;this.logger.info(`Emitting ${i}`),this.logger.debug({type:"event",event:i,data:e}),this.persist()})}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}};var z9=Object.defineProperty,F9=(t,e,i)=>e in t?z9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Qe=(t,e,i)=>F9(t,typeof e!="symbol"?e+"":e,i);let H9=class extends w4{constructor(e,i,r){super(e,i,r),this.core=e,this.logger=i,this.store=r,Qe(this,"name",F4),Qe(this,"abortController"),Qe(this,"isDevEnv"),Qe(this,"verifyUrlV3",q4),Qe(this,"storagePrefix",Ji),Qe(this,"version",Mw),Qe(this,"publicKey"),Qe(this,"fetchPromise"),Qe(this,"init",async()=>{var s;this.isDevEnv||(this.publicKey=await this.store.getItem(this.storeKey),this.publicKey&&V.toMiliseconds((s=this.publicKey)==null?void 0:s.expiresAt)<Date.now()&&(this.logger.debug("verify v2 public key expired"),await this.removePublicKey()))}),Qe(this,"register",async s=>{if(!Ya()||this.isDevEnv)return;const n=window.location.origin,{id:o,decryptedId:a}=s,c=`${this.verifyUrlV3}/attestation?projectId=${this.core.projectId}&origin=${n}&id=${o}&decryptedId=${a}`;try{const l=su(),u=this.startAbortTimer(V.ONE_SECOND*5),d=await new Promise((h,p)=>{const g=()=>{window.removeEventListener("message",w),l.body.removeChild(f),p("attestation aborted")};this.abortController.signal.addEventListener("abort",g);const f=l.createElement("iframe");f.src=c,f.style.display="none",f.addEventListener("error",g,{signal:this.abortController.signal});const w=m=>{if(m.data&&typeof m.data=="string")try{const y=JSON.parse(m.data);if(y.type==="verify_attestation"){if(Eh(y.attestation).payload.id!==o)return;clearInterval(u),l.body.removeChild(f),this.abortController.signal.removeEventListener("abort",g),window.removeEventListener("message",w),h(y.attestation===null?"":y.attestation)}}catch(y){this.logger.warn(y)}};l.body.appendChild(f),window.addEventListener("message",w,{signal:this.abortController.signal})});return this.logger.debug("jwt attestation",d),d}catch(l){this.logger.warn(l)}return""}),Qe(this,"resolve",async s=>{if(this.isDevEnv)return"";const{attestationId:n,hash:o,encryptedId:a}=s;if(n===""){this.logger.debug("resolve: attestationId is empty, skipping");return}if(n){if(Eh(n).payload.id!==a)return;const l=await this.isValidJwtAttestation(n);if(l){if(!l.isVerified){this.logger.warn("resolve: jwt attestation: origin url not verified");return}return l}}if(!o)return;const c=this.getVerifyUrl(s==null?void 0:s.verifyUrl);return this.fetchAttestation(o,c)}),Qe(this,"fetchAttestation",async(s,n)=>{this.logger.debug(`resolving attestation: ${s} from url: ${n}`);const o=this.startAbortTimer(V.ONE_SECOND*5),a=await fetch(`${n}/attestation/${s}?v2Supported=true`,{signal:this.abortController.signal});return clearTimeout(o),a.status===200?await a.json():void 0}),Qe(this,"getVerifyUrl",s=>{let n=s||oa;return W4.includes(n)||(this.logger.info(`verify url: ${n}, not included in trusted list, assigning default: ${oa}`),n=oa),n}),Qe(this,"fetchPublicKey",async()=>{try{this.logger.debug(`fetching public key from: ${this.verifyUrlV3}`);const s=this.startAbortTimer(V.FIVE_SECONDS),n=await fetch(`${this.verifyUrlV3}/public-key`,{signal:this.abortController.signal});return clearTimeout(s),await n.json()}catch(s){this.logger.warn(s)}}),Qe(this,"persistPublicKey",async s=>{this.logger.debug("persisting public key to local storage",s),await this.store.setItem(this.storeKey,s),this.publicKey=s}),Qe(this,"removePublicKey",async()=>{this.logger.debug("removing verify v2 public key from storage"),await this.store.removeItem(this.storeKey),this.publicKey=void 0}),Qe(this,"isValidJwtAttestation",async s=>{const n=await this.getPublicKey();try{if(n)return this.validateAttestation(s,n)}catch(a){this.logger.error(a),this.logger.warn("error validating attestation")}const o=await this.fetchAndPersistPublicKey();try{if(o)return this.validateAttestation(s,o)}catch(a){this.logger.error(a),this.logger.warn("error validating attestation")}}),Qe(this,"getPublicKey",async()=>this.publicKey?this.publicKey:await this.fetchAndPersistPublicKey()),Qe(this,"fetchAndPersistPublicKey",async()=>{if(this.fetchPromise)return await this.fetchPromise,this.publicKey;this.fetchPromise=new Promise(async n=>{const o=await this.fetchPublicKey();o&&(await this.persistPublicKey(o),n(o))});const s=await this.fetchPromise;return this.fetchPromise=void 0,s}),Qe(this,"validateAttestation",(s,n)=>{const o=K3(s,n.publicKey),a={hasExpired:V.toMiliseconds(o.exp)<Date.now(),payload:o};if(a.hasExpired)throw this.logger.warn("resolve: jwt attestation expired"),new Error("JWT attestation expired");return{origin:a.payload.origin,isScam:a.payload.isScam,isVerified:a.payload.isVerified}}),this.logger=Tt(i,this.name),this.abortController=new AbortController,this.isDevEnv=_p(),this.init()}get storeKey(){return this.storagePrefix+this.version+this.core.customStoragePrefix+"//verify:public:key"}get context(){return ni(this.logger)}startAbortTimer(e){return this.abortController=new AbortController,setTimeout(()=>this.abortController.abort(),V.toMiliseconds(e))}};var q9=Object.defineProperty,W9=(t,e,i)=>e in t?q9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,k1=(t,e,i)=>W9(t,typeof e!="symbol"?e+"":e,i);let V9=class extends m4{constructor(e,i){super(e,i),this.projectId=e,this.logger=i,k1(this,"context",V4),k1(this,"registerDeviceToken",async r=>{const{clientId:s,token:n,notificationType:o,enableEncrypted:a=!1}=r,c=`${K4}/${this.projectId}/clients`;await fetch(c,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({client_id:s,type:o,token:n,always_raw:a})})}),this.logger=Tt(i,this.context)}};var K9=Object.defineProperty,P1=Object.getOwnPropertySymbols,G9=Object.prototype.hasOwnProperty,Z9=Object.prototype.propertyIsEnumerable,Vh=(t,e,i)=>e in t?K9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,vo=(t,e)=>{for(var i in e||(e={}))G9.call(e,i)&&Vh(t,i,e[i]);if(P1)for(var i of P1(e))Z9.call(e,i)&&Vh(t,i,e[i]);return t},at=(t,e,i)=>Vh(t,typeof e!="symbol"?e+"":e,i);let Y9=class extends y4{constructor(e,i,r=!0){super(e,i,r),this.core=e,this.logger=i,at(this,"context",Z4),at(this,"storagePrefix",Ji),at(this,"storageVersion",G4),at(this,"events",new Map),at(this,"shouldPersist",!1),at(this,"init",async()=>{if(!_p())try{const s={eventId:E0(),timestamp:Date.now(),domain:this.getAppDomain(),props:{event:"INIT",type:"",properties:{client_id:await this.core.crypto.getClientId(),user_agent:Jf(this.core.relayer.protocol,this.core.relayer.version,Uh)}}};await this.sendEvent([s])}catch(s){this.logger.warn(s)}}),at(this,"createEvent",s=>{const{event:n="ERROR",type:o="",properties:{topic:a,trace:c}}=s,l=E0(),u=this.core.projectId||"",d=Date.now(),h=vo({eventId:l,timestamp:d,props:{event:n,type:o,properties:{topic:a,trace:c}},bundleId:u,domain:this.getAppDomain()},this.setMethods(l));return this.telemetryEnabled&&(this.events.set(l,h),this.shouldPersist=!0),h}),at(this,"getEvent",s=>{const{eventId:n,topic:o}=s;if(n)return this.events.get(n);const a=Array.from(this.events.values()).find(c=>c.props.properties.topic===o);if(a)return vo(vo({},a),this.setMethods(a.eventId))}),at(this,"deleteEvent",s=>{const{eventId:n}=s;this.events.delete(n),this.shouldPersist=!0}),at(this,"setEventListeners",()=>{this.core.heartbeat.on(Za.pulse,async()=>{this.shouldPersist&&await this.persist(),this.events.forEach(s=>{V.fromMiliseconds(Date.now())-V.fromMiliseconds(s.timestamp)>Y4&&(this.events.delete(s.eventId),this.shouldPersist=!0)})})}),at(this,"setMethods",s=>({addTrace:n=>this.addTrace(s,n),setError:n=>this.setError(s,n)})),at(this,"addTrace",(s,n)=>{const o=this.events.get(s);o&&(o.props.properties.trace.push(n),this.events.set(s,o),this.shouldPersist=!0)}),at(this,"setError",(s,n)=>{const o=this.events.get(s);o&&(o.props.type=n,o.timestamp=Date.now(),this.events.set(s,o),this.shouldPersist=!0)}),at(this,"persist",async()=>{await this.core.storage.setItem(this.storageKey,Array.from(this.events.values())),this.shouldPersist=!1}),at(this,"restore",async()=>{try{const s=await this.core.storage.getItem(this.storageKey)||[];if(!s.length)return;s.forEach(n=>{this.events.set(n.eventId,vo(vo({},n),this.setMethods(n.eventId)))})}catch(s){this.logger.warn(s)}}),at(this,"submit",async()=>{if(!this.telemetryEnabled||this.events.size===0)return;const s=[];for(const[n,o]of this.events)o.props.type&&s.push(o);if(s.length!==0)try{if((await this.sendEvent(s)).ok)for(const n of s)this.events.delete(n.eventId),this.shouldPersist=!0}catch(n){this.logger.warn(n)}}),at(this,"sendEvent",async s=>{const n=this.getAppDomain()?"":"&sp=desktop";return await fetch(`${J4}?projectId=${this.core.projectId}&st=events_sdk&sv=js-${Uh}${n}`,{method:"POST",body:JSON.stringify(s)})}),at(this,"getAppDomain",()=>Yf().url),this.logger=Tt(i,this.context),this.telemetryEnabled=r,r?this.restore().then(async()=>{await this.submit(),this.setEventListeners()}):this.persist()}get storageKey(){return this.storagePrefix+this.storageVersion+this.core.customStoragePrefix+"//"+this.context}};var J9=Object.defineProperty,O1=Object.getOwnPropertySymbols,X9=Object.prototype.hasOwnProperty,Q9=Object.prototype.propertyIsEnumerable,Kh=(t,e,i)=>e in t?J9(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,T1=(t,e)=>{for(var i in e||(e={}))X9.call(e,i)&&Kh(t,i,e[i]);if(O1)for(var i of O1(e))Q9.call(e,i)&&Kh(t,i,e[i]);return t},Fe=(t,e,i)=>Kh(t,typeof e!="symbol"?e+"":e,i);let e7=class Yw extends n4{constructor(e){var i;super(e),Fe(this,"protocol",Lw),Fe(this,"version",Mw),Fe(this,"name",Fl),Fe(this,"relayUrl"),Fe(this,"projectId"),Fe(this,"customStoragePrefix"),Fe(this,"events",new Jr.EventEmitter),Fe(this,"logger"),Fe(this,"heartbeat"),Fe(this,"relayer"),Fe(this,"crypto"),Fe(this,"storage"),Fe(this,"history"),Fe(this,"expirer"),Fe(this,"pairing"),Fe(this,"verify"),Fe(this,"echoClient"),Fe(this,"linkModeSupportedApps"),Fe(this,"eventClient"),Fe(this,"initialized",!1),Fe(this,"logChunkController"),Fe(this,"on",(a,c)=>this.events.on(a,c)),Fe(this,"once",(a,c)=>this.events.once(a,c)),Fe(this,"off",(a,c)=>this.events.off(a,c)),Fe(this,"removeListener",(a,c)=>this.events.removeListener(a,c)),Fe(this,"dispatchEnvelope",({topic:a,message:c,sessionExists:l})=>{if(!a||!c)return;const u={topic:a,message:c,publishedAt:Date.now(),transportType:We.link_mode};this.relayer.onLinkMessageEvent(u,{sessionExists:l})});const r=this.getGlobalCore(e==null?void 0:e.customStoragePrefix);if(r)try{return this.customStoragePrefix=r.customStoragePrefix,this.logger=r.logger,this.heartbeat=r.heartbeat,this.crypto=r.crypto,this.history=r.history,this.expirer=r.expirer,this.storage=r.storage,this.relayer=r.relayer,this.pairing=r.pairing,this.verify=r.verify,this.echoClient=r.echoClient,this.linkModeSupportedApps=r.linkModeSupportedApps,this.eventClient=r.eventClient,this.initialized=r.initialized,this.logChunkController=r.logChunkController,r}catch(a){console.warn("Failed to copy global core",a)}this.projectId=e==null?void 0:e.projectId,this.relayUrl=(e==null?void 0:e.relayUrl)||Uw,this.customStoragePrefix=e!=null&&e.customStoragePrefix?`:${e.customStoragePrefix}`:"";const s=nu({level:typeof(e==null?void 0:e.logger)=="string"&&e.logger?e.logger:b4.logger,name:Fl}),{logger:n,chunkLoggerController:o}=ly({opts:s,maxSizeInBytes:e==null?void 0:e.maxLogBlobSizeInBytes,loggerOverride:e==null?void 0:e.logger});this.logChunkController=o,(i=this.logChunkController)!=null&&i.downloadLogsBlobInBrowser&&(window.downloadLogsBlobInBrowser=async()=>{var a,c;(a=this.logChunkController)!=null&&a.downloadLogsBlobInBrowser&&((c=this.logChunkController)==null||c.downloadLogsBlobInBrowser({clientId:await this.crypto.getClientId()}))}),this.logger=Tt(n,this.name),this.heartbeat=new uy,this.crypto=new N8(this,this.logger,e==null?void 0:e.keychain),this.history=new B9(this,this.logger),this.expirer=new j9(this,this.logger),this.storage=e!=null&&e.storage?e.storage:new i4(T1(T1({},v4),e==null?void 0:e.storageOptions)),this.relayer=new e9({core:this,logger:this.logger,relayUrl:this.relayUrl,projectId:this.projectId}),this.pairing=new R9(this,this.logger),this.verify=new H9(this,this.logger,this.storage),this.echoClient=new V9(this.projectId||"",this.logger),this.linkModeSupportedApps=[],this.eventClient=new Y9(this,this.logger,e==null?void 0:e.telemetryEnabled),this.setGlobalCore(this)}static async init(e){const i=new Yw(e);await i.initialize();const r=await i.crypto.getClientId();return await i.storage.setItem(T4,r),i}get context(){return ni(this.logger)}async start(){this.initialized||await this.initialize()}async getLogsBlob(){var e;return(e=this.logChunkController)==null?void 0:e.logsToBlob({clientId:await this.crypto.getClientId()})}async addLinkModeSupportedApp(e){this.linkModeSupportedApps.includes(e)||(this.linkModeSupportedApps.push(e),await this.storage.setItem(h1,this.linkModeSupportedApps))}async initialize(){this.logger.trace("Initialized");try{await this.crypto.init(),await this.history.init(),await this.expirer.init(),await this.relayer.init(),await this.heartbeat.init(),await this.pairing.init(),this.linkModeSupportedApps=await this.storage.getItem(h1)||[],this.initialized=!0,this.logger.info("Core Initialization Success")}catch(e){throw this.logger.warn(`Core Initialization Failure at epoch ${Date.now()}`,e),this.logger.error(e.message),e}}getGlobalCore(e=""){try{if(this.isGlobalCoreDisabled())return;const i=`_walletConnectCore_${e}`,r=`${i}_count`;return globalThis[r]=(globalThis[r]||0)+1,globalThis[r]>1&&console.warn(`WalletConnect Core is already initialized. This is probably a mistake and can lead to unexpected behavior. Init() was called ${globalThis[r]} times.`),globalThis[i]}catch(i){console.warn("Failed to get global WalletConnect core",i);return}}setGlobalCore(e){var i;try{if(this.isGlobalCoreDisabled())return;const r=`_walletConnectCore_${((i=e.opts)==null?void 0:i.customStoragePrefix)||""}`;globalThis[r]=e}catch(r){console.warn("Failed to set global WalletConnect core",r)}}isGlobalCoreDisabled(){try{return typeof Ps<"u"&&{}.DISABLE_GLOBAL_CORE==="true"}catch{return!0}}};const t7=e7;var i7=Object.defineProperty,r7=(t,e,i)=>e in t?i7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,R1=(t,e,i)=>r7(t,typeof e!="symbol"?e+"":e,i);let s7=class{constructor(e){this.opts=e,R1(this,"protocol","wc"),R1(this,"version",2)}},n7=class{constructor(e){this.client=e}};const Jw="wc",Xw=2,Qw="client",Lp=`${Jw}@${Xw}:${Qw}:`,Zu={name:Qw,logger:"error",controller:!1,relayUrl:"wss://relay.walletconnect.org"},L1="WALLETCONNECT_DEEPLINK_CHOICE",o7="proposal",M1="Proposal expired",a7="session",tn=V.SEVEN_DAYS,c7="engine",ct={wc_sessionPropose:{req:{ttl:V.FIVE_MINUTES,prompt:!0,tag:1100},res:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1101},reject:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1120},autoReject:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1121}},wc_sessionSettle:{req:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1102},res:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1103}},wc_sessionUpdate:{req:{ttl:V.ONE_DAY,prompt:!1,tag:1104},res:{ttl:V.ONE_DAY,prompt:!1,tag:1105}},wc_sessionExtend:{req:{ttl:V.ONE_DAY,prompt:!1,tag:1106},res:{ttl:V.ONE_DAY,prompt:!1,tag:1107}},wc_sessionRequest:{req:{ttl:V.FIVE_MINUTES,prompt:!0,tag:1108},res:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1109}},wc_sessionEvent:{req:{ttl:V.FIVE_MINUTES,prompt:!0,tag:1110},res:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1111}},wc_sessionDelete:{req:{ttl:V.ONE_DAY,prompt:!1,tag:1112},res:{ttl:V.ONE_DAY,prompt:!1,tag:1113}},wc_sessionPing:{req:{ttl:V.ONE_DAY,prompt:!1,tag:1114},res:{ttl:V.ONE_DAY,prompt:!1,tag:1115}},wc_sessionAuthenticate:{req:{ttl:V.ONE_HOUR,prompt:!0,tag:1116},res:{ttl:V.ONE_HOUR,prompt:!1,tag:1117},reject:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1118},autoReject:{ttl:V.FIVE_MINUTES,prompt:!1,tag:1119}}},Yu={min:V.FIVE_MINUTES,max:V.SEVEN_DAYS},Ui={idle:"IDLE",active:"ACTIVE"},B1={eth_sendTransaction:{key:""},eth_sendRawTransaction:{key:""},wallet_sendCalls:{key:""},solana_signTransaction:{key:"signature"},solana_signAllTransactions:{key:"transactions"},solana_signAndSendTransaction:{key:"signature"}},l7="request",u7=["wc_sessionPropose","wc_sessionRequest","wc_authRequest","wc_sessionAuthenticate"],d7="wc",h7="auth",p7="authKeys",g7="pairingTopics",f7="requests",gu=`${d7}@${1.5}:${h7}:`,Tl=`${gu}:PUB_KEY`;var w7=Object.defineProperty,m7=Object.defineProperties,y7=Object.getOwnPropertyDescriptors,U1=Object.getOwnPropertySymbols,b7=Object.prototype.hasOwnProperty,v7=Object.prototype.propertyIsEnumerable,Gh=(t,e,i)=>e in t?w7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Ue=(t,e)=>{for(var i in e||(e={}))b7.call(e,i)&&Gh(t,i,e[i]);if(U1)for(var i of U1(e))v7.call(e,i)&&Gh(t,i,e[i]);return t},St=(t,e)=>m7(t,y7(e)),D=(t,e,i)=>Gh(t,typeof e!="symbol"?e+"":e,i);let C7=class extends n7{constructor(e){super(e),D(this,"name",c7),D(this,"events",new Ip),D(this,"initialized",!1),D(this,"requestQueue",{state:Ui.idle,queue:[]}),D(this,"sessionRequestQueue",{state:Ui.idle,queue:[]}),D(this,"requestQueueDelay",V.ONE_SECOND),D(this,"expectedPairingMethodMap",new Map),D(this,"recentlyDeletedMap",new Map),D(this,"recentlyDeletedLimit",200),D(this,"relayMessageCache",[]),D(this,"pendingSessions",new Map),D(this,"init",async()=>{this.initialized||(await this.cleanup(),this.registerRelayerEvents(),this.registerExpirerEvents(),this.registerPairingEvents(),await this.registerLinkModeListeners(),this.client.core.pairing.register({methods:Object.keys(ct)}),this.initialized=!0,setTimeout(async()=>{await this.processPendingMessageEvents(),this.sessionRequestQueue.queue=this.getPendingSessionRequests(),this.processSessionRequestQueue()},V.toMiliseconds(this.requestQueueDelay)))}),D(this,"connect",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow();const r=St(Ue({},i),{requiredNamespaces:i.requiredNamespaces||{},optionalNamespaces:i.optionalNamespaces||{}});await this.isValidConnect(r);const{pairingTopic:s,requiredNamespaces:n,optionalNamespaces:o,sessionProperties:a,scopedProperties:c,relays:l}=r;let u=s,d,h=!1;try{if(u){const N=this.client.core.pairing.pairings.get(u);this.client.logger.warn("connect() with existing pairing topic is deprecated and will be removed in the next major release."),h=N.active}}catch(N){throw this.client.logger.error(`connect() -> pairing.get(${u}) failed`),N}if(!u||!h){const{topic:N,uri:P}=await this.client.core.pairing.create();u=N,d=P}if(!u){const{message:N}=H("NO_MATCHING_KEY",`connect() pairing topic: ${u}`);throw new Error(N)}const p=await this.client.core.crypto.generateKeyPair(),g=ct.wc_sessionPropose.req.ttl||V.FIVE_MINUTES,f=it(g),w=St(Ue(Ue({requiredNamespaces:n,optionalNamespaces:o,relays:l??[{protocol:Bw}],proposer:{publicKey:p,metadata:this.client.metadata},expiryTimestamp:f,pairingTopic:u},a&&{sessionProperties:a}),c&&{scopedProperties:c}),{id:Ar()}),m=Pe("session_connect",w.id),{reject:y,resolve:b,done:v}=bs(g,M1),S=({id:N})=>{N===w.id&&(this.client.events.off("proposal_expire",S),this.pendingSessions.delete(w.id),this.events.emit(m,{error:{message:M1,code:0}}))};return this.client.events.on("proposal_expire",S),this.events.once(m,({error:N,session:P})=>{this.client.events.off("proposal_expire",S),N?y(N):P&&b(P)}),await this.sendRequest({topic:u,method:"wc_sessionPropose",params:w,throwOnFailedPublish:!0,clientRpcId:w.id}),await this.setProposal(w.id,w),{uri:d,approval:v}}),D(this,"pair",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow();try{return await this.client.core.pairing.pair(i)}catch(r){throw this.client.logger.error("pair() failed"),r}}),D(this,"approve",async i=>{var r,s,n;const o=this.client.core.eventClient.createEvent({properties:{topic:(r=i==null?void 0:i.id)==null?void 0:r.toString(),trace:[xi.session_approve_started]}});try{this.isInitialized(),await this.confirmOnlineStateOrThrow()}catch(_){throw o.setError(es.no_internet_connection),_}try{await this.isValidProposalId(i==null?void 0:i.id)}catch(_){throw this.client.logger.error(`approve() -> proposal.get(${i==null?void 0:i.id}) failed`),o.setError(es.proposal_not_found),_}try{await this.isValidApprove(i)}catch(_){throw this.client.logger.error("approve() -> isValidApprove() failed"),o.setError(es.session_approve_namespace_validation_failure),_}const{id:a,relayProtocol:c,namespaces:l,sessionProperties:u,scopedProperties:d,sessionConfig:h}=i,p=this.client.proposal.get(a);this.client.core.eventClient.deleteEvent({eventId:o.eventId});const{pairingTopic:g,proposer:f,requiredNamespaces:w,optionalNamespaces:m}=p;let y=(s=this.client.core.eventClient)==null?void 0:s.getEvent({topic:g});y||(y=(n=this.client.core.eventClient)==null?void 0:n.createEvent({type:xi.session_approve_started,properties:{topic:g,trace:[xi.session_approve_started,xi.session_namespaces_validation_success]}}));const b=await this.client.core.crypto.generateKeyPair(),v=f.publicKey,S=await this.client.core.crypto.generateSharedKey(b,v),N=Ue(Ue(Ue({relay:{protocol:c??"irn"},namespaces:l,controller:{publicKey:b,metadata:this.client.metadata},expiry:it(tn)},u&&{sessionProperties:u}),d&&{scopedProperties:d}),h&&{sessionConfig:h}),P=We.relay;y.addTrace(xi.subscribing_session_topic);try{await this.client.core.relayer.subscribe(S,{transportType:P})}catch(_){throw y.setError(es.subscribe_session_topic_failure),_}y.addTrace(xi.subscribe_session_topic_success);const k=St(Ue({},N),{topic:S,requiredNamespaces:w,optionalNamespaces:m,pairingTopic:g,acknowledged:!1,self:N.controller,peer:{publicKey:f.publicKey,metadata:f.metadata},controller:b,transportType:We.relay});await this.client.session.set(S,k),y.addTrace(xi.store_session);try{y.addTrace(xi.publishing_session_settle),await this.sendRequest({topic:S,method:"wc_sessionSettle",params:N,throwOnFailedPublish:!0}).catch(_=>{throw y==null||y.setError(es.session_settle_publish_failure),_}),y.addTrace(xi.session_settle_publish_success),y.addTrace(xi.publishing_session_approve),await this.sendResult({id:a,topic:g,result:{relay:{protocol:c??"irn"},responderPublicKey:b},throwOnFailedPublish:!0}).catch(_=>{throw y==null||y.setError(es.session_approve_publish_failure),_}),y.addTrace(xi.session_approve_publish_success)}catch(_){throw this.client.logger.error(_),this.client.session.delete(S,Le("USER_DISCONNECTED")),await this.client.core.relayer.unsubscribe(S),_}return this.client.core.eventClient.deleteEvent({eventId:y.eventId}),await this.client.core.pairing.updateMetadata({topic:g,metadata:f.metadata}),await this.client.proposal.delete(a,Le("USER_DISCONNECTED")),await this.client.core.pairing.activate({topic:g}),await this.setExpiry(S,it(tn)),{topic:S,acknowledged:()=>Promise.resolve(this.client.session.get(S))}}),D(this,"reject",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow();try{await this.isValidReject(i)}catch(o){throw this.client.logger.error("reject() -> isValidReject() failed"),o}const{id:r,reason:s}=i;let n;try{n=this.client.proposal.get(r).pairingTopic}catch(o){throw this.client.logger.error(`reject() -> proposal.get(${r}) failed`),o}n&&(await this.sendError({id:r,topic:n,error:s,rpcOpts:ct.wc_sessionPropose.reject}),await this.client.proposal.delete(r,Le("USER_DISCONNECTED")))}),D(this,"update",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow();try{await this.isValidUpdate(i)}catch(d){throw this.client.logger.error("update() -> isValidUpdate() failed"),d}const{topic:r,namespaces:s}=i,{done:n,resolve:o,reject:a}=bs(),c=Ar(),l=On().toString(),u=this.client.session.get(r).namespaces;return this.events.once(Pe("session_update",c),({error:d})=>{d?a(d):o()}),await this.client.session.update(r,{namespaces:s}),await this.sendRequest({topic:r,method:"wc_sessionUpdate",params:{namespaces:s},throwOnFailedPublish:!0,clientRpcId:c,relayRpcId:l}).catch(d=>{this.client.logger.error(d),this.client.session.update(r,{namespaces:u}),a(d)}),{acknowledged:n}}),D(this,"extend",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow();try{await this.isValidExtend(i)}catch(c){throw this.client.logger.error("extend() -> isValidExtend() failed"),c}const{topic:r}=i,s=Ar(),{done:n,resolve:o,reject:a}=bs();return this.events.once(Pe("session_extend",s),({error:c})=>{c?a(c):o()}),await this.setExpiry(r,it(tn)),this.sendRequest({topic:r,method:"wc_sessionExtend",params:{},clientRpcId:s,throwOnFailedPublish:!0}).catch(c=>{a(c)}),{acknowledged:n}}),D(this,"request",async i=>{this.isInitialized();try{await this.isValidRequest(i)}catch(m){throw this.client.logger.error("request() -> isValidRequest() failed"),m}const{chainId:r,request:s,topic:n,expiry:o=ct.wc_sessionRequest.req.ttl}=i,a=this.client.session.get(n);(a==null?void 0:a.transportType)===We.relay&&await this.confirmOnlineStateOrThrow();const c=Ar(),l=On().toString(),{done:u,resolve:d,reject:h}=bs(o,"Request expired. Please try again.");this.events.once(Pe("session_request",c),({error:m,result:y})=>{m?h(m):d(y)});const p="wc_sessionRequest",g=this.getAppLinkIfEnabled(a.peer.metadata,a.transportType);if(g)return await this.sendRequest({clientRpcId:c,relayRpcId:l,topic:n,method:p,params:{request:St(Ue({},s),{expiryTimestamp:it(o)}),chainId:r},expiry:o,throwOnFailedPublish:!0,appLink:g}).catch(m=>h(m)),this.client.events.emit("session_request_sent",{topic:n,request:s,chainId:r,id:c}),await u();const f={request:St(Ue({},s),{expiryTimestamp:it(o)}),chainId:r},w=this.shouldSetTVF(p,f);return await Promise.all([new Promise(async m=>{await this.sendRequest(Ue({clientRpcId:c,relayRpcId:l,topic:n,method:p,params:f,expiry:o,throwOnFailedPublish:!0},w&&{tvf:this.getTVFParams(c,f)})).catch(y=>h(y)),this.client.events.emit("session_request_sent",{topic:n,request:s,chainId:r,id:c}),m()}),new Promise(async m=>{var y;if(!((y=a.sessionConfig)!=null&&y.disableDeepLink)){const b=await Eb(this.client.core.storage,L1);await bb({id:c,topic:n,wcDeepLink:b})}m()}),u()]).then(m=>m[2])}),D(this,"respond",async i=>{this.isInitialized(),await this.isValidRespond(i);const{topic:r,response:s}=i,{id:n}=s,o=this.client.session.get(r);o.transportType===We.relay&&await this.confirmOnlineStateOrThrow();const a=this.getAppLinkIfEnabled(o.peer.metadata,o.transportType);dr(s)?await this.sendResult({id:n,topic:r,result:s.result,throwOnFailedPublish:!0,appLink:a}):Vi(s)&&await this.sendError({id:n,topic:r,error:s.error,appLink:a}),this.cleanupAfterResponse(i)}),D(this,"ping",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow();try{await this.isValidPing(i)}catch(s){throw this.client.logger.error("ping() -> isValidPing() failed"),s}const{topic:r}=i;if(this.client.session.keys.includes(r)){const s=Ar(),n=On().toString(),{done:o,resolve:a,reject:c}=bs();this.events.once(Pe("session_ping",s),({error:l})=>{l?c(l):a()}),await Promise.all([this.sendRequest({topic:r,method:"wc_sessionPing",params:{},throwOnFailedPublish:!0,clientRpcId:s,relayRpcId:n}),o()])}else this.client.core.pairing.pairings.keys.includes(r)&&(this.client.logger.warn("ping() on pairing topic is deprecated and will be removed in the next major release."),await this.client.core.pairing.ping({topic:r}))}),D(this,"emit",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow(),await this.isValidEmit(i);const{topic:r,event:s,chainId:n}=i,o=On().toString(),a=Ar();await this.sendRequest({topic:r,method:"wc_sessionEvent",params:{event:s,chainId:n},throwOnFailedPublish:!0,relayRpcId:o,clientRpcId:a})}),D(this,"disconnect",async i=>{this.isInitialized(),await this.confirmOnlineStateOrThrow(),await this.isValidDisconnect(i);const{topic:r}=i;if(this.client.session.keys.includes(r))await this.sendRequest({topic:r,method:"wc_sessionDelete",params:Le("USER_DISCONNECTED"),throwOnFailedPublish:!0}),await this.deleteSession({topic:r,emitEvent:!1});else if(this.client.core.pairing.pairings.keys.includes(r))await this.client.core.pairing.disconnect({topic:r});else{const{message:s}=H("MISMATCHED_TOPIC",`Session or pairing topic not found: ${r}`);throw new Error(s)}}),D(this,"find",i=>(this.isInitialized(),this.client.session.getAll().filter(r=>s5(r,i)))),D(this,"getPendingSessionRequests",()=>this.client.pendingRequest.getAll()),D(this,"authenticate",async(i,r)=>{var s;this.isInitialized(),this.isValidAuthenticate(i);const n=r&&this.client.core.linkModeSupportedApps.includes(r)&&((s=this.client.metadata.redirect)==null?void 0:s.linkMode),o=n?We.link_mode:We.relay;o===We.relay&&await this.confirmOnlineStateOrThrow();const{chains:a,statement:c="",uri:l,domain:u,nonce:d,type:h,exp:p,nbf:g,methods:f=[],expiry:w}=i,m=[...i.resources||[]],{topic:y,uri:b}=await this.client.core.pairing.create({methods:["wc_sessionAuthenticate"],transportType:o});this.client.logger.info({message:"Generated new pairing",pairing:{topic:y,uri:b}});const v=await this.client.core.crypto.generateKeyPair(),S=$l(v);if(await Promise.all([this.client.auth.authKeys.set(Tl,{responseTopic:S,publicKey:v}),this.client.auth.pairingTopics.set(S,{topic:S,pairingTopic:y})]),await this.client.core.relayer.subscribe(S,{transportType:o}),this.client.logger.info(`sending request to new pairing topic: ${y}`),f.length>0){const{namespace:R}=Mn(a[0]);let B=gv(R,"request",f);Sl(m)&&(B=wv(B,m.pop())),m.push(B)}const N=w&&w>ct.wc_sessionAuthenticate.req.ttl?w:ct.wc_sessionAuthenticate.req.ttl,P={authPayload:{type:h??"caip122",chains:a,statement:c,aud:l,domain:u,version:"1",nonce:d,iat:new Date().toISOString(),exp:p,nbf:g,resources:m},requester:{publicKey:v,metadata:this.client.metadata},expiryTimestamp:it(N)},k={eip155:{chains:a,methods:[...new Set(["personal_sign",...f])],events:["chainChanged","accountsChanged"]}},_={requiredNamespaces:{},optionalNamespaces:k,relays:[{protocol:"irn"}],pairingTopic:y,proposer:{publicKey:v,metadata:this.client.metadata},expiryTimestamp:it(ct.wc_sessionPropose.req.ttl),id:Ar()},{done:M,resolve:L,reject:U}=bs(N,"Request expired"),K=Ar(),I=Pe("session_connect",_.id),E=Pe("session_request",K),x=async({error:R,session:B})=>{this.events.off(E,T),R?U(R):B&&L({session:B})},T=async R=>{var B,F,G;if(await this.deletePendingAuthRequest(K,{message:"fulfilled",code:0}),R.error){const Ee=Le("WC_METHOD_UNSUPPORTED","wc_sessionAuthenticate");return R.error.code===Ee.code?void 0:(this.events.off(I,x),U(R.error.message))}await this.deleteProposal(_.id),this.events.off(I,x);const{cacaos:oe,responder:se}=R.result,fe=[],Ce=[];for(const Ee of oe){await k0({cacao:Ee,projectId:this.client.core.projectId})||(this.client.logger.error(Ee,"Signature verification failed"),U(Le("SESSION_SETTLEMENT_FAILED","Signature verification failed")));const{p:ze}=Ee,Ve=Sl(ze.resources),Ke=[Nh(ze.iss)],Ze=Dl(ze.iss);if(Ve){const Nt=P0(Ve),Qr=O0(Ve);fe.push(...Nt),Ke.push(...Qr)}for(const Nt of Ke)Ce.push(`${Nt}:${Ze}`)}const Me=await this.client.core.crypto.generateSharedKey(v,se.publicKey);let Ae;fe.length>0&&(Ae={topic:Me,acknowledged:!0,self:{publicKey:v,metadata:this.client.metadata},peer:se,controller:se.publicKey,expiry:it(tn),requiredNamespaces:{},optionalNamespaces:{},relay:{protocol:"irn"},pairingTopic:y,namespaces:e1([...new Set(fe)],[...new Set(Ce)]),transportType:o},await this.client.core.relayer.subscribe(Me,{transportType:o}),await this.client.session.set(Me,Ae),y&&await this.client.core.pairing.updateMetadata({topic:y,metadata:se.metadata}),Ae=this.client.session.get(Me)),(B=this.client.metadata.redirect)!=null&&B.linkMode&&(F=se.metadata.redirect)!=null&&F.linkMode&&(G=se.metadata.redirect)!=null&&G.universal&&r&&(this.client.core.addLinkModeSupportedApp(se.metadata.redirect.universal),this.client.session.update(Me,{transportType:We.link_mode})),L({auths:oe,session:Ae})};this.events.once(I,x),this.events.once(E,T);let O;try{if(n){const R=Ns("wc_sessionAuthenticate",P,K);this.client.core.history.set(y,R);const B=await this.client.core.crypto.encode("",R,{type:ic,encoding:Br});O=yc(r,y,B)}else await Promise.all([this.sendRequest({topic:y,method:"wc_sessionAuthenticate",params:P,expiry:i.expiry,throwOnFailedPublish:!0,clientRpcId:K}),this.sendRequest({topic:y,method:"wc_sessionPropose",params:_,expiry:ct.wc_sessionPropose.req.ttl,throwOnFailedPublish:!0,clientRpcId:_.id})])}catch(R){throw this.events.off(I,x),this.events.off(E,T),R}return await this.setProposal(_.id,_),await this.setAuthRequest(K,{request:St(Ue({},P),{verifyContext:{}}),pairingTopic:y,transportType:o}),{uri:O??b,response:M}}),D(this,"approveSessionAuthenticate",async i=>{const{id:r,auths:s}=i,n=this.client.core.eventClient.createEvent({properties:{topic:r.toString(),trace:[ts.authenticated_session_approve_started]}});try{this.isInitialized()}catch(w){throw n.setError(yo.no_internet_connection),w}const o=this.getPendingAuthRequest(r);if(!o)throw n.setError(yo.authenticated_session_pending_request_not_found),new Error(`Could not find pending auth request with id ${r}`);const a=o.transportType||We.relay;a===We.relay&&await this.confirmOnlineStateOrThrow();const c=o.requester.publicKey,l=await this.client.core.crypto.generateKeyPair(),u=$l(c),d={type:br,receiverPublicKey:c,senderPublicKey:l},h=[],p=[];for(const w of s){if(!await k0({cacao:w,projectId:this.client.core.projectId})){n.setError(yo.invalid_cacao);const S=Le("SESSION_SETTLEMENT_FAILED","Signature verification failed");throw await this.sendError({id:r,topic:u,error:S,encodeOpts:d}),new Error(S.message)}n.addTrace(ts.cacaos_verified);const{p:m}=w,y=Sl(m.resources),b=[Nh(m.iss)],v=Dl(m.iss);if(y){const S=P0(y),N=O0(y);h.push(...S),b.push(...N)}for(const S of b)p.push(`${S}:${v}`)}const g=await this.client.core.crypto.generateSharedKey(l,c);n.addTrace(ts.create_authenticated_session_topic);let f;if((h==null?void 0:h.length)>0){f={topic:g,acknowledged:!0,self:{publicKey:l,metadata:this.client.metadata},peer:{publicKey:c,metadata:o.requester.metadata},controller:c,expiry:it(tn),authentication:s,requiredNamespaces:{},optionalNamespaces:{},relay:{protocol:"irn"},pairingTopic:o.pairingTopic,namespaces:e1([...new Set(h)],[...new Set(p)]),transportType:a},n.addTrace(ts.subscribing_authenticated_session_topic);try{await this.client.core.relayer.subscribe(g,{transportType:a})}catch(w){throw n.setError(yo.subscribe_authenticated_session_topic_failure),w}n.addTrace(ts.subscribe_authenticated_session_topic_success),await this.client.session.set(g,f),n.addTrace(ts.store_authenticated_session),await this.client.core.pairing.updateMetadata({topic:o.pairingTopic,metadata:o.requester.metadata})}n.addTrace(ts.publishing_authenticated_session_approve);try{await this.sendResult({topic:u,id:r,result:{cacaos:s,responder:{publicKey:l,metadata:this.client.metadata}},encodeOpts:d,throwOnFailedPublish:!0,appLink:this.getAppLinkIfEnabled(o.requester.metadata,a)})}catch(w){throw n.setError(yo.authenticated_session_approve_publish_failure),w}return await this.client.auth.requests.delete(r,{message:"fulfilled",code:0}),await this.client.core.pairing.activate({topic:o.pairingTopic}),this.client.core.eventClient.deleteEvent({eventId:n.eventId}),{session:f}}),D(this,"rejectSessionAuthenticate",async i=>{this.isInitialized();const{id:r,reason:s}=i,n=this.getPendingAuthRequest(r);if(!n)throw new Error(`Could not find pending auth request with id ${r}`);n.transportType===We.relay&&await this.confirmOnlineStateOrThrow();const o=n.requester.publicKey,a=await this.client.core.crypto.generateKeyPair(),c=$l(o),l={type:br,receiverPublicKey:o,senderPublicKey:a};await this.sendError({id:r,topic:c,error:s,encodeOpts:l,rpcOpts:ct.wc_sessionAuthenticate.reject,appLink:this.getAppLinkIfEnabled(n.requester.metadata,n.transportType)}),await this.client.auth.requests.delete(r,{message:"rejected",code:0}),await this.client.proposal.delete(r,Le("USER_DISCONNECTED"))}),D(this,"formatAuthMessage",i=>{this.isInitialized();const{request:r,iss:s}=i;return cw(r,s)}),D(this,"processRelayMessageCache",()=>{setTimeout(async()=>{if(this.relayMessageCache.length!==0)for(;this.relayMessageCache.length>0;)try{const i=this.relayMessageCache.shift();i&&await this.onRelayMessage(i)}catch(i){this.client.logger.error(i)}},50)}),D(this,"cleanupDuplicatePairings",async i=>{if(i.pairingTopic)try{const r=this.client.core.pairing.pairings.get(i.pairingTopic),s=this.client.core.pairing.pairings.getAll().filter(n=>{var o,a;return((o=n.peerMetadata)==null?void 0:o.url)&&((a=n.peerMetadata)==null?void 0:a.url)===i.peer.metadata.url&&n.topic&&n.topic!==r.topic});if(s.length===0)return;this.client.logger.info(`Cleaning up ${s.length} duplicate pairing(s)`),await Promise.all(s.map(n=>this.client.core.pairing.disconnect({topic:n.topic}))),this.client.logger.info("Duplicate pairings clean up finished")}catch(r){this.client.logger.error(r)}}),D(this,"deleteSession",async i=>{var r;const{topic:s,expirerHasDeleted:n=!1,emitEvent:o=!0,id:a=0}=i,{self:c}=this.client.session.get(s);await this.client.core.relayer.unsubscribe(s),await this.client.session.delete(s,Le("USER_DISCONNECTED")),this.addToRecentlyDeleted(s,"session"),this.client.core.crypto.keychain.has(c.publicKey)&&await this.client.core.crypto.deleteKeyPair(c.publicKey),this.client.core.crypto.keychain.has(s)&&await this.client.core.crypto.deleteSymKey(s),n||this.client.core.expirer.del(s),this.client.core.storage.removeItem(L1).catch(l=>this.client.logger.warn(l)),this.getPendingSessionRequests().forEach(l=>{l.topic===s&&this.deletePendingSessionRequest(l.id,Le("USER_DISCONNECTED"))}),s===((r=this.sessionRequestQueue.queue[0])==null?void 0:r.topic)&&(this.sessionRequestQueue.state=Ui.idle),o&&this.client.events.emit("session_delete",{id:a,topic:s})}),D(this,"deleteProposal",async(i,r)=>{if(r)try{const s=this.client.proposal.get(i),n=this.client.core.eventClient.getEvent({topic:s.pairingTopic});n==null||n.setError(es.proposal_expired)}catch{}await Promise.all([this.client.proposal.delete(i,Le("USER_DISCONNECTED")),r?Promise.resolve():this.client.core.expirer.del(i)]),this.addToRecentlyDeleted(i,"proposal")}),D(this,"deletePendingSessionRequest",async(i,r,s=!1)=>{await Promise.all([this.client.pendingRequest.delete(i,r),s?Promise.resolve():this.client.core.expirer.del(i)]),this.addToRecentlyDeleted(i,"request"),this.sessionRequestQueue.queue=this.sessionRequestQueue.queue.filter(n=>n.id!==i),s&&(this.sessionRequestQueue.state=Ui.idle,this.client.events.emit("session_request_expire",{id:i}))}),D(this,"deletePendingAuthRequest",async(i,r,s=!1)=>{await Promise.all([this.client.auth.requests.delete(i,r),s?Promise.resolve():this.client.core.expirer.del(i)])}),D(this,"setExpiry",async(i,r)=>{this.client.session.keys.includes(i)&&(this.client.core.expirer.set(i,r),await this.client.session.update(i,{expiry:r}))}),D(this,"setProposal",async(i,r)=>{this.client.core.expirer.set(i,it(ct.wc_sessionPropose.req.ttl)),await this.client.proposal.set(i,r)}),D(this,"setAuthRequest",async(i,r)=>{const{request:s,pairingTopic:n,transportType:o=We.relay}=r;this.client.core.expirer.set(i,s.expiryTimestamp),await this.client.auth.requests.set(i,{authPayload:s.authPayload,requester:s.requester,expiryTimestamp:s.expiryTimestamp,id:i,pairingTopic:n,verifyContext:s.verifyContext,transportType:o})}),D(this,"setPendingSessionRequest",async i=>{const{id:r,topic:s,params:n,verifyContext:o}=i,a=n.request.expiryTimestamp||it(ct.wc_sessionRequest.req.ttl);this.client.core.expirer.set(r,a),await this.client.pendingRequest.set(r,{id:r,topic:s,params:n,verifyContext:o})}),D(this,"sendRequest",async i=>{const{topic:r,method:s,params:n,expiry:o,relayRpcId:a,clientRpcId:c,throwOnFailedPublish:l,appLink:u,tvf:d}=i,h=Ns(s,n,c);let p;const g=!!u;try{const m=g?Br:Oi;p=await this.client.core.crypto.encode(r,h,{encoding:m})}catch(m){throw await this.cleanup(),this.client.logger.error(`sendRequest() -> core.crypto.encode() for topic ${r} failed`),m}let f;if(u7.includes(s)){const m=Ki(JSON.stringify(h)),y=Ki(p);f=await this.client.core.verify.register({id:y,decryptedId:m})}const w=ct[s].req;if(w.attestation=f,o&&(w.ttl=o),a&&(w.id=a),this.client.core.history.set(r,h),g){const m=yc(u,r,p);await pe.Linking.openURL(m,this.client.name)}else{const m=ct[s].req;o&&(m.ttl=o),a&&(m.id=a),m.tvf=St(Ue({},d),{correlationId:h.id}),l?(m.internal=St(Ue({},m.internal),{throwOnFailedPublish:!0}),await this.client.core.relayer.publish(r,p,m)):this.client.core.relayer.publish(r,p,m).catch(y=>this.client.logger.error(y))}return h.id}),D(this,"sendResult",async i=>{const{id:r,topic:s,result:n,throwOnFailedPublish:o,encodeOpts:a,appLink:c}=i,l=ou(r,n);let u;const d=c&&typeof(pe==null?void 0:pe.Linking)<"u";try{const g=d?Br:Oi;u=await this.client.core.crypto.encode(s,l,St(Ue({},a||{}),{encoding:g}))}catch(g){throw await this.cleanup(),this.client.logger.error(`sendResult() -> core.crypto.encode() for topic ${s} failed`),g}let h,p;try{h=await this.client.core.history.get(s,r);const g=h.request;try{this.shouldSetTVF(g.method,g.params)&&(p=this.getTVFParams(r,g.params,n))}catch(f){this.client.logger.warn("sendResult() -> getTVFParams() failed",f)}}catch(g){throw this.client.logger.error(`sendResult() -> history.get(${s}, ${r}) failed`),g}if(d){const g=yc(c,s,u);await pe.Linking.openURL(g,this.client.name)}else{const g=h.request.method,f=ct[g].res;f.tvf=St(Ue({},p),{correlationId:r}),o?(f.internal=St(Ue({},f.internal),{throwOnFailedPublish:!0}),await this.client.core.relayer.publish(s,u,f)):this.client.core.relayer.publish(s,u,f).catch(w=>this.client.logger.error(w))}await this.client.core.history.resolve(l)}),D(this,"sendError",async i=>{const{id:r,topic:s,error:n,encodeOpts:o,rpcOpts:a,appLink:c}=i,l=Mf(r,n);let u;const d=c&&typeof(pe==null?void 0:pe.Linking)<"u";try{const p=d?Br:Oi;u=await this.client.core.crypto.encode(s,l,St(Ue({},o||{}),{encoding:p}))}catch(p){throw await this.cleanup(),this.client.logger.error(`sendError() -> core.crypto.encode() for topic ${s} failed`),p}let h;try{h=await this.client.core.history.get(s,r)}catch(p){throw this.client.logger.error(`sendError() -> history.get(${s}, ${r}) failed`),p}if(d){const p=yc(c,s,u);await pe.Linking.openURL(p,this.client.name)}else{const p=h.request.method,g=a||ct[p].res;this.client.core.relayer.publish(s,u,g)}await this.client.core.history.resolve(l)}),D(this,"cleanup",async()=>{const i=[],r=[];this.client.session.getAll().forEach(s=>{let n=!1;Rr(s.expiry)&&(n=!0),this.client.core.crypto.keychain.has(s.topic)||(n=!0),n&&i.push(s.topic)}),this.client.proposal.getAll().forEach(s=>{Rr(s.expiryTimestamp)&&r.push(s.id)}),await Promise.all([...i.map(s=>this.deleteSession({topic:s})),...r.map(s=>this.deleteProposal(s))])}),D(this,"onProviderMessageEvent",async i=>{!this.initialized||this.relayMessageCache.length>0?this.relayMessageCache.push(i):await this.onRelayMessage(i)}),D(this,"onRelayEventRequest",async i=>{this.requestQueue.queue.push(i),await this.processRequestsQueue()}),D(this,"processRequestsQueue",async()=>{if(this.requestQueue.state===Ui.active){this.client.logger.info("Request queue already active, skipping...");return}for(this.client.logger.info(`Request queue starting with ${this.requestQueue.queue.length} requests`);this.requestQueue.queue.length>0;){this.requestQueue.state=Ui.active;const i=this.requestQueue.queue.shift();if(i)try{await this.processRequest(i)}catch(r){this.client.logger.warn(r)}}this.requestQueue.state=Ui.idle}),D(this,"processRequest",async i=>{const{topic:r,payload:s,attestation:n,transportType:o,encryptedId:a}=i,c=s.method;if(!this.shouldIgnorePairingRequest({topic:r,requestMethod:c}))switch(c){case"wc_sessionPropose":return await this.onSessionProposeRequest({topic:r,payload:s,attestation:n,encryptedId:a});case"wc_sessionSettle":return await this.onSessionSettleRequest(r,s);case"wc_sessionUpdate":return await this.onSessionUpdateRequest(r,s);case"wc_sessionExtend":return await this.onSessionExtendRequest(r,s);case"wc_sessionPing":return await this.onSessionPingRequest(r,s);case"wc_sessionDelete":return await this.onSessionDeleteRequest(r,s);case"wc_sessionRequest":return await this.onSessionRequest({topic:r,payload:s,attestation:n,encryptedId:a,transportType:o});case"wc_sessionEvent":return await this.onSessionEventRequest(r,s);case"wc_sessionAuthenticate":return await this.onSessionAuthenticateRequest({topic:r,payload:s,attestation:n,encryptedId:a,transportType:o});default:return this.client.logger.info(`Unsupported request method ${c}`)}}),D(this,"onRelayEventResponse",async i=>{const{topic:r,payload:s,transportType:n}=i,o=(await this.client.core.history.get(r,s.id)).request.method;switch(o){case"wc_sessionPropose":return this.onSessionProposeResponse(r,s,n);case"wc_sessionSettle":return this.onSessionSettleResponse(r,s);case"wc_sessionUpdate":return this.onSessionUpdateResponse(r,s);case"wc_sessionExtend":return this.onSessionExtendResponse(r,s);case"wc_sessionPing":return this.onSessionPingResponse(r,s);case"wc_sessionRequest":return this.onSessionRequestResponse(r,s);case"wc_sessionAuthenticate":return this.onSessionAuthenticateResponse(r,s);default:return this.client.logger.info(`Unsupported response method ${o}`)}}),D(this,"onRelayEventUnknownPayload",i=>{const{topic:r}=i,{message:s}=H("MISSING_OR_INVALID",`Decoded payload on topic ${r} is not identifiable as a JSON-RPC request or a response.`);throw new Error(s)}),D(this,"shouldIgnorePairingRequest",i=>{const{topic:r,requestMethod:s}=i,n=this.expectedPairingMethodMap.get(r);return!n||n.includes(s)?!1:!!(n.includes("wc_sessionAuthenticate")&&this.client.events.listenerCount("session_authenticate")>0)}),D(this,"onSessionProposeRequest",async i=>{const{topic:r,payload:s,attestation:n,encryptedId:o}=i,{params:a,id:c}=s;try{const l=this.client.core.eventClient.getEvent({topic:r});this.client.events.listenerCount("session_proposal")===0&&(console.warn("No listener for session_proposal event"),l==null||l.setError(hr.proposal_listener_not_found)),this.isValidConnect(Ue({},s.params));const u=a.expiryTimestamp||it(ct.wc_sessionPropose.req.ttl),d=Ue({id:c,pairingTopic:r,expiryTimestamp:u},a);await this.setProposal(c,d);const h=await this.getVerifyContext({attestationId:n,hash:Ki(JSON.stringify(s)),encryptedId:o,metadata:d.proposer.metadata});l==null||l.addTrace(qi.emit_session_proposal),this.client.events.emit("session_proposal",{id:c,params:d,verifyContext:h})}catch(l){await this.sendError({id:c,topic:r,error:l,rpcOpts:ct.wc_sessionPropose.autoReject}),this.client.logger.error(l)}}),D(this,"onSessionProposeResponse",async(i,r,s)=>{const{id:n}=r;if(dr(r)){const{result:o}=r;this.client.logger.trace({type:"method",method:"onSessionProposeResponse",result:o});const a=this.client.proposal.get(n);this.client.logger.trace({type:"method",method:"onSessionProposeResponse",proposal:a});const c=a.proposer.publicKey;this.client.logger.trace({type:"method",method:"onSessionProposeResponse",selfPublicKey:c});const l=o.responderPublicKey;this.client.logger.trace({type:"method",method:"onSessionProposeResponse",peerPublicKey:l});const u=await this.client.core.crypto.generateSharedKey(c,l);this.pendingSessions.set(n,{sessionTopic:u,pairingTopic:i,proposalId:n,publicKey:c});const d=await this.client.core.relayer.subscribe(u,{transportType:s});this.client.logger.trace({type:"method",method:"onSessionProposeResponse",subscriptionId:d}),await this.client.core.pairing.activate({topic:i})}else if(Vi(r)){await this.client.proposal.delete(n,Le("USER_DISCONNECTED"));const o=Pe("session_connect",n);if(this.events.listenerCount(o)===0)throw new Error(`emitting ${o} without any listeners, 954`);this.events.emit(o,{error:r.error})}}),D(this,"onSessionSettleRequest",async(i,r)=>{const{id:s,params:n}=r;try{this.isValidSessionSettleRequest(n);const{relay:o,controller:a,expiry:c,namespaces:l,sessionProperties:u,scopedProperties:d,sessionConfig:h}=r.params,p=[...this.pendingSessions.values()].find(w=>w.sessionTopic===i);if(!p)return this.client.logger.error(`Pending session not found for topic ${i}`);const g=this.client.proposal.get(p.proposalId),f=St(Ue(Ue(Ue({topic:i,relay:o,expiry:c,namespaces:l,acknowledged:!0,pairingTopic:p.pairingTopic,requiredNamespaces:g.requiredNamespaces,optionalNamespaces:g.optionalNamespaces,controller:a.publicKey,self:{publicKey:p.publicKey,metadata:this.client.metadata},peer:{publicKey:a.publicKey,metadata:a.metadata}},u&&{sessionProperties:u}),d&&{scopedProperties:d}),h&&{sessionConfig:h}),{transportType:We.relay});await this.client.session.set(f.topic,f),await this.setExpiry(f.topic,f.expiry),await this.client.core.pairing.updateMetadata({topic:p.pairingTopic,metadata:f.peer.metadata}),this.client.events.emit("session_connect",{session:f}),this.events.emit(Pe("session_connect",p.proposalId),{session:f}),this.pendingSessions.delete(p.proposalId),this.deleteProposal(p.proposalId,!1),this.cleanupDuplicatePairings(f),await this.sendResult({id:r.id,topic:i,result:!0,throwOnFailedPublish:!0})}catch(o){await this.sendError({id:s,topic:i,error:o}),this.client.logger.error(o)}}),D(this,"onSessionSettleResponse",async(i,r)=>{const{id:s}=r;dr(r)?(await this.client.session.update(i,{acknowledged:!0}),this.events.emit(Pe("session_approve",s),{})):Vi(r)&&(await this.client.session.delete(i,Le("USER_DISCONNECTED")),this.events.emit(Pe("session_approve",s),{error:r.error}))}),D(this,"onSessionUpdateRequest",async(i,r)=>{const{params:s,id:n}=r;try{const o=`${i}_session_update`,a=wo.get(o);if(a&&this.isRequestOutOfSync(a,n)){this.client.logger.warn(`Discarding out of sync request - ${n}`),this.sendError({id:n,topic:i,error:Le("INVALID_UPDATE_REQUEST")});return}this.isValidUpdate(Ue({topic:i},s));try{wo.set(o,n),await this.client.session.update(i,{namespaces:s.namespaces}),await this.sendResult({id:n,topic:i,result:!0,throwOnFailedPublish:!0})}catch(c){throw wo.delete(o),c}this.client.events.emit("session_update",{id:n,topic:i,params:s})}catch(o){await this.sendError({id:n,topic:i,error:o}),this.client.logger.error(o)}}),D(this,"isRequestOutOfSync",(i,r)=>r.toString().slice(0,-3)<i.toString().slice(0,-3)),D(this,"onSessionUpdateResponse",(i,r)=>{const{id:s}=r,n=Pe("session_update",s);if(this.events.listenerCount(n)===0)throw new Error(`emitting ${n} without any listeners`);dr(r)?this.events.emit(Pe("session_update",s),{}):Vi(r)&&this.events.emit(Pe("session_update",s),{error:r.error})}),D(this,"onSessionExtendRequest",async(i,r)=>{const{id:s}=r;try{this.isValidExtend({topic:i}),await this.setExpiry(i,it(tn)),await this.sendResult({id:s,topic:i,result:!0,throwOnFailedPublish:!0}),this.client.events.emit("session_extend",{id:s,topic:i})}catch(n){await this.sendError({id:s,topic:i,error:n}),this.client.logger.error(n)}}),D(this,"onSessionExtendResponse",(i,r)=>{const{id:s}=r,n=Pe("session_extend",s);if(this.events.listenerCount(n)===0)throw new Error(`emitting ${n} without any listeners`);dr(r)?this.events.emit(Pe("session_extend",s),{}):Vi(r)&&this.events.emit(Pe("session_extend",s),{error:r.error})}),D(this,"onSessionPingRequest",async(i,r)=>{const{id:s}=r;try{this.isValidPing({topic:i}),await this.sendResult({id:s,topic:i,result:!0,throwOnFailedPublish:!0}),this.client.events.emit("session_ping",{id:s,topic:i})}catch(n){await this.sendError({id:s,topic:i,error:n}),this.client.logger.error(n)}}),D(this,"onSessionPingResponse",(i,r)=>{const{id:s}=r,n=Pe("session_ping",s);setTimeout(()=>{if(this.events.listenerCount(n)===0)throw new Error(`emitting ${n} without any listeners 2176`);dr(r)?this.events.emit(Pe("session_ping",s),{}):Vi(r)&&this.events.emit(Pe("session_ping",s),{error:r.error})},500)}),D(this,"onSessionDeleteRequest",async(i,r)=>{const{id:s}=r;try{this.isValidDisconnect({topic:i,reason:r.params}),Promise.all([new Promise(n=>{this.client.core.relayer.once(pt.publish,async()=>{n(await this.deleteSession({topic:i,id:s}))})}),this.sendResult({id:s,topic:i,result:!0,throwOnFailedPublish:!0}),this.cleanupPendingSentRequestsForTopic({topic:i,error:Le("USER_DISCONNECTED")})]).catch(n=>this.client.logger.error(n))}catch(n){this.client.logger.error(n)}}),D(this,"onSessionRequest",async i=>{var r,s,n;const{topic:o,payload:a,attestation:c,encryptedId:l,transportType:u}=i,{id:d,params:h}=a;try{await this.isValidRequest(Ue({topic:o},h));const p=this.client.session.get(o),g=await this.getVerifyContext({attestationId:c,hash:Ki(JSON.stringify(Ns("wc_sessionRequest",h,d))),encryptedId:l,metadata:p.peer.metadata,transportType:u}),f={id:d,topic:o,params:h,verifyContext:g};await this.setPendingSessionRequest(f),u===We.link_mode&&(r=p.peer.metadata.redirect)!=null&&r.universal&&this.client.core.addLinkModeSupportedApp((s=p.peer.metadata.redirect)==null?void 0:s.universal),(n=this.client.signConfig)!=null&&n.disableRequestQueue?this.emitSessionRequest(f):(this.addSessionRequestToSessionRequestQueue(f),this.processSessionRequestQueue())}catch(p){await this.sendError({id:d,topic:o,error:p}),this.client.logger.error(p)}}),D(this,"onSessionRequestResponse",(i,r)=>{const{id:s}=r,n=Pe("session_request",s);if(this.events.listenerCount(n)===0)throw new Error(`emitting ${n} without any listeners`);dr(r)?this.events.emit(Pe("session_request",s),{result:r.result}):Vi(r)&&this.events.emit(Pe("session_request",s),{error:r.error})}),D(this,"onSessionEventRequest",async(i,r)=>{const{id:s,params:n}=r;try{const o=`${i}_session_event_${n.event.name}`,a=wo.get(o);if(a&&this.isRequestOutOfSync(a,s)){this.client.logger.info(`Discarding out of sync request - ${s}`);return}this.isValidEmit(Ue({topic:i},n)),this.client.events.emit("session_event",{id:s,topic:i,params:n}),wo.set(o,s)}catch(o){await this.sendError({id:s,topic:i,error:o}),this.client.logger.error(o)}}),D(this,"onSessionAuthenticateResponse",(i,r)=>{const{id:s}=r;this.client.logger.trace({type:"method",method:"onSessionAuthenticateResponse",topic:i,payload:r}),dr(r)?this.events.emit(Pe("session_request",s),{result:r.result}):Vi(r)&&this.events.emit(Pe("session_request",s),{error:r.error})}),D(this,"onSessionAuthenticateRequest",async i=>{var r;const{topic:s,payload:n,attestation:o,encryptedId:a,transportType:c}=i;try{const{requester:l,authPayload:u,expiryTimestamp:d}=n.params,h=await this.getVerifyContext({attestationId:o,hash:Ki(JSON.stringify(n)),encryptedId:a,metadata:l.metadata,transportType:c}),p={requester:l,pairingTopic:s,id:n.id,authPayload:u,verifyContext:h,expiryTimestamp:d};await this.setAuthRequest(n.id,{request:p,pairingTopic:s,transportType:c}),c===We.link_mode&&(r=l.metadata.redirect)!=null&&r.universal&&this.client.core.addLinkModeSupportedApp(l.metadata.redirect.universal),this.client.events.emit("session_authenticate",{topic:s,params:n.params,id:n.id,verifyContext:h})}catch(l){this.client.logger.error(l);const u=n.params.requester.publicKey,d=await this.client.core.crypto.generateKeyPair(),h=this.getAppLinkIfEnabled(n.params.requester.metadata,c),p={type:br,receiverPublicKey:u,senderPublicKey:d};await this.sendError({id:n.id,topic:s,error:l,encodeOpts:p,rpcOpts:ct.wc_sessionAuthenticate.autoReject,appLink:h})}}),D(this,"addSessionRequestToSessionRequestQueue",i=>{this.sessionRequestQueue.queue.push(i)}),D(this,"cleanupAfterResponse",i=>{this.deletePendingSessionRequest(i.response.id,{message:"fulfilled",code:0}),setTimeout(()=>{this.sessionRequestQueue.state=Ui.idle,this.processSessionRequestQueue()},V.toMiliseconds(this.requestQueueDelay))}),D(this,"cleanupPendingSentRequestsForTopic",({topic:i,error:r})=>{const s=this.client.core.history.pending;s.length>0&&s.filter(n=>n.topic===i&&n.request.method==="wc_sessionRequest").forEach(n=>{const o=n.request.id,a=Pe("session_request",o);if(this.events.listenerCount(a)===0)throw new Error(`emitting ${a} without any listeners`);this.events.emit(Pe("session_request",n.request.id),{error:r})})}),D(this,"processSessionRequestQueue",()=>{if(this.sessionRequestQueue.state===Ui.active){this.client.logger.info("session request queue is already active.");return}const i=this.sessionRequestQueue.queue[0];if(!i){this.client.logger.info("session request queue is empty.");return}try{this.sessionRequestQueue.state=Ui.active,this.emitSessionRequest(i)}catch(r){this.client.logger.error(r)}}),D(this,"emitSessionRequest",i=>{this.client.events.emit("session_request",i)}),D(this,"onPairingCreated",i=>{if(i.methods&&this.expectedPairingMethodMap.set(i.topic,i.methods),i.active)return;const r=this.client.proposal.getAll().find(s=>s.pairingTopic===i.topic);r&&this.onSessionProposeRequest({topic:i.topic,payload:Ns("wc_sessionPropose",St(Ue({},r),{requiredNamespaces:r.requiredNamespaces,optionalNamespaces:r.optionalNamespaces,relays:r.relays,proposer:r.proposer,sessionProperties:r.sessionProperties,scopedProperties:r.scopedProperties}),r.id)})}),D(this,"isValidConnect",async i=>{if(!zt(i)){const{message:l}=H("MISSING_OR_INVALID",`connect() params: ${JSON.stringify(i)}`);throw new Error(l)}const{pairingTopic:r,requiredNamespaces:s,optionalNamespaces:n,sessionProperties:o,scopedProperties:a,relays:c}=i;if(Ct(r)||await this.isValidPairingTopic(r),!w5(c,!0)){const{message:l}=H("MISSING_OR_INVALID",`connect() relays: ${c}`);throw new Error(l)}if(!Ct(s)&&va(s)!==0&&this.validateNamespaces(s,"requiredNamespaces"),!Ct(n)&&va(n)!==0&&this.validateNamespaces(n,"optionalNamespaces"),Ct(o)||this.validateSessionProps(o,"sessionProperties"),!Ct(a)){this.validateSessionProps(a,"scopedProperties");const l=Object.keys(s||{}).concat(Object.keys(n||{}));if(!Object.keys(a).every(u=>l.includes(u)))throw new Error(`Scoped properties must be a subset of required/optional namespaces, received: ${JSON.stringify(a)}, required/optional namespaces: ${JSON.stringify(l)}`)}}),D(this,"validateNamespaces",(i,r)=>{const s=f5(i,"connect()",r);if(s)throw new Error(s.message)}),D(this,"isValidApprove",async i=>{if(!zt(i))throw new Error(H("MISSING_OR_INVALID",`approve() params: ${i}`).message);const{id:r,namespaces:s,relayProtocol:n,sessionProperties:o,scopedProperties:a}=i;this.checkRecentlyDeleted(r),await this.isValidProposalId(r);const c=this.client.proposal.get(r),l=Fu(s,"approve()");if(l)throw new Error(l.message);const u=r1(c.requiredNamespaces,s,"approve()");if(u)throw new Error(u.message);if(!et(n,!0)){const{message:d}=H("MISSING_OR_INVALID",`approve() relayProtocol: ${n}`);throw new Error(d)}if(Ct(o)||this.validateSessionProps(o,"sessionProperties"),!Ct(a)){this.validateSessionProps(a,"scopedProperties");const d=new Set(Object.keys(s));if(!Object.keys(a).every(h=>d.has(h)))throw new Error(`Scoped properties must be a subset of approved namespaces, received: ${JSON.stringify(a)}, approved namespaces: ${Array.from(d).join(", ")}`)}}),D(this,"isValidReject",async i=>{if(!zt(i)){const{message:n}=H("MISSING_OR_INVALID",`reject() params: ${i}`);throw new Error(n)}const{id:r,reason:s}=i;if(this.checkRecentlyDeleted(r),await this.isValidProposalId(r),!y5(s)){const{message:n}=H("MISSING_OR_INVALID",`reject() reason: ${JSON.stringify(s)}`);throw new Error(n)}}),D(this,"isValidSessionSettleRequest",i=>{if(!zt(i)){const{message:l}=H("MISSING_OR_INVALID",`onSessionSettleRequest() params: ${i}`);throw new Error(l)}const{relay:r,controller:s,namespaces:n,expiry:o}=i;if(!Rw(r)){const{message:l}=H("MISSING_OR_INVALID","onSessionSettleRequest() relay protocol should be a string");throw new Error(l)}const a=l5(s,"onSessionSettleRequest()");if(a)throw new Error(a.message);const c=Fu(n,"onSessionSettleRequest()");if(c)throw new Error(c.message);if(Rr(o)){const{message:l}=H("EXPIRED","onSessionSettleRequest()");throw new Error(l)}}),D(this,"isValidUpdate",async i=>{if(!zt(i)){const{message:c}=H("MISSING_OR_INVALID",`update() params: ${i}`);throw new Error(c)}const{topic:r,namespaces:s}=i;this.checkRecentlyDeleted(r),await this.isValidSessionTopic(r);const n=this.client.session.get(r),o=Fu(s,"update()");if(o)throw new Error(o.message);const a=r1(n.requiredNamespaces,s,"update()");if(a)throw new Error(a.message)}),D(this,"isValidExtend",async i=>{if(!zt(i)){const{message:s}=H("MISSING_OR_INVALID",`extend() params: ${i}`);throw new Error(s)}const{topic:r}=i;this.checkRecentlyDeleted(r),await this.isValidSessionTopic(r)}),D(this,"isValidRequest",async i=>{if(!zt(i)){const{message:c}=H("MISSING_OR_INVALID",`request() params: ${i}`);throw new Error(c)}const{topic:r,request:s,chainId:n,expiry:o}=i;this.checkRecentlyDeleted(r),await this.isValidSessionTopic(r);const{namespaces:a}=this.client.session.get(r);if(!i1(a,n)){const{message:c}=H("MISSING_OR_INVALID",`request() chainId: ${n}`);throw new Error(c)}if(!b5(s)){const{message:c}=H("MISSING_OR_INVALID",`request() ${JSON.stringify(s)}`);throw new Error(c)}if(!E5(a,n,s.method)){const{message:c}=H("MISSING_OR_INVALID",`request() method: ${s.method}`);throw new Error(c)}if(o&&!_5(o,Yu)){const{message:c}=H("MISSING_OR_INVALID",`request() expiry: ${o}. Expiry must be a number (in seconds) between ${Yu.min} and ${Yu.max}`);throw new Error(c)}}),D(this,"isValidRespond",async i=>{var r;if(!zt(i)){const{message:o}=H("MISSING_OR_INVALID",`respond() params: ${i}`);throw new Error(o)}const{topic:s,response:n}=i;try{await this.isValidSessionTopic(s)}catch(o){throw(r=i==null?void 0:i.response)!=null&&r.id&&this.cleanupAfterResponse(i),o}if(!v5(n)){const{message:o}=H("MISSING_OR_INVALID",`respond() response: ${JSON.stringify(n)}`);throw new Error(o)}}),D(this,"isValidPing",async i=>{if(!zt(i)){const{message:s}=H("MISSING_OR_INVALID",`ping() params: ${i}`);throw new Error(s)}const{topic:r}=i;await this.isValidSessionOrPairingTopic(r)}),D(this,"isValidEmit",async i=>{if(!zt(i)){const{message:a}=H("MISSING_OR_INVALID",`emit() params: ${i}`);throw new Error(a)}const{topic:r,event:s,chainId:n}=i;await this.isValidSessionTopic(r);const{namespaces:o}=this.client.session.get(r);if(!i1(o,n)){const{message:a}=H("MISSING_OR_INVALID",`emit() chainId: ${n}`);throw new Error(a)}if(!C5(s)){const{message:a}=H("MISSING_OR_INVALID",`emit() event: ${JSON.stringify(s)}`);throw new Error(a)}if(!x5(o,n,s.name)){const{message:a}=H("MISSING_OR_INVALID",`emit() event: ${JSON.stringify(s)}`);throw new Error(a)}}),D(this,"isValidDisconnect",async i=>{if(!zt(i)){const{message:s}=H("MISSING_OR_INVALID",`disconnect() params: ${i}`);throw new Error(s)}const{topic:r}=i;await this.isValidSessionOrPairingTopic(r)}),D(this,"isValidAuthenticate",i=>{const{chains:r,uri:s,domain:n,nonce:o}=i;if(!Array.isArray(r)||r.length===0)throw new Error("chains is required and must be a non-empty array");if(!et(s,!1))throw new Error("uri is required parameter");if(!et(n,!1))throw new Error("domain is required parameter");if(!et(o,!1))throw new Error("nonce is required parameter");if([...new Set(r.map(c=>Mn(c).namespace))].length>1)throw new Error("Multi-namespace requests are not supported. Please request single namespace only.");const{namespace:a}=Mn(r[0]);if(a!=="eip155")throw new Error("Only eip155 namespace is supported for authenticated sessions. Please use .connect() for non-eip155 chains.")}),D(this,"getVerifyContext",async i=>{const{attestationId:r,hash:s,encryptedId:n,metadata:o,transportType:a}=i,c={verified:{verifyUrl:o.verifyUrl||oa,validation:"UNKNOWN",origin:o.url||""}};try{if(a===We.link_mode){const u=this.getAppLinkIfEnabled(o,a);return c.verified.validation=u&&new URL(u).origin===new URL(o.url).origin?"VALID":"INVALID",c}const l=await this.client.core.verify.resolve({attestationId:r,hash:s,encryptedId:n,verifyUrl:o.verifyUrl});l&&(c.verified.origin=l.origin,c.verified.isScam=l.isScam,c.verified.validation=l.origin===new URL(o.url).origin?"VALID":"INVALID")}catch(l){this.client.logger.warn(l)}return this.client.logger.debug(`Verify context: ${JSON.stringify(c)}`),c}),D(this,"validateSessionProps",(i,r)=>{Object.values(i).forEach((s,n)=>{if(s==null){const{message:o}=H("MISSING_OR_INVALID",`${r} must contain an existing value for each key. Received: ${s} for key ${Object.keys(i)[n]}`);throw new Error(o)}})}),D(this,"getPendingAuthRequest",i=>{const r=this.client.auth.requests.get(i);return typeof r=="object"?r:void 0}),D(this,"addToRecentlyDeleted",(i,r)=>{if(this.recentlyDeletedMap.set(i,r),this.recentlyDeletedMap.size>=this.recentlyDeletedLimit){let s=0;const n=this.recentlyDeletedLimit/2;for(const o of this.recentlyDeletedMap.keys()){if(s++>=n)break;this.recentlyDeletedMap.delete(o)}}}),D(this,"checkRecentlyDeleted",i=>{const r=this.recentlyDeletedMap.get(i);if(r){const{message:s}=H("MISSING_OR_INVALID",`Record was recently deleted - ${r}: ${i}`);throw new Error(s)}}),D(this,"isLinkModeEnabled",(i,r)=>{var s,n,o,a,c,l,u,d,h;return!i||r!==We.link_mode?!1:((n=(s=this.client.metadata)==null?void 0:s.redirect)==null?void 0:n.linkMode)===!0&&((a=(o=this.client.metadata)==null?void 0:o.redirect)==null?void 0:a.universal)!==void 0&&((l=(c=this.client.metadata)==null?void 0:c.redirect)==null?void 0:l.universal)!==""&&((u=i==null?void 0:i.redirect)==null?void 0:u.universal)!==void 0&&((d=i==null?void 0:i.redirect)==null?void 0:d.universal)!==""&&((h=i==null?void 0:i.redirect)==null?void 0:h.linkMode)===!0&&this.client.core.linkModeSupportedApps.includes(i.redirect.universal)&&typeof(pe==null?void 0:pe.Linking)<"u"}),D(this,"getAppLinkIfEnabled",(i,r)=>{var s;return this.isLinkModeEnabled(i,r)?(s=i==null?void 0:i.redirect)==null?void 0:s.universal:void 0}),D(this,"handleLinkModeMessage",({url:i})=>{if(!i||!i.includes("wc_ev")||!i.includes("topic"))return;const r=C0(i,"topic")||"",s=decodeURIComponent(C0(i,"wc_ev")||""),n=this.client.session.keys.includes(r);n&&this.client.session.update(r,{transportType:We.link_mode}),this.client.core.dispatchEnvelope({topic:r,message:s,sessionExists:n})}),D(this,"registerLinkModeListeners",async()=>{var i;if(_p()||Xr()&&(i=this.client.metadata.redirect)!=null&&i.linkMode){const r=pe==null?void 0:pe.Linking;if(typeof r<"u"){r.addEventListener("url",this.handleLinkModeMessage,this.client.name);const s=await r.getInitialURL();s&&setTimeout(()=>{this.handleLinkModeMessage({url:s})},50)}}}),D(this,"shouldSetTVF",(i,r)=>{if(!r||i!=="wc_sessionRequest")return!1;const{request:s}=r;return Object.keys(B1).includes(s.method)}),D(this,"getTVFParams",(i,r,s)=>{var n,o;try{const a=r.request.method,c=this.extractTxHashesFromResult(a,s);return St(Ue({correlationId:i,rpcMethods:[a],chainId:r.chainId},this.isValidContractData(r.request.params)&&{contractAddresses:[(o=(n=r.request.params)==null?void 0:n[0])==null?void 0:o.to]}),{txHashes:c})}catch(a){this.client.logger.warn("Error getting TVF params",a)}return{}}),D(this,"isValidContractData",i=>{var r;if(!i)return!1;try{const s=(i==null?void 0:i.data)||((r=i==null?void 0:i[0])==null?void 0:r.data);if(!s.startsWith("0x"))return!1;const n=s.slice(2);return/^[0-9a-fA-F]*$/.test(n)?n.length%2===0:!1}catch{}return!1}),D(this,"extractTxHashesFromResult",(i,r)=>{try{const s=B1[i];if(typeof r=="string")return[r];const n=r[s.key];if(Ti(n))return i==="solana_signAllTransactions"?n.map(o=>ev(o)):n;if(typeof n=="string")return[n]}catch(s){this.client.logger.warn("Error extracting tx hashes from result",s)}return[]})}async processPendingMessageEvents(){try{const e=this.client.session.keys,i=this.client.core.relayer.messages.getWithoutAck(e);for(const[r,s]of Object.entries(i))for(const n of s)try{await this.onProviderMessageEvent({topic:r,message:n,publishedAt:Date.now()})}catch{this.client.logger.warn(`Error processing pending message event for topic: ${r}, message: ${n}`)}}catch(e){this.client.logger.warn("processPendingMessageEvents failed",e)}}isInitialized(){if(!this.initialized){const{message:e}=H("NOT_INITIALIZED",this.name);throw new Error(e)}}async confirmOnlineStateOrThrow(){await this.client.core.relayer.confirmOnlineStateOrThrow()}registerRelayerEvents(){this.client.core.relayer.on(pt.message,e=>{this.onProviderMessageEvent(e)})}async onRelayMessage(e){const{topic:i,message:r,attestation:s,transportType:n}=e,{publicKey:o}=this.client.auth.authKeys.keys.includes(Tl)?this.client.auth.authKeys.get(Tl):{responseTopic:void 0,publicKey:void 0};try{const a=await this.client.core.crypto.decode(i,r,{receiverPublicKey:o,encoding:n===We.link_mode?Br:Oi});Ep(a)?(this.client.core.history.set(i,a),await this.onRelayEventRequest({topic:i,payload:a,attestation:s,transportType:n,encryptedId:Ki(r)})):xp(a)?(await this.client.core.history.resolve(a),await this.onRelayEventResponse({topic:i,payload:a,transportType:n}),this.client.core.history.delete(i,a.id)):await this.onRelayEventUnknownPayload({topic:i,payload:a,transportType:n}),await this.client.core.relayer.messages.ack(i,r)}catch(a){this.client.logger.error(a)}}registerExpirerEvents(){this.client.core.expirer.on(yi.expired,async e=>{const{topic:i,id:r}=Qf(e.target);if(r&&this.client.pendingRequest.keys.includes(r))return await this.deletePendingSessionRequest(r,H("EXPIRED"),!0);if(r&&this.client.auth.requests.keys.includes(r))return await this.deletePendingAuthRequest(r,H("EXPIRED"),!0);i?this.client.session.keys.includes(i)&&(await this.deleteSession({topic:i,expirerHasDeleted:!0}),this.client.events.emit("session_expire",{topic:i})):r&&(await this.deleteProposal(r,!0),this.client.events.emit("proposal_expire",{id:r}))})}registerPairingEvents(){this.client.core.pairing.events.on(xs.create,e=>this.onPairingCreated(e)),this.client.core.pairing.events.on(xs.delete,e=>{this.addToRecentlyDeleted(e.topic,"pairing")})}isValidPairingTopic(e){if(!et(e,!1)){const{message:i}=H("MISSING_OR_INVALID",`pairing topic should be a string: ${e}`);throw new Error(i)}if(!this.client.core.pairing.pairings.keys.includes(e)){const{message:i}=H("NO_MATCHING_KEY",`pairing topic doesn't exist: ${e}`);throw new Error(i)}if(Rr(this.client.core.pairing.pairings.get(e).expiry)){const{message:i}=H("EXPIRED",`pairing topic: ${e}`);throw new Error(i)}}async isValidSessionTopic(e){if(!et(e,!1)){const{message:i}=H("MISSING_OR_INVALID",`session topic should be a string: ${e}`);throw new Error(i)}if(this.checkRecentlyDeleted(e),!this.client.session.keys.includes(e)){const{message:i}=H("NO_MATCHING_KEY",`session topic doesn't exist: ${e}`);throw new Error(i)}if(Rr(this.client.session.get(e).expiry)){await this.deleteSession({topic:e});const{message:i}=H("EXPIRED",`session topic: ${e}`);throw new Error(i)}if(!this.client.core.crypto.keychain.has(e)){const{message:i}=H("MISSING_OR_INVALID",`session topic does not exist in keychain: ${e}`);throw await this.deleteSession({topic:e}),new Error(i)}}async isValidSessionOrPairingTopic(e){if(this.checkRecentlyDeleted(e),this.client.session.keys.includes(e))await this.isValidSessionTopic(e);else if(this.client.core.pairing.pairings.keys.includes(e))this.isValidPairingTopic(e);else if(et(e,!1)){const{message:i}=H("NO_MATCHING_KEY",`session or pairing topic doesn't exist: ${e}`);throw new Error(i)}else{const{message:i}=H("MISSING_OR_INVALID",`session or pairing topic should be a string: ${e}`);throw new Error(i)}}async isValidProposalId(e){if(!m5(e)){const{message:i}=H("MISSING_OR_INVALID",`proposal id should be a number: ${e}`);throw new Error(i)}if(!this.client.proposal.keys.includes(e)){const{message:i}=H("NO_MATCHING_KEY",`proposal id doesn't exist: ${e}`);throw new Error(i)}if(Rr(this.client.proposal.get(e).expiryTimestamp)){await this.deleteProposal(e);const{message:i}=H("EXPIRED",`proposal id: ${e}`);throw new Error(i)}}},E7=class extends Gs{constructor(e,i){super(e,i,o7,Lp),this.core=e,this.logger=i}},x7=class extends Gs{constructor(e,i){super(e,i,a7,Lp),this.core=e,this.logger=i}},I7=class extends Gs{constructor(e,i){super(e,i,l7,Lp,r=>r.id),this.core=e,this.logger=i}},A7=class extends Gs{constructor(e,i){super(e,i,p7,gu,()=>Tl),this.core=e,this.logger=i}},_7=class extends Gs{constructor(e,i){super(e,i,g7,gu),this.core=e,this.logger=i}},N7=class extends Gs{constructor(e,i){super(e,i,f7,gu,r=>r.id),this.core=e,this.logger=i}};var S7=Object.defineProperty,$7=(t,e,i)=>e in t?S7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Ju=(t,e,i)=>$7(t,typeof e!="symbol"?e+"":e,i);let k7=class{constructor(e,i){this.core=e,this.logger=i,Ju(this,"authKeys"),Ju(this,"pairingTopics"),Ju(this,"requests"),this.authKeys=new A7(this.core,this.logger),this.pairingTopics=new _7(this.core,this.logger),this.requests=new N7(this.core,this.logger)}async init(){await this.authKeys.init(),await this.pairingTopics.init(),await this.requests.init()}};var P7=Object.defineProperty,O7=(t,e,i)=>e in t?P7(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,be=(t,e,i)=>O7(t,typeof e!="symbol"?e+"":e,i);let T7=class em extends s7{constructor(e){super(e),be(this,"protocol",Jw),be(this,"version",Xw),be(this,"name",Zu.name),be(this,"metadata"),be(this,"core"),be(this,"logger"),be(this,"events",new Jr.EventEmitter),be(this,"engine"),be(this,"session"),be(this,"proposal"),be(this,"pendingRequest"),be(this,"auth"),be(this,"signConfig"),be(this,"on",(r,s)=>this.events.on(r,s)),be(this,"once",(r,s)=>this.events.once(r,s)),be(this,"off",(r,s)=>this.events.off(r,s)),be(this,"removeListener",(r,s)=>this.events.removeListener(r,s)),be(this,"removeAllListeners",r=>this.events.removeAllListeners(r)),be(this,"connect",async r=>{try{return await this.engine.connect(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"pair",async r=>{try{return await this.engine.pair(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"approve",async r=>{try{return await this.engine.approve(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"reject",async r=>{try{return await this.engine.reject(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"update",async r=>{try{return await this.engine.update(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"extend",async r=>{try{return await this.engine.extend(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"request",async r=>{try{return await this.engine.request(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"respond",async r=>{try{return await this.engine.respond(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"ping",async r=>{try{return await this.engine.ping(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"emit",async r=>{try{return await this.engine.emit(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"disconnect",async r=>{try{return await this.engine.disconnect(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"find",r=>{try{return this.engine.find(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"getPendingSessionRequests",()=>{try{return this.engine.getPendingSessionRequests()}catch(r){throw this.logger.error(r.message),r}}),be(this,"authenticate",async(r,s)=>{try{return await this.engine.authenticate(r,s)}catch(n){throw this.logger.error(n.message),n}}),be(this,"formatAuthMessage",r=>{try{return this.engine.formatAuthMessage(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"approveSessionAuthenticate",async r=>{try{return await this.engine.approveSessionAuthenticate(r)}catch(s){throw this.logger.error(s.message),s}}),be(this,"rejectSessionAuthenticate",async r=>{try{return await this.engine.rejectSessionAuthenticate(r)}catch(s){throw this.logger.error(s.message),s}}),this.name=(e==null?void 0:e.name)||Zu.name,this.metadata=pb(e==null?void 0:e.metadata),this.signConfig=e==null?void 0:e.signConfig;const i=typeof(e==null?void 0:e.logger)<"u"&&typeof(e==null?void 0:e.logger)!="string"?e.logger:Cp(nu({level:(e==null?void 0:e.logger)||Zu.logger}));this.core=(e==null?void 0:e.core)||new t7(e),this.logger=Tt(i,this.name),this.session=new x7(this.core,this.logger),this.proposal=new E7(this.core,this.logger),this.pendingRequest=new I7(this.core,this.logger),this.engine=new C7(this),this.auth=new k7(this.core,this.logger)}static async init(e){const i=new em(e);return await i.initialize(),i}get context(){return ni(this.logger)}get pairing(){return this.core.pairing.pairings}async initialize(){this.logger.trace("Initialized");try{await this.core.start(),await this.session.init(),await this.proposal.init(),await this.pendingRequest.init(),await this.auth.init(),await this.engine.init(),this.logger.info("SignClient Initialization Success"),setTimeout(()=>{this.engine.processRelayMessageCache()},V.toMiliseconds(V.ONE_SECOND))}catch(e){throw this.logger.info("SignClient Initialization Failure"),this.logger.error(e.message),e}}};const D1="error",R7="wss://relay.walletconnect.org",L7="wc",M7="universal_provider",Cc=`${L7}@2:${M7}:`,tm="https://rpc.walletconnect.org/v1/",In="generic",B7=`${tm}bundler`,Ci={DEFAULT_CHAIN_CHANGED:"default_chain_changed"};function U7(){}function Mp(t){return t==null||typeof t!="object"&&typeof t!="function"}function Bp(t){return ArrayBuffer.isView(t)&&!(t instanceof DataView)}function D7(t){if(Mp(t))return t;if(Array.isArray(t)||Bp(t)||t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer)return t.slice(0);const e=Object.getPrototypeOf(t),i=e.constructor;if(t instanceof Date||t instanceof Map||t instanceof Set)return new i(t);if(t instanceof RegExp){const r=new i(t);return r.lastIndex=t.lastIndex,r}if(t instanceof DataView)return new i(t.buffer.slice(0));if(t instanceof Error){const r=new i(t.message);return r.stack=t.stack,r.name=t.name,r.cause=t.cause,r}if(typeof File<"u"&&t instanceof File)return new i([t],t.name,{type:t.type,lastModified:t.lastModified});if(typeof t=="object"){const r=Object.create(e);return Object.assign(r,t)}return t}function j1(t){return typeof t=="object"&&t!==null}function im(t){return Object.getOwnPropertySymbols(t).filter(e=>Object.prototype.propertyIsEnumerable.call(t,e))}function rm(t){return t==null?t===void 0?"[object Undefined]":"[object Null]":Object.prototype.toString.call(t)}const j7="[object RegExp]",sm="[object String]",nm="[object Number]",om="[object Boolean]",am="[object Arguments]",z7="[object Symbol]",F7="[object Date]",H7="[object Map]",q7="[object Set]",W7="[object Array]",V7="[object ArrayBuffer]",K7="[object Object]",G7="[object DataView]",Z7="[object Uint8Array]",Y7="[object Uint8ClampedArray]",J7="[object Uint16Array]",X7="[object Uint32Array]",Q7="[object Int8Array]",eC="[object Int16Array]",tC="[object Int32Array]",iC="[object Float32Array]",rC="[object Float64Array]";function sC(t,e){return Rn(t,void 0,t,new Map,e)}function Rn(t,e,i,r=new Map,s=void 0){const n=s==null?void 0:s(t,e,i,r);if(n!=null)return n;if(Mp(t))return t;if(r.has(t))return r.get(t);if(Array.isArray(t)){const o=new Array(t.length);r.set(t,o);for(let a=0;a<t.length;a++)o[a]=Rn(t[a],a,i,r,s);return Object.hasOwn(t,"index")&&(o.index=t.index),Object.hasOwn(t,"input")&&(o.input=t.input),o}if(t instanceof Date)return new Date(t.getTime());if(t instanceof RegExp){const o=new RegExp(t.source,t.flags);return o.lastIndex=t.lastIndex,o}if(t instanceof Map){const o=new Map;r.set(t,o);for(const[a,c]of t)o.set(a,Rn(c,a,i,r,s));return o}if(t instanceof Set){const o=new Set;r.set(t,o);for(const a of t)o.add(Rn(a,void 0,i,r,s));return o}if(typeof wt<"u"&&wt.isBuffer(t))return t.subarray();if(Bp(t)){const o=new(Object.getPrototypeOf(t)).constructor(t.length);r.set(t,o);for(let a=0;a<t.length;a++)o[a]=Rn(t[a],a,i,r,s);return o}if(t instanceof ArrayBuffer||typeof SharedArrayBuffer<"u"&&t instanceof SharedArrayBuffer)return t.slice(0);if(t instanceof DataView){const o=new DataView(t.buffer.slice(0),t.byteOffset,t.byteLength);return r.set(t,o),Is(o,t,i,r,s),o}if(typeof File<"u"&&t instanceof File){const o=new File([t],t.name,{type:t.type});return r.set(t,o),Is(o,t,i,r,s),o}if(t instanceof Blob){const o=new Blob([t],{type:t.type});return r.set(t,o),Is(o,t,i,r,s),o}if(t instanceof Error){const o=new t.constructor;return r.set(t,o),o.message=t.message,o.name=t.name,o.stack=t.stack,o.cause=t.cause,Is(o,t,i,r,s),o}if(typeof t=="object"&&nC(t)){const o=Object.create(Object.getPrototypeOf(t));return r.set(t,o),Is(o,t,i,r,s),o}return t}function Is(t,e,i=t,r,s){const n=[...Object.keys(e),...im(e)];for(let o=0;o<n.length;o++){const a=n[o],c=Object.getOwnPropertyDescriptor(t,a);(c==null||c.writable)&&(t[a]=Rn(e[a],a,i,r,s))}}function nC(t){switch(rm(t)){case am:case W7:case V7:case G7:case om:case F7:case iC:case rC:case Q7:case eC:case tC:case H7:case nm:case K7:case j7:case q7:case sm:case z7:case Z7:case Y7:case J7:case X7:return!0;default:return!1}}function oC(t,e){return sC(t,(i,r,s,n)=>{const o=e==null?void 0:e(i,r,s,n);if(o!=null)return o;if(typeof t=="object")switch(Object.prototype.toString.call(t)){case nm:case sm:case om:{const a=new t.constructor(t==null?void 0:t.valueOf());return Is(a,t),a}case am:{const a={};return Is(a,t),a.length=t.length,a[Symbol.iterator]=t[Symbol.iterator],a}default:return}})}function z1(t){return oC(t)}function F1(t){return t!==null&&typeof t=="object"&&rm(t)==="[object Arguments]"}function aC(t){return Bp(t)}function cC(t){var i;if(typeof t!="object"||t==null)return!1;if(Object.getPrototypeOf(t)===null)return!0;if(Object.prototype.toString.call(t)!=="[object Object]"){const r=t[Symbol.toStringTag];return r==null||!((i=Object.getOwnPropertyDescriptor(t,Symbol.toStringTag))!=null&&i.writable)?!1:t.toString()===`[object ${r}]`}let e=t;for(;Object.getPrototypeOf(e)!==null;)e=Object.getPrototypeOf(e);return Object.getPrototypeOf(t)===e}function lC(t,...e){const i=e.slice(0,-1),r=e[e.length-1];let s=t;for(let n=0;n<i.length;n++){const o=i[n];s=Zh(s,o,r,new Map)}return s}function Zh(t,e,i,r){if(Mp(t)&&(t=Object(t)),e==null||typeof e!="object")return t;if(r.has(e))return D7(r.get(e));if(r.set(e,t),Array.isArray(e)){e=e.slice();for(let n=0;n<e.length;n++)e[n]=e[n]??void 0}const s=[...Object.keys(e),...im(e)];for(let n=0;n<s.length;n++){const o=s[n];let a=e[o],c=t[o];if(F1(a)&&(a={...a}),F1(c)&&(c={...c}),typeof wt<"u"&&wt.isBuffer(a)&&(a=z1(a)),Array.isArray(a))if(typeof c=="object"&&c!=null){const u=[],d=Reflect.ownKeys(c);for(let h=0;h<d.length;h++){const p=d[h];u[p]=c[p]}c=u}else c=[];const l=i(c,a,o,t,e,r);l!=null?t[o]=l:Array.isArray(a)||j1(c)&&j1(a)?t[o]=Zh(c,a,i,r):c==null&&cC(a)?t[o]=Zh({},a,i,r):c==null&&aC(a)?t[o]=z1(a):(c===void 0||a!==void 0)&&(t[o]=a)}return t}function uC(t,...e){return lC(t,...e,U7)}var dC=Object.defineProperty,hC=Object.defineProperties,pC=Object.getOwnPropertyDescriptors,H1=Object.getOwnPropertySymbols,gC=Object.prototype.hasOwnProperty,fC=Object.prototype.propertyIsEnumerable,q1=(t,e,i)=>e in t?dC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Ec=(t,e)=>{for(var i in e||(e={}))gC.call(e,i)&&q1(t,i,e[i]);if(H1)for(var i of H1(e))fC.call(e,i)&&q1(t,i,e[i]);return t},wC=(t,e)=>hC(t,pC(e));function si(t,e,i){var r;const s=Mn(t);return((r=e.rpcMap)==null?void 0:r[s.reference])||`${tm}?chainId=${s.namespace}:${s.reference}&projectId=${i}`}function Zs(t){return t.includes(":")?t.split(":")[1]:t}function cm(t){return t.map(e=>`${e.split(":")[0]}:${e.split(":")[1]}`)}function mC(t,e){const i=Object.keys(e.namespaces).filter(s=>s.includes(t));if(!i.length)return[];const r=[];return i.forEach(s=>{const n=e.namespaces[s].accounts;r.push(...n)}),r}function Xu(t={},e={}){const i=W1(t),r=W1(e);return uC(i,r)}function W1(t){var e,i,r,s;const n={};if(!va(t))return n;for(const[o,a]of Object.entries(t)){const c=Tp(o)?[o]:a.chains,l=a.methods||[],u=a.events||[],d=a.rpcMap||{},h=Yo(o);n[h]=wC(Ec(Ec({},n[h]),a),{chains:Nl(c,(e=n[h])==null?void 0:e.chains),methods:Nl(l,(i=n[h])==null?void 0:i.methods),events:Nl(u,(r=n[h])==null?void 0:r.events),rpcMap:Ec(Ec({},d),(s=n[h])==null?void 0:s.rpcMap)})}return n}function V1(t){return t.includes(":")?t.split(":")[2]:t}function K1(t){const e={};for(const[i,r]of Object.entries(t)){const s=r.methods||[],n=r.events||[],o=r.accounts||[],a=Tp(i)?[i]:r.chains?r.chains:cm(r.accounts);e[i]={chains:a,methods:s,events:n,accounts:o}}return e}function Qu(t){return typeof t=="number"?t:t.includes("0x")?parseInt(t,16):(t=t.includes(":")?t.split(":")[1]:t,isNaN(Number(t))?t:Number(t))}const lm={},Se=t=>lm[t],ed=(t,e)=>{lm[t]=e};var yC=Object.defineProperty,bC=(t,e,i)=>e in t?yC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,rn=(t,e,i)=>bC(t,typeof e!="symbol"?e+"":e,i);let vC=class{constructor(e){rn(this,"name","polkadot"),rn(this,"client"),rn(this,"httpProviders"),rn(this,"events"),rn(this,"namespace"),rn(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(e,i),this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${e}`)}getAccounts(){const e=this.namespace.accounts;return e?e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2])||[]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;const s=Zs(i);e[s]=this.createHttpProvider(s,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}};var CC=Object.defineProperty,EC=Object.defineProperties,xC=Object.getOwnPropertyDescriptors,G1=Object.getOwnPropertySymbols,IC=Object.prototype.hasOwnProperty,AC=Object.prototype.propertyIsEnumerable,Yh=(t,e,i)=>e in t?CC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Z1=(t,e)=>{for(var i in e||(e={}))IC.call(e,i)&&Yh(t,i,e[i]);if(G1)for(var i of G1(e))AC.call(e,i)&&Yh(t,i,e[i]);return t},Y1=(t,e)=>EC(t,xC(e)),sn=(t,e,i)=>Yh(t,typeof e!="symbol"?e+"":e,i);let _C=class{constructor(e){sn(this,"name","eip155"),sn(this,"client"),sn(this,"chainId"),sn(this,"namespace"),sn(this,"httpProviders"),sn(this,"events"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.httpProviders=this.createHttpProviders(),this.chainId=parseInt(this.getDefaultChain())}async request(e){switch(e.request.method){case"eth_requestAccounts":return this.getAccounts();case"eth_accounts":return this.getAccounts();case"wallet_switchEthereumChain":return await this.handleSwitchChain(e);case"eth_chainId":return parseInt(this.getDefaultChain());case"wallet_getCapabilities":return await this.getCapabilities(e);case"wallet_getCallsStatus":return await this.getCallStatus(e)}return this.namespace.methods.includes(e.request.method)?await this.client.request(e):this.getHttpProvider().request(e.request)}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(parseInt(e),i),this.chainId=parseInt(e),this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${e}`)}requestAccounts(){return this.getAccounts()}getDefaultChain(){if(this.chainId)return this.chainId.toString();if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}createHttpProvider(e,i){const r=i||si(`${this.name}:${e}`,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;const s=parseInt(Zs(i));e[s]=this.createHttpProvider(s,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}getHttpProvider(){const e=this.chainId,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}async handleSwitchChain(e){var i,r;let s=e.request.params?(i=e.request.params[0])==null?void 0:i.chainId:"0x0";s=s.startsWith("0x")?s:`0x${s}`;const n=parseInt(s,16);if(this.isChainApproved(n))this.setDefaultChain(`${n}`);else if(this.namespace.methods.includes("wallet_switchEthereumChain"))await this.client.request({topic:e.topic,request:{method:e.request.method,params:[{chainId:s}]},chainId:(r=this.namespace.chains)==null?void 0:r[0]}),this.setDefaultChain(`${n}`);else throw new Error(`Failed to switch to chain 'eip155:${n}'. The chain is not approved or the wallet does not support 'wallet_switchEthereumChain' method.`);return null}isChainApproved(e){return this.namespace.chains.includes(`${this.name}:${e}`)}async getCapabilities(e){var i,r,s;const n=(r=(i=e.request)==null?void 0:i.params)==null?void 0:r[0];if(!n)throw new Error("Missing address parameter in `wallet_getCapabilities` request");const o=this.client.session.get(e.topic),a=((s=o==null?void 0:o.sessionProperties)==null?void 0:s.capabilities)||{};if(a!=null&&a[n])return a==null?void 0:a[n];const c=await this.client.request(e);try{await this.client.session.update(e.topic,{sessionProperties:Y1(Z1({},o.sessionProperties||{}),{capabilities:Y1(Z1({},a||{}),{[n]:c})})})}catch(l){console.warn("Failed to update session with capabilities",l)}return c}async getCallStatus(e){var i,r;const s=this.client.session.get(e.topic),n=(i=s.sessionProperties)==null?void 0:i.bundler_name;if(n){const a=this.getBundlerUrl(e.chainId,n);try{return await this.getUserOperationReceipt(a,e)}catch(c){console.warn("Failed to fetch call status from bundler",c,a)}}const o=(r=s.sessionProperties)==null?void 0:r.bundler_url;if(o)try{return await this.getUserOperationReceipt(o,e)}catch(a){console.warn("Failed to fetch call status from custom bundler",a,o)}if(this.namespace.methods.includes(e.request.method))return await this.client.request(e);throw new Error("Fetching call status not approved by the wallet.")}async getUserOperationReceipt(e,i){var r;const s=new URL(e),n=await fetch(s,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Ns("eth_getUserOperationReceipt",[(r=i.request.params)==null?void 0:r[0]]))});if(!n.ok)throw new Error(`Failed to fetch user operation receipt - ${n.status}`);return await n.json()}getBundlerUrl(e,i){return`${B7}?projectId=${this.client.core.projectId}&chainId=${e}&bundler=${i}`}};var NC=Object.defineProperty,SC=(t,e,i)=>e in t?NC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,nn=(t,e,i)=>SC(t,typeof e!="symbol"?e+"":e,i);let $C=class{constructor(e){nn(this,"name","solana"),nn(this,"client"),nn(this,"httpProviders"),nn(this,"events"),nn(this,"namespace"),nn(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(e,i),this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${e}`)}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;const s=Zs(i);e[s]=this.createHttpProvider(s,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}};var kC=Object.defineProperty,PC=(t,e,i)=>e in t?kC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,on=(t,e,i)=>PC(t,typeof e!="symbol"?e+"":e,i);let OC=class{constructor(e){on(this,"name","cosmos"),on(this,"client"),on(this,"httpProviders"),on(this,"events"),on(this,"namespace"),on(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(e,i),this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${this.chainId}`)}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;const s=Zs(i);e[s]=this.createHttpProvider(s,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}};var TC=Object.defineProperty,RC=(t,e,i)=>e in t?TC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,an=(t,e,i)=>RC(t,typeof e!="symbol"?e+"":e,i);let LC=class{constructor(e){an(this,"name","algorand"),an(this,"client"),an(this,"httpProviders"),an(this,"events"),an(this,"namespace"),an(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){if(!this.httpProviders[e]){const r=i||si(`${this.name}:${e}`,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);this.setHttpProvider(e,r)}this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${this.chainId}`)}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;e[i]=this.createHttpProvider(i,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace,this.client.core.projectId);return typeof r>"u"?void 0:new vi(new Li(r,Se("disableProviderPing")))}};var MC=Object.defineProperty,BC=(t,e,i)=>e in t?MC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,cn=(t,e,i)=>BC(t,typeof e!="symbol"?e+"":e,i);class UC{constructor(e){cn(this,"name","cip34"),cn(this,"client"),cn(this,"httpProviders"),cn(this,"events"),cn(this,"namespace"),cn(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(e,i),this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${this.chainId}`)}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{const r=this.getCardanoRPCUrl(i),s=Zs(i);e[s]=this.createHttpProvider(s,r)}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}getCardanoRPCUrl(e){const i=this.namespace.rpcMap;if(i)return i[e]}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||this.getCardanoRPCUrl(e);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}}var DC=Object.defineProperty,jC=(t,e,i)=>e in t?DC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,ln=(t,e,i)=>jC(t,typeof e!="symbol"?e+"":e,i);class zC{constructor(e){ln(this,"name","elrond"),ln(this,"client"),ln(this,"httpProviders"),ln(this,"events"),ln(this,"namespace"),ln(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(e,i),this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${e}`)}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;const s=Zs(i);e[s]=this.createHttpProvider(s,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}}var FC=Object.defineProperty,HC=(t,e,i)=>e in t?FC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,un=(t,e,i)=>HC(t,typeof e!="symbol"?e+"":e,i);let qC=class{constructor(e){un(this,"name","multiversx"),un(this,"client"),un(this,"httpProviders"),un(this,"events"),un(this,"namespace"),un(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(e,i),this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${e}`)}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;const s=Zs(i);e[s]=this.createHttpProvider(s,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}};var WC=Object.defineProperty,VC=(t,e,i)=>e in t?WC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,dn=(t,e,i)=>VC(t,typeof e!="symbol"?e+"":e,i);let KC=class{constructor(e){dn(this,"name","near"),dn(this,"client"),dn(this,"httpProviders"),dn(this,"events"),dn(this,"namespace"),dn(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){if(this.chainId=e,!this.httpProviders[e]){const r=i||si(`${this.name}:${e}`,this.namespace);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);this.setHttpProvider(e,r)}this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${this.chainId}`)}getAccounts(){const e=this.namespace.accounts;return e?e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2])||[]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{var r;e[i]=this.createHttpProvider(i,(r=this.namespace.rpcMap)==null?void 0:r[i])}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace);return typeof r>"u"?void 0:new vi(new Li(r,Se("disableProviderPing")))}};var GC=Object.defineProperty,ZC=(t,e,i)=>e in t?GC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,hn=(t,e,i)=>ZC(t,typeof e!="symbol"?e+"":e,i);let YC=class{constructor(e){hn(this,"name","tezos"),hn(this,"client"),hn(this,"httpProviders"),hn(this,"events"),hn(this,"namespace"),hn(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace=Object.assign(this.namespace,e)}requestAccounts(){return this.getAccounts()}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider().request(e.request)}setDefaultChain(e,i){if(this.chainId=e,!this.httpProviders[e]){const r=i||si(`${this.name}:${e}`,this.namespace);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);this.setHttpProvider(e,r)}this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${this.chainId}`)}getAccounts(){const e=this.namespace.accounts;return e?e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2])||[]:[]}createHttpProviders(){const e={};return this.namespace.chains.forEach(i=>{e[i]=this.createHttpProvider(i)}),e}getHttpProvider(){const e=`${this.name}:${this.chainId}`,i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace);return typeof r>"u"?void 0:new vi(new Li(r))}};var JC=Object.defineProperty,XC=(t,e,i)=>e in t?JC(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,pn=(t,e,i)=>XC(t,typeof e!="symbol"?e+"":e,i);let QC=class{constructor(e){pn(this,"name",In),pn(this,"client"),pn(this,"httpProviders"),pn(this,"events"),pn(this,"namespace"),pn(this,"chainId"),this.namespace=e.namespace,this.events=Se("events"),this.client=Se("client"),this.chainId=this.getDefaultChain(),this.httpProviders=this.createHttpProviders()}updateNamespace(e){this.namespace.chains=[...new Set((this.namespace.chains||[]).concat(e.chains||[]))],this.namespace.accounts=[...new Set((this.namespace.accounts||[]).concat(e.accounts||[]))],this.namespace.methods=[...new Set((this.namespace.methods||[]).concat(e.methods||[]))],this.namespace.events=[...new Set((this.namespace.events||[]).concat(e.events||[]))],this.httpProviders=this.createHttpProviders()}requestAccounts(){return this.getAccounts()}request(e){return this.namespace.methods.includes(e.request.method)?this.client.request(e):this.getHttpProvider(e.chainId).request(e.request)}setDefaultChain(e,i){this.httpProviders[e]||this.setHttpProvider(e,i),this.chainId=e,this.events.emit(Ci.DEFAULT_CHAIN_CHANGED,`${this.name}:${e}`)}getDefaultChain(){if(this.chainId)return this.chainId;if(this.namespace.defaultChain)return this.namespace.defaultChain;const e=this.namespace.chains[0];if(!e)throw new Error("ChainId not found");return e.split(":")[1]}getAccounts(){const e=this.namespace.accounts;return e?[...new Set(e.filter(i=>i.split(":")[1]===this.chainId.toString()).map(i=>i.split(":")[2]))]:[]}createHttpProviders(){var e,i;const r={};return(i=(e=this.namespace)==null?void 0:e.accounts)==null||i.forEach(s=>{const n=Mn(s);r[`${n.namespace}:${n.reference}`]=this.createHttpProvider(s)}),r}getHttpProvider(e){const i=this.httpProviders[e];if(typeof i>"u")throw new Error(`JSON-RPC provider for ${e} not found`);return i}setHttpProvider(e,i){const r=this.createHttpProvider(e,i);r&&(this.httpProviders[e]=r)}createHttpProvider(e,i){const r=i||si(e,this.namespace,this.client.core.projectId);if(!r)throw new Error(`No RPC url provided for chainId: ${e}`);return new vi(new Li(r,Se("disableProviderPing")))}};var eE=Object.defineProperty,tE=Object.defineProperties,iE=Object.getOwnPropertyDescriptors,J1=Object.getOwnPropertySymbols,rE=Object.prototype.hasOwnProperty,sE=Object.prototype.propertyIsEnumerable,Jh=(t,e,i)=>e in t?eE(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,xc=(t,e)=>{for(var i in e||(e={}))rE.call(e,i)&&Jh(t,i,e[i]);if(J1)for(var i of J1(e))sE.call(e,i)&&Jh(t,i,e[i]);return t},td=(t,e)=>tE(t,iE(e)),ci=(t,e,i)=>Jh(t,typeof e!="symbol"?e+"":e,i);class fu{constructor(e){ci(this,"client"),ci(this,"namespaces"),ci(this,"optionalNamespaces"),ci(this,"sessionProperties"),ci(this,"scopedProperties"),ci(this,"events",new Ip),ci(this,"rpcProviders",{}),ci(this,"session"),ci(this,"providerOpts"),ci(this,"logger"),ci(this,"uri"),ci(this,"disableProviderPing",!1),this.providerOpts=e,this.logger=typeof(e==null?void 0:e.logger)<"u"&&typeof(e==null?void 0:e.logger)!="string"?e.logger:Cp(nu({level:(e==null?void 0:e.logger)||D1})),this.disableProviderPing=(e==null?void 0:e.disableProviderPing)||!1}static async init(e){const i=new fu(e);return await i.initialize(),i}async request(e,i,r){const[s,n]=this.validateChain(i);if(!this.session)throw new Error("Please call connect() before request()");return await this.getProvider(s).request({request:xc({},e),chainId:`${s}:${n}`,topic:this.session.topic,expiry:r})}sendAsync(e,i,r,s){const n=new Date().getTime();this.request(e,r,s).then(o=>i(null,ou(n,o))).catch(o=>i(o,void 0))}async enable(){if(!this.client)throw new Error("Sign Client not initialized");return this.session||await this.connect({namespaces:this.namespaces,optionalNamespaces:this.optionalNamespaces,sessionProperties:this.sessionProperties,scopedProperties:this.scopedProperties}),await this.requestAccounts()}async disconnect(){var e;if(!this.session)throw new Error("Please call connect() before enable()");await this.client.disconnect({topic:(e=this.session)==null?void 0:e.topic,reason:Le("USER_DISCONNECTED")}),await this.cleanup()}async connect(e){if(!this.client)throw new Error("Sign Client not initialized");if(this.setNamespaces(e),await this.cleanupPendingPairings(),!e.skipPairing)return await this.pair(e.pairingTopic)}async authenticate(e,i){if(!this.client)throw new Error("Sign Client not initialized");this.setNamespaces(e),await this.cleanupPendingPairings();const{uri:r,response:s}=await this.client.authenticate(e,i);r&&(this.uri=r,this.events.emit("display_uri",r));const n=await s();if(this.session=n.session,this.session){const o=K1(this.session.namespaces);this.namespaces=Xu(this.namespaces,o),await this.persist("namespaces",this.namespaces),this.onConnect()}return n}on(e,i){this.events.on(e,i)}once(e,i){this.events.once(e,i)}removeListener(e,i){this.events.removeListener(e,i)}off(e,i){this.events.off(e,i)}get isWalletConnect(){return!0}async pair(e){const{uri:i,approval:r}=await this.client.connect({pairingTopic:e,requiredNamespaces:this.namespaces,optionalNamespaces:this.optionalNamespaces,sessionProperties:this.sessionProperties,scopedProperties:this.scopedProperties});i&&(this.uri=i,this.events.emit("display_uri",i));const s=await r();this.session=s;const n=K1(s.namespaces);return this.namespaces=Xu(this.namespaces,n),await this.persist("namespaces",this.namespaces),await this.persist("optionalNamespaces",this.optionalNamespaces),this.onConnect(),this.session}setDefaultChain(e,i){try{if(!this.session)return;const[r,s]=this.validateChain(e),n=this.getProvider(r);n.name===In?n.setDefaultChain(`${r}:${s}`,i):n.setDefaultChain(s,i)}catch(r){if(!/Please call connect/.test(r.message))throw r}}async cleanupPendingPairings(e={}){this.logger.info("Cleaning up inactive pairings...");const i=this.client.pairing.getAll();if(Ti(i)){for(const r of i)e.deletePairings?this.client.core.expirer.set(r.topic,0):await this.client.core.relayer.subscriber.unsubscribe(r.topic);this.logger.info(`Inactive pairings cleared: ${i.length}`)}}abortPairingAttempt(){this.logger.warn("abortPairingAttempt is deprecated. This is now a no-op.")}async checkStorage(){this.namespaces=await this.getFromStore("namespaces")||{},this.optionalNamespaces=await this.getFromStore("optionalNamespaces")||{},this.session&&this.createProviders()}async initialize(){this.logger.trace("Initialized"),await this.createClient(),await this.checkStorage(),this.registerEventListeners()}async createClient(){var e,i;if(this.client=this.providerOpts.client||await T7.init({core:this.providerOpts.core,logger:this.providerOpts.logger||D1,relayUrl:this.providerOpts.relayUrl||R7,projectId:this.providerOpts.projectId,metadata:this.providerOpts.metadata,storageOptions:this.providerOpts.storageOptions,storage:this.providerOpts.storage,name:this.providerOpts.name,customStoragePrefix:this.providerOpts.customStoragePrefix,telemetryEnabled:this.providerOpts.telemetryEnabled}),this.providerOpts.session)try{this.session=this.client.session.get(this.providerOpts.session.topic)}catch(r){throw this.logger.error("Failed to get session",r),new Error(`The provided session: ${(i=(e=this.providerOpts)==null?void 0:e.session)==null?void 0:i.topic} doesn't exist in the Sign client`)}else{const r=this.client.session.getAll();this.session=r[0]}this.logger.trace("SignClient Initialized")}createProviders(){if(!this.client)throw new Error("Sign Client not initialized");if(!this.session)throw new Error("Session not initialized. Please call connect() before enable()");const e=[...new Set(Object.keys(this.session.namespaces).map(i=>Yo(i)))];ed("client",this.client),ed("events",this.events),ed("disableProviderPing",this.disableProviderPing),e.forEach(i=>{if(!this.session)return;const r=mC(i,this.session),s=cm(r),n=Xu(this.namespaces,this.optionalNamespaces),o=td(xc({},n[i]),{accounts:r,chains:s});switch(i){case"eip155":this.rpcProviders[i]=new _C({namespace:o});break;case"algorand":this.rpcProviders[i]=new LC({namespace:o});break;case"solana":this.rpcProviders[i]=new $C({namespace:o});break;case"cosmos":this.rpcProviders[i]=new OC({namespace:o});break;case"polkadot":this.rpcProviders[i]=new vC({namespace:o});break;case"cip34":this.rpcProviders[i]=new UC({namespace:o});break;case"elrond":this.rpcProviders[i]=new zC({namespace:o});break;case"multiversx":this.rpcProviders[i]=new qC({namespace:o});break;case"near":this.rpcProviders[i]=new KC({namespace:o});break;case"tezos":this.rpcProviders[i]=new YC({namespace:o});break;default:this.rpcProviders[In]?this.rpcProviders[In].updateNamespace(o):this.rpcProviders[In]=new QC({namespace:o})}})}registerEventListeners(){if(typeof this.client>"u")throw new Error("Sign Client is not initialized");this.client.on("session_ping",e=>{var i;const{topic:r}=e;r===((i=this.session)==null?void 0:i.topic)&&this.events.emit("session_ping",e)}),this.client.on("session_event",e=>{var i;const{params:r,topic:s}=e;if(s!==((i=this.session)==null?void 0:i.topic))return;const{event:n}=r;if(n.name==="accountsChanged"){const o=n.data;o&&Ti(o)&&this.events.emit("accountsChanged",o.map(V1))}else if(n.name==="chainChanged"){const o=r.chainId,a=r.event.data,c=Yo(o),l=Qu(o)!==Qu(a)?`${c}:${Qu(a)}`:o;this.onChainChanged(l)}else this.events.emit(n.name,n.data);this.events.emit("session_event",e)}),this.client.on("session_update",({topic:e,params:i})=>{var r,s;if(e!==((r=this.session)==null?void 0:r.topic))return;const{namespaces:n}=i,o=(s=this.client)==null?void 0:s.session.get(e);this.session=td(xc({},o),{namespaces:n}),this.onSessionUpdate(),this.events.emit("session_update",{topic:e,params:i})}),this.client.on("session_delete",async e=>{var i;e.topic===((i=this.session)==null?void 0:i.topic)&&(await this.cleanup(),this.events.emit("session_delete",e),this.events.emit("disconnect",td(xc({},Le("USER_DISCONNECTED")),{data:e.topic})))}),this.on(Ci.DEFAULT_CHAIN_CHANGED,e=>{this.onChainChanged(e,!0)})}getProvider(e){return this.rpcProviders[e]||this.rpcProviders[In]}onSessionUpdate(){Object.keys(this.rpcProviders).forEach(e=>{var i;this.getProvider(e).updateNamespace((i=this.session)==null?void 0:i.namespaces[e])})}setNamespaces(e){const{namespaces:i,optionalNamespaces:r,sessionProperties:s,scopedProperties:n}=e;i&&Object.keys(i).length&&(this.namespaces=i),r&&Object.keys(r).length&&(this.optionalNamespaces=r),this.sessionProperties=s,this.scopedProperties=n}validateChain(e){const[i,r]=(e==null?void 0:e.split(":"))||["",""];if(!this.namespaces||!Object.keys(this.namespaces).length)return[i,r];if(i&&!Object.keys(this.namespaces||{}).map(o=>Yo(o)).includes(i))throw new Error(`Namespace '${i}' is not configured. Please call connect() first with namespace config.`);if(i&&r)return[i,r];const s=Yo(Object.keys(this.namespaces)[0]),n=this.rpcProviders[s].getDefaultChain();return[s,n]}async requestAccounts(){const[e]=this.validateChain();return await this.getProvider(e).requestAccounts()}async onChainChanged(e,i=!1){if(!this.namespaces)return;const[r,s]=this.validateChain(e);if(!s)return;this.updateNamespaceChain(r,s),this.events.emit("chainChanged",s);const n=this.getProvider(r).getDefaultChain();i||this.getProvider(r).setDefaultChain(s),this.emitAccountsChangedOnChainChange({namespace:r,previousChainId:n,newChainId:e}),await this.persist("namespaces",this.namespaces)}emitAccountsChangedOnChainChange({namespace:e,previousChainId:i,newChainId:r}){var s,n;try{if(i===r)return;const o=(n=(s=this.session)==null?void 0:s.namespaces[e])==null?void 0:n.accounts;if(!o)return;const a=o.filter(c=>c.includes(`${r}:`)).map(V1);if(!Ti(a))return;this.events.emit("accountsChanged",a)}catch(o){this.logger.warn("Failed to emit accountsChanged on chain change",o)}}updateNamespaceChain(e,i){if(!this.namespaces)return;const r=this.namespaces[e]?e:`${e}:${i}`,s={chains:[],methods:[],events:[],defaultChain:i};this.namespaces[r]?this.namespaces[r]&&(this.namespaces[r].defaultChain=i):this.namespaces[r]=s}onConnect(){this.createProviders(),this.events.emit("connect",{session:this.session})}async cleanup(){this.namespaces=void 0,this.optionalNamespaces=void 0,this.sessionProperties=void 0,await this.deleteFromStore("namespaces"),await this.deleteFromStore("optionalNamespaces"),await this.deleteFromStore("sessionProperties"),this.session=void 0,await this.cleanupPendingPairings({deletePairings:!0}),await this.cleanupStorage()}async persist(e,i){var r;const s=((r=this.session)==null?void 0:r.topic)||"";await this.client.core.storage.setItem(`${Cc}/${e}${s}`,i)}async getFromStore(e){var i;const r=((i=this.session)==null?void 0:i.topic)||"";return await this.client.core.storage.getItem(`${Cc}/${e}${r}`)}async deleteFromStore(e){var i;const r=((i=this.session)==null?void 0:i.topic)||"";await this.client.core.storage.removeItem(`${Cc}/${e}${r}`)}async cleanupStorage(){var e;try{if(((e=this.client)==null?void 0:e.session.length)>0)return;const i=await this.client.core.storage.getKeys();for(const r of i)r.startsWith(Cc)&&await this.client.core.storage.removeItem(r)}catch(i){this.logger.warn("Failed to cleanup storage",i)}}}const nE=fu,oE="wc",aE="ethereum_provider",cE=`${oE}@2:${aE}:`,lE="https://rpc.walletconnect.org/v1/",Hl=["eth_sendTransaction","personal_sign"],um=["eth_accounts","eth_requestAccounts","eth_sendRawTransaction","eth_sign","eth_signTransaction","eth_signTypedData","eth_signTypedData_v3","eth_signTypedData_v4","eth_sendTransaction","personal_sign","wallet_switchEthereumChain","wallet_addEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode","wallet_sendCalls","wallet_getCapabilities","wallet_getCallsStatus","wallet_showCallsStatus"],ql=["chainChanged","accountsChanged"],dm=["chainChanged","accountsChanged","message","disconnect","connect"];var uE=Object.defineProperty,dE=Object.defineProperties,hE=Object.getOwnPropertyDescriptors,X1=Object.getOwnPropertySymbols,pE=Object.prototype.hasOwnProperty,gE=Object.prototype.propertyIsEnumerable,Xh=(t,e,i)=>e in t?uE(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,vs=(t,e)=>{for(var i in e||(e={}))pE.call(e,i)&&Xh(t,i,e[i]);if(X1)for(var i of X1(e))gE.call(e,i)&&Xh(t,i,e[i]);return t},Co=(t,e)=>dE(t,hE(e)),Gt=(t,e,i)=>Xh(t,typeof e!="symbol"?e+"":e,i);function Wl(t){return Number(t[0].split(":")[1])}function Ic(t){return`0x${t.toString(16)}`}function fE(t){const{chains:e,optionalChains:i,methods:r,optionalMethods:s,events:n,optionalEvents:o,rpcMap:a}=t;if(!Ti(e))throw new Error("Invalid chains");const c={chains:e,methods:r||Hl,events:n||ql,rpcMap:vs({},e.length?{[Wl(e)]:a[Wl(e)]}:{})},l=n==null?void 0:n.filter(p=>!ql.includes(p)),u=r==null?void 0:r.filter(p=>!Hl.includes(p));if(!i&&!o&&!s&&!(l!=null&&l.length)&&!(u!=null&&u.length))return{required:e.length?c:void 0};const d=(l==null?void 0:l.length)&&(u==null?void 0:u.length)||!i,h={chains:[...new Set(d?c.chains.concat(i||[]):i)],methods:[...new Set(c.methods.concat(s!=null&&s.length?s:um))],events:[...new Set(c.events.concat(o!=null&&o.length?o:dm))],rpcMap:a};return{required:e.length?c:void 0,optional:i.length?h:void 0}}class wu{constructor(){Gt(this,"events",new Jr.EventEmitter),Gt(this,"namespace","eip155"),Gt(this,"accounts",[]),Gt(this,"signer"),Gt(this,"chainId",1),Gt(this,"modal"),Gt(this,"rpc"),Gt(this,"STORAGE_KEY",cE),Gt(this,"on",(e,i)=>(this.events.on(e,i),this)),Gt(this,"once",(e,i)=>(this.events.once(e,i),this)),Gt(this,"removeListener",(e,i)=>(this.events.removeListener(e,i),this)),Gt(this,"off",(e,i)=>(this.events.off(e,i),this)),Gt(this,"parseAccount",e=>this.isCompatibleChainId(e)?this.parseAccountId(e).address:e),this.signer={},this.rpc={}}static async init(e){const i=new wu;return await i.initialize(e),i}async request(e,i){return await this.signer.request(e,this.formatChainId(this.chainId),i)}sendAsync(e,i,r){this.signer.sendAsync(e,i,this.formatChainId(this.chainId),r)}get connected(){return this.signer.client?this.signer.client.core.relayer.connected:!1}get connecting(){return this.signer.client?this.signer.client.core.relayer.connecting:!1}async enable(){return this.session||await this.connect(),await this.request({method:"eth_requestAccounts"})}async connect(e){var i;if(!this.signer.client)throw new Error("Provider not initialized. Call init() first");this.loadConnectOpts(e);const{required:r,optional:s}=fE(this.rpc);try{const n=await new Promise(async(a,c)=>{var l,u;this.rpc.showQrModal&&((l=this.modal)==null||l.open(),(u=this.modal)==null||u.subscribeState(h=>{!h.open&&!this.signer.session&&(this.signer.abortPairingAttempt(),c(new Error("Connection request reset. Please try again.")))}));const d=e!=null&&e.scopedProperties?{[this.namespace]:e.scopedProperties}:void 0;await this.signer.connect(Co(vs({namespaces:vs({},r&&{[this.namespace]:r})},s&&{optionalNamespaces:{[this.namespace]:s}}),{pairingTopic:e==null?void 0:e.pairingTopic,scopedProperties:d})).then(h=>{a(h)}).catch(h=>{var p;(p=this.modal)==null||p.showErrorMessage("Unable to connect"),c(new Error(h.message))})});if(!n)return;const o=w0(n.namespaces,[this.namespace]);this.setChainIds(this.rpc.chains.length?this.rpc.chains:o),this.setAccounts(o),this.events.emit("connect",{chainId:Ic(this.chainId)})}catch(n){throw this.signer.logger.error(n),n}finally{(i=this.modal)==null||i.close()}}async authenticate(e,i){var r;if(!this.signer.client)throw new Error("Provider not initialized. Call init() first");this.loadConnectOpts({chains:e==null?void 0:e.chains});try{const s=await new Promise(async(o,a)=>{var c,l;this.rpc.showQrModal&&((c=this.modal)==null||c.open(),(l=this.modal)==null||l.subscribeState(u=>{!u.open&&!this.signer.session&&(this.signer.abortPairingAttempt(),a(new Error("Connection request reset. Please try again.")))})),await this.signer.authenticate(Co(vs({},e),{chains:this.rpc.chains}),i).then(u=>{o(u)}).catch(u=>{var d;(d=this.modal)==null||d.showErrorMessage("Unable to connect"),a(new Error(u.message))})}),n=s.session;if(n){const o=w0(n.namespaces,[this.namespace]);this.setChainIds(this.rpc.chains.length?this.rpc.chains:o),this.setAccounts(o),this.events.emit("connect",{chainId:Ic(this.chainId)})}return s}catch(s){throw this.signer.logger.error(s),s}finally{(r=this.modal)==null||r.close()}}async disconnect(){this.session&&await this.signer.disconnect(),this.reset()}get isWalletConnect(){return!0}get session(){return this.signer.session}registerEventListeners(){this.signer.on("session_event",e=>{const{params:i}=e,{event:r}=i;r.name==="accountsChanged"?(this.accounts=this.parseAccounts(r.data),this.events.emit("accountsChanged",this.accounts)):r.name==="chainChanged"?this.setChainId(this.formatChainId(r.data)):this.events.emit(r.name,r.data),this.events.emit("session_event",e)}),this.signer.on("accountsChanged",e=>{this.accounts=this.parseAccounts(e),this.events.emit("accountsChanged",this.accounts)}),this.signer.on("chainChanged",e=>{const i=parseInt(e);this.chainId=i,this.events.emit("chainChanged",Ic(this.chainId)),this.persist()}),this.signer.on("session_update",e=>{this.events.emit("session_update",e)}),this.signer.on("session_delete",e=>{this.reset(),this.events.emit("session_delete",e),this.events.emit("disconnect",Co(vs({},Le("USER_DISCONNECTED")),{data:e.topic,name:"USER_DISCONNECTED"}))}),this.signer.on("display_uri",e=>{this.events.emit("display_uri",e)})}switchEthereumChain(e){this.request({method:"wallet_switchEthereumChain",params:[{chainId:e.toString(16)}]})}isCompatibleChainId(e){return typeof e=="string"?e.startsWith(`${this.namespace}:`):!1}formatChainId(e){return`${this.namespace}:${e}`}parseChainId(e){return Number(e.split(":")[1])}setChainIds(e){const i=e.filter(r=>this.isCompatibleChainId(r)).map(r=>this.parseChainId(r));i.length&&(this.chainId=i[0],this.events.emit("chainChanged",Ic(this.chainId)),this.persist())}setChainId(e){if(this.isCompatibleChainId(e)){const i=this.parseChainId(e);this.chainId=i,this.switchEthereumChain(i)}}parseAccountId(e){const[i,r,s]=e.split(":");return{chainId:`${i}:${r}`,address:s}}setAccounts(e){this.accounts=e.filter(i=>this.parseChainId(this.parseAccountId(i).chainId)===this.chainId).map(i=>this.parseAccountId(i).address),this.events.emit("accountsChanged",this.accounts)}getRpcConfig(e){var i,r;const s=(i=e==null?void 0:e.chains)!=null?i:[],n=(r=e==null?void 0:e.optionalChains)!=null?r:[],o=s.concat(n);if(!o.length)throw new Error("No chains specified in either `chains` or `optionalChains`");const a=s.length?(e==null?void 0:e.methods)||Hl:[],c=s.length?(e==null?void 0:e.events)||ql:[],l=(e==null?void 0:e.optionalMethods)||[],u=(e==null?void 0:e.optionalEvents)||[],d=(e==null?void 0:e.rpcMap)||this.buildRpcMap(o,e.projectId),h=(e==null?void 0:e.qrModalOptions)||void 0;return{chains:s==null?void 0:s.map(p=>this.formatChainId(p)),optionalChains:n.map(p=>this.formatChainId(p)),methods:a,events:c,optionalMethods:l,optionalEvents:u,rpcMap:d,showQrModal:!!(e!=null&&e.showQrModal),qrModalOptions:h,projectId:e.projectId,metadata:e.metadata}}buildRpcMap(e,i){const r={};return e.forEach(s=>{r[s]=this.getRpcUrl(s,i)}),r}async initialize(e){if(this.rpc=this.getRpcConfig(e),this.chainId=this.rpc.chains.length?Wl(this.rpc.chains):Wl(this.rpc.optionalChains),this.signer=await nE.init({projectId:this.rpc.projectId,metadata:this.rpc.metadata,disableProviderPing:e.disableProviderPing,relayUrl:e.relayUrl,storage:e.storage,storageOptions:e.storageOptions,customStoragePrefix:e.customStoragePrefix,telemetryEnabled:e.telemetryEnabled,logger:e.logger}),this.registerEventListeners(),await this.loadPersistedSession(),this.rpc.showQrModal){let i;try{const{createAppKit:r}=await Promise.resolve().then(function(){return LN}),{convertWCMToAppKitOptions:s}=await Promise.resolve().then(function(){return VN}),n=s(Co(vs({},this.rpc.qrModalOptions),{chains:[...new Set([...this.rpc.chains,...this.rpc.optionalChains])],metadata:this.rpc.metadata,projectId:this.rpc.projectId}));if(!n.networks.length)throw new Error("No networks found for WalletConnect·");i=r(Co(vs({},n),{universalProvider:this.signer,manualWCControl:!0}))}catch{throw new Error("To use QR modal, please install @reown/appkit package")}if(i)try{this.modal=i}catch(r){throw this.signer.logger.error(r),new Error("Could not generate WalletConnectModal Instance")}}}loadConnectOpts(e){if(!e)return;const{chains:i,optionalChains:r,rpcMap:s}=e;i&&Ti(i)&&(this.rpc.chains=i.map(n=>this.formatChainId(n)),i.forEach(n=>{this.rpc.rpcMap[n]=(s==null?void 0:s[n])||this.getRpcUrl(n)})),r&&Ti(r)&&(this.rpc.optionalChains=[],this.rpc.optionalChains=r==null?void 0:r.map(n=>this.formatChainId(n)),r.forEach(n=>{this.rpc.rpcMap[n]=(s==null?void 0:s[n])||this.getRpcUrl(n)}))}getRpcUrl(e,i){var r;return((r=this.rpc.rpcMap)==null?void 0:r[e])||`${lE}?chainId=eip155:${e}&projectId=${i||this.rpc.projectId}`}async loadPersistedSession(){if(this.session)try{const e=await this.signer.client.core.storage.getItem(`${this.STORAGE_KEY}/chainId`),i=this.session.namespaces[`${this.namespace}:${e}`]?this.session.namespaces[`${this.namespace}:${e}`]:this.session.namespaces[this.namespace];this.setChainIds(e?[this.formatChainId(e)]:i==null?void 0:i.accounts),this.setAccounts(i==null?void 0:i.accounts)}catch(e){this.signer.logger.error("Failed to load persisted session, clearing state..."),this.signer.logger.error(e),await this.disconnect().catch(i=>this.signer.logger.warn(i))}}reset(){this.chainId=1,this.accounts=[]}persist(){this.session&&this.signer.client.core.storage.setItem(`${this.STORAGE_KEY}/chainId`,this.chainId)}parseAccounts(e){return typeof e=="string"||e instanceof String?[this.parseAccount(e)]:e.map(i=>this.parseAccount(i))}}const wE=wu;var mu=typeof globalThis<"u"?globalThis:typeof window<"u"?window:typeof pe<"u"?pe:typeof self<"u"?self:{},hm={exports:{}};(function(t,e){(function(i,r){t.exports=r()})(mu,function(){var i=1e3,r=6e4,s=36e5,n="millisecond",o="second",a="minute",c="hour",l="day",u="week",d="month",h="quarter",p="year",g="date",f="Invalid Date",w=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,m=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,y={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(I){var E=["th","st","nd","rd"],x=I%100;return"["+I+(E[(x-20)%10]||E[x]||E[0])+"]"}},b=function(I,E,x){var T=String(I);return!T||T.length>=E?I:""+Array(E+1-T.length).join(x)+I},v={s:b,z:function(I){var E=-I.utcOffset(),x=Math.abs(E),T=Math.floor(x/60),O=x%60;return(E<=0?"+":"-")+b(T,2,"0")+":"+b(O,2,"0")},m:function I(E,x){if(E.date()<x.date())return-I(x,E);var T=12*(x.year()-E.year())+(x.month()-E.month()),O=E.clone().add(T,d),R=x-O<0,B=E.clone().add(T+(R?-1:1),d);return+(-(T+(x-O)/(R?O-B:B-O))||0)},a:function(I){return I<0?Math.ceil(I)||0:Math.floor(I)},p:function(I){return{M:d,y:p,w:u,d:l,D:g,h:c,m:a,s:o,ms:n,Q:h}[I]||String(I||"").toLowerCase().replace(/s$/,"")},u:function(I){return I===void 0}},S="en",N={};N[S]=y;var P="$isDayjsObject",k=function(I){return I instanceof U||!(!I||!I[P])},_=function I(E,x,T){var O;if(!E)return S;if(typeof E=="string"){var R=E.toLowerCase();N[R]&&(O=R),x&&(N[R]=x,O=R);var B=E.split("-");if(!O&&B.length>1)return I(B[0])}else{var F=E.name;N[F]=E,O=F}return!T&&O&&(S=O),O||!T&&S},M=function(I,E){if(k(I))return I.clone();var x=typeof E=="object"?E:{};return x.date=I,x.args=arguments,new U(x)},L=v;L.l=_,L.i=k,L.w=function(I,E){return M(I,{locale:E.$L,utc:E.$u,x:E.$x,$offset:E.$offset})};var U=function(){function I(x){this.$L=_(x.locale,null,!0),this.parse(x),this.$x=this.$x||x.x||{},this[P]=!0}var E=I.prototype;return E.parse=function(x){this.$d=function(T){var O=T.date,R=T.utc;if(O===null)return new Date(NaN);if(L.u(O))return new Date;if(O instanceof Date)return new Date(O);if(typeof O=="string"&&!/Z$/i.test(O)){var B=O.match(w);if(B){var F=B[2]-1||0,G=(B[7]||"0").substring(0,3);return R?new Date(Date.UTC(B[1],F,B[3]||1,B[4]||0,B[5]||0,B[6]||0,G)):new Date(B[1],F,B[3]||1,B[4]||0,B[5]||0,B[6]||0,G)}}return new Date(O)}(x),this.init()},E.init=function(){var x=this.$d;this.$y=x.getFullYear(),this.$M=x.getMonth(),this.$D=x.getDate(),this.$W=x.getDay(),this.$H=x.getHours(),this.$m=x.getMinutes(),this.$s=x.getSeconds(),this.$ms=x.getMilliseconds()},E.$utils=function(){return L},E.isValid=function(){return this.$d.toString()!==f},E.isSame=function(x,T){var O=M(x);return this.startOf(T)<=O&&O<=this.endOf(T)},E.isAfter=function(x,T){return M(x)<this.startOf(T)},E.isBefore=function(x,T){return this.endOf(T)<M(x)},E.$g=function(x,T,O){return L.u(x)?this[T]:this.set(O,x)},E.unix=function(){return Math.floor(this.valueOf()/1e3)},E.valueOf=function(){return this.$d.getTime()},E.startOf=function(x,T){var O=this,R=!!L.u(T)||T,B=L.p(x),F=function(Ee,ze){var Ve=L.w(O.$u?Date.UTC(O.$y,ze,Ee):new Date(O.$y,ze,Ee),O);return R?Ve:Ve.endOf(l)},G=function(Ee,ze){return L.w(O.toDate()[Ee].apply(O.toDate("s"),(R?[0,0,0,0]:[23,59,59,999]).slice(ze)),O)},oe=this.$W,se=this.$M,fe=this.$D,Ce="set"+(this.$u?"UTC":"");switch(B){case p:return R?F(1,0):F(31,11);case d:return R?F(1,se):F(0,se+1);case u:var Me=this.$locale().weekStart||0,Ae=(oe<Me?oe+7:oe)-Me;return F(R?fe-Ae:fe+(6-Ae),se);case l:case g:return G(Ce+"Hours",0);case c:return G(Ce+"Minutes",1);case a:return G(Ce+"Seconds",2);case o:return G(Ce+"Milliseconds",3);default:return this.clone()}},E.endOf=function(x){return this.startOf(x,!1)},E.$set=function(x,T){var O,R=L.p(x),B="set"+(this.$u?"UTC":""),F=(O={},O[l]=B+"Date",O[g]=B+"Date",O[d]=B+"Month",O[p]=B+"FullYear",O[c]=B+"Hours",O[a]=B+"Minutes",O[o]=B+"Seconds",O[n]=B+"Milliseconds",O)[R],G=R===l?this.$D+(T-this.$W):T;if(R===d||R===p){var oe=this.clone().set(g,1);oe.$d[F](G),oe.init(),this.$d=oe.set(g,Math.min(this.$D,oe.daysInMonth())).$d}else F&&this.$d[F](G);return this.init(),this},E.set=function(x,T){return this.clone().$set(x,T)},E.get=function(x){return this[L.p(x)]()},E.add=function(x,T){var O,R=this;x=Number(x);var B=L.p(T),F=function(se){var fe=M(R);return L.w(fe.date(fe.date()+Math.round(se*x)),R)};if(B===d)return this.set(d,this.$M+x);if(B===p)return this.set(p,this.$y+x);if(B===l)return F(1);if(B===u)return F(7);var G=(O={},O[a]=r,O[c]=s,O[o]=i,O)[B]||1,oe=this.$d.getTime()+x*G;return L.w(oe,this)},E.subtract=function(x,T){return this.add(-1*x,T)},E.format=function(x){var T=this,O=this.$locale();if(!this.isValid())return O.invalidDate||f;var R=x||"YYYY-MM-DDTHH:mm:ssZ",B=L.z(this),F=this.$H,G=this.$m,oe=this.$M,se=O.weekdays,fe=O.months,Ce=O.meridiem,Me=function(ze,Ve,Ke,Ze){return ze&&(ze[Ve]||ze(T,R))||Ke[Ve].slice(0,Ze)},Ae=function(ze){return L.s(F%12||12,ze,"0")},Ee=Ce||function(ze,Ve,Ke){var Ze=ze<12?"AM":"PM";return Ke?Ze.toLowerCase():Ze};return R.replace(m,function(ze,Ve){return Ve||function(Ke){switch(Ke){case"YY":return String(T.$y).slice(-2);case"YYYY":return L.s(T.$y,4,"0");case"M":return oe+1;case"MM":return L.s(oe+1,2,"0");case"MMM":return Me(O.monthsShort,oe,fe,3);case"MMMM":return Me(fe,oe);case"D":return T.$D;case"DD":return L.s(T.$D,2,"0");case"d":return String(T.$W);case"dd":return Me(O.weekdaysMin,T.$W,se,2);case"ddd":return Me(O.weekdaysShort,T.$W,se,3);case"dddd":return se[T.$W];case"H":return String(F);case"HH":return L.s(F,2,"0");case"h":return Ae(1);case"hh":return Ae(2);case"a":return Ee(F,G,!0);case"A":return Ee(F,G,!1);case"m":return String(G);case"mm":return L.s(G,2,"0");case"s":return String(T.$s);case"ss":return L.s(T.$s,2,"0");case"SSS":return L.s(T.$ms,3,"0");case"Z":return B}return null}(ze)||B.replace(":","")})},E.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},E.diff=function(x,T,O){var R,B=this,F=L.p(T),G=M(x),oe=(G.utcOffset()-this.utcOffset())*r,se=this-G,fe=function(){return L.m(B,G)};switch(F){case p:R=fe()/12;break;case d:R=fe();break;case h:R=fe()/3;break;case u:R=(se-oe)/6048e5;break;case l:R=(se-oe)/864e5;break;case c:R=se/s;break;case a:R=se/r;break;case o:R=se/i;break;default:R=se}return O?R:L.a(R)},E.daysInMonth=function(){return this.endOf(d).$D},E.$locale=function(){return N[this.$L]},E.locale=function(x,T){if(!x)return this.$L;var O=this.clone(),R=_(x,T,!0);return R&&(O.$L=R),O},E.clone=function(){return L.w(this.$d,this)},E.toDate=function(){return new Date(this.valueOf())},E.toJSON=function(){return this.isValid()?this.toISOString():null},E.toISOString=function(){return this.$d.toISOString()},E.toString=function(){return this.$d.toUTCString()},I}(),K=U.prototype;return M.prototype=K,[["$ms",n],["$s",o],["$m",a],["$H",c],["$W",l],["$M",d],["$y",p],["$D",g]].forEach(function(I){K[I[1]]=function(E){return this.$g(E,I[0],I[1])}}),M.extend=function(I,E){return I.$i||(I(E,U,M),I.$i=!0),M},M.locale=_,M.isDayjs=k,M.unix=function(I){return M(1e3*I)},M.en=N[S],M.Ls=N,M.p={},M})})(hm);var Qh=hm.exports,pm={exports:{}};(function(t,e){(function(i,r){t.exports=r()})(mu,function(){return{name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_"),ordinal:function(i){var r=["th","st","nd","rd"],s=i%100;return"["+i+(r[(s-20)%10]||r[s]||r[0])+"]"}}})})(pm);var mE=pm.exports,gm={exports:{}};(function(t,e){(function(i,r){t.exports=r()})(mu,function(){return function(i,r,s){i=i||{};var n=r.prototype,o={future:"in %s",past:"%s ago",s:"a few seconds",m:"a minute",mm:"%d minutes",h:"an hour",hh:"%d hours",d:"a day",dd:"%d days",M:"a month",MM:"%d months",y:"a year",yy:"%d years"};function a(l,u,d,h){return n.fromToBase(l,u,d,h)}s.en.relativeTime=o,n.fromToBase=function(l,u,d,h,p){for(var g,f,w,m=d.$locale().relativeTime||o,y=i.thresholds||[{l:"s",r:44,d:"second"},{l:"m",r:89},{l:"mm",r:44,d:"minute"},{l:"h",r:89},{l:"hh",r:21,d:"hour"},{l:"d",r:35},{l:"dd",r:25,d:"day"},{l:"M",r:45},{l:"MM",r:10,d:"month"},{l:"y",r:17},{l:"yy",d:"year"}],b=y.length,v=0;v<b;v+=1){var S=y[v];S.d&&(g=h?s(l).diff(d,S.d,!0):d.diff(l,S.d,!0));var N=(i.rounding||Math.round)(Math.abs(g));if(w=g>0,N<=S.r||!S.r){N<=1&&v>0&&(S=y[v-1]);var P=m[S.l];p&&(N=p(""+N)),f=typeof P=="string"?P.replace("%d",N):P(N,u,S.l,w);break}}if(u)return f;var k=w?m.future:m.past;return typeof k=="function"?k(f):k.replace("%s",f)},n.to=function(l,u){return a(l,u,this,!0)},n.from=function(l,u){return a(l,u,this)};var c=function(l){return l.$u?s.utc():s()};n.toNow=function(l){return this.to(c(this),l)},n.fromNow=function(l){return this.from(c(this),l)}}})})(gm);var yE=gm.exports,fm={exports:{}};(function(t,e){(function(i,r){t.exports=r()})(mu,function(){return function(i,r,s){s.updateLocale=function(n,o){var a=s.Ls[n];if(a)return(o?Object.keys(o):[]).forEach(function(c){a[c]=o[c]}),a}}})})(fm);var bE=fm.exports;Qh.extend(yE),Qh.extend(bE);const vE={...mE,name:"en-web3-modal",relativeTime:{future:"in %s",past:"%s ago",s:"%d sec",m:"1 min",mm:"%d min",h:"1 hr",hh:"%d hrs",d:"1 d",dd:"%d d",M:"1 mo",MM:"%d mo",y:"1 yr",yy:"%d yr"}};Qh.locale("en-web3-modal",vE);const wm={caipNetworkIdToNumber(t){return t?Number(t.split(":")[1]):void 0},parseEvmChainId(t){return typeof t=="string"?this.caipNetworkIdToNumber(t):t},getNetworksByNamespace(t,e){return(t==null?void 0:t.filter(i=>i.chainNamespace===e))||[]},getFirstNetworkByNamespace(t,e){return this.getNetworksByNamespace(t,e)[0]}};var CE=20,EE=1,is=1e6,Q1=1e6,xE=-7,IE=21,AE=!1,ca="[big.js] ",Ts=ca+"Invalid ",Ac=Ts+"decimal places",_E=Ts+"rounding mode",eg=ca+"Division by zero",Re={},Gi=void 0,NE=/^-?(\d+(\.\d*)?|\.\d+)(e[+-]?\d+)?$/i;function mm(){function t(e){var i=this;if(!(i instanceof t))return e===Gi?mm():new t(e);if(e instanceof t)i.s=e.s,i.e=e.e,i.c=e.c.slice();else{if(typeof e!="string"){if(t.strict===!0&&typeof e!="bigint")throw TypeError(Ts+"value");e=e===0&&1/e<0?"-0":String(e)}SE(i,e)}i.constructor=t}return t.prototype=Re,t.DP=CE,t.RM=EE,t.NE=xE,t.PE=IE,t.strict=AE,t.roundDown=0,t.roundHalfUp=1,t.roundHalfEven=2,t.roundUp=3,t}function SE(t,e){var i,r,s;if(!NE.test(e))throw Error(Ts+"number");for(t.s=e.charAt(0)=="-"?(e=e.slice(1),-1):1,(i=e.indexOf("."))>-1&&(e=e.replace(".","")),(r=e.search(/e/i))>0?(i<0&&(i=r),i+=+e.slice(r+1),e=e.substring(0,r)):i<0&&(i=e.length),s=e.length,r=0;r<s&&e.charAt(r)=="0";)++r;if(r==s)t.c=[t.e=0];else{for(;s>0&&e.charAt(--s)=="0";);for(t.e=i-r-1,t.c=[],i=0;r<=s;)t.c[i++]=+e.charAt(r++)}return t}function rs(t,e,i,r){var s=t.c;if(i===Gi&&(i=t.constructor.RM),i!==0&&i!==1&&i!==2&&i!==3)throw Error(_E);if(e<1)r=i===3&&(r||!!s[0])||e===0&&(i===1&&s[0]>=5||i===2&&(s[0]>5||s[0]===5&&(r||s[1]!==Gi))),s.length=1,r?(t.e=t.e-e+1,s[0]=1):s[0]=t.e=0;else if(e<s.length){if(r=i===1&&s[e]>=5||i===2&&(s[e]>5||s[e]===5&&(r||s[e+1]!==Gi||s[e-1]&1))||i===3&&(r||!!s[0]),s.length=e,r){for(;++s[--e]>9;)if(s[e]=0,e===0){++t.e,s.unshift(1);break}}for(e=s.length;!s[--e];)s.pop()}return t}function ss(t,e,i){var r=t.e,s=t.c.join(""),n=s.length;if(e)s=s.charAt(0)+(n>1?"."+s.slice(1):"")+(r<0?"e":"e+")+r;else if(r<0){for(;++r;)s="0"+s;s="0."+s}else if(r>0)if(++r>n)for(r-=n;r--;)s+="0";else r<n&&(s=s.slice(0,r)+"."+s.slice(r));else n>1&&(s=s.charAt(0)+"."+s.slice(1));return t.s<0&&i?"-"+s:s}Re.abs=function(){var t=new this.constructor(this);return t.s=1,t},Re.cmp=function(t){var e,i=this,r=i.c,s=(t=new i.constructor(t)).c,n=i.s,o=t.s,a=i.e,c=t.e;if(!r[0]||!s[0])return r[0]?n:s[0]?-o:0;if(n!=o)return n;if(e=n<0,a!=c)return a>c^e?1:-1;for(o=(a=r.length)<(c=s.length)?a:c,n=-1;++n<o;)if(r[n]!=s[n])return r[n]>s[n]^e?1:-1;return a==c?0:a>c^e?1:-1},Re.div=function(t){var e=this,i=e.constructor,r=e.c,s=(t=new i(t)).c,n=e.s==t.s?1:-1,o=i.DP;if(o!==~~o||o<0||o>is)throw Error(Ac);if(!s[0])throw Error(eg);if(!r[0])return t.s=n,t.c=[t.e=0],t;var a,c,l,u,d,h=s.slice(),p=a=s.length,g=r.length,f=r.slice(0,a),w=f.length,m=t,y=m.c=[],b=0,v=o+(m.e=e.e-t.e)+1;for(m.s=n,n=v<0?0:v,h.unshift(0);w++<a;)f.push(0);do{for(l=0;l<10;l++){if(a!=(w=f.length))u=a>w?1:-1;else for(d=-1,u=0;++d<a;)if(s[d]!=f[d]){u=s[d]>f[d]?1:-1;break}if(u<0){for(c=w==a?s:h;w;){if(f[--w]<c[w]){for(d=w;d&&!f[--d];)f[d]=9;--f[d],f[w]+=10}f[w]-=c[w]}for(;!f[0];)f.shift()}else break}y[b++]=u?l:++l,f[0]&&u?f[w]=r[p]||0:f=[r[p]]}while((p++<g||f[0]!==Gi)&&n--);return!y[0]&&b!=1&&(y.shift(),m.e--,v--),b>v&&rs(m,v,i.RM,f[0]!==Gi),m},Re.eq=function(t){return this.cmp(t)===0},Re.gt=function(t){return this.cmp(t)>0},Re.gte=function(t){return this.cmp(t)>-1},Re.lt=function(t){return this.cmp(t)<0},Re.lte=function(t){return this.cmp(t)<1},Re.minus=Re.sub=function(t){var e,i,r,s,n=this,o=n.constructor,a=n.s,c=(t=new o(t)).s;if(a!=c)return t.s=-c,n.plus(t);var l=n.c.slice(),u=n.e,d=t.c,h=t.e;if(!l[0]||!d[0])return d[0]?t.s=-c:l[0]?t=new o(n):t.s=1,t;if(a=u-h){for((s=a<0)?(a=-a,r=l):(h=u,r=d),r.reverse(),c=a;c--;)r.push(0);r.reverse()}else for(i=((s=l.length<d.length)?l:d).length,a=c=0;c<i;c++)if(l[c]!=d[c]){s=l[c]<d[c];break}if(s&&(r=l,l=d,d=r,t.s=-t.s),(c=(i=d.length)-(e=l.length))>0)for(;c--;)l[e++]=0;for(c=e;i>a;){if(l[--i]<d[i]){for(e=i;e&&!l[--e];)l[e]=9;--l[e],l[i]+=10}l[i]-=d[i]}for(;l[--c]===0;)l.pop();for(;l[0]===0;)l.shift(),--h;return l[0]||(t.s=1,l=[h=0]),t.c=l,t.e=h,t},Re.mod=function(t){var e,i=this,r=i.constructor,s=i.s,n=(t=new r(t)).s;if(!t.c[0])throw Error(eg);return i.s=t.s=1,e=t.cmp(i)==1,i.s=s,t.s=n,e?new r(i):(s=r.DP,n=r.RM,r.DP=r.RM=0,i=i.div(t),r.DP=s,r.RM=n,this.minus(i.times(t)))},Re.neg=function(){var t=new this.constructor(this);return t.s=-t.s,t},Re.plus=Re.add=function(t){var e,i,r,s=this,n=s.constructor;if(t=new n(t),s.s!=t.s)return t.s=-t.s,s.minus(t);var o=s.e,a=s.c,c=t.e,l=t.c;if(!a[0]||!l[0])return l[0]||(a[0]?t=new n(s):t.s=s.s),t;if(a=a.slice(),e=o-c){for(e>0?(c=o,r=l):(e=-e,r=a),r.reverse();e--;)r.push(0);r.reverse()}for(a.length-l.length<0&&(r=l,l=a,a=r),e=l.length,i=0;e;a[e]%=10)i=(a[--e]=a[e]+l[e]+i)/10|0;for(i&&(a.unshift(i),++c),e=a.length;a[--e]===0;)a.pop();return t.c=a,t.e=c,t},Re.pow=function(t){var e=this,i=new e.constructor("1"),r=i,s=t<0;if(t!==~~t||t<-Q1||t>Q1)throw Error(Ts+"exponent");for(s&&(t=-t);t&1&&(r=r.times(e)),t>>=1,!!t;)e=e.times(e);return s?i.div(r):r},Re.prec=function(t,e){if(t!==~~t||t<1||t>is)throw Error(Ts+"precision");return rs(new this.constructor(this),t,e)},Re.round=function(t,e){if(t===Gi)t=0;else if(t!==~~t||t<-is||t>is)throw Error(Ac);return rs(new this.constructor(this),t+this.e+1,e)},Re.sqrt=function(){var t,e,i,r=this,s=r.constructor,n=r.s,o=r.e,a=new s("0.5");if(!r.c[0])return new s(r);if(n<0)throw Error(ca+"No square root");n=Math.sqrt(+ss(r,!0,!0)),n===0||n===1/0?(e=r.c.join(""),e.length+o&1||(e+="0"),n=Math.sqrt(e),o=((o+1)/2|0)-(o<0||o&1),t=new s((n==1/0?"5e":(n=n.toExponential()).slice(0,n.indexOf("e")+1))+o)):t=new s(n+""),o=t.e+(s.DP+=4);do i=t,t=a.times(i.plus(r.div(i)));while(i.c.slice(0,o).join("")!==t.c.slice(0,o).join(""));return rs(t,(s.DP-=4)+t.e+1,s.RM)},Re.times=Re.mul=function(t){var e,i=this,r=i.constructor,s=i.c,n=(t=new r(t)).c,o=s.length,a=n.length,c=i.e,l=t.e;if(t.s=i.s==t.s?1:-1,!s[0]||!n[0])return t.c=[t.e=0],t;for(t.e=c+l,o<a&&(e=s,s=n,n=e,l=o,o=a,a=l),e=new Array(l=o+a);l--;)e[l]=0;for(c=a;c--;){for(a=0,l=o+c;l>c;)a=e[l]+n[c]*s[l-c-1]+a,e[l--]=a%10,a=a/10|0;e[l]=a}for(a?++t.e:e.shift(),c=e.length;!e[--c];)e.pop();return t.c=e,t},Re.toExponential=function(t,e){var i=this,r=i.c[0];if(t!==Gi){if(t!==~~t||t<0||t>is)throw Error(Ac);for(i=rs(new i.constructor(i),++t,e);i.c.length<t;)i.c.push(0)}return ss(i,!0,!!r)},Re.toFixed=function(t,e){var i=this,r=i.c[0];if(t!==Gi){if(t!==~~t||t<0||t>is)throw Error(Ac);for(i=rs(new i.constructor(i),t+i.e+1,e),t=t+i.e+1;i.c.length<t;)i.c.push(0)}return ss(i,!1,!!r)},Re[Symbol.for("nodejs.util.inspect.custom")]=Re.toJSON=Re.toString=function(){var t=this,e=t.constructor;return ss(t,t.e<=e.NE||t.e>=e.PE,!!t.c[0])},Re.toNumber=function(){var t=+ss(this,!0,!0);if(this.constructor.strict===!0&&!this.eq(t.toString()))throw Error(ca+"Imprecise conversion");return t},Re.toPrecision=function(t,e){var i=this,r=i.constructor,s=i.c[0];if(t!==Gi){if(t!==~~t||t<1||t>is)throw Error(Ts+"precision");for(i=rs(new r(i),t,e);i.c.length<t;)i.c.push(0)}return ss(i,t<=i.e||i.e<=r.NE||i.e>=r.PE,!!s)},Re.valueOf=function(){var t=this,e=t.constructor;if(e.strict===!0)throw Error(ca+"valueOf disallowed");return ss(t,t.e<=e.NE||t.e>=e.PE,!0)};var Eo=mm();const _c={bigNumber(t){return t?new Eo(t):new Eo(0)},multiply(t,e){if(t===void 0||e===void 0)return new Eo(0);const i=new Eo(t),r=new Eo(e);return i.times(r)},formatNumberToLocalString(t,e=2){return t===void 0?"0.00":typeof t=="number"?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})},parseLocalStringToNumber(t){return t===void 0?0:parseFloat(t.replace(/,/gu,""))}},$E=[{type:"function",name:"transfer",stateMutability:"nonpayable",inputs:[{name:"_to",type:"address"},{name:"_value",type:"uint256"}],outputs:[{name:"",type:"bool"}]},{type:"function",name:"transferFrom",stateMutability:"nonpayable",inputs:[{name:"_from",type:"address"},{name:"_to",type:"address"},{name:"_value",type:"uint256"}],outputs:[{name:"",type:"bool"}]}],kE=[{type:"function",name:"approve",stateMutability:"nonpayable",inputs:[{name:"spender",type:"address"},{name:"amount",type:"uint256"}],outputs:[{type:"bool"}]}],PE=[{type:"function",name:"transfer",stateMutability:"nonpayable",inputs:[{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[]},{type:"function",name:"transferFrom",stateMutability:"nonpayable",inputs:[{name:"sender",type:"address"},{name:"recipient",type:"address"},{name:"amount",type:"uint256"}],outputs:[{name:"",type:"bool"}]}],re={WC_NAME_SUFFIX:".reown.id",WC_NAME_SUFFIX_LEGACY:".wcn.id",BLOCKCHAIN_API_RPC_URL:"https://rpc.walletconnect.org",PULSE_API_URL:"https://pulse.walletconnect.org",W3M_API_URL:"https://api.web3modal.org",CONNECTOR_ID:{WALLET_CONNECT:"walletConnect",INJECTED:"injected",WALLET_STANDARD:"announced",COINBASE:"coinbaseWallet",COINBASE_SDK:"coinbaseWalletSDK",SAFE:"safe",LEDGER:"ledger",OKX:"okx",EIP6963:"eip6963",AUTH:"ID_AUTH"},CONNECTOR_NAMES:{AUTH:"Auth"},AUTH_CONNECTOR_SUPPORTED_CHAINS:["eip155","solana"],LIMITS:{PENDING_TRANSACTIONS:99},CHAIN:{EVM:"eip155",SOLANA:"solana",POLKADOT:"polkadot",BITCOIN:"bip122"},CHAIN_NAME_MAP:{eip155:"EVM Networks",solana:"Solana",polkadot:"Polkadot",bip122:"Bitcoin"},ADAPTER_TYPES:{BITCOIN:"bitcoin",SOLANA:"solana",WAGMI:"wagmi",ETHERS:"ethers",ETHERS5:"ethers5"},USDT_CONTRACT_ADDRESSES:["0xdac17f958d2ee523a2206206994597c13d831ec7","0xc2132d05d31c914a87c6611c10748aeb04b58e8f","0x9702230a8ea53601f5cd2dc00fdbc13d4df4a8c7","0x919C1c267BC06a7039e03fcc2eF738525769109c","0x48065fbBE25f71C9282ddf5e1cD6D6A887483D5e","0x55d398326f99059fF775485246999027B3197955","0xfd086bc7cd5c481dcc9c85ebe478a1c0b69fcbb9"],HTTP_STATUS_CODES:{SERVICE_UNAVAILABLE:503,FORBIDDEN:403},UNSUPPORTED_NETWORK_NAME:"Unknown Network"},OE={getERC20Abi:t=>re.USDT_CONTRACT_ADDRESSES.includes(t)?PE:$E,getSwapAbi:()=>kE},Sr={validateCaipAddress(t){var e;if(((e=t.split(":"))==null?void 0:e.length)!==3)throw new Error("Invalid CAIP Address");return t},parseCaipAddress(t){const e=t.split(":");if(e.length!==3)throw new Error(`Invalid CAIP-10 address: ${t}`);const[i,r,s]=e;if(!i||!r||!s)throw new Error(`Invalid CAIP-10 address: ${t}`);return{chainNamespace:i,chainId:r,address:s}},parseCaipNetworkId(t){const e=t.split(":");if(e.length!==2)throw new Error(`Invalid CAIP-2 network id: ${t}`);const[i,r]=e;if(!i||!r)throw new Error(`Invalid CAIP-2 network id: ${t}`);return{chainNamespace:i,chainId:r}}},we={WALLET_ID:"@appkit/wallet_id",WALLET_NAME:"@appkit/wallet_name",SOLANA_WALLET:"@appkit/solana_wallet",SOLANA_CAIP_CHAIN:"@appkit/solana_caip_chain",ACTIVE_CAIP_NETWORK_ID:"@appkit/active_caip_network_id",CONNECTED_SOCIAL:"@appkit/connected_social",CONNECTED_SOCIAL_USERNAME:"@appkit-wallet/SOCIAL_USERNAME",RECENT_WALLETS:"@appkit/recent_wallets",DEEPLINK_CHOICE:"WALLETCONNECT_DEEPLINK_CHOICE",ACTIVE_NAMESPACE:"@appkit/active_namespace",CONNECTED_NAMESPACES:"@appkit/connected_namespaces",CONNECTION_STATUS:"@appkit/connection_status",SIWX_AUTH_TOKEN:"@appkit/siwx-auth-token",SIWX_NONCE_TOKEN:"@appkit/siwx-nonce-token",TELEGRAM_SOCIAL_PROVIDER:"@appkit/social_provider",NATIVE_BALANCE_CACHE:"@appkit/native_balance_cache",PORTFOLIO_CACHE:"@appkit/portfolio_cache",ENS_CACHE:"@appkit/ens_cache",IDENTITY_CACHE:"@appkit/identity_cache",PREFERRED_ACCOUNT_TYPES:"@appkit/preferred_account_types"};function id(t){if(!t)throw new Error("Namespace is required for CONNECTED_CONNECTOR_ID");return`@appkit/${t}:connected_connector_id`}const ge={setItem(t,e){Xo()&&e!==void 0&&localStorage.setItem(t,e)},getItem(t){if(Xo())return localStorage.getItem(t)||void 0},removeItem(t){Xo()&&localStorage.removeItem(t)},clear(){Xo()&&localStorage.clear()}};function Xo(){return typeof window<"u"&&typeof localStorage<"u"}function jr(t,e){return e==="light"?{"--w3m-accent":(t==null?void 0:t["--w3m-accent"])||"hsla(231, 100%, 70%, 1)","--w3m-background":"#fff"}:{"--w3m-accent":(t==null?void 0:t["--w3m-accent"])||"hsla(230, 100%, 67%, 1)","--w3m-background":"#121313"}}const TE=Symbol(),tg=Object.getPrototypeOf,ep=new WeakMap,RE=t=>t&&(ep.has(t)?ep.get(t):tg(t)===Object.prototype||tg(t)===Array.prototype),LE=t=>RE(t)&&t[TE]||null,ig=(t,e=!0)=>{ep.set(t,e)},rd=t=>typeof t=="object"&&t!==null,Lr=new WeakMap,Qo=new WeakSet,ME=(t=Object.is,e=(l,u)=>new Proxy(l,u),i=l=>rd(l)&&!Qo.has(l)&&(Array.isArray(l)||!(Symbol.iterator in l))&&!(l instanceof WeakMap)&&!(l instanceof WeakSet)&&!(l instanceof Error)&&!(l instanceof Number)&&!(l instanceof Date)&&!(l instanceof String)&&!(l instanceof RegExp)&&!(l instanceof ArrayBuffer),r=l=>{switch(l.status){case"fulfilled":return l.value;case"rejected":throw l.reason;default:throw l}},s=new WeakMap,n=(l,u,d=r)=>{const h=s.get(l);if((h==null?void 0:h[0])===u)return h[1];const p=Array.isArray(l)?[]:Object.create(Object.getPrototypeOf(l));return ig(p,!0),s.set(l,[u,p]),Reflect.ownKeys(l).forEach(g=>{if(Object.getOwnPropertyDescriptor(p,g))return;const f=Reflect.get(l,g),{enumerable:w}=Reflect.getOwnPropertyDescriptor(l,g),m={value:f,enumerable:w,configurable:!0};if(Qo.has(f))ig(f,!1);else if(f instanceof Promise)delete m.value,m.get=()=>d(f);else if(Lr.has(f)){const[y,b]=Lr.get(f);m.value=n(y,b(),d)}Object.defineProperty(p,g,m)}),Object.preventExtensions(p)},o=new WeakMap,a=[1,1],c=l=>{if(!rd(l))throw new Error("object required");const u=o.get(l);if(u)return u;let d=a[0];const h=new Set,p=(k,_=++a[0])=>{d!==_&&(d=_,h.forEach(M=>M(k,_)))};let g=a[1];const f=(k=++a[1])=>(g!==k&&!h.size&&(g=k,m.forEach(([_])=>{const M=_[1](k);M>d&&(d=M)})),d),w=k=>(_,M)=>{const L=[..._];L[1]=[k,...L[1]],p(L,M)},m=new Map,y=(k,_)=>{if(h.size){const M=_[3](w(k));m.set(k,[_,M])}else m.set(k,[_])},b=k=>{var _;const M=m.get(k);M&&(m.delete(k),(_=M[1])==null||_.call(M))},v=k=>(h.add(k),h.size===1&&m.forEach(([_,M],L)=>{const U=_[3](w(L));m.set(L,[_,U])}),()=>{h.delete(k),h.size===0&&m.forEach(([_,M],L)=>{M&&(M(),m.set(L,[_]))})}),S=Array.isArray(l)?[]:Object.create(Object.getPrototypeOf(l)),N=e(S,{deleteProperty(k,_){const M=Reflect.get(k,_);b(_);const L=Reflect.deleteProperty(k,_);return L&&p(["delete",[_],M]),L},set(k,_,M,L){const U=Reflect.has(k,_),K=Reflect.get(k,_,L);if(U&&(t(K,M)||o.has(M)&&t(K,o.get(M))))return!0;b(_),rd(M)&&(M=LE(M)||M);let I=M;if(M instanceof Promise)M.then(E=>{M.status="fulfilled",M.value=E,p(["resolve",[_],E])}).catch(E=>{M.status="rejected",M.reason=E,p(["reject",[_],E])});else{!Lr.has(M)&&i(M)&&(I=c(M));const E=!Qo.has(I)&&Lr.get(I);E&&y(_,E)}return Reflect.set(k,_,I,L),p(["set",[_],M,K]),!0}});o.set(l,N);const P=[S,f,n,v];return Lr.set(N,P),Reflect.ownKeys(l).forEach(k=>{const _=Object.getOwnPropertyDescriptor(l,k);"value"in _&&(N[k]=l[k],delete _.value,delete _.writable),Object.defineProperty(S,k,_)}),N})=>[c,Lr,Qo,t,e,i,r,s,n,o,a],[BE]=ME();function je(t={}){return BE(t)}function _t(t,e,i){const r=Lr.get(t);let s;const n=[],o=r[3];let a=!1;const c=o(l=>{if(n.push(l),i){e(n.splice(0));return}s||(s=Promise.resolve().then(()=>{s=void 0,a&&e(n.splice(0))}))});return a=!0,()=>{a=!1,c()}}function Ca(t,e){const i=Lr.get(t),[r,s,n]=i;return n(r,s(),e)}function Hs(t){return Qo.add(t),t}function Rt(t,e,i,r){let s=t[e];return _t(t,()=>{const n=t[e];Object.is(s,n)||i(s=n)},r)}function UE(t){const e=je({data:Array.from(t||[]),has(i){return this.data.some(r=>r[0]===i)},set(i,r){const s=this.data.find(n=>n[0]===i);return s?s[1]=r:this.data.push([i,r]),this},get(i){var r;return(r=this.data.find(s=>s[0]===i))==null?void 0:r[1]},delete(i){const r=this.data.findIndex(s=>s[0]===i);return r===-1?!1:(this.data.splice(r,1),!0)},clear(){this.data.splice(0)},get size(){return this.data.length},toJSON(){return new Map(this.data)},forEach(i){this.data.forEach(r=>{i(r[1],r[0],this)})},keys(){return this.data.map(i=>i[0]).values()},values(){return this.data.map(i=>i[1]).values()},entries(){return new Map(this.data).entries()},get[Symbol.toStringTag](){return"Map"},[Symbol.iterator](){return this.entries()}});return Object.defineProperties(e,{data:{enumerable:!1},size:{enumerable:!1},toJSON:{enumerable:!1}}),Object.seal(e),e}const sd=(typeof Ps<"u"&&typeof{}<"u"?{}.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",DE=[{label:"Coinbase",name:"coinbase",feeRange:"1-2%",url:"",supportedChains:["eip155"]},{label:"Meld.io",name:"meld",feeRange:"1-2%",url:"https://meldcrypto.com",supportedChains:["eip155","solana"]}],nt={FOUR_MINUTES_MS:24e4,TEN_SEC_MS:1e4,FIVE_SEC_MS:5e3,THREE_SEC_MS:3e3,ONE_SEC_MS:1e3,SECURE_SITE:sd,SECURE_SITE_DASHBOARD:`${sd}/dashboard`,SECURE_SITE_FAVICON:`${sd}/images/favicon.png`,RESTRICTED_TIMEZONES:["ASIA/SHANGHAI","ASIA/URUMQI","ASIA/CHONGQING","ASIA/HARBIN","ASIA/KASHGAR","ASIA/MACAU","ASIA/HONG_KONG","ASIA/MACAO","ASIA/BEIJING","ASIA/HARBIN"],WC_COINBASE_PAY_SDK_CHAINS:["ethereum","arbitrum","polygon","berachain","avalanche-c-chain","optimism","celo","base"],WC_COINBASE_PAY_SDK_FALLBACK_CHAIN:"ethereum",WC_COINBASE_PAY_SDK_CHAIN_NAME_MAP:{Ethereum:"ethereum","Arbitrum One":"arbitrum",Polygon:"polygon",Berachain:"berachain",Avalanche:"avalanche-c-chain","OP Mainnet":"optimism",Celo:"celo",Base:"base"},WC_COINBASE_ONRAMP_APP_ID:"bf18c88d-495a-463b-b249-0b9d3656cf5e",SWAP_SUGGESTED_TOKENS:["ETH","UNI","1INCH","AAVE","SOL","ADA","AVAX","DOT","LINK","NITRO","GAIA","MILK","TRX","NEAR","GNO","WBTC","DAI","WETH","USDC","USDT","ARB","BAL","BICO","CRV","ENS","MATIC","OP"],SWAP_POPULAR_TOKENS:["ETH","UNI","1INCH","AAVE","SOL","ADA","AVAX","DOT","LINK","NITRO","GAIA","MILK","TRX","NEAR","GNO","WBTC","DAI","WETH","USDC","USDT","ARB","BAL","BICO","CRV","ENS","MATIC","OP","METAL","DAI","CHAMP","WOLF","SALE","BAL","BUSD","MUST","BTCpx","ROUTE","HEX","WELT","amDAI","VSQ","VISION","AURUM","pSP","SNX","VC","LINK","CHP","amUSDT","SPHERE","FOX","GIDDY","GFC","OMEN","OX_OLD","DE","WNT"],BALANCE_SUPPORTED_CHAINS:["eip155","solana"],SWAP_SUPPORTED_NETWORKS:["eip155:1","eip155:42161","eip155:10","eip155:324","eip155:8453","eip155:56","eip155:137","eip155:100","eip155:43114","eip155:250","eip155:8217","eip155:1313161554"],NAMES_SUPPORTED_CHAIN_NAMESPACES:["eip155"],ONRAMP_SUPPORTED_CHAIN_NAMESPACES:["eip155","solana"],ACTIVITY_ENABLED_CHAIN_NAMESPACES:["eip155"],NATIVE_TOKEN_ADDRESS:{eip155:"0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",solana:"So11111111111111111111111111111111111111111",polkadot:"0x",bip122:"0x"},CONVERT_SLIPPAGE_TOLERANCE:1,CONNECT_LABELS:{MOBILE:"Open and continue in a new browser tab"},DEFAULT_FEATURES:{swaps:!0,onramp:!0,receive:!0,send:!0,email:!0,emailShowWallets:!0,socials:["google","x","discord","farcaster","github","apple","facebook"],connectorTypeOrder:["walletConnect","recent","injected","featured","custom","external","recommended"],history:!0,analytics:!0,allWallets:!0,legalCheckbox:!1,smartSessions:!1,collapseWallets:!1,walletFeaturesOrder:["onramp","swaps","receive","send"],connectMethodsOrder:void 0},DEFAULT_ACCOUNT_TYPES:{bip122:"payment",eip155:"smartAccount",polkadot:"eoa",solana:"eoa"},ADAPTER_TYPES:{UNIVERSAL:"universal",SOLANA:"solana",WAGMI:"wagmi",ETHERS:"ethers",ETHERS5:"ethers5",BITCOIN:"bitcoin"}},ie={cacheExpiry:{portfolio:3e4,nativeBalance:3e4,ens:3e5,identity:3e5},isCacheExpired(t,e){return Date.now()-t>e},getActiveNetworkProps(){const t=ie.getActiveNamespace(),e=ie.getActiveCaipNetworkId(),i=e?e.split(":")[1]:void 0,r=i?isNaN(Number(i))?i:Number(i):void 0;return{namespace:t,caipNetworkId:e,chainId:r}},setWalletConnectDeepLink({name:t,href:e}){try{ge.setItem(we.DEEPLINK_CHOICE,JSON.stringify({href:e,name:t}))}catch{console.info("Unable to set WalletConnect deep link")}},getWalletConnectDeepLink(){try{const t=ge.getItem(we.DEEPLINK_CHOICE);if(t)return JSON.parse(t)}catch{console.info("Unable to get WalletConnect deep link")}},deleteWalletConnectDeepLink(){try{ge.removeItem(we.DEEPLINK_CHOICE)}catch{console.info("Unable to delete WalletConnect deep link")}},setActiveNamespace(t){try{ge.setItem(we.ACTIVE_NAMESPACE,t)}catch{console.info("Unable to set active namespace")}},setActiveCaipNetworkId(t){try{ge.setItem(we.ACTIVE_CAIP_NETWORK_ID,t),ie.setActiveNamespace(t.split(":")[0])}catch{console.info("Unable to set active caip network id")}},getActiveCaipNetworkId(){try{return ge.getItem(we.ACTIVE_CAIP_NETWORK_ID)}catch{console.info("Unable to get active caip network id");return}},deleteActiveCaipNetworkId(){try{ge.removeItem(we.ACTIVE_CAIP_NETWORK_ID)}catch{console.info("Unable to delete active caip network id")}},deleteConnectedConnectorId(t){try{const e=id(t);ge.removeItem(e)}catch{console.info("Unable to delete connected connector id")}},setAppKitRecent(t){try{const e=ie.getRecentWallets();e.find(i=>i.id===t.id)||(e.unshift(t),e.length>2&&e.pop(),ge.setItem(we.RECENT_WALLETS,JSON.stringify(e)))}catch{console.info("Unable to set AppKit recent")}},getRecentWallets(){try{const t=ge.getItem(we.RECENT_WALLETS);return t?JSON.parse(t):[]}catch{console.info("Unable to get AppKit recent")}return[]},setConnectedConnectorId(t,e){try{const i=id(t);ge.setItem(i,e)}catch{console.info("Unable to set Connected Connector Id")}},getActiveNamespace(){try{return ge.getItem(we.ACTIVE_NAMESPACE)}catch{console.info("Unable to get active namespace")}},getConnectedConnectorId(t){if(t)try{const e=id(t);return ge.getItem(e)}catch{console.info("Unable to get connected connector id in namespace ",t)}},setConnectedSocialProvider(t){try{ge.setItem(we.CONNECTED_SOCIAL,t)}catch{console.info("Unable to set connected social provider")}},getConnectedSocialProvider(){try{return ge.getItem(we.CONNECTED_SOCIAL)}catch{console.info("Unable to get connected social provider")}},deleteConnectedSocialProvider(){try{ge.removeItem(we.CONNECTED_SOCIAL)}catch{console.info("Unable to delete connected social provider")}},getConnectedSocialUsername(){try{return ge.getItem(we.CONNECTED_SOCIAL_USERNAME)}catch{console.info("Unable to get connected social username")}},getStoredActiveCaipNetworkId(){var t,e;return(e=(t=ge.getItem(we.ACTIVE_CAIP_NETWORK_ID))==null?void 0:t.split(":"))==null?void 0:e[1]},setConnectionStatus(t){try{ge.setItem(we.CONNECTION_STATUS,t)}catch{console.info("Unable to set connection status")}},getConnectionStatus(){try{return ge.getItem(we.CONNECTION_STATUS)}catch{return}},getConnectedNamespaces(){try{const t=ge.getItem(we.CONNECTED_NAMESPACES);return t!=null&&t.length?t.split(","):[]}catch{return[]}},setConnectedNamespaces(t){try{const e=Array.from(new Set(t));ge.setItem(we.CONNECTED_NAMESPACES,e.join(","))}catch{console.info("Unable to set namespaces in storage")}},addConnectedNamespace(t){try{const e=ie.getConnectedNamespaces();e.includes(t)||(e.push(t),ie.setConnectedNamespaces(e))}catch{console.info("Unable to add connected namespace")}},removeConnectedNamespace(t){try{const e=ie.getConnectedNamespaces(),i=e.indexOf(t);i>-1&&(e.splice(i,1),ie.setConnectedNamespaces(e))}catch{console.info("Unable to remove connected namespace")}},getTelegramSocialProvider(){try{return ge.getItem(we.TELEGRAM_SOCIAL_PROVIDER)}catch{return console.info("Unable to get telegram social provider"),null}},setTelegramSocialProvider(t){try{ge.setItem(we.TELEGRAM_SOCIAL_PROVIDER,t)}catch{console.info("Unable to set telegram social provider")}},removeTelegramSocialProvider(){try{ge.removeItem(we.TELEGRAM_SOCIAL_PROVIDER)}catch{console.info("Unable to remove telegram social provider")}},getBalanceCache(){let t={};try{const e=ge.getItem(we.PORTFOLIO_CACHE);t=e?JSON.parse(e):{}}catch{console.info("Unable to get balance cache")}return t},removeAddressFromBalanceCache(t){try{const e=ie.getBalanceCache();ge.setItem(we.PORTFOLIO_CACHE,JSON.stringify({...e,[t]:void 0}))}catch{console.info("Unable to remove address from balance cache",t)}},getBalanceCacheForCaipAddress(t){try{const e=ie.getBalanceCache()[t];if(e&&!this.isCacheExpired(e.timestamp,this.cacheExpiry.portfolio))return e.balance;ie.removeAddressFromBalanceCache(t)}catch{console.info("Unable to get balance cache for address",t)}},updateBalanceCache(t){try{const e=ie.getBalanceCache();e[t.caipAddress]=t,ge.setItem(we.PORTFOLIO_CACHE,JSON.stringify(e))}catch{console.info("Unable to update balance cache",t)}},getNativeBalanceCache(){let t={};try{const e=ge.getItem(we.NATIVE_BALANCE_CACHE);t=e?JSON.parse(e):{}}catch{console.info("Unable to get balance cache")}return t},removeAddressFromNativeBalanceCache(t){try{const e=ie.getBalanceCache();ge.setItem(we.NATIVE_BALANCE_CACHE,JSON.stringify({...e,[t]:void 0}))}catch{console.info("Unable to remove address from balance cache",t)}},getNativeBalanceCacheForCaipAddress(t){try{const e=ie.getNativeBalanceCache()[t];if(e&&!this.isCacheExpired(e.timestamp,this.cacheExpiry.nativeBalance))return e;console.info("Discarding cache for address",t),ie.removeAddressFromBalanceCache(t)}catch{console.info("Unable to get balance cache for address",t)}},updateNativeBalanceCache(t){try{const e=ie.getNativeBalanceCache();e[t.caipAddress]=t,ge.setItem(we.NATIVE_BALANCE_CACHE,JSON.stringify(e))}catch{console.info("Unable to update balance cache",t)}},getEnsCache(){let t={};try{const e=ge.getItem(we.ENS_CACHE);t=e?JSON.parse(e):{}}catch{console.info("Unable to get ens name cache")}return t},getEnsFromCacheForAddress(t){try{const e=ie.getEnsCache()[t];if(e&&!this.isCacheExpired(e.timestamp,this.cacheExpiry.ens))return e.ens;ie.removeEnsFromCache(t)}catch{console.info("Unable to get ens name from cache",t)}},updateEnsCache(t){try{const e=ie.getEnsCache();e[t.address]=t,ge.setItem(we.ENS_CACHE,JSON.stringify(e))}catch{console.info("Unable to update ens name cache",t)}},removeEnsFromCache(t){try{const e=ie.getEnsCache();ge.setItem(we.ENS_CACHE,JSON.stringify({...e,[t]:void 0}))}catch{console.info("Unable to remove ens name from cache",t)}},getIdentityCache(){let t={};try{const e=ge.getItem(we.IDENTITY_CACHE);t=e?JSON.parse(e):{}}catch{console.info("Unable to get identity cache")}return t},getIdentityFromCacheForAddress(t){try{const e=ie.getIdentityCache()[t];if(e&&!this.isCacheExpired(e.timestamp,this.cacheExpiry.identity))return e.identity;ie.removeIdentityFromCache(t)}catch{console.info("Unable to get identity from cache",t)}},updateIdentityCache(t){try{const e=ie.getIdentityCache();e[t.address]={identity:t.identity,timestamp:t.timestamp},ge.setItem(we.IDENTITY_CACHE,JSON.stringify(e))}catch{console.info("Unable to update identity cache",t)}},removeIdentityFromCache(t){try{const e=ie.getIdentityCache();ge.setItem(we.IDENTITY_CACHE,JSON.stringify({...e,[t]:void 0}))}catch{console.info("Unable to remove identity from cache",t)}},clearAddressCache(){try{ge.removeItem(we.PORTFOLIO_CACHE),ge.removeItem(we.NATIVE_BALANCE_CACHE),ge.removeItem(we.ENS_CACHE),ge.removeItem(we.IDENTITY_CACHE)}catch{console.info("Unable to clear address cache")}},setPreferredAccountTypes(t){try{ge.setItem(we.PREFERRED_ACCOUNT_TYPES,JSON.stringify(t))}catch{console.info("Unable to set preferred account types",t)}},getPreferredAccountTypes(){try{const t=ge.getItem(we.PREFERRED_ACCOUNT_TYPES);return JSON.parse(t)}catch{console.info("Unable to get preferred account types")}}},q={isMobile(){var t;return this.isClient()?!!((t=window==null?void 0:window.matchMedia("(pointer:coarse)"))!=null&&t.matches||/Android|webOS|iPhone|iPad|iPod|BlackBerry|Opera Mini/u.test(navigator.userAgent)):!1},checkCaipNetwork(t,e=""){return t==null?void 0:t.caipNetworkId.toLocaleLowerCase().includes(e.toLowerCase())},isAndroid(){if(!this.isMobile())return!1;const t=window==null?void 0:window.navigator.userAgent.toLowerCase();return q.isMobile()&&t.includes("android")},isIos(){if(!this.isMobile())return!1;const t=window==null?void 0:window.navigator.userAgent.toLowerCase();return t.includes("iphone")||t.includes("ipad")},isSafari(){return this.isClient()?(window==null?void 0:window.navigator.userAgent.toLowerCase()).includes("safari"):!1},isClient(){return typeof window<"u"},isPairingExpired(t){return t?t-Date.now()<=nt.TEN_SEC_MS:!0},isAllowedRetry(t,e=nt.ONE_SEC_MS){return Date.now()-t>=e},copyToClopboard(t){navigator.clipboard.writeText(t)},isIframe(){try{return(window==null?void 0:window.self)!==(window==null?void 0:window.top)}catch{return!1}},getPairingExpiry(){return Date.now()+nt.FOUR_MINUTES_MS},getNetworkId(t){return t==null?void 0:t.split(":")[1]},getPlainAddress(t){return t==null?void 0:t.split(":")[2]},async wait(t){return new Promise(e=>{setTimeout(e,t)})},debounce(t,e=500){let i;return(...r)=>{function s(){t(...r)}i&&clearTimeout(i),i=setTimeout(s,e)}},isHttpUrl(t){return t.startsWith("http://")||t.startsWith("https://")},formatNativeUrl(t,e){if(q.isHttpUrl(t))return this.formatUniversalUrl(t,e);let i=t;i.includes("://")||(i=t.replaceAll("/","").replaceAll(":",""),i=`${i}://`),i.endsWith("/")||(i=`${i}/`),this.isTelegram()&&this.isAndroid()&&(e=encodeURIComponent(e));const r=encodeURIComponent(e);return{redirect:`${i}wc?uri=${r}`,href:i}},formatUniversalUrl(t,e){if(!q.isHttpUrl(t))return this.formatNativeUrl(t,e);let i=t;i.endsWith("/")||(i=`${i}/`);const r=encodeURIComponent(e);return{redirect:`${i}wc?uri=${r}`,href:i}},getOpenTargetForPlatform(t){return t==="popupWindow"?t:this.isTelegram()?ie.getTelegramSocialProvider()?"_top":"_blank":t},openHref(t,e,i){window==null||window.open(t,this.getOpenTargetForPlatform(e),i||"noreferrer noopener")},returnOpenHref(t,e,i){return window==null?void 0:window.open(t,this.getOpenTargetForPlatform(e),i||"noreferrer noopener")},isTelegram(){return typeof window<"u"&&(!!window.TelegramWebviewProxy||!!window.Telegram||!!window.TelegramWebviewProxyProto)},async preloadImage(t){const e=new Promise((i,r)=>{const s=new Image;s.onload=i,s.onerror=r,s.crossOrigin="anonymous",s.src=t});return Promise.race([e,q.wait(2e3)])},formatBalance(t,e){let i="0.000";if(typeof t=="string"){const r=Number(t);if(r){const s=Math.floor(r*1e3)/1e3;s&&(i=s.toString())}}return`${i}${e?` ${e}`:""}`},formatBalance2(t,e){var r;let i;if(t==="0")i="0";else if(typeof t=="string"){const s=Number(t);s&&(i=(r=s.toString().match(/^-?\d+(?:\.\d{0,3})?/u))==null?void 0:r[0])}return{value:i??"0",rest:i==="0"?"000":"",symbol:e}},getApiUrl(){return re.W3M_API_URL},getBlockchainApiUrl(){return re.BLOCKCHAIN_API_RPC_URL},getAnalyticsUrl(){return re.PULSE_API_URL},getUUID(){return crypto!=null&&crypto.randomUUID?crypto.randomUUID():"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/gu,t=>{const e=Math.random()*16|0;return(t==="x"?e:e&3|8).toString(16)})},parseError(t){var e,i;return typeof t=="string"?t:typeof((i=(e=t==null?void 0:t.issues)==null?void 0:e[0])==null?void 0:i.message)=="string"?t.issues[0].message:t instanceof Error?t.message:"Unknown error"},sortRequestedNetworks(t,e=[]){const i={};return e&&t&&(t.forEach((r,s)=>{i[r]=s}),e.sort((r,s)=>{const n=i[r.id],o=i[s.id];return n!==void 0&&o!==void 0?n-o:n!==void 0?-1:o!==void 0?1:0})),e},calculateBalance(t){let e=0;for(const i of t)e+=i.value??0;return e},formatTokenBalance(t){const e=t.toFixed(2),[i,r]=e.split(".");return{dollars:i,pennies:r}},isAddress(t,e="eip155"){switch(e){case"eip155":if(/^(?:0x)?[0-9a-f]{40}$/iu.test(t)){if(/^(?:0x)?[0-9a-f]{40}$/iu.test(t)||/^(?:0x)?[0-9A-F]{40}$/iu.test(t))return!0}else return!1;return!1;case"solana":return/[1-9A-HJ-NP-Za-km-z]{32,44}$/iu.test(t);default:return!1}},uniqueBy(t,e){const i=new Set;return t.filter(r=>{const s=r[e];return i.has(s)?!1:(i.add(s),!0)})},generateSdkVersion(t,e,i){const r=t.length===0?nt.ADAPTER_TYPES.UNIVERSAL:t.map(s=>s.adapterType).join(",");return`${e}-${r}-${i}`},createAccount(t,e,i,r,s){return{namespace:t,address:e,type:i,publicKey:r,path:s}},isCaipAddress(t){if(typeof t!="string")return!1;const e=t.split(":"),i=e[0];return e.filter(Boolean).length===3&&i in re.CHAIN_NAME_MAP},isMac(){const t=window==null?void 0:window.navigator.userAgent.toLowerCase();return t.includes("macintosh")&&!t.includes("safari")},formatTelegramSocialLoginUrl(t){const e=`--${encodeURIComponent(window==null?void 0:window.location.href)}`,i="state=";if(new URL(t).host==="auth.magic.link"){const r="provider_authorization_url=",s=t.substring(t.indexOf(r)+r.length),n=this.injectIntoUrl(decodeURIComponent(s),i,e);return t.replace(s,encodeURIComponent(n))}return this.injectIntoUrl(t,i,e)},injectIntoUrl(t,e,i){const r=t.indexOf(e);if(r===-1)throw new Error(`${e} parameter not found in the URL: ${t}`);const s=t.indexOf("&",r),n=e.length,o=s!==-1?s:t.length,a=t.substring(0,r+n),c=t.substring(r+n,o),l=t.substring(s),u=c+i;return a+u+l}};async function xo(...t){const e=await fetch(...t);if(!e.ok)throw new Error(`HTTP status code: ${e.status}`,{cause:e});return e}class yu{constructor({baseUrl:e,clientId:i}){this.baseUrl=e,this.clientId=i}async get({headers:e,signal:i,cache:r,...s}){const n=this.createUrl(s);return(await xo(n,{method:"GET",headers:e,signal:i,cache:r})).json()}async getBlob({headers:e,signal:i,...r}){const s=this.createUrl(r);return(await xo(s,{method:"GET",headers:e,signal:i})).blob()}async post({body:e,headers:i,signal:r,...s}){const n=this.createUrl(s);return(await xo(n,{method:"POST",headers:i,body:e?JSON.stringify(e):void 0,signal:r})).json()}async put({body:e,headers:i,signal:r,...s}){const n=this.createUrl(s);return(await xo(n,{method:"PUT",headers:i,body:e?JSON.stringify(e):void 0,signal:r})).json()}async delete({body:e,headers:i,signal:r,...s}){const n=this.createUrl(s);return(await xo(n,{method:"DELETE",headers:i,body:e?JSON.stringify(e):void 0,signal:r})).json()}createUrl({path:e,params:i}){const r=new URL(e,this.baseUrl);return i&&Object.entries(i).forEach(([s,n])=>{n&&r.searchParams.append(s,n)}),this.clientId&&r.searchParams.append("clientId",this.clientId),r}}const jE={handleSolanaDeeplinkRedirect(t){if(C.state.activeChain===re.CHAIN.SOLANA){const e=window.location.href,i=encodeURIComponent(e);if(t==="Phantom"&&!("phantom"in window)){const r=e.startsWith("https")?"https":"http",s=e.split("/")[2],n=encodeURIComponent(`${r}://${s}`);window.location.href=`https://phantom.app/ul/browse/${i}?ref=${n}`}t==="Coinbase Wallet"&&!("coinbaseSolana"in window)&&(window.location.href=`https://go.cb-w.com/dapp?cb_url=${i}`)}}},Zt=je({walletImages:{},networkImages:{},chainImages:{},connectorImages:{},tokenImages:{},currencyImages:{}}),qt={state:Zt,subscribeNetworkImages(t){return _t(Zt.networkImages,()=>t(Zt.networkImages))},subscribeKey(t,e){return Rt(Zt,t,e)},subscribe(t){return _t(Zt,()=>t(Zt))},setWalletImage(t,e){Zt.walletImages[t]=e},setNetworkImage(t,e){Zt.networkImages[t]=e},setChainImage(t,e){Zt.chainImages[t]=e},setConnectorImage(t,e){Zt.connectorImages={...Zt.connectorImages,[t]:e}},setTokenImage(t,e){Zt.tokenImages[t]=e},setCurrencyImage(t,e){Zt.currencyImages[t]=e}},zE={eip155:"ba0ba0cd-17c6-4806-ad93-f9d174f17900",solana:"a1b58899-f671-4276-6a5e-56ca5bd59700",polkadot:"",bip122:"0b4838db-0161-4ffe-022d-532bf03dba00"},nd=je({networkImagePromises:{}}),ot={async fetchWalletImage(t){if(t)return await J._fetchWalletImage(t),this.getWalletImageById(t)},async fetchNetworkImage(t){return t?this.getNetworkImageById(t)||(nd.networkImagePromises[t]||(nd.networkImagePromises[t]=J._fetchNetworkImage(t)),await nd.networkImagePromises[t],this.getNetworkImageById(t)):void 0},getWalletImageById(t){if(t)return qt.state.walletImages[t]},getWalletImage(t){if(t!=null&&t.image_url)return t==null?void 0:t.image_url;if(t!=null&&t.image_id)return qt.state.walletImages[t.image_id]},getNetworkImage(t){var e,i,r;if((e=t==null?void 0:t.assets)!=null&&e.imageUrl)return(i=t==null?void 0:t.assets)==null?void 0:i.imageUrl;if((r=t==null?void 0:t.assets)!=null&&r.imageId)return qt.state.networkImages[t.assets.imageId]},getNetworkImageById(t){if(t)return qt.state.networkImages[t]},getConnectorImage(t){if(t!=null&&t.imageUrl)return t.imageUrl;if(t!=null&&t.imageId)return qt.state.connectorImages[t.imageId]},getChainImage(t){return qt.state.networkImages[zE[t]]}},FE={getFeatureValue(t,e){const i=e==null?void 0:e[t];return i===void 0?nt.DEFAULT_FEATURES[t]:i},filterSocialsByPlatform(t){if(!t||!t.length)return t;if(q.isTelegram()){if(q.isIos())return t.filter(e=>e!=="google");if(q.isMac())return t.filter(e=>e!=="x");if(q.isAndroid())return t.filter(e=>!["facebook","x"].includes(e))}return t}},ue=je({features:nt.DEFAULT_FEATURES,projectId:"",sdkType:"appkit",sdkVersion:"html-wagmi-undefined",defaultAccountTypes:{solana:"eoa",bip122:"payment",polkadot:"eoa",eip155:"smartAccount"},enableNetworkSwitch:!0}),j={state:ue,subscribeKey(t,e){return Rt(ue,t,e)},setOptions(t){Object.assign(ue,t)},setFeatures(t){if(!t)return;ue.features||(ue.features=nt.DEFAULT_FEATURES);const e={...ue.features,...t};ue.features=e,ue.features.socials&&(ue.features.socials=FE.filterSocialsByPlatform(ue.features.socials))},setProjectId(t){ue.projectId=t},setCustomRpcUrls(t){ue.customRpcUrls=t},setAllWallets(t){ue.allWallets=t},setIncludeWalletIds(t){ue.includeWalletIds=t},setExcludeWalletIds(t){ue.excludeWalletIds=t},setFeaturedWalletIds(t){ue.featuredWalletIds=t},setTokens(t){ue.tokens=t},setTermsConditionsUrl(t){ue.termsConditionsUrl=t},setPrivacyPolicyUrl(t){ue.privacyPolicyUrl=t},setCustomWallets(t){ue.customWallets=t},setIsSiweEnabled(t){ue.isSiweEnabled=t},setIsUniversalProvider(t){ue.isUniversalProvider=t},setSdkVersion(t){ue.sdkVersion=t},setMetadata(t){ue.metadata=t},setDisableAppend(t){ue.disableAppend=t},setEIP6963Enabled(t){ue.enableEIP6963=t},setDebug(t){ue.debug=t},setEnableWalletConnect(t){ue.enableWalletConnect=t},setEnableWalletGuide(t){ue.enableWalletGuide=t},setEnableAuthLogger(t){ue.enableAuthLogger=t},setEnableWallets(t){ue.enableWallets=t},setHasMultipleAddresses(t){ue.hasMultipleAddresses=t},setSIWX(t){ue.siwx=t},setConnectMethodsOrder(t){ue.features={...ue.features,connectMethodsOrder:t}},setWalletFeaturesOrder(t){ue.features={...ue.features,walletFeaturesOrder:t}},setSocialsOrder(t){ue.features={...ue.features,socials:t}},setCollapseWallets(t){ue.features={...ue.features,collapseWallets:t}},setEnableEmbedded(t){ue.enableEmbedded=t},setAllowUnsupportedChain(t){ue.allowUnsupportedChain=t},setManualWCControl(t){ue.manualWCControl=t},setEnableNetworkSwitch(t){ue.enableNetworkSwitch=t},setDefaultAccountTypes(t={}){Object.entries(t).forEach(([e,i])=>{i&&(ue.defaultAccountTypes[e]=i)})},setUniversalProviderConfigOverride(t){ue.universalProviderConfigOverride=t},getUniversalProviderConfigOverride(){return ue.universalProviderConfigOverride},getSnapshot(){return Ca(ue)}},$r=je({message:"",variant:"info",open:!1}),Hr={state:$r,subscribeKey(t,e){return Rt($r,t,e)},open(t,e){const{debug:i}=j.state,{shortMessage:r,longMessage:s}=t;i&&($r.message=r,$r.variant=e,$r.open=!0),s&&console.error(typeof s=="function"?s():s)},close(){$r.open=!1,$r.message="",$r.variant="info"}},HE=q.getAnalyticsUrl(),qE=new yu({baseUrl:HE,clientId:null}),WE=["MODAL_CREATED"],er=je({timestamp:Date.now(),reportedErrors:{},data:{type:"track",event:"MODAL_CREATED"}}),me={state:er,subscribe(t){return _t(er,()=>t(er))},getSdkProperties(){const{projectId:t,sdkType:e,sdkVersion:i}=j.state;return{projectId:t,st:e,sv:i||"html-wagmi-4.2.2"}},async _sendAnalyticsEvent(t){try{const e=ae.state.address;if(WE.includes(t.data.event)||typeof window>"u")return;await qE.post({path:"/e",params:me.getSdkProperties(),body:{eventId:q.getUUID(),url:window.location.href,domain:window.location.hostname,timestamp:t.timestamp,props:{...t.data,address:e}}}),er.reportedErrors.FORBIDDEN=!1}catch(e){e instanceof Error&&e.cause instanceof Response&&e.cause.status===re.HTTP_STATUS_CODES.FORBIDDEN&&!er.reportedErrors.FORBIDDEN&&(Hr.open({shortMessage:"Invalid App Configuration",longMessage:`Origin ${Xo()?window.origin:"uknown"} not found on Allowlist - update configuration on cloud.reown.com`},"error"),er.reportedErrors.FORBIDDEN=!0)}},sendEvent(t){var e;er.timestamp=Date.now(),er.data=t,(e=j.state.features)!=null&&e.analytics&&me._sendAnalyticsEvent(er)}},VE=["1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79","fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa","a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393"],KE=q.getApiUrl(),li=new yu({baseUrl:KE,clientId:null}),GE=40,rg=4,ZE=20,Oe=je({promises:{},page:1,count:0,featured:[],allFeatured:[],recommended:[],allRecommended:[],wallets:[],search:[],isAnalyticsEnabled:!1,excludedWallets:[],isFetchingRecommendedWallets:!1}),J={state:Oe,subscribeKey(t,e){return Rt(Oe,t,e)},_getSdkProperties(){const{projectId:t,sdkType:e,sdkVersion:i}=j.state;return{projectId:t,st:e||"appkit",sv:i||"html-wagmi-4.2.2"}},_filterOutExtensions(t){return j.state.isUniversalProvider?t.filter(e=>!!(e.mobile_link||e.desktop_link||e.webapp_link)):t},async _fetchWalletImage(t){const e=`${li.baseUrl}/getWalletImage/${t}`,i=await li.getBlob({path:e,params:J._getSdkProperties()});qt.setWalletImage(t,URL.createObjectURL(i))},async _fetchNetworkImage(t){const e=`${li.baseUrl}/public/getAssetImage/${t}`,i=await li.getBlob({path:e,params:J._getSdkProperties()});qt.setNetworkImage(t,URL.createObjectURL(i))},async _fetchConnectorImage(t){const e=`${li.baseUrl}/public/getAssetImage/${t}`,i=await li.getBlob({path:e,params:J._getSdkProperties()});qt.setConnectorImage(t,URL.createObjectURL(i))},async _fetchCurrencyImage(t){const e=`${li.baseUrl}/public/getCurrencyImage/${t}`,i=await li.getBlob({path:e,params:J._getSdkProperties()});qt.setCurrencyImage(t,URL.createObjectURL(i))},async _fetchTokenImage(t){const e=`${li.baseUrl}/public/getTokenImage/${t}`,i=await li.getBlob({path:e,params:J._getSdkProperties()});qt.setTokenImage(t,URL.createObjectURL(i))},async fetchNetworkImages(){var e;const t=(e=C.getAllRequestedCaipNetworks())==null?void 0:e.map(({assets:i})=>i==null?void 0:i.imageId).filter(Boolean).filter(i=>!ot.getNetworkImageById(i));t&&await Promise.allSettled(t.map(i=>J._fetchNetworkImage(i)))},async fetchConnectorImages(){const{connectors:t}=X.state,e=t.map(({imageId:i})=>i).filter(Boolean);await Promise.allSettled(e.map(i=>J._fetchConnectorImage(i)))},async fetchCurrencyImages(t=[]){await Promise.allSettled(t.map(e=>J._fetchCurrencyImage(e)))},async fetchTokenImages(t=[]){await Promise.allSettled(t.map(e=>J._fetchTokenImage(e)))},async fetchWallets(t){var i,r;const e=t.exclude??[];return J._getSdkProperties().sv.startsWith("html-core-")&&e.push(...VE),await li.get({path:"/getWallets",params:{...J._getSdkProperties(),...t,page:String(t.page),entries:String(t.entries),include:(i=t.include)==null?void 0:i.join(","),exclude:(r=t.exclude)==null?void 0:r.join(",")}})},async fetchFeaturedWallets(){const{featuredWalletIds:t}=j.state;if(t!=null&&t.length){const e={...J._getSdkProperties(),page:1,entries:(t==null?void 0:t.length)??rg,include:t},{data:i}=await J.fetchWallets(e);i.sort((s,n)=>t.indexOf(s.id)-t.indexOf(n.id));const r=i.map(s=>s.image_id).filter(Boolean);await Promise.allSettled(r.map(s=>J._fetchWalletImage(s))),Oe.featured=i,Oe.allFeatured=i}},async fetchRecommendedWallets(){try{Oe.isFetchingRecommendedWallets=!0;const{includeWalletIds:t,excludeWalletIds:e,featuredWalletIds:i}=j.state,r=[...e??[],...i??[]].filter(Boolean),s=C.getRequestedCaipNetworkIds().join(","),n={page:1,entries:rg,include:t,exclude:r,chains:s},{data:o,count:a}=await J.fetchWallets(n),c=ie.getRecentWallets(),l=o.map(d=>d.image_id).filter(Boolean),u=c.map(d=>d.image_id).filter(Boolean);await Promise.allSettled([...l,...u].map(d=>J._fetchWalletImage(d))),Oe.recommended=o,Oe.allRecommended=o,Oe.count=a??0}catch{}finally{Oe.isFetchingRecommendedWallets=!1}},async fetchWalletsByPage({page:t}){const{includeWalletIds:e,excludeWalletIds:i,featuredWalletIds:r}=j.state,s=C.getRequestedCaipNetworkIds().join(","),n=[...Oe.recommended.map(({id:u})=>u),...i??[],...r??[]].filter(Boolean),o={page:t,entries:GE,include:e,exclude:n,chains:s},{data:a,count:c}=await J.fetchWallets(o),l=a.slice(0,ZE).map(u=>u.image_id).filter(Boolean);await Promise.allSettled(l.map(u=>J._fetchWalletImage(u))),Oe.wallets=q.uniqueBy([...Oe.wallets,...J._filterOutExtensions(a)],"id"),Oe.count=c>Oe.count?c:Oe.count,Oe.page=t},async initializeExcludedWallets({ids:t}){const e=C.getRequestedCaipNetworkIds().join(","),i={page:1,entries:t.length,include:t,chains:e},{data:r}=await J.fetchWallets(i);r&&r.forEach(s=>{Oe.excludedWallets.push({rdns:s.rdns,name:s.name})})},async searchWallet({search:t,badge:e}){const{includeWalletIds:i,excludeWalletIds:r}=j.state,s=C.getRequestedCaipNetworkIds().join(",");Oe.search=[];const n={page:1,entries:100,search:t==null?void 0:t.trim(),badge_type:e,include:i,exclude:r,chains:s},{data:o}=await J.fetchWallets(n);me.sendEvent({type:"track",event:"SEARCH_WALLET",properties:{badge:e??"",search:t??""}});const a=o.map(c=>c.image_id).filter(Boolean);await Promise.allSettled([...a.map(c=>J._fetchWalletImage(c)),q.wait(300)]),Oe.search=J._filterOutExtensions(o)},initPromise(t,e){return Oe.promises[t]||(Oe.promises[t]=e())},prefetch({fetchConnectorImages:t=!0,fetchFeaturedWallets:e=!0,fetchRecommendedWallets:i=!0,fetchNetworkImages:r=!0}={}){const s=[t&&J.initPromise("connectorImages",J.fetchConnectorImages),e&&J.initPromise("featuredWallets",J.fetchFeaturedWallets),i&&J.initPromise("recommendedWallets",J.fetchRecommendedWallets),r&&J.initPromise("networkImages",J.fetchNetworkImages)].filter(Boolean);return Promise.allSettled(s)},prefetchAnalyticsConfig(){var t;(t=j.state.features)!=null&&t.analytics&&J.fetchAnalyticsConfig()},async fetchAnalyticsConfig(){try{const{isAnalyticsEnabled:t}=await li.get({path:"/getAnalyticsConfig",params:J._getSdkProperties()});j.setFeatures({analytics:t})}catch{j.setFeatures({analytics:!1})}},setFilterByNamespace(t){if(!t){Oe.featured=Oe.allFeatured,Oe.recommended=Oe.allRecommended;return}const e=C.getRequestedCaipNetworkIds().join(",");Oe.featured=Oe.allFeatured.filter(i=>{var r;return(r=i.chains)==null?void 0:r.some(s=>e.includes(s))}),Oe.recommended=Oe.allRecommended.filter(i=>{var r;return(r=i.chains)==null?void 0:r.some(s=>e.includes(s))})}},ke=je({view:"Connect",history:["Connect"],transactionStack:[]}),Y={state:ke,subscribeKey(t,e){return Rt(ke,t,e)},pushTransactionStack(t){ke.transactionStack.push(t)},popTransactionStack(t){var i,r;const e=ke.transactionStack.pop();if(e)if(t)this.goBack(),(i=e==null?void 0:e.onCancel)==null||i.call(e);else{if(e.goBack)this.goBack();else if(e.replace){const s=ke.history.indexOf("ConnectingSiwe");s>0?this.goBackToIndex(s-1):(Ie.close(),ke.history=[])}else e.view&&this.reset(e.view);(r=e==null?void 0:e.onSuccess)==null||r.call(e)}},push(t,e){t!==ke.view&&(ke.view=t,ke.history.push(t),ke.data=e)},reset(t,e){ke.view=t,ke.history=[t],ke.data=e},replace(t,e){ke.history.at(-1)===t||(ke.view=t,ke.history[ke.history.length-1]=t,ke.data=e)},goBack(){var e;const t=!C.state.activeCaipAddress&&this.state.view==="ConnectingFarcaster";if(ke.history.length>1&&!ke.history.includes("UnsupportedChain")){ke.history.pop();const[i]=ke.history.slice(-1);i&&(ke.view=i)}else Ie.close();(e=ke.data)!=null&&e.wallet&&(ke.data.wallet=void 0),setTimeout(()=>{var i,r,s;if(t){ae.setFarcasterUrl(void 0,C.state.activeChain);const n=X.getAuthConnector();(i=n==null?void 0:n.provider)==null||i.reload();const o=Ca(j.state);(s=(r=n==null?void 0:n.provider)==null?void 0:r.syncDappData)==null||s.call(r,{metadata:o.metadata,sdkVersion:o.sdkVersion,projectId:o.projectId,sdkType:o.sdkType})}},100)},goBackToIndex(t){if(ke.history.length>1){ke.history=ke.history.slice(0,t+1);const[e]=ke.history.slice(-1);e&&(ke.view=e)}}},tr=je({themeMode:"dark",themeVariables:{},w3mThemeVariables:void 0}),st={state:tr,subscribe(t){return _t(tr,()=>t(tr))},setThemeMode(t){tr.themeMode=t;try{const e=X.getAuthConnector();if(e){const i=st.getSnapshot().themeVariables;e.provider.syncTheme({themeMode:t,themeVariables:i,w3mThemeVariables:jr(i,t)})}}catch{console.info("Unable to sync theme to auth connector")}},setThemeVariables(t){tr.themeVariables={...tr.themeVariables,...t};try{const e=X.getAuthConnector();if(e){const i=st.getSnapshot().themeVariables;e.provider.syncTheme({themeVariables:i,w3mThemeVariables:jr(tr.themeVariables,tr.themeMode)})}}catch{console.info("Unable to sync theme to auth connector")}},getSnapshot(){return Ca(tr)}},ym={eip155:void 0,solana:void 0,polkadot:void 0,bip122:void 0},Te=je({allConnectors:[],connectors:[],activeConnector:void 0,filterByNamespace:void 0,activeConnectorIds:{...ym}}),X={state:Te,subscribe(t){return _t(Te,()=>{t(Te)})},subscribeKey(t,e){return Rt(Te,t,e)},initialize(t){t.forEach(e=>{const i=ie.getConnectedConnectorId(e);i&&this.setConnectorId(i,e)})},setActiveConnector(t){t&&(Te.activeConnector=Hs(t))},setConnectors(t){t.filter(e=>!Te.allConnectors.some(i=>i.id===e.id&&this.getConnectorName(i.name)===this.getConnectorName(e.name)&&i.chain===e.chain)).forEach(e=>{e.type!=="MULTI_CHAIN"&&Te.allConnectors.push(Hs(e))}),Te.connectors=this.mergeMultiChainConnectors(Te.allConnectors)},removeAdapter(t){Te.allConnectors=Te.allConnectors.filter(e=>e.chain!==t),Te.connectors=this.mergeMultiChainConnectors(Te.allConnectors)},mergeMultiChainConnectors(t){const e=this.generateConnectorMapByName(t),i=[];return e.forEach(r=>{const s=r[0],n=(s==null?void 0:s.id)===re.CONNECTOR_ID.AUTH;r.length>1&&s?i.push({name:s.name,imageUrl:s.imageUrl,imageId:s.imageId,connectors:[...r],type:n?"AUTH":"MULTI_CHAIN",chain:"eip155",id:(s==null?void 0:s.id)||""}):s&&i.push(s)}),i},generateConnectorMapByName(t){const e=new Map;return t.forEach(i=>{const{name:r}=i,s=this.getConnectorName(r);if(!s)return;const n=e.get(s)||[];n.find(o=>o.chain===i.chain)||n.push(i),e.set(s,n)}),e},getConnectorName(t){return t&&({"Trust Wallet":"Trust"}[t]||t)},getUniqueConnectorsByName(t){const e=[];return t.forEach(i=>{e.find(r=>r.chain===i.chain)||e.push(i)}),e},addConnector(t){var e,i,r;if(t.id===re.CONNECTOR_ID.AUTH){const s=t,n=Ca(j.state),o=st.getSnapshot().themeMode,a=st.getSnapshot().themeVariables;(i=(e=s==null?void 0:s.provider)==null?void 0:e.syncDappData)==null||i.call(e,{metadata:n.metadata,sdkVersion:n.sdkVersion,projectId:n.projectId,sdkType:n.sdkType}),(r=s==null?void 0:s.provider)==null||r.syncTheme({themeMode:o,themeVariables:a,w3mThemeVariables:jr(a,o)}),this.setConnectors([t])}else this.setConnectors([t])},getAuthConnector(t){var r;const e=t||C.state.activeChain,i=Te.connectors.find(s=>s.id===re.CONNECTOR_ID.AUTH);if(i)return(r=i==null?void 0:i.connectors)!=null&&r.length?i.connectors.find(s=>s.chain===e):i},getAnnouncedConnectorRdns(){return Te.connectors.filter(t=>t.type==="ANNOUNCED").map(t=>{var e;return(e=t.info)==null?void 0:e.rdns})},getConnectorById(t){return Te.allConnectors.find(e=>e.id===t)},getConnector(t,e){return Te.allConnectors.filter(i=>i.chain===C.state.activeChain).find(i=>{var r;return i.explorerId===t||((r=i.info)==null?void 0:r.rdns)===e})},syncIfAuthConnector(t){var n,o;if(t.id!=="ID_AUTH")return;const e=t,i=Ca(j.state),r=st.getSnapshot().themeMode,s=st.getSnapshot().themeVariables;(o=(n=e==null?void 0:e.provider)==null?void 0:n.syncDappData)==null||o.call(n,{metadata:i.metadata,sdkVersion:i.sdkVersion,sdkType:i.sdkType,projectId:i.projectId}),e.provider.syncTheme({themeMode:r,themeVariables:s,w3mThemeVariables:jr(s,r)})},getConnectorsByNamespace(t){const e=Te.allConnectors.filter(i=>i.chain===t);return this.mergeMultiChainConnectors(e)},selectWalletConnector(t){const e=X.getConnector(t.id,t.rdns);C.state.activeChain===re.CHAIN.SOLANA&&jE.handleSolanaDeeplinkRedirect((e==null?void 0:e.name)||t.name||""),e?Y.push("ConnectingExternal",{connector:e}):Y.push("ConnectingWalletConnect",{wallet:t})},getConnectors(t){return t?this.getConnectorsByNamespace(t):this.mergeMultiChainConnectors(Te.allConnectors)},setFilterByNamespace(t){Te.filterByNamespace=t,Te.connectors=this.getConnectors(t),J.setFilterByNamespace(t)},setConnectorId(t,e){t&&(Te.activeConnectorIds={...Te.activeConnectorIds,[e]:t},ie.setConnectedConnectorId(e,t))},removeConnectorId(t){Te.activeConnectorIds={...Te.activeConnectorIds,[t]:void 0},ie.deleteConnectedConnectorId(t)},getConnectorId(t){if(t)return Te.activeConnectorIds[t]},isConnected(t){return t?!!Te.activeConnectorIds[t]:Object.values(Te.activeConnectorIds).some(e=>!!e)},resetConnectorIds(){Te.activeConnectorIds={...ym}}};function Nc(t,e){return X.getConnectorId(t)===e}function YE(t){const e=Array.from(C.state.chains.keys());let i=[];return t?(i.push([t,C.state.chains.get(t)]),Nc(t,re.CONNECTOR_ID.WALLET_CONNECT)?e.forEach(r=>{r!==t&&Nc(r,re.CONNECTOR_ID.WALLET_CONNECT)&&i.push([r,C.state.chains.get(r)])}):Nc(t,re.CONNECTOR_ID.AUTH)&&e.forEach(r=>{r!==t&&Nc(r,re.CONNECTOR_ID.AUTH)&&i.push([r,C.state.chains.get(r)])})):i=Array.from(C.state.chains.entries()),i}const Mr={SAFE_RPC_METHODS:["eth_accounts","eth_blockNumber","eth_call","eth_chainId","eth_estimateGas","eth_feeHistory","eth_gasPrice","eth_getAccount","eth_getBalance","eth_getBlockByHash","eth_getBlockByNumber","eth_getBlockReceipts","eth_getBlockTransactionCountByHash","eth_getBlockTransactionCountByNumber","eth_getCode","eth_getFilterChanges","eth_getFilterLogs","eth_getLogs","eth_getProof","eth_getStorageAt","eth_getTransactionByBlockHashAndIndex","eth_getTransactionByBlockNumberAndIndex","eth_getTransactionByHash","eth_getTransactionCount","eth_getTransactionReceipt","eth_getUncleCountByBlockHash","eth_getUncleCountByBlockNumber","eth_maxPriorityFeePerGas","eth_newBlockFilter","eth_newFilter","eth_newPendingTransactionFilter","eth_sendRawTransaction","eth_syncing","eth_uninstallFilter","wallet_getCapabilities","wallet_getCallsStatus","eth_getUserOperationReceipt","eth_estimateUserOperationGas","eth_getUserOperationByHash","eth_supportedEntryPoints","wallet_getAssets"],NOT_SAFE_RPC_METHODS:["personal_sign","eth_signTypedData_v4","eth_sendTransaction","solana_signMessage","solana_signTransaction","solana_signAllTransactions","solana_signAndSendTransaction","wallet_sendCalls","wallet_grantPermissions","wallet_revokePermissions","eth_sendUserOperation"],GET_CHAIN_ID:"eth_chainId",RPC_METHOD_NOT_ALLOWED_MESSAGE:"Requested RPC call is not allowed",RPC_METHOD_NOT_ALLOWED_UI_MESSAGE:"Action not allowed",ACCOUNT_TYPES:{EOA:"eoa",SMART_ACCOUNT:"smartAccount"}},Cs=Object.freeze({message:"",variant:"success",svg:void 0,open:!1,autoClose:!0}),tt=je({...Cs}),De={state:tt,subscribeKey(t,e){return Rt(tt,t,e)},showLoading(t,e={}){this._showMessage({message:t,variant:"loading",...e})},showSuccess(t){this._showMessage({message:t,variant:"success"})},showSvg(t,e){this._showMessage({message:t,svg:e})},showError(t){const e=q.parseError(t);this._showMessage({message:e,variant:"error"})},hide(){tt.message=Cs.message,tt.variant=Cs.variant,tt.svg=Cs.svg,tt.open=Cs.open,tt.autoClose=Cs.autoClose},_showMessage({message:t,svg:e,variant:i="success",autoClose:r=Cs.autoClose}){tt.open?(tt.open=!1,setTimeout(()=>{tt.message=t,tt.variant=i,tt.svg=e,tt.open=!0,tt.autoClose=r},150)):(tt.message=t,tt.variant=i,tt.svg=e,tt.open=!0,tt.autoClose=r)}},qr={getSIWX(){return j.state.siwx},async initializeIfEnabled(){var n;const t=j.state.siwx,e=C.getActiveCaipAddress();if(!(t&&e))return;const[i,r,s]=e.split(":");if(C.checkIfSupportedNetwork(i))try{if((await t.getSessions(`${i}:${r}`,s)).length)return;await Ie.open({view:"SIWXSignMessage"})}catch(o){console.error("SIWXUtil:initializeIfEnabled",o),me.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:this.getSIWXEventProperties()}),await((n=ne._getClient())==null?void 0:n.disconnect().catch(console.error)),Y.reset("Connect"),De.showError("A problem occurred while trying initialize authentication")}},async requestSignMessage(){const t=j.state.siwx,e=q.getPlainAddress(C.getActiveCaipAddress()),i=C.getActiveCaipNetwork(),r=ne._getClient();if(!t)throw new Error("SIWX is not enabled");if(!e)throw new Error("No ActiveCaipAddress found");if(!i)throw new Error("No ActiveCaipNetwork or client found");if(!r)throw new Error("No ConnectionController client found");try{const s=await t.createMessage({chainId:i.caipNetworkId,accountAddress:e}),n=s.toString();X.getConnectorId(i.chainNamespace)===re.CONNECTOR_ID.AUTH&&Y.pushTransactionStack({view:null,goBack:!1,replace:!0});const o=await r.signMessage(n);await t.addSession({data:s,message:n,signature:o}),Ie.close(),me.sendEvent({type:"track",event:"SIWX_AUTH_SUCCESS",properties:this.getSIWXEventProperties()})}catch(s){const n=this.getSIWXEventProperties();(!Ie.state.open||Y.state.view==="ApproveTransaction")&&await Ie.open({view:"SIWXSignMessage"}),n.isSmartAccount?De.showError("This application might not support Smart Accounts"):De.showError("Signature declined"),me.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:n}),console.error("SWIXUtil:requestSignMessage",s)}},async cancelSignMessage(){var t,e;try{(e=(t=this.getSIWX())==null?void 0:t.getRequired)!=null&&e.call(t)?await ne.disconnect():Ie.close(),Y.reset("Connect"),me.sendEvent({event:"CLICK_CANCEL_SIWX",type:"track",properties:this.getSIWXEventProperties()})}catch(i){console.error("SIWXUtil:cancelSignMessage",i)}},async getSessions(){const t=j.state.siwx,e=q.getPlainAddress(C.getActiveCaipAddress()),i=C.getActiveCaipNetwork();return t&&e&&i?t.getSessions(i.caipNetworkId,e):[]},async isSIWXCloseDisabled(){var e;const t=this.getSIWX();if(t){const i=Y.state.view==="ApproveTransaction",r=Y.state.view==="SIWXSignMessage";if(i||r)return((e=t.getRequired)==null?void 0:e.call(t))&&(await this.getSessions()).length===0}return!1},async universalProviderAuthenticate({universalProvider:t,chains:e,methods:i}){var a,c,l;const r=qr.getSIWX(),s=new Set(e.map(u=>u.split(":")[0]));if(!r||s.size!==1||!s.has("eip155"))return!1;const n=await r.createMessage({chainId:((a=C.getActiveCaipNetwork())==null?void 0:a.caipNetworkId)||"",accountAddress:""}),o=await t.authenticate({nonce:n.nonce,domain:n.domain,uri:n.uri,exp:n.expirationTime,iat:n.issuedAt,nbf:n.notBefore,requestId:n.requestId,version:n.version,resources:n.resources,statement:n.statement,chainId:n.chainId,methods:i,chains:[n.chainId,...e.filter(u=>u!==n.chainId)]});if(De.showLoading("Authenticating...",{autoClose:!1}),ae.setConnectedWalletInfo({...o.session.peer.metadata,name:o.session.peer.metadata.name,icon:(c=o.session.peer.metadata.icons)==null?void 0:c[0],type:"WALLET_CONNECT"},Array.from(s)[0]),(l=o==null?void 0:o.auths)==null?void 0:l.length){const u=o.auths.map(d=>{const h=t.client.formatAuthMessage({request:d.p,iss:d.p.iss});return{data:{...d.p,accountAddress:d.p.iss.split(":").slice(-1).join(""),chainId:d.p.iss.split(":").slice(2,4).join(":"),uri:d.p.aud,version:d.p.version||n.version,expirationTime:d.p.exp,issuedAt:d.p.iat,notBefore:d.p.nbf},message:h,signature:d.s.s,cacao:d}});try{await r.setSessions(u),me.sendEvent({type:"track",event:"SIWX_AUTH_SUCCESS",properties:qr.getSIWXEventProperties()})}catch(d){throw console.error("SIWX:universalProviderAuth - failed to set sessions",d),me.sendEvent({type:"track",event:"SIWX_AUTH_ERROR",properties:qr.getSIWXEventProperties()}),await t.disconnect().catch(console.error),d}finally{De.hide()}}return!0},getSIWXEventProperties(){var e,i;const t=C.state.activeChain;return{network:((e=C.state.activeCaipNetwork)==null?void 0:e.caipNetworkId)||"",isSmartAccount:((i=ae.state.preferredAccountTypes)==null?void 0:i[t])===Mr.ACCOUNT_TYPES.SMART_ACCOUNT}},async clearSessions(){const t=this.getSIWX();t&&await t.setSessions([])}},He=je({transactions:[],coinbaseTransactions:{},transactionsByYear:{},lastNetworkInView:void 0,loading:!1,empty:!1,next:void 0}),JE={state:He,subscribe(t){return _t(He,()=>t(He))},setLastNetworkInView(t){He.lastNetworkInView=t},async fetchTransactions(t,e){var i,r;if(!t)throw new Error("Transactions can't be fetched without an accountAddress");He.loading=!0;try{const s=await de.fetchTransactions({account:t,cursor:He.next,onramp:e,cache:e==="coinbase"?"no-cache":void 0,chainId:(i=C.state.activeCaipNetwork)==null?void 0:i.caipNetworkId}),n=this.filterSpamTransactions(s.data),o=this.filterByConnectedChain(n),a=[...He.transactions,...o];He.loading=!1,e==="coinbase"?He.coinbaseTransactions=this.groupTransactionsByYearAndMonth(He.coinbaseTransactions,s.data):(He.transactions=a,He.transactionsByYear=this.groupTransactionsByYearAndMonth(He.transactionsByYear,o)),He.empty=a.length===0,He.next=s.next?s.next:void 0}catch{const s=C.state.activeChain;me.sendEvent({type:"track",event:"ERROR_FETCH_TRANSACTIONS",properties:{address:t,projectId:j.state.projectId,cursor:He.next,isSmartAccount:((r=ae.state.preferredAccountTypes)==null?void 0:r[s])===Mr.ACCOUNT_TYPES.SMART_ACCOUNT}}),De.showError("Failed to fetch transactions"),He.loading=!1,He.empty=!0,He.next=void 0}},groupTransactionsByYearAndMonth(t={},e=[]){const i=t;return e.forEach(r=>{const s=new Date(r.metadata.minedAt).getFullYear(),n=new Date(r.metadata.minedAt).getMonth(),o=i[s]??{},a=(o[n]??[]).filter(c=>c.id!==r.id);i[s]={...o,[n]:[...a,r].sort((c,l)=>new Date(l.metadata.minedAt).getTime()-new Date(c.metadata.minedAt).getTime())}}),i},filterSpamTransactions(t){return t.filter(e=>!e.transfers.every(i=>{var r;return((r=i.nft_info)==null?void 0:r.flags.is_spam)===!0}))},filterByConnectedChain(t){var i;const e=(i=C.state.activeCaipNetwork)==null?void 0:i.caipNetworkId;return t.filter(r=>r.metadata.chain===e)},clearCursor(){He.next=void 0},resetTransactions(){He.transactions=[],He.transactionsByYear={},He.lastNetworkInView=void 0,He.loading=!1,He.empty=!1,He.next=void 0}},qe=je({wcError:!1,buffering:!1,status:"disconnected"});let gn;const ne={state:qe,subscribeKey(t,e){return Rt(qe,t,e)},_getClient(){return qe._client},setClient(t){qe._client=Hs(t)},async connectWalletConnect(){var t,e,i,r;if(q.isTelegram()||q.isSafari()&&q.isIos()){if(gn){await gn,gn=void 0;return}if(!q.isPairingExpired(qe==null?void 0:qe.wcPairingExpiry)){const s=qe.wcUri;qe.wcUri=s;return}gn=(e=(t=this._getClient())==null?void 0:t.connectWalletConnect)==null?void 0:e.call(t).catch(()=>{}),this.state.status="connecting",await gn,gn=void 0,qe.wcPairingExpiry=void 0,this.state.status="connected"}else await((r=(i=this._getClient())==null?void 0:i.connectWalletConnect)==null?void 0:r.call(i))},async connectExternal(t,e,i=!0){var r,s;await((s=(r=this._getClient())==null?void 0:r.connectExternal)==null?void 0:s.call(r,t)),i&&C.setActiveNamespace(e)},async reconnectExternal(t){var i,r;await((r=(i=this._getClient())==null?void 0:i.reconnectExternal)==null?void 0:r.call(i,t));const e=t.chain||C.state.activeChain;e&&X.setConnectorId(t.id,e)},async setPreferredAccountType(t,e){var r;Ie.setLoading(!0,C.state.activeChain);const i=X.getAuthConnector();i&&(ae.setPreferredAccountType(t,e),await i.provider.setPreferredAccount(t),ie.setPreferredAccountTypes(ae.state.preferredAccountTypes??{[e]:t}),await this.reconnectExternal(i),Ie.setLoading(!1,C.state.activeChain),me.sendEvent({type:"track",event:"SET_PREFERRED_ACCOUNT_TYPE",properties:{accountType:t,network:((r=C.state.activeCaipNetwork)==null?void 0:r.caipNetworkId)||""}}))},async signMessage(t){var e;return(e=this._getClient())==null?void 0:e.signMessage(t)},parseUnits(t,e){var i;return(i=this._getClient())==null?void 0:i.parseUnits(t,e)},formatUnits(t,e){var i;return(i=this._getClient())==null?void 0:i.formatUnits(t,e)},async sendTransaction(t){var e;return(e=this._getClient())==null?void 0:e.sendTransaction(t)},async getCapabilities(t){var e;return(e=this._getClient())==null?void 0:e.getCapabilities(t)},async grantPermissions(t){var e;return(e=this._getClient())==null?void 0:e.grantPermissions(t)},async walletGetAssets(t){var e;return((e=this._getClient())==null?void 0:e.walletGetAssets(t))??{}},async estimateGas(t){var e;return(e=this._getClient())==null?void 0:e.estimateGas(t)},async writeContract(t){var e;return(e=this._getClient())==null?void 0:e.writeContract(t)},async getEnsAddress(t){var e;return(e=this._getClient())==null?void 0:e.getEnsAddress(t)},async getEnsAvatar(t){var e;return(e=this._getClient())==null?void 0:e.getEnsAvatar(t)},checkInstalled(t){var e,i;return((i=(e=this._getClient())==null?void 0:e.checkInstalled)==null?void 0:i.call(e,t))||!1},resetWcConnection(){qe.wcUri=void 0,qe.wcPairingExpiry=void 0,qe.wcLinking=void 0,qe.recentWallet=void 0,qe.status="disconnected",JE.resetTransactions(),ie.deleteWalletConnectDeepLink()},resetUri(){qe.wcUri=void 0,qe.wcPairingExpiry=void 0},finalizeWcConnection(){var i,r;const{wcLinking:t,recentWallet:e}=ne.state;t&&ie.setWalletConnectDeepLink(t),e&&ie.setAppKitRecent(e),me.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:t?"mobile":"qrcode",name:((r=(i=Y.state.data)==null?void 0:i.wallet)==null?void 0:r.name)||"Unknown"}})},setWcBasic(t){qe.wcBasic=t},setUri(t){qe.wcUri=t,qe.wcPairingExpiry=q.getPairingExpiry()},setWcLinking(t){qe.wcLinking=t},setWcError(t){qe.wcError=t,qe.buffering=!1},setRecentWallet(t){qe.recentWallet=t},setBuffering(t){qe.buffering=t},setStatus(t){qe.status=t},async disconnect(t){try{Ie.setLoading(!0,t),await qr.clearSessions(),await C.disconnect(t),Ie.setLoading(!1,t),X.setFilterByNamespace(void 0)}catch{throw new Error("Failed to disconnect")}}},fn=je({loading:!1,open:!1,selectedNetworkId:void 0,activeChain:void 0,initialized:!1}),vr={state:fn,subscribe(t){return _t(fn,()=>t(fn))},subscribeOpen(t){return Rt(fn,"open",t)},set(t){Object.assign(fn,{...fn,...t})}};function sc(t,{strict:e=!0}={}){return!t||typeof t!="string"?!1:e?/^0x[0-9a-fA-F]*$/.test(t):t.startsWith("0x")}function Gr(t){return sc(t,{strict:!1})?Math.ceil((t.length-2)/2):t.length}const bm="2.27.0";let Io={getDocsUrl:({docsBaseUrl:t,docsPath:e="",docsSlug:i})=>e?`${t??"https://viem.sh"}${e}${i?`#${i}`:""}`:void 0,version:`viem@${bm}`};class ve extends Error{constructor(e,i={}){var a,c;const r=i.cause instanceof ve?i.cause.details:(a=i.cause)!=null&&a.message?i.cause.message:i.details,s=i.cause instanceof ve&&i.cause.docsPath||i.docsPath,n=(c=Io.getDocsUrl)==null?void 0:c.call(Io,{...i,docsPath:s}),o=[e||"An error occurred.","",...i.metaMessages?[...i.metaMessages,""]:[],...n?[`Docs: ${n}`]:[],...r?[`Details: ${r}`]:[],...Io.version?[`Version: ${Io.version}`]:[]].join(`
`);super(o,i.cause?{cause:i.cause}:void 0),Object.defineProperty(this,"details",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docsPath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"metaMessages",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"shortMessage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"version",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BaseError"}),this.details=r,this.docsPath=s,this.metaMessages=i.metaMessages,this.name=i.name??this.name,this.shortMessage=e,this.version=bm}walk(e){return vm(this,e)}}function vm(t,e){return e!=null&&e(t)?t:t&&typeof t=="object"&&"cause"in t&&t.cause!==void 0?vm(t.cause,e):e?null:t}class Cm extends ve{constructor({offset:e,position:i,size:r}){super(`Slice ${i==="start"?"starting":"ending"} at offset "${e}" is out-of-bounds (size: ${r}).`,{name:"SliceOffsetOutOfBoundsError"})}}class Em extends ve{constructor({size:e,targetSize:i,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (${e}) exceeds padding size (${i}).`,{name:"SizeExceedsPaddingSizeError"})}}function co(t,{dir:e,size:i=32}={}){return typeof t=="string"?XE(t,{dir:e,size:i}):QE(t,{dir:e,size:i})}function XE(t,{dir:e,size:i=32}={}){if(i===null)return t;const r=t.replace("0x","");if(r.length>i*2)throw new Em({size:Math.ceil(r.length/2),targetSize:i,type:"hex"});return`0x${r[e==="right"?"padEnd":"padStart"](i*2,"0")}`}function QE(t,{dir:e,size:i=32}={}){if(i===null)return t;if(t.length>i)throw new Em({size:t.length,targetSize:i,type:"bytes"});const r=new Uint8Array(i);for(let s=0;s<i;s++){const n=e==="right";r[n?s:i-s-1]=t[n?s:t.length-s-1]}return r}class ex extends ve{constructor({max:e,min:i,signed:r,size:s,value:n}){super(`Number "${n}" is not in safe ${s?`${s*8}-bit ${r?"signed":"unsigned"} `:""}integer range ${e?`(${i} to ${e})`:`(above ${i})`}`,{name:"IntegerOutOfRangeError"})}}class tx extends ve{constructor({givenSize:e,maxSize:i}){super(`Size cannot exceed ${i} bytes. Given size: ${e} bytes.`,{name:"SizeOverflowError"})}}function Vn(t,{dir:e="left"}={}){let i=typeof t=="string"?t.replace("0x",""):t,r=0;for(let s=0;s<i.length-1&&i[e==="left"?s:i.length-s-1].toString()==="0";s++)r++;return i=e==="left"?i.slice(r):i.slice(0,i.length-r),typeof t=="string"?(i.length===1&&e==="right"&&(i=`${i}0`),`0x${i.length%2===1?`0${i}`:i}`):i}function lo(t,{size:e}){if(Gr(t)>e)throw new tx({givenSize:Gr(t),maxSize:e})}function wr(t,e={}){const{signed:i}=e;e.size&&lo(t,{size:e.size});const r=BigInt(t);if(!i)return r;const s=(t.length-2)/2,n=(1n<<BigInt(s)*8n-1n)-1n;return r<=n?r:r-BigInt(`0x${"f".padStart(s*2,"f")}`)-1n}function Vl(t,e={}){return Number(wr(t,e))}const ix=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function he(t,e={}){return typeof t=="number"||typeof t=="bigint"?kt(t,e):typeof t=="string"?xm(t,e):typeof t=="boolean"?rx(t,e):Ir(t,e)}function rx(t,e={}){const i=`0x${Number(t)}`;return typeof e.size=="number"?(lo(i,{size:e.size}),co(i,{size:e.size})):i}function Ir(t,e={}){let i="";for(let s=0;s<t.length;s++)i+=ix[t[s]];const r=`0x${i}`;return typeof e.size=="number"?(lo(r,{size:e.size}),co(r,{dir:"right",size:e.size})):r}function kt(t,e={}){const{signed:i,size:r}=e,s=BigInt(t);let n;r?i?n=(1n<<BigInt(r)*8n-1n)-1n:n=2n**(BigInt(r)*8n)-1n:typeof t=="number"&&(n=BigInt(Number.MAX_SAFE_INTEGER));const o=typeof n=="bigint"&&i?-n-1n:0;if(n&&s>n||s<o){const c=typeof t=="bigint"?"n":"";throw new ex({max:n?`${n}${c}`:void 0,min:`${o}${c}`,signed:i,size:r,value:`${t}${c}`})}const a=`0x${(i&&s<0?(1n<<BigInt(r*8))+BigInt(s):s).toString(16)}`;return r?co(a,{size:r}):a}const sx=new TextEncoder;function xm(t,e={}){const i=sx.encode(t);return Ir(i,e)}const nx=new TextEncoder;function Im(t,e={}){return typeof t=="number"||typeof t=="bigint"?ax(t,e):typeof t=="boolean"?ox(t,e):sc(t)?qs(t,e):Am(t,e)}function ox(t,e={}){const i=new Uint8Array(1);return i[0]=Number(t),typeof e.size=="number"?(lo(i,{size:e.size}),co(i,{size:e.size})):i}const ir={zero:48,nine:57,A:65,F:70,a:97,f:102};function sg(t){if(t>=ir.zero&&t<=ir.nine)return t-ir.zero;if(t>=ir.A&&t<=ir.F)return t-(ir.A-10);if(t>=ir.a&&t<=ir.f)return t-(ir.a-10)}function qs(t,e={}){let i=t;e.size&&(lo(i,{size:e.size}),i=co(i,{dir:"right",size:e.size}));let r=i.slice(2);r.length%2&&(r=`0${r}`);const s=r.length/2,n=new Uint8Array(s);for(let o=0,a=0;o<s;o++){const c=sg(r.charCodeAt(a++)),l=sg(r.charCodeAt(a++));if(c===void 0||l===void 0)throw new ve(`Invalid byte sequence ("${r[a-2]}${r[a-1]}" in "${r}").`);n[o]=c*16+l}return n}function ax(t,e){const i=kt(t,e);return qs(i)}function Am(t,e={}){const i=nx.encode(t);return typeof e.size=="number"?(lo(i,{size:e.size}),co(i,{dir:"right",size:e.size})):i}function Kl(t){if(!Number.isSafeInteger(t)||t<0)throw new Error("positive integer expected, got "+t)}function cx(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function nc(t,...e){if(!cx(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function lx(t){if(typeof t!="function"||typeof t.create!="function")throw new Error("Hash should be wrapped by utils.wrapConstructor");Kl(t.outputLen),Kl(t.blockLen)}function Kn(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function _m(t,e){nc(t);const i=e.outputLen;if(t.length<i)throw new Error("digestInto() expects output buffer of length at least "+i)}const Sc=BigInt(2**32-1),ng=BigInt(32);function ux(t,e=!1){return e?{h:Number(t&Sc),l:Number(t>>ng&Sc)}:{h:Number(t>>ng&Sc)|0,l:Number(t&Sc)|0}}function dx(t,e=!1){let i=new Uint32Array(t.length),r=new Uint32Array(t.length);for(let s=0;s<t.length;s++){const{h:n,l:o}=ux(t[s],e);[i[s],r[s]]=[n,o]}return[i,r]}const hx=(t,e,i)=>t<<i|e>>>32-i,px=(t,e,i)=>e<<i|t>>>32-i,gx=(t,e,i)=>e<<i-32|t>>>64-i,fx=(t,e,i)=>t<<i-32|e>>>64-i,wn=typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0;function wx(t){return new Uint32Array(t.buffer,t.byteOffset,Math.floor(t.byteLength/4))}function od(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function Di(t,e){return t<<32-e|t>>>e}const og=new Uint8Array(new Uint32Array([287454020]).buffer)[0]===68;function mx(t){return t<<24&4278190080|t<<8&16711680|t>>>8&65280|t>>>24&255}function ag(t){for(let e=0;e<t.length;e++)t[e]=mx(t[e])}function yx(t){if(typeof t!="string")throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array(new TextEncoder().encode(t))}function bu(t){return typeof t=="string"&&(t=yx(t)),nc(t),t}function bx(...t){let e=0;for(let r=0;r<t.length;r++){const s=t[r];nc(s),e+=s.length}const i=new Uint8Array(e);for(let r=0,s=0;r<t.length;r++){const n=t[r];i.set(n,s),s+=n.length}return i}class Up{clone(){return this._cloneInto()}}function Nm(t){const e=r=>t().update(bu(r)).digest(),i=t();return e.outputLen=i.outputLen,e.blockLen=i.blockLen,e.create=()=>t(),e}function vx(t=32){if(wn&&typeof wn.getRandomValues=="function")return wn.getRandomValues(new Uint8Array(t));if(wn&&typeof wn.randomBytes=="function")return wn.randomBytes(t);throw new Error("crypto.getRandomValues must be defined")}const Sm=[],$m=[],km=[],Cx=BigInt(0),Ao=BigInt(1),Ex=BigInt(2),xx=BigInt(7),Ix=BigInt(256),Ax=BigInt(113);for(let t=0,e=Ao,i=1,r=0;t<24;t++){[i,r]=[r,(2*i+3*r)%5],Sm.push(2*(5*r+i)),$m.push((t+1)*(t+2)/2%64);let s=Cx;for(let n=0;n<7;n++)e=(e<<Ao^(e>>xx)*Ax)%Ix,e&Ex&&(s^=Ao<<(Ao<<BigInt(n))-Ao);km.push(s)}const[_x,Nx]=dx(km,!0),cg=(t,e,i)=>i>32?gx(t,e,i):hx(t,e,i),lg=(t,e,i)=>i>32?fx(t,e,i):px(t,e,i);function Sx(t,e=24){const i=new Uint32Array(10);for(let r=24-e;r<24;r++){for(let o=0;o<10;o++)i[o]=t[o]^t[o+10]^t[o+20]^t[o+30]^t[o+40];for(let o=0;o<10;o+=2){const a=(o+8)%10,c=(o+2)%10,l=i[c],u=i[c+1],d=cg(l,u,1)^i[a],h=lg(l,u,1)^i[a+1];for(let p=0;p<50;p+=10)t[o+p]^=d,t[o+p+1]^=h}let s=t[2],n=t[3];for(let o=0;o<24;o++){const a=$m[o],c=cg(s,n,a),l=lg(s,n,a),u=Sm[o];s=t[u],n=t[u+1],t[u]=c,t[u+1]=l}for(let o=0;o<50;o+=10){for(let a=0;a<10;a++)i[a]=t[o+a];for(let a=0;a<10;a++)t[o+a]^=~i[(a+2)%10]&i[(a+4)%10]}t[0]^=_x[r],t[1]^=Nx[r]}i.fill(0)}class Dp extends Up{constructor(e,i,r,s=!1,n=24){if(super(),this.blockLen=e,this.suffix=i,this.outputLen=r,this.enableXOF=s,this.rounds=n,this.pos=0,this.posOut=0,this.finished=!1,this.destroyed=!1,Kl(r),0>=this.blockLen||this.blockLen>=200)throw new Error("Sha3 supports only keccak-f1600 function");this.state=new Uint8Array(200),this.state32=wx(this.state)}keccak(){og||ag(this.state32),Sx(this.state32,this.rounds),og||ag(this.state32),this.posOut=0,this.pos=0}update(e){Kn(this);const{blockLen:i,state:r}=this;e=bu(e);const s=e.length;for(let n=0;n<s;){const o=Math.min(i-this.pos,s-n);for(let a=0;a<o;a++)r[this.pos++]^=e[n++];this.pos===i&&this.keccak()}return this}finish(){if(this.finished)return;this.finished=!0;const{state:e,suffix:i,pos:r,blockLen:s}=this;e[r]^=i,i&128&&r===s-1&&this.keccak(),e[s-1]^=128,this.keccak()}writeInto(e){Kn(this,!1),nc(e),this.finish();const i=this.state,{blockLen:r}=this;for(let s=0,n=e.length;s<n;){this.posOut>=r&&this.keccak();const o=Math.min(r-this.posOut,n-s);e.set(i.subarray(this.posOut,this.posOut+o),s),this.posOut+=o,s+=o}return e}xofInto(e){if(!this.enableXOF)throw new Error("XOF is not possible for this instance");return this.writeInto(e)}xof(e){return Kl(e),this.xofInto(new Uint8Array(e))}digestInto(e){if(_m(e,this),this.finished)throw new Error("digest() was already called");return this.writeInto(e),this.destroy(),e}digest(){return this.digestInto(new Uint8Array(this.outputLen))}destroy(){this.destroyed=!0,this.state.fill(0)}_cloneInto(e){const{blockLen:i,suffix:r,outputLen:s,rounds:n,enableXOF:o}=this;return e||(e=new Dp(i,r,s,o,n)),e.state32.set(this.state32),e.pos=this.pos,e.posOut=this.posOut,e.finished=this.finished,e.rounds=n,e.suffix=r,e.outputLen=s,e.enableXOF=o,e.destroyed=this.destroyed,e}}const $x=(t,e,i)=>Nm(()=>new Dp(e,t,i)),Pm=$x(1,136,256/8);function kx(t,e){const i=e||"hex",r=Pm(sc(t,{strict:!1})?Im(t):t);return i==="bytes"?r:he(r)}class Zr extends ve{constructor({address:e}){super(`Address "${e}" is invalid.`,{metaMessages:["- Address must be a hex value of 20 bytes (40 hex characters).","- Address must match its checksum counterpart."],name:"InvalidAddressError"})}}class vu extends Map{constructor(e){super(),Object.defineProperty(this,"maxSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.maxSize=e}get(e){const i=super.get(e);return super.has(e)&&i!==void 0&&(this.delete(e),super.set(e,i)),i}set(e,i){if(super.set(e,i),this.maxSize&&this.size>this.maxSize){const r=this.keys().next().value;r&&this.delete(r)}return this}}const ad=new vu(8192);function Px(t,e){if(ad.has(`${t}.${e}`))return ad.get(`${t}.${e}`);const i=e?`${e}${t.toLowerCase()}`:t.substring(2).toLowerCase(),r=kx(Am(i),"bytes"),s=(e?i.substring(`${e}0x`.length):i).split("");for(let o=0;o<40;o+=2)r[o>>1]>>4>=8&&s[o]&&(s[o]=s[o].toUpperCase()),(r[o>>1]&15)>=8&&s[o+1]&&(s[o+1]=s[o+1].toUpperCase());const n=`0x${s.join("")}`;return ad.set(`${t}.${e}`,n),n}const Ox=/^0x[a-fA-F0-9]{40}$/,cd=new vu(8192);function Er(t,e){const{strict:i=!0}=e??{},r=`${t}.${i}`;if(cd.has(r))return cd.get(r);const s=Ox.test(t)?t.toLowerCase()===t?!0:i?Px(t)===t:!0:!1;return cd.set(r,s),s}function uo(t){return`0x${t.reduce((e,i)=>e+i.replace("0x",""),"")}`}function Tx(t,e,i,{strict:r}={}){return sc(t,{strict:!1})?Lx(t,e,i,{strict:r}):Rx(t,e,i,{strict:r})}function Om(t,e){if(typeof e=="number"&&e>0&&e>Gr(t)-1)throw new Cm({offset:e,position:"start",size:Gr(t)})}function Tm(t,e,i){if(typeof e=="number"&&typeof i=="number"&&Gr(t)!==i-e)throw new Cm({offset:i,position:"end",size:Gr(t)})}function Rx(t,e,i,{strict:r}={}){Om(t,e);const s=t.slice(e,i);return r&&Tm(s,e,i),s}function Lx(t,e,i,{strict:r}={}){Om(t,e);const s=`0x${t.replace("0x","").slice((e??0)*2,(i??t.length)*2)}`;return r&&Tm(s,e,i),s}class ug extends ve{constructor({offset:e}){super(`Offset \`${e}\` cannot be negative.`,{name:"NegativeOffsetError"})}}class Mx extends ve{constructor({length:e,position:i}){super(`Position \`${i}\` is out of bounds (\`0 < position < ${e}\`).`,{name:"PositionOutOfBoundsError"})}}class Bx extends ve{constructor({count:e,limit:i}){super(`Recursive read limit of \`${i}\` exceeded (recursive read count: \`${e}\`).`,{name:"RecursiveReadLimitExceededError"})}}const Ux={bytes:new Uint8Array,dataView:new DataView(new ArrayBuffer(0)),position:0,positionReadCount:new Map,recursiveReadCount:0,recursiveReadLimit:Number.POSITIVE_INFINITY,assertReadLimit(){if(this.recursiveReadCount>=this.recursiveReadLimit)throw new Bx({count:this.recursiveReadCount+1,limit:this.recursiveReadLimit})},assertPosition(t){if(t<0||t>this.bytes.length-1)throw new Mx({length:this.bytes.length,position:t})},decrementPosition(t){if(t<0)throw new ug({offset:t});const e=this.position-t;this.assertPosition(e),this.position=e},getReadCount(t){return this.positionReadCount.get(t||this.position)||0},incrementPosition(t){if(t<0)throw new ug({offset:t});const e=this.position+t;this.assertPosition(e),this.position=e},inspectByte(t){const e=t??this.position;return this.assertPosition(e),this.bytes[e]},inspectBytes(t,e){const i=e??this.position;return this.assertPosition(i+t-1),this.bytes.subarray(i,i+t)},inspectUint8(t){const e=t??this.position;return this.assertPosition(e),this.bytes[e]},inspectUint16(t){const e=t??this.position;return this.assertPosition(e+1),this.dataView.getUint16(e)},inspectUint24(t){const e=t??this.position;return this.assertPosition(e+2),(this.dataView.getUint16(e)<<8)+this.dataView.getUint8(e+2)},inspectUint32(t){const e=t??this.position;return this.assertPosition(e+3),this.dataView.getUint32(e)},pushByte(t){this.assertPosition(this.position),this.bytes[this.position]=t,this.position++},pushBytes(t){this.assertPosition(this.position+t.length-1),this.bytes.set(t,this.position),this.position+=t.length},pushUint8(t){this.assertPosition(this.position),this.bytes[this.position]=t,this.position++},pushUint16(t){this.assertPosition(this.position+1),this.dataView.setUint16(this.position,t),this.position+=2},pushUint24(t){this.assertPosition(this.position+2),this.dataView.setUint16(this.position,t>>8),this.dataView.setUint8(this.position+2,t&255),this.position+=3},pushUint32(t){this.assertPosition(this.position+3),this.dataView.setUint32(this.position,t),this.position+=4},readByte(){this.assertReadLimit(),this._touch();const t=this.inspectByte();return this.position++,t},readBytes(t,e){this.assertReadLimit(),this._touch();const i=this.inspectBytes(t);return this.position+=e??t,i},readUint8(){this.assertReadLimit(),this._touch();const t=this.inspectUint8();return this.position+=1,t},readUint16(){this.assertReadLimit(),this._touch();const t=this.inspectUint16();return this.position+=2,t},readUint24(){this.assertReadLimit(),this._touch();const t=this.inspectUint24();return this.position+=3,t},readUint32(){this.assertReadLimit(),this._touch();const t=this.inspectUint32();return this.position+=4,t},get remaining(){return this.bytes.length-this.position},setPosition(t){const e=this.position;return this.assertPosition(t),this.position=t,()=>this.position=e},_touch(){if(this.recursiveReadLimit===Number.POSITIVE_INFINITY)return;const t=this.getReadCount();this.positionReadCount.set(this.position,t+1),t>0&&this.recursiveReadCount++}};function Rm(t,{recursiveReadLimit:e=8192}={}){const i=Object.create(Ux);return i.bytes=t,i.dataView=new DataView(t.buffer,t.byteOffset,t.byteLength),i.positionReadCount=new Map,i.recursiveReadLimit=e,i}const Rs=(t,e,i)=>JSON.stringify(t,(r,s)=>{const n=typeof s=="bigint"?s.toString():s;return typeof e=="function"?e(r,n):n},i),Dx={ether:-9,wei:9};function Lm(t,e){let i=t.toString();const r=i.startsWith("-");r&&(i=i.slice(1)),i=i.padStart(e,"0");let[s,n]=[i.slice(0,i.length-e),i.slice(i.length-e)];return n=n.replace(/(0+)$/,""),`${r?"-":""}${s||"0"}${n?`.${n}`:""}`}function tp(t,e="wei"){return Lm(t,Dx[e])}function jx(t){const e=Object.entries(t).map(([r,s])=>s===void 0||s===!1?null:[r,s]).filter(Boolean),i=e.reduce((r,[s])=>Math.max(r,s.length),0);return e.map(([r,s])=>`  ${`${r}:`.padEnd(i+1)}  ${s}`).join(`
`)}class zx extends ve{constructor({v:e}){super(`Invalid \`v\` value "${e}". Expected 27 or 28.`,{name:"InvalidLegacyVError"})}}class Fx extends ve{constructor({transaction:e}){super("Cannot infer a transaction type from provided transaction.",{metaMessages:["Provided Transaction:","{",jx(e),"}","","To infer the type, either provide:","- a `type` to the Transaction, or","- an EIP-1559 Transaction with `maxFeePerGas`, or","- an EIP-2930 Transaction with `gasPrice` & `accessList`, or","- an EIP-4844 Transaction with `blobs`, `blobVersionedHashes`, `sidecars`, or","- an EIP-7702 Transaction with `authorizationList`, or","- a Legacy Transaction with `gasPrice`"],name:"InvalidSerializableTransactionError"})}}class Hx extends ve{constructor({storageKey:e}){super(`Size for storage key "${e}" is invalid. Expected 32 bytes. Got ${Math.floor((e.length-2)/2)} bytes.`,{name:"InvalidStorageKeySizeError"})}}const jp=t=>t;class la extends ve{constructor({body:e,cause:i,details:r,headers:s,status:n,url:o}){super("HTTP request failed.",{cause:i,details:r,metaMessages:[n&&`Status: ${n}`,`URL: ${jp(o)}`,e&&`Request body: ${Rs(e)}`].filter(Boolean),name:"HttpRequestError"}),Object.defineProperty(this,"body",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"headers",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"status",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"url",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.body=e,this.headers=s,this.status=n,this.url=o}}class Mm extends ve{constructor({body:e,error:i,url:r}){super("RPC Request failed.",{cause:i,details:i.message,metaMessages:[`URL: ${jp(r)}`,`Request body: ${Rs(e)}`],name:"RpcRequestError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.code=i.code,this.data=i.data}}class dg extends ve{constructor({body:e,url:i}){super("The request took too long to respond.",{details:"The request timed out.",metaMessages:[`URL: ${jp(i)}`,`Request body: ${Rs(e)}`],name:"TimeoutError"})}}const qx=-1;class Vt extends ve{constructor(e,{code:i,docsPath:r,metaMessages:s,name:n,shortMessage:o}){super(o,{cause:e,docsPath:r,metaMessages:s||(e==null?void 0:e.metaMessages),name:n||"RpcError"}),Object.defineProperty(this,"code",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.name=n||e.name,this.code=e instanceof Mm?e.code:i??qx}}class oi extends Vt{constructor(e,i){super(e,i),Object.defineProperty(this,"data",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.data=i.data}}class Ea extends Vt{constructor(e){super(e,{code:Ea.code,name:"ParseRpcError",shortMessage:"Invalid JSON was received by the server. An error occurred on the server while parsing the JSON text."})}}Object.defineProperty(Ea,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32700});class xa extends Vt{constructor(e){super(e,{code:xa.code,name:"InvalidRequestRpcError",shortMessage:"JSON is not a valid request object."})}}Object.defineProperty(xa,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32600});class Ia extends Vt{constructor(e,{method:i}={}){super(e,{code:Ia.code,name:"MethodNotFoundRpcError",shortMessage:`The method${i?` "${i}"`:""} does not exist / is not available.`})}}Object.defineProperty(Ia,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32601});class Aa extends Vt{constructor(e){super(e,{code:Aa.code,name:"InvalidParamsRpcError",shortMessage:["Invalid parameters were provided to the RPC method.","Double check you have provided the correct parameters."].join(`
`)})}}Object.defineProperty(Aa,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32602});class Gn extends Vt{constructor(e){super(e,{code:Gn.code,name:"InternalRpcError",shortMessage:"An internal error was received."})}}Object.defineProperty(Gn,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32603});class _a extends Vt{constructor(e){super(e,{code:_a.code,name:"InvalidInputRpcError",shortMessage:["Missing or invalid parameters.","Double check you have provided the correct parameters."].join(`
`)})}}Object.defineProperty(_a,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32e3});class Na extends Vt{constructor(e){super(e,{code:Na.code,name:"ResourceNotFoundRpcError",shortMessage:"Requested resource not found."}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"ResourceNotFoundRpcError"})}}Object.defineProperty(Na,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32001});class Sa extends Vt{constructor(e){super(e,{code:Sa.code,name:"ResourceUnavailableRpcError",shortMessage:"Requested resource not available."})}}Object.defineProperty(Sa,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32002});class Zn extends Vt{constructor(e){super(e,{code:Zn.code,name:"TransactionRejectedRpcError",shortMessage:"Transaction creation failed."})}}Object.defineProperty(Zn,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32003});class $s extends Vt{constructor(e,{method:i}={}){super(e,{code:$s.code,name:"MethodNotSupportedRpcError",shortMessage:`Method${i?` "${i}"`:""} is not supported.`})}}Object.defineProperty($s,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32004});class Yn extends Vt{constructor(e){super(e,{code:Yn.code,name:"LimitExceededRpcError",shortMessage:"Request exceeds defined limit."})}}Object.defineProperty(Yn,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32005});class $a extends Vt{constructor(e){super(e,{code:$a.code,name:"JsonRpcVersionUnsupportedError",shortMessage:"Version of JSON-RPC protocol is not supported."})}}Object.defineProperty($a,"code",{enumerable:!0,configurable:!0,writable:!0,value:-32006});class Ls extends oi{constructor(e){super(e,{code:Ls.code,name:"UserRejectedRequestError",shortMessage:"User rejected the request."})}}Object.defineProperty(Ls,"code",{enumerable:!0,configurable:!0,writable:!0,value:4001});class ka extends oi{constructor(e){super(e,{code:ka.code,name:"UnauthorizedProviderError",shortMessage:"The requested method and/or account has not been authorized by the user."})}}Object.defineProperty(ka,"code",{enumerable:!0,configurable:!0,writable:!0,value:4100});class Pa extends oi{constructor(e,{method:i}={}){super(e,{code:Pa.code,name:"UnsupportedProviderMethodError",shortMessage:`The Provider does not support the requested method${i?` " ${i}"`:""}.`})}}Object.defineProperty(Pa,"code",{enumerable:!0,configurable:!0,writable:!0,value:4200});class Oa extends oi{constructor(e){super(e,{code:Oa.code,name:"ProviderDisconnectedError",shortMessage:"The Provider is disconnected from all chains."})}}Object.defineProperty(Oa,"code",{enumerable:!0,configurable:!0,writable:!0,value:4900});class Ta extends oi{constructor(e){super(e,{code:Ta.code,name:"ChainDisconnectedError",shortMessage:"The Provider is not connected to the requested chain."})}}Object.defineProperty(Ta,"code",{enumerable:!0,configurable:!0,writable:!0,value:4901});class Ra extends oi{constructor(e){super(e,{code:Ra.code,name:"SwitchChainError",shortMessage:"An error occurred when attempting to switch chain."})}}Object.defineProperty(Ra,"code",{enumerable:!0,configurable:!0,writable:!0,value:4902});class La extends oi{constructor(e){super(e,{code:La.code,name:"UnsupportedNonOptionalCapabilityError",shortMessage:"This Wallet does not support a capability that was not marked as optional."})}}Object.defineProperty(La,"code",{enumerable:!0,configurable:!0,writable:!0,value:5700});class Ma extends oi{constructor(e){super(e,{code:Ma.code,name:"UnsupportedChainIdError",shortMessage:"This Wallet does not support the requested chain ID."})}}Object.defineProperty(Ma,"code",{enumerable:!0,configurable:!0,writable:!0,value:5710});class Ba extends oi{constructor(e){super(e,{code:Ba.code,name:"DuplicateIdError",shortMessage:"There is already a bundle submitted with this ID."})}}Object.defineProperty(Ba,"code",{enumerable:!0,configurable:!0,writable:!0,value:5720});class Ua extends oi{constructor(e){super(e,{code:Ua.code,name:"UnknownBundleIdError",shortMessage:"This bundle id is unknown / has not been submitted"})}}Object.defineProperty(Ua,"code",{enumerable:!0,configurable:!0,writable:!0,value:5730});class Da extends oi{constructor(e){super(e,{code:Da.code,name:"BundleTooLargeError",shortMessage:"The call bundle is too large for the Wallet to process."})}}Object.defineProperty(Da,"code",{enumerable:!0,configurable:!0,writable:!0,value:5740});class ja extends oi{constructor(e){super(e,{code:ja.code,name:"AtomicReadyWalletRejectedUpgradeError",shortMessage:"The Wallet can support atomicity after an upgrade, but the user rejected the upgrade."})}}Object.defineProperty(ja,"code",{enumerable:!0,configurable:!0,writable:!0,value:5750});class za extends oi{constructor(e){super(e,{code:za.code,name:"AtomicityNotSupportedError",shortMessage:"The wallet does not support atomic execution but the request requires it."})}}Object.defineProperty(za,"code",{enumerable:!0,configurable:!0,writable:!0,value:5760});class Wx extends Vt{constructor(e){super(e,{name:"UnknownRpcError",shortMessage:"An unknown RPC error occurred."})}}function Ys(t,e="hex"){const i=Bm(t),r=Rm(new Uint8Array(i.length));return i.encode(r),e==="hex"?Ir(r.bytes):r.bytes}function Bm(t){return Array.isArray(t)?Vx(t.map(e=>Bm(e))):Kx(t)}function Vx(t){const e=t.reduce((r,s)=>r+s.length,0),i=Um(e);return{length:e<=55?1+e:1+i+e,encode(r){e<=55?r.pushByte(192+e):(r.pushByte(247+i),i===1?r.pushUint8(e):i===2?r.pushUint16(e):i===3?r.pushUint24(e):r.pushUint32(e));for(const{encode:s}of t)s(r)}}}function Kx(t){const e=typeof t=="string"?qs(t):t,i=Um(e.length);return{length:e.length===1&&e[0]<128?1:e.length<=55?1+e.length:1+i+e.length,encode(r){e.length===1&&e[0]<128?r.pushBytes(e):e.length<=55?(r.pushByte(128+e.length),r.pushBytes(e)):(r.pushByte(183+i),i===1?r.pushUint8(e.length):i===2?r.pushUint16(e.length):i===3?r.pushUint24(e.length):r.pushUint32(e.length),r.pushBytes(e))}}}function Um(t){if(t<2**8)return 1;if(t<2**16)return 2;if(t<2**24)return 3;if(t<2**32)return 4;throw new ve("Length is too large.")}class ip extends ve{constructor({cause:e,message:i}={}){var s;const r=(s=i==null?void 0:i.replace("execution reverted: ",""))==null?void 0:s.replace("execution reverted","");super(`Execution reverted ${r?`with reason: ${r}`:"for an unknown reason"}.`,{cause:e,name:"ExecutionRevertedError"})}}Object.defineProperty(ip,"code",{enumerable:!0,configurable:!0,writable:!0,value:3}),Object.defineProperty(ip,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/execution reverted/});class oc extends ve{constructor({cause:e,maxFeePerGas:i}={}){super(`The fee cap (\`maxFeePerGas\`${i?` = ${tp(i)} gwei`:""}) cannot be higher than the maximum allowed value (2^256-1).`,{cause:e,name:"FeeCapTooHighError"})}}Object.defineProperty(oc,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max fee per gas higher than 2\^256-1|fee cap higher than 2\^256-1/});class zp extends ve{constructor({cause:e,maxPriorityFeePerGas:i,maxFeePerGas:r}={}){super([`The provided tip (\`maxPriorityFeePerGas\`${i?` = ${tp(i)} gwei`:""}) cannot be higher than the fee cap (\`maxFeePerGas\`${r?` = ${tp(r)} gwei`:""}).`].join(`
`),{cause:e,name:"TipAboveFeeCapError"})}}Object.defineProperty(zp,"nodeMessage",{enumerable:!0,configurable:!0,writable:!0,value:/max priority fee per gas higher than max fee per gas|tip higher than fee cap/});function Cu(t,e){return({exclude:i,format:r})=>({exclude:i,format:s=>{const n=e(s);if(i)for(const o of i)delete n[o];return{...n,...r(s)}},type:t})}const Gx={legacy:"0x0",eip2930:"0x1",eip1559:"0x2",eip4844:"0x3",eip7702:"0x4"};function Zx(t){const e={};return typeof t.authorizationList<"u"&&(e.authorizationList=Jx(t.authorizationList)),typeof t.accessList<"u"&&(e.accessList=t.accessList),typeof t.blobVersionedHashes<"u"&&(e.blobVersionedHashes=t.blobVersionedHashes),typeof t.blobs<"u"&&(typeof t.blobs[0]!="string"?e.blobs=t.blobs.map(i=>Ir(i)):e.blobs=t.blobs),typeof t.data<"u"&&(e.data=t.data),typeof t.from<"u"&&(e.from=t.from),typeof t.gas<"u"&&(e.gas=kt(t.gas)),typeof t.gasPrice<"u"&&(e.gasPrice=kt(t.gasPrice)),typeof t.maxFeePerBlobGas<"u"&&(e.maxFeePerBlobGas=kt(t.maxFeePerBlobGas)),typeof t.maxFeePerGas<"u"&&(e.maxFeePerGas=kt(t.maxFeePerGas)),typeof t.maxPriorityFeePerGas<"u"&&(e.maxPriorityFeePerGas=kt(t.maxPriorityFeePerGas)),typeof t.nonce<"u"&&(e.nonce=kt(t.nonce)),typeof t.to<"u"&&(e.to=t.to),typeof t.type<"u"&&(e.type=Gx[t.type]),typeof t.value<"u"&&(e.value=kt(t.value)),e}const Yx=Cu("transactionRequest",Zx);function Jx(t){return t.map(e=>({address:e.address,r:e.r?kt(BigInt(e.r)):e.r,s:e.s?kt(BigInt(e.s)):e.s,chainId:kt(e.chainId),nonce:kt(e.nonce),...typeof e.yParity<"u"?{yParity:kt(e.yParity)}:{},...typeof e.v<"u"&&typeof e.yParity>"u"?{v:kt(e.v)}:{}}))}const Eu=2n**256n-1n,Dm={"0x0":"legacy","0x1":"eip2930","0x2":"eip1559","0x3":"eip4844","0x4":"eip7702"};function xu(t){const e={...t,blockHash:t.blockHash?t.blockHash:null,blockNumber:t.blockNumber?BigInt(t.blockNumber):null,chainId:t.chainId?Vl(t.chainId):void 0,gas:t.gas?BigInt(t.gas):void 0,gasPrice:t.gasPrice?BigInt(t.gasPrice):void 0,maxFeePerBlobGas:t.maxFeePerBlobGas?BigInt(t.maxFeePerBlobGas):void 0,maxFeePerGas:t.maxFeePerGas?BigInt(t.maxFeePerGas):void 0,maxPriorityFeePerGas:t.maxPriorityFeePerGas?BigInt(t.maxPriorityFeePerGas):void 0,nonce:t.nonce?Vl(t.nonce):void 0,to:t.to?t.to:null,transactionIndex:t.transactionIndex?Number(t.transactionIndex):null,type:t.type?Dm[t.type]:void 0,typeHex:t.type?t.type:void 0,value:t.value?BigInt(t.value):void 0,v:t.v?BigInt(t.v):void 0};return t.authorizationList&&(e.authorizationList=Xx(t.authorizationList)),e.yParity=(()=>{if(t.yParity)return Number(t.yParity);if(typeof e.v=="bigint"){if(e.v===0n||e.v===27n)return 0;if(e.v===1n||e.v===28n)return 1;if(e.v>=35n)return e.v%2n===0n?1:0}})(),e.type==="legacy"&&(delete e.accessList,delete e.maxFeePerBlobGas,delete e.maxFeePerGas,delete e.maxPriorityFeePerGas,delete e.yParity),e.type==="eip2930"&&(delete e.maxFeePerBlobGas,delete e.maxFeePerGas,delete e.maxPriorityFeePerGas),e.type==="eip1559"&&delete e.maxFeePerBlobGas,e}const jm=Cu("transaction",xu);function Xx(t){return t.map(e=>({address:e.address,chainId:Number(e.chainId),nonce:Number(e.nonce),r:e.r,s:e.s,yParity:Number(e.yParity)}))}function Qx(t){const e=(t.transactions??[]).map(i=>typeof i=="string"?i:xu(i));return{...t,baseFeePerGas:t.baseFeePerGas?BigInt(t.baseFeePerGas):null,blobGasUsed:t.blobGasUsed?BigInt(t.blobGasUsed):void 0,difficulty:t.difficulty?BigInt(t.difficulty):void 0,excessBlobGas:t.excessBlobGas?BigInt(t.excessBlobGas):void 0,gasLimit:t.gasLimit?BigInt(t.gasLimit):void 0,gasUsed:t.gasUsed?BigInt(t.gasUsed):void 0,hash:t.hash?t.hash:null,logsBloom:t.logsBloom?t.logsBloom:null,nonce:t.nonce?t.nonce:null,number:t.number?BigInt(t.number):null,size:t.size?BigInt(t.size):void 0,timestamp:t.timestamp?BigInt(t.timestamp):void 0,transactions:e,totalDifficulty:t.totalDifficulty?BigInt(t.totalDifficulty):null}}const zm=Cu("block",Qx);function Fm(t){const{kzg:e}=t,i=t.to??(typeof t.blobs[0]=="string"?"hex":"bytes"),r=typeof t.blobs[0]=="string"?t.blobs.map(n=>qs(n)):t.blobs,s=[];for(const n of r)s.push(Uint8Array.from(e.blobToKzgCommitment(n)));return i==="bytes"?s:s.map(n=>Ir(n))}function Hm(t){const{kzg:e}=t,i=t.to??(typeof t.blobs[0]=="string"?"hex":"bytes"),r=typeof t.blobs[0]=="string"?t.blobs.map(o=>qs(o)):t.blobs,s=typeof t.commitments[0]=="string"?t.commitments.map(o=>qs(o)):t.commitments,n=[];for(let o=0;o<r.length;o++){const a=r[o],c=s[o];n.push(Uint8Array.from(e.computeBlobKzgProof(a,c)))}return i==="bytes"?n:n.map(o=>Ir(o))}function eI(t,e,i,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,i,r);const s=BigInt(32),n=BigInt(4294967295),o=Number(i>>s&n),a=Number(i&n),c=r?4:0,l=r?0:4;t.setUint32(e+c,o,r),t.setUint32(e+l,a,r)}function tI(t,e,i){return t&e^~t&i}function iI(t,e,i){return t&e^t&i^e&i}class rI extends Up{constructor(e,i,r,s){super(),this.blockLen=e,this.outputLen=i,this.padOffset=r,this.isLE=s,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(e),this.view=od(this.buffer)}update(e){Kn(this);const{view:i,buffer:r,blockLen:s}=this;e=bu(e);const n=e.length;for(let o=0;o<n;){const a=Math.min(s-this.pos,n-o);if(a===s){const c=od(e);for(;s<=n-o;o+=s)this.process(c,o);continue}r.set(e.subarray(o,o+a),this.pos),this.pos+=a,o+=a,this.pos===s&&(this.process(i,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){Kn(this),_m(e,this),this.finished=!0;const{buffer:i,view:r,blockLen:s,isLE:n}=this;let{pos:o}=this;i[o++]=128,this.buffer.subarray(o).fill(0),this.padOffset>s-o&&(this.process(r,0),o=0);for(let d=o;d<s;d++)i[d]=0;eI(r,s-8,BigInt(this.length*8),n),this.process(r,0);const a=od(e),c=this.outputLen;if(c%4)throw new Error("_sha2: outputLen should be aligned to 32bit");const l=c/4,u=this.get();if(l>u.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<l;d++)a.setUint32(4*d,u[d],n)}digest(){const{buffer:e,outputLen:i}=this;this.digestInto(e);const r=e.slice(0,i);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());const{blockLen:i,buffer:r,length:s,finished:n,destroyed:o,pos:a}=this;return e.length=s,e.pos=a,e.finished=n,e.destroyed=o,s%i&&e.buffer.set(r),e}}const sI=new Uint32Array([1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298]),kr=new Uint32Array([1779033703,3144134277,1013904242,2773480762,1359893119,2600822924,528734635,1541459225]),Pr=new Uint32Array(64);class nI extends rI{constructor(){super(64,32,8,!1),this.A=kr[0]|0,this.B=kr[1]|0,this.C=kr[2]|0,this.D=kr[3]|0,this.E=kr[4]|0,this.F=kr[5]|0,this.G=kr[6]|0,this.H=kr[7]|0}get(){const{A:e,B:i,C:r,D:s,E:n,F:o,G:a,H:c}=this;return[e,i,r,s,n,o,a,c]}set(e,i,r,s,n,o,a,c){this.A=e|0,this.B=i|0,this.C=r|0,this.D=s|0,this.E=n|0,this.F=o|0,this.G=a|0,this.H=c|0}process(e,i){for(let d=0;d<16;d++,i+=4)Pr[d]=e.getUint32(i,!1);for(let d=16;d<64;d++){const h=Pr[d-15],p=Pr[d-2],g=Di(h,7)^Di(h,18)^h>>>3,f=Di(p,17)^Di(p,19)^p>>>10;Pr[d]=f+Pr[d-7]+g+Pr[d-16]|0}let{A:r,B:s,C:n,D:o,E:a,F:c,G:l,H:u}=this;for(let d=0;d<64;d++){const h=Di(a,6)^Di(a,11)^Di(a,25),p=u+h+tI(a,c,l)+sI[d]+Pr[d]|0,g=(Di(r,2)^Di(r,13)^Di(r,22))+iI(r,s,n)|0;u=l,l=c,c=a,a=o+p|0,o=n,n=s,s=r,r=p+g|0}r=r+this.A|0,s=s+this.B|0,n=n+this.C|0,o=o+this.D|0,a=a+this.E|0,c=c+this.F|0,l=l+this.G|0,u=u+this.H|0,this.set(r,s,n,o,a,c,l,u)}roundClean(){Pr.fill(0)}destroy(){this.set(0,0,0,0,0,0,0,0),this.buffer.fill(0)}}const qm=Nm(()=>new nI);function oI(t,e){const i=e||"hex",r=qm(sc(t,{strict:!1})?Im(t):t);return i==="bytes"?r:he(r)}function aI(t){const{commitment:e,version:i=1}=t,r=t.to??(typeof e=="string"?"hex":"bytes"),s=oI(e,"bytes");return s.set([i],0),r==="bytes"?s:Ir(s)}function cI(t){const{commitments:e,version:i}=t,r=t.to??(typeof e[0]=="string"?"hex":"bytes"),s=[];for(const n of e)s.push(aI({commitment:n,to:r,version:i}));return s}const hg=6,Wm=32,Fp=4096,Vm=Wm*Fp,pg=Vm*hg-1-1*Fp*hg,Km=1;class lI extends ve{constructor({maxSize:e,size:i}){super("Blob size is too large.",{metaMessages:[`Max: ${e} bytes`,`Given: ${i} bytes`],name:"BlobSizeTooLargeError"})}}class Gm extends ve{constructor(){super("Blob data must not be empty.",{name:"EmptyBlobError"})}}class uI extends ve{constructor({hash:e,size:i}){super(`Versioned hash "${e}" size is invalid.`,{metaMessages:["Expected: 32",`Received: ${i}`],name:"InvalidVersionedHashSizeError"})}}class dI extends ve{constructor({hash:e,version:i}){super(`Versioned hash "${e}" version is invalid.`,{metaMessages:[`Expected: ${Km}`,`Received: ${i}`],name:"InvalidVersionedHashVersionError"})}}function hI(t){const e=t.to??(typeof t.data=="string"?"hex":"bytes"),i=typeof t.data=="string"?qs(t.data):t.data,r=Gr(i);if(!r)throw new Gm;if(r>pg)throw new lI({maxSize:pg,size:r});const s=[];let n=!0,o=0;for(;n;){const a=Rm(new Uint8Array(Vm));let c=0;for(;c<Fp;){const l=i.slice(o,o+(Wm-1));if(a.pushByte(0),a.pushBytes(l),l.length<31){a.pushByte(128),n=!1;break}c++,o+=31}s.push(a)}return e==="bytes"?s.map(a=>a.bytes):s.map(a=>Ir(a.bytes))}function pI(t){const{data:e,kzg:i,to:r}=t,s=t.blobs??hI({data:e,to:r}),n=t.commitments??Fm({blobs:s,kzg:i,to:r}),o=t.proofs??Hm({blobs:s,commitments:n,kzg:i,to:r}),a=[];for(let c=0;c<s.length;c++)a.push({blob:s[c],commitment:n[c],proof:o[c]});return a}function gI(t){if(t.type)return t.type;if(typeof t.authorizationList<"u")return"eip7702";if(typeof t.blobs<"u"||typeof t.blobVersionedHashes<"u"||typeof t.maxFeePerBlobGas<"u"||typeof t.sidecars<"u")return"eip4844";if(typeof t.maxFeePerGas<"u"||typeof t.maxPriorityFeePerGas<"u")return"eip1559";if(typeof t.gasPrice<"u")return typeof t.accessList<"u"?"eip2930":"legacy";throw new Fx({transaction:t})}function fI(t,{args:e,eventName:i}={}){return{...t,blockHash:t.blockHash?t.blockHash:null,blockNumber:t.blockNumber?BigInt(t.blockNumber):null,logIndex:t.logIndex?Number(t.logIndex):null,transactionHash:t.transactionHash?t.transactionHash:null,transactionIndex:t.transactionIndex?Number(t.transactionIndex):null,...i?{args:e,eventName:i}:{}}}class ac extends ve{constructor({chainId:e}){super(typeof e=="number"?`Chain ID "${e}" is invalid.`:"Chain ID is invalid.",{name:"InvalidChainIdError"})}}function wI(){let t=()=>{},e=()=>{};return{promise:new Promise((i,r)=>{t=i,e=r}),resolve:t,reject:e}}const ld=new Map;function mI({fn:t,id:e,shouldSplitBatch:i,wait:r=0,sort:s}){const n=async()=>{const u=c();o();const d=u.map(({args:h})=>h);d.length!==0&&t(d).then(h=>{s&&Array.isArray(h)&&h.sort(s);for(let p=0;p<u.length;p++){const{resolve:g}=u[p];g==null||g([h[p],h])}}).catch(h=>{for(let p=0;p<u.length;p++){const{reject:g}=u[p];g==null||g(h)}})},o=()=>ld.delete(e),a=()=>c().map(({args:u})=>u),c=()=>ld.get(e)||[],l=u=>ld.set(e,[...c(),u]);return{flush:o,async schedule(u){const{promise:d,resolve:h,reject:p}=wI();return i!=null&&i([...a(),u])&&n(),c().length>0?(l({args:u,resolve:h,reject:p}),d):(l({args:u,resolve:h,reject:p}),setTimeout(n,r),d)}}}async function Zm(t){return new Promise(e=>setTimeout(e,t))}new vu(128);const rp=256;let $c=rp,kc;function yI(t=11){if(!kc||$c+t>rp*2){kc="",$c=0;for(let e=0;e<rp;e++)kc+=(256+Math.random()*256|0).toString(16).substring(1)}return kc.substring($c,$c+++t)}const Pc=new vu(8192);function bI(t,{enabled:e=!0,id:i}){if(!e||!i)return t();if(Pc.get(i))return Pc.get(i);const r=t().finally(()=>Pc.delete(i));return Pc.set(i,r),r}function vI(t,{delay:e=100,retryCount:i=2,shouldRetry:r=()=>!0}={}){return new Promise((s,n)=>{const o=async({count:a=0}={})=>{const c=async({error:l})=>{const u=typeof e=="function"?e({count:a,error:l}):e;u&&await Zm(u),o({count:a+1})};try{const l=await t();s(l)}catch(l){if(a<i&&await r({count:a,error:l}))return c({error:l});n(l)}};o()})}function CI(t,e={}){return async(i,r={})=>{var d;const{dedupe:s=!1,methods:n,retryDelay:o=150,retryCount:a=3,uid:c}={...e,...r},{method:l}=i;if((d=n==null?void 0:n.exclude)!=null&&d.includes(l))throw new $s(new Error("method not supported"),{method:l});if(n!=null&&n.include&&!n.include.includes(l))throw new $s(new Error("method not supported"),{method:l});const u=s?xm(`${c}.${Rs(i)}`):void 0;return bI(()=>vI(async()=>{try{return await t(i)}catch(h){const p=h;switch(p.code){case Ea.code:throw new Ea(p);case xa.code:throw new xa(p);case Ia.code:throw new Ia(p,{method:i.method});case Aa.code:throw new Aa(p);case Gn.code:throw new Gn(p);case _a.code:throw new _a(p);case Na.code:throw new Na(p);case Sa.code:throw new Sa(p);case Zn.code:throw new Zn(p);case $s.code:throw new $s(p,{method:i.method});case Yn.code:throw new Yn(p);case $a.code:throw new $a(p);case Ls.code:throw new Ls(p);case ka.code:throw new ka(p);case Pa.code:throw new Pa(p);case Oa.code:throw new Oa(p);case Ta.code:throw new Ta(p);case Ra.code:throw new Ra(p);case La.code:throw new La(p);case Ma.code:throw new Ma(p);case Ba.code:throw new Ba(p);case Ua.code:throw new Ua(p);case Da.code:throw new Da(p);case ja.code:throw new ja(p);case za.code:throw new za(p);case 5e3:throw new Ls(p);default:throw h instanceof ve?h:new Wx(p)}}},{delay:({count:h,error:p})=>{var g;if(p&&p instanceof la){const f=(g=p==null?void 0:p.headers)==null?void 0:g.get("Retry-After");if(f!=null&&f.match(/\d/))return Number.parseInt(f)*1e3}return~~(1<<h)*o},retryCount:a,shouldRetry:({error:h})=>EI(h)}),{enabled:s,id:u})}}function EI(t){return"code"in t&&typeof t.code=="number"?t.code===-1||t.code===Yn.code||t.code===Gn.code:t instanceof la&&t.status?t.status===403||t.status===408||t.status===413||t.status===429||t.status===500||t.status===502||t.status===503||t.status===504:!0}function Ym({key:t,methods:e,name:i,request:r,retryCount:s=3,retryDelay:n=150,timeout:o,type:a},c){const l=yI();return{config:{key:t,methods:e,name:i,request:r,retryCount:s,retryDelay:n,timeout:o,type:a},request:CI(r,{methods:e,retryCount:s,retryDelay:n,uid:l}),value:c}}function gg(t,e={}){const{key:i="fallback",name:r="Fallback",rank:s=!1,shouldThrow:n=xI,retryCount:o,retryDelay:a}=e;return({chain:c,pollingInterval:l=4e3,timeout:u,...d})=>{let h=t,p=()=>{};const g=Ym({key:i,name:r,async request({method:f,params:w}){let m;const y=async(b=0)=>{const v=h[b]({...d,chain:c,retryCount:0,timeout:u});try{const S=await v.request({method:f,params:w});return p({method:f,params:w,response:S,transport:v,status:"success"}),S}catch(S){if(p({error:S,method:f,params:w,transport:v,status:"error"}),n(S)||b===h.length-1||(m??(m=h.slice(b+1).some(N=>{const{include:P,exclude:k}=N({chain:c}).config.methods||{};return P?P.includes(f):k?!k.includes(f):!0})),!m))throw S;return y(b+1)}};return y()},retryCount:o,retryDelay:a,type:"fallback"},{onResponse:f=>p=f,transports:h.map(f=>f({chain:c,retryCount:0}))});if(s){const f=typeof s=="object"?s:{};II({chain:c,interval:f.interval??l,onTransports:w=>h=w,ping:f.ping,sampleCount:f.sampleCount,timeout:f.timeout,transports:h,weights:f.weights})}return g}}function xI(t){return!!("code"in t&&typeof t.code=="number"&&(t.code===Zn.code||t.code===Ls.code||ip.nodeMessage.test(t.message)||t.code===5e3))}function II({chain:t,interval:e=4e3,onTransports:i,ping:r,sampleCount:s=10,timeout:n=1e3,transports:o,weights:a={}}){const{stability:c=.7,latency:l=.3}=a,u=[],d=async()=>{const h=await Promise.all(o.map(async f=>{const w=f({chain:t,retryCount:0,timeout:n}),m=Date.now();let y,b;try{await(r?r({transport:w}):w.request({method:"net_listening"})),b=1}catch{b=0}finally{y=Date.now()}return{latency:y-m,success:b}}));u.push(h),u.length>s&&u.shift();const p=Math.max(...u.map(f=>Math.max(...f.map(({latency:w})=>w)))),g=o.map((f,w)=>{const m=u.map(S=>S[w].latency),y=1-m.reduce((S,N)=>S+N,0)/m.length/p,b=u.map(S=>S[w].success),v=b.reduce((S,N)=>S+N,0)/b.length;return v===0?[0,w]:[l*y+c*v,w]}).sort((f,w)=>w[0]-f[0]);i(g.map(([,f])=>o[f])),await Zm(e),d()};d()}class AI extends ve{constructor(){super("No URL was provided to the Transport. Please provide a valid RPC URL to the Transport.",{docsPath:"/docs/clients/intro",name:"UrlRequiredError"})}}function _I(t,{errorInstance:e=new Error("timed out"),timeout:i,signal:r}){return new Promise((s,n)=>{(async()=>{let o;try{const a=new AbortController;i>0&&(o=setTimeout(()=>{r?a.abort():n(e)},i)),s(await t({signal:(a==null?void 0:a.signal)||null}))}catch(a){(a==null?void 0:a.name)==="AbortError"&&n(e),n(a)}finally{clearTimeout(o)}})()})}function NI(){return{current:0,take(){return this.current++},reset(){this.current=0}}}const fg=NI();function SI(t,e={}){return{async request(i){var d;const{body:r,onRequest:s=e.onRequest,onResponse:n=e.onResponse,timeout:o=e.timeout??1e4}=i,a={...e.fetchOptions??{},...i.fetchOptions??{}},{headers:c,method:l,signal:u}=a;try{const h=await _I(async({signal:g})=>{const f={...a,body:Array.isArray(r)?Rs(r.map(y=>({jsonrpc:"2.0",id:y.id??fg.take(),...y}))):Rs({jsonrpc:"2.0",id:r.id??fg.take(),...r}),headers:{"Content-Type":"application/json",...c},method:l||"POST",signal:u||(o>0?g:null)},w=new Request(t,f),m=await(s==null?void 0:s(w,f))??{...f,url:t};return await fetch(m.url??t,m)},{errorInstance:new dg({body:r,url:t}),timeout:o,signal:!0});n&&await n(h);let p;if((d=h.headers.get("Content-Type"))!=null&&d.startsWith("application/json"))p=await h.json();else{p=await h.text();try{p=JSON.parse(p||"{}")}catch(g){if(h.ok)throw g;p={error:p}}}if(!h.ok)throw new la({body:r,details:Rs(p.error)||h.statusText,headers:h.headers,status:h.status,url:t});return p}catch(h){throw h instanceof la||h instanceof dg?h:new la({body:r,cause:h,url:t})}}}}function Oc(t,e={}){const{batch:i,fetchOptions:r,key:s="http",methods:n,name:o="HTTP JSON-RPC",onFetchRequest:a,onFetchResponse:c,retryDelay:l,raw:u}=e;return({chain:d,retryCount:h,timeout:p})=>{const{batchSize:g=1e3,wait:f=0}=typeof i=="object"?i:{},w=e.retryCount??h,m=p??e.timeout??1e4,y=t||(d==null?void 0:d.rpcUrls.default.http[0]);if(!y)throw new AI;const b=SI(y,{fetchOptions:r,onRequest:a,onResponse:c,timeout:m});return Ym({key:s,methods:n,name:o,async request({method:v,params:S}){const N={method:v,params:S},{schedule:P}=mI({id:y,wait:f,shouldSplitBatch(L){return L.length>g},fn:L=>b.request({body:L}),sort:(L,U)=>L.id-U.id}),k=async L=>i?P(L):[await b.request({body:L})],[{error:_,result:M}]=await k(N);if(u)return{error:_,result:M};if(_)throw new Mm({body:N,error:_,url:y});return M},retryCount:w,retryDelay:l,timeout:m,type:"http"},{fetchOptions:r,url:y})}}function Ri(t){return{formatters:void 0,fees:void 0,serializers:void 0,...t}}function $I(t){const{authorizationList:e}=t;if(e)for(const i of e){const{chainId:r}=i,s=i.address;if(!Er(s))throw new Zr({address:s});if(r<0)throw new ac({chainId:r})}Hp(t)}function kI(t){const{blobVersionedHashes:e}=t;if(e){if(e.length===0)throw new Gm;for(const i of e){const r=Gr(i),s=Vl(Tx(i,0,1));if(r!==32)throw new uI({hash:i,size:r});if(s!==Km)throw new dI({hash:i,version:s})}}Hp(t)}function Hp(t){const{chainId:e,maxPriorityFeePerGas:i,maxFeePerGas:r,to:s}=t;if(e<=0)throw new ac({chainId:e});if(s&&!Er(s))throw new Zr({address:s});if(r&&r>Eu)throw new oc({maxFeePerGas:r});if(i&&r&&i>r)throw new zp({maxFeePerGas:r,maxPriorityFeePerGas:i})}function PI(t){const{chainId:e,maxPriorityFeePerGas:i,gasPrice:r,maxFeePerGas:s,to:n}=t;if(e<=0)throw new ac({chainId:e});if(n&&!Er(n))throw new Zr({address:n});if(i||s)throw new ve("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid EIP-2930 Transaction attribute.");if(r&&r>Eu)throw new oc({maxFeePerGas:r})}function OI(t){const{chainId:e,maxPriorityFeePerGas:i,gasPrice:r,maxFeePerGas:s,to:n}=t;if(n&&!Er(n))throw new Zr({address:n});if(typeof e<"u"&&e<=0)throw new ac({chainId:e});if(i||s)throw new ve("`maxFeePerGas`/`maxPriorityFeePerGas` is not a valid Legacy Transaction attribute.");if(r&&r>Eu)throw new oc({maxFeePerGas:r})}function cc(t){if(!t||t.length===0)return[];const e=[];for(let i=0;i<t.length;i++){const{address:r,storageKeys:s}=t[i];for(let n=0;n<s.length;n++)if(s[n].length-2!==64)throw new Hx({storageKey:s[n]});if(!Er(r,{strict:!1}))throw new Zr({address:r});e.push([r,s])}return e}function TI(t,e){const i=gI(t);return i==="eip1559"?MI(t,e):i==="eip2930"?BI(t,e):i==="eip4844"?LI(t,e):i==="eip7702"?RI(t,e):UI(t,e)}function RI(t,e){const{authorizationList:i,chainId:r,gas:s,nonce:n,to:o,value:a,maxFeePerGas:c,maxPriorityFeePerGas:l,accessList:u,data:d}=t;$I(t);const h=cc(u),p=DI(i);return uo(["0x04",Ys([he(r),n?he(n):"0x",l?he(l):"0x",c?he(c):"0x",s?he(s):"0x",o??"0x",a?he(a):"0x",d??"0x",h,p,...ho(t,e)])])}function LI(t,e){const{chainId:i,gas:r,nonce:s,to:n,value:o,maxFeePerBlobGas:a,maxFeePerGas:c,maxPriorityFeePerGas:l,accessList:u,data:d}=t;kI(t);let h=t.blobVersionedHashes,p=t.sidecars;if(t.blobs&&(typeof h>"u"||typeof p>"u")){const b=typeof t.blobs[0]=="string"?t.blobs:t.blobs.map(N=>Ir(N)),v=t.kzg,S=Fm({blobs:b,kzg:v});if(typeof h>"u"&&(h=cI({commitments:S})),typeof p>"u"){const N=Hm({blobs:b,commitments:S,kzg:v});p=pI({blobs:b,commitments:S,proofs:N})}}const g=cc(u),f=[he(i),s?he(s):"0x",l?he(l):"0x",c?he(c):"0x",r?he(r):"0x",n??"0x",o?he(o):"0x",d??"0x",g,a?he(a):"0x",h??[],...ho(t,e)],w=[],m=[],y=[];if(p)for(let b=0;b<p.length;b++){const{blob:v,commitment:S,proof:N}=p[b];w.push(v),m.push(S),y.push(N)}return uo(["0x03",Ys(p?[f,w,m,y]:f)])}function MI(t,e){const{chainId:i,gas:r,nonce:s,to:n,value:o,maxFeePerGas:a,maxPriorityFeePerGas:c,accessList:l,data:u}=t;Hp(t);const d=cc(l),h=[he(i),s?he(s):"0x",c?he(c):"0x",a?he(a):"0x",r?he(r):"0x",n??"0x",o?he(o):"0x",u??"0x",d,...ho(t,e)];return uo(["0x02",Ys(h)])}function BI(t,e){const{chainId:i,gas:r,data:s,nonce:n,to:o,value:a,accessList:c,gasPrice:l}=t;PI(t);const u=cc(c),d=[he(i),n?he(n):"0x",l?he(l):"0x",r?he(r):"0x",o??"0x",a?he(a):"0x",s??"0x",u,...ho(t,e)];return uo(["0x01",Ys(d)])}function UI(t,e){const{chainId:i=0,gas:r,data:s,nonce:n,to:o,value:a,gasPrice:c}=t;OI(t);let l=[n?he(n):"0x",c?he(c):"0x",r?he(r):"0x",o??"0x",a?he(a):"0x",s??"0x"];if(e){const u=(()=>{if(e.v>=35n)return(e.v-35n)/2n>0?e.v:27n+(e.v===35n?0n:1n);if(i>0)return BigInt(i*2)+BigInt(35n+e.v-27n);const p=27n+(e.v===27n?0n:1n);if(e.v!==p)throw new zx({v:e.v});return p})(),d=Vn(e.r),h=Vn(e.s);l=[...l,he(u),d==="0x00"?"0x":d,h==="0x00"?"0x":h]}else i>0&&(l=[...l,he(i),"0x","0x"]);return Ys(l)}function ho(t,e){const i=e??t,{v:r,yParity:s}=i;if(typeof i.r>"u")return[];if(typeof i.s>"u")return[];if(typeof r>"u"&&typeof s>"u")return[];const n=Vn(i.r),o=Vn(i.s);return[typeof s=="number"?s?he(1):"0x":r===0n?"0x":r===1n?he(1):r===27n?"0x":he(1),n==="0x00"?"0x":n,o==="0x00"?"0x":o]}function DI(t){if(!t||t.length===0)return[];const e=[];for(const i of t){const{chainId:r,nonce:s,...n}=i,o=i.address;e.push([r?he(r):"0x",o,s?he(s):"0x",...ho({},n)])}return e}const jI={"0x0":"reverted","0x1":"success"};function zI(t){const e={...t,blockNumber:t.blockNumber?BigInt(t.blockNumber):null,contractAddress:t.contractAddress?t.contractAddress:null,cumulativeGasUsed:t.cumulativeGasUsed?BigInt(t.cumulativeGasUsed):null,effectiveGasPrice:t.effectiveGasPrice?BigInt(t.effectiveGasPrice):null,gasUsed:t.gasUsed?BigInt(t.gasUsed):null,logs:t.logs?t.logs.map(i=>fI(i)):null,to:t.to?t.to:null,transactionIndex:t.transactionIndex?Vl(t.transactionIndex):null,status:t.status?jI[t.status]:null,type:t.type?Dm[t.type]||t.type:null};return t.blobGasPrice&&(e.blobGasPrice=BigInt(t.blobGasPrice)),t.blobGasUsed&&(e.blobGasUsed=BigInt(t.blobGasUsed)),e}const FI=Cu("transactionReceipt",zI),HI=new Uint8Array([7,4,13,1,10,6,15,3,12,0,9,5,2,14,11,8]),Jm=new Uint8Array(new Array(16).fill(0).map((t,e)=>e)),qI=Jm.map(t=>(9*t+5)%16);let WI=[Jm],VI=[qI];for(let t=0;t<4;t++)for(let e of[WI,VI])e.push(e[t].map(i=>HI[i]));/*! noble-curves - MIT License (c) 2022 Paul Miller (paulmillr.com) */const Iu=BigInt(0),Au=BigInt(1),KI=BigInt(2);function Ws(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function lc(t){if(!Ws(t))throw new Error("Uint8Array expected")}function Jn(t,e){if(typeof e!="boolean")throw new Error(t+" boolean expected, got "+e)}const GI=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function Xn(t){lc(t);let e="";for(let i=0;i<t.length;i++)e+=GI[t[i]];return e}function Ln(t){const e=t.toString(16);return e.length&1?"0"+e:e}function qp(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);return t===""?Iu:BigInt("0x"+t)}const rr={_0:48,_9:57,A:65,F:70,a:97,f:102};function wg(t){if(t>=rr._0&&t<=rr._9)return t-rr._0;if(t>=rr.A&&t<=rr.F)return t-(rr.A-10);if(t>=rr.a&&t<=rr.f)return t-(rr.a-10)}function Qn(t){if(typeof t!="string")throw new Error("hex string expected, got "+typeof t);const e=t.length,i=e/2;if(e%2)throw new Error("hex string expected, got unpadded hex of length "+e);const r=new Uint8Array(i);for(let s=0,n=0;s<i;s++,n+=2){const o=wg(t.charCodeAt(n)),a=wg(t.charCodeAt(n+1));if(o===void 0||a===void 0){const c=t[n]+t[n+1];throw new Error('hex string expected, got non-hex character "'+c+'" at index '+n)}r[s]=o*16+a}return r}function Ms(t){return qp(Xn(t))}function Wp(t){return lc(t),qp(Xn(Uint8Array.from(t).reverse()))}function eo(t,e){return Qn(t.toString(16).padStart(e*2,"0"))}function Vp(t,e){return eo(t,e).reverse()}function ZI(t){return Qn(Ln(t))}function Pi(t,e,i){let r;if(typeof e=="string")try{r=Qn(e)}catch(n){throw new Error(t+" must be hex string or Uint8Array, cause: "+n)}else if(Ws(e))r=Uint8Array.from(e);else throw new Error(t+" must be hex string or Uint8Array");const s=r.length;if(typeof i=="number"&&s!==i)throw new Error(t+" of length "+i+" expected, got "+s);return r}function Fa(...t){let e=0;for(let r=0;r<t.length;r++){const s=t[r];lc(s),e+=s.length}const i=new Uint8Array(e);for(let r=0,s=0;r<t.length;r++){const n=t[r];i.set(n,s),s+=n.length}return i}function YI(t,e){if(t.length!==e.length)return!1;let i=0;for(let r=0;r<t.length;r++)i|=t[r]^e[r];return i===0}function JI(t){if(typeof t!="string")throw new Error("string expected");return new Uint8Array(new TextEncoder().encode(t))}const ud=t=>typeof t=="bigint"&&Iu<=t;function _u(t,e,i){return ud(t)&&ud(e)&&ud(i)&&e<=t&&t<i}function Bs(t,e,i,r){if(!_u(e,i,r))throw new Error("expected valid "+t+": "+i+" <= n < "+r+", got "+e)}function Xm(t){let e;for(e=0;t>Iu;t>>=Au,e+=1);return e}function XI(t,e){return t>>BigInt(e)&Au}function QI(t,e,i){return t|(i?Au:Iu)<<BigInt(e)}const Kp=t=>(KI<<BigInt(t-1))-Au,dd=t=>new Uint8Array(t),mg=t=>Uint8Array.from(t);function Qm(t,e,i){if(typeof t!="number"||t<2)throw new Error("hashLen must be a number");if(typeof e!="number"||e<2)throw new Error("qByteLen must be a number");if(typeof i!="function")throw new Error("hmacFn must be a function");let r=dd(t),s=dd(t),n=0;const o=()=>{r.fill(1),s.fill(0),n=0},a=(...u)=>i(s,r,...u),c=(u=dd())=>{s=a(mg([0]),u),r=a(),u.length!==0&&(s=a(mg([1]),u),r=a())},l=()=>{if(n++>=1e3)throw new Error("drbg: tried 1000 values");let u=0;const d=[];for(;u<e;){r=a();const h=r.slice();d.push(h),u+=r.length}return Fa(...d)};return(u,d)=>{o(),c(u);let h;for(;!(h=d(l()));)c();return o(),h}}const eA={bigint:t=>typeof t=="bigint",function:t=>typeof t=="function",boolean:t=>typeof t=="boolean",string:t=>typeof t=="string",stringOrUint8Array:t=>typeof t=="string"||Ws(t),isSafeInteger:t=>Number.isSafeInteger(t),array:t=>Array.isArray(t),field:(t,e)=>e.Fp.isValid(t),hash:t=>typeof t=="function"&&Number.isSafeInteger(t.outputLen)};function uc(t,e,i={}){const r=(s,n,o)=>{const a=eA[n];if(typeof a!="function")throw new Error("invalid validator function");const c=t[s];if(!(o&&c===void 0)&&!a(c,t))throw new Error("param "+String(s)+" is invalid. Expected "+n+", got "+c)};for(const[s,n]of Object.entries(e))r(s,n,!1);for(const[s,n]of Object.entries(i))r(s,n,!0);return t}const tA=()=>{throw new Error("not implemented")};function sp(t){const e=new WeakMap;return(i,...r)=>{const s=e.get(i);if(s!==void 0)return s;const n=t(i,...r);return e.set(i,n),n}}var iA=Object.freeze({__proto__:null,isBytes:Ws,abytes:lc,abool:Jn,bytesToHex:Xn,numberToHexUnpadded:Ln,hexToNumber:qp,hexToBytes:Qn,bytesToNumberBE:Ms,bytesToNumberLE:Wp,numberToBytesBE:eo,numberToBytesLE:Vp,numberToVarBytesBE:ZI,ensureBytes:Pi,concatBytes:Fa,equalBytes:YI,utf8ToBytes:JI,inRange:_u,aInRange:Bs,bitLen:Xm,bitGet:XI,bitSet:QI,bitMask:Kp,createHmacDrbg:Qm,validateObject:uc,notImplemented:tA,memoized:sp});const rA="0.1.1";function sA(){return rA}class Ot extends Error{constructor(e,i={}){const r=(()=>{var a;if(i.cause instanceof Ot){if(i.cause.details)return i.cause.details;if(i.cause.shortMessage)return i.cause.shortMessage}return(a=i.cause)!=null&&a.message?i.cause.message:i.details})(),s=i.cause instanceof Ot&&i.cause.docsPath||i.docsPath,n=`https://oxlib.sh${s??""}`,o=[e||"An error occurred.",...i.metaMessages?["",...i.metaMessages]:[],...r||s?["",r?`Details: ${r}`:void 0,s?`See: ${n}`:void 0]:[]].filter(a=>typeof a=="string").join(`
`);super(o,i.cause?{cause:i.cause}:void 0),Object.defineProperty(this,"details",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docs",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"docsPath",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"shortMessage",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"cause",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"BaseError"}),Object.defineProperty(this,"version",{enumerable:!0,configurable:!0,writable:!0,value:`ox@${sA()}`}),this.cause=i.cause,this.details=r,this.docs=n,this.docsPath=s,this.shortMessage=e}walk(e){return e2(this,e)}}function e2(t,e){return e!=null&&e(t)?t:t&&typeof t=="object"&&"cause"in t&&t.cause?e2(t.cause,e):e?null:t}function nA(t,e){if(bg(t)>e)throw new pA({givenSize:bg(t),maxSize:e})}const sr={zero:48,nine:57,A:65,F:70,a:97,f:102};function yg(t){if(t>=sr.zero&&t<=sr.nine)return t-sr.zero;if(t>=sr.A&&t<=sr.F)return t-(sr.A-10);if(t>=sr.a&&t<=sr.f)return t-(sr.a-10)}function oA(t,e={}){const{dir:i,size:r=32}=e;if(r===0)return t;if(t.length>r)throw new gA({size:t.length,targetSize:r,type:"Bytes"});const s=new Uint8Array(r);for(let n=0;n<r;n++){const o=i==="right";s[o?n:r-n-1]=t[o?n:t.length-n-1]}return s}function Gp(t,e){if(np(t)>e)throw new CA({givenSize:np(t),maxSize:e})}function t2(t,e={}){const{dir:i,size:r=32}=e;if(r===0)return t;const s=t.replace("0x","");if(s.length>r*2)throw new EA({size:Math.ceil(s.length/2),targetSize:r,type:"Hex"});return`0x${s[i==="right"?"padEnd":"padStart"](r*2,"0")}`}const aA=new TextEncoder;function cA(t){return t instanceof Uint8Array?t:typeof t=="string"?uA(t):lA(t)}function lA(t){return t instanceof Uint8Array?t:new Uint8Array(t)}function uA(t,e={}){const{size:i}=e;let r=t;i&&(Gp(t,i),r=Zp(t,i));let s=r.slice(2);s.length%2&&(s=`0${s}`);const n=s.length/2,o=new Uint8Array(n);for(let a=0,c=0;a<n;a++){const l=yg(s.charCodeAt(c++)),u=yg(s.charCodeAt(c++));if(l===void 0||u===void 0)throw new Ot(`Invalid byte sequence ("${s[c-2]}${s[c-1]}" in "${s}").`);o[a]=l*16+u}return o}function dA(t,e={}){const{size:i}=e,r=aA.encode(t);return typeof i=="number"?(nA(r,i),hA(r,i)):r}function hA(t,e){return oA(t,{dir:"right",size:e})}function bg(t){return t.length}class pA extends Ot{constructor({givenSize:e,maxSize:i}){super(`Size cannot exceed \`${i}\` bytes. Given size: \`${e}\` bytes.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Bytes.SizeOverflowError"})}}class gA extends Ot{constructor({size:e,targetSize:i,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${i}\`).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Bytes.SizeExceedsPaddingSizeError"})}}const fA=new TextEncoder,wA=Array.from({length:256},(t,e)=>e.toString(16).padStart(2,"0"));function i2(...t){return`0x${t.reduce((e,i)=>e+i.replace("0x",""),"")}`}function mA(t,e={}){const i=`0x${Number(t)}`;return typeof e.size=="number"?(Gp(i,e.size),Gl(i,e.size)):i}function r2(t,e={}){let i="";for(let s=0;s<t.length;s++)i+=wA[t[s]];const r=`0x${i}`;return typeof e.size=="number"?(Gp(r,e.size),Zp(r,e.size)):r}function yA(t,e={}){const{signed:i,size:r}=e,s=BigInt(t);let n;r?i?n=(1n<<BigInt(r)*8n-1n)-1n:n=2n**(BigInt(r)*8n)-1n:typeof t=="number"&&(n=BigInt(Number.MAX_SAFE_INTEGER));const o=typeof n=="bigint"&&i?-n-1n:0;if(n&&s>n||s<o){const c=typeof t=="bigint"?"n":"";throw new vA({max:n?`${n}${c}`:void 0,min:`${o}${c}`,signed:i,size:r,value:`${t}${c}`})}const a=`0x${(i&&s<0?(1n<<BigInt(r*8))+BigInt(s):s).toString(16)}`;return r?Gl(a,r):a}function bA(t,e={}){return r2(fA.encode(t),e)}function Gl(t,e){return t2(t,{dir:"left",size:e})}function Zp(t,e){return t2(t,{dir:"right",size:e})}function np(t){return Math.ceil((t.length-2)/2)}class vA extends Ot{constructor({max:e,min:i,signed:r,size:s,value:n}){super(`Number \`${n}\` is not in safe${s?` ${s*8}-bit`:""}${r?" signed":" unsigned"} integer range ${e?`(\`${i}\` to \`${e}\`)`:`(above \`${i}\`)`}`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Hex.IntegerOutOfRangeError"})}}class CA extends Ot{constructor({givenSize:e,maxSize:i}){super(`Size cannot exceed \`${i}\` bytes. Given size: \`${e}\` bytes.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Hex.SizeOverflowError"})}}class EA extends Ot{constructor({size:e,targetSize:i,type:r}){super(`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()} size (\`${e}\`) exceeds padding size (\`${i}\`).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Hex.SizeExceedsPaddingSizeError"})}}function xA(t,e={}){const{as:i=typeof t=="string"?"Hex":"Bytes"}=e,r=Pm(cA(t));return i==="Bytes"?r:r2(r)}class IA extends Map{constructor(e){super(),Object.defineProperty(this,"maxSize",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.maxSize=e}get(e){const i=super.get(e);return super.has(e)&&i!==void 0&&(this.delete(e),super.set(e,i)),i}set(e,i){if(super.set(e,i),this.maxSize&&this.size>this.maxSize){const r=this.keys().next().value;r&&this.delete(r)}return this}}const AA={checksum:new IA(8192)},hd=AA.checksum,_A=/^0x[a-fA-F0-9]{40}$/;function s2(t,e={}){const{strict:i=!0}=e;if(!_A.test(t))throw new vg({address:t,cause:new SA});if(i){if(t.toLowerCase()===t)return;if(NA(t)!==t)throw new vg({address:t,cause:new $A})}}function NA(t){if(hd.has(t))return hd.get(t);s2(t,{strict:!1});const e=t.substring(2).toLowerCase(),i=xA(dA(e),{as:"Bytes"}),r=e.split("");for(let n=0;n<40;n+=2)i[n>>1]>>4>=8&&r[n]&&(r[n]=r[n].toUpperCase()),(i[n>>1]&15)>=8&&r[n+1]&&(r[n+1]=r[n+1].toUpperCase());const s=`0x${r.join("")}`;return hd.set(t,s),s}class vg extends Ot{constructor({address:e,cause:i}){super(`Address "${e}" is invalid.`,{cause:i}),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Address.InvalidAddressError"})}}class SA extends Ot{constructor(){super("Address is not a 20 byte (40 hexadecimal character) value."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Address.InvalidInputError"})}}class $A extends Ot{constructor(){super("Address does not match its checksum counterpart."),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"Address.InvalidChecksumError"})}}const kA=/^(.*)\[([0-9]*)\]$/,PA=/^bytes([1-9]|1[0-9]|2[0-9]|3[0-2])?$/,OA=/^(u?int)(8|16|24|32|40|48|56|64|72|80|88|96|104|112|120|128|136|144|152|160|168|176|184|192|200|208|216|224|232|240|248|256)?$/;function op(t,e){if(t.length!==e.length)throw new RA({expectedLength:t.length,givenLength:e.length});const i=[];for(let r=0;r<t.length;r++){const s=t[r],n=e[r];i.push(op.encode(s,n))}return i2(...i)}(function(t){function e(i,r,s=!1){if(i==="address"){const c=r;return s2(c),Gl(c.toLowerCase(),s?32:0)}if(i==="string")return bA(r);if(i==="bytes")return r;if(i==="bool")return Gl(mA(r),s?32:1);const n=i.match(OA);if(n){const[c,l,u="256"]=n,d=Number.parseInt(u)/8;return yA(r,{size:s?32:d,signed:l==="int"})}const o=i.match(PA);if(o){const[c,l]=o;if(Number.parseInt(l)!==(r.length-2)/2)throw new TA({expectedSize:Number.parseInt(l),value:r});return Zp(r,s?32:0)}const a=i.match(kA);if(a&&Array.isArray(r)){const[c,l]=a,u=[];for(let d=0;d<r.length;d++)u.push(e(l,r[d],!0));return u.length===0?"0x":i2(...u)}throw new LA(i)}t.encode=e})(op||(op={}));class TA extends Ot{constructor({expectedSize:e,value:i}){super(`Size of bytes "${i}" (bytes${np(i)}) does not match expected size (bytes${e}).`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiParameters.BytesSizeMismatchError"})}}class RA extends Ot{constructor({expectedLength:e,givenLength:i}){super(["ABI encoding parameters/values length mismatch.",`Expected length (parameters): ${e}`,`Given length (values): ${i}`].join(`
`)),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiParameters.LengthMismatchError"})}}class LA extends Ot{constructor(e){super(`Type \`${e}\` is not a valid ABI Type.`),Object.defineProperty(this,"name",{enumerable:!0,configurable:!0,writable:!0,value:"AbiParameters.InvalidTypeError"})}}class n2 extends Up{constructor(e,i){super(),this.finished=!1,this.destroyed=!1,lx(e);const r=bu(i);if(this.iHash=e.create(),typeof this.iHash.update!="function")throw new Error("Expected instance of class which extends utils.Hash");this.blockLen=this.iHash.blockLen,this.outputLen=this.iHash.outputLen;const s=this.blockLen,n=new Uint8Array(s);n.set(r.length>s?e.create().update(r).digest():r);for(let o=0;o<n.length;o++)n[o]^=54;this.iHash.update(n),this.oHash=e.create();for(let o=0;o<n.length;o++)n[o]^=106;this.oHash.update(n),n.fill(0)}update(e){return Kn(this),this.iHash.update(e),this}digestInto(e){Kn(this),nc(e,this.outputLen),this.finished=!0,this.iHash.digestInto(e),this.oHash.update(e),this.oHash.digestInto(e),this.destroy()}digest(){const e=new Uint8Array(this.oHash.outputLen);return this.digestInto(e),e}_cloneInto(e){e||(e=Object.create(Object.getPrototypeOf(this),{}));const{oHash:i,iHash:r,finished:s,destroyed:n,blockLen:o,outputLen:a}=this;return e=e,e.finished=s,e.destroyed=n,e.blockLen=o,e.outputLen=a,e.oHash=i._cloneInto(e.oHash),e.iHash=r._cloneInto(e.iHash),e}destroy(){this.destroyed=!0,this.oHash.destroy(),this.iHash.destroy()}}const o2=(t,e,i)=>new n2(t,e).update(i).digest();o2.create=(t,e)=>new n2(t,e);const ft=BigInt(0),Je=BigInt(1),As=BigInt(2),MA=BigInt(3),ap=BigInt(4),Cg=BigInt(5),Eg=BigInt(8);function Ht(t,e){const i=t%e;return i>=ft?i:e+i}function BA(t,e,i){if(e<ft)throw new Error("invalid exponent, negatives unsupported");if(i<=ft)throw new Error("invalid modulus");if(i===Je)return ft;let r=Je;for(;e>ft;)e&Je&&(r=r*t%i),t=t*t%i,e>>=Je;return r}function ui(t,e,i){let r=t;for(;e-- >ft;)r*=r,r%=i;return r}function cp(t,e){if(t===ft)throw new Error("invert: expected non-zero number");if(e<=ft)throw new Error("invert: expected positive modulus, got "+e);let i=Ht(t,e),r=e,s=ft,n=Je;for(;i!==ft;){const o=r/i,a=r%i,c=s-n*o;r=i,i=a,s=n,n=c}if(r!==Je)throw new Error("invert: does not exist");return Ht(s,e)}function UA(t){const e=(t-Je)/As;let i,r,s;for(i=t-Je,r=0;i%As===ft;i/=As,r++);for(s=As;s<t&&BA(s,e,t)!==t-Je;s++)if(s>1e3)throw new Error("Cannot find square root: likely non-prime P");if(r===1){const o=(t+Je)/ap;return function(a,c){const l=a.pow(c,o);if(!a.eql(a.sqr(l),c))throw new Error("Cannot find square root");return l}}const n=(i+Je)/As;return function(o,a){if(o.pow(a,e)===o.neg(o.ONE))throw new Error("Cannot find square root");let c=r,l=o.pow(o.mul(o.ONE,s),i),u=o.pow(a,n),d=o.pow(a,i);for(;!o.eql(d,o.ONE);){if(o.eql(d,o.ZERO))return o.ZERO;let h=1;for(let g=o.sqr(d);h<c&&!o.eql(g,o.ONE);h++)g=o.sqr(g);const p=o.pow(l,Je<<BigInt(c-h-1));l=o.sqr(p),u=o.mul(u,p),d=o.mul(d,l),c=h}return u}}function DA(t){if(t%ap===MA){const e=(t+Je)/ap;return function(i,r){const s=i.pow(r,e);if(!i.eql(i.sqr(s),r))throw new Error("Cannot find square root");return s}}if(t%Eg===Cg){const e=(t-Cg)/Eg;return function(i,r){const s=i.mul(r,As),n=i.pow(s,e),o=i.mul(r,n),a=i.mul(i.mul(o,As),n),c=i.mul(o,i.sub(a,i.ONE));if(!i.eql(i.sqr(c),r))throw new Error("Cannot find square root");return c}}return UA(t)}const jA=["create","isValid","is0","neg","inv","sqrt","sqr","eql","add","sub","mul","pow","div","addN","subN","mulN","sqrN"];function zA(t){const e={ORDER:"bigint",MASK:"bigint",BYTES:"isSafeInteger",BITS:"isSafeInteger"},i=jA.reduce((r,s)=>(r[s]="function",r),e);return uc(t,i)}function FA(t,e,i){if(i<ft)throw new Error("invalid exponent, negatives unsupported");if(i===ft)return t.ONE;if(i===Je)return e;let r=t.ONE,s=e;for(;i>ft;)i&Je&&(r=t.mul(r,s)),s=t.sqr(s),i>>=Je;return r}function HA(t,e){const i=new Array(e.length),r=e.reduce((n,o,a)=>t.is0(o)?n:(i[a]=n,t.mul(n,o)),t.ONE),s=t.inv(r);return e.reduceRight((n,o,a)=>t.is0(o)?n:(i[a]=t.mul(n,i[a]),t.mul(n,o)),s),i}function a2(t,e){const i=e!==void 0?e:t.toString(2).length,r=Math.ceil(i/8);return{nBitLength:i,nByteLength:r}}function c2(t,e,i=!1,r={}){if(t<=ft)throw new Error("invalid field: expected ORDER > 0, got "+t);const{nBitLength:s,nByteLength:n}=a2(t,e);if(n>2048)throw new Error("invalid field: expected ORDER of <= 2048 bytes");let o;const a=Object.freeze({ORDER:t,isLE:i,BITS:s,BYTES:n,MASK:Kp(s),ZERO:ft,ONE:Je,create:c=>Ht(c,t),isValid:c=>{if(typeof c!="bigint")throw new Error("invalid field element: expected bigint, got "+typeof c);return ft<=c&&c<t},is0:c=>c===ft,isOdd:c=>(c&Je)===Je,neg:c=>Ht(-c,t),eql:(c,l)=>c===l,sqr:c=>Ht(c*c,t),add:(c,l)=>Ht(c+l,t),sub:(c,l)=>Ht(c-l,t),mul:(c,l)=>Ht(c*l,t),pow:(c,l)=>FA(a,c,l),div:(c,l)=>Ht(c*cp(l,t),t),sqrN:c=>c*c,addN:(c,l)=>c+l,subN:(c,l)=>c-l,mulN:(c,l)=>c*l,inv:c=>cp(c,t),sqrt:r.sqrt||(c=>(o||(o=DA(t)),o(a,c))),invertBatch:c=>HA(a,c),cmov:(c,l,u)=>u?l:c,toBytes:c=>i?Vp(c,n):eo(c,n),fromBytes:c=>{if(c.length!==n)throw new Error("Field.fromBytes: expected "+n+" bytes, got "+c.length);return i?Wp(c):Ms(c)}});return Object.freeze(a)}function l2(t){if(typeof t!="bigint")throw new Error("field order must be bigint");const e=t.toString(2).length;return Math.ceil(e/8)}function u2(t){const e=l2(t);return e+Math.ceil(e/2)}function qA(t,e,i=!1){const r=t.length,s=l2(e),n=u2(e);if(r<16||r<n||r>1024)throw new Error("expected "+n+"-1024 bytes of input, got "+r);const o=i?Wp(t):Ms(t),a=Ht(o,e-Je)+Je;return i?Vp(a,s):eo(a,s)}const xg=BigInt(0),Tc=BigInt(1);function pd(t,e){const i=e.negate();return t?i:e}function d2(t,e){if(!Number.isSafeInteger(t)||t<=0||t>e)throw new Error("invalid window size, expected [1.."+e+"], got W="+t)}function gd(t,e){d2(t,e);const i=Math.ceil(e/t)+1,r=2**(t-1);return{windows:i,windowSize:r}}function WA(t,e){if(!Array.isArray(t))throw new Error("array expected");t.forEach((i,r)=>{if(!(i instanceof e))throw new Error("invalid point at index "+r)})}function VA(t,e){if(!Array.isArray(t))throw new Error("array of scalars expected");t.forEach((i,r)=>{if(!e.isValid(i))throw new Error("invalid scalar at index "+r)})}const fd=new WeakMap,h2=new WeakMap;function wd(t){return h2.get(t)||1}function KA(t,e){return{constTimeNegate:pd,hasPrecomputes(i){return wd(i)!==1},unsafeLadder(i,r,s=t.ZERO){let n=i;for(;r>xg;)r&Tc&&(s=s.add(n)),n=n.double(),r>>=Tc;return s},precomputeWindow(i,r){const{windows:s,windowSize:n}=gd(r,e),o=[];let a=i,c=a;for(let l=0;l<s;l++){c=a,o.push(c);for(let u=1;u<n;u++)c=c.add(a),o.push(c);a=c.double()}return o},wNAF(i,r,s){const{windows:n,windowSize:o}=gd(i,e);let a=t.ZERO,c=t.BASE;const l=BigInt(2**i-1),u=2**i,d=BigInt(i);for(let h=0;h<n;h++){const p=h*o;let g=Number(s&l);s>>=d,g>o&&(g-=u,s+=Tc);const f=p,w=p+Math.abs(g)-1,m=h%2!==0,y=g<0;g===0?c=c.add(pd(m,r[f])):a=a.add(pd(y,r[w]))}return{p:a,f:c}},wNAFUnsafe(i,r,s,n=t.ZERO){const{windows:o,windowSize:a}=gd(i,e),c=BigInt(2**i-1),l=2**i,u=BigInt(i);for(let d=0;d<o;d++){const h=d*a;if(s===xg)break;let p=Number(s&c);if(s>>=u,p>a&&(p-=l,s+=Tc),p===0)continue;let g=r[h+Math.abs(p)-1];p<0&&(g=g.negate()),n=n.add(g)}return n},getPrecomputes(i,r,s){let n=fd.get(r);return n||(n=this.precomputeWindow(r,i),i!==1&&fd.set(r,s(n))),n},wNAFCached(i,r,s){const n=wd(i);return this.wNAF(n,this.getPrecomputes(n,i,s),r)},wNAFCachedUnsafe(i,r,s,n){const o=wd(i);return o===1?this.unsafeLadder(i,r,n):this.wNAFUnsafe(o,this.getPrecomputes(o,i,s),r,n)},setWindowSize(i,r){d2(r,e),h2.set(i,r),fd.delete(i)}}}function GA(t,e,i,r){if(WA(i,t),VA(r,e),i.length!==r.length)throw new Error("arrays of points and scalars must have equal length");const s=t.ZERO,n=Xm(BigInt(i.length)),o=n>12?n-3:n>4?n-2:n?2:1,a=(1<<o)-1,c=new Array(a+1).fill(s),l=Math.floor((e.BITS-1)/o)*o;let u=s;for(let d=l;d>=0;d-=o){c.fill(s);for(let p=0;p<r.length;p++){const g=r[p],f=Number(g>>BigInt(d)&BigInt(a));c[f]=c[f].add(i[p])}let h=s;for(let p=c.length-1,g=s;p>0;p--)g=g.add(c[p]),h=h.add(g);if(u=u.add(h),d!==0)for(let p=0;p<o;p++)u=u.double()}return u}function p2(t){return zA(t.Fp),uc(t,{n:"bigint",h:"bigint",Gx:"field",Gy:"field"},{nBitLength:"isSafeInteger",nByteLength:"isSafeInteger"}),Object.freeze({...a2(t.n,t.nBitLength),...t,p:t.Fp.ORDER})}function Ig(t){t.lowS!==void 0&&Jn("lowS",t.lowS),t.prehash!==void 0&&Jn("prehash",t.prehash)}function ZA(t){const e=p2(t);uc(e,{a:"field",b:"field"},{allowedPrivateKeyLengths:"array",wrapPrivateKey:"boolean",isTorsionFree:"function",clearCofactor:"function",allowInfinityPoint:"boolean",fromBytes:"function",toBytes:"function"});const{endo:i,Fp:r,a:s}=e;if(i){if(!r.eql(s,r.ZERO))throw new Error("invalid endomorphism, can only be defined for Koblitz curves that have a=0");if(typeof i!="object"||typeof i.beta!="bigint"||typeof i.splitScalar!="function")throw new Error("invalid endomorphism, expected beta: bigint and splitScalar: function")}return Object.freeze({...e})}const{bytesToNumberBE:YA,hexToBytes:JA}=iA;class XA extends Error{constructor(e=""){super(e)}}const gr={Err:XA,_tlv:{encode:(t,e)=>{const{Err:i}=gr;if(t<0||t>256)throw new i("tlv.encode: wrong tag");if(e.length&1)throw new i("tlv.encode: unpadded data");const r=e.length/2,s=Ln(r);if(s.length/2&128)throw new i("tlv.encode: long form length too big");const n=r>127?Ln(s.length/2|128):"";return Ln(t)+n+s+e},decode(t,e){const{Err:i}=gr;let r=0;if(t<0||t>256)throw new i("tlv.encode: wrong tag");if(e.length<2||e[r++]!==t)throw new i("tlv.decode: wrong tlv");const s=e[r++],n=!!(s&128);let o=0;if(!n)o=s;else{const c=s&127;if(!c)throw new i("tlv.decode(long): indefinite length not supported");if(c>4)throw new i("tlv.decode(long): byte length is too big");const l=e.subarray(r,r+c);if(l.length!==c)throw new i("tlv.decode: length bytes not complete");if(l[0]===0)throw new i("tlv.decode(long): zero leftmost byte");for(const u of l)o=o<<8|u;if(r+=c,o<128)throw new i("tlv.decode(long): not minimal encoding")}const a=e.subarray(r,r+o);if(a.length!==o)throw new i("tlv.decode: wrong value length");return{v:a,l:e.subarray(r+o)}}},_int:{encode(t){const{Err:e}=gr;if(t<mr)throw new e("integer: negative integers are not allowed");let i=Ln(t);if(Number.parseInt(i[0],16)&8&&(i="00"+i),i.length&1)throw new e("unexpected DER parsing assertion: unpadded hex");return i},decode(t){const{Err:e}=gr;if(t[0]&128)throw new e("invalid signature integer: negative");if(t[0]===0&&!(t[1]&128))throw new e("invalid signature integer: unnecessary leading zero");return YA(t)}},toSig(t){const{Err:e,_int:i,_tlv:r}=gr,s=typeof t=="string"?JA(t):t;lc(s);const{v:n,l:o}=r.decode(48,s);if(o.length)throw new e("invalid signature: left bytes after parsing");const{v:a,l:c}=r.decode(2,n),{v:l,l:u}=r.decode(2,c);if(u.length)throw new e("invalid signature: left bytes after parsing");return{r:i.decode(a),s:i.decode(l)}},hexFromSig(t){const{_tlv:e,_int:i}=gr,r=e.encode(2,i.encode(t.r)),s=e.encode(2,i.encode(t.s)),n=r+s;return e.encode(48,n)}},mr=BigInt(0),dt=BigInt(1);BigInt(2);const Ag=BigInt(3);BigInt(4);function QA(t){const e=ZA(t),{Fp:i}=e,r=c2(e.n,e.nBitLength),s=e.toBytes||((f,w,m)=>{const y=w.toAffine();return Fa(Uint8Array.from([4]),i.toBytes(y.x),i.toBytes(y.y))}),n=e.fromBytes||(f=>{const w=f.subarray(1),m=i.fromBytes(w.subarray(0,i.BYTES)),y=i.fromBytes(w.subarray(i.BYTES,2*i.BYTES));return{x:m,y}});function o(f){const{a:w,b:m}=e,y=i.sqr(f),b=i.mul(y,f);return i.add(i.add(b,i.mul(f,w)),m)}if(!i.eql(i.sqr(e.Gy),o(e.Gx)))throw new Error("bad generator point: equation left != right");function a(f){return _u(f,dt,e.n)}function c(f){const{allowedPrivateKeyLengths:w,nByteLength:m,wrapPrivateKey:y,n:b}=e;if(w&&typeof f!="bigint"){if(Ws(f)&&(f=Xn(f)),typeof f!="string"||!w.includes(f.length))throw new Error("invalid private key");f=f.padStart(m*2,"0")}let v;try{v=typeof f=="bigint"?f:Ms(Pi("private key",f,m))}catch{throw new Error("invalid private key, expected hex or "+m+" bytes, got "+typeof f)}return y&&(v=Ht(v,b)),Bs("private key",v,dt,b),v}function l(f){if(!(f instanceof h))throw new Error("ProjectivePoint expected")}const u=sp((f,w)=>{const{px:m,py:y,pz:b}=f;if(i.eql(b,i.ONE))return{x:m,y};const v=f.is0();w==null&&(w=v?i.ONE:i.inv(b));const S=i.mul(m,w),N=i.mul(y,w),P=i.mul(b,w);if(v)return{x:i.ZERO,y:i.ZERO};if(!i.eql(P,i.ONE))throw new Error("invZ was invalid");return{x:S,y:N}}),d=sp(f=>{if(f.is0()){if(e.allowInfinityPoint&&!i.is0(f.py))return;throw new Error("bad point: ZERO")}const{x:w,y:m}=f.toAffine();if(!i.isValid(w)||!i.isValid(m))throw new Error("bad point: x or y not FE");const y=i.sqr(m),b=o(w);if(!i.eql(y,b))throw new Error("bad point: equation left != right");if(!f.isTorsionFree())throw new Error("bad point: not in prime-order subgroup");return!0});class h{constructor(w,m,y){if(this.px=w,this.py=m,this.pz=y,w==null||!i.isValid(w))throw new Error("x required");if(m==null||!i.isValid(m))throw new Error("y required");if(y==null||!i.isValid(y))throw new Error("z required");Object.freeze(this)}static fromAffine(w){const{x:m,y}=w||{};if(!w||!i.isValid(m)||!i.isValid(y))throw new Error("invalid affine point");if(w instanceof h)throw new Error("projective point not allowed");const b=v=>i.eql(v,i.ZERO);return b(m)&&b(y)?h.ZERO:new h(m,y,i.ONE)}get x(){return this.toAffine().x}get y(){return this.toAffine().y}static normalizeZ(w){const m=i.invertBatch(w.map(y=>y.pz));return w.map((y,b)=>y.toAffine(m[b])).map(h.fromAffine)}static fromHex(w){const m=h.fromAffine(n(Pi("pointHex",w)));return m.assertValidity(),m}static fromPrivateKey(w){return h.BASE.multiply(c(w))}static msm(w,m){return GA(h,r,w,m)}_setWindowSize(w){g.setWindowSize(this,w)}assertValidity(){d(this)}hasEvenY(){const{y:w}=this.toAffine();if(i.isOdd)return!i.isOdd(w);throw new Error("Field doesn't support isOdd")}equals(w){l(w);const{px:m,py:y,pz:b}=this,{px:v,py:S,pz:N}=w,P=i.eql(i.mul(m,N),i.mul(v,b)),k=i.eql(i.mul(y,N),i.mul(S,b));return P&&k}negate(){return new h(this.px,i.neg(this.py),this.pz)}double(){const{a:w,b:m}=e,y=i.mul(m,Ag),{px:b,py:v,pz:S}=this;let N=i.ZERO,P=i.ZERO,k=i.ZERO,_=i.mul(b,b),M=i.mul(v,v),L=i.mul(S,S),U=i.mul(b,v);return U=i.add(U,U),k=i.mul(b,S),k=i.add(k,k),N=i.mul(w,k),P=i.mul(y,L),P=i.add(N,P),N=i.sub(M,P),P=i.add(M,P),P=i.mul(N,P),N=i.mul(U,N),k=i.mul(y,k),L=i.mul(w,L),U=i.sub(_,L),U=i.mul(w,U),U=i.add(U,k),k=i.add(_,_),_=i.add(k,_),_=i.add(_,L),_=i.mul(_,U),P=i.add(P,_),L=i.mul(v,S),L=i.add(L,L),_=i.mul(L,U),N=i.sub(N,_),k=i.mul(L,M),k=i.add(k,k),k=i.add(k,k),new h(N,P,k)}add(w){l(w);const{px:m,py:y,pz:b}=this,{px:v,py:S,pz:N}=w;let P=i.ZERO,k=i.ZERO,_=i.ZERO;const M=e.a,L=i.mul(e.b,Ag);let U=i.mul(m,v),K=i.mul(y,S),I=i.mul(b,N),E=i.add(m,y),x=i.add(v,S);E=i.mul(E,x),x=i.add(U,K),E=i.sub(E,x),x=i.add(m,b);let T=i.add(v,N);return x=i.mul(x,T),T=i.add(U,I),x=i.sub(x,T),T=i.add(y,b),P=i.add(S,N),T=i.mul(T,P),P=i.add(K,I),T=i.sub(T,P),_=i.mul(M,x),P=i.mul(L,I),_=i.add(P,_),P=i.sub(K,_),_=i.add(K,_),k=i.mul(P,_),K=i.add(U,U),K=i.add(K,U),I=i.mul(M,I),x=i.mul(L,x),K=i.add(K,I),I=i.sub(U,I),I=i.mul(M,I),x=i.add(x,I),U=i.mul(K,x),k=i.add(k,U),U=i.mul(T,x),P=i.mul(E,P),P=i.sub(P,U),U=i.mul(E,K),_=i.mul(T,_),_=i.add(_,U),new h(P,k,_)}subtract(w){return this.add(w.negate())}is0(){return this.equals(h.ZERO)}wNAF(w){return g.wNAFCached(this,w,h.normalizeZ)}multiplyUnsafe(w){const{endo:m,n:y}=e;Bs("scalar",w,mr,y);const b=h.ZERO;if(w===mr)return b;if(this.is0()||w===dt)return this;if(!m||g.hasPrecomputes(this))return g.wNAFCachedUnsafe(this,w,h.normalizeZ);let{k1neg:v,k1:S,k2neg:N,k2:P}=m.splitScalar(w),k=b,_=b,M=this;for(;S>mr||P>mr;)S&dt&&(k=k.add(M)),P&dt&&(_=_.add(M)),M=M.double(),S>>=dt,P>>=dt;return v&&(k=k.negate()),N&&(_=_.negate()),_=new h(i.mul(_.px,m.beta),_.py,_.pz),k.add(_)}multiply(w){const{endo:m,n:y}=e;Bs("scalar",w,dt,y);let b,v;if(m){const{k1neg:S,k1:N,k2neg:P,k2:k}=m.splitScalar(w);let{p:_,f:M}=this.wNAF(N),{p:L,f:U}=this.wNAF(k);_=g.constTimeNegate(S,_),L=g.constTimeNegate(P,L),L=new h(i.mul(L.px,m.beta),L.py,L.pz),b=_.add(L),v=M.add(U)}else{const{p:S,f:N}=this.wNAF(w);b=S,v=N}return h.normalizeZ([b,v])[0]}multiplyAndAddUnsafe(w,m,y){const b=h.BASE,v=(N,P)=>P===mr||P===dt||!N.equals(b)?N.multiplyUnsafe(P):N.multiply(P),S=v(this,m).add(v(w,y));return S.is0()?void 0:S}toAffine(w){return u(this,w)}isTorsionFree(){const{h:w,isTorsionFree:m}=e;if(w===dt)return!0;if(m)return m(h,this);throw new Error("isTorsionFree() has not been declared for the elliptic curve")}clearCofactor(){const{h:w,clearCofactor:m}=e;return w===dt?this:m?m(h,this):this.multiplyUnsafe(e.h)}toRawBytes(w=!0){return Jn("isCompressed",w),this.assertValidity(),s(h,this,w)}toHex(w=!0){return Jn("isCompressed",w),Xn(this.toRawBytes(w))}}h.BASE=new h(e.Gx,e.Gy,i.ONE),h.ZERO=new h(i.ZERO,i.ONE,i.ZERO);const p=e.nBitLength,g=KA(h,e.endo?Math.ceil(p/2):p);return{CURVE:e,ProjectivePoint:h,normPrivateKeyToScalar:c,weierstrassEquation:o,isWithinCurveOrder:a}}function e_(t){const e=p2(t);return uc(e,{hash:"hash",hmac:"function",randomBytes:"function"},{bits2int:"function",bits2int_modN:"function",lowS:"boolean"}),Object.freeze({lowS:!0,...e})}function t_(t){const e=e_(t),{Fp:i,n:r}=e,s=i.BYTES+1,n=2*i.BYTES+1;function o(I){return Ht(I,r)}function a(I){return cp(I,r)}const{ProjectivePoint:c,normPrivateKeyToScalar:l,weierstrassEquation:u,isWithinCurveOrder:d}=QA({...e,toBytes(I,E,x){const T=E.toAffine(),O=i.toBytes(T.x),R=Fa;return Jn("isCompressed",x),x?R(Uint8Array.from([E.hasEvenY()?2:3]),O):R(Uint8Array.from([4]),O,i.toBytes(T.y))},fromBytes(I){const E=I.length,x=I[0],T=I.subarray(1);if(E===s&&(x===2||x===3)){const O=Ms(T);if(!_u(O,dt,i.ORDER))throw new Error("Point is not on curve");const R=u(O);let B;try{B=i.sqrt(R)}catch(G){const oe=G instanceof Error?": "+G.message:"";throw new Error("Point is not on curve"+oe)}const F=(B&dt)===dt;return(x&1)===1!==F&&(B=i.neg(B)),{x:O,y:B}}else if(E===n&&x===4){const O=i.fromBytes(T.subarray(0,i.BYTES)),R=i.fromBytes(T.subarray(i.BYTES,2*i.BYTES));return{x:O,y:R}}else{const O=s,R=n;throw new Error("invalid Point, expected length of "+O+", or uncompressed "+R+", got "+E)}}}),h=I=>Xn(eo(I,e.nByteLength));function p(I){const E=r>>dt;return I>E}function g(I){return p(I)?o(-I):I}const f=(I,E,x)=>Ms(I.slice(E,x));class w{constructor(E,x,T){this.r=E,this.s=x,this.recovery=T,this.assertValidity()}static fromCompact(E){const x=e.nByteLength;return E=Pi("compactSignature",E,x*2),new w(f(E,0,x),f(E,x,2*x))}static fromDER(E){const{r:x,s:T}=gr.toSig(Pi("DER",E));return new w(x,T)}assertValidity(){Bs("r",this.r,dt,r),Bs("s",this.s,dt,r)}addRecoveryBit(E){return new w(this.r,this.s,E)}recoverPublicKey(E){const{r:x,s:T,recovery:O}=this,R=N(Pi("msgHash",E));if(O==null||![0,1,2,3].includes(O))throw new Error("recovery id invalid");const B=O===2||O===3?x+e.n:x;if(B>=i.ORDER)throw new Error("recovery id 2 or 3 invalid");const F=O&1?"03":"02",G=c.fromHex(F+h(B)),oe=a(B),se=o(-R*oe),fe=o(T*oe),Ce=c.BASE.multiplyAndAddUnsafe(G,se,fe);if(!Ce)throw new Error("point at infinify");return Ce.assertValidity(),Ce}hasHighS(){return p(this.s)}normalizeS(){return this.hasHighS()?new w(this.r,o(-this.s),this.recovery):this}toDERRawBytes(){return Qn(this.toDERHex())}toDERHex(){return gr.hexFromSig({r:this.r,s:this.s})}toCompactRawBytes(){return Qn(this.toCompactHex())}toCompactHex(){return h(this.r)+h(this.s)}}const m={isValidPrivateKey(I){try{return l(I),!0}catch{return!1}},normPrivateKeyToScalar:l,randomPrivateKey:()=>{const I=u2(e.n);return qA(e.randomBytes(I),e.n)},precompute(I=8,E=c.BASE){return E._setWindowSize(I),E.multiply(BigInt(3)),E}};function y(I,E=!0){return c.fromPrivateKey(I).toRawBytes(E)}function b(I){const E=Ws(I),x=typeof I=="string",T=(E||x)&&I.length;return E?T===s||T===n:x?T===2*s||T===2*n:I instanceof c}function v(I,E,x=!0){if(b(I))throw new Error("first arg must be private key");if(!b(E))throw new Error("second arg must be public key");return c.fromHex(E).multiply(l(I)).toRawBytes(x)}const S=e.bits2int||function(I){if(I.length>8192)throw new Error("input is too large");const E=Ms(I),x=I.length*8-e.nBitLength;return x>0?E>>BigInt(x):E},N=e.bits2int_modN||function(I){return o(S(I))},P=Kp(e.nBitLength);function k(I){return Bs("num < 2^"+e.nBitLength,I,mr,P),eo(I,e.nByteLength)}function _(I,E,x=M){if(["recovered","canonical"].some(Ae=>Ae in x))throw new Error("sign() legacy options not supported");const{hash:T,randomBytes:O}=e;let{lowS:R,prehash:B,extraEntropy:F}=x;R==null&&(R=!0),I=Pi("msgHash",I),Ig(x),B&&(I=Pi("prehashed msgHash",T(I)));const G=N(I),oe=l(E),se=[k(oe),k(G)];if(F!=null&&F!==!1){const Ae=F===!0?O(i.BYTES):F;se.push(Pi("extraEntropy",Ae))}const fe=Fa(...se),Ce=G;function Me(Ae){const Ee=S(Ae);if(!d(Ee))return;const ze=a(Ee),Ve=c.BASE.multiply(Ee).toAffine(),Ke=o(Ve.x);if(Ke===mr)return;const Ze=o(ze*o(Ce+Ke*oe));if(Ze===mr)return;let Nt=(Ve.x===Ke?0:2)|Number(Ve.y&dt),Qr=Ze;return R&&p(Ze)&&(Qr=g(Ze),Nt^=1),new w(Ke,Qr,Nt)}return{seed:fe,k2sig:Me}}const M={lowS:e.lowS,prehash:!1},L={lowS:e.lowS,prehash:!1};function U(I,E,x=M){const{seed:T,k2sig:O}=_(I,E,x),R=e;return Qm(R.hash.outputLen,R.nByteLength,R.hmac)(T,O)}c.BASE._setWindowSize(8);function K(I,E,x,T=L){var Ze;const O=I;E=Pi("msgHash",E),x=Pi("publicKey",x);const{lowS:R,prehash:B,format:F}=T;if(Ig(T),"strict"in T)throw new Error("options.strict was renamed to lowS");if(F!==void 0&&F!=="compact"&&F!=="der")throw new Error("format must be compact or der");const G=typeof O=="string"||Ws(O),oe=!G&&!F&&typeof O=="object"&&O!==null&&typeof O.r=="bigint"&&typeof O.s=="bigint";if(!G&&!oe)throw new Error("invalid signature, expected Uint8Array, hex string or Signature instance");let se,fe;try{if(oe&&(se=new w(O.r,O.s)),G){try{F!=="compact"&&(se=w.fromDER(O))}catch(Nt){if(!(Nt instanceof gr.Err))throw Nt}!se&&F!=="der"&&(se=w.fromCompact(O))}fe=c.fromHex(x)}catch{return!1}if(!se||R&&se.hasHighS())return!1;B&&(E=e.hash(E));const{r:Ce,s:Me}=se,Ae=N(E),Ee=a(Me),ze=o(Ae*Ee),Ve=o(Ce*Ee),Ke=(Ze=c.BASE.multiplyAndAddUnsafe(fe,ze,Ve))==null?void 0:Ze.toAffine();return Ke?o(Ke.x)===Ce:!1}return{CURVE:e,getPublicKey:y,getSharedSecret:v,sign:U,verify:K,ProjectivePoint:c,Signature:w,utils:m}}function i_(t){return{hash:t,hmac:(e,...i)=>o2(t,e,bx(...i)),randomBytes:vx}}function r_(t,e){const i=r=>t_({...t,...i_(r)});return{...i(e),create:i}}const g2=BigInt("0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffefffffc2f"),_g=BigInt("0xfffffffffffffffffffffffffffffffebaaedce6af48a03bbfd25e8cd0364141"),s_=BigInt(1),lp=BigInt(2),Ng=(t,e)=>(t+e/lp)/e;function n_(t){const e=g2,i=BigInt(3),r=BigInt(6),s=BigInt(11),n=BigInt(22),o=BigInt(23),a=BigInt(44),c=BigInt(88),l=t*t*t%e,u=l*l*t%e,d=ui(u,i,e)*u%e,h=ui(d,i,e)*u%e,p=ui(h,lp,e)*l%e,g=ui(p,s,e)*p%e,f=ui(g,n,e)*g%e,w=ui(f,a,e)*f%e,m=ui(w,c,e)*w%e,y=ui(m,a,e)*f%e,b=ui(y,i,e)*u%e,v=ui(b,o,e)*g%e,S=ui(v,r,e)*l%e,N=ui(S,lp,e);if(!up.eql(up.sqr(N),t))throw new Error("Cannot find square root");return N}const up=c2(g2,void 0,void 0,{sqrt:n_});r_({a:BigInt(0),b:BigInt(7),Fp:up,n:_g,Gx:BigInt("55066263022277343669578718895168534326250603453777594175500187360389116729240"),Gy:BigInt("32670510020758816978083085130507043184471273380659243275938904335757337482424"),h:BigInt(1),lowS:!0,endo:{beta:BigInt("0x7ae96a2b657c07106e64479eac3434e99cf0497512f58995c1396c28719501ee"),splitScalar:t=>{const e=_g,i=BigInt("0x3086d221a7d46bcde86c90e49284eb15"),r=-s_*BigInt("0xe4437ed6010e88286f547fa90abfe4c3"),s=BigInt("0x114ca50f7a8e2f3f657c1108d9d44cfd8"),n=i,o=BigInt("0x100000000000000000000000000000000"),a=Ng(n*t,e),c=Ng(-r*t,e);let l=Ht(t-a*i-c*s,e),u=Ht(-a*r-c*n,e);const d=l>o,h=u>o;if(d&&(l=e-l),h&&(u=e-u),l>o||u>o)throw new Error("splitScalar: Endomorphism failed, k="+t);return{k1neg:d,k1:l,k2neg:h,k2:u}}}},qm),BigInt(0);const md={createBalance(t,e){const i={name:t.metadata.name||"",symbol:t.metadata.symbol||"",decimals:t.metadata.decimals||0,value:t.metadata.value||0,price:t.metadata.price||0,iconUrl:t.metadata.iconUrl||""};return{name:i.name,symbol:i.symbol,chainId:e,address:t.address==="native"?void 0:this.convertAddressToCAIP10Address(t.address,e),value:i.value,price:i.price,quantity:{decimals:i.decimals.toString(),numeric:this.convertHexToBalance({hex:t.balance,decimals:i.decimals})},iconUrl:i.iconUrl}},convertHexToBalance({hex:t,decimals:e}){return Lm(BigInt(t),e)},convertAddressToCAIP10Address(t,e){return`${e}:${t}`},createCAIP2ChainId(t,e){return`${e}:${parseInt(t,16)}`},getChainIdHexFromCAIP2ChainId(t){const e=t.split(":");if(e.length<2||!e[1])return"0x0";const i=e[1],r=parseInt(i,10);return isNaN(r)?"0x0":`0x${r.toString(16)}`},isWalletGetAssetsResponse(t){return typeof t!="object"||t===null?!1:Object.values(t).every(e=>Array.isArray(e)&&e.every(i=>this.isValidAsset(i)))},isValidAsset(t){return typeof t=="object"&&t!==null&&typeof t.address=="string"&&typeof t.balance=="string"&&(t.type==="ERC20"||t.type==="NATIVE")&&typeof t.metadata=="object"&&t.metadata!==null&&typeof t.metadata.name=="string"&&typeof t.metadata.symbol=="string"&&typeof t.metadata.decimals=="number"&&typeof t.metadata.price=="number"&&typeof t.metadata.iconUrl=="string"}},Sg={async getMyTokensWithBalance(t){const e=ae.state.address,i=C.state.activeCaipNetwork;if(!e||!i)return[];if(i.chainNamespace==="eip155"){const s=await this.getEIP155Balances(e,i);if(s)return this.filterLowQualityTokens(s)}const r=await de.getBalance(e,i.caipNetworkId,t);return this.filterLowQualityTokens(r.balances)},async getEIP155Balances(t,e){var i,r,s;try{const n=md.getChainIdHexFromCAIP2ChainId(e.caipNetworkId);if(!((s=(r=(i=await ne.getCapabilities(t))==null?void 0:i[n])==null?void 0:r.assetDiscovery)!=null&&s.supported))return null;const o=await ne.walletGetAssets({account:t,chainFilter:[n]});return md.isWalletGetAssetsResponse(o)?(o[n]||[]).map(a=>md.createBalance(a,e.caipNetworkId)):null}catch{return null}},filterLowQualityTokens(t){return t.filter(e=>e.quantity.decimals!=="0")},mapBalancesToSwapTokens(t){return(t==null?void 0:t.map(e=>({...e,address:e!=null&&e.address?e.address:C.getActiveNetworkTokenAddress(),decimals:parseInt(e.quantity.decimals,10),logoUri:e.iconUrl,eip2612:!1})))||[]}},xe=je({tokenBalances:[],loading:!1}),$g={state:xe,subscribe(t){return _t(xe,()=>t(xe))},subscribeKey(t,e){return Rt(xe,t,e)},setToken(t){t&&(xe.token=Hs(t))},setTokenAmount(t){xe.sendTokenAmount=t},setReceiverAddress(t){xe.receiverAddress=t},setReceiverProfileImageUrl(t){xe.receiverProfileImageUrl=t},setReceiverProfileName(t){xe.receiverProfileName=t},setGasPrice(t){xe.gasPrice=t},setGasPriceInUsd(t){xe.gasPriceInUSD=t},setNetworkBalanceInUsd(t){xe.networkBalanceInUSD=t},setLoading(t){xe.loading=t},sendToken(){var t;switch((t=C.state.activeCaipNetwork)==null?void 0:t.chainNamespace){case"eip155":this.sendEvmToken();return;case"solana":this.sendSolanaToken();return;default:throw new Error("Unsupported chain")}},sendEvmToken(){var i,r,s,n,o,a;const t=C.state.activeChain,e=(i=ae.state.preferredAccountTypes)==null?void 0:i[t];(r=this.state.token)!=null&&r.address&&this.state.sendTokenAmount&&this.state.receiverAddress?(me.sendEvent({type:"track",event:"SEND_INITIATED",properties:{isSmartAccount:e===Mr.ACCOUNT_TYPES.SMART_ACCOUNT,token:this.state.token.address,amount:this.state.sendTokenAmount,network:((s=C.state.activeCaipNetwork)==null?void 0:s.caipNetworkId)||""}}),this.sendERC20Token({receiverAddress:this.state.receiverAddress,tokenAddress:this.state.token.address,sendTokenAmount:this.state.sendTokenAmount,decimals:this.state.token.quantity.decimals})):this.state.receiverAddress&&this.state.sendTokenAmount&&this.state.gasPrice&&((n=this.state.token)!=null&&n.quantity.decimals)&&(me.sendEvent({type:"track",event:"SEND_INITIATED",properties:{isSmartAccount:e===Mr.ACCOUNT_TYPES.SMART_ACCOUNT,token:(o=this.state.token)==null?void 0:o.symbol,amount:this.state.sendTokenAmount,network:((a=C.state.activeCaipNetwork)==null?void 0:a.caipNetworkId)||""}}),this.sendNativeToken({receiverAddress:this.state.receiverAddress,sendTokenAmount:this.state.sendTokenAmount,gasPrice:this.state.gasPrice,decimals:this.state.token.quantity.decimals}))},async fetchTokenBalance(t){var n,o;xe.loading=!0;const e=(n=C.state.activeCaipNetwork)==null?void 0:n.caipNetworkId,i=(o=C.state.activeCaipNetwork)==null?void 0:o.chainNamespace,r=C.state.activeCaipAddress,s=r?q.getPlainAddress(r):void 0;if(xe.lastRetry&&!q.isAllowedRetry(xe.lastRetry,30*nt.ONE_SEC_MS))return xe.loading=!1,[];try{if(s&&e&&i){const a=await Sg.getMyTokensWithBalance();return xe.tokenBalances=a,xe.lastRetry=void 0,a}}catch(a){xe.lastRetry=Date.now(),t==null||t(a),De.showError("Token Balance Unavailable")}finally{xe.loading=!1}return[]},fetchNetworkBalance(){if(xe.tokenBalances.length===0)return;const t=Sg.mapBalancesToSwapTokens(xe.tokenBalances);if(!t)return;const e=t.find(i=>i.address===C.getActiveNetworkTokenAddress());e&&(xe.networkBalanceInUSD=e?_c.multiply(e.quantity.numeric,e.price).toString():"0")},isInsufficientNetworkTokenForGas(t,e){const i=e||"0";return _c.bigNumber(t).eq(0)?!0:_c.bigNumber(_c.bigNumber(i)).gt(t)},hasInsufficientGasFunds(){var i;const t=C.state.activeChain;let e=!0;return((i=ae.state.preferredAccountTypes)==null?void 0:i[t])===Mr.ACCOUNT_TYPES.SMART_ACCOUNT?e=!1:xe.networkBalanceInUSD&&(e=this.isInsufficientNetworkTokenForGas(xe.networkBalanceInUSD,xe.gasPriceInUSD)),e},async sendNativeToken(t){var o,a,c,l,u,d;const e=C.state.activeChain;Y.pushTransactionStack({view:"Account",goBack:!1});const i=t.receiverAddress,r=ae.state.address,s=ne.parseUnits(t.sendTokenAmount.toString(),Number(t.decimals)),n="0x";try{await ne.sendTransaction({chainNamespace:"eip155",to:i,address:r,data:n,value:s??BigInt(0),gasPrice:t.gasPrice}),De.showSuccess("Transaction started"),me.sendEvent({type:"track",event:"SEND_SUCCESS",properties:{isSmartAccount:((o=ae.state.preferredAccountTypes)==null?void 0:o[e])===Mr.ACCOUNT_TYPES.SMART_ACCOUNT,token:((a=this.state.token)==null?void 0:a.symbol)||"",amount:t.sendTokenAmount,network:((c=C.state.activeCaipNetwork)==null?void 0:c.caipNetworkId)||""}}),this.resetSend()}catch(h){console.error("SendController:sendERC20Token - failed to send native token",h);const p=h instanceof Error?h.message:"Unknown error";me.sendEvent({type:"track",event:"SEND_ERROR",properties:{message:p,isSmartAccount:((l=ae.state.preferredAccountTypes)==null?void 0:l[e])===Mr.ACCOUNT_TYPES.SMART_ACCOUNT,token:((u=this.state.token)==null?void 0:u.symbol)||"",amount:t.sendTokenAmount,network:((d=C.state.activeCaipNetwork)==null?void 0:d.caipNetworkId)||""}}),De.showError("Something went wrong")}},async sendERC20Token(t){var i,r,s;Y.pushTransactionStack({view:"Account",goBack:!1});const e=ne.parseUnits(t.sendTokenAmount.toString(),Number(t.decimals));try{if(ae.state.address&&t.sendTokenAmount&&t.receiverAddress&&t.tokenAddress){const n=q.getPlainAddress(t.tokenAddress);await ne.writeContract({fromAddress:ae.state.address,tokenAddress:n,args:[t.receiverAddress,e??BigInt(0)],method:"transfer",abi:OE.getERC20Abi(n),chainNamespace:"eip155"}),De.showSuccess("Transaction started"),this.resetSend()}}catch(n){console.error("SendController:sendERC20Token - failed to send erc20 token",n);const o=n instanceof Error?n.message:"Unknown error";me.sendEvent({type:"track",event:"SEND_ERROR",properties:{message:o,isSmartAccount:((i=ae.state.preferredAccountTypes)==null?void 0:i.eip155)===Mr.ACCOUNT_TYPES.SMART_ACCOUNT,token:((r=this.state.token)==null?void 0:r.symbol)||"",amount:t.sendTokenAmount,network:((s=C.state.activeCaipNetwork)==null?void 0:s.caipNetworkId)||""}}),De.showError("Something went wrong")}},sendSolanaToken(){if(!this.state.sendTokenAmount||!this.state.receiverAddress){De.showError("Please enter a valid amount and receiver address");return}Y.pushTransactionStack({view:"Account",goBack:!1}),ne.sendTransaction({chainNamespace:"solana",to:this.state.receiverAddress,value:this.state.sendTokenAmount}).then(()=>{this.resetSend(),ae.fetchTokenBalance()}).catch(t=>{De.showError("Failed to send transaction. Please try again."),console.error("SendController:sendToken - failed to send solana transaction",t)})},resetSend(){xe.token=void 0,xe.sendTokenAmount=void 0,xe.receiverAddress=void 0,xe.receiverProfileImageUrl=void 0,xe.receiverProfileName=void 0,xe.loading=!1,xe.tokenBalances=[]}},yd={currentTab:0,tokenBalance:[],smartAccountDeployed:!1,addressLabels:new Map,allAccounts:[],user:void 0},Rc={caipNetwork:void 0,supportsAllNetworks:!0,smartAccountEnabledNetworks:[]},Z=je({chains:UE(),activeCaipAddress:void 0,activeChain:void 0,activeCaipNetwork:void 0,noAdapters:!1,universalAdapter:{networkControllerClient:void 0,connectionControllerClient:void 0},isSwitchingNamespace:!1}),C={state:Z,subscribe(t){return _t(Z,()=>{t(Z)})},subscribeKey(t,e){return Rt(Z,t,e)},subscribeChainProp(t,e,i){let r;return _t(Z.chains,()=>{var n;const s=i||Z.activeChain;if(s){const o=(n=Z.chains.get(s))==null?void 0:n[t];r!==o&&(r=o,e(o))}})},initialize(t,e,i){const{chainId:r,namespace:s}=ie.getActiveNetworkProps(),n=e==null?void 0:e.find(c=>c.id.toString()===(r==null?void 0:r.toString())),o=t.find(c=>(c==null?void 0:c.namespace)===s)||(t==null?void 0:t[0]),a=new Set([...(e==null?void 0:e.map(c=>c.chainNamespace))??[]]);((t==null?void 0:t.length)===0||!o)&&(Z.noAdapters=!0),Z.noAdapters||(Z.activeChain=o==null?void 0:o.namespace,Z.activeCaipNetwork=n,this.setChainNetworkData(o==null?void 0:o.namespace,{caipNetwork:n}),Z.activeChain&&vr.set({activeChain:o==null?void 0:o.namespace})),a.forEach(c=>{const l=e==null?void 0:e.filter(u=>u.chainNamespace===c);C.state.chains.set(c,{namespace:c,networkState:je({...Rc,caipNetwork:l==null?void 0:l[0]}),accountState:je(yd),caipNetworks:l??[],...i}),this.setRequestedCaipNetworks(l??[],c)})},removeAdapter(t){var e,i;if(Z.activeChain===t){const r=Array.from(Z.chains.entries()).find(([s])=>s!==t);if(r){const s=(i=(e=r[1])==null?void 0:e.caipNetworks)==null?void 0:i[0];s&&this.setActiveCaipNetwork(s)}}Z.chains.delete(t)},addAdapter(t,{networkControllerClient:e,connectionControllerClient:i},r){Z.chains.set(t.namespace,{namespace:t.namespace,networkState:{...Rc,caipNetwork:r[0]},accountState:yd,caipNetworks:r,connectionControllerClient:i,networkControllerClient:e}),this.setRequestedCaipNetworks((r==null?void 0:r.filter(s=>s.chainNamespace===t.namespace))??[],t.namespace)},addNetwork(t){var i;const e=Z.chains.get(t.chainNamespace);if(e){const r=[...e.caipNetworks||[]];(i=e.caipNetworks)!=null&&i.find(s=>s.id===t.id)||r.push(t),Z.chains.set(t.chainNamespace,{...e,caipNetworks:r}),this.setRequestedCaipNetworks(r,t.chainNamespace)}},removeNetwork(t,e){var r,s,n;const i=Z.chains.get(t);if(i){const o=((r=Z.activeCaipNetwork)==null?void 0:r.id)===e,a=[...((s=i.caipNetworks)==null?void 0:s.filter(c=>c.id!==e))||[]];o&&((n=i==null?void 0:i.caipNetworks)!=null&&n[0])&&this.setActiveCaipNetwork(i.caipNetworks[0]),Z.chains.set(t,{...i,caipNetworks:a}),this.setRequestedCaipNetworks(a||[],t)}},setAdapterNetworkState(t,e){const i=Z.chains.get(t);i&&(i.networkState={...i.networkState||Rc,...e},Z.chains.set(t,i))},setChainAccountData(t,e,i=!0){if(!t)throw new Error("Chain is required to update chain account data");const r=Z.chains.get(t);if(r){const s={...r.accountState||yd,...e};Z.chains.set(t,{...r,accountState:s}),(Z.chains.size===1||Z.activeChain===t)&&(e.caipAddress&&(Z.activeCaipAddress=e.caipAddress),ae.replaceState(s))}},setChainNetworkData(t,e){if(!t)return;const i=Z.chains.get(t);if(i){const r={...i.networkState||Rc,...e};Z.chains.set(t,{...i,networkState:r})}},setAccountProp(t,e,i,r=!0){this.setChainAccountData(i,{[t]:e},r),t==="status"&&e==="disconnected"&&i&&X.removeConnectorId(i)},setActiveNamespace(t){var r,s;Z.activeChain=t;const e=t?Z.chains.get(t):void 0,i=(r=e==null?void 0:e.networkState)==null?void 0:r.caipNetwork;i!=null&&i.id&&t&&(Z.activeCaipAddress=(s=e==null?void 0:e.accountState)==null?void 0:s.caipAddress,Z.activeCaipNetwork=i,this.setChainNetworkData(t,{caipNetwork:i}),ie.setActiveCaipNetworkId(i==null?void 0:i.caipNetworkId),vr.set({activeChain:t,selectedNetworkId:i==null?void 0:i.caipNetworkId}))},setActiveCaipNetwork(t){var i,r,s;if(!t)return;Z.activeChain!==t.chainNamespace&&this.setIsSwitchingNamespace(!0);const e=Z.chains.get(t.chainNamespace);Z.activeChain=t.chainNamespace,Z.activeCaipNetwork=t,this.setChainNetworkData(t.chainNamespace,{caipNetwork:t}),(i=e==null?void 0:e.accountState)!=null&&i.address?Z.activeCaipAddress=`${t.chainNamespace}:${t.id}:${(r=e==null?void 0:e.accountState)==null?void 0:r.address}`:Z.activeCaipAddress=void 0,this.setAccountProp("caipAddress",Z.activeCaipAddress,t.chainNamespace),e&&ae.replaceState(e.accountState),$g.resetSend(),vr.set({activeChain:Z.activeChain,selectedNetworkId:(s=Z.activeCaipNetwork)==null?void 0:s.caipNetworkId}),ie.setActiveCaipNetworkId(t.caipNetworkId),!this.checkIfSupportedNetwork(t.chainNamespace)&&j.state.enableNetworkSwitch&&!j.state.allowUnsupportedChain&&!ne.state.wcBasic&&this.showUnsupportedChainUI()},addCaipNetwork(t){var i;if(!t)return;const e=Z.chains.get(t.chainNamespace);e&&((i=e==null?void 0:e.caipNetworks)==null||i.push(t))},async switchActiveNamespace(t){var s;if(!t)return;const e=t!==C.state.activeChain,i=(s=C.getNetworkData(t))==null?void 0:s.caipNetwork,r=C.getCaipNetworkByNamespace(t,i==null?void 0:i.id);e&&r&&await C.switchActiveNetwork(r)},async switchActiveNetwork(t){var i,r;!((r=(i=C.state.chains.get(C.state.activeChain))==null?void 0:i.caipNetworks)!=null&&r.some(s=>{var n;return s.id===((n=Z.activeCaipNetwork)==null?void 0:n.id)}))&&Y.goBack();const e=this.getNetworkControllerClient(t.chainNamespace);e&&(await e.switchCaipNetwork(t),me.sendEvent({type:"track",event:"SWITCH_NETWORK",properties:{network:t.caipNetworkId}}))},getNetworkControllerClient(t){const e=t||Z.activeChain,i=Z.chains.get(e);if(!i)throw new Error("Chain adapter not found");if(!i.networkControllerClient)throw new Error("NetworkController client not set");return i.networkControllerClient},getConnectionControllerClient(t){const e=t||Z.activeChain;if(!e)throw new Error("Chain is required to get connection controller client");const i=Z.chains.get(e);if(!(i!=null&&i.connectionControllerClient))throw new Error("ConnectionController client not set");return i.connectionControllerClient},getAccountProp(t,e){var s;let i=Z.activeChain;if(e&&(i=e),!i)return;const r=(s=Z.chains.get(i))==null?void 0:s.accountState;if(r)return r[t]},getNetworkProp(t,e){var r;const i=(r=Z.chains.get(e))==null?void 0:r.networkState;if(i)return i[t]},getRequestedCaipNetworks(t){const e=Z.chains.get(t),{approvedCaipNetworkIds:i=[],requestedCaipNetworks:r=[]}=(e==null?void 0:e.networkState)||{};return q.sortRequestedNetworks(i,r)},getAllRequestedCaipNetworks(){const t=[];return Z.chains.forEach(e=>{const i=this.getRequestedCaipNetworks(e.namespace);t.push(...i)}),t},setRequestedCaipNetworks(t,e){this.setAdapterNetworkState(e,{requestedCaipNetworks:t})},getAllApprovedCaipNetworkIds(){const t=[];return Z.chains.forEach(e=>{const i=this.getApprovedCaipNetworkIds(e.namespace);t.push(...i)}),t},getActiveCaipNetwork(){return Z.activeCaipNetwork},getActiveCaipAddress(){return Z.activeCaipAddress},getApprovedCaipNetworkIds(t){var e,i;return((i=(e=Z.chains.get(t))==null?void 0:e.networkState)==null?void 0:i.approvedCaipNetworkIds)||[]},async setApprovedCaipNetworksData(t){var i;const e=await((i=this.getNetworkControllerClient())==null?void 0:i.getApprovedCaipNetworksData());this.setAdapterNetworkState(t,{approvedCaipNetworkIds:e==null?void 0:e.approvedCaipNetworkIds,supportsAllNetworks:e==null?void 0:e.supportsAllNetworks})},checkIfSupportedNetwork(t,e){const i=e||Z.activeCaipNetwork,r=this.getRequestedCaipNetworks(t);return r.length?r==null?void 0:r.some(s=>s.id===(i==null?void 0:i.id)):!0},checkIfSupportedChainId(t){var e;return Z.activeChain?(e=this.getRequestedCaipNetworks(Z.activeChain))==null?void 0:e.some(i=>i.id===t):!0},setSmartAccountEnabledNetworks(t,e){this.setAdapterNetworkState(e,{smartAccountEnabledNetworks:t})},checkIfSmartAccountEnabled(){var i,r;const t=wm.caipNetworkIdToNumber((i=Z.activeCaipNetwork)==null?void 0:i.caipNetworkId),e=Z.activeChain;return!e||!t?!1:!!((r=this.getNetworkProp("smartAccountEnabledNetworks",e))!=null&&r.includes(Number(t)))},getActiveNetworkTokenAddress(){var r,s;const t=((r=Z.activeCaipNetwork)==null?void 0:r.chainNamespace)||"eip155",e=((s=Z.activeCaipNetwork)==null?void 0:s.id)||1,i=nt.NATIVE_TOKEN_ADDRESS[t];return`${t}:${e}:${i}`},showUnsupportedChainUI(){Ie.open({view:"UnsupportedChain"})},checkIfNamesSupported(){const t=Z.activeCaipNetwork;return!!(t!=null&&t.chainNamespace&&nt.NAMES_SUPPORTED_CHAIN_NAMESPACES.includes(t.chainNamespace))},resetNetwork(t){this.setAdapterNetworkState(t,{approvedCaipNetworkIds:void 0,supportsAllNetworks:!0,smartAccountEnabledNetworks:[]})},resetAccount(t){const e=t;if(!e)throw new Error("Chain is required to set account prop");Z.activeCaipAddress=void 0,this.setChainAccountData(e,{smartAccountDeployed:!1,currentTab:0,caipAddress:void 0,address:void 0,balance:void 0,balanceSymbol:void 0,profileName:void 0,profileImage:void 0,addressExplorerUrl:void 0,tokenBalance:[],connectedWalletInfo:void 0,preferredAccountTypes:void 0,socialProvider:void 0,socialWindow:void 0,farcasterUrl:void 0,allAccounts:[],user:void 0,status:"disconnected"}),X.removeConnectorId(e)},async disconnect(t){const e=YE(t);try{$g.resetSend();const i=await Promise.allSettled(e.map(async([s,n])=>{var o;try{const{caipAddress:a}=this.getAccountData(s)||{};a&&((o=n.connectionControllerClient)!=null&&o.disconnect)&&await n.connectionControllerClient.disconnect(s),this.resetAccount(s),this.resetNetwork(s)}catch(a){throw new Error(`Failed to disconnect chain ${s}: ${a.message}`)}}));ne.resetWcConnection();const r=i.filter(s=>s.status==="rejected");if(r.length>0)throw new Error(r.map(s=>s.reason.message).join(", "));ie.deleteConnectedSocialProvider(),t?X.removeConnectorId(t):X.resetConnectorIds(),me.sendEvent({type:"track",event:"DISCONNECT_SUCCESS",properties:{namespace:t||"all"}})}catch(i){console.error(i.message||"Failed to disconnect chains"),me.sendEvent({type:"track",event:"DISCONNECT_ERROR",properties:{message:i.message||"Failed to disconnect chains"}})}},setIsSwitchingNamespace(t){Z.isSwitchingNamespace=t},getFirstCaipNetworkSupportsAuthConnector(){var i,r;const t=[];let e;if(Z.chains.forEach(s=>{re.AUTH_CONNECTOR_SUPPORTED_CHAINS.find(n=>n===s.namespace)&&s.namespace&&t.push(s.namespace)}),t.length>0){const s=t[0];return e=s?(r=(i=Z.chains.get(s))==null?void 0:i.caipNetworks)==null?void 0:r[0]:void 0,e}},getAccountData(t){var e;return t?(e=C.state.chains.get(t))==null?void 0:e.accountState:ae.state},getNetworkData(t){var i;const e=t||Z.activeChain;if(e)return(i=C.state.chains.get(e))==null?void 0:i.networkState},getCaipNetworkByNamespace(t,e){var s,n,o;if(!t)return;const i=C.state.chains.get(t);return((s=i==null?void 0:i.caipNetworks)==null?void 0:s.find(a=>a.id===e))||((n=i==null?void 0:i.networkState)==null?void 0:n.caipNetwork)||((o=i==null?void 0:i.caipNetworks)==null?void 0:o[0])},getRequestedCaipNetworkIds(){const t=X.state.filterByNamespace;return(t?[Z.chains.get(t)]:Array.from(Z.chains.values())).flatMap(e=>(e==null?void 0:e.caipNetworks)||[]).map(e=>e.caipNetworkId)},getCaipNetworks(t){return t?C.getRequestedCaipNetworks(t):C.getAllRequestedCaipNetworks()}},o_={purchaseCurrencies:[{id:"2b92315d-eab7-5bef-84fa-089a131333f5",name:"USD Coin",symbol:"USDC",networks:[{name:"ethereum-mainnet",display_name:"Ethereum",chain_id:"1",contract_address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"},{name:"polygon-mainnet",display_name:"Polygon",chain_id:"137",contract_address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}]},{id:"2b92315d-eab7-5bef-84fa-089a131333f5",name:"Ether",symbol:"ETH",networks:[{name:"ethereum-mainnet",display_name:"Ethereum",chain_id:"1",contract_address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"},{name:"polygon-mainnet",display_name:"Polygon",chain_id:"137",contract_address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}]}],paymentCurrencies:[{id:"USD",payment_method_limits:[{id:"card",min:"10.00",max:"7500.00"},{id:"ach_bank_account",min:"10.00",max:"25000.00"}]},{id:"EUR",payment_method_limits:[{id:"card",min:"10.00",max:"7500.00"},{id:"ach_bank_account",min:"10.00",max:"25000.00"}]}]},f2=q.getBlockchainApiUrl(),Yt=je({clientId:null,api:new yu({baseUrl:f2,clientId:null}),supportedChains:{http:[],ws:[]}}),de={state:Yt,async get(t){const{st:e,sv:i}=de.getSdkProperties(),r=j.state.projectId,s={...t.params||{},st:e,sv:i,projectId:r};return Yt.api.get({...t,params:s})},getSdkProperties(){const{sdkType:t,sdkVersion:e}=j.state;return{st:t||"unknown",sv:e||"unknown"}},async isNetworkSupported(t){if(!t)return!1;try{Yt.supportedChains.http.length||await de.getSupportedNetworks()}catch{return!1}return Yt.supportedChains.http.includes(t)},async getSupportedNetworks(){const t=await de.get({path:"v1/supported-chains"});return Yt.supportedChains=t,t},async fetchIdentity({address:t,caipNetworkId:e}){if(!await de.isNetworkSupported(e))return{avatar:"",name:""};const i=ie.getIdentityFromCacheForAddress(t);if(i)return i;const r=await de.get({path:`/v1/identity/${t}`,params:{sender:C.state.activeCaipAddress?q.getPlainAddress(C.state.activeCaipAddress):void 0}});return ie.updateIdentityCache({address:t,identity:r,timestamp:Date.now()}),r},async fetchTransactions({account:t,cursor:e,onramp:i,signal:r,cache:s,chainId:n}){var o;return await de.isNetworkSupported((o=C.state.activeCaipNetwork)==null?void 0:o.caipNetworkId)?de.get({path:`/v1/account/${t}/history`,params:{cursor:e,onramp:i,chainId:n},signal:r,cache:s}):{data:[],next:void 0}},async fetchSwapQuote({amount:t,userAddress:e,from:i,to:r,gasPrice:s}){var n;return await de.isNetworkSupported((n=C.state.activeCaipNetwork)==null?void 0:n.caipNetworkId)?de.get({path:"/v1/convert/quotes",headers:{"Content-Type":"application/json"},params:{amount:t,userAddress:e,from:i,to:r,gasPrice:s}}):{quotes:[]}},async fetchSwapTokens({chainId:t}){var e;return await de.isNetworkSupported((e=C.state.activeCaipNetwork)==null?void 0:e.caipNetworkId)?de.get({path:"/v1/convert/tokens",params:{chainId:t}}):{tokens:[]}},async fetchTokenPrice({addresses:t}){var e;return await de.isNetworkSupported((e=C.state.activeCaipNetwork)==null?void 0:e.caipNetworkId)?Yt.api.post({path:"/v1/fungible/price",body:{currency:"usd",addresses:t,projectId:j.state.projectId},headers:{"Content-Type":"application/json"}}):{fungibles:[]}},async fetchSwapAllowance({tokenAddress:t,userAddress:e}){var i;return await de.isNetworkSupported((i=C.state.activeCaipNetwork)==null?void 0:i.caipNetworkId)?de.get({path:"/v1/convert/allowance",params:{tokenAddress:t,userAddress:e},headers:{"Content-Type":"application/json"}}):{allowance:"0"}},async fetchGasPrice({chainId:t}){var r;const{st:e,sv:i}=de.getSdkProperties();if(!await de.isNetworkSupported((r=C.state.activeCaipNetwork)==null?void 0:r.caipNetworkId))throw new Error("Network not supported for Gas Price");return de.get({path:"/v1/convert/gas-price",headers:{"Content-Type":"application/json"},params:{chainId:t,st:e,sv:i}})},async generateSwapCalldata({amount:t,from:e,to:i,userAddress:r,disableEstimate:s}){var n;if(!await de.isNetworkSupported((n=C.state.activeCaipNetwork)==null?void 0:n.caipNetworkId))throw new Error("Network not supported for Swaps");return Yt.api.post({path:"/v1/convert/build-transaction",headers:{"Content-Type":"application/json"},body:{amount:t,eip155:{slippage:nt.CONVERT_SLIPPAGE_TOLERANCE},projectId:j.state.projectId,from:e,to:i,userAddress:r,disableEstimate:s}})},async generateApproveCalldata({from:t,to:e,userAddress:i}){var n;const{st:r,sv:s}=de.getSdkProperties();if(!await de.isNetworkSupported((n=C.state.activeCaipNetwork)==null?void 0:n.caipNetworkId))throw new Error("Network not supported for Swaps");return de.get({path:"/v1/convert/build-approve",headers:{"Content-Type":"application/json"},params:{userAddress:i,from:t,to:e,st:r,sv:s}})},async getBalance(t,e,i){var c;const{st:r,sv:s}=de.getSdkProperties();if(!await de.isNetworkSupported((c=C.state.activeCaipNetwork)==null?void 0:c.caipNetworkId))return De.showError("Token Balance Unavailable"),{balances:[]};const n=`${e}:${t}`,o=ie.getBalanceCacheForCaipAddress(n);if(o)return o;const a=await de.get({path:`/v1/account/${t}/balance`,params:{currency:"usd",chainId:e,forceUpdate:i,st:r,sv:s}});return ie.updateBalanceCache({caipAddress:n,balance:a,timestamp:Date.now()}),a},async lookupEnsName(t){var e;return await de.isNetworkSupported((e=C.state.activeCaipNetwork)==null?void 0:e.caipNetworkId)?de.get({path:`/v1/profile/account/${t}`,params:{apiVersion:"2"}}):{addresses:{},attributes:[]}},async reverseLookupEnsName({address:t}){var e;return await de.isNetworkSupported((e=C.state.activeCaipNetwork)==null?void 0:e.caipNetworkId)?de.get({path:`/v1/profile/reverse/${t}`,params:{sender:ae.state.address,apiVersion:"2"}}):[]},async getEnsNameSuggestions(t){var e;return await de.isNetworkSupported((e=C.state.activeCaipNetwork)==null?void 0:e.caipNetworkId)?de.get({path:`/v1/profile/suggestions/${t}`,params:{zone:"reown.id"}}):{suggestions:[]}},async registerEnsName({coinType:t,address:e,message:i,signature:r}){var s;return await de.isNetworkSupported((s=C.state.activeCaipNetwork)==null?void 0:s.caipNetworkId)?Yt.api.post({path:"/v1/profile/account",body:{coin_type:t,address:e,message:i,signature:r},headers:{"Content-Type":"application/json"}}):{success:!1}},async generateOnRampURL({destinationWallets:t,partnerUserId:e,defaultNetwork:i,purchaseAmount:r,paymentAmount:s}){var n;return await de.isNetworkSupported((n=C.state.activeCaipNetwork)==null?void 0:n.caipNetworkId)?(await Yt.api.post({path:"/v1/generators/onrampurl",params:{projectId:j.state.projectId},body:{destinationWallets:t,defaultNetwork:i,partnerUserId:e,defaultExperience:"buy",presetCryptoAmount:r,presetFiatAmount:s}})).url:""},async getOnrampOptions(){var t;if(!await de.isNetworkSupported((t=C.state.activeCaipNetwork)==null?void 0:t.caipNetworkId))return{paymentCurrencies:[],purchaseCurrencies:[]};try{return await de.get({path:"/v1/onramp/options"})}catch{return o_}},async getOnrampQuote({purchaseCurrency:t,paymentCurrency:e,amount:i,network:r}){var s;try{return await de.isNetworkSupported((s=C.state.activeCaipNetwork)==null?void 0:s.caipNetworkId)?await Yt.api.post({path:"/v1/onramp/quote",params:{projectId:j.state.projectId},body:{purchaseCurrency:t,paymentCurrency:e,amount:i,network:r}}):null}catch{return{coinbaseFee:{amount:i,currency:e.id},networkFee:{amount:i,currency:e.id},paymentSubtotal:{amount:i,currency:e.id},paymentTotal:{amount:i,currency:e.id},purchaseAmount:{amount:i,currency:e.id},quoteId:"mocked-quote-id"}}},async getSmartSessions(t){var e;return await de.isNetworkSupported((e=C.state.activeCaipNetwork)==null?void 0:e.caipNetworkId)?de.get({path:`/v1/sessions/${t}`}):[]},async revokeSmartSession(t,e,i){var r;return await de.isNetworkSupported((r=C.state.activeCaipNetwork)==null?void 0:r.caipNetworkId)?Yt.api.post({path:`/v1/sessions/${t}/revoke`,params:{projectId:j.state.projectId},body:{pci:e,signature:i}}):{success:!1}},setClientId(t){Yt.clientId=t,Yt.api=new yu({baseUrl:f2,clientId:t})}},di=je({currentTab:0,tokenBalance:[],smartAccountDeployed:!1,addressLabels:new Map,allAccounts:[]}),ae={state:di,replaceState(t){t&&Object.assign(di,Hs(t))},subscribe(t){return C.subscribeChainProp("accountState",e=>{if(e)return t(e)})},subscribeKey(t,e,i){let r;return C.subscribeChainProp("accountState",s=>{if(s){const n=s[t];r!==n&&(r=n,e(n))}},i)},setStatus(t,e){C.setAccountProp("status",t,e)},getCaipAddress(t){return C.getAccountProp("caipAddress",t)},setCaipAddress(t,e){const i=t?q.getPlainAddress(t):void 0;e===C.state.activeChain&&(C.state.activeCaipAddress=t),C.setAccountProp("caipAddress",t,e),C.setAccountProp("address",i,e)},setBalance(t,e,i){C.setAccountProp("balance",t,i),C.setAccountProp("balanceSymbol",e,i)},setProfileName(t,e){C.setAccountProp("profileName",t,e)},setProfileImage(t,e){C.setAccountProp("profileImage",t,e)},setUser(t,e){C.setAccountProp("user",t,e)},setAddressExplorerUrl(t,e){C.setAccountProp("addressExplorerUrl",t,e)},setSmartAccountDeployed(t,e){C.setAccountProp("smartAccountDeployed",t,e)},setCurrentTab(t){C.setAccountProp("currentTab",t,C.state.activeChain)},setTokenBalance(t,e){t&&C.setAccountProp("tokenBalance",t,e)},setShouldUpdateToAddress(t,e){C.setAccountProp("shouldUpdateToAddress",t,e)},setAllAccounts(t,e){C.setAccountProp("allAccounts",t,e)},addAddressLabel(t,e,i){const r=C.getAccountProp("addressLabels",i)||new Map;r.set(t,e),C.setAccountProp("addressLabels",r,i)},removeAddressLabel(t,e){const i=C.getAccountProp("addressLabels",e)||new Map;i.delete(t),C.setAccountProp("addressLabels",i,e)},setConnectedWalletInfo(t,e){C.setAccountProp("connectedWalletInfo",t,e,!1)},setPreferredAccountType(t,e){C.setAccountProp("preferredAccountTypes",{...di.preferredAccountTypes,[e]:t},e)},setPreferredAccountTypes(t){di.preferredAccountTypes=t},setSocialProvider(t,e){t&&C.setAccountProp("socialProvider",t,e)},setSocialWindow(t,e){C.setAccountProp("socialWindow",t?Hs(t):void 0,e)},setFarcasterUrl(t,e){C.setAccountProp("farcasterUrl",t,e)},async fetchTokenBalance(t){var n,o;di.balanceLoading=!0;const e=(n=C.state.activeCaipNetwork)==null?void 0:n.caipNetworkId,i=(o=C.state.activeCaipNetwork)==null?void 0:o.chainNamespace,r=C.state.activeCaipAddress,s=r?q.getPlainAddress(r):void 0;if(di.lastRetry&&!q.isAllowedRetry(di.lastRetry,30*nt.ONE_SEC_MS))return di.balanceLoading=!1,[];try{if(s&&e&&i){const a=(await de.getBalance(s,e)).balances.filter(c=>c.quantity.decimals!=="0");return this.setTokenBalance(a,i),di.lastRetry=void 0,di.balanceLoading=!1,a}}catch(a){di.lastRetry=Date.now(),t==null||t(a),De.showError("Token Balance Unavailable")}finally{di.balanceLoading=!1}return[]},resetAccount(t){C.resetAccount(t)}},Mt=je({loading:!1,loadingNamespaceMap:new Map,open:!1,shake:!1,namespace:void 0}),Ie={state:Mt,subscribe(t){return _t(Mt,()=>t(Mt))},subscribeKey(t,e){return Rt(Mt,t,e)},async open(t){var r;const e=ae.state.status==="connected";ne.state.wcBasic?J.prefetch({fetchNetworkImages:!1,fetchConnectorImages:!1}):await J.prefetch({fetchConnectorImages:!e,fetchFeaturedWallets:!e,fetchRecommendedWallets:!e}),t!=null&&t.namespace?(await C.switchActiveNamespace(t.namespace),Ie.setLoading(!0,t.namespace)):Ie.setLoading(!0),X.setFilterByNamespace(t==null?void 0:t.namespace);const i=(r=C.getAccountData(t==null?void 0:t.namespace))==null?void 0:r.caipAddress;C.state.noAdapters&&!i?q.isMobile()?Y.reset("AllWallets"):Y.reset("ConnectingWalletConnectBasic"):t!=null&&t.view?Y.reset(t.view,t.data):i?Y.reset("Account"):Y.reset("Connect"),Mt.open=!0,vr.set({open:!0}),me.sendEvent({type:"track",event:"MODAL_OPEN",properties:{connected:!!i}})},close(){const t=j.state.enableEmbedded,e=!!C.state.activeCaipAddress;Mt.open&&me.sendEvent({type:"track",event:"MODAL_CLOSE",properties:{connected:e}}),Mt.open=!1,Ie.clearLoading(),t?e?Y.replace("Account"):Y.push("Connect"):vr.set({open:!1}),ne.resetUri()},setLoading(t,e){e&&Mt.loadingNamespaceMap.set(e,t),Mt.loading=t,vr.set({loading:t})},clearLoading(){Mt.loadingNamespaceMap.clear(),Mt.loading=!1},shake(){Mt.shake||(Mt.shake=!0,setTimeout(()=>{Mt.shake=!1},500))}},kg={id:"2b92315d-eab7-5bef-84fa-089a131333f5",name:"USD Coin",symbol:"USDC",networks:[{name:"ethereum-mainnet",display_name:"Ethereum",chain_id:"1",contract_address:"0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48"},{name:"polygon-mainnet",display_name:"Polygon",chain_id:"137",contract_address:"0x2791Bca1f2de4661ED88A30C99A7a9449Aa84174"}]},a_={id:"USD",payment_method_limits:[{id:"card",min:"10.00",max:"7500.00"},{id:"ach_bank_account",min:"10.00",max:"25000.00"}]},c_={providers:DE,selectedProvider:null,error:null,purchaseCurrency:kg,paymentCurrency:a_,purchaseCurrencies:[kg],paymentCurrencies:[],quotesLoading:!1};je(c_);const l_={initializing:!1,initialized:!1,loadingPrices:!1,loadingQuote:!1,loadingApprovalTransaction:!1,loadingBuildTransaction:!1,loadingTransaction:!1,fetchError:!1,approvalTransaction:void 0,swapTransaction:void 0,transactionError:void 0,sourceToken:void 0,sourceTokenAmount:"",sourceTokenPriceInUSD:0,toToken:void 0,toTokenAmount:"",toTokenPriceInUSD:0,networkPrice:"0",networkBalanceInUSD:"0",networkTokenSymbol:"",inputError:void 0,slippage:nt.CONVERT_SLIPPAGE_TOLERANCE,tokens:void 0,popularTokens:void 0,suggestedTokens:void 0,foundTokens:void 0,myTokensWithBalance:void 0,tokensPriceMap:{},gasFee:"0",gasPriceInUSD:0,priceImpact:void 0,maxSlippage:void 0,providerFee:void 0};je(l_);const Ai=je({message:"",open:!1,triggerRect:{width:0,height:0,top:0,left:0},variant:"shade"}),An={state:Ai,subscribe(t){return _t(Ai,()=>t(Ai))},subscribeKey(t,e){return Rt(Ai,t,e)},showTooltip({message:t,triggerRect:e,variant:i}){Ai.open=!0,Ai.message=t,Ai.triggerRect=e,Ai.variant=i},hide(){Ai.open=!1,Ai.message="",Ai.triggerRect={width:0,height:0,top:0,left:0}}},Pg=2147483648,u_={convertEVMChainIdToCoinType(t){if(t>=Pg)throw new Error("Invalid chainId");return(Pg|t)>>>0}},hi=je({suggestions:[],loading:!1}),w2={state:hi,subscribe(t){return _t(hi,()=>t(hi))},subscribeKey(t,e){return Rt(hi,t,e)},async resolveName(t){var e,i;try{return await de.lookupEnsName(t)}catch(r){const s=r;throw new Error(((i=(e=s==null?void 0:s.reasons)==null?void 0:e[0])==null?void 0:i.description)||"Error resolving name")}},async isNameRegistered(t){try{return await de.lookupEnsName(t),!0}catch{return!1}},async getSuggestions(t){try{hi.loading=!0,hi.suggestions=[];const e=await de.getEnsNameSuggestions(t);return hi.suggestions=e.suggestions.map(i=>({...i,name:i.name}))||[],hi.suggestions}catch(e){const i=this.parseEnsApiError(e,"Error fetching name suggestions");throw new Error(i)}finally{hi.loading=!1}},async getNamesForAddress(t){try{if(!C.state.activeCaipNetwork)return[];const e=ie.getEnsFromCacheForAddress(t);if(e)return e;const i=await de.reverseLookupEnsName({address:t});return ie.updateEnsCache({address:t,ens:i,timestamp:Date.now()}),i}catch(e){const i=this.parseEnsApiError(e,"Error fetching names for address");throw new Error(i)}},async registerName(t){const e=C.state.activeCaipNetwork;if(!e)throw new Error("Network not found");const i=ae.state.address,r=X.getAuthConnector();if(!i||!r)throw new Error("Address or auth connector not found");hi.loading=!0;try{const s=JSON.stringify({name:t,attributes:{},timestamp:Math.floor(Date.now()/1e3)});Y.pushTransactionStack({view:"RegisterAccountNameSuccess",goBack:!1,replace:!0,onCancel(){hi.loading=!1}});const n=await ne.signMessage(s),o=e.id;if(!o)throw new Error("Network not found");const a=u_.convertEVMChainIdToCoinType(Number(o));await de.registerEnsName({coinType:a,address:i,signature:n,message:s}),ae.setProfileName(t,e.chainNamespace),Y.replace("RegisterAccountNameSuccess")}catch(s){const n=this.parseEnsApiError(s,`Error registering name ${t}`);throw Y.replace("RegisterAccountName"),new Error(n)}finally{hi.loading=!1}},validateName(t){return/^[a-zA-Z0-9-]{4,}$/u.test(t)},parseEnsApiError(t,e){var i,r;return((r=(i=t==null?void 0:t.reasons)==null?void 0:i[0])==null?void 0:r.description)||e}};je({isLegalCheckboxChecked:!1});const rt={METMASK_CONNECTOR_NAME:"MetaMask",TRUST_CONNECTOR_NAME:"Trust Wallet",SOLFLARE_CONNECTOR_NAME:"Solflare",PHANTOM_CONNECTOR_NAME:"Phantom",COIN98_CONNECTOR_NAME:"Coin98",MAGIC_EDEN_CONNECTOR_NAME:"Magic Eden",BACKPACK_CONNECTOR_NAME:"Backpack",BITGET_CONNECTOR_NAME:"Bitget Wallet",FRONTIER_CONNECTOR_NAME:"Frontier",XVERSE_CONNECTOR_NAME:"Xverse Wallet",LEATHER_CONNECTOR_NAME:"Leather",EIP155:"eip155",ADD_CHAIN_METHOD:"wallet_addEthereumChain",EIP6963_ANNOUNCE_EVENT:"eip6963:announceProvider",EIP6963_REQUEST_EVENT:"eip6963:requestProvider",CONNECTOR_RDNS_MAP:{coinbaseWallet:"com.coinbase.wallet",coinbaseWalletSDK:"com.coinbase.wallet"},CONNECTOR_TYPE_EXTERNAL:"EXTERNAL",CONNECTOR_TYPE_WALLET_CONNECT:"WALLET_CONNECT",CONNECTOR_TYPE_INJECTED:"INJECTED",CONNECTOR_TYPE_ANNOUNCED:"ANNOUNCED",CONNECTOR_TYPE_AUTH:"AUTH",CONNECTOR_TYPE_MULTI_CHAIN:"MULTI_CHAIN",CONNECTOR_TYPE_W3M_AUTH:"ID_AUTH"},Zl={ConnectorExplorerIds:{[re.CONNECTOR_ID.COINBASE]:"fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",[re.CONNECTOR_ID.COINBASE_SDK]:"fd20dc426fb37566d803205b19bbc1d4096b248ac04548e3cfb6b3a38bd033aa",[re.CONNECTOR_ID.SAFE]:"225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",[re.CONNECTOR_ID.LEDGER]:"19177a98252e07ddfc9af2083ba8e07ef627cb6103467ffebb3f8f4205fd7927",[re.CONNECTOR_ID.OKX]:"971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",[rt.METMASK_CONNECTOR_NAME]:"c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",[rt.TRUST_CONNECTOR_NAME]:"4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",[rt.SOLFLARE_CONNECTOR_NAME]:"1ca0bdd4747578705b1939af023d120677c64fe6ca76add81fda36e350605e79",[rt.PHANTOM_CONNECTOR_NAME]:"a797aa35c0fadbfc1a53e7f675162ed5226968b44a19ee3d24385c64d1d3c393",[rt.COIN98_CONNECTOR_NAME]:"2a3c89040ac3b723a1972a33a125b1db11e258a6975d3a61252cd64e6ea5ea01",[rt.MAGIC_EDEN_CONNECTOR_NAME]:"8b830a2b724a9c3fbab63af6f55ed29c9dfa8a55e732dc88c80a196a2ba136c6",[rt.BACKPACK_CONNECTOR_NAME]:"2bd8c14e035c2d48f184aaa168559e86b0e3433228d3c4075900a221785019b0",[rt.BITGET_CONNECTOR_NAME]:"38f5d18bd8522c244bdd70cb4a68e0e718865155811c043f052fb9f1c51de662",[rt.FRONTIER_CONNECTOR_NAME]:"85db431492aa2e8672e93f4ea7acf10c88b97b867b0d373107af63dc4880f041",[rt.XVERSE_CONNECTOR_NAME]:"2a87d74ae02e10bdd1f51f7ce6c4e1cc53cd5f2c0b6b5ad0d7b3007d2b13de7b",[rt.LEATHER_CONNECTOR_NAME]:"483afe1df1df63daf313109971ff3ef8356ddf1cc4e45877d205eee0b7893a13"},NetworkImageIds:{1:"ba0ba0cd-17c6-4806-ad93-f9d174f17900",42161:"3bff954d-5cb0-47a0-9a23-d20192e74600",43114:"30c46e53-e989-45fb-4549-be3bd4eb3b00",56:"93564157-2e8e-4ce7-81df-b264dbee9b00",250:"06b26297-fe0c-4733-5d6b-ffa5498aac00",10:"ab9c186a-c52f-464b-2906-ca59d760a400",137:"41d04d42-da3b-4453-8506-668cc0727900",5e3:"e86fae9b-b770-4eea-e520-150e12c81100",295:"6a97d510-cac8-4e58-c7ce-e8681b044c00",11155111:"e909ea0a-f92a-4512-c8fc-748044ea6800",84532:"a18a7ecd-e307-4360-4746-283182228e00",1301:"4eeea7ef-0014-4649-5d1d-07271a80f600",130:"2257980a-3463-48c6-cbac-a42d2a956e00",10143:"0a728e83-bacb-46db-7844-948f05434900",100:"02b53f6a-e3d4-479e-1cb4-21178987d100",9001:"f926ff41-260d-4028-635e-91913fc28e00",324:"b310f07f-4ef7-49f3-7073-2a0a39685800",314:"5a73b3dd-af74-424e-cae0-0de859ee9400",4689:"34e68754-e536-40da-c153-6ef2e7188a00",1088:"3897a66d-40b9-4833-162f-a2c90531c900",1284:"161038da-44ae-4ec7-1208-0ea569454b00",1285:"f1d73bb6-5450-4e18-38f7-fb6484264a00",7777777:"845c60df-d429-4991-e687-91ae45791600",42220:"ab781bbc-ccc6-418d-d32d-789b15da1f00",8453:"7289c336-3981-4081-c5f4-efc26ac64a00",1313161554:"3ff73439-a619-4894-9262-4470c773a100",2020:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",2021:"b8101fc0-9c19-4b6f-ec65-f6dfff106e00",80094:"e329c2c9-59b0-4a02-83e4-212ff3779900",2741:"fc2427d1-5af9-4a9c-8da5-6f94627cd900","5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp":"a1b58899-f671-4276-6a5e-56ca5bd59700","4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z":"a1b58899-f671-4276-6a5e-56ca5bd59700",EtWTRABZaYq6iMfeYKouRu166VU2xqa1:"a1b58899-f671-4276-6a5e-56ca5bd59700","000000000019d6689c085ae165831e93":"0b4838db-0161-4ffe-022d-532bf03dba00","000000000933ea01ad0ee984209779ba":"39354064-d79b-420b-065d-f980c4b78200"},ConnectorImageIds:{[re.CONNECTOR_ID.COINBASE]:"0c2840c3-5b04-4c44-9661-fbd4b49e1800",[re.CONNECTOR_ID.COINBASE_SDK]:"0c2840c3-5b04-4c44-9661-fbd4b49e1800",[re.CONNECTOR_ID.SAFE]:"461db637-8616-43ce-035a-d89b8a1d5800",[re.CONNECTOR_ID.LEDGER]:"54a1aa77-d202-4f8d-0fb2-5d2bb6db0300",[re.CONNECTOR_ID.WALLET_CONNECT]:"ef1a1fcf-7fe8-4d69-bd6d-fda1345b4400",[re.CONNECTOR_ID.INJECTED]:"07ba87ed-43aa-4adf-4540-9e6a2b9cae00"},ConnectorNamesMap:{[re.CONNECTOR_ID.INJECTED]:"Browser Wallet",[re.CONNECTOR_ID.WALLET_CONNECT]:"WalletConnect",[re.CONNECTOR_ID.COINBASE]:"Coinbase",[re.CONNECTOR_ID.COINBASE_SDK]:"Coinbase",[re.CONNECTOR_ID.LEDGER]:"Ledger",[re.CONNECTOR_ID.SAFE]:"Safe"},ConnectorTypesMap:{[re.CONNECTOR_ID.INJECTED]:"INJECTED",[re.CONNECTOR_ID.WALLET_CONNECT]:"WALLET_CONNECT",[re.CONNECTOR_ID.EIP6963]:"ANNOUNCED",[re.CONNECTOR_ID.AUTH]:"AUTH"},WalletConnectRpcChainIds:[1,5,11155111,10,420,42161,421613,137,80001,42220,1313161554,1313161555,56,97,43114,43113,100,8453,84531,7777777,999,324,280]},Yp={getCaipTokens(t){if(!t)return;const e={};return Object.entries(t).forEach(([i,r])=>{e[`${rt.EIP155}:${i}`]=r}),e},isLowerCaseMatch(t,e){return(t==null?void 0:t.toLowerCase())===(e==null?void 0:e.toLowerCase())}},Lc={UniversalProviderErrors:{UNAUTHORIZED_DOMAIN_NOT_ALLOWED:{message:"Unauthorized: origin not allowed",alertErrorKey:"INVALID_APP_CONFIGURATION"},JWT_VALIDATION_ERROR:{message:"JWT validation error: JWT Token is not yet valid",alertErrorKey:"JWT_TOKEN_NOT_VALID"},INVALID_KEY:{message:"Unauthorized: invalid key",alertErrorKey:"INVALID_PROJECT_ID"}},ALERT_ERRORS:{SWITCH_NETWORK_NOT_FOUND:{shortMessage:"Network Not Found",longMessage:"Network not found - please make sure it is included in 'networks' array in createAppKit function"},INVALID_APP_CONFIGURATION:{shortMessage:"Invalid App Configuration",longMessage:()=>`Origin ${d_()?window.origin:"unknown"} not found on Allowlist - update configuration on cloud.reown.com`},SOCIALS_TIMEOUT:{shortMessage:"Invalid App Configuration",longMessage:()=>"There was an issue loading the embedded wallet. Please verify that your domain is allowed at cloud.reown.com"},JWT_TOKEN_NOT_VALID:{shortMessage:"Session Expired",longMessage:"Invalid session found on UniversalProvider - please check your time settings and connect again"},INVALID_PROJECT_ID:{shortMessage:"Invalid App Configuration",longMessage:"Invalid Project ID - update configuration"},PROJECT_ID_NOT_CONFIGURED:{shortMessage:"Project ID Not Configured",longMessage:"Project ID Not Configured - update configuration on cloud.reown.com"}}};function d_(){return typeof window<"u"}function h_(t){try{return JSON.stringify(t)}catch{return'"[Circular]"'}}var p_=g_;function g_(t,e,i){var r=i&&i.stringify||h_,s=1;if(typeof t=="object"&&t!==null){var n=e.length+s;if(n===1)return t;var o=new Array(n);o[0]=r(t);for(var a=1;a<n;a++)o[a]=r(e[a]);return o.join(" ")}if(typeof t!="string")return t;var c=e.length;if(c===0)return t;for(var l="",u=1-s,d=-1,h=t&&t.length||0,p=0;p<h;){if(t.charCodeAt(p)===37&&p+1<h){switch(d=d>-1?d:0,t.charCodeAt(p+1)){case 100:case 102:if(u>=c||e[u]==null)break;d<p&&(l+=t.slice(d,p)),l+=Number(e[u]),d=p+2,p++;break;case 105:if(u>=c||e[u]==null)break;d<p&&(l+=t.slice(d,p)),l+=Math.floor(Number(e[u])),d=p+2,p++;break;case 79:case 111:case 106:if(u>=c||e[u]===void 0)break;d<p&&(l+=t.slice(d,p));var g=typeof e[u];if(g==="string"){l+="'"+e[u]+"'",d=p+2,p++;break}if(g==="function"){l+=e[u].name||"<anonymous>",d=p+2,p++;break}l+=r(e[u]),d=p+2,p++;break;case 115:if(u>=c)break;d<p&&(l+=t.slice(d,p)),l+=String(e[u]),d=p+2,p++;break;case 37:d<p&&(l+=t.slice(d,p)),l+="%",d=p+2,p++,u--;break}++u}++p}return d===-1?t:(d<h&&(l+=t.slice(d)),l)}const Og=p_;var _s=Yi;const Ha=I_().console||{},f_={mapHttpRequest:Mc,mapHttpResponse:Mc,wrapRequestSerializer:bd,wrapResponseSerializer:bd,wrapErrorSerializer:bd,req:Mc,res:Mc,err:v_};function w_(t,e){return Array.isArray(t)?t.filter(function(i){return i!=="!stdSerializers.err"}):t===!0?Object.keys(e):!1}function Yi(t){t=t||{},t.browser=t.browser||{};const e=t.browser.transmit;if(e&&typeof e.send!="function")throw Error("pino: transmit option must have a send function");const i=t.browser.write||Ha;t.browser.write&&(t.browser.asObject=!0);const r=t.serializers||{},s=w_(t.browser.serialize,r);let n=t.browser.serialize;Array.isArray(t.browser.serialize)&&t.browser.serialize.indexOf("!stdSerializers.err")>-1&&(n=!1);const o=["error","fatal","warn","info","debug","trace"];typeof i=="function"&&(i.error=i.fatal=i.warn=i.info=i.debug=i.trace=i),t.enabled===!1&&(t.level="silent");const a=t.level||"info",c=Object.create(i);c.log||(c.log=qa),Object.defineProperty(c,"levelVal",{get:u}),Object.defineProperty(c,"level",{get:d,set:h});const l={transmit:e,serialize:s,asObject:t.browser.asObject,levels:o,timestamp:C_(t)};c.levels=Yi.levels,c.level=a,c.setMaxListeners=c.getMaxListeners=c.emit=c.addListener=c.on=c.prependListener=c.once=c.prependOnceListener=c.removeListener=c.removeAllListeners=c.listeners=c.listenerCount=c.eventNames=c.write=c.flush=qa,c.serializers=r,c._serialize=s,c._stdErrSerialize=n,c.child=p,e&&(c._logEvent=dp());function u(){return this.level==="silent"?1/0:this.levels.values[this.level]}function d(){return this._level}function h(g){if(g!=="silent"&&!this.levels.values[g])throw Error("unknown level "+g);this._level=g,mn(l,c,"error","log"),mn(l,c,"fatal","error"),mn(l,c,"warn","error"),mn(l,c,"info","log"),mn(l,c,"debug","log"),mn(l,c,"trace","log")}function p(g,f){if(!g)throw new Error("missing bindings for child Pino");f=f||{},s&&g.serializers&&(f.serializers=g.serializers);const w=f.serializers;if(s&&w){var m=Object.assign({},r,w),y=t.browser.serialize===!0?Object.keys(m):s;delete g.serializers,Nu([g],y,m,this._stdErrSerialize)}function b(v){this._childLevel=(v._childLevel|0)+1,this.error=yn(v,g,"error"),this.fatal=yn(v,g,"fatal"),this.warn=yn(v,g,"warn"),this.info=yn(v,g,"info"),this.debug=yn(v,g,"debug"),this.trace=yn(v,g,"trace"),m&&(this.serializers=m,this._serialize=y),e&&(this._logEvent=dp([].concat(v._logEvent.bindings,g)))}return b.prototype=this,new b(this)}return c}Yi.levels={values:{fatal:60,error:50,warn:40,info:30,debug:20,trace:10},labels:{10:"trace",20:"debug",30:"info",40:"warn",50:"error",60:"fatal"}},Yi.stdSerializers=f_,Yi.stdTimeFunctions=Object.assign({},{nullTime:m2,epochTime:y2,unixTime:E_,isoTime:x_});function mn(t,e,i,r){const s=Object.getPrototypeOf(e);e[i]=e.levelVal>e.levels.values[i]?qa:s[i]?s[i]:Ha[i]||Ha[r]||qa,m_(t,e,i)}function m_(t,e,i){!t.transmit&&e[i]===qa||(e[i]=function(r){return function(){const s=t.timestamp(),n=new Array(arguments.length),o=Object.getPrototypeOf&&Object.getPrototypeOf(this)===Ha?Ha:this;for(var a=0;a<n.length;a++)n[a]=arguments[a];if(t.serialize&&!t.asObject&&Nu(n,this._serialize,this.serializers,this._stdErrSerialize),t.asObject?r.call(o,y_(this,i,n,s)):r.apply(o,n),t.transmit){const c=t.transmit.level||e.level,l=Yi.levels.values[c],u=Yi.levels.values[i];if(u<l)return;b_(this,{ts:s,methodLevel:i,methodValue:u,transmitLevel:c,transmitValue:Yi.levels.values[t.transmit.level||e.level],send:t.transmit.send,val:e.levelVal},n)}}}(e[i]))}function y_(t,e,i,r){t._serialize&&Nu(i,t._serialize,t.serializers,t._stdErrSerialize);const s=i.slice();let n=s[0];const o={};r&&(o.time=r),o.level=Yi.levels.values[e];let a=(t._childLevel|0)+1;if(a<1&&(a=1),n!==null&&typeof n=="object"){for(;a--&&typeof s[0]=="object";)Object.assign(o,s.shift());n=s.length?Og(s.shift(),s):void 0}else typeof n=="string"&&(n=Og(s.shift(),s));return n!==void 0&&(o.msg=n),o}function Nu(t,e,i,r){for(const s in t)if(r&&t[s]instanceof Error)t[s]=Yi.stdSerializers.err(t[s]);else if(typeof t[s]=="object"&&!Array.isArray(t[s]))for(const n in t[s])e&&e.indexOf(n)>-1&&n in i&&(t[s][n]=i[n](t[s][n]))}function yn(t,e,i){return function(){const r=new Array(1+arguments.length);r[0]=e;for(var s=1;s<r.length;s++)r[s]=arguments[s-1];return t[i].apply(this,r)}}function b_(t,e,i){const r=e.send,s=e.ts,n=e.methodLevel,o=e.methodValue,a=e.val,c=t._logEvent.bindings;Nu(i,t._serialize||Object.keys(t.serializers),t.serializers,t._stdErrSerialize===void 0?!0:t._stdErrSerialize),t._logEvent.ts=s,t._logEvent.messages=i.filter(function(l){return c.indexOf(l)===-1}),t._logEvent.level.label=n,t._logEvent.level.value=o,r(n,t._logEvent,a),t._logEvent=dp(c)}function dp(t){return{ts:0,messages:[],bindings:t||[],level:{label:"",value:0}}}function v_(t){const e={type:t.constructor.name,msg:t.message,stack:t.stack};for(const i in t)e[i]===void 0&&(e[i]=t[i]);return e}function C_(t){return typeof t.timestamp=="function"?t.timestamp:t.timestamp===!1?m2:y2}function Mc(){return{}}function bd(t){return t}function qa(){}function m2(){return!1}function y2(){return Date.now()}function E_(){return Math.round(Date.now()/1e3)}function x_(){return new Date(Date.now()).toISOString()}function I_(){function t(e){return typeof e<"u"&&e}try{return typeof globalThis<"u"||Object.defineProperty(Object.prototype,"globalThis",{get:function(){return delete Object.prototype.globalThis,this.globalThis=this},configurable:!0}),globalThis}catch{return t(self)||t(window)||t(this)||{}}}const A_=t=>JSON.stringify(t,(e,i)=>typeof i=="bigint"?i.toString()+"n":i);function Tg(t){return typeof t=="string"?t:A_(t)||""}const __={level:"info"},Jp=1e3*1024;class N_{constructor(e){this.nodeValue=e,this.sizeInBytes=new TextEncoder().encode(this.nodeValue).length,this.next=null}get value(){return this.nodeValue}get size(){return this.sizeInBytes}}class Rg{constructor(e){this.head=null,this.tail=null,this.lengthInNodes=0,this.maxSizeInBytes=e,this.sizeInBytes=0}append(e){const i=new N_(e);if(i.size>this.maxSizeInBytes)throw new Error(`[LinkedList] Value too big to insert into list: ${e} with size ${i.size}`);for(;this.size+i.size>this.maxSizeInBytes;)this.shift();this.head?(this.tail&&(this.tail.next=i),this.tail=i):(this.head=i,this.tail=i),this.lengthInNodes++,this.sizeInBytes+=i.size}shift(){if(!this.head)return;const e=this.head;this.head=this.head.next,this.head||(this.tail=null),this.lengthInNodes--,this.sizeInBytes-=e.size}toArray(){const e=[];let i=this.head;for(;i!==null;)e.push(i.value),i=i.next;return e}get length(){return this.lengthInNodes}get size(){return this.sizeInBytes}toOrderedArray(){return Array.from(this)}[Symbol.iterator](){let e=this.head;return{next:()=>{if(!e)return{done:!0,value:null};const i=e.value;return e=e.next,{done:!1,value:i}}}}}class b2{constructor(e,i=Jp){this.level=e??"error",this.levelValue=_s.levels.values[this.level],this.MAX_LOG_SIZE_IN_BYTES=i,this.logs=new Rg(this.MAX_LOG_SIZE_IN_BYTES)}forwardToConsole(e,i){i===_s.levels.values.error?console.error(e):i===_s.levels.values.warn?console.warn(e):i===_s.levels.values.debug?console.debug(e):i===_s.levels.values.trace?console.trace(e):console.log(e)}appendToLogs(e){this.logs.append(Tg({timestamp:new Date().toISOString(),log:e}));const i=typeof e=="string"?JSON.parse(e).level:e.level;i>=this.levelValue&&this.forwardToConsole(e,i)}getLogs(){return this.logs}clearLogs(){this.logs=new Rg(this.MAX_LOG_SIZE_IN_BYTES)}getLogArray(){return Array.from(this.logs)}logsToBlob(e){const i=this.getLogArray();return i.push(Tg({extraMetadata:e})),new Blob(i,{type:"application/json"})}}class S_{constructor(e,i=Jp){this.baseChunkLogger=new b2(e,i)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}downloadLogsBlobInBrowser(e){const i=URL.createObjectURL(this.logsToBlob(e)),r=document.createElement("a");r.href=i,r.download=`walletconnect-logs-${new Date().toISOString()}.txt`,document.body.appendChild(r),r.click(),document.body.removeChild(r),URL.revokeObjectURL(i)}}class $_{constructor(e,i=Jp){this.baseChunkLogger=new b2(e,i)}write(e){this.baseChunkLogger.appendToLogs(e)}getLogs(){return this.baseChunkLogger.getLogs()}clearLogs(){this.baseChunkLogger.clearLogs()}getLogArray(){return this.baseChunkLogger.getLogArray()}logsToBlob(e){return this.baseChunkLogger.logsToBlob(e)}}var k_=Object.defineProperty,P_=Object.defineProperties,O_=Object.getOwnPropertyDescriptors,Lg=Object.getOwnPropertySymbols,T_=Object.prototype.hasOwnProperty,R_=Object.prototype.propertyIsEnumerable,Mg=(t,e,i)=>e in t?k_(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,Yl=(t,e)=>{for(var i in e||(e={}))T_.call(e,i)&&Mg(t,i,e[i]);if(Lg)for(var i of Lg(e))R_.call(e,i)&&Mg(t,i,e[i]);return t},Jl=(t,e)=>P_(t,O_(e));function L_(t){return Jl(Yl({},t),{level:(t==null?void 0:t.level)||__.level})}function M_(t){var e,i;const r=new S_((e=t.opts)==null?void 0:e.level,t.maxSizeInBytes);return{logger:_s(Jl(Yl({},t.opts),{level:"trace",browser:Jl(Yl({},(i=t.opts)==null?void 0:i.browser),{write:s=>r.write(s)})})),chunkLoggerController:r}}function B_(t){var e;const i=new $_((e=t.opts)==null?void 0:e.level,t.maxSizeInBytes);return{logger:_s(Jl(Yl({},t.opts),{level:"trace"})),chunkLoggerController:i}}function U_(t){return typeof t.loggerOverride<"u"&&typeof t.loggerOverride!="string"?{logger:t.loggerOverride,chunkLoggerController:null}:typeof window<"u"?M_(t):B_(t)}const D_={createLogger(t,e="error"){const i=L_({level:e}),{logger:r}=U_({opts:i});return r.error=(...s)=>{for(const n of s)if(n instanceof Error){t(n,...s);return}t(void 0,...s)},r}},j_="rpc.walletconnect.org";function Bg(t,e){const i=new URL("https://rpc.walletconnect.org/v1/");return i.searchParams.set("chainId",t),i.searchParams.set("projectId",e),i.toString()}const vd=["near:mainnet","solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp","eip155:1101","eip155:56","eip155:42161","eip155:7777777","eip155:59144","eip155:324","solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1","eip155:5000","solana:4sgjmw1sunhzsxgspuhpqldx6wiyjntz","eip155:80084","eip155:5003","eip155:100","eip155:8453","eip155:42220","eip155:1313161555","eip155:17000","eip155:1","eip155:300","eip155:1313161554","eip155:1329","eip155:84532","eip155:421614","eip155:11155111","eip155:8217","eip155:43114","solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z","eip155:999999999","eip155:11155420","eip155:80002","eip155:97","eip155:43113","eip155:137","eip155:10","eip155:1301","bip122:000000000019d6689c085ae165831e93","bip122:000000000933ea01ad0ee984209779ba"],_n={extendRpcUrlWithProjectId(t,e){let i=!1;try{i=new URL(t).host===j_}catch{i=!1}if(i){const r=new URL(t);return r.searchParams.has("projectId")||r.searchParams.set("projectId",e),r.toString()}return t},isCaipNetwork(t){return"chainNamespace"in t&&"caipNetworkId"in t},getChainNamespace(t){return this.isCaipNetwork(t)?t.chainNamespace:re.CHAIN.EVM},getCaipNetworkId(t){return this.isCaipNetwork(t)?t.caipNetworkId:`${re.CHAIN.EVM}:${t.id}`},getDefaultRpcUrl(t,e,i){var s,n,o;const r=(o=(n=(s=t.rpcUrls)==null?void 0:s.default)==null?void 0:n.http)==null?void 0:o[0];return vd.includes(e)?Bg(e,i):r||""},extendCaipNetwork(t,{customNetworkImageUrls:e,projectId:i,customRpcUrls:r}){var h,p,g,f,w;const s=this.getChainNamespace(t),n=this.getCaipNetworkId(t),o=(h=t.rpcUrls.default.http)==null?void 0:h[0],a=this.getDefaultRpcUrl(t,n,i),c=((f=(g=(p=t==null?void 0:t.rpcUrls)==null?void 0:p.chainDefault)==null?void 0:g.http)==null?void 0:f[0])||o,l=((w=r==null?void 0:r[n])==null?void 0:w.map(m=>m.url))||[],u=[...l,a],d=[...l];return c&&!d.includes(c)&&d.push(c),{...t,chainNamespace:s,caipNetworkId:n,assets:{imageId:Zl.NetworkImageIds[t.id],imageUrl:e==null?void 0:e[t.id]},rpcUrls:{...t.rpcUrls,default:{http:u},chainDefault:{http:d}}}},extendCaipNetworks(t,{customNetworkImageUrls:e,projectId:i,customRpcUrls:r}){return t.map(s=>_n.extendCaipNetwork(s,{customNetworkImageUrls:e,customRpcUrls:r,projectId:i}))},getViemTransport(t,e,i){var s,n,o;const r=[];return i==null||i.forEach(a=>{r.push(Oc(a.url,a.config))}),vd.includes(t.caipNetworkId)&&r.push(Oc(Bg(t.caipNetworkId,e),{fetchOptions:{headers:{"Content-Type":"text/plain"}}})),(o=(n=(s=t==null?void 0:t.rpcUrls)==null?void 0:s.default)==null?void 0:n.http)==null||o.forEach(a=>{r.push(Oc(a))}),gg(r)},extendWagmiTransports(t,e,i){if(vd.includes(t.caipNetworkId)){const r=this.getDefaultRpcUrl(t,t.caipNetworkId,e);return gg([i,Oc(r)])}return i},getUnsupportedNetwork(t){return{id:t.split(":")[1],caipNetworkId:t,name:re.UNSUPPORTED_NETWORK_NAME,chainNamespace:t.split(":")[0],nativeCurrency:{name:"",decimals:0,symbol:""},rpcUrls:{default:{http:[]}}}},getCaipNetworkFromStorage(t){var a;const e=ie.getActiveCaipNetworkId(),i=C.getAllRequestedCaipNetworks(),r=Array.from(((a=C.state.chains)==null?void 0:a.keys())||[]),s=e==null?void 0:e.split(":")[0],n=s?r.includes(s):!1,o=i==null?void 0:i.find(c=>c.caipNetworkId===e);return n&&!o&&e?this.getUnsupportedNetwork(e):o||t||(i==null?void 0:i[0])}},Xl={eip155:void 0,solana:void 0,polkadot:void 0,bip122:void 0},Bt=je({providers:{...Xl},providerIds:{...Xl}}),Ge={state:Bt,subscribeKey(t,e){return Rt(Bt,t,e)},subscribe(t){return _t(Bt,()=>{t(Bt)})},subscribeProviders(t){return _t(Bt.providers,()=>t(Bt.providers))},setProvider(t,e){e&&(Bt.providers[t]=Hs(e))},getProvider(t){return Bt.providers[t]},setProviderId(t,e){e&&(Bt.providerIds[t]=e)},getProviderId(t){if(t)return Bt.providerIds[t]},reset(){Bt.providers={...Xl},Bt.providerIds={...Xl}},resetChain(t){Bt.providers[t]=void 0,Bt.providerIds[t]=void 0}};var Ug;(function(t){t.Google="google",t.Github="github",t.Apple="apple",t.Facebook="facebook",t.X="x",t.Discord="discord",t.Farcaster="farcaster"})(Ug||(Ug={}));const zr={ACCOUNT_TABS:[{label:"Tokens"},{label:"NFTs"},{label:"Activity"}],SECURE_SITE_ORIGIN:(typeof Ps<"u"&&typeof{}<"u"?{}.NEXT_PUBLIC_SECURE_SITE_ORIGIN:void 0)||"https://secure.walletconnect.org",VIEW_DIRECTION:{Next:"next",Prev:"prev"},DEFAULT_CONNECT_METHOD_ORDER:["email","social","wallet"],ANIMATION_DURATIONS:{HeaderText:120,ModalHeight:150,ViewTransition:150}},Vs={filterOutDuplicatesByRDNS(t){const e=j.state.enableEIP6963?X.state.connectors:[],i=ie.getRecentWallets(),r=e.map(o=>{var a;return(a=o.info)==null?void 0:a.rdns}).filter(Boolean),s=i.map(o=>o.rdns).filter(Boolean),n=r.concat(s);if(n.includes("io.metamask.mobile")&&q.isMobile()){const o=n.indexOf("io.metamask.mobile");n[o]="io.metamask"}return t.filter(o=>!n.includes(String(o==null?void 0:o.rdns)))},filterOutDuplicatesByIds(t){const e=X.state.connectors.filter(o=>o.type==="ANNOUNCED"||o.type==="INJECTED"),i=ie.getRecentWallets(),r=e.map(o=>o.explorerId),s=i.map(o=>o.id),n=r.concat(s);return t.filter(o=>!n.includes(o==null?void 0:o.id))},filterOutDuplicateWallets(t){const e=this.filterOutDuplicatesByRDNS(t);return this.filterOutDuplicatesByIds(e)},markWalletsAsInstalled(t){const{connectors:e}=X.state,i=e.filter(r=>r.type==="ANNOUNCED").reduce((r,s)=>{var n;return(n=s.info)!=null&&n.rdns&&(r[s.info.rdns]=!0),r},{});return t.map(r=>({...r,installed:!!r.rdns&&!!i[r.rdns??""]})).sort((r,s)=>Number(s.installed)-Number(r.installed))},getConnectOrderMethod(t,e){var c;const i=(t==null?void 0:t.connectMethodsOrder)||((c=j.state.features)==null?void 0:c.connectMethodsOrder),r=e||X.state.connectors;if(i)return i;const{injected:s,announced:n}=Cr.getConnectorsByType(r,J.state.recommended,J.state.featured),o=s.filter(Cr.showConnector),a=n.filter(Cr.showConnector);return o.length||a.length?["wallet","email","social"]:zr.DEFAULT_CONNECT_METHOD_ORDER},isExcluded(t){const e=!!t.rdns&&J.state.excludedWallets.some(r=>r.rdns===t.rdns),i=!!t.name&&J.state.excludedWallets.some(r=>Yp.isLowerCaseMatch(r.name,t.name));return e||i}},Cr={getConnectorsByType(t,e,i){const{customWallets:r}=j.state,s=ie.getRecentWallets(),n=Vs.filterOutDuplicateWallets(e),o=Vs.filterOutDuplicateWallets(i),a=t.filter(d=>d.type==="MULTI_CHAIN"),c=t.filter(d=>d.type==="ANNOUNCED"),l=t.filter(d=>d.type==="INJECTED"),u=t.filter(d=>d.type==="EXTERNAL");return{custom:r,recent:s,external:u,multiChain:a,announced:c,injected:l,recommended:n,featured:o}},showConnector(t){var s;const e=(s=t.info)==null?void 0:s.rdns,i=!!e&&J.state.excludedWallets.some(n=>!!n.rdns&&n.rdns===e),r=!!t.name&&J.state.excludedWallets.some(n=>Yp.isLowerCaseMatch(n.name,t.name));return!(t.type==="INJECTED"&&(!q.isMobile()&&t.name==="Browser Wallet"||!e&&!ne.checkInstalled()||i||r)||(t.type==="ANNOUNCED"||t.type==="EXTERNAL")&&(i||r))},getIsConnectedWithWC(){return Array.from(C.state.chains.values()).some(t=>X.getConnectorId(t.namespace)===re.CONNECTOR_ID.WALLET_CONNECT)},getConnectorTypeOrder({recommended:t,featured:e,custom:i,recent:r,announced:s,injected:n,multiChain:o,external:a,overriddenConnectors:c=(l=>(l=j.state.features)==null?void 0:l.connectorTypeOrder)()??[]}){const u=Cr.getIsConnectedWithWC(),d=[{type:"walletConnect",isEnabled:j.state.enableWalletConnect&&!u},{type:"recent",isEnabled:r.length>0},{type:"injected",isEnabled:[...n,...s,...o].length>0},{type:"featured",isEnabled:e.length>0},{type:"custom",isEnabled:i&&i.length>0},{type:"external",isEnabled:a.length>0},{type:"recommended",isEnabled:t.length>0}].filter(f=>f.isEnabled),h=new Set(d.map(f=>f.type)),p=c.filter(f=>h.has(f)).map(f=>({type:f,isEnabled:!0})),g=d.filter(({type:f})=>!p.some(({type:w})=>w===f));return Array.from(new Set([...p,...g].map(({type:f})=>f)))}};/**
* @license
* Copyright 2019 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Rl=globalThis,Xp=Rl.ShadowRoot&&(Rl.ShadyCSS===void 0||Rl.ShadyCSS.nativeShadow)&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype,Qp=Symbol(),Dg=new WeakMap;class v2{constructor(e,i,r){if(this._$cssResult$=!0,r!==Qp)throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");this.cssText=e,this.t=i}get styleSheet(){let e=this.o;const i=this.t;if(Xp&&e===void 0){const r=i!==void 0&&i.length===1;r&&(e=Dg.get(i)),e===void 0&&((this.o=e=new CSSStyleSheet).replaceSync(this.cssText),r&&Dg.set(i,e))}return e}toString(){return this.cssText}}const mi=t=>new v2(typeof t=="string"?t:t+"",void 0,Qp),le=(t,...e)=>{const i=t.length===1?t[0]:e.reduce((r,s,n)=>r+(o=>{if(o._$cssResult$===!0)return o.cssText;if(typeof o=="number")return o;throw Error("Value passed to 'css' function must be a 'css' function result: "+o+". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.")})(s)+t[n+1],t[0]);return new v2(i,t,Qp)},z_=(t,e)=>{if(Xp)t.adoptedStyleSheets=e.map(i=>i instanceof CSSStyleSheet?i:i.styleSheet);else for(const i of e){const r=document.createElement("style"),s=Rl.litNonce;s!==void 0&&r.setAttribute("nonce",s),r.textContent=i.cssText,t.appendChild(r)}},jg=Xp?t=>t:t=>t instanceof CSSStyleSheet?(e=>{let i="";for(const r of e.cssRules)i+=r.cssText;return mi(i)})(t):t;/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const{is:F_,defineProperty:H_,getOwnPropertyDescriptor:q_,getOwnPropertyNames:W_,getOwnPropertySymbols:V_,getPrototypeOf:K_}=Object,Wr=globalThis,zg=Wr.trustedTypes,G_=zg?zg.emptyScript:"",Cd=Wr.reactiveElementPolyfillSupport,ua=(t,e)=>t,Ql={toAttribute(t,e){switch(e){case Boolean:t=t?G_:null;break;case Object:case Array:t=t==null?t:JSON.stringify(t)}return t},fromAttribute(t,e){let i=t;switch(e){case Boolean:i=t!==null;break;case Number:i=t===null?null:Number(t);break;case Object:case Array:try{i=JSON.parse(t)}catch{i=null}}return i}},e0=(t,e)=>!F_(t,e),Fg={attribute:!0,type:String,converter:Ql,reflect:!1,useDefault:!1,hasChanged:e0};Symbol.metadata??(Symbol.metadata=Symbol("metadata")),Wr.litPropertyMetadata??(Wr.litPropertyMetadata=new WeakMap);class Nn extends HTMLElement{static addInitializer(e){this._$Ei(),(this.l??(this.l=[])).push(e)}static get observedAttributes(){return this.finalize(),this._$Eh&&[...this._$Eh.keys()]}static createProperty(e,i=Fg){if(i.state&&(i.attribute=!1),this._$Ei(),this.prototype.hasOwnProperty(e)&&((i=Object.create(i)).wrapped=!0),this.elementProperties.set(e,i),!i.noAccessor){const r=Symbol(),s=this.getPropertyDescriptor(e,r,i);s!==void 0&&H_(this.prototype,e,s)}}static getPropertyDescriptor(e,i,r){const{get:s,set:n}=q_(this.prototype,e)??{get(){return this[i]},set(o){this[i]=o}};return{get:s,set(o){const a=s==null?void 0:s.call(this);n==null||n.call(this,o),this.requestUpdate(e,a,r)},configurable:!0,enumerable:!0}}static getPropertyOptions(e){return this.elementProperties.get(e)??Fg}static _$Ei(){if(this.hasOwnProperty(ua("elementProperties")))return;const e=K_(this);e.finalize(),e.l!==void 0&&(this.l=[...e.l]),this.elementProperties=new Map(e.elementProperties)}static finalize(){if(this.hasOwnProperty(ua("finalized")))return;if(this.finalized=!0,this._$Ei(),this.hasOwnProperty(ua("properties"))){const i=this.properties,r=[...W_(i),...V_(i)];for(const s of r)this.createProperty(s,i[s])}const e=this[Symbol.metadata];if(e!==null){const i=litPropertyMetadata.get(e);if(i!==void 0)for(const[r,s]of i)this.elementProperties.set(r,s)}this._$Eh=new Map;for(const[i,r]of this.elementProperties){const s=this._$Eu(i,r);s!==void 0&&this._$Eh.set(s,i)}this.elementStyles=this.finalizeStyles(this.styles)}static finalizeStyles(e){const i=[];if(Array.isArray(e)){const r=new Set(e.flat(1/0).reverse());for(const s of r)i.unshift(jg(s))}else e!==void 0&&i.push(jg(e));return i}static _$Eu(e,i){const r=i.attribute;return r===!1?void 0:typeof r=="string"?r:typeof e=="string"?e.toLowerCase():void 0}constructor(){super(),this._$Ep=void 0,this.isUpdatePending=!1,this.hasUpdated=!1,this._$Em=null,this._$Ev()}_$Ev(){var e;this._$ES=new Promise(i=>this.enableUpdating=i),this._$AL=new Map,this._$E_(),this.requestUpdate(),(e=this.constructor.l)==null||e.forEach(i=>i(this))}addController(e){var i;(this._$EO??(this._$EO=new Set)).add(e),this.renderRoot!==void 0&&this.isConnected&&((i=e.hostConnected)==null||i.call(e))}removeController(e){var i;(i=this._$EO)==null||i.delete(e)}_$E_(){const e=new Map,i=this.constructor.elementProperties;for(const r of i.keys())this.hasOwnProperty(r)&&(e.set(r,this[r]),delete this[r]);e.size>0&&(this._$Ep=e)}createRenderRoot(){const e=this.shadowRoot??this.attachShadow(this.constructor.shadowRootOptions);return z_(e,this.constructor.elementStyles),e}connectedCallback(){var e;this.renderRoot??(this.renderRoot=this.createRenderRoot()),this.enableUpdating(!0),(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostConnected)==null?void 0:r.call(i)})}enableUpdating(e){}disconnectedCallback(){var e;(e=this._$EO)==null||e.forEach(i=>{var r;return(r=i.hostDisconnected)==null?void 0:r.call(i)})}attributeChangedCallback(e,i,r){this._$AK(e,r)}_$ET(e,i){var n;const r=this.constructor.elementProperties.get(e),s=this.constructor._$Eu(e,r);if(s!==void 0&&r.reflect===!0){const o=(((n=r.converter)==null?void 0:n.toAttribute)!==void 0?r.converter:Ql).toAttribute(i,r.type);this._$Em=e,o==null?this.removeAttribute(s):this.setAttribute(s,o),this._$Em=null}}_$AK(e,i){var n,o;const r=this.constructor,s=r._$Eh.get(e);if(s!==void 0&&this._$Em!==s){const a=r.getPropertyOptions(s),c=typeof a.converter=="function"?{fromAttribute:a.converter}:((n=a.converter)==null?void 0:n.fromAttribute)!==void 0?a.converter:Ql;this._$Em=s,this[s]=c.fromAttribute(i,a.type)??((o=this._$Ej)==null?void 0:o.get(s))??null,this._$Em=null}}requestUpdate(e,i,r){var s;if(e!==void 0){const n=this.constructor,o=this[e];if(r??(r=n.getPropertyOptions(e)),!((r.hasChanged??e0)(o,i)||r.useDefault&&r.reflect&&o===((s=this._$Ej)==null?void 0:s.get(e))&&!this.hasAttribute(n._$Eu(e,r))))return;this.C(e,i,r)}this.isUpdatePending===!1&&(this._$ES=this._$EP())}C(e,i,{useDefault:r,reflect:s,wrapped:n},o){r&&!(this._$Ej??(this._$Ej=new Map)).has(e)&&(this._$Ej.set(e,o??i??this[e]),n!==!0||o!==void 0)||(this._$AL.has(e)||(this.hasUpdated||r||(i=void 0),this._$AL.set(e,i)),s===!0&&this._$Em!==e&&(this._$Eq??(this._$Eq=new Set)).add(e))}async _$EP(){this.isUpdatePending=!0;try{await this._$ES}catch(i){Promise.reject(i)}const e=this.scheduleUpdate();return e!=null&&await e,!this.isUpdatePending}scheduleUpdate(){return this.performUpdate()}performUpdate(){var r;if(!this.isUpdatePending)return;if(!this.hasUpdated){if(this.renderRoot??(this.renderRoot=this.createRenderRoot()),this._$Ep){for(const[n,o]of this._$Ep)this[n]=o;this._$Ep=void 0}const s=this.constructor.elementProperties;if(s.size>0)for(const[n,o]of s){const{wrapped:a}=o,c=this[n];a!==!0||this._$AL.has(n)||c===void 0||this.C(n,void 0,o,c)}}let e=!1;const i=this._$AL;try{e=this.shouldUpdate(i),e?(this.willUpdate(i),(r=this._$EO)==null||r.forEach(s=>{var n;return(n=s.hostUpdate)==null?void 0:n.call(s)}),this.update(i)):this._$EM()}catch(s){throw e=!1,this._$EM(),s}e&&this._$AE(i)}willUpdate(e){}_$AE(e){var i;(i=this._$EO)==null||i.forEach(r=>{var s;return(s=r.hostUpdated)==null?void 0:s.call(r)}),this.hasUpdated||(this.hasUpdated=!0,this.firstUpdated(e)),this.updated(e)}_$EM(){this._$AL=new Map,this.isUpdatePending=!1}get updateComplete(){return this.getUpdateComplete()}getUpdateComplete(){return this._$ES}shouldUpdate(e){return!0}update(e){this._$Eq&&(this._$Eq=this._$Eq.forEach(i=>this._$ET(i,this[i]))),this._$EM()}updated(e){}firstUpdated(e){}}Nn.elementStyles=[],Nn.shadowRootOptions={mode:"open"},Nn[ua("elementProperties")]=new Map,Nn[ua("finalized")]=new Map,Cd==null||Cd({ReactiveElement:Nn}),(Wr.reactiveElementVersions??(Wr.reactiveElementVersions=[])).push("2.1.0");/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const da=globalThis,eu=da.trustedTypes,Hg=eu?eu.createPolicy("lit-html",{createHTML:t=>t}):void 0,C2="$lit$",Ur=`lit$${Math.random().toFixed(9).slice(2)}$`,E2="?"+Ur,Z_=`<${E2}>`,Ks=document,Wa=()=>Ks.createComment(""),Va=t=>t===null||typeof t!="object"&&typeof t!="function",t0=Array.isArray,Y_=t=>t0(t)||typeof(t==null?void 0:t[Symbol.iterator])=="function",Ed=`[ 	
\f\r]`,_o=/<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g,qg=/-->/g,Wg=/>/g,ns=RegExp(`>|${Ed}(?:([^\\s"'>=/]+)(${Ed}*=${Ed}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`,"g"),Vg=/'/g,Kg=/"/g,x2=/^(?:script|style|textarea|title)$/i,I2=t=>(e,...i)=>({_$litType$:t,strings:e,values:i}),A=I2(1),W=I2(2),xr=Symbol.for("lit-noChange"),Xe=Symbol.for("lit-nothing"),Gg=new WeakMap,ks=Ks.createTreeWalker(Ks,129);function A2(t,e){if(!t0(t)||!t.hasOwnProperty("raw"))throw Error("invalid template strings array");return Hg!==void 0?Hg.createHTML(e):e}const J_=(t,e)=>{const i=t.length-1,r=[];let s,n=e===2?"<svg>":e===3?"<math>":"",o=_o;for(let a=0;a<i;a++){const c=t[a];let l,u,d=-1,h=0;for(;h<c.length&&(o.lastIndex=h,u=o.exec(c),u!==null);)h=o.lastIndex,o===_o?u[1]==="!--"?o=qg:u[1]!==void 0?o=Wg:u[2]!==void 0?(x2.test(u[2])&&(s=RegExp("</"+u[2],"g")),o=ns):u[3]!==void 0&&(o=ns):o===ns?u[0]===">"?(o=s??_o,d=-1):u[1]===void 0?d=-2:(d=o.lastIndex-u[2].length,l=u[1],o=u[3]===void 0?ns:u[3]==='"'?Kg:Vg):o===Kg||o===Vg?o=ns:o===qg||o===Wg?o=_o:(o=ns,s=void 0);const p=o===ns&&t[a+1].startsWith("/>")?" ":"";n+=o===_o?c+Z_:d>=0?(r.push(l),c.slice(0,d)+C2+c.slice(d)+Ur+p):c+Ur+(d===-2?a:p)}return[A2(t,n+(t[i]||"<?>")+(e===2?"</svg>":e===3?"</math>":"")),r]};class Ka{constructor({strings:e,_$litType$:i},r){let s;this.parts=[];let n=0,o=0;const a=e.length-1,c=this.parts,[l,u]=J_(e,i);if(this.el=Ka.createElement(l,r),ks.currentNode=this.el.content,i===2||i===3){const d=this.el.content.firstChild;d.replaceWith(...d.childNodes)}for(;(s=ks.nextNode())!==null&&c.length<a;){if(s.nodeType===1){if(s.hasAttributes())for(const d of s.getAttributeNames())if(d.endsWith(C2)){const h=u[o++],p=s.getAttribute(d).split(Ur),g=/([.?@])?(.*)/.exec(h);c.push({type:1,index:n,name:g[2],strings:p,ctor:g[1]==="."?Q_:g[1]==="?"?eN:g[1]==="@"?tN:Su}),s.removeAttribute(d)}else d.startsWith(Ur)&&(c.push({type:6,index:n}),s.removeAttribute(d));if(x2.test(s.tagName)){const d=s.textContent.split(Ur),h=d.length-1;if(h>0){s.textContent=eu?eu.emptyScript:"";for(let p=0;p<h;p++)s.append(d[p],Wa()),ks.nextNode(),c.push({type:2,index:++n});s.append(d[h],Wa())}}}else if(s.nodeType===8)if(s.data===E2)c.push({type:2,index:n});else{let d=-1;for(;(d=s.data.indexOf(Ur,d+1))!==-1;)c.push({type:7,index:n}),d+=Ur.length-1}n++}}static createElement(e,i){const r=Ks.createElement("template");return r.innerHTML=e,r}}function to(t,e,i=t,r){var o,a;if(e===xr)return e;let s=r!==void 0?(o=i._$Co)==null?void 0:o[r]:i._$Cl;const n=Va(e)?void 0:e._$litDirective$;return(s==null?void 0:s.constructor)!==n&&((a=s==null?void 0:s._$AO)==null||a.call(s,!1),n===void 0?s=void 0:(s=new n(t),s._$AT(t,i,r)),r!==void 0?(i._$Co??(i._$Co=[]))[r]=s:i._$Cl=s),s!==void 0&&(e=to(t,s._$AS(t,e.values),s,r)),e}class X_{constructor(e,i){this._$AV=[],this._$AN=void 0,this._$AD=e,this._$AM=i}get parentNode(){return this._$AM.parentNode}get _$AU(){return this._$AM._$AU}u(e){const{el:{content:i},parts:r}=this._$AD,s=((e==null?void 0:e.creationScope)??Ks).importNode(i,!0);ks.currentNode=s;let n=ks.nextNode(),o=0,a=0,c=r[0];for(;c!==void 0;){if(o===c.index){let l;c.type===2?l=new dc(n,n.nextSibling,this,e):c.type===1?l=new c.ctor(n,c.name,c.strings,this,e):c.type===6&&(l=new iN(n,this,e)),this._$AV.push(l),c=r[++a]}o!==(c==null?void 0:c.index)&&(n=ks.nextNode(),o++)}return ks.currentNode=Ks,s}p(e){let i=0;for(const r of this._$AV)r!==void 0&&(r.strings!==void 0?(r._$AI(e,r,i),i+=r.strings.length-2):r._$AI(e[i])),i++}}class dc{get _$AU(){var e;return((e=this._$AM)==null?void 0:e._$AU)??this._$Cv}constructor(e,i,r,s){this.type=2,this._$AH=Xe,this._$AN=void 0,this._$AA=e,this._$AB=i,this._$AM=r,this.options=s,this._$Cv=(s==null?void 0:s.isConnected)??!0}get parentNode(){let e=this._$AA.parentNode;const i=this._$AM;return i!==void 0&&(e==null?void 0:e.nodeType)===11&&(e=i.parentNode),e}get startNode(){return this._$AA}get endNode(){return this._$AB}_$AI(e,i=this){e=to(this,e,i),Va(e)?e===Xe||e==null||e===""?(this._$AH!==Xe&&this._$AR(),this._$AH=Xe):e!==this._$AH&&e!==xr&&this._(e):e._$litType$!==void 0?this.$(e):e.nodeType!==void 0?this.T(e):Y_(e)?this.k(e):this._(e)}O(e){return this._$AA.parentNode.insertBefore(e,this._$AB)}T(e){this._$AH!==e&&(this._$AR(),this._$AH=this.O(e))}_(e){this._$AH!==Xe&&Va(this._$AH)?this._$AA.nextSibling.data=e:this.T(Ks.createTextNode(e)),this._$AH=e}$(e){var n;const{values:i,_$litType$:r}=e,s=typeof r=="number"?this._$AC(e):(r.el===void 0&&(r.el=Ka.createElement(A2(r.h,r.h[0]),this.options)),r);if(((n=this._$AH)==null?void 0:n._$AD)===s)this._$AH.p(i);else{const o=new X_(s,this),a=o.u(this.options);o.p(i),this.T(a),this._$AH=o}}_$AC(e){let i=Gg.get(e.strings);return i===void 0&&Gg.set(e.strings,i=new Ka(e)),i}k(e){t0(this._$AH)||(this._$AH=[],this._$AR());const i=this._$AH;let r,s=0;for(const n of e)s===i.length?i.push(r=new dc(this.O(Wa()),this.O(Wa()),this,this.options)):r=i[s],r._$AI(n),s++;s<i.length&&(this._$AR(r&&r._$AB.nextSibling,s),i.length=s)}_$AR(e=this._$AA.nextSibling,i){var r;for((r=this._$AP)==null?void 0:r.call(this,!1,!0,i);e&&e!==this._$AB;){const s=e.nextSibling;e.remove(),e=s}}setConnected(e){var i;this._$AM===void 0&&(this._$Cv=e,(i=this._$AP)==null||i.call(this,e))}}class Su{get tagName(){return this.element.tagName}get _$AU(){return this._$AM._$AU}constructor(e,i,r,s,n){this.type=1,this._$AH=Xe,this._$AN=void 0,this.element=e,this.name=i,this._$AM=s,this.options=n,r.length>2||r[0]!==""||r[1]!==""?(this._$AH=Array(r.length-1).fill(new String),this.strings=r):this._$AH=Xe}_$AI(e,i=this,r,s){const n=this.strings;let o=!1;if(n===void 0)e=to(this,e,i,0),o=!Va(e)||e!==this._$AH&&e!==xr,o&&(this._$AH=e);else{const a=e;let c,l;for(e=n[0],c=0;c<n.length-1;c++)l=to(this,a[r+c],i,c),l===xr&&(l=this._$AH[c]),o||(o=!Va(l)||l!==this._$AH[c]),l===Xe?e=Xe:e!==Xe&&(e+=(l??"")+n[c+1]),this._$AH[c]=l}o&&!s&&this.j(e)}j(e){e===Xe?this.element.removeAttribute(this.name):this.element.setAttribute(this.name,e??"")}}class Q_ extends Su{constructor(){super(...arguments),this.type=3}j(e){this.element[this.name]=e===Xe?void 0:e}}class eN extends Su{constructor(){super(...arguments),this.type=4}j(e){this.element.toggleAttribute(this.name,!!e&&e!==Xe)}}class tN extends Su{constructor(e,i,r,s,n){super(e,i,r,s,n),this.type=5}_$AI(e,i=this){if((e=to(this,e,i,0)??Xe)===xr)return;const r=this._$AH,s=e===Xe&&r!==Xe||e.capture!==r.capture||e.once!==r.once||e.passive!==r.passive,n=e!==Xe&&(r===Xe||s);s&&this.element.removeEventListener(this.name,this,r),n&&this.element.addEventListener(this.name,this,e),this._$AH=e}handleEvent(e){var i;typeof this._$AH=="function"?this._$AH.call(((i=this.options)==null?void 0:i.host)??this.element,e):this._$AH.handleEvent(e)}}class iN{constructor(e,i,r){this.element=e,this.type=6,this._$AN=void 0,this._$AM=i,this.options=r}get _$AU(){return this._$AM._$AU}_$AI(e){to(this,e)}}const xd=da.litHtmlPolyfillSupport;xd==null||xd(Ka,dc),(da.litHtmlVersions??(da.litHtmlVersions=[])).push("3.3.0");const rN=(t,e,i)=>{const r=(i==null?void 0:i.renderBefore)??e;let s=r._$litPart$;if(s===void 0){const n=(i==null?void 0:i.renderBefore)??null;r._$litPart$=s=new dc(e.insertBefore(Wa(),n),n,void 0,i??{})}return s._$AI(t),s};/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const Us=globalThis;class te extends Nn{constructor(){super(...arguments),this.renderOptions={host:this},this._$Do=void 0}createRenderRoot(){var i;const e=super.createRenderRoot();return(i=this.renderOptions).renderBefore??(i.renderBefore=e.firstChild),e}update(e){const i=this.render();this.hasUpdated||(this.renderOptions.isConnected=this.isConnected),super.update(e),this._$Do=rN(i,this.renderRoot,this.renderOptions)}connectedCallback(){var e;super.connectedCallback(),(e=this._$Do)==null||e.setConnected(!0)}disconnectedCallback(){var e;super.disconnectedCallback(),(e=this._$Do)==null||e.setConnected(!1)}render(){return xr}}var Rf;te._$litElement$=!0,te.finalized=!0,(Rf=Us.litElementHydrateSupport)==null||Rf.call(Us,{LitElement:te});const Id=Us.litElementPolyfillSupport;Id==null||Id({LitElement:te}),(Us.litElementVersions??(Us.litElementVersions=[])).push("4.2.0");let ha,Vr,Kr;function sN(t,e){ha=document.createElement("style"),Vr=document.createElement("style"),Kr=document.createElement("style"),ha.textContent=Bn(t).core.cssText,Vr.textContent=Bn(t).dark.cssText,Kr.textContent=Bn(t).light.cssText,document.head.appendChild(ha),document.head.appendChild(Vr),document.head.appendChild(Kr),_2(e)}function _2(t){Vr&&Kr&&(t==="light"?(Vr.removeAttribute("media"),Kr.media="enabled"):(Kr.removeAttribute("media"),Vr.media="enabled"))}function nN(t){ha&&Vr&&Kr&&(ha.textContent=Bn(t).core.cssText,Vr.textContent=Bn(t).dark.cssText,Kr.textContent=Bn(t).light.cssText)}function Bn(t){return{core:le`
      @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
      @keyframes w3m-shake {
        0% {
          transform: scale(1) rotate(0deg);
        }
        20% {
          transform: scale(1) rotate(-1deg);
        }
        40% {
          transform: scale(1) rotate(1.5deg);
        }
        60% {
          transform: scale(1) rotate(-1.5deg);
        }
        80% {
          transform: scale(1) rotate(1deg);
        }
        100% {
          transform: scale(1) rotate(0deg);
        }
      }
      @keyframes w3m-iframe-fade-out {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
      @keyframes w3m-iframe-zoom-in {
        0% {
          transform: translateY(50px);
          opacity: 0;
        }
        100% {
          transform: translateY(0px);
          opacity: 1;
        }
      }
      @keyframes w3m-iframe-zoom-in-mobile {
        0% {
          transform: scale(0.95);
          opacity: 0;
        }
        100% {
          transform: scale(1);
          opacity: 1;
        }
      }
      :root {
        --w3m-modal-width: 360px;
        --w3m-color-mix-strength: ${mi(t!=null&&t["--w3m-color-mix-strength"]?`${t["--w3m-color-mix-strength"]}%`:"0%")};
        --w3m-font-family: ${mi((t==null?void 0:t["--w3m-font-family"])||"Inter, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;")};
        --w3m-font-size-master: ${mi((t==null?void 0:t["--w3m-font-size-master"])||"10px")};
        --w3m-border-radius-master: ${mi((t==null?void 0:t["--w3m-border-radius-master"])||"4px")};
        --w3m-z-index: ${mi((t==null?void 0:t["--w3m-z-index"])||999)};

        --wui-font-family: var(--w3m-font-family);

        --wui-font-size-mini: calc(var(--w3m-font-size-master) * 0.8);
        --wui-font-size-micro: var(--w3m-font-size-master);
        --wui-font-size-tiny: calc(var(--w3m-font-size-master) * 1.2);
        --wui-font-size-small: calc(var(--w3m-font-size-master) * 1.4);
        --wui-font-size-paragraph: calc(var(--w3m-font-size-master) * 1.6);
        --wui-font-size-medium: calc(var(--w3m-font-size-master) * 1.8);
        --wui-font-size-large: calc(var(--w3m-font-size-master) * 2);
        --wui-font-size-title-6: calc(var(--w3m-font-size-master) * 2.2);
        --wui-font-size-medium-title: calc(var(--w3m-font-size-master) * 2.4);
        --wui-font-size-2xl: calc(var(--w3m-font-size-master) * 4);

        --wui-border-radius-5xs: var(--w3m-border-radius-master);
        --wui-border-radius-4xs: calc(var(--w3m-border-radius-master) * 1.5);
        --wui-border-radius-3xs: calc(var(--w3m-border-radius-master) * 2);
        --wui-border-radius-xxs: calc(var(--w3m-border-radius-master) * 3);
        --wui-border-radius-xs: calc(var(--w3m-border-radius-master) * 4);
        --wui-border-radius-s: calc(var(--w3m-border-radius-master) * 5);
        --wui-border-radius-m: calc(var(--w3m-border-radius-master) * 7);
        --wui-border-radius-l: calc(var(--w3m-border-radius-master) * 9);
        --wui-border-radius-3xl: calc(var(--w3m-border-radius-master) * 20);

        --wui-font-weight-light: 400;
        --wui-font-weight-regular: 500;
        --wui-font-weight-medium: 600;
        --wui-font-weight-bold: 700;

        --wui-letter-spacing-2xl: -1.6px;
        --wui-letter-spacing-medium-title: -0.96px;
        --wui-letter-spacing-title-6: -0.88px;
        --wui-letter-spacing-large: -0.8px;
        --wui-letter-spacing-medium: -0.72px;
        --wui-letter-spacing-paragraph: -0.64px;
        --wui-letter-spacing-small: -0.56px;
        --wui-letter-spacing-tiny: -0.48px;
        --wui-letter-spacing-micro: -0.2px;
        --wui-letter-spacing-mini: -0.16px;

        --wui-spacing-0: 0px;
        --wui-spacing-4xs: 2px;
        --wui-spacing-3xs: 4px;
        --wui-spacing-xxs: 6px;
        --wui-spacing-2xs: 7px;
        --wui-spacing-xs: 8px;
        --wui-spacing-1xs: 10px;
        --wui-spacing-s: 12px;
        --wui-spacing-m: 14px;
        --wui-spacing-l: 16px;
        --wui-spacing-2l: 18px;
        --wui-spacing-xl: 20px;
        --wui-spacing-xxl: 24px;
        --wui-spacing-2xl: 32px;
        --wui-spacing-3xl: 40px;
        --wui-spacing-4xl: 90px;
        --wui-spacing-5xl: 95px;

        --wui-icon-box-size-xxs: 14px;
        --wui-icon-box-size-xs: 20px;
        --wui-icon-box-size-sm: 24px;
        --wui-icon-box-size-md: 32px;
        --wui-icon-box-size-mdl: 36px;
        --wui-icon-box-size-lg: 40px;
        --wui-icon-box-size-2lg: 48px;
        --wui-icon-box-size-xl: 64px;

        --wui-icon-size-inherit: inherit;
        --wui-icon-size-xxs: 10px;
        --wui-icon-size-xs: 12px;
        --wui-icon-size-sm: 14px;
        --wui-icon-size-md: 16px;
        --wui-icon-size-mdl: 18px;
        --wui-icon-size-lg: 20px;
        --wui-icon-size-xl: 24px;
        --wui-icon-size-xxl: 28px;

        --wui-wallet-image-size-inherit: inherit;
        --wui-wallet-image-size-sm: 40px;
        --wui-wallet-image-size-md: 56px;
        --wui-wallet-image-size-lg: 80px;

        --wui-visual-size-size-inherit: inherit;
        --wui-visual-size-sm: 40px;
        --wui-visual-size-md: 55px;
        --wui-visual-size-lg: 80px;

        --wui-box-size-md: 100px;
        --wui-box-size-lg: 120px;

        --wui-ease-out-power-2: cubic-bezier(0, 0, 0.22, 1);
        --wui-ease-out-power-1: cubic-bezier(0, 0, 0.55, 1);

        --wui-ease-in-power-3: cubic-bezier(0.66, 0, 1, 1);
        --wui-ease-in-power-2: cubic-bezier(0.45, 0, 1, 1);
        --wui-ease-in-power-1: cubic-bezier(0.3, 0, 1, 1);

        --wui-ease-inout-power-1: cubic-bezier(0.45, 0, 0.55, 1);

        --wui-duration-lg: 200ms;
        --wui-duration-md: 125ms;
        --wui-duration-sm: 75ms;

        --wui-path-network-sm: path(
          'M15.4 2.1a5.21 5.21 0 0 1 5.2 0l11.61 6.7a5.21 5.21 0 0 1 2.61 4.52v13.4c0 1.87-1 3.59-2.6 4.52l-11.61 6.7c-1.62.93-3.6.93-5.22 0l-11.6-6.7a5.21 5.21 0 0 1-2.61-4.51v-13.4c0-1.87 1-3.6 2.6-4.52L15.4 2.1Z'
        );

        --wui-path-network-md: path(
          'M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z'
        );

        --wui-path-network-lg: path(
          'M78.3244 18.926L50.1808 2.45078C45.7376 -0.150261 40.2624 -0.150262 35.8192 2.45078L7.6756 18.926C3.23322 21.5266 0.5 26.3301 0.5 31.5248V64.4752C0.5 69.6699 3.23322 74.4734 7.6756 77.074L35.8192 93.5492C40.2624 96.1503 45.7376 96.1503 50.1808 93.5492L78.3244 77.074C82.7668 74.4734 85.5 69.6699 85.5 64.4752V31.5248C85.5 26.3301 82.7668 21.5266 78.3244 18.926Z'
        );

        --wui-width-network-sm: 36px;
        --wui-width-network-md: 48px;
        --wui-width-network-lg: 86px;

        --wui-height-network-sm: 40px;
        --wui-height-network-md: 54px;
        --wui-height-network-lg: 96px;

        --wui-icon-size-network-xs: 12px;
        --wui-icon-size-network-sm: 16px;
        --wui-icon-size-network-md: 24px;
        --wui-icon-size-network-lg: 42px;

        --wui-color-inherit: inherit;

        --wui-color-inverse-100: #fff;
        --wui-color-inverse-000: #000;

        --wui-cover: rgba(20, 20, 20, 0.8);

        --wui-color-modal-bg: var(--wui-color-modal-bg-base);

        --wui-color-accent-100: var(--wui-color-accent-base-100);
        --wui-color-accent-090: var(--wui-color-accent-base-090);
        --wui-color-accent-080: var(--wui-color-accent-base-080);

        --wui-color-success-100: var(--wui-color-success-base-100);
        --wui-color-success-125: var(--wui-color-success-base-125);

        --wui-color-warning-100: var(--wui-color-warning-base-100);

        --wui-color-error-100: var(--wui-color-error-base-100);
        --wui-color-error-125: var(--wui-color-error-base-125);

        --wui-color-blue-100: var(--wui-color-blue-base-100);
        --wui-color-blue-90: var(--wui-color-blue-base-90);

        --wui-icon-box-bg-error-100: var(--wui-icon-box-bg-error-base-100);
        --wui-icon-box-bg-blue-100: var(--wui-icon-box-bg-blue-base-100);
        --wui-icon-box-bg-success-100: var(--wui-icon-box-bg-success-base-100);
        --wui-icon-box-bg-inverse-100: var(--wui-icon-box-bg-inverse-base-100);

        --wui-all-wallets-bg-100: var(--wui-all-wallets-bg-100);

        --wui-avatar-border: var(--wui-avatar-border-base);

        --wui-thumbnail-border: var(--wui-thumbnail-border-base);

        --wui-wallet-button-bg: var(--wui-wallet-button-bg-base);

        --wui-box-shadow-blue: var(--wui-color-accent-glass-020);
      }

      @supports (background: color-mix(in srgb, white 50%, black)) {
        :root {
          --wui-color-modal-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-modal-bg-base)
          );

          --wui-box-shadow-blue: color-mix(in srgb, var(--wui-color-accent-100) 20%, transparent);

          --wui-color-accent-100: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 100%,
            transparent
          );
          --wui-color-accent-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-090: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 90%,
            transparent
          );
          --wui-color-accent-glass-080: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 80%,
            transparent
          );
          --wui-color-accent-glass-020: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 20%,
            transparent
          );
          --wui-color-accent-glass-015: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 15%,
            transparent
          );
          --wui-color-accent-glass-010: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 10%,
            transparent
          );
          --wui-color-accent-glass-005: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 5%,
            transparent
          );
          --wui-color-accent-002: color-mix(
            in srgb,
            var(--wui-color-accent-base-100) 2%,
            transparent
          );

          --wui-color-fg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-100)
          );
          --wui-color-fg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-125)
          );
          --wui-color-fg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-150)
          );
          --wui-color-fg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-175)
          );
          --wui-color-fg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-200)
          );
          --wui-color-fg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-225)
          );
          --wui-color-fg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-250)
          );
          --wui-color-fg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-275)
          );
          --wui-color-fg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-300)
          );
          --wui-color-fg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-325)
          );
          --wui-color-fg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-fg-350)
          );

          --wui-color-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-100)
          );
          --wui-color-bg-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-125)
          );
          --wui-color-bg-150: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-150)
          );
          --wui-color-bg-175: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-175)
          );
          --wui-color-bg-200: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-200)
          );
          --wui-color-bg-225: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-225)
          );
          --wui-color-bg-250: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-250)
          );
          --wui-color-bg-275: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-275)
          );
          --wui-color-bg-300: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-300)
          );
          --wui-color-bg-325: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-325)
          );
          --wui-color-bg-350: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-bg-350)
          );

          --wui-color-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-100)
          );
          --wui-color-success-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-success-base-125)
          );

          --wui-color-warning-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-warning-base-100)
          );

          --wui-color-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-100)
          );
          --wui-color-blue-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-100)
          );
          --wui-color-blue-90: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-blue-base-90)
          );
          --wui-color-error-125: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-color-error-base-125)
          );

          --wui-icon-box-bg-error-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-error-base-100)
          );
          --wui-icon-box-bg-accent-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-blue-base-100)
          );
          --wui-icon-box-bg-success-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-success-base-100)
          );
          --wui-icon-box-bg-inverse-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-icon-box-bg-inverse-base-100)
          );

          --wui-all-wallets-bg-100: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-all-wallets-bg-100)
          );

          --wui-avatar-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-avatar-border-base)
          );

          --wui-thumbnail-border: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-thumbnail-border-base)
          );

          --wui-wallet-button-bg: color-mix(
            in srgb,
            var(--w3m-color-mix) var(--w3m-color-mix-strength),
            var(--wui-wallet-button-bg-base)
          );
        }
      }
    `,light:le`
      :root {
        --w3m-color-mix: ${mi((t==null?void 0:t["--w3m-color-mix"])||"#fff")};
        --w3m-accent: ${mi(jr(t,"dark")["--w3m-accent"])};
        --w3m-default: #fff;

        --wui-color-modal-bg-base: ${mi(jr(t,"dark")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(230, 100%, 67%, 1);
        --wui-color-blueberry-090: hsla(231, 76%, 61%, 1);
        --wui-color-blueberry-080: hsla(230, 59%, 55%, 1);
        --wui-color-blueberry-050: hsla(231, 100%, 70%, 0.1);

        --wui-color-fg-100: #e4e7e7;
        --wui-color-fg-125: #d0d5d5;
        --wui-color-fg-150: #a8b1b1;
        --wui-color-fg-175: #a8b0b0;
        --wui-color-fg-200: #949e9e;
        --wui-color-fg-225: #868f8f;
        --wui-color-fg-250: #788080;
        --wui-color-fg-275: #788181;
        --wui-color-fg-300: #6e7777;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #363636;

        --wui-color-bg-100: #141414;
        --wui-color-bg-125: #191a1a;
        --wui-color-bg-150: #1e1f1f;
        --wui-color-bg-175: #222525;
        --wui-color-bg-200: #272a2a;
        --wui-color-bg-225: #2c3030;
        --wui-color-bg-250: #313535;
        --wui-color-bg-275: #363b3b;
        --wui-color-bg-300: #3b4040;
        --wui-color-bg-325: #252525;
        --wui-color-bg-350: #ffffff;

        --wui-color-success-base-100: #26d962;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f25a67;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 217, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 217, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 217, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 217, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 217, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 217, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 217, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 217, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 217, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 217, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(242, 90, 103, 0.01);
        --wui-color-error-glass-002: rgba(242, 90, 103, 0.02);
        --wui-color-error-glass-005: rgba(242, 90, 103, 0.05);
        --wui-color-error-glass-010: rgba(242, 90, 103, 0.1);
        --wui-color-error-glass-015: rgba(242, 90, 103, 0.15);
        --wui-color-error-glass-020: rgba(242, 90, 103, 0.2);
        --wui-color-error-glass-025: rgba(242, 90, 103, 0.25);
        --wui-color-error-glass-030: rgba(242, 90, 103, 0.3);
        --wui-color-error-glass-060: rgba(242, 90, 103, 0.6);
        --wui-color-error-glass-080: rgba(242, 90, 103, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-color-gray-glass-001: rgba(255, 255, 255, 0.01);
        --wui-color-gray-glass-002: rgba(255, 255, 255, 0.02);
        --wui-color-gray-glass-005: rgba(255, 255, 255, 0.05);
        --wui-color-gray-glass-010: rgba(255, 255, 255, 0.1);
        --wui-color-gray-glass-015: rgba(255, 255, 255, 0.15);
        --wui-color-gray-glass-020: rgba(255, 255, 255, 0.2);
        --wui-color-gray-glass-025: rgba(255, 255, 255, 0.25);
        --wui-color-gray-glass-030: rgba(255, 255, 255, 0.3);
        --wui-color-gray-glass-060: rgba(255, 255, 255, 0.6);
        --wui-color-gray-glass-080: rgba(255, 255, 255, 0.8);
        --wui-color-gray-glass-090: rgba(255, 255, 255, 0.9);

        --wui-color-dark-glass-100: rgba(42, 42, 42, 1);

        --wui-icon-box-bg-error-base-100: #3c2426;
        --wui-icon-box-bg-blue-base-100: #20303f;
        --wui-icon-box-bg-success-base-100: #1f3a28;
        --wui-icon-box-bg-inverse-base-100: #243240;

        --wui-all-wallets-bg-100: #222b35;

        --wui-avatar-border-base: #252525;

        --wui-thumbnail-border-base: #252525;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --w3m-card-embedded-shadow-color: rgb(17 17 18 / 25%);
      }
    `,dark:le`
      :root {
        --w3m-color-mix: ${mi((t==null?void 0:t["--w3m-color-mix"])||"#000")};
        --w3m-accent: ${mi(jr(t,"light")["--w3m-accent"])};
        --w3m-default: #000;

        --wui-color-modal-bg-base: ${mi(jr(t,"light")["--w3m-background"])};
        --wui-color-accent-base-100: var(--w3m-accent);

        --wui-color-blueberry-100: hsla(231, 100%, 70%, 1);
        --wui-color-blueberry-090: hsla(231, 97%, 72%, 1);
        --wui-color-blueberry-080: hsla(231, 92%, 74%, 1);

        --wui-color-fg-100: #141414;
        --wui-color-fg-125: #2d3131;
        --wui-color-fg-150: #474d4d;
        --wui-color-fg-175: #636d6d;
        --wui-color-fg-200: #798686;
        --wui-color-fg-225: #828f8f;
        --wui-color-fg-250: #8b9797;
        --wui-color-fg-275: #95a0a0;
        --wui-color-fg-300: #9ea9a9;
        --wui-color-fg-325: #9a9a9a;
        --wui-color-fg-350: #d0d0d0;

        --wui-color-bg-100: #ffffff;
        --wui-color-bg-125: #f5fafa;
        --wui-color-bg-150: #f3f8f8;
        --wui-color-bg-175: #eef4f4;
        --wui-color-bg-200: #eaf1f1;
        --wui-color-bg-225: #e5eded;
        --wui-color-bg-250: #e1e9e9;
        --wui-color-bg-275: #dce7e7;
        --wui-color-bg-300: #d8e3e3;
        --wui-color-bg-325: #f3f3f3;
        --wui-color-bg-350: #202020;

        --wui-color-success-base-100: #26b562;
        --wui-color-success-base-125: #30a46b;

        --wui-color-warning-base-100: #f3a13f;

        --wui-color-error-base-100: #f05142;
        --wui-color-error-base-125: #df4a34;

        --wui-color-blue-base-100: rgba(102, 125, 255, 1);
        --wui-color-blue-base-90: rgba(102, 125, 255, 0.9);

        --wui-color-success-glass-001: rgba(38, 181, 98, 0.01);
        --wui-color-success-glass-002: rgba(38, 181, 98, 0.02);
        --wui-color-success-glass-005: rgba(38, 181, 98, 0.05);
        --wui-color-success-glass-010: rgba(38, 181, 98, 0.1);
        --wui-color-success-glass-015: rgba(38, 181, 98, 0.15);
        --wui-color-success-glass-020: rgba(38, 181, 98, 0.2);
        --wui-color-success-glass-025: rgba(38, 181, 98, 0.25);
        --wui-color-success-glass-030: rgba(38, 181, 98, 0.3);
        --wui-color-success-glass-060: rgba(38, 181, 98, 0.6);
        --wui-color-success-glass-080: rgba(38, 181, 98, 0.8);

        --wui-color-success-glass-reown-020: rgba(48, 164, 107, 0.2);

        --wui-color-warning-glass-reown-020: rgba(243, 161, 63, 0.2);

        --wui-color-error-glass-001: rgba(240, 81, 66, 0.01);
        --wui-color-error-glass-002: rgba(240, 81, 66, 0.02);
        --wui-color-error-glass-005: rgba(240, 81, 66, 0.05);
        --wui-color-error-glass-010: rgba(240, 81, 66, 0.1);
        --wui-color-error-glass-015: rgba(240, 81, 66, 0.15);
        --wui-color-error-glass-020: rgba(240, 81, 66, 0.2);
        --wui-color-error-glass-025: rgba(240, 81, 66, 0.25);
        --wui-color-error-glass-030: rgba(240, 81, 66, 0.3);
        --wui-color-error-glass-060: rgba(240, 81, 66, 0.6);
        --wui-color-error-glass-080: rgba(240, 81, 66, 0.8);

        --wui-color-error-glass-reown-020: rgba(223, 74, 52, 0.2);

        --wui-icon-box-bg-error-base-100: #f4dfdd;
        --wui-icon-box-bg-blue-base-100: #d9ecfb;
        --wui-icon-box-bg-success-base-100: #daf0e4;
        --wui-icon-box-bg-inverse-base-100: #dcecfc;

        --wui-all-wallets-bg-100: #e8f1fa;

        --wui-avatar-border-base: #f3f4f4;

        --wui-thumbnail-border-base: #eaefef;

        --wui-wallet-button-bg-base: var(--wui-color-bg-125);

        --wui-color-gray-glass-001: rgba(0, 0, 0, 0.01);
        --wui-color-gray-glass-002: rgba(0, 0, 0, 0.02);
        --wui-color-gray-glass-005: rgba(0, 0, 0, 0.05);
        --wui-color-gray-glass-010: rgba(0, 0, 0, 0.1);
        --wui-color-gray-glass-015: rgba(0, 0, 0, 0.15);
        --wui-color-gray-glass-020: rgba(0, 0, 0, 0.2);
        --wui-color-gray-glass-025: rgba(0, 0, 0, 0.25);
        --wui-color-gray-glass-030: rgba(0, 0, 0, 0.3);
        --wui-color-gray-glass-060: rgba(0, 0, 0, 0.6);
        --wui-color-gray-glass-080: rgba(0, 0, 0, 0.8);
        --wui-color-gray-glass-090: rgba(0, 0, 0, 0.9);

        --wui-color-dark-glass-100: rgba(233, 233, 233, 1);

        --w3m-card-embedded-shadow-color: rgb(224 225 233 / 25%);
      }
    `}}const $e=le`
  *,
  *::after,
  *::before,
  :host {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-style: normal;
    text-rendering: optimizeSpeed;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -webkit-tap-highlight-color: transparent;
    font-family: var(--wui-font-family);
    backface-visibility: hidden;
  }
`,xt=le`
  button,
  a {
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      box-shadow var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border, box-shadow, border-radius;
    outline: none;
    border: none;
    column-gap: var(--wui-spacing-3xs);
    background-color: transparent;
    text-decoration: none;
  }

  wui-flex {
    transition: border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius;
  }

  button:disabled > wui-wallet-image,
  button:disabled > wui-all-wallets-image,
  button:disabled > wui-network-image,
  button:disabled > wui-image,
  button:disabled > wui-transaction-visual,
  button:disabled > wui-logo {
    filter: grayscale(1);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-gray-glass-005);
    }

    button:active:enabled {
      background-color: var(--wui-color-gray-glass-010);
    }
  }

  button:disabled > wui-icon-box {
    opacity: 0.5;
  }

  input {
    border: none;
    outline: none;
    appearance: none;
  }
`,hc=le`
  .wui-color-inherit {
    color: var(--wui-color-inherit);
  }

  .wui-color-accent-100 {
    color: var(--wui-color-accent-100);
  }

  .wui-color-error-100 {
    color: var(--wui-color-error-100);
  }

  .wui-color-blue-100 {
    color: var(--wui-color-blue-100);
  }

  .wui-color-blue-90 {
    color: var(--wui-color-blue-90);
  }

  .wui-color-error-125 {
    color: var(--wui-color-error-125);
  }

  .wui-color-success-100 {
    color: var(--wui-color-success-100);
  }

  .wui-color-success-125 {
    color: var(--wui-color-success-125);
  }

  .wui-color-inverse-100 {
    color: var(--wui-color-inverse-100);
  }

  .wui-color-inverse-000 {
    color: var(--wui-color-inverse-000);
  }

  .wui-color-fg-100 {
    color: var(--wui-color-fg-100);
  }

  .wui-color-fg-200 {
    color: var(--wui-color-fg-200);
  }

  .wui-color-fg-300 {
    color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    color: var(--wui-color-fg-350);
  }

  .wui-bg-color-inherit {
    background-color: var(--wui-color-inherit);
  }

  .wui-bg-color-blue-100 {
    background-color: var(--wui-color-accent-100);
  }

  .wui-bg-color-error-100 {
    background-color: var(--wui-color-error-100);
  }

  .wui-bg-color-error-125 {
    background-color: var(--wui-color-error-125);
  }

  .wui-bg-color-success-100 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-success-125 {
    background-color: var(--wui-color-success-100);
  }

  .wui-bg-color-inverse-100 {
    background-color: var(--wui-color-inverse-100);
  }

  .wui-bg-color-inverse-000 {
    background-color: var(--wui-color-inverse-000);
  }

  .wui-bg-color-fg-100 {
    background-color: var(--wui-color-fg-100);
  }

  .wui-bg-color-fg-200 {
    background-color: var(--wui-color-fg-200);
  }

  .wui-bg-color-fg-300 {
    background-color: var(--wui-color-fg-300);
  }

  .wui-color-fg-325 {
    background-color: var(--wui-color-fg-325);
  }

  .wui-color-fg-350 {
    background-color: var(--wui-color-fg-350);
  }
`,ht={getSpacingStyles(t,e){if(Array.isArray(t))return t[e]?`var(--wui-spacing-${t[e]})`:void 0;if(typeof t=="string")return`var(--wui-spacing-${t})`},getFormattedDate(t){return new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric"}).format(t)},getHostName(t){try{return new URL(t).hostname}catch{return""}},getTruncateString({string:t,charsStart:e,charsEnd:i,truncate:r}){return t.length<=e+i?t:r==="end"?`${t.substring(0,e)}...`:r==="start"?`...${t.substring(t.length-i)}`:`${t.substring(0,Math.floor(e))}...${t.substring(t.length-Math.floor(i))}`},generateAvatarColors(t){const e=t.toLowerCase().replace(/^0x/iu,"").replace(/[^a-f0-9]/gu,"").substring(0,6).padEnd(6,"0"),i=this.hexToRgb(e),r=getComputedStyle(document.documentElement).getPropertyValue("--w3m-border-radius-master"),s=100-3*Number(r==null?void 0:r.replace("px","")),n=`${s}% ${s}% at 65% 40%`,o=[];for(let a=0;a<5;a+=1){const c=this.tintColor(i,.15*a);o.push(`rgb(${c[0]}, ${c[1]}, ${c[2]})`)}return`
    --local-color-1: ${o[0]};
    --local-color-2: ${o[1]};
    --local-color-3: ${o[2]};
    --local-color-4: ${o[3]};
    --local-color-5: ${o[4]};
    --local-radial-circle: ${n}
   `},hexToRgb(t){const e=parseInt(t,16),i=e>>16&255,r=e>>8&255,s=e&255;return[i,r,s]},tintColor(t,e){const[i,r,s]=t,n=Math.round(i+(255-i)*e),o=Math.round(r+(255-r)*e),a=Math.round(s+(255-s)*e);return[n,o,a]},isNumber(t){return/^[0-9]+$/u.test(t)},getColorTheme(t){var e;return t||(typeof window<"u"&&window.matchMedia?(e=window.matchMedia("(prefers-color-scheme: dark)"))!=null&&e.matches?"dark":"light":"dark")},splitBalance(t){const e=t.split(".");return e.length===2?[e[0],e[1]]:["0","00"]},roundNumber(t,e,i){return t.toString().length>=e?Number(t).toFixed(i):t},formatNumberToLocalString(t,e=2){return t===void 0?"0.00":typeof t=="number"?t.toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e}):parseFloat(t).toLocaleString("en-US",{maximumFractionDigits:e,minimumFractionDigits:e})}};function oN(t,e){const{kind:i,elements:r}=e;return{kind:i,elements:r,finisher(s){customElements.get(t)||customElements.define(t,s)}}}function aN(t,e){return customElements.get(t)||customElements.define(t,e),e}function ee(t){return function(e){return typeof e=="function"?aN(t,e):oN(t,e)}}function cN(t){if(t.length>=255)throw new TypeError("Alphabet too long");const e=new Uint8Array(256);for(let l=0;l<e.length;l++)e[l]=255;for(let l=0;l<t.length;l++){const u=t.charAt(l),d=u.charCodeAt(0);if(e[d]!==255)throw new TypeError(u+" is ambiguous");e[d]=l}const i=t.length,r=t.charAt(0),s=Math.log(i)/Math.log(256),n=Math.log(256)/Math.log(i);function o(l){if(l instanceof Uint8Array||(ArrayBuffer.isView(l)?l=new Uint8Array(l.buffer,l.byteOffset,l.byteLength):Array.isArray(l)&&(l=Uint8Array.from(l))),!(l instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(l.length===0)return"";let u=0,d=0,h=0;const p=l.length;for(;h!==p&&l[h]===0;)h++,u++;const g=(p-h)*n+1>>>0,f=new Uint8Array(g);for(;h!==p;){let y=l[h],b=0;for(let v=g-1;(y!==0||b<d)&&v!==-1;v--,b++)y+=256*f[v]>>>0,f[v]=y%i>>>0,y=y/i>>>0;if(y!==0)throw new Error("Non-zero carry");d=b,h++}let w=g-d;for(;w!==g&&f[w]===0;)w++;let m=r.repeat(u);for(;w<g;++w)m+=t.charAt(f[w]);return m}function a(l){if(typeof l!="string")throw new TypeError("Expected String");if(l.length===0)return new Uint8Array;let u=0,d=0,h=0;for(;l[u]===r;)d++,u++;const p=(l.length-u)*s+1>>>0,g=new Uint8Array(p);for(;u<l.length;){const y=l.charCodeAt(u);if(y>255)return;let b=e[y];if(b===255)return;let v=0;for(let S=p-1;(b!==0||v<h)&&S!==-1;S--,v++)b+=i*g[S]>>>0,g[S]=b%256>>>0,b=b/256>>>0;if(b!==0)throw new Error("Non-zero carry");h=v,u++}let f=p-h;for(;f!==p&&g[f]===0;)f++;const w=new Uint8Array(d+(p-f));let m=d;for(;f!==p;)w[m++]=g[f++];return w}function c(l){const u=a(l);if(u)return u;throw new Error("Non-base"+i+" character")}return{encode:o,decodeUnsafe:a,decode:c}}var lN="123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz",uN=cN(lN);const Bc={ERROR_CODE_UNRECOGNIZED_CHAIN_ID:4902,ERROR_CODE_DEFAULT:5e3,ERROR_INVALID_CHAIN_ID:32603},N2={gasPriceOracle:{address:"0x420000000000000000000000000000000000000F"},l1Block:{address:"0x4200000000000000000000000000000000000015"},l2CrossDomainMessenger:{address:"0x4200000000000000000000000000000000000007"},l2Erc721Bridge:{address:"0x4200000000000000000000000000000000000014"},l2StandardBridge:{address:"0x4200000000000000000000000000000000000010"},l2ToL1MessagePasser:{address:"0x4200000000000000000000000000000000000016"}},dN={block:zm({format(t){var e;return{transactions:(e=t.transactions)==null?void 0:e.map(i=>{if(typeof i=="string")return i;const r=xu(i);return r.typeHex==="0x7e"&&(r.isSystemTx=i.isSystemTx,r.mint=i.mint?wr(i.mint):void 0,r.sourceHash=i.sourceHash,r.type="deposit"),r}),stateRoot:t.stateRoot}}}),transaction:jm({format(t){const e={};return t.type==="0x7e"&&(e.isSystemTx=t.isSystemTx,e.mint=t.mint?wr(t.mint):void 0,e.sourceHash=t.sourceHash,e.type="deposit"),e}}),transactionReceipt:FI({format(t){return{l1GasPrice:t.l1GasPrice?wr(t.l1GasPrice):null,l1GasUsed:t.l1GasUsed?wr(t.l1GasUsed):null,l1Fee:t.l1Fee?wr(t.l1Fee):null,l1FeeScalar:t.l1FeeScalar?Number(t.l1FeeScalar):null}}})};function S2(t,e){return gN(t)?pN(t):TI(t,e)}const hN={transaction:S2};function pN(t){fN(t);const{sourceHash:e,data:i,from:r,gas:s,isSystemTx:n,mint:o,to:a,value:c}=t,l=[e,r,a??"0x",o?he(o):"0x",c?he(c):"0x",s?he(s):"0x",n?"0x1":"0x",i??"0x"];return uo(["0x7e",Ys(l)])}function gN(t){return t.type==="deposit"||typeof t.sourceHash<"u"}function fN(t){const{from:e,to:i}=t;if(e&&!Er(e))throw new Zr({address:e});if(i&&!Er(i))throw new Zr({address:i})}const z={contracts:N2,formatters:dN,serializers:hN},Ad=1;({...z,contracts:{...z.contracts,l2OutputOracle:Ad+"",portal:Ad+"",l1StandardBridge:Ad+""}});const _d=11155111;({...z,contracts:{...z.contracts,l2OutputOracle:_d+"",portal:_d+"",l1StandardBridge:_d+""}});const Uc=1;({...z,contracts:{...z.contracts,disputeGameFactory:Uc+"",l2OutputOracle:Uc+"",portal:Uc+"",l1StandardBridge:Uc+""}});const Nd=5;({...z,contracts:{...z.contracts,l2OutputOracle:Nd+"",portal:Nd+"",l1StandardBridge:Nd+""}});const Dc=11155111;({...z,contracts:{...z.contracts,disputeGameFactory:Dc+"",l2OutputOracle:Dc+"",portal:Dc+"",l1StandardBridge:Dc+""}},Ri({id:53456,name:"BirdLayer",nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.birdlayer.xyz","https://rpc1.birdlayer.xyz"],webSocket:["wss://rpc.birdlayer.xyz/ws"]}},blockExplorers:{default:{name:"BirdLayer Explorer",url:"https://scan.birdlayer.xyz"}}}));({...z,contracts:{...z.contracts}});const Sd=1;Ri({...z,id:60808,name:"BOB",nativeCurrency:{decimals:18,name:"ETH",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.gobob.xyz"],webSocket:["wss://rpc.gobob.xyz"]}},blockExplorers:{default:{name:"BOB Explorer",url:"https://explorer.gobob.xyz"}},contracts:{...z.contracts,multicall3:{address:"0xcA11bde05977b3631167028862bE2a173976CA11",blockCreated:23131},l2OutputOracle:{[Sd]:{address:"0xdDa53E23f8a32640b04D7256e651C1db98dB11C1",blockCreated:4462615}},portal:{[Sd]:{address:"0x8AdeE124447435fE03e3CD24dF3f4cAE32E65a3E",blockCreated:4462615}}},sourceId:Sd});const $d=11155111;Ri({...z,id:808813,name:"BOB Sepolia",nativeCurrency:{decimals:18,name:"ETH",symbol:"ETH"},rpcUrls:{default:{http:["https://bob-sepolia.rpc.gobob.xyz"],webSocket:["wss://bob-sepolia.rpc.gobob.xyz"]}},blockExplorers:{default:{name:"BOB Sepolia Explorer",url:"https://bob-sepolia.explorer.gobob.xyz"}},contracts:{...z.contracts,multicall3:{address:"0xcA11bde05977b3631167028862bE2a173976CA11",blockCreated:35677},l2OutputOracle:{[$d]:{address:"0x14D0069452b4AE2b250B395b8adAb771E4267d2f",blockCreated:4462615}},portal:{[$d]:{address:"0x867B1Aa872b9C8cB5E9F7755feDC45BB24Ad0ae4",blockCreated:4462615}}},testnet:!0,sourceId:$d});const wN={estimateFeesPerGas:async t=>{var r;if(!((r=t.request)!=null&&r.feeCurrency))return null;const[e,i]=await Promise.all([mN(t.client,t.request.feeCurrency),yN(t.client,t.request.feeCurrency)]);return{maxFeePerGas:t.multiply(e-i)+i,maxPriorityFeePerGas:i}}};async function mN(t,e){const i=await t.request({method:"eth_gasPrice",params:[e]});return BigInt(i)}async function yN(t,e){const i=await t.request({method:"eth_maxPriorityFeePerGas",params:[e]});return BigInt(i)}function $2(t){return t===0||t===0n||t===void 0||t===null||t==="0"||t===""||typeof t=="string"&&(Vn(t).toLowerCase()==="0x"||Vn(t).toLowerCase()==="0x00")}function ea(t){return!$2(t)}function bN(t){return typeof t.maxFeePerGas<"u"&&typeof t.maxPriorityFeePerGas<"u"}function k2(t){return t.type==="cip64"?!0:bN(t)&&ea(t.feeCurrency)}const vN={block:zm({format(t){var e;return{transactions:(e=t.transactions)==null?void 0:e.map(i=>typeof i=="string"?i:{...xu(i),...i.gatewayFee?{gatewayFee:wr(i.gatewayFee),gatewayFeeRecipient:i.gatewayFeeRecipient}:{},feeCurrency:i.feeCurrency}),...t.randomness?{randomness:t.randomness}:{}}}}),transaction:jm({format(t){if(t.type==="0x7e")return{isSystemTx:t.isSystemTx,mint:t.mint?wr(t.mint):void 0,sourceHash:t.sourceHash,type:"deposit"};const e={feeCurrency:t.feeCurrency};return t.type==="0x7b"?e.type="cip64":(t.type==="0x7c"&&(e.type="cip42"),e.gatewayFee=t.gatewayFee?wr(t.gatewayFee):null,e.gatewayFeeRecipient=t.gatewayFeeRecipient),e}}),transactionRequest:Yx({format(t){const e={};return t.feeCurrency&&(e.feeCurrency=t.feeCurrency),k2(t)&&(e.type="0x7b"),e}})};function CN(t,e){return k2(t)?xN(t,e):S2(t,e)}const EN={transaction:CN};function xN(t,e){AN(t);const{chainId:i,gas:r,nonce:s,to:n,value:o,maxFeePerGas:a,maxPriorityFeePerGas:c,accessList:l,feeCurrency:u,data:d}=t,h=[he(i),s?he(s):"0x",c?he(c):"0x",a?he(a):"0x",r?he(r):"0x",n??"0x",o?he(o):"0x",d??"0x",cc(l),u,...ho(t,e)];return uo(["0x7b",Ys(h)])}const IN=Eu;function AN(t){const{chainId:e,maxPriorityFeePerGas:i,gasPrice:r,maxFeePerGas:s,to:n,feeCurrency:o}=t;if(e<=0)throw new ac({chainId:e});if(n&&!Er(n))throw new Zr({address:n});if(r)throw new ve("`gasPrice` is not a valid CIP-64 Transaction attribute.");if(ea(s)&&s>IN)throw new oc({maxFeePerGas:s});if(ea(i)&&ea(s)&&i>s)throw new zp({maxFeePerGas:s,maxPriorityFeePerGas:i});if(ea(o)&&!Er(o))throw new ve("`feeCurrency` MUST be a token address for CIP-64 transactions.");if($2(o))throw new ve("`feeCurrency` must be provided for CIP-64 transactions.")}const Zg={contracts:N2,formatters:vN,serializers:EN,fees:wN},jc=17e3;({...Zg,contracts:{...Zg.contracts,portal:jc+"",disputeGameFactory:jc+"",l2OutputOracle:jc+"",l1StandardBridge:jc+""}},Ri({id:44,name:"Crab Network",nativeCurrency:{decimals:18,name:"Crab Network Native Token",symbol:"CRAB"},rpcUrls:{default:{http:["https://crab-rpc.darwinia.network"],webSocket:["wss://crab-rpc.darwinia.network"]}},blockExplorers:{default:{name:"Blockscout",url:"https://crab-scan.darwinia.network"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:3032593}}})),Ri({id:66665,name:"Creator",nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.creatorchain.io"]}},blockExplorers:{default:{name:"Explorer",url:"https://explorer.creatorchain.io"}},contracts:{multicall3:{address:"0xcA11bde05977b3631167028862bE2a173976CA11"}},testnet:!0}),{...z,contracts:{...z.contracts}},{...z,contracts:{...z.contracts}},Ri({id:53457,name:"DODOchain Testnet",nativeCurrency:{decimals:18,name:"DODO",symbol:"DODO"},rpcUrls:{default:{http:["https://dodochain-testnet.alt.technology"],webSocket:["wss://dodochain-testnet.alt.technology/ws"]}},blockExplorers:{default:{name:"DODOchain Testnet (Sepolia) Explorer",url:"https://testnet-scan.dodochain.com"}},testnet:!0});const No=1;({...z.contracts,addressManager:No+"",l1CrossDomainMessenger:No+"",l2OutputOracle:No+"",portal:No+"",l1StandardBridge:No+""});const So=11155111;({...z.contracts,addressManager:So+"",l1CrossDomainMessenger:So+"",l2OutputOracle:So+"",portal:So+"",l1StandardBridge:So+""});const kd=1;({...z,contracts:{...z.contracts,l2OutputOracle:kd+"",portal:kd+"",l1StandardBridge:kd+""}});const Pd=17e3;({...z,contracts:{...z.contracts,l2OutputOracle:Pd+"",portal:Pd+"",l1StandardBridge:Pd+""}});({...z,contracts:{...z.contracts}});const _N=11155111;Ri({...z,id:3397901,network:"funkiSepolia",name:"Funki Sepolia Sandbox",nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://funki-testnet.alt.technology"]}},blockExplorers:{default:{name:"Funki Sepolia Sandbox Explorer",url:"https://sepolia-sandbox.funkichain.com/"}},testnet:!0,contracts:{...z.contracts,multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:1620204}},sourceId:_N});const zc=17e3;Ri({...z,name:"Garnet Testnet",testnet:!0,id:17069,sourceId:zc,nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://rpc.garnetchain.com"],webSocket:["wss://rpc.garnetchain.com"]}},blockExplorers:{default:{name:"Blockscout",url:"https://explorer.garnetchain.com"}},contracts:{...z.contracts,multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11"},portal:{[zc]:{address:"0x57ee40586fbE286AfC75E67cb69511A6D9aF5909",blockCreated:1274684}},l2OutputOracle:{[zc]:{address:"0xCb8E7AC561b8EF04F2a15865e9fbc0766FEF569B",blockCreated:1274684}},l1StandardBridge:{[zc]:{address:"0x09bcDd311FE398F80a78BE37E489f5D440DB95DE",blockCreated:1274684}}}});const Od=1;({...z,contracts:{...z.contracts,disputeGameFactory:Od+"",portal:Od+"",l1StandardBridge:Od+""}});const Td=11155111;({...z,contracts:{...z.contracts,disputeGameFactory:Td+"",portal:Td+"",l1StandardBridge:Td+""}},Ri({id:701,name:"Koi Network",nativeCurrency:{decimals:18,name:"Koi Network Native Token",symbol:"KRING"},rpcUrls:{default:{http:["https://koi-rpc.darwinia.network"],webSocket:["wss://koi-rpc.darwinia.network"]}},blockExplorers:{default:{name:"Blockscout",url:"https://koi-scan.darwinia.network"}},contracts:{multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11",blockCreated:180001}},testnet:!0}));const Rd=1;({...z,contracts:{...z.contracts,l2OutputOracle:Rd+"",portal:Rd+"",l1StandardBridge:Rd+""}});const Ld=11155111;({...z,contracts:{...z.contracts,l2OutputOracle:Ld+"",portal:Ld+"",l1StandardBridge:Ld+""}});const Md=1;({...z,contracts:{...z.contracts,l2OutputOracle:Md+"",portal:Md+"",l1StandardBridge:Md+""}});const Bd=1;({...z,contracts:{...z.contracts,l2OutputOracle:Bd+"",portal:Bd+"",l1StandardBridge:Bd+""}});const Ud=11155111;({...z,contracts:{...z.contracts,l2OutputOracle:Ud+"",portal:Ud+"",l1StandardBridge:Ud+""}});const Dd=56;({...z.contracts,l2OutputOracle:Dd+"",portal:Dd+"",l1StandardBridge:Dd+""});const jd=97;({...z.contracts,l2OutputOracle:jd+"",portal:jd+"",l1StandardBridge:jd+""});const Fc=1;({...z,contracts:{...z.contracts,disputeGameFactory:Fc+"",l2OutputOracle:Fc+"",portal:Fc+"",l1StandardBridge:Fc+""}});const zd=5;({...z,contracts:{...z.contracts,l2OutputOracle:zd+"",portal:zd+"",l1StandardBridge:zd+""}});const Hc=11155111;({...z,contracts:{...z.contracts,disputeGameFactory:Hc+"",l2OutputOracle:Hc+"",portal:Hc+"",l1StandardBridge:Hc+""}});const Yg=11155111;Ri({...z,name:"Pyrope Testnet",testnet:!0,id:695569,sourceId:Yg,nativeCurrency:{name:"Ether",symbol:"ETH",decimals:18},rpcUrls:{default:{http:["https://rpc.pyropechain.com"],webSocket:["wss://rpc.pyropechain.com"]}},blockExplorers:{default:{name:"Blockscout",url:"https://pyrope.blockscout.com"}},contracts:{...z.contracts,l1StandardBridge:{[Yg]:{address:"0xC24932c31D9621aE9e792576152B7ef010cFC2F8"}}}});const qc=1;Ri({...z,name:"Redstone",id:690,sourceId:qc,nativeCurrency:{decimals:18,name:"Ether",symbol:"ETH"},rpcUrls:{default:{http:["https://rpc.redstonechain.com"],webSocket:["wss://rpc.redstonechain.com"]}},blockExplorers:{default:{name:"Blockscout",url:"https://explorer.redstone.xyz"}},contracts:{...z.contracts,multicall3:{address:"0xca11bde05977b3631167028862be2a173976ca11"},portal:{[qc]:{address:"0xC7bCb0e8839a28A1cFadd1CF716de9016CdA51ae",blockCreated:19578329}},l2OutputOracle:{[qc]:{address:"0xa426A052f657AEEefc298b3B5c35a470e4739d69",blockCreated:19578337}},l1StandardBridge:{[qc]:{address:"0xc473ca7E02af24c129c2eEf51F2aDf0411c1Df69",blockCreated:19578331}}}});const Fd=1;({...z,contracts:{...z.contracts,l2OutputOracle:Fd+"",portal:Fd+"",l1StandardBridge:Fd+""}});const Hd=11155111;({...z,contracts:{...z.contracts,l2OutputOracle:Hd+"",portal:Hd+"",l1StandardBridge:Hd+""}});const qd=1;({...z,contracts:{...z.contracts,l2OutputOracle:qd+"",portal:qd+"",l1StandardBridge:qd+""}});({...z,contracts:{...z.contracts}});const Wc=1;({...z,contracts:{...z.contracts,disputeGameFactory:Wc+"",l2OutputOracle:Wc+"",portal:Wc+"",l1StandardBridge:Wc+""}});const Vc=11155111;({...z,contracts:{...z.contracts,disputeGameFactory:Vc+"",l2OutputOracle:Vc+"",portal:Vc+"",l1StandardBridge:Vc+""}});const Kc=1;({...z,contracts:{...z.contracts,disputeGameFactory:Kc+"",l2OutputOracle:Kc+"",portal:Kc+"",l1StandardBridge:Kc+""}});const Gc=11155111;({...z,contracts:{...z.contracts,disputeGameFactory:Gc+"",l2OutputOracle:Gc+"",portal:Gc+"",l1StandardBridge:Gc+""}});const Zc=1;({...z,contracts:{...z.contracts,disputeGameFactory:Zc+"",l2OutputOracle:Zc+"",portal:Zc+"",l1StandardBridge:Zc+""}});const Jg=11155111;({...z,contracts:{...z.contracts,portal:Jg+"",l1StandardBridge:Jg+""}},{...z,contracts:{...z.contracts}}),{...z,contracts:{...z.contracts}};const Wd=1;({...z,contracts:{...z.contracts,disputeGameFactory:Wd+"",portal:Wd+"",l1StandardBridge:Wd+""}});const Vd=11155111;({...z,contracts:{...z.contracts,portal:Vd+"",l1StandardBridge:Vd+"",disputeGameFactory:Vd+""}});const Yc=1;({...z,contracts:{...z.contracts,disputeGameFactory:Yc+"",l2OutputOracle:Yc+"",portal:Yc+"",l1StandardBridge:Yc+""}});const Jc=11155111;({...z,contracts:{...z.contracts,disputeGameFactory:Jc+"",l2OutputOracle:Jc+"",portal:Jc+"",l1StandardBridge:Jc+""}});const Kd=1;({...z,contracts:{...z.contracts,l2OutputOracle:Kd+"",portal:Kd+"",l1StandardBridge:Kd+""}});const Gd=11155111;({...z,contracts:{...z.contracts,l2OutputOracle:Gd+"",portal:Gd+"",l1StandardBridge:Gd+""}});const NN=5;({...z,contracts:{...z.contracts,portal:NN+""}});function Un(t){return{formatters:void 0,fees:void 0,serializers:void 0,...t}}const Xg=Un({id:"5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",name:"Solana",network:"solana-mainnet",nativeCurrency:{name:"Solana",symbol:"SOL",decimals:9},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},blockExplorers:{default:{name:"Solscan",url:"https://solscan.io"}},testnet:!1,chainNamespace:"solana",caipNetworkId:"solana:5eykt4UsFv8P8NJdTREpY1vzqKqZKvdp",deprecatedCaipNetworkId:"solana:4sGjMW1sUnHzSxGspuhpqLDx6wiyjNtZ"}),Qg=Un({id:"EtWTRABZaYq6iMfeYKouRu166VU2xqa1",name:"Solana Devnet",network:"solana-devnet",nativeCurrency:{name:"Solana",symbol:"SOL",decimals:9},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},blockExplorers:{default:{name:"Solscan",url:"https://solscan.io"}},testnet:!0,chainNamespace:"solana",caipNetworkId:"solana:EtWTRABZaYq6iMfeYKouRu166VU2xqa1",deprecatedCaipNetworkId:"solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K"});Un({id:"4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z",name:"Solana Testnet",network:"solana-testnet",nativeCurrency:{name:"Solana",symbol:"SOL",decimals:9},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},blockExplorers:{default:{name:"Solscan",url:"https://solscan.io"}},testnet:!0,chainNamespace:"solana",caipNetworkId:"solana:4uhcVJyU9pJkvQyS88uRDiswHXSCkY3z"}),Un({id:"000000000019d6689c085ae165831e93",caipNetworkId:"bip122:000000000019d6689c085ae165831e93",chainNamespace:"bip122",name:"Bitcoin",nativeCurrency:{name:"Bitcoin",symbol:"BTC",decimals:8},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}}}),Un({id:"000000000933ea01ad0ee984209779ba",caipNetworkId:"bip122:000000000933ea01ad0ee984209779ba",chainNamespace:"bip122",name:"Bitcoin Testnet",nativeCurrency:{name:"Bitcoin",symbol:"BTC",decimals:8},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}},testnet:!0});const SN={solana:["solana_signMessage","solana_signTransaction","solana_requestAccounts","solana_getAccounts","solana_signAllTransactions","solana_signAndSendTransaction"],eip155:["eth_accounts","eth_requestAccounts","eth_sendRawTransaction","eth_sign","eth_signTransaction","eth_signTypedData","eth_signTypedData_v3","eth_signTypedData_v4","eth_sendTransaction","personal_sign","wallet_switchEthereumChain","wallet_addEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode","wallet_getCallsStatus","wallet_showCallsStatus","wallet_sendCalls","wallet_getCapabilities","wallet_grantPermissions","wallet_revokePermissions","wallet_getAssets"],bip122:["sendTransfer","signMessage","signPsbt","getAccountAddresses"]},P2={getMethodsByChainNamespace(t){return SN[t]||[]},createDefaultNamespace(t){return{methods:this.getMethodsByChainNamespace(t),events:["accountsChanged","chainChanged"],chains:[],rpcMap:{}}},applyNamespaceOverrides(t,e){if(!e)return{...t};const i={...t},r=new Set;if(e.methods&&Object.keys(e.methods).forEach(s=>r.add(s)),e.chains&&Object.keys(e.chains).forEach(s=>r.add(s)),e.events&&Object.keys(e.events).forEach(s=>r.add(s)),e.rpcMap&&Object.keys(e.rpcMap).forEach(s=>{const[n]=s.split(":");n&&r.add(n)}),r.forEach(s=>{i[s]||(i[s]=this.createDefaultNamespace(s))}),e.methods&&Object.entries(e.methods).forEach(([s,n])=>{i[s]&&(i[s].methods=n)}),e.chains&&Object.entries(e.chains).forEach(([s,n])=>{i[s]&&(i[s].chains=n)}),e.events&&Object.entries(e.events).forEach(([s,n])=>{i[s]&&(i[s].events=n)}),e.rpcMap){const s=new Set;Object.entries(e.rpcMap).forEach(([n,o])=>{const[a,c]=n.split(":");!a||!c||!i[a]||(i[a].rpcMap||(i[a].rpcMap={}),s.has(a)||(i[a].rpcMap={},s.add(a)),i[a].rpcMap[c]=o)})}return i},createNamespaces(t,e){const i=t.reduce((r,s)=>{const{id:n,chainNamespace:o,rpcUrls:a}=s,c=a.default.http[0];r[o]||(r[o]=this.createDefaultNamespace(o));const l=`${o}:${n}`,u=r[o];switch(u.chains.push(l),l){case Xg.caipNetworkId:u.chains.push(Xg.deprecatedCaipNetworkId);break;case Qg.caipNetworkId:u.chains.push(Qg.deprecatedCaipNetworkId);break}return u!=null&&u.rpcMap&&c&&(u.rpcMap[n]=c),r},{});return this.applyNamespaceOverrides(i,e)},resolveReownName:async t=>{var i;const e=await w2.resolveName(t);return((i=(Object.values(e==null?void 0:e.addresses)||[])[0])==null?void 0:i.address)||!1},getChainsFromNamespaces(t={}){return Object.values(t).flatMap(e=>{const i=e.chains||[],r=e.accounts.map(s=>{const[n,o]=s.split(":");return`${n}:${o}`});return Array.from(new Set([...i,...r]))})},isSessionEventData(t){return typeof t=="object"&&t!==null&&"id"in t&&"topic"in t&&"params"in t&&typeof t.params=="object"&&t.params!==null&&"chainId"in t.params&&"event"in t.params&&typeof t.params.event=="object"&&t.params.event!==null}};class O2{constructor({provider:e,namespace:i}){this.id=re.CONNECTOR_ID.WALLET_CONNECT,this.name=Zl.ConnectorNamesMap[re.CONNECTOR_ID.WALLET_CONNECT],this.type="WALLET_CONNECT",this.imageId=Zl.ConnectorImageIds[re.CONNECTOR_ID.WALLET_CONNECT],this.getCaipNetworks=C.getCaipNetworks.bind(C),this.caipNetworks=this.getCaipNetworks(),this.provider=e,this.chain=i}get chains(){return this.getCaipNetworks()}async connectWalletConnect(){if(!await this.authenticate()){const e=this.getCaipNetworks(),i=j.state.universalProviderConfigOverride,r=P2.createNamespaces(e,i);await this.provider.connect({optionalNamespaces:r})}return{clientId:await this.provider.client.core.crypto.getClientId(),session:this.provider.session}}async disconnect(){await this.provider.disconnect()}async authenticate(){const e=this.chains.map(i=>i.caipNetworkId);return qr.universalProviderAuthenticate({universalProvider:this.provider,chains:e,methods:$N})}}const $N=["eth_accounts","eth_requestAccounts","eth_sendRawTransaction","eth_sign","eth_signTransaction","eth_signTypedData","eth_signTypedData_v3","eth_signTypedData_v4","eth_sendTransaction","personal_sign","wallet_switchEthereumChain","wallet_addEthereumChain","wallet_getPermissions","wallet_requestPermissions","wallet_registerOnboarding","wallet_watchAsset","wallet_scanQRCode","wallet_getCallsStatus","wallet_sendCalls","wallet_getCapabilities","wallet_grantPermissions","wallet_revokePermissions","wallet_getAssets"];class kN{constructor(e){this.availableConnectors=[],this.eventListeners=new Map,this.getCaipNetworks=i=>C.getCaipNetworks(i),e&&this.construct(e)}construct(e){this.projectId=e.projectId,this.namespace=e.namespace,this.adapterType=e.adapterType}get connectors(){return this.availableConnectors}get networks(){return this.getCaipNetworks(this.namespace)}setAuthProvider(e){this.addConnector({id:re.CONNECTOR_ID.AUTH,type:"AUTH",name:re.CONNECTOR_NAMES.AUTH,provider:e,imageId:Zl.ConnectorImageIds[re.CONNECTOR_ID.AUTH],chain:this.namespace,chains:[]})}addConnector(...e){const i=new Set;this.availableConnectors=[...e,...this.availableConnectors].filter(r=>i.has(r.id)?!1:(i.add(r.id),!0)),this.emit("connectors",this.availableConnectors)}setStatus(e,i){ae.setStatus(e,i)}on(e,i){var r;this.eventListeners.has(e)||this.eventListeners.set(e,new Set),(r=this.eventListeners.get(e))==null||r.add(i)}off(e,i){const r=this.eventListeners.get(e);r&&r.delete(i)}removeAllEventListeners(){this.eventListeners.forEach(e=>{e.clear()})}emit(e,i){const r=this.eventListeners.get(e);r&&r.forEach(s=>s(i))}async connectWalletConnect(e){return{clientId:(await this.getWalletConnectConnector().connectWalletConnect()).clientId}}async switchNetwork(e){var n;const{caipNetwork:i,providerType:r}=e;if(!e.provider)return;const s="provider"in e.provider?e.provider.provider:e.provider;if(r==="WALLET_CONNECT"){s.setDefaultChain(i.caipNetworkId);return}if(s&&r==="AUTH"){const o=s,a=(n=ae.state.preferredAccountTypes)==null?void 0:n[i.chainNamespace];await o.switchNetwork(i.caipNetworkId);const c=await o.getUser({chainId:i.caipNetworkId,preferredAccountType:a});this.emit("switchNetwork",c)}}getWalletConnectConnector(){const e=this.connectors.find(i=>i instanceof O2);if(!e)throw new Error("WalletConnectConnector not found");return e}}class PN extends kN{setUniversalProvider(e){this.addConnector(new O2({provider:e,caipNetworks:this.getCaipNetworks(),namespace:this.namespace}))}async connect(e){return Promise.resolve({id:"WALLET_CONNECT",type:"WALLET_CONNECT",chainId:Number(e.chainId),provider:this.provider,address:""})}async disconnect(){try{await this.getWalletConnectConnector().disconnect()}catch(e){console.warn("UniversalAdapter:disconnect - error",e)}}async getAccounts({namespace:e}){var r,s,n,o,a;const i=((a=(o=(n=(s=(r=this.provider)==null?void 0:r.session)==null?void 0:s.namespaces)==null?void 0:n[e])==null?void 0:o.accounts)==null?void 0:a.map(c=>{const[,,l]=c.split(":");return l}).filter((c,l,u)=>u.indexOf(c)===l))||[];return Promise.resolve({accounts:i.map(c=>q.createAccount(e,c,e==="bip122"?"payment":"eoa"))})}async syncConnectors(){return Promise.resolve()}async getBalance(e){var r,s,n,o,a;if(!(e.caipNetwork&&nt.BALANCE_SUPPORTED_CHAINS.includes((r=e.caipNetwork)==null?void 0:r.chainNamespace))||(s=e.caipNetwork)!=null&&s.testnet)return{balance:"0.00",symbol:((n=e.caipNetwork)==null?void 0:n.nativeCurrency.symbol)||""};if(ae.state.balanceLoading&&e.chainId===((o=C.state.activeCaipNetwork)==null?void 0:o.id))return{balance:ae.state.balance||"0.00",symbol:ae.state.balanceSymbol||""};const i=(await ae.fetchTokenBalance()).find(c=>{var l,u;return c.chainId===`${(l=e.caipNetwork)==null?void 0:l.chainNamespace}:${e.chainId}`&&c.symbol===((u=e.caipNetwork)==null?void 0:u.nativeCurrency.symbol)});return{balance:(i==null?void 0:i.quantity.numeric)||"0.00",symbol:(i==null?void 0:i.symbol)||((a=e.caipNetwork)==null?void 0:a.nativeCurrency.symbol)||""}}async signMessage(e){var o,a,c;const{provider:i,message:r,address:s}=e;if(!i)throw new Error("UniversalAdapter:signMessage - provider is undefined");let n="";return((o=C.state.activeCaipNetwork)==null?void 0:o.chainNamespace)===re.CHAIN.SOLANA?n=(await i.request({method:"solana_signMessage",params:{message:uN.encode(new TextEncoder().encode(r)),pubkey:s}},(a=C.state.activeCaipNetwork)==null?void 0:a.caipNetworkId)).signature:n=await i.request({method:"personal_sign",params:[r,s]},(c=C.state.activeCaipNetwork)==null?void 0:c.caipNetworkId),{signature:n}}async estimateGas(){return Promise.resolve({gas:BigInt(0)})}async getProfile(){return Promise.resolve({profileImage:"",profileName:""})}async sendTransaction(){return Promise.resolve({hash:""})}walletGetAssets(e){return Promise.resolve({})}async writeContract(){return Promise.resolve({hash:""})}async getEnsAddress(){return Promise.resolve({address:!1})}parseUnits(){return 0n}formatUnits(){return"0"}async getCapabilities(){return Promise.resolve({})}async grantPermissions(){return Promise.resolve({})}async revokePermissions(){return Promise.resolve("0x")}async syncConnection(){return Promise.resolve({id:"WALLET_CONNECT",type:"WALLET_CONNECT",chainId:1,provider:this.provider,address:""})}async switchNetwork(e){var s,n,o,a,c,l;const{caipNetwork:i}=e,r=this.getWalletConnectConnector();if(i.chainNamespace===re.CHAIN.EVM)try{await((s=r.provider)==null?void 0:s.request({method:"wallet_switchEthereumChain",params:[{chainId:he(i.id)}]}))}catch(u){if(u.code===Bc.ERROR_CODE_UNRECOGNIZED_CHAIN_ID||u.code===Bc.ERROR_INVALID_CHAIN_ID||u.code===Bc.ERROR_CODE_DEFAULT||((o=(n=u==null?void 0:u.data)==null?void 0:n.originalError)==null?void 0:o.code)===Bc.ERROR_CODE_UNRECOGNIZED_CHAIN_ID)try{await((l=r.provider)==null?void 0:l.request({method:"wallet_addEthereumChain",params:[{chainId:he(i.id),rpcUrls:[(a=i==null?void 0:i.rpcUrls.chainDefault)==null?void 0:a.http],chainName:i.name,nativeCurrency:i.nativeCurrency,blockExplorerUrls:[(c=i.blockExplorers)==null?void 0:c.default.url]}]}))}catch{throw new Error("Chain is not supported")}}r.provider.setDefaultChain(i.caipNetworkId)}getWalletConnectProvider(){var e;return(e=this.connectors.find(i=>i.type==="WALLET_CONNECT"))==null?void 0:e.provider}}class ON{constructor(e){this.chainNamespaces=[],this.reportedAlertErrors={},this.getCaipNetwork=(i,r)=>{var s,n,o,a;if(i){const c=(n=(s=C.getNetworkData(i))==null?void 0:s.requestedCaipNetworks)==null?void 0:n.find(u=>u.id===r);return c||((o=C.getNetworkData(i))==null?void 0:o.caipNetwork)||((a=C.getRequestedCaipNetworks(i).filter(u=>u.chainNamespace===i))==null?void 0:a[0])}return C.state.activeCaipNetwork||this.defaultCaipNetwork},this.getCaipNetworkId=()=>{const i=this.getCaipNetwork();if(i)return i.id},this.getCaipNetworks=i=>C.getCaipNetworks(i),this.getActiveChainNamespace=()=>C.state.activeChain,this.setRequestedCaipNetworks=(i,r)=>{C.setRequestedCaipNetworks(i,r)},this.getApprovedCaipNetworkIds=()=>C.getAllApprovedCaipNetworkIds(),this.getCaipAddress=i=>C.state.activeChain===i||!i?C.state.activeCaipAddress:C.getAccountProp("caipAddress",i),this.setClientId=i=>{de.setClientId(i)},this.getProvider=i=>Ge.getProvider(i),this.getProviderType=i=>Ge.getProviderId(i),this.getPreferredAccountType=i=>{var r;return(r=ae.state.preferredAccountTypes)==null?void 0:r[i]},this.setCaipAddress=(i,r)=>{ae.setCaipAddress(i,r)},this.setBalance=(i,r,s)=>{ae.setBalance(i,r,s)},this.setProfileName=(i,r)=>{ae.setProfileName(i,r)},this.setProfileImage=(i,r)=>{ae.setProfileImage(i,r)},this.setUser=(i,r)=>{ae.setUser(i,r),j.state.enableEmbedded&&Ie.close()},this.resetAccount=i=>{ae.resetAccount(i)},this.setCaipNetwork=i=>{C.setActiveCaipNetwork(i)},this.setCaipNetworkOfNamespace=(i,r)=>{C.setChainNetworkData(r,{caipNetwork:i})},this.setAllAccounts=(i,r)=>{ae.setAllAccounts(i,r),j.setHasMultipleAddresses((i==null?void 0:i.length)>1)},this.setStatus=(i,r)=>{ae.setStatus(i,r),X.isConnected()?ie.setConnectionStatus("connected"):ie.setConnectionStatus("disconnected")},this.getAddressByChainNamespace=i=>C.getAccountProp("address",i),this.setConnectors=i=>{const r=[...X.state.allConnectors,...i];X.setConnectors(r)},this.fetchIdentity=i=>de.fetchIdentity(i),this.getReownName=i=>w2.getNamesForAddress(i),this.getConnectors=()=>X.getConnectors(),this.getConnectorImage=i=>ot.getConnectorImage(i),this.setConnectedWalletInfo=(i,r)=>{const s=Ge.getProviderId(r),n=i?{...i,type:s}:void 0;ae.setConnectedWalletInfo(n,r)},this.getIsConnectedState=()=>!!C.state.activeCaipAddress,this.addAddressLabel=(i,r,s)=>{ae.addAddressLabel(i,r,s)},this.removeAddressLabel=(i,r)=>{ae.removeAddressLabel(i,r)},this.getAddress=i=>C.state.activeChain===i||!i?ae.state.address:C.getAccountProp("address",i),this.setApprovedCaipNetworksData=i=>C.setApprovedCaipNetworksData(i),this.resetNetwork=i=>{C.resetNetwork(i)},this.addConnector=i=>{X.addConnector(i)},this.resetWcConnection=()=>{ne.resetWcConnection()},this.setAddressExplorerUrl=(i,r)=>{ae.setAddressExplorerUrl(i,r)},this.setSmartAccountDeployed=(i,r)=>{ae.setSmartAccountDeployed(i,r)},this.setSmartAccountEnabledNetworks=(i,r)=>{C.setSmartAccountEnabledNetworks(i,r)},this.setPreferredAccountType=(i,r)=>{ae.setPreferredAccountType(i,r)},this.setEIP6963Enabled=i=>{j.setEIP6963Enabled(i)},this.handleUnsafeRPCRequest=()=>{if(this.isOpen()){if(this.isTransactionStackEmpty())return;this.redirect("ApproveTransaction")}else this.open({view:"ApproveTransaction"})},this.options=e,this.version=e.sdkVersion,this.caipNetworks=this.extendCaipNetworks(e),this.chainNamespaces=this.getChainNamespacesSet(e.adapters,this.caipNetworks),this.defaultCaipNetwork=this.extendDefaultCaipNetwork(e),this.chainAdapters=this.createAdapters(e.adapters),this.initialize(e)}getChainNamespacesSet(e,i){const r=e==null?void 0:e.map(n=>n.namespace).filter(n=>!!n);if(r!=null&&r.length)return[...new Set(r)];const s=i==null?void 0:i.map(n=>n.chainNamespace);return[...new Set(s)]}async initialize(e){this.initControllers(e),await this.initChainAdapters(),await this.injectModalUi(),this.sendInitializeEvent(e),vr.set({initialized:!0}),await this.syncExistingConnection()}sendInitializeEvent(e){var r;const{...i}=e;delete i.adapters,delete i.universalProvider,me.sendEvent({type:"track",event:"INITIALIZE",properties:{...i,networks:e.networks.map(s=>s.id),siweConfig:{options:((r=e.siweConfig)==null?void 0:r.options)||{}}}})}initControllers(e){this.initializeOptionsController(e),this.initializeChainController(e),this.initializeThemeController(e),this.initializeConnectionController(e),this.initializeConnectorController()}initializeThemeController(e){e.themeMode&&st.setThemeMode(e.themeMode),e.themeVariables&&st.setThemeVariables(e.themeVariables)}initializeChainController(e){if(!this.connectionControllerClient||!this.networkControllerClient)throw new Error("ConnectionControllerClient and NetworkControllerClient must be set");C.initialize(e.adapters??[],this.caipNetworks,{connectionControllerClient:this.connectionControllerClient,networkControllerClient:this.networkControllerClient});const i=this.getDefaultNetwork();i&&C.setActiveCaipNetwork(i)}initializeConnectionController(e){ne.setWcBasic(e.basic??!1)}initializeConnectorController(){X.initialize(this.chainNamespaces)}initializeOptionsController(e){var n;j.setDebug(e.debug!==!1),j.setEnableWalletConnect(e.enableWalletConnect!==!1),j.setEnableWalletGuide(e.enableWalletGuide!==!1),j.setEnableWallets(e.enableWallets!==!1),j.setEIP6963Enabled(e.enableEIP6963!==!1),j.setEnableNetworkSwitch(e.enableNetworkSwitch!==!1),j.setEnableAuthLogger(e.enableAuthLogger!==!1),j.setCustomRpcUrls(e.customRpcUrls),j.setSdkVersion(e.sdkVersion),j.setProjectId(e.projectId),j.setEnableEmbedded(e.enableEmbedded),j.setAllWallets(e.allWallets),j.setIncludeWalletIds(e.includeWalletIds),j.setExcludeWalletIds(e.excludeWalletIds),j.setFeaturedWalletIds(e.featuredWalletIds),j.setTokens(e.tokens),j.setTermsConditionsUrl(e.termsConditionsUrl),j.setPrivacyPolicyUrl(e.privacyPolicyUrl),j.setCustomWallets(e.customWallets),j.setFeatures(e.features),j.setAllowUnsupportedChain(e.allowUnsupportedChain),j.setUniversalProviderConfigOverride(e.universalProviderConfigOverride),j.setDefaultAccountTypes(e.defaultAccountTypes);const i=ie.getPreferredAccountTypes(),r={...j.state.defaultAccountTypes,...i};ae.setPreferredAccountTypes(r);const s=this.getDefaultMetaData();if(!e.metadata&&s&&(e.metadata=s),j.setMetadata(e.metadata),j.setDisableAppend(e.disableAppend),j.setEnableEmbedded(e.enableEmbedded),j.setSIWX(e.siwx),!e.projectId){Hr.open(Lc.ALERT_ERRORS.PROJECT_ID_NOT_CONFIGURED,"error");return}if((n=e.adapters)!=null&&n.find(o=>o.namespace===re.CHAIN.EVM)&&e.siweConfig){if(e.siwx)throw new Error("Cannot set both `siweConfig` and `siwx` options");j.setSIWX(e.siweConfig.mapToSIWX())}}getDefaultMetaData(){var e,i,r,s;return typeof window<"u"&&typeof document<"u"?{name:((i=(e=document.getElementsByTagName("title"))==null?void 0:e[0])==null?void 0:i.textContent)||"",description:((r=document.querySelector('meta[property="og:description"]'))==null?void 0:r.content)||"",url:window.location.origin,icons:[((s=document.querySelector('link[rel~="icon"]'))==null?void 0:s.href)||""]}:null}setUnsupportedNetwork(e){const i=this.getActiveChainNamespace();if(i){const r=_n.getUnsupportedNetwork(`${i}:${e}`);C.setActiveCaipNetwork(r)}}getDefaultNetwork(){return _n.getCaipNetworkFromStorage(this.defaultCaipNetwork)}extendCaipNetwork(e,i){return _n.extendCaipNetwork(e,{customNetworkImageUrls:i.chainImages,projectId:i.projectId})}extendCaipNetworks(e){return _n.extendCaipNetworks(e.networks,{customNetworkImageUrls:e.chainImages,customRpcUrls:e.customRpcUrls,projectId:e.projectId})}extendDefaultCaipNetwork(e){const i=e.networks.find(r=>{var s;return r.id===((s=e.defaultNetwork)==null?void 0:s.id)});return i?_n.extendCaipNetwork(i,{customNetworkImageUrls:e.chainImages,customRpcUrls:e.customRpcUrls,projectId:e.projectId}):void 0}createClients(){this.connectionControllerClient={connectWalletConnect:async()=>{var n;const e=C.state.activeChain,i=this.getAdapter(e),r=(n=this.getCaipNetwork(e))==null?void 0:n.id;if(!i)throw new Error("Adapter not found");const s=await i.connectWalletConnect(r);this.close(),this.setClientId((s==null?void 0:s.clientId)||null),ie.setConnectedNamespaces([...C.state.chains.keys()]),this.chainNamespaces.forEach(o=>{X.setConnectorId(rt.CONNECTOR_TYPE_WALLET_CONNECT,o)}),await this.syncWalletConnectAccount()},connectExternal:async({id:e,info:i,type:r,provider:s,chain:n,caipNetwork:o})=>{var p,g,f,w,m,y;const a=C.state.activeChain,c=n||a,l=this.getAdapter(c);if(n&&n!==a&&!o){const b=this.getCaipNetworks().find(v=>v.chainNamespace===n);b&&this.setCaipNetwork(b)}if(!l)throw new Error("Adapter not found");const u=this.getCaipNetwork(c),d=await l.connect({id:e,info:i,type:r,provider:s,chainId:(o==null?void 0:o.id)||(u==null?void 0:u.id),rpcUrl:((f=(g=(p=o==null?void 0:o.rpcUrls)==null?void 0:p.default)==null?void 0:g.http)==null?void 0:f[0])||((y=(m=(w=u==null?void 0:u.rpcUrls)==null?void 0:w.default)==null?void 0:m.http)==null?void 0:y[0])});if(!d)return;ie.addConnectedNamespace(c),this.syncProvider({...d,chainNamespace:c});const{accounts:h}=await l.getAccounts({namespace:c,id:e});this.setAllAccounts(h,c),this.setStatus("connected",c)},reconnectExternal:async({id:e,info:i,type:r,provider:s})=>{var a;const n=C.state.activeChain,o=this.getAdapter(n);o!=null&&o.reconnect&&(await(o==null?void 0:o.reconnect({id:e,info:i,type:r,provider:s,chainId:(a=this.getCaipNetwork())==null?void 0:a.id})),ie.addConnectedNamespace(n))},disconnect:async e=>{const i=e||C.state.activeChain,r=this.getAdapter(i),s=Ge.getProvider(i),n=Ge.getProviderId(i);await(r==null?void 0:r.disconnect({provider:s,providerType:n})),ie.removeConnectedNamespace(i),Ge.resetChain(i),this.setUser(void 0,i),this.setStatus("disconnected",i)},checkInstalled:e=>e?e.some(i=>{var r;return!!((r=window.ethereum)!=null&&r[String(i)])}):!!window.ethereum,signMessage:async e=>{var i,r;return((r=await((i=this.getAdapter(C.state.activeChain))==null?void 0:i.signMessage({message:e,address:ae.state.address,provider:Ge.getProvider(C.state.activeChain)})))==null?void 0:r.signature)||""},sendTransaction:async e=>{var i;if(e.chainNamespace===re.CHAIN.EVM){const r=this.getAdapter(C.state.activeChain),s=Ge.getProvider(C.state.activeChain);return((i=await(r==null?void 0:r.sendTransaction({...e,caipNetwork:this.getCaipNetwork(),provider:s})))==null?void 0:i.hash)||""}return""},estimateGas:async e=>{var i;if(e.chainNamespace===re.CHAIN.EVM){const r=this.getAdapter(C.state.activeChain),s=Ge.getProvider(C.state.activeChain),n=this.getCaipNetwork();if(!n)throw new Error("CaipNetwork is undefined");return((i=await(r==null?void 0:r.estimateGas({...e,provider:s,caipNetwork:n})))==null?void 0:i.gas)||0n}return 0n},getEnsAvatar:async()=>{var e,i,r;return((r=await((i=this.getAdapter(C.state.activeChain))==null?void 0:i.getProfile({address:ae.state.address,chainId:Number((e=this.getCaipNetwork())==null?void 0:e.id)})))==null?void 0:r.profileImage)||!1},getEnsAddress:async e=>{var s;const i=this.getAdapter(C.state.activeChain),r=this.getCaipNetwork();return r&&((s=await(i==null?void 0:i.getEnsAddress({name:e,caipNetwork:r})))==null?void 0:s.address)||!1},writeContract:async e=>{var o;const i=this.getAdapter(C.state.activeChain),r=this.getCaipNetwork(),s=this.getCaipAddress(),n=Ge.getProvider(C.state.activeChain);if(!r||!s)throw new Error("CaipNetwork or CaipAddress is undefined");return(o=await(i==null?void 0:i.writeContract({...e,caipNetwork:r,provider:n,caipAddress:s})))==null?void 0:o.hash},parseUnits:(e,i)=>{var r;return((r=this.getAdapter(C.state.activeChain))==null?void 0:r.parseUnits({value:e,decimals:i}))??0n},formatUnits:(e,i)=>{var r;return((r=this.getAdapter(C.state.activeChain))==null?void 0:r.formatUnits({value:e,decimals:i}))??"0"},getCapabilities:async e=>{var i;return await((i=this.getAdapter(C.state.activeChain))==null?void 0:i.getCapabilities(e))},grantPermissions:async e=>{var i;return await((i=this.getAdapter(C.state.activeChain))==null?void 0:i.grantPermissions(e))},revokePermissions:async e=>{const i=this.getAdapter(C.state.activeChain);return i!=null&&i.revokePermissions?await i.revokePermissions(e):"0x"},walletGetAssets:async e=>{var i;return await((i=this.getAdapter(C.state.activeChain))==null?void 0:i.walletGetAssets(e))??{}}},this.networkControllerClient={switchCaipNetwork:async e=>await this.switchCaipNetwork(e),getApprovedCaipNetworksData:async()=>this.getApprovedCaipNetworksData()},ne.setClient(this.connectionControllerClient)}getApprovedCaipNetworksData(){var e,i,r,s,n;if(Ge.getProviderId(C.state.activeChain)===rt.CONNECTOR_TYPE_WALLET_CONNECT){const o=(i=(e=this.universalProvider)==null?void 0:e.session)==null?void 0:i.namespaces;return{supportsAllNetworks:((n=(s=(r=this.universalProvider)==null?void 0:r.session)==null?void 0:s.peer)==null?void 0:n.metadata.name)==="MetaMask Wallet",approvedCaipNetworkIds:this.getChainsFromNamespaces(o)}}return{supportsAllNetworks:!0,approvedCaipNetworkIds:[]}}async switchCaipNetwork(e){var r;if(!e)return;const i=e.chainNamespace;if(this.getAddressByChainNamespace(e.chainNamespace)){const s=Ge.getProvider(i),n=Ge.getProviderId(i);if(e.chainNamespace===C.state.activeChain)await((r=this.getAdapter(i))==null?void 0:r.switchNetwork({caipNetwork:e,provider:s,providerType:n}));else if(this.setCaipNetwork(e),n===rt.CONNECTOR_TYPE_WALLET_CONNECT)this.syncWalletConnectAccount();else{const o=this.getAddressByChainNamespace(i);o&&this.syncAccount({address:o,chainId:e.id,chainNamespace:i})}}else this.setCaipNetwork(e)}getChainsFromNamespaces(e={}){return Object.values(e).flatMap(i=>{const r=i.chains||[],s=i.accounts.map(n=>{const{chainId:o,chainNamespace:a}=Sr.parseCaipAddress(n);return`${a}:${o}`});return Array.from(new Set([...r,...s]))})}createAdapters(e){return this.createClients(),this.chainNamespaces.reduce((i,r)=>{var n;const s=e==null?void 0:e.find(o=>o.namespace===r);return s?(s.construct({namespace:r,projectId:(n=this.options)==null?void 0:n.projectId,networks:this.getCaipNetworks()}),i[r]=s):i[r]=new PN({namespace:r,networks:this.getCaipNetworks()}),i},{})}async initChainAdapter(e){var i;this.onConnectors(e),this.listenAdapter(e),(i=this.chainAdapters)==null||i[e].syncConnectors(this.options,this),await this.createUniversalProviderForAdapter(e)}async initChainAdapters(){await Promise.all(this.chainNamespaces.map(async e=>{await this.initChainAdapter(e)}))}onConnectors(e){var i;(i=this.getAdapter(e))==null||i.on("connectors",this.setConnectors.bind(this))}listenAdapter(e){const i=this.getAdapter(e);if(!i)return;const r=ie.getConnectionStatus();r==="connected"?this.setStatus("connecting",e):r==="disconnected"?(ie.clearAddressCache(),this.setStatus(r,e)):this.setStatus(r,e),i.on("switchNetwork",({address:s,chainId:n})=>{const o=this.getCaipNetworks().find(l=>l.id===n||l.caipNetworkId===n),a=C.state.activeChain===e,c=C.getAccountProp("address",e);if(o){const l=a&&s?s:c;l&&this.syncAccount({address:l,chainId:o.id,chainNamespace:e})}else this.setUnsupportedNetwork(n)}),i.on("disconnect",this.disconnect.bind(this,e)),i.on("pendingTransactions",()=>{const s=ae.state.address,n=C.state.activeCaipNetwork;!s||!(n!=null&&n.id)||this.updateNativeBalance(s,n.id,n.chainNamespace)}),i.on("accountChanged",({address:s,chainId:n})=>{var a,c;const o=C.state.activeChain===e;o&&n?this.syncAccount({address:s,chainId:n,chainNamespace:e}):o&&((a=C.state.activeCaipNetwork)!=null&&a.id)?this.syncAccount({address:s,chainId:(c=C.state.activeCaipNetwork)==null?void 0:c.id,chainNamespace:e}):this.syncAccountInfo(s,n,e)})}async createUniversalProviderForAdapter(e){var i,r,s;await this.getUniversalProvider(),this.universalProvider&&((s=(r=(i=this.chainAdapters)==null?void 0:i[e])==null?void 0:r.setUniversalProvider)==null||s.call(r,this.universalProvider))}async syncExistingConnection(){await Promise.allSettled(this.chainNamespaces.map(e=>this.syncNamespaceConnection(e)))}async syncNamespaceConnection(e){try{const i=X.getConnectorId(e);switch(this.setStatus("connecting",e),i){case re.CONNECTOR_ID.WALLET_CONNECT:await this.syncWalletConnectAccount();break;case re.CONNECTOR_ID.AUTH:break;default:await this.syncAdapterConnection(e)}}catch(i){console.warn("AppKit couldn't sync existing connection",i),this.setStatus("disconnected",e)}}async syncAdapterConnection(e){var o,a,c;const i=this.getAdapter(e),r=X.getConnectorId(e),s=this.getCaipNetwork(e),n=X.getConnectors(e).find(l=>l.id===r);try{if(!i||!n)throw new Error(`Adapter or connector not found for namespace ${e}`);if(!(s!=null&&s.id))throw new Error("CaipNetwork not found");const l=await(i==null?void 0:i.syncConnection({namespace:e,id:n.id,chainId:s.id,rpcUrl:(c=(a=(o=s==null?void 0:s.rpcUrls)==null?void 0:o.default)==null?void 0:a.http)==null?void 0:c[0]}));if(l){const u=await(i==null?void 0:i.getAccounts({namespace:e,id:n.id}));u&&u.accounts.length>0?this.setAllAccounts(u.accounts,e):this.setAllAccounts([q.createAccount(e,l.address,"eoa")],e),this.syncProvider({...l,chainNamespace:e}),await this.syncAccount({...l,chainNamespace:e}),this.setStatus("connected",e)}else this.setStatus("disconnected",e)}catch{this.setStatus("disconnected",e)}}async syncWalletConnectAccount(){const e=this.chainNamespaces.map(async i=>{var a,c,l,u,d;const r=this.getAdapter(i),s=((u=(l=(c=(a=this.universalProvider)==null?void 0:a.session)==null?void 0:c.namespaces)==null?void 0:l[i])==null?void 0:u.accounts)||[],n=(d=C.state.activeCaipNetwork)==null?void 0:d.id,o=s.find(h=>{const{chainId:p}=Sr.parseCaipAddress(h);return p===(n==null?void 0:n.toString())})||s[0];if(o){const h=Sr.validateCaipAddress(o),{chainId:p,address:g}=Sr.parseCaipAddress(h);if(Ge.setProviderId(i,rt.CONNECTOR_TYPE_WALLET_CONNECT),this.caipNetworks&&C.state.activeCaipNetwork&&(r==null?void 0:r.namespace)!==re.CHAIN.EVM){const f=r==null?void 0:r.getWalletConnectProvider({caipNetworks:this.getCaipNetworks(),provider:this.universalProvider,activeCaipNetwork:C.state.activeCaipNetwork});Ge.setProvider(i,f)}else Ge.setProvider(i,this.universalProvider);X.setConnectorId(re.CONNECTOR_ID.WALLET_CONNECT,i),ie.addConnectedNamespace(i),this.syncWalletConnectAccounts(i),await this.syncAccount({address:g,chainId:p,chainNamespace:i})}else this.setStatus("disconnected",i);await C.setApprovedCaipNetworksData(i)});await Promise.all(e)}syncWalletConnectAccounts(e){var r,s,n,o,a;const i=(a=(o=(n=(s=(r=this.universalProvider)==null?void 0:r.session)==null?void 0:s.namespaces)==null?void 0:n[e])==null?void 0:o.accounts)==null?void 0:a.map(c=>{const{address:l}=Sr.parseCaipAddress(c);return l}).filter((c,l,u)=>u.indexOf(c)===l);i&&this.setAllAccounts(i.map(c=>q.createAccount(e,c,e==="bip122"?"payment":"eoa")),e)}syncProvider({type:e,provider:i,id:r,chainNamespace:s}){Ge.setProviderId(s,e),Ge.setProvider(s,i),X.setConnectorId(r,s)}async syncAccount(e){var d,h;const i=e.chainNamespace===C.state.activeChain,r=C.getCaipNetworkByNamespace(e.chainNamespace,e.chainId),{address:s,chainId:n,chainNamespace:o}=e,{chainId:a}=ie.getActiveNetworkProps(),c=n||a,l=((d=C.state.activeCaipNetwork)==null?void 0:d.name)===re.UNSUPPORTED_NETWORK_NAME,u=C.getNetworkProp("supportsAllNetworks",o);if(this.setStatus("connected",o),!(l&&!u)&&c){let p=this.getCaipNetworks().find(w=>w.id.toString()===c.toString()),g=this.getCaipNetworks().find(w=>w.chainNamespace===o);if(!u&&!p&&!g){const w=this.getApprovedCaipNetworkIds()||[],m=w.find(b=>{var v;return((v=Sr.parseCaipNetworkId(b))==null?void 0:v.chainId)===c.toString()}),y=w.find(b=>{var v;return((v=Sr.parseCaipNetworkId(b))==null?void 0:v.chainNamespace)===o});p=this.getCaipNetworks().find(b=>b.caipNetworkId===m),g=this.getCaipNetworks().find(b=>b.caipNetworkId===y||"deprecatedCaipNetworkId"in b&&b.deprecatedCaipNetworkId===y)}const f=p||g;(f==null?void 0:f.chainNamespace)===C.state.activeChain?j.state.enableNetworkSwitch&&!j.state.allowUnsupportedChain&&((h=C.state.activeCaipNetwork)==null?void 0:h.name)===re.UNSUPPORTED_NETWORK_NAME?C.showUnsupportedChainUI():this.setCaipNetwork(f):i||r&&this.setCaipNetworkOfNamespace(r,o),this.syncConnectedWalletInfo(o),Yp.isLowerCaseMatch(s,ae.state.address)||this.syncAccountInfo(s,f==null?void 0:f.id,o),i?await this.syncBalance({address:s,chainId:f==null?void 0:f.id,chainNamespace:o}):await this.syncBalance({address:s,chainId:r==null?void 0:r.id,chainNamespace:o})}}async syncAccountInfo(e,i,r){const s=this.getCaipAddress(r),n=i||(s==null?void 0:s.split(":")[1]);if(!n)return;const o=`${r}:${n}:${e}`;this.setCaipAddress(o,r),await this.syncIdentity({address:e,chainId:n,chainNamespace:r})}async syncReownName(e,i){try{const r=await this.getReownName(e);if(r[0]){const s=r[0];this.setProfileName(s.name,i)}else this.setProfileName(null,i)}catch{this.setProfileName(null,i)}}syncConnectedWalletInfo(e){var s;const i=X.getConnectorId(e),r=Ge.getProviderId(e);if(r===rt.CONNECTOR_TYPE_ANNOUNCED||r===rt.CONNECTOR_TYPE_INJECTED){if(i){const n=this.getConnectors().find(o=>o.id===i);if(n){const{info:o,name:a,imageUrl:c}=n,l=c||this.getConnectorImage(n);this.setConnectedWalletInfo({name:a,icon:l,...o},e)}}}else if(r===rt.CONNECTOR_TYPE_WALLET_CONNECT){const n=Ge.getProvider(e);n!=null&&n.session&&this.setConnectedWalletInfo({...n.session.peer.metadata,name:n.session.peer.metadata.name,icon:(s=n.session.peer.metadata.icons)==null?void 0:s[0]},e)}else if(i)if(i===re.CONNECTOR_ID.COINBASE){const n=this.getConnectors().find(o=>o.id===re.CONNECTOR_ID.COINBASE);this.setConnectedWalletInfo({name:"Coinbase Wallet",icon:this.getConnectorImage(n)},e)}else this.setConnectedWalletInfo({name:i},e)}async syncBalance(e){!wm.getNetworksByNamespace(this.getCaipNetworks(),e.chainNamespace).find(i=>{var r;return i.id.toString()===((r=e.chainId)==null?void 0:r.toString())})||!e.chainId||await this.updateNativeBalance(e.address,e.chainId,e.chainNamespace)}async updateNativeBalance(e,i,r){const s=this.getAdapter(r),n=C.getCaipNetworkByNamespace(r,i);if(s){const o=await s.getBalance({address:e,chainId:i,caipNetwork:n,tokens:this.options.tokens});this.setBalance(o.balance,o.symbol,r)}}async initializeUniversalAdapter(){var r,s,n,o,a,c,l,u,d,h;const e=D_.createLogger((p,...g)=>{p&&this.handleAlertError(p),console.error(...g)}),i={projectId:(r=this.options)==null?void 0:r.projectId,metadata:{name:(s=this.options)!=null&&s.metadata?(n=this.options)==null?void 0:n.metadata.name:"",description:(o=this.options)!=null&&o.metadata?(a=this.options)==null?void 0:a.metadata.description:"",url:(c=this.options)!=null&&c.metadata?(l=this.options)==null?void 0:l.metadata.url:"",icons:(u=this.options)!=null&&u.metadata?(d=this.options)==null?void 0:d.metadata.icons:[""]},logger:e};j.setManualWCControl(!!((h=this.options)!=null&&h.manualWCControl)),this.universalProvider=this.options.universalProvider??await fu.init(i),this.listenWalletConnect()}listenWalletConnect(){this.universalProvider&&(this.universalProvider.on("display_uri",e=>{ne.setUri(e)}),this.universalProvider.on("connect",ne.finalizeWcConnection),this.universalProvider.on("disconnect",()=>{this.chainNamespaces.forEach(e=>{this.resetAccount(e)}),ne.resetWcConnection()}),this.universalProvider.on("chainChanged",e=>{const i=this.getCaipNetworks().find(s=>s.id==e),r=this.getCaipNetwork();if(!i){this.setUnsupportedNetwork(e);return}(r==null?void 0:r.id)!==(i==null?void 0:i.id)&&this.setCaipNetwork(i)}),this.universalProvider.on("session_event",e=>{if(P2.isSessionEventData(e)){const{name:i,data:r}=e.params.event;i==="accountsChanged"&&Array.isArray(r)&&q.isCaipAddress(r[0])&&this.syncAccount(Sr.parseCaipAddress(r[0]))}}))}createUniversalProvider(){var e;return!this.universalProviderInitPromise&&q.isClient()&&((e=this.options)!=null&&e.projectId)&&(this.universalProviderInitPromise=this.initializeUniversalAdapter()),this.universalProviderInitPromise}async getUniversalProvider(){if(!this.universalProvider)try{await this.createUniversalProvider()}catch(e){me.sendEvent({type:"error",event:"INTERNAL_SDK_ERROR",properties:{errorType:"UniversalProviderInitError",errorMessage:e instanceof Error?e.message:"Unknown",uncaught:!1}}),console.error("AppKit:getUniversalProvider - Cannot create provider",e)}return this.universalProvider}handleAlertError(e){const i=Object.entries(Lc.UniversalProviderErrors).find(([,{message:a}])=>e.message.includes(a)),[r,s]=i??[],{message:n,alertErrorKey:o}=s??{};if(r&&n&&!this.reportedAlertErrors[r]){const a=Lc.ALERT_ERRORS[o];a&&(Hr.open(a,"error"),this.reportedAlertErrors[r]=!0)}}getAdapter(e){var i;if(e)return(i=this.chainAdapters)==null?void 0:i[e]}createAdapter(e){var s;if(!e)return;const i=e.namespace;if(!i)return;this.createClients();const r=e;r.namespace=i,r.construct({namespace:i,projectId:(s=this.options)==null?void 0:s.projectId,networks:this.getCaipNetworks()}),this.chainNamespaces.includes(i)||this.chainNamespaces.push(i),this.chainAdapters&&(this.chainAdapters[i]=r)}async open(e){if(await this.injectModalUi(),e!=null&&e.uri&&ne.setUri(e.uri),e==null?void 0:e.arguments)switch(e==null?void 0:e.view){case"Swap":return Ie.open({...e,data:{swap:e.arguments}})}return Ie.open(e)}async close(){await this.injectModalUi(),Ie.close()}setLoading(e,i){Ie.setLoading(e,i)}async disconnect(e){await ne.disconnect(e)}getError(){return""}getChainId(){var e;return(e=C.state.activeCaipNetwork)==null?void 0:e.id}async switchNetwork(e){const i=this.getCaipNetworks().find(r=>r.id===e.id);if(!i){Hr.open(Lc.ALERT_ERRORS.SWITCH_NETWORK_NOT_FOUND,"error");return}await C.switchActiveNetwork(i)}getWalletProvider(){return C.state.activeChain?Ge.state.providers[C.state.activeChain]:null}getWalletProviderType(){return Ge.getProviderId(C.state.activeChain)}subscribeProviders(e){return Ge.subscribeProviders(e)}getThemeMode(){return st.state.themeMode}getThemeVariables(){return st.state.themeVariables}setThemeMode(e){st.setThemeMode(e),_2(st.state.themeMode)}setTermsConditionsUrl(e){j.setTermsConditionsUrl(e)}setPrivacyPolicyUrl(e){j.setPrivacyPolicyUrl(e)}setThemeVariables(e){st.setThemeVariables(e),nN(st.state.themeVariables)}subscribeTheme(e){return st.subscribe(e)}getWalletInfo(){return ae.state.connectedWalletInfo}getAccount(e){var n;const i=X.getAuthConnector(e),r=C.getAccountData(e),s=C.state.activeChain;if(r)return{allAccounts:r.allAccounts,caipAddress:r.caipAddress,address:q.getPlainAddress(r.caipAddress),isConnected:!!r.caipAddress,status:r.status,embeddedWalletInfo:i?{user:r.user?{...r.user,username:ie.getConnectedSocialUsername()}:void 0,authProvider:r.socialProvider||"email",accountType:(n=r.preferredAccountTypes)==null?void 0:n[e||s],isSmartAccountDeployed:!!r.smartAccountDeployed}:void 0}}subscribeAccount(e,i){const r=()=>{const s=this.getAccount(i);s&&e(s)};i?C.subscribeChainProp("accountState",r,i):C.subscribe(r),X.subscribe(r)}subscribeNetwork(e){return C.subscribe(({activeCaipNetwork:i})=>{e({caipNetwork:i,chainId:i==null?void 0:i.id,caipNetworkId:i==null?void 0:i.caipNetworkId})})}subscribeWalletInfo(e){return ae.subscribeKey("connectedWalletInfo",e)}subscribeShouldUpdateToAddress(e){ae.subscribeKey("shouldUpdateToAddress",e)}subscribeCaipNetworkChange(e){C.subscribeKey("activeCaipNetwork",e)}getState(){return vr.state}subscribeState(e){return vr.subscribe(e)}showErrorMessage(e){De.showError(e)}showSuccessMessage(e){De.showSuccess(e)}getEvent(){return{...me.state}}subscribeEvents(e){return me.subscribe(e)}replace(e){Y.replace(e)}redirect(e){Y.push(e)}popTransactionStack(e){Y.popTransactionStack(e)}isOpen(){return Ie.state.open}isTransactionStackEmpty(){return Y.state.transactionStack.length===0}isTransactionShouldReplaceView(){var e;return(e=Y.state.transactionStack[Y.state.transactionStack.length-1])==null?void 0:e.replace}static getInstance(){return this.instance}updateFeatures(e){j.setFeatures(e)}updateOptions(e){const i={...j.state||{},...e};j.setOptions(i)}setConnectMethodsOrder(e){j.setConnectMethodsOrder(e)}setWalletFeaturesOrder(e){j.setWalletFeaturesOrder(e)}setCollapseWallets(e){j.setCollapseWallets(e)}setSocialsOrder(e){j.setSocialsOrder(e)}getConnectMethodsOrder(){return Vs.getConnectOrderMethod(j.state.features,X.getConnectors())}addNetwork(e,i){if(this.chainAdapters&&!this.chainAdapters[e])throw new Error(`Adapter for namespace ${e} doesn't exist`);const r=this.extendCaipNetwork(i,this.options);this.getCaipNetworks().find(s=>s.id===r.id)||C.addNetwork(r)}removeNetwork(e,i){if(this.chainAdapters&&!this.chainAdapters[e])throw new Error(`Adapter for namespace ${e} doesn't exist`);this.getCaipNetworks().find(r=>r.id===i)&&C.removeNetwork(e,i)}}let ef=!1;class T2 extends ON{async open(e){X.isConnected()||await super.open(e)}async close(){await super.close(),this.options.manualWCControl&&ne.finalizeWcConnection()}async syncIdentity(e){return Promise.resolve()}async syncBalance(e){return Promise.resolve()}async injectModalUi(){if(!ef&&q.isClient()){if(await Promise.resolve().then(function(){return q$}),await Promise.resolve().then(function(){return ok}),!document.querySelector("w3m-modal")){const e=document.createElement("w3m-modal");!j.state.disableAppend&&!j.state.enableEmbedded&&document.body.insertAdjacentElement("beforeend",e)}ef=!0}}}const TN="1.7.3";function RN(t){return new T2({...t,basic:!0,sdkVersion:`html-core-${TN}`})}var LN=Object.freeze({__proto__:null,createAppKit:RN,AppKit:T2}),MN=Object.defineProperty,BN=Object.defineProperties,UN=Object.getOwnPropertyDescriptors,tf=Object.getOwnPropertySymbols,DN=Object.prototype.hasOwnProperty,jN=Object.prototype.propertyIsEnumerable,rf=(t,e,i)=>e in t?MN(t,e,{enumerable:!0,configurable:!0,writable:!0,value:i}):t[e]=i,zN=(t,e)=>{for(var i in e||(e={}))DN.call(e,i)&&rf(t,i,e[i]);if(tf)for(var i of tf(e))jN.call(e,i)&&rf(t,i,e[i]);return t},FN=(t,e)=>BN(t,UN(e));function HN(t){if(t)return{"--w3m-font-family":t["--wcm-font-family"],"--w3m-accent":t["--wcm-accent-color"],"--w3m-color-mix":t["--wcm-background-color"],"--w3m-z-index":t["--wcm-z-index"]?Number(t["--wcm-z-index"]):void 0,"--w3m-qr-color":t["--wcm-accent-color"],"--w3m-font-size-master":t["--wcm-text-medium-regular-size"],"--w3m-border-radius-master":t["--wcm-container-border-radius"],"--w3m-color-mix-strength":0}}const qN=t=>{const[e,i]=t.split(":");return Un({id:i,caipNetworkId:t,chainNamespace:e,name:"",nativeCurrency:{name:"",symbol:"",decimals:8},rpcUrls:{default:{http:["https://rpc.walletconnect.org/v1"]}}})};function WN(t){var e,i,r,s,n,o,a;const c=(e=t.chains)==null?void 0:e.map(qN).filter(Boolean);if(c.length===0)throw new Error("At least one chain must be specified");const l=c.find(d=>{var h;return d.id===((h=t.defaultChain)==null?void 0:h.id)}),u={projectId:t.projectId,networks:c,themeMode:t.themeMode,themeVariables:HN(t.themeVariables),chainImages:t.chainImages,connectorImages:t.walletImages,defaultNetwork:l,metadata:FN(zN({},t.metadata),{name:((i=t.metadata)==null?void 0:i.name)||"WalletConnect",description:((r=t.metadata)==null?void 0:r.description)||"Connect to WalletConnect-compatible wallets",url:((s=t.metadata)==null?void 0:s.url)||"https://walletconnect.org",icons:((n=t.metadata)==null?void 0:n.icons)||["https://walletconnect.org/walletconnect-logo.png"]}),showWallets:!0,featuredWalletIds:t.explorerRecommendedWalletIds==="NONE"?[]:Array.isArray(t.explorerRecommendedWalletIds)?t.explorerRecommendedWalletIds:[],excludeWalletIds:t.explorerExcludedWalletIds==="ALL"?[]:Array.isArray(t.explorerExcludedWalletIds)?t.explorerExcludedWalletIds:[],enableEIP6963:!1,enableInjected:!1,enableCoinbase:!0,enableWalletConnect:!0,features:{email:!1,socials:!1}};if((o=t.mobileWallets)!=null&&o.length||(a=t.desktopWallets)!=null&&a.length){const d=[...(t.mobileWallets||[]).map(g=>({id:g.id,name:g.name,links:g.links})),...(t.desktopWallets||[]).map(g=>({id:g.id,name:g.name,links:{native:g.links.native,universal:g.links.universal}}))],h=[...u.featuredWalletIds||[],...u.excludeWalletIds||[]],p=d.filter(g=>!h.includes(g.id));p.length&&(u.customWallets=p)}return u}var VN=Object.freeze({__proto__:null,convertWCMToAppKitOptions:WN});/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const KN={attribute:!0,type:String,converter:Ql,reflect:!1,hasChanged:e0},GN=(t=KN,e,i)=>{const{kind:r,metadata:s}=i;let n=globalThis.litPropertyMetadata.get(s);if(n===void 0&&globalThis.litPropertyMetadata.set(s,n=new Map),r==="setter"&&((t=Object.create(t)).wrapped=!0),n.set(i.name,t),r==="accessor"){const{name:o}=i;return{set(a){const c=e.get.call(this);e.set.call(this,a),this.requestUpdate(o,c,t)},init(a){return a!==void 0&&this.C(o,void 0,t,a),a}}}if(r==="setter"){const{name:o}=i;return function(a){const c=this[o];e.call(this,a),this.requestUpdate(o,c,t)}}throw Error("Unsupported decorator location: "+r)};function $(t){return(e,i)=>typeof i=="object"?GN(t,e,i):((r,s,n)=>{const o=s.hasOwnProperty(n);return s.constructor.createProperty(n,r),o?Object.getOwnPropertyDescriptor(s,n):void 0})(t,e,i)}/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/function Q(t){return $({...t,state:!0,attribute:!1})}var ZN=le`
  :host {
    display: flex;
    width: inherit;
    height: inherit;
  }
`,Jt=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let $t=class extends te{render(){return this.style.cssText=`
      flex-direction: ${this.flexDirection};
      flex-wrap: ${this.flexWrap};
      flex-basis: ${this.flexBasis};
      flex-grow: ${this.flexGrow};
      flex-shrink: ${this.flexShrink};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&ht.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&ht.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&ht.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&ht.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&ht.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&ht.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&ht.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&ht.getSpacingStyles(this.margin,3)};
    `,A`<slot></slot>`}};$t.styles=[$e,ZN],Jt([$()],$t.prototype,"flexDirection",void 0),Jt([$()],$t.prototype,"flexWrap",void 0),Jt([$()],$t.prototype,"flexBasis",void 0),Jt([$()],$t.prototype,"flexGrow",void 0),Jt([$()],$t.prototype,"flexShrink",void 0),Jt([$()],$t.prototype,"alignItems",void 0),Jt([$()],$t.prototype,"justifyContent",void 0),Jt([$()],$t.prototype,"columnGap",void 0),Jt([$()],$t.prototype,"rowGap",void 0),Jt([$()],$t.prototype,"gap",void 0),Jt([$()],$t.prototype,"padding",void 0),Jt([$()],$t.prototype,"margin",void 0),$t=Jt([ee("wui-flex")],$t);/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const ce=t=>t??Xe;/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const YN=t=>t===null||typeof t!="object"&&typeof t!="function",JN=t=>t.strings===void 0;/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const R2={ATTRIBUTE:1,CHILD:2,PROPERTY:3,BOOLEAN_ATTRIBUTE:4,EVENT:5,ELEMENT:6},i0=t=>(...e)=>({_$litDirective$:t,values:e});class L2{constructor(e){}get _$AU(){return this._$AM._$AU}_$AT(e,i,r){this._$Ct=e,this._$AM=i,this._$Ci=r}_$AS(e,i){return this.update(e,i)}update(e,i){return this.render(...i)}}/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const pa=(t,e)=>{var r;const i=t._$AN;if(i===void 0)return!1;for(const s of i)(r=s._$AO)==null||r.call(s,e,!1),pa(s,e);return!0},tu=t=>{let e,i;do{if((e=t._$AM)===void 0)break;i=e._$AN,i.delete(t),t=e}while((i==null?void 0:i.size)===0)},M2=t=>{for(let e;e=t._$AM;t=e){let i=e._$AN;if(i===void 0)e._$AN=i=new Set;else if(i.has(t))break;i.add(t),eS(e)}};function XN(t){this._$AN!==void 0?(tu(this),this._$AM=t,M2(this)):this._$AM=t}function QN(t,e=!1,i=0){const r=this._$AH,s=this._$AN;if(s!==void 0&&s.size!==0)if(e)if(Array.isArray(r))for(let n=i;n<r.length;n++)pa(r[n],!1),tu(r[n]);else r!=null&&(pa(r,!1),tu(r));else pa(this,t)}const eS=t=>{t.type==R2.CHILD&&(t._$AP??(t._$AP=QN),t._$AQ??(t._$AQ=XN))};class B2 extends L2{constructor(){super(...arguments),this._$AN=void 0}_$AT(e,i,r){super._$AT(e,i,r),M2(this),this.isConnected=e._$AU}_$AO(e,i=!0){var r,s;e!==this.isConnected&&(this.isConnected=e,e?(r=this.reconnected)==null||r.call(this):(s=this.disconnected)==null||s.call(this)),i&&(pa(this,e),tu(this))}setValue(e){if(JN(this._$Ct))this._$Ct._$AI(e,this);else{const i=[...this._$Ct._$AH];i[this._$Ci]=e,this._$Ct._$AI(i,this,0)}}disconnected(){}reconnected(){}}/**
* @license
* Copyright 2021 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/class tS{constructor(e){this.G=e}disconnect(){this.G=void 0}reconnect(e){this.G=e}deref(){return this.G}}class iS{constructor(){this.Y=void 0,this.Z=void 0}get(){return this.Y}pause(){this.Y??(this.Y=new Promise(e=>this.Z=e))}resume(){var e;(e=this.Z)==null||e.call(this),this.Y=this.Z=void 0}}/**
* @license
* Copyright 2017 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const sf=t=>!YN(t)&&typeof t.then=="function",nf=1073741823;class rS extends B2{constructor(){super(...arguments),this._$Cwt=nf,this._$Cbt=[],this._$CK=new tS(this),this._$CX=new iS}render(...e){return e.find(i=>!sf(i))??xr}update(e,i){const r=this._$Cbt;let s=r.length;this._$Cbt=i;const n=this._$CK,o=this._$CX;this.isConnected||this.disconnected();for(let a=0;a<i.length&&!(a>this._$Cwt);a++){const c=i[a];if(!sf(c))return this._$Cwt=a,c;a<s&&c===r[a]||(this._$Cwt=nf,s=0,Promise.resolve(c).then(async l=>{for(;o.get();)await o.get();const u=n.deref();if(u!==void 0){const d=u._$Cbt.indexOf(c);d>-1&&d<u._$Cwt&&(u._$Cwt=d,u.setValue(l))}}))}return xr}disconnected(){this._$CK.disconnect(),this._$CX.pause()}reconnected(){this._$CK.reconnect(this),this._$CX.resume()}}const sS=i0(rS);class nS{constructor(){this.cache=new Map}set(e,i){this.cache.set(e,i)}get(e){return this.cache.get(e)}has(e){return this.cache.has(e)}delete(e){this.cache.delete(e)}clear(){this.cache.clear()}}const Zd=new nS;var oS=le`
  :host {
    display: flex;
    aspect-ratio: var(--local-aspect-ratio);
    color: var(--local-color);
    width: var(--local-width);
  }

  svg {
    width: inherit;
    height: inherit;
    object-fit: contain;
    object-position: center;
  }

  .fallback {
    width: var(--local-width);
    height: var(--local-height);
  }
`,$o=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const of={add:async()=>(await Promise.resolve().then(function(){return ck})).addSvg,allWallets:async()=>(await Promise.resolve().then(function(){return uk})).allWalletsSvg,arrowBottomCircle:async()=>(await Promise.resolve().then(function(){return hk})).arrowBottomCircleSvg,appStore:async()=>(await Promise.resolve().then(function(){return gk})).appStoreSvg,apple:async()=>(await Promise.resolve().then(function(){return wk})).appleSvg,arrowBottom:async()=>(await Promise.resolve().then(function(){return yk})).arrowBottomSvg,arrowLeft:async()=>(await Promise.resolve().then(function(){return vk})).arrowLeftSvg,arrowRight:async()=>(await Promise.resolve().then(function(){return Ek})).arrowRightSvg,arrowTop:async()=>(await Promise.resolve().then(function(){return Ik})).arrowTopSvg,bank:async()=>(await Promise.resolve().then(function(){return _k})).bankSvg,browser:async()=>(await Promise.resolve().then(function(){return Sk})).browserSvg,card:async()=>(await Promise.resolve().then(function(){return kk})).cardSvg,checkmark:async()=>(await Promise.resolve().then(function(){return Ok})).checkmarkSvg,checkmarkBold:async()=>(await Promise.resolve().then(function(){return Rk})).checkmarkBoldSvg,chevronBottom:async()=>(await Promise.resolve().then(function(){return Mk})).chevronBottomSvg,chevronLeft:async()=>(await Promise.resolve().then(function(){return Uk})).chevronLeftSvg,chevronRight:async()=>(await Promise.resolve().then(function(){return jk})).chevronRightSvg,chevronTop:async()=>(await Promise.resolve().then(function(){return Fk})).chevronTopSvg,chromeStore:async()=>(await Promise.resolve().then(function(){return qk})).chromeStoreSvg,clock:async()=>(await Promise.resolve().then(function(){return Vk})).clockSvg,close:async()=>(await Promise.resolve().then(function(){return Gk})).closeSvg,compass:async()=>(await Promise.resolve().then(function(){return Yk})).compassSvg,coinPlaceholder:async()=>(await Promise.resolve().then(function(){return Xk})).coinPlaceholderSvg,copy:async()=>(await Promise.resolve().then(function(){return eP})).copySvg,cursor:async()=>(await Promise.resolve().then(function(){return iP})).cursorSvg,cursorTransparent:async()=>(await Promise.resolve().then(function(){return sP})).cursorTransparentSvg,desktop:async()=>(await Promise.resolve().then(function(){return oP})).desktopSvg,disconnect:async()=>(await Promise.resolve().then(function(){return cP})).disconnectSvg,discord:async()=>(await Promise.resolve().then(function(){return uP})).discordSvg,etherscan:async()=>(await Promise.resolve().then(function(){return hP})).etherscanSvg,extension:async()=>(await Promise.resolve().then(function(){return gP})).extensionSvg,externalLink:async()=>(await Promise.resolve().then(function(){return wP})).externalLinkSvg,facebook:async()=>(await Promise.resolve().then(function(){return yP})).facebookSvg,farcaster:async()=>(await Promise.resolve().then(function(){return vP})).farcasterSvg,filters:async()=>(await Promise.resolve().then(function(){return EP})).filtersSvg,github:async()=>(await Promise.resolve().then(function(){return IP})).githubSvg,google:async()=>(await Promise.resolve().then(function(){return _P})).googleSvg,helpCircle:async()=>(await Promise.resolve().then(function(){return SP})).helpCircleSvg,image:async()=>(await Promise.resolve().then(function(){return kP})).imageSvg,id:async()=>(await Promise.resolve().then(function(){return OP})).idSvg,infoCircle:async()=>(await Promise.resolve().then(function(){return RP})).infoCircleSvg,lightbulb:async()=>(await Promise.resolve().then(function(){return MP})).lightbulbSvg,mail:async()=>(await Promise.resolve().then(function(){return UP})).mailSvg,mobile:async()=>(await Promise.resolve().then(function(){return jP})).mobileSvg,more:async()=>(await Promise.resolve().then(function(){return FP})).moreSvg,networkPlaceholder:async()=>(await Promise.resolve().then(function(){return qP})).networkPlaceholderSvg,nftPlaceholder:async()=>(await Promise.resolve().then(function(){return VP})).nftPlaceholderSvg,off:async()=>(await Promise.resolve().then(function(){return GP})).offSvg,playStore:async()=>(await Promise.resolve().then(function(){return YP})).playStoreSvg,plus:async()=>(await Promise.resolve().then(function(){return XP})).plusSvg,qrCode:async()=>(await Promise.resolve().then(function(){return eO})).qrCodeIcon,recycleHorizontal:async()=>(await Promise.resolve().then(function(){return iO})).recycleHorizontalSvg,refresh:async()=>(await Promise.resolve().then(function(){return sO})).refreshSvg,search:async()=>(await Promise.resolve().then(function(){return oO})).searchSvg,send:async()=>(await Promise.resolve().then(function(){return cO})).sendSvg,swapHorizontal:async()=>(await Promise.resolve().then(function(){return uO})).swapHorizontalSvg,swapHorizontalMedium:async()=>(await Promise.resolve().then(function(){return hO})).swapHorizontalMediumSvg,swapHorizontalBold:async()=>(await Promise.resolve().then(function(){return gO})).swapHorizontalBoldSvg,swapHorizontalRoundedBold:async()=>(await Promise.resolve().then(function(){return wO})).swapHorizontalRoundedBoldSvg,swapVertical:async()=>(await Promise.resolve().then(function(){return yO})).swapVerticalSvg,telegram:async()=>(await Promise.resolve().then(function(){return vO})).telegramSvg,threeDots:async()=>(await Promise.resolve().then(function(){return EO})).threeDotsSvg,twitch:async()=>(await Promise.resolve().then(function(){return IO})).twitchSvg,twitter:async()=>(await Promise.resolve().then(function(){return Tf})).xSvg,twitterIcon:async()=>(await Promise.resolve().then(function(){return NO})).twitterIconSvg,verify:async()=>(await Promise.resolve().then(function(){return $O})).verifySvg,verifyFilled:async()=>(await Promise.resolve().then(function(){return PO})).verifyFilledSvg,wallet:async()=>(await Promise.resolve().then(function(){return TO})).walletSvg,walletConnect:async()=>(await Promise.resolve().then(function(){return Ch})).walletConnectSvg,walletConnectLightBrown:async()=>(await Promise.resolve().then(function(){return Ch})).walletConnectLightBrownSvg,walletConnectBrown:async()=>(await Promise.resolve().then(function(){return Ch})).walletConnectBrownSvg,walletPlaceholder:async()=>(await Promise.resolve().then(function(){return UO})).walletPlaceholderSvg,warningCircle:async()=>(await Promise.resolve().then(function(){return jO})).warningCircleSvg,x:async()=>(await Promise.resolve().then(function(){return Tf})).xSvg,info:async()=>(await Promise.resolve().then(function(){return FO})).infoSvg,exclamationTriangle:async()=>(await Promise.resolve().then(function(){return qO})).exclamationTriangleSvg,reown:async()=>(await Promise.resolve().then(function(){return VO})).reownSvg};async function aS(t){if(Zd.has(t))return Zd.get(t);const e=(of[t]??of.copy)();return Zd.set(t,e),e}let os=class extends te{constructor(){super(...arguments),this.size="md",this.name="copy",this.color="fg-300",this.aspectRatio="1 / 1"}render(){return this.style.cssText=`
      --local-color: ${`var(--wui-color-${this.color});`}
      --local-width: ${`var(--wui-icon-size-${this.size});`}
      --local-aspect-ratio: ${this.aspectRatio}
    `,A`${sS(aS(this.name),A`<div class="fallback"></div>`)}`}};os.styles=[$e,hc,oS],$o([$()],os.prototype,"size",void 0),$o([$()],os.prototype,"name",void 0),$o([$()],os.prototype,"color",void 0),$o([$()],os.prototype,"aspectRatio",void 0),os=$o([ee("wui-icon")],os);/**
* @license
* Copyright 2018 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const U2=i0(class extends L2{constructor(t){var e;if(super(t),t.type!==R2.ATTRIBUTE||t.name!=="class"||((e=t.strings)==null?void 0:e.length)>2)throw Error("`classMap()` can only be used in the `class` attribute and must be the only part in the attribute.")}render(t){return" "+Object.keys(t).filter(e=>t[e]).join(" ")+" "}update(t,[e]){var r,s;if(this.st===void 0){this.st=new Set,t.strings!==void 0&&(this.nt=new Set(t.strings.join(" ").split(/\s/).filter(n=>n!=="")));for(const n in e)e[n]&&!((r=this.nt)!=null&&r.has(n))&&this.st.add(n);return this.render(e)}const i=t.element.classList;for(const n of this.st)n in e||(i.remove(n),this.st.delete(n));for(const n in e){const o=!!e[n];o===this.st.has(n)||(s=this.nt)!=null&&s.has(n)||(o?(i.add(n),this.st.add(n)):(i.remove(n),this.st.delete(n)))}return xr}});var cS=le`
  :host {
    display: inline-flex !important;
  }

  slot {
    width: 100%;
    display: inline-block;
    font-style: normal;
    font-family: var(--wui-font-family);
    font-feature-settings:
      'tnum' on,
      'lnum' on,
      'case' on;
    line-height: 130%;
    font-weight: var(--wui-font-weight-regular);
    overflow: inherit;
    text-overflow: inherit;
    text-align: var(--local-align);
    color: var(--local-color);
  }

  .wui-line-clamp-1 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  }

  .wui-line-clamp-2 {
    overflow: hidden;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 2;
  }

  .wui-font-medium-400 {
    font-size: var(--wui-font-size-medium);
    font-weight: var(--wui-font-weight-light);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-medium-600 {
    font-size: var(--wui-font-size-medium);
    letter-spacing: var(--wui-letter-spacing-medium);
  }

  .wui-font-title-600 {
    font-size: var(--wui-font-size-title);
    letter-spacing: var(--wui-letter-spacing-title);
  }

  .wui-font-title-6-600 {
    font-size: var(--wui-font-size-title-6);
    letter-spacing: var(--wui-letter-spacing-title-6);
  }

  .wui-font-mini-700 {
    font-size: var(--wui-font-size-mini);
    letter-spacing: var(--wui-letter-spacing-mini);
    text-transform: uppercase;
  }

  .wui-font-large-500,
  .wui-font-large-600,
  .wui-font-large-700 {
    font-size: var(--wui-font-size-large);
    letter-spacing: var(--wui-letter-spacing-large);
  }

  .wui-font-2xl-500,
  .wui-font-2xl-600,
  .wui-font-2xl-700 {
    font-size: var(--wui-font-size-2xl);
    letter-spacing: var(--wui-letter-spacing-2xl);
  }

  .wui-font-paragraph-400,
  .wui-font-paragraph-500,
  .wui-font-paragraph-600,
  .wui-font-paragraph-700 {
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
  }

  .wui-font-small-400,
  .wui-font-small-500,
  .wui-font-small-600 {
    font-size: var(--wui-font-size-small);
    letter-spacing: var(--wui-letter-spacing-small);
  }

  .wui-font-tiny-400,
  .wui-font-tiny-500,
  .wui-font-tiny-600 {
    font-size: var(--wui-font-size-tiny);
    letter-spacing: var(--wui-letter-spacing-tiny);
  }

  .wui-font-micro-700,
  .wui-font-micro-600 {
    font-size: var(--wui-font-size-micro);
    letter-spacing: var(--wui-letter-spacing-micro);
    text-transform: uppercase;
  }

  .wui-font-tiny-400,
  .wui-font-small-400,
  .wui-font-medium-400,
  .wui-font-paragraph-400 {
    font-weight: var(--wui-font-weight-light);
  }

  .wui-font-large-700,
  .wui-font-paragraph-700,
  .wui-font-micro-700,
  .wui-font-mini-700 {
    font-weight: var(--wui-font-weight-bold);
  }

  .wui-font-medium-600,
  .wui-font-medium-title-600,
  .wui-font-title-6-600,
  .wui-font-large-600,
  .wui-font-paragraph-600,
  .wui-font-small-600,
  .wui-font-tiny-600,
  .wui-font-micro-600 {
    font-weight: var(--wui-font-weight-medium);
  }

  :host([disabled]) {
    opacity: 0.4;
  }
`,ko=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let as=class extends te{constructor(){super(...arguments),this.variant="paragraph-500",this.color="fg-300",this.align="left",this.lineClamp=void 0}render(){const t={[`wui-font-${this.variant}`]:!0,[`wui-color-${this.color}`]:!0,[`wui-line-clamp-${this.lineClamp}`]:!!this.lineClamp};return this.style.cssText=`
      --local-align: ${this.align};
      --local-color: var(--wui-color-${this.color});
    `,A`<slot class=${U2(t)}></slot>`}};as.styles=[$e,cS],ko([$()],as.prototype,"variant",void 0),ko([$()],as.prototype,"color",void 0),ko([$()],as.prototype,"align",void 0),ko([$()],as.prototype,"lineClamp",void 0),as=ko([ee("wui-text")],as);var lS=le`
  :host {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    background-color: var(--wui-color-gray-glass-020);
    border-radius: var(--local-border-radius);
    border: var(--local-border);
    box-sizing: content-box;
    width: var(--local-size);
    height: var(--local-size);
    min-height: var(--local-size);
    min-width: var(--local-size);
  }

  @supports (background: color-mix(in srgb, white 50%, black)) {
    :host {
      background-color: color-mix(in srgb, var(--local-bg-value) var(--local-bg-mix), transparent);
    }
  }
`,nr=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let _i=class extends te{constructor(){super(...arguments),this.size="md",this.backgroundColor="accent-100",this.iconColor="accent-100",this.background="transparent",this.border=!1,this.borderColor="wui-color-bg-125",this.icon="copy"}render(){const t=this.iconSize||this.size,e=this.size==="lg",i=this.size==="xl",r=e?"12%":"16%",s=e?"xxs":i?"s":"3xl",n=this.background==="gray",o=this.background==="opaque",a=this.backgroundColor==="accent-100"&&o||this.backgroundColor==="success-100"&&o||this.backgroundColor==="error-100"&&o||this.backgroundColor==="inverse-100"&&o;let c=`var(--wui-color-${this.backgroundColor})`;return a?c=`var(--wui-icon-box-bg-${this.backgroundColor})`:n&&(c=`var(--wui-color-gray-${this.backgroundColor})`),this.style.cssText=`
       --local-bg-value: ${c};
       --local-bg-mix: ${a||n?"100%":r};
       --local-border-radius: var(--wui-border-radius-${s});
       --local-size: var(--wui-icon-box-size-${this.size});
       --local-border: ${this.borderColor==="wui-color-bg-125"?"2px":"1px"} solid ${this.border?`var(--${this.borderColor})`:"transparent"}
   `,A` <wui-icon color=${this.iconColor} size=${t} name=${this.icon}></wui-icon> `}};_i.styles=[$e,xt,lS],nr([$()],_i.prototype,"size",void 0),nr([$()],_i.prototype,"backgroundColor",void 0),nr([$()],_i.prototype,"iconColor",void 0),nr([$()],_i.prototype,"iconSize",void 0),nr([$()],_i.prototype,"background",void 0),nr([$({type:Boolean})],_i.prototype,"border",void 0),nr([$()],_i.prototype,"borderColor",void 0),nr([$()],_i.prototype,"icon",void 0),_i=nr([ee("wui-icon-box")],_i);var uS=le`
  :host {
    display: block;
    width: var(--local-width);
    height: var(--local-height);
  }

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: center center;
    border-radius: inherit;
  }
`,Xc=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let bn=class extends te{constructor(){super(...arguments),this.src="./path/to/image.jpg",this.alt="Image",this.size=void 0}render(){return this.style.cssText=`
      --local-width: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      --local-height: ${this.size?`var(--wui-icon-size-${this.size});`:"100%"};
      `,A`<img src=${this.src} alt=${this.alt} @error=${this.handleImageError} />`}handleImageError(){this.dispatchEvent(new CustomEvent("onLoadError",{bubbles:!0,composed:!0}))}};bn.styles=[$e,hc,uS],Xc([$()],bn.prototype,"src",void 0),Xc([$()],bn.prototype,"alt",void 0),Xc([$()],bn.prototype,"size",void 0),bn=Xc([ee("wui-image")],bn);var dS=le`
  :host {
    position: relative;
    background-color: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    width: var(--local-size);
    height: var(--local-size);
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host > wui-flex {
    overflow: hidden;
    border-radius: inherit;
    border-radius: var(--local-border-radius);
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host([name='Extension'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  :host([data-wallet-icon='allWallets']) {
    background-color: var(--wui-all-wallets-bg-100);
  }

  :host([data-wallet-icon='allWallets'])::after {
    border: 1px solid var(--wui-color-accent-glass-010);
  }

  wui-icon[data-parent-size='inherit'] {
    width: 75%;
    height: 75%;
    align-items: center;
  }

  wui-icon[data-parent-size='sm'] {
    width: 18px;
    height: 18px;
  }

  wui-icon[data-parent-size='md'] {
    width: 24px;
    height: 24px;
  }

  wui-icon[data-parent-size='lg'] {
    width: 42px;
    height: 42px;
  }

  wui-icon[data-parent-size='full'] {
    width: 100%;
    height: 100%;
  }

  :host > wui-icon-box {
    position: absolute;
    overflow: hidden;
    right: -1px;
    bottom: -2px;
    z-index: 1;
    border: 2px solid var(--wui-color-bg-150, #1e1f1f);
    padding: 1px;
  }
`,cs=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let or=class extends te{constructor(){super(...arguments),this.size="md",this.name="",this.installed=!1,this.badgeSize="xs"}render(){let t="xxs";return this.size==="lg"?t="m":this.size==="md"?t="xs":t="xxs",this.style.cssText=`
       --local-border-radius: var(--wui-border-radius-${t});
       --local-size: var(--wui-wallet-image-size-${this.size});
   `,this.walletIcon&&(this.dataset.walletIcon=this.walletIcon),A`
      <wui-flex justifyContent="center" alignItems="center"> ${this.templateVisual()} </wui-flex>
    `}templateVisual(){return this.imageSrc?A`<wui-image src=${this.imageSrc} alt=${this.name}></wui-image>`:this.walletIcon?A`<wui-icon
        data-parent-size="md"
        size="md"
        color="inherit"
        name=${this.walletIcon}
      ></wui-icon>`:A`<wui-icon
      data-parent-size=${this.size}
      size="inherit"
      color="inherit"
      name="walletPlaceholder"
    ></wui-icon>`}};or.styles=[xt,$e,dS],cs([$()],or.prototype,"size",void 0),cs([$()],or.prototype,"name",void 0),cs([$()],or.prototype,"imageSrc",void 0),cs([$()],or.prototype,"walletIcon",void 0),cs([$({type:Boolean})],or.prototype,"installed",void 0),cs([$()],or.prototype,"badgeSize",void 0),or=cs([ee("wui-wallet-image")],or);var hS=le`
  :host {
    position: relative;
    border-radius: var(--wui-border-radius-xxs);
    width: 40px;
    height: 40px;
    overflow: hidden;
    background: var(--wui-color-gray-glass-002);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    gap: var(--wui-spacing-4xs);
    padding: 3.75px !important;
  }

  :host::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-gray-glass-010);
    pointer-events: none;
  }

  :host > wui-wallet-image {
    width: 14px;
    height: 14px;
    border-radius: var(--wui-border-radius-5xs);
  }

  :host > wui-flex {
    padding: 2px;
    position: fixed;
    overflow: hidden;
    left: 34px;
    bottom: 8px;
    background: var(--dark-background-150, #1e1f1f);
    border-radius: 50%;
    z-index: 2;
    display: flex;
  }
`,af=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const Yd=4;let Qc=class extends te{constructor(){super(...arguments),this.walletImages=[]}render(){const t=this.walletImages.length<Yd;return A`${this.walletImages.slice(0,Yd).map(({src:e,walletName:i})=>A`
            <wui-wallet-image
              size="inherit"
              imageSrc=${e}
              name=${ce(i)}
            ></wui-wallet-image>
          `)}
      ${t?[...Array(Yd-this.walletImages.length)].map(()=>A` <wui-wallet-image size="inherit" name=""></wui-wallet-image>`):null}
      <wui-flex>
        <wui-icon-box
          size="xxs"
          iconSize="xxs"
          iconcolor="success-100"
          backgroundcolor="success-100"
          icon="checkmark"
          background="opaque"
        ></wui-icon-box>
      </wui-flex>`}};Qc.styles=[$e,hS],af([$({type:Array})],Qc.prototype,"walletImages",void 0),Qc=af([ee("wui-all-wallets-image")],Qc);var pS=le`
  :host {
    display: flex;
    justify-content: center;
    align-items: center;
    height: var(--wui-spacing-m);
    padding: 0 var(--wui-spacing-3xs) !important;
    border-radius: var(--wui-border-radius-5xs);
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host > wui-text {
    transform: translateY(5%);
  }

  :host([data-variant='main']) {
    background-color: var(--wui-color-accent-glass-015);
    color: var(--wui-color-accent-100);
  }

  :host([data-variant='shade']) {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-200);
  }

  :host([data-variant='success']) {
    background-color: var(--wui-icon-box-bg-success-100);
    color: var(--wui-color-success-100);
  }

  :host([data-variant='error']) {
    background-color: var(--wui-icon-box-bg-error-100);
    color: var(--wui-color-error-100);
  }

  :host([data-size='lg']) {
    padding: 11px 5px !important;
  }

  :host([data-size='lg']) > wui-text {
    transform: translateY(2%);
  }
`,Jd=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Po=class extends te{constructor(){super(...arguments),this.variant="main",this.size="lg"}render(){this.dataset.variant=this.variant,this.dataset.size=this.size;const t=this.size==="md"?"mini-700":"micro-700";return A`
      <wui-text data-variant=${this.variant} variant=${t} color="inherit">
        <slot></slot>
      </wui-text>
    `}};Po.styles=[$e,pS],Jd([$()],Po.prototype,"variant",void 0),Jd([$()],Po.prototype,"size",void 0),Po=Jd([ee("wui-tag")],Po);var gS=le`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 7px var(--wui-spacing-l) 7px var(--wui-spacing-xs);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-100);
  }

  button > wui-text:nth-child(2) {
    display: flex;
    flex: 1;
  }

  button:disabled {
    background-color: var(--wui-color-gray-glass-015);
    color: var(--wui-color-gray-glass-015);
  }

  button:disabled > wui-tag {
    background-color: var(--wui-color-gray-glass-010);
    color: var(--wui-color-fg-300);
  }

  wui-icon {
    color: var(--wui-color-fg-200) !important;
  }
`,Ut=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let At=class extends te{constructor(){super(...arguments),this.walletImages=[],this.imageSrc="",this.name="",this.tabIdx=void 0,this.installed=!1,this.disabled=!1,this.showAllWallets=!1,this.loading=!1,this.loadingSpinnerColor="accent-100"}render(){return A`
      <button ?disabled=${this.disabled} tabindex=${ce(this.tabIdx)}>
        ${this.templateAllWallets()} ${this.templateWalletImage()}
        <wui-text variant="paragraph-500" color="inherit">${this.name}</wui-text>
        ${this.templateStatus()}
      </button>
    `}templateAllWallets(){return this.showAllWallets&&this.imageSrc?A` <wui-all-wallets-image .imageeSrc=${this.imageSrc}> </wui-all-wallets-image> `:this.showAllWallets&&this.walletIcon?A` <wui-wallet-image .walletIcon=${this.walletIcon} size="sm"> </wui-wallet-image> `:null}templateWalletImage(){return!this.showAllWallets&&this.imageSrc?A`<wui-wallet-image
        size="sm"
        imageSrc=${this.imageSrc}
        name=${this.name}
        .installed=${this.installed}
      ></wui-wallet-image>`:!this.showAllWallets&&!this.imageSrc?A`<wui-wallet-image size="sm" name=${this.name}></wui-wallet-image>`:null}templateStatus(){return this.loading?A`<wui-loading-spinner
        size="lg"
        color=${this.loadingSpinnerColor}
      ></wui-loading-spinner>`:this.tagLabel&&this.tagVariant?A`<wui-tag variant=${this.tagVariant}>${this.tagLabel}</wui-tag>`:this.icon?A`<wui-icon color="inherit" size="sm" name=${this.icon}></wui-icon>`:null}};At.styles=[$e,xt,gS],Ut([$({type:Array})],At.prototype,"walletImages",void 0),Ut([$()],At.prototype,"imageSrc",void 0),Ut([$()],At.prototype,"name",void 0),Ut([$()],At.prototype,"tagLabel",void 0),Ut([$()],At.prototype,"tagVariant",void 0),Ut([$()],At.prototype,"icon",void 0),Ut([$()],At.prototype,"walletIcon",void 0),Ut([$()],At.prototype,"tabIdx",void 0),Ut([$({type:Boolean})],At.prototype,"installed",void 0),Ut([$({type:Boolean})],At.prototype,"disabled",void 0),Ut([$({type:Boolean})],At.prototype,"showAllWallets",void 0),Ut([$({type:Boolean})],At.prototype,"loading",void 0),Ut([$({type:String})],At.prototype,"loadingSpinnerColor",void 0),At=Ut([ee("wui-list-wallet")],At);var Oo=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let vn=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.count=J.state.count,this.isFetchingRecommendedWallets=J.state.isFetchingRecommendedWallets,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t),J.subscribeKey("count",t=>this.count=t),J.subscribeKey("isFetchingRecommendedWallets",t=>this.isFetchingRecommendedWallets=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.find(o=>o.id==="walletConnect"),{allWallets:e}=j.state;if(!t||e==="HIDE"||e==="ONLY_MOBILE"&&!q.isMobile())return null;const i=J.state.featured.length,r=this.count+i,s=r<10?r:Math.floor(r/10)*10,n=s<r?`${s}+`:`${s}`;return A`
      <wui-list-wallet
        name="All Wallets"
        walletIcon="allWallets"
        showAllWallets
        @click=${this.onAllWallets.bind(this)}
        tagLabel=${n}
        tagVariant="shade"
        data-testid="all-wallets"
        tabIdx=${ce(this.tabIdx)}
        .loading=${this.isFetchingRecommendedWallets}
        loadingSpinnerColor=${this.isFetchingRecommendedWallets?"fg-300":"accent-100"}
      ></wui-list-wallet>
    `}onAllWallets(){me.sendEvent({type:"track",event:"CLICK_ALL_WALLETS"}),Y.push("AllWallets")}};Oo([$()],vn.prototype,"tabIdx",void 0),Oo([Q()],vn.prototype,"connectors",void 0),Oo([Q()],vn.prototype,"count",void 0),Oo([Q()],vn.prototype,"isFetchingRecommendedWallets",void 0),vn=Oo([ee("w3m-all-wallets-widget")],vn);var Xd=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let el=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(e=>e.type==="ANNOUNCED");return t!=null&&t.length?A`
      <wui-flex flexDirection="column" gap="xs">
        ${t.filter(Cr.showConnector).map(e=>A`
              <wui-list-wallet
                imageSrc=${ce(ot.getConnectorImage(e))}
                name=${e.name??"Unknown"}
                @click=${()=>this.onConnector(e)}
                tagVariant="success"
                tagLabel="installed"
                data-testid=${`wallet-selector-${e.id}`}
                .installed=${!0}
                tabIdx=${ce(this.tabIdx)}
              >
              </wui-list-wallet>
            `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){t.id==="walletConnect"?q.isMobile()?Y.push("AllWallets"):Y.push("ConnectingWalletConnect"):Y.push("ConnectingExternal",{connector:t})}};Xd([$()],el.prototype,"tabIdx",void 0),Xd([Q()],el.prototype,"connectors",void 0),el=Xd([ee("w3m-connect-announced-widget")],el);var tl=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let To=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.loading=!1,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t)),q.isTelegram()&&q.isIos()&&(this.loading=!ne.state.wcUri,this.unsubscribe.push(ne.subscribeKey("wcUri",t=>this.loading=!t)))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const{customWallets:t}=j.state;if(!(t!=null&&t.length))return this.style.cssText="display: none",null;const e=this.filterOutDuplicateWallets(t);return A`<wui-flex flexDirection="column" gap="xs">
      ${e.map(i=>A`
          <wui-list-wallet
            imageSrc=${ce(ot.getWalletImage(i))}
            name=${i.name??"Unknown"}
            @click=${()=>this.onConnectWallet(i)}
            data-testid=${`wallet-selector-${i.id}`}
            tabIdx=${ce(this.tabIdx)}
            ?loading=${this.loading}
          >
          </wui-list-wallet>
        `)}
    </wui-flex>`}filterOutDuplicateWallets(t){const e=ie.getRecentWallets(),i=this.connectors.map(n=>{var o;return(o=n.info)==null?void 0:o.rdns}).filter(Boolean),r=e.map(n=>n.rdns).filter(Boolean),s=i.concat(r);if(s.includes("io.metamask.mobile")&&q.isMobile()){const n=s.indexOf("io.metamask.mobile");s[n]="io.metamask"}return t.filter(n=>!s.includes(String(n==null?void 0:n.rdns)))}onConnectWallet(t){this.loading||Y.push("ConnectingWalletConnect",{wallet:t})}};tl([$()],To.prototype,"tabIdx",void 0),tl([Q()],To.prototype,"connectors",void 0),tl([Q()],To.prototype,"loading",void 0),To=tl([ee("w3m-connect-custom-widget")],To);var Qd=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let il=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(e=>e.type==="EXTERNAL").filter(Cr.showConnector).filter(e=>e.id!==re.CONNECTOR_ID.COINBASE_SDK);return t!=null&&t.length?A`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(e=>A`
            <wui-list-wallet
              imageSrc=${ce(ot.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              data-testid=${`wallet-selector-external-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${ce(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){Y.push("ConnectingExternal",{connector:t})}};Qd([$()],il.prototype,"tabIdx",void 0),Qd([Q()],il.prototype,"connectors",void 0),il=Qd([ee("w3m-connect-external-widget")],il);var eh=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let rl=class extends te{constructor(){super(...arguments),this.tabIdx=void 0,this.wallets=[]}render(){return this.wallets.length?A`
      <wui-flex flexDirection="column" gap="xs">
        ${this.wallets.map(t=>A`
            <wui-list-wallet
              data-testid=${`wallet-selector-featured-${t.id}`}
              imageSrc=${ce(ot.getWalletImage(t))}
              name=${t.name??"Unknown"}
              @click=${()=>this.onConnectWallet(t)}
              tabIdx=${ce(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){X.selectWalletConnector(t)}};eh([$()],rl.prototype,"tabIdx",void 0),eh([$()],rl.prototype,"wallets",void 0),rl=eh([ee("w3m-connect-featured-widget")],rl);var th=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let sl=class extends te{constructor(){super(...arguments),this.tabIdx=void 0,this.connectors=[]}render(){var e;const t=this.connectors;return!(t!=null&&t.length)||t.length===1&&((e=t[0])==null?void 0:e.name)==="Browser Wallet"&&!q.isMobile()?(this.style.cssText="display: none",null):A`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(i=>{var s;const r=(s=i.info)==null?void 0:s.rdns;return!q.isMobile()&&i.name==="Browser Wallet"?null:!r&&!ne.checkInstalled()?(this.style.cssText="display: none",null):Cr.showConnector(i)?A`
            <wui-list-wallet
              imageSrc=${ce(ot.getConnectorImage(i))}
              .installed=${!0}
              name=${i.name??"Unknown"}
              tagVariant="success"
              tagLabel="installed"
              data-testid=${`wallet-selector-${i.id}`}
              @click=${()=>this.onConnector(i)}
              tabIdx=${ce(this.tabIdx)}
            >
            </wui-list-wallet>
          `:null})}
      </wui-flex>
    `}onConnector(t){X.setActiveConnector(t),Y.push("ConnectingExternal",{connector:t})}};th([$()],sl.prototype,"tabIdx",void 0),th([$()],sl.prototype,"connectors",void 0),sl=th([ee("w3m-connect-injected-widget")],sl);var ih=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let nl=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.connectors.filter(e=>e.type==="MULTI_CHAIN"&&e.name!=="WalletConnect");return t!=null&&t.length?A`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(e=>A`
            <wui-list-wallet
              imageSrc=${ce(ot.getConnectorImage(e))}
              .installed=${!0}
              name=${e.name??"Unknown"}
              tagVariant="shade"
              tagLabel="multichain"
              data-testid=${`wallet-selector-${e.id}`}
              @click=${()=>this.onConnector(e)}
              tabIdx=${ce(this.tabIdx)}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnector(t){X.setActiveConnector(t),Y.push("ConnectingMultiChain")}};ih([$()],nl.prototype,"tabIdx",void 0),ih([Q()],nl.prototype,"connectors",void 0),nl=ih([ee("w3m-connect-multi-chain-widget")],nl);var ol=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Ro=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.loading=!1,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t)),q.isTelegram()&&q.isIos()&&(this.loading=!ne.state.wcUri,this.unsubscribe.push(ne.subscribeKey("wcUri",t=>this.loading=!t)))}render(){const t=ie.getRecentWallets().filter(e=>!Vs.isExcluded(e)).filter(e=>!this.hasWalletConnector(e)).filter(e=>this.isWalletCompatibleWithCurrentChain(e));return t.length?A`
      <wui-flex flexDirection="column" gap="xs">
        ${t.map(e=>A`
            <wui-list-wallet
              imageSrc=${ce(ot.getWalletImage(e))}
              name=${e.name??"Unknown"}
              @click=${()=>this.onConnectWallet(e)}
              tagLabel="recent"
              tagVariant="shade"
              tabIdx=${ce(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){this.loading||X.selectWalletConnector(t)}hasWalletConnector(t){return this.connectors.some(e=>e.id===t.id||e.name===t.name)}isWalletCompatibleWithCurrentChain(t){const e=C.state.activeChain;return e&&t.chains?t.chains.some(i=>{const r=i.split(":")[0];return e===r}):!0}};ol([$()],Ro.prototype,"tabIdx",void 0),ol([Q()],Ro.prototype,"connectors",void 0),ol([Q()],Ro.prototype,"loading",void 0),Ro=ol([ee("w3m-connect-recent-widget")],Ro);var al=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Lo=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.wallets=[],this.loading=!1,q.isTelegram()&&q.isIos()&&(this.loading=!ne.state.wcUri,this.unsubscribe.push(ne.subscribeKey("wcUri",t=>this.loading=!t)))}render(){const{connectors:t}=X.state,{customWallets:e,featuredWalletIds:i}=j.state,r=ie.getRecentWallets(),s=t.find(l=>l.id==="walletConnect"),n=t.filter(l=>l.type==="INJECTED"||l.type==="ANNOUNCED"||l.type==="MULTI_CHAIN").filter(l=>l.name!=="Browser Wallet");if(!s)return null;if(i||e||!this.wallets.length)return this.style.cssText="display: none",null;const o=n.length+r.length,a=Math.max(0,2-o),c=Vs.filterOutDuplicateWallets(this.wallets).slice(0,a);return c.length?A`
      <wui-flex flexDirection="column" gap="xs">
        ${c.map(l=>A`
            <wui-list-wallet
              imageSrc=${ce(ot.getWalletImage(l))}
              name=${(l==null?void 0:l.name)??"Unknown"}
              @click=${()=>this.onConnectWallet(l)}
              tabIdx=${ce(this.tabIdx)}
              ?loading=${this.loading}
            >
            </wui-list-wallet>
          `)}
      </wui-flex>
    `:(this.style.cssText="display: none",null)}onConnectWallet(t){if(this.loading)return;const e=X.getConnector(t.id,t.rdns);e?Y.push("ConnectingExternal",{connector:e}):Y.push("ConnectingWalletConnect",{wallet:t})}};al([$()],Lo.prototype,"tabIdx",void 0),al([$()],Lo.prototype,"wallets",void 0),al([Q()],Lo.prototype,"loading",void 0),Lo=al([ee("w3m-connect-recommended-widget")],Lo);var cl=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Mo=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.connectorImages=qt.state.connectorImages,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t),qt.subscribeKey("connectorImages",t=>this.connectorImages=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){if(q.isMobile())return this.style.cssText="display: none",null;const t=this.connectors.find(i=>i.id==="walletConnect");if(!t)return this.style.cssText="display: none",null;const e=t.imageUrl||this.connectorImages[(t==null?void 0:t.imageId)??""];return A`
      <wui-list-wallet
        imageSrc=${ce(e)}
        name=${t.name??"Unknown"}
        @click=${()=>this.onConnector(t)}
        tagLabel="qr code"
        tagVariant="main"
        tabIdx=${ce(this.tabIdx)}
        data-testid="wallet-selector-walletconnect"
      >
      </wui-list-wallet>
    `}onConnector(t){X.setActiveConnector(t),Y.push("ConnectingWalletConnect")}};cl([$()],Mo.prototype,"tabIdx",void 0),cl([Q()],Mo.prototype,"connectors",void 0),cl([Q()],Mo.prototype,"connectorImages",void 0),Mo=cl([ee("w3m-connect-walletconnect-widget")],Mo);var fS=le`
  :host {
    margin-top: var(--wui-spacing-3xs);
  }
  wui-separator {
    margin: var(--wui-spacing-m) calc(var(--wui-spacing-m) * -1) var(--wui-spacing-xs)
      calc(var(--wui-spacing-m) * -1);
    width: calc(100% + var(--wui-spacing-s) * 2);
  }
`,Bo=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ls=class extends te{constructor(){super(),this.unsubscribe=[],this.tabIdx=void 0,this.connectors=X.state.connectors,this.recommended=J.state.recommended,this.featured=J.state.featured,this.unsubscribe.push(X.subscribeKey("connectors",t=>this.connectors=t),J.subscribeKey("recommended",t=>this.recommended=t),J.subscribeKey("featured",t=>this.featured=t))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){return A`
      <wui-flex flexDirection="column" gap="xs"> ${this.connectorListTemplate()} </wui-flex>
    `}connectorListTemplate(){const{custom:t,recent:e,announced:i,injected:r,multiChain:s,recommended:n,featured:o,external:a}=Cr.getConnectorsByType(this.connectors,this.recommended,this.featured);return Cr.getConnectorTypeOrder({custom:t,recent:e,announced:i,injected:r,multiChain:s,recommended:n,featured:o,external:a}).map(c=>{switch(c){case"injected":return A`
            ${s.length?A`<w3m-connect-multi-chain-widget
                  tabIdx=${ce(this.tabIdx)}
                ></w3m-connect-multi-chain-widget>`:null}
            ${i.length?A`<w3m-connect-announced-widget
                  tabIdx=${ce(this.tabIdx)}
                ></w3m-connect-announced-widget>`:null}
            ${r.length?A`<w3m-connect-injected-widget
                  .connectors=${r}
                  tabIdx=${ce(this.tabIdx)}
                ></w3m-connect-injected-widget>`:null}
          `;case"walletConnect":return A`<w3m-connect-walletconnect-widget
            tabIdx=${ce(this.tabIdx)}
          ></w3m-connect-walletconnect-widget>`;case"recent":return A`<w3m-connect-recent-widget
            tabIdx=${ce(this.tabIdx)}
          ></w3m-connect-recent-widget>`;case"featured":return A`<w3m-connect-featured-widget
            .wallets=${o}
            tabIdx=${ce(this.tabIdx)}
          ></w3m-connect-featured-widget>`;case"custom":return A`<w3m-connect-custom-widget
            tabIdx=${ce(this.tabIdx)}
          ></w3m-connect-custom-widget>`;case"external":return A`<w3m-connect-external-widget
            tabIdx=${ce(this.tabIdx)}
          ></w3m-connect-external-widget>`;case"recommended":return A`<w3m-connect-recommended-widget
            .wallets=${n}
            tabIdx=${ce(this.tabIdx)}
          ></w3m-connect-recommended-widget>`;default:return console.warn(`Unknown connector type: ${c}`),null}})}};ls.styles=fS,Bo([$()],ls.prototype,"tabIdx",void 0),Bo([Q()],ls.prototype,"connectors",void 0),Bo([Q()],ls.prototype,"recommended",void 0),Bo([Q()],ls.prototype,"featured",void 0),ls=Bo([ee("w3m-connector-list")],ls);var wS=le`
  :host {
    display: inline-flex;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-3xl);
    padding: var(--wui-spacing-3xs);
    position: relative;
    height: 36px;
    min-height: 36px;
    overflow: hidden;
  }

  :host::before {
    content: '';
    position: absolute;
    pointer-events: none;
    top: 4px;
    left: 4px;
    display: block;
    width: var(--local-tab-width);
    height: 28px;
    border-radius: var(--wui-border-radius-3xl);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transform: translateX(calc(var(--local-tab) * var(--local-tab-width)));
    transition: transform var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color, opacity;
  }

  :host([data-type='flex'])::before {
    left: 3px;
    transform: translateX(calc((var(--local-tab) * 34px) + (var(--local-tab) * 4px)));
  }

  :host([data-type='flex']) {
    display: flex;
    padding: 0px 0px 0px 12px;
    gap: 4px;
  }

  :host([data-type='flex']) > button > wui-text {
    position: absolute;
    left: 18px;
    opacity: 0;
  }

  button[data-active='true'] > wui-icon,
  button[data-active='true'] > wui-text {
    color: var(--wui-color-fg-100);
  }

  button[data-active='false'] > wui-icon,
  button[data-active='false'] > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='true']:disabled,
  button[data-active='false']:disabled {
    background-color: transparent;
    opacity: 0.5;
    cursor: not-allowed;
  }

  button[data-active='true']:disabled > wui-text {
    color: var(--wui-color-fg-200);
  }

  button[data-active='false']:disabled > wui-text {
    color: var(--wui-color-fg-300);
  }

  button > wui-icon,
  button > wui-text {
    pointer-events: none;
    transition: color var(--wui-e ase-out-power-1) var(--wui-duration-md);
    will-change: color;
  }

  button {
    width: var(--local-tab-width);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
  }

  :host([data-type='flex']) > button {
    width: 34px;
    position: relative;
    display: flex;
    justify-content: flex-start;
  }

  button:hover:enabled,
  button:active:enabled {
    background-color: transparent !important;
  }

  button:hover:enabled > wui-icon,
  button:active:enabled > wui-icon {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button:hover:enabled > wui-text,
  button:active:enabled > wui-text {
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-lg);
    color: var(--wui-color-fg-125);
  }

  button {
    border-radius: var(--wui-border-radius-3xl);
  }
`,Or=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ji=class extends te{constructor(){super(...arguments),this.tabs=[],this.onTabChange=()=>null,this.buttons=[],this.disabled=!1,this.localTabWidth="100px",this.activeTab=0,this.isDense=!1}render(){return this.isDense=this.tabs.length>3,this.style.cssText=`
      --local-tab: ${this.activeTab};
      --local-tab-width: ${this.localTabWidth};
    `,this.dataset.type=this.isDense?"flex":"block",this.tabs.map((t,e)=>{var r;const i=e===this.activeTab;return A`
        <button
          ?disabled=${this.disabled}
          @click=${()=>this.onTabClick(e)}
          data-active=${i}
          data-testid="tab-${(r=t.label)==null?void 0:r.toLowerCase()}"
        >
          ${this.iconTemplate(t)}
          <wui-text variant="small-600" color="inherit"> ${t.label} </wui-text>
        </button>
      `})}firstUpdated(){this.shadowRoot&&this.isDense&&(this.buttons=[...this.shadowRoot.querySelectorAll("button")],setTimeout(()=>{this.animateTabs(0,!0)},0))}iconTemplate(t){return t.icon?A`<wui-icon size="xs" color="inherit" name=${t.icon}></wui-icon>`:null}onTabClick(t){this.buttons&&this.animateTabs(t,!1),this.activeTab=t,this.onTabChange(t)}animateTabs(t,e){const i=this.buttons[this.activeTab],r=this.buttons[t],s=i==null?void 0:i.querySelector("wui-text"),n=r==null?void 0:r.querySelector("wui-text"),o=r==null?void 0:r.getBoundingClientRect(),a=n==null?void 0:n.getBoundingClientRect();i&&s&&!e&&t!==this.activeTab&&(s.animate([{opacity:0}],{duration:50,easing:"ease",fill:"forwards"}),i.animate([{width:"34px"}],{duration:500,easing:"ease",fill:"forwards"})),r&&o&&a&&n&&(t!==this.activeTab||e)&&(this.localTabWidth=`${Math.round(o.width+a.width)+6}px`,r.animate([{width:`${o.width+a.width}px`}],{duration:e?0:500,fill:"forwards",easing:"ease"}),n.animate([{opacity:1}],{duration:e?0:125,delay:e?0:200,fill:"forwards",easing:"ease"}))}};ji.styles=[$e,xt,wS],Or([$({type:Array})],ji.prototype,"tabs",void 0),Or([$()],ji.prototype,"onTabChange",void 0),Or([$({type:Array})],ji.prototype,"buttons",void 0),Or([$({type:Boolean})],ji.prototype,"disabled",void 0),Or([$()],ji.prototype,"localTabWidth",void 0),Or([Q()],ji.prototype,"activeTab",void 0),Or([Q()],ji.prototype,"isDense",void 0),ji=Or([ee("wui-tabs")],ji);var ll=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Uo=class extends te{constructor(){super(),this.platformTabs=[],this.unsubscribe=[],this.platforms=[],this.onSelectPlatfrom=void 0,this.buffering=!1,this.unsubscribe.push(ne.subscribeKey("buffering",t=>this.buffering=t))}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){const t=this.generateTabs();return A`
      <wui-flex justifyContent="center" .padding=${["0","0","l","0"]}>
        <wui-tabs
          ?disabled=${this.buffering}
          .tabs=${t}
          .onTabChange=${this.onTabChange.bind(this)}
        ></wui-tabs>
      </wui-flex>
    `}generateTabs(){const t=this.platforms.map(e=>e==="browser"?{label:"Browser",icon:"extension",platform:"browser"}:e==="mobile"?{label:"Mobile",icon:"mobile",platform:"mobile"}:e==="qrcode"?{label:"Mobile",icon:"mobile",platform:"qrcode"}:e==="web"?{label:"Webapp",icon:"browser",platform:"web"}:e==="desktop"?{label:"Desktop",icon:"desktop",platform:"desktop"}:{label:"Browser",icon:"extension",platform:"unsupported"});return this.platformTabs=t.map(({platform:e})=>e),t}onTabChange(t){var i;const e=this.platformTabs[t];e&&((i=this.onSelectPlatfrom)==null||i.call(this,e))}};ll([$({type:Array})],Uo.prototype,"platforms",void 0),ll([$()],Uo.prototype,"onSelectPlatfrom",void 0),ll([Q()],Uo.prototype,"buffering",void 0),Uo=ll([ee("w3m-connecting-header")],Uo);var mS=le`
  :host {
    display: flex;
  }

  :host([data-size='sm']) > svg {
    width: 12px;
    height: 12px;
  }

  :host([data-size='md']) > svg {
    width: 16px;
    height: 16px;
  }

  :host([data-size='lg']) > svg {
    width: 24px;
    height: 24px;
  }

  :host([data-size='xl']) > svg {
    width: 32px;
    height: 32px;
  }

  svg {
    animation: rotate 2s linear infinite;
  }

  circle {
    fill: none;
    stroke: var(--local-color);
    stroke-width: 4px;
    stroke-dasharray: 1, 124;
    stroke-dashoffset: 0;
    stroke-linecap: round;
    animation: dash 1.5s ease-in-out infinite;
  }

  :host([data-size='md']) > svg > circle {
    stroke-width: 6px;
  }

  :host([data-size='sm']) > svg > circle {
    stroke-width: 8px;
  }

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }

  @keyframes dash {
    0% {
      stroke-dasharray: 1, 124;
      stroke-dashoffset: 0;
    }

    50% {
      stroke-dasharray: 90, 124;
      stroke-dashoffset: -35;
    }

    100% {
      stroke-dashoffset: -125;
    }
  }
`,rh=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Do=class extends te{constructor(){super(...arguments),this.color="accent-100",this.size="lg"}render(){return this.style.cssText=`--local-color: ${this.color==="inherit"?"inherit":`var(--wui-color-${this.color})`}`,this.dataset.size=this.size,A`<svg viewBox="25 25 50 50">
      <circle r="20" cy="50" cx="50"></circle>
    </svg>`}};Do.styles=[$e,mS],rh([$()],Do.prototype,"color",void 0),rh([$()],Do.prototype,"size",void 0),Do=rh([ee("wui-loading-spinner")],Do);var yS=le`
  :host {
    width: var(--local-width);
    position: relative;
  }

  button {
    border: none;
    border-radius: var(--local-border-radius);
    width: var(--local-width);
    white-space: nowrap;
  }

  /* -- Sizes --------------------------------------------------- */
  button[data-size='md'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-l);
    height: 36px;
  }

  button[data-size='md'][data-icon-left='true'][data-icon-right='false'] {
    padding: 8.2px var(--wui-spacing-l) 9px var(--wui-spacing-s);
  }

  button[data-size='md'][data-icon-right='true'][data-icon-left='false'] {
    padding: 8.2px var(--wui-spacing-s) 9px var(--wui-spacing-l);
  }

  button[data-size='lg'] {
    padding: var(--wui-spacing-m) var(--wui-spacing-2l);
    height: 48px;
  }

  /* -- Variants --------------------------------------------------------- */
  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='inverse'] {
    background-color: var(--wui-color-inverse-100);
    color: var(--wui-color-inverse-000);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='accent-error'] {
    background: var(--wui-color-error-glass-015);
    color: var(--wui-color-error-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-error-glass-010);
  }

  button[data-variant='accent-success'] {
    background: var(--wui-color-success-glass-015);
    color: var(--wui-color-success-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-success-glass-010);
  }

  button[data-variant='neutral'] {
    background: transparent;
    color: var(--wui-color-fg-100);
    border: none;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  /* -- Focus states --------------------------------------------------- */
  button[data-variant='main']:focus-visible:enabled {
    background-color: var(--wui-color-accent-090);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='inverse']:focus-visible:enabled {
    background-color: var(--wui-color-inverse-100);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent']:focus-visible:enabled {
    background-color: var(--wui-color-accent-glass-010);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0 0 0 4px var(--wui-color-accent-glass-020);
  }
  button[data-variant='accent-error']:focus-visible:enabled {
    background: var(--wui-color-error-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-error-100),
      0 0 0 4px var(--wui-color-error-glass-020);
  }
  button[data-variant='accent-success']:focus-visible:enabled {
    background: var(--wui-color-success-glass-015);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-success-100),
      0 0 0 4px var(--wui-color-success-glass-020);
  }
  button[data-variant='neutral']:focus-visible:enabled {
    background: var(--wui-color-gray-glass-005);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-gray-glass-010),
      0 0 0 4px var(--wui-color-gray-glass-002);
  }

  /* -- Hover & Active states ----------------------------------------------------------- */
  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='accent-error']:hover:enabled {
      background: var(--wui-color-error-glass-020);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-error']:active:enabled {
      background: var(--wui-color-error-glass-030);
      color: var(--wui-color-error-100);
    }

    button[data-variant='accent-success']:hover:enabled {
      background: var(--wui-color-success-glass-020);
      color: var(--wui-color-success-100);
    }

    button[data-variant='accent-success']:active:enabled {
      background: var(--wui-color-success-glass-030);
      color: var(--wui-color-success-100);
    }

    button[data-variant='neutral']:hover:enabled {
      background: var(--wui-color-gray-glass-002);
    }

    button[data-variant='neutral']:active:enabled {
      background: var(--wui-color-gray-glass-005);
    }

    button[data-size='lg'][data-icon-left='true'][data-icon-right='false'] {
      padding-left: var(--wui-spacing-m);
    }

    button[data-size='lg'][data-icon-right='true'][data-icon-left='false'] {
      padding-right: var(--wui-spacing-m);
    }
  }

  /* -- Disabled state --------------------------------------------------- */
  button:disabled {
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    color: var(--wui-color-gray-glass-020);
    cursor: not-allowed;
  }

  button > wui-text {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  ::slotted(*) {
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
    opacity: var(--local-opacity-100);
  }

  wui-loading-spinner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    opacity: var(--local-opacity-000);
  }
`,zi=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const cf={main:"inverse-100",inverse:"inverse-000",accent:"accent-100","accent-error":"error-100","accent-success":"success-100",neutral:"fg-100",disabled:"gray-glass-020"},bS={lg:"paragraph-600",md:"small-600"},vS={lg:"md",md:"md"};let pi=class extends te{constructor(){super(...arguments),this.size="lg",this.disabled=!1,this.fullWidth=!1,this.loading=!1,this.variant="main",this.hasIconLeft=!1,this.hasIconRight=!1,this.borderRadius="m"}render(){this.style.cssText=`
    --local-width: ${this.fullWidth?"100%":"auto"};
    --local-opacity-100: ${this.loading?0:1};
    --local-opacity-000: ${this.loading?1:0};
    --local-border-radius: var(--wui-border-radius-${this.borderRadius});
    `;const t=this.textVariant??bS[this.size];return A`
      <button
        data-variant=${this.variant}
        data-icon-left=${this.hasIconLeft}
        data-icon-right=${this.hasIconRight}
        data-size=${this.size}
        ?disabled=${this.disabled}
      >
        ${this.loadingTemplate()}
        <slot name="iconLeft" @slotchange=${()=>this.handleSlotLeftChange()}></slot>
        <wui-text variant=${t} color="inherit">
          <slot></slot>
        </wui-text>
        <slot name="iconRight" @slotchange=${()=>this.handleSlotRightChange()}></slot>
      </button>
    `}handleSlotLeftChange(){this.hasIconLeft=!0}handleSlotRightChange(){this.hasIconRight=!0}loadingTemplate(){if(this.loading){const t=vS[this.size],e=this.disabled?cf.disabled:cf[this.variant];return A`<wui-loading-spinner color=${e} size=${t}></wui-loading-spinner>`}return A``}};pi.styles=[$e,xt,yS],zi([$()],pi.prototype,"size",void 0),zi([$({type:Boolean})],pi.prototype,"disabled",void 0),zi([$({type:Boolean})],pi.prototype,"fullWidth",void 0),zi([$({type:Boolean})],pi.prototype,"loading",void 0),zi([$()],pi.prototype,"variant",void 0),zi([$({type:Boolean})],pi.prototype,"hasIconLeft",void 0),zi([$({type:Boolean})],pi.prototype,"hasIconRight",void 0),zi([$()],pi.prototype,"borderRadius",void 0),zi([$()],pi.prototype,"textVariant",void 0),pi=zi([ee("wui-button")],pi);var CS=le`
  button {
    padding: var(--wui-spacing-4xs) var(--wui-spacing-xxs);
    border-radius: var(--wui-border-radius-3xs);
    background-color: transparent;
    color: var(--wui-color-accent-100);
  }

  button:disabled {
    background-color: transparent;
    color: var(--wui-color-gray-glass-015);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-005);
  }
`,ul=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Cn=class extends te{constructor(){super(...arguments),this.tabIdx=void 0,this.disabled=!1,this.color="inherit"}render(){return A`
      <button ?disabled=${this.disabled} tabindex=${ce(this.tabIdx)}>
        <slot name="iconLeft"></slot>
        <wui-text variant="small-600" color=${this.color}>
          <slot></slot>
        </wui-text>
        <slot name="iconRight"></slot>
      </button>
    `}};Cn.styles=[$e,xt,CS],ul([$()],Cn.prototype,"tabIdx",void 0),ul([$({type:Boolean})],Cn.prototype,"disabled",void 0),ul([$()],Cn.prototype,"color",void 0),Cn=ul([ee("wui-link")],Cn);var ES=le`
  :host {
    display: block;
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  svg {
    width: var(--wui-box-size-md);
    height: var(--wui-box-size-md);
  }

  rect {
    fill: none;
    stroke: var(--wui-color-accent-100);
    stroke-width: 4px;
    stroke-linecap: round;
    animation: dash 1s linear infinite;
  }

  @keyframes dash {
    to {
      stroke-dashoffset: 0px;
    }
  }
`,lf=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let dl=class extends te{constructor(){super(...arguments),this.radius=36}render(){return this.svgLoaderTemplate()}svgLoaderTemplate(){const t=this.radius>50?50:this.radius,e=36-t,i=116+e,r=245+e,s=360+e*1.75;return A`
      <svg viewBox="0 0 110 110" width="110" height="110">
        <rect
          x="2"
          y="2"
          width="106"
          height="106"
          rx=${t}
          stroke-dasharray="${i} ${r}"
          stroke-dashoffset=${s}
        />
      </svg>
    `}};dl.styles=[$e,ES],lf([$({type:Number})],dl.prototype,"radius",void 0),dl=lf([ee("wui-loading-thumbnail")],dl);var xS=le`
  button {
    border: none;
    border-radius: var(--wui-border-radius-3xl);
  }

  button[data-variant='main'] {
    background-color: var(--wui-color-accent-100);
    color: var(--wui-color-inverse-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='accent'] {
    background-color: var(--wui-color-accent-glass-010);
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
  }

  button[data-variant='gray'] {
    background-color: transparent;
    color: var(--wui-color-fg-200);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-variant='shade'] {
    background-color: transparent;
    color: var(--wui-color-accent-100);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  button[data-size='sm'] {
    height: 32px;
    padding: 0 var(--wui-spacing-s);
  }

  button[data-size='md'] {
    height: 40px;
    padding: 0 var(--wui-spacing-l);
  }

  button[data-size='sm'] > wui-image {
    width: 16px;
    height: 16px;
  }

  button[data-size='md'] > wui-image {
    width: 24px;
    height: 24px;
  }

  button[data-size='sm'] > wui-icon {
    width: 12px;
    height: 12px;
  }

  button[data-size='md'] > wui-icon {
    width: 14px;
    height: 14px;
  }

  wui-image {
    border-radius: var(--wui-border-radius-3xl);
    overflow: hidden;
  }

  button.disabled > wui-icon,
  button.disabled > wui-image {
    filter: grayscale(1);
  }

  button[data-variant='main'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-accent-090);
  }

  button[data-variant='shade'] > wui-image,
  button[data-variant='gray'] > wui-image {
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-010);
  }

  @media (hover: hover) and (pointer: fine) {
    button[data-variant='main']:focus-visible {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:hover:enabled {
      background-color: var(--wui-color-accent-090);
    }

    button[data-variant='main']:active:enabled {
      background-color: var(--wui-color-accent-080);
    }

    button[data-variant='accent']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }

    button[data-variant='accent']:active:enabled {
      background-color: var(--wui-color-accent-glass-020);
    }

    button[data-variant='shade']:focus-visible,
    button[data-variant='gray']:focus-visible,
    button[data-variant='shade']:hover,
    button[data-variant='gray']:hover {
      background-color: var(--wui-color-gray-glass-002);
    }

    button[data-variant='gray']:active,
    button[data-variant='shade']:active {
      background-color: var(--wui-color-gray-glass-005);
    }
  }

  button.disabled {
    color: var(--wui-color-gray-glass-020);
    background-color: var(--wui-color-gray-glass-002);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    pointer-events: none;
  }
`,us=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ar=class extends te{constructor(){super(...arguments),this.variant="accent",this.imageSrc="",this.disabled=!1,this.icon="externalLink",this.size="md",this.text=""}render(){const t=this.size==="sm"?"small-600":"paragraph-600";return A`
      <button
        class=${this.disabled?"disabled":""}
        data-variant=${this.variant}
        data-size=${this.size}
      >
        ${this.imageSrc?A`<wui-image src=${this.imageSrc}></wui-image>`:null}
        <wui-text variant=${t} color="inherit"> ${this.text} </wui-text>
        <wui-icon name=${this.icon} color="inherit" size="inherit"></wui-icon>
      </button>
    `}};ar.styles=[$e,xt,xS],us([$()],ar.prototype,"variant",void 0),us([$()],ar.prototype,"imageSrc",void 0),us([$({type:Boolean})],ar.prototype,"disabled",void 0),us([$()],ar.prototype,"icon",void 0),us([$()],ar.prototype,"size",void 0),us([$()],ar.prototype,"text",void 0),ar=us([ee("wui-chip-button")],ar);var IS=le`
  wui-flex {
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
  }
`,hl=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let En=class extends te{constructor(){super(...arguments),this.disabled=!1,this.label="",this.buttonLabel=""}render(){return A`
      <wui-flex
        justifyContent="space-between"
        alignItems="center"
        .padding=${["1xs","2l","1xs","2l"]}
      >
        <wui-text variant="paragraph-500" color="fg-200">${this.label}</wui-text>
        <wui-chip-button size="sm" variant="shade" text=${this.buttonLabel} icon="chevronRight">
        </wui-chip-button>
      </wui-flex>
    `}};En.styles=[$e,xt,IS],hl([$({type:Boolean})],En.prototype,"disabled",void 0),hl([$()],En.prototype,"label",void 0),hl([$()],En.prototype,"buttonLabel",void 0),En=hl([ee("wui-cta-button")],En);var AS=le`
  :host {
    display: block;
    padding: 0 var(--wui-spacing-xl) var(--wui-spacing-xl);
  }
`,uf=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let pl=class extends te{constructor(){super(...arguments),this.wallet=void 0}render(){if(!this.wallet)return this.style.display="none",null;const{name:t,app_store:e,play_store:i,chrome_store:r,homepage:s}=this.wallet,n=q.isMobile(),o=q.isIos(),a=q.isAndroid(),c=[e,i,s,r].filter(Boolean).length>1,l=ht.getTruncateString({string:t,charsStart:12,charsEnd:0,truncate:"end"});return c&&!n?A`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${()=>Y.push("Downloads",{wallet:this.wallet})}
        ></wui-cta-button>
      `:!c&&s?A`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${this.onHomePage.bind(this)}
        ></wui-cta-button>
      `:e&&o?A`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${this.onAppStore.bind(this)}
        ></wui-cta-button>
      `:i&&a?A`
        <wui-cta-button
          label=${`Don't have ${l}?`}
          buttonLabel="Get"
          @click=${this.onPlayStore.bind(this)}
        ></wui-cta-button>
      `:(this.style.display="none",null)}onAppStore(){var t;(t=this.wallet)!=null&&t.app_store&&q.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var t;(t=this.wallet)!=null&&t.play_store&&q.openHref(this.wallet.play_store,"_blank")}onHomePage(){var t;(t=this.wallet)!=null&&t.homepage&&q.openHref(this.wallet.homepage,"_blank")}};pl.styles=[AS],uf([$({type:Object})],pl.prototype,"wallet",void 0),pl=uf([ee("w3m-mobile-download-links")],pl);var _S=le`
  @keyframes shake {
    0% {
      transform: translateX(0);
    }
    25% {
      transform: translateX(3px);
    }
    50% {
      transform: translateX(-3px);
    }
    75% {
      transform: translateX(3px);
    }
    100% {
      transform: translateX(0);
    }
  }

  wui-flex:first-child:not(:only-child) {
    position: relative;
  }

  wui-loading-thumbnail {
    position: absolute;
  }

  wui-icon-box {
    position: absolute;
    right: calc(var(--wui-spacing-3xs) * -1);
    bottom: calc(var(--wui-spacing-3xs) * -1);
    opacity: 0;
    transform: scale(0.5);
    transition-property: opacity, transform;
    transition-duration: var(--wui-duration-lg);
    transition-timing-function: var(--wui-ease-out-power-2);
    will-change: opacity, transform;
  }

  wui-text[align='center'] {
    width: 100%;
    padding: 0px var(--wui-spacing-l);
  }

  [data-error='true'] wui-icon-box {
    opacity: 1;
    transform: scale(1);
  }

  [data-error='true'] > wui-flex:first-child {
    animation: shake 250ms cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  }

  [data-retry='false'] wui-link {
    display: none;
  }

  [data-retry='true'] wui-link {
    display: block;
    opacity: 1;
  }
`,Ni=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};class vt extends te{constructor(){var e,i,r,s,n;super(),this.wallet=(e=Y.state.data)==null?void 0:e.wallet,this.connector=(i=Y.state.data)==null?void 0:i.connector,this.timeout=void 0,this.secondaryBtnIcon="refresh",this.onConnect=void 0,this.onRender=void 0,this.onAutoConnect=void 0,this.isWalletConnect=!0,this.unsubscribe=[],this.imageSrc=ot.getWalletImage(this.wallet)??ot.getConnectorImage(this.connector),this.name=((r=this.wallet)==null?void 0:r.name)??((s=this.connector)==null?void 0:s.name)??"Wallet",this.isRetrying=!1,this.uri=ne.state.wcUri,this.error=ne.state.wcError,this.ready=!1,this.showRetry=!1,this.secondaryBtnLabel="Try again",this.secondaryLabel="Accept connection request in the wallet",this.buffering=!1,this.isLoading=!1,this.isMobile=!1,this.onRetry=void 0,this.unsubscribe.push(ne.subscribeKey("wcUri",o=>{var a;this.uri=o,this.isRetrying&&this.onRetry&&(this.isRetrying=!1,(a=this.onConnect)==null||a.call(this))}),ne.subscribeKey("wcError",o=>this.error=o),ne.subscribeKey("buffering",o=>this.buffering=o)),(q.isTelegram()||q.isSafari())&&q.isIos()&&ne.state.wcUri&&((n=this.onConnect)==null||n.call(this))}firstUpdated(){var e;(e=this.onAutoConnect)==null||e.call(this),this.showRetry=!this.onAutoConnect}disconnectedCallback(){this.unsubscribe.forEach(e=>e()),clearTimeout(this.timeout)}render(){var r;(r=this.onRender)==null||r.call(this),this.onShowRetry();const e=this.error?"Connection can be declined if a previous request is still active":this.secondaryLabel;let i=`Continue in ${this.name}`;return this.buffering&&(i="Connecting..."),this.error&&(i="Connection declined"),A`
      <wui-flex
        data-error=${ce(this.error)}
        data-retry=${this.showRetry}
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-flex justifyContent="center" alignItems="center">
          <wui-wallet-image size="lg" imageSrc=${ce(this.imageSrc)}></wui-wallet-image>

          ${this.error?null:this.loaderTemplate()}

          <wui-icon-box
            backgroundColor="error-100"
            background="opaque"
            iconColor="error-100"
            icon="close"
            size="sm"
            border
            borderColor="wui-color-bg-125"
          ></wui-icon-box>
        </wui-flex>

        <wui-flex flexDirection="column" alignItems="center" gap="xs">
          <wui-text variant="paragraph-500" color=${this.error?"error-100":"fg-100"}>
            ${i}
          </wui-text>
          <wui-text align="center" variant="small-500" color="fg-200">${e}</wui-text>
        </wui-flex>

        ${this.secondaryBtnLabel?A`
              <wui-button
                variant="accent"
                size="md"
                ?disabled=${this.isRetrying||!this.error&&this.buffering||this.isLoading}
                @click=${this.onTryAgain.bind(this)}
                data-testid="w3m-connecting-widget-secondary-button"
              >
                <wui-icon color="inherit" slot="iconLeft" name=${this.secondaryBtnIcon}></wui-icon>
                ${this.secondaryBtnLabel}
              </wui-button>
            `:null}
      </wui-flex>

      ${this.isWalletConnect?A`
            <wui-flex .padding=${["0","xl","xl","xl"]} justifyContent="center">
              <wui-link @click=${this.onCopyUri} color="fg-200" data-testid="wui-link-copy">
                <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
                Copy link
              </wui-link>
            </wui-flex>
          `:null}

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onShowRetry(){var e,i;this.error&&!this.showRetry&&(this.showRetry=!0,(i=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-button"))==null||i.animate([{opacity:0},{opacity:1}],{fill:"forwards",easing:"ease"}))}onTryAgain(){var e,i;this.buffering||(ne.setWcError(!1),this.onRetry?(this.isRetrying=!0,(e=this.onRetry)==null||e.call(this)):(i=this.onConnect)==null||i.call(this))}loaderTemplate(){const e=st.state.themeVariables["--w3m-border-radius-master"],i=e?parseInt(e.replace("px",""),10):4;return A`<wui-loading-thumbnail radius=${i*9}></wui-loading-thumbnail>`}onCopyUri(){try{this.uri&&(q.copyToClopboard(this.uri),De.showSuccess("Link copied"))}catch{De.showError("Failed to copy")}}}vt.styles=_S,Ni([Q()],vt.prototype,"isRetrying",void 0),Ni([Q()],vt.prototype,"uri",void 0),Ni([Q()],vt.prototype,"error",void 0),Ni([Q()],vt.prototype,"ready",void 0),Ni([Q()],vt.prototype,"showRetry",void 0),Ni([Q()],vt.prototype,"secondaryBtnLabel",void 0),Ni([Q()],vt.prototype,"secondaryLabel",void 0),Ni([Q()],vt.prototype,"buffering",void 0),Ni([Q()],vt.prototype,"isLoading",void 0),Ni([$({type:Boolean})],vt.prototype,"isMobile",void 0),Ni([$()],vt.prototype,"onRetry",void 0);var NS=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let df=class extends vt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-browser: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onAutoConnect=this.onConnectProxy.bind(this),me.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}async onConnectProxy(){var t;try{this.error=!1;const{connectors:e}=X.state,i=e.find(r=>{var s,n,o;return r.type==="ANNOUNCED"&&((s=r.info)==null?void 0:s.rdns)===((n=this.wallet)==null?void 0:n.rdns)||r.type==="INJECTED"||r.name===((o=this.wallet)==null?void 0:o.name)});if(i)await ne.connectExternal(i,i.chain);else throw new Error("w3m-connecting-wc-browser: No connector found");Ie.close(),me.sendEvent({type:"track",event:"CONNECT_SUCCESS",properties:{method:"browser",name:((t=this.wallet)==null?void 0:t.name)||"Unknown"}})}catch(e){me.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(e==null?void 0:e.message)??"Unknown"}}),this.error=!0}}};df=NS([ee("w3m-connecting-wc-browser")],df);var SS=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let hf=class extends vt{constructor(){if(super(),!this.wallet)throw new Error("w3m-connecting-wc-desktop: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.onRender=this.onRenderProxy.bind(this),me.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"desktop"}})}onRenderProxy(){var t;!this.ready&&this.uri&&(this.ready=!0,(t=this.onConnect)==null||t.call(this))}onConnectProxy(){var t;if((t=this.wallet)!=null&&t.desktop_link&&this.uri)try{this.error=!1;const{desktop_link:e,name:i}=this.wallet,{redirect:r,href:s}=q.formatNativeUrl(e,this.uri);ne.setWcLinking({name:i,href:s}),ne.setRecentWallet(this.wallet),q.openHref(r,"_blank")}catch{this.error=!0}}};hf=SS([ee("w3m-connecting-wc-desktop")],hf);var $S=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let pf=class extends vt{constructor(){if(super(),this.btnLabelTimeout=void 0,this.labelTimeout=void 0,this.onRender=()=>{var t;!this.ready&&this.uri&&(this.ready=!0,(t=this.onConnect)==null||t.call(this))},this.onConnect=()=>{var t;if((t=this.wallet)!=null&&t.mobile_link&&this.uri)try{this.error=!1;const{mobile_link:e,name:i}=this.wallet,{redirect:r,href:s}=q.formatNativeUrl(e,this.uri);ne.setWcLinking({name:i,href:s}),ne.setRecentWallet(this.wallet);const n=q.isIframe()?"_top":"_self";q.openHref(r,n),clearTimeout(this.labelTimeout),this.secondaryLabel=nt.CONNECT_LABELS.MOBILE}catch(e){me.sendEvent({type:"track",event:"CONNECT_PROXY_ERROR",properties:{message:e instanceof Error?e.message:"Error parsing the deeplink",uri:this.uri,mobile_link:this.wallet.mobile_link,name:this.wallet.name}}),this.error=!0}},!this.wallet)throw new Error("w3m-connecting-wc-mobile: No wallet provided");this.initializeStateAndTimers(),document.addEventListener("visibilitychange",this.onBuffering.bind(this)),me.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"mobile"}})}disconnectedCallback(){super.disconnectedCallback(),document.removeEventListener("visibilitychange",this.onBuffering.bind(this)),clearTimeout(this.btnLabelTimeout),clearTimeout(this.labelTimeout)}initializeStateAndTimers(){this.secondaryBtnLabel=void 0,this.secondaryLabel=nt.CONNECT_LABELS.MOBILE,this.btnLabelTimeout=setTimeout(()=>{this.secondaryBtnLabel="Try again",this.secondaryLabel=nt.CONNECT_LABELS.MOBILE},nt.FIVE_SEC_MS),this.labelTimeout=setTimeout(()=>{this.secondaryLabel="Hold tight... it's taking longer than expected"},nt.THREE_SEC_MS)}onBuffering(){const t=q.isIos();(document==null?void 0:document.visibilityState)==="visible"&&!this.error&&t&&(ne.setBuffering(!0),setTimeout(()=>{ne.setBuffering(!1)},5e3))}onTryAgain(){this.buffering||(clearTimeout(this.btnLabelTimeout),clearTimeout(this.labelTimeout),this.initializeStateAndTimers(),ne.setWcError(!1),this.onConnect())}};pf=$S([ee("w3m-connecting-wc-mobile")],pf);var ta={},kS=function(){return typeof Promise=="function"&&Promise.prototype&&Promise.prototype.then},D2={},ii={};let sh;const PS=[0,26,44,70,100,134,172,196,242,292,346,404,466,532,581,655,733,815,901,991,1085,1156,1258,1364,1474,1588,1706,1828,1921,2051,2185,2323,2465,2611,2761,2876,3034,3196,3362,3532,3706];ii.getSymbolSize=function(t){if(!t)throw new Error('"version" cannot be null or undefined');if(t<1||t>40)throw new Error('"version" should be in range from 1 to 40');return t*4+17},ii.getSymbolTotalCodewords=function(t){return PS[t]},ii.getBCHDigit=function(t){let e=0;for(;t!==0;)e++,t>>>=1;return e},ii.setToSJISFunction=function(t){if(typeof t!="function")throw new Error('"toSJISFunc" is not a valid function.');sh=t},ii.isKanjiModeEnabled=function(){return typeof sh<"u"},ii.toSJIS=function(t){return sh(t)};var $u={};(function(t){t.L={bit:1},t.M={bit:0},t.Q={bit:3},t.H={bit:2};function e(i){if(typeof i!="string")throw new Error("Param is not a string");switch(i.toLowerCase()){case"l":case"low":return t.L;case"m":case"medium":return t.M;case"q":case"quartile":return t.Q;case"h":case"high":return t.H;default:throw new Error("Unknown EC Level: "+i)}}t.isValid=function(i){return i&&typeof i.bit<"u"&&i.bit>=0&&i.bit<4},t.from=function(i,r){if(t.isValid(i))return i;try{return e(i)}catch{return r}}})($u);function j2(){this.buffer=[],this.length=0}j2.prototype={get:function(t){const e=Math.floor(t/8);return(this.buffer[e]>>>7-t%8&1)===1},put:function(t,e){for(let i=0;i<e;i++)this.putBit((t>>>e-i-1&1)===1)},getLengthInBits:function(){return this.length},putBit:function(t){const e=Math.floor(this.length/8);this.buffer.length<=e&&this.buffer.push(0),t&&(this.buffer[e]|=128>>>this.length%8),this.length++}};var OS=j2;function ia(t){if(!t||t<1)throw new Error("BitMatrix size must be defined and greater than 0");this.size=t,this.data=new Uint8Array(t*t),this.reservedBit=new Uint8Array(t*t)}ia.prototype.set=function(t,e,i,r){const s=t*this.size+e;this.data[s]=i,r&&(this.reservedBit[s]=!0)},ia.prototype.get=function(t,e){return this.data[t*this.size+e]},ia.prototype.xor=function(t,e,i){this.data[t*this.size+e]^=i},ia.prototype.isReserved=function(t,e){return this.reservedBit[t*this.size+e]};var TS=ia,z2={};(function(t){const e=ii.getSymbolSize;t.getRowColCoords=function(i){if(i===1)return[];const r=Math.floor(i/7)+2,s=e(i),n=s===145?26:Math.ceil((s-13)/(2*r-2))*2,o=[s-7];for(let a=1;a<r-1;a++)o[a]=o[a-1]-n;return o.push(6),o.reverse()},t.getPositions=function(i){const r=[],s=t.getRowColCoords(i),n=s.length;for(let o=0;o<n;o++)for(let a=0;a<n;a++)o===0&&a===0||o===0&&a===n-1||o===n-1&&a===0||r.push([s[o],s[a]]);return r}})(z2);var F2={};const RS=ii.getSymbolSize,gf=7;F2.getPositions=function(t){const e=RS(t);return[[0,0],[e-gf,0],[0,e-gf]]};var H2={};(function(t){t.Patterns={PATTERN000:0,PATTERN001:1,PATTERN010:2,PATTERN011:3,PATTERN100:4,PATTERN101:5,PATTERN110:6,PATTERN111:7};const e={N1:3,N2:3,N3:40,N4:10};t.isValid=function(r){return r!=null&&r!==""&&!isNaN(r)&&r>=0&&r<=7},t.from=function(r){return t.isValid(r)?parseInt(r,10):void 0},t.getPenaltyN1=function(r){const s=r.size;let n=0,o=0,a=0,c=null,l=null;for(let u=0;u<s;u++){o=a=0,c=l=null;for(let d=0;d<s;d++){let h=r.get(u,d);h===c?o++:(o>=5&&(n+=e.N1+(o-5)),c=h,o=1),h=r.get(d,u),h===l?a++:(a>=5&&(n+=e.N1+(a-5)),l=h,a=1)}o>=5&&(n+=e.N1+(o-5)),a>=5&&(n+=e.N1+(a-5))}return n},t.getPenaltyN2=function(r){const s=r.size;let n=0;for(let o=0;o<s-1;o++)for(let a=0;a<s-1;a++){const c=r.get(o,a)+r.get(o,a+1)+r.get(o+1,a)+r.get(o+1,a+1);(c===4||c===0)&&n++}return n*e.N2},t.getPenaltyN3=function(r){const s=r.size;let n=0,o=0,a=0;for(let c=0;c<s;c++){o=a=0;for(let l=0;l<s;l++)o=o<<1&2047|r.get(c,l),l>=10&&(o===1488||o===93)&&n++,a=a<<1&2047|r.get(l,c),l>=10&&(a===1488||a===93)&&n++}return n*e.N3},t.getPenaltyN4=function(r){let s=0;const n=r.data.length;for(let o=0;o<n;o++)s+=r.data[o];return Math.abs(Math.ceil(s*100/n/5)-10)*e.N4};function i(r,s,n){switch(r){case t.Patterns.PATTERN000:return(s+n)%2===0;case t.Patterns.PATTERN001:return s%2===0;case t.Patterns.PATTERN010:return n%3===0;case t.Patterns.PATTERN011:return(s+n)%3===0;case t.Patterns.PATTERN100:return(Math.floor(s/2)+Math.floor(n/3))%2===0;case t.Patterns.PATTERN101:return s*n%2+s*n%3===0;case t.Patterns.PATTERN110:return(s*n%2+s*n%3)%2===0;case t.Patterns.PATTERN111:return(s*n%3+(s+n)%2)%2===0;default:throw new Error("bad maskPattern:"+r)}}t.applyMask=function(r,s){const n=s.size;for(let o=0;o<n;o++)for(let a=0;a<n;a++)s.isReserved(a,o)||s.xor(a,o,i(r,a,o))},t.getBestMask=function(r,s){const n=Object.keys(t.Patterns).length;let o=0,a=1/0;for(let c=0;c<n;c++){s(c),t.applyMask(c,r);const l=t.getPenaltyN1(r)+t.getPenaltyN2(r)+t.getPenaltyN3(r)+t.getPenaltyN4(r);t.applyMask(c,r),l<a&&(a=l,o=c)}return o}})(H2);var iu={};const Tr=$u,gl=[1,1,1,1,1,1,1,1,1,1,2,2,1,2,2,4,1,2,4,4,2,4,4,4,2,4,6,5,2,4,6,6,2,5,8,8,4,5,8,8,4,5,8,11,4,8,10,11,4,9,12,16,4,9,16,16,6,10,12,18,6,10,17,16,6,11,16,19,6,13,18,21,7,14,21,25,8,16,20,25,8,17,23,25,9,17,23,34,9,18,25,30,10,20,27,32,12,21,29,35,12,23,34,37,12,25,34,40,13,26,35,42,14,28,38,45,15,29,40,48,16,31,43,51,17,33,45,54,18,35,48,57,19,37,51,60,19,38,53,63,20,40,56,66,21,43,59,70,22,45,62,74,24,47,65,77,25,49,68,81],fl=[7,10,13,17,10,16,22,28,15,26,36,44,20,36,52,64,26,48,72,88,36,64,96,112,40,72,108,130,48,88,132,156,60,110,160,192,72,130,192,224,80,150,224,264,96,176,260,308,104,198,288,352,120,216,320,384,132,240,360,432,144,280,408,480,168,308,448,532,180,338,504,588,196,364,546,650,224,416,600,700,224,442,644,750,252,476,690,816,270,504,750,900,300,560,810,960,312,588,870,1050,336,644,952,1110,360,700,1020,1200,390,728,1050,1260,420,784,1140,1350,450,812,1200,1440,480,868,1290,1530,510,924,1350,1620,540,980,1440,1710,570,1036,1530,1800,570,1064,1590,1890,600,1120,1680,1980,630,1204,1770,2100,660,1260,1860,2220,720,1316,1950,2310,750,1372,2040,2430];iu.getBlocksCount=function(t,e){switch(e){case Tr.L:return gl[(t-1)*4+0];case Tr.M:return gl[(t-1)*4+1];case Tr.Q:return gl[(t-1)*4+2];case Tr.H:return gl[(t-1)*4+3];default:return}},iu.getTotalCodewordsCount=function(t,e){switch(e){case Tr.L:return fl[(t-1)*4+0];case Tr.M:return fl[(t-1)*4+1];case Tr.Q:return fl[(t-1)*4+2];case Tr.H:return fl[(t-1)*4+3];default:return}};var q2={},wl={};const jo=new Uint8Array(512),ml=new Uint8Array(256);(function(){let t=1;for(let e=0;e<255;e++)jo[e]=t,ml[t]=e,t<<=1,t&256&&(t^=285);for(let e=255;e<512;e++)jo[e]=jo[e-255]})(),wl.log=function(t){if(t<1)throw new Error("log("+t+")");return ml[t]},wl.exp=function(t){return jo[t]},wl.mul=function(t,e){return t===0||e===0?0:jo[ml[t]+ml[e]]},function(t){const e=wl;t.mul=function(i,r){const s=new Uint8Array(i.length+r.length-1);for(let n=0;n<i.length;n++)for(let o=0;o<r.length;o++)s[n+o]^=e.mul(i[n],r[o]);return s},t.mod=function(i,r){let s=new Uint8Array(i);for(;s.length-r.length>=0;){const n=s[0];for(let a=0;a<r.length;a++)s[a]^=e.mul(r[a],n);let o=0;for(;o<s.length&&s[o]===0;)o++;s=s.slice(o)}return s},t.generateECPolynomial=function(i){let r=new Uint8Array([1]);for(let s=0;s<i;s++)r=t.mul(r,new Uint8Array([1,e.exp(s)]));return r}}(q2);const ff=q2;function hp(t){this.genPoly=void 0,this.degree=t,this.degree&&this.initialize(this.degree)}hp.prototype.initialize=function(t){this.degree=t,this.genPoly=ff.generateECPolynomial(this.degree)},hp.prototype.encode=function(t){if(!this.genPoly)throw new Error("Encoder not initialized");const e=new Uint8Array(t.length+this.degree);e.set(t);const i=ff.mod(e,this.genPoly),r=this.degree-i.length;if(r>0){const s=new Uint8Array(this.degree);return s.set(i,r),s}return i};var LS=hp,W2={},Yr={},pp={};pp.isValid=function(t){return!isNaN(t)&&t>=1&&t<=40};var Zi={};const V2="[0-9]+",MS="[A-Z $%*+\\-./:]+";let Ga="(?:[u3000-u303F]|[u3040-u309F]|[u30A0-u30FF]|[uFF00-uFFEF]|[u4E00-u9FAF]|[u2605-u2606]|[u2190-u2195]|u203B|[u2010u2015u2018u2019u2025u2026u201Cu201Du2225u2260]|[u0391-u0451]|[u00A7u00A8u00B1u00B4u00D7u00F7])+";Ga=Ga.replace(/u/g,"\\u");const BS="(?:(?![A-Z0-9 $%*+\\-./:]|"+Ga+`)(?:.|[\r
]))+`;Zi.KANJI=new RegExp(Ga,"g"),Zi.BYTE_KANJI=new RegExp("[^A-Z0-9 $%*+\\-./:]+","g"),Zi.BYTE=new RegExp(BS,"g"),Zi.NUMERIC=new RegExp(V2,"g"),Zi.ALPHANUMERIC=new RegExp(MS,"g");const US=new RegExp("^"+Ga+"$"),DS=new RegExp("^"+V2+"$"),jS=new RegExp("^[A-Z0-9 $%*+\\-./:]+$");Zi.testKanji=function(t){return US.test(t)},Zi.testNumeric=function(t){return DS.test(t)},Zi.testAlphanumeric=function(t){return jS.test(t)},function(t){const e=pp,i=Zi;t.NUMERIC={id:"Numeric",bit:1,ccBits:[10,12,14]},t.ALPHANUMERIC={id:"Alphanumeric",bit:2,ccBits:[9,11,13]},t.BYTE={id:"Byte",bit:4,ccBits:[8,16,16]},t.KANJI={id:"Kanji",bit:8,ccBits:[8,10,12]},t.MIXED={bit:-1},t.getCharCountIndicator=function(s,n){if(!s.ccBits)throw new Error("Invalid mode: "+s);if(!e.isValid(n))throw new Error("Invalid version: "+n);return n>=1&&n<10?s.ccBits[0]:n<27?s.ccBits[1]:s.ccBits[2]},t.getBestModeForData=function(s){return i.testNumeric(s)?t.NUMERIC:i.testAlphanumeric(s)?t.ALPHANUMERIC:i.testKanji(s)?t.KANJI:t.BYTE},t.toString=function(s){if(s&&s.id)return s.id;throw new Error("Invalid mode")},t.isValid=function(s){return s&&s.bit&&s.ccBits};function r(s){if(typeof s!="string")throw new Error("Param is not a string");switch(s.toLowerCase()){case"numeric":return t.NUMERIC;case"alphanumeric":return t.ALPHANUMERIC;case"kanji":return t.KANJI;case"byte":return t.BYTE;default:throw new Error("Unknown mode: "+s)}}t.from=function(s,n){if(t.isValid(s))return s;try{return r(s)}catch{return n}}}(Yr),function(t){const e=ii,i=iu,r=$u,s=Yr,n=pp,o=7973,a=e.getBCHDigit(o);function c(h,p,g){for(let f=1;f<=40;f++)if(p<=t.getCapacity(f,g,h))return f}function l(h,p){return s.getCharCountIndicator(h,p)+4}function u(h,p){let g=0;return h.forEach(function(f){const w=l(f.mode,p);g+=w+f.getBitsLength()}),g}function d(h,p){for(let g=1;g<=40;g++)if(u(h,g)<=t.getCapacity(g,p,s.MIXED))return g}t.from=function(h,p){return n.isValid(h)?parseInt(h,10):p},t.getCapacity=function(h,p,g){if(!n.isValid(h))throw new Error("Invalid QR Code version");typeof g>"u"&&(g=s.BYTE);const f=e.getSymbolTotalCodewords(h),w=i.getTotalCodewordsCount(h,p),m=(f-w)*8;if(g===s.MIXED)return m;const y=m-l(g,h);switch(g){case s.NUMERIC:return Math.floor(y/10*3);case s.ALPHANUMERIC:return Math.floor(y/11*2);case s.KANJI:return Math.floor(y/13);case s.BYTE:default:return Math.floor(y/8)}},t.getBestVersionForData=function(h,p){let g;const f=r.from(p,r.M);if(Array.isArray(h)){if(h.length>1)return d(h,f);if(h.length===0)return 1;g=h[0]}else g=h;return c(g.mode,g.getLength(),f)},t.getEncodedBits=function(h){if(!n.isValid(h)||h<7)throw new Error("Invalid QR Code version");let p=h<<12;for(;e.getBCHDigit(p)-a>=0;)p^=o<<e.getBCHDigit(p)-a;return h<<12|p}}(W2);var K2={};const gp=ii,G2=1335,zS=21522,wf=gp.getBCHDigit(G2);K2.getEncodedBits=function(t,e){const i=t.bit<<3|e;let r=i<<10;for(;gp.getBCHDigit(r)-wf>=0;)r^=G2<<gp.getBCHDigit(r)-wf;return(i<<10|r)^zS};var Z2={};const FS=Yr;function Sn(t){this.mode=FS.NUMERIC,this.data=t.toString()}Sn.getBitsLength=function(t){return 10*Math.floor(t/3)+(t%3?t%3*3+1:0)},Sn.prototype.getLength=function(){return this.data.length},Sn.prototype.getBitsLength=function(){return Sn.getBitsLength(this.data.length)},Sn.prototype.write=function(t){let e,i,r;for(e=0;e+3<=this.data.length;e+=3)i=this.data.substr(e,3),r=parseInt(i,10),t.put(r,10);const s=this.data.length-e;s>0&&(i=this.data.substr(e),r=parseInt(i,10),t.put(r,s*3+1))};var HS=Sn;const qS=Yr,nh=["0","1","2","3","4","5","6","7","8","9","A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"," ","$","%","*","+","-",".","/",":"];function $n(t){this.mode=qS.ALPHANUMERIC,this.data=t}$n.getBitsLength=function(t){return 11*Math.floor(t/2)+6*(t%2)},$n.prototype.getLength=function(){return this.data.length},$n.prototype.getBitsLength=function(){return $n.getBitsLength(this.data.length)},$n.prototype.write=function(t){let e;for(e=0;e+2<=this.data.length;e+=2){let i=nh.indexOf(this.data[e])*45;i+=nh.indexOf(this.data[e+1]),t.put(i,11)}this.data.length%2&&t.put(nh.indexOf(this.data[e]),6)};var WS=$n,VS=function(t){for(var e=[],i=t.length,r=0;r<i;r++){var s=t.charCodeAt(r);if(s>=55296&&s<=56319&&i>r+1){var n=t.charCodeAt(r+1);n>=56320&&n<=57343&&(s=(s-55296)*1024+n-56320+65536,r+=1)}if(s<128){e.push(s);continue}if(s<2048){e.push(s>>6|192),e.push(s&63|128);continue}if(s<55296||s>=57344&&s<65536){e.push(s>>12|224),e.push(s>>6&63|128),e.push(s&63|128);continue}if(s>=65536&&s<=1114111){e.push(s>>18|240),e.push(s>>12&63|128),e.push(s>>6&63|128),e.push(s&63|128);continue}e.push(239,191,189)}return new Uint8Array(e).buffer};const KS=VS,GS=Yr;function kn(t){this.mode=GS.BYTE,typeof t=="string"&&(t=KS(t)),this.data=new Uint8Array(t)}kn.getBitsLength=function(t){return t*8},kn.prototype.getLength=function(){return this.data.length},kn.prototype.getBitsLength=function(){return kn.getBitsLength(this.data.length)},kn.prototype.write=function(t){for(let e=0,i=this.data.length;e<i;e++)t.put(this.data[e],8)};var ZS=kn;const YS=Yr,JS=ii;function Pn(t){this.mode=YS.KANJI,this.data=t}Pn.getBitsLength=function(t){return t*13},Pn.prototype.getLength=function(){return this.data.length},Pn.prototype.getBitsLength=function(){return Pn.getBitsLength(this.data.length)},Pn.prototype.write=function(t){let e;for(e=0;e<this.data.length;e++){let i=JS.toSJIS(this.data[e]);if(i>=33088&&i<=40956)i-=33088;else if(i>=57408&&i<=60351)i-=49472;else throw new Error("Invalid SJIS character: "+this.data[e]+`
Make sure your charset is UTF-8`);i=(i>>>8&255)*192+(i&255),t.put(i,13)}};var XS=Pn,mf={exports:{}};(function(t){var e={single_source_shortest_paths:function(i,r,s){var n={},o={};o[r]=0;var a=e.PriorityQueue.make();a.push(r,0);for(var c,l,u,d,h,p,g,f,w;!a.empty();){c=a.pop(),l=c.value,d=c.cost,h=i[l]||{};for(u in h)h.hasOwnProperty(u)&&(p=h[u],g=d+p,f=o[u],w=typeof o[u]>"u",(w||f>g)&&(o[u]=g,a.push(u,g),n[u]=l))}if(typeof s<"u"&&typeof o[s]>"u"){var m=["Could not find a path from ",r," to ",s,"."].join("");throw new Error(m)}return n},extract_shortest_path_from_predecessor_list:function(i,r){for(var s=[],n=r;n;)s.push(n),i[n],n=i[n];return s.reverse(),s},find_path:function(i,r,s){var n=e.single_source_shortest_paths(i,r,s);return e.extract_shortest_path_from_predecessor_list(n,s)},PriorityQueue:{make:function(i){var r=e.PriorityQueue,s={},n;i=i||{};for(n in r)r.hasOwnProperty(n)&&(s[n]=r[n]);return s.queue=[],s.sorter=i.sorter||r.default_sorter,s},default_sorter:function(i,r){return i.cost-r.cost},push:function(i,r){var s={value:i,cost:r};this.queue.push(s),this.queue.sort(this.sorter)},pop:function(){return this.queue.shift()},empty:function(){return this.queue.length===0}}};t.exports=e})(mf),function(t){const e=Yr,i=HS,r=WS,s=ZS,n=XS,o=Zi,a=ii,c=mf.exports;function l(m){return unescape(encodeURIComponent(m)).length}function u(m,y,b){const v=[];let S;for(;(S=m.exec(b))!==null;)v.push({data:S[0],index:S.index,mode:y,length:S[0].length});return v}function d(m){const y=u(o.NUMERIC,e.NUMERIC,m),b=u(o.ALPHANUMERIC,e.ALPHANUMERIC,m);let v,S;return a.isKanjiModeEnabled()?(v=u(o.BYTE,e.BYTE,m),S=u(o.KANJI,e.KANJI,m)):(v=u(o.BYTE_KANJI,e.BYTE,m),S=[]),y.concat(b,v,S).sort(function(N,P){return N.index-P.index}).map(function(N){return{data:N.data,mode:N.mode,length:N.length}})}function h(m,y){switch(y){case e.NUMERIC:return i.getBitsLength(m);case e.ALPHANUMERIC:return r.getBitsLength(m);case e.KANJI:return n.getBitsLength(m);case e.BYTE:return s.getBitsLength(m)}}function p(m){return m.reduce(function(y,b){const v=y.length-1>=0?y[y.length-1]:null;return v&&v.mode===b.mode?(y[y.length-1].data+=b.data,y):(y.push(b),y)},[])}function g(m){const y=[];for(let b=0;b<m.length;b++){const v=m[b];switch(v.mode){case e.NUMERIC:y.push([v,{data:v.data,mode:e.ALPHANUMERIC,length:v.length},{data:v.data,mode:e.BYTE,length:v.length}]);break;case e.ALPHANUMERIC:y.push([v,{data:v.data,mode:e.BYTE,length:v.length}]);break;case e.KANJI:y.push([v,{data:v.data,mode:e.BYTE,length:l(v.data)}]);break;case e.BYTE:y.push([{data:v.data,mode:e.BYTE,length:l(v.data)}])}}return y}function f(m,y){const b={},v={start:{}};let S=["start"];for(let N=0;N<m.length;N++){const P=m[N],k=[];for(let _=0;_<P.length;_++){const M=P[_],L=""+N+_;k.push(L),b[L]={node:M,lastCount:0},v[L]={};for(let U=0;U<S.length;U++){const K=S[U];b[K]&&b[K].node.mode===M.mode?(v[K][L]=h(b[K].lastCount+M.length,M.mode)-h(b[K].lastCount,M.mode),b[K].lastCount+=M.length):(b[K]&&(b[K].lastCount=M.length),v[K][L]=h(M.length,M.mode)+4+e.getCharCountIndicator(M.mode,y))}}S=k}for(let N=0;N<S.length;N++)v[S[N]].end=0;return{map:v,table:b}}function w(m,y){let b;const v=e.getBestModeForData(m);if(b=e.from(y,v),b!==e.BYTE&&b.bit<v.bit)throw new Error('"'+m+'" cannot be encoded with mode '+e.toString(b)+`.
 Suggested mode is: `+e.toString(v));switch(b===e.KANJI&&!a.isKanjiModeEnabled()&&(b=e.BYTE),b){case e.NUMERIC:return new i(m);case e.ALPHANUMERIC:return new r(m);case e.KANJI:return new n(m);case e.BYTE:return new s(m)}}t.fromArray=function(m){return m.reduce(function(y,b){return typeof b=="string"?y.push(w(b,null)):b.data&&y.push(w(b.data,b.mode)),y},[])},t.fromString=function(m,y){const b=d(m,a.isKanjiModeEnabled()),v=g(b),S=f(v,y),N=c.find_path(S.map,"start","end"),P=[];for(let k=1;k<N.length-1;k++)P.push(S.table[N[k]].node);return t.fromArray(p(P))},t.rawSplit=function(m){return t.fromArray(d(m,a.isKanjiModeEnabled()))}}(Z2);const ku=ii,oh=$u,QS=OS,e$=TS,t$=z2,i$=F2,fp=H2,wp=iu,r$=LS,ru=W2,s$=K2,n$=Yr,ah=Z2;function o$(t,e){const i=t.size,r=i$.getPositions(e);for(let s=0;s<r.length;s++){const n=r[s][0],o=r[s][1];for(let a=-1;a<=7;a++)if(!(n+a<=-1||i<=n+a))for(let c=-1;c<=7;c++)o+c<=-1||i<=o+c||(a>=0&&a<=6&&(c===0||c===6)||c>=0&&c<=6&&(a===0||a===6)||a>=2&&a<=4&&c>=2&&c<=4?t.set(n+a,o+c,!0,!0):t.set(n+a,o+c,!1,!0))}}function a$(t){const e=t.size;for(let i=8;i<e-8;i++){const r=i%2===0;t.set(i,6,r,!0),t.set(6,i,r,!0)}}function c$(t,e){const i=t$.getPositions(e);for(let r=0;r<i.length;r++){const s=i[r][0],n=i[r][1];for(let o=-2;o<=2;o++)for(let a=-2;a<=2;a++)o===-2||o===2||a===-2||a===2||o===0&&a===0?t.set(s+o,n+a,!0,!0):t.set(s+o,n+a,!1,!0)}}function l$(t,e){const i=t.size,r=ru.getEncodedBits(e);let s,n,o;for(let a=0;a<18;a++)s=Math.floor(a/3),n=a%3+i-8-3,o=(r>>a&1)===1,t.set(s,n,o,!0),t.set(n,s,o,!0)}function ch(t,e,i){const r=t.size,s=s$.getEncodedBits(e,i);let n,o;for(n=0;n<15;n++)o=(s>>n&1)===1,n<6?t.set(n,8,o,!0):n<8?t.set(n+1,8,o,!0):t.set(r-15+n,8,o,!0),n<8?t.set(8,r-n-1,o,!0):n<9?t.set(8,15-n-1+1,o,!0):t.set(8,15-n-1,o,!0);t.set(r-8,8,1,!0)}function u$(t,e){const i=t.size;let r=-1,s=i-1,n=7,o=0;for(let a=i-1;a>0;a-=2)for(a===6&&a--;;){for(let c=0;c<2;c++)if(!t.isReserved(s,a-c)){let l=!1;o<e.length&&(l=(e[o]>>>n&1)===1),t.set(s,a-c,l),n--,n===-1&&(o++,n=7)}if(s+=r,s<0||i<=s){s-=r,r=-r;break}}}function d$(t,e,i){const r=new QS;i.forEach(function(c){r.put(c.mode.bit,4),r.put(c.getLength(),n$.getCharCountIndicator(c.mode,t)),c.write(r)});const s=ku.getSymbolTotalCodewords(t),n=wp.getTotalCodewordsCount(t,e),o=(s-n)*8;for(r.getLengthInBits()+4<=o&&r.put(0,4);r.getLengthInBits()%8!==0;)r.putBit(0);const a=(o-r.getLengthInBits())/8;for(let c=0;c<a;c++)r.put(c%2?17:236,8);return h$(r,t,e)}function h$(t,e,i){const r=ku.getSymbolTotalCodewords(e),s=wp.getTotalCodewordsCount(e,i),n=r-s,o=wp.getBlocksCount(e,i),a=r%o,c=o-a,l=Math.floor(r/o),u=Math.floor(n/o),d=u+1,h=l-u,p=new r$(h);let g=0;const f=new Array(o),w=new Array(o);let m=0;const y=new Uint8Array(t.buffer);for(let P=0;P<o;P++){const k=P<c?u:d;f[P]=y.slice(g,g+k),w[P]=p.encode(f[P]),g+=k,m=Math.max(m,k)}const b=new Uint8Array(r);let v=0,S,N;for(S=0;S<m;S++)for(N=0;N<o;N++)S<f[N].length&&(b[v++]=f[N][S]);for(S=0;S<h;S++)for(N=0;N<o;N++)b[v++]=w[N][S];return b}function p$(t,e,i,r){let s;if(Array.isArray(t))s=ah.fromArray(t);else if(typeof t=="string"){let l=e;if(!l){const u=ah.rawSplit(t);l=ru.getBestVersionForData(u,i)}s=ah.fromString(t,l||40)}else throw new Error("Invalid data");const n=ru.getBestVersionForData(s,i);if(!n)throw new Error("The amount of data is too big to be stored in a QR Code");if(!e)e=n;else if(e<n)throw new Error(`
The chosen QR Code version cannot contain this amount of data.
Minimum version required to store current data is: `+n+`.
`);const o=d$(e,i,s),a=ku.getSymbolSize(e),c=new e$(a);return o$(c,e),a$(c),c$(c,e),ch(c,i,0),e>=7&&l$(c,e),u$(c,o),isNaN(r)&&(r=fp.getBestMask(c,ch.bind(null,c,i))),fp.applyMask(r,c),ch(c,i,r),{modules:c,version:e,errorCorrectionLevel:i,maskPattern:r,segments:s}}D2.create=function(t,e){if(typeof t>"u"||t==="")throw new Error("No input text");let i=oh.M,r,s;return typeof e<"u"&&(i=oh.from(e.errorCorrectionLevel,oh.M),r=ru.from(e.version),s=fp.from(e.maskPattern),e.toSJISFunc&&ku.setToSJISFunction(e.toSJISFunc)),p$(t,r,i,s)};var Y2={},mp={};(function(t){function e(i){if(typeof i=="number"&&(i=i.toString()),typeof i!="string")throw new Error("Color should be defined as hex string");let r=i.slice().replace("#","").split("");if(r.length<3||r.length===5||r.length>8)throw new Error("Invalid hex color: "+i);(r.length===3||r.length===4)&&(r=Array.prototype.concat.apply([],r.map(function(n){return[n,n]}))),r.length===6&&r.push("F","F");const s=parseInt(r.join(""),16);return{r:s>>24&255,g:s>>16&255,b:s>>8&255,a:s&255,hex:"#"+r.slice(0,6).join("")}}t.getOptions=function(i){i||(i={}),i.color||(i.color={});const r=typeof i.margin>"u"||i.margin===null||i.margin<0?4:i.margin,s=i.width&&i.width>=21?i.width:void 0,n=i.scale||4;return{width:s,scale:s?4:n,margin:r,color:{dark:e(i.color.dark||"#000000ff"),light:e(i.color.light||"#ffffffff")},type:i.type,rendererOpts:i.rendererOpts||{}}},t.getScale=function(i,r){return r.width&&r.width>=i+r.margin*2?r.width/(i+r.margin*2):r.scale},t.getImageWidth=function(i,r){const s=t.getScale(i,r);return Math.floor((i+r.margin*2)*s)},t.qrToImageData=function(i,r,s){const n=r.modules.size,o=r.modules.data,a=t.getScale(n,s),c=Math.floor((n+s.margin*2)*a),l=s.margin*a,u=[s.color.light,s.color.dark];for(let d=0;d<c;d++)for(let h=0;h<c;h++){let p=(d*c+h)*4,g=s.color.light;if(d>=l&&h>=l&&d<c-l&&h<c-l){const f=Math.floor((d-l)/a),w=Math.floor((h-l)/a);g=u[o[f*n+w]?1:0]}i[p++]=g.r,i[p++]=g.g,i[p++]=g.b,i[p]=g.a}}})(mp),function(t){const e=mp;function i(s,n,o){s.clearRect(0,0,n.width,n.height),n.style||(n.style={}),n.height=o,n.width=o,n.style.height=o+"px",n.style.width=o+"px"}function r(){try{return document.createElement("canvas")}catch{throw new Error("You need to specify a canvas element")}}t.render=function(s,n,o){let a=o,c=n;typeof a>"u"&&(!n||!n.getContext)&&(a=n,n=void 0),n||(c=r()),a=e.getOptions(a);const l=e.getImageWidth(s.modules.size,a),u=c.getContext("2d"),d=u.createImageData(l,l);return e.qrToImageData(d.data,s,a),i(u,c,l),u.putImageData(d,0,0),c},t.renderToDataURL=function(s,n,o){let a=o;typeof a>"u"&&(!n||!n.getContext)&&(a=n,n=void 0),a||(a={});const c=t.render(s,n,a),l=a.type||"image/png",u=a.rendererOpts||{};return c.toDataURL(l,u.quality)}}(Y2);var J2={};const g$=mp;function yf(t,e){const i=t.a/255,r=e+'="'+t.hex+'"';return i<1?r+" "+e+'-opacity="'+i.toFixed(2).slice(1)+'"':r}function lh(t,e,i){let r=t+e;return typeof i<"u"&&(r+=" "+i),r}function f$(t,e,i){let r="",s=0,n=!1,o=0;for(let a=0;a<t.length;a++){const c=Math.floor(a%e),l=Math.floor(a/e);!c&&!n&&(n=!0),t[a]?(o++,a>0&&c>0&&t[a-1]||(r+=n?lh("M",c+i,.5+l+i):lh("m",s,0),s=0,n=!1),c+1<e&&t[a+1]||(r+=lh("h",o),o=0)):s++}return r}J2.render=function(t,e,i){const r=g$.getOptions(e),s=t.modules.size,n=t.modules.data,o=s+r.margin*2,a=r.color.light.a?"<path "+yf(r.color.light,"fill")+' d="M0 0h'+o+"v"+o+'H0z"/>':"",c="<path "+yf(r.color.dark,"stroke")+' d="'+f$(n,s,r.margin)+'"/>',l='viewBox="0 0 '+o+" "+o+'"',u='<svg xmlns="http://www.w3.org/2000/svg" '+(r.width?'width="'+r.width+'" height="'+r.width+'" ':"")+l+' shape-rendering="crispEdges">'+a+c+`</svg>
`;return typeof i=="function"&&i(null,u),u};const w$=kS,yp=D2,bf=Y2,m$=J2;function uh(t,e,i,r,s){const n=[].slice.call(arguments,1),o=n.length,a=typeof n[o-1]=="function";if(!a&&!w$())throw new Error("Callback required as last argument");if(a){if(o<2)throw new Error("Too few arguments provided");o===2?(s=i,i=e,e=r=void 0):o===3&&(e.getContext&&typeof s>"u"?(s=r,r=void 0):(s=r,r=i,i=e,e=void 0))}else{if(o<1)throw new Error("Too few arguments provided");return o===1?(i=e,e=r=void 0):o===2&&!e.getContext&&(r=i,i=e,e=void 0),new Promise(function(c,l){try{const u=yp.create(i,r);c(t(u,e,r))}catch(u){l(u)}})}try{const c=yp.create(i,r);s(null,t(c,e,r))}catch(c){s(c)}}ta.create=yp.create,ta.toCanvas=uh.bind(null,bf.render),ta.toDataURL=uh.bind(null,bf.renderToDataURL),ta.toString=uh.bind(null,function(t,e,i){return m$.render(t,i)});const y$=.1,vf=2.5,cr=7;function dh(t,e,i){return t===e?!1:(t-e<0?e-t:t-e)<=i+y$}function b$(t,e){const i=Array.prototype.slice.call(ta.create(t,{errorCorrectionLevel:e}).modules.data,0),r=Math.sqrt(i.length);return i.reduce((s,n,o)=>(o%r===0?s.push([n]):s[s.length-1].push(n))&&s,[])}const v$={generate({uri:t,size:e,logoSize:i,dotColor:r="#141414"}){const s="transparent",n=[],o=b$(t,"Q"),a=e/o.length,c=[{x:0,y:0},{x:1,y:0},{x:0,y:1}];c.forEach(({x:g,y:f})=>{const w=(o.length-cr)*a*g,m=(o.length-cr)*a*f,y=.45;for(let b=0;b<c.length;b+=1){const v=a*(cr-b*2);n.push(W`
            <rect
              fill=${b===2?r:s}
              width=${b===0?v-5:v}
              rx= ${b===0?(v-5)*y:v*y}
              ry= ${b===0?(v-5)*y:v*y}
              stroke=${r}
              stroke-width=${b===0?5:0}
              height=${b===0?v-5:v}
              x= ${b===0?m+a*b+5/2:m+a*b}
              y= ${b===0?w+a*b+5/2:w+a*b}
            />
          `)}});const l=Math.floor((i+25)/a),u=o.length/2-l/2,d=o.length/2+l/2-1,h=[];o.forEach((g,f)=>{g.forEach((w,m)=>{if(o[f][m]&&!(f<cr&&m<cr||f>o.length-(cr+1)&&m<cr||f<cr&&m>o.length-(cr+1))&&!(f>u&&f<d&&m>u&&m<d)){const y=f*a+a/2,b=m*a+a/2;h.push([y,b])}})});const p={};return h.forEach(([g,f])=>{var w;p[g]?(w=p[g])==null||w.push(f):p[g]=[f]}),Object.entries(p).map(([g,f])=>{const w=f.filter(m=>f.every(y=>!dh(m,y,a)));return[Number(g),w]}).forEach(([g,f])=>{f.forEach(w=>{n.push(W`<circle cx=${g} cy=${w} fill=${r} r=${a/vf} />`)})}),Object.entries(p).filter(([g,f])=>f.length>1).map(([g,f])=>{const w=f.filter(m=>f.some(y=>dh(m,y,a)));return[Number(g),w]}).map(([g,f])=>{f.sort((m,y)=>m<y?-1:1);const w=[];for(const m of f){const y=w.find(b=>b.some(v=>dh(m,v,a)));y?y.push(m):w.push([m])}return[g,w.map(m=>[m[0],m[m.length-1]])]}).forEach(([g,f])=>{f.forEach(([w,m])=>{n.push(W`
              <line
                x1=${g}
                x2=${g}
                y1=${w}
                y2=${m}
                stroke=${r}
                stroke-width=${a/(vf/2)}
                stroke-linecap="round"
              />
            `)})}),n}};var C$=le`
  :host {
    position: relative;
    user-select: none;
    display: block;
    overflow: hidden;
    aspect-ratio: 1 / 1;
    width: var(--local-size);
  }

  :host([data-theme='dark']) {
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px);
    background-color: var(--wui-color-inverse-100);
    padding: var(--wui-spacing-l);
  }

  :host([data-theme='light']) {
    box-shadow: 0 0 0 1px var(--wui-color-bg-125);
    background-color: var(--wui-color-bg-125);
  }

  :host([data-clear='true']) > wui-icon {
    display: none;
  }

  svg:first-child,
  wui-image,
  wui-icon {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateY(-50%) translateX(-50%);
  }

  wui-image {
    width: 25%;
    height: 25%;
    border-radius: var(--wui-border-radius-xs);
  }

  wui-icon {
    width: 100%;
    height: 100%;
    color: var(--local-icon-color) !important;
    transform: translateY(-50%) translateX(-50%) scale(0.25);
  }
`,lr=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const E$="#3396ff";let Si=class extends te{constructor(){super(...arguments),this.uri="",this.size=0,this.theme="dark",this.imageSrc=void 0,this.alt=void 0,this.arenaClear=void 0,this.farcaster=void 0}render(){return this.dataset.theme=this.theme,this.dataset.clear=String(this.arenaClear),this.style.cssText=`
     --local-size: ${this.size}px;
     --local-icon-color: ${this.color??E$}
    `,A`${this.templateVisual()} ${this.templateSvg()}`}templateSvg(){const t=this.theme==="light"?this.size:this.size-32;return W`
      <svg height=${t} width=${t}>
        ${v$.generate({uri:this.uri,size:t,logoSize:this.arenaClear?0:t/4,dotColor:this.color})}
      </svg>
    `}templateVisual(){return this.imageSrc?A`<wui-image src=${this.imageSrc} alt=${this.alt??"logo"}></wui-image>`:this.farcaster?A`<wui-icon
        class="farcaster"
        size="inherit"
        color="inherit"
        name="farcaster"
      ></wui-icon>`:A`<wui-icon size="inherit" color="inherit" name="walletConnect"></wui-icon>`}};Si.styles=[$e,C$],lr([$()],Si.prototype,"uri",void 0),lr([$({type:Number})],Si.prototype,"size",void 0),lr([$()],Si.prototype,"theme",void 0),lr([$()],Si.prototype,"imageSrc",void 0),lr([$()],Si.prototype,"alt",void 0),lr([$()],Si.prototype,"color",void 0),lr([$({type:Boolean})],Si.prototype,"arenaClear",void 0),lr([$({type:Boolean})],Si.prototype,"farcaster",void 0),Si=lr([ee("wui-qr-code")],Si);var x$=le`
  :host {
    display: block;
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-005);
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-200) 5%,
      var(--wui-color-bg-200) 48%,
      var(--wui-color-bg-300) 55%,
      var(--wui-color-bg-300) 60%,
      var(--wui-color-bg-300) calc(60% + 10px),
      var(--wui-color-bg-200) calc(60% + 12px),
      var(--wui-color-bg-200) 100%
    );
    background-size: 250%;
    animation: shimmer 3s linear infinite reverse;
  }

  :host([variant='light']) {
    background: linear-gradient(
      120deg,
      var(--wui-color-bg-150) 5%,
      var(--wui-color-bg-150) 48%,
      var(--wui-color-bg-200) 55%,
      var(--wui-color-bg-200) 60%,
      var(--wui-color-bg-200) calc(60% + 10px),
      var(--wui-color-bg-150) calc(60% + 12px),
      var(--wui-color-bg-150) 100%
    );
    background-size: 250%;
  }

  @keyframes shimmer {
    from {
      background-position: -250% 0;
    }
    to {
      background-position: 250% 0;
    }
  }
`,zo=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ds=class extends te{constructor(){super(...arguments),this.width="",this.height="",this.borderRadius="m",this.variant="default"}render(){return this.style.cssText=`
      width: ${this.width};
      height: ${this.height};
      border-radius: ${`clamp(0px,var(--wui-border-radius-${this.borderRadius}), 40px)`};
    `,A`<slot></slot>`}};ds.styles=[x$],zo([$()],ds.prototype,"width",void 0),zo([$()],ds.prototype,"height",void 0),zo([$()],ds.prototype,"borderRadius",void 0),zo([$()],ds.prototype,"variant",void 0),ds=zo([ee("wui-shimmer")],ds);var I$=le`
  .reown-logo {
    height: var(--wui-spacing-xxl);
  }
`,A$=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let hh=class extends te{render(){return A`
      <wui-flex
        justifyContent="center"
        alignItems="center"
        gap="xs"
        .padding=${["0","0","l","0"]}
      >
        <wui-text variant="small-500" color="fg-100"> UX by </wui-text>
        <wui-icon name="reown" size="xxxl" class="reown-logo"></wui-icon>
      </wui-flex>
    `}};hh.styles=[$e,xt,I$],hh=A$([ee("wui-ux-by-reown")],hh);var _$=le`
  @keyframes fadein {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  wui-shimmer {
    width: 100%;
    aspect-ratio: 1 / 1;
    border-radius: clamp(0px, var(--wui-border-radius-l), 40px) !important;
  }

  wui-qr-code {
    opacity: 0;
    animation-duration: 200ms;
    animation-timing-function: ease;
    animation-name: fadein;
    animation-fill-mode: forwards;
  }
`,N$=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ph=class extends vt{constructor(){var t;super(),this.forceUpdate=()=>{this.requestUpdate()},window.addEventListener("resize",this.forceUpdate),me.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:((t=this.wallet)==null?void 0:t.name)??"WalletConnect",platform:"qrcode"}})}disconnectedCallback(){var t;super.disconnectedCallback(),(t=this.unsubscribe)==null||t.forEach(e=>e()),window.removeEventListener("resize",this.forceUpdate)}render(){return this.onRenderProxy(),A`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["0","xl","xl","xl"]}
        gap="xl"
      >
        <wui-shimmer borderRadius="l" width="100%"> ${this.qrCodeTemplate()} </wui-shimmer>

        <wui-text variant="paragraph-500" color="fg-100">
          Scan this QR Code with your phone
        </wui-text>
        ${this.copyTemplate()}
      </wui-flex>
      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}onRenderProxy(){!this.ready&&this.uri&&(this.timeout=setTimeout(()=>{this.ready=!0},200))}qrCodeTemplate(){if(!this.uri||!this.ready)return null;const t=this.getBoundingClientRect().width-40,e=this.wallet?this.wallet.name:void 0;return ne.setWcLinking(void 0),ne.setRecentWallet(this.wallet),A` <wui-qr-code
      size=${t}
      theme=${st.state.themeMode}
      uri=${this.uri}
      imageSrc=${ce(ot.getWalletImage(this.wallet))}
      color=${ce(st.state.themeVariables["--w3m-qr-color"])}
      alt=${ce(e)}
      data-testid="wui-qr-code"
    ></wui-qr-code>`}copyTemplate(){const t=!this.uri||!this.ready;return A`<wui-link
      .disabled=${t}
      @click=${this.onCopyUri}
      color="fg-200"
      data-testid="copy-wc2-uri"
    >
      <wui-icon size="xs" color="fg-200" slot="iconLeft" name="copy"></wui-icon>
      Copy link
    </wui-link>`}};ph.styles=_$,ph=N$([ee("w3m-connecting-wc-qrcode")],ph);var S$=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Cf=class extends te{constructor(){var t;if(super(),this.wallet=(t=Y.state.data)==null?void 0:t.wallet,!this.wallet)throw new Error("w3m-connecting-wc-unsupported: No wallet provided");me.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"browser"}})}render(){return A`
      <wui-flex
        flexDirection="column"
        alignItems="center"
        .padding=${["3xl","xl","xl","xl"]}
        gap="xl"
      >
        <wui-wallet-image
          size="lg"
          imageSrc=${ce(ot.getWalletImage(this.wallet))}
        ></wui-wallet-image>

        <wui-text variant="paragraph-500" color="fg-100">Not Detected</wui-text>
      </wui-flex>

      <w3m-mobile-download-links .wallet=${this.wallet}></w3m-mobile-download-links>
    `}};Cf=S$([ee("w3m-connecting-wc-unsupported")],Cf);var Ef=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let gh=class extends vt{constructor(){if(super(),this.isLoading=!0,!this.wallet)throw new Error("w3m-connecting-wc-web: No wallet provided");this.onConnect=this.onConnectProxy.bind(this),this.secondaryBtnLabel="Open",this.secondaryLabel="Open and continue in a new browser tab",this.secondaryBtnIcon="externalLink",this.updateLoadingState(),this.unsubscribe.push(ne.subscribeKey("wcUri",()=>{this.updateLoadingState()})),me.sendEvent({type:"track",event:"SELECT_WALLET",properties:{name:this.wallet.name,platform:"web"}})}updateLoadingState(){this.isLoading=!this.uri}onConnectProxy(){var t;if((t=this.wallet)!=null&&t.webapp_link&&this.uri)try{this.error=!1;const{webapp_link:e,name:i}=this.wallet,{redirect:r,href:s}=q.formatUniversalUrl(e,this.uri);ne.setWcLinking({name:i,href:s}),ne.setRecentWallet(this.wallet),q.openHref(r,"_blank")}catch{this.error=!0}}};Ef([Q()],gh.prototype,"isLoading",void 0),gh=Ef([ee("w3m-connecting-wc-web")],gh);var yl=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Fo=class extends te{constructor(){var t;super(),this.wallet=(t=Y.state.data)==null?void 0:t.wallet,this.platform=void 0,this.platforms=[],this.isSiwxEnabled=!!j.state.siwx,this.determinePlatforms(),this.initializeConnection()}render(){return A`
      ${this.headerTemplate()}
      <div>${this.platformTemplate()}</div>
      <wui-ux-by-reown></wui-ux-by-reown>
    `}async initializeConnection(t=!1){if(!(this.platform==="browser"||j.state.manualWCControl&&!t))try{const{wcPairingExpiry:e,status:i}=ne.state;(t||j.state.enableEmbedded||q.isPairingExpired(e)||i==="connecting")&&(await ne.connectWalletConnect(),this.isSiwxEnabled||Ie.close())}catch(e){me.sendEvent({type:"track",event:"CONNECT_ERROR",properties:{message:(e==null?void 0:e.message)??"Unknown"}}),ne.setWcError(!0),De.showError(e.message??"Connection error"),ne.resetWcConnection(),Y.goBack()}}determinePlatforms(){if(!this.wallet){this.platforms.push("qrcode"),this.platform="qrcode";return}if(this.platform)return;const{mobile_link:t,desktop_link:e,webapp_link:i,injected:r,rdns:s}=this.wallet,n=r==null?void 0:r.map(({injected_id:p})=>p).filter(Boolean),o=[...s?[s]:n??[]],a=j.state.isUniversalProvider?!1:o.length,c=t,l=i,u=ne.checkInstalled(o),d=a&&u,h=e&&!q.isMobile();d&&!C.state.noAdapters&&this.platforms.push("browser"),c&&this.platforms.push(q.isMobile()?"mobile":"qrcode"),l&&this.platforms.push("web"),h&&this.platforms.push("desktop"),!d&&a&&!C.state.noAdapters&&this.platforms.push("unsupported"),this.platform=this.platforms[0]}platformTemplate(){switch(this.platform){case"browser":return A`<w3m-connecting-wc-browser></w3m-connecting-wc-browser>`;case"web":return A`<w3m-connecting-wc-web></w3m-connecting-wc-web>`;case"desktop":return A`
          <w3m-connecting-wc-desktop .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-desktop>
        `;case"mobile":return A`
          <w3m-connecting-wc-mobile isMobile .onRetry=${()=>this.initializeConnection(!0)}>
          </w3m-connecting-wc-mobile>
        `;case"qrcode":return A`<w3m-connecting-wc-qrcode></w3m-connecting-wc-qrcode>`;default:return A`<w3m-connecting-wc-unsupported></w3m-connecting-wc-unsupported>`}}headerTemplate(){return this.platforms.length>1?A`
      <w3m-connecting-header
        .platforms=${this.platforms}
        .onSelectPlatfrom=${this.onSelectPlatform.bind(this)}
      >
      </w3m-connecting-header>
    `:null}async onSelectPlatform(t){var i;const e=(i=this.shadowRoot)==null?void 0:i.querySelector("div");e&&(await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.platform=t,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}};yl([Q()],Fo.prototype,"platform",void 0),yl([Q()],Fo.prototype,"platforms",void 0),yl([Q()],Fo.prototype,"isSiwxEnabled",void 0),Fo=yl([ee("w3m-connecting-wc-view")],Fo);var xf=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Ll=class extends te{constructor(){super(...arguments),this.isMobile=q.isMobile()}render(){if(this.isMobile){const{featured:t,recommended:e}=J.state,{customWallets:i}=j.state,r=ie.getRecentWallets(),s=t.length||e.length||(i==null?void 0:i.length)||r.length;return A`<wui-flex
        flexDirection="column"
        gap="xs"
        .margin=${["3xs","s","s","s"]}
      >
        ${s?A`<w3m-connector-list></w3m-connector-list>`:null}
        <w3m-all-wallets-widget></w3m-all-wallets-widget>
      </wui-flex>`}return A`<wui-flex flexDirection="column" .padding=${["0","0","l","0"]}>
      <w3m-connecting-wc-view></w3m-connecting-wc-view>
      <wui-flex flexDirection="column" .padding=${["0","m","0","m"]}>
        <w3m-all-wallets-widget></w3m-all-wallets-widget> </wui-flex
    ></wui-flex>`}};xf([Q()],Ll.prototype,"isMobile",void 0),Ll=xf([ee("w3m-connecting-wc-basic-view")],Ll);/**
* @license
* Copyright 2020 Google LLC
* SPDX-License-Identifier: BSD-3-Clause
*/const r0=()=>new $$;class $${}const fh=new WeakMap,s0=i0(class extends B2{render(t){return Xe}update(t,[e]){var r;const i=e!==this.G;return i&&this.G!==void 0&&this.rt(void 0),(i||this.lt!==this.ct)&&(this.G=e,this.ht=(r=t.options)==null?void 0:r.host,this.rt(this.ct=t.element)),Xe}rt(t){if(this.isConnected||(t=void 0),typeof this.G=="function"){const e=this.ht??globalThis;let i=fh.get(e);i===void 0&&(i=new WeakMap,fh.set(e,i)),i.get(this.G)!==void 0&&this.G.call(this.ht,void 0),i.set(this.G,t),t!==void 0&&this.G.call(this.ht,t)}else this.G.value=t}get lt(){var t,e;return typeof this.G=="function"?(t=fh.get(this.ht??globalThis))==null?void 0:t.get(this.G):(e=this.G)==null?void 0:e.value}disconnected(){this.lt===this.ct&&this.rt(void 0)}reconnected(){this.rt(this.ct)}});var k$=le`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  label {
    position: relative;
    display: inline-block;
    width: 32px;
    height: 22px;
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;
  }

  span {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--wui-color-blue-100);
    border-width: 1px;
    border-style: solid;
    border-color: var(--wui-color-gray-glass-002);
    border-radius: 999px;
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color;
  }

  span:before {
    position: absolute;
    content: '';
    height: 16px;
    width: 16px;
    left: 3px;
    top: 2px;
    background-color: var(--wui-color-inverse-100);
    transition: transform var(--wui-ease-inout-power-1) var(--wui-duration-lg);
    will-change: transform;
    border-radius: 50%;
  }

  input:checked + span {
    border-color: var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-blue-100);
  }

  input:not(:checked) + span {
    background-color: var(--wui-color-gray-glass-010);
  }

  input:checked + span:before {
    transform: translateX(calc(100% - 7px));
  }
`,If=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let bl=class extends te{constructor(){super(...arguments),this.inputElementRef=r0(),this.checked=void 0}render(){return A`
      <label>
        <input
          ${s0(this.inputElementRef)}
          type="checkbox"
          ?checked=${ce(this.checked)}
          @change=${this.dispatchChangeEvent.bind(this)}
        />
        <span></span>
      </label>
    `}dispatchChangeEvent(){var t;this.dispatchEvent(new CustomEvent("switchChange",{detail:(t=this.inputElementRef.value)==null?void 0:t.checked,bubbles:!0,composed:!0}))}};bl.styles=[$e,xt,hc,k$],If([$({type:Boolean})],bl.prototype,"checked",void 0),bl=If([ee("wui-switch")],bl);var P$=le`
  :host {
    height: 100%;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    column-gap: var(--wui-spacing-1xs);
    padding: var(--wui-spacing-xs) var(--wui-spacing-s);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    transition: background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: background-color;
    cursor: pointer;
  }

  wui-switch {
    pointer-events: none;
  }
`,Af=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let vl=class extends te{constructor(){super(...arguments),this.checked=void 0}render(){return A`
      <button>
        <wui-icon size="xl" name="walletConnectBrown"></wui-icon>
        <wui-switch ?checked=${ce(this.checked)}></wui-switch>
      </button>
    `}};vl.styles=[$e,xt,P$],Af([$({type:Boolean})],vl.prototype,"checked",void 0),vl=Af([ee("wui-certified-switch")],vl);var O$=le`
  button {
    background-color: var(--wui-color-fg-300);
    border-radius: var(--wui-border-radius-4xs);
    width: 16px;
    height: 16px;
  }

  button:disabled {
    background-color: var(--wui-color-bg-300);
  }

  wui-icon {
    color: var(--wui-color-bg-200) !important;
  }

  button:focus-visible {
    background-color: var(--wui-color-fg-250);
    border: 1px solid var(--wui-color-accent-100);
  }

  @media (hover: hover) and (pointer: fine) {
    button:hover:enabled {
      background-color: var(--wui-color-fg-250);
    }

    button:active:enabled {
      background-color: var(--wui-color-fg-225);
    }
  }
`,_f=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Cl=class extends te{constructor(){super(...arguments),this.icon="copy"}render(){return A`
      <button>
        <wui-icon color="inherit" size="xxs" name=${this.icon}></wui-icon>
      </button>
    `}};Cl.styles=[$e,xt,O$],_f([$()],Cl.prototype,"icon",void 0),Cl=_f([ee("wui-input-element")],Cl);var T$=le`
  :host {
    position: relative;
    width: 100%;
    display: inline-block;
    color: var(--wui-color-fg-275);
  }

  input {
    width: 100%;
    border-radius: var(--wui-border-radius-xs);
    box-shadow: inset 0 0 0 1px var(--wui-color-gray-glass-002);
    background: var(--wui-color-gray-glass-002);
    font-size: var(--wui-font-size-paragraph);
    letter-spacing: var(--wui-letter-spacing-paragraph);
    color: var(--wui-color-fg-100);
    transition:
      background-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      border-color var(--wui-ease-inout-power-1) var(--wui-duration-md),
      box-shadow var(--wui-ease-inout-power-1) var(--wui-duration-md);
    will-change: background-color, border-color, box-shadow;
    caret-color: var(--wui-color-accent-100);
  }

  input:disabled {
    cursor: not-allowed;
    border: 1px solid var(--wui-color-gray-glass-010);
  }

  input:disabled::placeholder,
  input:disabled + wui-icon {
    color: var(--wui-color-fg-300);
  }

  input::placeholder {
    color: var(--wui-color-fg-275);
  }

  input:focus:enabled {
    background-color: var(--wui-color-gray-glass-005);
    -webkit-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    -moz-box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
    box-shadow:
      inset 0 0 0 1px var(--wui-color-accent-100),
      0px 0px 0px 4px var(--wui-box-shadow-blue);
  }

  input:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  wui-icon {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
  }

  .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px var(--wui-spacing-s);
  }

  wui-icon + .wui-size-sm {
    padding: 9px var(--wui-spacing-m) 10px 36px;
  }

  wui-icon[data-input='sm'] {
    left: var(--wui-spacing-s);
  }

  .wui-size-md {
    padding: 15px var(--wui-spacing-m) var(--wui-spacing-l) var(--wui-spacing-m);
  }

  wui-icon + .wui-size-md,
  wui-loading-spinner + .wui-size-md {
    padding: 10.5px var(--wui-spacing-3xl) 10.5px var(--wui-spacing-3xl);
  }

  wui-icon[data-input='md'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-lg {
    padding: var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-s) var(--wui-spacing-l);
    letter-spacing: var(--wui-letter-spacing-medium-title);
    font-size: var(--wui-font-size-medium-title);
    font-weight: var(--wui-font-weight-light);
    line-height: 130%;
    color: var(--wui-color-fg-100);
    height: 64px;
  }

  .wui-padding-right-xs {
    padding-right: var(--wui-spacing-xs);
  }

  .wui-padding-right-s {
    padding-right: var(--wui-spacing-s);
  }

  .wui-padding-right-m {
    padding-right: var(--wui-spacing-m);
  }

  .wui-padding-right-l {
    padding-right: var(--wui-spacing-l);
  }

  .wui-padding-right-xl {
    padding-right: var(--wui-spacing-xl);
  }

  .wui-padding-right-2xl {
    padding-right: var(--wui-spacing-2xl);
  }

  .wui-padding-right-3xl {
    padding-right: var(--wui-spacing-3xl);
  }

  .wui-padding-right-4xl {
    padding-right: var(--wui-spacing-4xl);
  }

  .wui-padding-right-5xl {
    padding-right: var(--wui-spacing-5xl);
  }

  wui-icon + .wui-size-lg,
  wui-loading-spinner + .wui-size-lg {
    padding-left: 50px;
  }

  wui-icon[data-input='lg'] {
    left: var(--wui-spacing-l);
  }

  .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-m) 17.25px var(--wui-spacing-m);
  }
  wui-icon + .wui-size-mdl,
  wui-loading-spinner + .wui-size-mdl {
    padding: 17.25px var(--wui-spacing-3xl) 17.25px 40px;
  }
  wui-icon[data-input='mdl'] {
    left: var(--wui-spacing-m);
  }

  input:placeholder-shown ~ ::slotted(wui-input-element),
  input:placeholder-shown ~ ::slotted(wui-icon) {
    opacity: 0;
    pointer-events: none;
  }

  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type='number'] {
    -moz-appearance: textfield;
  }

  ::slotted(wui-input-element),
  ::slotted(wui-icon) {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
  }

  ::slotted(wui-input-element) {
    right: var(--wui-spacing-m);
  }

  ::slotted(wui-icon) {
    right: 0px;
  }
`,Fi=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let gi=class extends te{constructor(){super(...arguments),this.inputElementRef=r0(),this.size="md",this.disabled=!1,this.placeholder="",this.type="text",this.value=""}render(){const t=`wui-padding-right-${this.inputRightPadding}`,e={[`wui-size-${this.size}`]:!0,[t]:!!this.inputRightPadding};return A`${this.templateIcon()}
      <input
        data-testid="wui-input-text"
        ${s0(this.inputElementRef)}
        class=${U2(e)}
        type=${this.type}
        enterkeyhint=${ce(this.enterKeyHint)}
        ?disabled=${this.disabled}
        placeholder=${this.placeholder}
        @input=${this.dispatchInputChangeEvent.bind(this)}
        .value=${this.value||""}
        tabindex=${ce(this.tabIdx)}
      />
      <slot></slot>`}templateIcon(){return this.icon?A`<wui-icon
        data-input=${this.size}
        size=${this.size}
        color="inherit"
        name=${this.icon}
      ></wui-icon>`:null}dispatchInputChangeEvent(){var t;this.dispatchEvent(new CustomEvent("inputChange",{detail:(t=this.inputElementRef.value)==null?void 0:t.value,bubbles:!0,composed:!0}))}};gi.styles=[$e,xt,T$],Fi([$()],gi.prototype,"size",void 0),Fi([$()],gi.prototype,"icon",void 0),Fi([$({type:Boolean})],gi.prototype,"disabled",void 0),Fi([$()],gi.prototype,"placeholder",void 0),Fi([$()],gi.prototype,"type",void 0),Fi([$()],gi.prototype,"keyHint",void 0),Fi([$()],gi.prototype,"value",void 0),Fi([$()],gi.prototype,"inputRightPadding",void 0),Fi([$()],gi.prototype,"tabIdx",void 0),gi=Fi([ee("wui-input-text")],gi);var R$=le`
  :host {
    position: relative;
    display: inline-block;
    width: 100%;
  }
`,L$=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let wh=class extends te{constructor(){super(...arguments),this.inputComponentRef=r0()}render(){return A`
      <wui-input-text
        ${s0(this.inputComponentRef)}
        placeholder="Search wallet"
        icon="search"
        type="search"
        enterKeyHint="search"
        size="sm"
      >
        <wui-input-element @click=${this.clearValue} icon="close"></wui-input-element>
      </wui-input-text>
    `}clearValue(){var e;const t=(e=this.inputComponentRef.value)==null?void 0:e.inputElementRef.value;t&&(t.value="",t.focus(),t.dispatchEvent(new Event("input")))}};wh.styles=[$e,R$],wh=L$([ee("wui-search-bar")],wh);const M$=W`<svg  viewBox="0 0 48 54" fill="none">
  <path
    d="M43.4605 10.7248L28.0485 1.61089C25.5438 0.129705 22.4562 0.129705 19.9515 1.61088L4.53951 10.7248C2.03626 12.2051 0.5 14.9365 0.5 17.886V36.1139C0.5 39.0635 2.03626 41.7949 4.53951 43.2752L19.9515 52.3891C22.4562 53.8703 25.5438 53.8703 28.0485 52.3891L43.4605 43.2752C45.9637 41.7949 47.5 39.0635 47.5 36.114V17.8861C47.5 14.9365 45.9637 12.2051 43.4605 10.7248Z"
  />
</svg>`;var B$=le`
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-xs) 10px;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    position: relative;
  }

  wui-shimmer[data-type='network'] {
    border: none;
    -webkit-clip-path: var(--wui-path-network);
    clip-path: var(--wui-path-network);
  }

  svg {
    position: absolute;
    width: 48px;
    height: 54px;
    z-index: 1;
  }

  svg > path {
    stroke: var(--wui-color-gray-glass-010);
    stroke-width: 1px;
  }

  @media (max-width: 350px) {
    :host {
      width: 100%;
    }
  }
`,Nf=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let El=class extends te{constructor(){super(...arguments),this.type="wallet"}render(){return A`
      ${this.shimmerTemplate()}
      <wui-shimmer width="56px" height="20px" borderRadius="xs"></wui-shimmer>
    `}shimmerTemplate(){return this.type==="network"?A` <wui-shimmer
          data-type=${this.type}
          width="48px"
          height="54px"
          borderRadius="xs"
        ></wui-shimmer>
        ${M$}`:A`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}};El.styles=[$e,xt,B$],Nf([$()],El.prototype,"type",void 0),El=Nf([ee("wui-card-select-loader")],El);var U$=le`
  :host {
    display: grid;
    width: inherit;
    height: inherit;
  }
`,fi=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Dt=class extends te{render(){return this.style.cssText=`
      grid-template-rows: ${this.gridTemplateRows};
      grid-template-columns: ${this.gridTemplateColumns};
      justify-items: ${this.justifyItems};
      align-items: ${this.alignItems};
      justify-content: ${this.justifyContent};
      align-content: ${this.alignContent};
      column-gap: ${this.columnGap&&`var(--wui-spacing-${this.columnGap})`};
      row-gap: ${this.rowGap&&`var(--wui-spacing-${this.rowGap})`};
      gap: ${this.gap&&`var(--wui-spacing-${this.gap})`};
      padding-top: ${this.padding&&ht.getSpacingStyles(this.padding,0)};
      padding-right: ${this.padding&&ht.getSpacingStyles(this.padding,1)};
      padding-bottom: ${this.padding&&ht.getSpacingStyles(this.padding,2)};
      padding-left: ${this.padding&&ht.getSpacingStyles(this.padding,3)};
      margin-top: ${this.margin&&ht.getSpacingStyles(this.margin,0)};
      margin-right: ${this.margin&&ht.getSpacingStyles(this.margin,1)};
      margin-bottom: ${this.margin&&ht.getSpacingStyles(this.margin,2)};
      margin-left: ${this.margin&&ht.getSpacingStyles(this.margin,3)};
    `,A`<slot></slot>`}};Dt.styles=[$e,U$],fi([$()],Dt.prototype,"gridTemplateRows",void 0),fi([$()],Dt.prototype,"gridTemplateColumns",void 0),fi([$()],Dt.prototype,"justifyItems",void 0),fi([$()],Dt.prototype,"alignItems",void 0),fi([$()],Dt.prototype,"justifyContent",void 0),fi([$()],Dt.prototype,"alignContent",void 0),fi([$()],Dt.prototype,"columnGap",void 0),fi([$()],Dt.prototype,"rowGap",void 0),fi([$()],Dt.prototype,"gap",void 0),fi([$()],Dt.prototype,"padding",void 0),fi([$()],Dt.prototype,"margin",void 0),Dt=fi([ee("wui-grid")],Dt);var D$=le`
  button {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    width: 104px;
    row-gap: var(--wui-spacing-xs);
    padding: var(--wui-spacing-s) var(--wui-spacing-0);
    background-color: var(--wui-color-gray-glass-002);
    border-radius: clamp(0px, var(--wui-border-radius-xs), 20px);
    transition:
      color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1),
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: background-color, color, border-radius;
    outline: none;
    border: none;
  }

  button > wui-flex > wui-text {
    color: var(--wui-color-fg-100);
    max-width: 86px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    justify-content: center;
  }

  button > wui-flex > wui-text.certified {
    max-width: 66px;
  }

  button:hover:enabled {
    background-color: var(--wui-color-gray-glass-005);
  }

  button:disabled > wui-flex > wui-text {
    color: var(--wui-color-gray-glass-015);
  }

  [data-selected='true'] {
    background-color: var(--wui-color-accent-glass-020);
  }

  @media (hover: hover) and (pointer: fine) {
    [data-selected='true']:hover:enabled {
      background-color: var(--wui-color-accent-glass-015);
    }
  }

  [data-selected='true']:active:enabled {
    background-color: var(--wui-color-accent-glass-010);
  }

  @media (max-width: 350px) {
    button {
      width: 100%;
    }
  }
`,Ho=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let hs=class extends te{constructor(){super(),this.observer=new IntersectionObserver(()=>{}),this.visible=!1,this.imageSrc=void 0,this.imageLoading=!1,this.wallet=void 0,this.observer=new IntersectionObserver(t=>{t.forEach(e=>{e.isIntersecting?(this.visible=!0,this.fetchImageSrc()):this.visible=!1})},{threshold:.01})}firstUpdated(){this.observer.observe(this)}disconnectedCallback(){this.observer.disconnect()}render(){var e,i;const t=((e=this.wallet)==null?void 0:e.badge_type)==="certified";return A`
      <button>
        ${this.imageTemplate()}
        <wui-flex flexDirection="row" alignItems="center" justifyContent="center" gap="3xs">
          <wui-text
            variant="tiny-500"
            color="inherit"
            class=${ce(t?"certified":void 0)}
            >${(i=this.wallet)==null?void 0:i.name}</wui-text
          >
          ${t?A`<wui-icon size="sm" name="walletConnectBrown"></wui-icon>`:null}
        </wui-flex>
      </button>
    `}imageTemplate(){var t,e;return!this.visible&&!this.imageSrc||this.imageLoading?this.shimmerTemplate():A`
      <wui-wallet-image
        size="md"
        imageSrc=${ce(this.imageSrc)}
        name=${(t=this.wallet)==null?void 0:t.name}
        .installed=${(e=this.wallet)==null?void 0:e.installed}
        badgeSize="sm"
      >
      </wui-wallet-image>
    `}shimmerTemplate(){return A`<wui-shimmer width="56px" height="56px" borderRadius="xs"></wui-shimmer>`}async fetchImageSrc(){this.wallet&&(this.imageSrc=ot.getWalletImage(this.wallet),!this.imageSrc&&(this.imageLoading=!0,this.imageSrc=await ot.fetchWalletImage(this.wallet.image_id),this.imageLoading=!1))}};hs.styles=D$,Ho([Q()],hs.prototype,"visible",void 0),Ho([Q()],hs.prototype,"imageSrc",void 0),Ho([Q()],hs.prototype,"imageLoading",void 0),Ho([$()],hs.prototype,"wallet",void 0),hs=Ho([ee("w3m-all-wallets-list-item")],hs);var j$=le`
  wui-grid {
    max-height: clamp(360px, 400px, 80vh);
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    padding-top: var(--wui-spacing-l);
    padding-bottom: var(--wui-spacing-l);
    justify-content: center;
    grid-column: 1 / span 4;
  }
`,qo=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const Sf="local-paginator";let ps=class extends te{constructor(){super(),this.unsubscribe=[],this.paginationObserver=void 0,this.loading=!J.state.wallets.length,this.wallets=J.state.wallets,this.recommended=J.state.recommended,this.featured=J.state.featured,this.unsubscribe.push(J.subscribeKey("wallets",t=>this.wallets=t),J.subscribeKey("recommended",t=>this.recommended=t),J.subscribeKey("featured",t=>this.featured=t))}firstUpdated(){this.initialFetch(),this.createPaginationObserver()}disconnectedCallback(){var t;this.unsubscribe.forEach(e=>e()),(t=this.paginationObserver)==null||t.disconnect()}render(){return A`
      <wui-grid
        data-scroll=${!this.loading}
        .padding=${["0","s","s","s"]}
        columnGap="xxs"
        rowGap="l"
        justifyContent="space-between"
      >
        ${this.loading?this.shimmerTemplate(16):this.walletsTemplate()}
        ${this.paginationLoaderTemplate()}
      </wui-grid>
    `}async initialFetch(){var e;this.loading=!0;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-grid");t&&(await J.fetchWalletsByPage({page:1}),await t.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.loading=!1,t.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}shimmerTemplate(t,e){return[...Array(t)].map(()=>A`
        <wui-card-select-loader type="wallet" id=${ce(e)}></wui-card-select-loader>
      `)}walletsTemplate(){const t=q.uniqueBy([...this.featured,...this.recommended,...this.wallets],"id");return Vs.markWalletsAsInstalled(t).map(e=>A`
        <w3m-all-wallets-list-item
          @click=${()=>this.onConnectWallet(e)}
          .wallet=${e}
        ></w3m-all-wallets-list-item>
      `)}paginationLoaderTemplate(){const{wallets:t,recommended:e,featured:i,count:r}=J.state,s=window.innerWidth<352?3:4,n=t.length+e.length;let o=Math.ceil(n/s)*s-n+s;return o-=t.length?i.length%s:0,r===0&&i.length>0?null:r===0||[...i,...t,...e].length<r?this.shimmerTemplate(o,Sf):null}createPaginationObserver(){var e;const t=(e=this.shadowRoot)==null?void 0:e.querySelector(`#${Sf}`);t&&(this.paginationObserver=new IntersectionObserver(([i])=>{if(i!=null&&i.isIntersecting&&!this.loading){const{page:r,count:s,wallets:n}=J.state;n.length<s&&J.fetchWalletsByPage({page:r+1})}}),this.paginationObserver.observe(t))}onConnectWallet(t){X.selectWalletConnector(t)}};ps.styles=j$,qo([Q()],ps.prototype,"loading",void 0),qo([Q()],ps.prototype,"wallets",void 0),qo([Q()],ps.prototype,"recommended",void 0),qo([Q()],ps.prototype,"featured",void 0),ps=qo([ee("w3m-all-wallets-list")],ps);var z$=le`
  wui-grid,
  wui-loading-spinner,
  wui-flex {
    height: 360px;
  }

  wui-grid {
    overflow: scroll;
    scrollbar-width: none;
    grid-auto-rows: min-content;
    grid-template-columns: repeat(auto-fill, 104px);
  }

  wui-grid[data-scroll='false'] {
    overflow: hidden;
  }

  wui-grid::-webkit-scrollbar {
    display: none;
  }

  wui-loading-spinner {
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 350px) {
    wui-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`,xl=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let xn=class extends te{constructor(){super(...arguments),this.prevQuery="",this.prevBadge=void 0,this.loading=!0,this.query=""}render(){return this.onSearch(),this.loading?A`<wui-loading-spinner color="accent-100"></wui-loading-spinner>`:this.walletsTemplate()}async onSearch(){(this.query.trim()!==this.prevQuery.trim()||this.badge!==this.prevBadge)&&(this.prevQuery=this.query,this.prevBadge=this.badge,this.loading=!0,await J.searchWallet({search:this.query,badge:this.badge}),this.loading=!1)}walletsTemplate(){const{search:t}=J.state,e=Vs.markWalletsAsInstalled(t);return t.length?A`
      <wui-grid
        data-testid="wallet-list"
        .padding=${["0","s","s","s"]}
        rowGap="l"
        columnGap="xs"
        justifyContent="space-between"
      >
        ${e.map(i=>A`
            <w3m-all-wallets-list-item
              @click=${()=>this.onConnectWallet(i)}
              .wallet=${i}
              data-testid="wallet-search-item-${i.id}"
            ></w3m-all-wallets-list-item>
          `)}
      </wui-grid>
    `:A`
        <wui-flex
          data-testid="no-wallet-found"
          justifyContent="center"
          alignItems="center"
          gap="s"
          flexDirection="column"
        >
          <wui-icon-box
            size="lg"
            iconColor="fg-200"
            backgroundColor="fg-300"
            icon="wallet"
            background="transparent"
          ></wui-icon-box>
          <wui-text data-testid="no-wallet-found-text" color="fg-200" variant="paragraph-500">
            No Wallet found
          </wui-text>
        </wui-flex>
      `}onConnectWallet(t){X.selectWalletConnector(t)}};xn.styles=z$,xl([Q()],xn.prototype,"loading",void 0),xl([$()],xn.prototype,"query",void 0),xl([$()],xn.prototype,"badge",void 0),xn=xl([ee("w3m-all-wallets-search")],xn);var mh=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ra=class extends te{constructor(){super(...arguments),this.search="",this.onDebouncedSearch=q.debounce(t=>{this.search=t})}render(){const t=this.search.length>=2;return A`
      <wui-flex .padding=${["0","s","s","s"]} gap="xs">
        <wui-search-bar @inputChange=${this.onInputChange.bind(this)}></wui-search-bar>
        <wui-certified-switch
          ?checked=${this.badge}
          @click=${this.onClick.bind(this)}
          data-testid="wui-certified-switch"
        ></wui-certified-switch>
        ${this.qrButtonTemplate()}
      </wui-flex>
      ${t||this.badge?A`<w3m-all-wallets-search
            query=${this.search}
            badge=${ce(this.badge)}
          ></w3m-all-wallets-search>`:A`<w3m-all-wallets-list badge=${ce(this.badge)}></w3m-all-wallets-list>`}
    `}onInputChange(t){this.onDebouncedSearch(t.detail)}onClick(){if(this.badge==="certified"){this.badge=void 0;return}this.badge="certified",De.showSvg("Only WalletConnect certified",{icon:"walletConnectBrown",iconColor:"accent-100"})}qrButtonTemplate(){return q.isMobile()?A`
        <wui-icon-box
          size="lg"
          iconSize="xl"
          iconColor="accent-100"
          backgroundColor="accent-100"
          icon="qrCode"
          background="transparent"
          border
          borderColor="wui-accent-glass-010"
          @click=${this.onWalletConnectQr.bind(this)}
        ></wui-icon-box>
      `:null}onWalletConnectQr(){Y.push("ConnectingWalletConnect")}};mh([Q()],ra.prototype,"search",void 0),mh([Q()],ra.prototype,"badge",void 0),ra=mh([ee("w3m-all-wallets-view")],ra);var F$=le`
  button {
    column-gap: var(--wui-spacing-s);
    padding: 11px 18px 11px var(--wui-spacing-s);
    width: 100%;
    background-color: var(--wui-color-gray-glass-002);
    border-radius: var(--wui-border-radius-xs);
    color: var(--wui-color-fg-250);
    transition:
      color var(--wui-ease-out-power-1) var(--wui-duration-md),
      background-color var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: color, background-color;
  }

  button[data-iconvariant='square'],
  button[data-iconvariant='square-blue'] {
    padding: 6px 18px 6px 9px;
  }

  button > wui-flex {
    flex: 1;
  }

  button > wui-image {
    width: 32px;
    height: 32px;
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
    border-radius: var(--wui-border-radius-3xl);
  }

  button > wui-icon {
    width: 36px;
    height: 36px;
    transition: opacity var(--wui-ease-out-power-1) var(--wui-duration-md);
    will-change: opacity;
  }

  button > wui-icon-box[data-variant='blue'] {
    box-shadow: 0 0 0 2px var(--wui-color-accent-glass-005);
  }

  button > wui-icon-box[data-variant='overlay'] {
    box-shadow: 0 0 0 2px var(--wui-color-gray-glass-005);
  }

  button > wui-icon-box[data-variant='square-blue'] {
    border-radius: var(--wui-border-radius-3xs);
    position: relative;
    border: none;
    width: 36px;
    height: 36px;
  }

  button > wui-icon-box[data-variant='square-blue']::after {
    content: '';
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    border-radius: inherit;
    border: 1px solid var(--wui-color-accent-glass-010);
    pointer-events: none;
  }

  button > wui-icon:last-child {
    width: 14px;
    height: 14px;
  }

  button:disabled {
    color: var(--wui-color-gray-glass-020);
  }

  button[data-loading='true'] > wui-icon {
    opacity: 0;
  }

  wui-loading-spinner {
    position: absolute;
    right: 18px;
    top: 50%;
    transform: translateY(-50%);
  }
`,$i=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Xt=class extends te{constructor(){super(...arguments),this.tabIdx=void 0,this.variant="icon",this.disabled=!1,this.imageSrc=void 0,this.alt=void 0,this.chevron=!1,this.loading=!1}render(){return A`
      <button
        ?disabled=${this.loading?!0:!!this.disabled}
        data-loading=${this.loading}
        data-iconvariant=${ce(this.iconVariant)}
        tabindex=${ce(this.tabIdx)}
      >
        ${this.loadingTemplate()} ${this.visualTemplate()}
        <wui-flex gap="3xs">
          <slot></slot>
        </wui-flex>
        ${this.chevronTemplate()}
      </button>
    `}visualTemplate(){if(this.variant==="image"&&this.imageSrc)return A`<wui-image src=${this.imageSrc} alt=${this.alt??"list item"}></wui-image>`;if(this.iconVariant==="square"&&this.icon&&this.variant==="icon")return A`<wui-icon name=${this.icon}></wui-icon>`;if(this.variant==="icon"&&this.icon&&this.iconVariant){const t=["blue","square-blue"].includes(this.iconVariant)?"accent-100":"fg-200",e=this.iconVariant==="square-blue"?"mdl":"md",i=this.iconSize?this.iconSize:e;return A`
        <wui-icon-box
          data-variant=${this.iconVariant}
          icon=${this.icon}
          iconSize=${i}
          background="transparent"
          iconColor=${t}
          backgroundColor=${t}
          size=${e}
        ></wui-icon-box>
      `}return null}loadingTemplate(){return this.loading?A`<wui-loading-spinner
        data-testid="wui-list-item-loading-spinner"
        color="fg-300"
      ></wui-loading-spinner>`:A``}chevronTemplate(){return this.chevron?A`<wui-icon size="inherit" color="fg-200" name="chevronRight"></wui-icon>`:null}};Xt.styles=[$e,xt,F$],$i([$()],Xt.prototype,"icon",void 0),$i([$()],Xt.prototype,"iconSize",void 0),$i([$()],Xt.prototype,"tabIdx",void 0),$i([$()],Xt.prototype,"variant",void 0),$i([$()],Xt.prototype,"iconVariant",void 0),$i([$({type:Boolean})],Xt.prototype,"disabled",void 0),$i([$()],Xt.prototype,"imageSrc",void 0),$i([$()],Xt.prototype,"alt",void 0),$i([$({type:Boolean})],Xt.prototype,"chevron",void 0),$i([$({type:Boolean})],Xt.prototype,"loading",void 0),Xt=$i([ee("wui-list-item")],Xt);var H$=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let bp=class extends te{constructor(){var t;super(...arguments),this.wallet=(t=Y.state.data)==null?void 0:t.wallet}render(){if(!this.wallet)throw new Error("w3m-downloads-view");return A`
      <wui-flex gap="xs" flexDirection="column" .padding=${["s","s","l","s"]}>
        ${this.chromeTemplate()} ${this.iosTemplate()} ${this.androidTemplate()}
        ${this.homepageTemplate()}
      </wui-flex>
    `}chromeTemplate(){var t;return(t=this.wallet)!=null&&t.chrome_store?A`<wui-list-item
      variant="icon"
      icon="chromeStore"
      iconVariant="square"
      @click=${this.onChromeStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Chrome Extension</wui-text>
    </wui-list-item>`:null}iosTemplate(){var t;return(t=this.wallet)!=null&&t.app_store?A`<wui-list-item
      variant="icon"
      icon="appStore"
      iconVariant="square"
      @click=${this.onAppStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">iOS App</wui-text>
    </wui-list-item>`:null}androidTemplate(){var t;return(t=this.wallet)!=null&&t.play_store?A`<wui-list-item
      variant="icon"
      icon="playStore"
      iconVariant="square"
      @click=${this.onPlayStore.bind(this)}
      chevron
    >
      <wui-text variant="paragraph-500" color="fg-100">Android App</wui-text>
    </wui-list-item>`:null}homepageTemplate(){var t;return(t=this.wallet)!=null&&t.homepage?A`
      <wui-list-item
        variant="icon"
        icon="browser"
        iconVariant="square-blue"
        @click=${this.onHomePage.bind(this)}
        chevron
      >
        <wui-text variant="paragraph-500" color="fg-100">Website</wui-text>
      </wui-list-item>
    `:null}onChromeStore(){var t;(t=this.wallet)!=null&&t.chrome_store&&q.openHref(this.wallet.chrome_store,"_blank")}onAppStore(){var t;(t=this.wallet)!=null&&t.app_store&&q.openHref(this.wallet.app_store,"_blank")}onPlayStore(){var t;(t=this.wallet)!=null&&t.play_store&&q.openHref(this.wallet.play_store,"_blank")}onHomePage(){var t;(t=this.wallet)!=null&&t.homepage&&q.openHref(this.wallet.homepage,"_blank")}};bp=H$([ee("w3m-downloads-view")],bp);var q$=Object.freeze({__proto__:null,get W3mConnectingWcBasicView(){return Ll},get W3mAllWalletsView(){return ra},get W3mDownloadsView(){return bp}}),W$=le`
  :host {
    display: block;
    border-radius: clamp(0px, var(--wui-border-radius-l), 44px);
    box-shadow: 0 0 0 1px var(--wui-color-gray-glass-005);
    background-color: var(--wui-color-modal-bg);
    overflow: hidden;
  }

  :host([data-embedded='true']) {
    box-shadow:
      0 0 0 1px var(--wui-color-gray-glass-005),
      0px 4px 12px 4px var(--w3m-card-embedded-shadow-color);
  }
`,V$=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let yh=class extends te{render(){return A`<slot></slot>`}};yh.styles=[$e,W$],yh=V$([ee("wui-card")],yh);var K$=le`
  :host {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-dark-glass-100);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-325);
    box-shadow: 0px 0px 16px 0px rgba(0, 0, 0, 0.25);
  }

  wui-flex {
    width: 100%;
  }

  wui-text {
    word-break: break-word;
    flex: 1;
  }

  .close {
    cursor: pointer;
  }

  .icon-box {
    height: 40px;
    width: 40px;
    border-radius: var(--wui-border-radius-3xs);
    background-color: var(--local-icon-bg-value);
  }
`,Wo=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let gs=class extends te{constructor(){super(...arguments),this.message="",this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="info"}render(){return this.style.cssText=`
      --local-icon-bg-value: var(--wui-color-${this.backgroundColor});
   `,A`
      <wui-flex flexDirection="row" justifyContent="space-between" alignItems="center">
        <wui-flex columnGap="xs" flexDirection="row" alignItems="center">
          <wui-flex
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
            class="icon-box"
          >
            <wui-icon color=${this.iconColor} size="md" name=${this.icon}></wui-icon>
          </wui-flex>
          <wui-text variant="small-500" color="bg-350" data-testid="wui-alertbar-text"
            >${this.message}</wui-text
          >
        </wui-flex>
        <wui-icon
          class="close"
          color="bg-350"
          size="sm"
          name="close"
          @click=${this.onClose}
        ></wui-icon>
      </wui-flex>
    `}onClose(){Hr.close()}};gs.styles=[$e,K$],Wo([$()],gs.prototype,"message",void 0),Wo([$()],gs.prototype,"backgroundColor",void 0),Wo([$()],gs.prototype,"iconColor",void 0),Wo([$()],gs.prototype,"icon",void 0),gs=Wo([ee("wui-alertbar")],gs);var G$=le`
  :host {
    display: block;
    position: absolute;
    top: var(--wui-spacing-s);
    left: var(--wui-spacing-l);
    right: var(--wui-spacing-l);
    opacity: 0;
    pointer-events: none;
  }
`,$f=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const Z$={info:{backgroundColor:"fg-350",iconColor:"fg-325",icon:"info"},success:{backgroundColor:"success-glass-reown-020",iconColor:"success-125",icon:"checkmark"},warning:{backgroundColor:"warning-glass-reown-020",iconColor:"warning-100",icon:"warningCircle"},error:{backgroundColor:"error-glass-reown-020",iconColor:"error-125",icon:"exclamationTriangle"}};let Il=class extends te{constructor(){super(),this.unsubscribe=[],this.open=Hr.state.open,this.onOpen(!0),this.unsubscribe.push(Hr.subscribeKey("open",t=>{this.open=t,this.onOpen(!1)}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){const{message:t,variant:e}=Hr.state,i=Z$[e];return A`
      <wui-alertbar
        message=${t}
        backgroundColor=${i==null?void 0:i.backgroundColor}
        iconColor=${i==null?void 0:i.iconColor}
        icon=${i==null?void 0:i.icon}
      ></wui-alertbar>
    `}onOpen(t){this.open?(this.animate([{opacity:0,transform:"scale(0.85)"},{opacity:1,transform:"scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: auto"):t||(this.animate([{opacity:1,transform:"scale(1)"},{opacity:0,transform:"scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"}),this.style.cssText="pointer-events: none")}};Il.styles=G$,$f([Q()],Il.prototype,"open",void 0),Il=$f([ee("w3m-alertbar")],Il);var Y$=le`
  button {
    border-radius: var(--local-border-radius);
    color: var(--wui-color-fg-100);
    padding: var(--local-padding);
  }

  @media (max-width: 700px) {
    button {
      padding: var(--wui-spacing-s);
    }
  }

  button > wui-icon {
    pointer-events: none;
  }

  button:disabled > wui-icon {
    color: var(--wui-color-bg-300) !important;
  }

  button:disabled {
    background-color: transparent;
  }
`,Vo=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let fs=class extends te{constructor(){super(...arguments),this.size="md",this.disabled=!1,this.icon="copy",this.iconColor="inherit"}render(){const t=this.size==="lg"?"--wui-border-radius-xs":"--wui-border-radius-xxs",e=this.size==="lg"?"--wui-spacing-1xs":"--wui-spacing-2xs";return this.style.cssText=`
    --local-border-radius: var(${t});
    --local-padding: var(${e});
`,A`
      <button ?disabled=${this.disabled}>
        <wui-icon color=${this.iconColor} size=${this.size} name=${this.icon}></wui-icon>
      </button>
    `}};fs.styles=[$e,xt,hc,Y$],Vo([$()],fs.prototype,"size",void 0),Vo([$({type:Boolean})],fs.prototype,"disabled",void 0),Vo([$()],fs.prototype,"icon",void 0),Vo([$()],fs.prototype,"iconColor",void 0),fs=Vo([ee("wui-icon-link")],fs);var J$=le`
  button {
    display: block;
    display: flex;
    align-items: center;
    padding: var(--wui-spacing-xxs);
    gap: var(--wui-spacing-xxs);
    transition: all var(--wui-ease-out-power-1) var(--wui-duration-md);
    border-radius: var(--wui-border-radius-xxs);
  }

  wui-image {
    border-radius: 100%;
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  wui-icon-box {
    width: var(--wui-spacing-xl);
    height: var(--wui-spacing-xl);
  }

  button:hover {
    background-color: var(--wui-color-gray-glass-002);
  }

  button:active {
    background-color: var(--wui-color-gray-glass-005);
  }
`,kf=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Al=class extends te{constructor(){super(...arguments),this.imageSrc=""}render(){return A`<button>
      ${this.imageTemplate()}
      <wui-icon size="xs" color="fg-200" name="chevronBottom"></wui-icon>
    </button>`}imageTemplate(){return this.imageSrc?A`<wui-image src=${this.imageSrc} alt="select visual"></wui-image>`:A`<wui-icon-box
      size="xxs"
      iconColor="fg-200"
      backgroundColor="fg-100"
      background="opaque"
      icon="networkPlaceholder"
    ></wui-icon-box>`}};Al.styles=[$e,xt,hc,J$],kf([$()],Al.prototype,"imageSrc",void 0),Al=kf([ee("wui-select")],Al);var X$=le`
  :host {
    height: 64px;
  }

  wui-text {
    text-transform: capitalize;
  }

  wui-flex.w3m-header-title {
    transform: translateY(0);
    opacity: 1;
  }

  wui-flex.w3m-header-title[view-direction='prev'] {
    animation:
      slide-down-out 120ms forwards var(--wui-ease-out-power-2),
      slide-down-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-flex.w3m-header-title[view-direction='next'] {
    animation:
      slide-up-out 120ms forwards var(--wui-ease-out-power-2),
      slide-up-in 120ms forwards var(--wui-ease-out-power-2);
    animation-delay: 0ms, 200ms;
  }

  wui-icon-link[data-hidden='true'] {
    opacity: 0 !important;
    pointer-events: none;
  }

  @keyframes slide-up-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(3px);
      opacity: 0;
    }
  }

  @keyframes slide-up-in {
    from {
      transform: translateY(-3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }

  @keyframes slide-down-out {
    from {
      transform: translateY(0px);
      opacity: 1;
    }
    to {
      transform: translateY(-3px);
      opacity: 0;
    }
  }

  @keyframes slide-down-in {
    from {
      transform: translateY(3px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`,Hi=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const Q$=["SmartSessionList"];function bh(){var n,o,a,c,l,u,d;const t=(o=(n=Y.state.data)==null?void 0:n.connector)==null?void 0:o.name,e=(c=(a=Y.state.data)==null?void 0:a.wallet)==null?void 0:c.name,i=(u=(l=Y.state.data)==null?void 0:l.network)==null?void 0:u.name,r=e??t,s=X.getConnectors();return{Connect:`Connect ${s.length===1&&((d=s[0])==null?void 0:d.id)==="w3m-email"?"Email":""} Wallet`,Create:"Create Wallet",ChooseAccountName:void 0,Account:void 0,AccountSettings:void 0,AllWallets:"All Wallets",ApproveTransaction:"Approve Transaction",BuyInProgress:"Buy",ConnectingExternal:r??"Connect Wallet",ConnectingWalletConnect:r??"WalletConnect",ConnectingWalletConnectBasic:"WalletConnect",ConnectingSiwe:"Sign In",Convert:"Convert",ConvertSelectToken:"Select token",ConvertPreview:"Preview convert",Downloads:r?`Get ${r}`:"Downloads",EmailLogin:"Email Login",EmailVerifyOtp:"Confirm Email",EmailVerifyDevice:"Register Device",GetWallet:"Get a wallet",Networks:"Choose Network",OnRampProviders:"Choose Provider",OnRampActivity:"Activity",OnRampTokenSelect:"Select Token",OnRampFiatSelect:"Select Currency",Profile:void 0,SwitchNetwork:i??"Switch Network",SwitchAddress:"Switch Address",Transactions:"Activity",UnsupportedChain:"Switch Network",UpgradeEmailWallet:"Upgrade your Wallet",UpdateEmailWallet:"Edit Email",UpdateEmailPrimaryOtp:"Confirm Current Email",UpdateEmailSecondaryOtp:"Confirm New Email",WhatIsABuy:"What is Buy?",RegisterAccountName:"Choose name",RegisterAccountNameSuccess:"",WalletReceive:"Receive",WalletCompatibleNetworks:"Compatible Networks",Swap:"Swap",SwapSelectToken:"Select token",SwapPreview:"Preview swap",WalletSend:"Send",WalletSendPreview:"Review send",WalletSendSelectToken:"Select Token",WhatIsANetwork:"What is a network?",WhatIsAWallet:"What is a wallet?",ConnectWallets:"Connect wallet",ConnectSocials:"All socials",ConnectingSocial:ae.state.socialProvider?ae.state.socialProvider:"Connect Social",ConnectingMultiChain:"Select chain",ConnectingFarcaster:"Farcaster",SwitchActiveChain:"Switch chain",SmartSessionCreated:void 0,SmartSessionList:"Smart Sessions",SIWXSignMessage:"Sign In"}}let wi=class extends te{constructor(){super(),this.unsubscribe=[],this.heading=bh()[Y.state.view],this.network=C.state.activeCaipNetwork,this.networkImage=ot.getNetworkImage(this.network),this.buffering=!1,this.showBack=!1,this.prevHistoryLength=1,this.view=Y.state.view,this.viewDirection="",this.headerText=bh()[Y.state.view],this.unsubscribe.push(qt.subscribeNetworkImages(()=>{this.networkImage=ot.getNetworkImage(this.network)}),Y.subscribeKey("view",t=>{setTimeout(()=>{this.view=t,this.headerText=bh()[t]},zr.ANIMATION_DURATIONS.HeaderText),this.onViewChange(),this.onHistoryChange()}),ne.subscribeKey("buffering",t=>this.buffering=t),C.subscribeKey("activeCaipNetwork",t=>{this.network=t,this.networkImage=ot.getNetworkImage(this.network)}))}disconnectCallback(){this.unsubscribe.forEach(t=>t())}render(){return A`
      <wui-flex .padding=${this.getPadding()} justifyContent="space-between" alignItems="center">
        ${this.leftHeaderTemplate()} ${this.titleTemplate()} ${this.rightHeaderTemplate()}
      </wui-flex>
    `}onWalletHelp(){me.sendEvent({type:"track",event:"CLICK_WALLET_HELP"}),Y.push("WhatIsAWallet")}async onClose(){Y.state.view==="UnsupportedChain"||await qr.isSIWXCloseDisabled()?Ie.shake():Ie.close()}rightHeaderTemplate(){var e,i;const t=(i=(e=j==null?void 0:j.state)==null?void 0:e.features)==null?void 0:i.smartSessions;return Y.state.view!=="Account"||!t?this.closeButtonTemplate():A`<wui-flex>
      <wui-icon-link
        icon="clock"
        @click=${()=>Y.push("SmartSessionList")}
        data-testid="w3m-header-smart-sessions"
      ></wui-icon-link>
      ${this.closeButtonTemplate()}
    </wui-flex> `}closeButtonTemplate(){return A`
      <wui-icon-link
        ?disabled=${this.buffering}
        icon="close"
        @click=${this.onClose.bind(this)}
        data-testid="w3m-header-close"
      ></wui-icon-link>
    `}titleTemplate(){const t=Q$.includes(this.view);return A`
      <wui-flex
        view-direction="${this.viewDirection}"
        class="w3m-header-title"
        alignItems="center"
        gap="xs"
      >
        <wui-text variant="paragraph-700" color="fg-100" data-testid="w3m-header-text"
          >${this.headerText}</wui-text
        >
        ${t?A`<wui-tag variant="main">Beta</wui-tag>`:null}
      </wui-flex>
    `}leftHeaderTemplate(){var c;const{view:t}=Y.state,e=t==="Connect",i=j.state.enableEmbedded,r=t==="ApproveTransaction",s=t==="ConnectingSiwe",n=t==="Account",o=j.state.enableNetworkSwitch,a=r||s||e&&i;return n&&o?A`<wui-select
        id="dynamic"
        data-testid="w3m-account-select-network"
        active-network=${ce((c=this.network)==null?void 0:c.name)}
        @click=${this.onNetworks.bind(this)}
        imageSrc=${ce(this.networkImage)}
      ></wui-select>`:this.showBack&&!a?A`<wui-icon-link
        data-testid="header-back"
        id="dynamic"
        icon="chevronLeft"
        ?disabled=${this.buffering}
        @click=${this.onGoBack.bind(this)}
      ></wui-icon-link>`:A`<wui-icon-link
      data-hidden=${!e}
      id="dynamic"
      icon="helpCircle"
      @click=${this.onWalletHelp.bind(this)}
    ></wui-icon-link>`}onNetworks(){this.isAllowedNetworkSwitch()&&(me.sendEvent({type:"track",event:"CLICK_NETWORKS"}),Y.push("Networks"))}isAllowedNetworkSwitch(){const t=C.getAllRequestedCaipNetworks(),e=t?t.length>1:!1,i=t==null?void 0:t.find(({id:r})=>{var s;return r===((s=this.network)==null?void 0:s.id)});return e||!i}getPadding(){return this.heading?["l","2l","l","2l"]:["0","2l","0","2l"]}onViewChange(){const{history:t}=Y.state;let e=zr.VIEW_DIRECTION.Next;t.length<this.prevHistoryLength&&(e=zr.VIEW_DIRECTION.Prev),this.prevHistoryLength=t.length,this.viewDirection=e}async onHistoryChange(){var i;const{history:t}=Y.state,e=(i=this.shadowRoot)==null?void 0:i.querySelector("#dynamic");t.length>1&&!this.showBack&&e?(await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!0,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"})):t.length<=1&&this.showBack&&e&&(await e.animate([{opacity:1},{opacity:0}],{duration:200,fill:"forwards",easing:"ease"}).finished,this.showBack=!1,e.animate([{opacity:0},{opacity:1}],{duration:200,fill:"forwards",easing:"ease"}))}onGoBack(){Y.goBack()}};wi.styles=X$,Hi([Q()],wi.prototype,"heading",void 0),Hi([Q()],wi.prototype,"network",void 0),Hi([Q()],wi.prototype,"networkImage",void 0),Hi([Q()],wi.prototype,"buffering",void 0),Hi([Q()],wi.prototype,"showBack",void 0),Hi([Q()],wi.prototype,"prevHistoryLength",void 0),Hi([Q()],wi.prototype,"view",void 0),Hi([Q()],wi.prototype,"viewDirection",void 0),Hi([Q()],wi.prototype,"headerText",void 0),wi=Hi([ee("w3m-header")],wi);var ek=le`
  :host {
    display: flex;
    column-gap: var(--wui-spacing-s);
    align-items: center;
    padding: var(--wui-spacing-xs) var(--wui-spacing-m) var(--wui-spacing-xs) var(--wui-spacing-xs);
    border-radius: var(--wui-border-radius-s);
    border: 1px solid var(--wui-color-gray-glass-005);
    box-sizing: border-box;
    background-color: var(--wui-color-bg-175);
    box-shadow:
      0px 14px 64px -4px rgba(0, 0, 0, 0.15),
      0px 8px 22px -6px rgba(0, 0, 0, 0.15);

    max-width: 300px;
  }

  :host wui-loading-spinner {
    margin-left: var(--wui-spacing-3xs);
  }
`,ws=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ur=class extends te{constructor(){super(...arguments),this.backgroundColor="accent-100",this.iconColor="accent-100",this.icon="checkmark",this.message="",this.loading=!1,this.iconType="default"}render(){return A`
      ${this.templateIcon()}
      <wui-text variant="paragraph-500" color="fg-100" data-testid="wui-snackbar-message"
        >${this.message}</wui-text
      >
    `}templateIcon(){return this.loading?A`<wui-loading-spinner size="md" color="accent-100"></wui-loading-spinner>`:this.iconType==="default"?A`<wui-icon size="xl" color=${this.iconColor} name=${this.icon}></wui-icon>`:A`<wui-icon-box
      size="sm"
      iconSize="xs"
      iconColor=${this.iconColor}
      backgroundColor=${this.backgroundColor}
      icon=${this.icon}
      background="opaque"
    ></wui-icon-box>`}};ur.styles=[$e,ek],ws([$()],ur.prototype,"backgroundColor",void 0),ws([$()],ur.prototype,"iconColor",void 0),ws([$()],ur.prototype,"icon",void 0),ws([$()],ur.prototype,"message",void 0),ws([$()],ur.prototype,"loading",void 0),ws([$()],ur.prototype,"iconType",void 0),ur=ws([ee("wui-snackbar")],ur);var tk=le`
  :host {
    display: block;
    position: absolute;
    opacity: 0;
    pointer-events: none;
    top: 11px;
    left: 50%;
    width: max-content;
  }
`,Pf=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const ik={loading:void 0,success:{backgroundColor:"success-100",iconColor:"success-100",icon:"checkmark"},error:{backgroundColor:"error-100",iconColor:"error-100",icon:"close"}};let _l=class extends te{constructor(){super(),this.unsubscribe=[],this.timeout=void 0,this.open=De.state.open,this.unsubscribe.push(De.subscribeKey("open",t=>{this.open=t,this.onOpen()}))}disconnectedCallback(){clearTimeout(this.timeout),this.unsubscribe.forEach(t=>t())}render(){const{message:t,variant:e,svg:i}=De.state,r=ik[e],{icon:s,iconColor:n}=i??r??{};return A`
      <wui-snackbar
        message=${t}
        backgroundColor=${r==null?void 0:r.backgroundColor}
        iconColor=${n}
        icon=${s}
        .loading=${e==="loading"}
      ></wui-snackbar>
    `}onOpen(){clearTimeout(this.timeout),this.open?(this.animate([{opacity:0,transform:"translateX(-50%) scale(0.85)"},{opacity:1,transform:"translateX(-50%) scale(1)"}],{duration:150,fill:"forwards",easing:"ease"}),this.timeout&&clearTimeout(this.timeout),De.state.autoClose&&(this.timeout=setTimeout(()=>De.hide(),2500))):this.animate([{opacity:1,transform:"translateX(-50%) scale(1)"},{opacity:0,transform:"translateX(-50%) scale(0.85)"}],{duration:150,fill:"forwards",easing:"ease"})}};_l.styles=tk,Pf([Q()],_l.prototype,"open",void 0),_l=Pf([ee("w3m-snackbar")],_l);var rk=le`
  :host {
    pointer-events: none;
  }

  :host > wui-flex {
    display: var(--w3m-tooltip-display);
    opacity: var(--w3m-tooltip-opacity);
    padding: 9px var(--wui-spacing-s) 10px var(--wui-spacing-s);
    border-radius: var(--wui-border-radius-xxs);
    color: var(--wui-color-bg-100);
    position: fixed;
    top: var(--w3m-tooltip-top);
    left: var(--w3m-tooltip-left);
    transform: translate(calc(-50% + var(--w3m-tooltip-parent-width)), calc(-100% - 8px));
    max-width: calc(var(--w3m-modal-width) - var(--wui-spacing-xl));
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host([data-variant='shade']) > wui-flex {
    background-color: var(--wui-color-bg-150);
    border: 1px solid var(--wui-color-gray-glass-005);
  }

  :host([data-variant='shade']) > wui-flex > wui-text {
    color: var(--wui-color-fg-150);
  }

  :host([data-variant='fill']) > wui-flex {
    background-color: var(--wui-color-fg-100);
    border: none;
  }

  wui-icon {
    position: absolute;
    width: 12px !important;
    height: 4px !important;
    color: var(--wui-color-bg-150);
  }

  wui-icon[data-placement='top'] {
    bottom: 0px;
    left: 50%;
    transform: translate(-50%, 95%);
  }

  wui-icon[data-placement='bottom'] {
    top: 0;
    left: 50%;
    transform: translate(-50%, -95%) rotate(180deg);
  }

  wui-icon[data-placement='right'] {
    top: 50%;
    left: 0;
    transform: translate(-65%, -50%) rotate(90deg);
  }

  wui-icon[data-placement='left'] {
    top: 50%;
    right: 0%;
    transform: translate(65%, -50%) rotate(270deg);
  }
`,Ko=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let ms=class extends te{constructor(){super(),this.unsubscribe=[],this.open=An.state.open,this.message=An.state.message,this.triggerRect=An.state.triggerRect,this.variant=An.state.variant,this.unsubscribe.push(An.subscribe(t=>{this.open=t.open,this.message=t.message,this.triggerRect=t.triggerRect,this.variant=t.variant}))}disconnectedCallback(){this.unsubscribe.forEach(t=>t())}render(){this.dataset.variant=this.variant;const t=this.triggerRect.top,e=this.triggerRect.left;return this.style.cssText=`
    --w3m-tooltip-top: ${t}px;
    --w3m-tooltip-left: ${e}px;
    --w3m-tooltip-parent-width: ${this.triggerRect.width/2}px;
    --w3m-tooltip-display: ${this.open?"flex":"none"};
    --w3m-tooltip-opacity: ${this.open?1:0};
    `,A`<wui-flex>
      <wui-icon data-placement="top" color="fg-100" size="inherit" name="cursor"></wui-icon>
      <wui-text color="inherit" variant="small-500">${this.message}</wui-text>
    </wui-flex>`}};ms.styles=[rk],Ko([Q()],ms.prototype,"open",void 0),Ko([Q()],ms.prototype,"message",void 0),Ko([Q()],ms.prototype,"triggerRect",void 0),Ko([Q()],ms.prototype,"variant",void 0),ms=Ko([ee("w3m-tooltip"),ee("w3m-tooltip")],ms);var sk=le`
  :host {
    --prev-height: 0px;
    --new-height: 0px;
    display: block;
  }

  div.w3m-router-container {
    transform: translateY(0);
    opacity: 1;
  }

  div.w3m-router-container[view-direction='prev'] {
    animation:
      slide-left-out 150ms forwards ease,
      slide-left-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  div.w3m-router-container[view-direction='next'] {
    animation:
      slide-right-out 150ms forwards ease,
      slide-right-in 150ms forwards ease;
    animation-delay: 0ms, 200ms;
  }

  @keyframes slide-left-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(10px);
      opacity: 0;
    }
  }

  @keyframes slide-left-in {
    from {
      transform: translateX(-10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }

  @keyframes slide-right-out {
    from {
      transform: translateX(0px);
      opacity: 1;
    }
    to {
      transform: translateX(-10px);
      opacity: 0;
    }
  }

  @keyframes slide-right-in {
    from {
      transform: translateX(10px);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
`,vh=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};let Go=class extends te{constructor(){super(),this.resizeObserver=void 0,this.prevHeight="0px",this.prevHistoryLength=1,this.unsubscribe=[],this.view=Y.state.view,this.viewDirection="",this.unsubscribe.push(Y.subscribeKey("view",t=>this.onViewChange(t)))}firstUpdated(){var t;this.resizeObserver=new ResizeObserver(([e])=>{const i=`${e==null?void 0:e.contentRect.height}px`;this.prevHeight!=="0px"&&(this.style.setProperty("--prev-height",this.prevHeight),this.style.setProperty("--new-height",i),this.style.animation="w3m-view-height 150ms forwards ease",this.style.height="auto"),setTimeout(()=>{this.prevHeight=i,this.style.animation="unset"},zr.ANIMATION_DURATIONS.ModalHeight)}),(t=this.resizeObserver)==null||t.observe(this.getWrapper())}disconnectedCallback(){var t;(t=this.resizeObserver)==null||t.unobserve(this.getWrapper()),this.unsubscribe.forEach(e=>e())}render(){return A`<div class="w3m-router-container" view-direction="${this.viewDirection}">
      ${this.viewTemplate()}
    </div>`}viewTemplate(){switch(this.view){case"AccountSettings":return A`<w3m-account-settings-view></w3m-account-settings-view>`;case"Account":return A`<w3m-account-view></w3m-account-view>`;case"AllWallets":return A`<w3m-all-wallets-view></w3m-all-wallets-view>`;case"ApproveTransaction":return A`<w3m-approve-transaction-view></w3m-approve-transaction-view>`;case"BuyInProgress":return A`<w3m-buy-in-progress-view></w3m-buy-in-progress-view>`;case"ChooseAccountName":return A`<w3m-choose-account-name-view></w3m-choose-account-name-view>`;case"Connect":return A`<w3m-connect-view></w3m-connect-view>`;case"Create":return A`<w3m-connect-view walletGuide="explore"></w3m-connect-view>`;case"ConnectingWalletConnect":return A`<w3m-connecting-wc-view></w3m-connecting-wc-view>`;case"ConnectingWalletConnectBasic":return A`<w3m-connecting-wc-basic-view></w3m-connecting-wc-basic-view>`;case"ConnectingExternal":return A`<w3m-connecting-external-view></w3m-connecting-external-view>`;case"ConnectingSiwe":return A`<w3m-connecting-siwe-view></w3m-connecting-siwe-view>`;case"ConnectWallets":return A`<w3m-connect-wallets-view></w3m-connect-wallets-view>`;case"ConnectSocials":return A`<w3m-connect-socials-view></w3m-connect-socials-view>`;case"ConnectingSocial":return A`<w3m-connecting-social-view></w3m-connecting-social-view>`;case"Downloads":return A`<w3m-downloads-view></w3m-downloads-view>`;case"EmailLogin":return A`<w3m-email-login-view></w3m-email-login-view>`;case"EmailVerifyOtp":return A`<w3m-email-verify-otp-view></w3m-email-verify-otp-view>`;case"EmailVerifyDevice":return A`<w3m-email-verify-device-view></w3m-email-verify-device-view>`;case"GetWallet":return A`<w3m-get-wallet-view></w3m-get-wallet-view>`;case"Networks":return A`<w3m-networks-view></w3m-networks-view>`;case"SwitchNetwork":return A`<w3m-network-switch-view></w3m-network-switch-view>`;case"Profile":return A`<w3m-profile-view></w3m-profile-view>`;case"SwitchAddress":return A`<w3m-switch-address-view></w3m-switch-address-view>`;case"Transactions":return A`<w3m-transactions-view></w3m-transactions-view>`;case"OnRampProviders":return A`<w3m-onramp-providers-view></w3m-onramp-providers-view>`;case"OnRampActivity":return A`<w3m-onramp-activity-view></w3m-onramp-activity-view>`;case"OnRampTokenSelect":return A`<w3m-onramp-token-select-view></w3m-onramp-token-select-view>`;case"OnRampFiatSelect":return A`<w3m-onramp-fiat-select-view></w3m-onramp-fiat-select-view>`;case"UpgradeEmailWallet":return A`<w3m-upgrade-wallet-view></w3m-upgrade-wallet-view>`;case"UpdateEmailWallet":return A`<w3m-update-email-wallet-view></w3m-update-email-wallet-view>`;case"UpdateEmailPrimaryOtp":return A`<w3m-update-email-primary-otp-view></w3m-update-email-primary-otp-view>`;case"UpdateEmailSecondaryOtp":return A`<w3m-update-email-secondary-otp-view></w3m-update-email-secondary-otp-view>`;case"UnsupportedChain":return A`<w3m-unsupported-chain-view></w3m-unsupported-chain-view>`;case"Swap":return A`<w3m-swap-view></w3m-swap-view>`;case"SwapSelectToken":return A`<w3m-swap-select-token-view></w3m-swap-select-token-view>`;case"SwapPreview":return A`<w3m-swap-preview-view></w3m-swap-preview-view>`;case"WalletSend":return A`<w3m-wallet-send-view></w3m-wallet-send-view>`;case"WalletSendSelectToken":return A`<w3m-wallet-send-select-token-view></w3m-wallet-send-select-token-view>`;case"WalletSendPreview":return A`<w3m-wallet-send-preview-view></w3m-wallet-send-preview-view>`;case"WhatIsABuy":return A`<w3m-what-is-a-buy-view></w3m-what-is-a-buy-view>`;case"WalletReceive":return A`<w3m-wallet-receive-view></w3m-wallet-receive-view>`;case"WalletCompatibleNetworks":return A`<w3m-wallet-compatible-networks-view></w3m-wallet-compatible-networks-view>`;case"WhatIsAWallet":return A`<w3m-what-is-a-wallet-view></w3m-what-is-a-wallet-view>`;case"ConnectingMultiChain":return A`<w3m-connecting-multi-chain-view></w3m-connecting-multi-chain-view>`;case"WhatIsANetwork":return A`<w3m-what-is-a-network-view></w3m-what-is-a-network-view>`;case"ConnectingFarcaster":return A`<w3m-connecting-farcaster-view></w3m-connecting-farcaster-view>`;case"SwitchActiveChain":return A`<w3m-switch-active-chain-view></w3m-switch-active-chain-view>`;case"RegisterAccountName":return A`<w3m-register-account-name-view></w3m-register-account-name-view>`;case"RegisterAccountNameSuccess":return A`<w3m-register-account-name-success-view></w3m-register-account-name-success-view>`;case"SmartSessionCreated":return A`<w3m-smart-session-created-view></w3m-smart-session-created-view>`;case"SmartSessionList":return A`<w3m-smart-session-list-view></w3m-smart-session-list-view>`;case"SIWXSignMessage":return A`<w3m-siwx-sign-message-view></w3m-siwx-sign-message-view>`;default:return A`<w3m-connect-view></w3m-connect-view>`}}onViewChange(t){An.hide();let e=zr.VIEW_DIRECTION.Next;const{history:i}=Y.state;i.length<this.prevHistoryLength&&(e=zr.VIEW_DIRECTION.Prev),this.prevHistoryLength=i.length,this.viewDirection=e,setTimeout(()=>{this.view=t},zr.ANIMATION_DURATIONS.ViewTransition)}getWrapper(){var t;return(t=this.shadowRoot)==null?void 0:t.querySelector("div")}};Go.styles=sk,vh([Q()],Go.prototype,"view",void 0),vh([Q()],Go.prototype,"viewDirection",void 0),Go=vh([ee("w3m-router")],Go);var nk=le`
  :host {
    z-index: var(--w3m-z-index);
    display: block;
    backface-visibility: hidden;
    will-change: opacity;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    pointer-events: none;
    opacity: 0;
    background-color: var(--wui-cover);
    transition: opacity 0.2s var(--wui-ease-out-power-2);
    will-change: opacity;
  }

  :host(.open) {
    opacity: 1;
  }

  :host(.embedded) {
    position: relative;
    pointer-events: unset;
    background: none;
    width: 100%;
    opacity: 1;
  }

  wui-card {
    max-width: var(--w3m-modal-width);
    width: 100%;
    position: relative;
    animation: zoom-in 0.2s var(--wui-ease-out-power-2);
    animation-fill-mode: backwards;
    outline: none;
    transition:
      border-radius var(--wui-duration-lg) var(--wui-ease-out-power-1),
      background-color var(--wui-duration-lg) var(--wui-ease-out-power-1);
    will-change: border-radius, background-color;
  }

  :host(.embedded) wui-card {
    max-width: 400px;
  }

  wui-card[shake='true'] {
    animation:
      zoom-in 0.2s var(--wui-ease-out-power-2),
      w3m-shake 0.5s var(--wui-ease-out-power-2);
  }

  wui-flex {
    overflow-x: hidden;
    overflow-y: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
  }

  @media (max-height: 700px) and (min-width: 431px) {
    wui-flex {
      align-items: flex-start;
    }

    wui-card {
      margin: var(--wui-spacing-xxl) 0px;
    }
  }

  @media (max-width: 430px) {
    wui-flex {
      align-items: flex-end;
    }

    wui-card {
      max-width: 100%;
      border-bottom-left-radius: var(--local-border-bottom-mobile-radius);
      border-bottom-right-radius: var(--local-border-bottom-mobile-radius);
      border-bottom: none;
      animation: slide-in 0.2s var(--wui-ease-out-power-2);
    }

    wui-card[shake='true'] {
      animation:
        slide-in 0.2s var(--wui-ease-out-power-2),
        w3m-shake 0.5s var(--wui-ease-out-power-2);
    }
  }

  @keyframes zoom-in {
    0% {
      transform: scale(0.95) translateY(0);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes slide-in {
    0% {
      transform: scale(1) translateY(50px);
    }
    100% {
      transform: scale(1) translateY(0);
    }
  }

  @keyframes w3m-shake {
    0% {
      transform: scale(1) rotate(0deg);
    }
    20% {
      transform: scale(1) rotate(-1deg);
    }
    40% {
      transform: scale(1) rotate(1.5deg);
    }
    60% {
      transform: scale(1) rotate(-1.5deg);
    }
    80% {
      transform: scale(1) rotate(1deg);
    }
    100% {
      transform: scale(1) rotate(0deg);
    }
  }

  @keyframes w3m-view-height {
    from {
      height: var(--prev-height);
    }
    to {
      height: var(--new-height);
    }
  }
`,ys=function(t,e,i,r){var s=arguments.length,n=s<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,o;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")n=Reflect.decorate(t,e,i,r);else for(var a=t.length-1;a>=0;a--)(o=t[a])&&(n=(s<3?o(n):s>3?o(e,i,n):o(e,i))||n);return s>3&&n&&Object.defineProperty(e,i,n),n};const Of="scroll-lock";let Wi=class extends te{constructor(){super(),this.unsubscribe=[],this.abortController=void 0,this.hasPrefetched=!1,this.enableEmbedded=j.state.enableEmbedded,this.open=Ie.state.open,this.caipAddress=C.state.activeCaipAddress,this.caipNetwork=C.state.activeCaipNetwork,this.shake=Ie.state.shake,this.filterByNamespace=X.state.filterByNamespace,this.initializeTheming(),J.prefetchAnalyticsConfig(),this.unsubscribe.push(Ie.subscribeKey("open",t=>t?this.onOpen():this.onClose()),Ie.subscribeKey("shake",t=>this.shake=t),C.subscribeKey("activeCaipNetwork",t=>this.onNewNetwork(t)),C.subscribeKey("activeCaipAddress",t=>this.onNewAddress(t)),j.subscribeKey("enableEmbedded",t=>this.enableEmbedded=t),X.subscribeKey("filterByNamespace",t=>{var e;this.filterByNamespace!==t&&!((e=C.getAccountData(t))!=null&&e.caipAddress)&&(J.fetchRecommendedWallets(),this.filterByNamespace=t)}))}firstUpdated(){if(this.caipAddress){if(this.enableEmbedded){Ie.close(),this.prefetch();return}this.onNewAddress(this.caipAddress)}this.open&&this.onOpen(),this.enableEmbedded&&this.prefetch()}disconnectedCallback(){this.unsubscribe.forEach(t=>t()),this.onRemoveKeyboardListener()}render(){return this.style.cssText=`
      --local-border-bottom-mobile-radius: ${this.enableEmbedded?"clamp(0px, var(--wui-border-radius-l), 44px)":"0px"};
    `,this.enableEmbedded?A`${this.contentTemplate()}
        <w3m-tooltip></w3m-tooltip> `:this.open?A`
          <wui-flex @click=${this.onOverlayClick.bind(this)} data-testid="w3m-modal-overlay">
            ${this.contentTemplate()}
          </wui-flex>
          <w3m-tooltip></w3m-tooltip>
        `:null}contentTemplate(){return A` <wui-card
      shake="${this.shake}"
      data-embedded="${ce(this.enableEmbedded)}"
      role="alertdialog"
      aria-modal="true"
      tabindex="0"
      data-testid="w3m-modal-card"
    >
      <w3m-header></w3m-header>
      <w3m-router></w3m-router>
      <w3m-snackbar></w3m-snackbar>
      <w3m-alertbar></w3m-alertbar>
    </wui-card>`}async onOverlayClick(t){t.target===t.currentTarget&&await this.handleClose()}async handleClose(){Y.state.view==="UnsupportedChain"||await qr.isSIWXCloseDisabled()?Ie.shake():Ie.close()}initializeTheming(){const{themeVariables:t,themeMode:e}=st.state,i=ht.getColorTheme(e);sN(t,i)}onClose(){this.open=!1,this.classList.remove("open"),this.onScrollUnlock(),De.hide(),this.onRemoveKeyboardListener()}onOpen(){this.open=!0,this.classList.add("open"),this.onScrollLock(),this.onAddKeyboardListener()}onScrollLock(){const t=document.createElement("style");t.dataset.w3m=Of,t.textContent=`
      body {
        touch-action: none;
        overflow: hidden;
        overscroll-behavior: contain;
      }
      w3m-modal {
        pointer-events: auto;
      }
    `,document.head.appendChild(t)}onScrollUnlock(){const t=document.head.querySelector(`style[data-w3m="${Of}"]`);t&&t.remove()}onAddKeyboardListener(){var e;this.abortController=new AbortController;const t=(e=this.shadowRoot)==null?void 0:e.querySelector("wui-card");t==null||t.focus(),window.addEventListener("keydown",i=>{if(i.key==="Escape")this.handleClose();else if(i.key==="Tab"){const{tagName:r}=i.target;r&&!r.includes("W3M-")&&!r.includes("WUI-")&&(t==null||t.focus())}},this.abortController)}onRemoveKeyboardListener(){var t;(t=this.abortController)==null||t.abort(),this.abortController=void 0}async onNewAddress(t){const e=C.state.isSwitchingNamespace,i=q.getPlainAddress(t);!i&&!e?Ie.close():e&&i&&Y.goBack(),await qr.initializeIfEnabled(),this.caipAddress=t,C.setIsSwitchingNamespace(!1)}onNewNetwork(t){var g,f;const e=this.caipNetwork,i=(g=e==null?void 0:e.caipNetworkId)==null?void 0:g.toString(),r=e==null?void 0:e.chainNamespace,s=(f=t==null?void 0:t.caipNetworkId)==null?void 0:f.toString(),n=t==null?void 0:t.chainNamespace,o=i!==s,a=o&&r===n,c=(e==null?void 0:e.name)===re.UNSUPPORTED_NETWORK_NAME,l=Y.state.view==="ConnectingExternal",u=!this.caipAddress,d=Y.state.view==="UnsupportedChain",h=Ie.state.open;let p=!1;h&&!l&&(u?o&&(p=!0):(d||a&&!c)&&(p=!0)),p&&Y.state.view!=="SIWXSignMessage"&&Y.goBack(),this.caipNetwork=t}prefetch(){this.hasPrefetched||(J.prefetch(),J.fetchWalletsByPage({page:1}),this.hasPrefetched=!0)}};Wi.styles=nk,ys([$({type:Boolean})],Wi.prototype,"enableEmbedded",void 0),ys([Q()],Wi.prototype,"open",void 0),ys([Q()],Wi.prototype,"caipAddress",void 0),ys([Q()],Wi.prototype,"caipNetwork",void 0),ys([Q()],Wi.prototype,"shake",void 0),ys([Q()],Wi.prototype,"filterByNamespace",void 0),Wi=ys([ee("w3m-modal")],Wi);var ok=Object.freeze({__proto__:null,get W3mModal(){return Wi}});const ak=W`<svg
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M7.0023 0.875C7.48571 0.875 7.8776 1.26675 7.8776 1.75V6.125H12.2541C12.7375 6.125 13.1294 6.51675 13.1294 7C13.1294 7.48325 12.7375 7.875 12.2541 7.875H7.8776V12.25C7.8776 12.7332 7.48571 13.125 7.0023 13.125C6.51889 13.125 6.12701 12.7332 6.12701 12.25V7.875H1.75054C1.26713 7.875 0.875244 7.48325 0.875244 7C0.875244 6.51675 1.26713 6.125 1.75054 6.125H6.12701V1.75C6.12701 1.26675 6.51889 0.875 7.0023 0.875Z"
    fill="#667dff"
  /></svg
>`;var ck=Object.freeze({__proto__:null,addSvg:ak});const lk=W`<svg fill="none" viewBox="0 0 24 24">
  <path
    style="fill: var(--wui-color-accent-100);"
    d="M10.2 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 6.6a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM10.2 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0ZM21 17.4a3.6 3.6 0 1 1-7.2 0 3.6 3.6 0 0 1 7.2 0Z"
  />
</svg>`;var uk=Object.freeze({__proto__:null,allWalletsSvg:lk});const dk=W`<svg
  fill="none"
  viewBox="0 0 21 20"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10.5 2.42908C6.31875 2.42908 2.92859 5.81989 2.92859 10.0034C2.92859 14.1869 6.31875 17.5777 10.5 17.5777C14.6813 17.5777 18.0714 14.1869 18.0714 10.0034C18.0714 5.81989 14.6813 2.42908 10.5 2.42908ZM0.928589 10.0034C0.928589 4.71596 5.21355 0.429077 10.5 0.429077C15.7865 0.429077 20.0714 4.71596 20.0714 10.0034C20.0714 15.2908 15.7865 19.5777 10.5 19.5777C5.21355 19.5777 0.928589 15.2908 0.928589 10.0034ZM10.5 5.75003C11.0523 5.75003 11.5 6.19774 11.5 6.75003L11.5 10.8343L12.7929 9.54137C13.1834 9.15085 13.8166 9.15085 14.2071 9.54137C14.5976 9.9319 14.5976 10.5651 14.2071 10.9556L11.2071 13.9556C10.8166 14.3461 10.1834 14.3461 9.79291 13.9556L6.79291 10.9556C6.40239 10.5651 6.40239 9.9319 6.79291 9.54137C7.18343 9.15085 7.8166 9.15085 8.20712 9.54137L9.50002 10.8343L9.50002 6.75003C9.50002 6.19774 9.94773 5.75003 10.5 5.75003Z"
    clip-rule="evenodd"
  /></svg
>`;var hk=Object.freeze({__proto__:null,arrowBottomCircleSvg:dk});const pk=W`
<svg width="36" height="36">
  <path
    d="M28.724 0H7.271A7.269 7.269 0 0 0 0 7.272v21.46A7.268 7.268 0 0 0 7.271 36H28.73A7.272 7.272 0 0 0 36 28.728V7.272A7.275 7.275 0 0 0 28.724 0Z"
    fill="url(#a)"
  />
  <path
    d="m17.845 8.271.729-1.26a1.64 1.64 0 1 1 2.843 1.638l-7.023 12.159h5.08c1.646 0 2.569 1.935 1.853 3.276H6.434a1.632 1.632 0 0 1-1.638-1.638c0-.909.73-1.638 1.638-1.638h4.176l5.345-9.265-1.67-2.898a1.642 1.642 0 0 1 2.844-1.638l.716 1.264Zm-6.317 17.5-1.575 2.732a1.64 1.64 0 1 1-2.844-1.638l1.17-2.025c1.323-.41 2.398-.095 3.249.931Zm13.56-4.954h4.262c.909 0 1.638.729 1.638 1.638 0 .909-.73 1.638-1.638 1.638h-2.367l1.597 2.772c.45.788.185 1.782-.602 2.241a1.642 1.642 0 0 1-2.241-.603c-2.69-4.666-4.711-8.159-6.052-10.485-1.372-2.367-.391-4.743.576-5.549 1.075 1.846 2.682 4.631 4.828 8.348Z"
    fill="#fff"
  />
  <defs>
    <linearGradient id="a" x1="18" y1="0" x2="18" y2="36" gradientUnits="userSpaceOnUse">
      <stop stop-color="#18BFFB" />
      <stop offset="1" stop-color="#2072F3" />
    </linearGradient>
  </defs>
</svg>`;var gk=Object.freeze({__proto__:null,appStoreSvg:pk});const fk=W`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#000" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M28.77 23.3c-.69 1.99-2.75 5.52-4.87 5.56-1.4.03-1.86-.84-3.46-.84-1.61 0-2.12.81-3.45.86-2.25.1-5.72-5.1-5.72-9.62 0-4.15 2.9-6.2 5.42-6.25 1.36-.02 2.64.92 3.47.92.83 0 2.38-1.13 4.02-.97.68.03 2.6.28 3.84 2.08-3.27 2.14-2.76 6.61.75 8.25ZM24.2 7.88c-2.47.1-4.49 2.69-4.2 4.84 2.28.17 4.47-2.39 4.2-4.84Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;var wk=Object.freeze({__proto__:null,appleSvg:fk});const mk=W`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 1.99a1 1 0 0 1 1 1v7.58l2.46-2.46a1 1 0 0 1 1.41 1.42L7.7 13.69a1 1 0 0 1-1.41 0L2.12 9.53A1 1 0 0 1 3.54 8.1L6 10.57V3a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`;var yk=Object.freeze({__proto__:null,arrowBottomSvg:mk});const bk=W`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13 7.99a1 1 0 0 1-1 1H4.4l2.46 2.46a1 1 0 1 1-1.41 1.41L1.29 8.7a1 1 0 0 1 0-1.41L5.46 3.1a1 1 0 0 1 1.41 1.42L4.41 6.99H12a1 1 0 0 1 1 1Z"
    clip-rule="evenodd"
  />
</svg>`;var vk=Object.freeze({__proto__:null,arrowLeftSvg:bk});const Ck=W`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1 7.99a1 1 0 0 1 1-1h7.58L7.12 4.53A1 1 0 1 1 8.54 3.1l4.16 4.17a1 1 0 0 1 0 1.41l-4.16 4.17a1 1 0 1 1-1.42-1.41l2.46-2.46H2a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`;var Ek=Object.freeze({__proto__:null,arrowRightSvg:Ck});const xk=W`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 13.99a1 1 0 0 1-1-1V5.4L3.54 7.86a1 1 0 0 1-1.42-1.41L6.3 2.28a1 1 0 0 1 1.41 0l4.17 4.17a1 1 0 1 1-1.41 1.41L8 5.4v7.59a1 1 0 0 1-1 1Z"
    clip-rule="evenodd"
  />
</svg>`;var Ik=Object.freeze({__proto__:null,arrowTopSvg:xk});const Ak=W`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="13"
  viewBox="0 0 12 13"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M5.61391 1.57124C5.85142 1.42873 6.14813 1.42873 6.38564 1.57124L11.0793 4.38749C11.9179 4.89067 11.5612 6.17864 10.5832 6.17864H9.96398V10.0358H10.2854C10.6996 10.0358 11.0354 10.3716 11.0354 10.7858C11.0354 11.2 10.6996 11.5358 10.2854 11.5358H1.71416C1.29995 11.5358 0.964172 11.2 0.964172 10.7858C0.964172 10.3716 1.29995 10.0358 1.71416 10.0358H2.03558L2.03558 6.17864H1.41637C0.438389 6.17864 0.0816547 4.89066 0.920263 4.38749L5.61391 1.57124ZM3.53554 6.17864V10.0358H5.24979V6.17864H3.53554ZM6.74976 6.17864V10.0358H8.46401V6.17864H6.74976ZM8.64913 4.67864H3.35043L5.99978 3.089L8.64913 4.67864Z"
    fill="currentColor"
  /></svg
>`;var _k=Object.freeze({__proto__:null,bankSvg:Ak});const Nk=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4 6.4a1 1 0 0 1-.46.89 6.98 6.98 0 0 0 .38 6.18A7 7 0 0 0 16.46 7.3a1 1 0 0 1-.47-.92 7 7 0 0 0-12 .03Zm-2.02-.5a9 9 0 1 1 16.03 8.2A9 9 0 0 1 1.98 5.9Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.03 8.63c-1.46-.3-2.72-.75-3.6-1.35l-.02-.01-.14-.11a1 1 0 0 1 1.2-1.6l.1.08c.6.4 1.52.74 2.69 1 .16-.99.39-1.88.67-2.65.3-.79.68-1.5 1.15-2.02A2.58 2.58 0 0 1 9.99 1c.8 0 1.45.44 1.92.97.47.52.84 1.23 1.14 2.02.29.77.52 1.66.68 2.64a8 8 0 0 0 2.7-1l.26-.18h.48a1 1 0 0 1 .12 2c-.86.51-2.01.91-3.34 1.18a22.24 22.24 0 0 1-.03 3.19c1.45.29 2.7.73 3.58 1.31a1 1 0 0 1-1.1 1.68c-.6-.4-1.56-.76-2.75-1-.15.8-.36 1.55-.6 2.2-.3.79-.67 1.5-1.14 2.02-.47.53-1.12.97-1.92.97-.8 0-1.45-.44-1.91-.97a6.51 6.51 0 0 1-1.15-2.02c-.24-.65-.44-1.4-.6-2.2-1.18.24-2.13.6-2.73.99a1 1 0 1 1-1.1-1.67c.88-.58 2.12-1.03 3.57-1.31a22.03 22.03 0 0 1-.04-3.2Zm2.2-1.7c.15-.86.34-1.61.58-2.24.24-.65.51-1.12.76-1.4.25-.28.4-.29.42-.29.03 0 .17.01.42.3.25.27.52.74.77 1.4.23.62.43 1.37.57 2.22a19.96 19.96 0 0 1-3.52 0Zm-.18 4.6a20.1 20.1 0 0 1-.03-2.62 21.95 21.95 0 0 0 3.94 0 20.4 20.4 0 0 1-.03 2.63 21.97 21.97 0 0 0-3.88 0Zm.27 2c.13.66.3 1.26.49 1.78.24.65.51 1.12.76 1.4.25.28.4.29.42.29.03 0 .17-.01.42-.3.25-.27.52-.74.77-1.4.19-.5.36-1.1.49-1.78a20.03 20.03 0 0 0-3.35 0Z"
    clip-rule="evenodd"
  />
</svg>`;var Sk=Object.freeze({__proto__:null,browserSvg:Nk});const $k=W`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="12"
  height="13"
  viewBox="0 0 12 13"
  fill="none"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M4.16072 2C4.17367 2 4.18665 2 4.19968 2L7.83857 2C8.36772 1.99998 8.82398 1.99996 9.19518 2.04018C9.5895 2.0829 9.97577 2.17811 10.3221 2.42971C10.5131 2.56849 10.6811 2.73647 10.8198 2.92749C11.0714 3.27379 11.1666 3.66007 11.2094 4.0544C11.2496 4.42561 11.2496 4.88188 11.2495 5.41105V7.58896C11.2496 8.11812 11.2496 8.57439 11.2094 8.94561C11.1666 9.33994 11.0714 9.72621 10.8198 10.0725C10.6811 10.2635 10.5131 10.4315 10.3221 10.5703C9.97577 10.8219 9.5895 10.9171 9.19518 10.9598C8.82398 11 8.36772 11 7.83856 11H4.16073C3.63157 11 3.17531 11 2.80411 10.9598C2.40979 10.9171 2.02352 10.8219 1.67722 10.5703C1.48621 10.4315 1.31824 10.2635 1.17946 10.0725C0.927858 9.72621 0.832652 9.33994 0.78993 8.94561C0.749713 8.5744 0.749733 8.11813 0.749757 7.58896L0.749758 5.45C0.749758 5.43697 0.749758 5.42399 0.749757 5.41104C0.749733 4.88188 0.749713 4.42561 0.78993 4.0544C0.832652 3.66007 0.927858 3.27379 1.17946 2.92749C1.31824 2.73647 1.48621 2.56849 1.67722 2.42971C2.02352 2.17811 2.40979 2.0829 2.80411 2.04018C3.17531 1.99996 3.63157 1.99998 4.16072 2ZM2.96567 3.53145C2.69897 3.56034 2.60687 3.60837 2.55888 3.64324C2.49521 3.6895 2.43922 3.74549 2.39296 3.80916C2.35809 3.85715 2.31007 3.94926 2.28117 4.21597C2.26629 4.35335 2.25844 4.51311 2.25431 4.70832H9.74498C9.74085 4.51311 9.733 4.35335 9.71812 4.21597C9.68922 3.94926 9.6412 3.85715 9.60633 3.80916C9.56007 3.74549 9.50408 3.6895 9.44041 3.64324C9.39242 3.60837 9.30031 3.56034 9.03362 3.53145C8.75288 3.50103 8.37876 3.5 7.79961 3.5H4.19968C3.62053 3.5 3.24641 3.50103 2.96567 3.53145ZM9.74956 6.20832H2.24973V7.55C2.24973 8.12917 2.25076 8.5033 2.28117 8.78404C2.31007 9.05074 2.35809 9.14285 2.39296 9.19084C2.43922 9.25451 2.49521 9.31051 2.55888 9.35677C2.60687 9.39163 2.69897 9.43966 2.96567 9.46856C3.24641 9.49897 3.62053 9.5 4.19968 9.5H7.79961C8.37876 9.5 8.75288 9.49897 9.03362 9.46856C9.30032 9.43966 9.39242 9.39163 9.44041 9.35677C9.50408 9.31051 9.56007 9.25451 9.60633 9.19084C9.6412 9.14285 9.68922 9.05075 9.71812 8.78404C9.74854 8.5033 9.74956 8.12917 9.74956 7.55V6.20832ZM6.74963 8C6.74963 7.58579 7.08541 7.25 7.49961 7.25H8.2496C8.6638 7.25 8.99958 7.58579 8.99958 8C8.99958 8.41422 8.6638 8.75 8.2496 8.75H7.49961C7.08541 8.75 6.74963 8.41422 6.74963 8Z"
    fill="currentColor"
  /></svg
>`;var kk=Object.freeze({__proto__:null,cardSvg:$k});const Pk=W`<svg
  width="28"
  height="28"
  viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M25.5297 4.92733C26.1221 5.4242 26.1996 6.30724 25.7027 6.89966L12.2836 22.8997C12.0316 23.2001 11.6652 23.3811 11.2735 23.3986C10.8817 23.4161 10.5006 23.2686 10.2228 22.9919L2.38218 15.1815C1.83439 14.6358 1.83268 13.7494 2.37835 13.2016C2.92403 12.6538 3.81046 12.6521 4.35825 13.1978L11.1183 19.9317L23.5573 5.10036C24.0542 4.50794 24.9372 4.43047 25.5297 4.92733Z"
    fill="currentColor"/>
</svg>
`;var Ok=Object.freeze({__proto__:null,checkmarkSvg:Pk});const Tk=W`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M12.9576 2.23383C13.3807 2.58873 13.4361 3.21947 13.0812 3.64263L6.37159 11.6426C6.19161 11.8572 5.92989 11.9865 5.65009 11.999C5.3703 12.0115 5.09808 11.9062 4.89965 11.7085L0.979321 7.80331C0.588042 7.41354 0.586817 6.78038 0.976585 6.3891C1.36635 5.99782 1.99952 5.99659 2.3908 6.38636L5.53928 9.52268L11.5488 2.35742C11.9037 1.93426 12.5344 1.87893 12.9576 2.23383Z"
    clip-rule="evenodd"
  />
</svg>`;var Rk=Object.freeze({__proto__:null,checkmarkBoldSvg:Tk});const Lk=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M1.46 4.96a1 1 0 0 1 1.41 0L8 10.09l5.13-5.13a1 1 0 1 1 1.41 1.41l-5.83 5.84a1 1 0 0 1-1.42 0L1.46 6.37a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`;var Mk=Object.freeze({__proto__:null,chevronBottomSvg:Lk});const Bk=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M11.04 1.46a1 1 0 0 1 0 1.41L5.91 8l5.13 5.13a1 1 0 1 1-1.41 1.41L3.79 8.71a1 1 0 0 1 0-1.42l5.84-5.83a1 1 0 0 1 1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`;var Uk=Object.freeze({__proto__:null,chevronLeftSvg:Bk});const Dk=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.96 14.54a1 1 0 0 1 0-1.41L10.09 8 4.96 2.87a1 1 0 0 1 1.41-1.41l5.84 5.83a1 1 0 0 1 0 1.42l-5.84 5.83a1 1 0 0 1-1.41 0Z"
    clip-rule="evenodd"
  />
</svg>`;var jk=Object.freeze({__proto__:null,chevronRightSvg:Dk});const zk=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M14.54 11.04a1 1 0 0 1-1.41 0L8 5.92l-5.13 5.12a1 1 0 1 1-1.41-1.41l5.83-5.84a1 1 0 0 1 1.42 0l5.83 5.84a1 1 0 0 1 0 1.41Z"
    clip-rule="evenodd"
  />
</svg>`;var Fk=Object.freeze({__proto__:null,chevronTopSvg:zk});const Hk=W`<svg width="36" height="36" fill="none">
  <path
    fill="#fff"
    fill-opacity=".05"
    d="M0 14.94c0-5.55 0-8.326 1.182-10.4a9 9 0 0 1 3.359-3.358C6.614 0 9.389 0 14.94 0h6.12c5.55 0 8.326 0 10.4 1.182a9 9 0 0 1 3.358 3.359C36 6.614 36 9.389 36 14.94v6.12c0 5.55 0 8.326-1.182 10.4a9 9 0 0 1-3.359 3.358C29.386 36 26.611 36 21.06 36h-6.12c-5.55 0-8.326 0-10.4-1.182a9 9 0 0 1-3.358-3.359C0 29.386 0 26.611 0 21.06v-6.12Z"
  />
  <path
    stroke="#fff"
    stroke-opacity=".05"
    d="M14.94.5h6.12c2.785 0 4.84 0 6.46.146 1.612.144 2.743.43 3.691.97a8.5 8.5 0 0 1 3.172 3.173c.541.948.826 2.08.971 3.692.145 1.62.146 3.675.146 6.459v6.12c0 2.785 0 4.84-.146 6.46-.145 1.612-.43 2.743-.97 3.691a8.5 8.5 0 0 1-3.173 3.172c-.948.541-2.08.826-3.692.971-1.62.145-3.674.146-6.459.146h-6.12c-2.784 0-4.84 0-6.46-.146-1.612-.145-2.743-.43-3.691-.97a8.5 8.5 0 0 1-3.172-3.173c-.541-.948-.827-2.08-.971-3.692C.5 25.9.5 23.845.5 21.06v-6.12c0-2.784 0-4.84.146-6.46.144-1.612.43-2.743.97-3.691A8.5 8.5 0 0 1 4.79 1.617C5.737 1.076 6.869.79 8.48.646 10.1.5 12.156.5 14.94.5Z"
  />
  <path
    fill="url(#a)"
    d="M17.998 10.8h12.469a14.397 14.397 0 0 0-24.938.001l6.234 10.798.006-.001a7.19 7.19 0 0 1 6.23-10.799Z"
  />
  <path
    fill="url(#b)"
    d="m24.237 21.598-6.234 10.798A14.397 14.397 0 0 0 30.47 10.798H18.002l-.002.006a7.191 7.191 0 0 1 6.237 10.794Z"
  />
  <path
    fill="url(#c)"
    d="M11.765 21.601 5.531 10.803A14.396 14.396 0 0 0 18.001 32.4l6.235-10.798-.004-.004a7.19 7.19 0 0 1-12.466.004Z"
  />
  <path fill="#fff" d="M18 25.2a7.2 7.2 0 1 0 0-14.4 7.2 7.2 0 0 0 0 14.4Z" />
  <path fill="#1A73E8" d="M18 23.7a5.7 5.7 0 1 0 0-11.4 5.7 5.7 0 0 0 0 11.4Z" />
  <defs>
    <linearGradient
      id="a"
      x1="6.294"
      x2="41.1"
      y1="5.995"
      y2="5.995"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#D93025" />
      <stop offset="1" stop-color="#EA4335" />
    </linearGradient>
    <linearGradient
      id="b"
      x1="20.953"
      x2="37.194"
      y1="32.143"
      y2="2.701"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#FCC934" />
      <stop offset="1" stop-color="#FBBC04" />
    </linearGradient>
    <linearGradient
      id="c"
      x1="25.873"
      x2="9.632"
      y1="31.2"
      y2="1.759"
      gradientUnits="userSpaceOnUse"
    >
      <stop stop-color="#1E8E3E" />
      <stop offset="1" stop-color="#34A853" />
    </linearGradient>
  </defs>
</svg>`;var qk=Object.freeze({__proto__:null,chromeStoreSvg:Hk});const Wk=W`<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path 
    fill-rule="evenodd" 
    clip-rule="evenodd" 
    d="M7.00235 2C4.24 2 2.00067 4.23858 2.00067 7C2.00067 9.76142 4.24 12 7.00235 12C9.7647 12 12.004 9.76142 12.004 7C12.004 4.23858 9.7647 2 7.00235 2ZM0 7C0 3.13401 3.13506 0 7.00235 0C10.8696 0 14.0047 3.13401 14.0047 7C14.0047 10.866 10.8696 14 7.00235 14C3.13506 14 0 10.866 0 7ZM7.00235 3C7.55482 3 8.00269 3.44771 8.00269 4V6.58579L9.85327 8.43575C10.2439 8.82627 10.2439 9.45944 9.85327 9.84996C9.46262 10.2405 8.82924 10.2405 8.43858 9.84996L6.29501 7.70711C6.10741 7.51957 6.00201 7.26522 6.00201 7V4C6.00201 3.44771 6.44988 3 7.00235 3Z" 
    fill="currentColor"
  />
</svg>`;var Vk=Object.freeze({__proto__:null,clockSvg:Wk});const Kk=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M2.54 2.54a1 1 0 0 1 1.42 0L8 6.6l4.04-4.05a1 1 0 1 1 1.42 1.42L9.4 8l4.05 4.04a1 1 0 0 1-1.42 1.42L8 9.4l-4.04 4.05a1 1 0 0 1-1.42-1.42L6.6 8 2.54 3.96a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`;var Gk=Object.freeze({__proto__:null,closeSvg:Kk});const Zk=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 2a6 6 0 1 0 0 12A6 6 0 0 0 8 2ZM0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm10.66-2.65a1 1 0 0 1 .23 1.06L9.83 9.24a1 1 0 0 1-.59.58l-2.83 1.06A1 1 0 0 1 5.13 9.6l1.06-2.82a1 1 0 0 1 .58-.59L9.6 5.12a1 1 0 0 1 1.06.23ZM7.9 7.89l-.13.35.35-.13.12-.35-.34.13Z"
    clip-rule="evenodd"
  />
</svg>`;var Yk=Object.freeze({__proto__:null,compassSvg:Zk});const Jk=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 3a7 7 0 0 0-6.85 8.44l8.29-8.3C10.97 3.06 10.49 3 10 3Zm3.49.93-9.56 9.56c.32.55.71 1.06 1.16 1.5L15 5.1a7.03 7.03 0 0 0-1.5-1.16Zm2.7 2.8-9.46 9.46a7 7 0 0 0 9.46-9.46ZM1.99 5.9A9 9 0 1 1 18 14.09 9 9 0 0 1 1.98 5.91Z"
    clip-rule="evenodd"
  />
</svg>`;var Xk=Object.freeze({__proto__:null,coinPlaceholderSvg:Jk});const Qk=W`<svg
  xmlns="http://www.w3.org/2000/svg"
  width="16"
  height="16"
  viewBox="0 0 16 16"
  fill="none"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M9.21498 1.28565H10.5944C11.1458 1.28562 11.6246 1.2856 12.0182 1.32093C12.4353 1.35836 12.853 1.44155 13.2486 1.66724C13.7005 1.92498 14.0749 2.29935 14.3326 2.75122C14.5583 3.14689 14.6415 3.56456 14.6789 3.9817C14.7143 4.37531 14.7142 4.85403 14.7142 5.40545V6.78489C14.7142 7.33631 14.7143 7.81503 14.6789 8.20865C14.6415 8.62578 14.5583 9.04345 14.3326 9.43912C14.0749 9.89099 13.7005 10.2654 13.2486 10.5231C12.853 10.7488 12.4353 10.832 12.0182 10.8694C11.7003 10.8979 11.3269 10.9034 10.9045 10.9045C10.9034 11.3269 10.8979 11.7003 10.8694 12.0182C10.832 12.4353 10.7488 12.853 10.5231 13.2486C10.2654 13.7005 9.89099 14.0749 9.43912 14.3326C9.04345 14.5583 8.62578 14.6415 8.20865 14.6789C7.81503 14.7143 7.33631 14.7142 6.78489 14.7142H5.40545C4.85403 14.7142 4.37531 14.7143 3.9817 14.6789C3.56456 14.6415 3.14689 14.5583 2.75122 14.3326C2.29935 14.0749 1.92498 13.7005 1.66724 13.2486C1.44155 12.853 1.35836 12.4353 1.32093 12.0182C1.2856 11.6246 1.28562 11.1458 1.28565 10.5944V9.21498C1.28562 8.66356 1.2856 8.18484 1.32093 7.79122C1.35836 7.37409 1.44155 6.95642 1.66724 6.56074C1.92498 6.10887 2.29935 5.73451 2.75122 5.47677C3.14689 5.25108 3.56456 5.16789 3.9817 5.13045C4.2996 5.10192 4.67301 5.09645 5.09541 5.09541C5.09645 4.67302 5.10192 4.2996 5.13045 3.9817C5.16789 3.56456 5.25108 3.14689 5.47676 2.75122C5.73451 2.29935 6.10887 1.92498 6.56074 1.66724C6.95642 1.44155 7.37409 1.35836 7.79122 1.32093C8.18484 1.2856 8.66356 1.28562 9.21498 1.28565ZM5.09541 7.09552C4.68397 7.09667 4.39263 7.10161 4.16046 7.12245C3.88053 7.14757 3.78516 7.18949 3.74214 7.21403C3.60139 7.29431 3.48478 7.41091 3.4045 7.55166C3.37997 7.59468 3.33804 7.69005 3.31292 7.96999C3.28659 8.26345 3.28565 8.65147 3.28565 9.25708V10.5523C3.28565 11.1579 3.28659 11.5459 3.31292 11.8394C3.33804 12.1193 3.37997 12.2147 3.4045 12.2577C3.48478 12.3985 3.60139 12.5151 3.74214 12.5954C3.78516 12.6199 3.88053 12.6618 4.16046 12.6869C4.45393 12.7133 4.84195 12.7142 5.44755 12.7142H6.74279C7.3484 12.7142 7.73641 12.7133 8.02988 12.6869C8.30981 12.6618 8.40518 12.6199 8.44821 12.5954C8.58895 12.5151 8.70556 12.3985 8.78584 12.2577C8.81038 12.2147 8.8523 12.1193 8.87742 11.8394C8.89825 11.6072 8.90319 11.3159 8.90435 10.9045C8.48219 10.9034 8.10898 10.8979 7.79122 10.8694C7.37409 10.832 6.95641 10.7488 6.56074 10.5231C6.10887 10.2654 5.73451 9.89099 5.47676 9.43912C5.25108 9.04345 5.16789 8.62578 5.13045 8.20865C5.10194 7.89089 5.09645 7.51767 5.09541 7.09552ZM7.96999 3.31292C7.69005 3.33804 7.59468 3.37997 7.55166 3.4045C7.41091 3.48478 7.29431 3.60139 7.21403 3.74214C7.18949 3.78516 7.14757 3.88053 7.12245 4.16046C7.09611 4.45393 7.09517 4.84195 7.09517 5.44755V6.74279C7.09517 7.3484 7.09611 7.73641 7.12245 8.02988C7.14757 8.30981 7.18949 8.40518 7.21403 8.4482C7.29431 8.58895 7.41091 8.70556 7.55166 8.78584C7.59468 8.81038 7.69005 8.8523 7.96999 8.87742C8.26345 8.90376 8.65147 8.9047 9.25708 8.9047H10.5523C11.1579 8.9047 11.5459 8.90376 11.8394 8.87742C12.1193 8.8523 12.2147 8.81038 12.2577 8.78584C12.3985 8.70556 12.5151 8.58895 12.5954 8.4482C12.6199 8.40518 12.6618 8.30981 12.6869 8.02988C12.7133 7.73641 12.7142 7.3484 12.7142 6.74279V5.44755C12.7142 4.84195 12.7133 4.45393 12.6869 4.16046C12.6618 3.88053 12.6199 3.78516 12.5954 3.74214C12.5151 3.60139 12.3985 3.48478 12.2577 3.4045C12.2147 3.37997 12.1193 3.33804 11.8394 3.31292C11.5459 3.28659 11.1579 3.28565 10.5523 3.28565H9.25708C8.65147 3.28565 8.26345 3.28659 7.96999 3.31292Z"
    fill="#788181"
  /></svg
>`;var eP=Object.freeze({__proto__:null,copySvg:Qk});const tP=W` <svg fill="none" viewBox="0 0 13 4">
  <path fill="currentColor" d="M.5 0h12L8.9 3.13a3.76 3.76 0 0 1-4.8 0L.5 0Z" />
</svg>`;var iP=Object.freeze({__proto__:null,cursorSvg:tP});const rP=W`<svg fill="none" viewBox="0 0 14 6">
  <path style="fill: var(--wui-color-bg-150);" d="M0 1h14L9.21 5.12a3.31 3.31 0 0 1-4.49 0L0 1Z" />
  <path
    style="stroke: var(--wui-color-inverse-100);"
    stroke-opacity=".05"
    d="M1.33 1.5h11.32L8.88 4.75l-.01.01a2.81 2.81 0 0 1-3.8 0l-.02-.01L1.33 1.5Z"
  />
  <path
    style="fill: var(--wui-color-bg-150);"
    d="M1.25.71h11.5L9.21 3.88a3.31 3.31 0 0 1-4.49 0L1.25.71Z"
  />
</svg> `;var sP=Object.freeze({__proto__:null,cursorTransparentSvg:rP});const nP=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M13.66 2H6.34c-1.07 0-1.96 0-2.68.08-.74.08-1.42.25-2.01.68a4 4 0 0 0-.89.89c-.43.6-.6 1.27-.68 2.01C0 6.38 0 7.26 0 8.34v.89c0 1.07 0 1.96.08 2.68.08.74.25 1.42.68 2.01a4 4 0 0 0 .89.89c.6.43 1.27.6 2.01.68a27 27 0 0 0 2.68.08h7.32a27 27 0 0 0 2.68-.08 4.03 4.03 0 0 0 2.01-.68 4 4 0 0 0 .89-.89c.43-.6.6-1.27.68-2.01.08-.72.08-1.6.08-2.68v-.89c0-1.07 0-1.96-.08-2.68a4.04 4.04 0 0 0-.68-2.01 4 4 0 0 0-.89-.89c-.6-.43-1.27-.6-2.01-.68C15.62 2 14.74 2 13.66 2ZM2.82 4.38c.2-.14.48-.25 1.06-.31C4.48 4 5.25 4 6.4 4h7.2c1.15 0 1.93 0 2.52.07.58.06.86.17 1.06.31a2 2 0 0 1 .44.44c.14.2.25.48.31 1.06.07.6.07 1.37.07 2.52v.77c0 1.15 0 1.93-.07 2.52-.06.58-.17.86-.31 1.06a2 2 0 0 1-.44.44c-.2.14-.48.25-1.06.32-.6.06-1.37.06-2.52.06H6.4c-1.15 0-1.93 0-2.52-.06-.58-.07-.86-.18-1.06-.32a2 2 0 0 1-.44-.44c-.14-.2-.25-.48-.31-1.06C2 11.1 2 10.32 2 9.17V8.4c0-1.15 0-1.93.07-2.52.06-.58.17-.86.31-1.06a2 2 0 0 1 .44-.44Z"
    clip-rule="evenodd"
  />
  <path fill="currentColor" d="M6.14 17.57a1 1 0 1 0 0 2h7.72a1 1 0 1 0 0-2H6.14Z" />
</svg>`;var oP=Object.freeze({__proto__:null,desktopSvg:nP});const aP=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.07 1h.57a1 1 0 0 1 0 2h-.52c-.98 0-1.64 0-2.14.06-.48.05-.7.14-.84.24-.13.1-.25.22-.34.35-.1.14-.2.35-.25.83-.05.5-.05 1.16-.05 2.15v2.74c0 .99 0 1.65.05 2.15.05.48.14.7.25.83.1.14.2.25.34.35.14.1.36.2.84.25.5.05 1.16.05 2.14.05h.52a1 1 0 0 1 0 2h-.57c-.92 0-1.69 0-2.3-.07a3.6 3.6 0 0 1-1.8-.61c-.3-.22-.57-.49-.8-.8a3.6 3.6 0 0 1-.6-1.79C.5 11.11.5 10.35.5 9.43V6.58c0-.92 0-1.7.06-2.31a3.6 3.6 0 0 1 .62-1.8c.22-.3.48-.57.79-.79a3.6 3.6 0 0 1 1.8-.61C4.37 1 5.14 1 6.06 1ZM9.5 3a1 1 0 0 1 1.42 0l4.28 4.3a1 1 0 0 1 0 1.4L10.93 13a1 1 0 0 1-1.42-1.42L12.1 9H6.8a1 1 0 1 1 0-2h5.3L9.51 4.42a1 1 0 0 1 0-1.41Z"
    clip-rule="evenodd"
  />
</svg>`;var cP=Object.freeze({__proto__:null,disconnectSvg:aP});const lP=W`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5865F2" />
      <path
        fill="#fff"
        fill-rule="evenodd"
        d="M25.71 28.15C30.25 28 32 25.02 32 25.02c0-6.61-2.96-11.98-2.96-11.98-2.96-2.22-5.77-2.15-5.77-2.15l-.29.32c3.5 1.07 5.12 2.61 5.12 2.61a16.75 16.75 0 0 0-10.34-1.93l-.35.04a15.43 15.43 0 0 0-5.88 1.9s1.71-1.63 5.4-2.7l-.2-.24s-2.81-.07-5.77 2.15c0 0-2.96 5.37-2.96 11.98 0 0 1.73 2.98 6.27 3.13l1.37-1.7c-2.6-.79-3.6-2.43-3.6-2.43l.58.35.09.06.08.04.02.01.08.05a17.25 17.25 0 0 0 4.52 1.58 14.4 14.4 0 0 0 8.3-.86c.72-.27 1.52-.66 2.37-1.21 0 0-1.03 1.68-3.72 2.44.61.78 1.35 1.67 1.35 1.67Zm-9.55-9.6c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28.01-1.25-.93-2.28-2.1-2.28Zm7.5 0c-1.17 0-2.1 1.03-2.1 2.28 0 1.25.95 2.28 2.1 2.28 1.17 0 2.1-1.03 2.1-2.28 0-1.25-.93-2.28-2.1-2.28Z"
        clip-rule="evenodd"
      />
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
  </defs>
</svg>`;var uP=Object.freeze({__proto__:null,discordSvg:lP});const dP=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M4.25 7a.63.63 0 0 0-.63.63v3.97c0 .28-.2.51-.47.54l-.75.07a.93.93 0 0 1-.9-.47A7.51 7.51 0 0 1 5.54.92a7.5 7.5 0 0 1 9.54 4.62c.12.35.06.72-.16 1-.74.97-1.68 1.78-2.6 2.44V4.44a.64.64 0 0 0-.63-.64h-1.06c-.35 0-.63.3-.63.64v5.5c0 .23-.12.42-.32.5l-.52.23V6.05c0-.36-.3-.64-.64-.64H7.45c-.35 0-.64.3-.64.64v4.97c0 .25-.17.46-.4.52a5.8 5.8 0 0 0-.45.11v-4c0-.36-.3-.65-.64-.65H4.25ZM14.07 12.4A7.49 7.49 0 0 1 3.6 14.08c4.09-.58 9.14-2.5 11.87-6.6v.03a7.56 7.56 0 0 1-1.41 4.91Z"
  />
</svg>`;var hP=Object.freeze({__proto__:null,etherscanSvg:dP});const pP=W`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.71 2.99a.57.57 0 0 0-.57.57 1 1 0 0 1-1 1c-.58 0-.96 0-1.24.03-.27.03-.37.07-.42.1a.97.97 0 0 0-.36.35c-.04.08-.09.21-.11.67a2.57 2.57 0 0 1 0 5.13c.02.45.07.6.11.66.09.15.21.28.36.36.07.04.21.1.67.12a2.57 2.57 0 0 1 5.12 0c.46-.03.6-.08.67-.12a.97.97 0 0 0 .36-.36c.03-.04.07-.14.1-.41.02-.29.03-.66.03-1.24a1 1 0 0 1 1-1 .57.57 0 0 0 0-1.15 1 1 0 0 1-1-1c0-.58 0-.95-.03-1.24a1.04 1.04 0 0 0-.1-.42.97.97 0 0 0-.36-.36 1.04 1.04 0 0 0-.42-.1c-.28-.02-.65-.02-1.24-.02a1 1 0 0 1-1-1 .57.57 0 0 0-.57-.57ZM5.15 13.98a1 1 0 0 0 .99-1v-.78a.57.57 0 0 1 1.14 0v.78a1 1 0 0 0 .99 1H8.36a66.26 66.26 0 0 0 .73 0 3.78 3.78 0 0 0 1.84-.38c.46-.26.85-.64 1.1-1.1.23-.4.32-.8.36-1.22.02-.2.03-.4.03-.63a2.57 2.57 0 0 0 0-4.75c0-.23-.01-.44-.03-.63a2.96 2.96 0 0 0-.35-1.22 2.97 2.97 0 0 0-1.1-1.1c-.4-.22-.8-.31-1.22-.35a8.7 8.7 0 0 0-.64-.04 2.57 2.57 0 0 0-4.74 0c-.23 0-.44.02-.63.04-.42.04-.83.13-1.22.35-.46.26-.84.64-1.1 1.1-.33.57-.37 1.2-.39 1.84a21.39 21.39 0 0 0 0 .72v.1a1 1 0 0 0 1 .99h.78a.57.57 0 0 1 0 1.15h-.77a1 1 0 0 0-1 .98v.1a63.87 63.87 0 0 0 0 .73c0 .64.05 1.27.38 1.83.26.47.64.85 1.1 1.11.56.32 1.2.37 1.84.38a20.93 20.93 0 0 0 .72 0h.1Z"
    clip-rule="evenodd"
  />
</svg>`;var gP=Object.freeze({__proto__:null,extensionSvg:pP});const fP=W`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.74 3.99a1 1 0 0 1 1-1H11a1 1 0 0 1 1 1v6.26a1 1 0 0 1-2 0V6.4l-6.3 6.3a1 1 0 0 1-1.4-1.42l6.29-6.3H4.74a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`;var wP=Object.freeze({__proto__:null,externalLinkSvg:fP});const mP=W`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1877F2" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M26 12.38h-2.89c-.92 0-1.61.38-1.61 1.34v1.66H26l-.36 4.5H21.5v12H17v-12h-3v-4.5h3V12.5c0-3.03 1.6-4.62 5.2-4.62H26v4.5Z"
        />
      </g>
    </g>
    <path
      fill="#1877F2"
      d="M40 20a20 20 0 1 0-23.13 19.76V25.78H11.8V20h5.07v-4.4c0-5.02 3-7.79 7.56-7.79 2.19 0 4.48.4 4.48.4v4.91h-2.53c-2.48 0-3.25 1.55-3.25 3.13V20h5.54l-.88 5.78h-4.66v13.98A20 20 0 0 0 40 20Z"
    />
    <path
      fill="#fff"
      d="m27.79 25.78.88-5.78h-5.55v-3.75c0-1.58.78-3.13 3.26-3.13h2.53V8.2s-2.3-.39-4.48-.39c-4.57 0-7.55 2.77-7.55 7.78V20H11.8v5.78h5.07v13.98a20.15 20.15 0 0 0 6.25 0V25.78h4.67Z"
    />
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;var yP=Object.freeze({__proto__:null,facebookSvg:mP});const bP=W`<svg style="border-radius: 9999px; overflow: hidden;"  fill="none" viewBox="0 0 1000 1000">
  <rect width="1000" height="1000" rx="9999" ry="9999" fill="#855DCD"/>
  <path fill="#855DCD" d="M0 0h1000v1000H0V0Z" />
  <path
    fill="#fff"
    d="M320 248h354v504h-51.96V521.13h-.5c-5.76-63.8-59.31-113.81-124.54-113.81s-118.78 50-124.53 113.81h-.5V752H320V248Z"
  />
  <path
    fill="#fff"
    d="m225 320 21.16 71.46h17.9v289.09a16.29 16.29 0 0 0-16.28 16.24v19.49h-3.25a16.3 16.3 0 0 0-16.28 16.24V752h182.26v-19.48a16.22 16.22 0 0 0-16.28-16.24h-3.25v-19.5a16.22 16.22 0 0 0-16.28-16.23h-19.52V320H225Zm400.3 360.55a16.3 16.3 0 0 0-15.04 10.02 16.2 16.2 0 0 0-1.24 6.22v19.49h-3.25a16.29 16.29 0 0 0-16.27 16.24V752h182.24v-19.48a16.23 16.23 0 0 0-16.27-16.24h-3.25v-19.5a16.2 16.2 0 0 0-10.04-15 16.3 16.3 0 0 0-6.23-1.23v-289.1h17.9L775 320H644.82v360.55H625.3Z"
  />
</svg>`;var vP=Object.freeze({__proto__:null,farcasterSvg:bP});const CP=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 3a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2H1a1 1 0 0 1-1-1Zm2.63 5.25a1 1 0 0 1 1-1h8.75a1 1 0 1 1 0 2H3.63a1 1 0 0 1-1-1Zm2.62 5.25a1 1 0 0 1 1-1h3.5a1 1 0 0 1 0 2h-3.5a1 1 0 0 1-1-1Z"
    clip-rule="evenodd"
  />
</svg>`;var EP=Object.freeze({__proto__:null,filtersSvg:CP});const xP=W`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#1B1F23" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M8 19.89a12 12 0 1 1 15.8 11.38c-.6.12-.8-.26-.8-.57v-3.3c0-1.12-.4-1.85-.82-2.22 2.67-.3 5.48-1.31 5.48-5.92 0-1.31-.47-2.38-1.24-3.22.13-.3.54-1.52-.12-3.18 0 0-1-.32-3.3 1.23a11.54 11.54 0 0 0-6 0c-2.3-1.55-3.3-1.23-3.3-1.23a4.32 4.32 0 0 0-.12 3.18 4.64 4.64 0 0 0-1.24 3.22c0 4.6 2.8 5.63 5.47 5.93-.34.3-.65.83-.76 1.6-.69.31-2.42.84-3.5-1 0 0-.63-1.15-1.83-1.23 0 0-1.18-.02-.09.73 0 0 .8.37 1.34 1.76 0 0 .7 2.14 4.03 1.41v2.24c0 .31-.2.68-.8.57A12 12 0 0 1 8 19.9Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;var IP=Object.freeze({__proto__:null,githubSvg:xP});const AP=W`<svg fill="none" viewBox="0 0 40 40">
  <path
    fill="#4285F4"
    d="M32.74 20.3c0-.93-.08-1.81-.24-2.66H20.26v5.03h7a6 6 0 0 1-2.62 3.91v3.28h4.22c2.46-2.27 3.88-5.6 3.88-9.56Z"
  />
  <path
    fill="#34A853"
    d="M20.26 33a12.4 12.4 0 0 0 8.6-3.14l-4.22-3.28a7.74 7.74 0 0 1-4.38 1.26 7.76 7.76 0 0 1-7.28-5.36H8.65v3.36A12.99 12.99 0 0 0 20.26 33Z"
  />
  <path
    fill="#FBBC05"
    d="M12.98 22.47a7.79 7.79 0 0 1 0-4.94v-3.36H8.65a12.84 12.84 0 0 0 0 11.66l3.37-2.63.96-.73Z"
  />
  <path
    fill="#EA4335"
    d="M20.26 12.18a7.1 7.1 0 0 1 4.98 1.93l3.72-3.72A12.47 12.47 0 0 0 20.26 7c-5.08 0-9.47 2.92-11.6 7.17l4.32 3.36a7.76 7.76 0 0 1 7.28-5.35Z"
  />
</svg>`;var _P=Object.freeze({__proto__:null,googleSvg:AP});const NP=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="M8.51 5.66a.83.83 0 0 0-.57-.2.83.83 0 0 0-.52.28.8.8 0 0 0-.25.52 1 1 0 0 1-2 0c0-.75.34-1.43.81-1.91a2.75 2.75 0 0 1 4.78 1.92c0 1.24-.8 1.86-1.25 2.2l-.04.03c-.47.36-.5.43-.5.65a1 1 0 1 1-2 0c0-1.25.8-1.86 1.24-2.2l.04-.04c.47-.36.5-.43.5-.65 0-.3-.1-.49-.24-.6ZM9.12 11.87a1.13 1.13 0 1 1-2.25 0 1.13 1.13 0 0 1 2.25 0Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8Zm8-6a6 6 0 1 0 0 12A6 6 0 0 0 8 2Z"
    clip-rule="evenodd"
  />
</svg>`;var SP=Object.freeze({__proto__:null,helpCircleSvg:NP});const $P=W`<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
  <path d="M4.98926 3.73932C4.2989 3.73932 3.73926 4.29896 3.73926 4.98932C3.73926 5.67968 4.2989 6.23932 4.98926 6.23932C5.67962 6.23932 6.23926 5.67968 6.23926 4.98932C6.23926 4.29896 5.67962 3.73932 4.98926 3.73932Z" fill="currentColor"/>
  <path fill-rule="evenodd" clip-rule="evenodd" d="M7.60497 0.500001H6.39504C5.41068 0.499977 4.59185 0.499958 3.93178 0.571471C3.24075 0.64634 2.60613 0.809093 2.04581 1.21619C1.72745 1.44749 1.44749 1.72745 1.21619 2.04581C0.809093 2.60613 0.64634 3.24075 0.571471 3.93178C0.499958 4.59185 0.499977 5.41065 0.500001 6.39501V7.57815C0.499998 8.37476 0.499995 9.05726 0.534869 9.62725C0.570123 10.2034 0.644114 10.7419 0.828442 11.2302C0.925651 11.4877 1.05235 11.7287 1.21619 11.9542C1.44749 12.2726 1.72745 12.5525 2.04581 12.7838C2.60613 13.1909 3.24075 13.3537 3.93178 13.4285C4.59185 13.5001 5.41066 13.5 6.39503 13.5H7.60496C8.58933 13.5 9.40815 13.5001 10.0682 13.4285C10.7593 13.3537 11.3939 13.1909 11.9542 12.7838C12.2726 12.5525 12.5525 12.2726 12.7838 11.9542C13.1909 11.3939 13.3537 10.7593 13.4285 10.0682C13.5 9.40816 13.5 8.58935 13.5 7.60497V6.39505C13.5 5.41068 13.5 4.59185 13.4285 3.93178C13.3537 3.24075 13.1909 2.60613 12.7838 2.04581C12.5525 1.72745 12.2726 1.44749 11.9542 1.21619C11.3939 0.809093 10.7593 0.64634 10.0682 0.571471C9.40816 0.499958 8.58933 0.499977 7.60497 0.500001ZM3.22138 2.83422C3.38394 2.71612 3.62634 2.61627 4.14721 2.55984C4.68679 2.50138 5.39655 2.5 6.45 2.5H7.55C8.60345 2.5 9.31322 2.50138 9.8528 2.55984C10.3737 2.61627 10.6161 2.71612 10.7786 2.83422C10.9272 2.94216 11.0578 3.07281 11.1658 3.22138C11.2839 3.38394 11.3837 3.62634 11.4402 4.14721C11.4986 4.68679 11.5 5.39655 11.5 6.45V6.49703C10.9674 6.11617 10.386 5.84936 9.74213 5.81948C8.40536 5.75745 7.3556 6.73051 6.40509 7.84229C6.33236 7.92737 6.27406 7.98735 6.22971 8.02911L6.1919 8.00514L6.17483 7.99427C6.09523 7.94353 5.98115 7.87083 5.85596 7.80302C5.56887 7.64752 5.18012 7.4921 4.68105 7.4921C4.66697 7.4921 4.6529 7.49239 4.63884 7.49299C3.79163 7.52878 3.09922 8.1106 2.62901 8.55472C2.58751 8.59392 2.54594 8.6339 2.50435 8.6745C2.50011 8.34653 2.5 7.97569 2.5 7.55V6.45C2.5 5.39655 2.50138 4.68679 2.55984 4.14721C2.61627 3.62634 2.71612 3.38394 2.83422 3.22138C2.94216 3.07281 3.07281 2.94216 3.22138 2.83422ZM10.3703 8.14825C10.6798 8.37526 11.043 8.71839 11.4832 9.20889C11.4744 9.44992 11.4608 9.662 11.4402 9.8528C11.3837 10.3737 11.2839 10.6161 11.1658 10.7786C11.0578 10.9272 10.9272 11.0578 10.7786 11.1658C10.6161 11.2839 10.3737 11.3837 9.8528 11.4402C9.31322 11.4986 8.60345 11.5 7.55 11.5H6.45C5.39655 11.5 4.68679 11.4986 4.14721 11.4402C3.62634 11.3837 3.38394 11.2839 3.22138 11.1658C3.15484 11.1174 3.0919 11.0645 3.03298 11.0075C3.10126 10.9356 3.16806 10.8649 3.23317 10.7959L3.29772 10.7276C3.55763 10.4525 3.78639 10.2126 4.00232 10.0087C4.22016 9.80294 4.39412 9.66364 4.53524 9.57742C4.63352 9.51738 4.69022 9.49897 4.71275 9.49345C4.76387 9.49804 4.81803 9.51537 4.90343 9.56162C4.96409 9.59447 5.02355 9.63225 5.11802 9.69238L5.12363 9.69595C5.20522 9.74789 5.32771 9.82587 5.46078 9.89278C5.76529 10.0459 6.21427 10.186 6.74977 10.0158C7.21485 9.86796 7.59367 9.52979 7.92525 9.14195C8.91377 7.98571 9.38267 7.80495 9.64941 7.81733C9.7858 7.82366 10.0101 7.884 10.3703 8.14825Z" fill="currentColor"/>
</svg>`;var kP=Object.freeze({__proto__:null,imageSvg:$P});const PP=W`<svg
 xmlns="http://www.w3.org/2000/svg"
 width="28"
 height="28"
 viewBox="0 0 28 28"
 fill="none">
  <path
    fill="#949E9E"
    fill-rule="evenodd"
    d="M7.974 2.975h12.052c1.248 0 2.296 0 3.143.092.89.096 1.723.307 2.461.844a4.9 4.9 0 0 1 1.084 1.084c.537.738.748 1.57.844 2.461.092.847.092 1.895.092 3.143v6.802c0 1.248 0 2.296-.092 3.143-.096.89-.307 1.723-.844 2.461a4.9 4.9 0 0 1-1.084 1.084c-.738.537-1.57.748-2.461.844-.847.092-1.895.092-3.143.092H7.974c-1.247 0-2.296 0-3.143-.092-.89-.096-1.723-.307-2.461-.844a4.901 4.901 0 0 1-1.084-1.084c-.537-.738-.748-1.571-.844-2.461C.35 19.697.35 18.649.35 17.4v-6.802c0-1.248 0-2.296.092-3.143.096-.89.307-1.723.844-2.461A4.9 4.9 0 0 1 2.37 3.91c.738-.537 1.571-.748 2.461-.844.847-.092 1.895-.092 3.143-.092ZM5.133 5.85c-.652.071-.936.194-1.117.326a2.1 2.1 0 0 0-.465.465c-.132.181-.255.465-.325 1.117-.074.678-.076 1.573-.076 2.917v6.65c0 1.344.002 2.239.076 2.917.07.652.193.936.325 1.117a2.1 2.1 0 0 0 .465.465c.181.132.465.255 1.117.326.678.073 1.574.075 2.917.075h11.9c1.344 0 2.239-.002 2.917-.075.652-.071.936-.194 1.117-.326.179-.13.335-.286.465-.465.132-.181.255-.465.326-1.117.073-.678.075-1.573.075-2.917v-6.65c0-1.344-.002-2.239-.075-2.917-.071-.652-.194-.936-.326-1.117a2.1 2.1 0 0 0-.465-.465c-.181-.132-.465-.255-1.117-.326-.678-.073-1.573-.075-2.917-.075H8.05c-1.343 0-2.239.002-2.917.075Zm.467 7.275a3.15 3.15 0 1 1 6.3 0 3.15 3.15 0 0 1-6.3 0Zm8.75-1.75a1.4 1.4 0 0 1 1.4-1.4h3.5a1.4 1.4 0 0 1 0 2.8h-3.5a1.4 1.4 0 0 1-1.4-1.4Zm0 5.25a1.4 1.4 0 0 1 1.4-1.4H21a1.4 1.4 0 1 1 0 2.8h-5.25a1.4 1.4 0 0 1-1.4-1.4Z"
    clip-rule="evenodd"/>
</svg>`;var OP=Object.freeze({__proto__:null,idSvg:PP});const TP=W`<svg fill="none" viewBox="0 0 14 15">
  <path
    fill="currentColor"
    d="M6 10.49a1 1 0 1 0 2 0v-2a1 1 0 0 0-2 0v2ZM7 4.49a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M7 14.99a7 7 0 1 0 0-14 7 7 0 0 0 0 14Zm5-7a5 5 0 1 1-10 0 5 5 0 0 1 10 0Z"
    clip-rule="evenodd"
  />
</svg>`;var RP=Object.freeze({__proto__:null,infoCircleSvg:TP});const LP=W`<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path fill-rule="evenodd" clip-rule="evenodd" d="M5.00177 1.78569C3.8179 1.78569 2.85819 2.74508 2.85819 3.92855C2.85819 4.52287 3.09928 5.05956 3.49077 5.4485L3.5005 5.45817C3.64381 5.60054 3.76515 5.72108 3.85631 5.81845C3.93747 5.90512 4.05255 6.03218 4.12889 6.1805C4.16999 6.26034 4.19 6.30843 4.21768 6.39385C4.22145 6.40546 4.22499 6.41703 4.22833 6.42855H5.77521C5.77854 6.41703 5.78208 6.40547 5.78585 6.39385C5.81353 6.30843 5.83354 6.26034 5.87464 6.1805C5.95098 6.03218 6.06606 5.90512 6.14722 5.81845C6.23839 5.72108 6.35973 5.60053 6.50304 5.45816L6.51276 5.4485C6.90425 5.05956 7.14534 4.52287 7.14534 3.92855C7.14534 2.74508 6.18563 1.78569 5.00177 1.78569ZM5.71629 7.85712H4.28724C4.28724 8.21403 4.28876 8.40985 4.30703 8.54571C4.30727 8.54748 4.30751 8.54921 4.30774 8.55091C4.30944 8.55115 4.31118 8.55138 4.31295 8.55162C4.44884 8.56989 4.64474 8.5714 5.00177 8.5714C5.3588 8.5714 5.55469 8.56989 5.69059 8.55162C5.69236 8.55138 5.69409 8.55115 5.69579 8.55091C5.69603 8.54921 5.69627 8.54748 5.6965 8.54571C5.71477 8.40985 5.71629 8.21403 5.71629 7.85712ZM2.85819 7.14283C2.85819 6.9948 2.85796 6.91114 2.8548 6.85032C2.85461 6.84656 2.85441 6.84309 2.85421 6.83988C2.84393 6.8282 2.83047 6.81334 2.81301 6.79469C2.74172 6.71856 2.63908 6.61643 2.48342 6.46178C1.83307 5.81566 1.42914 4.91859 1.42914 3.92855C1.42914 1.9561 3.02866 0.357117 5.00177 0.357117C6.97487 0.357117 8.57439 1.9561 8.57439 3.92855C8.57439 4.91859 8.17047 5.81566 7.52012 6.46178C7.36445 6.61643 7.26182 6.71856 7.19053 6.79469C7.17306 6.81334 7.1596 6.8282 7.14932 6.83988C7.14912 6.84309 7.14892 6.84656 7.14873 6.85032C7.14557 6.91114 7.14534 6.9948 7.14534 7.14283V7.85712C7.14534 7.87009 7.14535 7.88304 7.14535 7.89598C7.14541 8.19889 7.14547 8.49326 7.11281 8.73606C7.076 9.00978 6.98631 9.32212 6.72678 9.58156C6.46726 9.841 6.15481 9.93065 5.881 9.96745C5.63813 10.0001 5.34365 10 5.04064 9.99998C5.0277 9.99998 5.01474 9.99998 5.00177 9.99998C4.98879 9.99998 4.97583 9.99998 4.96289 9.99998C4.65988 10 4.36541 10.0001 4.12253 9.96745C3.84872 9.93065 3.53628 9.841 3.27675 9.58156C3.01722 9.32212 2.92753 9.00978 2.89072 8.73606C2.85807 8.49326 2.85812 8.19889 2.85818 7.89598C2.85819 7.88304 2.85819 7.87008 2.85819 7.85712V7.14283ZM7.1243 6.86977C7.12366 6.87069 7.1233 6.87116 7.12327 6.87119C7.12323 6.87123 7.12356 6.87076 7.1243 6.86977ZM2.88027 6.8712C2.88025 6.87119 2.87988 6.8707 2.87921 6.86975C2.87995 6.87072 2.88028 6.8712 2.88027 6.8712Z" fill="#949E9E"/>
</svg>`;var MP=Object.freeze({__proto__:null,lightbulbSvg:LP});const BP=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.83 1.34h6.34c.68 0 1.26 0 1.73.04.5.05.97.15 1.42.4.52.3.95.72 1.24 1.24.26.45.35.92.4 1.42.04.47.04 1.05.04 1.73v3.71c0 .69 0 1.26-.04 1.74-.05.5-.14.97-.4 1.41-.3.52-.72.95-1.24 1.25-.45.25-.92.35-1.42.4-.47.03-1.05.03-1.73.03H4.83c-.68 0-1.26 0-1.73-.04-.5-.04-.97-.14-1.42-.4-.52-.29-.95-.72-1.24-1.24a3.39 3.39 0 0 1-.4-1.41A20.9 20.9 0 0 1 0 9.88v-3.7c0-.7 0-1.27.04-1.74.05-.5.14-.97.4-1.42.3-.52.72-.95 1.24-1.24.45-.25.92-.35 1.42-.4.47-.04 1.05-.04 1.73-.04ZM3.28 3.38c-.36.03-.51.08-.6.14-.21.11-.39.29-.5.5a.8.8 0 0 0-.08.19l5.16 3.44c.45.3 1.03.3 1.48 0L13.9 4.2a.79.79 0 0 0-.08-.2c-.11-.2-.29-.38-.5-.5-.09-.05-.24-.1-.6-.13-.37-.04-.86-.04-1.6-.04H4.88c-.73 0-1.22 0-1.6.04ZM14 6.54 9.85 9.31a3.33 3.33 0 0 1-3.7 0L2 6.54v3.3c0 .74 0 1.22.03 1.6.04.36.1.5.15.6.11.2.29.38.5.5.09.05.24.1.6.14.37.03.86.03 1.6.03h6.25c.73 0 1.22 0 1.6-.03.35-.03.5-.09.6-.14.2-.12.38-.3.5-.5.05-.1.1-.24.14-.6.03-.38.03-.86.03-1.6v-3.3Z"
    clip-rule="evenodd"
  />
</svg>`;var UP=Object.freeze({__proto__:null,mailSvg:BP});const DP=W`<svg fill="none" viewBox="0 0 20 20">
  <path fill="currentColor" d="M10.81 5.81a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3 4.75A4.75 4.75 0 0 1 7.75 0h4.5A4.75 4.75 0 0 1 17 4.75v10.5A4.75 4.75 0 0 1 12.25 20h-4.5A4.75 4.75 0 0 1 3 15.25V4.75ZM7.75 2A2.75 2.75 0 0 0 5 4.75v10.5A2.75 2.75 0 0 0 7.75 18h4.5A2.75 2.75 0 0 0 15 15.25V4.75A2.75 2.75 0 0 0 12.25 2h-4.5Z"
    clip-rule="evenodd"
  />
</svg>`;var jP=Object.freeze({__proto__:null,mobileSvg:DP});const zP=W`<svg fill="none" viewBox="0 0 41 40">
  <path
    style="fill: var(--wui-color-fg-100);"
    fill-opacity=".05"
    d="M.6 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z"
  />
  <path
    fill="#949E9E"
    d="M15.6 20.31a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM23.1 20.31a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0ZM28.1 22.81a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5Z"
  />
</svg>`;var FP=Object.freeze({__proto__:null,moreSvg:zP});const HP=W`<svg fill="none" viewBox="0 0 22 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M16.32 13.62a3.14 3.14 0 1 1-.99 1.72l-1.6-.93a3.83 3.83 0 0 1-3.71 1 3.66 3.66 0 0 1-1.74-1l-1.6.94a3.14 3.14 0 1 1-1-1.73l1.6-.94a3.7 3.7 0 0 1 0-2 3.81 3.81 0 0 1 1.8-2.33c.29-.17.6-.3.92-.38V6.1a3.14 3.14 0 1 1 2 0l-.01.02v1.85H12a3.82 3.82 0 0 1 2.33 1.8 3.7 3.7 0 0 1 .39 2.91l1.6.93ZM2.6 16.54a1.14 1.14 0 0 0 1.98-1.14 1.14 1.14 0 0 0-1.98 1.14ZM11 2.01a1.14 1.14 0 1 0 0 2.28 1.14 1.14 0 0 0 0-2.28Zm1.68 10.45c.08-.19.14-.38.16-.58v-.05l.02-.13v-.13a1.92 1.92 0 0 0-.24-.8l-.11-.15a1.89 1.89 0 0 0-.74-.6 1.86 1.86 0 0 0-.77-.17h-.19a1.97 1.97 0 0 0-.89.34 1.98 1.98 0 0 0-.61.74 1.99 1.99 0 0 0-.16.9v.05a1.87 1.87 0 0 0 .24.74l.1.15c.12.16.26.3.42.42l.16.1.13.07.04.02a1.84 1.84 0 0 0 .76.17h.17a2 2 0 0 0 .91-.35 1.78 1.78 0 0 0 .52-.58l.03-.05a.84.84 0 0 0 .05-.11Zm5.15 4.5a1.14 1.14 0 0 0 1.14-1.97 1.13 1.13 0 0 0-1.55.41c-.32.55-.13 1.25.41 1.56Z"
    clip-rule="evenodd"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M4.63 9.43a1.5 1.5 0 1 0 1.5-2.6 1.5 1.5 0 0 0-1.5 2.6Zm.32-1.55a.5.5 0 0 1 .68-.19.5.5 0 0 1 .18.68.5.5 0 0 1-.68.19.5.5 0 0 1-.18-.68ZM17.94 8.88a1.5 1.5 0 1 1-2.6-1.5 1.5 1.5 0 1 1 2.6 1.5ZM16.9 7.69a.5.5 0 0 0-.68.19.5.5 0 0 0 .18.68.5.5 0 0 0 .68-.19.5.5 0 0 0-.18-.68ZM9.75 17.75a1.5 1.5 0 1 1 2.6 1.5 1.5 1.5 0 1 1-2.6-1.5Zm1.05 1.18a.5.5 0 0 0 .68-.18.5.5 0 0 0-.18-.68.5.5 0 0 0-.68.18.5.5 0 0 0 .18.68Z"
    clip-rule="evenodd"
  />
</svg>`;var qP=Object.freeze({__proto__:null,networkPlaceholderSvg:HP});const WP=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.13 1h1.71c1.46 0 2.63 0 3.56.1.97.1 1.8.33 2.53.85a5 5 0 0 1 1.1 1.11c.53.73.75 1.56.86 2.53.1.93.1 2.1.1 3.55v1.72c0 1.45 0 2.62-.1 3.55-.1.97-.33 1.8-.86 2.53a5 5 0 0 1-1.1 1.1c-.73.53-1.56.75-2.53.86-.93.1-2.1.1-3.55.1H9.13c-1.45 0-2.62 0-3.56-.1-.96-.1-1.8-.33-2.52-.85a5 5 0 0 1-1.1-1.11 5.05 5.05 0 0 1-.86-2.53c-.1-.93-.1-2.1-.1-3.55V9.14c0-1.45 0-2.62.1-3.55.1-.97.33-1.8.85-2.53a5 5 0 0 1 1.1-1.1 5.05 5.05 0 0 1 2.53-.86C6.51 1 7.67 1 9.13 1ZM5.79 3.09a3.1 3.1 0 0 0-1.57.48 3 3 0 0 0-.66.67c-.24.32-.4.77-.48 1.56-.1.82-.1 1.88-.1 3.4v1.6c0 1.15 0 2.04.05 2.76l.41-.42c.5-.5.93-.92 1.32-1.24.41-.33.86-.6 1.43-.7a3 3 0 0 1 .94 0c.35.06.66.2.95.37a17.11 17.11 0 0 0 .8.45c.1-.08.2-.2.41-.4l.04-.03a27 27 0 0 1 1.95-1.84 4.03 4.03 0 0 1 1.91-.94 4 4 0 0 1 1.25 0c.73.11 1.33.46 1.91.94l.64.55V9.2c0-1.52 0-2.58-.1-3.4a3.1 3.1 0 0 0-.48-1.56 3 3 0 0 0-.66-.67 3.1 3.1 0 0 0-1.56-.48C13.37 3 12.3 3 10.79 3h-1.6c-1.52 0-2.59 0-3.4.09Zm11.18 10-.04-.05a26.24 26.24 0 0 0-1.83-1.74c-.45-.36-.73-.48-.97-.52a2 2 0 0 0-.63 0c-.24.04-.51.16-.97.52-.46.38-1.01.93-1.83 1.74l-.02.02c-.17.18-.34.34-.49.47a2.04 2.04 0 0 1-1.08.5 1.97 1.97 0 0 1-1.25-.27l-.79-.46-.02-.02a.65.65 0 0 0-.24-.1 1 1 0 0 0-.31 0c-.08.02-.21.06-.49.28-.3.24-.65.59-1.2 1.14l-.56.56-.65.66a3 3 0 0 0 .62.6c.33.24.77.4 1.57.49.81.09 1.88.09 3.4.09h1.6c1.52 0 2.58 0 3.4-.09a3.1 3.1 0 0 0 1.56-.48 3 3 0 0 0 .66-.67c.24-.32.4-.77.49-1.56l.07-1.12Zm-8.02-1.03ZM4.99 7a2 2 0 1 1 4 0 2 2 0 0 1-4 0Z"
    clip-rule="evenodd"
  />
</svg>`;var VP=Object.freeze({__proto__:null,nftPlaceholderSvg:WP});const KP=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M8 0a1 1 0 0 1 1 1v5.38a1 1 0 0 1-2 0V1a1 1 0 0 1 1-1ZM5.26 2.6a1 1 0 0 1-.28 1.39 5.46 5.46 0 1 0 6.04 0 1 1 0 1 1 1.1-1.67 7.46 7.46 0 1 1-8.25 0 1 1 0 0 1 1.4.28Z"
    clip-rule="evenodd"
  />
</svg>`;var GP=Object.freeze({__proto__:null,offSvg:KP});const ZP=W` <svg
  width="36"
  height="36"
  fill="none"
>
  <path
    d="M0 8a8 8 0 0 1 8-8h20a8 8 0 0 1 8 8v20a8 8 0 0 1-8 8H8a8 8 0 0 1-8-8V8Z"
    fill="#fff"
    fill-opacity=".05"
  />
  <path
    d="m18.262 17.513-8.944 9.49v.01a2.417 2.417 0 0 0 3.56 1.452l.026-.017 10.061-5.803-4.703-5.132Z"
    fill="#EA4335"
  />
  <path
    d="m27.307 15.9-.008-.008-4.342-2.52-4.896 4.36 4.913 4.912 4.325-2.494a2.42 2.42 0 0 0 .008-4.25Z"
    fill="#FBBC04"
  />
  <path
    d="M9.318 8.997c-.05.202-.084.403-.084.622V26.39c0 .218.025.42.084.621l9.246-9.247-9.246-8.768Z"
    fill="#4285F4"
  />
  <path
    d="m18.33 18 4.627-4.628-10.053-5.828a2.427 2.427 0 0 0-3.586 1.444L18.329 18Z"
    fill="#34A853"
  />
  <path
    d="M8 .5h20A7.5 7.5 0 0 1 35.5 8v20a7.5 7.5 0 0 1-7.5 7.5H8A7.5 7.5 0 0 1 .5 28V8A7.5 7.5 0 0 1 8 .5Z"
    stroke="#fff"
    stroke-opacity=".05"
  />
</svg>`;var YP=Object.freeze({__proto__:null,playStoreSvg:ZP});const JP=W`<svg
  width="13"
  height="12"
  viewBox="0 0 13 12"
  fill="none"
>
  <path
    fill="currentColor"
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M0.794373 5.99982C0.794373 5.52643 1.17812 5.14268 1.6515 5.14268H5.643V1.15109C5.643 0.677701 6.02675 0.293946 6.50012 0.293945C6.9735 0.293946 7.35725 0.677701 7.35725 1.15109V5.14268H11.3488C11.8221 5.14268 12.2059 5.52643 12.2059 5.99982C12.2059 6.47321 11.8221 6.85696 11.3488 6.85696H7.35725V10.8486C7.35725 11.3219 6.9735 11.7057 6.50012 11.7057C6.02675 11.7057 5.643 11.3219 5.643 10.8486V6.85696H1.6515C1.17812 6.85696 0.794373 6.47321 0.794373 5.99982Z"
  /></svg
>`;var XP=Object.freeze({__proto__:null,plusSvg:JP});const QP=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M3 6a3 3 0 0 1 3-3h1a1 1 0 1 0 0-2H6a5 5 0 0 0-5 5v1a1 1 0 0 0 2 0V6ZM13 1a1 1 0 1 0 0 2h1a3 3 0 0 1 3 3v1a1 1 0 1 0 2 0V6a5 5 0 0 0-5-5h-1ZM3 13a1 1 0 1 0-2 0v1a5 5 0 0 0 5 5h1a1 1 0 1 0 0-2H6a3 3 0 0 1-3-3v-1ZM19 13a1 1 0 1 0-2 0v1a3 3 0 0 1-3 3h-1a1 1 0 1 0 0 2h1.01a5 5 0 0 0 5-5v-1ZM5.3 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05A1.5 1.5 0 0 0 9.2 8.14c.06-.2.06-.43.06-.89s0-.7-.06-.89A1.5 1.5 0 0 0 8.14 5.3c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM10.8 6.36c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06ZM5.26 12.75c0-.46 0-.7.05-.89a1.5 1.5 0 0 1 1.06-1.06c.19-.05.42-.05.89-.05.46 0 .7 0 .88.05.52.14.93.54 1.06 1.06.06.2.06.43.06.89s0 .7-.06.89a1.5 1.5 0 0 1-1.06 1.06c-.19.05-.42.05-.88.05-.47 0-.7 0-.9-.05a1.5 1.5 0 0 1-1.05-1.06c-.05-.2-.05-.43-.05-.89ZM10.8 11.86c-.04.2-.04.43-.04.89s0 .7.05.89c.14.52.54.92 1.06 1.06.19.05.42.05.89.05.46 0 .7 0 .88-.05a1.5 1.5 0 0 0 1.06-1.06c.06-.2.06-.43.06-.89s0-.7-.06-.89a1.5 1.5 0 0 0-1.06-1.06c-.19-.05-.42-.05-.88-.05-.47 0-.7 0-.9.05a1.5 1.5 0 0 0-1.05 1.06Z"
  />
</svg>`;var eO=Object.freeze({__proto__:null,qrCodeIcon:QP});const tO=W`<svg
  fill="none"
  viewBox="0 0 21 20"
>
  <path
    fill="currentColor"
    d="M8.8071 0.292893C9.19763 0.683417 9.19763 1.31658 8.8071 1.70711L6.91421 3.6H11.8404C14.3368 3.6 16.5533 5.1975 17.3427 7.56588L17.4487 7.88377C17.6233 8.40772 17.3402 8.97404 16.8162 9.14868C16.2923 9.32333 15.726 9.04017 15.5513 8.51623L15.4453 8.19834C14.9281 6.64664 13.476 5.6 11.8404 5.6H6.91421L8.8071 7.49289C9.19763 7.88342 9.19763 8.51658 8.8071 8.90711C8.41658 9.29763 7.78341 9.29763 7.39289 8.90711L3.79289 5.30711C3.40236 4.91658 3.40236 4.28342 3.79289 3.89289L7.39289 0.292893C7.78341 -0.0976311 8.41658 -0.0976311 8.8071 0.292893ZM4.18377 10.8513C4.70771 10.6767 5.27403 10.9598 5.44868 11.4838L5.55464 11.8017C6.07188 13.3534 7.52401 14.4 9.15964 14.4L14.0858 14.4L12.1929 12.5071C11.8024 12.1166 11.8024 11.4834 12.1929 11.0929C12.5834 10.7024 13.2166 10.7024 13.6071 11.0929L17.2071 14.6929C17.5976 15.0834 17.5976 15.7166 17.2071 16.1071L13.6071 19.7071C13.2166 20.0976 12.5834 20.0976 12.1929 19.7071C11.8024 19.3166 11.8024 18.6834 12.1929 18.2929L14.0858 16.4L9.15964 16.4C6.66314 16.4 4.44674 14.8025 3.65728 12.4341L3.55131 12.1162C3.37667 11.5923 3.65983 11.026 4.18377 10.8513Z"
  /></svg
>`;var iO=Object.freeze({__proto__:null,recycleHorizontalSvg:tO});const rO=W`<svg fill="none" viewBox="0 0 14 16">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.94 1.04a1 1 0 0 1 .7 1.23l-.48 1.68a5.85 5.85 0 0 1 8.53 4.32 5.86 5.86 0 0 1-11.4 2.56 1 1 0 0 1 1.9-.57 3.86 3.86 0 1 0 1.83-4.5l1.87.53a1 1 0 0 1-.55 1.92l-4.1-1.15a1 1 0 0 1-.69-1.23l1.16-4.1a1 1 0 0 1 1.23-.7Z"
    clip-rule="evenodd"
  />
</svg>`;var sO=Object.freeze({__proto__:null,refreshSvg:rO});const nO=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M9.36 4.21a5.14 5.14 0 1 0 0 10.29 5.14 5.14 0 0 0 0-10.29ZM1.64 9.36a7.71 7.71 0 1 1 14 4.47l2.52 2.5a1.29 1.29 0 1 1-1.82 1.83l-2.51-2.51A7.71 7.71 0 0 1 1.65 9.36Z"
    clip-rule="evenodd"
  />
</svg>`;var oO=Object.freeze({__proto__:null,searchSvg:nO});const aO=W`<svg fill="none" viewBox="0 0 21 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M14.3808 4.34812C13.72 4.47798 12.8501 4.7587 11.5748 5.17296L9.00869 6.00646C6.90631 6.68935 5.40679 7.17779 4.38121 7.63178C3.87166 7.85734 3.5351 8.05091 3.32022 8.22035C3.11183 8.38466 3.07011 8.48486 3.05969 8.51817C2.98058 8.77103 2.98009 9.04195 3.05831 9.29509C3.06861 9.32844 3.10998 9.42878 3.31777 9.59384C3.53205 9.76404 3.86792 9.95881 4.37667 10.1862C5.29287 10.5957 6.58844 11.0341 8.35529 11.6164L10.8876 8.59854C11.2426 8.17547 11.8733 8.12028 12.2964 8.47528C12.7195 8.83029 12.7746 9.46104 12.4196 9.88412L9.88738 12.9019C10.7676 14.5408 11.4244 15.7406 11.9867 16.5718C12.299 17.0333 12.5491 17.3303 12.7539 17.5117C12.9526 17.6877 13.0586 17.711 13.0932 17.7154C13.3561 17.7484 13.6228 17.7009 13.8581 17.5791C13.8891 17.563 13.9805 17.5046 14.1061 17.2708C14.2357 17.0298 14.3679 16.6647 14.5015 16.1237C14.7705 15.0349 14.9912 13.4733 15.2986 11.2843L15.6738 8.61249C15.8603 7.28456 15.9857 6.37917 15.9989 5.7059C16.012 5.03702 15.9047 4.8056 15.8145 4.69183C15.7044 4.55297 15.5673 4.43792 15.4114 4.35365C15.2837 4.28459 15.0372 4.2191 14.3808 4.34812ZM7.99373 13.603C6.11919 12.9864 4.6304 12.4902 3.5606 12.0121C2.98683 11.7557 2.4778 11.4808 2.07383 11.1599C1.66337 10.8339 1.31312 10.4217 1.14744 9.88551C0.949667 9.24541 0.950886 8.56035 1.15094 7.92096C1.31852 7.38534 1.67024 6.97442 2.08185 6.64985C2.48697 6.33041 2.99697 6.05734 3.57166 5.80295C4.70309 5.3021 6.30179 4.78283 8.32903 4.12437L11.0196 3.25042C12.2166 2.86159 13.2017 2.54158 13.9951 2.38566C14.8065 2.22618 15.6202 2.19289 16.3627 2.59437C16.7568 2.80747 17.1035 3.09839 17.3818 3.4495C17.9062 4.111 18.0147 4.91815 17.9985 5.74496C17.9827 6.55332 17.8386 7.57903 17.6636 8.82534L17.2701 11.6268C16.9737 13.7376 16.7399 15.4022 16.4432 16.6034C16.2924 17.2135 16.1121 17.7632 15.8678 18.2176C15.6197 18.6794 15.2761 19.0971 14.7777 19.3551C14.1827 19.6632 13.5083 19.7833 12.8436 19.6997C12.2867 19.6297 11.82 19.3563 11.4277 19.0087C11.0415 18.6666 10.6824 18.213 10.3302 17.6925C9.67361 16.722 8.92648 15.342 7.99373 13.603Z"
    clip-rule="evenodd"
  />
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="21"
    height="20"
    viewBox="0 0 21 20"
    fill="none"
  ></svg></svg
>`;var cO=Object.freeze({__proto__:null,sendSvg:aO});const lO=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M6.76.3a1 1 0 0 1 0 1.4L4.07 4.4h9a1 1 0 1 1 0 2h-9l2.69 2.68a1 1 0 1 1-1.42 1.42L.95 6.09a1 1 0 0 1 0-1.4l4.4-4.4a1 1 0 0 1 1.4 0Zm6.49 9.21a1 1 0 0 1 1.41 0l4.39 4.4a1 1 0 0 1 0 1.4l-4.39 4.4a1 1 0 0 1-1.41-1.42l2.68-2.68h-9a1 1 0 0 1 0-2h9l-2.68-2.68a1 1 0 0 1 0-1.42Z"
    clip-rule="evenodd"
  />
</svg>`;var uO=Object.freeze({__proto__:null,swapHorizontalSvg:lO});const dO=W`<svg
  width="14"
  height="14"
  viewBox="0 0 14 14"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
>
  <path
    fill-rule="evenodd"
    clip-rule="evenodd"
    d="M13.7306 3.24213C14.0725 3.58384 14.0725 4.13786 13.7306 4.47957L10.7418 7.46737C10.4 7.80908 9.84581 7.80908 9.50399 7.46737C9.16216 7.12567 9.16216 6.57165 9.50399 6.22994L10.9986 4.73585H5.34082C4.85741 4.73585 4.46553 4.3441 4.46553 3.86085C4.46553 3.3776 4.85741 2.98585 5.34082 2.98585L10.9986 2.98585L9.50399 1.49177C9.16216 1.15006 9.16216 0.596037 9.50399 0.254328C9.84581 -0.0873803 10.4 -0.0873803 10.7418 0.254328L13.7306 3.24213ZM9.52515 10.1352C9.52515 10.6185 9.13327 11.0102 8.64986 11.0102L2.9921 11.0102L4.48669 12.5043C4.82852 12.846 4.82852 13.4001 4.48669 13.7418C4.14487 14.0835 3.59066 14.0835 3.24884 13.7418L0.26003 10.754C0.0958806 10.5899 0.0036621 10.3673 0.00366211 10.1352C0.00366212 9.90318 0.0958806 9.68062 0.26003 9.51652L3.24884 6.52872C3.59066 6.18701 4.14487 6.18701 4.48669 6.52872C4.82851 6.87043 4.82851 7.42445 4.48669 7.76616L2.9921 9.26024L8.64986 9.26024C9.13327 9.26024 9.52515 9.65199 9.52515 10.1352Z"
    fill="currentColor"
  />
</svg>

`;var hO=Object.freeze({__proto__:null,swapHorizontalMediumSvg:dO});const pO=W`<svg width="10" height="10" viewBox="0 0 10 10">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.77986 0.566631C4.0589 0.845577 4.0589 1.29784 3.77986 1.57678L3.08261 2.2738H6.34184C6.73647 2.2738 7.05637 2.5936 7.05637 2.98808C7.05637 3.38257 6.73647 3.70237 6.34184 3.70237H3.08261L3.77986 4.39938C4.0589 4.67833 4.0589 5.13059 3.77986 5.40954C3.50082 5.68848 3.04841 5.68848 2.76937 5.40954L0.852346 3.49316C0.573306 3.21421 0.573306 2.76195 0.852346 2.48301L2.76937 0.566631C3.04841 0.287685 3.50082 0.287685 3.77986 0.566631ZM6.22 4.59102C6.49904 4.31208 6.95145 4.31208 7.23049 4.59102L9.14751 6.5074C9.42655 6.78634 9.42655 7.23861 9.14751 7.51755L7.23049 9.43393C6.95145 9.71287 6.49904 9.71287 6.22 9.43393C5.94096 9.15498 5.94096 8.70272 6.22 8.42377L6.91725 7.72676L3.65802 7.72676C3.26339 7.72676 2.94349 7.40696 2.94349 7.01247C2.94349 6.61798 3.26339 6.29819 3.65802 6.29819L6.91725 6.29819L6.22 5.60117C5.94096 5.32223 5.94096 4.86997 6.22 4.59102Z"
    clip-rule="evenodd"
  />
</svg>`;var gO=Object.freeze({__proto__:null,swapHorizontalBoldSvg:pO});const fO=W`<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none">
  <path 
    fill="currentColor"
    fill-rule="evenodd" 
    clip-rule="evenodd" 
    d="M8.3071 0.292893C8.69763 0.683417 8.69763 1.31658 8.3071 1.70711L6.41421 3.6H11.3404C13.8368 3.6 16.0533 5.1975 16.8427 7.56588L16.9487 7.88377C17.1233 8.40772 16.8402 8.97404 16.3162 9.14868C15.7923 9.32333 15.226 9.04017 15.0513 8.51623L14.9453 8.19834C14.4281 6.64664 12.976 5.6 11.3404 5.6H6.41421L8.3071 7.49289C8.69763 7.88342 8.69763 8.51658 8.3071 8.90711C7.91658 9.29763 7.28341 9.29763 6.89289 8.90711L3.29289 5.30711C2.90236 4.91658 2.90236 4.28342 3.29289 3.89289L6.89289 0.292893C7.28341 -0.0976311 7.91658 -0.0976311 8.3071 0.292893ZM3.68377 10.8513C4.20771 10.6767 4.77403 10.9598 4.94868 11.4838L5.05464 11.8017C5.57188 13.3534 7.024 14.4 8.65964 14.4L13.5858 14.4L11.6929 12.5071C11.3024 12.1166 11.3024 11.4834 11.6929 11.0929C12.0834 10.7024 12.7166 10.7024 13.1071 11.0929L16.7071 14.6929C17.0976 15.0834 17.0976 15.7166 16.7071 16.1071L13.1071 19.7071C12.7166 20.0976 12.0834 20.0976 11.6929 19.7071C11.3024 19.3166 11.3024 18.6834 11.6929 18.2929L13.5858 16.4L8.65964 16.4C6.16314 16.4 3.94674 14.8025 3.15728 12.4341L3.05131 12.1162C2.87667 11.5923 3.15983 11.026 3.68377 10.8513Z" 
  />
</svg>`;var wO=Object.freeze({__proto__:null,swapHorizontalRoundedBoldSvg:fO});const mO=W`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M3.48 2.18a1 1 0 0 1 1.41 0l2.68 2.68a1 1 0 1 1-1.41 1.42l-.98-.98v4.56a1 1 0 0 1-2 0V5.3l-.97.98A1 1 0 0 1 .79 4.86l2.69-2.68Zm6.34 2.93a1 1 0 0 1 1 1v4.56l.97-.98a1 1 0 1 1 1.42 1.42l-2.69 2.68a1 1 0 0 1-1.41 0l-2.68-2.68a1 1 0 0 1 1.41-1.42l.98.98V6.1a1 1 0 0 1 1-1Z"
    clip-rule="evenodd"
  />
</svg>`;var yO=Object.freeze({__proto__:null,swapVerticalSvg:mO});const bO=W`<svg width="32" height="32" fill="none" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
  <g clip-path="url(#a)">
    <path fill="url(#b)" d="M0 0h32v32H0z"/>
    <path fill-rule="evenodd" clip-rule="evenodd" d="M7.034 15.252c4.975-2.167 8.293-3.596 9.953-4.287 4.74-1.971 5.725-2.314 6.366-2.325.142-.002.457.033.662.198.172.14.22.33.243.463.022.132.05.435.028.671-.257 2.7-1.368 9.248-1.933 12.27-.24 1.28-.71 1.708-1.167 1.75-.99.091-1.743-.655-2.703-1.284-1.502-.985-2.351-1.598-3.81-2.558-1.684-1.11-.592-1.721.368-2.718.252-.261 4.619-4.233 4.703-4.594.01-.045.02-.213-.08-.301-.1-.09-.246-.059-.353-.035-.15.034-2.55 1.62-7.198 4.758-.682.468-1.298.696-1.851.684-.61-.013-1.782-.344-2.653-.628-1.069-.347-1.918-.53-1.845-1.12.039-.308.462-.623 1.27-.944Z" fill="#fff"/>
  </g>
  <path d="M.5 16C.5 7.44 7.44.5 16 .5 24.56.5 31.5 7.44 31.5 16c0 8.56-6.94 15.5-15.5 15.5C7.44 31.5.5 24.56.5 16Z" stroke="#141414" stroke-opacity=".05"/>
  <defs>
    <linearGradient id="b" x1="1600" y1="0" x2="1600" y2="3176.27" gradientUnits="userSpaceOnUse">
      <stop stop-color="#2AABEE"/>
      <stop offset="1" stop-color="#229ED9"/>
    </linearGradient>
    <clipPath id="a">
      <path d="M0 16C0 7.163 7.163 0 16 0s16 7.163 16 16-7.163 16-16 16S0 24.837 0 16Z" fill="#fff"/>
    </clipPath>
  </defs>
</svg>`;var vO=Object.freeze({__proto__:null,telegramSvg:bO});const CO=W`<svg width="14" height="15" viewBox="0 0 14 15" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path d="M7 3.71875C6.0335 3.71875 5.25 2.93525 5.25 1.96875C5.25 1.00225 6.0335 0.21875 7 0.21875C7.9665 0.21875 8.75 1.00225 8.75 1.96875C8.75 2.93525 7.9665 3.71875 7 3.71875Z" fill="#949E9E"/>
  <path d="M7 8.96875C6.0335 8.96875 5.25 8.18525 5.25 7.21875C5.25 6.25225 6.0335 5.46875 7 5.46875C7.9665 5.46875 8.75 6.25225 8.75 7.21875C8.75 8.18525 7.9665 8.96875 7 8.96875Z" fill="#949E9E"/>
  <path d="M5.25 12.4688C5.25 13.4352 6.0335 14.2187 7 14.2187C7.9665 14.2187 8.75 13.4352 8.75 12.4688C8.75 11.5023 7.9665 10.7188 7 10.7188C6.0335 10.7188 5.25 11.5023 5.25 12.4688Z" fill="#949E9E"/>
</svg>`;var EO=Object.freeze({__proto__:null,threeDotsSvg:CO});const xO=W`<svg fill="none" viewBox="0 0 40 40">
  <g clip-path="url(#a)">
    <g clip-path="url(#b)">
      <circle cx="20" cy="19.89" r="20" fill="#5A3E85" />
      <g clip-path="url(#c)">
        <path
          fill="#fff"
          d="M18.22 25.7 20 23.91h3.34l2.1-2.1v-6.68H15.4v8.78h2.82v1.77Zm3.87-8.16h1.25v3.66H22.1v-3.66Zm-3.34 0H20v3.66h-1.25v-3.66ZM20 7.9a12 12 0 1 0 0 24 12 12 0 0 0 0-24Zm6.69 14.56-3.66 3.66h-2.72l-1.77 1.78h-1.88V26.1H13.3v-9.82l.94-2.4H26.7v8.56Z"
        />
      </g>
    </g>
  </g>
  <defs>
    <clipPath id="a"><rect width="40" height="40" fill="#fff" rx="20" /></clipPath>
    <clipPath id="b"><path fill="#fff" d="M0 0h40v40H0z" /></clipPath>
    <clipPath id="c"><path fill="#fff" d="M8 7.89h24v24H8z" /></clipPath>
  </defs>
</svg>`;var IO=Object.freeze({__proto__:null,twitchSvg:xO});const AO=W`<svg fill="none" viewBox="0 0 41 40">
  <g clip-path="url(#a)">
    <path fill="#000" d="M.8 0h40v40H.8z" />
    <path
      fill="#fff"
      d="m22.63 18.46 7.14-8.3h-1.69l-6.2 7.2-4.96-7.2H11.2l7.5 10.9-7.5 8.71h1.7l6.55-7.61 5.23 7.61h5.72l-7.77-11.31Zm-9.13-7.03h2.6l11.98 17.13h-2.6L13.5 11.43Z"
    />
  </g>
  <defs>
    <clipPath id="a"><path fill="#fff" d="M.8 20a20 20 0 1 1 40 0 20 20 0 0 1-40 0Z" /></clipPath>
  </defs>
</svg>`;var Tf=Object.freeze({__proto__:null,xSvg:AO});const _O=W`<svg fill="none" viewBox="0 0 16 16">
  <path
    fill="currentColor"
    d="m14.36 4.74.01.42c0 4.34-3.3 9.34-9.34 9.34A9.3 9.3 0 0 1 0 13.03a6.6 6.6 0 0 0 4.86-1.36 3.29 3.29 0 0 1-3.07-2.28c.5.1 1 .07 1.48-.06A3.28 3.28 0 0 1 .64 6.11v-.04c.46.26.97.4 1.49.41A3.29 3.29 0 0 1 1.11 2.1a9.32 9.32 0 0 0 6.77 3.43 3.28 3.28 0 0 1 5.6-3 6.59 6.59 0 0 0 2.08-.8 3.3 3.3 0 0 1-1.45 1.82A6.53 6.53 0 0 0 16 3.04c-.44.66-1 1.23-1.64 1.7Z"
  />
</svg>`;var NO=Object.freeze({__proto__:null,twitterIconSvg:_O});const SO=W`<svg fill="none" viewBox="0 0 28 28">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M18.1 4.76c-.42-.73-1.33-1.01-2.09-.66l-1.42.66c-.37.18-.8.18-1.18 0l-1.4-.65a1.63 1.63 0 0 0-2.1.66l-.84 1.45c-.2.34-.53.59-.92.67l-1.7.35c-.83.17-1.39.94-1.3 1.78l.19 1.56c.04.39-.08.78-.33 1.07l-1.12 1.3c-.52.6-.52 1.5 0 2.11L5 16.38c.25.3.37.68.33 1.06l-.18 1.57c-.1.83.46 1.6 1.28 1.78l1.7.35c.4.08.73.32.93.66l.84 1.43a1.63 1.63 0 0 0 2.09.66l1.41-.66c.37-.17.8-.17 1.18 0l1.43.67c.76.35 1.66.07 2.08-.65l.86-1.45c.2-.34.54-.58.92-.66l1.68-.35A1.63 1.63 0 0 0 22.84 19l-.18-1.57a1.4 1.4 0 0 1 .33-1.06l1.12-1.32c.52-.6.52-1.5 0-2.11l-1.12-1.3a1.4 1.4 0 0 1-.33-1.07l.18-1.57c.1-.83-.46-1.6-1.28-1.77l-1.68-.35a1.4 1.4 0 0 1-.92-.66l-.86-1.47Zm-3.27-3.2a4.43 4.43 0 0 1 5.69 1.78l.54.93 1.07.22a4.43 4.43 0 0 1 3.5 4.84l-.11.96.7.83a4.43 4.43 0 0 1 .02 5.76l-.72.85.1.96a4.43 4.43 0 0 1-3.5 4.84l-1.06.22-.54.92a4.43 4.43 0 0 1-5.68 1.77l-.84-.4-.82.39a4.43 4.43 0 0 1-5.7-1.79l-.51-.89-1.09-.22a4.43 4.43 0 0 1-3.5-4.84l.1-.96-.72-.85a4.43 4.43 0 0 1 .01-5.76l.71-.83-.1-.95a4.43 4.43 0 0 1 3.5-4.84l1.08-.23.53-.9a4.43 4.43 0 0 1 5.7-1.8l.81.38.83-.39ZM18.2 9.4c.65.42.84 1.28.42 1.93l-4.4 6.87a1.4 1.4 0 0 1-2.26.14L9.5 15.39a1.4 1.4 0 0 1 2.15-1.8l1.23 1.48 3.38-5.26a1.4 1.4 0 0 1 1.93-.42Z"
    clip-rule="evenodd"
  />
</svg>`;var $O=Object.freeze({__proto__:null,verifySvg:SO});const kO=W`<svg fill="none" viewBox="0 0 14 14">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="m4.1 12.43-.45-.78-.93-.2a1.65 1.65 0 0 1-1.31-1.8l.1-.86-.61-.71a1.65 1.65 0 0 1 0-2.16l.6-.7-.09-.85c-.1-.86.47-1.64 1.3-1.81l.94-.2.45-.78A1.65 1.65 0 0 1 6.23.9l.77.36.78-.36c.77-.36 1.69-.07 2.12.66l.47.8.91.2c.84.17 1.4.95 1.31 1.8l-.1.86.6.7c.54.62.54 1.54.01 2.16l-.6.71.09.86c.1.85-.47 1.63-1.3 1.8l-.92.2-.47.79a1.65 1.65 0 0 1-2.12.66L7 12.74l-.77.36c-.78.35-1.7.07-2.13-.67Zm5.74-6.9a1 1 0 1 0-1.68-1.07L6.32 7.3l-.55-.66a1 1 0 0 0-1.54 1.28l1.43 1.71a1 1 0 0 0 1.61-.1l2.57-4Z"
    clip-rule="evenodd"
  />
</svg>`;var PO=Object.freeze({__proto__:null,verifyFilledSvg:kO});const OO=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M0 5.5c0-1.8 1.46-3.25 3.25-3.25H14.5c1.8 0 3.25 1.46 3.25 3.25v.28A3.25 3.25 0 0 1 20 8.88v2.24c0 1.45-.94 2.68-2.25 3.1v.28c0 1.8-1.46 3.25-3.25 3.25H3.25A3.25 3.25 0 0 1 0 14.5v-9Zm15.75 8.88h-2.38a4.38 4.38 0 0 1 0-8.76h2.38V5.5c0-.69-.56-1.25-1.25-1.25H3.25C2.56 4.25 2 4.81 2 5.5v9c0 .69.56 1.25 1.25 1.25H14.5c.69 0 1.25-.56 1.25-1.25v-.13Zm-2.38-6.76a2.37 2.37 0 1 0 0 4.75h3.38c.69 0 1.25-.55 1.25-1.24V8.87c0-.69-.56-1.24-1.25-1.24h-3.38Z"
    clip-rule="evenodd"
  />
</svg>`;var TO=Object.freeze({__proto__:null,walletSvg:OO});const RO=W`<svg fill="none" viewBox="0 0 96 67">
  <path
    fill="currentColor"
    d="M25.32 18.8a32.56 32.56 0 0 1 45.36 0l1.5 1.47c.63.62.63 1.61 0 2.22l-5.15 5.05c-.31.3-.82.3-1.14 0l-2.07-2.03a22.71 22.71 0 0 0-31.64 0l-2.22 2.18c-.31.3-.82.3-1.14 0l-5.15-5.05a1.55 1.55 0 0 1 0-2.22l1.65-1.62Zm56.02 10.44 4.59 4.5c.63.6.63 1.6 0 2.21l-20.7 20.26c-.62.61-1.63.61-2.26 0L48.28 41.83a.4.4 0 0 0-.56 0L33.03 56.21c-.63.61-1.64.61-2.27 0L10.07 35.95a1.55 1.55 0 0 1 0-2.22l4.59-4.5a1.63 1.63 0 0 1 2.27 0L31.6 43.63a.4.4 0 0 0 .57 0l14.69-14.38a1.63 1.63 0 0 1 2.26 0l14.69 14.38a.4.4 0 0 0 .57 0l14.68-14.38a1.63 1.63 0 0 1 2.27 0Z"
  />
  <path
    stroke="#000"
    stroke-opacity=".1"
    d="M25.67 19.15a32.06 32.06 0 0 1 44.66 0l1.5 1.48c.43.42.43 1.09 0 1.5l-5.15 5.05a.31.31 0 0 1-.44 0l-2.07-2.03a23.21 23.21 0 0 0-32.34 0l-2.22 2.18a.31.31 0 0 1-.44 0l-5.15-5.05a1.05 1.05 0 0 1 0-1.5l1.65-1.63ZM81 29.6l4.6 4.5c.42.41.42 1.09 0 1.5l-20.7 20.26c-.43.43-1.14.43-1.57 0L48.63 41.47a.9.9 0 0 0-1.26 0L32.68 55.85c-.43.43-1.14.43-1.57 0L10.42 35.6a1.05 1.05 0 0 1 0-1.5l4.59-4.5a1.13 1.13 0 0 1 1.57 0l14.68 14.38a.9.9 0 0 0 1.27 0l-.35-.35.35.35L47.22 29.6a1.13 1.13 0 0 1 1.56 0l14.7 14.38a.9.9 0 0 0 1.26 0L79.42 29.6a1.13 1.13 0 0 1 1.57 0Z"
  />
</svg>`,LO=W`
<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_22274_4692)">
<path d="M0 6.64C0 4.17295 0 2.93942 0.525474 2.01817C0.880399 1.39592 1.39592 0.880399 2.01817 0.525474C2.93942 0 4.17295 0 6.64 0H9.36C11.8271 0 13.0606 0 13.9818 0.525474C14.6041 0.880399 15.1196 1.39592 15.4745 2.01817C16 2.93942 16 4.17295 16 6.64V9.36C16 11.8271 16 13.0606 15.4745 13.9818C15.1196 14.6041 14.6041 15.1196 13.9818 15.4745C13.0606 16 11.8271 16 9.36 16H6.64C4.17295 16 2.93942 16 2.01817 15.4745C1.39592 15.1196 0.880399 14.6041 0.525474 13.9818C0 13.0606 0 11.8271 0 9.36V6.64Z" fill="#C7B994"/>
<path d="M4.49038 5.76609C6.42869 3.86833 9.5713 3.86833 11.5096 5.76609L11.7429 5.99449C11.8398 6.08938 11.8398 6.24323 11.7429 6.33811L10.9449 7.11942C10.8964 7.16686 10.8179 7.16686 10.7694 7.11942L10.4484 6.80512C9.09617 5.48119 6.90381 5.48119 5.5516 6.80512L5.20782 7.14171C5.15936 7.18915 5.08079 7.18915 5.03234 7.14171L4.23434 6.3604C4.13742 6.26552 4.13742 6.11167 4.23434 6.01678L4.49038 5.76609ZM13.1599 7.38192L13.8702 8.07729C13.9671 8.17217 13.9671 8.32602 13.8702 8.4209L10.6677 11.5564C10.5708 11.6513 10.4137 11.6513 10.3168 11.5564L8.04388 9.33105C8.01965 9.30733 7.98037 9.30733 7.95614 9.33105L5.6833 11.5564C5.58638 11.6513 5.42925 11.6513 5.33234 11.5564L2.12982 8.42087C2.0329 8.32598 2.0329 8.17213 2.12982 8.07724L2.84004 7.38188C2.93695 7.28699 3.09408 7.28699 3.191 7.38188L5.46392 9.60726C5.48815 9.63098 5.52743 9.63098 5.55166 9.60726L7.82447 7.38188C7.92138 7.28699 8.07851 7.28699 8.17543 7.38187L10.4484 9.60726C10.4726 9.63098 10.5119 9.63098 10.5361 9.60726L12.809 7.38192C12.9059 7.28703 13.063 7.28703 13.1599 7.38192Z" fill="#202020"/>
</g>
<defs>
<clipPath id="clip0_22274_4692">
<path d="M0 8C0 3.58172 3.58172 0 8 0C12.4183 0 16 3.58172 16 8C16 12.4183 12.4183 16 8 16C3.58172 16 0 12.4183 0 8Z" fill="white"/>
</clipPath>
</defs>
</svg>
`,MO=W`
<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<circle cx="11" cy="11" r="11" transform="matrix(-1 0 0 1 23 1)" fill="#202020"/>
<circle cx="11" cy="11" r="11.5" transform="matrix(-1 0 0 1 23 1)" stroke="#C7B994" stroke-opacity="0.7"/>
<path d="M15.4523 11.0686L16.7472 9.78167C13.8205 6.87297 10.1838 6.87297 7.25708 9.78167L8.55201 11.0686C10.7779 8.85645 13.2279 8.85645 15.4538 11.0686H15.4523Z" fill="#C7B994"/>
<path d="M15.0199 14.067L12 11.0656L8.98 14.067L5.96004 11.0656L4.66663 12.3511L8.98 16.6393L12 13.638L15.0199 16.6393L19.3333 12.3511L18.0399 11.0656L15.0199 14.067Z" fill="#C7B994"/>
</svg>
`;var Ch=Object.freeze({__proto__:null,walletConnectSvg:RO,walletConnectLightBrownSvg:LO,walletConnectBrownSvg:MO});const BO=W`
  <svg fill="none" viewBox="0 0 48 44">
    <path
      style="fill: var(--wui-color-bg-300);"
      d="M4.56 8.64c-1.23 1.68-1.23 4.08-1.23 8.88v8.96c0 4.8 0 7.2 1.23 8.88.39.55.87 1.02 1.41 1.42C7.65 38 10.05 38 14.85 38h14.3c4.8 0 7.2 0 8.88-1.22a6.4 6.4 0 0 0 1.41-1.42c.83-1.14 1.1-2.6 1.19-4.92a6.4 6.4 0 0 0 5.16-4.65c.21-.81.21-1.8.21-3.79 0-1.98 0-2.98-.22-3.79a6.4 6.4 0 0 0-5.15-4.65c-.1-2.32-.36-3.78-1.19-4.92a6.4 6.4 0 0 0-1.41-1.42C36.35 6 33.95 6 29.15 6h-14.3c-4.8 0-7.2 0-8.88 1.22a6.4 6.4 0 0 0-1.41 1.42Z"
    />
    <path
      style="fill: var(--wui-color-fg-200);"
      fill-rule="evenodd"
      d="M2.27 11.33a6.4 6.4 0 0 1 6.4-6.4h26.66a6.4 6.4 0 0 1 6.4 6.4v1.7a6.4 6.4 0 0 1 5.34 6.3v5.34a6.4 6.4 0 0 1-5.34 6.3v1.7a6.4 6.4 0 0 1-6.4 6.4H8.67a6.4 6.4 0 0 1-6.4-6.4V11.33ZM39.6 31.07h-6.93a9.07 9.07 0 1 1 0-18.14h6.93v-1.6a4.27 4.27 0 0 0-4.27-4.26H8.67a4.27 4.27 0 0 0-4.27 4.26v21.34a4.27 4.27 0 0 0 4.27 4.26h26.66a4.27 4.27 0 0 0 4.27-4.26v-1.6Zm-6.93-16a6.93 6.93 0 0 0 0 13.86h8a4.27 4.27 0 0 0 4.26-4.26v-5.34a4.27 4.27 0 0 0-4.26-4.26h-8Z"
      clip-rule="evenodd"
    />
  </svg>
`;var UO=Object.freeze({__proto__:null,walletPlaceholderSvg:BO});const DO=W`<svg fill="none" viewBox="0 0 20 20">
  <path
    fill="currentColor"
    d="M11 6.67a1 1 0 1 0-2 0v2.66a1 1 0 0 0 2 0V6.67ZM10 14.5a1.25 1.25 0 1 0 0-2.5 1.25 1.25 0 0 0 0 2.5Z"
  />
  <path
    fill="currentColor"
    fill-rule="evenodd"
    d="M10 1a9 9 0 1 0 0 18 9 9 0 0 0 0-18Zm-7 9a7 7 0 1 1 14 0 7 7 0 0 1-14 0Z"
    clip-rule="evenodd"
  />
</svg>`;var jO=Object.freeze({__proto__:null,warningCircleSvg:DO});const zO=W`<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M9.125 6.875C9.125 6.57833 9.21298 6.28832 9.3778 6.04165C9.54262 5.79497 9.77689 5.60271 10.051 5.48918C10.3251 5.37565 10.6267 5.34594 10.9176 5.40382C11.2086 5.4617 11.4759 5.60456 11.6857 5.81434C11.8954 6.02412 12.0383 6.29139 12.0962 6.58236C12.1541 6.87334 12.1244 7.17494 12.0108 7.44903C11.8973 7.72311 11.705 7.95738 11.4584 8.1222C11.2117 8.28703 10.9217 8.375 10.625 8.375C10.2272 8.375 9.84565 8.21696 9.56434 7.93566C9.28304 7.65436 9.125 7.27282 9.125 6.875ZM21.125 11C21.125 13.0025 20.5312 14.9601 19.4186 16.6251C18.3061 18.2902 16.7248 19.5879 14.8747 20.3543C13.0246 21.1206 10.9888 21.3211 9.02471 20.9305C7.06066 20.5398 5.25656 19.5755 3.84055 18.1595C2.42454 16.7435 1.46023 14.9393 1.06955 12.9753C0.678878 11.0112 0.879387 8.97543 1.64572 7.12533C2.41206 5.27523 3.70981 3.69392 5.37486 2.58137C7.0399 1.46882 8.99747 0.875 11 0.875C13.6844 0.877978 16.258 1.94567 18.1562 3.84383C20.0543 5.74199 21.122 8.3156 21.125 11ZM18.875 11C18.875 9.44247 18.4131 7.91992 17.5478 6.62488C16.6825 5.32985 15.4526 4.32049 14.0136 3.72445C12.5747 3.12841 10.9913 2.97246 9.46367 3.27632C7.93607 3.58017 6.53288 4.3302 5.43154 5.43153C4.3302 6.53287 3.58018 7.93606 3.27632 9.46366C2.97246 10.9913 3.12841 12.5747 3.72445 14.0136C4.32049 15.4526 5.32985 16.6825 6.62489 17.5478C7.91993 18.4131 9.44248 18.875 11 18.875C13.0879 18.8728 15.0896 18.0424 16.566 16.566C18.0424 15.0896 18.8728 13.0879 18.875 11ZM12.125 14.4387V11.375C12.125 10.8777 11.9275 10.4008 11.5758 10.0492C11.2242 9.69754 10.7473 9.5 10.25 9.5C9.98433 9.4996 9.72708 9.59325 9.52383 9.76435C9.32058 9.93544 9.18444 10.173 9.13952 10.4348C9.09461 10.6967 9.14381 10.966 9.27843 11.195C9.41304 11.4241 9.62438 11.5981 9.875 11.6863V14.75C9.875 15.2473 10.0725 15.7242 10.4242 16.0758C10.7758 16.4275 11.2527 16.625 11.75 16.625C12.0157 16.6254 12.2729 16.5318 12.4762 16.3607C12.6794 16.1896 12.8156 15.952 12.8605 15.6902C12.9054 15.4283 12.8562 15.159 12.7216 14.93C12.587 14.7009 12.3756 14.5269 12.125 14.4387Z" fill="currentColor"/>
</svg>`;var FO=Object.freeze({__proto__:null,infoSvg:zO});const HO=W`<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M15.0162 11.6312L9.55059 2.13937C9.39228 1.86862 9.16584 1.64405 8.8938 1.48798C8.62176 1.33192 8.3136 1.2498 7.99997 1.2498C7.68634 1.2498 7.37817 1.33192 7.10613 1.48798C6.83409 1.64405 6.60765 1.86862 6.44934 2.13937L0.983716 11.6312C0.830104 11.894 0.749146 12.1928 0.749146 12.4972C0.749146 12.8015 0.830104 13.1004 0.983716 13.3631C1.14027 13.6352 1.3664 13.8608 1.63889 14.0166C1.91139 14.1725 2.22044 14.253 2.53434 14.25H13.4656C13.7793 14.2528 14.0881 14.1721 14.3603 14.0163C14.6326 13.8604 14.8585 13.635 15.015 13.3631C15.1688 13.1005 15.2499 12.8017 15.2502 12.4973C15.2504 12.193 15.1696 11.8941 15.0162 11.6312ZM13.7162 12.6125C13.6908 12.6558 13.6541 12.6914 13.6101 12.7157C13.5661 12.7399 13.5164 12.7517 13.4662 12.75H2.53434C2.48415 12.7517 2.43442 12.7399 2.39042 12.7157C2.34641 12.6914 2.30976 12.6558 2.28434 12.6125C2.26278 12.5774 2.25137 12.5371 2.25137 12.4959C2.25137 12.4548 2.26278 12.4144 2.28434 12.3794L7.74997 2.88749C7.77703 2.84583 7.81408 2.8116 7.85774 2.7879C7.9014 2.7642 7.95029 2.75178 7.99997 2.75178C8.04964 2.75178 8.09854 2.7642 8.1422 2.7879C8.18586 2.8116 8.2229 2.84583 8.24997 2.88749L13.715 12.3794C13.7367 12.4143 13.7483 12.4546 13.7486 12.4958C13.7488 12.5369 13.7376 12.5773 13.7162 12.6125ZM7.24997 8.49999V6.49999C7.24997 6.30108 7.32898 6.11031 7.46964 5.96966C7.61029 5.82901 7.80105 5.74999 7.99997 5.74999C8.19888 5.74999 8.38964 5.82901 8.5303 5.96966C8.67095 6.11031 8.74997 6.30108 8.74997 6.49999V8.49999C8.74997 8.6989 8.67095 8.88967 8.5303 9.03032C8.38964 9.17097 8.19888 9.24999 7.99997 9.24999C7.80105 9.24999 7.61029 9.17097 7.46964 9.03032C7.32898 8.88967 7.24997 8.6989 7.24997 8.49999ZM8.99997 11C8.99997 11.1978 8.94132 11.3911 8.83144 11.5556C8.72155 11.72 8.56538 11.8482 8.38265 11.9239C8.19992 11.9996 7.99886 12.0194 7.80488 11.9808C7.6109 11.9422 7.43271 11.847 7.29286 11.7071C7.15301 11.5672 7.05777 11.3891 7.01918 11.1951C6.9806 11.0011 7.0004 10.8 7.07609 10.6173C7.15177 10.4346 7.27995 10.2784 7.4444 10.1685C7.60885 10.0586 7.80219 9.99999 7.99997 9.99999C8.26518 9.99999 8.51954 10.1053 8.70707 10.2929C8.89461 10.4804 8.99997 10.7348 8.99997 11Z" fill="currentColor"/>
</svg>
`;var qO=Object.freeze({__proto__:null,exclamationTriangleSvg:HO});const WO=W`<svg width="60" height="16" viewBox="0 0 60 16" fill="none"">
  <path d="M9.3335 4.66667C9.3335 2.08934 11.4229 0 14.0002 0H20.6669C23.2442 0 25.3335 2.08934 25.3335 4.66667V11.3333C25.3335 13.9106 23.2442 16 20.6669 16H14.0002C11.4229 16 9.3335 13.9106 9.3335 11.3333V4.66667Z" fill="#363636"/>
  <path d="M15.6055 11.0003L17.9448 4.66699H18.6316L16.2923 11.0003H15.6055Z" fill="#F6F6F6"/>
  <path d="M0 4.33333C0 1.9401 1.9401 0 4.33333 0C6.72657 0 8.66669 1.9401 8.66669 4.33333V11.6667C8.66669 14.0599 6.72657 16 4.33333 16C1.9401 16 0 14.0599 0 11.6667V4.33333Z" fill="#363636"/>
  <path d="M3.9165 9.99934V9.16602H4.74983V9.99934H3.9165Z" fill="#F6F6F6"/>
  <path d="M26 8C26 3.58172 29.3517 0 33.4863 0H52.5137C56.6483 0 60 3.58172 60 8C60 12.4183 56.6483 16 52.5137 16H33.4863C29.3517 16 26 12.4183 26 8Z" fill="#363636"/>
  <path d="M49.3687 9.95834V6.26232H50.0213V6.81966C50.256 6.40899 50.7326 6.16699 51.2606 6.16699C52.0599 6.16699 52.6173 6.67299 52.6173 7.65566V9.95834H51.972V7.69234C51.972 7.04696 51.6053 6.70966 51.07 6.70966C50.4906 6.70966 50.0213 7.17168 50.0213 7.82433V9.95834H49.3687Z" fill="#F6F6F6"/>
  <path d="M45.2538 9.95773L44.5718 6.26172H45.1877L45.6717 9.31242L46.3098 7.30306H46.9184L47.5491 9.29041L48.0404 6.26172H48.6564L47.9744 9.95773H47.2411L46.6178 8.03641L45.9871 9.95773H45.2538Z" fill="#F6F6F6"/>
  <path d="M42.3709 10.0536C41.2489 10.0536 40.5889 9.21765 40.5889 8.1103C40.5889 7.01035 41.2489 6.16699 42.3709 6.16699C43.4929 6.16699 44.1529 7.01035 44.1529 8.1103C44.1529 9.21765 43.4929 10.0536 42.3709 10.0536ZM42.3709 9.51096C43.1775 9.51096 43.4856 8.82164 43.4856 8.10296C43.4856 7.39163 43.1775 6.70966 42.3709 6.70966C41.5642 6.70966 41.2562 7.39163 41.2562 8.10296C41.2562 8.82164 41.5642 9.51096 42.3709 9.51096Z" fill="#F6F6F6"/>
  <path d="M38.2805 10.0536C37.1952 10.0536 36.5132 9.22499 36.5132 8.1103C36.5132 7.00302 37.1952 6.16699 38.2805 6.16699C39.1972 6.16699 40.0038 6.68766 39.9159 8.27896H37.1805C37.2319 8.96103 37.5472 9.5183 38.2805 9.5183C38.7718 9.5183 39.0945 9.21765 39.2045 8.87299H39.8499C39.7472 9.48903 39.1679 10.0536 38.2805 10.0536ZM37.1952 7.78765H39.2852C39.2338 7.04696 38.8892 6.70232 38.2805 6.70232C37.6132 6.70232 37.2832 7.18635 37.1952 7.78765Z" fill="#F6F6F6"/>
  <path d="M33.3828 9.95773V6.26172H34.0501V6.88506C34.2848 6.47439 34.6882 6.26172 35.1061 6.26172H35.9935V6.88506H35.0548C34.4682 6.88506 34.0501 7.26638 34.0501 8.00706V9.95773H33.3828Z" fill="#F6F6F6"/>
</svg>`;var VO=Object.freeze({__proto__:null,reownSvg:WO});const sR=Object.freeze(Object.defineProperty({__proto__:null,EthereumProvider:wE,OPTIONAL_EVENTS:dm,OPTIONAL_METHODS:um,REQUIRED_EVENTS:ql,REQUIRED_METHODS:Hl,default:wu},Symbol.toStringTag,{value:"Module"}));export{Uy as H,l0 as a,Sy as b,ZO as c,GO as d,au as e,JO as f,XO as g,sR as i,YO as r,qf as t,Dy as w};
