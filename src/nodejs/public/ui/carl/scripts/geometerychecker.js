var viewer, accessToken, bucketKey, urn, guid;

var objectids = [];

var objectidstring;

var tmpstr ;/*= '[ { "objectid": 2, "name": "Model", "objects": [ { "objectid": 238, "name": "3D Solids (12)", "objects": [ { "objectid": 237, "name": "3D Solid (12)", "objects": [ { "objectid": 187, "name": "Solid [7DF]" }, { "objectid": 188, "name": "Solid [7E0]" }, { "objectid": 189, "name": "Solid [7E1]" }, { "objectid": 190, "name": "Solid [7E2]" }, { "objectid": 191, "name": "Solid [7E3]" }, { "objectid": 192, "name": "Solid [7E4]" }, { "objectid": 193, "name": "Solid [7E9]" }, { "objectid": 194, "name": "Solid [7EA]" }, { "objectid": 213, "name": "Solid [80E]" }, { "objectid": 214, "name": "Solid [80F]" }, { "objectid": 215, "name": "Solid [810]" }, { "objectid": 216, "name": "Solid [811]" } ] } ] } ] } ]';*/

var options = {
   env: 'AutodeskProduction',
   accessToken: accessToken//'E2YYjNUuvIeoRTS4DpUm2QRrq17C'
   //accessToken: 'E2YYjNUuvIeoRTS4DpUm2QRrq17C'
};
var documentId = 'urn:'+urn;//dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dG1wLWJ1Y2tldC92aXN1YWxpemF0aW9uXy1fYWVyaWFsLmR3Zw
//var documentId = 'urn:'+'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dG1wLWJ1Y2tldC92aXN1YWxpemF0aW9uXy1fYWVyaWFsLmR3Zw'

var popuptop;

$(document).ready(function()
{
	init();
	accessToken="83gKTTkWJRY6cmkDMl5q7bma8wGf";
	urn ="dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6YnVjay9IU0NSRU4uRFdH";
	guid="none";
	/*viewer_init();*/
});

var tryal = function()
{
	console.log(tmpstr);
	var tmp = JSON.parse(tmpstr);
	//tmp = tmp[0];
	//console.log(tmp);
	retobid(tmp);
	console.log(objectids);
	objectidstring = JSON.stringify(objectids);
	console.log(objectidstring);
	$("#popup").html(objectidstring);
}

var retobid = function(obj)
{
	$.each(obj, function(key,val){
		//console.log(key+" >"+val)
		objectids.push(val.objectid);
		if(val.objects != undefined)retobid(val.objects);
	});
}

var disabledbtns =
{
	"login":true,
	"listbuckets":true,
	"createbucket":true,
	"uploadfile":true,
	"translatefile":true,
	"getguid":true,
	"objecttree":true
}

var init = function()
{
	unoauthed()
}

var viewer_init = function()
{
	options.accessToken =accessToken;
	documentId = 'urn:'+urn;
	Autodesk.Viewing.Initializer(options, function onInitialized(){
   Autodesk.Viewing.Document.load(documentId, onDocumentLoadSuccess, onDocumentLoadFailure);
   onDocumentLoadSuccess($(document));
  } );
}

/**
* Autodesk.Viewing.Document.load() success callback.
* Proceeds with model initialization.
*/
function onDocumentLoadSuccess(doc) {
   // A document contains references to 3D and 2D viewables.
   var viewables = Autodesk.Viewing.Document.getSubItemsWithProperties(doc.getRootItem(), {'type':'geometry'}, true);
   if (viewables.length === 0) {
       console.error('Document contains no viewables.');
       return;
   }

   // Choose any of the avialble viewables
   var initialViewable = viewables[0];
   var svfUrl = doc.getViewablePath(initialViewable);
   var modelOptions = {
       sharedPropertyDbPath: doc.getPropertyDbPath()
   };

   var viewerDiv = document.getElementById('MyViewerDiv');
   viewer = new Autodesk.Viewing.Private.GuiViewer3D(viewerDiv);
   viewer.start(svfUrl, modelOptions, onLoadModelSuccess, onLoadModelError);
}

/**
* Autodesk.Viewing.Document.load() failuire callback.
*/
function onDocumentLoadFailure(viewerErrorCode) {
   console.error('onDocumentLoadFailure() - errorCode:' + viewerErrorCode);
}

/**
* viewer.loadModel() success callback.
* Invoked after the model's SVF has been initially loaded.
* It may trigger before any geometry has been downloaded and displayed on-screen.
*/
function onLoadModelSuccess(model) {
   console.log('onLoadModelSuccess()!');
   console.log('Validate model loaded: ' + (viewer.model === model));
   console.log(model);
}

/**
* viewer.loadModel() failure callback.
* Invoked when there's an error fetching the SVF file.
*/
function onLoadModelError(viewerErrorCode) {
   console.error('onLoadModelError() - errorCode:' + viewerErrorCode);
}

///////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////
$(".btn_class").click(function(){popuptop=$(this).offset().top;openGui($(this).html());})



//////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////
var openGui = function(part)
{
$("#popup").offset({top:popuptop});
console.log(part);
	switch(part)
	{
		case "Log in":
			openLogin();
			break;
		case "List Buckets":
			openlistbuckets();
			break;
		case "Create Bucket":
			opencreatebucket();
			break;
		case "Upload File":
			openuploadfile();
			break;
		case "Translate File":
			opentranslatefile();
			break;
		case "Get Guid":
			getguid();
			break;
		case "Object Tree":
			objecttree();
			break;
		case "Hide Popup":
			$("#popup").html("");
			break;
	}
}

var openLogin = function(err)
{
	unoauthed();
	$.get( "login.html", function( data ) {
		$("#popup").html(data);
		$("#message").html(err);
	});
}

var unoauthed = function()
{
	disabledbtns.login = true;
	disabledbtns.listbuckets = true;
	disabledbtns.createbucket = true;
	disabledbtns.uploadfile = true;
	disabledbtns.translatefile = true;
	disabledbtns.getguid = true;
	disabledbtns.objecttree = true;
}

var oauth = function(id, secret)
{
	$.getJSON( "oauth?clientid="+id+"&clientsecret="+secret, function( data ) {
		if(data.statusCode != undefined)	$("#message").html("Error signing in. Please try again with correct credentials");
		else
		{
			accessToken = data.access_token;
			oauthed()
		}
	});
}

var oauthed = function()
{
	disabledbtns.listbuckets = false;	
	$("#popup").html("");
}

var openlistbuckets = function(bucketname)
{
	console.log("listing ...");
	if(disabledbtns.listbuckets == true){openLogin("Please log in first");return 0}
	$("#popup").html("....................Loading............");
	bucketname=bucketname != undefined?"&bucket="+bucketname:""
	$.getJSON( "bucket?token="+accessToken+bucketname, function( data ) {
	console.log(data);
		if(data.statusCode != undefined)	
		{
		$("#popup").html('<div class="container"><div id="message"></div></form></div>');
		$("#message").html("Error creating bucket. Please try again maybe in lowercase letters without spaces");
		}
		else
		{
			disabledbtns.createbucket = false;
			bucketKey = data.key;
			$("#popup").html("<table>"+"<tr><td>Bucket</td><td>Policy</td></tr>"+"<tr><td>"+data.key+"        </td><td>"+data.policyKey+"</td></tr>"+"</table>");
		}
	});
	
}

var showError = function(err)
{
	$("#popup").html('<div class="container"><div id="message"></div></form></div>');
	$("#message").html(err);
}

var opencreatebucket = function(err)
{
	if(disabledbtns.listbuckets == true){openLogin("Please log in first"); return 0;}
	$.get( "bucketcreate.html", function( data ) {
		$("#popup").html(data);
		//console.log(data);
		$("#message").html(err);
	});
}
/*
var setBucket =function (bucket)
{
	bucketKey = data.key;
}
*/
var openuploadfile = function(err)
{
	if(disabledbtns.createbucket == true){opencreatebucket("Create a bucket first"); return 0;}
	$.get( "upload.html", function( data ) {
		$("#popup").html(data);
		$("#popup").append('<div id="message"></div>');
		$("#message").html(err);
	});
}

var forgeupload= function(filename)
{
	$.getJSON( "forgeupload?filename="+filename+"&bucket="+bucketKey+"&token="+accessToken, function( data ) {
		if(data.statusCode != undefined)	
		{
		$("#popup").html('<div class="container"><div id="message"></div></form></div>');
		$("#message").html("Error uploading file. Please try again.");
		}
		else
		{
			disabledbtns.uploadfile = false;
			console.log(data);
			urn = data.urn;
			$("#popup").html('');
			/*viewer_init();*/
		}
	});
}

var opentranslatefile = function()
{
	console.log("is translate");
	if(disabledbtns.uploadfile == true){openuploadfile("Upload file first"); return 0;}
	$.get( "translate.html", function( data ) {
		$("#popup").html(data);
	});
}

var translatefile = function()
{
	$(".progress").html("Translating...");
	$.getJSON( "translate?urn="+urn+"&token="+accessToken, function( data ) {
		if(data.statusCode != undefined)	
		{
		$("#popup").html('<div class="container"><div id="message"></div></form></div>');
		$("#message").html("Error translating file. Please try again.");
		}
		else
		{
			disabledbtns.translatefile = false;
			$("#popup").html('');
			viewer_init();
		}
	});
	
}

var getguid = function(err)
{
	$("#popup").html("Getting guid...");
	if(disabledbtns.translatefile == true){opentranslatefile(); return 0;}
	if(err != undefined){$("#popup").html(err);return 0;}
	console.log("Getting guid");
	$.get( "modelview?urn="+urn+"&token="+accessToken, function( data ) {
		//$("#popup").html(data);
		$("#popup").html('');
		disabledbtns.getguid = false;
		guid = data.guid;	//assume no error
		console.log(data);
		console.log(data.guid);
	});
	
}
var objecttree = function()
{
	$("#popup").html("Getting object tree...");
	if(disabledbtns.getguid == true){getguid("Get guid first"); return 0;}
	$.get( "objecttree?urn="+urn+"&token="+accessToken+"&guid="+guid, function( data ) {
		//$("#popup").html(data);
		console.log(data);
		str = JSON.stringify(data, null, 4);
		$("#popup").html(str);
		tmpstr = str
		disabledbtns.objecttree = false;
		tryal();
	});
	
}

//i3hLiqZHP1gGPbrzRVfq5mnAewcBjlGo
//lpF0vshsKfHiqzR4
//
