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
		$("#tessel-status").append("Data discarded due to thresholds [" + data.length + "B]\n");
	});

	socket.on("received", function(data){
		$("#tessel-status").append("Data received [" + data.name + " - " + data.data.length + "B]\n");
		var logAnchor = document.createElement("a");
		var logBr = document.createElement("br");
		$(logAnchor).prop("href", "/captures/" + data.name);
		$(logAnchor).prop("target", "_blank");
		$(logAnchor).html(data.name);
		$("#tessel-log").append(logAnchor);
		$("#tessel-log").append(logBr);
	});
});
