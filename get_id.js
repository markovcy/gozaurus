async function getEP_write_placeholders (id) {
    let resp
    let port = window.location.origin
    let Url = `${port}/table/items/get?limit=1&lang=1&id=${id}`
    let local = JSON.parse(localStorage.USER);
    let token1 = local["token"]
    let response = await fetch(Url, {
        headers: {
            Authorization: "Bearer " + token1
        }
    });
    if (response.status === 200) {
        resp = await response.json()
    }
    resp = resp[0]
    console.log(resp)
    let id_type_material = resp.id_type_material
    let id_type_of_filler
    switch (id_type_material) {
        case 1: {
            console.log("Thermoplastic polymer")
            parse_termoplastic_polymer(resp)
        }
        case 2: {
            console.log("Additives")
            parse_additive(resp)
        }
        case 3: {
            console.log("Thermoplastic elastomer")
            parse_termoplastic_elastomer(resp)
        }
        case 4:{
            id_type_of_filler = resp.id_type_of_filler
            switch (id_type_of_filler) {
                case 1: {
                    console.log("Disperse filler")
                    parse_disperse_filler(resp)
                }
                case 2: {
                    console.log("Fibrous filler")
                    parse_fibrous_filler (resp)
                }
                case 3: {
                    console.log("Other filler")
                    parse_other_filler(resp)
                }
            }
        }
        case 5: {
            id_type_of_filler = resp.id_type_of_filler
            switch (id_type_of_filler) {
                case 1: {
                    console.log("Thermoplastic composite materials => Disperse filler")
                    parse_TKM_disperse_filler(resp)
                }
                case 2: {
                    console.log("Thermoplastic composite materials => Fibrous filler")
                    parse_TKM_fibrous_filler(resp)
                }

        }
    }
    }
}


function put_placeholder(name, placeholder) {
    let selector = $(`input[name=${name}]:visible`)
    if (selector[0] !== undefined) {
        if (selector[0].placeholder !== undefined) {
            console.log(placeholder)
            selector[0].placeholder = placeholder
        } else {
            selector[0].value = placeholder
            console.log("select " + placeholder)
        }
    } else {
        console.log(name + "undefined")
        $(`[name=${name}]`).val(placeholder)
    }
}

function parse_disperse_filler (resp) {
    let filler_dispers = ["marka", "manufacturer", "chemical_nature", "chemical_nature_iso", "purity_of_disperse_filler", "purity_of_disperse_filler_iso", "dispersity", "dispersity_iso", "moisture_content", "moisture_content_iso", "density", "density_iso"]
    filler_dispers.forEach(function(item, i) {
        // let placeholder = resp[item]
        // console.log(item)
        // console.log(placeholder)
        put_placeholder(item, resp[item])
    });
}

function parse_fibrous_filler (resp) {
    let filler_fibrous = ["marka", "manufacturer", "density", "density_iso", "linear_density_iso", "linear_density", "length_of_fibres_iso", "length_of_fibres", "filament_diameter", "filament_diameter_iso", "tensile_strength_iso", "tensile_strength", "tensile_modulus", "tensile_modulus", "elongation_break", "elongation_break_iso", "moisture_content", "moisture_content_iso"]
    filler_fibrous.forEach(function(item, i) {
        let placeholder = resp[item]
        console.log(item)
        console.log(placeholder)
        put_placeholder(item, resp[item])
    });
}

function parse_other_filler (resp) {
    let filler_other = ["marka", "manufacturer", "chemical_nature", "chemical_nature_iso", "purity_of_disperse_filler", "purity_of_disperse_filler_iso", "dispersity", "dispersity_iso", "moisture_content", "moisture_content_iso", "density", "density_iso", "content_filler_iso", "content_filler"]
    filler_other.forEach(function(item, i) {
        let placeholder = resp[item]
        console.log(item)
        console.log(placeholder)
        put_placeholder(item, resp[item])
    });
}

function parse_TKM_disperse_filler (resp) {
    let TKM_disperse_filler = ["surface_resistivity", "marka", "chemical_nature", "content_reinforcement_iso", "content_reinforcement", "density_iso", "density", "mfr_iso", "mfr", "tensile_modulus_iso", "tensile_modulus", "tensile_strength_break_iso", "tensile_strength_break", "elongation_break_iso", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "melting_temperature"]
    TKM_disperse_filler.forEach(function(item, i) {
        let placeholder = resp[item]
        console.log(item)
        console.log(placeholder)
        put_placeholder(item, resp[item])
    });
}

function parse_TKM_fibrous_filler (resp) {
    let TKM_fibrous_filler = [ "marka", "reinforcing_fiber_configuration", "nature_of_filler", "content_reinforcement_iso", "content_reinforcement", "density_iso", "density", "mfr_iso", "mfr", "tensile_modulus_iso", "tensile_modulus", "tensile_strength_break_iso", "tensile_strength_break", "filament_diameter_iso", "filament_diameter", "elongation_break_iso", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "melting_temperature", "melting_temperature_iso", "flammability", "surface_resistivity"]
    TKM_fibrous_filler.forEach(function(item, i) {
        let placeholder = resp[item]
        console.log(item)
        console.log(placeholder)
        put_placeholder(item, resp[item])
    });
}

function parse_termoplastic_polymer (resp) {
    let termostatic = ["marka", "density_iso", "density", "mfr_iso", "mfr", "tensile_modulus_iso", "tensile_modulus", "tensile_strength_break_iso", "tensile_strength_break", "elongation_break_iso", "elongation_break", "charpy_notched_impact_strength", "charpy_impact_strength", "vick_heat_resistance", "melting_temperature", "melting_temperature_iso", "flammability", "surface_resistivity"]
    termostatic.forEach(function(item, i) {
        let placeholder = resp[item]
        console.log(item)
        console.log(placeholder)
        put_placeholder(item, resp[item])
    });
}

function parse_termoplastic_elastomer (resp) {
    let elastomer = ["marka", "density_iso", "density", "measurement_method", "hardness_iso", "hardness", "mfr", "tensile_strength_iso", "tensile_strength", "relative_elongation_at_break_iso", "relative_elongation_at_break", "elasticity_modulus_100_iso", "elasticity_modulus_100", "elasticity_modulus_300_iso", "elasticity_modulus_300", "tear_resistance_iso", "tear_resistance", "compression_set_23_iso", "compression_set_23", "compression_set_70_iso", "compression_set_70", "compression_set_100_iso", "compression_set_100", "abrasive_wear_and_tear_iso", "abrasive_wear_and_tear", "ozone_resistance", "flammability"]
    elastomer.forEach(function(item, i) {
        let placeholder = resp[item]
        console.log(item)
        console.log(placeholder)
        put_placeholder(item, resp[item])
    });
}

function parse_additive (resp) {
    let additive = ["marka", "id_type_additives"]
    additive.forEach(function(item, i) {
        let placeholder = resp[item]
        console.log(item)
        console.log(placeholder)
        put_placeholder(item, resp[item])
    });
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

function parse_TKM_disperse_filler(resp) {
    console.log("TKM_disperse_filler")
    document.getElementsByName("marka")[0].placeholder = resp[0].marka
    document.getElementsByName("chemical_nature")[0].placeholder = resp[0].chemical_nature
    document.getElementsByName("content_reinforcement")[0].placeholder = resp[0].content_reinforcement
    document.getElementsByName("content_reinforcement_iso")[0].value = resp[0].content_reinforcement_iso
    document.getElementsByName("density")[0].placeholder = resp[0].density
    document.getElementsByName("density_iso")[0].value = resp[0].density_iso
    document.getElementsByName("mfr")[0].placeholder = resp[0].mfr
    document.getElementsByName("mfr_iso")[0].value = resp[0].mfr_iso
    document.getElementsByName("tensile_modulus")[0].placeholder = resp[0].tensile_strength
    document.getElementsByName("tensile_modulus_iso")[0].value = resp[0].tensile_strength_iso
    document.getElementsByName("tensile_strength_break")[0].placeholder = resp[0].tensile_strength_break
    document.getElementsByName("tensile_strength_break_iso")[0].value = resp[0].tensile_strength_break_iso


    document.getElementsByName("linear_density")[0].placeholder = resp[0].linear_density
    document.getElementsByName("linear_density_iso")[0].placeholder = resp[0].linear_density_iso
    document.getElementsByName("length_of_fibres_iso")[0].placeholder = resp[0].length_of_fibres_iso
    document.getElementsByName("length_of_fibres")[0].placeholder = resp[0].length_of_fibres
    document.getElementsByName("filament_diameter")[0].placeholder = resp[0].length_of_fibres
    document.getElementsByName("filament_diameter_iso")[0].placeholder = resp[0].length_of_fibres_iso
    document.getElementsByName("tensile_strength")[1].placeholder = resp[0].tensile_strength
    document.getElementsByName("tensile_strength_iso")[1].placeholder = resp[0].tensile_strength_iso
    document.getElementsByName("elongation_break")[0].placeholder = resp[0].elongation_break
    document.getElementsByName("elongation_break_iso")[0].value = resp[0].elongation_break_iso
    document.getElementsByName("charpy_impact_strength")[0].placeholder = resp[0].charpy_impact_strength
    document.getElementsByName("charpy_notched_impact_strength")[0].placeholder = resp[0].charpy_notched_impact_strength

    document.getElementsByName("melting_temperature")[0].placeholder = resp[0].melting_temperature

    document.getElementsByName("moisture_content_iso")[0].placeholder = resp[0].moisture_content_iso
    document.getElementsByName("moisture_content")[0].placeholder = resp[0].moisture_content
}