document.addEventListener("DOMContentLoaded", function () {
    const checkboxes = document.querySelectorAll('input[name="selected_tables[]"]');
    const viewButton = document.getElementById("view-selected-tables");

    checkboxes.forEach((checkbox) => {
        checkbox.addEventListener("change", function () {
            let selectedTables = [];
            checkboxes.forEach((box) => {
                if (box.checked) {
                    let row = box.closest("tr");
                    let tableInfo = {
                        id: box.value,
                        seats: row.cells[1].textContent,
                        status: row.cells[2].textContent,
                    };
                    selectedTables.push(tableInfo);
                }
            });

            // Lưu danh sách bàn đã chọn vào localStorage
            localStorage.setItem("selectedTables", JSON.stringify(selectedTables));
        });
    });

    viewButton.addEventListener("click", function () {
        if (!localStorage.getItem("selectedTables")) {
            alert("Bạn chưa chọn bàn nào!");
            event.preventDefault(); // Ngăn chuyển trang nếu chưa chọn bàn
        }
    });
});
