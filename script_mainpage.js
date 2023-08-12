$(document).ready(function() {
  $('.slider').slick({
    adaptiveHeight: true,
    slidesToShow:3,
    autoplay:true
  });
})

$(document).ready(function() {
  $('.slider_inner').slick({
    adaptiveHeight: true,
    slidesToShow:3,
    autoplay:true
  });
})

async function get_news_for_carousel () {
  
  let resp
  let host = window.location.origin
  let Url

  Url = `${host}/table/events/get?is_get_form_actions=true&limit=10&lang=en`
  console.log(Url)
 
  let local = JSON.parse(localStorage.USER);
  let token1 = local["token"]
  let response = await fetch(Url, {
      headers: {
          Authorization: "Bearer " + token1
      }
  });
  if (response.status >= 400) {
      console.log(" bad params");
      return;
  } else if (response.status === 204) {
      console.log("id not found");
      return;
  } else if (response.status === 200) {
      resp = await response.json()
  }
  console.log(resp)
  }