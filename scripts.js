var entered_values = [];
var filtered_values = [];

var text_area = document.getElementById("tags");
var add_button = document.getElementById("add");
var edit_button = document.getElementById("edit");

text_area.addEventListener('keydown', e => {
    if (e.code === "Enter") {
        create_new_tags();
    }
});

add_button.addEventListener('click', e => {
    create_new_tags();
});

create_new_tags = () => {
    parse_text_input(text_area.value);
    filtered_values.forEach(element => {
        created_tag = create_tag_node(element);
        console.log(created_tag);
        var tag_display = document.getElementsByClassName("tag-display")[0];
        tag_display.appendChild(created_tag);
    });
    entered_values = [];
    filtered_values = [];
    text_area.value = "";
}

parse_text_input = (text_input) => {
    entered_values = text_input.split(/[; ,\n]/g);
    entered_values.forEach(element => {
        trimmed_el = element.trim();
        if (is_numeric(trimmed_el)) {
            filtered_values.push(parseInt(trimmed_el));
        }
    });
    console.log(filtered_values);
}
 
is_numeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

create_tag_node = (element) => {
    let delete_btn = document.createElement("button");
    delete_btn.classList.add("delete");

    let tag_div = document.createElement("div");
    tag_div.classList.add("tag");
    if (element >= 0) {
        tag_div.classList.add("tag-positive");
    } else {
        tag_div.classList.add("tag-negative");
    }

    tag_div.appendChild(delete_btn);
    return tag_div;
}

