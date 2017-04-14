var viewer, accessToken, bucketKey, urn, guid;

var objectids = [];
var urns = [];

var objectidstring;

var tmpstr ;/*= '[ { "objectid": 2, "name": "Model", "objects": [ { "objectid": 238, "name": "3D Solids (12)", "objects": [ { "objectid": 237, "name": "3D Solid (12)", "objects": [ { "objectid": 187, "name": "Solid [7DF]" }, { "objectid": 188, "name": "Solid [7E0]" }, { "objectid": 189, "name": "Solid [7E1]" }, { "objectid": 190, "name": "Solid [7E2]" }, { "objectid": 191, "name": "Solid [7E3]" }, { "objectid": 192, "name": "Solid [7E4]" }, { "objectid": 193, "name": "Solid [7E9]" }, { "objectid": 194, "name": "Solid [7EA]" }, { "objectid": 213, "name": "Solid [80E]" }, { "objectid": 214, "name": "Solid [80F]" }, { "objectid": 215, "name": "Solid [810]" }, { "objectid": 216, "name": "Solid [811]" } ] } ] } ] } ]';*/
var tmpesta = '{"type":"manifest","hasThumbnail":"true","status":"success","progress":"complete","region":"US","urn":"dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn","version":"1.0","derivatives":[{"name":"Chair.dwg","hasThumbnail":"true","status":"success","progress":"complete","outputType":"svf","children":[{"guid":"6882be48-6626-5238-d3df-94e9f0a0019d","name":"2D View","hasThumbnail":"true","role":"2d","viewableID":"Model","progress":"complete","status":"success","type":"geometry","children":[{"guid":"8ce469dd-4886-9489-4506-dc851b566e91","role":"thumbnail","mime":"image/png","resolution":[100,56],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/Chair-Model_100.png","status":"success","type":"resource"},{"guid":"2aed4695-b585-120f-c435-e826b0ab1665","role":"thumbnail","mime":"image/png","resolution":[200,113],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/Chair-Model_200.png","status":"success","type":"resource"},{"guid":"bea38bdb-9076-c858-28e1-9e6ce708908f","role":"thumbnail","mime":"image/png","resolution":[400,226],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/Chair-Model_400.png","status":"success","type":"resource"},{"guid":"ce62e76d-55e8-88de-7132-31fc06dfa95f","role":"graphics","mime":"application/autodesk-f2d","urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/5e8804fc-b2a9-77a7-8cc5-76e7f7ae799c_f2d/primaryGraphics.f2d","status":"success","type":"resource"}]},{"guid":"3bb36b05-6fb7-1fd0-3c58-d83a4e8d4042","name":"3D View","hasThumbnail":"true","role":"3d","viewableID":"Model-3D","progress":"complete","status":"success","type":"geometry","children":[{"guid":"e30bd031-d13a-a976-9153-78100829986a","role":"graphics","mime":"application/autodesk-svf","urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/dwg.svf","status":"success","type":"resource"},{"guid":"6dbfcc42-b941-47d4-a235-81572863bd54","role":"thumbnail","mime":"image/png","resolution":[400,400],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/dwg.svf.png01_thumb_400x400.png","type":"resource"},{"guid":"3c111568-35dc-404d-aeaf-3d9ab2d5d6c5","role":"thumbnail","mime":"image/png","resolution":[200,200],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/dwg.svf.png01_thumb_200x200.png","type":"resource"},{"guid":"ac4cda6c-c7f1-4354-a983-2e1e2564afaa","role":"thumbnail","mime":"image/png","resolution":[100,100],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/dwg.svf.png01_thumb_100x100.png","type":"resource"}]},{"guid":"6fdf6a39-ada3-1842-aedd-71aec0adf559","name":"レイアウト1","hasThumbnail":"true","role":"2d","viewableID":"レイアウト1","progress":"complete","status":"success","type":"geometry","children":[{"guid":"75c64532-ff8c-7682-b564-a56d32ed7ca3","role":"thumbnail","mime":"image/png","resolution":[100,70],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/Chair-レイアウト1_100.png","status":"success","type":"resource"},{"guid":"06d50877-c4b5-6180-69cc-43a54955e304","role":"thumbnail","mime":"image/png","resolution":[200,141],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/Chair-レイアウト1_200.png","status":"success","type":"resource"},{"guid":"0e2f65bb-2758-18eb-1332-dee2377e3aab","role":"thumbnail","mime":"image/png","resolution":[400,283],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/Chair-レイアウト1_400.png","status":"success","type":"resource"},{"guid":"60e638a8-53fe-07b8-5596-3e7c52dcfafc","role":"graphics","mime":"application/autodesk-f2d","urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/f42270ab-39b9-09f9-9c5e-a91cc134b0e0_f2d/primaryGraphics.f2d","status":"success","type":"resource"}]}]},{"hasThumbnail":"false","status":"success","progress":"complete","outputType":"obj","children":[{"guid":"959a4be6-8cf0-34e7-a1a8-e58bb0fe2775","role":"obj","modelGuid":"e30bd031-d13a-a976-9153-78100829986a","objectIds":[2,187,188,189,190,191,192,193,194,213,214,215,216,237,238],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/geometry/ecae62c5-ec70-3f15-a21f-28297f72969d.obj","status":"success","type":"resource"},{"guid":"1a670bf8-ed9e-355e-9381-b1c1394978e8","role":"obj","modelGuid":"e30bd031-d13a-a976-9153-78100829986a","objectIds":[2,187,188,189,190,191,192,193,194,213,214,215,216,237,238],"urn":"urn:adsk.viewing:fs.file:dXJuOmFkc2sub2JqZWN0czpvcy5vYmplY3Q6Y2Fyb2wvQ2hhaXIuZHdn/output/geometry/ecae62c5-ec70-3f15-a21f-28297f72969d.mtl","status":"success","type":"resource"}]}]}';
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
	
//	returns(JSON.parse(tmpesta).derivatives);
//	downloadobj();
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
	tmpstr = objectidstring;
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
	"objecttree":true,
	"objectfile":true
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
		case "Object File":
			objectfile();
			break;
		 case "Properties":
                        properties();
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
	disabledbtns.objectfile = true;
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

var objectfile = function()

{

	$("#popup").html("Getting object file...");

	if(disabledbtns.objecttree == true){getguid("Get object tree"); return 0;}

	$.get( "objfile?urn="+urn+"&token="+accessToken+"&guid="+guid+"&ids="+tmpstr, function( data ) {

		console.log(data);
		function objfileprogress()
		{
		console.log("in function");
			$.get( "objfileprogress?urn="+urn+"&token="+accessToken, function( data ) {

				if(data.status == "pending" || data.status == "inprogress")
				{
					objfileprogress();
					$("#popup").html(JSON.stringify(data.progress));
				}
				else
				{
					if(data.status == "failed" || data.status == "timeout")$("#popup").html("An error has occured. Please try again");
					else
					{
						disabledbtns.objectfile = false;
						$("#popup").html(JSON.stringify(data));
						$("#popup").offset({top:0});
						$("#popup").offset({top:"0px"});
						returns(data.derivatives);
						downloadobj();				
	}
				}
			});
		}
		objfileprogress();

	});

	

}

var returns = function(obj)//retrieve urns

{
//console.log(JSON.parse(obj));//check2
//console.log(JSON.stringify(obj));
//obj = JSON.parse(obj);
//console.log(obj);
//console.log("SUCCESS");
	$.each(obj, function(ca,rol){
		if(rol.urn!= undefined)urns.push(rol.urn);

		if(rol.children != undefined)returns(rol.children);
	});
	 $("#popup").html(JSON.stringify(urns));
	console.log("is urns");
	console.log(JSON.stringify(urns));
}


var downloadobj = function()

{

	$("#popup").html("Getting obj file");
	$.each(urns, 
	function(x, url)
	{
		//console.log(url);
		console.log(url.substring(url.length-3));
		if(url.substring(url.length-3) == "obj" || 1)
		{
		$.get( "objfiledownload?urn="+urn+"&token="+accessToken+"&newurn="+url, function( data ) {

				console.log(data);
				$("#popup").html("Done getting obj file");
			});
		}
	});

}

var properties = function()
{
       $("#popup").html("Getting properties");
	$.get( "properties?urn="+urn+"&token="+accessToken+"&guid="+guid, function( data ){

                                console.log(data);
                                $("#popup").html();
                });

}

//i3hLiqZHP1gGPbrzRVfq5mnAewcBjlGo
//lpF0vshsKfHiqzR4
//
