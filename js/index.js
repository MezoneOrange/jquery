/**
 * Marks the element as done.
 *
 * @param {number} Current id of element for which the function is worked.
 */
function deleteTask(id) {
    document.querySelector("#task_" + id).className = "crossed";
}


;(function($, undefined) {
    let task_id = 1;

    /**
     * Shows the success field during 1.5 sec.
     */
    function show_success() {
        $("#success").prop('hidden', false);
        setTimeout(function() {
            $("#success").prop('hidden', true);
        }, 1500);
    }

    /**
     * Checks fullness of the text field.
     *
     * When input text field contains less than 4 symbols, function returns false
     * and changes field's border color to red.
     * Otherwise returns true and field's border color stills is silver
     * or changes to silver if it was red. Also deletes a text inside the text field.
     *
     * @param {number} Length of the text that would be checked.
     * @return {Boolean} true if 4 symbols and more, else false.
     */
    function fild_is_filled(textLength) {
        if (textLength < 4) {
            $("#fault").prop("hidden", false);
            $("#task_field").removeClass("border-secondary");
            $("#task_field").addClass("border-danger");
            return false;
        } else {
            $("#fault").prop("hidden", true);
            $("#task_field").val("");

            if ($("#task_field").hasClass("border-danger")) {
                $("#task_field").removeClass("border-danger");
                $("#task_field").addClass("border-secondary");
            }

            return true;
        }
    }

    /**
     * Adds task to the end of the tasks block.
     *
     * If task doesn't meet the conditions, the one exits from function and
     * doesn't add the task (if less than 4 symbols).
     * Otherwise:
     * Creates new hidden object which contains current task's id and the input text
     * in format: "Задание №(current id): (task's text) X". And adds the object
     * to the end of tasks block.
     */
    function add_task() {
        let task = $("#task_field").val();
        let isFill = fild_is_filled(task.length);

        if (!isFill) {
            return;
        }

        let numberOfTask = "Задание №" + task_id + ": ";
        let deleteKnob = '<i class="fas fa-times-circle" id="delete_' +
                         task_id + '" onclick="deleteTask(' +  task_id +
                         ')"></i>';
        let newTaskElement = $("<div>").attr({
            "id": "task_" + task_id,
            "hidden": true,
        }).html(numberOfTask + task + deleteKnob);

        $("#tasks").append(newTaskElement);
        show_success();
        task_id++;
    }

    /**
     * Allows to see new tasks that were just are added but still hidden.
     */
    function show_hidden_tasks() {
        let tasks = $('#tasks > div');
        tasks.attr("hidden", false);
    }

    $(document).ready(function() {
        $("#add_btn").on("click", add_task);
        $("#show_btn").on("click", show_hidden_tasks);
    });
})(jQuery);
