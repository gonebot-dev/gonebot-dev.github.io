import{r as v,I as G,a as O}from"./chunk-LDJ5YOBB-C-yiNN4F.js";import"./chunk-P7KHIEPL-BMpFgH_a.js";import{m as f,W as t,a as T,n as R,o as P,I as U,t as k,r as z,C as W}from"./mermaid.esm.min-DUg9bFqm.js";import{f as $}from"./chunk-FASC7IG4-DFjOiiCc.js";import{m as j}from"./chunk-ZN7TASNU-CT0JrRhA.js";import"./chunk-5ZJXQJOJ-B6M1wc58.js";import"./app-D2fNj2_6.js";var D={},F=f((e,i)=>{D[e]=i},"set"),J=f(e=>D[e],"get"),A=f(()=>Object.keys(D),"keys"),Y=f(()=>A().length,"size"),q={get:J,set:F,keys:A,size:Y},X=f(e=>e.append("circle").attr("class","start-state").attr("r",t().state.sizeUnit).attr("cx",t().state.padding+t().state.sizeUnit).attr("cy",t().state.padding+t().state.sizeUnit),"drawStartState"),Z=f(e=>e.append("line").style("stroke","grey").style("stroke-dasharray","3").attr("x1",t().state.textHeight).attr("class","divider").attr("x2",t().state.textHeight*2).attr("y1",0).attr("y2",0),"drawDivider"),_=f((e,i)=>{let o=e.append("text").attr("x",2*t().state.padding).attr("y",t().state.textHeight+2*t().state.padding).attr("font-size",t().state.fontSize).attr("class","state-title").text(i.id),n=o.node().getBBox();return e.insert("rect",":first-child").attr("x",t().state.padding).attr("y",t().state.padding).attr("width",n.width+2*t().state.padding).attr("height",n.height+2*t().state.padding).attr("rx",t().state.radius),o},"drawSimpleState"),K=f((e,i)=>{let o=f(function(g,u,m){let b=g.append("tspan").attr("x",2*t().state.padding).text(u);m||b.attr("dy",t().state.textHeight)},"addTspan"),n=e.append("text").attr("x",2*t().state.padding).attr("y",t().state.textHeight+1.3*t().state.padding).attr("font-size",t().state.fontSize).attr("class","state-title").text(i.descriptions[0]).node().getBBox(),d=n.height,h=e.append("text").attr("x",t().state.padding).attr("y",d+t().state.padding*.4+t().state.dividerMargin+t().state.textHeight).attr("class","state-description"),c=!0,a=!0;i.descriptions.forEach(function(g){c||(o(h,g,a),a=!1),c=!1});let s=e.append("line").attr("x1",t().state.padding).attr("y1",t().state.padding+d+t().state.dividerMargin/2).attr("y2",t().state.padding+d+t().state.dividerMargin/2).attr("class","descr-divider"),x=h.node().getBBox(),p=Math.max(x.width,n.width);return s.attr("x2",p+3*t().state.padding),e.insert("rect",":first-child").attr("x",t().state.padding).attr("y",t().state.padding).attr("width",p+2*t().state.padding).attr("height",x.height+d+2*t().state.padding).attr("rx",t().state.radius),e},"drawDescrState"),Q=f((e,i,o)=>{let n=t().state.padding,d=2*t().state.padding,h=e.node().getBBox(),c=h.width,a=h.x,s=e.append("text").attr("x",0).attr("y",t().state.titleShift).attr("font-size",t().state.fontSize).attr("class","state-title").text(i.id),x=s.node().getBBox().width+d,p=Math.max(x,c);p===c&&(p=p+d);let g,u=e.node().getBBox();i.doc,g=a-n,x>c&&(g=(c-p)/2+n),Math.abs(a-u.x)<n&&x>c&&(g=a-(x-c)/2);let m=1-t().state.textHeight;return e.insert("rect",":first-child").attr("x",g).attr("y",m).attr("class",o?"alt-composit":"composit").attr("width",p).attr("height",u.height+t().state.textHeight+t().state.titleShift+1).attr("rx","0"),s.attr("x",g+n),x<=c&&s.attr("x",a+(p-d)/2-x/2+n),e.insert("rect",":first-child").attr("x",g).attr("y",t().state.titleShift-t().state.textHeight-t().state.padding).attr("width",p).attr("height",t().state.textHeight*3).attr("rx",t().state.radius),e.insert("rect",":first-child").attr("x",g).attr("y",t().state.titleShift-t().state.textHeight-t().state.padding).attr("width",p).attr("height",u.height+3+2*t().state.textHeight).attr("rx",t().state.radius),e},"addTitleAndBox"),V=f(e=>(e.append("circle").attr("class","end-state-outer").attr("r",t().state.sizeUnit+t().state.miniPadding).attr("cx",t().state.padding+t().state.sizeUnit+t().state.miniPadding).attr("cy",t().state.padding+t().state.sizeUnit+t().state.miniPadding),e.append("circle").attr("class","end-state-inner").attr("r",t().state.sizeUnit).attr("cx",t().state.padding+t().state.sizeUnit+2).attr("cy",t().state.padding+t().state.sizeUnit+2)),"drawEndState"),tt=f((e,i)=>{let o=t().state.forkWidth,n=t().state.forkHeight;if(i.parentId){let d=o;o=n,n=d}return e.append("rect").style("stroke","black").style("fill","black").attr("width",o).attr("height",n).attr("x",t().state.padding).attr("y",t().state.padding)},"drawForkJoinState"),et=f((e,i,o,n)=>{let d=0,h=n.append("text");h.style("text-anchor","start"),h.attr("class","noteText");let c=e.replace(/\r\n/g,"<br/>");c=c.replace(/\n/g,"<br/>");let a=c.split(T.lineBreakRegex),s=1.25*t().state.noteMargin;for(let x of a){let p=x.trim();if(p.length>0){let g=h.append("tspan");if(g.text(p),s===0){let u=g.node().getBBox();s+=u.height}d+=s,g.attr("x",i+t().state.noteMargin),g.attr("y",o+d+1.25*t().state.noteMargin)}}return{textWidth:h.node().getBBox().width,textHeight:d}},"_drawLongText"),at=f((e,i)=>{i.attr("class","state-note");let o=i.append("rect").attr("x",0).attr("y",t().state.padding),n=i.append("g"),{textWidth:d,textHeight:h}=et(e,0,0,n);return o.attr("height",h+2*t().state.noteMargin),o.attr("width",d+t().state.noteMargin*2),o},"drawNote"),I=f(function(e,i){let o=i.id,n={id:o,label:i.id,width:0,height:0},d=e.append("g").attr("id",o).attr("class","stateGroup");i.type==="start"&&X(d),i.type==="end"&&V(d),(i.type==="fork"||i.type==="join")&&tt(d,i),i.type==="note"&&at(i.note.text,d),i.type==="divider"&&Z(d),i.type==="default"&&i.descriptions.length===0&&_(d,i),i.type==="default"&&i.descriptions.length>0&&K(d,i);let h=d.node().getBBox();return n.width=h.width+2*t().state.padding,n.height=h.height+2*t().state.padding,q.set(o,n),n},"drawState"),L=0,it=f(function(e,i,o){let n=f(function(s){switch(s){case v.relationType.AGGREGATION:return"aggregation";case v.relationType.EXTENSION:return"extension";case v.relationType.COMPOSITION:return"composition";case v.relationType.DEPENDENCY:return"dependency"}},"getRelationType");i.points=i.points.filter(s=>!Number.isNaN(s.y));let d=i.points,h=R().x(function(s){return s.x}).y(function(s){return s.y}).curve(P),c=e.append("path").attr("d",h(d)).attr("id","edge"+L).attr("class","transition"),a="";if(t().state.arrowMarkerAbsolute&&(a=window.location.protocol+"//"+window.location.host+window.location.pathname+window.location.search,a=a.replace(/\(/g,"\\("),a=a.replace(/\)/g,"\\)")),c.attr("marker-end","url("+a+"#"+n(v.relationType.DEPENDENCY)+"End)"),o.title!==void 0){let s=e.append("g").attr("class","stateLabel"),{x,y:p}=U.calcLabelPosition(i.points),g=T.getRows(o.title),u=0,m=[],b=0,E=0;for(let r=0;r<=g.length;r++){let y=s.append("text").attr("text-anchor","middle").text(g[r]).attr("x",x).attr("y",p+u),l=y.node().getBBox();b=Math.max(b,l.width),E=Math.min(E,l.x),k.info(l.x,x,p+u),u===0&&(u=y.node().getBBox().height,k.info("Title height",u,p)),m.push(y)}let N=u*g.length;if(g.length>1){let r=(g.length-1)*u*.5;m.forEach((y,l)=>y.attr("y",p+l*u-r)),N=u*g.length}let M=s.node().getBBox();s.insert("rect",":first-child").attr("class","box").attr("x",x-b/2-t().state.padding/2).attr("y",p-N/2-t().state.padding/2-3.5).attr("width",b+t().state.padding).attr("height",N+t().state.padding),k.info(M)}L++},"drawEdge"),w,H={},rt=f(function(){},"setConf"),dt=f(function(e){e.append("defs").append("marker").attr("id","dependencyEnd").attr("refX",19).attr("refY",7).attr("markerWidth",20).attr("markerHeight",28).attr("orient","auto").append("path").attr("d","M 19,7 L9,13 L14,7 L9,1 Z")},"insertMarkers"),nt=f(function(e,i,o,n){w=t().state;let d=t().securityLevel,h;d==="sandbox"&&(h=z("#i"+i));let c=d==="sandbox"?z(h.nodes()[0].contentDocument.body):z("body"),a=d==="sandbox"?h.nodes()[0].contentDocument:document;k.debug("Rendering diagram "+e);let s=c.select(`[id='${i}']`);dt(s);let x=n.db.getRootDoc();C(x,s,void 0,!1,c,a,n);let p=w.padding,g=s.node().getBBox(),u=g.width+p*2,m=g.height+p*2,b=u*1.75;W(s,m,b,w.useMaxWidth),s.attr("viewBox",`${g.x-w.padding}  ${g.y-w.padding} `+u+" "+m)},"draw"),st=f(e=>e?e.length*w.fontSizeFactor:1,"getLabelWidth"),C=f((e,i,o,n,d,h,c)=>{let a=new j({compound:!0,multigraph:!0}),s,x=!0;for(s=0;s<e.length;s++)if(e[s].stmt==="relation"){x=!1;break}o?a.setGraph({rankdir:"LR",multigraph:!0,compound:!0,ranker:"tight-tree",ranksep:x?1:w.edgeLengthFactor,nodeSep:x?1:50,isMultiGraph:!0}):a.setGraph({rankdir:"TB",multigraph:!0,compound:!0,ranksep:x?1:w.edgeLengthFactor,nodeSep:x?1:50,ranker:"tight-tree",isMultiGraph:!0}),a.setDefaultEdgeLabel(function(){return{}}),c.db.extract(e);let p=c.db.getStates(),g=c.db.getRelations(),u=Object.keys(p),m=!0;for(let r of u){let y=p[r];o&&(y.parentId=o);let l;if(y.doc){let S=i.append("g").attr("id",y.id).attr("class","stateGroup");if(l=C(y.doc,S,y.id,!n,d,h,c),m){S=Q(S,y,n);let B=S.node().getBBox();l.width=B.width,l.height=B.height+w.padding/2,H[y.id]={y:w.compositTitleSize}}}else l=I(i,y,a);if(y.note){let S={descriptions:[],id:y.id+"-note",note:y.note,type:"note"},B=I(i,S,a);y.note.position==="left of"?(a.setNode(l.id+"-note",B),a.setNode(l.id,l)):(a.setNode(l.id,l),a.setNode(l.id+"-note",B)),a.setParent(l.id,l.id+"-group"),a.setParent(l.id+"-note",l.id+"-group")}else a.setNode(l.id,l)}k.debug("Count=",a.nodeCount(),a);let b=0;g.forEach(function(r){b++,k.debug("Setting edge",r),a.setEdge(r.id1,r.id2,{relation:r,width:st(r.title),height:w.labelHeight*T.getRows(r.title).length,labelpos:"c"},"id"+b)}),$(a),k.debug("Graph after layout",a.nodes());let E=i.node();a.nodes().forEach(function(r){r!==void 0&&a.node(r)!==void 0?(k.warn("Node "+r+": "+JSON.stringify(a.node(r))),d.select("#"+E.id+" #"+r).attr("transform","translate("+(a.node(r).x-a.node(r).width/2)+","+(a.node(r).y+(H[r]?H[r].y:0)-a.node(r).height/2)+" )"),d.select("#"+E.id+" #"+r).attr("data-x-shift",a.node(r).x-a.node(r).width/2),h.querySelectorAll("#"+E.id+" #"+r+" .divider").forEach(y=>{let l=y.parentElement,S=0,B=0;l&&(l.parentElement&&(S=l.parentElement.getBBox().width),B=parseInt(l.getAttribute("data-x-shift"),10),Number.isNaN(B)&&(B=0)),y.setAttribute("x1",0-B+8),y.setAttribute("x2",S-B-8)})):k.debug("No Node "+r+": "+JSON.stringify(a.node(r)))});let N=E.getBBox();a.edges().forEach(function(r){r!==void 0&&a.edge(r)!==void 0&&(k.debug("Edge "+r.v+" -> "+r.w+": "+JSON.stringify(a.edge(r))),it(i,a.edge(r),a.edge(r).relation))}),N=E.getBBox();let M={id:o||"root",label:o||"root",width:0,height:0};return M.width=N.width+2*w.padding,M.height=N.height+2*w.padding,k.debug("Doc rendered",M,a),M},"renderDoc"),ot={setConf:rt,draw:nt},ut={parser:G,db:v,renderer:ot,styles:O,init:f(e=>{e.state||(e.state={}),e.state.arrowMarkerAbsolute=e.arrowMarkerAbsolute,v.clear()},"init")};export{ut as diagram};