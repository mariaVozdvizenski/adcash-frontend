var entered_values = [];
var filtered_values = [];

var localStorage = Window.localStorage;

var text_area = document.getElementById("tags");
var add_button = document.getElementById("add");
var edit_button = document.getElementById("edit");
var save_button = document.getElementById("save");
var tag_list = document.getElementsByClassName("tag ");


store_tags_in_local_storage = () => {
    let tag_display = document.getElementsByClassName("tag-display")[0];
    console.log(tag_display.innerHTML);
    localStorage.setItem('tags', tag_display.innerHTML);
}


if (localStorage.getItem('tags')){
    let tag_display = document.getElementsByClassName("tag-display")[0];
    tag_display.innerHTML = localStorage.getItem('tags');
    let deleteButtons = document.getElementsByClassName("delete");
    for(let i=0; i < deleteButtons.length; i++){
        add_event_listener_to_delete_btn(deleteButtons[i]);
    }
}


change_edit_button_state = () => {
    if (tag_list.length == 0) {
        edit_button.disabled = true;
    } else {
        edit_button.disabled = false;
    }
}


change_edit_button_state();


text_area.addEventListener('keydown', e => {
    if (e.code === "Enter") {
        create_new_tags();
        change_edit_button_state();
        store_tags_in_local_storage();
    }
});

save_button.addEventListener('click', e => {
    filtered_values = [];
    let tag_display = document.getElementsByClassName("tag-display")[0];
    tag_display.innerHTML = '';
    create_new_tags(text_area.innerHTML);
    save_button.classList.remove("active");
    edit_button.innerHTML = "Edit";
    change_edit_button_state();
    store_tags_in_local_storage();
    add_button.disabled = false;
});


edit_button.addEventListener('click', e => {
    let tag_string = "";

    for(let i=0; i < tag_list.length; i++){
        if (i != 0) {
            tag_string += ", " + tag_list[i].innerText;
        } else {
            tag_string += tag_list[i].innerText;
        }
    }

    text_area.value = tag_string;
    save_button.classList.add("active");
    edit_button.innerHTML = "Reset";
    add_button.disabled = true;
});

add_button.addEventListener('click', e => {
    localStorage.setItem("message", "hello from storage");
    create_new_tags();
    change_edit_button_state();
    store_tags_in_local_storage();
});

create_new_tags = () => {
    let split_index = 0;

    if (filtered_values.length > 0) {
        split_index = filtered_values.length;
    }

    parse_text_input(text_area.value);

    for(split_index; split_index < filtered_values.length; split_index++) {
        created_tag = create_tag_node(filtered_values[split_index]);
        var tag_display = document.getElementsByClassName("tag-display")[0];
        tag_display.appendChild(created_tag);
    }

    console.log(filtered_values);
    entered_values = [];
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
}
 
is_numeric = (str) => {
    if (typeof str != "string") return false // we only process strings!  
    return !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
           !isNaN(parseFloat(str)) // ...and ensure strings of whitespace fail
}

create_tag_node = (element) => {
    let delete_btn = document.createElement("button");
    delete_btn.classList.add("delete");
    delete_btn.type="button";

    add_event_listener_to_delete_btn(delete_btn);

    let tag_div = document.createElement("div");
    tag_div.classList.add("tag");
    if (element >= 0) {
        tag_div.classList.add("tag-positive");
    } else {
        tag_div.classList.add("tag-negative");
    }
    tag_div.innerHTML = element;
    tag_div.appendChild(delete_btn);
    return tag_div;
}

function add_event_listener_to_delete_btn(delete_btn) {
    delete_btn.addEventListener('click', e => {
        delete_btn.parentElement.remove();
        change_edit_button_state();
        store_tags_in_local_storage();
    });
}

