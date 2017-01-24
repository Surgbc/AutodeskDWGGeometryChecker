var viewer, accessToken, documentId;

var options = {
   env: 'AutodeskProduction',
   accessToken: accessToken//'E2YYjNUuvIeoRTS4DpUm2QRrq17C'
   //accessToken: 'E2YYjNUuvIeoRTS4DpUm2QRrq17C'
};
var documentId = 'urn:'+documentId;//dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dG1wLWJ1Y2tldC92aXN1YWxpemF0aW9uXy1fYWVyaWFsLmR3Zw
//var documentId = 'urn:'+'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dG1wLWJ1Y2tldC92aXN1YWxpemF0aW9uXy1fYWVyaWFsLmR3Zw'

var popuptop;

$(document).ready(function()
{
	console.log("adhasjdkhaskjdh");
	init();
});

var disabledbtns =
{
	"login":false,
	"listbuckets":false,
	"createbucket":false,
	"uploadfile":false,
	"translatefile":false
}

var init = function()
{
	unoauthed()
	/*console.log("ready");
	options.accessToken ='E2YYjNUuvIeoRTS4DpUm2QRrq17C';
	documentId = 'urn:'+'dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6dG1wLWJ1Y2tldC92aXN1YWxpemF0aW9uXy1fYWVyaWFsLmR3Zw'
	*/
	//viewer_init();
}

var viewer_init = function()
{
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
	disabledbtns.listbuckets = true;
	disabledbtns.createbucket = true;
	disabledbtns.uploadfile = true;
	disabledbtns.translatefile = true;
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
		$("#message").html(err);
	});
}

var openuploadfile = function()
{
	if(disabledbtns.createbucket == true){opencreatebucket("Create a bucket first"); return 0;}
	$.get( "upload.html", function( data ) {
		$("#popup").html(data);
	});
}
/*
var opentranslatefile = function()
{
	if(disabledbtns.listbuckets == true){openLogin("Please log in first");}
}
*/
//i3hLiqZHP1gGPbrzRVfq5mnAewcBjlGo
//lpF0vshsKfHiqzR4
