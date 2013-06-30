var app = module.exports = require('appjs');

app.serveFilesFrom(__dirname + '/content');

var menubar = app.createMenu([{
  label:'&File',
  submenu:[
    {
      label:'E&xit',
      action: function(){
        window.close();
      }
    }
  ]
},{
  label:'&Window',
  submenu:[
    {
      label:'Fullscreen',
      action:function(item) {
        window.frame.fullscreen();
        console.log(item.label+" called.");
      }
    },
    {
      label:'Minimize',
      action:function(){
        window.frame.minimize();
      }
    },
    {
      label:'Maximize',
      action:function(){
        window.frame.maximize();
      }
    },{
      label:''//separator
    },{
      label:'Restore',
      action:function(){
        window.frame.restore();
      }
    }
  ]
}]);

menubar.on('select',function(item){
  console.log("menu item "+item.label+" clicked");
});

var trayMenu = app.createMenu([{
  label:'Show',
  action:function(){
    window.frame.show();
  },
},{
  label:'Minimize',
  action:function(){
    window.frame.hide();
  }
},{
  label:'Exit',
  action:function(){
    window.close();
  }
}]);

var statusIcon = app.createStatusIcon({
  icon:'./data/content/icons/32.png',
  tooltip:'AppJS Hello World',
  menu:trayMenu
});

var window = app.createWindow({
  width  : 800,
  height : 664,
  icons  : __dirname + '/content/icons'
});

window.on('create', function(){
  console.log("Window Created");
  window.frame.show();
  window.frame.center();
  window.frame.setMenuBar(menubar);
});

window.on('ready', function(){
  console.log("Window Ready");
  window.process = process;
  window.module = module;

  function F12(e){ return e.keyIdentifier === 'F12' }
  function Command_Option_J(e){ return e.keyCode === 74 && e.metaKey && e.altKey }

  window.addEventListener('keydown', function(e){
    if (F12(e) || Command_Option_J(e)) {
      window.frame.openDevTools();
    }
  });
});

window.on('close', function(){
  console.log("Window Closed");
});


var sys = require('sys')
var exec = require('child_process').exec;
var child;

// executes `pwd`
//child = exec("./data/content/crt", function (error, stdout, stderr) {
child = exec("pwd", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  //window.so = stdout;
  //window.se = stderr;
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});


window.on('ready', function(){
  window.frame.show();
  window.require = require;
  window.process = process;
  window.module = module;
  window.sx = '';
  window.test = {
  	t: '123',
  	//so: stdout,
  	//se: stderr
  }
  
  // executes `pwd`
//child = exec("./data/content/crt", function (error, stdout, stderr) {
child = exec("pwd", function (error, stdout, stderr) {
  sys.print('stdout: ' + stdout);
  sys.print('stderr: ' + stderr);
  window.so = stdout;
  window.se = stderr;
				
  if (error !== null) {
    console.log('exec error: ' + error);
  }
});
window.sx = child.stdout;
window.c = child;

  window.addEventListener('app-done', function(e){
    console.log(e);
  });

  window.dispatchEvent(new window.Event('app-ready'));
});