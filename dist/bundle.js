!function(t){var e={};function o(n){if(e[n])return e[n].exports;var r=e[n]={i:n,l:!1,exports:{}};return t[n].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=t,o.c=e,o.d=function(t,e,n){o.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},o.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},o.t=function(t,e){if(1&e&&(t=o(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(o.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var r in t)o.d(n,r,function(e){return t[e]}.bind(null,r));return n},o.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return o.d(e,"a",e),e},o.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},o.p="",o(o.s=0)}([function(t,e,o){"use strict";o.r(e),function(t){o(2);function e(t,e){var o=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),o.push.apply(o,n)}return o}function n(t){for(var o=1;o<arguments.length;o++){var n=null!=arguments[o]?arguments[o]:{};o%2?e(Object(n),!0).forEach((function(e){r(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):e(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function r(t,e,o){return e in t?Object.defineProperty(t,e,{value:o,enumerable:!0,configurable:!0,writable:!0}):t[e]=o,t}var c=t.document,l=function(){return c.querySelector.apply(c,arguments)},a=function(){return c.querySelectorAll.apply(c,arguments)},i=(window,function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};return'<li class="'.concat(t.color||"white"," todo-item list-group-item d-flex w-100 mb-2 ").concat(!0===t.complited?"completed-li":"",'" data-id="').concat(t.id||"",'">\n    <div class="w-100 mr-2">\n        <div class="d-flex w-100 justify-content-between">\n            <h5 class="mb-1">').concat(t.title||"Title",'</h5>\n            <div>\n                <small class="mr-2">').concat(t.priority||"Middle"," priority</small>\n                <small>").concat(t.date?t.date:(new Date).getHours()+":"+(new Date).getMinutes()+" "+(new Date).toLocaleDateString(),'</small>\n            </div>\n\n        </div>\n        <p class="mb-1 w-100">').concat(t.text||"Still empty",'</p>\n    </div>\n    <div class="dropdown m-2 dropleft">\n        <button class="btn btn-secondary h-100" type="button" id="dropdownMenuItem1" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">\n            <i class="fas fa-ellipsis-v" aria-hidden="true"></i>\n        </button>\n        <div class="dropdown-menu p-2 flex-column" aria-labelledby="dropdownMenuItem1">\n            ').concat(!0!==t.complited?'<button type="button" class="btn btn-success w-100 compl-btn">Complete</button>':"","\n            ").concat(!0!==t.complited?'<button type="button"  class="btn btn-info w-100 my-2 edit-btn">Edit</button>':"",'\n            <button type="button" class="btn btn-danger w-100 delete-btn">Delete</button>\n        </div>\n    </div>\n</li>')}),u=!1,d="",s=function e(){l(".todo-title").innerHTML='\n    ToDo<span style="color:darkred">('.concat(f.filter((function(t){return!0!==t.complited})).length,")</span>\n    "),l(".todo-comp-title").innerHTML='\n    Completed<span style="color:darkgreen">('.concat(f.filter((function(t){return!0===t.complited})).length,")</span>\n    "),localStorage.setItem("todos",JSON.stringify(f)),l("#currentTasks").innerHTML="",l("#completedTasks").innerHTML="";var o=f.map((function(t){return t}));void 0!==t.sorter&&o.sort((function(e,o){return(e.seconds-o.seconds)*t.sorter})),o.filter((function(t){return!0!==t.complited})).forEach((function(t){l("#currentTasks").innerHTML+=i(n({},t))})),o.filter((function(t){return!0===t.complited})).forEach((function(t){l("#completedTasks").innerHTML+=i(n({},t))})),0===f.length&&(l("#currentTasks").innerHTML+='<h2><i style="color: red">There are no todos</i></h2>'),a(".compl-btn").forEach((function(t){t.onclick=function(){var t=this.parentNode.parentNode.parentNode.dataset.id;f.filter((function(e){return e.id===t}))[0].complited=!0,e()}})),a(".delete-btn").forEach((function(t){t.onclick=function(){var t=this.parentNode.parentNode.parentNode.dataset.id;f=f.filter((function(e){return e.id!==t})),e()}})),a(".edit-btn").forEach((function(t){t.onclick=function(){u=!0,a(".edit-show").forEach((function(t){return t.style.display="none"})),a(".edit-hide").forEach((function(t){return t.style.display="inline-block"})),l(".addTaskBtn").click(),d=this.parentNode.parentNode.parentNode.dataset.id;var t,e=l("form"),o=d;f.forEach((function(e,n){e.id===o&&(t=n)})),e.inputTitle.value=f[t].title||"Title",e.inputText.value=f[t].text||"Put something",e.gridRadios.value=f[t].priority,e.color.value=f[t].color}})),a(".todo-item.red").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*l("#colorRange").value,",50%,65%)")})),a(".todo-item.green").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*l("#colorRange").value+120,",50%,65%)")})),a(".todo-item.blue").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*l("#colorRange").value+240,",50%,65%)")}))},f=null==localStorage.todos?[]:JSON.parse(localStorage.todos);window.onload=function(){function e(){l("body").style.filter="hue-rotate(".concat(1.8*event.target.value,"deg)"),a(".todo-item.red").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*event.target.value,",50%,65%)")})),a(".todo-item.green").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*event.target.value+120,",50%,65%)")})),a(".todo-item.blue").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*event.target.value+240,",50%,65%)")})),localStorage.setItem("color",event.target.value)}null!=localStorage.sorter&&(t.sorter=Number(localStorage.sorter)),null!=localStorage.todos&&s(),null!=localStorage.color&&(l("body").style.filter="hue-rotate(".concat(1.8*Number(localStorage.color),"deg)"),l("#colorRange").value=localStorage.color,a(".todo-item.red").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*Number(localStorage.color),",50%,65%)")})),a(".todo-item.green").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*Number(localStorage.color)+120,",50%,65%)")})),a(".todo-item.blue").forEach((function(t){return t.style.backgroundColor="hsl(".concat(-1.8*Number(localStorage.color)+240,",50%,65%)")}))),l(".addTaskBtn").onmouseenter=function(){u=!1,l("form").reset(),a(".edit-show").forEach((function(t){return t.style.display="inline-block"})),a(".edit-hide").forEach((function(t){return t.style.display="none"}))},l("form").onsubmit=function(){var t,e,o,n;!0===u?(t=event,o=t.target,n=d,f.forEach((function(t,o){t.id===n&&(e=o)})),t.preventDefault(),l('[data-dismiss="modal"]').click(),f[e].title=o.inputTitle.value,f[e].text=o.inputText.value,f[e].color=o.color.value,f[e].priority=o.gridRadios.value,u=!1,o.reset(),s()):function(t){var e=t.target;t.preventDefault(),f.push({id:"id"+(new Date).getTime(),title:e.inputTitle.value,text:e.inputText.value,priority:e.gridRadios.value,date:(new Date).getHours()+":"+(new Date).getMinutes()+" "+(new Date).toLocaleDateString(),color:e.color.value,complited:!1,seconds:(new Date).getTime()}),e.reset(),l('[data-dismiss="modal"]').click(),s()}(event)},l("#colorRange").onchange=e,l("#colorRange").oninput=e,l(".directTodo").onclick=function(){t.sorter=-1,localStorage.setItem("sorter",-1),s()},l(".reverseTodo").onclick=function(){t.sorter=1,localStorage.setItem("sorter",1),s()},l(".setbtn.save").onclick=function(){var t,e,o;t=f,e="data:text/json;charset=utf-8,"+encodeURIComponent(JSON.stringify(t)),(o=document.createElement("a")).setAttribute("href",e),o.setAttribute("download","mytodos.json"),document.body.appendChild(o),o.click(),o.remove()},l(".setbtn.load").onchange=function(){var t=this.files[0],e=new FileReader;e.addEventListener("load",(function(t){l("#dropdownMenuSettings").click(),f=JSON.parse(e.result),s()})),e.readAsText(t)}}}.call(this,o(1))},function(t,e){var o;o=function(){return this}();try{o=o||new Function("return this")()}catch(t){"object"==typeof window&&(o=window)}t.exports=o},function(t,e,o){}]);