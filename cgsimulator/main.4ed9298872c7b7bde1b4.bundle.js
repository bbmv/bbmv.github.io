webpackJsonp([1],{"+h1B":function(n,t,l){"use strict";var u=l("/oeL"),e=l("aR8+"),i=l("wQAS"),r=l("ZYEP"),o=l("F6M+"),a=l("q4dy"),s=l("qbdv"),c=l("fc+i"),d=l("bm2B"),f=l("BkNc"),h=l("T1Zu"),_=l("/Rec");l.d(t,"a",function(){return m});var m=u.b(e.a,[i.a],function(n){return u.c([u.d(512,u.e,u.f,[[8,[r.a,o.a,a.a]],[3,u.e],u.g]),u.d(5120,u.h,u.i,[[3,u.h]]),u.d(4608,s.a,s.b,[u.h]),u.d(5120,u.j,u.k,[]),u.d(5120,u.l,u.m,[]),u.d(5120,u.n,u.o,[]),u.d(4608,c.b,c.c,[c.d]),u.d(6144,u.p,null,[c.b]),u.d(4608,c.e,c.f,[]),u.d(5120,c.g,function(n,t,l,u){return[new c.h(n),new c.i(t),new c.j(l,u)]},[c.d,c.d,c.d,c.e]),u.d(4608,c.k,c.k,[c.g,u.q]),u.d(135680,c.l,c.l,[c.d]),u.d(4608,c.m,c.m,[c.k,c.l]),u.d(6144,u.r,null,[c.m]),u.d(6144,c.n,null,[c.l]),u.d(4608,u.s,u.s,[u.q]),u.d(4608,c.o,c.o,[c.d]),u.d(4608,c.p,c.p,[c.d]),u.d(4608,d.a,d.a,[]),u.d(5120,f.a,f.b,[f.c]),u.d(4608,f.d,f.d,[]),u.d(6144,f.e,null,[f.d]),u.d(135680,f.f,f.f,[f.c,u.t,u.u,u.v,f.e]),u.d(4608,f.g,f.g,[]),u.d(5120,f.h,f.i,[f.j]),u.d(5120,u.w,function(n){return[n]},[f.h]),u.d(512,s.c,s.c,[]),u.d(1024,u.x,c.q,[]),u.d(1024,u.y,function(){return[f.k()]},[]),u.d(512,f.j,f.j,[u.v]),u.d(1024,u.z,function(n,t,l){return[c.r(n,t),f.l(l)]},[[2,c.s],[2,u.y],f.j]),u.d(512,u.A,u.A,[[2,u.z]]),u.d(131584,u.B,u.B,[u.q,u.C,u.v,u.x,u.e,u.A]),u.d(2048,u.D,null,[u.B]),u.d(512,u.E,u.E,[u.D]),u.d(512,c.t,c.t,[[3,c.t]]),u.d(512,d.b,d.b,[]),u.d(512,d.c,d.c,[]),u.d(1024,f.m,f.n,[[3,f.c]]),u.d(512,f.o,f.p,[]),u.d(512,f.q,f.q,[]),u.d(256,f.r,{},[]),u.d(1024,s.d,f.s,[s.e,[2,s.f],f.r]),u.d(512,s.g,s.g,[s.d]),u.d(512,u.u,u.u,[]),u.d(512,u.t,u.F,[u.u,[2,u.G]]),u.d(1024,f.t,function(){return[[{path:"transform2d",component:h.a},{path:"transform3d",component:_.a},{path:"",redirectTo:"/transform2d",pathMatch:"full"},{path:"**",redirectTo:"/transform2d",pathMatch:"full"}]]},[]),u.d(1024,f.c,f.u,[u.D,f.o,f.q,s.g,u.v,u.t,u.u,f.t,f.r,[2,f.v],[2,f.w]]),u.d(512,f.x,f.x,[[2,f.m],[2,f.c]]),u.d(512,e.a,e.a,[])])})},"/Rec":function(n,t,l){"use strict";var u=l("24L0");l.d(t,"a",function(){return e});var e=function(){function n(n){this.cTrS=n}return n.prototype.ngAfterContentChecked=function(){this.formula.mxOriginal=this.graphics.mxOriginal,this.formula.mxChanged=this.graphics.mxChanged,this.formula.mxTransform=this.graphics.mxTransform,this.controls.invalid=this.formula.transf.form.invalid},n.prototype.ngOnInit=function(){this.sMx=this.tasks.generateNewTask(),this.results.init()},n.prototype.ngAfterViewInit=function(){this.graphics.show(this.sMx)},n.prototype.transform=function(){this.graphics.transform(this.formula.mxTransform);var n=this.cTrS.compare(this.formula.mxTransform,this.sMx);this.results.show(n)},n.prototype.next=function(){this.sMx=this.tasks.generateNewTask(),this.graphics.show(this.sMx),this.results.init()},n.ctorParameters=function(){return[{type:u.a}]},n}()},0:function(n,t,l){n.exports=l("cDNt")},"24L0":function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u=function(){function n(){}return n.prototype.compare=function(n,t){for(var l=n.length,u=n[0].length,e=0;e<l;e+=1)for(var i=0,r=void 0,o=void 0;i<u;i+=1)if(r=Math.round(10*n[e][i])/10,o=Math.round(10*t[e][i])/10,r!==o)return!1;return!0},n}()},"3N27":function(n,t,l){"use strict";function u(n){return i._25(0,[i._30(402653184,1,{container:0}),i._30(402653184,2,{axes:0}),i._30(402653184,3,{sample:0}),i._30(402653184,4,{object:0}),(n()(),i._26(null,["\n  \t"])),(n()(),i._27(0,[[1,0],["container",1]],null,7,"div",[["id","container"]],null,null,null,null,null)),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,[[2,0],["axes",1]],null,0,"canvas",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t\t"])),(n()(),i._27(0,[[3,0],["sample",1]],null,0,"canvas",[["id","sample"]],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t\t"])),(n()(),i._27(0,[[4,0],["object",1]],null,0,"canvas",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t"])),(n()(),i._26(null,["\n\t"]))],null,null)}function e(n){return i._25(0,[(n()(),i._27(0,null,null,2,"graphics2d",[],null,null,null,u,s)),i._32(512,null,r.a,r.a,[]),i._29(4243456,null,0,o.a,[r.a],null,null)],null,null)}var i=l("/oeL"),r=l("Pr6h"),o=l("cgrw");l.d(t,"b",function(){return s}),t.a=u;var a=["#container[_ngcontent-%COMP%] {\n\t\t\tposition: relative;\n\t\t\tdisplay: inline-block;\n\t\t}\n\t\tcanvas[_ngcontent-%COMP%] {\n\t\t\tposition: absolute;\n\t\t\ttop: 0px;\n\t\t\tleft: 0px;\n\t\t}\n\t\t#sample[_ngcontent-%COMP%] { opacity: 0.3; }"],s=i._24({encapsulation:0,styles:a,data:{}});i._31("graphics2d",o.a,e,{},{},[])},BenJ:function(n,t,l){"use strict";var u=l("oxUd");l.d(t,"a",function(){return e});var e=function(){function n(n){this.randS=n}return n.prototype.generateNewTask=function(){var n,t,l,u=this.randS.random,e=new cg2d.Transform2d,i="Change the transformation matrix to produce ",r=["x","y"];switch(u(0,5)){case 0:i+="a shearing in the",l=u(1,r.length)-1,t=r[l],r.splice(l,1),n=u(1,2),n*=Math.pow(-1,u(1,2)),i=i+" "+t+"-direction  by "+n,e.shear(t,n);break;case 1:i+="a translation in the";for(var o=0;o<1;o++)l=u(1,r.length)-1,t=r[l],r.splice(l,1),n=u(1,2),n*=Math.pow(-1,u(1,2)),i=i+" "+t+"-direction  by "+n,e.move(t,n);break;case 2:i+="a local scaling in the";for(var o=0;o<1;o++)l=u(1,r.length)-1,t=r[l],r.splice(l,1),n=u(2,3),i=i+" "+t+"-direction  by "+n,e.scale(t,n);break;case 3:i+="a reflection about the";for(var o=0;o<1;o++)l=u(1,r.length)-1,t=r[l],r.splice(l,1),n=-1,i=i+" "+t+"-axis ",t="x"==t?"y":"x",e.scale(t,n);break;case 4:i+="an overall scaling by ",n=u(2,3),i+=n,e.scale("s",1/n);break;case 5:i+="a rotation about the",l=u(1,r.length)-1,n=u(1,18),n*=10*Math.pow(-1,u(1,2)),i=i+" origin  by an angle "+n+" degrees",e.rotate(n)}return this.message=i+". As a result, the transformed object should match the sample object (a semitransparent figure).",e.getElems()},n.ctorParameters=function(){return[{type:u.a}]},n}()},Bylx:function(n,t,l){"use strict";function u(n){return i._25(0,[i._30(402653184,1,{container:0}),i._30(402653184,2,{axes:0}),i._30(402653184,3,{sample:0}),i._30(402653184,4,{object:0}),(n()(),i._26(null,["\n  \t"])),(n()(),i._27(0,[[1,0],["container",1]],null,7,"div",[["id","container"]],null,null,null,null,null)),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,[[2,0],["axes",1]],null,0,"canvas",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t\t"])),(n()(),i._27(0,[[3,0],["sample",1]],null,0,"canvas",[["id","sample"]],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t\t"])),(n()(),i._27(0,[[4,0],["object",1]],null,0,"canvas",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t"])),(n()(),i._26(null,["\n\t"]))],null,null)}function e(n){return i._25(0,[(n()(),i._27(0,null,null,2,"graphics3d",[],null,null,null,u,s)),i._32(512,null,r.a,r.a,[]),i._29(4243456,null,0,o.a,[r.a],null,null)],null,null)}var i=l("/oeL"),r=l("Pr6h"),o=l("Ro7x");l.d(t,"b",function(){return s}),t.a=u;var a=["#container[_ngcontent-%COMP%] {\n\t\t\tposition: relative;\n\t\t\tdisplay: inline-block;\n\t\t}\n\t\tcanvas[_ngcontent-%COMP%] {\n\t\t\tposition: absolute;\n\t\t\ttop: 0px;\n\t\t\tleft: 0px;\n\t\t}\n\t\t#sample[_ngcontent-%COMP%] { opacity: 0.3; }"],s=i._24({encapsulation:0,styles:a,data:{}});i._31("graphics3d",o.a,e,{},{},[])},"F6M+":function(n,t,l){"use strict";function u(n){return i._25(0,[i._30(402653184,1,{graphics:0}),i._30(402653184,2,{formula:0}),i._30(402653184,3,{tasks:0}),i._30(402653184,4,{controls:0}),i._30(402653184,5,{results:0}),(n()(),i._26(null,["\n\t\t"])),(n()(),i._27(0,null,null,1,"results",[],null,null,null,r.a,r.b)),i._29(49152,[[5,4],["res",4]],0,o.a,[],null,null),(n()(),i._26(null,["\n\t\t"])),(n()(),i._27(0,null,null,2,"tasks3d",[],null,null,null,a.a,a.b)),i._32(512,null,s.a,s.a,[]),i._29(49152,[[3,4]],0,c.a,[s.a],null,null),(n()(),i._26(null,["\n\t  "])),(n()(),i._27(0,null,null,17,"section",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,2,"graphics3d",[["class","grph"]],null,null,null,d.a,d.b)),i._32(512,null,f.a,f.a,[]),i._29(4243456,[[1,4]],0,h.a,[f.a],null,null),(n()(),i._26(null,["\n\t  "])),(n()(),i._27(0,null,null,1,"section",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t  "])),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,1,"formula",[],null,null,null,_.a,_.b)),i._29(49152,[[2,4]],0,m.a,[],null,null),(n()(),i._26(null,["\n\t  "])),(n()(),i._27(0,null,null,1,"section",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t  "])),(n()(),i._26(null,["\n\t   \t"])),(n()(),i._27(0,null,null,1,"controls",[],null,[[null,"onClickTfm"],[null,"onClickNxt"]],function(n,t,l){var u=!0,e=n.component;if("onClickTfm"===t){u=!1!==e.transform()&&u}if("onClickNxt"===t){u=!1!==e.next()&&u}return u},g.a,g.b)),i._29(49152,[[4,4]],0,v.a,[],null,{onClickTfm:"onClickTfm",onClickNxt:"onClickNxt"}),(n()(),i._26(null,["\n\t\t"])),(n()(),i._26(null,["\n\t"]))],null,null)}function e(n){return i._25(0,[(n()(),i._27(0,null,null,2,"transform3d",[],null,null,null,u,w)),i._32(512,null,x.a,x.a,[]),i._29(6406144,null,0,p.a,[x.a],null,null)],function(n,t){n(t,2,0)},null)}var i=l("/oeL"),r=l("PTRp"),o=l("YWZ6"),a=l("puIn"),s=l("oxUd"),c=l("hmZi"),d=l("Bylx"),f=l("Pr6h"),h=l("Ro7x"),_=l("xKsF"),m=l("zYb+"),p=l("/Rec"),g=l("je7k"),v=l("QeN1"),x=l("24L0");l.d(t,"a",function(){return C});var b=["section[_ngcontent-%COMP%] { text-align: center; line-height: 0; }"],w=i._24({encapsulation:0,styles:b,data:{}}),C=i._31("transform3d",p.a,e,{},{},[])},MHwY:function(n,t,l){"use strict";var u=(l("wQAS"),l("/Rec"));l.d(t,"b",function(){return u.a});var e=l("T1Zu");l.d(t,"a",function(){return e.a});l("sO5o"),l("zYb+"),l("Ro7x"),l("cgrw"),l("hmZi"),l("BenJ"),l("YWZ6"),l("QeN1")},PTRp:function(n,t,l){"use strict";function u(n){return i._25(0,[i._30(402653184,1,{results:0}),(n()(),i._26(null,["\n  \t"])),(n()(),i._27(0,null,null,9,"div",[],null,null,null,null,null)),(n()(),i._26(null,["\n  \t\t"])),(n()(),i._27(0,null,null,2,"span",[],null,null,null,null,null)),(n()(),i._26(null,["Result: "])),(n()(),i._27(0,[[1,0],["results",1]],null,0,"b",[],[[8,"textContent",0]],null,null,null,null)),(n()(),i._26(null,["\n  \t\t"])),(n()(),i._27(0,null,null,2,"span",[],null,null,null,null,null)),(n()(),i._26(null,["Score: "])),(n()(),i._27(0,null,null,0,"b",[],[[8,"textContent",0]],null,null,null,null)),(n()(),i._26(null,["\n\t\t"])),(n()(),i._26(null,["\n\t"]))],null,function(n,t){var l=t.component;n(t,6,0,l.result),n(t,10,0,l.score)})}function e(n){return i._25(0,[(n()(),i._27(0,null,null,1,"results",[],null,null,null,u,a)),i._29(49152,null,0,r.a,[],null,null)],null,null)}var i=l("/oeL"),r=l("YWZ6");l.d(t,"b",function(){return a}),t.a=u;var o=["div[_ngcontent-%COMP%] { margin: 0.7em 0 0.4em 0; }\n\t\tb[_ngcontent-%COMP%] { font-weight: normal; }\n\t\tspan[_ngcontent-%COMP%] { \n\t\t\tfont-size: 1rem; \n\t\t\tfont-weight: bold;\n\t\t\twidth: 8em;\n\t\t\tdisplay: inline-block; \n\t\t}"],a=i._24({encapsulation:0,styles:o,data:{}});i._31("results",r.a,e,{},{},[])},Pr6h:function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u=function(){function n(){}return n.prototype.initCanvas=function(n,t,l){var u=n.nativeElement;if(u.getContext)return u.width=t,u.height=l,u.getContext("2d")},n}()},QeN1:function(n,t,l){"use strict";var u=l("/oeL");l.d(t,"a",function(){return e});var e=function(){function n(){this.onClickTfm=new u.V,this.onClickNxt=new u.V}return n.prototype.transform=function(){this.onClickTfm.emit()},n.prototype.next=function(){this.onClickNxt.emit()},n}()},Ro7x:function(n,t,l){"use strict";var u=l("Pr6h"),e=l("ayA1");l.d(t,"a",function(){return i});var i=function(){function n(n){this.cnvSrv=n,this.width=420,this.height=450,this.center={x:this.width/2,y:this.height/2},this.scale=67,this.viewVector={p1:{x:0,y:0,z:0},p2:{x:5.5,y:2.5,z:12}},this.mxOriginal=this.mxChanged=e.a,this.mxTransform=(new cg3d.Transform3d).getElems()}return n.prototype.ngAfterViewInit=function(){document.body.style.minWidth=this.width+"px",this.container.nativeElement.style.width=this.width+"px",this.container.nativeElement.style.height=this.height+"px",this.axesCtx=this.cnvSrv.initCanvas(this.axes,this.width,this.height),this.sampleCtx=this.cnvSrv.initCanvas(this.sample,this.width,this.height),this.objectCtx=this.cnvSrv.initCanvas(this.object,this.width,this.height)},n.prototype.show=function(n){var t=cg3d.Object3d,l=cg3d.Transform3d,u=cg3d.Scene3d;this.mxTransform=(new l).getElems();var i=new t(e.a,e.b,e.c),r=new t(e.d,e.e,e.f),o=new t(e.g,e.h,e.i);this.mxChanged=i.getElems();var a=this.center,s=this.scale,c=new u(this.axesCtx,a,s);c.setView(this.viewVector,!1),c.addObject(r),c.addObject(o),c.draw();var d=i.getCopy(),f=new l(n);d.applyTransformation(f);var h=new u(this.sampleCtx,a,s);h.setView(this.viewVector,!1),h.addObject(d),h.draw();var _=new u(this.objectCtx,a,s);_.setView(this.viewVector,!1),_.addObject(i),_.draw()},n.prototype.transform=function(n){var t=cg3d.Object3d,l=cg3d.Transform3d,u=cg3d.Scene3d,i=new t(e.a,e.b,e.c),r=new l(n);i.applyTransformation(r),this.mxChanged=i.getElems();var o=this.center,a=this.scale,s=new u(this.objectCtx,o,a);s.setView(this.viewVector,!1),s.addObject(i),s.draw()},n.ctorParameters=function(){return[{type:u.a}]},n}()},T1Zu:function(n,t,l){"use strict";var u=l("24L0");l.d(t,"a",function(){return e});var e=function(){function n(n){this.cTrS=n}return n.prototype.ngAfterContentChecked=function(){this.formula.mxOriginal=this.graphics.mxOriginal,this.formula.mxChanged=this.graphics.mxChanged,this.formula.mxTransform=this.graphics.mxTransform,this.controls.invalid=this.formula.transf.form.invalid},n.prototype.ngOnInit=function(){this.sMx=this.tasks.generateNewTask(),this.results.init()},n.prototype.ngAfterViewInit=function(){this.graphics.show(this.sMx)},n.prototype.transform=function(){this.graphics.transform(this.formula.mxTransform);var n=this.cTrS.compare(this.formula.mxTransform,this.sMx);this.results.show(n)},n.prototype.next=function(){this.sMx=this.tasks.generateNewTask(),this.graphics.show(this.sMx),this.results.init()},n.ctorParameters=function(){return[{type:u.a}]},n}()},YWZ6:function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u=function(){function n(){this.correct=0,this.all=0}return n.prototype.init=function(){this.result="None",this.results.nativeElement.style.color="#000",this.score&&10!==this.all||(this.score="0/0")},n.prototype.show=function(n){this.all+=1,this.all>10&&(this.all=0,this.correct=0),n?(this.correct+=1,this.result="Correct",this.results.nativeElement.style.color="#3c3"):(this.result="Incorrect",this.results.nativeElement.style.color="#f00"),this.score=this.correct+"/"+this.all},n}()},YZiI:function(n,t,l){"use strict";function u(n){return s._25(0,[(n()(),s._27(0,null,null,0,"input",[["maxlength","4"],["readonly",""],["style","background-color: #fff;"]],[[8,"value",0],[8,"name",0]],null,null,null,null))],null,function(n,t){var l=t.component;n(t,0,0,l.round(t.parent.context.$implicit),l.name(t.parent.parent.context.index,t.parent.context.index))})}function e(n){return s._25(0,[(n()(),s._27(0,null,null,9,"input",[["maxlength","4"],["pattern","[0-9.-]+"],["required",""]],[[1,"required",0],[1,"maxlength",0],[1,"pattern",0],[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"ngModelChange"],[null,"input"],[null,"blur"],[null,"compositionstart"],[null,"compositionend"]],function(n,t,l){var u=!0,e=n.component;if("input"===t){u=!1!==s._28(n,1)._handleInput(l.target.value)&&u}if("blur"===t){u=!1!==s._28(n,1).onTouched()&&u}if("compositionstart"===t){u=!1!==s._28(n,1)._compositionStart()&&u}if("compositionend"===t){u=!1!==s._28(n,1)._compositionEnd(l.target.value)&&u}if("ngModelChange"===t){u=!1!==(e.elements[n.parent.parent.context.index][n.parent.context.index]=l)&&u}return u},null,null)),s._29(16384,null,0,c.d,[s.O,s.P,[2,c.e]],null,null),s._29(16384,null,0,c.f,[],{required:[0,"required"]},null),s._29(540672,null,0,c.g,[],{maxlength:[0,"maxlength"]},null),s._29(540672,null,0,c.h,[],{pattern:[0,"pattern"]},null),s._32(1024,null,c.i,function(n,t,l){return[n,t,l]},[c.f,c.g,c.h]),s._32(1024,null,c.j,function(n){return[n]},[c.d]),s._29(671744,null,0,c.k,[[2,c.l],[2,c.i],[8,null],[2,c.j]],{name:[0,"name"],model:[1,"model"]},{update:"ngModelChange"}),s._32(2048,null,c.m,null,[c.k]),s._29(16384,null,0,c.n,[c.m],null,null)],function(n,t){var l=t.component;n(t,2,0,"");n(t,3,0,"4");n(t,4,0,"[0-9.-]+"),n(t,7,0,l.name(t.parent.parent.context.index,t.parent.context.index),l.elements[t.parent.parent.context.index][t.parent.context.index])},function(n,t){n(t,0,0,s._28(t,2).required?"":null,s._28(t,3).maxlength?s._28(t,3).maxlength:null,s._28(t,4).pattern?s._28(t,4).pattern:null,s._28(t,9).ngClassUntouched,s._28(t,9).ngClassTouched,s._28(t,9).ngClassPristine,s._28(t,9).ngClassDirty,s._28(t,9).ngClassValid,s._28(t,9).ngClassInvalid,s._28(t,9).ngClassPending)})}function i(n){return s._25(0,[(n()(),s._27(0,null,null,7,"td",[],null,null,null,null,null)),(n()(),s._26(null,["\n\t\t\t\t\t\t"])),(n()(),s._33(16777216,null,null,1,null,u)),s._29(16384,null,0,d.l,[s.W,s._7],{ngIf:[0,"ngIf"]},null),(n()(),s._26(null,["\n\t\t\t\t\t\t"])),(n()(),s._33(16777216,null,null,1,null,e)),s._29(16384,null,0,d.l,[s.W,s._7],{ngIf:[0,"ngIf"]},null),(n()(),s._26(null,["\n\t\t\t\t\t"]))],function(n,t){var l=t.component;n(t,3,0,!l.editable),n(t,6,0,l.editable)},null)}function r(n){return s._25(0,[(n()(),s._27(0,null,null,4,"tr",[],null,null,null,null,null)),(n()(),s._26(null,["\n\t  \t\t\t"])),(n()(),s._33(16777216,null,null,1,null,i)),s._29(802816,null,0,d.m,[s.W,s._7,s.l],{ngForOf:[0,"ngForOf"],ngForTrackBy:[1,"ngForTrackBy"]},null),(n()(),s._26(null,["\n\t\t\t\t"]))],function(n,t){var l=t.component;n(t,3,0,t.context.$implicit,l.trackByIndex)},null)}function o(n){return s._25(0,[s._30(402653184,1,{form:0}),(n()(),s._26(null,["\n\t \t"])),(n()(),s._27(0,null,null,12,"form",[["novalidate",""]],[[2,"ng-untouched",null],[2,"ng-touched",null],[2,"ng-pristine",null],[2,"ng-dirty",null],[2,"ng-valid",null],[2,"ng-invalid",null],[2,"ng-pending",null]],[[null,"submit"],[null,"reset"]],function(n,t,l){var u=!0;if("submit"===t){u=!1!==s._28(n,4).onSubmit(l)&&u}if("reset"===t){u=!1!==s._28(n,4).onReset()&&u}return u},null,null)),s._29(16384,null,0,c.o,[],null,null),s._29(16384,[[1,4],["form",4]],0,c.p,[[8,null],[8,null]],null,null),s._32(2048,null,c.l,null,[c.p]),s._29(16384,null,0,c.q,[c.l],null,null),(n()(),s._26(null,["\n\t  \t"])),(n()(),s._27(0,[["tab",1]],null,5,"table",[],null,null,null,null,null)),(n()(),s._26(null,["\n\t  \t\t"])),(n()(),s._27(0,null,null,3,"tbody",[],null,null,null,null,null)),(n()(),s._33(16777216,null,null,1,null,r)),s._29(802816,null,0,d.m,[s.W,s._7,s.l],{ngForOf:[0,"ngForOf"],ngForTrackBy:[1,"ngForTrackBy"]},null),(n()(),s._26(null,["\n\t\t\t"])),(n()(),s._26(null,["\n\t\t"])),(n()(),s._26(null,["\n\t"]))],function(n,t){var l=t.component;n(t,12,0,l.elements,l.trackByIndex)},function(n,t){n(t,2,0,s._28(t,6).ngClassUntouched,s._28(t,6).ngClassTouched,s._28(t,6).ngClassPristine,s._28(t,6).ngClassDirty,s._28(t,6).ngClassValid,s._28(t,6).ngClassInvalid,s._28(t,6).ngClassPending)})}function a(n){return s._25(0,[(n()(),s._27(0,null,null,1,"matrix",[],null,null,null,o,_)),s._29(49152,null,0,f.a,[],null,null)],null,null)}var s=l("/oeL"),c=l("bm2B"),d=l("qbdv"),f=l("sO5o");l.d(t,"b",function(){return _}),t.a=o;var h=["input[_ngcontent-%COMP%] {\n\t\t\ttext-align: center;\n\t\t\tborder-width:0px;\n\t\t\twidth: 30px;\n\t\t\tbackground-color: #eee;\n\t\t}\n\t\tinput[_ngcontent-%COMP%]:invalid { color: #f00; }\n\t\ttable[_ngcontent-%COMP%] {\n\t\t\tborder-left: 1px solid #000;\n\t\t\tborder-right: 1px solid #000;\n\t\t\tline-height: .3em;\n\t\t}\n\t\tform[_ngcontent-%COMP%] { display: inline-block; vertical-align: middle; }"],_=s._24({encapsulation:0,styles:h,data:{}});s._31("matrix",f.a,a,{elements:"elements",editable:"editable"},{},[])},YdcG:function(n,t,l){"use strict";function u(n){return i._25(0,[(n()(),i._27(0,null,null,1,"div",[],null,null,null,null,null)),(n()(),i._26(null,["",""]))],null,function(n,t){n(t,1,0,t.component.message)})}function e(n){return i._25(0,[(n()(),i._27(0,null,null,2,"tasks2d",[],null,null,null,u,s)),i._32(512,null,o.a,o.a,[]),i._29(49152,null,0,r.a,[o.a],null,null)],null,null)}var i=l("/oeL"),r=l("BenJ"),o=l("oxUd");l.d(t,"b",function(){return s}),t.a=u;var a=["div[_ngcontent-%COMP%] { font-family: Times; }"],s=i._24({encapsulation:0,styles:a,data:{}});i._31("tasks2d",r.a,e,{},{},[])},ZYEP:function(n,t,l){"use strict";function u(n){return i._25(0,[i._30(402653184,1,{graphics:0}),i._30(402653184,2,{formula:0}),i._30(402653184,3,{tasks:0}),i._30(402653184,4,{controls:0}),i._30(402653184,5,{results:0}),(n()(),i._26(null,["\n\t\t"])),(n()(),i._27(0,null,null,1,"results",[],null,null,null,r.a,r.b)),i._29(49152,[[5,4],["res",4]],0,o.a,[],null,null),(n()(),i._26(null,["\n\t\t"])),(n()(),i._27(0,null,null,2,"tasks2d",[],null,null,null,a.a,a.b)),i._32(512,null,s.a,s.a,[]),i._29(49152,[[3,4]],0,c.a,[s.a],null,null),(n()(),i._26(null,["\n\t  "])),(n()(),i._27(0,null,null,17,"section",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,2,"graphics2d",[["class","grph"]],null,null,null,d.a,d.b)),i._32(512,null,f.a,f.a,[]),i._29(4243456,[[1,4]],0,h.a,[f.a],null,null),(n()(),i._26(null,["\n\t  "])),(n()(),i._27(0,null,null,1,"section",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t  "])),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,1,"formula",[],null,null,null,_.a,_.b)),i._29(49152,[[2,4]],0,m.a,[],null,null),(n()(),i._26(null,["\n\t  "])),(n()(),i._27(0,null,null,1,"section",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t  "])),(n()(),i._26(null,["\n\t   \t"])),(n()(),i._27(0,null,null,1,"controls",[],null,[[null,"onClickTfm"],[null,"onClickNxt"]],function(n,t,l){var u=!0,e=n.component;if("onClickTfm"===t){u=!1!==e.transform()&&u}if("onClickNxt"===t){u=!1!==e.next()&&u}return u},g.a,g.b)),i._29(49152,[[4,4]],0,v.a,[],null,{onClickTfm:"onClickTfm",onClickNxt:"onClickNxt"}),(n()(),i._26(null,["\n\t\t"])),(n()(),i._26(null,["\n\t"]))],null,null)}function e(n){return i._25(0,[(n()(),i._27(0,null,null,2,"transform2d",[],null,null,null,u,w)),i._32(512,null,x.a,x.a,[]),i._29(6406144,null,0,p.a,[x.a],null,null)],function(n,t){n(t,2,0)},null)}var i=l("/oeL"),r=l("PTRp"),o=l("YWZ6"),a=l("YdcG"),s=l("oxUd"),c=l("BenJ"),d=l("3N27"),f=l("Pr6h"),h=l("cgrw"),_=l("xKsF"),m=l("zYb+"),p=l("T1Zu"),g=l("je7k"),v=l("QeN1"),x=l("24L0");l.d(t,"a",function(){return C});var b=["section[_ngcontent-%COMP%] { text-align: center; line-height: 0; }"],w=i._24({encapsulation:0,styles:b,data:{}}),C=i._31("transform2d",p.a,e,{},{},[])},"aR8+":function(n,t,l){"use strict";var u=l("MHwY");l.d(t,"a",function(){return e});var e=(u.a,u.b,function(){function n(){}return n}())},ayA1:function(n,t,l){"use strict";l.d(t,"a",function(){return u}),l.d(t,"b",function(){return e}),l.d(t,"c",function(){return i}),l.d(t,"d",function(){return r}),l.d(t,"e",function(){return o}),l.d(t,"f",function(){return a}),l.d(t,"g",function(){return s}),l.d(t,"h",function(){return c}),l.d(t,"i",function(){return d});var u=[[0,0,0,1],[1,0,0,1],[1,1,0,1],[0,1,0,1],[0,0,1,1],[1,0,1,1],[1,1,1,1],[0,1,1,1]],e=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7]],i={segments:{width:1,color:"#00f"},points:{width:7,color:"#f00"},captions:{texts:["A","B","C","D","E","F","G","H"],font:"14px arial",color:"#00f"}},r=[[-3,0,0,1],[3,0,0,1],[0,-3,0,1],[0,3,0,1],[0,0,-3,1],[0,0,3,1],[2.85,.15,0,1],[2.85,-.15,0,1],[.15,2.85,0,1],[-.15,2.85,0,1],[0,.15,2.85,1],[0,-.15,2.85,1]],o=[[0,1],[2,3],[4,5],[1,6],[1,7],[3,8],[3,9],[5,10],[5,11]],a={segments:{width:1,color:"#000"},points:{},captions:{texts:["","X","","Y","","Z"],font:"20px arial",color:"#f00"}},s=[[0,0,1,1],[0,0,2,1],[0,0,-1,1],[0,0,-2,1],[0,1,0,1],[0,2,0,1],[0,-1,0,1],[0,-2,0,1],[-1,0,0,1],[-2,0,0,1],[1,0,0,1],[2,0,0,1]],c=[[0,1]],d={segments:{},points:{width:4,color:"#000"},captions:{}}},bimB:function(n,t,l){"use strict";l.d(t,"a",function(){return u}),l.d(t,"b",function(){return e}),l.d(t,"c",function(){return i}),l.d(t,"d",function(){return r}),l.d(t,"e",function(){return o}),l.d(t,"f",function(){return a}),l.d(t,"g",function(){return s}),l.d(t,"h",function(){return c}),l.d(t,"i",function(){return d});var u=[[0,0,1],[1,0,1],[1,1,1],[0,1,1]],e=[[0,1],[1,2],[2,3],[3,0]],i={segments:{width:1,color:"#00f"},points:{width:7,color:"#f00"},captions:{texts:["A","B","C","D"],font:"14px arial",color:"#00f"}},r=[[-3,0,1],[3,0,1],[0,-3,1],[0,3,1],[2.85,.15,1],[2.85,-.15,1],[.15,2.85,1],[-.15,2.85,1]],o=[[0,1],[2,3],[1,4],[1,5],[3,6],[3,7]],a={segments:{width:1,color:"#000"},points:{},captions:{texts:["","X","","Y"],font:"20px arial",color:"#f00"}},s=[[0,1,1],[0,2,1],[0,-1,1],[0,-2,1],[1,0,1],[2,0,1],[-1,0,1],[-2,0,1]],c=[[0,1]],d={segments:{},points:{width:4,color:"#000"},captions:{}}},cDNt:function(n,t,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=l("/oeL"),e=l("p5Ee"),i=l("fc+i"),r=l("+h1B");e.a.production&&l.i(u.a)(),l.i(i.a)().bootstrapModuleFactory(r.a)},cgrw:function(n,t,l){"use strict";var u=l("Pr6h"),e=l("bimB");l.d(t,"a",function(){return i});var i=function(){function n(n){this.cnvSrv=n,this.width=420,this.height=450,this.center={x:this.width/2,y:this.height/2},this.scale=65,this.mxOriginal=this.mxChanged=e.a,this.mxTransform=(new cg2d.Transform2d).getElems()}return n.prototype.ngAfterViewInit=function(){document.body.style.minWidth=this.width+"px",this.container.nativeElement.style.width=this.width+"px",this.container.nativeElement.style.height=this.height+"px",this.axesCtx=this.cnvSrv.initCanvas(this.axes,this.width,this.height),this.sampleCtx=this.cnvSrv.initCanvas(this.sample,this.width,this.height),this.objectCtx=this.cnvSrv.initCanvas(this.object,this.width,this.height)},n.prototype.show=function(n){var t=cg2d.Object2d,l=cg2d.Transform2d,u=cg2d.Scene2d;this.mxTransform=(new l).getElems();var i=new t(e.a,e.b,e.c),r=new t(e.d,e.e,e.f),o=new t(e.g,e.h,e.i);this.mxChanged=i.getElems();var a=this.center,s=this.scale,c=new u(this.axesCtx,a,s);c.addObject(r),c.addObject(o),c.draw();var d=i.getCopy(),f=new l(n);d.applyTransformation(f);var h=new u(this.sampleCtx,a,s);h.addObject(d),h.draw();var _=new u(this.objectCtx,a,s);_.addObject(i),_.draw()},n.prototype.transform=function(n){var t=cg2d.Object2d,l=cg2d.Transform2d,u=cg2d.Scene2d,i=new t(e.a,e.b,e.c),r=new l(n);i.applyTransformation(r),this.mxChanged=i.getElems();var o=this.center,a=this.scale,s=new u(this.objectCtx,o,a);s.addObject(i),s.draw()},n.ctorParameters=function(){return[{type:u.a}]},n}()},hmZi:function(n,t,l){"use strict";var u=l("oxUd");l.d(t,"a",function(){return e});var e=function(){function n(n){this.randS=n}return n.prototype.generateNewTask=function(){var n,t,l,u=this.randS.random,e=new cg3d.Transform3d,i="Change the transformation matrix to produce ",r=u(1,2),o=["x","y","z"];switch(u(0,5)){case 0:i+="a perspective with the vanishing point at";for(var a=0;a<r;a++)l=u(1,o.length)-1,t=o[l],o.splice(l,1),n=u(3,7),n*=Math.pow(-1,u(1,2)),i=i+" "+t+" = "+n,e.perspective(t,1/n);break;case 1:i+="a translation in the";for(var a=0;a<r;a++)l=u(1,o.length)-1,t=o[l],o.splice(l,1),n=u(1,2),n*=Math.pow(-1,u(1,2)),i=i+" "+t+"-direction  by "+n,e.move(t,n);break;case 2:i+="a local scaling in the";for(var a=0;a<r;a++)l=u(1,o.length)-1,t=o[l],o.splice(l,1),n=u(2,3),i=i+" "+t+"-direction  by "+n,e.scale(t,n);break;case 3:i+="a reflection through the";for(var a=0;a<r;a++)l=u(1,o.length)-1,t=o[l],o.splice(l,1),n=-1,i=i+" plane "+t+" = 0 ",e.scale(t,n);break;case 4:i+="an overall scaling by ",n=u(2,3),i+=n,e.scale("s",1/n);break;case 5:i+="a rotation about the",l=u(1,o.length)-1,t=o[l],n=u(1,18),n*=10*Math.pow(-1,u(1,2)),i=i+" "+t+"-axis  by an angle "+n+" degrees",e.rotate(t,n)}return this.message=i+". As a result, the transformed object should match the sample object (a semitransparent figure).",e.getElems()},n.ctorParameters=function(){return[{type:u.a}]},n}()},je7k:function(n,t,l){"use strict";function u(n){return i._25(0,[(n()(),i._26(null,["\n  \t"])),(n()(),i._27(0,null,null,1,"button",[],[[8,"disabled",0]],[[null,"click"]],function(n,t,l){var u=!0,e=n.component;if("click"===t){u=!1!==e.transform()&&u}return u},null,null)),(n()(),i._26(null,["Transform"])),(n()(),i._26(null,["\n  \t"])),(n()(),i._27(0,null,null,1,"button",[],null,[[null,"click"]],function(n,t,l){var u=!0,e=n.component;if("click"===t){u=!1!==e.next()&&u}return u},null,null)),(n()(),i._26(null,["Next"])),(n()(),i._26(null,["\n\t"]))],null,function(n,t){n(t,1,0,t.component.invalid)})}function e(n){return i._25(0,[(n()(),i._27(0,null,null,1,"controls",[],null,null,null,u,a)),i._29(49152,null,0,r.a,[],null,null)],null,null)}var i=l("/oeL"),r=l("QeN1");l.d(t,"b",function(){return a}),t.a=u;var o=["button[_ngcontent-%COMP%] { \n\t\t\tfont: normal 1rem Arial; \n\t\t\tmargin: 0.7em 0.3em 0 0.3em; \n\t\t\tpadding: 0.1em 0.6em; \n\t\t}"],a=i._24({encapsulation:0,styles:o,data:{}});i._31("controls",r.a,e,{},{onClickTfm:"onClickTfm",onClickNxt:"onClickNxt"},[])},oxUd:function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u=function(){function n(){}return n.prototype.random=function(n,t){return Math.floor(Math.random()*(t+1-n))+n},n}()},p5Ee:function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u={production:!0}},puIn:function(n,t,l){"use strict";function u(n){return i._25(0,[(n()(),i._27(0,null,null,1,"div",[],null,null,null,null,null)),(n()(),i._26(null,["",""]))],null,function(n,t){n(t,1,0,t.component.message)})}function e(n){return i._25(0,[(n()(),i._27(0,null,null,2,"tasks3d",[],null,null,null,u,s)),i._32(512,null,o.a,o.a,[]),i._29(49152,null,0,r.a,[o.a],null,null)],null,null)}var i=l("/oeL"),r=l("hmZi"),o=l("oxUd");l.d(t,"b",function(){return s}),t.a=u;var a=["div[_ngcontent-%COMP%] { font-family: Times; }"],s=i._24({encapsulation:0,styles:a,data:{}});i._31("tasks3d",r.a,e,{},{},[])},q4dy:function(n,t,l){"use strict";function u(n){return i._25(0,[(n()(),i._26(null,["\n\t  "])),(n()(),i._27(0,null,null,26,"section",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t  "])),(n()(),i._27(0,null,null,20,"nav",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t  \t"])),(n()(),i._27(0,null,null,17,"ul",[],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t\t\t\t"])),(n()(),i._27(0,null,null,0,"div",[["id","bottom-line"]],null,null,null,null,null)),(n()(),i._26(null,["\n\t\t  \t\t"])),(n()(),i._27(0,null,null,5,"li",[["routerLink","transform2d"],["routerLinkActive","active"]],null,[[null,"click"]],function(n,t,l){var u=!0;if("click"===t){u=!1!==i._28(n,10).onClick()&&u}return u},null,null)),i._29(16384,[[1,4]],0,r.y,[r.c,r.a,[8,null],i.O,i.P],{routerLink:[0,"routerLink"]},null),i._29(1720320,null,2,r.z,[r.c,i.P,i.O,i.T],{routerLinkActive:[0,"routerLinkActive"]},null),i._30(603979776,1,{links:1}),i._30(603979776,2,{linksWithHrefs:1}),(n()(),i._26(null,["2D-Transformations"])),(n()(),i._26(null,["\n\t\t  \t\t"])),(n()(),i._27(0,null,null,5,"li",[["routerLink","transform3d"],["routerLinkActive","active"]],null,[[null,"click"]],function(n,t,l){var u=!0;if("click"===t){u=!1!==i._28(n,17).onClick()&&u}return u},null,null)),i._29(16384,[[3,4]],0,r.y,[r.c,r.a,[8,null],i.O,i.P],{routerLink:[0,"routerLink"]},null),i._29(1720320,null,2,r.z,[r.c,i.P,i.O,i.T],{routerLinkActive:[0,"routerLinkActive"]},null),i._30(603979776,3,{links:1}),i._30(603979776,4,{linksWithHrefs:1}),(n()(),i._26(null,["3D-Transformations"])),(n()(),i._26(null,["\n\t\t\t\t"])),(n()(),i._26(null,["\n\t\t\t"])),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(16777216,null,null,1,"router-outlet",[],null,null,null,null,null)),i._29(212992,null,0,r.A,[r.q,i.W,i.e,[8,null],i.T],null,null),(n()(),i._26(null,["\n\t\t"])),(n()(),i._26(null,["\n\t"]))],function(n,t){n(t,10,0,"transform2d");n(t,11,0,"active");n(t,17,0,"transform3d");n(t,18,0,"active"),n(t,26,0)},null)}function e(n){return i._25(0,[(n()(),i._27(0,null,null,1,"app-root",[],null,null,null,u,s)),i._29(49152,null,0,o.a,[],null,null)],null,null)}var i=l("/oeL"),r=l("BkNc"),o=l("wQAS");l.d(t,"a",function(){return c});var a=["section[_ngcontent-%COMP%] { max-width: 600px; font: normal 1rem Arial; padding: .5em; }\n\t\t#bottom-line[_ngcontent-%COMP%] { \n\t\t\tposition: absolute; \n\t\t\tz-index: 0; \n\t\t\tborder-bottom: 1px solid #ddd; \n\t\t\twidth: 100%; \n\t\t\theight: 95%;\n\t\t}\n\t\tul[_ngcontent-%COMP%] { list-style: none; overflow: hidden; position: relative;  }\n\t\tli[_ngcontent-%COMP%] { \n\t\t\tfloat: left; \n\t\t\tposition: relative;\n\t\t\tz-index: 2;\n\t\t\tfont-size: 1.2rem;\n\t\t\tpadding: .3em .7em;\n\t\t\tcursor: pointer;\n\t\t\toutline: none;\n\t\t}\n\t\t.active[_ngcontent-%COMP%] { color: #00f; border-bottom: 3px solid #00f; }\n\t\tli[_ngcontent-%COMP%]:hover { background-color: #eee; }"],s=i._24({encapsulation:0,styles:a,data:{}}),c=i._31("app-root",o.a,e,{},{},[])},qtrl:function(n,t){function l(n){throw new Error("Cannot find module '"+n+"'.")}l.keys=function(){return[]},l.resolve=l,n.exports=l,l.id="qtrl"},sO5o:function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u=function(){function n(){}return n.prototype.name=function(n,t){return n+"-"+t},n.prototype.round=function(n){return n.toString().length>4&&(n=Math.round(100*n)/100),n},n.prototype.trackByIndex=function(n,t){return n},n}()},wQAS:function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u=function(){function n(){}return n}()},xKsF:function(n,t,l){"use strict";function u(n){return i._25(0,[i._30(402653184,1,{transf:0}),(n()(),i._26(null,["\n  \t"])),(n()(),i._27(0,null,null,16,"div",[["id","formula"]],null,null,null,null,null)),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,1,"matrix",[["class","object"]],null,null,null,r.a,r.b)),i._29(49152,null,0,o.a,[],{elements:[0,"elements"],editable:[1,"editable"]},null),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,1,"div",[["class","sign"]],null,null,null,null,null)),(n()(),i._26(null,["x"])),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,1,"matrix",[],null,null,null,r.a,r.b)),i._29(49152,[[1,4],["transf",4]],0,o.a,[],{elements:[0,"elements"],editable:[1,"editable"]},null),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,1,"div",[["class","sign"]],null,null,null,null,null)),(n()(),i._26(null,["="])),(n()(),i._26(null,["\n\t  \t"])),(n()(),i._27(0,null,null,1,"matrix",[["class","object"]],null,null,null,r.a,r.b)),i._29(49152,null,0,o.a,[],{elements:[0,"elements"],editable:[1,"editable"]},null),(n()(),i._26(null,["\n  \t"])),(n()(),i._26(null,["\n\t"]))],function(n,t){var l=t.component;n(t,5,0,l.mxOriginal,!1);n(t,11,0,l.mxTransform,!0);n(t,17,0,l.mxChanged,!1)},null)}function e(n){return i._25(0,[(n()(),i._27(0,null,null,1,"formula",[],null,null,null,u,c)),i._29(49152,null,0,a.a,[],null,null)],null,null)}var i=l("/oeL"),r=l("YZiI"),o=l("sO5o"),a=l("zYb+");l.d(t,"b",function(){return c}),t.a=u;var s=[".sign[_ngcontent-%COMP%] {\n\t\t\tfont-size: 1.1rem;\n\t\t\tpadding: 0 2px;\n\t\t  display: inline-block;\n\t\t  vertical-align: middle;\n\t\t}\n\t\t#formula[_ngcontent-%COMP%] {\n\t\t\tmargin: 0;\n\t\t  display: inline-block; text-align:left;\n\t\t}\n\t\t@media screen and (max-width: 460px) {\n\t\t\t.object[_ngcontent-%COMP%], .sign[_ngcontent-%COMP%] { display: none; }\n\t\t}"],c=i._24({encapsulation:0,styles:s,data:{}});i._31("formula",a.a,e,{},{},[])},"zYb+":function(n,t,l){"use strict";l.d(t,"a",function(){return u});var u=function(){function n(){}return n}()}},[0]);