"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[205],{3905:(e,n,t)=>{t.d(n,{Zo:()=>p,kt:()=>y});var r=t(7294);function a(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);n&&(r=r.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,r)}return t}function o(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){a(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function l(e,n){if(null==e)return{};var t,r,a=function(e,n){if(null==e)return{};var t,r,a={},i=Object.keys(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||(a[t]=e[t]);return a}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)t=i[r],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(a[t]=e[t])}return a}var s=r.createContext({}),m=function(e){var n=r.useContext(s),t=n;return e&&(t="function"==typeof e?e(n):o(o({},n),e)),t},p=function(e){var n=m(e.components);return r.createElement(s.Provider,{value:n},e.children)},d="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return r.createElement(r.Fragment,{},n)}},c=r.forwardRef((function(e,n){var t=e.components,a=e.mdxType,i=e.originalType,s=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),d=m(t),c=a,y=d["".concat(s,".").concat(c)]||d[c]||u[c]||i;return t?r.createElement(y,o(o({ref:n},p),{},{components:t})):r.createElement(y,o({ref:n},p))}));function y(e,n){var t=arguments,a=n&&n.mdxType;if("string"==typeof e||a){var i=t.length,o=new Array(i);o[0]=c;var l={};for(var s in n)hasOwnProperty.call(n,s)&&(l[s]=n[s]);l.originalType=e,l[d]="string"==typeof e?e:a,o[1]=l;for(var m=2;m<i;m++)o[m]=t[m];return r.createElement.apply(null,o)}return r.createElement.apply(null,t)}c.displayName="MDXCreateElement"},1804:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>s,contentTitle:()=>o,default:()=>u,frontMatter:()=>i,metadata:()=>l,toc:()=>m});var r=t(7462),a=(t(7294),t(3905));const i={title:"simlayer()"},o=void 0,l={unversionedId:"rules/simlayer",id:"rules/simlayer",title:"simlayer()",description:"Generated JSON in profiles.complex_modifications.rules",source:"@site/docs/rules/simlayer.md",sourceDirName:"rules",slug:"/rules/simlayer",permalink:"/karabiner.ts/rules/simlayer",draft:!1,tags:[],version:"current",frontMatter:{title:"simlayer()"},sidebar:"docs",previous:{title:"layer()",permalink:"/karabiner.ts/rules/layer"},next:{title:"from / map*()",permalink:"/karabiner.ts/manipulators/from"}},s={},m=[{value:"How simlayer works",id:"how-simlayer-works",level:2},{value:"The threshold time",id:"the-threshold-time",level:2}],p={toc:m},d="wrapper";function u(e){let{components:n,...t}=e;return(0,a.kt)(d,(0,r.Z)({},p,t,{components:n,mdxType:"MDXLayout"}),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"simlayer('a', 'a-mode').manipulators([\n  map(1).to(2), // Only when key 'a' is pressed and held, then key '1' right after \n])\n")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Generated JSON in profiles.complex_modifications.rules"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "description": "Simlayer - a-mode",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {"key_code": "1"},\n      "to": [{"key_code": "2"}],\n      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]\n    },\n    {\n      "type": "basic",\n      "from": {\n        // highlight-next-line\n        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],\n        "simultaneous_options": {\n          "detect_key_down_uninterruptedly": true,\n          "key_down_order": "strict",\n          "key_up_order": "strict_inverse",\n          "key_up_when": "any",\n          // highlight-next-line\n          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]\n        }\n      },\n      // highlight-next-line\n      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "2"}],\n      // highlight-next-line\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200}\n    }\n  ]\n}\n'))),(0,a.kt)("h2",{id:"how-simlayer-works"},"How simlayer works"),(0,a.kt)("p",null,"Simlayer is similar to ",(0,a.kt)("a",{parentName:"p",href:"./layer"},"layer"),", which add a variable on a group of ",(0,a.kt)("inlineCode",{parentName:"p"},"manipulators"),".\nThe difference is how the variable is toggled. "),(0,a.kt)("p",null,"Layer sets the variable to 1\nwhen the layer key is pressed down and set it back to 0 when the key is released.\nSimlayer uses ",(0,a.kt)("a",{parentName:"p",href:"https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/from/simultaneous/"},"from.simultaneous"),"\nfunctionality instead. "),(0,a.kt)("p",null,"Simlayer sets the variable to 1 only if the simlayer key is pressed and held,\nthen any key on the simlayer is pressed within the threshold time (",(0,a.kt)("inlineCode",{parentName:"p"},"200 milliseconds"),"\nby default). Then the variable remains 1 until the simlayer key is released. "),(0,a.kt)("p",null,"For example, "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"simlayer('a', 'a-mode').manipulators([\n  map(1).to(','),\n  map(2).to('.'),\n])\n")),(0,a.kt)("details",null,(0,a.kt)("summary",null,"Generated JSON in profiles.complex_modifications.rules"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "description": "Simlayer - a-mode",\n  "manipulators": [\n    {\n      "type": "basic",\n      "from": {"key_code": "1"},\n      "to": [{"key_code": "comma"}],\n      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]\n    },\n    {\n      "type": "basic",\n      "from": {"key_code": "2"},\n      "to": [{"key_code": "period"}],\n      "conditions": [{"type": "variable_if", "name": "a-mode", "value": 1}]\n    },\n    {\n      "type": "basic",\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},\n      "to": [{"set_variable": {"name": "a-mode", "value": 1}}, {"key_code": "comma"}],\n      "from": {\n        "simultaneous": [{"key_code": "a"}, {"key_code": "1"}],\n        "simultaneous_options": {\n          "detect_key_down_uninterruptedly": true,\n          "key_down_order": "strict",\n          "key_up_order": "strict_inverse",\n          "key_up_when": "any",\n          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]\n        }\n      }\n    },\n    {\n      "type": "basic",\n      "parameters": {"basic.simultaneous_threshold_milliseconds": 200},\n      "to": [\n        {"set_variable": {"name": "a-mode", "value": 1}}, \n        {"key_code": "period"}\n      ],\n      "from": {\n        "simultaneous": [{"key_code": "a"}, {"key_code": "2"}],\n        "simultaneous_options": {\n          "detect_key_down_uninterruptedly": true,\n          "key_down_order": "strict",\n          "key_up_order": "strict_inverse",\n          "key_up_when": "any",\n          "to_after_key_up": [{"set_variable": {"name": "a-mode", "value": 0}}]\n        }\n      }\n    }\n  ]\n}\n\n'))),(0,a.kt)("p",null,"If key 'a' is pressed and held for longer than the threshold time, 'a' starts to\nrepeat."),(0,a.kt)("p",null,"If key 'a' is pressed and held, and key '1' (or '2') is also pressed within the\nthreshold time, the simlayer variable is set to 1, and ',' (or '.' for '2') is\ntriggered. As long as key 'a' is not released, ',' and '.' will be triggered\nwhen '1' or '2' is pressed."),(0,a.kt)("p",null,"Once key 'a' is released the simlayer variable is set back to 0. "),(0,a.kt)("h2",{id:"the-threshold-time"},"The threshold time"),(0,a.kt)("p",null,"The default threshold time is ",(0,a.kt)("inlineCode",{parentName:"p"},"200 milliseconds"),". It can be set on each layer"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"simlayer('a', 'a-mode', 100) // The third parameter `threshold` in milliseconds\n")),(0,a.kt)("p",null,"It can also be set at ",(0,a.kt)("inlineCode",{parentName:"p"},"writeToProfile()")," for all simlayer in the profile. "),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-typescript"},"writeToProfile(\n  '--dry-run', // profile name \n  [], // rules\n  { 'simlayer.threshold_milliseconds': 100 }, // parameters \n)\n")))}u.isMDXComponent=!0}}]);