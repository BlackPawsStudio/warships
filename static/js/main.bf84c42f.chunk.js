(this.webpackJsonpwarships=this.webpackJsonpwarships||[]).push([[0],{28:function(e,t,i){},44:function(e,t,i){},52:function(e,t,i){},53:function(e,t,i){},54:function(e,t,i){},55:function(e,t,i){},56:function(e,t,i){"use strict";i.r(t);for(var n=i(1),c=i.n(n),s=i(22),r=i(21),a=i(13),o=i(16),l=[{id:0,type:"boat",size:1,amount:4},{id:1,type:"boat",size:1,amount:4},{id:2,type:"boat",size:1,amount:4},{id:3,type:"boat",size:1,amount:4},{id:4,type:"cruiser",size:2,amount:3},{id:5,type:"cruiser",size:2,amount:3},{id:6,type:"cruiser",size:2,amount:3},{id:7,type:"destroyer",size:3,amount:2},{id:8,type:"destroyer",size:3,amount:2},{id:9,type:"carrier",size:4,amount:1}],u=Object(o.b)({name:"gameState",initialState:{yourId:"",game:"",step:"mainTitle",isHorizontal:!0,ships:l,isMyTurn:!1},reducers:{setYourId:function(e,t){e.yourId=t.payload},setGame:function(e,t){e.game=t.payload},setIsHorizontal:function(e){e.isHorizontal=!e.isHorizontal},removeShip:function(e,t){e.ships=e.ships.filter((function(e){return e.id!==t.payload}))},addShip:function(e,t){e.ships.push(t.payload)},setStep:function(e,t){e.step=t.payload},resetShips:function(e){e.ships=l},setIsMyTurn:function(e,t){e.isMyTurn=t.payload}}}),d=u.reducer,f=u.actions,j=f.setIsHorizontal,p=f.removeShip,h=(f.addShip,f.setStep),b=f.resetShips,m=f.setGame,y=f.setYourId,v=f.setIsMyTurn,O=i(33),x=Object(o.b)({name:"drag",initialState:Object(O.a)({},{isSelected:null}),reducers:{setIsSelected:function(e,t){e.isSelected=t.payload}}}),g=x.reducer,S=x.actions.setIsSelected,_=[],F=0;F<10;F++)for(var z=0;z<10;z++)_.push({id:F+z,x:F,y:z,state:"empty"});_.map((function(e,t){return e.id=t}));var I=Object(o.b)({name:"yourField",initialState:{yourField:_,enemyField:_},reducers:{setField:function(e,t){e.yourField=t.payload},setCell:function(e,t){var i=e.yourField.find((function(e){return e.x===t.payload.x&&e.y===t.payload.y}));i&&(e.yourField[i.id].state=t.payload.state)},setEnemyCell:function(e,t){var i=e.enemyField.find((function(e){return e.x===t.payload.x&&e.y===t.payload.y}));i&&(e.enemyField[i.id].state=t.payload.state)},resetHoverField:function(e){e.yourField.map((function(e){return"hover"===e.state?e.state="empty":e.state}))},resetField:function(e){e.yourField=_}}}),w=I.reducer,k=I.actions,N=(k.setField,k.setCell),C=k.resetHoverField,E=k.resetField,M=k.setEnemyCell,T=Object(a.b)({dragStateSlice:g,fieldsSlice:w,gameStateSlice:d}),H=Object(o.a)({reducer:T}),W=(i(44),i(32)),G=function(){return Object(r.b)()},R=r.c,Y=i(0),J=function(e){var t=e.id,i=e.type,n=e.size,c=G(),s=R((function(e){return{selected:e.dragStateSlice.isSelected}})).selected;return Object(Y.jsx)("div",{onClick:function(){s&&s.id===t?c(S(null)):c(S({id:t,type:i,size:n}))},className:"ship",style:{width:"calc(".concat(n," * 5vh)"),background:s&&s.id===t?"#00f":"#00ff00"}})},L=i(20),P=i.n(L),B=i(25),D=i(15),V=function(e,t,i){var n=i.find((function(i){return i.x===e&&i.y===t}));return"ship"!==(null===n||void 0===n?void 0:n.state)},q=function(e,t,i){return!!(V(e,t,i)&&V(e+1,t,i)&&V(e-1,t,i)&&V(e,t+1,i)&&V(e,t-1,i)&&V(e+1,t+1,i)&&V(e+1,t-1,i)&&V(e-1,t+1,i)&&V(e-1,t-1,i))},A=function(e,t,i,n,c){if(n){for(var s=0;s<c;s++)if(!q(e,t+s,i))return!1}else for(var r=0;r<c;r++)if(!q(e+r,t,i))return!1;return!0},K=(i(28),function(e){var t=e.id,i=e.x,c=e.y,s=e.state,r=e.isEnemy,a=Object(n.useState)(!1),o=Object(D.a)(a,2),l=o[0],u=o[1],d=G(),f=R((function(e){return{isSelected:e.dragStateSlice.isSelected}})).isSelected,h=R((function(e){return{yourField:e.fieldsSlice.yourField}})).yourField,b=R((function(e){var t=e.gameStateSlice;return{isHorizontal:t.isHorizontal,step:t.step,game:t.game,isMyTurn:t.isMyTurn}})),m=b.isHorizontal,y=b.step,v=b.game,O=b.isMyTurn,x=function(e){if(f)if(m&&c+f.size<=10||!m&&i+f.size<=10)for(var t=0;t<f.size;t++)A(i,c,h,m,f.size)&&(u(!0),d(N(m?{x:i,y:c+t,state:e}:{x:i+t,y:c,state:e})));else u(!1)},g=function(){var e=Object(B.a)(P.a.mark((function e(t){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.next=3,d(j());case 3:return e.next=5,d(C());case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return Object(Y.jsx)("div",{className:"cell ".concat(r?"cell_enemy":""),style:{background:"hover"===s?"#00f":"miss"===s?"#fff":"hit"===s?"#f00":"ship"===s?"#0f0":"#555"},onMouseMove:function(){return x("hover")},onMouseLeave:function(){return x("empty")},onClick:function(){return"placeShips"===y?void(l&&f&&(x("ship"),d(p(f.id)),d(S(null)),u(!1))):void(O&&ie.emit("check-cell",t,v))},onContextMenu:function(e){return g(e)}})}),Q=function(e){var t=e.your,i=G(),c=R((function(e){var t=e.fieldsSlice;return{field:t.yourField,enemyField:t.enemyField}})),s=c.field,r=c.enemyField,a=R((function(e){var t=e.gameStateSlice;return{isHorizontal:t.isHorizontal,ships:t.ships,step:t.step,isMyTurn:t.isMyTurn,yourId:t.yourId}})),o=a.isHorizontal,l=a.ships,u=a.step,d=a.isMyTurn,f=a.yourId,j=R((function(e){return{isSelected:e.dragStateSlice.isSelected}})).isSelected;return Object(n.useEffect)((function(){ie.on("check-cell-response",(function(e){var t=e.victim,n=e.cell;"empty"===n.state?n.state="miss":"ship"!==n.state&&"hit"!==n.state||(n.state="hit"),f&&t&&t===f?(i(N(n)),"hit"!==n.state?i(v(!0)):i(v(!1))):f&&t&&t!==f&&(i(M(n)),"hit"===n.state?i(v(!0)):i(v(!1)))}))}),[i,f,s,r]),Object(Y.jsxs)("div",{children:[Object(Y.jsx)("div",{className:"field__title",children:t?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)("div",{children:"Your field"}),"placeShips"===u?Object(Y.jsx)("div",{style:{transform:"scale(".concat(200/((null===j||void 0===j?void 0:j.size)||20),"%)").concat(o?" ":" rotate(90deg)")},children:0!==l.length&&Object(Y.jsx)(J,{id:(null===j||void 0===j?void 0:j.id)||0,type:(null===j||void 0===j?void 0:j.type)||"boat",size:(null===j||void 0===j?void 0:j.size)||0})}):"gameStart"===u&&Object(Y.jsxs)("div",{children:[d?"Your":"Enemy"," turn"]})]}):"Enemy field"}),Object(Y.jsx)("div",{className:"container game__field",children:t?s.map((function(e){return Object(Y.jsx)(K,{id:e.id,x:e.x,y:e.y,state:e.state},e.id)})):r.map((function(e){return Object(Y.jsx)(K,{id:e.id,x:e.x,y:e.y,state:e.state,isEnemy:!0},e.id)}))})]})},U=(i(52),function(e){var t=e.onClick,i=e.children,n=e.disabled;return Object(Y.jsx)("button",{disabled:n,className:"button",onClick:function(){return t&&t()},children:i})}),X=function(){var e=Object(n.useState)(!1),t=Object(D.a)(e,2),i=t[0],c=t[1],s=R((function(e){var t=e.gameStateSlice;return{ships:t.ships,game:t.game,yourId:t.yourId}})),r=s.ships,a=s.game,o=s.yourId,l=R((function(e){return{yourField:e.fieldsSlice.yourField}})).yourField,u=G();Object(n.useEffect)((function(){ie.on("game-start",(function(){u(h("gameStart")),a===o&&u(v(!0))})),ie.on("game-pending",(function(){0===r.length&&c(!0)}))}),[u,r,o,a]);return Object(Y.jsxs)("div",{children:[Object(Y.jsx)("div",{className:"field__title",children:"Game Info"}),Object(Y.jsxs)("div",{className:"container settings__field",children:[Object(Y.jsx)("h4",{children:"Game controls"}),Object(Y.jsx)("label",{children:"'Left mouse click to place ship'"}),Object(Y.jsx)("label",{children:"'Right mouse click to rotate ship'"}),i?Object(Y.jsx)(U,{disabled:!0,children:"Waiting for your opponent..."}):Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(U,{onClick:function(){ie.emit("player-ready",a,l)},disabled:0!==r.length,children:"Proceed to game"}),Object(Y.jsx)(U,{onClick:function(){u(b()),u(E())},children:"Reset"})]})]})]})},Z=function(e){var t=e.text,i=Object(n.useState)(!1),c=Object(D.a)(i,2),s=c[0],r=c[1],a=Object(n.useState)(""),o=Object(D.a)(a,2),l=o[0],u=o[1],d=R((function(e){return{yourId:e.gameStateSlice.yourId}})).yourId,f=G();Object(n.useEffect)((function(){ie.on("connect",(function(){ie.emit("get-id")})),ie.on("git-id-res",(function(e){f(y(e))})),ie.on("room-create-response",(function(e){"accept"===e.response?(console.log("accepted"),f(m(e.game)),f(h("placeShips"))):alert("Error ".concat(e.response,"!"))}))}),[f]);var j=function(){var e=Object(B.a)(P.a.mark((function e(){return P.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,navigator.clipboard.writeText("".concat(window.location.hostname).concat(window.location.pathname)+d);case 2:r(!0),setTimeout((function(){r(!1)}),2e3);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return Object(Y.jsx)("div",{className:"invite__section",children:t?Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)("h4",{children:"Welcome to Warships!"}),Object(Y.jsx)("label",{className:"invite__label",children:"I'll think of this text later"})]}):Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsxs)("div",{children:[Object(Y.jsx)("label",{className:"invite__label",children:"Invite your friend!"}),Object(Y.jsx)("div",{className:"invite__input_label",children:s?Object(Y.jsx)("label",{className:"invite__input",children:"Copied!"}):Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)("input",{type:"text",className:"invite__input",defaultValue:d,disabled:!0}),Object(Y.jsx)(U,{onClick:j,children:"Copy"})," "]})})]}),Object(Y.jsxs)("div",{children:[Object(Y.jsx)("label",{className:"invite__label",children:"Or insert invite link here"}),Object(Y.jsxs)("div",{className:"invite__input_label",children:[Object(Y.jsx)("input",{type:"text",className:"invite__input",onChange:function(e){u(e.target.value)}}),Object(Y.jsx)(U,{onClick:function(){if(!t)if(l.includes(window.location.hostname)){var e=l.substring(l.indexOf("/warships")+9);ie.emit("room-create",e)}else alert("Wrong invite code!"),u("")},children:"Confirm"})]})]})]})})},$=(i(53),function(){return Object(Y.jsxs)("div",{className:"invite__screen",children:[Object(Y.jsx)(Z,{text:!0}),Object(Y.jsx)(Z,{})]})}),ee=(i(54),function(){var e=R((function(e){return{ships:e.gameStateSlice.ships}})).ships,t=Object(n.useRef)(null),i=Object(n.useState)(!1),c=Object(D.a)(i,2),s=c[0],r=c[1],a=Object(n.useCallback)((function(){if(t.current&&0!==e.length)if(s){var i;t.current.style.left="-".concat((null===(i=t.current)||void 0===i?void 0:i.offsetWidth)||0,"px"),r(!1)}else t.current.style.left="0",r(!0)}),[s,e.length]);return Object(n.useEffect)((function(){var e;t.current&&(t.current.style.left="-".concat((null===(e=t.current)||void 0===e?void 0:e.offsetWidth)||0,"px"))}),[t]),Object(n.useEffect)((function(){var i;0===e.length&&t.current&&(t.current.style.left="-".concat((null===(i=t.current)||void 0===i?void 0:i.offsetWidth)||0,"px"),r(!0))}),[e,a]),Object(Y.jsxs)("div",{className:"ships__container",ref:t,children:[e.map((function(e){return Object(Y.jsx)(J,{id:e.id,type:e.type,size:e.size},e.id)})),Object(Y.jsx)("div",{className:"trigger",onClick:a,children:"Place ships"})]})}),te=(i(55),function(){var e=G(),t=R((function(e){var t=e.gameStateSlice;return{step:t.step,yourId:t.yourId}})),i=t.step,c=t.yourId;return Object(n.useEffect)((function(){ie.on("roommate-disconnected",(function(){alert("Roommate disconnected!"),e(h("mainTitle")),window.location.pathname=""}))}),[e,c]),Object(Y.jsxs)("div",{className:"game__area",children:["mainTitle"===i&&Object(Y.jsx)($,{}),"placeShips"===i&&Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(ee,{}),Object(Y.jsx)(Q,{your:!0}),Object(Y.jsx)(X,{})]}),"gameStart"===i&&Object(Y.jsxs)(Y.Fragment,{children:[Object(Y.jsx)(Q,{your:!0}),Object(Y.jsx)(Q,{})]})]})}),ie=Object(W.a)("http://localhost:3001");var ne=function(){return Object(n.useEffect)((function(){if(window.location.pathname.length>1){var e=window.location.pathname,t=e.substring(e.indexOf("/")+1);ie.emit("room-create",t)}}),[]),Object(Y.jsx)(r.a,{store:H,children:Object(Y.jsxs)("div",{className:"root",children:[Object(Y.jsx)("header",{children:Object(Y.jsx)("h1",{children:"Warships!"})}),Object(Y.jsx)("main",{children:Object(Y.jsx)(te,{})})]})})};Object(s.render)(Object(Y.jsx)(c.a.StrictMode,{children:Object(Y.jsx)(ne,{})}),document.getElementById("root"))}},[[56,1,2]]]);
//# sourceMappingURL=main.bf84c42f.chunk.js.map