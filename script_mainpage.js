const { doc } = require("prettier")

async function get_news_for_carousel () {
  
  let resp
  let host = window.location.origin
  let Url

  Url = `${host}/events?lang=en`
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
  let html = ''
  for (x in resp) {
    console.log(resp[x])
    console.log(resp[x].name)
    console.log(resp[x].description)
    let host = window.location.origin
    html = `<div class="slider__item">
    <img src="${host}/photos?id=${resp[x].id_photos}" alt="">
    <div class="slide_content">
      <h2>${resp[x].name}</h2>
      <p>${resp[x].description}</p>
    </div>
  </div>`
  console.log(html)
  let div = document.createElement("div")
  console.log(div)
  div.classList.add("slider__item")
  console.log(div)
  div.innerHTML = html
  console.log(div)
  console.log(div)
  let d = document.querySelector(".slider")
  d.append(div)
  console.log(d)
  }
  
  }

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
  
