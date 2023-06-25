"use strict";

async function getEP_write_placeholders (id) {
    hideblocks()
    let host = window.location.origin
    let Url = `${host}/table/items/get?limit=1&lang=1&id=${id}`
    let local = JSON.parse(localStorage.USER);
    let token1 = local["token"]
    let response = await fetch(Url, {
        headers: {
            Authorization: "Bearer " + token1
        }
    });
    if (response.status >= 400) {
        console.log(" bad params");
        return
        ;
    } else if (response.status === 204) {
        console.log("id not found");
        return;
    } else if (response.status === 200) {
        resp = await response.json()
    }
    resp = resp[0]
    console.log(resp)
    let id_type_material = resp.id_type_material
    let id_type_of_filler
    console.log(id_type_material)
    console.log(id_type_of_filler)
    switch (id_type_material) {
        case 1: {
            // console.log("Thermoplastic polymer")
            parse_termoplastic_polymer(resp);
            break;
        }
        case 2: {
            // console.log("Additives")
            parse_additive(resp);
            break;
        }
        case 3: {
            // console.log("Thermoplastic elastomer")
            parse_termoplastic_elastomer(resp);
            break;
        }
        case 4:{
            id_type_of_filler = resp.id_type_of_filler
            switch (id_type_of_filler) {
                case 1: {
                    // console.log("Disperse filler")
                    parse_disperse_filler(resp);
                    break;
                }
                case 2: {
                    // console.log("Fibrous filler")
                    parse_fibrous_filler (resp);
                    break;
                }
                case 3: {
                    // console.log("Other filler")
                    parse_other_filler(resp);
                    break;
                }
            }
        }
        case 5: {
            id_content_filler = resp.id_content_filler
            switch (id_content_filler) {
                case 1: {
                    console.log("Thermoplastic composite materials => Disperse filler")
                    parse_TKM_disperse_filler(resp);
                    break;
                }
                case 2: {
                    // console.log("Thermoplastic composite materials => Fibrous filler")
                    parse_TKM_fibrous_filler(resp);
                    break;
                }
        }
    }
    }
}

async function getEP_in_form_PP () {
    hideblocks()
    let resp

    let id_items = document.getElementsByName("id_items")[0].value
    let host = window.location.origin
    let Url
    console.log(id_items)
    if (id_items > "") {
        console.log(id_items)
        Url = `${host}/table/items/get?limit=1&lang=1&id=${id_items}`
        console.log(Url)
    } else {
        console.log("id_items неизвестно")
    }
    let local = JSON.parse(localStorage.USER);
    let token1 = local["token"]
    let response = await fetch(Url, {
        headers: {
            Authorization: "Bearer " + token1
        }
    });
    if (response.status >= 400) {
        console.log(" bad params");
        return
        ;
    } else if (response.status === 204) {
        console.log("id not found");
        return;
    } else if (response.status === 200) {
        resp = await response.json()
    }
    resp = resp[0]
    console.log(resp)
    let id_type_material = resp.id_type_material
    let id_type_of_filler
    console.log(id_type_material)
    console.log(id_type_of_filler)
    switch (id_type_material) {
        case 1: {
            // console.log("Thermoplastic polymer")
            let id = [1, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, -3, -1]
            showHide(id)
            parse_termoplastic_polymer(resp);
            break;
        }
        case 2: {
            // console.log("Additives")
            let id = [18, 19, -3, -1]
            showHide(id)
            parse_additive(resp);
            break;
        }
        case 3: {
            let id = [1, 7, 8, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, -3, -1]
            showHide(id)
            // console.log("Thermoplastic elastomer")
            parse_termoplastic_elastomer(resp);
            break;
        }
        case 4:{
            id_type_of_filler = resp.id_type_of_filler
            switch (id_type_of_filler) {
                case 1: {
                    let id = [1, 32, 33, 34, 35, 36, 43, -3, -1]
                    showHide(id)
                    console.log("Disperse filler")
                    parse_disperse_filler(resp);
                    break;
                }
                case 2: {
                    let id = [1, 32, 36, 37, 38, 39, 40, 41, 42, 43, -3, -1]
                    showHide(id)
                    console.log("Fibrous filler")
                    parse_fibrous_filler (resp);
                    break;
                }
                case 3: {
                    let id = [1, 32, 33, 34, 35, 36, 43, 44, -3, -1]
                    showHide(id)
                    console.log("Other filler")
                    parse_other_filler(resp);
                    break;
                }
            }
        }
        case 5: {
            id_content_filler = resp.id_content_filler
            switch (id_content_filler) {
                case 1: {
                    let id = [1, 2, 3, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, -3, -1]
                    showHide(id)
                    console.log("Thermoplastic composite materials => Disperse filler")
                    parse_TKM_disperse_filler(resp);
                    break;
                }
                case 2: {
                    let id = [1, 2, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, -3, -1]
                    showHide(id)
                    console.log("Thermoplastic composite materials => Fibrous filler")
                    parse_TKM_fibrous_filler(resp);
                    break;
                }

        }
    }
    }
}

function hideblocks() {
    // let selector = $(`input[name=${name}]:visible`)
    // console.log(name)
    // console.log(placeholder)
    // if (selector[0] !== undefined) {
    //     if (selector[0].placeholder !== undefined) {
    //         console.log(placeholder)
    //         selector[0].placeholder = ""
    //     }
    // } else {
    //     console.log(name + " placeholder undefined")
    //     // $(`[name=${name}]`).val(placeholder)
    // }
    for (let i = 2; i < 45; i++) { // выведет 0, затем 1, затем 2
        document.getElementById(`block${i}`).style.display = "none";
        console.log((`block${i}`));
      }
}

function showHide(id) {
    id.forEach(function(elem) {
    console.log(id)
    console.log(elem)
	document.getElementById(`block${elem}`).style.display = "block"
});
}


function put_placeholder_values(name, placeholder) {
    let selector = $(`input[name=${name}]:visible`)
    console.log(name)
    console.log(placeholder)
    if (selector[0] !== undefined) {
        if (selector[0].placeholder !== undefined) {
            console.log(placeholder)
            selector[0].placeholder = placeholder
        }
    } else {
        console.log(name + " placeholder undefined")
        // $(`[name=${name}]`).val(placeholder)
    }
}

function put_value_values(name, placeholder) {
    console.log(name)
    console.log(placeholder)
    let selector = $(`select[name=${name}]:visible`);
    console.log(selector)
    console.log(selector[0])
    if (selector !== undefined) {
        if (selector !== undefined) {
            console.log(name)
            console.log(placeholder)
            selector.val(placeholder)
        }
    } else {
        console.log(name + " select undefined")
        // $(`[name=${name}]`).val(placeholder)
    }
}

function parse_disperse_filler (resp) {
    let massivofplaceholders = ["marka", "chemical_nature_iso", "chemical_nature",  "purity_of_disperse_filler_iso", "purity_of_disperse_filler",  "dispersity_iso", "dispersity",  "moisture_content_iso", "moisture_content",  "density_iso", "density"]
    let massivofvalue = ["manufacturer", "id_type_of_filler", "notes"]

    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_fibrous_filler (resp) {
    let massivofplaceholders = ["marka", "manufacturer", "density", "density_iso", "linear_density_iso", "linear_density", "length_of_fibres_iso", "length_of_fibres", "filament_diameter", "filament_diameter_iso", "tensile_strength_iso", "tensile_strength", "tensile_modulus", "tensile_modulus_iso", "elongation_break", "elongation_break_iso", "moisture_content", "moisture_content_iso"]
    let massivofvalue = ["manufacturer","id_type_of_filler", "notes"]

    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_other_filler (resp) {
    let massivofplaceholders = ["marka", "manufacturer", "chemical_nature", "chemical_nature_iso", "purity_of_disperse_filler", "purity_of_disperse_filler_iso", "dispersity", "dispersity_iso", "moisture_content", "moisture_content_iso", "density", "density_iso", "content_filler_iso", "content_filler", "filler_configuration_iso", "filler_configuration_iso"]
    let massivofvalue = ["id_type_of_filler", "manufacturer",  "notes"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_TKM_disperse_filler (resp) {
    console.log("parse_TKM_disperse_filler")
    let massivofplaceholders = ["surface_resistivity", "marka", "chemical_nature",  "content_reinforcement",  "density",  "mfr", "tensile_modulus",  "tensile_strength_break", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "vicat", "flammability", "melting_temperature"]
    let massivofvalue = [ "manufacturer", "id_content_filler", "content_reinforcement_iso", "density_iso","mfr_iso", "tensile_modulus_iso", "tensile_strength_break_iso", "elongation_break_iso",  "melting_temperature_iso"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_TKM_fibrous_filler (resp) {
    let massivofplaceholders = [ "marka",  "nature_of_filler",  "content_reinforcement", "density",  "mfr", "tensile_modulus", "tensile_strength_break", "filament_diameter_iso", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "vicat", "melting_temperature", "flammability", "surface_resistivity"]
    let massivofvalue = ["manufacturer","id_content_filler", "id_reinforcing", "content_reinforcement_iso",  "density_iso", "mfr_iso", "tensile_modulus_iso", "tensile_strength_break_iso", "elongation_break_iso", "melting_temperature_iso", "notes"] 
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_termoplastic_polymer (resp) {
    let massivofplaceholders = ["marka", "density", "mfr", "tensile_modulus", "tensile_strength_break", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "vicat", "melting_temperature", "flammability", "surface_resistivity"]
    let massivofvalue = ["manufacturer", "density_iso", "mfr_iso", "tensile_modulus_iso", "tensile_strength_break_iso", "elongation_break_iso",  "melting_temperature_iso"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_termoplastic_elastomer (resp) {
    let massivofplaceholders = ["marka",  "density", "hardness", "mfr", "tensile_strength", "elongation_break", "tensile_modulus100", "tensile_modulus300", "tear_resistance", "compression_set23", "compression_set70", "compression_set100", "abrasive_wear_and_tear", "ozone_resistance", "flammability", "notes"]
    let massivofvalue = ["manufacturer", "density_iso", "measurement_method", "hardness_way", "hardness_iso", "tensile_strength_iso", "elongation_break_iso", "tensile_modulus100_iso", "tensile_modulus300_iso", "tear_resistance_iso", "compression_set23_iso", "compression_set70_iso", "compression_set100_iso", "abrasive_wear_and_tear_iso"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_additive (resp) {
    let massivofplaceholders = ["marka", "manufacturer", "methods_recycling", "using_sectors", "notes"]
    let massivofvalue = ["id_type_additives"]
    console.log(massivofplaceholders, massivofvalue)
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function do_foreach (resp, massivofplaceholders, massivofvalue) {
    console.log(massivofplaceholders)
    console.log(massivofvalue)
    massivofplaceholders.forEach(function(item, i) {
        put_placeholder_values(item, resp[item])
    });
    if (massivofvalue !== undefined)
    massivofvalue.forEach(function(item, i) {
        console.log(item),
        console.log(resp[item])
        put_value_values(item, resp[item])
    })
}