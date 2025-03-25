import{r as o,S as i}from"./components-DT2JeTQS.js";import{i as k,n as f,d as L,M as P,E as b,u as M,P as T,a as x,t as R,c as _,b as w,e as N,T as O,f as I,j as B,I as D,S as H,L as V}from"./context-C_RzwAk6.js";const p="data-lock-scrolling",v="data-lock-scrolling-hidden",E="data-lock-scrolling-wrapper";let d=0;function W(){const{body:r}=document;return r.scrollHeight>r.clientHeight}class ${constructor(){this.scrollLocks=0,this.locked=!1}registerScrollLock(){this.scrollLocks+=1,this.handleScrollLocking()}unregisterScrollLock(){this.scrollLocks-=1,this.handleScrollLocking()}handleScrollLocking(){if(k)return;const{scrollLocks:e}=this,{body:t}=document,n=t.firstElementChild;e===0?(t.removeAttribute(p),t.removeAttribute(v),n&&n.removeAttribute(E),window.scroll(0,d),this.locked=!1):e>0&&!this.locked&&(d=window.pageYOffset,t.setAttribute(p,""),W()||t.setAttribute(v,""),n&&(n.setAttribute(E,""),n.scrollTop=d),this.locked=!0)}resetScrollPosition(){d=0}}const F=/\[(.*?)\]|(\w+)/g;function C(r,e,t){if(r==null)return;const n=Array.isArray(e)?e:K(e);let s=r;for(let a=0;a<n.length;a++){const l=s[n[a]];if(l===void 0)return t;s=l}return s}function K(r){const e=[];let t;for(;t=F.exec(r);){const[,n,s]=t;e.push(n||s)}return e}function G(...r){let e={};for(const t of r)e=A(e,t);return e}function A(r,e){const t=Array.isArray(r)?[...r]:{...r};for(const n in e)if(Object.prototype.hasOwnProperty.call(e,n))S(e[n])&&S(t[n])?t[n]=A(t[n],e[n]):t[n]=e[n];else continue;return t}function S(r){return r!==null&&typeof r=="object"}const U=/{([^}]*)}/g;class y{constructor(e){this.translation={},this.translation=Array.isArray(e)?G(...e.slice().reverse()):e}translate(e,t){const n=C(this.translation,e,"");return n?t?n.replace(U,s=>{const a=s.substring(1,s.length-1);if(t[a]===void 0){const l=JSON.stringify(t);throw new Error(`Error in translation for key '${e}'. No replacement found for key '${a}'. The following replacements were passed: '${l}'`)}return t[a]}):n:""}translationKeyExists(e){return!!C(this.translation,e)}}const z=o.createContext(void 0),Q=o.createContext(void 0),J=function({children:e}){const[t,n]=o.useState(f().matches),s=o.useCallback(L(()=>{t!==f().matches&&n(!t)},40,{trailing:!0,leading:!0,maxWait:40}),[t]);o.useEffect(()=>{n(f().matches)},[]);const a=o.useMemo(()=>({isNavigationCollapsed:t}),[t]);return i.createElement(P.Provider,{value:a},i.createElement(b,{event:"resize",handler:s}),e)};function X(r,e){return i.createElement("div",{id:"PolarisPortalsContainer",ref:e})}const Z=o.forwardRef(X);function Y({children:r,container:e}){const t=M(),n=o.useRef(null),s=o.useMemo(()=>e?{container:e}:t?{container:n.current}:{container:null},[e,t]);return i.createElement(T.Provider,{value:s},r,e?null:i.createElement(Z,{ref:n}))}const q=o.createContext(void 0);function j({children:r}){const[e,t]=o.useState([]),n=o.useCallback(l=>{t(c=>[...c,l])},[]),s=o.useCallback(l=>{let c=!0;return t(h=>{const u=[...h],g=u.indexOf(l);return g===-1?c=!1:u.splice(g,1),u}),c},[]),a=o.useMemo(()=>({trapFocusList:e,add:n,remove:s}),[n,e,s]);return i.createElement(q.Provider,{value:a},r)}const ee={tooltip:0,hovercard:0};function te({children:r}){const[e,t]=o.useState(ee),n=o.useCallback(l=>{t(c=>({...c,[l]:c[l]+1}))},[]),s=o.useCallback(l=>{t(c=>({...c,[l]:c[l]-1}))},[]),a=o.useMemo(()=>({presenceList:Object.entries(e).reduce((l,c)=>{const[h,u]=c;return{...l,[h]:u>=1}},{}),presenceCounter:e,addPresence:n,removePresence:s}),[n,s,e]);return i.createElement(x.Provider,{value:a},r)}const ne=20,m=30,re=m+10;function se(){var s;const r=document.createElement("div");r.setAttribute("style",`position: absolute; opacity: 0; transform: translate3d(-9999px, -9999px, 0); pointer-events: none; width:${m}px; height:${m}px;`);const e=document.createElement("div");e.setAttribute("style",`width:100%; height: ${re}; overflow:scroll; scrollbar-width: thin;`),r.appendChild(e),document.body.appendChild(r);const t=m-(((s=r.firstElementChild)==null?void 0:s.clientWidth)??0),n=Math.min(t,ne);document.documentElement.style.setProperty("--pc-app-provider-scrollbar-width",`${n}px`),document.body.removeChild(r)}class ie extends o.Component{constructor(e){super(e),this.setBodyStyles=()=>{document.body.style.backgroundColor="var(--p-color-bg)",document.body.style.color="var(--p-color-text)"},this.setRootAttributes=()=>{const s=this.getThemeName();R.forEach(a=>{document.documentElement.classList.toggle(_(a),a===s)})},this.getThemeName=()=>this.props.theme??w,this.stickyManager=new N,this.scrollLockManager=new $;const{i18n:t,linkComponent:n}=this.props;this.state={link:n,intl:new y(t)}}componentDidMount(){if(document!=null){this.stickyManager.setContainer(document),this.setBodyStyles(),this.setRootAttributes();const e=navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")&&(navigator.userAgent.includes("Version/16.1")||navigator.userAgent.includes("Version/16.2")||navigator.userAgent.includes("Version/16.3")),t=navigator.userAgent.includes("Shopify Mobile/iOS")&&(navigator.userAgent.includes("OS 16_1")||navigator.userAgent.includes("OS 16_2")||navigator.userAgent.includes("OS 16_3"));(e||t)&&document.documentElement.classList.add("Polaris-Safari-16-Font-Optical-Sizing-Patch")}se()}componentDidUpdate({i18n:e,linkComponent:t}){const{i18n:n,linkComponent:s}=this.props;this.setRootAttributes(),!(n===e&&s===t)&&this.setState({link:s,intl:new y(n)})}render(){const{children:e,features:t}=this.props,n=this.getThemeName(),{intl:s,link:a}=this.state;return i.createElement(O.Provider,{value:n},i.createElement(I.Provider,{value:B(n)},i.createElement(z.Provider,{value:t},i.createElement(D.Provider,{value:s},i.createElement(Q.Provider,{value:this.scrollLockManager},i.createElement(H.Provider,{value:this.stickyManager},i.createElement(V.Provider,{value:a},i.createElement(J,null,i.createElement(Y,null,i.createElement(j,null,i.createElement(te,null,e)))))))))))}}const le="/assets/styles-BeiPL2RV.css";export{ie as A,le as p};
