$(document).ready(function() {
	$("#tessel-log").hide();
	var socket = io();
	socket.emit("status", "go");

	// for updates
	socket.on("status", function(data){
		var status;
		if (data === true){
			status = "ready";
			isReady();
		}else{
			status = "not ready";
		}
		statusLog("Status Check: Tessel is " + status);
	});

	socket.on("ready", function(){
		statusLog("Tessel IR module is ready!");
		isReady();
	});

	socket.on("die", function(){
		statusLog("Tessel IR module has died!");
	});

	socket.on("discarded", function(data){
		statusLog("Data discarded due to thresholds [" + data.length + "B]");
	});

	socket.on("received", function(data){
		statusLog("Data received [" + data.name + " - " + data.data.length + "B]");
		var logButton = document.createElement("button");
		var logAnchor = document.createElement("a");
		var logBr = document.createElement("br");
		$(logButton).addClass("btn btn-default tessel-send-btn");
		$(logButton).html("Send");
		$(logButton).data("file", data.name);
		$(logAnchor).prop("href", "/captures/" + data.name);
		$(logAnchor).prop("target", "_blank");
		$(logAnchor).html(data.name);
		$("#tessel-log").append([
			logButton,
			logAnchor,
			logBr
		]);
	});

	socket.on("success", function(data){
		statusLog("Success!");
	});

	socket.on("failure", function(data){
		statusLog("Failure! [" + JSON.stringify(data) + "]");
	});

	$(document).on("click", ".tessel-send-btn", function(e){
		var fileName = $(e.target).data("file");
		statusLog("Sending " + fileName);
		socket.emit("send", fileName);
	})
});

function statusLog(message) {
	$("#tessel-status").append("* " + message + "\n");
}

function isReady() {
	$("#tessel-headline").html("Now that your Tessel is ready, simply point an IR remote at the sensor and press a button.  You'll see it appear below along with options to download or send it.");
	$("#tessel-log").show();
}
