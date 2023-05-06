"use strict";(self.webpackChunkkarabiner_ts_docs=self.webpackChunkkarabiner_ts_docs||[]).push([[253],{3905:(e,n,t)=>{t.d(n,{Zo:()=>d,kt:()=>k});var a=t(7294);function l(e,n,t){return n in e?Object.defineProperty(e,n,{value:t,enumerable:!0,configurable:!0,writable:!0}):e[n]=t,e}function i(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,a)}return t}function r(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?i(Object(t),!0).forEach((function(n){l(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):i(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}function o(e,n){if(null==e)return{};var t,a,l=function(e,n){if(null==e)return{};var t,a,l={},i=Object.keys(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||(l[t]=e[t]);return l}(e,n);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(a=0;a<i.length;a++)t=i[a],n.indexOf(t)>=0||Object.prototype.propertyIsEnumerable.call(e,t)&&(l[t]=e[t])}return l}var p=a.createContext({}),s=function(e){var n=a.useContext(p),t=n;return e&&(t="function"==typeof e?e(n):r(r({},n),e)),t},d=function(e){var n=s(e.components);return a.createElement(p.Provider,{value:n},e.children)},m="mdxType",u={inlineCode:"code",wrapper:function(e){var n=e.children;return a.createElement(a.Fragment,{},n)}},c=a.forwardRef((function(e,n){var t=e.components,l=e.mdxType,i=e.originalType,p=e.parentName,d=o(e,["components","mdxType","originalType","parentName"]),m=s(t),c=l,k=m["".concat(p,".").concat(c)]||m[c]||u[c]||i;return t?a.createElement(k,r(r({ref:n},d),{},{components:t})):a.createElement(k,r({ref:n},d))}));function k(e,n){var t=arguments,l=n&&n.mdxType;if("string"==typeof e||l){var i=t.length,r=new Array(i);r[0]=c;var o={};for(var p in n)hasOwnProperty.call(n,p)&&(o[p]=n[p]);o.originalType=e,o[m]="string"==typeof e?e:l,r[1]=o;for(var s=2;s<i;s++)r[s]=t[s];return a.createElement.apply(null,r)}return a.createElement.apply(null,t)}c.displayName="MDXCreateElement"},6804:(e,n,t)=>{t.r(n),t.d(n,{assets:()=>p,contentTitle:()=>r,default:()=>u,frontMatter:()=>i,metadata:()=>o,toc:()=>s});var a=t(7462),l=(t(7294),t(3905));const i={title:"from / mapDoubleTap()"},r="mapDoubleTap()",o={unversionedId:"manipulators/double-tap",id:"manipulators/double-tap",title:"from / mapDoubleTap()",description:"Generated JSON",source:"@site/docs/manipulators/double-tap.md",sourceDirName:"manipulators",slug:"/manipulators/double-tap",permalink:"/karabiner.ts/manipulators/double-tap",draft:!1,tags:[],version:"current",frontMatter:{title:"from / mapDoubleTap()"},sidebar:"docs",previous:{title:"from / map*()",permalink:"/karabiner.ts/manipulators/from"},next:{title:"to*()",permalink:"/karabiner.ts/manipulators/to"}},p={},s=[{value:"How doubleTap() works",id:"how-doubletap-works",level:2},{value:"The single tap",id:"the-single-tap",level:2},{value:"The delay time",id:"the-delay-time",level:2}],d={toc:s},m="wrapper";function u(e){let{components:n,...t}=e;return(0,l.kt)(m,(0,a.Z)({},d,t,{components:n,mdxType:"MDXLayout"}),(0,l.kt)("h1",{id:"mapdoubletap"},"mapDoubleTap()"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"mapDoubleTap('\u2191').to('\u2196\ufe0e') // double tap up_arrow -> home\n")),(0,l.kt)("details",null,(0,l.kt)("summary",null,"Generated JSON"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "type": "basic",\n    "from": {"key_code": "up_arrow"},\n    "to": [\n      {"key_code": "home"}\n    ],\n    // highlight-next-line\n    "conditions": [\n      // highlight-next-line\n      {"type": "variable_if", "name": "double-tap-up_arrow", "value": 1}\n    ]\n  },\n  {\n    "type": "basic",\n    "from": {"key_code": "up_arrow"},\n    // highlight-next-line\n    "to": [\n      // highlight-next-line\n      {"set_variable": {"name": "double-tap-up_arrow", "value": 1}}\n    ],\n    "conditions": [\n      {"type": "variable_unless", "name": "double-tap-up_arrow", "value": 1}\n    ],\n    "to_delayed_action": {\n      // highlight-next-line\n      "to_if_canceled": [\n        // highlight-next-line\n        {"set_variable": {"name": "double-tap-up_arrow", "value": 0}}\n      ],\n      // highlight-next-line\n      "to_if_invoked": [\n        // highlight-next-line\n        {"set_variable": {"name": "double-tap-up_arrow", "value": 0}},\n        {"key_code": "up_arrow"}\n      ]\n    },\n    "parameters": {\n      "basic.to_delayed_action_delay_milliseconds": 200\n    }\n  }\n]\n'))),(0,l.kt)("h2",{id:"how-doubletap-works"},"How doubleTap() works"),(0,l.kt)("p",null,(0,l.kt)("inlineCode",{parentName:"p"},"doubleTap()")," adds a ",(0,l.kt)("inlineCode",{parentName:"p"},"variable")," condition to the ",(0,l.kt)("inlineCode",{parentName:"p"},"manipulator"),". "),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"When the key is tapped at the first time, the ",(0,l.kt)("inlineCode",{parentName:"li"},"variable")," is set to ",(0,l.kt)("inlineCode",{parentName:"li"},"1")),(0,l.kt)("li",{parentName:"ul"},"When the key is tapped at the second time and the ",(0,l.kt)("inlineCode",{parentName:"li"},"variable")," is still ",(0,l.kt)("inlineCode",{parentName:"li"},"1"),",\nthe ",(0,l.kt)("inlineCode",{parentName:"li"},"ToEvent")," is triggered")),(0,l.kt)("p",null,"It also uses a ",(0,l.kt)("a",{parentName:"p",href:"https://karabiner-elements.pqrs.org/docs/json/complex-modifications-manipulator-definition/to-delayed-action/"},"to_delayed_action"),"\nto set a timer (",(0,l.kt)("inlineCode",{parentName:"p"},"200 milliseconds")," ",(0,l.kt)("inlineCode",{parentName:"p"},"delay")," by default) when the key is tapped\nfor the first time."),(0,l.kt)("ul",null,(0,l.kt)("li",{parentName:"ul"},"If another key is pressed within the ",(0,l.kt)("inlineCode",{parentName:"li"},"delay")," time",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"The ",(0,l.kt)("inlineCode",{parentName:"li"},"variable")," is set back to ",(0,l.kt)("inlineCode",{parentName:"li"},"0")))),(0,l.kt)("li",{parentName:"ul"},"If no other key is pressed within the ",(0,l.kt)("inlineCode",{parentName:"li"},"delay")," time",(0,l.kt)("ul",{parentName:"li"},(0,l.kt)("li",{parentName:"ul"},"The ",(0,l.kt)("inlineCode",{parentName:"li"},"variable")," is set back to ",(0,l.kt)("inlineCode",{parentName:"li"},"0")),(0,l.kt)("li",{parentName:"ul"},"The key itself is triggered, so single tap is still functional")))),(0,l.kt)("h2",{id:"the-single-tap"},"The single tap"),(0,l.kt)("p",null,"By default ",(0,l.kt)("inlineCode",{parentName:"p"},"doubleTap")," will send the from key if no another key is pressed within\nthe ",(0,l.kt)("inlineCode",{parentName:"p"},"delay")," time. It can be set to another key using ",(0,l.kt)("inlineCode",{parentName:"p"},"singleTap()")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"mapDoubleTap('\u21ea').to('\u238b')\n  // highlight-next-line\n  .singleTap(toKey('q', '\u2318'))\n")),(0,l.kt)("details",null,(0,l.kt)("summary",null,"Generated JSON"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "type": "basic",\n    "from": {"key_code": "caps_lock"},\n    "to": [\n      {"key_code": "escape"}\n    ],\n    "conditions": [\n      {"type": "variable_if", "name": "double-tap-caps_lock", "value": 1}\n    ]\n  },\n  {\n    "type": "basic",\n    "from": {"key_code": "caps_lock"},\n    "to": [\n      {"set_variable": {"name": "double-tap-caps_lock", "value": 1}}\n    ],\n    "conditions": [\n      {"type": "variable_unless", "name": "double-tap-caps_lock", "value": 1}\n    ],\n    "to_delayed_action": {\n      "to_if_canceled": [\n        {"set_variable": {"name": "double-tap-caps_lock", "value": 0}}\n      ],\n      "to_if_invoked": [\n        {"set_variable": {"name": "double-tap-caps_lock", "value": 0}},\n        // highlight-next-line\n        {"key_code": "q", "modifiers": ["command"]}\n      ]\n    },\n    "parameters": {\n      "basic.to_delayed_action_delay_milliseconds": 200\n    }\n  }\n]\n'))),(0,l.kt)("p",null,"Or it can be disabled with ",(0,l.kt)("inlineCode",{parentName:"p"},"singleTap(null)")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"mapDoubleTap('q', '\u2318').to('q', '\u2318')\n  // highlight-next-line\n  .singleTap(null) // Must pressing command-q twice to quit application\n")),(0,l.kt)("details",null,(0,l.kt)("summary",null,"Generated JSON"),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-json"},'[\n  {\n    "type": "basic",\n    "from": {"key_code": "q", "modifiers": {"mandatory": ["command"]}},\n    "to": [\n      {"key_code": "q", "modifiers": ["command"]}\n    ],\n    "conditions": [\n      {"type": "variable_if", "name": "double-tap-q-command", "value": 1}\n    ]\n  },\n  {\n    "type": "basic",\n    "from": {\n      "key_code": "q", "modifiers": {"mandatory": ["command"]}\n    },\n    "to": [\n      {"set_variable": {"name": "double-tap-q-command", "value": 1}}\n    ],\n    "conditions": [\n      {"type": "variable_unless", "name": "double-tap-q-command", "value": 1}\n    ],\n    "to_delayed_action": {\n      "to_if_canceled": [\n        {"set_variable": {"name": "double-tap-q-command", "value": 0}}\n      ],\n      "to_if_invoked": [\n        {"set_variable": {"name": "double-tap-q-command", "value": 0}}\n      ]\n    },\n    "parameters": {\n      "basic.to_delayed_action_delay_milliseconds": 200\n    }\n  }\n]\n'))),(0,l.kt)("h2",{id:"the-delay-time"},"The delay time"),(0,l.kt)("p",null,"The default ",(0,l.kt)("inlineCode",{parentName:"p"},"delay")," time waiting for the second tap (or to trigger the single\ntap) is ",(0,l.kt)("inlineCode",{parentName:"p"},"200 milliseconds"),". It can be set for each ",(0,l.kt)("inlineCode",{parentName:"p"},"doubleTap()")),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"mapDoubleTap('\u21ea', 100) // The last parameter\n  .delay(100) // Can also be set with another method\n")),(0,l.kt)("p",null,"It can also be set at ",(0,l.kt)("inlineCode",{parentName:"p"},"writeToProfile()")," for all ",(0,l.kt)("inlineCode",{parentName:"p"},"mapDoubleTap()")," in the profile."),(0,l.kt)("pre",null,(0,l.kt)("code",{parentName:"pre",className:"language-typescript"},"writeToProfile(\n  '--dry-run', // profile name \n  [], // rules\n  { 'double_tap.delay_milliseconds': 100 }, // parameters \n)\n")))}u.isMDXComponent=!0}}]);