$(document).ready(function() {
	var socket = io();
	socket.emit("status", "go");

	// for updates
	socket.on("status", function(data){
		var status;
		if (data === true){
			status = "ready";
		}else{
			status = "not ready";
		}
		$("#tessel-status").append("Status Check: Tessel is " + status + "\n");
	});

	socket.on("ready", function(){
		$("#tessel-status").append("Tessel IR module is ready!\n");
	});

	socket.on("die", function(){
		$("#tessel-status").append("Tessel IR module has died!\n");
	});

	socket.on("discarded", function(data){
		$("#tessel-status").append("Data discarded due to thresholds [" + data.length + "]\n");
	});

	socket.on("received", function(data){
		$("#tessel-status").append("Data received [" + data.length + "]\n");
	});
});
