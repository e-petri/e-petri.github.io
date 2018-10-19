/*!
 * UI development toolkit for HTML5 (OpenUI5)
 * (c) Copyright 2009-2018 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['jquery.sap.global','./ExpressionParser','sap/ui/model/BindingMode','sap/ui/model/Filter','sap/ui/model/Sorter','jquery.sap.script'],function(q,E,B,F,S){"use strict";var a={_keepBindingStrings:false};var r=/^\{\s*[a-zA-Z$_][a-zA-Z0-9$_]*\s*:/;var b=/(\\[\\\{\}])|(\{)/g;var c=/([\\\{\}])/g;function d(e,R){function l(){var i,n=e.length,m=new Array(n);for(i=0;i<n;i+=1){m[i]=e[i].apply(this,arguments);}if(R){return R.apply(this,m);}return n>1?m.join(" "):m[0];}l.textFragments=R&&R.textFragments||"sap.ui.base.BindingParser: composeFormatters";return l;}function f(e){var m=function(){var R=[],l=e.length,i;for(i=0;i<l;i++){if(typeof e[i]==="number"){R.push(arguments[e[i]]);}else{R.push(e[i]);}}return R.join('');};m.textFragments=e;return m;}function g(p){var P=p.indexOf(">"),o={path:p};if(P>0){o.model=p.slice(0,P);o.path=p.slice(P+1);}return o;}function h(o,s){try{a.mergeParts(o);}catch(e){q.sap.log.error("Cannot merge parts: "+e.message,s,"sap.ui.base.BindingParser");}}function j(e,i){function l(o,P){if(typeof o[P]==="string"){var t,N=o[P];if(o[P][0]==="."){t=q.sap.getObject(o[P].slice(1),undefined,e.oContext);o[P]=e.bStaticContext?t:(t&&t.bind(e.oContext));}else{o[P]=q.sap.getObject(o[P]);}if(typeof(o[P])!=="function"){if(e.bTolerateFunctionsNotFound){e.aFunctionsNotFound=e.aFunctionsNotFound||[];e.aFunctionsNotFound.push(N);}else{q.sap.log.error(P+" function "+N+" not found!");}}}}function m(o){var t;if(typeof o.type==="string"){if(o.type[0]==="."){t=q.sap.getObject(o.type.slice(1),undefined,e.oContext);}else{t=q.sap.getObject(o.type);}if(typeof t==="function"){o.type=new t(o.formatOptions,o.constraints);}else{o.type=t;}delete o.formatOptions;delete o.constraints;}}function n(o){if(o!=null&&typeof o==='object'){for(var N in o){l(o,N);}}}function p(o,P){var v=o[P];if(Array.isArray(v)){v.forEach(function(O,I){p(v,I);});return;}if(v&&typeof v==='object'){l(v,'test');p(v,'filters');p(v,'condition');o[P]=new F(v);}}function s(o,P){var v=o[P];if(Array.isArray(v)){v.forEach(function(O,I){s(v,I);});return;}if(v&&typeof v==='object'){l(v,"group");l(v,"comparator");o[P]=new S(v);}}if(typeof i==='object'){if(Array.isArray(i.parts)){i.parts.forEach(function(P){j(e,P);});}m(i);p(i,'filters');s(i,'sorter');n(i.events);l(i,'formatter');l(i,'factory');l(i,'groupHeaderFactory');}return i;}function k(e,i,s){var p=q.sap.parseJS,P,l;if(r.test(i.slice(s))){P=p(i,s);j(e,P.result);return P;}l=i.indexOf('}',s);if(l<s){throw new SyntaxError("no closing braces found in '"+i+"' after pos:"+s);}return{result:g(i.slice(s+1,l)),at:l+1};}a.simpleParser=function(s,C){if(q.sap.startsWith(s,"{")&&q.sap.endsWith(s,"}")){return g(s.slice(1,-1));}};a.simpleParser.escape=function(v){return v;};a.complexParser=function(s,C,u,t,e){var l=false,o={parts:[]},M=false,n={oContext:C,aFunctionsNotFound:undefined,bStaticContext:e,bTolerateFunctionsNotFound:t},v=[],U,p=0,m,w;function x(I,y,z){var A=E.parse(k.bind(null,n),s,y);function D(A,G){if(A.parts){A.parts.forEach(function(P,i){if(typeof P==="string"){P=A.parts[i]={path:P};}D(P,i);});l=l||G!==undefined;}else{A.mode=z;}}if(I.charAt(A.at)!=="}"){throw new SyntaxError("Expected '}' and instead saw '"+I.charAt(A.at)+"' in expression binding "+I+" at position "+A.at);}A.at+=1;if(A.result){D(A.result);}else{v[v.length-1]=String(A.constant);U=true;}return A;}b.lastIndex=0;while((m=b.exec(s))!==null){if(p<m.index){v.push(s.slice(p,m.index));}if(m[1]){v.push(m[1].slice(1));U=true;}else{v.push(o.parts.length);if(s.indexOf(":=",m.index)===m.index+1){w=x(s,m.index+3,B.OneTime);}else if(s.charAt(m.index+1)==="="){w=x(s,m.index+2,B.OneWay);}else{w=k(n,s,m.index);}if(w.result){o.parts.push(w.result);M=M||"parts"in w.result;}b.lastIndex=w.at;}p=b.lastIndex;}if(p<s.length){v.push(s.slice(p));}if(o.parts.length>0){if(v.length===1){o=o.parts[0];M=l;}else{o.formatter=f(v);}if(M){h(o,s);}if(a._keepBindingStrings){o.bindingString=s;}if(n.aFunctionsNotFound){o.functionsNotFound=n.aFunctionsNotFound;}return o;}else if(u&&U){return v.join('');}};a.complexParser.escape=function(v){return v.replace(c,"\\$1");};a.mergeParts=function(o){var e=[],p=[];o.parts.forEach(function(v){var i,l=function(){return v;},n,s=p.length;function m(){return arguments[s];}if(v&&typeof v==="object"){if(v.parts){for(n in v){if(n!=="formatter"&&n!=="parts"){throw new Error("Unsupported property: "+n);}}p=p.concat(v.parts);i=p.length;if(v.formatter){l=function(){return v.formatter.apply(this,Array.prototype.slice.call(arguments,s,i));};}else if(i-s>1){l=function(){return Array.prototype.slice.call(arguments,s,i).join(" ");};}else{l=m;}}else if(v.path){p.push(v);l=m;}}e.push(l);});o.parts=p;o.formatter=d(e,o.formatter);};a.parseExpression=function(i,s,e,G){return E.parse(k.bind(null,e||{}),i,s,G);};return a;},true);
