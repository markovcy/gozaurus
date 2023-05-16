let resp
async function getEP_write_placeholders (id) {
   
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
    if (selector !== undefined) {
        if (selector[0].val() !== undefined) {
            console.log(name)
            console.log(placeholder)
            selector[0].val(placeholder)
        }
    } else {
        console.log(name + " select undefined")
        // $(`[name=${name}]`).val(placeholder)
    }
}

function parse_disperse_filler (resp) {
    let massivofplaceholders = ["marka", "manufacturer", "chemical_nature", "chemical_nature_iso", "purity_of_disperse_filler", "purity_of_disperse_filler_iso", "dispersity", "dispersity_iso", "moisture_content", "moisture_content_iso", "density", "density_iso"]
    do_foreach (resp, massivofplaceholders)
}

function parse_fibrous_filler (resp) {
    let massivofplaceholders = ["marka", "manufacturer", "density", "density_iso", "linear_density_iso", "linear_density", "length_of_fibres_iso", "length_of_fibres", "filament_diameter", "filament_diameter_iso", "tensile_strength_iso", "tensile_strength", "tensile_modulus", "tensile_modulus", "elongation_break", "elongation_break_iso", "moisture_content", "moisture_content_iso"]
    do_foreach (resp, massivofplaceholders)
}

function parse_other_filler (resp) {
    let massivofplaceholders = ["marka", "manufacturer", "chemical_nature", "chemical_nature_iso", "purity_of_disperse_filler", "purity_of_disperse_filler_iso", "dispersity", "dispersity_iso", "moisture_content", "moisture_content_iso", "density", "density_iso", "content_filler_iso", "content_filler"]
    do_foreach (resp, massivofplaceholders)
}

function parse_TKM_disperse_filler (resp) {
    console.log("parse_TKM_disperse_filler")
    let massivofplaceholders = ["surface_resistivity", "marka", "chemical_nature",  "content_reinforcement",  "density",  "mfr", "tensile_modulus",  "tensile_strength_break", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "melting_temperature"]
    let massivofvalue = ["content_reinforcement_iso", "density_iso","mfr_iso", "tensile_modulus_iso", "tensile_strength_break_iso", "elongation_break_iso",  "melting_temperature_iso"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_TKM_fibrous_filler (resp) {
    let massivofplaceholders = [ "marka",  "nature_of_filler",  "content_reinforcement", "density",  "mfr", "tensile_modulus", "tensile_strength_break", "filament_diameter_iso", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "melting_temperature", "flammability", "surface_resistivity"]
    let massivofvalue = ["reinforcing_fiber_configuration", "content_reinforcement_iso",  "density_iso", "mfr_iso", "tensile_modulus_iso", "tensile_strength_break_iso", "elongation_break_iso", "melting_temperature_iso"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_termoplastic_polymer (resp) {
    let massivofplaceholders = ["marka", "density", "mfr", "tensile_modulus", "tensile_strength_break", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "vick_heat_resistance", "melting_temperature", "flammability", "surface_resistivity"]
    let massivofvalue = ["density_iso", "mfr_iso", "tensile_modulus_iso", "tensile_strength_break_iso", "elongation_break_iso",  "melting_temperature_iso"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_termoplastic_elastomer (resp) {
    let massivofplaceholders = ["marka",  "density", "hardness", "mfr", "tensile_strength", "relative_elongation_at_break", "elasticity_modulus_100", "elasticity_modulus_300", "tear_resistance", "compression_set_23", "compression_set_70", "compression_set_100", "abrasive_wear_and_tear", "ozone_resistance", "flammability"]
    let massivofvalue = ["density_iso", "measurement_method", "hardness_iso", "tensile_strength_iso", "relative_elongation_at_break_iso", "elasticity_modulus_100_iso", "elasticity_modulus_300_iso", "tear_resistance_iso", "compression_set_23_iso", "compression_set_70_iso", "compression_set_100_iso", "abrasive_wear_and_tear_iso"]
    do_foreach (resp, massivofplaceholders, massivofvalue)
}

function parse_additive (resp) {
    let massivofplaceholders = ["marka"]
    let massivofvalue = ["id_type_additives"]
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
        put_value_values(item, resp[item])
    })
}