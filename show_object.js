let local = JSON.parse(localStorage.USER);
let token1 = local["token"]
let r
let resp

let Url = "http://164.68.125.44:34351/search/list/?lang=en&value=pm&count=10&html=true"

let response = await fetch(Url, {
    headers: {
        Authorization: "Bearer " + token1
    }
  });

if (response.ok) {
    resp = await response.text()
}

let pars = resp.split('</option>')


    let divContent = $('#content');
    divContent.html('');

    for (x in data) {
        divContent.append('<div>');
        div = divContent.children(':last').attr('id', data[x].id)
        div.append('<div>');
        titleDiv = div.children(':last')
        titleDiv.append(data[x]);
        if (data[x].abbr > "") {
            titleDiv.append('<h4> Search as ' + data[x].abbr + '</h4>');
        }

        if (data[x].id_article > "") {
            titleDiv.append('<h4><a href="article/' + data[x].id_article + '" target="search">' + data[x].id_article + '</a></h4>');
        }

        for (y in data[x].company_names) {
            titleDiv.append('<span>' + data[x].company_names[y] + '</span>');
        }

        for (y in data[x].list) {
            div.append('<a href="' + data[x].list[y].document_url + '" rel="true" target="_blank">PDF</a>')
            brand = data[x].list[y].brand
            if (brand !== undefined) {
                div.append('<div>' + brand + '<a href="/api/v1/search/analog/' + brand + '" target="search"> Search analog</a></div>')
            }

            idPolymers = data[x].list[y].id_polymers
            if (data[x].list[y].has_additives !== false) {
                div.append('<div><a href="/api/v1/search/additives/?id=' + idPolymers + '" target="search"> Search additives</a></div>')
            }

            if (data[x].list[y].has_fillers !== false) {
                div.append('<div><a href="/api/v1/search/fillers/?id=' + idPolymers + '" target="search"> Search fillers</a></div>')
            }

            div.append('<div>' + data[x].list[y].company_name + '</div>')
            div.append('<table>');
            div.append('<thr><thd> Values </thd><thd> Qty </thd> </thr>')

            for (z in data[x].list[y].characteristics) {
                div.append('<tr><td>' + z + '</td><td></td><td>' + data[x].list[y].characteristics[z] + '</td></tr>');
            }

            for (z in data[x].list[y].files) {
                div.append('<p><a href="' + data[x].list[y].files[z].url + '" rel="true" target="_blank">' + data[x].list[y].files[z].title + '</a></p>');
            }

            notes = data[x].list[y].description
            if (notes > "") {
                div.append('<div>' + notes + '</div>')
            }
        }
    }
}
