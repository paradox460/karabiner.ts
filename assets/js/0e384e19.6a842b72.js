"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[671],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>d});var r=t(7294);function i(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function a(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?a(Object(t),!0).forEach((function(n){i(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):a(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,i=function(e,n){if(null==e)return{};var t,r,i={},a=Object.keys(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||(i[t]=e[t]);return i}(e,n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)t=a[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(i[t]=e[t])}return i}var c=r.createContext({}),s=function(e){var n=r.useContext(c),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=s(e.components);return r.createElement(c.Provider,{value:n},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},f=r.forwardRef((function(e,n){var t=e.components,i=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),u=s(t),f=i,d=u["".concat(c,".").concat(f)]||u[f]||m[f]||a;return t?r.createElement(d,o(o({ref:n},p),{},{components:t})):r.createElement(d,o({ref:n},p))}));function d(e,n){var t=arguments,i=n&&n.mdxType;if("string"==typeof e||i){var a=t.length,o=new Array(a);o[0]=f;var l={};for(var c in n)hasOwnProperty.call(n,c)&&(l[c]=n[c]);l.originalType=e,l[u]="string"==typeof e?e:i,o[1]=l;for(var s=2;s<a;s++)o[s]=t[s];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}f.displayName="MDXCreateElement"},9881:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>c,contentTitle:()=>o,default:()=>m,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=t(7462),i=(t(7294),t(3905));const a={title:"Intro",slug:"/"},o="karabiner.ts",l={unversionedId:"intro",id:"intro",title:"Intro",description:"Karabiner-Elements configuration file is",source:"@site/docs/intro.md",sourceDirName:".",slug:"/",permalink:"/",draft:!1,tags:[],version:"current",frontMatter:{title:"Intro",slug:"/"},sidebar:"docs",next:{title:"Playground",permalink:"/playground"}},c={},s=[],p={toc:s},u="wrapper";function m(e){let{components:n,...t}=e;return(0,i.kt)(u,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,i.kt)("h1",{id:"karabinerts"},"karabiner.ts"),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://karabiner-elements.pqrs.org/"},"Karabiner-Elements")," configuration file is\nin JSON format."),(0,i.kt)("details",null,(0,i.kt)("summary",null,"~/.config/karabiner/karabiner.json"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "profiles": [\n    {\n      // highlight-next-line\n      "name": "Default",                    // 1\n      "complex_modifications": {\n        // highlight-next-line\n        "rules": [                              // 2\n          {\n            "description": "Demo Rule",\n            // highlight-next-line\n            "manipulators": [                       // 3\n              {\n                "type": "basic",\n                // highlight-next-line\n                "from": { "key_code": "caps_lock" },    // 4\n                // highlight-next-line\n                "to": [                                 // 5\n                  {"key_code": "delete_or_backspace", "modifiers": ["command"]}\n                ],\n                // highlight-next-line\n                "conditions": [                         // 6\n                  {"type": "variable_if", "name": "test", "value": 1}\n                ]\n              }\n            ]\n          }\n        ]\n      }\n    }\n  ]\n}\n'))),(0,i.kt)("p",null,(0,i.kt)("a",{parentName:"p",href:"https://github.com/evan-liu/karabiner.ts"},(0,i.kt)("inlineCode",{parentName:"a"},"karabiner.ts"))," allows you to write ",(0,i.kt)("inlineCode",{parentName:"p"},"complex_modifications")," in TypeScript:"),(0,i.kt)("pre",null,(0,i.kt)("code",{parentName:"pre",className:"language-typescript"},"writeToProfile('Default', [ // 1 profile to config complex_modifications\n  rule('Demo Rule')             // 2 rules\n    .manipulators([                 // 3 manipulators\n      map('\u21ea')                          // 4 from\n        .to('\u232b', '\u2318')                   // 5 to\n        .condition(ifVar('test')),      // 6 conditions\n    ]),\n])\n")),(0,i.kt)("p",null,"Try it out at the online playground:"),(0,i.kt)("iframe",{src:"https://stackblitz.com/edit/karabiner-ts?embed=1&file=rules.js&hideExplorer=1&hideNavigation=1&terminalHeight=20",width:"100%",height:"1000"}))}m.isMDXComponent=!0}}]);