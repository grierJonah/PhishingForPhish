
// Get current domain
var domain = window.location.href;
domain = domain.split(/[/?#]/)[2]

chrome.runtime.sendMessage({command: "fetch", data: {domain: domain}}, (response) => {
  // response from database (background.html > firebase.js)
  console.log('----------------------------------------------------------')
  console.log('---------------Response From Database---------------------')
  console.log('----------------------------------------------------------')
  console.log('Database Obj:', response);
  console.log('Database URL:', response.data);
  console.log('----------------------------------------------------------')
  console.log('----------------------------------------------------------')
  console.log('----------------------------------------------------------')

  parseWebsite(response.data, response.request);
  // fadingVerification(response.data);
});

// Creates Clickable Buttton and displays verification of website(s)
var parseWebsite = function(link, unverifiedLink) {

  try {

    var websiteDisplay = document.createElement('div');
    websiteDisplay.className = '_website__display';

    var websiteHTML = '';

    // websites.forEach((website, index) => {
    //   websiteHTML += '<li>Code: ' + website.data + '</li>';
    // });

    // Website not found in database, replace null value --> 'website unverified'
    if (link == null) {
      websiteHTML = '<div style="text-align:left;font-size:15px;'
      +'font-family:sans-serif;"color:#868585;"><li><span class="website"><i>'
      + unverifiedLink.data.domain + '</li></span></i></div>';

      websiteDisplay.innerHTML = '<h1 style=";font-weight:normal;">Unverified</h1>'
      +'<p style="font-family:sans-serif;">Link Unverified:</p>'
      +'<ul style="font-family:sans-serif;'
      +'background-color:rgba(255, 20, 20, 0.25)"><strong><i>'
      + websiteHTML + '</strong></i></ul>'
      + '<p class="_integrity__check" style="text-align:center;font-size:small;">PhishingForPhish can\'t verify this website. Personal data and information may be at risk'

      websiteDisplay.style.color = '#000000';
    } else {
      websiteHTML += '<li><span class="website">'+link.split(/[/?#]/)[2]+'</span></li>';
      websiteDisplay.innerHTML = '<h1 style="font-weight:normal;">Verified</h1>'
      +'<p style="font-family:sans-serif;">Link Verified: </p>'
      +'<ul style="font-family:sans-serif;'
      +'background-color:rgba(0, 255, 20, 0.25)"><strong><i>'
      + websiteHTML + '</strong></i></ul>';

      websiteDisplay.style.color = '#000000';
      websiteDisplay.listStyleType = 'none';
    }

    websiteDisplay.style.display = 'none';
    document.body.appendChild(websiteDisplay);

    var websiteButton = document.createElement('div');
    websiteButton.className = '_website__button';
    websiteButton.innerHTML = 'Website';
    websiteButton.style.fontSize = "12px";
    document.body.appendChild(websiteButton);

    createEvents();

  } catch(e) {
    console.log('No websites found for this domain: ', e);
  }
}

var createEvents = function() {
  // Open / Close display option
  document.querySelector('._website__button').addEventListener('click', function(event) {
    if (document.querySelector('._website__display').style.display == 'block') {
      document.querySelector('._website__display').style.display = 'none';
    } else {
      document.querySelector('._website__display').style.display = 'block';
    }
  })
}


// Green Fading Banner middle of page
var fadingVerification = function(link) {

  var websiteHTML = '';
  // Website not found in database, replace null value --> 'website unverified'
  if (link == null) {
    websiteHTML = '<div style="text-align:center;">'
    +'<li><span class="_url__link">Website is unverified</span></li>'
    +'</div>';
  } else {
    websiteHTML += '<li><span class="_url__link">'+link+'</span></li>';
  }

  var websiteBannerDisplay = document.createElement('div');
  websiteBannerDisplay.className = '_website__banner_display';
  websiteBannerDisplay.innerHTML = '<h1>Verified</h1><p>Website:</p>'
  +'<ul><strong><i>' + websiteHTML + '</strong></ul></i>';
  websiteBannerDisplay.style.display = 'none';
  document.body.appendChild(websiteBannerDisplay);

  var websiteBannerDisplay = document.createElement('div');
  websiteBannerDisplay.className = '_website__banner__display';
  websiteBannerDisplay.innerHTML = '<h1>Website:</h1>'
  +'<ul><strong><i>' + websiteHTML + '</strong></ul></i>';
  document.body.appendChild(websiteBannerDisplay);








}
