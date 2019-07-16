document.getElementById("myForm").addEventListener('submit', addSite);
window.onload = function()
{
	addOldBookmarks();
}


function addSite(e)
{
	e.preventDefault();

	var siteName = document.getElementById("site-name");
	var siteUrl = document.getElementById("site-url");

	var bookmark = 
	{
		name: siteName.value,
		url: siteUrl.value
	};


	if(siteName.value.length == 0)
	{
		alert("Please write your website name");
		return;
	}

	if(siteUrl.value.length == 0)
	{
		alert("Please write a valid URL");
		return;
	}

	//bookmark = JSON.stringify(bookmark);


	
	

	if(localStorage.getItem("bookmarks") === null)
	{
		//Array of objects
		var bookmarks = [];

		bookmarks.push(bookmark);

		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	}
	else
	{

		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		

		bookmarks.push(bookmark);
		//console.log(bookmarks);
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

	}


	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
	document.getElementById("bookmarked").innerHTML +=
		'<div class="website mt-4">'+
			'<span class="site-name mr-3">'+bookmarks[bookmarks.length-1].name+'</span>'+

			'<button type="button" class="btn btn-success ml-1 id="site-visit">'+
				'<a href="'+bookmarks[bookmarks.length-1].url+'" target="_blank">Visit</a>'+
			'</button>'+

			'<button type="button" class="btn btn-danger ml-1 id="site-delete" '+
			'onclick="deleteSite(this)">Delete</button>'+
		'</div>';



	siteName.value="";
	siteUrl.value="";
}

function deleteSite(e)
{
	//First, remove from DOM
	e.parentNode.parentNode.removeChild(e.parentNode);


	//var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

}

function addOldBookmarks()
{
	if(localStorage.getItem("bookmarks") !== null)
	{
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

		for (var i=0; i<bookmarks.length; i++) 
		{
			document.getElementById("bookmarked").innerHTML +=
				'<div class="website mt-4">'+
					'<span class="site-name mr-3">'+bookmarks[i].name+'</span>'+

					'<button type="button" class="btn btn-success ml-1 id="site-visit">'+
						'<a href="'+bookmarks[i].url+'" target="_blank">Visit</a>'+
					'</button>'+

					'<button type="button" class="btn btn-danger ml-1 id="site-delete" '+
					'onclick="deleteSite(this)">Delete</button>'+
				'</div>';
		}
	}


}
