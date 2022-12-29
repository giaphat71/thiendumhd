function g(id){
    return document.getElementById(id);
}
function q(selector){
    return document.querySelector(selector);
}
function ev(id, event, callback){
    g(id).addEventListener(event, callback);
}
function get(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
            callback(xhr.responseText);
        }
    }
    xhr.send();
}
function App() {
    this.init = function() {
        console.log('App initialized');
        ev("header","click",(function(){
            this.go("index");
        }).bind(this));
        this.view = g("view");
        this.go("index");
        window.onpopstate = function(e) {
            // this.state.urls.pop();
            // var last = this.state.urls[this.state.urls.length-1];
            // if(last){
            //     this.goNoHistory(last);
            // }else{
            //     this.goNoHistory("index");
            // }
        }.bind(this);
    }
    this.name = 'App';
    /* Page manager integrated with history api */
    this.state= {
        push: function(url) {
            location.hash = url;
            this.urls.push(url);
        },
        pop: function() {
            history.back();
            this.urls.pop();
            var last = this.urls[this.urls.length-1];
            if(last){
                this.goNoHistory(last);
            }
        },
        urls: [],
    }
    this.go = function(item) {
        var url = items[item];
        if(!url){
            url = item + '.html';
        }
        get(url, function(data) {
            this.view.innerHTML = data;
            if(item == "index"){
                this.loadIndexData();
            }
        }.bind(this));
        this.state.push(item);
    };
    this.goNoHistory = function(item) {
        var url = items[item];
        if(!url){
            url = item + '.html';
        }
        get(url, function(data) {
            this.view.innerHTML = data;
        }.bind(this));
    };
    var items = {
        "index": `index2.html`,
    }
    get("template.html",(function(template){
        this.questtemplate = template;
    }).bind(this));
    this.loadQuest = function(q){
        var html = this.questtemplate.replace("{{questname}}",q.title);
        html = html.replace("{{questbody}}",q.body);
        this.view.innerHTML = html;
        this.state.push("quest");
    }
    this.loadIndexData = function(){
        var indexdata = this.indexdata || g("indexdata").innerHTML;
        this.indexdata = indexdata;
        var rows = indexdata.split("\n");
        var quests = [];
        for(var i=0;i<rows.length;i++){
            var row = rows[i];
            if(row.trim().length>0){
                var quest = row.split(":");
                quests.push({
                    title: quest[0],
                    body: quest[1]
                });
            }
        }
        var indexContainer = g("index");
        for(let quest of quests){
            var item = document.createElement("div");
            item.className = "item";
            item.innerHTML = quest.title;
            item.onclick = function(){
                app.loadQuest(quest);
            }.bind(this);
            indexContainer.appendChild(item);
        }
    }
}

/* On Startup */
document.addEventListener('DOMContentLoaded', function() {
    window.app = new App();
    app.init();
});