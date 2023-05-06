let local = JSON.parse(localStorage.USER);
let token1 = local["token"]
let r
let resp

let Url = "http://164.68.125.44:40895/table/items/get?limit=1&lang=1&id=2"

let response = await fetch(Url, {
    headers: {
        Authorization: "Bearer " + token1
    }
  });

if (response.ok) {
    resp = await response.json()
}

// let resp = response.json()
console.log(resp)
let id_type_material = resp[0].id_type_material
let id_type_of_filler = resp[0].id_type_of_filler
console.log(id_type_material)
if (id_type_material === 1) {
    console.log("Thermoplastic polymer")
} else if (id_type_material === 2) {
    console.log("Additives")
} else if (id_type_material === 3) {
    console.log("Thermoplastic elastomer")
} else if (id_type_material === 4) {
    console.log("Fillers")
    if (id_type_of_filler === 1) {
        console.log("Disperse filler")
        parse_disperse_filler(resp)
    } else if (id_type_of_filler === 2) {
        console.log("Fibrous filler")
    } else if (id_type_of_filler === 3) {
        console.log("Other filler")
    }
} else if (id_type_material === 5) {
    console.log("Thermoplastic composite materials")
}

function parse_disperse_filler(resp) {
    console.log(resp[0].density_iso)
    document.getElementsByName("density_iso")[1].placeholder = resp[0].density_iso
    document.getElementsByName("density")[1].placeholder = resp[0].density
    document.getElementsByName("moisture_content_iso")[0].placeholder = resp[0].moisture_content_iso
    document.getElementsByName("moisture_content")[0].placeholder = resp[0].moisture_content
    document.getElementsByName("purity_of_disperse_filler")[0].placeholder = resp[0].purity_of_disperse_filler
    document.getElementsByName("purity_of_disperse_filler_iso")[0].placeholder = resp[0].purity_of_disperse_filler_iso
    document.getElementsByName("dispersity")[0].placeholder = resp[0].dispersity
    document.getElementsByName("dispersity_iso")[0].placeholder = resp[0].dispersity_iso
    document.getElementsByName("chemical_nature")[1].placeholder = resp[0].chemical_nature
    document.getElementsByName("chemical_nature_iso")[0].placeholder = resp[0].chemical_nature_iso
    document.getElementsByName("marka")[0].placeholder = resp[0].marka
    document.getElementsByName("chemical_nature_iso")[0].placeholder = resp[0].chemical_nature_iso
    document.getElementsByName("marka")[0].placeholder = resp[0].marka
}

function parse_fibrous_filler(resp) {
    console.log("Fibrous filler")
    document.getElementsByName("marka")[0].placeholder = resp[0].marka
    document.getElementsByName("density_iso")[1].placeholder = resp[0].density_iso
    document.getElementsByName("density")[1].placeholder = resp[0].density
    document.getElementsByName("linear_density")[0].placeholder = resp[0].linear_density
    document.getElementsByName("linear_density_iso")[0].placeholder = resp[0].linear_density_iso
    document.getElementsByName("length_of_fibres_iso")[0].placeholder = resp[0].length_of_fibres_iso
    document.getElementsByName("length_of_fibres")[0].placeholder = resp[0].length_of_fibres
    document.getElementsByName("filament_diameter")[0].placeholder = resp[0].length_of_fibres
    document.getElementsByName("filament_diameter_iso")[0].placeholder = resp[0].length_of_fibres_iso
    document.getElementsByName("tensile_strength")[1].placeholder = resp[0].tensile_strength
    document.getElementsByName("tensile_strength_iso")[1].placeholder = resp[0].tensile_strength_iso
    document.getElementsByName("tensile_modulus")[1].placeholder = resp[0].tensile_strength
    document.getElementsByName("tensile_modulus_iso")[1].placeholder = resp[0].tensile_strength_iso
    document.getElementsByName("elongation_break")[1].placeholder = resp[0].elongation_break
    document.getElementsByName("elongation_break_iso")[1].placeholder = resp[0].elongation_break_iso
    document.getElementsByName("moisture_content_iso")[0].placeholder = resp[0].moisture_content_iso
    document.getElementsByName("moisture_content")[0].placeholder = resp[0].moisture_content
}

function parse_other_filler(resp) {
    console.log("Other filler")
    document.getElementsByName("density_iso")[1].placeholder = resp[0].density_iso
    document.getElementsByName("density")[1].placeholder = resp[0].density
    document.getElementsByName("moisture_content_iso")[0].placeholder = resp[0].moisture_content_iso
    document.getElementsByName("moisture_content")[0].placeholder = resp[0].moisture_content
    document.getElementsByName("purity_of_disperse_filler")[0].placeholder = resp[0].purity_of_disperse_filler
    document.getElementsByName("purity_of_disperse_filler_iso")[0].placeholder = resp[0].purity_of_disperse_filler_iso
    document.getElementsByName("dispersity")[0].placeholder = resp[0].dispersity
    document.getElementsByName("dispersity_iso")[0].placeholder = resp[0].dispersity_iso
    document.getElementsByName("chemical_nature")[1].placeholder = resp[0].chemical_nature
    document.getElementsByName("chemical_nature_iso")[0].placeholder = resp[0].chemical_nature_iso
    document.getElementsByName("marka")[0].placeholder = resp[0].marka
    document.getElementsByName("chemical_nature_iso")[0].placeholder = resp[0].chemical_nature_iso
    document.getElementsByName("marka")[0].placeholder = resp[0].marka
    document.getElementsByName("content_filler")[0].placeholder = resp[0].content_filler
    document.getElementsByName("content_filler_iso")[0].placeholder = resp[0].content_filler_iso
}