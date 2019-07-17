//On loading the web page restore the old bookmarks from local storage
window.onload = function() 
{
	addOldBookmarks();
}

//On clicking "Submit", call the function addSite()
document.getElementById("myForm").addEventListener('submit', addSite);

//addSite() adds a new bookmark to the local storage
//and shows it on the page
function addSite(e)
{
	//Prevent reloading the page on clicking "Submit"
	e.preventDefault();

	var siteName = document.getElementById("site-name");
	var siteUrl = document.getElementById("site-url");
	var bookmark = 
	{
		name: siteName.value,
		url: siteUrl.value
	};

	//Check if the website name field is empty
	if(siteName.value.length == 0)
	{
		alert("Please write your website name");
		return;
	}

	//Check if the website URL field is empty
	if(siteUrl.value.length == 0)
	{
		alert("Please write a valid URL");
		return;
	}

	//Check if the local storage is empty to add the first bookmark
	if(localStorage.getItem("bookmarks") === null)
	{
		//Add the first bookmark to an array of objects
		var bookmarks = [];
		bookmarks.push(bookmark);

		//Add the first bookmark to the local storage as a JSON string
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}
	//If the local storage is not empty retrieve the old ones and add a new one
	else
	{
		//Retrieve bookmarks that are already stored in local storage
		var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
		//Add the new bookmark in the array after the old ones
		bookmarks.push(bookmark);
		//Add all the bookmarks (old and new) to the local storage as a JSON string
		localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
	}

	//Retrieve the bookmarks stored in local storage and add them to the DOM
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

	//Make the website name and URL fields empty again for a new entry
	siteName.value="";
	siteUrl.value="";
}

//Deleting a bookmark from local storage on clicking "Delete"
function deleteSite(btn)
{
	//First, remove from DOM
	btn.parentNode.parentNode.removeChild(btn.parentNode);

	//Get the URL of the bookmark to be deleted
	var urlToBeDeleted = btn.previousSibling.firstChild.getAttribute("href");

	//Retrieve bookmarks from local storage
	var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

	//Check for the URL to be deleted and when you find it don't store it again in local storage
	var newbookmarks = [];
	for (var i=0; i<bookmarks.length; i++) 
	{
		if(urlToBeDeleted !== bookmarks[i].url)
			newbookmarks.push(bookmarks[i]);
	}

	//Store the new bookmarks without the one that is deleted
	localStorage.setItem("bookmarks", JSON.stringify(newbookmarks));
}

//addOldBookmarks() adds the bookmarks stored in local storage on reloading the page
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
