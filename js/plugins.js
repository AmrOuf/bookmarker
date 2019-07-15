function addSite()
{
	var siteName = document.getElementById("site-name");
	var siteUrl = document.getElementById("site-url");

	console.log(siteUrl.value);

	document.getElementById("bookmarked").innerHTML += 
		'<div class="website mt-4">'+
			'<span class="site-name mr-3">'+siteName.value+'</span>'+

			'<button type="button" class="btn btn-success ml-1 id="site-visit">'+
				'<a href="'+siteUrl.value+'" target="_blank">Visit</a>'+
			'</button>'+

			'<button type="button" class="btn btn-danger ml-1 id="site-delete" '+
			'onclick="deleteSite(this)">Delete</button>'+
		'</div>';


	siteName.value="";
	siteUrl.value="";
}

function deleteSite(e)
{
	e.parentNode.parentNode.removeChild(e.parentNode);
}
